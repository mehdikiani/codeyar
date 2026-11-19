import {useEffect, useState} from 'react';
import {
  AlertCircle,
  Award,
  BookOpen,
  Bug,
  CheckCircle2,
  ClipboardList,
  Clock,
  Code2,
  Eye,
  GraduationCap,
  HelpCircle,
  Layers,
  Lightbulb,
  Sparkles,
  Wrench,
} from 'lucide-react';
import type {
  LearningUnit,
  RubricScore,
  StudentRecord,
  UnitTabId,
} from '../types/curriculum.ts';
import {CodeSandboxPanel} from '../components/CodeSandboxPanel.tsx';
import {ActivityCard} from '../components/ActivityCard.tsx';
import {BugFixLab} from '../components/BugFixLab.tsx';
import {ConceptLessonWorkspace} from '../components/ConceptLessonWorkspace.tsx';
import {HomeworkBankPanel} from '../components/HomeworkBankPanel.tsx';
import {QuickQuizBoard} from '../components/QuickQuizBoard.tsx';
import {VisualLabRegistry} from '../components/visualizers/VisualLabRegistry.tsx';
import {RubricMatrix} from './RubricMatrix.tsx';
import {toPersianDigits} from '../utils/rubricEvaluator.ts';

interface UnitWorkspaceProps {
  unit: LearningUnit;
  activeTab: UnitTabId;
  teacherMode: boolean;
  dark: boolean;
  savedCode: Record<string, string>;
  students: StudentRecord[];
  onTabChange: (tab: UnitTabId) => void;
  onSaveCode: (key: string, code: string) => void;
  onScoreChange: (studentId: string, stageNumber: number, score: RubricScore) => void;
  onAddStudent: (name: string) => void;
  onRemoveStudent: (studentId: string) => void;
}

const TABS: {id: UnitTabId; num: string; label: string; icon: typeof BookOpen}[] = [
  {id: 'overview', num: '۱', label: 'نقشه درس', icon: BookOpen},
  {id: 'visual-lab', num: '۲', label: 'شهود بصری', icon: Layers},
  {id: 'live-examples', num: '۳', label: 'درسنامه و مثال‌ها', icon: Code2},
  {id: 'workshops', num: '۴', label: 'کارگاه کلاسی', icon: Wrench},
  {id: 'homework', num: '۵', label: 'تکلیف منزل', icon: ClipboardList},
  {id: 'quick-quiz', num: '۶', label: 'آزمونک سریع', icon: Sparkles},
  {id: 'tips-debugging', num: '۷', label: 'خطایابی کتاب', icon: Bug},
  {id: 'rubric', num: '۸', label: 'ارزشیابی', icon: Award},
];

