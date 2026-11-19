import {useState} from 'react';
import {motion} from 'motion/react';
import {Globe, Server, Layers, MousePointerClick, Shield, FileJson} from 'lucide-react';
import type {VisualLabSpec} from '../../types/curriculum.ts';
import {PythonMemoryListLab} from './PythonMemoryListLab.tsx';
import {PythonFunctionsLab} from './PythonFunctionsLab.tsx';
import {CssBoxFlexLab} from './CssBoxFlexLab.tsx';
import {DjangoMvtSqliteLab} from './DjangoMvtSqliteLab.tsx';

function InteractiveWebDnsSemanticLab() {
  const [step, setStep] = useState(0);
  const [selectedTag, setSelectedTag] = useState<'header' | 'nav' | 'main' | 'aside' | 'footer'>('header');
  const flow = [
    {label: '۱. مرورگر کاربر', desc: 'نشانی marjanow.ir تایپ می‌شود.'},
    {label: '۲. سرور DNS', desc: 'نام دامنه به نشانی عددی IP تبدیل می‌شود.'},
    {label: '۳. درخواست HTTP', desc: 'بسته HTTP Request به سرور میزبان ارسال می‌شود.'},
    {label: '۴. پاسخ HTML/CSS', desc: 'سرور کد HTML را برمی‌گرداند و مرورگر صفحه را رسم می‌کند.'},
  ];
  const tagDesc = {
    header: 'بخش سرصفحه (لوگو، عنوان سایت و جستجو) — کمک به موتورهای جستجو و صفحه‌خوان‌ها.',
    nav: 'نوار ناوبری و پیوندهای اصلی بین صفحات فروشگاه کتاب «مرجع نو».',
    main: 'محتوای اصلی و یکتای صفحه (بخش محصولات، مقالات و جزئیات کتاب).',
    aside: 'ستون کناری برای فیلترها، پیشنهادها یا اطلاعات تکمیلی غیرمستقیم.',
    footer: 'پاورقی صفحه شامل اطلاعات تماس، شبکه‌های اجتماعی و حق نشر.',
  };

  return (
    <div className="space-y-5">
      <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="flex items-center gap-2 text-base font-bold">
            <Globe className="h-4 w-4 text-sky-600" />
            ۱. پویانمایی مسیر درخواست وب (DNS ← HTTP ← Server)
          </h3>
          <button
            type="button"
            onClick={() => setStep((s) => (s + 1) % flow.length)}
            className="rounded-lg bg-sky-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-sky-700"
          >
            گام بعدی بسته
          </button>
        </div>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-4">
          {flow.map((item, idx) => (
            <motion.button
              key={item.label}
              type="button"
              onClick={() => setStep(idx)}
              animate={{scale: step === idx ? 1.03 : 1}}
              className={`rounded-xl border p-3 text-right ${
                step === idx
                  ? 'border-sky-500 bg-sky-50 dark:bg-sky-950/60'
                  : 'border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-950/40'
              }`}
            >
              <div className="text-xs font-bold text-sky-700 dark:text-sky-300">{item.label}</div>
              <div className="mt-1 text-xs text-slate-600 dark:text-slate-400">{item.desc}</div>
            </motion.button>
          ))}
        </div>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <h3 className="mb-3 text-base font-bold">۲. کاوشگر تعاملی تگ‌های معنایی (Semantic HTML5)</h3>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-12">
          <div className="space-y-2 md:col-span-7">
            <button
              type="button"
              onClick={() => setSelectedTag('header')}
              className={`w-full rounded-lg border-2 p-3 font-mono text-xs font-bold ${selectedTag === 'header' ? 'border-sky-600 bg-sky-100 text-sky-900' : 'border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-800'}`}
            >
              &lt;header&gt; سرصفحه فروشگاه مرجع نو &lt;/header&gt;
            </button>
            <button
              type="button"
              onClick={() => setSelectedTag('nav')}
              className={`w-full rounded-lg border-2 p-2.5 font-mono text-xs font-bold ${selectedTag === 'nav' ? 'border-emerald-600 bg-emerald-100 text-emerald-900' : 'border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-800'}`}
            >
              &lt;nav&gt; خانه | کتاب‌ها | سبد خرید | درباره ما &lt;/nav&gt;
            </button>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setSelectedTag('main')}
                className={`col-span-2 rounded-lg border-2 p-6 font-mono text-xs font-bold ${selectedTag === 'main' ? 'border-violet-600 bg-violet-100 text-violet-900' : 'border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-800'}`}
              >
                &lt;main&gt; (&lt;section&gt; / &lt;article&gt;) &lt;/main&gt;
              </button>
              <button
                type="button"
                onClick={() => setSelectedTag('aside')}
                className={`rounded-lg border-2 p-6 font-mono text-xs font-bold ${selectedTag === 'aside' ? 'border-amber-600 bg-amber-100 text-amber-900' : 'border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-800'}`}
              >
                &lt;aside&gt;
              </button>
            </div>
            <button
              type="button"
              onClick={() => setSelectedTag('footer')}
              className={`w-full rounded-lg border-2 p-3 font-mono text-xs font-bold ${selectedTag === 'footer' ? 'border-rose-600 bg-rose-100 text-rose-900' : 'border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-800'}`}
            >
              &lt;footer&gt; پاورقی و اطلاعات تماس &lt;/footer&gt;
            </button>
          </div>
          <div className="flex flex-col justify-center rounded-xl border border-sky-200 bg-sky-50/70 p-4 dark:border-sky-900 dark:bg-sky-950/40 md:col-span-5">
            <div dir="ltr" className="font-mono text-sm font-bold text-sky-700 dark:text-sky-300">
              &lt;{selectedTag}&gt;
            </div>
            <p className="mt-2 text-sm leading-7 text-slate-700 dark:text-slate-200">{tagDesc[selectedTag]}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function InteractiveBootstrapGridLab() {
  const [widthPx, setWidthPx] = useState(1024);
  const bp =
    widthPx >= 1200 ? 'xl (≥1200px)' : widthPx >= 992 ? 'lg (≥992px)' : widthPx >= 768 ? 'md (≥768px)' : widthPx >= 576 ? 'sm (≥576px)' : 'xs (<576px)';
  const cols = widthPx >= 992 ? 4 : widthPx >= 768 ? 2 : 1;

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <h3 className="flex items-center gap-2 text-base font-bold">
          <Layers className="h-4 w-4 text-amber-600" />
          شبیه‌ساز زنده شبکه ۱۲ ستونه و Breakpoints بوت‌استرپ ۵.۳
        </h3>
        <span dir="ltr" className="rounded-md bg-amber-100 px-2.5 py-1 font-mono text-xs font-bold text-amber-900 dark:bg-amber-950 dark:text-amber-300">
          {widthPx}px → {bp} ({cols} ستون)
        </span>
      </div>
      <div className="mb-4">
        <input
          type="range"
          min={360}
          max={1320}
          value={widthPx}
          onChange={(e) => setWidthPx(Number(e.target.value))}
          className="w-full accent-amber-600"
        />
      </div>
      <div className="grid gap-3" style={{gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`}}>
        {['کتاب طراح سایت', 'تولید محتوا', 'پایگاه داده', 'برنامه‌نویسی پایتون'].map((title) => (
          <motion.div
            key={title}
            layout
            className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-center text-xs font-bold text-amber-950 dark:border-amber-900 dark:bg-amber-950/50 dark:text-amber-200"
          >
            <div>{title}</div>
            <div dir="ltr" className="mt-1 font-mono text-[10px] opacity-75">
              col-12 col-md-6 col-lg-3
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function InteractiveGenericSimulator({
  icon,
  title,
  items,
}: {
  icon: 'func' | 'dom' | 'oop' | 'json';
  title: string;
  items: {label: string; code: string; result: string; note: string}[];
}) {
  const [selected, setSelected] = useState(0);
  const current = items[selected];
  const IconComp =
    icon === 'dom' ? MousePointerClick : icon === 'oop' ? Shield : icon === 'json' ? FileJson : Server;

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <h3 className="mb-3 flex items-center gap-2 text-base font-bold text-slate-900 dark:text-white">
        <IconComp className="h-4 w-4 text-sky-600 dark:text-sky-400" />
        {title}
      </h3>
      <div className="mb-4 flex flex-wrap gap-2">
        {items.map((it, idx) => (
          <button
            key={it.label}
            type="button"
            onClick={() => setSelected(idx)}
            className={`rounded-lg border px-3 py-1.5 text-xs font-semibold transition ${
              selected === idx
                ? 'border-sky-600 bg-sky-600 text-white'
                : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200'
            }`}
          >
            {it.label}
          </button>
        ))}
      </div>
      <motion.div
        key={current.label}
        initial={{opacity: 0, y: 8}}
        animate={{opacity: 1, y: 0}}
        className="grid grid-cols-1 gap-3 md:grid-cols-2"
      >
        <div dir="ltr" className="rounded-lg bg-slate-950 p-3 font-mono text-xs text-sky-300 whitespace-pre-wrap">
          {current.code}
        </div>
        <div className="flex flex-col justify-between rounded-lg border border-emerald-200 bg-emerald-50/70 p-3 dark:border-emerald-900 dark:bg-emerald-950/40">
          <div dir="ltr" className="font-mono text-xs font-bold text-emerald-800 dark:text-emerald-300">
            {current.result}
          </div>
          <p className="mt-2 text-xs leading-6 text-slate-700 dark:text-slate-300">{current.note}</p>
        </div>
      </motion.div>
    </div>
  );
}

export function VisualLabRegistry({spec}: {spec: VisualLabSpec}) {
  switch (spec.id) {
    case 'python-memory-list':
      return <PythonMemoryListLab />;
    case 'css-box-flex-grid':
      return <CssBoxFlexLab />;
    case 'django-orm-sqlite':
    case 'django-mvt-cycle':
      return <DjangoMvtSqliteLab />;
    case 'web-dns-semantic':
      return <InteractiveWebDnsSemanticLab />;
    case 'bootstrap-grid-breakpoints':
      return <InteractiveBootstrapGridLab />;
    case 'python-functions-structures':
      return <PythonFunctionsLab />;
    case 'js-dom-events':
      return (
        <InteractiveGenericSimulator
          icon="dom"
          title="آزمایشگاه مقایسه == در برابر === و رویدادهای DOM"
          items={[
            {
              label: 'مقایسه سست (==)',
              code: "5 == '5'   // تبدیل نوع ضمنی انجام می‌شود",
              result: 'true',
              note: 'در مقایسه == جاوااسکریپت رشته را به عدد تبدیل می‌کند که گاهی منبع باگ است.',
            },
            {
              label: 'مقایسه سخت‌گیرانه (===)',
              code: "5 === '5'  // هم مقدار و هم نوع بررسی می‌شود",
              result: 'false',
              note: 'روش استاندارد و توصیه‌شده در برنامه‌نویسی حرفه‌ای جاوااسکریپت.',
            },
            {
              label: 'انتخاب عنصر (querySelector)',
              code: "const title = document.querySelector('#welcome');\ntitle.textContent = 'خوش آمدید!';",
              result: 'DOM Updated ✓',
              note: 'تکمیل شکاف جدول ارزشیابی ص ۲۳۲: با انتخابگر CSS هر عنصر DOM را تغییر دهید.',
            },
          ]}
        />
      );
    case 'python-oop-factory':
      return (
        <InteractiveGenericSimulator
          icon="oop"
          title="کارخانه کلاس، وراثت، کپسوله‌سازی و متاکلاس‌ها (تکمیل هدف ۵ ص ۲۳۴)"
          items={[
            {
              label: 'ساخت شیء از کلاس Mobile',
              code: "m1 = Mobile('Samsung', 'A55')\ntype(m1)",
              result: "<class 'Mobile'>",
              note: 'm1 یک نمونه (Instance) از نقشه کلاس Mobile است.',
            },
            {
              label: 'متاکلاس (type روی خود کلاس)',
              code: 'type(Mobile)  # کلاسِ سازنده کلاس‌ها چیست؟',
              result: "<class 'type'>",
              note: 'تکمیل ردیف ۵ جدول ارزشیابی ص ۲۵۲: در پایتون خود کلاس‌ها نیز شیء هستند و سازنده آن‌ها متاکلاس type است.',
            },
            {
              label: 'کپسوله‌سازی (__battery)',
              code: 'self.__battery = 100  # ویژگی خصوصی\n# دسترسی از طریق متد get_battery()',
              result: '100%',
              note: 'اصلاح فاصله غلط self._ _battery در ص ۲۵۰ و حفاظت از داده‌های حساس شیء.',
            },
          ]}
        />
      );
    case 'python-exceptions-json':
    default:
      return (
        <InteractiveGenericSimulator
          icon="json"
          title="شبیه‌ساز جریان try/except/else و تبدیل دیکشنری ⇄ JSON"
          items={[
            {
              label: 'خطای تقسیم بر صفر',
              code: 'try:\n    res = 10 / 0\nexcept ZeroDivisionError:\n    print("تقسیم بر صفر مجاز نیست")',
              result: 'تقسیم بر صفر مجاز نیست',
              note: 'به‌جای کرش برنامه، کنترل به بلوک except منتقل می‌شود.',
            },
            {
              label: 'json.dumps (تبدیل به رشته JSON)',
              code: "json.dumps({'city': 'تهران', 'temp': 19}, indent=4)",
              result: '{\n  "city": "تهران",\n  "temp": 19\n}',
              note: 'اصلاح خلط کتاب ص ۲۷۰: dumps (با s) خروجی رشته‌ای می‌سازد که با Path.write_text ذخیره می‌شود.',
            },
            {
              label: 'json.loads (خواندن JSON)',
              code: "data = json.loads('{\"brand\": \"Nokia\"}')\ndata['brand']",
              result: 'Nokia',
              note: 'رشته JSON خوانده‌شده از فایل دوباره به دیکشنری/لیست پایتون تبدیل می‌شود.',
            },
          ]}
        />
      );
  }
}
