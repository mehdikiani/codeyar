import {useEffect, useState} from 'react';
import {
  AlertCircle,
  BookOpen,
  Check,
  ChevronDown,
  ChevronUp,
  Compass,
  Cpu,
  GraduationCap,
  Layers,
  Lightbulb,
  ShieldAlert,
  Sparkles,
  X,
} from 'lucide-react';
import type {ConceptLesson, ExampleTier} from '../types/curriculum.ts';
import {CodeSandboxPanel} from './CodeSandboxPanel.tsx';
import {toPersianDigits} from '../utils/rubricEvaluator.ts';

interface ConceptLessonWorkspaceProps {
  unitId: string;
  lessons: ConceptLesson[];
  teacherMode: boolean;
  dark: boolean;
  savedCode: Record<string, string>;
  onSaveCode: (key: string, code: string) => void;
}

const TIER_META: Record<
  ExampleTier,
  {label: string; shortLabel: string; badgeClass: string; activeClass: string}
> = {
  basic: {
    label: '۱. مثال پایه (گام اول)',
    shortLabel: 'پایه',
    badgeClass:
      'bg-emerald-100 text-emerald-800 border-emerald-200 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800',
    activeClass: 'border-emerald-600 bg-emerald-600 text-white shadow-sm',
  },
  practical: {
    label: '۲. مثال کاربردی (سناریوی واقعی)',
    shortLabel: 'کاربردی',
    badgeClass:
      'bg-sky-100 text-sky-800 border-sky-200 dark:bg-sky-950/60 dark:text-sky-300 dark:border-sky-800',
    activeClass: 'border-sky-600 bg-sky-600 text-white shadow-sm',
  },
  combined: {
    label: '۳. مثال ترکیبی (پیوند مفاهیم)',
    shortLabel: 'ترکیبی',
    badgeClass:
      'bg-violet-100 text-violet-800 border-violet-200 dark:bg-violet-950/60 dark:text-violet-300 dark:border-violet-800',
    activeClass: 'border-violet-600 bg-violet-600 text-white shadow-sm',
  },
  'what-if': {
    label: '۴. اگر اشتباه بنویسیم؟ (What-If)',
    shortLabel: 'خطای عمدی / مقایسه',
    badgeClass:
      'bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-800',
    activeClass: 'border-amber-600 bg-amber-600 text-white shadow-sm',
  },
};

