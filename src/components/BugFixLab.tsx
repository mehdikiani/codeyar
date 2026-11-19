import {useState} from 'react';
import {Bug, CheckCircle2, Eye, HelpCircle} from 'lucide-react';
import type {BugFixChallenge} from '../types/curriculum.ts';
import {CodeSandboxPanel} from './CodeSandboxPanel.tsx';

interface BugFixLabProps {
  challenge: BugFixChallenge;
  teacherMode: boolean;
  dark: boolean;
}

export function BugFixLab({challenge, teacherMode, dark}: BugFixLabProps) {
  const [showHint, setShowHint] = useState(false);
  const [loadedCode, setLoadedCode] = useState(challenge.buggyCode);
  const [showTeacherFix, setShowTeacherFix] = useState(false);

  return (
    <div className="rounded-xl border border-rose-200/80 bg-white p-4 shadow-sm dark:border-rose-900/60 dark:bg-slate-900">
      <div className="mb-3 flex flex-wrap items-start justify-between gap-2">
        <div>
          <div className="mb-1 flex items-center gap-2">
            <span className="inline-flex items-center gap-1 rounded-md bg-rose-100 px-2 py-0.5 text-[11px] font-bold text-rose-800 dark:bg-rose-950 dark:text-rose-300">
              <Bug className="h-3.5 w-3.5" />
              چالش خطایابی زنده
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400">{challenge.sourceLabel}</span>
          </div>
          <h4 className="text-base font-bold text-slate-900 dark:text-white">{challenge.title}</h4>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setShowHint((v) => !v)}
            className="inline-flex items-center gap-1 rounded-lg border border-amber-200 bg-amber-50 px-2.5 py-1.5 text-xs font-semibold text-amber-800 hover:bg-amber-100 dark:border-amber-900 dark:bg-amber-950/60 dark:text-amber-300"
          >
            <HelpCircle className="h-3.5 w-3.5" />
            سرنخ خطایابی
          </button>

          {teacherMode && (
            <button
              type="button"
              onClick={() => setShowTeacherFix((v) => !v)}
              className="inline-flex items-center gap-1 rounded-lg bg-emerald-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-emerald-700"
            >
              <Eye className="h-3.5 w-3.5" />
              {showTeacherFix ? 'بستن پاسخ مدرس' : 'توضیح و اصلاح مدرس'}
            </button>
          )}
        </div>
      </div>

      <p className="mb-3 text-sm leading-7 text-slate-700 dark:text-slate-300">{challenge.description}</p>

      {showHint && (
        <div className="mb-3 rounded-lg border border-amber-200 bg-amber-50/80 p-3 text-xs leading-6 text-amber-950 dark:border-amber-900 dark:bg-amber-950/40 dark:text-amber-200">
          <strong>سرنخ:</strong> {challenge.hint}
        </div>
      )}

      {teacherMode && showTeacherFix && (
        <div className="mb-3 rounded-lg border border-emerald-200 bg-emerald-50/80 p-3 text-xs leading-6 text-emerald-950 dark:border-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-200">
          <div className="mb-1 flex items-center gap-1.5 font-bold">
            <CheckCircle2 className="h-4 w-4 text-emerald-600" />
            چه بگویید؟ (توضیح خطا برای بیان در کلاس):
          </div>
          <p>{challenge.teacherExplanation}</p>
          {challenge.classroomQuestion && (
            <div className="mt-2 rounded-md border border-amber-200 bg-amber-50/80 p-2 text-amber-950 dark:border-amber-900 dark:bg-amber-950/40 dark:text-amber-200">
              <strong>سؤال کلاسی:</strong> {challenge.classroomQuestion}
            </div>
          )}
          <button
            type="button"
            onClick={() => setLoadedCode(challenge.fixedCode)}
            className="mt-2 rounded-md bg-emerald-600 px-3 py-1 font-semibold text-white hover:bg-emerald-700"
          >
            اعمال کد اصلاح‌شده در ویرایشگر
          </button>
        </div>
      )}

      <CodeSandboxPanel
        sandboxKey={`bug-${challenge.id}`}
        engine={challenge.engine}
        language={challenge.language}
        initialCode={challenge.buggyCode}
        savedCode={loadedCode}
        onCodeSave={setLoadedCode}
        useBootstrap={challenge.useBootstrap}
        dark={dark}
      />
    </div>
  );
}
