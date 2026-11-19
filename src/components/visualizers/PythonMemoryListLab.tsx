import {useEffect, useState} from 'react';
import {AnimatePresence, motion} from 'motion/react';
import {
  ArrowRight,
  Box,
  GitBranch,
  ListOrdered,
  Pause,
  Play,
  Plus,
  Repeat,
  RotateCcw,
  SkipForward,
  Trash2,
} from 'lucide-react';

interface MemorySlot {
  name: string;
  value: string;
  pyType: 'str' | 'int' | 'float' | 'bool';
  address: string;
}

const INITIAL_MEMORY: MemorySlot[] = [
  {name: 'student_name', value: "'آرش'", pyType: 'str', address: '0x10A4'},
  {name: 'grade', value: '11', pyType: 'int', address: '0x10B8'},
  {name: 'gpa', value: '19.25', pyType: 'float', address: '0x10C2'},
  {name: 'is_passed', value: 'True', pyType: 'bool', address: '0x10D0'},
];

const INITIAL_LIST = ['سیب', 'موز', 'پرتقال', 'انار'];

const TYPE_STYLES: Record<MemorySlot['pyType'], string> = {
  str: 'border-emerald-300 bg-emerald-50 text-emerald-800 dark:border-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300',
  int: 'border-sky-300 bg-sky-50 text-sky-800 dark:border-sky-800 dark:bg-sky-950/60 dark:text-sky-300',
  float: 'border-amber-300 bg-amber-50 text-amber-800 dark:border-amber-800 dark:bg-amber-950/60 dark:text-amber-300',
  bool: 'border-violet-300 bg-violet-50 text-violet-800 dark:border-violet-800 dark:bg-violet-950/60 dark:text-violet-300',
};

type SubLabId = 'memory' | 'list' | 'decision' | 'loops';

