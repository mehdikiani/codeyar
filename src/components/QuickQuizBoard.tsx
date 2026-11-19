import {useEffect, useState} from 'react';
import {
  CheckCircle2,
  Eye,
  HelpCircle,
  RotateCcw,
  Sparkles,
  XCircle,
} from 'lucide-react';
import type {QuickQuizKind, QuickQuizQuestion} from '../types/curriculum.ts';
import {toPersianDigits} from '../utils/rubricEvaluator.ts';

interface QuickQuizBoardProps {
  unitId: string;
  unitNumber: string;
  questions: QuickQuizQuestion[];
  teacherMode: boolean;
}

const KIND_LABELS: Record<QuickQuizKind, {label: string; className: string}> = {
  output: {
    label: 'خروجی این قطعه کد چیست؟',
    className:
      'border-sky-200 bg-sky-50 text-sky-800 dark:border-sky-800 dark:bg-sky-950/60 dark:text-sky-300',
  },
  concept: {
    label: 'پرسش مفهومی سریع',
    className:
      'border-violet-200 bg-violet-50 text-violet-800 dark:border-violet-800 dark:bg-violet-950/60 dark:text-violet-300',
  },
  'bug-spot': {
    label: 'خطا کجاست؟ (شکار باگ)',
    className:
      'border-rose-200 bg-rose-50 text-rose-800 dark:border-rose-800 dark:bg-rose-950/60 dark:text-rose-300',
  },
};

const OPTION_LETTERS = ['الف', 'ب', 'ج', 'د'];

