/**
 * Core TypeScript types for the 100% offline «طراح سایت ۱۴۰۵» Teaching Assistant.
 * Supports full deep-content architecture:
 * - Structured self-contained Concept Lessons (Why, Syntax Anatomy, Behind the Scenes, Wrong vs Right)
 * - Tiered Runnable Examples (Basic, Practical, Combined, What-If)
 * - Classwork Workshops (with estimated time, step guide & alternative Teacher Mode solution)
 * - Dedicated Tiered Homework Bank (Easy / Medium / Challenging + Printable Worksheet)
 * - Interactive Quick Board Quizzes ("What's the output?" / Conceptual / Bug-Spot)
 * - Textbook Bug-Fix Labs & Official Digital Competency Rubrics
 */

export type ModuleId = 'module1' | 'module2' | 'module3' | 'module4' | 'module5';

export type EngineKind = 'python' | 'web' | 'bootstrap-js' | 'python-fs' | 'django-sql';

export type CodeLanguage = 'python' | 'html' | 'css' | 'javascript' | 'sql' | 'django-html';

export type UnitTabId =
  | 'overview'
  | 'visual-lab'
  | 'live-examples'
  | 'workshops'
  | 'homework'
  | 'quick-quiz'
  | 'tips-debugging'
  | 'rubric';

export interface LineAnnotation {
  line: number;
  explanation: string;
}

export interface TextbookCorrectionNote {
  page: number;
  issue: string;
  fix: string;
}

export type ExampleTier = 'basic' | 'practical' | 'combined' | 'what-if';

export interface GuidedExample {
  id: string;
  title: string;
  tier?: ExampleTier;
  bookPage?: string;
  summary: string;
  language: CodeLanguage;
  engine: EngineKind;
  code: string;
  /** Optional extra files (e.g., CSS/JS for web sandbox, or .py/.txt/.json for Virtual FS) */
  extraFiles?: Record<string, string>;
  /** Optional secondary tab code (e.g., CSS or JS alongside HTML) */
  cssCode?: string;
  jsCode?: string;
  useBootstrap?: boolean;
  teacherTalkingPoints: string[];
  classroomQuestion?: string;
  lineExplanations: LineAnnotation[];
  commonMistakes: string[];
  bookCorrection?: TextbookCorrectionNote;
}

export interface SyntaxPart {
  token: string;
  role: string;
}

export interface ConceptMistakePair {
  title: string;
  wrongCode: string;
  rightCode: string;
  explanation: string;
}

export interface ConceptLesson {
  id: string;
  order: number;
  title: string;
  bookPage: string;
  /** ۱. چرا به این مفهوم نیاز داریم؟ (مسئله واقعی و تشبیه ملموس) */
  whyWeNeedIt: {
    realWorldProblem: string;
    analogy: string;
  };
  /** ۲. کالبدشکافی ساختار (Syntax Anatomy) */
  syntaxAnatomy: {
    template: string;
    parts: SyntaxPart[];
  };
  /** ۳. پشت صحنه چه اتفاقی می‌افتد؟ (توضیح عمیق ویژه هنرآموز) */
  behindTheScenes: string[];
  /** ۴. نکات طلایی و مقایسه روش اشتباه در برابر استاندارد */
  goldenTips: string[];
  wrongVsRight: ConceptMistakePair[];
  /** حداقل ۳ تا ۴ مثال مستقل سطح‌بندی‌شده (پایه، کاربردی، ترکیبی، خطای عمدی/مقایسه) */
  examples: (GuidedExample & {tier: ExampleTier})[];
}

export type ActivityKind = 'activity' | 'workshop' | 'curiosity' | 'project';

export interface ClassroomActivity {
  id: string;
  kind: ActivityKind;
  title: string;
  bookPage: string;
  estimatedMinutes?: number;
  prompt: string;
  steps?: string[];
  hints: string[];
  language: CodeLanguage;
  engine: EngineKind;
  starterCode: string;
  solutionCode: string;
  solutionExplanation: string;
  alternativeSolutionCode?: string;
  alternativeSolutionExplanation?: string;
  cssStarter?: string;
  cssSolution?: string;
  jsStarter?: string;
  jsSolution?: string;
  useBootstrap?: boolean;
  extraFiles?: Record<string, string>;
}

export type HomeworkDifficulty = 'easy' | 'medium' | 'challenging';

