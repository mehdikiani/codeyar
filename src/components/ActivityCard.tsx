import {useState} from 'react';
import {
  Eye,
  EyeOff,
  Lightbulb,
  Wrench,
  Sparkles,
  FolderGit2,
  BookOpen,
  Clock,
  ListChecks,
  GitBranch,
} from 'lucide-react';
import type {ClassroomActivity} from '../types/curriculum.ts';
import {CodeSandboxPanel} from './CodeSandboxPanel.tsx';
import {toPersianDigits} from '../utils/rubricEvaluator.ts';

interface ActivityCardProps {
  activity: ClassroomActivity;
  index?: number;
  teacherMode: boolean;
  dark: boolean;
  savedCode?: string;
  onCodeSave: (code: string) => void;
}

const KIND_META = {
  activity: {
    label: 'فعالیت کلاسی',
    icon: BookOpen,
    color: 'text-sky-700 bg-sky-50 border-sky-200 dark:text-sky-300 dark:bg-sky-950/60 dark:border-sky-800',
  },
  workshop: {
    label: 'کار کارگاهی',
    icon: Wrench,
    color: 'text-emerald-700 bg-emerald-50 border-emerald-200 dark:text-emerald-300 dark:bg-emerald-950/60 dark:border-emerald-800',
  },
  curiosity: {
    label: 'کنجکاوی',
    icon: Sparkles,
    color: 'text-amber-700 bg-amber-50 border-amber-200 dark:text-amber-300 dark:bg-amber-950/60 dark:border-amber-800',
  },
  project: {
    label: 'پروژه پودمان',
    icon: FolderGit2,
    color: 'text-violet-700 bg-violet-50 border-violet-200 dark:text-violet-300 dark:bg-violet-950/60 dark:border-violet-800',
  },
};

