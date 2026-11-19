import {useState} from 'react';
import {
  Clock,
  Download,
  Eye,
  EyeOff,
  FileText,
  Lightbulb,
  Play,
  Printer,
  Terminal,
} from 'lucide-react';
import type {HomeworkAssignment, HomeworkDifficulty, LearningUnit} from '../types/curriculum.ts';
import {CodeSandboxPanel} from './CodeSandboxPanel.tsx';
import {toPersianDigits} from '../utils/rubricEvaluator.ts';

interface HomeworkBankPanelProps {
  unit: LearningUnit;
  homeworks: HomeworkAssignment[];
  teacherMode: boolean;
  dark: boolean;
}

const DIFF_META: Record<
  HomeworkDifficulty,
  {label: string; badgeClass: string}
> = {
  easy: {
    label: 'آسان',
    badgeClass:
      'border-emerald-200 bg-emerald-50 text-emerald-800 dark:border-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300',
  },
  medium: {
    label: 'متوسط',
    badgeClass:
      'border-amber-200 bg-amber-50 text-amber-800 dark:border-amber-800 dark:bg-amber-950/60 dark:text-amber-300',
  },
  challenging: {
    label: 'چالشی',
    badgeClass:
      'border-rose-200 bg-rose-50 text-rose-800 dark:border-rose-800 dark:bg-rose-950/60 dark:text-rose-300',
  },
};

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function buildPrintableHomeworkHtml(
  unit: LearningUnit,
  items: HomeworkAssignment[],
  includeHints: boolean,
  includeSolutions: boolean
): string {
  const diffLabel: Record<HomeworkDifficulty, string> = {
    easy: 'آسان',
    medium: 'متوسط',
    challenging: 'چالشی',
  };

  const cardsHtml = items
    .map(
      (hw) => `
    <article class="card">
      <div class="card-head">
        <span class="num">تکلیف ${toPersianDigits(hw.number)}</span>
        <span class="badge diff-${hw.difficulty}">سطح: ${diffLabel[hw.difficulty]}</span>
        <span class="meta">زمان پیشنهادی: ${toPersianDigits(hw.estimatedMinutes)} دقیقه</span>
      </div>
      <h3>${escapeHtml(hw.title)}</h3>
      <p class="prompt">${escapeHtml(hw.prompt)}</p>
      <div class="io-grid">
        ${
          hw.sampleInput
            ? `<div class="io-box"><div class="io-title">نمونه ورودی:</div><pre dir="ltr">${escapeHtml(hw.sampleInput)}</pre></div>`
            : ''
        }
        <div class="io-box"><div class="io-title">نمونه خروجی موردانتظار:</div><pre dir="ltr">${escapeHtml(hw.sampleOutput)}</pre></div>
      </div>
      ${includeHints ? `<div class="hint"><strong>راهنمایی:</strong> ${escapeHtml(hw.hint)}</div>` : ''}
      ${
        includeSolutions
          ? `<div class="solution"><strong>کلید پاسخ (ویژه هنرآموز):</strong><p>${escapeHtml(hw.solutionExplanation)}</p><pre dir="ltr">${escapeHtml(hw.solutionCode)}</pre></div>`
          : ''
      }
    </article>`
    )
    .join('\n');

  return `<!doctype html>
<html lang="fa" dir="rtl">
<head>
  <meta charset="UTF-8" />
  <title>برگه تکلیف منزل — واحد ${escapeHtml(unit.unitNumber)} ${escapeHtml(unit.title)}</title>
  <style>
    @page { size: A4; margin: 14mm; }
    * { box-sizing: border-box; }
    body {
      font-family: Vazirmatn, Tahoma, "Segoe UI", sans-serif;
      color: #0f172a;
      background: #ffffff;
      margin: 0;
      padding: 20px;
      line-height: 1.7;
      font-size: 13px;
    }
    .sheet-header {
      border: 2px solid #0f172a;
      border-radius: 12px;
      padding: 14px 18px;
      margin-bottom: 18px;
    }
    .sheet-header h1 { margin: 0 0 6px; font-size: 18px; }
    .sheet-header .sub { color: #334155; font-size: 12px; margin-bottom: 10px; }
    .student-fields {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 10px;
      border-top: 1px dashed #94a3b8;
      padding-top: 10px;
      font-size: 12px;
    }
    .card {
      border: 1px solid #cbd5e1;
      border-radius: 10px;
      padding: 12px 14px;
      margin-bottom: 12px;
      page-break-inside: avoid;
    }
    .card-head { display: flex; flex-wrap: wrap; gap: 8px; align-items: center; margin-bottom: 6px; }
    .num { background: #0f172a; color: #fff; padding: 2px 8px; border-radius: 6px; font-weight: bold; font-size: 11px; }
    .badge { padding: 2px 8px; border-radius: 6px; font-size: 11px; font-weight: bold; border: 1px solid #cbd5e1; }
    .diff-easy { background: #ecfdf5; color: #065f46; border-color: #a7f3d0; }
    .diff-medium { background: #fffbeb; color: #92400e; border-color: #fde68a; }
    .diff-challenging { background: #fff1f2; color: #9f1239; border-color: #fecdd3; }
    .meta { color: #475569; font-size: 11px; }
    .card h3 { margin: 4px 0 6px; font-size: 14px; }
    .prompt { margin: 0 0 8px; }
    .io-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 8px; }
    .io-box { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 8px; }
    .io-title { font-size: 11px; font-weight: bold; color: #334155; margin-bottom: 4px; }
    pre {
      margin: 0;
      direction: ltr;
      text-align: left;
      font-family: "JetBrains Mono", Consolas, monospace;
      font-size: 11.5px;
      white-space: pre-wrap;
      background: #0f172a;
      color: #e2e8f0;
      padding: 8px;
      border-radius: 6px;
    }
    .hint {
      margin-top: 8px;
      background: #fffbeb;
      border: 1px solid #fde68a;
      padding: 6px 10px;
      border-radius: 6px;
      font-size: 12px;
    }
    .solution {
      margin-top: 8px;
      background: #f5f3ff;
      border: 1px solid #ddd6fe;
      padding: 8px 10px;
      border-radius: 6px;
      font-size: 12px;
    }
    .print-bar { text-align: left; margin-bottom: 12px; }
    .print-btn {
      background: #0284c7; color: #fff; border: none; padding: 8px 16px;
      border-radius: 8px; font-family: inherit; font-weight: bold; cursor: pointer;
    }
    @media print {
      body { padding: 0; }
      .print-bar { display: none; }
    }
  </style>
</head>
<body>
  <div class="print-bar">
    <button class="print-btn" onclick="window.print()">چاپ برگه تکلیف (Ctrl+P)</button>
  </div>
  <header class="sheet-header">
    <h1>برگه تکلیف منزل — پودمان طراحی سایت ۱۴۰۵ (واحد ${escapeHtml(unit.unitNumber)}: ${escapeHtml(unit.title)})</h1>
    <div class="sub">صفحات کتاب: ${escapeHtml(unit.pageRange)} | تعداد تکالیف انتخاب‌شده: ${toPersianDigits(items.length)} تمرین</div>
    <div class="student-fields">
      <div>نام و نام خانوادگی هنرجو: .................................</div>
      <div>کلاس / رشته: .................................</div>
      <div>تاریخ تحویل: ...... / ...... / ۱۴۰۵</div>
    </div>
  </header>
  ${cardsHtml}
</body>
</html>`;
}