export function PythonMemoryListLab() {
  const [activeSubLab, setActiveSubLab] = useState<SubLabId>('memory');

  // --- Lab 1: RAM Memory Boxes ---
  const [memory, setMemory] = useState<MemorySlot[]>(INITIAL_MEMORY);
  const [varName, setVarName] = useState('score');
  const [varVal, setVarVal] = useState('20');
  const [lastMemoryAction, setLastMemoryAction] = useState(
    'متغیرها مانند جعبه‌های برچسب‌دار در حافظه RAM ذخیره می‌شوند.'
  );

  // --- Lab 2: List Conveyor ---
  const [items, setItems] = useState<string[]>(INITIAL_LIST);
  const [newItem, setNewItem] = useState('کیوی');
  const [insertIdx, setInsertIdx] = useState(1);
  const [lastListCode, setLastListCode] = useState("fruits = ['سیب', 'موز', 'پرتقال', 'انار']");
  const [highlightedIdx, setHighlightedIdx] = useState<number | null>(null);

  // --- Lab 3: Live if/elif/else Decision Tree ---
  const [scoreInput, setScoreInput] = useState(84);
  const [hasBonus, setHasBonus] = useState(false);

  // --- Lab 4: Step-by-Step for / while Loop Tracker ---
  const [loopKind, setLoopKind] = useState<'for' | 'while'>('for');
  const [rangeStart, setRangeStart] = useState(1);
  const [rangeStop, setRangeStop] = useState(8);
  const [rangeStep, setRangeStep] = useState(1);
  const [skipValue, setSkipValue] = useState(3);
  const [breakValue, setBreakValue] = useState(6);
  const [enableContinue, setEnableContinue] = useState(true);
  const [enableBreak, setEnableBreak] = useState(true);
  const [loopCursor, setLoopCursor] = useState(-1);
  const [isPlayingLoop, setIsPlayingLoop] = useState(false);

  // Build deterministic trace of loop iterations
  const loopSteps = (() => {
    const trace: {counter: number; action: 'run' | 'continue' | 'break'; output: string}[] = [];
    if (loopKind === 'for') {
      const step = Math.max(1, rangeStep);
      for (let i = rangeStart; i < rangeStop; i += step) {
        if (enableBreak && i === breakValue) {
          trace.push({counter: i, action: 'break', output: `توقف فوری حلقه در i = ${i} (break)`});
          break;
        }
        if (enableContinue && i === skipValue) {
          trace.push({counter: i, action: 'continue', output: `پرش از دور i = ${i} (continue)`});
          continue;
        }
        trace.push({counter: i, action: 'run', output: `چاپ شد: ${i} (مربع: ${i * i})`});
      }
    } else {
      let guests = 1;
      const capacity = Math.max(2, Math.min(8, rangeStop));
      while (guests <= capacity) {
        if (enableBreak && guests === breakValue) {
          trace.push({counter: guests, action: 'break', output: `تکمیل اضطراری در مهمان ${guests} (break)`});
          break;
        }
        if (enableContinue && guests === skipValue) {
          trace.push({counter: guests, action: 'continue', output: `رد شدن از مهمان ${guests} بدون چاپ (continue)`});
          guests += 1;
          continue;
        }
        trace.push({counter: guests, action: 'run', output: `خوش آمدید مهمان شماره ${guests}`});
        guests += 1;
      }
    }
    return trace;
  })();

  useEffect(() => {
    setLoopCursor(-1);
    setIsPlayingLoop(false);
  }, [loopKind, rangeStart, rangeStop, rangeStep, skipValue, breakValue, enableContinue, enableBreak]);

  useEffect(() => {
    if (!isPlayingLoop) return;
    const timer = window.setTimeout(() => {
      setLoopCursor((prev) => {
        if (prev + 1 >= loopSteps.length) {
          setIsPlayingLoop(false);
          return prev;
        }
        return prev + 1;
      });
    }, 650);
    return () => window.clearTimeout(timer);
  }, [isPlayingLoop, loopCursor, loopSteps.length]);

  const inferType = (raw: string): {value: string; pyType: MemorySlot['pyType']} => {
    const trimmed = raw.trim();
    if (trimmed === 'True' || trimmed === 'False') return {value: trimmed, pyType: 'bool'};
    if (/^-?\d+$/.test(trimmed)) return {value: trimmed, pyType: 'int'};
    if (/^-?\d+\.\d+$/.test(trimmed)) return {value: trimmed, pyType: 'float'};
    const clean = trimmed.replace(/^['"]|['"]$/g, '');
    return {value: `'${clean}'`, pyType: 'str'};
  };

  const assignVariable = () => {
    const cleanName = varName.trim().replace(/[^A-Za-z0-9_]/g, '');
    if (!cleanName || /^\d/.test(cleanName)) {
      setLastMemoryAction('خطای نام‌گذاری: نام متغیر باید با حرف انگلیسی یا زیرخط (_) شروع شود و فاصله نداشته باشد.');
      return;
    }
    const inferred = inferType(varVal);
    setMemory((prev) => {
      const exists = prev.find((m) => m.name === cleanName);
      if (exists) {
        return prev.map((m) => (m.name === cleanName ? {...m, ...inferred} : m));
      }
      const addr = `0x10${(0xe0 + prev.length * 8).toString(16).toUpperCase()}`;
      return [...prev, {name: cleanName, ...inferred, address: addr}];
    });
    setLastMemoryAction(`دستور ${cleanName} = ${inferred.value} اجرا شد (نوع تشخیص‌داده‌شده: ${inferred.pyType}).`);
  };

  const effectiveScore = Math.min(100, scoreInput + (hasBonus ? 5 : 0));
  const decisionBranch: 'excellent' | 'good' | 'pass' | 'fail' =
    effectiveScore >= 90
      ? 'excellent'
      : effectiveScore >= 70
      ? 'good'
      : effectiveScore >= 50
      ? 'pass'
      : 'fail';

  const SUB_TABS: {id: SubLabId; label: string; icon: typeof Box}[] = [
    {id: 'memory', label: '۱. حافظه RAM و انواع داده', icon: Box},
    {id: 'list', label: '۲. نوار نقاله لیست', icon: ListOrdered},
    {id: 'decision', label: '۳. درخت تصمیم if/elif/else', icon: GitBranch},
    {id: 'loops', label: '۴. ردیاب حلقه for و while', icon: Repeat},
  ];

  return (
    <div className="space-y-4">
      {/* Sub-Lab Switcher */}
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        {SUB_TABS.map((t) => {
          const Icon = t.icon;
          const active = activeSubLab === t.id;
          return (
            <button
              key={t.id}
              type="button"
              onClick={() => setActiveSubLab(t.id)}
              className={`flex items-center justify-center gap-1.5 rounded-xl border px-3 py-2.5 text-xs font-bold transition ${
                active
                  ? 'border-sky-600 bg-sky-600 text-white shadow-sm'
                  : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300'
              }`}
            >
              <Icon className="h-4 w-4 shrink-0" />
              <span className="truncate">{t.label}</span>
            </button>
          );
        })}
      </div>

      {/* SUB-LAB 1: Animated RAM Memory Boxes */}
      {activeSubLab === 'memory' && (
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
            <div>
              <h3 className="flex items-center gap-2 text-base font-bold text-slate-900 dark:text-white">
                <Box className="h-4 w-4 text-sky-600 dark:text-sky-400" />
                آزمایشگاه جعبه‌های حافظه RAM و تایپ پویا در پایتون
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                اگر نام متغیر تکراری بزنید، مقدار قبلی جایگزین شده و در صورت تغییر نوع، رنگ و برچسب <code className="font-mono">type</code> تغییر می‌کند.
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                setMemory(INITIAL_MEMORY);
                setLastMemoryAction('حافظه به حالت اولیه بازنشانی شد.');
              }}
              className="inline-flex items-center gap-1 rounded-lg border border-slate-200 px-2.5 py-1 text-xs text-slate-600 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              بازنشانی
            </button>
          </div>

          <div className="mb-4 flex flex-wrap items-end gap-2 rounded-lg border border-slate-200 bg-slate-50 p-3 dark:border-slate-800 dark:bg-slate-950/60">
            <div className="min-w-[130px] flex-1">
              <label className="mb-1 block text-xs font-medium text-slate-600 dark:text-slate-300">نام متغیر (انگلیسی)</label>
              <input
                dir="ltr"
                type="text"
                value={varName}
                onChange={(e) => setVarName(e.target.value)}
                className="w-full rounded-lg border border-slate-300 bg-white px-2.5 py-1.5 font-mono text-xs text-slate-900 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
              />
            </div>
            <div className="pb-1.5 font-mono text-sm font-bold text-slate-400">=</div>
            <div className="min-w-[150px] flex-1">
              <label className="mb-1 block text-xs font-medium text-slate-600 dark:text-slate-300">
                مقدار (مثلاً 20 یا 19.5 یا True یا علی)
              </label>
              <input
                dir="ltr"
                type="text"
                value={varVal}
                onChange={(e) => setVarVal(e.target.value)}
                className="w-full rounded-lg border border-slate-300 bg-white px-2.5 py-1.5 font-mono text-xs text-slate-900 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
              />
            </div>
            <button
              type="button"
              onClick={assignVariable}
              className="inline-flex items-center gap-1.5 rounded-lg bg-sky-600 px-3.5 py-1.5 text-xs font-semibold text-white transition hover:bg-sky-700"
            >
              <Plus className="h-3.5 w-3.5" />
              ذخیره در RAM
            </button>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <AnimatePresence mode="popLayout">
              {memory.map((slot) => (
                <motion.div
                  key={slot.name}
                  layout
                  initial={{opacity: 0, scale: 0.85, y: 12}}
                  animate={{opacity: 1, scale: 1, y: 0}}
                  exit={{opacity: 0, scale: 0.85}}
                  transition={{type: 'spring', stiffness: 320, damping: 24}}
                  className={`rounded-xl border p-3 ${TYPE_STYLES[slot.pyType]}`}
                >
                  <div className="mb-1.5 flex items-center justify-between font-mono text-[11px] opacity-80">
                    <span>{slot.address}</span>
                    <span className="font-bold">type: {slot.pyType}</span>
                  </div>
                  <div dir="ltr" className="font-mono text-sm font-bold">
                    {slot.name}
                  </div>
                  <motion.div
                    key={slot.value}
                    initial={{scale: 1.12}}
                    animate={{scale: 1}}
                    dir="ltr"
                    className="mt-2 rounded-lg bg-white/80 px-2.5 py-1.5 text-center font-mono text-base font-bold text-slate-900 dark:bg-slate-950/70 dark:text-white"
                  >
                    {slot.value}
                  </motion.div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          <p className="mt-3 text-xs font-medium text-slate-600 dark:text-slate-300">{lastMemoryAction}</p>
        </div>
      )}

      {/* SUB-LAB 2: Interactive 0-Indexed List Conveyor Belt */}
      {activeSubLab === 'list' && (
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                نوار نقاله تعاملی لیست و اندیس‌گذاری (اصلاح توضیح <code className="font-mono text-sky-600 dark:text-sky-400">insert</code> کتاب ص ۱۹)
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                ببینید چگونه اندیس مثبت از <code className="font-mono">0</code> و اندیس منفی از <code className="font-mono">-1</code> شمارش می‌شود و با هر درج/حذف، اندیس‌های بعدی جابه‌جا می‌شوند.
              </p>
            </div>
            <div dir="ltr" className="rounded-md bg-slate-900 px-3 py-1.5 font-mono text-xs text-emerald-300">
              {lastListCode}
            </div>
          </div>

          <div className="mb-4 flex flex-wrap items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 p-3 dark:border-slate-800 dark:bg-slate-950/60">
            <input
              type="text"
              value={newItem}
              onChange={(e) => setNewItem(e.target.value)}
              placeholder="مقدار جدید..."
              className="w-32 rounded-lg border border-slate-300 bg-white px-2.5 py-1.5 text-xs text-slate-900 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
            />
            <button
              type="button"
              onClick={() => {
                const val = newItem.trim();
                if (!val) return;
                setItems((prev) => [...prev, val]);
                setHighlightedIdx(items.length);
                setLastListCode(`fruits.append('${val}')  # افزودن به انتهای لیست`);
              }}
              className="rounded-lg bg-emerald-600 px-3 py-1.5 font-mono text-xs font-semibold text-white hover:bg-emerald-700"
            >
              .append()
            </button>

            <div className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-2 py-1 dark:border-slate-700 dark:bg-slate-900">
              <span className="text-xs text-slate-600 dark:text-slate-300">اندیس:</span>
              <input
                type="range"
                min={0}
                max={items.length}
                value={Math.min(insertIdx, items.length)}
                onChange={(e) => setInsertIdx(Number(e.target.value))}
                className="w-20 accent-sky-600"
              />
              <span className="w-5 text-center font-mono text-xs font-bold text-sky-600 dark:text-sky-400">
                {Math.min(insertIdx, items.length)}
              </span>
              <button
                type="button"
                onClick={() => {
                  const val = newItem.trim();
                  if (!val) return;
                  const clamped = Math.max(0, Math.min(insertIdx, items.length));
                  setItems((prev) => {
                    const next = [...prev];
                    next.splice(clamped, 0, val);
                    return next;
                  });
                  setHighlightedIdx(clamped);
                  setLastListCode(`fruits.insert(${clamped}, '${val}')  # درج در اندیس ${clamped}`);
                }}
                className="rounded bg-sky-600 px-2.5 py-1 font-mono text-xs font-semibold text-white hover:bg-sky-700"
              >
                .insert()
              </button>
            </div>

            <button
              type="button"
              onClick={() => {
                if (items.length === 0) return;
                const popped = items[items.length - 1];
                setItems((prev) => prev.slice(0, -1));
                setHighlightedIdx(null);
                setLastListCode(`removed = fruits.pop()  # حذف '${popped}'`);
              }}
              disabled={items.length === 0}
              className="rounded-lg bg-amber-600 px-3 py-1.5 font-mono text-xs font-semibold text-white hover:bg-amber-700 disabled:opacity-40"
            >
              .pop()
            </button>

            <button
              type="button"
              onClick={() => {
                setItems(INITIAL_LIST);
                setHighlightedIdx(null);
                setLastListCode("fruits = ['سیب', 'موز', 'پرتقال', 'انار']");
              }}
              className="inline-flex items-center gap-1 rounded-lg border border-slate-200 px-2.5 py-1.5 text-xs text-slate-600 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              بازنشانی
            </button>
          </div>

          <div
            dir="ltr"
            className="flex min-h-[130px] flex-wrap items-center gap-2.5 rounded-xl border border-dashed border-slate-300 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-950"
          >
            <AnimatePresence mode="popLayout">
              {items.map((item, idx) => (
                <motion.div
                  key={`${item}-${idx}`}
                  layout
                  initial={{opacity: 0, y: -20, scale: 0.85}}
                  animate={{opacity: 1, y: 0, scale: 1}}
                  exit={{opacity: 0, y: 20, scale: 0.8}}
                  transition={{type: 'spring', stiffness: 360, damping: 25}}
                  className={`group relative flex min-w-[132px] flex-col items-center rounded-xl border-2 px-3.5 py-2.5 shadow-sm transition ${
                    highlightedIdx === idx
                      ? 'border-sky-500 bg-sky-50 dark:bg-sky-950/70'
                      : 'border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-900'
                  }`}
                >
                  <div className="flex w-full items-center justify-between gap-3 font-mono text-[11px] text-slate-500 dark:text-slate-400">
                    <span>idx: {idx}</span>
                    <span>neg: {idx - items.length}</span>
                  </div>
                  <div className="my-1.5 text-sm font-bold text-slate-900 dark:text-white">{item}</div>
                  <button
                    type="button"
                    onClick={() => {
                      const target = items[idx];
                      setItems((prev) => prev.filter((_, i) => i !== idx));
                      setHighlightedIdx(null);
                      setLastListCode(`fruits.remove('${target}')  # حذف از اندیس ${idx}`);
                    }}
                    className="inline-flex items-center gap-1 rounded px-1.5 py-0.5 text-[10px] text-rose-600 opacity-75 transition hover:bg-rose-50 hover:opacity-100 dark:text-rose-400 dark:hover:bg-rose-950"
                  >
                    <Trash2 className="h-3 w-3" />
                    remove
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>
            {items.length === 0 && (
              <div className="flex w-full items-center justify-center gap-2 text-xs text-slate-500">
                <ArrowRight className="h-4 w-4" />
                لیست خالی است: <code className="font-mono">[]</code>
              </div>
            )}
          </div>
        </div>
      )}

      {/* SUB-LAB 3: Live if / elif / else Decision Tree */}
      {activeSubLab === 'decision' && (
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
            <div>
              <h3 className="flex items-center gap-2 text-base font-bold text-slate-900 dark:text-white">
                <GitBranch className="h-4 w-4 text-emerald-600" />
                درخت تصمیم زنده <code className="font-mono">if / elif / else</code> (اصلاح فعالیت ۴ ص ۳۱)
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                نمره ورودی را با اسلایدر تغییر دهید و ببینید پایتون از بالا به پایین کدام شرط‌ها را بررسی و در کدام شاخه متوقف می‌شود.
              </p>
            </div>
            <div className="flex items-center gap-3 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs dark:border-slate-700 dark:bg-slate-950">
              <span>نمره خام: <strong className="font-mono text-sky-600">{scoreInput}</strong></span>
              <input
                type="range"
                min={0}
                max={100}
                value={scoreInput}
                onChange={(e) => setScoreInput(Number(e.target.value))}
                className="w-36 accent-sky-600"
              />
              <label className="flex cursor-pointer items-center gap-1.5 font-semibold">
                <input
                  type="checkbox"
                  checked={hasBonus}
                  onChange={(e) => setHasBonus(e.target.checked)}
                  className="accent-emerald-600"
                />
                +۵ نمره فعالیت کلاسی (نهایی: {effectiveScore})
              </label>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
            {/* Visual Decision Flow Nodes */}
            <div className="space-y-2.5 lg:col-span-7">
              {[
                {
                  id: 'excellent',
                  cond: 'if score >= 90:',
                  tested: true,
                  passed: effectiveScore >= 90,
                  result: 'عالی (Excellent) — تخفیف ۳۰٪ جایزه',
                  color: 'emerald',
                },
                {
                  id: 'good',
                  cond: 'elif score >= 70:',
                  tested: effectiveScore < 90,
                  passed: effectiveScore < 90 && effectiveScore >= 70,
                  result: 'خوب (Good) — تخفیف ۱۵٪',
                  color: 'sky',
                },
                {
                  id: 'pass',
                  cond: 'elif score >= 50:',
                  tested: effectiveScore < 70,
                  passed: effectiveScore < 70 && effectiveScore >= 50,
                  result: 'قابل قبول (Pass) — بدون جریمه',
                  color: 'amber',
                },
                {
                  id: 'fail',
                  cond: 'else:',
                  tested: effectiveScore < 50,
                  passed: effectiveScore < 50,
                  result: 'نیاز به تلاش بیشتر (Fail)',
                  color: 'rose',
                },
              ].map((node) => (
                <motion.div
                  key={node.id}
                  animate={{
                    scale: node.passed ? 1.02 : 1,
                    opacity: node.passed ? 1 : node.tested ? 0.78 : 0.4,
                  }}
                  className={`flex flex-wrap items-center justify-between gap-2 rounded-xl border-2 p-3 transition ${
                    node.passed
                      ? 'border-emerald-500 bg-emerald-50 shadow-sm dark:bg-emerald-950/60'
                      : node.tested
                      ? 'border-rose-300 bg-rose-50/40 dark:border-rose-900 dark:bg-rose-950/20'
                      : 'border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-950/40'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span
                      dir="ltr"
                      className="rounded-md bg-slate-900 px-2.5 py-1 font-mono text-xs font-bold text-sky-300"
                    >
                      {node.cond}
                    </span>
                    <span className="text-xs font-bold">
                      {node.passed
                        ? '✔ True (اجرا می‌شود و بقیه نادیده گرفته می‌شوند)'
                        : node.tested
                        ? '✖ False (بررسی شاخه بعدی...)'
                        : '— بررسی نشد (شرط قبلی برقرار بود)'}
                    </span>
                  </div>
                  <div className="text-xs font-bold text-slate-800 dark:text-slate-100">{node.result}</div>
                </motion.div>
              ))}
            </div>

            {/* Live Evaluated Code & Output */}
            <div className="flex flex-col justify-between gap-3 rounded-xl border border-slate-200 bg-slate-950 p-4 text-slate-100 lg:col-span-5">
              <div>
                <div className="mb-2 text-xs text-slate-400">مسیر اجرای فعلی پایتون:</div>
                <pre dir="ltr" className="text-left font-mono text-xs leading-6">
                  <div className="text-sky-300">score = {effectiveScore}</div>
                  <div className={decisionBranch === 'excellent' ? 'rounded bg-emerald-900/70 px-1 text-emerald-200' : 'text-slate-500'}>
                    if score &gt;= 90: grade = &quot;Excellent&quot;
                  </div>
                  <div className={decisionBranch === 'good' ? 'rounded bg-emerald-900/70 px-1 text-emerald-200' : 'text-slate-500'}>
                    elif score &gt;= 70: grade = &quot;Good&quot;
                  </div>
                  <div className={decisionBranch === 'pass' ? 'rounded bg-emerald-900/70 px-1 text-emerald-200' : 'text-slate-500'}>
                    elif score &gt;= 50: grade = &quot;Pass&quot;
                  </div>
                  <div className={decisionBranch === 'fail' ? 'rounded bg-emerald-900/70 px-1 text-emerald-200' : 'text-slate-500'}>
                    else: grade = &quot;Fail&quot;
                  </div>
                </pre>
              </div>
              <div className="rounded-lg border border-emerald-500/40 bg-emerald-950/60 p-3 text-xs font-bold text-emerald-300">
                خروجی نهایی برای نمره {effectiveScore}: شاخه «{decisionBranch}» اجرا شد.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SUB-LAB 4: Step-by-Step for / while Loop Visualizer */}
      {activeSubLab === 'loops' && (
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
            <div>
              <h3 className="flex items-center gap-2 text-base font-bold text-slate-900 dark:text-white">
                <Repeat className="h-4 w-4 text-violet-600" />
                ردیاب گام‌به‌گام حلقه‌های <code className="font-mono">for</code> و <code className="font-mono">while</code> + اثر <code className="font-mono">break / continue</code>
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                پارامترهای حلقه را تغییر دهید و با دکمه «گام بعدی» یا «پخش خودکار» حرکت شمارنده را دنبال کنید.
              </p>
            </div>
            <div className="inline-flex rounded-lg border border-slate-200 bg-slate-50 p-0.5 text-xs dark:border-slate-700 dark:bg-slate-800">
              <button
                type="button"
                onClick={() => setLoopKind('for')}
                className={`rounded-md px-3 py-1 font-mono font-bold ${loopKind === 'for' ? 'bg-violet-600 text-white' : 'text-slate-600 dark:text-slate-300'}`}
              >
                for i in range(...)
              </button>
              <button
                type="button"
                onClick={() => setLoopKind('while')}
                className={`rounded-md px-3 py-1 font-mono font-bold ${loopKind === 'while' ? 'bg-violet-600 text-white' : 'text-slate-600 dark:text-slate-300'}`}
              >
                while guests &lt;= cap
              </button>
            </div>
          </div>

          {/* Loop Parameter Sliders & Controls */}
          <div className="mb-4 grid grid-cols-1 gap-3 rounded-lg border border-slate-200 bg-slate-50 p-3 text-xs dark:border-slate-800 dark:bg-slate-950/60 md:grid-cols-3">
            {loopKind === 'for' ? (
              <>
                <label className="flex items-center justify-between gap-2">
                  <span>شروع (<code className="font-mono">start</code>): <strong>{rangeStart}</strong></span>
                  <input type="range" min={0} max={4} value={rangeStart} onChange={(e) => setRangeStart(Number(e.target.value))} className="w-24 accent-violet-600" />
                </label>
                <label className="flex items-center justify-between gap-2">
                  <span>پایان (<code className="font-mono">stop</code>): <strong>{rangeStop}</strong></span>
                  <input type="range" min={5} max={12} value={rangeStop} onChange={(e) => setRangeStop(Number(e.target.value))} className="w-24 accent-violet-600" />
                </label>
                <label className="flex items-center justify-between gap-2">
                  <span>گام (<code className="font-mono">step</code>): <strong>{rangeStep}</strong></span>
                  <input type="range" min={1} max={3} value={rangeStep} onChange={(e) => setRangeStep(Number(e.target.value))} className="w-24 accent-violet-600" />
                </label>
              </>
            ) : (
              <label className="flex items-center justify-between gap-2 md:col-span-3">
                <span>ظرفیت تالار (<code className="font-mono">capacity</code>): <strong>{Math.min(8, rangeStop)} نفر</strong></span>
                <input type="range" min={3} max={8} value={Math.min(8, rangeStop)} onChange={(e) => setRangeStop(Number(e.target.value))} className="w-40 accent-violet-600" />
              </label>
            )}

            <label className="flex items-center gap-2">
              <input type="checkbox" checked={enableContinue} onChange={(e) => setEnableContinue(e.target.checked)} className="accent-amber-600" />
              <span>پرش با <code className="font-mono">continue</code> در عدد:</span>
              <input type="number" min={1} max={10} value={skipValue} onChange={(e) => setSkipValue(Number(e.target.value))} className="w-12 rounded border border-slate-300 bg-white px-1.5 py-0.5 text-center font-mono dark:border-slate-700 dark:bg-slate-900" />
            </label>

            <label className="flex items-center gap-2">
              <input type="checkbox" checked={enableBreak} onChange={(e) => setEnableBreak(e.target.checked)} className="accent-rose-600" />
              <span>توقف با <code className="font-mono">break</code> در عدد:</span>
              <input type="number" min={1} max={10} value={breakValue} onChange={(e) => setBreakValue(Number(e.target.value))} className="w-12 rounded border border-slate-300 bg-white px-1.5 py-0.5 text-center font-mono dark:border-slate-700 dark:bg-slate-900" />
            </label>

            <div className="flex items-center justify-end gap-1.5">
              <button
                type="button"
                onClick={() => {
                  if (loopCursor + 1 >= loopSteps.length) setLoopCursor(0);
                  setIsPlayingLoop((p) => !p);
                }}
                className="inline-flex items-center gap-1 rounded-lg bg-emerald-600 px-3 py-1.5 font-semibold text-white hover:bg-emerald-700"
              >
                {isPlayingLoop ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
                {isPlayingLoop ? 'توقف' : 'پخش'}
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsPlayingLoop(false);
                  setLoopCursor((c) => Math.min(loopSteps.length - 1, c + 1));
                }}
                disabled={loopCursor >= loopSteps.length - 1}
                className="inline-flex items-center gap-1 rounded-lg bg-sky-600 px-3 py-1.5 font-semibold text-white hover:bg-sky-700 disabled:opacity-40"
              >
                <SkipForward className="h-3.5 w-3.5" />
                گام بعدی
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsPlayingLoop(false);
                  setLoopCursor(-1);
                }}
                className="rounded-lg border border-slate-300 px-2.5 py-1.5 text-slate-600 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300"
              >
                <RotateCcw className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>

          {/* Visual Counter Track */}
          <div className="mb-3 flex flex-wrap items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 p-3 dark:border-slate-800 dark:bg-slate-950">
            {loopSteps.map((st, idx) => {
              const isCurrent = idx === loopCursor;
              const isVisited = idx <= loopCursor;
              const badgeColor =
                st.action === 'break'
                  ? 'border-rose-500 bg-rose-100 text-rose-900 dark:bg-rose-950 dark:text-rose-200'
                  : st.action === 'continue'
                  ? 'border-amber-500 bg-amber-100 text-amber-900 dark:bg-amber-950 dark:text-amber-200'
                  : 'border-emerald-500 bg-emerald-100 text-emerald-900 dark:bg-emerald-950 dark:text-emerald-200';
              return (
                <motion.div
                  key={`${st.counter}-${idx}`}
                  animate={{scale: isCurrent ? 1.12 : 1, opacity: isVisited ? 1 : 0.45}}
                  className={`flex min-w-[82px] flex-col items-center rounded-xl border-2 px-3 py-2 text-center ${
                    isVisited ? badgeColor : 'border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-900'
                  }`}
                >
                  <span className="font-mono text-[10px]">
                    {loopKind === 'for' ? 'i' : 'guests'} =
                  </span>
                  <span className="font-mono text-base font-extrabold">{st.counter}</span>
                  <span className="text-[10px] font-bold">
                    {st.action === 'break' ? 'break ✖' : st.action === 'continue' ? 'continue ↷' : 'اجرا ✓'}
                  </span>
                </motion.div>
              );
            })}
          </div>

          {/* Accumulated Console Output */}
          <div className="rounded-lg bg-slate-950 p-3 text-xs">
            <div className="mb-1 text-[11px] text-slate-400">
              گزارش زنده اجرای حلقه ({loopCursor < 0 ? 'آماده شروع' : `گام ${loopCursor + 1} از ${loopSteps.length}`}):
            </div>
            <div className="max-h-32 space-y-1 overflow-auto font-mono text-emerald-300">
              {loopCursor < 0 ? (
                <div className="text-slate-500">روی «گام بعدی» یا «پخش» کلیک کنید تا چرخه حلقه را زنده ببینید...</div>
              ) : (
                loopSteps.slice(0, loopCursor + 1).map((st, idx) => (
                  <div
                    key={idx}
                    className={
                      st.action === 'break'
                        ? 'text-rose-400'
                        : st.action === 'continue'
                        ? 'text-amber-300'
                        : 'text-emerald-300'
                    }
                  >
                    &gt; {st.output}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