export function QuickQuizBoard({
  unitId,
  unitNumber,
  questions,
  teacherMode,
}: QuickQuizBoardProps) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [peekAnswer, setPeekAnswer] = useState(false);

  useEffect(() => {
    setCurrentIdx(0);
    setAnswers({});
    setPeekAnswer(false);
  }, [unitId]);

  if (questions.length === 0) return null;

  const safeIdx = Math.min(currentIdx, questions.length - 1);
  const currentQ = questions[safeIdx];
  const selectedOpt = answers[currentQ.id];
  const isAnswered = selectedOpt !== undefined;
  const isCorrect = isAnswered && selectedOpt === currentQ.correctIndex;

  const answeredCount = Object.keys(answers).length;
  const correctCount = questions.filter((q) => answers[q.id] === q.correctIndex).length;

  const handleSelectOption = (optIdx: number) => {
    setAnswers((prev) => ({...prev, [currentQ.id]: optIdx}));
  };

  const handleReset = () => {
    setAnswers({});
    setCurrentIdx(0);
    setPeekAnswer(false);
  };

  const kindMeta = KIND_LABELS[currentQ.kind];

  return (
    <div className="space-y-4">
      {/* Top Score & Navigation Banner */}
      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="flex items-center gap-2 text-base font-extrabold text-slate-900 dark:text-white">
              <Sparkles className="h-5 w-5 text-amber-500" />
              آزمونک سریع پای تخته — واحد {unitNumber}
            </h2>
            <p className="mt-0.5 text-xs text-slate-600 dark:text-slate-300">
              روی پروژکتور نمایش دهید، از کلاس بپرسید «خروجی چیست؟» و پس از رای‌گیری هنرجویان، گزینه را کلیک کنید تا علت پاسخ نمایش داده شود.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-lg bg-emerald-50 px-3 py-1.5 text-xs font-extrabold text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300">
              امتیاز کلاس: {toPersianDigits(correctCount)} از {toPersianDigits(answeredCount)} پاسخ‌داده‌شده
            </span>
            {teacherMode && (
              <button
                type="button"
                onClick={() => setPeekAnswer((v) => !v)}
                className="inline-flex items-center gap-1 rounded-lg border border-violet-300 bg-violet-50 px-2.5 py-1.5 text-xs font-bold text-violet-800 hover:bg-violet-100 dark:border-violet-800 dark:bg-violet-950/60 dark:text-violet-300"
              >
                <Eye className="h-3.5 w-3.5" />
                {peekAnswer ? 'مخفی کردن پاسخ مدرس' : 'تقلب سریع مدرس'}
              </button>
            )}
            <button
              type="button"
              onClick={handleReset}
              className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-bold text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              شروع مجدد
            </button>
          </div>
        </div>

        {/* Question Step Dots */}
        <div className="mt-3.5 flex flex-wrap items-center justify-between gap-2 border-t border-slate-100 pt-3 dark:border-slate-800">
          <div className="flex flex-wrap items-center gap-1.5">
            {questions.map((q, idx) => {
              const ans = answers[q.id];
              const active = idx === safeIdx;
              let colorClass =
                'bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300';
              if (active) {
                colorClass = 'bg-sky-600 text-white shadow-sm ring-2 ring-sky-300 dark:ring-sky-700';
              } else if (ans !== undefined) {
                colorClass =
                  ans === q.correctIndex
                    ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                    : 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300';
              }
              return (
                <button
                  key={q.id}
                  type="button"
                  onClick={() => {
                    setCurrentIdx(idx);
                    setPeekAnswer(false);
                  }}
                  className={`h-8 min-w-8 rounded-lg px-2 text-xs font-bold transition ${colorClass}`}
                >
                  {toPersianDigits(idx + 1)}
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              disabled={safeIdx === 0}
              onClick={() => {
                setCurrentIdx((i) => Math.max(0, i - 1));
                setPeekAnswer(false);
              }}
              className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-bold text-slate-700 hover:bg-slate-50 disabled:opacity-40 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
            >
              سؤال قبلی
            </button>
            <button
              type="button"
              disabled={safeIdx === questions.length - 1}
              onClick={() => {
                setCurrentIdx((i) => Math.min(questions.length - 1, i + 1));
                setPeekAnswer(false);
              }}
              className="rounded-lg bg-sky-600 px-3 py-1.5 text-xs font-bold text-white hover:bg-sky-700 disabled:opacity-40"
            >
              سؤال بعدی
            </button>
          </div>
        </div>
      </div>

      {/* Active Question Slide Card */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="rounded-md bg-slate-900 px-2.5 py-1 text-xs font-extrabold text-white dark:bg-slate-100 dark:text-slate-900">
              پرسش {toPersianDigits(safeIdx + 1)} از {toPersianDigits(questions.length)}
            </span>
            <span className={`rounded-md border px-2.5 py-1 text-xs font-bold ${kindMeta.className}`}>
              {kindMeta.label}
            </span>
          </div>
          {currentQ.bookPage && (
            <span className="text-xs text-slate-500">صفحه {currentQ.bookPage} کتاب</span>
          )}
        </div>

        <h3 className="mb-3 text-base font-extrabold leading-8 text-slate-900 dark:text-white">
          {currentQ.question}
        </h3>

        {currentQ.codeSnippet && (
          <pre
            dir="ltr"
            className="mb-4 overflow-auto rounded-xl bg-slate-950 p-4 text-left font-mono text-sm leading-7 text-sky-200 shadow-inner"
          >
            {currentQ.codeSnippet}
          </pre>
        )}

        {teacherMode && peekAnswer && !isAnswered && (
          <div className="mb-3 rounded-lg border border-violet-300 bg-violet-50 px-3 py-2 text-xs font-bold text-violet-900 dark:border-violet-800 dark:bg-violet-950/60 dark:text-violet-200">
            راهنمای محرمانه مدرس: پاسخ صحیح گزینه «{OPTION_LETTERS[currentQ.correctIndex]}» است.
          </div>
        )}

        {/* 4 Options */}
        <div className="grid grid-cols-1 gap-2.5 md:grid-cols-2">
          {currentQ.options.map((opt, idx) => {
            const chosen = selectedOpt === idx;
            const correctOption = idx === currentQ.correctIndex;
            let stateStyle =
              'border-slate-200 bg-slate-50/70 text-slate-800 hover:border-sky-400 hover:bg-sky-50/60 dark:border-slate-800 dark:bg-slate-950/50 dark:text-slate-100 dark:hover:border-sky-700';

            if (isAnswered) {
              if (correctOption) {
                stateStyle =
                  'border-emerald-500 bg-emerald-50 text-emerald-950 dark:border-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-100';
              } else if (chosen && !correctOption) {
                stateStyle =
                  'border-rose-500 bg-rose-50 text-rose-950 dark:border-rose-600 dark:bg-rose-950/60 dark:text-rose-100';
              } else {
                stateStyle =
                  'border-slate-200 bg-slate-50/40 text-slate-400 dark:border-slate-800 dark:bg-slate-950/20 dark:text-slate-500';
              }
            }

            return (
              <button
                key={idx}
                type="button"
                onClick={() => handleSelectOption(idx)}
                className={`flex items-center justify-between gap-3 rounded-xl border-2 p-3.5 text-right text-sm font-bold transition ${stateStyle}`}
              >
                <div className="flex items-center gap-2.5">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-white text-xs font-extrabold text-slate-800 shadow-sm dark:bg-slate-800 dark:text-slate-100">
                    {OPTION_LETTERS[idx]}
                  </span>
                  <span className="leading-6">{opt}</span>
                </div>
                {isAnswered && correctOption && (
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-600" />
                )}
                {isAnswered && chosen && !correctOption && (
                  <XCircle className="h-5 w-5 shrink-0 text-rose-600" />
                )}
              </button>
            );
          })}
        </div>

        {/* Immediate Pedagogical Explanation */}
        {isAnswered && (
          <div
            className={`mt-4 rounded-xl border p-4 text-xs leading-7 ${
              isCorrect
                ? 'border-emerald-300 bg-emerald-50/80 text-emerald-950 dark:border-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-100'
                : 'border-amber-300 bg-amber-50/80 text-amber-950 dark:border-amber-800 dark:bg-amber-950/40 dark:text-amber-100'
            }`}
          >
            <div className="mb-1 flex items-center gap-1.5 text-sm font-extrabold">
              <HelpCircle className="h-4 w-4" />
              {isCorrect ? 'آفرین! پاسخ کلاس کاملاً درست است:' : 'تحلیل پاسخ صحیح برای توضیح پای تخته:'}
            </div>
            <p>{currentQ.explanation}</p>
          </div>
        )}
      </div>
    </div>
  );
}
