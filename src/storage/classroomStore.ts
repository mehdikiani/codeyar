import type {ClassroomSettings, ClassroomState, RubricScore, StudentRecord, UnitTabId} from '../types/curriculum.ts';

const STORAGE_KEY = 'tarah_site_1405_classroom_v1';
const IDB_NAME = 'tarah_site_1405_offline_db';
const IDB_STORE = 'state_snapshots';

export const DEFAULT_SETTINGS: ClassroomSettings = {
  theme: 'light',
  fontScale: 'md',
  teacherMode: false,
  projectorMode: false,
  sidebarOpen: true,
};

export const DEFAULT_STUDENTS: StudentRecord[] = [
  {id: 'st-1', name: 'امیرحسین رضایی', scores: {}},
  {id: 'st-2', name: 'فاطمه محمدی', scores: {}},
  {id: 'st-3', name: 'محمدمهدی کریمی', scores: {}},
];

export function createDefaultState(): ClassroomState {
  return {
    version: 1,
    settings: {...DEFAULT_SETTINGS},
    activeUnitId: 'unit-1-1',
    activeTab: 'overview',
    completedUnits: [],
    teacherNotes: {},
    savedCode: {},
    students: DEFAULT_STUDENTS.map((s) => ({...s, scores: {...s.scores}})),
  };
}

export function sanitizeState(raw: unknown): ClassroomState {
  const fallback = createDefaultState();
  if (!raw || typeof raw !== 'object') return fallback;
  const obj = raw as Partial<ClassroomState>;
  const settings = obj.settings ?? DEFAULT_SETTINGS;

  return {
    version: 1,
    settings: {
      theme: settings.theme === 'dark' ? 'dark' : 'light',
      fontScale:
        settings.fontScale === 'sm' ||
        settings.fontScale === 'md' ||
        settings.fontScale === 'lg' ||
        settings.fontScale === 'xl'
          ? settings.fontScale
          : 'md',
      teacherMode: Boolean(settings.teacherMode),
      projectorMode: Boolean(settings.projectorMode),
      sidebarOpen: settings.sidebarOpen !== false,
    },
    activeUnitId: typeof obj.activeUnitId === 'string' && obj.activeUnitId ? obj.activeUnitId : fallback.activeUnitId,
    activeTab: isValidTab(obj.activeTab) ? obj.activeTab : 'overview',
    completedUnits: Array.isArray(obj.completedUnits)
      ? obj.completedUnits.filter((u): u is string => typeof u === 'string')
      : [],
    teacherNotes:
      obj.teacherNotes && typeof obj.teacherNotes === 'object' ? {...obj.teacherNotes} : {},
    savedCode: obj.savedCode && typeof obj.savedCode === 'object' ? {...obj.savedCode} : {},
    students:
      Array.isArray(obj.students) && obj.students.length > 0
        ? obj.students
            .filter((s): s is StudentRecord => Boolean(s && typeof s.id === 'string' && typeof s.name === 'string'))
            .map((s) => ({
              id: s.id,
              name: s.name,
              scores: s.scores && typeof s.scores === 'object' ? s.scores : {},
            }))
        : fallback.students,
  };
}

function isValidTab(tab: unknown): tab is UnitTabId {
  return (
    tab === 'overview' ||
    tab === 'visual-lab' ||
    tab === 'live-examples' ||
    tab === 'workshops' ||
    tab === 'tips-debugging' ||
    tab === 'rubric'
  );
}

export function loadClassroomState(): ClassroomState {
  try {
    if (typeof window === 'undefined' || !window.localStorage) {
      return createDefaultState();
    }
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return createDefaultState();
    return sanitizeState(JSON.parse(raw));
  } catch {
    return createDefaultState();
  }
}

export function saveClassroomState(state: ClassroomState): void {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    }
    // Mirror asynchronously into IndexedDB for extra durability in school labs
    mirrorToIndexedDb(state);
  } catch {
    // Ignore storage quota errors gracefully
  }
}

function mirrorToIndexedDb(state: ClassroomState): void {
  if (typeof window === 'undefined' || typeof window.indexedDB === 'undefined') return;
  try {
    const req = window.indexedDB.open(IDB_NAME, 1);
    req.onupgradeneeded = () => {
      const db = req.result;
      if (!db.objectStoreNames.contains(IDB_STORE)) {
        db.createObjectStore(IDB_STORE);
      }
    };
    req.onsuccess = () => {
      const db = req.result;
      const tx = db.transaction(IDB_STORE, 'readwrite');
      tx.objectStore(IDB_STORE).put(state, 'latest');
      tx.oncomplete = () => db.close();
    };
  } catch {
    // IndexedDB unavailable in private mode; LocalStorage remains active
  }
}

export function updateStudentScore(
  students: StudentRecord[],
  studentId: string,
  unitId: string,
  stageNumber: number,
  score: RubricScore
): StudentRecord[] {
  return students.map((student) => {
    if (student.id !== studentId) return student;
    const prevUnitScores = student.scores[unitId] ?? {};
    return {
      ...student,
      scores: {
        ...student.scores,
        [unitId]: {
          ...prevUnitScores,
          [stageNumber]: score,
        },
      },
    };
  });
}

export function exportBackupJson(state: ClassroomState): string {
  return JSON.stringify(
    {
      app: 'tarah-site-1405-assistant',
      exportedAt: new Date().toISOString(),
      data: state,
    },
    null,
    2
  );
}

export function parseBackupJson(rawText: string): ClassroomState | null {
  try {
    const parsed = JSON.parse(rawText);
    if (parsed && typeof parsed === 'object' && 'data' in parsed) {
      return sanitizeState(parsed.data);
    }
    return sanitizeState(parsed);
  } catch {
    return null;
  }
}
