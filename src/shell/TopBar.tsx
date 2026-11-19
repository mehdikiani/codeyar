import {
  GraduationCap,
  Menu,
  Moon,
  Presentation,
  StickyNote,
  Sun,
  Type,
  ChevronLeft,
} from 'lucide-react';
import type {ClassroomSettings, CurriculumModule, LearningUnit} from '../types/curriculum.ts';

interface TopBarProps {
  settings: ClassroomSettings;
  activeModule: CurriculumModule;
  activeUnit: LearningUnit;
  notesOpen: boolean;
  onToggleSidebar: () => void;
  onToggleTeacherMode: () => void;
  onToggleProjectorMode: () => void;
  onToggleTheme: () => void;
  onCycleFontScale: (dir: 'up' | 'down') => void;
  onToggleNotes: () => void;
}

const FONT_SCALE_LABELS: Record<ClassroomSettings['fontScale'], string> = {
  sm: 'کوچک',
  md: 'عادی',
  lg: 'بزرگ',
  xl: 'پروژکتور',
};

export function TopBar({
  settings,
  activeModule,
  activeUnit,
  notesOpen,
  onToggleSidebar,
  onToggleTeacherMode,
  onToggleProjectorMode,
  onToggleTheme,
  onCycleFontScale,
  onToggleNotes,
}: TopBarProps) {
  return (
    <header className="sticky top-0 z-30 flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 bg-white/95 px-4 py-2.5 backdrop-blur dark:border-slate-800 dark:bg-slate-900/95">
      {/* Right side (RTL start): Menu + Breadcrumb */}
      <div className="flex min-w-0 items-center gap-2.5">
        <button
          type="button"
          onClick={onToggleSidebar}
          aria-label="باز و بسته کردن فهرست پودمان‌ها"
          className="rounded-lg border border-slate-200 p-2 text-slate-600 transition hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
        >
          <Menu className="h-4 w-4" />
        </button>

        <div className="min-w-0">
          <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
            <span className="truncate font-semibold text-sky-700 dark:text-sky-400">
              پودمان {activeModule.persianNumber}: {activeModule.title}
            </span>
            <ChevronLeft className="h-3.5 w-3.5 shrink-0" />
            <span className="shrink-0">واحد {activeUnit.unitNumber}</span>
          </div>
          <h1 className="truncate text-sm font-extrabold text-slate-900 dark:text-white sm:text-base">
            {activeUnit.title}
          </h1>
        </div>
      </div>

      {/* Left side (RTL end): Classroom Controls */}
      <div className="flex flex-wrap items-center gap-1.5">
        {/* Teacher Mode Toggle (Shortcut: T) */}
        <button
          type="button"
          onClick={onToggleTeacherMode}
          title="فعال/غیرفعال کردن حالت مدرس (میانبر کیبورد: T)"
          className={`inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-bold transition ${
            settings.teacherMode
              ? 'border-violet-600 bg-violet-600 text-white shadow-sm'
              : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200'
          }`}
        >
          <GraduationCap className="h-4 w-4" />
          <span>حالت مدرس</span>
          <kbd className="hidden rounded bg-black/15 px-1.5 py-0.5 font-mono text-[10px] sm:inline">
            T
          </kbd>
        </button>

        {/* Projector Mode Toggle (Shortcut: P) */}
        <button
          type="button"
          onClick={onToggleProjectorMode}
          title="حالت ارائه روی ویدئوپروژکتور (میانبر کیبورد: P)"
          className={`inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-xs font-semibold transition ${
            settings.projectorMode
              ? 'border-sky-600 bg-sky-600 text-white'
              : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200'
          }`}
        >
          <Presentation className="h-4 w-4" />
          <span className="hidden md:inline">پروژکتور</span>
          <kbd className="hidden rounded bg-black/10 px-1 py-0.5 font-mono text-[10px] lg:inline">
            P
          </kbd>
        </button>

        {/* Font Scale Controls */}
        <div className="inline-flex items-center rounded-lg border border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-800">
          <button
            type="button"
            onClick={() => onCycleFontScale('down')}
            disabled={settings.fontScale === 'sm'}
            title="کوچک کردن فونت"
            className="px-2 py-1.5 text-xs font-bold text-slate-700 hover:bg-slate-100 disabled:opacity-40 dark:text-slate-200 dark:hover:bg-slate-700"
          >
            A-
          </button>
          <span className="hidden items-center gap-1 border-x border-slate-200 px-2 text-[11px] text-slate-500 dark:border-slate-700 dark:text-slate-400 xl:inline-flex">
            <Type className="h-3 w-3" />
            {FONT_SCALE_LABELS[settings.fontScale]}
          </span>
          <button
            type="button"
            onClick={() => onCycleFontScale('up')}
            disabled={settings.fontScale === 'xl'}
            title="بزرگ کردن فونت برای کلاس"
            className="px-2 py-1.5 text-xs font-bold text-slate-700 hover:bg-slate-100 disabled:opacity-40 dark:text-slate-200 dark:hover:bg-slate-700"
          >
            A+
          </button>
        </div>

        {/* Class Notes Drawer Toggle */}
        <button
          type="button"
          onClick={onToggleNotes}
          title="یادداشت‌های اختصاصی مدرس برای این واحد"
          className={`inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-xs font-semibold transition ${
            notesOpen
              ? 'border-amber-500 bg-amber-50 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300'
              : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200'
          }`}
        >
          <StickyNote className="h-4 w-4" />
          <span className="hidden sm:inline">یادداشت</span>
        </button>

        {/* Light/Dark Theme Toggle (Shortcut: D) */}
        <button
          type="button"
          onClick={onToggleTheme}
          title="تغییر تم روشن / تاریک (میانبر کیبورد: D)"
          className="rounded-lg border border-slate-200 bg-white p-2 text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-amber-300 dark:hover:bg-slate-700"
        >
          {settings.theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </button>
      </div>
    </header>
  );
}