export function HomeworkBankPanel({unit, homeworks, teacherMode, dark}: HomeworkBankPanelProps) {
  const [filter, setFilter] = useState<'all' | HomeworkDifficulty>('all');
  const [shownHints, setShownHints] = useState<Record<string, boolean>>({});
  const [shownSolutions, setShownSolutions] = useState<Record<string, boolean>>({});
  const [openSandboxId, setOpenSandboxId] = useState<string | null>(null);
  const [includeHintsInSheet, setIncludeHintsInSheet] = useState(true);
  const [includeSolutionsInSheet, setIncludeSolutionsInSheet] = useState(false);

  const counts = {
    all: homeworks.length,
    easy: homeworks.filter((h) => h.difficulty === 'easy').length,
    medium: homeworks.filter((h) => h.difficulty === 'medium').length,
    challenging: homeworks.filter((h) => h.difficulty === 'challenging').length,
  };

  const filtered = filter === 'all' ? homeworks : homeworks.filter((h) => h.difficulty === filter);

  const handleDownloadPrintableSheet = () => {
    const html = buildPrintableHomeworkHtml(
      unit,
      filtered,
      includeHintsInSheet,
      teacherMode && includeSolutionsInSheet
    );
    const blob = new Blob([html], {type: 'text/html;charset=utf-8;'});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `homework-${unit.id}-${filter}.html`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleDirectPrint = () => {
    window.print();
  };

  return (
    <div className="space-y-4">
      {/* Header + Filter + Printable Worksheet Controls */}
      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h2 className="flex items-center gap-2 text-base font-extrabold text-slate-900 dark:text-white">
              <FileText className="h-5 w-5 text-sky-600" />
              بانک تکلیف منزل واحد {unit.unitNumber} (سطح‌بندی‌شده: آسان / متوسط / چالشی)
            </h2>
            <p className="mt-1 text-xs leading-6 text-slate-600 dark:text-slate-300">
              تمامی تکالیف دارای نمونه ورودی و خروجی دقیق، راهنمایی، کلید پاسخ ویژه مدرس و خروجی برگه آماده چاپ برای توزیع در کلاس هستند.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 print:hidden">
            <button
              type="button"
              onClick={handleDownloadPrintableSheet}
              className="inline-flex items-center gap-1.5 rounded-lg bg-sky-600 px-3.5 py-2 text-xs font-bold text-white shadow-sm hover:bg-sky-700"
            >
              <Download className="h-3.5 w-3.5" />
              خروجی برگه تکلیف (HTML آماده چاپ)
            </button>
            <button
              type="button"
              onClick={handleDirectPrint}
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
            >
              <Printer className="h-3.5 w-3.5" />
              چاپ صفحه
            </button>
          </div>
        </div>

        {/* Difficulty Filter + Export Checkboxes */}
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-3 dark:border-slate-800 print:hidden">
          <div className="flex flex-wrap items-center gap-1.5">
            {(
              [
                ['all', `همه تکالیف (${toPersianDigits(counts.all)})`],
                ['easy', `آسان (${toPersianDigits(counts.easy)})`],
                ['medium', `متوسط (${toPersianDigits(counts.medium)})`],
                ['challenging', `چالشی (${toPersianDigits(counts.challenging)})`],
              ] as const
            ).map(([key, label]) => (
              <button
                key={key}
                type="button"
                onClick={() => setFilter(key)}
                className={`rounded-lg px-3 py-1.5 text-xs font-bold transition ${
                  filter === key
                    ? 'bg-slate-900 text-white dark:bg-sky-600'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300'
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-600 dark:text-slate-300">
            <label className="inline-flex cursor-pointer items-center gap-1.5">
              <input
                type="checkbox"
                checked={includeHintsInSheet}
                onChange={(e) => setIncludeHintsInSheet(e.target.checked)}
                className="accent-sky-600"
              />
              درج راهنمایی در برگه چاپی
            </label>
            {teacherMode && (
              <label className="inline-flex cursor-pointer items-center gap-1.5 font-semibold text-violet-700 dark:text-violet-300">
                <input
                  type="checkbox"
                  checked={includeSolutionsInSheet}
                  onChange={(e) => setIncludeSolutionsInSheet(e.target.checked)}
                  className="accent-violet-600"
                />
                درج کلید پاسخ (نسخه ویژه مدرس)
              </label>
            )}
          </div>
        </div>
      </div>

      {/* Homework Cards */}
      <div className="grid grid-cols-1 gap-4">
        {filtered.map((hw) => {
          const meta = DIFF_META[hw.difficulty];
          const hintVisible = !!shownHints[hw.id];
          const solVisible = !!shownSolutions[hw.id];
          const sandboxOpen = openSandboxId === hw.id;

          return (
            <div
              key={hw.id}
              className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900"
            >
              <div className="mb-2.5 flex flex-wrap items-start justify-between gap-2">
                <div>
                  <div className="mb-1 flex flex-wrap items-center gap-2">
                    <span className="rounded-md bg-slate-900 px-2 py-0.5 text-[11px] font-extrabold text-white dark:bg-slate-100 dark:text-slate-900">
                      تکلیف {toPersianDigits(hw.number)}
                    </span>
                    <span
                      className={`rounded-md border px-2 py-0.5 text-[11px] font-bold ${meta.badgeClass}`}
                    >
                      سطح {meta.label}
                    </span>
                    <span className="inline-flex items-center gap-1 text-[11px] text-slate-500">
                      <Clock className="h-3 w-3" />
                      {toPersianDigits(hw.estimatedMinutes)} دقیقه
                    </span>
                    {hw.bookPage && (
                      <span className="text-[11px] text-slate-500">مرتبط با ص {hw.bookPage}</span>
                    )}
                  </div>
                  <h3 className="text-sm font-extrabold text-slate-900 dark:text-white">
                    {hw.title}
                  </h3>
                </div>

                <div className="flex flex-wrap items-center gap-2 print:hidden">
                  <button
                    type="button"
                    onClick={() =>
                      setShownHints((prev) => ({...prev, [hw.id]: !prev[hw.id]}))
                    }
                    className="inline-flex items-center gap-1 rounded-lg border border-amber-200 bg-amber-50 px-2.5 py-1.5 text-xs font-semibold text-amber-800 hover:bg-amber-100 dark:border-amber-900 dark:bg-amber-950/60 dark:text-amber-300"
                  >
                    <Lightbulb className="h-3.5 w-3.5" />
                    {hintVisible ? 'بستن راهنمایی' : 'راهنمایی'}
                  </button>

                  {teacherMode && (
                    <button
                      type="button"
                      onClick={() =>
                        setShownSolutions((prev) => ({...prev, [hw.id]: !prev[hw.id]}))
                      }
                      className="inline-flex items-center gap-1 rounded-lg bg-violet-600 px-2.5 py-1.5 text-xs font-semibold text-white hover:bg-violet-700"
                    >
                      {solVisible ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                      {solVisible ? 'پنهان کردن پاسخ' : 'کلید پاسخ (مدرس)'}
                    </button>
                  )}
                </div>
              </div>

              <p className="mb-3 text-sm leading-7 text-slate-700 dark:text-slate-300">
                {hw.prompt}
              </p>

              {/* Sample Input & Expected Output */}
              <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                {hw.sampleInput && (
                  <div className="rounded-lg border border-slate-200 bg-slate-50 p-2.5 dark:border-slate-800 dark:bg-slate-950/50">
                    <div className="mb-1 flex items-center gap-1 text-[11px] font-bold text-slate-600 dark:text-slate-400">
                      <Terminal className="h-3 w-3" />
                      نمونه ورودی کاربر:
                    </div>
                    <pre
                      dir="ltr"
                      className="overflow-auto rounded bg-slate-900 p-2 text-left font-mono text-xs text-sky-300"
                    >
                      {hw.sampleInput}
                    </pre>
                  </div>
                )}
                <div
                  className={`rounded-lg border border-slate-200 bg-slate-50 p-2.5 dark:border-slate-800 dark:bg-slate-950/50 ${
                    !hw.sampleInput ? 'md:col-span-2' : ''
                  }`}
                >
                  <div className="mb-1 flex items-center gap-1 text-[11px] font-bold text-slate-600 dark:text-slate-400">
                    <Terminal className="h-3 w-3 text-emerald-600" />
                    نمونه خروجی موردانتظار:
                  </div>
                  <pre
                    dir="ltr"
                    className="overflow-auto rounded bg-slate-900 p-2 text-left font-mono text-xs text-emerald-300"
                  >
                    {hw.sampleOutput}
                  </pre>
                </div>
              </div>

              {hintVisible && (
                <div className="mt-3 rounded-lg border border-amber-200 bg-amber-50/80 p-2.5 text-xs leading-6 text-amber-950 dark:border-amber-900 dark:bg-amber-950/40 dark:text-amber-200">
                  <strong>راهنمایی: </strong>
                  {hw.hint}
                </div>
              )}

              {teacherMode && solVisible && (
                <div className="mt-3 space-y-2.5 rounded-xl border border-violet-300 bg-violet-50/70 p-3.5 dark:border-violet-800 dark:bg-violet-950/40">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="text-xs font-extrabold text-violet-900 dark:text-violet-200">
                      کلید پاسخ استاندارد (ویژه هنرآموز):
                    </span>
                    <button
                      type="button"
                      onClick={() => setOpenSandboxId(sandboxOpen ? null : hw.id)}
                      className="inline-flex items-center gap-1 rounded-lg bg-emerald-600 px-2.5 py-1 text-xs font-bold text-white hover:bg-emerald-700"
                    >
                      <Play className="h-3 w-3" />
                      {sandboxOpen ? 'بستن محیط اجرا' : 'اجرای زنده پاسخ در مفسر'}
                    </button>
                  </div>
                  <p className="text-xs leading-6 text-slate-700 dark:text-slate-300">
                    {hw.solutionExplanation}
                  </p>
                  <pre
                    dir="ltr"
                    className="overflow-auto rounded-lg bg-slate-950 p-3 text-left font-mono text-xs leading-6 text-emerald-300"
                  >
                    {hw.solutionCode}
                  </pre>

                  {sandboxOpen && (
                    <div className="pt-2">
                      <CodeSandboxPanel
                        sandboxKey={`hw-${hw.id}`}
                        engine={hw.engine}
                        language={hw.language}
                        initialCode={hw.solutionCode}
                        dark={dark}
                      />
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