export interface HomeworkAssignment {
  id: string;
  number: number;
  title: string;
  difficulty: HomeworkDifficulty;
  bookPage?: string;
  estimatedMinutes: number;
  prompt: string;
  sampleInput?: string;
  sampleOutput: string;
  hint: string;
  solutionCode: string;
  solutionExplanation: string;
  language: CodeLanguage;
  engine: EngineKind;
}

export type QuickQuizKind = 'output' | 'concept' | 'bug-spot';

export interface QuickQuizQuestion {
  id: string;
  kind: QuickQuizKind;
  question: string;
  codeSnippet?: string;
  language?: CodeLanguage;
  options: string[];
  correctIndex: number;
  explanation: string;
  bookPage?: string;
}

export interface BugFixChallenge {
  id: string;
  title: string;
  sourceLabel: string;
  description: string;
  language: CodeLanguage;
  engine: EngineKind;
  buggyCode: string;
  fixedCode: string;
  hint: string;
  teacherExplanation: string;
  classroomQuestion?: string;
  useBootstrap?: boolean;
}

export interface GapFillingNote {
  id: string;
  title: string;
  badge: string;
  content: string;
  codeSnippet?: string;
  language?: CodeLanguage;
}

export interface RubricStage {
  stageNumber: number;
  title: string;
  isCritical: boolean;
  /** Standard criteria corresponding to scores 1 (ضعیف / در حال تلاش), 2 (متوسط / قابل قبول), 3 (عالی / مسلط) */
  criteria: {
    score1: string;
    score2: string;
    score3: string;
  };
  teacherAuditNote?: string;
}

export interface VisualLabSpec {
  id:
    | 'python-memory-list'
    | 'python-functions-structures'
    | 'web-dns-semantic'
    | 'css-box-flex-grid'
    | 'bootstrap-grid-breakpoints'
    | 'js-dom-events'
    | 'python-oop-factory'
    | 'python-exceptions-json'
    | 'django-mvt-cycle'
    | 'django-orm-sqlite';
  title: string;
  subtitle: string;
  teacherGuide: string;
  classroomQuestion?: string;
}

export interface LearningUnit {
  id: string;
  moduleId: ModuleId;
  unitNumber: string; // e.g., "۱.۱"
  title: string;
  pageRange: string;
  estimatedMinutes: number;
  engine: EngineKind;
  objectives: string[];
  warmupQuestions: {
    question: string;
    teacherAnswer: string;
  }[];
  flagshipProject: string;
  teacherOverviewTips: string[];
  visualLab: VisualLabSpec;
  /** Deep Concept-by-Concept Lessons with tiered examples (new gold standard) */
  lessons?: ConceptLesson[];
  /** Legacy / flat guided examples (always populated for compatibility) */
  examples: GuidedExample[];
  activities: ClassroomActivity[];
  /** Dedicated tiered homework bank (Easy / Medium / Challenging + Printable Sheet) */
  homeworks?: HomeworkAssignment[];
  /** Quick interactive projector quiz ("What's the output?" / Conceptual / Bug-Spot) */
  quickQuizzes?: QuickQuizQuestion[];
  gapNotes: GapFillingNote[];
  bugChallenges: BugFixChallenge[];
  rubric: {
    title: string;
    pageRange: string;
    auditNotice?: string;
    stages: RubricStage[];
  };
  /** Indicates whether full deep content is loaded or preview */
  contentStatus: 'complete' | 'preview';
}

export interface CurriculumModule {
  id: ModuleId;
  moduleNumber: number;
  persianNumber: string;
  title: string;
  subtitle: string;
  pageRange: string;
  engineLabel: string;
  accentColor: 'sky' | 'emerald' | 'amber' | 'violet' | 'rose';
  units: LearningUnit[];
}

export type RubricScore = 0 | 1 | 2 | 3; // 0 = not graded yet

export interface StudentRecord {
  id: string;
  name: string;
  /** unitId -> stageNumber -> score (0..3) */
  scores: Record<string, Record<number, RubricScore>>;
}

export interface ClassroomSettings {
  theme: 'light' | 'dark';
  fontScale: 'sm' | 'md' | 'lg' | 'xl';
  teacherMode: boolean;
  projectorMode: boolean;
  sidebarOpen: boolean;
}

export interface ClassroomState {
  version: number;
  settings: ClassroomSettings;
  activeUnitId: string;
  activeTab: UnitTabId;
  completedUnits: string[];
  /** Custom teacher notes per unitId */
  teacherNotes: Record<string, string>;
  /** Saved edited code snippets per exampleId / activityId */
  savedCode: Record<string, string>;
  students: StudentRecord[];
}
