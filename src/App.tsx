import {useCallback, useEffect, useState} from 'react';
import {X, StickyNote, Keyboard} from 'lucide-react';
import {CURRICULUM_MODULES, findUnitAndModule} from './curriculum/index.ts';
import {
  exportBackupJson,
  loadClassroomState,
  parseBackupJson,
  saveClassroomState,
  updateStudentScore,
} from './storage/classroomStore.ts';
import {Sidebar} from './shell/Sidebar.tsx';
import {TopBar} from './shell/TopBar.tsx';
import {UnitWorkspace} from './shell/UnitWorkspace.tsx';
import type {ClassroomSettings, ClassroomState, RubricScore, UnitTabId} from './types/curriculum.ts';

const FONT_SCALES: ClassroomSettings['fontScale'][] = ['sm', 'md', 'lg', 'xl'];
const TAB_ORDER: UnitTabId[] = [
  'overview',
  'visual-lab',
  'live-examples',
  'workshops',
  'homework',
  'quick-quiz',
  'tips-debugging',
  'rubric',
];

function isEditableTarget(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) return false;
  const tag = target.tagName;
  if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return true;
  if (target.isContentEditable) return true;
  if (target.closest('.cm-editor')) return true;
  return false;
}

export default function App() {
  const [state, setState] = useState<ClassroomState>(() => loadClassroomState());
  const [notesOpen, setNotesOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const showToast = useCallback((msg: string) => {
    setToast(msg);
  }, []);

  useEffect(() => {
    if (!toast) return;
    const id = window.setTimeout(() => setToast(null), 3200);
    return () => window.clearTimeout(id);
  }, [toast]);

  // Persist offline on every state change
  useEffect(() => {
    saveClassroomState(state);
  }, [state]);

  // Apply theme, font-scale, and projector attributes to <html>
  useEffect(() => {
    const html = document.documentElement;
    html.classList.toggle('dark', state.settings.theme === 'dark');
    html.setAttribute('data-font-scale', state.settings.fontScale);
    html.setAttribute('data-projector', String(state.settings.projectorMode));
  }, [state.settings.theme, state.settings.fontScale, state.settings.projectorMode]);

  const toggleTeacherMode = useCallback(() => {
    setState((prev) => {
      const next = !prev.settings.teacherMode;
      showToast(next ? 'حالت مدرس فعال شد (راهنمای گفتاری و پاسخ‌ها آشکار شدند)' : 'حالت مدرس خاموش شد (نمای تمیز کلاسی)');
      return {
        ...prev,
        settings: {...prev.settings, teacherMode: next},
      };
    });
  }, [showToast]);

  const toggleProjectorMode = useCallback(() => {
    setState((prev) => {
      const next = !prev.settings.projectorMode;
      showToast(next ? 'حالت پروژکتور فعال شد (فونت بزرگ و بدون حواس‌پرتی)' : 'خروج از حالت پروژکتور');
      return {
        ...prev,
        settings: {
          ...prev.settings,
          projectorMode: next,
          sidebarOpen: next ? false : true,
          fontScale: next ? 'lg' : 'md',
        },
      };
    });
  }, [showToast]);

  const toggleTheme = useCallback(() => {
    setState((prev) => ({
      ...prev,
      settings: {
        ...prev.settings,
        theme: prev.settings.theme === 'dark' ? 'light' : 'dark',
      },
    }));
  }, []);

  // Classroom global keyboard shortcuts (using physical e.code so they work on Persian keyboard layout too!)
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey || e.altKey) return;
      if (isEditableTarget(e.target)) return;

      if (e.code === 'KeyT') {
        e.preventDefault();
        toggleTeacherMode();
      } else if (e.code === 'KeyP') {
        e.preventDefault();
        toggleProjectorMode();
      } else if (e.code === 'KeyD') {
        e.preventDefault();
        toggleTheme();
      } else if (e.code.startsWith('Digit')) {
        const num = Number(e.code.replace('Digit', ''));
        if (num >= 1 && num <= TAB_ORDER.length) {
          e.preventDefault();
          setState((prev) => ({...prev, activeTab: TAB_ORDER[num - 1]}));
        }
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [toggleProjectorMode, toggleTeacherMode, toggleTheme]);

  const {module: activeModule, unit: activeUnit} = findUnitAndModule(state.activeUnitId);

  const handleCycleFontScale = (dir: 'up' | 'down') => {
    setState((prev) => {
      const idx = FONT_SCALES.indexOf(prev.settings.fontScale);
      const nextIdx = dir === 'up' ? Math.min(FONT_SCALES.length - 1, idx + 1) : Math.max(0, idx - 1);
      return {
        ...prev,
        settings: {...prev.settings, fontScale: FONT_SCALES[nextIdx]},
      };
    });
  };

  const handleExportBackup = () => {
    const json = exportBackupJson(state);
    const blob = new Blob([json], {type: 'application/json;charset=utf-8;'});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `tarah-site-1405-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('فایل پشتیبان آفلاین (نمرات و یادداشت‌ها) با موفقیت دانلود شد.');
  };

  const handleImportBackup = (raw: string) => {
    const restored = parseBackupJson(raw);
    if (!restored) {
      showToast('فایل پشتیبان نامعتبر است.');
      return;
    }
    setState(restored);
    showToast('اطلاعات کلاس با موفقیت از فایل پشتیبان بازیابی شد.');
  };

  const currentNote = state.teacherNotes[activeUnit.id] ?? '';

  return (
    <div dir="rtl" className="flex h-screen w-full overflow-hidden bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      {/* Collapsible RTL Sidebar */}
      {state.settings.sidebarOpen && (
        <Sidebar
          modules={CURRICULUM_MODULES}
          activeUnitId={activeUnit.id}
          completedUnits={state.completedUnits}
          onSelectUnit={(unitId) =>
            setState((prev) => ({...prev, activeUnitId: unitId, activeTab: 'overview'}))
          }
          onToggleUnitComplete={(unitId) =>
            setState((prev) => {
              const exists = prev.completedUnits.includes(unitId);
              return {
                ...prev,
                completedUnits: exists
                  ? prev.completedUnits.filter((u) => u !== unitId)
                  : [...prev.completedUnits, unitId],
              };
            })
          }
          onExportBackup={handleExportBackup}
          onImportBackup={handleImportBackup}
        />
      )}

      {/* Main Workspace Area */}
      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        <TopBar
          settings={state.settings}
          activeModule={activeModule}
          activeUnit={activeUnit}
          notesOpen={notesOpen}
          onToggleSidebar={() =>
            setState((prev) => ({
              ...prev,
              settings: {...prev.settings, sidebarOpen: !prev.settings.sidebarOpen},
            }))
          }
          onToggleTeacherMode={toggleTeacherMode}
          onToggleProjectorMode={toggleProjectorMode}
          onToggleTheme={toggleTheme}
          onCycleFontScale={handleCycleFontScale}
          onToggleNotes={() => setNotesOpen((v) => !v)}
        />

        <div className="relative flex flex-1 overflow-hidden">
          <main className="flex-1 overflow-y-auto pb-16">
            <UnitWorkspace
              unit={activeUnit}
              activeTab={state.activeTab}
              teacherMode={state.settings.teacherMode}
              dark={state.settings.theme === 'dark'}
              savedCode={state.savedCode}
              students={state.students}
              onTabChange={(tab) => setState((prev) => ({...prev, activeTab: tab}))}
              onSaveCode={(key, code) =>
                setState((prev) => ({
                  ...prev,
                  savedCode: {...prev.savedCode, [key]: code},
                }))
              }
              onScoreChange={(studentId: string, stageNumber: number, score: RubricScore) =>
                setState((prev) => ({
                  ...prev,
                  students: updateStudentScore(prev.students, studentId, activeUnit.id, stageNumber, score),
                }))
              }
              onAddStudent={(name) =>
                setState((prev) => ({
                  ...prev,
                  students: [...prev.students, {id: `st-${Date.now()}`, name, scores: {}}],
                }))
              }
              onRemoveStudent={(studentId) =>
                setState((prev) => ({
                  ...prev,
                  students: prev.students.filter((s) => s.id !== studentId),
                }))
              }
            />
          </main>

          {/* Teacher Classroom Notes Drawer */}
          {notesOpen && (
            <aside className="flex w-80 shrink-0 flex-col border-r border-slate-200 bg-white p-4 shadow-lg dark:border-slate-800 dark:bg-slate-900">
              <div className="mb-3 flex items-center justify-between border-b border-slate-100 pb-2.5 dark:border-slate-800">
                <h3 className="flex items-center gap-1.5 text-sm font-bold text-slate-900 dark:text-white">
                  <StickyNote className="h-4 w-4 text-amber-500" />
                  یادداشت کلاسی واحد {activeUnit.unitNumber}
                </h3>
                <button
                  type="button"
                  onClick={() => setNotesOpen(false)}
                  className="rounded p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              <p className="mb-2 text-xs text-slate-500 dark:text-slate-400">
                یادداشت‌های شما به‌صورت خودکار در حافظه آفلاین سیستم ذخیره می‌شوند.
              </p>
              <textarea
                value={currentNote}
                onChange={(e) =>
                  setState((prev) => ({
                    ...prev,
                    teacherNotes: {...prev.teacherNotes, [activeUnit.id]: e.target.value},
                  }))
                }
                placeholder="مثلاً: جلسه آینده پرسش کلاسی از حلقه while و تمرین آشپزباشی..."
                className="flex-1 resize-none rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm leading-7 text-slate-800 outline-none focus:border-sky-500 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
              />
              <div className="mt-3 rounded-lg border border-slate-200 bg-slate-50 p-2.5 text-[11px] text-slate-600 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-400">
                <div className="mb-1 flex items-center gap-1 font-bold text-slate-700 dark:text-slate-200">
                  <Keyboard className="h-3.5 w-3.5" />
                  میانبرهای سریع کلاسی:
                </div>
                <div><kbd className="font-mono font-bold">T</kbd> حالت مدرس | <kbd className="font-mono font-bold">P</kbd> حالت پروژکتور | <kbd className="font-mono font-bold">D</kbd> تم روشن/تاریک | <kbd className="font-mono font-bold">1-8</kbd> تب‌های درس</div>
              </div>
            </aside>
          )}
        </div>
      </div>

      {/* Subtle Non-blocking Classroom Toast */}
      {toast && (
        <div className="pointer-events-none fixed bottom-5 left-1/2 z-50 -translate-x-1/2 rounded-xl border border-sky-500/40 bg-slate-900 px-4 py-2.5 text-xs font-semibold text-white shadow-lg dark:bg-slate-800">
          {toast}
        </div>
      )}
    </div>
  );
}
