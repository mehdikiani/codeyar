import {useState} from 'react';
import {motion} from 'motion/react';
import {Layers, Rotate3d, LayoutGrid} from 'lucide-react';

export function CssBoxFlexLab() {
  // 3D Box Model Controls
  const [contentWidth, setContentWidth] = useState(200);
  const [padding, setPadding] = useState(20);
  const [border, setBorder] = useState(6);
  const [margin, setMargin] = useState(24);
  const [boxSizing, setBoxSizing] = useState<'content-box' | 'border-box'>('border-box');
  const [tilt3D, setTilt3D] = useState(true);

  // RTL Flexbox Playground Controls
  const [flexDir, setFlexDir] = useState<'row' | 'row-reverse' | 'column'>('row');
  const [justify, setJustify] = useState<'flex-start' | 'center' | 'space-between' | 'space-around'>('space-between');
  const [align, setAlign] = useState<'stretch' | 'flex-start' | 'center' | 'flex-end'>('center');
  const [gap, setGap] = useState(12);

  const renderedBoxWidth =
    boxSizing === 'border-box' ? contentWidth : contentWidth + padding * 2 + border * 2;
  const totalFootprintWidth = renderedBoxWidth + margin * 2;

  return (
    <div className="space-y-6">
      {/* 1. Interactive 3D CSS Box Model Inspector */}
      <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
          <div>
            <h3 className="flex items-center gap-2 text-base font-bold text-slate-900 dark:text-white">
              <Layers className="h-4 w-4 text-sky-600 dark:text-sky-400" />
              ۱. بازرس سه‌بعدی مدل جعبه‌ای CSS (اصلاح تعریف margin و padding ص ۱۱۶)
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              تفاوت واقعی <code className="font-mono">padding</code> (فاصله داخلی) و <code className="font-mono">margin</code> (فاصله خارجی) و اثر <code className="font-mono">box-sizing</code> را زنده ببینید.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setTilt3D((v) => !v)}
              className={`inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-semibold transition ${
                tilt3D
                  ? 'border-sky-500 bg-sky-50 text-sky-700 dark:bg-sky-950/70 dark:text-sky-300'
                  : 'border-slate-200 text-slate-600 dark:border-slate-700 dark:text-slate-300'
              }`}
            >
              <Rotate3d className="h-3.5 w-3.5" />
              {tilt3D ? 'نمای سه‌بعدی فعال' : 'نمای دوبعدی'}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* Interactive 3D Stage */}
          <div
            className="flex min-h-[290px] items-center justify-center overflow-hidden rounded-xl border border-slate-200 bg-slate-50 p-6 dark:border-slate-800 dark:bg-slate-950 lg:col-span-7"
            style={{perspective: '900px'}}
          >
            <motion.div
              animate={{
                rotateX: tilt3D ? 28 : 0,
                rotateZ: tilt3D ? -12 : 0,
              }}
              transition={{type: 'spring', stiffness: 180, damping: 20}}
              className="relative flex items-center justify-center rounded-xl border-2 border-dashed border-amber-400 bg-amber-100/70 shadow-lg dark:bg-amber-900/30"
              style={{
                padding: `${margin}px`,
                transformStyle: 'preserve-3d',
              }}
            >
              <span className="absolute top-1 right-2 font-mono text-[10px] font-bold text-amber-800 dark:text-amber-300">
                margin: {margin}px
              </span>

              {/* Border Layer */}
              <div
                className="relative flex items-center justify-center rounded-lg bg-slate-800 dark:bg-slate-200"
                style={{
                  padding: `${border}px`,
                }}
              >
                {/* Padding Layer */}
                <div
                  className="relative flex items-center justify-center rounded bg-emerald-200/90 dark:bg-emerald-900/70"
                  style={{
                    padding: `${padding}px`,
                  }}
                >
                  <span className="absolute top-0.5 right-1.5 font-mono text-[10px] font-bold text-emerald-900 dark:text-emerald-200">
                    padding: {padding}px
                  </span>

                  {/* Content Layer */}
                  <div
                    className="flex flex-col items-center justify-center rounded bg-sky-600 px-3 py-4 text-center text-white shadow-inner"
                    style={{
                      width: `${Math.max(110, boxSizing === 'border-box' ? contentWidth - padding * 2 - border * 2 : contentWidth)}px`,
                    }}
                  >
                    <span className="text-xs font-bold">محتوا (Content)</span>
                    <span dir="ltr" className="mt-1 font-mono text-[11px] opacity-90">
                      width: {contentWidth}px
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Sliders & Live Math */}
          <div className="flex flex-col justify-between gap-3 lg:col-span-5">
            <div className="space-y-3 rounded-xl border border-slate-200 bg-slate-50 p-3.5 dark:border-slate-800 dark:bg-slate-950/60">
              <div>
                <div className="mb-1 flex justify-between text-xs font-medium">
                  <span>عرض تعریف‌شده (<code className="font-mono">width</code>)</span>
                  <span className="font-mono font-bold text-sky-600">{contentWidth}px</span>
                </div>
                <input
                  type="range"
                  min={140}
                  max={280}
                  value={contentWidth}
                  onChange={(e) => setContentWidth(Number(e.target.value))}
                  className="w-full accent-sky-600"
                />
              </div>

              <div>
                <div className="mb-1 flex justify-between text-xs font-medium">
                  <span>فاصله داخلی (<code className="font-mono">padding</code>)</span>
                  <span className="font-mono font-bold text-emerald-600">{padding}px</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={44}
                  value={padding}
                  onChange={(e) => setPadding(Number(e.target.value))}
                  className="w-full accent-emerald-600"
                />
              </div>

              <div>
                <div className="mb-1 flex justify-between text-xs font-medium">
                  <span>ضخامت حاشیه (<code className="font-mono">border</code>)</span>
                  <span className="font-mono font-bold text-slate-700 dark:text-slate-300">{border}px</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={16}
                  value={border}
                  onChange={(e) => setBorder(Number(e.target.value))}
                  className="w-full accent-slate-600"
                />
              </div>

              <div>
                <div className="mb-1 flex justify-between text-xs font-medium">
                  <span>فاصله بیرونی (<code className="font-mono">margin</code>)</span>
                  <span className="font-mono font-bold text-amber-600">{margin}px</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={44}
                  value={margin}
                  onChange={(e) => setMargin(Number(e.target.value))}
                  className="w-full accent-amber-600"
                />
              </div>

              <div className="flex items-center gap-2 pt-1">
                <span className="text-xs font-medium">box-sizing:</span>
                {(['border-box', 'content-box'] as const).map((mode) => (
                  <button
                    key={mode}
                    type="button"
                    onClick={() => setBoxSizing(mode)}
                    className={`rounded-md px-2.5 py-1 font-mono text-xs font-semibold transition ${
                      boxSizing === mode
                        ? 'bg-sky-600 text-white'
                        : 'border border-slate-300 bg-white text-slate-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300'
                    }`}
                  >
                    {mode}
                  </button>
                ))}
              </div>
            </div>

            <div className="rounded-xl border border-sky-200 bg-sky-50/70 p-3 text-xs dark:border-sky-900 dark:bg-sky-950/40">
              <div className="font-bold text-sky-900 dark:text-sky-200">محاسبه زنده ابعاد نهایی جعبه:</div>
              <div className="mt-1.5 flex items-center justify-between">
                <span>عرض مرئی جعبه (تا لبه border):</span>
                <span className="font-mono font-bold text-sky-700 dark:text-sky-300">{renderedBoxWidth}px</span>
              </div>
              <div className="mt-1 flex items-center justify-between">
                <span>فضای کل اشغال‌شده با margin:</span>
                <span className="font-mono font-bold text-amber-700 dark:text-amber-300">{totalFootprintWidth}px</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Live RTL Flexbox Playground */}
      <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
          <div>
            <h3 className="flex items-center gap-2 text-base font-bold text-slate-900 dark:text-white">
              <LayoutGrid className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
              ۲. زمین بازی تعاملی Flexbox در صفحات فارسی (RTL)
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              دقت کنید در صفحات راست‌به‌چپ، <code className="font-mono">flex-start</code> سمت <strong>راست</strong> است و مقدار درست وسط‌چین <code className="font-mono">justify-content: center</code> (اصلاح باگ <code className="font-mono">space-center</code> ص ۱۳۸) است.
            </p>
          </div>
        </div>

        <div className="mb-3 flex flex-wrap gap-3 rounded-lg border border-slate-200 bg-slate-50 p-3 text-xs dark:border-slate-800 dark:bg-slate-950/60">
          <label className="flex items-center gap-1.5">
            <span className="font-mono font-semibold">flex-direction:</span>
            <select
              value={flexDir}
              onChange={(e) => setFlexDir(e.target.value as typeof flexDir)}
              className="rounded border border-slate-300 bg-white px-2 py-1 font-mono dark:border-slate-700 dark:bg-slate-900"
            >
              <option value="row">row</option>
              <option value="row-reverse">row-reverse</option>
              <option value="column">column</option>
            </select>
          </label>

          <label className="flex items-center gap-1.5">
            <span className="font-mono font-semibold">justify-content:</span>
            <select
              value={justify}
              onChange={(e) => setJustify(e.target.value as typeof justify)}
              className="rounded border border-slate-300 bg-white px-2 py-1 font-mono dark:border-slate-700 dark:bg-slate-900"
            >
              <option value="flex-start">flex-start</option>
              <option value="center">center</option>
              <option value="space-between">space-between</option>
              <option value="space-around">space-around</option>
            </select>
          </label>

          <label className="flex items-center gap-1.5">
            <span className="font-mono font-semibold">align-items:</span>
            <select
              value={align}
              onChange={(e) => setAlign(e.target.value as typeof align)}
              className="rounded border border-slate-300 bg-white px-2 py-1 font-mono dark:border-slate-700 dark:bg-slate-900"
            >
              <option value="stretch">stretch</option>
              <option value="flex-start">flex-start</option>
              <option value="center">center</option>
              <option value="flex-end">flex-end</option>
            </select>
          </label>

          <label className="flex items-center gap-1.5">
            <span className="font-mono font-semibold">gap: {gap}px</span>
            <input
              type="range"
              min={0}
              max={32}
              value={gap}
              onChange={(e) => setGap(Number(e.target.value))}
              className="w-20 accent-emerald-600"
            />
          </label>
        </div>

        <div
          dir="rtl"
          className="flex min-h-[160px] rounded-xl border-2 border-dashed border-emerald-300 bg-emerald-50/40 p-4 transition-all dark:border-emerald-800 dark:bg-emerald-950/20"
          style={{
            flexDirection: flexDir,
            justifyContent: justify,
            alignItems: align,
            gap: `${gap}px`,
          }}
        >
          {[
            {id: 1, title: 'کارت ۱: طراح سایت', h: 'min-h-[56px]'},
            {id: 2, title: 'کارت ۲: تولید محتوا', h: 'min-h-[82px]'},
            {id: 3, title: 'کارت ۳: پایگاه داده', h: 'min-h-[64px]'},
          ].map((card) => (
            <motion.div
              key={card.id}
              layout
              transition={{type: 'spring', stiffness: 320, damping: 24}}
              className={`${card.h} flex items-center justify-center rounded-lg bg-emerald-600 px-4 py-2 text-xs font-bold text-white shadow`}
            >
              {card.title}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
