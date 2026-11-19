import {useState} from 'react';
import {AnimatePresence, motion} from 'motion/react';
import {
  ArrowLeft,
  Compass,
  Cpu,
  Database,
  Play,
  RotateCcw,
  Sparkles,
} from 'lucide-react';

type SubLabId = 'structures' | 'function-machine' | 'turtle-canvas';

interface TurtleDrawSeg {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  color: string;
}

export function PythonFunctionsLab() {
  const [activeSubLab, setActiveSubLab] = useState<SubLabId>('structures');

  // --- Lab 1: Data Structures Interactive Comparator ---
  const [listVal, setListVal] = useState<string[]>(['پایتون', 'وب', 'جنگو']);
  const [tupleVal] = useState<string[]>(['پایتون', 'وب', 'جنگو']);
  const [setVal, setSetVal] = useState<string[]>(['پایتون', 'وب', 'جنگو']);
  const [dictVal, setDictVal] = useState<Record<string, string>>({
    lang: 'پایتون',
    track: 'وب',
    framework: 'جنگو',
  });
  const [structLog, setStructLog] = useState<string>(
    'روی دکمه‌های آزمایش کلیک کنید تا رفتار متفاوت list، tuple، set و dict را به‌صورت هم‌زمان ببینید.'
  );

  // --- Lab 2: Function Input/Output Machine ---
  const [fnPreset, setFnPreset] = useState<'tax' | 'greet' | 'squares'>('tax');
  const [arg1, setArg1] = useState('100000');
  const [arg2, setArg2] = useState('9');
  const [machineStep, setMachineStep] = useState<'idle' | 'input' | 'process' | 'output'>('idle');
  const [machineResult, setMachineResult] = useState<{
    printed: string;
    returned: string;
    typeLabel: string;
  } | null>(null);

  // --- Lab 3: Live Offline Turtle Canvas ---
  const [turtlePos, setTurtlePos] = useState({x: 0, y: 0, angle: 0});
  const [turtleColor, setTurtleColor] = useState('#0284c7');
  const [segments, setSegments] = useState<TurtleDrawSeg[]>([]);
  const [turtleCodeLines, setTurtleCodeLines] = useState<string[]>([
    'import turtle',
    'turtle.color("#0284c7")',
  ]);

  // --- Handlers for Lab 1 ---
  const testAddDuplicate = () => {
    setListVal((prev) => [...prev, 'پایتون']);
    // Set ignores duplicates automatically
    setSetVal((prev) => (prev.includes('پایتون') ? prev : [...prev, 'پایتون']));
    setDictVal((prev) => ({...prev, lang: 'پایتون (بازنویسی شد)'}));
    setStructLog(
      "آزمون افزودن تکراری 'پایتون': list عضو تکراری را پذیرفت | set تکراری را حذف کرد | tuple خطای تغییرناپذیری داد | dict مقدار کلید تکراری 'lang' را جایگزین کرد!"
    );
  };

  const testMutateFirst = () => {
    setListVal((prev) => ['HTML5', ...prev.slice(1)]);
    setSetVal((prev) => ['HTML5', ...prev.filter((x) => x !== 'پایتون' && x !== 'HTML5')]);
    setDictVal((prev) => ({...prev, lang: 'HTML5'}));
    setStructLog(
      "آزمون تغییر عضو اول به 'HTML5': list و dict به‌راحتی تغییر کردند، set اندیس [0] ندارد (باید حذف/اضافه شود) و tuple خطای TypeError: 'tuple' object does not support item assignment داد!"
    );
  };

  const testResetStructures = () => {
    setListVal(['پایتون', 'وب', 'جنگو']);
    setSetVal(['پایتون', 'وب', 'جنگو']);
    setDictVal({lang: 'پایتون', track: 'وب', framework: 'جنگو'});
    setStructLog('هر چهار ساختار داده به وضعیت اولیه بازنشانی شدند.');
  };

  // --- Handlers for Lab 2 ---
  const runFunctionMachine = () => {
    setMachineStep('input');
    setMachineResult(null);

    window.setTimeout(() => setMachineStep('process'), 350);
    window.setTimeout(() => {
      if (fnPreset === 'tax') {
        const price = Number(arg1) || 0;
        const rate = Number(arg2) || 9;
        const finalPrice = Math.round(price + (price * rate) / 100);
        setMachineResult({
          printed: '(بدون چاپ داخلی)',
          returned: String(finalPrice),
          typeLabel: 'int (قابل ذخیره در متغیر و محاسبات بعدی)',
        });
      } else if (fnPreset === 'greet') {
        const name = arg1.trim() || 'هنرجو';
        setMachineResult({
          printed: `سلام ${name}، به کلاس پایتون خوش آمدید!`,
          returned: 'None',
          typeLabel: 'NoneType (چون دستور return ندارد!)',
        });
      } else {
        const n = Math.max(1, Math.min(6, Number(arg1) || 4));
        const list = Array.from({length: n}, (_, i) => (i + 1) * (i + 1));
        setMachineResult({
          printed: `حلقه ${n} بار داخل تابع اجرا شد`,
          returned: `[${list.join(', ')}]`,
          typeLabel: 'list (خروجی لیست ساخته‌شده توسط حلقه)',
        });
      }
      setMachineStep('output');
    }, 850);
  };

  // --- Handlers for Lab 3 (Turtle) ---
  const moveTurtle = (dist: number) => {
    const rad = (turtlePos.angle * Math.PI) / 180;
    const nx = turtlePos.x + Math.cos(rad) * dist;
    const ny = turtlePos.y + Math.sin(rad) * dist;
    setSegments((prev) => [...prev, {x1: turtlePos.x, y1: turtlePos.y, x2: nx, y2: ny, color: turtleColor}]);
    setTurtlePos((prev) => ({...prev, x: nx, y: ny}));
    setTurtleCodeLines((prev) => [...prev, `turtle.forward(${dist})`]);
  };

  const turnTurtle = (deg: number) => {
    setTurtlePos((prev) => ({...prev, angle: prev.angle + deg}));
    setTurtleCodeLines((prev) => [
      ...prev,
      deg >= 0 ? `turtle.right(${deg})` : `turtle.left(${Math.abs(deg)})`,
    ]);
  };

  const runTurtlePreset = (shape: 'square' | 'star' | 'hex' | 'flower') => {
    let x = 0;
    let y = 0;
    let angle = 0;
    const segs: TurtleDrawSeg[] = [];
    const stepForward = (dist: number, color: string) => {
      const rad = (angle * Math.PI) / 180;
      const nx = x + Math.cos(rad) * dist;
      const ny = y + Math.sin(rad) * dist;
      segs.push({x1: x, y1: y, x2: nx, y2: ny, color});
      x = nx;
      y = ny;
    };

    if (shape === 'square') {
      for (let i = 0; i < 4; i++) {
        stepForward(90, '#0284c7');
        angle += 90;
      }
      setTurtleCodeLines([
        'import turtle',
        'turtle.color("#0284c7")',
        'for _ in range(4):',
        '    turtle.forward(90)',
        '    turtle.right(90)',
      ]);
    } else if (shape === 'star') {
      for (let i = 0; i < 5; i++) {
        stepForward(120, '#e11d48');
        angle += 144;
      }
      setTurtleCodeLines([
        'import turtle',
        'turtle.color("#e11d48")',
        'for _ in range(5):',
        '    turtle.forward(120)',
        '    turtle.right(144)',
      ]);
    } else if (shape === 'hex') {
      for (let i = 0; i < 6; i++) {
        stepForward(65, '#059669');
        angle += 60;
      }
      setTurtleCodeLines([
        'import turtle',
        'turtle.color("#059669")',
        'for _ in range(6):',
        '    turtle.forward(65)',
        '    turtle.right(60)',
      ]);
    } else {
      const palette = ['#0284c7', '#7c3aed', '#059669', '#d97706', '#e11d48', '#0891b2'];
      for (let p = 0; p < 6; p++) {
        for (let s = 0; s < 4; s++) {
          stepForward(55, palette[p % palette.length]);
          angle += 90;
        }
        angle += 60;
      }
      setTurtleCodeLines([
        'import turtle',
        'for _ in range(6):',
        '    for _ in range(4):',
        '        turtle.forward(55)',
        '        turtle.right(90)',
        '    turtle.right(60)',
      ]);
    }
    setSegments(segs);
    setTurtlePos({x, y, angle});
  };

  const clearTurtle = () => {
    setSegments([]);
    setTurtlePos({x: 0, y: 0, angle: 0});
    setTurtleCodeLines(['import turtle', `turtle.color("${turtleColor}")`]);
  };

  const SUB_TABS: {id: SubLabId; label: string; icon: typeof Database}[] = [
    {id: 'structures', label: '۱. مقایسه‌گر list / tuple / set / dict', icon: Database},
    {id: 'function-machine', label: '۲. ماشین ورودی/خروجی تابع', icon: Cpu},
    {id: 'turtle-canvas', label: '۳. بوم زنده آفلاین Turtle', icon: Compass},
  ];

  return (
    <div className="space-y-4">
      {/* Sub-Lab Switcher */}
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
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
              <span>{t.label}</span>
            </button>
          );
        })}
      </div>

      {/* SUB-LAB 1: Data Structures Interactive Comparator */}
      {activeSubLab === 'structures' && (
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                مقایسه زنده ۴ ساختار داده پایتون (آزمون تکرار، تغییرپذیری و ترتیب)
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                دکمه‌های آزمون را بزنید و تفاوت عملی هر چهار ساختار را در یک نگاه ببینید.
              </p>
            </div>
            <div className="flex flex-wrap gap-1.5">
              <button
                type="button"
                onClick={testAddDuplicate}
                className="rounded-lg bg-sky-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-sky-700"
              >
                + تست افزودن عضو تکراری (&apos;پایتون&apos;)
              </button>
              <button
                type="button"
                onClick={testMutateFirst}
                className="rounded-lg bg-amber-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-amber-700"
              >
                تست تغییر عضو اول ← &apos;HTML5&apos;
              </button>
              <button
                type="button"
                onClick={testResetStructures}
                className="inline-flex items-center gap-1 rounded-lg border border-slate-200 px-2.5 py-1.5 text-xs text-slate-600 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                بازنشانی
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-xl border border-sky-200 bg-sky-50/60 p-3 dark:border-sky-900 dark:bg-sky-950/40">
              <div className="flex items-center justify-between">
                <span className="font-mono text-sm font-extrabold text-sky-700 dark:text-sky-300">list [...]</span>
                <span className="text-[10px] font-bold text-emerald-700 dark:text-emerald-300">مرتب | تغییرپذیر | تکراری مجاز</span>
              </div>
              <div dir="ltr" className="mt-2 min-h-[54px] rounded-lg bg-white p-2 font-mono text-xs text-slate-800 dark:bg-slate-950 dark:text-sky-200">
                [{listVal.map((v) => `'${v}'`).join(', ')}]
              </div>
            </div>

            <div className="rounded-xl border border-violet-200 bg-violet-50/60 p-3 dark:border-violet-900 dark:bg-violet-950/40">
              <div className="flex items-center justify-between">
                <span className="font-mono text-sm font-extrabold text-violet-700 dark:text-violet-300">tuple (...)</span>
                <span className="text-[10px] font-bold text-rose-700 dark:text-rose-300">مرتب | تغییرناپذیر (قفل)</span>
              </div>
              <div dir="ltr" className="mt-2 min-h-[54px] rounded-lg bg-white p-2 font-mono text-xs text-slate-800 dark:bg-slate-950 dark:text-violet-200">
                ({tupleVal.map((v) => `'${v}'`).join(', ')})
              </div>
            </div>

            <div className="rounded-xl border border-emerald-200 bg-emerald-50/60 p-3 dark:border-emerald-900 dark:bg-emerald-950/40">
              <div className="flex items-center justify-between">
                <span className="font-mono text-sm font-extrabold text-emerald-700 dark:text-emerald-300">set {'{...}'}</span>
                <span className="text-[10px] font-bold text-amber-700 dark:text-amber-300">بدون تکرار | بدون اندیس</span>
              </div>
              <div dir="ltr" className="mt-2 min-h-[54px] rounded-lg bg-white p-2 font-mono text-xs text-slate-800 dark:bg-slate-950 dark:text-emerald-200">
                {'{'}{setVal.map((v) => `'${v}'`).join(', ')}{'}'}
              </div>
            </div>

            <div className="rounded-xl border border-amber-200 bg-amber-50/60 p-3 dark:border-amber-900 dark:bg-amber-950/40">
              <div className="flex items-center justify-between">
                <span className="font-mono text-sm font-extrabold text-amber-700 dark:text-amber-300">dict {'{k: v}'}</span>
                <span className="text-[10px] font-bold text-sky-700 dark:text-sky-300">کلید یکتا | دسترسی سریع</span>
              </div>
              <div dir="ltr" className="mt-2 min-h-[54px] rounded-lg bg-white p-2 font-mono text-xs text-slate-800 dark:bg-slate-950 dark:text-amber-200">
                {'{'}{Object.entries(dictVal).map(([k, v]) => `'${k}': '${v}'`).join(', ')}{'}'}
              </div>
            </div>
          </div>

          <div className="mt-3 rounded-lg border border-slate-200 bg-slate-50 p-3 text-xs font-medium leading-6 text-slate-700 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300">
            {structLog}
          </div>
        </div>
      )}

      {/* SUB-LAB 2: Function Input/Output Machine */}
      {activeSubLab === 'function-machine' && (
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
            <div>
              <h3 className="flex items-center gap-2 text-base font-bold text-slate-900 dark:text-white">
                <Cpu className="h-4 w-4 text-violet-600" />
                ماشین ورودی/خروجی تابع (تفاوت واقعی <code className="font-mono">return</code> و <code className="font-mono">None</code>)
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                یک تابع انتخاب کنید، آرگومان‌ها را وارد کرده و دکمه اجرا را بزنید تا جریان داده درون ماشین تابع را ببینید.
              </p>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {[
                {id: 'tax' as const, label: 'تابع با return و پیش‌فرض (مالیات)'},
                {id: 'greet' as const, label: 'تابع فقط با print (خروجی None!)'},
                {id: 'squares' as const, label: 'تابع با حلقه for داخلی'},
              ].map((p) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => {
                    setFnPreset(p.id);
                    setMachineStep('idle');
                    setMachineResult(null);
                    if (p.id === 'tax') { setArg1('100000'); setArg2('9'); }
                    else if (p.id === 'greet') { setArg1('سارا'); }
                    else { setArg1('4'); }
                  }}
                  className={`rounded-lg border px-2.5 py-1.5 text-xs font-semibold ${
                    fnPreset === p.id
                      ? 'border-violet-600 bg-violet-600 text-white'
                      : 'border-slate-200 bg-slate-50 text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300'
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 items-center gap-4 lg:grid-cols-12">
            {/* Inputs (Arguments) */}
            <div className="space-y-2.5 rounded-xl border border-sky-200 bg-sky-50/70 p-3.5 dark:border-sky-900 dark:bg-sky-950/40 lg:col-span-4">
              <div className="text-xs font-bold text-sky-900 dark:text-sky-200">۱. آرگومان‌های ورودی (Arguments)</div>
              <div>
                <label className="mb-1 block text-[11px] text-slate-600 dark:text-slate-300">
                  {fnPreset === 'tax' ? 'قیمت کالا (price):' : fnPreset === 'greet' ? 'نام کاربر (name):' : 'تعداد تکرار (n بین ۱ تا ۶):'}
                </label>
                <input
                  dir="auto"
                  type="text"
                  value={arg1}
                  onChange={(e) => setArg1(e.target.value)}
                  className="w-full rounded-lg border border-slate-300 bg-white px-2.5 py-1.5 font-mono text-xs dark:border-slate-700 dark:bg-slate-900"
                />
              </div>
              {fnPreset === 'tax' && (
                <div>
                  <label className="mb-1 block text-[11px] text-slate-600 dark:text-slate-300">درصد مالیات (پیش‌فرض rate=9):</label>
                  <input
                    dir="ltr"
                    type="text"
                    value={arg2}
                    onChange={(e) => setArg2(e.target.value)}
                    className="w-full rounded-lg border border-slate-300 bg-white px-2.5 py-1.5 font-mono text-xs dark:border-slate-700 dark:bg-slate-900"
                  />
                </div>
              )}
              <button
                type="button"
                onClick={runFunctionMachine}
                className="inline-flex w-full items-center justify-center gap-1.5 rounded-lg bg-emerald-600 px-3 py-2 text-xs font-bold text-white hover:bg-emerald-700"
              >
                <Play className="h-3.5 w-3.5" />
                ارسال آرگومان و اجرای تابع
              </button>
            </div>

            {/* Machine Body */}
            <motion.div
              animate={{
                scale: machineStep === 'process' ? 1.03 : 1,
                borderColor: machineStep === 'process' ? '#7c3aed' : '#334155',
              }}
              className="rounded-xl border-2 bg-slate-950 p-4 text-left text-slate-100 lg:col-span-4"
            >
              <div className="mb-2 flex items-center justify-between text-[11px] text-violet-300">
                <span>۲. بدنه تابع (def)</span>
                {machineStep === 'process' && (
                  <span className="inline-flex items-center gap-1 text-emerald-400">
                    <Sparkles className="h-3.5 w-3.5" /> در حال پردازش...
                  </span>
                )}
              </div>
              <pre dir="ltr" className="overflow-auto font-mono text-xs leading-6 text-sky-300">
                {fnPreset === 'tax'
                  ? `def add_tax(price, rate=9):\n    total = price + price * rate / 100\n    return int(total)`
                  : fnPreset === 'greet'
                  ? `def greet(name):\n    print(f"سلام {name}!")\n    # هیچ دستوری با return نیست`
                  : `def get_squares(n):\n    result = []\n    for i in range(1, n + 1):\n        result.append(i * i)\n    return result`}
              </pre>
            </motion.div>

            {/* Output */}
            <div className="rounded-xl border border-emerald-200 bg-emerald-50/70 p-3.5 dark:border-emerald-900 dark:bg-emerald-950/40 lg:col-span-4">
              <div className="mb-2 flex items-center gap-1.5 text-xs font-bold text-emerald-900 dark:text-emerald-200">
                <ArrowLeft className="h-4 w-4" />
                ۳. خروجی بازگشتی (Return Value)
              </div>
              <AnimatePresence mode="wait">
                {machineResult ? (
                  <motion.div
                    key={machineResult.returned + machineResult.printed}
                    initial={{opacity: 0, x: 16}}
                    animate={{opacity: 1, x: 0}}
                    className="space-y-2 text-xs"
                  >
                    <div className="rounded-lg bg-white p-2 dark:bg-slate-900">
                      <span className="text-[11px] text-slate-500">چاپ در صفحه (print):</span>
                      <div className="mt-0.5 font-semibold text-slate-800 dark:text-slate-100">{machineResult.printed}</div>
                    </div>
                    <div className="rounded-lg bg-slate-950 p-2.5 text-left font-mono">
                      <div className="text-[10px] text-slate-400">return value:</div>
                      <div className={`text-sm font-extrabold ${machineResult.returned === 'None' ? 'text-rose-400' : 'text-emerald-400'}`}>
                        {machineResult.returned}
                      </div>
                      <div dir="rtl" className="mt-1 font-sans text-[11px] text-slate-300">
                        {machineResult.typeLabel}
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <div className="py-6 text-center text-xs text-slate-500">
                    دکمه «ارسال آرگومان و اجرای تابع» را بزنید تا مقدار بازگشتی را ببینید.
                  </div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      )}

      {/* SUB-LAB 3: Live Offline Turtle Canvas */}
      {activeSubLab === 'turtle-canvas' && (
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
            <div>
              <h3 className="flex items-center gap-2 text-base font-bold text-slate-900 dark:text-white">
                <Compass className="h-4 w-4 text-sky-600" />
                بوم زنده آفلاین <code className="font-mono">turtle</code> (آموزش ماژول‌های گرافیکی و حلقه)
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                لاک‌پشت را با دکمه‌ها حرکت دهید یا الگوهای آماده را بزنید تا هم‌زمان کد معادل پایتون تولید شود.
              </p>
            </div>
            <div className="flex flex-wrap gap-1.5">
              <button type="button" onClick={() => runTurtlePreset('square')} className="rounded-lg bg-sky-100 px-2.5 py-1 text-xs font-bold text-sky-800 hover:bg-sky-200 dark:bg-sky-950 dark:text-sky-300">مربع</button>
              <button type="button" onClick={() => runTurtlePreset('star')} className="rounded-lg bg-rose-100 px-2.5 py-1 text-xs font-bold text-rose-800 hover:bg-rose-200 dark:bg-rose-950 dark:text-rose-300">ستاره پنج‌پر</button>
              <button type="button" onClick={() => runTurtlePreset('hex')} className="rounded-lg bg-emerald-100 px-2.5 py-1 text-xs font-bold text-emerald-800 hover:bg-emerald-200 dark:bg-emerald-950 dark:text-emerald-300">شش‌ضلعی</button>
              <button type="button" onClick={() => runTurtlePreset('flower')} className="rounded-lg bg-violet-100 px-2.5 py-1 text-xs font-bold text-violet-800 hover:bg-violet-200 dark:bg-violet-950 dark:text-violet-300">گل هندسی (حلقه تودرتو)</button>
              <button type="button" onClick={clearTurtle} className="inline-flex items-center gap-1 rounded-lg border border-slate-200 px-2.5 py-1 text-xs text-slate-600 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300">
                <RotateCcw className="h-3.5 w-3.5" />
                پاک کردن
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
            {/* Interactive Canvas */}
            <div className="space-y-3 lg:col-span-7">
              <svg
                viewBox="-180 -130 360 260"
                className="h-64 w-full rounded-xl border border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-950"
              >
                {/* Faint coordinate crosshair */}
                <line x1="-180" y1="0" x2="180" y2="0" stroke="rgba(148,163,184,0.22)" strokeDasharray="4 4" />
                <line x1="0" y1="-130" x2="0" y2="130" stroke="rgba(148,163,184,0.22)" strokeDasharray="4 4" />
                {segments.map((s, i) => (
                  <motion.line
                    key={i}
                    initial={{pathLength: 0}}
                    animate={{pathLength: 1}}
                    transition={{duration: 0.25}}
                    x1={s.x1}
                    y1={s.y1}
                    x2={s.x2}
                    y2={s.y2}
                    stroke={s.color}
                    strokeWidth={3}
                    strokeLinecap="round"
                  />
                ))}
                {/* Turtle cursor triangle */}
                <g transform={`translate(${turtlePos.x}, ${turtlePos.y}) rotate(${turtlePos.angle})`}>
                  <polygon points="10,0 -6,-6 -3,0 -6,6" fill="#0f172a" stroke="#38bdf8" strokeWidth="1.5" />
                </g>
              </svg>

              {/* Manual Movement Controls */}
              <div className="flex flex-wrap items-center justify-between gap-2 rounded-lg border border-slate-200 bg-slate-50 p-2.5 dark:border-slate-800 dark:bg-slate-950">
                <div className="flex flex-wrap gap-1.5">
                  <button type="button" onClick={() => moveTurtle(45)} className="rounded-md bg-sky-600 px-2.5 py-1 font-mono text-xs font-semibold text-white hover:bg-sky-700">forward(45)</button>
                  <button type="button" onClick={() => turnTurtle(90)} className="rounded-md bg-slate-800 px-2.5 py-1 font-mono text-xs font-semibold text-white hover:bg-slate-700">right(90)</button>
                  <button type="button" onClick={() => turnTurtle(-60)} className="rounded-md bg-slate-800 px-2.5 py-1 font-mono text-xs font-semibold text-white hover:bg-slate-700">left(60)</button>
                </div>
                <div className="flex items-center gap-1.5">
                  {['#0284c7', '#059669', '#e11d48', '#d97706', '#7c3aed'].map((hex) => (
                    <button
                      key={hex}
                      type="button"
                      onClick={() => {
                        setTurtleColor(hex);
                        setTurtleCodeLines((prev) => [...prev, `turtle.color("${hex}")`]);
                      }}
                      className={`h-5 w-5 rounded-full border-2 ${turtleColor === hex ? 'border-slate-900 dark:border-white scale-110' : 'border-transparent'}`}
                      style={{backgroundColor: hex}}
                      title={hex}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Auto-generated Python Code */}
            <div className="flex flex-col rounded-xl border border-slate-200 bg-slate-950 p-3.5 text-slate-100 lg:col-span-5">
              <div className="mb-2 text-xs text-slate-400">کد پایتون معادل حرکت‌های شما:</div>
              <pre dir="ltr" className="max-h-64 flex-1 overflow-auto text-left font-mono text-xs leading-6 text-emerald-300">
                {turtleCodeLines.join('\n')}
              </pre>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