export function ConceptLessonWorkspace({
  unitId,
  lessons,
  teacherMode,
  dark,
  savedCode,
  onSaveCode,
}: ConceptLessonWorkspaceProps) {
  const [lessonIdx, setLessonIdx] = useState(0);
  const [exampleIdx, setExampleIdx] = useState(0);
  const [lessonExpanded, setLessonExpanded] = useState(true);

  useEffect(() => {
    setLessonIdx(0);
    setExampleIdx(0);
    setLessonExpanded(true);
  }, [unitId]);

  const safeLessonIdx = Math.min(lessonIdx, Math.max(0, lessons.length - 1));
  const currentLesson = lessons[safeLessonIdx];

  const handleSelectLesson = (nextIdx: number) => {
    setLessonIdx(nextIdx);
    setExampleIdx(0);
  };

  if (!currentLesson) return null;

  const safeExampleIdx = Math.min(exampleIdx, Math.max(0, currentLesson.examples.length - 1));
  const currentExample = currentLesson.examples[safeExampleIdx];
  const totalExamplesInUnit = lessons.reduce((acc, l) => acc + l.examples.length, 0);

  return (
    <div className="space-y-4">
      {/* Compact Concept Chapter Navigation Bar */}
      <div className="rounded-xl border border-slate-200 bg-white p-3 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="flex flex-wrap items-center justify-between gap-2.5">
          <div className="flex min-w-0 flex-1 items-center gap-2">
            <span className="shrink-0 rounded-lg bg-sky-100 px-2.5 py-1 text-xs font-extrabold text-sky-800 dark:bg-sky-900/60 dark:text-sky-200">
              مبحث {toPersianDigits(safeLessonIdx + 1)} از {toPersianDigits(lessons.length)}
            </span>
            <select
              aria-label="انتخاب مبحث درسنامه"
              value={safeLessonIdx}
              onChange={(e) => handleSelectLesson(Number(e.target.value))}
              className="min-w-0 flex-1 rounded-lg border border-slate-300 bg-slate-50 px-3 py-1.5 text-xs font-bold text-slate-800 focus:border-sky-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
            >
              {lessons.map((les, idx) => (
                <option key={les.id} value={idx}>
                  مبحث {toPersianDigits(idx + 1)}: {les.title} (ص {les.bookPage}) —{' '}
                  {toPersianDigits(les.examples.length)} مثال
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-wrap items-center gap-1.5">
            <button
              type="button"
              disabled={safeLessonIdx === 0}
              onClick={() => handleSelectLesson(Math.max(0, safeLessonIdx - 1))}
              className="rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-bold text-slate-700 hover:bg-slate-50 disabled:opacity-40 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
            >
              مبحث قبلی
            </button>
            <div className="flex items-center gap-1">
              {lessons.map((les, idx) => (
                <button
                  key={les.id}
                  type="button"
                  title={`مبحث ${toPersianDigits(idx + 1)}: ${les.title}`}
                  onClick={() => handleSelectLesson(idx)}
                  className={`h-7 min-w-7 rounded-lg px-1.5 text-xs font-bold transition ${
                    idx === safeLessonIdx
                      ? 'bg-sky-600 text-white shadow-sm'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700'
                  }`}
                >
                  {toPersianDigits(idx + 1)}
                </button>
              ))}
            </div>
            <button
              type="button"
              disabled={safeLessonIdx === lessons.length - 1}
              onClick={() => handleSelectLesson(Math.min(lessons.length - 1, safeLessonIdx + 1))}
              className="rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-bold text-slate-700 hover:bg-slate-50 disabled:opacity-40 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
            >
              مبحث بعدی
            </button>
          </div>
        </div>
      </div>

      {/* SECTION A: Full Self-Contained Lesson Textbook Card */}
      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 px-5 py-3.5 dark:border-slate-800">
          <div>
            <div className="mb-0.5 flex flex-wrap items-center gap-2 text-[11px] font-bold text-slate-500 dark:text-slate-400">
              <span className="inline-flex items-center gap-1 text-sky-700 dark:text-sky-400">
                <BookOpen className="h-3.5 w-3.5" />
                درسنامه کامل و خودآموز
              </span>
              <span>•</span>
              <span>صفحات {currentLesson.bookPage} کتاب</span>
              <span>•</span>
              <span>
                {toPersianDigits(currentLesson.examples.length)} مثال سطح‌بندی‌شده (کل واحد:{' '}
                {toPersianDigits(totalExamplesInUnit)} مثال اجرایی)
              </span>
            </div>
            <h2 className="text-lg font-extrabold text-slate-900 dark:text-white">
              {toPersianDigits(currentLesson.order)}. {currentLesson.title}
            </h2>
          </div>

          <button
            type="button"
            onClick={() => setLessonExpanded((v) => !v)}
            className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-bold text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
          >
            {lessonExpanded ? (
              <>
                <ChevronUp className="h-4 w-4" />
                جمع کردن درسنامه (تمرکز روی کد)
              </>
            ) : (
              <>
                <ChevronDown className="h-4 w-4" />
                نمایش کامل درسنامه مبحث
              </>
            )}
          </button>
        </div>

        {lessonExpanded && (
          <div className="space-y-4 p-5">
            {/* Row 1: Why We Need It + Syntax Anatomy */}
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
              {/* 1. Why We Need It */}
              <div className="rounded-xl border border-sky-200/80 bg-sky-50/50 p-4 dark:border-sky-900/70 dark:bg-sky-950/30">
                <h3 className="mb-2 flex items-center gap-1.5 text-sm font-extrabold text-sky-900 dark:text-sky-200">
                  <Compass className="h-4 w-4 text-sky-600 dark:text-sky-400" />
                  ۱. چرا به این مفهوم نیاز داریم؟
                </h3>
                <p className="text-xs leading-7 text-slate-700 dark:text-slate-200">
                  {currentLesson.whyWeNeedIt.realWorldProblem}
                </p>
                <div className="mt-2.5 rounded-lg border border-sky-200 bg-white/80 p-3 text-xs leading-6 text-sky-950 dark:border-sky-900 dark:bg-slate-900/70 dark:text-sky-100">
                  <strong className="text-sky-700 dark:text-sky-300">تشبیه ملموس کلاسی: </strong>
                  {currentLesson.whyWeNeedIt.analogy}
                </div>
              </div>

              {/* 2. Syntax Anatomy */}
              <div className="rounded-xl border border-indigo-200/80 bg-indigo-50/40 p-4 dark:border-indigo-900/70 dark:bg-indigo-950/30">
                <h3 className="mb-2 flex items-center gap-1.5 text-sm font-extrabold text-indigo-900 dark:text-indigo-200">
                  <Layers className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                  ۲. کالبدشکافی ساختار (Syntax Anatomy)
                </h3>
                <pre
                  dir="ltr"
                  className="mb-3 overflow-auto rounded-lg bg-slate-950 p-3 text-left font-mono text-xs leading-6 text-sky-300"
                >
                  {currentLesson.syntaxAnatomy.template}
                </pre>
                <div className="space-y-1.5">
                  {currentLesson.syntaxAnatomy.parts.map((part, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-2 rounded-lg bg-white/85 px-2.5 py-1.5 text-xs dark:bg-slate-900/80"
                    >
                      <code
                        dir="ltr"
                        className="shrink-0 rounded bg-indigo-100 px-1.5 py-0.5 font-mono text-[11px] font-bold text-indigo-900 dark:bg-indigo-900/60 dark:text-indigo-200"
                      >
                        {part.token}
                      </code>
                      <span className="leading-5 text-slate-700 dark:text-slate-200">{part.role}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* 3. Behind the Scenes (Teacher Deep Dive) */}
            <div className="rounded-xl border border-violet-200/90 bg-violet-50/50 p-4 dark:border-violet-900/70 dark:bg-violet-950/30">
              <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                <h3 className="flex items-center gap-1.5 text-sm font-extrabold text-violet-900 dark:text-violet-200">
                  <Cpu className="h-4 w-4 text-violet-600 dark:text-violet-400" />
                  ۳. پشت صحنه چه اتفاقی می‌افتد؟ (تسلط مفهومی مدرس در پاسخ به سؤال‌های چالشی)
                </h3>
                {teacherMode && (
                  <span className="rounded-md bg-violet-600 px-2 py-0.5 text-[10px] font-bold text-white">
                    پیشنهاد ویژه برای تدریس بدون استرس
                  </span>
                )}
              </div>
              <ul className="grid grid-cols-1 gap-2 md:grid-cols-2">
                {currentLesson.behindTheScenes.map((item, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2 rounded-lg bg-white/80 p-2.5 text-xs leading-6 text-slate-700 dark:bg-slate-900/70 dark:text-slate-200"
                  >
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-violet-100 text-[10px] font-extrabold text-violet-800 dark:bg-violet-900 dark:text-violet-200">
                      {toPersianDigits(idx + 1)}
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* 4. Golden Tips & Wrong vs Right */}
            <div className="rounded-xl border border-amber-200/90 bg-amber-50/40 p-4 dark:border-amber-900/70 dark:bg-amber-950/20">
              <h3 className="mb-2.5 flex items-center gap-1.5 text-sm font-extrabold text-amber-900 dark:text-amber-200">
                <ShieldAlert className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                ۴. نکات طلایی و تله‌های رایج (مقایسه روش اشتباه ✗ در برابر استاندارد ✓)
              </h3>

              <ul className="mb-3 space-y-1 text-xs leading-6 text-slate-800 dark:text-slate-200">
                {currentLesson.goldenTips.map((tip, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <Lightbulb className="mt-1 h-3.5 w-3.5 shrink-0 text-amber-600" />
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>

              <div className="space-y-3">
                {currentLesson.wrongVsRight.map((pair, idx) => (
                  <div
                    key={idx}
                    className="rounded-xl border border-slate-200 bg-white p-3 dark:border-slate-800 dark:bg-slate-900"
                  >
                    <div className="mb-2 text-xs font-extrabold text-slate-900 dark:text-white">
                      {pair.title}
                    </div>
                    <div className="grid grid-cols-1 gap-2.5 md:grid-cols-2">
                      <div className="rounded-lg border border-rose-200 bg-rose-50/70 p-2.5 dark:border-rose-900/70 dark:bg-rose-950/30">
                        <div className="mb-1 flex items-center gap-1 text-[11px] font-bold text-rose-700 dark:text-rose-300">
                          <X className="h-3.5 w-3.5" />
                          روش اشتباه
                        </div>
                        <pre
                          dir="ltr"
                          className="overflow-auto whitespace-pre-wrap break-words rounded bg-slate-950 p-2.5 text-left font-mono text-[11.5px] leading-5 text-rose-300"
                        >
                          {pair.wrongCode}
                        </pre>
                      </div>
                      <div className="rounded-lg border border-emerald-200 bg-emerald-50/70 p-2.5 dark:border-emerald-900/70 dark:bg-emerald-950/30">
                        <div className="mb-1 flex items-center gap-1 text-[11px] font-bold text-emerald-700 dark:text-emerald-300">
                          <Check className="h-3.5 w-3.5" />
                          روش استاندارد
                        </div>
                        <pre
                          dir="ltr"
                          className="overflow-auto whitespace-pre-wrap break-words rounded bg-slate-950 p-2.5 text-left font-mono text-[11.5px] leading-5 text-emerald-300"
                        >
                          {pair.rightCode}
                        </pre>
                      </div>
                    </div>
                    <p className="mt-2 text-[11px] leading-5 text-slate-600 dark:text-slate-300">
                      {pair.explanation}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* SECTION B: Tiered Examples Switcher & Live Interactive Lab */}
      {currentExample && (
        <div className="space-y-4">
          <div className="rounded-xl border border-slate-200 bg-white p-3.5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="mb-2.5 flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-1.5 text-xs font-extrabold text-slate-800 dark:text-slate-100">
                <Sparkles className="h-4 w-4 text-sky-600" />
                مثال‌های سطح‌بندی‌شده مبحث «{currentLesson.title}» (انتخاب کنید و زنده اجرا بگیرید):
              </div>
              <span className="text-[11px] text-slate-500">
                مثال {toPersianDigits(safeExampleIdx + 1)} از {toPersianDigits(currentLesson.examples.length)}
              </span>
            </div>

            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-4">
              {currentLesson.examples.map((ex, idx) => {
                const tierMeta = TIER_META[ex.tier];
                const isActive = idx === safeExampleIdx;
                return (
                  <button
                    key={ex.id}
                    type="button"
                    onClick={() => setExampleIdx(idx)}
                    className={`flex flex-col items-start gap-1 rounded-xl border p-2.5 text-right transition ${
                      isActive
                        ? tierMeta.activeClass
                        : 'border-slate-200 bg-slate-50/70 text-slate-700 hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-950/60 dark:text-slate-200 dark:hover:bg-slate-800'
                    }`}
                  >
                    <span
                      className={`rounded px-1.5 py-0.5 text-[10px] font-extrabold ${
                        isActive ? 'bg-white/20 text-white' : tierMeta.badgeClass
                      }`}
                    >
                      {tierMeta.label}
                    </span>
                    <span className="line-clamp-2 text-xs font-bold leading-5">{ex.title}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-5 lg:grid-cols-12">
            {/* Explanation + Teacher Mode Line-by-Line Guide */}
            <div className="space-y-4 lg:col-span-5">
              <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                <div className="mb-1.5 flex flex-wrap items-center justify-between gap-2">
                  <span
                    className={`rounded-md border px-2 py-0.5 text-[11px] font-bold ${
                      TIER_META[currentExample.tier].badgeClass
                    }`}
                  >
                    {TIER_META[currentExample.tier].label}
                  </span>
                  {currentExample.bookPage && (
                    <span className="text-xs text-slate-500">صفحه {currentExample.bookPage}</span>
                  )}
                </div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  {currentExample.title}
                </h3>
                <p className="mt-1 text-sm leading-7 text-slate-700 dark:text-slate-300">
                  {currentExample.summary}
                </p>

                {currentExample.bookCorrection && (
                  <div className="mt-3 rounded-lg border border-amber-200 bg-amber-50 p-3 text-xs leading-6 text-amber-950 dark:border-amber-900 dark:bg-amber-950/50 dark:text-amber-200">
                    <div className="mb-1 flex items-center gap-1.5 font-bold">
                      <AlertCircle className="h-4 w-4 text-amber-600" />
                      اصلاح خطای کتاب (صفحه {toPersianDigits(currentExample.bookCorrection.page)}):
                    </div>
                    <div>
                      <strong>ایراد کتاب:</strong> {currentExample.bookCorrection.issue}
                    </div>
                    <div className="mt-0.5">
                      <strong>اصلاح اعمال‌شده:</strong> {currentExample.bookCorrection.fix}
                    </div>
                  </div>
                )}
              </div>

              {teacherMode ? (
                <div className="space-y-3 rounded-xl border border-violet-300 bg-violet-50/70 p-4 dark:border-violet-800 dark:bg-violet-950/40">
                  <div className="flex items-center gap-2 text-xs font-extrabold text-violet-900 dark:text-violet-200">
                    <GraduationCap className="h-4 w-4" />
                    راهنمای تدریس مدرس (چه چیزی را چگونه توضیح دهید)
                  </div>

                  <div>
                    <div className="mb-1 text-[11px] font-bold text-violet-800 dark:text-violet-300">
                      نکات گفتاری مرحله‌به‌مرحله:
                    </div>
                    <ul className="space-y-1 text-xs leading-6 text-slate-800 dark:text-slate-200">
                      {currentExample.teacherTalkingPoints.map((pt, i) => (
                        <li key={i}>• {pt}</li>
                      ))}
                    </ul>
                  </div>

                  {currentExample.classroomQuestion && (
                    <div className="rounded-lg border border-amber-200 bg-amber-50/90 p-2.5 text-xs leading-6 text-amber-950 dark:border-amber-900 dark:bg-amber-950/50 dark:text-amber-200">
                      <strong>سؤال کلاسی برای درگیر کردن هنرجویان: </strong>
                      {currentExample.classroomQuestion}
                    </div>
                  )}

                  {currentExample.lineExplanations.length > 0 && (
                    <div className="border-t border-violet-200 pt-2.5 dark:border-violet-800">
                      <div className="mb-1.5 text-[11px] font-bold text-violet-800 dark:text-violet-300">
                        توضیح خط‌به‌خط کد:
                      </div>
                      <div className="space-y-1.5">
                        {currentExample.lineExplanations.map((le) => (
                          <div
                            key={le.line}
                            className="flex items-start gap-2 rounded-md bg-white/80 p-2 text-xs dark:bg-slate-900/70"
                          >
                            <span className="shrink-0 rounded bg-violet-600 px-1.5 py-0.5 font-mono text-[10px] font-bold text-white">
                              L{le.line}
                            </span>
                            <span className="leading-5 text-slate-700 dark:text-slate-200">
                              {le.explanation}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {currentExample.commonMistakes.length > 0 && (
                    <div className="border-t border-violet-200 pt-2.5 dark:border-violet-800">
                      <div className="mb-1 text-[11px] font-bold text-rose-700 dark:text-rose-300">
                        خطاهای رایج هنرجویان و روش رفع زنده:
                      </div>
                      <ul className="space-y-1 text-xs leading-6 text-slate-800 dark:text-slate-200">
                        {currentExample.commonMistakes.map((m, i) => (
                          <li key={i}>• {m}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ) : (
                <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50/70 p-4 text-xs leading-6 text-slate-600 dark:border-slate-700 dark:bg-slate-900/50 dark:text-slate-400">
                  برای مشاهده توضیحات خط‌به‌خط، نکات گفتاری و سؤال کلاسی این مثال، کلید{' '}
                  <strong>«حالت مدرس»</strong> را بزنید یا کلید{' '}
                  <kbd className="rounded bg-slate-200 px-1.5 py-0.5 font-mono text-[11px] dark:bg-slate-800">
                    T
                  </kbd>{' '}
                  را فشار دهید.
                </div>
              )}
            </div>

            {/* Live Sandbox */}
            <div className="lg:col-span-7">
              <CodeSandboxPanel
                sandboxKey={`example-${currentExample.id}`}
                engine={currentExample.engine}
                language={currentExample.language}
                initialCode={currentExample.code}
                initialCss={currentExample.cssCode}
                initialJs={currentExample.jsCode}
                initialFiles={currentExample.extraFiles}
                useBootstrap={currentExample.useBootstrap}
                dark={dark}
                savedCode={savedCode[`example-${currentExample.id}`]}
                onCodeSave={(next) => onSaveCode(`example-${currentExample.id}`, next)}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