export function ActivityCard({
  activity,
  index,
  teacherMode,
  dark,
  savedCode,
  onCodeSave,
}: ActivityCardProps) {
  const [hintIndex, setHintIndex] = useState(0);
  const [showSolution, setShowSolution] = useState(false);
  const [showAlternative, setShowAlternative] = useState(false);

  const meta = KIND_META[activity.kind];
  const Icon = meta.icon;

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="mb-3 flex flex-wrap items-start justify-between gap-2">
        <div>
          <div className="mb-1.5 flex flex-wrap items-center gap-2">
            {index !== undefined && (
              <span className="rounded-md bg-slate-900 px-2 py-0.5 text-[11px] font-extrabold text-white dark:bg-slate-100 dark:text-slate-900">
                تمرین {toPersianDigits(index + 1)}
              </span>
            )}
            <span className={`inline-flex items-center gap-1 rounded-md border px-2 py-0.5 text-[11px] font-bold ${meta.color}`}>
              <Icon className="h-3.5 w-3.5" />
              {meta.label}
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400">صفحه {activity.bookPage}</span>
            {activity.estimatedMinutes && (
              <span className="inline-flex items-center gap-1 rounded-md bg-slate-100 px-2 py-0.5 text-[11px] font-semibold text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                <Clock className="h-3 w-3" />
                {toPersianDigits(activity.estimatedMinutes)} دقیقه
              </span>
            )}
          </div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white">{activity.title}</h3>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {activity.hints.length > 0 && (
            <button
              type="button"
              onClick={() => setHintIndex((i) => Math.min(activity.hints.length, i + 1))}
              disabled={hintIndex >= activity.hints.length}
              className="inline-flex items-center gap-1.5 rounded-lg border border-amber-200 bg-amber-50 px-3 py-1.5 text-xs font-semibold text-amber-800 hover:bg-amber-100 disabled:opacity-50 dark:border-amber-900 dark:bg-amber-950/60 dark:text-amber-300"
            >
              <Lightbulb className="h-3.5 w-3.5" />
              راهنمایی ({toPersianDigits(hintIndex)}/{toPersianDigits(activity.hints.length)})
            </button>
          )}

          {teacherMode && (
            <button
              type="button"
              onClick={() => setShowSolution((v) => !v)}
              className="inline-flex items-center gap-1.5 rounded-lg bg-violet-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-violet-700"
            >
              {showSolution ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
              {showSolution ? 'پنهان کردن پاسخ مدرس' : 'نمایش پاسخ کامل (ویژه مدرس)'}
            </button>
          )}
        </div>
      </div>

      <p className="mb-3 text-sm leading-7 text-slate-700 dark:text-slate-300">{activity.prompt}</p>

      {/* Step-by-step guided roadmap */}
      {activity.steps && activity.steps.length > 0 && (
        <div className="mb-3 rounded-lg border border-slate-200 bg-slate-50/80 p-3 dark:border-slate-800 dark:bg-slate-950/50">
          <div className="mb-1.5 flex items-center gap-1.5 text-xs font-bold text-slate-800 dark:text-slate-200">
            <ListChecks className="h-3.5 w-3.5 text-sky-600" />
            گام‌های پیشنهادی حل در کلاس:
          </div>
          <ol className="space-y-1 text-xs leading-6 text-slate-700 dark:text-slate-300">
            {activity.steps.map((st, idx) => (
              <li key={idx}>
                <strong>{toPersianDigits(idx + 1)}.</strong> {st}
              </li>
            ))}
          </ol>
        </div>
      )}

      {/* Progressive Hints */}
      {hintIndex > 0 && (
        <div className="mb-3 space-y-1.5 rounded-lg border border-amber-200 bg-amber-50/70 p-3 text-xs text-amber-950 dark:border-amber-900 dark:bg-amber-950/40 dark:text-amber-200">
          {activity.hints.slice(0, hintIndex).map((h, idx) => (
            <div key={idx} className="flex items-start gap-2">
              <Lightbulb className="mt-0.5 h-3.5 w-3.5 shrink-0 text-amber-600" />
              <span>{h}</span>
            </div>
          ))}
        </div>
      )}

      {/* Teacher-Only Model Answer + Alternative Solution */}
      {teacherMode && showSolution && (
        <div className="mb-4 space-y-3 rounded-xl border border-violet-300 bg-violet-50/70 p-3.5 dark:border-violet-800 dark:bg-violet-950/40">
          <div>
            <div className="mb-1.5 text-xs font-bold text-violet-900 dark:text-violet-200">
              پاسخ نمونه استاندارد (ویژه مدرس):
            </div>
            <p className="mb-2 text-xs leading-6 text-slate-700 dark:text-slate-300">
              {activity.solutionExplanation}
            </p>
            <pre
              dir="ltr"
              className="overflow-auto rounded-lg bg-slate-950 p-3 text-left font-mono text-xs leading-6 text-emerald-300"
            >
              {activity.solutionCode}
            </pre>
            <div className="mt-2 flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => onCodeSave(activity.solutionCode)}
                className="rounded-lg bg-violet-600 px-3 py-1 text-xs font-semibold text-white hover:bg-violet-700"
              >
                بارگذاری پاسخ استاندارد در ویرایشگر
              </button>
              {activity.alternativeSolutionCode && (
                <button
                  type="button"
                  onClick={() => setShowAlternative((v) => !v)}
                  className="inline-flex items-center gap-1 rounded-lg border border-violet-300 bg-white px-3 py-1 text-xs font-semibold text-violet-800 hover:bg-violet-100 dark:border-violet-700 dark:bg-slate-900 dark:text-violet-200"
                >
                  <GitBranch className="h-3.5 w-3.5" />
                  {showAlternative ? 'بستن روش جایگزین' : 'مشاهده روش حل جایگزین'}
                </button>
              )}
            </div>
          </div>

          {showAlternative && activity.alternativeSolutionCode && (
            <div className="border-t border-violet-200 pt-3 dark:border-violet-800">
              <div className="mb-1 text-xs font-bold text-indigo-900 dark:text-indigo-200">
                روش حل جایگزین (برای هنرجویان کنجکاو یا سریع‌تر):
              </div>
              {activity.alternativeSolutionExplanation && (
                <p className="mb-2 text-xs leading-6 text-slate-700 dark:text-slate-300">
                  {activity.alternativeSolutionExplanation}
                </p>
              )}
              <pre
                dir="ltr"
                className="overflow-auto rounded-lg bg-slate-950 p-3 text-left font-mono text-xs leading-6 text-sky-300"
              >
                {activity.alternativeSolutionCode}
              </pre>
              <button
                type="button"
                onClick={() => onCodeSave(activity.alternativeSolutionCode!)}
                className="mt-2 rounded-lg bg-indigo-600 px-3 py-1 text-xs font-semibold text-white hover:bg-indigo-700"
              >
                بارگذاری روش جایگزین در ویرایشگر
              </button>
            </div>
          )}
        </div>
      )}

      <CodeSandboxPanel
        sandboxKey={`activity-${activity.id}`}
        engine={activity.engine}
        language={activity.language}
        initialCode={activity.starterCode}
        initialCss={activity.cssStarter}
        initialJs={activity.jsStarter}
        initialFiles={activity.extraFiles}
        useBootstrap={activity.useBootstrap}
        dark={dark}
        savedCode={savedCode}
        onCodeSave={onCodeSave}
      />
    </div>
  );
}