export function UnitWorkspace({
  unit,
  activeTab,
  teacherMode,
  dark,
  savedCode,
  students,
  onTabChange,
  onSaveCode,
  onScoreChange,
  onAddStudent,
  onRemoveStudent,
}: UnitWorkspaceProps) {
  const [selectedExampleIdx, setSelectedExampleIdx] = useState(0);
  const [revealedWarmups, setRevealedWarmups] = useState<Record<number, boolean>>({});

  useEffect(() => {
    setSelectedExampleIdx(0);
    setRevealedWarmups({});
  }, [unit.id]);

  const safeExampleIdx = Math.min(selectedExampleIdx, Math.max(0, unit.examples.length - 1));
  const currentExample = unit.examples[safeExampleIdx];

  const totalExamplesCount = unit.lessons
    ? unit.lessons.reduce((acc, l) => acc + l.examples.length, 0)
    : unit.examples.length;

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-5 p-4 sm:p-6">
      {/* 8-Step Pedagogical Navigation Bar */}
      <nav
        aria-label="گام‌های تدریس واحد یادگیری"
        className="grid grid-cols-2 gap-1.5 rounded-xl border border-slate-200 bg-white p-1.5 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:grid-cols-4 xl:grid-cols-8 print:hidden"
      >
        {TABS.map((tab) => {
          const Icon = tab.icon;
          const active = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onTabChange(tab.id)}
              className={`flex items-center justify-center gap-1 rounded-lg px-2 py-2.5 text-[11px] font-bold transition ${
                active
                  ? 'bg-sky-600 text-white shadow-sm'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white'
              }`}
            >
              <Icon className="h-3.5 w-3.5 shrink-0" />
              <span className="truncate">
                {tab.num}. {tab.label}
              </span>
            </button>
          );
        })}
      </nav>

      {/* TAB 1: Overview & Learning Objectives */}
      {activeTab === 'overview' && (
        <div className="space-y-5">
          {/* Unit Hero Summary Card */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <div className="mb-1.5 flex flex-wrap items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                  <span className="font-bold text-sky-700 dark:text-sky-400">
                    واحد یادگیری {unit.unitNumber}
                  </span>
                  <span>•</span>
                  <span>صفحات کتاب: {unit.pageRange}</span>
                  <span>•</span>
                  <span className="inline-flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" />
                    زمان پیشنهادی: {toPersianDigits(unit.estimatedMinutes)} دقیقه
                  </span>
                </div>
                <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">
                  {unit.title}
                </h2>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                  پروژه شاخص واحد:{' '}
                  <strong className="text-slate-900 dark:text-white">{unit.flagshipProject}</strong>
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() => onTabChange('visual-lab')}
                  className="rounded-xl bg-sky-600 px-4 py-2.5 text-xs font-bold text-white shadow-sm transition hover:bg-sky-700"
                >
                  شروع از شهود بصری ←
                </button>
                <button
                  type="button"
                  onClick={() => onTabChange('live-examples')}
                  className="rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-xs font-bold text-slate-800 shadow-sm transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
                >
                  ورود به درسنامه ({toPersianDigits(totalExamplesCount)} مثال)
                </button>
              </div>
            </div>

            {/* Quick Unit Content Inventory Strip */}
            <div className="mt-4 grid grid-cols-2 gap-2 border-t border-slate-100 pt-4 dark:border-slate-800 sm:grid-cols-4">
              <button
                type="button"
                onClick={() => onTabChange('live-examples')}
                className="rounded-xl border border-slate-200 bg-slate-50/70 p-2.5 text-right transition hover:border-sky-300 dark:border-slate-800 dark:bg-slate-950/40"
              >
                <div className="text-[11px] font-bold text-slate-500">درسنامه و مثال اجرایی</div>
                <div className="mt-0.5 text-sm font-extrabold text-sky-700 dark:text-sky-400">
                  {unit.lessons ? `${toPersianDigits(unit.lessons.length)} مبحث / ` : ''}
                  {toPersianDigits(totalExamplesCount)} مثال زنده
                </div>
              </button>
              <button
                type="button"
                onClick={() => onTabChange('workshops')}
                className="rounded-xl border border-slate-200 bg-slate-50/70 p-2.5 text-right transition hover:border-emerald-300 dark:border-slate-800 dark:bg-slate-950/40"
              >
                <div className="text-[11px] font-bold text-slate-500">کارگاه و تمرین کلاسی</div>
                <div className="mt-0.5 text-sm font-extrabold text-emerald-700 dark:text-emerald-400">
                  {toPersianDigits(unit.activities.length)} تمرین و پروژه
                </div>
              </button>
              <button
                type="button"
                onClick={() => onTabChange('homework')}
                className="rounded-xl border border-slate-200 bg-slate-50/70 p-2.5 text-right transition hover:border-amber-300 dark:border-slate-800 dark:bg-slate-950/40"
              >
                <div className="text-[11px] font-bold text-slate-500">بانک تکلیف منزل</div>
                <div className="mt-0.5 text-sm font-extrabold text-amber-700 dark:text-amber-400">
                  {toPersianDigits(unit.homeworks?.length ?? 0)} تکلیف سطح‌بندی‌شده
                </div>
              </button>
              <button
                type="button"
                onClick={() => onTabChange('quick-quiz')}
                className="rounded-xl border border-slate-200 bg-slate-50/70 p-2.5 text-right transition hover:border-violet-300 dark:border-slate-800 dark:bg-slate-950/40"
              >
                <div className="text-[11px] font-bold text-slate-500">آزمونک سریع پای تخته</div>
                <div className="mt-0.5 text-sm font-extrabold text-violet-700 dark:text-violet-400">
                  {toPersianDigits(unit.quickQuizzes?.length ?? 0)} پرسش تعاملی
                </div>
              </button>
            </div>

            {/* Learning Objectives */}
            <div className="mt-4 border-t border-slate-100 pt-4 dark:border-slate-800">
              <h3 className="mb-3 text-sm font-bold text-slate-900 dark:text-white">
                اهداف و پیامدهای یادگیری (مطابق سرفصل رسمی کتاب ۱۴۰۵)
              </h3>
              <ul className="grid grid-cols-1 gap-2 md:grid-cols-2">
                {unit.objectives.map((obj, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2 rounded-lg border border-slate-100 bg-slate-50/70 p-2.5 text-xs leading-6 text-slate-700 dark:border-slate-800 dark:bg-slate-950/40 dark:text-slate-200"
                  >
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600 dark:text-emerald-400" />
                    <span>{obj}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Warm-up Questions («آیا تا به حال اندیشیده‌اید») */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <h3 className="mb-3 flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-white">
              <HelpCircle className="h-4 w-4 text-amber-500" />
              پرسش‌های آغازین کلاس («آیا تا به حال اندیشیده‌اید؟»)
            </h3>
            <div className="space-y-3">
              {unit.warmupQuestions.map((q, idx) => (
                <div
                  key={idx}
                  className="rounded-xl border border-slate-200 bg-slate-50/60 p-3.5 dark:border-slate-800 dark:bg-slate-950/50"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">
                      {q.question}
                    </p>
                    {teacherMode && (
                      <button
                        type="button"
                        onClick={() =>
                          setRevealedWarmups((prev) => ({...prev, [idx]: !prev[idx]}))
                        }
                        className="inline-flex items-center gap-1 rounded-md bg-violet-100 px-2.5 py-1 text-[11px] font-bold text-violet-800 dark:bg-violet-950 dark:text-violet-300"
                      >
                        <Eye className="h-3.5 w-3.5" />
                        {revealedWarmups[idx] ? 'بستن جمع‌بندی مدرس' : 'پاسخ پیشنهادی مدرس'}
                      </button>
                    )}
                  </div>
                  {teacherMode && revealedWarmups[idx] && (
                    <p className="mt-2.5 border-t border-slate-200 pt-2 text-xs leading-6 text-violet-900 dark:border-slate-800 dark:text-violet-200">
                      {q.teacherAnswer}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Teacher Mode Overview Guide */}
          {teacherMode && (
            <div className="rounded-2xl border border-violet-300 bg-violet-50/70 p-5 dark:border-violet-800 dark:bg-violet-950/40">
              <h3 className="mb-2.5 flex items-center gap-2 text-sm font-bold text-violet-900 dark:text-violet-200">
                <GraduationCap className="h-4 w-4" />
                نقشه راه گفتاری مدرس برای شروع این واحد
              </h3>
              <ul className="space-y-1.5 text-xs leading-6 text-violet-950 dark:text-violet-100">
                {unit.teacherOverviewTips.map((tip, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="font-bold">•</span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {/* TAB 2: Interactive Visual Lab */}
      {activeTab === 'visual-lab' && (
        <div className="space-y-4">
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <h2 className="text-base font-extrabold text-slate-900 dark:text-white">
              {unit.visualLab.title}
            </h2>
            <p className="mt-1 text-xs leading-6 text-slate-600 dark:text-slate-300">
              {unit.visualLab.subtitle}
            </p>
            {teacherMode && (
              <div className="mt-3 space-y-2 rounded-lg border border-violet-200 bg-violet-50 p-3 text-xs leading-6 text-violet-950 dark:border-violet-800 dark:bg-violet-950/50 dark:text-violet-200">
                <div>
                  <strong>چه بگویید؟ (راهنمای مدرس): </strong>
                  {unit.visualLab.teacherGuide}
                </div>
                {unit.visualLab.classroomQuestion && (
                  <div className="border-t border-violet-200/80 pt-2 dark:border-violet-800">
                    <strong>سؤال کلاسی برای درگیر کردن هنرجویان: </strong>
                    {unit.visualLab.classroomQuestion}
                  </div>
                )}
              </div>
            )}
          </div>

          <VisualLabRegistry spec={unit.visualLab} />
        </div>
      )}

      {/* TAB 3: Deep Concept Lessons & Tiered Live Examples */}
      {activeTab === 'live-examples' &&
        (unit.lessons && unit.lessons.length > 0 ? (
          <ConceptLessonWorkspace
            unitId={unit.id}
            lessons={unit.lessons}
            teacherMode={teacherMode}
            dark={dark}
            savedCode={savedCode}
            onSaveCode={onSaveCode}
          />
        ) : (
          currentExample && (
            <div className="space-y-4">
              {/* Compact Classroom Slide-Style Example Selector (Fallback for non-migrated units) */}
              <div className="rounded-xl border border-slate-200 bg-white p-3 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                <div className="flex flex-wrap items-center justify-between gap-2.5">
                  <div className="flex min-w-0 flex-1 items-center gap-2">
                    <span className="shrink-0 rounded-lg bg-sky-100 px-2.5 py-1 text-xs font-extrabold text-sky-800 dark:bg-sky-900/60 dark:text-sky-200">
                      مثال {toPersianDigits(safeExampleIdx + 1)} از{' '}
                      {toPersianDigits(unit.examples.length)}
                    </span>
                    <select
                      aria-label="انتخاب مثال زنده"
                      value={safeExampleIdx}
                      onChange={(e) => setSelectedExampleIdx(Number(e.target.value))}
                      className="min-w-0 flex-1 rounded-lg border border-slate-300 bg-slate-50 px-3 py-1.5 text-xs font-bold text-slate-800 focus:border-sky-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
                    >
                      {unit.examples.map((ex, idx) => (
                        <option key={ex.id} value={idx}>
                          مثال {toPersianDigits(idx + 1)}: {ex.title}
                          {ex.bookPage ? ` (ص ${ex.bookPage})` : ''}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      disabled={safeExampleIdx === 0}
                      onClick={() => setSelectedExampleIdx((i) => Math.max(0, i - 1))}
                      className="rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-bold text-slate-700 hover:bg-slate-50 disabled:opacity-40 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
                    >
                      قبلی
                    </button>
                    <div className="flex items-center gap-1">
                      {unit.examples.map((ex, idx) => (
                        <button
                          key={ex.id}
                          type="button"
                          title={`مثال ${toPersianDigits(idx + 1)}: ${ex.title}`}
                          onClick={() => setSelectedExampleIdx(idx)}
                          className={`h-7 min-w-7 rounded-lg px-1.5 text-xs font-bold transition ${
                            idx === safeExampleIdx
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
                      disabled={safeExampleIdx === unit.examples.length - 1}
                      onClick={() =>
                        setSelectedExampleIdx((i) => Math.min(unit.examples.length - 1, i + 1))
                      }
                      className="rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-bold text-slate-700 hover:bg-slate-50 disabled:opacity-40 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
                    >
                      بعدی
                    </button>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-5 lg:grid-cols-12">
                <div className="space-y-4 lg:col-span-5">
                  <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                    <div className="mb-1 flex items-center justify-between">
                      <h3 className="text-base font-bold text-slate-900 dark:text-white">
                        {currentExample.title}
                      </h3>
                      {currentExample.bookPage && (
                        <span className="text-xs text-slate-500">صفحه {currentExample.bookPage}</span>
                      )}
                    </div>
                    <p className="text-sm leading-7 text-slate-700 dark:text-slate-300">
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
                      برای مشاهده توضیحات خط‌به‌خط، نکات گفتاری و خطاهای رایج هنرجویان، کلید{' '}
                      <strong>«حالت مدرس»</strong> را بزنید یا کلید{' '}
                      <kbd className="rounded bg-slate-200 px-1.5 py-0.5 font-mono text-[11px] dark:bg-slate-800">
                        T
                      </kbd>{' '}
                      را فشار دهید.
                    </div>
                  )}
                </div>

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
          )
        ))}

      {/* TAB 4: Classwork, Activities & Projects */}
      {activeTab === 'workshops' && (
        <div className="space-y-5">
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <h2 className="text-base font-extrabold text-slate-900 dark:text-white">
              تمرین‌ها، کارگاه‌ها و پروژه‌های کلاسی واحد {unit.unitNumber} ({toPersianDigits(unit.activities.length)} مورد)
            </h2>
            <p className="mt-1 text-xs leading-6 text-slate-600 dark:text-slate-300">
              هر تمرین شامل کد شروع‌کننده، راهنمای گام‌به‌گام، زمان پیشنهادی اجرا در کلاس، و پاسخ کامل همراه با روش جایگزین در «حالت مدرس» است.
            </p>
          </div>

          {unit.activities.map((activity, idx) => (
            <ActivityCard
              key={activity.id}
              activity={activity}
              index={idx}
              teacherMode={teacherMode}
              dark={dark}
              savedCode={savedCode[`activity-${activity.id}`]}
              onCodeSave={(code) => onSaveCode(`activity-${activity.id}`, code)}
            />
          ))}
        </div>
      )}

      {/* TAB 5: Tiered Homework Bank + Printable Sheet */}
      {activeTab === 'homework' &&
        (unit.homeworks && unit.homeworks.length > 0 ? (
          <HomeworkBankPanel
            unit={unit}
            homeworks={unit.homeworks}
            teacherMode={teacherMode}
            dark={dark}
          />
        ) : (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center dark:border-slate-700 dark:bg-slate-900">
            <ClipboardList className="mx-auto mb-2 h-8 w-8 text-slate-400" />
            <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100">
              بانک تکلیف منزل سطح‌بندی‌شده واحد {unit.unitNumber} در نوبت غنی‌سازی بعدی تکمیل می‌شود.
            </h3>
            <p className="mt-1 text-xs text-slate-500">
              هم‌اکنون می‌توانید از تب «۴. کارگاه کلاسی» برای تمرین‌های این واحد استفاده کنید.
            </p>
          </div>
        ))}

      {/* TAB 6: Interactive Quick Board Quiz */}
      {activeTab === 'quick-quiz' &&
        (unit.quickQuizzes && unit.quickQuizzes.length > 0 ? (
          <QuickQuizBoard
            unitId={unit.id}
            unitNumber={unit.unitNumber}
            questions={unit.quickQuizzes}
            teacherMode={teacherMode}
          />
        ) : (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center dark:border-slate-700 dark:bg-slate-900">
            <Sparkles className="mx-auto mb-2 h-8 w-8 text-slate-400" />
            <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100">
              آزمونک سریع پای تخته واحد {unit.unitNumber} در نوبت غنی‌سازی بعدی تکمیل می‌شود.
            </h3>
          </div>
        ))}

      {/* TAB 7: Gap-Filling Pro Tips & Buggy-Code Debugging */}
      {activeTab === 'tips-debugging' && (
        <div className="space-y-5">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {unit.gapNotes.map((note) => (
              <div
                key={note.id}
                className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900"
              >
                <div className="mb-1.5 flex items-center gap-2">
                  <Lightbulb className="h-4 w-4 text-amber-500" />
                  <span className="text-[11px] font-bold text-sky-700 dark:text-sky-400">
                    {note.badge}
                  </span>
                </div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">{note.title}</h4>
                <p className="mt-1.5 text-xs leading-6 text-slate-600 dark:text-slate-300">
                  {note.content}
                </p>
                {note.codeSnippet && (
                  <pre
                    dir="ltr"
                    className="mt-2.5 overflow-auto rounded-lg bg-slate-950 p-2.5 text-left font-mono text-xs text-emerald-300"
                  >
                    {note.codeSnippet}
                  </pre>
                )}
              </div>
            ))}
          </div>

          <div className="space-y-4">
            {unit.bugChallenges.map((challenge) => (
              <BugFixLab
                key={challenge.id}
                challenge={challenge}
                teacherMode={teacherMode}
                dark={dark}
              />
            ))}
          </div>
        </div>
      )}

      {/* TAB 8: Digital Competency Rubric */}
      {activeTab === 'rubric' && (
        <RubricMatrix
          unit={unit}
          students={students}
          teacherMode={teacherMode}
          onScoreChange={onScoreChange}
          onAddStudent={onAddStudent}
          onRemoveStudent={onRemoveStudent}
        />
      )}
    </div>
  );
}
