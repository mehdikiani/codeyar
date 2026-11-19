import type {ConceptLesson} from '../../../types/curriculum.ts';

export const UNIT_3_1_LESSONS: ConceptLesson[] = [
  // =========================================================================
  // CONCEPT 1: Bootstrap 5.3 RTL Setup, Colors, Borders & Rounded
  // =========================================================================
  {
    id: 'les-3-1-utilities',
    order: 1,
    title: 'راه‌اندازی بوت‌استرپ ۵.۳ RTL و کلاس‌های رنگ، پس‌زمینه، حاشیه و گردی (اصلاح ص ۱۵۲)',
    bookPage: '۱۴۶ تا ۱۵۴',
    whyWeNeedIt: {
      realWorldProblem:
        'نوشتن صدها خط CSS از صفر برای هر صفحه، زمان توسعه را چند برابر می‌کند و هماهنگ نگه داشتن رنگ‌ها و دکمه‌ها بین صفحات کار دشواری است. فریم‌ورک Bootstrap 5.3 RTL صدها کلاس آماده (Utility Classes) در اختیار ما می‌گذارد تا با سرعت بالا و بدون نیاز به اینترنت در کارگاه، صفحات زیبا و یکدست بسازیم.',
      analogy:
        'تفاوت CSS خام با Bootstrap مثل «نجاری کردن میز از تنه درخت در برابر بستن قطعات آماده و استاندارد کارخانه‌ای» است: با کلاس‌های آماده primary، border و rounded-3 در چند ثانیه خروجی استاندارد می‌گیرید!',
    },
    syntaxAnatomy: {
      template: `<div class="bg-primary-subtle text-primary border border-primary rounded-3 p-3">
  فروشگاه کتاب مرجع نو با Bootstrap 5.3 RTL
</div>`,
      parts: [
        {token: 'bg-* / text-*', role: 'رنگ‌های معنایی استاندارد: primary (آبی)، success (سبز)، danger (قرمز)، warning (زرد)، dark، secondary.'},
        {token: 'bg-*-subtle', role: 'ویژگی جدید بوت‌استرپ ۵.۳: پس‌زمینه بسیار ملایم هماهنگ با رنگ متن اصلی.'},
        {token: 'border border-danger', role: 'ایجاد حاشیه رنگی (اصلاح غلط تایپی danger-danger در جدول ۴ ص ۱۵۲ کتاب!).'},
        {token: 'rounded-0 .. rounded-5 / rounded-pill', role: 'میزان گردی گوشه‌ها از صفر (rounded-0 اصلاح جدول ۵ ص ۱۵۲) تا کاملاً کپسولی.'},
      ],
    },
    behindTheScenes: [
      'در این سامانه، فایل کامل bootstrap.rtl.min.css و bootstrap.bundle.min.js به‌صورت ۱۰۰٪ آفلاین در پیش‌نمایش تزریق می‌شود؛ در پروژه واقعی کارگاه نیز باید فایل‌های دانلودشده بوت‌استرپ را از پوشه محلی پروژه لینک کنید نه از CDN اینترنتی!',
      'دو اصلاح مهم ص ۱۵۲ کتاب درسی: (۱) در جدول ۴، کلاس حاشیه قرمز اشتباهاً danger-danger چاپ شده که درست آن border-danger است؛ (۲) در جدول ۵، کلاس حذف گردی گوشه (0px) اشتباهاً rounded-1 چاپ شده که درست آن rounded-0 است!',
    ],
    goldenTips: [
      'برای استفاده از رنگ حاشیه (مثل border-primary) حتماً ابتدا خود کلاس پایه border را هم بنویسید تا ضخامت ۱px ایجاد شود.',
      'کلاس‌های bg-*-subtle در بوت‌استرپ ۵.۳ بهترین گزینه برای ساخت برچسب‌ها و جعبه‌های اطلاع‌رسانی مدرن هستند.',
    ],
    wrongVsRight: [
      {
        title: 'اصلاح جدول ۴ و ۵ ص ۱۵۲ کتاب (border-danger و rounded-0)',
        wrongCode: `<div class="border danger-danger rounded-1 p-2">هشدار بدون گردی</div>`,
        rightCode: `<div class="border border-danger rounded-0 p-2">هشدار بدون گردی</div>`,
        explanation: 'کلاس حاشیه قرمز border-danger و کلاس بدون گردی گوشه (0px) برابر rounded-0 است.',
      },
      {
        title: 'استفاده از border-primary بدون کلاس پایه border',
        wrongCode: `<div class="border-primary p-2">کادر نمایش داده نمی‌شود!</div>`,
        rightCode: `<div class="border border-primary border-2 p-2">کادر آبی واضح</div>`,
        explanation: 'کلاس border-primary فقط رنگ حاشیه را عوض می‌کند؛ برای ایجاد خود خط کادر باید border را هم بنویسید.',
      },
    ],
    examples: [
      {
        id: 'ex-3-1-util-basic',
        tier: 'basic',
        title: 'پالت رنگ‌های معنایی، حاشیه و گردی گوشه بوت‌استرپ ۵.۳ (اصلاح ص ۱۵۲)',
        bookPage: '۱۵۱ تا ۱۵۳',
        summary: 'نمایش زنده رنگ‌های پایه و subtle همراه با اصلاح کلاس‌های border-danger و rounded-0.',
        language: 'html',
        engine: 'bootstrap-js',
        useBootstrap: true,
        code: `<div class="container py-3">
  <div class="d-flex flex-wrap gap-2 mb-3">
    <span class="p-2 rounded-3 bg-primary text-white">primary (اصلی)</span>
    <span class="p-2 rounded-3 bg-success text-white">success (موفق)</span>
    <span class="p-2 rounded-3 bg-danger text-white">danger (خطا)</span>
    <span class="p-2 rounded-3 bg-warning text-dark">warning (هشدار)</span>
    <span class="p-2 rounded-pill bg-dark text-white px-3">rounded-pill</span>
  </div>
  <div class="p-3 bg-danger-subtle text-danger border border-danger rounded-0 mb-2">
    اصلاح ص ۱۵۲: حاشیه قرمز با <code>border-danger</code> و گوشه تیز با <code>rounded-0</code>
  </div>
  <div class="p-3 bg-success-subtle text-success border border-success rounded-4">
    کارت اطلاع‌رسانی مدرن با پس‌زمینه subtle و گردی <code>rounded-4</code>
  </div>
</div>`,
        teacherTalkingPoints: [
          'تفاوت rounded-0 (کاملاً تیز)، rounded-3 (معمولی) و rounded-pill (کپسولی) را روی خروجی مقایسه کنید.',
        ],
        lineExplanations: [
          {line: 9, explanation: 'اصلاح دو خطای جدول ۴ و ۵ ص ۱۵۲ در یک مثال زنده.'},
        ],
        commonMistakes: ['فراموش کردن text-white روی پس‌زمینه‌های تیره یا نوشتن danger-danger.'],
        bookCorrection: {
          page: 152,
          issue: 'در جدول ۴ ص ۱۵۲ کلاس border-danger به اشتباه danger-danger و در جدول ۵ کلاس rounded-0 به اشتباه rounded-1 چاپ شده بود.',
          fix: 'کلاس‌های استاندارد Bootstrap 5.3 به شکل صحیح ارائه و آزمایش شدند.',
        },
      },
      {
        id: 'ex-3-1-util-practical',
        tier: 'practical',
        title: 'نوار وضعیت موجودی و تخفیف کتاب با کلاس‌های subtle و border-end',
        bookPage: '۱۵۳',
        summary: 'ساخت کادرهای پیام حرفه‌ای در فروشگاه کتاب مرجع نو بدون نوشتن حتی یک خط CSS سفارشی.',
        language: 'html',
        engine: 'bootstrap-js',
        useBootstrap: true,
        code: `<div class="container py-2 d-grid gap-2">
  <div class="p-3 bg-primary-subtle text-primary-emphasis border-start border-4 border-primary rounded-2">
    <strong>📦 ارسال رایگان:</strong> برای سفارش‌های بالای ۳۰۰٬۰۰۰ تومان در سراسر کشور.
  </div>
  <div class="p-3 bg-warning-subtle text-warning-emphasis border-start border-4 border-warning rounded-2">
    <strong>⚡ موجودی محدود:</strong> تنها ۳ جلد از چاپ ۱۴۰۵ در انبار باقی مانده است!
  </div>
</div>`,
        teacherTalkingPoints: [
          'دقت کنید در نسخه RTL بوت‌استرپ ۵.۳، کلاس border-start خودکار حاشیه ضخیم را در سمت «راست» (شروع خط فارسی) می‌گذارد!',
        ],
        lineExplanations: [
          {line: 2, explanation: 'border-start در RTL یعنی لبه شروع (سمت راست) با ضخامت border-4.'},
        ],
        commonMistakes: ['استفاده از کلاس‌های قدیمی بوت‌استرپ ۴ مثل border-right که در نسخه ۵ به border-start/border-end تبدیل شده‌اند.'],
      },
      {
        id: 'ex-3-1-util-combined',
        tier: 'combined',
        title: 'کارت معرفی کتاب با ترکیب سایه، حاشیه و تایپوگرافی بوت‌استرپ',
        bookPage: '۱۵۴',
        summary: 'کاربرد هم‌زمان shadow-sm، fw-bold، text-muted، text-decoration-line-through و rounded-circle.',
        language: 'html',
        engine: 'bootstrap-js',
        useBootstrap: true,
        code: `<div class="container py-2">
  <div class="p-3 bg-white border rounded-4 shadow-sm d-flex align-items-center justify-content-between">
    <div>
      <span class="badge bg-primary-subtle text-primary rounded-pill mb-1">پودمان سوم</span>
      <h5 class="fw-bold mb-1">کتاب طراح سایت — پایه یازدهم</h5>
      <div class="small">
        <span class="text-secondary text-decoration-line-through me-2">۶۰٬۰۰۰ تومان</span>
        <span class="text-success fw-bold">۴۵٬۰۰۰ تومان</span>
      </div>
    </div>
    <span class="bg-success text-white rounded-circle d-flex align-items-center justify-content-center fw-bold" style="width:48px;height:48px;">
      ۲۵٪
    </span>
  </div>
</div>`,
        teacherTalkingPoints: [
          'نشان دهید کل این کارت مدرن بدون حتی یک فایل CSS خارجی و صرفاً با ترکیب کلاس‌های کاربردی ساخته شده است.',
        ],
        lineExplanations: [
          {line: 7, explanation: 'کلاس text-decoration-line-through روی قیمت قبلی خط می‌کشد.'},
        ],
        commonMistakes: ['نوشتن font-weight-bold (نسخه ۴) به جای fw-bold (نسخه ۵.۳).'],
      },
      {
        id: 'ex-3-1-util-whatif',
        tier: 'what-if',
        title: 'آزمایشگاه What-If: تفاوت سطوح سایه (shadow-none تا shadow-lg)',
        bookPage: '۱۵۴',
        summary: 'مقایسه تصویری ۴ سطح سایه آماده در بوت‌استرپ ۵.۳ روی کارت‌های هم‌اندازه.',
        language: 'html',
        engine: 'bootstrap-js',
        useBootstrap: true,
        code: `<div class="container py-3 d-flex flex-wrap gap-3">
  <div class="p-3 bg-white border rounded-3 shadow-none">shadow-none</div>
  <div class="p-3 bg-white border rounded-3 shadow-sm">shadow-sm</div>
  <div class="p-3 bg-white border rounded-3 shadow">shadow (عادی)</div>
  <div class="p-3 bg-white border rounded-3 shadow-lg">shadow-lg</div>
</div>`,
        teacherTalkingPoints: [
          'در طراحی رابط کاربری مدرن، shadow-sm برای کارت‌های عادی و shadow-lg برای پنجره‌های شناور (Modal) ایده‌آل است.',
        ],
        lineExplanations: [
          {line: 3, explanation: 'سایه ظریف و تمیز برای کارت‌های محصول.'},
        ],
        commonMistakes: ['استفاده از shadow-lg برای همه عناصر صفحه که چیدمان را سنگین می‌کند.'],
      },
    ],
  },

  // =========================================================================
  // CONCEPT 2: Spacing (m/p/ms/me) & Responsive Display Utilities
  // =========================================================================
  {
    id: 'les-3-1-spacing-display',
    order: 2,
    title: 'سیستم فاصله‌گذاری منطقی در RTL (m/p، ms/me) و کلاس‌های نمایش واکنش‌گرا (d-none / d-md-flex)',
    bookPage: '۱۵۵ تا ۱۶۰',
    whyWeNeedIt: {
      realWorldProblem:
        'در بوت‌استرپ ۵ برای پشتیبانی بی‌نقص از زبان‌های راست‌به‌چپ (فارسی/عربی) و چپ‌به‌راست، به جای left و right از «شروع (start = s)» و «پایان (end = e)» استفاده می‌شود. همچنین برای ساخت نوار ابزار متفاوت در موبایل و دسکتاپ، کلاس‌های d-none و d-md-block حیاتی هستند.',
      analogy:
        'در زبان فارسی start (s) یعنی سمت راست (جایی که خط شروع می‌شود) و end (e) یعنی سمت چپ (جایی که خط تمام می‌شود)! با این منطق اگر سایت را انگلیسی کنید، فاصله‌ها خودکار قرینه می‌شوند!',
    },
    syntaxAnatomy: {
      template: `<div class="p-3 mb-4 ms-2 me-auto d-none d-md-flex align-items-center gap-2">
  فقط در تبلت و دسکتاپ دیده می‌شود!
</div>`,
      parts: [
        {token: 'm-* / p-* (0 تا 5)', role: 'فاصله بیرونی (margin) و داخلی (padding) از 0 تا 5 (مثلاً p-3 = 1rem ≈ 16px).'},
        {token: 't / b / s / e / x / y', role: 'جهت‌ها: بالا (t)، پایین (b)، شروع/راست در RTL (s)، پایان/چپ در RTL (e)، افقی (x)، عمودی (y).'},
        {token: 'mx-auto', role: 'وسط‌چین افقی عنصر بلوکی (معادل margin-left/right: auto).'},
        {token: 'd-none d-md-flex', role: 'مخفی در موبایل (xs/sm) و نمایش به صورت Flex از عرض md (768px) به بالا.'},
      ],
    },
    behindTheScenes: [
      'جدول مقیاس فاصله‌گذاری بوت‌استرپ ۵: 0 = 0px | 1 = 0.25rem (4px) | 2 = 0.5rem (8px) | 3 = 1rem (16px) | 4 = 1.5rem (24px) | 5 = 3rem (48px).',
      'در نسخه ۵ بوت‌استرپ کلاس‌های قدیمی ml-* و mr-* حذف شده‌اند و باید از ms-* و me-* استفاده کنید.',
      'برای نمایش یک نوار فقط در موبایل و پنهان کردنش در دسکتاپ بنویسید: d-flex d-md-none (نمایش در موبایل، مخفی از md به بالا).',
    ],
    goldenTips: [
      'برای چسباندن یک دکمه به انتهای چپ نوار Flex فارسی، به آن کلاس ms-auto (یا به عنصر قبلی me-auto) بدهید.',
      'همیشه با دکمه تغییر نمای موبایل/دسکتاپ در بالای پیش‌نمایش، رفتار d-none و d-md-flex را در کلاس تست کنید.',
    ],
    wrongVsRight: [
      {
        title: 'استفاده از کلاس‌های منسوخ ml-3 / mr-3 بوت‌استرپ ۴',
        wrongCode: `<button class="btn btn-primary ml-3 mr-2">ورود</button>`,
        rightCode: `<button class="btn btn-primary ms-3 me-2">ورود</button>`,
        explanation: 'در Bootstrap 5.3 کلاس‌های منطقی ms (start) و me (end) جایگزین ml و mr شده‌اند.',
      },
      {
        title: 'فراموش کردن d-none در ترکیب پنهان‌سازی موبایل',
        wrongCode: `<div class="d-md-block">در موبایل هم دیده می‌شود!</div>`,
        rightCode: `<div class="d-none d-md-block">فقط در تبلت و دسکتاپ!</div>`,
        explanation: 'بوت‌استرپ Mobile-First است؛ برای مخفی بودن در موبایل باید ابتدا d-none بگذارید.',
      },
    ],
    examples: [
      {
        id: 'ex-3-1-space-basic',
        tier: 'basic',
        title: 'نوار ابزار دسکتاپ و موبایل با d-none / d-md-flex (صفحات ۱۵۸ تا ۱۶۰)',
        bookPage: '۱۵۸ تا ۱۶۰',
        summary: 'نمایش دو نوار ابزار مجزا برای دسکتاپ و موبایل — نمای موبایل بالای پیش‌نمایش را بزنید تا جابه‌جایی زنده را ببینید!',
        language: 'html',
        engine: 'bootstrap-js',
        useBootstrap: true,
        code: `<div class="container py-2">
  <!-- نوار ویژه دسکتاپ و تبلت -->
  <div class="d-none d-md-flex justify-content-between align-items-center bg-dark text-white p-3 rounded-3">
    <span class="fw-bold">🖥️ نمای دسکتاپ مرجع نو</span>
    <div class="d-flex gap-3 small">
      <span>تلفن پشتیبانی: ۰۲۱-۸۸۰۰</span>
      <span>ارسال رایگان بالای ۳۰۰ هزار تومان</span>
    </div>
  </div>
  <!-- نوار فشرده ویژه موبایل -->
  <div class="d-flex d-md-none justify-content-between align-items-center bg-primary text-white p-2 rounded-3">
    <span class="fw-bold small">📱 نمای موبایل مرجع نو</span>
    <span class="badge bg-light text-primary">منو</span>
  </div>
</div>`,
        teacherTalkingPoints: [
          'روی آیکون موبایل بالای پیش‌نمایش کلیک کنید: نوار سیاه دسکتاپ محو می‌شود و نوار آبی موبایل ظاهر می‌گردد!',
        ],
        lineExplanations: [
          {line: 3, explanation: 'مخفی در موبایل، نمایش Flex از عرض ۷۶۸px به بالا.'},
          {line: 11, explanation: 'نمایش Flex در موبایل، مخفی از عرض ۷۶۸px به بالا.'},
        ],
        commonMistakes: ['فراموش کردن یکی از جفت‌های d-none / d-md-none که باعث نمایش هم‌زمان هر دو نوار می‌شود.'],
      },
      {
        id: 'ex-3-1-space-practical',
        tier: 'practical',
        title: 'مقایسه درجات فاصله داخلی (p-1 تا p-5) و وسط‌چین با mx-auto',
        bookPage: '۱۵۵ تا ۱۵۷',
        summary: 'مشاهده مقیاس دقیق فاصله‌گذاری بوت‌استرپ ۵.۳ و وسط‌چین کردن جعبه با mx-auto.',
        language: 'html',
        engine: 'bootstrap-js',
        useBootstrap: true,
        code: `<div class="container py-2 d-grid gap-2">
  <div class="bg-info-subtle border p-1 rounded">p-1 (4px)</div>
  <div class="bg-info-subtle border p-2 rounded">p-2 (8px)</div>
  <div class="bg-info-subtle border p-3 rounded">p-3 (16px — پرکاربردترین)</div>
  <div class="bg-primary text-white p-3 rounded mx-auto text-center" style="max-width:260px;">
    وسط‌چین افقی با <code>mx-auto</code>
  </div>
</div>`,
        teacherTalkingPoints: [
          'پیشنهاد کنید برای کارت‌های استاندارد همیشه از p-3 یا p-4 استفاده کنند تا فضای تنفس کافی وجود داشته باشد.',
        ],
        lineExplanations: [
          {line: 5, explanation: 'mx-auto به معنای margin-left و margin-right برابر auto است.'},
        ],
        commonMistakes: ['گذاشتن mx-auto بدون تعیین عرض یا max-width روی یک div تمام‌عرض.'],
      },
      {
        id: 'ex-3-1-space-combined',
        tier: 'combined',
        title: 'هل دادن دکمه به انتهای چپ نوار با ms-auto در RTL',
        bookPage: '۱۵۷',
        summary: 'کاربرد هوشمندانه ms-auto در کنار Flexbox بوت‌استرپ برای ترازبندی دکمه‌های نوار عملیات.',
        language: 'html',
        engine: 'bootstrap-js',
        useBootstrap: true,
        code: `<div class="container py-2">
  <div class="d-flex align-items-center gap-2 p-3 bg-light border rounded-3">
    <span class="fw-bold">سبد خرید</span>
    <span class="badge bg-secondary">۳ کالا</span>
    <button class="btn btn-sm btn-success ms-auto">تسویه حساب ←</button>
  </div>
</div>`,
        teacherTalkingPoints: [
          'نشان دهید ms-auto در جهت فارسی تمام فضای خالی را در سمت «راست» دکمه (بین نشان و دکمه) قرار می‌دهد و دکمه را به انتهای چپ می‌چسباند!',
        ],
        lineExplanations: [
          {line: 5, explanation: 'ms-auto (margin-inline-start: auto) دکمه را به دورترین نقطه انتهایی هل می‌دهد.'},
        ],
        commonMistakes: ['تلاش برای فاصله انداختن دکمه با دادن ده‌ها فاصله خالی یا padding-right بزرگ.'],
      },
      {
        id: 'ex-3-1-space-whatif',
        tier: 'what-if',
        title: 'آزمایشگاه What-If: فاصله‌گذاری واکنش‌گرا (p-2 در موبایل ← p-md-5 در دسکتاپ)',
        bookPage: '۱۵۶',
        summary: 'تغییر خودکار اندازه padding و تراز متن در موبایل و دسکتاپ با پیشوندهای Breakpoint.',
        language: 'html',
        engine: 'bootstrap-js',
        useBootstrap: true,
        code: `<div class="container py-2">
  <div class="bg-primary text-white rounded-4 p-2 p-md-4 text-center text-md-start">
    <h5 class="fw-bold mb-1">فاصله و تراز واکنش‌گرا!</h5>
    <p class="mb-0 small">در موبایل وسط‌چین و فشرده (p-2) و در دسکتاپ راست‌چین و جادار (p-md-4) هستم.</p>
  </div>
</div>`,
        teacherTalkingPoints: [
          'روی دکمه موبایل و دسکتاپ کلیک کنید تا تغییر هم‌زمان padding و text-align را ببینند.',
        ],
        lineExplanations: [
          {line: 2, explanation: 'ترکیب text-center برای موبایل و text-md-start (راست‌چین در RTL) برای دسکتاپ.'},
        ],
        commonMistakes: ['استفاده از text-right قدیمی به جای text-start/text-end در بوت‌استرپ ۵.۳.'],
      },
    ],
  },

  // =========================================================================
  // CONCEPT 3: 12-Column Responsive Grid System
  // =========================================================================
  {
    id: 'les-3-1-grid',
    order: 3,
    title: 'سیستم شبکه ۱۲ ستونه واکنش‌گرا (container، row، col-md-*، g-* و img-fluid)',
    bookPage: '۱۶۱ تا ۱۶۸',
    whyWeNeedIt: {
      realWorldProblem:
        'سخت‌ترین بخش طراحی وب، نمایش مرتب یک صفحه فروشگاه در موبایل (۱ ستون)، تبلت (۲ ستون) و دسکتاپ (۴ ستون) است. سیستم شبکه ۱۲ ستونه بوت‌استرپ این کار را تنها با نوشتن یک کلاس ساده مانند col-12 col-sm-6 col-lg-3 حل می‌کند!',
      analogy:
        'عرض هر ردیف (row) مثل «یک پیتزای ۱۲ تکه» است: اگر بخواهید ۴ کارت هم‌عرض کنار هم بگذارید به هر کارت ۳ تکه (col-3) می‌دهید؛ برای ۳ کارت، ۴ تکه (col-4)؛ برای ۲ کارت، ۶ تکه (col-6) و برای ۱ کارت تمام‌عرض، ۱۲ تکه (col-12)!',
    },
    syntaxAnatomy: {
      template: `<div class="container">
  <div class="row g-3">
    <div class="col-12 col-md-6 col-lg-3">کارت ۱</div>
    <div class="col-12 col-md-6 col-lg-3">کارت ۲</div>
  </div>
</div>`,
      parts: [
        {token: '.container / .container-fluid', role: 'ظرف اصلی صفحه با عرض متناسب و حاشیه مرکزی (یا ۱۰۰٪ عرض در fluid).'},
        {token: '.row + .g-3', role: 'ردیف نگه‌دارنده ستون‌ها همراه با فاصله یکنواخت (Gutter) افقی و عمودی بین کارت‌ها.'},
        {token: 'col-12 col-md-6 col-lg-3', role: 'موبایل ۱ ستون (12/12)، تبلت ۲ ستون (6/12)، دسکتاپ ۴ ستون (3/12).'},
        {token: 'img-fluid', role: 'تضمین می‌کند تصویر هرگز از ستون خود بیرون نزند (max-width: 100%; height: auto;).'},
      ],
    },
    behindTheScenes: [
      '۶ نقطه شکست (Breakpoints) بوت‌استرپ ۵.۳: xs (زیر 576px)، sm (≥576px)، md (≥768px)، lg (≥992px)، xl (≥1200px) و xxl (≥1400px).',
      'همیشه سلسله‌مراتب سه‌لایه را رعایت کنید: container ← row ← col-* (محتوای خود را مستقیماً درون row نریزید، حتماً داخل col قرار دهید!).',
      'در تب «۲. شهود بصری» همین واحد، شبیه‌ساز زنده شبکه ۱۲ ستونه با اسلایدر عرض صفحه آماده است.',
    ],
    goldenTips: [
      'کلاس‌های میانبر ردیف (row-cols-1 row-cols-md-2 row-cols-lg-4) روی خود row بسیار تمیزتر از تکرار col-* روی ۲۰ کارت هستند!',
      'همیشه روی تصاویر داخل ستون‌ها کلاس img-fluid بگذارید تا در موبایل سرریز افقی ایجاد نشود.',
    ],
    wrongVsRight: [
      {
        title: 'قرار دادن محتوا مستقیماً داخل row بدون col',
        wrongCode: `<div class="row">
  <div class="card">کارت ۱</div>
</div>`,
        rightCode: `<div class="row g-3">
  <div class="col-12 col-md-6"><div class="card p-3">کارت ۱</div></div>
</div>`,
        explanation: 'فرزندان مستقیم .row منحصراً باید کلاس‌های .col-* باشند تا فاصله‌گذاری (Gutter) درست کار کند.',
      },
      {
        title: 'تجاوز مجموع ستون‌ها از ۱۲ بدون آگاهی از خط‌شکنی',
        wrongCode: `<!-- انتظار ۲ ستون در یک خط با col-8 و col-6 (مجموع 14!) -->`,
        rightCode: `<div class="col-md-8">محتوای اصلی</div>
<div class="col-md-4">ستون کناری</div>`,
        explanation: 'مجموع ستون‌ها در یک خط کامل همیشه ۱۲ است (8 + 4 = 12).',
      },
    ],
    examples: [
      {
        id: 'ex-3-1-grid-basic',
        tier: 'basic',
        title: 'شبکه ۱۲ ستونه واکنش‌گرا برای محصولات مرجع نو (۴ ← ۲ ← ۱ ستون)',
        bookPage: '۱۶۳ تا ۱۶۷',
        summary: 'نمایش ۴ کتاب با col-12 col-sm-6 col-lg-3 و img-fluid؛ با دکمه موبایل/تبلت/دسکتاپ بالا تست کنید.',
        language: 'html',
        engine: 'bootstrap-js',
        useBootstrap: true,
        code: `<div class="container py-3">
  <div class="row g-3">
    <div class="col-12 col-sm-6 col-lg-3">
      <div class="p-3 border rounded-3 text-center bg-light">
        <img src="book1.jpg" class="img-fluid rounded-2 mb-2" alt="طراح سایت" />
        <div class="fw-bold small">طراح سایت</div>
      </div>
    </div>
    <div class="col-12 col-sm-6 col-lg-3">
      <div class="p-3 border rounded-3 text-center bg-light">
        <img src="book2.jpg" class="img-fluid rounded-2 mb-2" alt="تولید محتوا" />
        <div class="fw-bold small">تولید محتوا</div>
      </div>
    </div>
    <div class="col-12 col-sm-6 col-lg-3">
      <div class="p-3 border rounded-3 text-center bg-light">
        <img src="book3.jpg" class="img-fluid rounded-2 mb-2" alt="توسعه برنامه" />
        <div class="fw-bold small">توسعه برنامه</div>
      </div>
    </div>
    <div class="col-12 col-sm-6 col-lg-3">
      <div class="p-3 border rounded-3 text-center bg-light">
        <img src="book1.jpg" class="img-fluid rounded-2 mb-2" alt="شبکه" />
        <div class="fw-bold small">کارگاه شبکه</div>
      </div>
    </div>
  </div>
</div>`,
        teacherTalkingPoints: [
          '۱۲ تقسیم بر ۳ می‌شود ۴ ستون در دسکتاپ؛ ۱۲ تقسیم بر ۶ می‌شود ۲ ستون در تبلت؛ ۱۲ تقسیم بر ۱۲ می‌شود ۱ ستون در موبایل!',
        ],
        lineExplanations: [
          {line: 2, explanation: 'کلاس g-3 هم فاصله افقی و هم فاصله عمودی بین کارت‌ها ایجاد می‌کند.'},
          {line: 5, explanation: 'img-fluid تصویر را دقیقاً هم‌عرض ستون نگه می‌دارد.'},
        ],
        commonMistakes: ['فراموش کردن کلاس row پیش از col-* ها.'],
      },
      {
        id: 'ex-3-1-grid-practical',
        tier: 'practical',
        title: 'چیدمان وبلاگ و فروشگاه با نسبت نامتقارن ۸ به ۴ (col-md-8 + col-md-4)',
        bookPage: '۱۶۵',
        summary: 'اختصاص ۸ ستون به محتوای اصلی و ۴ ستون به ستون کناری (پرفروش‌ها) در دسکتاپ و تک‌ستونه در موبایل.',
        language: 'html',
        engine: 'bootstrap-js',
        useBootstrap: true,
        code: `<div class="container py-3">
  <div class="row g-3">
    <main class="col-12 col-md-8">
      <div class="p-3 bg-white border rounded-3 shadow-sm">
        <h5 class="fw-bold">محتوای اصلی (۸ ستون از ۱۲)</h5>
        <p class="mb-0 text-secondary small">توضیحات کامل کتاب طراح سایت و سرفصل ۵ پودمان پایه یازدهم.</p>
      </div>
    </main>
    <aside class="col-12 col-md-4">
      <div class="p-3 bg-warning-subtle border border-warning rounded-3">
        <h6 class="fw-bold">پیشنهاد ویژه (۴ ستون از ۱۲)</h6>
        <p class="mb-0 small">تخفیف ۲۰٪ ویژه هنرستان‌ها</p>
      </div>
    </aside>
  </div>
</div>`,
        teacherTalkingPoints: [
          'دقت کنید ۸ + ۴ = ۱۲؛ در موبایل هر دو col-12 هستند پس زیر هم می‌آیند.',
        ],
        lineExplanations: [
          {line: 3, explanation: 'ترکیب تگ معنایی HTML5 (<main>) با کلاس ستون بوت‌استرپ.'},
        ],
        commonMistakes: ['نوشتن col-md-8 و col-md-5 که مجموعش ۱۳ شده و ستون دوم را به خط بعد می‌اندازد.'],
      },
      {
        id: 'ex-3-1-grid-combined',
        tier: 'combined',
        title: 'میانبر حرفه‌ای row-cols-* و هم‌ارتفاع کردن کارت‌ها با h-100',
        bookPage: '۱۶۷',
        summary: 'استفاده از row-cols-1 row-cols-md-3 برای تعریف تعداد ستون روی والد به جای تکرار کلاس روی هر فرزند.',
        language: 'html',
        engine: 'bootstrap-js',
        useBootstrap: true,
        code: `<div class="container py-3">
  <div class="row row-cols-1 row-cols-md-3 g-3">
    <div class="col"><div class="p-3 border rounded-3 bg-light h-100"><strong>ستون ۱:</strong> متن کوتاه</div></div>
    <div class="col"><div class="p-3 border rounded-3 bg-light h-100"><strong>ستون ۲:</strong> متن بلندتر برای آزمایش هم‌ارتفاع ماندن همه کارت‌ها با کلاس h-100</div></div>
    <div class="col"><div class="p-3 border rounded-3 bg-light h-100"><strong>ستون ۳:</strong> متن متوسط</div></div>
  </div>
</div>`,
        teacherTalkingPoints: [
          'کلاس h-100 (height: 100%) تضمین می‌کند همه کارت‌های یک ردیف حتی با طول متن متفاوت دقیقاً هم‌قد باشند.',
        ],
        lineExplanations: [
          {line: 2, explanation: 'تعیین تعداد کارت در هر ردیف به‌صورت متمرکز روی تگ row.'},
        ],
        commonMistakes: ['فراموش کردن h-100 که باعث ناهماهنگی ارتفاع کارت‌های کنار هم می‌شود.'],
      },
      {
        id: 'ex-3-1-grid-whatif',
        tier: 'what-if',
        title: 'آزمایشگاه What-If: تغییر ترتیب بصری ستون‌ها در موبایل با order-*',
        bookPage: '۱۶۸',
        summary: 'قرار دادن تصویر بالای متن در موبایل اما کنار متن در دسکتاپ با order-1 و order-md-2.',
        language: 'html',
        engine: 'bootstrap-js',
        useBootstrap: true,
        code: `<div class="container py-3">
  <div class="row g-3 align-items-center">
    <div class="col-12 col-md-7 order-2 order-md-1">
      <div class="p-3 bg-light rounded-3"><h5>متن معرفی کتاب</h5><p class="mb-0 small">در دسکتاپ اول و در موبایل زیر تصویر قرار می‌گیرم.</p></div>
    </div>
    <div class="col-12 col-md-5 order-1 order-md-2 text-center">
      <img src="book1.jpg" class="img-fluid rounded-3 shadow-sm" alt="طراح سایت" style="max-height:140px;" />
    </div>
  </div>
</div>`,
        teacherTalkingPoints: [
          'تغییر نمای موبایل/دسکتاپ نشان می‌دهد چگونه بدون دست زدن به HTML، ترتیب نمایش تصویر و متن تغییر می‌کند.',
        ],
        lineExplanations: [
          {line: 3, explanation: 'order-2 در موبایل و order-md-1 در دسکتاپ.'},
        ],
        commonMistakes: ['جابه‌جا کردن order بدون در نظر گرفتن تجربه کاربری موبایل.'],
      },
    ],
  },

  // =========================================================================
  // CONCEPT 4: Cards, Buttons, Badges, Alerts & Responsive Tables
  // =========================================================================
  {
    id: 'les-3-1-components-ui',
    order: 4,
    title: 'مؤلفه‌های رابط کاربری: Card، Button، Badge، Alert و جداول واکنش‌گرا (table-responsive)',
    bookPage: '۱۶۹ تا ۱۷۵',
    whyWeNeedIt: {
      realWorldProblem:
        'در هر سایت فروشگاهی یا آموزشی، ۹۰٪ صفحه از کارت‌های محصول (Card)، دکمه‌ها (btn)، برچسب‌های وضعیت (badge)، پیام‌های هشدار (alert) و جداول تشکیل شده است. بوت‌استرپ این مؤلفه‌ها را کاملاً استاندارد، زیبا و دسترس‌پذیر آماده کرده است.',
      analogy:
        'مؤلفه‌های آماده بوت‌استرپ مثل «قطعات لگوی مهندسی‌شده» هستند: هر قطعه (card-header، card-body، card-footer) جای دقیق خودش را دارد و به هم چفت می‌شود!',
    },
    syntaxAnatomy: {
      template: `<div class="card shadow-sm">
  <img src="book1.jpg" class="card-img-top" alt="کتاب" />
  <div class="card-body">
    <h5 class="card-title">عنوان <span class="badge bg-success">جدید</span></h5>
    <a href="#" class="btn btn-primary w-100">خرید</a>
  </div>
</div>`,
      parts: [
        {token: 'card / card-body / card-footer', role: 'ساختار استاندارد کارت محصول با فاصله‌گذاری هماهنگ.'},
        {token: 'btn btn-primary / btn-outline-*', role: 'دکمه توپر یا دکمه فقط دارای کادر (Outline) در اندازه‌های btn-sm و btn-lg.'},
        {token: 'alert alert-success', role: 'کادر پیام وضعیت (موفقیت، خطا، راهنما) همراه با امکان بستن.'},
        {token: 'table-responsive + table-striped', role: 'جدول راه‌راه که در موبایل بدون شکستن کل صفحه اسکرول افقی ایمن می‌گیرد.'},
      ],
    },
    behindTheScenes: [
      'برای هر دکمه بوت‌استرپ، نوشتن کلاس پایه btn الزامی است؛ btn-primary به‌تنهایی فقط رنگ را تنظیم می‌کند و بدون btn دکمه شکل درست نمی‌گیرد.',
      'همیشه جداول چندستونه را داخل <div class="table-responsive"> بگذارید تا در موبایل عرض صفحه را خراب نکنند.',
    ],
    goldenTips: [
      'در کارت‌های شبکه، ترکیب h-100 روی .card و mt-auto روی دکمه درون .card-body (همراه با d-flex flex-column) همه دکمه‌ها را هم‌تراز نگه می‌دارد.',
    ],
    wrongVsRight: [
      {
        title: 'نوشتن btn-success بدون کلاس پایه btn',
        wrongCode: `<button class="btn-success">ثبت</button>`,
        rightCode: `<button class="btn btn-success">ثبت</button>`,
        explanation: 'کلاس پایه btn فاصله داخلی، گردی، نشانگر موس و تراز دکمه را تنظیم می‌کند.',
      },
      {
        title: 'قرار دادن جدول عریض بدون table-responsive در موبایل',
        wrongCode: `<table class="table">...</table>`,
        rightCode: `<div class="table-responsive"><table class="table table-striped">...</table></div>`,
        explanation: 'ظرف table-responsive جلوی ایجاد اسکرول افقی کل صفحه در گوشی موبایل را می‌گیرد.',
      },
    ],
    examples: [
      {
        id: 'ex-3-1-ui-basic',
        tier: 'basic',
        title: 'کارت کامل محصول مرجع نو با Badge، دکمه‌های توپر و Outline',
        bookPage: '۱۷۰ تا ۱۷۲',
        summary: 'نمایش کارت استاندارد کتاب شامل card-img-top، card-body، badge و card-footer.',
        language: 'html',
        engine: 'bootstrap-js',
        useBootstrap: true,
        code: `<div class="container py-3" style="max-width:340px;">
  <div class="card shadow-sm border-0 rounded-4 overflow-hidden">
    <img src="book1.jpg" class="card-img-top" alt="طراح سایت" />
    <div class="card-body">
      <div class="d-flex justify-content-between align-items-center mb-2">
        <span class="badge bg-primary-subtle text-primary">پایه یازدهم</span>
        <span class="badge bg-success">موجود</span>
      </div>
      <h5 class="card-title fw-bold">کتاب طراح سایت ۱۴۰۵</h5>
      <p class="card-text small text-secondary">آموزش کامل پایتون، HTML/CSS، بوت‌استرپ، جاوااسکریپت و جنگو.</p>
      <div class="d-flex gap-2">
        <button class="btn btn-primary btn-sm flex-fill">افزودن به سبد</button>
        <button class="btn btn-outline-secondary btn-sm">جزئیات</button>
      </div>
    </div>
    <div class="card-footer bg-light text-success fw-bold small">قیمت: ۴۵٬۰۰۰ تومان</div>
  </div>
</div>`,
        teacherTalkingPoints: [
          'کلاس flex-fill روی دکمه اصلی باعث می‌شود فضای بیشتری نسبت به دکمه «جزئیات» بگیرد.',
        ],
        lineExplanations: [
          {line: 2, explanation: 'overflow-hidden باعث می‌شود گوشه‌های بالایی تصویر نیز مطابق rounded-4 گرد شوند.'},
        ],
        commonMistakes: ['فراموش کردن card-body که باعث چسبیدن متن به لبه‌های کارت می‌شود.'],
      },
      {
        id: 'ex-3-1-ui-practical',
        tier: 'practical',
        title: 'جدول واکنش‌گرا (table-responsive + table-hover) و Alertهای وضعیت',
        bookPage: '۱۷۳ تا ۱۷۴',
        summary: 'نمایش لیست سفارش‌های مشتریان با جدول استاندارد بوت‌استرپ و پیام وضعیت بالای جدول.',
        language: 'html',
        engine: 'bootstrap-js',
        useBootstrap: true,
        code: `<div class="container py-3">
  <div class="alert alert-info d-flex align-items-center justify-content-between py-2" role="alert">
    <span>📢 سفارش‌های ثبت‌شده تا ساعت ۱۴ همان روز ارسال می‌شوند.</span>
    <span class="badge bg-info text-dark">۲ سفارش فعال</span>
  </div>
  <div class="table-responsive">
    <table class="table table-striped table-hover align-middle border">
      <thead class="table-dark">
        <tr><th>کد</th><th>کتاب</th><th>وضعیت</th><th>مبلغ</th></tr>
      </thead>
      <tbody>
        <tr><td>#۱۰۱</td><td>طراح سایت یازدهم</td><td><span class="badge bg-success">ارسال شد</span></td><td>۴۵٬۰۰۰ تومان</td></tr>
        <tr><td>#۱۰۲</td><td>تولید محتوا دهم</td><td><span class="badge bg-warning text-dark">در حال آماده‌سازی</span></td><td>۳۸٬۰۰۰ تومان</td></tr>
      </tbody>
    </table>
  </div>
</div>`,
        teacherTalkingPoints: [
          'کلاس align-middle روی جدول باعث می‌شود متن و نشان‌های هر ردیف دقیقاً در مرکز عمودی سلول بنشینند.',
        ],
        lineExplanations: [
          {line: 6, explanation: 'محافظت از جدول در نمایشگرهای کوچک با table-responsive.'},
        ],
        commonMistakes: ['استفاده از badge-success (بوت‌استرپ ۴) به جای bg-success (بوت‌استرپ ۵.۳).'],
      },
      {
        id: 'ex-3-1-ui-combined',
        tier: 'combined',
        title: 'کارت افقی جزئیات محصول با ترکیب Grid داخل Card',
        bookPage: '۱۷۱ و ۱۸۳',
        summary: 'استفاده از row g-0 درون card برای نمایش تصویر در یک سمت و اطلاعات محصول در سمت دیگر.',
        language: 'html',
        engine: 'bootstrap-js',
        useBootstrap: true,
        code: `<div class="container py-3">
  <div class="card shadow-sm border-0">
    <div class="row g-0 align-items-center">
      <div class="col-md-4 p-3 text-center">
        <img src="book2.jpg" class="img-fluid rounded-3" alt="تولید محتوا" />
      </div>
      <div class="col-md-8">
        <div class="card-body">
          <span class="badge bg-warning-subtle text-warning-emphasis mb-2">پرفروش هنرستان</span>
          <h5 class="card-title fw-bold">کتاب تولید محتوای الکترونیکی</h5>
          <p class="card-text small text-secondary">مناسب هنرجویان رشته شبکه و نرم‌افزار رایانه همراه با تمرین‌های کارگاهی.</p>
          <button class="btn btn-success btn-sm">خرید با تخفیف — ۳۸٬۰۰۰ تومان</button>
        </div>
      </div>
    </div>
  </div>
</div>`,
        teacherTalkingPoints: [
          'نشان دهید که در دسکتاپ افقی (۴ ستون + ۸ ستون) و در موبایل خودکار عمودی (تصویر بالا، متن پایین) می‌شود!',
        ],
        lineExplanations: [
          {line: 3, explanation: 'g-0 فاصله اضافی پیش‌فرض بین ستون‌ها را در کارت افقی حذف می‌کند.'},
        ],
        commonMistakes: ['گذاشتن padding زیاد روی row به جای col.'],
      },
      {
        id: 'ex-3-1-ui-whatif',
        tier: 'what-if',
        title: 'آزمایشگاه What-If: گروه دکمه‌ها (btn-group) و دکمه دارای نشان شمارنده',
        bookPage: '۱۷۲',
        summary: 'ساخت نوار فیلتر دسته‌بندی با btn-group و دکمه سبد خرید با نشان شناور قرمز.',
        language: 'html',
        engine: 'bootstrap-js',
        useBootstrap: true,
        code: `<div class="container py-3 d-flex flex-wrap align-items-center gap-3">
  <div class="btn-group" role="group">
    <button type="button" class="btn btn-primary">همه</button>
    <button type="button" class="btn btn-outline-primary">یازدهم</button>
    <button type="button" class="btn btn-outline-primary">دوازدهم</button>
  </div>
  <button type="button" class="btn btn-dark position-relative">
    سبد خرید
    <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">3</span>
  </button>
</div>`,
        teacherTalkingPoints: [
          'به ترکیب آماده position-relative + position-absolute + translate-middle در بوت‌استرپ ۵ اشاره کنید.',
        ],
        lineExplanations: [
          {line: 9, explanation: 'قرار دادن نشان شمارنده دقیقاً روی گوشه دکمه.'},
        ],
        commonMistakes: ['فراموش کردن position-relative روی دکمه والد.'],
      },
    ],
  },

  // =========================================================================
  // CONCEPT 5: Responsive Navbar & Bootstrap Forms
  // =========================================================================
  {
    id: 'les-3-1-navbar-forms',
    order: 5,
    title: 'نوار ناوبری واکنش‌گرا (Navbar) و فرم‌های استاندارد بوت‌استرپ (form-control، input-group)',
    bookPage: '۱۷۶ تا ۱۸۱',
    whyWeNeedIt: {
      realWorldProblem:
        'منوی سایت در دسکتاپ باید افقی باشد اما در موبایل باید درون یک دکمه همبرگری (Toggler) جمع شود! همچنین فرم‌های خام HTML ظاهری قدیمی دارند؛ بوت‌استرپ با form-control، form-select و input-group فرم‌های حرفه‌ای و یکدست می‌سازد.',
      analogy:
        'Navbar بوت‌استرپ مثل «میز تاشوی هوشمند» است: در اتاق بزرگ (دسکتاپ) کاملاً باز است و در فضای کوچک (موبایل) با یک دکمه تا می‌شود!',
    },
    syntaxAnatomy: {
      template: `<nav class="navbar navbar-expand-md bg-body-tertiary">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">مرجع نو</a>
    <button class="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#mainNav">...</button>
    <div class="collapse navbar-collapse" id="mainNav">...</div>
  </div>
</nav>`,
      parts: [
        {token: 'navbar-expand-md', role: 'مشخص می‌کند منو از عرض md (768px) به بالا باز باشد و در زیر آن دکمه همبرگری نشان دهد.'},
        {token: 'data-bs-toggle="collapse"', role: 'اتصال دکمه همبرگری به منوی مخفی با شناسه دقیق data-bs-target="#mainNav".'},
        {token: 'form-control / form-select', role: 'استایل استاندارد برای کادرهای متنی و لیست‌های کشویی.'},
        {token: 'input-group', role: 'چسباندن آیکون یا دکمه جستجو به کادر ورودی به صورت یکپارچه.'},
      ],
    },
    behindTheScenes: [
      'برای اینکه دکمه همبرگری Navbar در موبایل واقعاً باز و بسته شود، دو شرط لازم است: (۱) لود شدن bootstrap.bundle.min.js؛ (۲) تطابق دقیق حروف بزرگ و کوچک در data-bs-target="#mainNav" و id="mainNav"!',
      'کلاس form-floating در بوت‌استرپ ۵.۳ برچسب را داخل کادر قرار می‌دهد و هنگام کلیک کاربر، برچسب به‌نرمی به بالای کادر شناور می‌شود (نکته مهم: placeholder باید حتماً نوشته شود حتی اگر یک فاصله باشد، و <label> باید بعد از <input> بیاید!).',
    ],
    goldenTips: [
      'برای چیدمان فیلدهای فرم کنار هم در دسکتاپ (مثلاً نام و نام خانوادگی در یک ردیف)، از سیستم Grid خود بوت‌استرپ (<div class="row g-3">) داخل <form> استفاده کنید.',
    ],
    wrongVsRight: [
      {
        title: 'عدم تطابق شناسه دکمه همبرگری Navbar با id منو',
        wrongCode: `<button data-bs-target="#myMenu">...</button>
<div class="collapse navbar-collapse" id="mymenu">...</div>`,
        rightCode: `<button data-bs-target="#myMenu">...</button>
<div class="collapse navbar-collapse" id="myMenu">...</div>`,
        explanation: 'تفاوت M بزرگ و m کوچک باعث می‌شود دکمه منوی موبایل هیچ واکنشی نشان ندهد.',
      },
      {
        title: 'استفاده از form-control روی تگ select به جای form-select',
        wrongCode: `<select class="form-control"><option>یازدهم</option></select>`,
        rightCode: `<select class="form-select"><option>یازدهم</option></select>`,
        explanation: 'در بوت‌استرپ ۵.۳ کلاس اختصاصی لیست کشویی form-select است که فلش استاندارد کشویی را نمایش می‌دهد.',
      },
    ],
    examples: [
      {
        id: 'ex-3-1-nav-basic',
        tier: 'basic',
        title: 'نوار ناوبری واکنش‌گرای «مرجع نو» همراه با کادر جستجوی input-group',
        bookPage: '۱۷۶ تا ۱۷۸',
        summary: 'Navbar واقعی با دکمه همبرگری در موبایل و کادر جستجوی یکپارچه در دسکتاپ.',
        language: 'html',
        engine: 'bootstrap-js',
        useBootstrap: true,
        code: `<nav class="navbar navbar-expand-md navbar-dark bg-dark rounded-3 px-2">
  <div class="container-fluid">
    <a class="navbar-brand fw-bold" href="#">📚 مرجع نو</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#shopNavbar">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="shopNavbar">
      <ul class="navbar-nav me-auto mb-2 mb-md-0">
        <li class="nav-item"><a class="nav-link active" href="#">خانه</a></li>
        <li class="nav-item"><a class="nav-link" href="#">کتاب‌ها</a></li>
        <li class="nav-item"><a class="nav-link" href="#">تماس با ما</a></li>
      </ul>
      <form class="d-flex" role="search">
        <div class="input-group input-group-sm">
          <input class="form-control" type="search" placeholder="جستجوی کتاب..." />
          <button class="btn btn-primary" type="button">جستجو</button>
        </div>
      </form>
    </div>
  </div>
</nav>`,
        teacherTalkingPoints: [
          'نمای موبایل بالای پیش‌نمایش را بزنید و روی دکمه همبرگری گوشه چپ کلیک کنید تا باز شدن واقعی منو را ببینند!',
        ],
        lineExplanations: [
          {line: 4, explanation: 'دکمه همبرگری متصل به #shopNavbar برای باز کردن منو در موبایل.'},
        ],
        commonMistakes: ['فراموش کردن علامت # در data-bs-target="#shopNavbar".'],
      },
      {
        id: 'ex-3-1-nav-practical',
        tier: 'practical',
        title: 'فرم ثبت سفارش دو ستونه با form-control، form-select و form-check',
        bookPage: '۱۷۹ تا ۱۸۰',
        summary: 'طراحی فرم سفارش کتاب کاملاً واکنش‌گرا با ترکیب کلاس‌های فرم و شبکه ۱۲ ستونه.',
        language: 'html',
        engine: 'bootstrap-js',
        useBootstrap: true,
        code: `<div class="container py-3" style="max-width:540px;">
  <form class="card p-4 shadow-sm border-0">
    <h5 class="fw-bold mb-3">فرم ثبت سفارش کتاب</h5>
    <div class="row g-3">
      <div class="col-md-6">
        <label class="form-label small fw-bold">نام و نام خانوادگی</label>
        <input type="text" class="form-control" placeholder="مثلاً سارا احمدی" required />
      </div>
      <div class="col-md-6">
        <label class="form-label small fw-bold">پایه تحصیلی</label>
        <select class="form-select">
          <option value="10">پایه دهم</option>
          <option value="11" selected>پایه یازدهم</option>
          <option value="12">پایه دوازدهم</option>
        </select>
      </div>
      <div class="col-12">
        <div class="form-check">
          <input class="form-check-input" type="checkbox" id="fastShip" checked />
          <label class="form-check-label small" for="fastShip">ارسال پیشتاز (۲ روزه)</label>
        </div>
      </div>
      <div class="col-12">
        <button type="button" class="btn btn-success w-100">تأیید و ثبت سفارش</button>
      </div>
    </div>
  </form>
</div>`,
        teacherTalkingPoints: [
          'دقت کنید در دسکتاپ نام و پایه کنار هم (col-md-6) و در موبایل زیر هم قرار می‌گیرند.',
        ],
        lineExplanations: [
          {line: 11, explanation: 'کلاس form-select مخصوص فهرست‌های کشویی در بوت‌استرپ ۵.۳.'},
        ],
        commonMistakes: ['گذاشتن form-control روی checkbox به جای form-check-input.'],
      },
      {
        id: 'ex-3-1-nav-combined',
        tier: 'combined',
        title: 'فرم مدرن با برچسب‌های شناور (form-floating) و پیشوند قیمت (input-group)',
        bookPage: '۱۸۱',
        summary: 'استفاده از form-floating برای فرم ورود شیک و input-group-text برای نمایش واحد پول تومان.',
        language: 'html',
        engine: 'bootstrap-js',
        useBootstrap: true,
        code: `<div class="container py-3" style="max-width:420px;">
  <div class="form-floating mb-3">
    <input type="email" class="form-control" id="floatMail" placeholder="name@example.com" />
    <label for="floatMail">نشانی ایمیل هنرجو</label>
  </div>
  <div class="input-group mb-3">
    <span class="input-group-text">مبلغ حداکثر</span>
    <input type="number" class="form-control" value="50000" />
    <span class="input-group-text">تومان</span>
  </div>
</div>`,
        teacherTalkingPoints: [
          'داخل فیلد ایمیل کلیک و تایپ کنید تا حرکت نرم برچسب به بالای فیلد را ببینند.',
        ],
        lineExplanations: [
          {line: 3, explanation: 'در form-floating حتماً باید input قبل از label بیاید و placeholder داشته باشد.'},
        ],
        commonMistakes: ['قرار دادن label قبل از input در form-floating که انیمیشن را از کار می‌اندازد.'],
      },
      {
        id: 'ex-3-1-nav-whatif',
        tier: 'what-if',
        title: 'آزمایشگاه What-If: کلاس‌های نمایش وضعیت اعتبارسنجی (is-valid / is-invalid)',
        bookPage: '۱۸۱',
        summary: 'نحوه نمایش بازخورد سبز (معتبر) و قرمز (نامعتبر) روی فیلدهای فرم در بوت‌استرپ ۵.۳.',
        language: 'html',
        engine: 'bootstrap-js',
        useBootstrap: true,
        code: `<div class="container py-3" style="max-width:400px;">
  <div class="mb-3">
    <label class="form-label small">نام کاربری</label>
    <input type="text" class="form-control is-valid" value="ali_1405" />
    <div class="valid-feedback">نام کاربری آزاد و معتبر است!</div>
  </div>
  <div>
    <label class="form-label small">رمز عبور</label>
    <input type="password" class="form-control is-invalid" value="123" />
    <div class="invalid-feedback">رمز عبور باید حداقل ۶ کاراکتر باشد.</div>
  </div>
</div>`,
        teacherTalkingPoints: [
          'به کلاس بگویید در واحد ۳.۲ (جاوااسکریپت) دقیقاً همین کلاس‌های is-valid و is-invalid را به‌صورت پویا به فرم اضافه می‌کنیم!',
        ],
        lineExplanations: [
          {line: 9, explanation: 'کلاس is-invalid کادر را قرمز کرده و پیام invalid-feedback را نمایان می‌کند.'},
        ],
        commonMistakes: ['فراموش کردن قرار دادن invalid-feedback بلافاصله پس از input.'],
      },
    ],
  },

  // =========================================================================
  // CONCEPT 6: Interactive Bootstrap JS Components (Modal, Accordion, Carousel)
  // =========================================================================
  {
    id: 'les-3-1-js-components',
    order: 6,
    title: 'مؤلفه‌های تعاملی JS بوت‌استرپ: Modal (اصلاح ص ۱۸۳)، Accordion (اصلاح ص ۱۸۸) و Carousel',
    bookPage: '۱۸۲ تا ۱۸۹',
    whyWeNeedIt: {
      realWorldProblem:
        'پنجره‌های بازشو (Modal)، اسلایدر تصاویر (Carousel) و پرسش‌های متداول بازشو (Accordion) به تعامل جاوااسکریپت نیاز دارند. بوت‌استرپ این امکان را بدون نوشتن یک خط کد JS و تنها با صفات data-bs-* فراهم می‌کند — به شرطی که شناسه‌ها دقیقاً هم‌نام باشند!',
      analogy:
        'صفات data-bs-toggle و data-bs-target مثل «کلید ریموت کنترل و فرکانس تلویزیون» هستند: اگر حتی یک حرف بزرگ و کوچک در شناسه #id فرق داشته باشد (مثل باگ ص ۱۸۳ کتاب)، ریموت کار نمی‌کند!',
    },
    syntaxAnatomy: {
      template: `<button data-bs-toggle="modal" data-bs-target="#addToCartMsg">افزودن</button>
<div class="modal fade" id="addToCartMsg" tabindex="-1">...</div>`,
      parts: [
        {token: 'data-bs-toggle="modal"', role: 'نوع مؤلفه تعاملی را تعیین می‌کند (modal، collapse، carousel).'},
        {token: 'data-bs-target="#addToCartMsg"', role: 'شناسه دقیق عنصر هدف با # (حساس به حروف بزرگ/کوچک!).'},
        {token: 'data-bs-dismiss="modal"', role: 'دکمه بستن پنجره بازشو.'},
        {token: 'aria-expanded="false"', role: 'وضعیت دسترس‌پذیری آیتم بسته در Accordion (اصلاح ص ۱۸۸ کتاب).'},
      ],
    },
    behindTheScenes: [
      'باگ بحرانی ص ۱۸۳ کتاب درسی: روی دکمه سبد خرید نوشته شده data-bs-target="#addToCartMsg" (با C بزرگ)، اما روی پنجره مودال نوشته شده id="addTocartMsg" (با c کوچک)! در نتیجه کد کتاب در مرورگر اصلاً کار نمی‌کند!',
      'باگ دسترس‌پذیری ص ۱۸۸ کتاب درسی: در صفحه FAQ (Accordion)، دکمه آیتم دوم که در حالت بسته قرار دارد باید کلاس collapsed و صفت aria-expanded="false" داشته باشد.',
      'تمامی این مؤلفه‌ها برای کار کردن نیازمند فایل bootstrap.bundle.min.js هستند که در سامانه ما ۱۰۰٪ آفلاین لود شده است.',
    ],
    goldenTips: [
      'هرگاه یک Modal یا Accordion با کلیک باز نشد، اولین چیزی که باید چک کنید تطابق حرف‌به‌حرف data-bs-target و id است!',
      'در Accordion با گذاشتن data-bs-parent="#faqAccordion" روی بخش‌های بازشو، با باز شدن یک سؤال، سؤال قبلی خودکار بسته می‌شود.',
    ],
    wrongVsRight: [
      {
        title: 'عدم تطابق حروف شناسه Modal (باگ واقعی ص ۱۸۳ کتاب)',
        wrongCode: `<button data-bs-target="#addToCartMsg">خرید</button>
<div class="modal fade" id="addTocartMsg">...</div>`,
        rightCode: `<button data-bs-target="#addToCartMsg">خرید</button>
<div class="modal fade" id="addToCartMsg">...</div>`,
        explanation: 'شناسه HTML حساس به حروف بزرگ و کوچک است؛ c کوچک با C بزرگ مطابقت ندارد.',
      },
      {
        title: 'آیتم بسته Accordion بدون کلاس collapsed و aria-expanded="false" (ص ۱۸۸)',
        wrongCode: `<button class="accordion-button" aria-expanded="true" data-bs-target="#q2">سؤال ۲</button>
<div id="q2" class="accordion-collapse collapse">...</div>`,
        rightCode: `<button class="accordion-button collapsed" aria-expanded="false" data-bs-target="#q2">سؤال ۲</button>
<div id="q2" class="accordion-collapse collapse">...</div>`,
        explanation: 'همخوانی کلاس collapsed و aria-expanded="false" با وضعیت بسته، جهت فلش و صفحه‌خوان را درست نگه می‌دارد.',
      },
    ],
    examples: [
      {
        id: 'ex-3-1-js-modal',
        tier: 'basic',
        title: 'صفحه جزئیات کتاب و Modal سبد خرید (اصلاح باگ بحرانی ص ۱۸۳)',
        bookPage: '۱۸۳',
        summary: 'اجرای واقعی دکمه و Modal بوت‌استرپ ۵.۳ RTL به‌صورت کاملاً آفلاین با شناسه اصلاح‌شده #addToCartMsg.',
        language: 'html',
        engine: 'bootstrap-js',
        useBootstrap: true,
        code: `<div class="container py-3">
  <div class="card shadow-sm border-0">
    <div class="row g-0 align-items-center">
      <div class="col-md-4 p-3 text-center">
        <img src="book1.jpg" class="img-fluid rounded-3" alt="طراح سایت" />
      </div>
      <div class="col-md-8">
        <div class="card-body">
          <span class="badge bg-primary-subtle text-primary mb-2">پرفروش ۱۴۰۵</span>
          <h4 class="card-title fw-bold">کتاب طراح سایت — پایه یازدهم</h4>
          <p class="card-text text-secondary small">شامل ۵ پودمان عملی از پایتون تا طراحی سایت و جنگو.</p>
          <button type="button" class="btn btn-success" data-bs-toggle="modal" data-bs-target="#addToCartMsg">
            افزودن به سبد خرید
          </button>
        </div>
      </div>
    </div>
  </div>
</div>

<!-- اصلاح ص ۱۸۳: شناسه دقیقاً addToCartMsg با C بزرگ -->
<div class="modal fade" id="addToCartMsg" tabindex="-1" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title fw-bold">سبد خرید مرجع نو</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="بستن"></button>
      </div>
      <div class="modal-body">کتاب «طراح سایت» با موفقیت به سبد خرید اضافه شد!</div>
      <div class="modal-footer">
        <button type="button" class="btn btn-primary" data-bs-dismiss="modal">ادامه خرید</button>
      </div>
    </div>
  </div>
</div>`,
        teacherTalkingPoints: [
          'روی دکمه سبز کلیک کنید تا باز شدن زنده Modal را ببینند؛ سپس برای نمایش باگ ص ۱۸۳، C بزرگ را به c کوچک تغییر دهید و تست کنید!',
        ],
        lineExplanations: [
          {line: 12, explanation: 'اتصال دکمه به مودال با data-bs-target="#addToCartMsg".'},
          {line: 22, explanation: 'تطابق دقیق حروف بزرگ و کوچک در id مودال.'},
        ],
        commonMistakes: ['تایپ کردن id="addTocartMsg" با c کوچک مثل ص ۱۸۳ کتاب.'],
        bookCorrection: {
          page: 183,
          issue: 'عدم تطابق حروف بزرگ/کوچک میان #addToCartMsg و addTocartMsg باعث از کار افتادن مودال می‌شد.',
          fix: 'هر دو شناسه یکسان‌سازی شدند و مودال ۱۰۰٪ آفلاین کار می‌کند.',
        },
      },
      {
        id: 'ex-3-1-js-accordion',
        tier: 'practical',
        title: 'صفحه پرسش‌های متداول (Accordion) مرجع نو (اصلاح ص ۱۸۸)',
        bookPage: '۱۸۸',
        summary: 'پیاده‌سازی ۳ پرسش متداول با data-bs-parent و تنظیم صحیح collapsed و aria-expanded="false".',
        language: 'html',
        engine: 'bootstrap-js',
        useBootstrap: true,
        code: `<div class="container py-3">
  <div class="accordion" id="faqAccordion">
    <div class="accordion-item">
      <h2 class="accordion-header">
        <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#faq1" aria-expanded="true">
          زمان ارسال کتاب‌های مرجع نو چقدر است؟
        </button>
      </h2>
      <div id="faq1" class="accordion-collapse collapse show" data-bs-parent="#faqAccordion">
        <div class="accordion-body small">سفارش‌ها بین ۲ تا ۴ روز کاری با پست پیشتاز ارسال می‌شوند.</div>
      </div>
    </div>
    <div class="accordion-item">
      <h2 class="accordion-header">
        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq2" aria-expanded="false">
          آیا امکان مرجوعی کتاب وجود دارد؟
        </button>
      </h2>
      <div id="faq2" class="accordion-collapse collapse" data-bs-parent="#faqAccordion">
        <div class="accordion-body small">بله، تا ۷ روز پس از تحویل در صورت سلامت فیزیکی قابل بازگشت است.</div>
      </div>
    </div>
  </div>
</div>`,
        teacherTalkingPoints: [
          'روی سؤال دوم کلیک کنید تا ببینید سؤال اول به لطف data-bs-parent="#faqAccordion" خودکار بسته می‌شود.',
        ],
        lineExplanations: [
          {line: 15, explanation: 'اصلاح ص ۱۸۸: کلاس collapsed و صفت aria-expanded="false" برای آیتم بسته.'},
        ],
        commonMistakes: ['فراموش کردن منحصربه‌فرد کردن id بخش‌ها (#faq1، #faq2).'],
        bookCorrection: {
          page: 188,
          issue: 'در آیتم‌های بسته Accordion ص ۱۸۸ وضعیت aria-expanded="false" و کلاس collapsed هماهنگ نبود.',
          fix: 'ساختار استاندارد و کاملاً دسترس‌پذیر تنظیم شد.',
        },
      },
      {
        id: 'ex-3-1-js-carousel',
        tier: 'combined',
        title: 'اسلایدر تصاویر کتاب‌ها (Carousel) با دکمه‌های قبلی/بعدی و نشانگرها',
        bookPage: '۱۸۵ تا ۱۸۶',
        summary: 'اجرای واقعی اسلایدر Carousel بوت‌استرپ ۵.۳ با ۳ اسلاید کتاب و کنترل‌های تعاملی.',
        language: 'html',
        engine: 'bootstrap-js',
        useBootstrap: true,
        code: `<div class="container py-2" style="max-width:460px;">
  <div id="booksCarousel" class="carousel slide rounded-4 overflow-hidden shadow-sm" data-bs-ride="carousel">
    <div class="carousel-inner">
      <div class="carousel-item active bg-dark text-white text-center p-4">
        <img src="book1.jpg" class="rounded-3 mb-2" height="120" alt="طراح سایت" />
        <h6 class="fw-bold mb-0">۱. کتاب طراح سایت — پایه یازدهم</h6>
      </div>
      <div class="carousel-item bg-primary text-white text-center p-4">
        <img src="book2.jpg" class="rounded-3 mb-2" height="120" alt="تولید محتوا" />
        <h6 class="fw-bold mb-0">۲. تولید محتوای الکترونیکی — پایه دهم</h6>
      </div>
      <div class="carousel-item bg-success text-white text-center p-4">
        <img src="book3.jpg" class="rounded-3 mb-2" height="120" alt="توسعه برنامه" />
        <h6 class="fw-bold mb-0">۳. توسعه برنامه‌سازی و پایگاه داده</h6>
      </div>
    </div>
    <button class="carousel-control-prev" type="button" data-bs-target="#booksCarousel" data-bs-slide="prev">
      <span class="carousel-control-prev-icon"></span>
    </button>
    <button class="carousel-control-next" type="button" data-bs-target="#booksCarousel" data-bs-slide="next">
      <span class="carousel-control-next-icon"></span>
    </button>
  </div>
</div>`,
        teacherTalkingPoints: [
          'تأکید کنید دقیقاً یکی از اسلایدها باید کلاس active داشته باشد، وگرنه کل اسلایدر نامرئی می‌ماند!',
        ],
        lineExplanations: [
          {line: 4, explanation: 'اسلاید اول با کلاس active به عنوان نقطه شروع مشخص شده است.'},
        ],
        commonMistakes: ['فراموش کردن کلاس active روی اولین carousel-item.'],
      },
      {
        id: 'ex-3-1-js-whatif',
        tier: 'what-if',
        title: 'آزمایشگاه What-If: منوی کشویی کناری (Offcanvas) برای سبد خرید موبایل',
        bookPage: '۱۸۹',
        summary: 'آشنایی با مؤلفه مدرن Offcanvas بوت‌استرپ ۵.۳ که سبد خرید را به‌صورت کشویی از کنار صفحه باز می‌کند.',
        language: 'html',
        engine: 'bootstrap-js',
        useBootstrap: true,
        code: `<div class="container py-3 text-center">
  <button class="btn btn-primary" type="button" data-bs-toggle="offcanvas" data-bs-target="#cartDrawer">
    🛒 باز کردن کشوی سبد خرید (Offcanvas)
  </button>
</div>
<div class="offcanvas offcanvas-start" tabindex="-1" id="cartDrawer">
  <div class="offcanvas-header border-bottom">
    <h5 class="offcanvas-title fw-bold">سبد خرید شما</h5>
    <button type="button" class="btn-close" data-bs-dismiss="offcanvas"></button>
  </div>
  <div class="offcanvas-body">
    <p class="small">۱× کتاب طراح سایت — <strong>۴۵٬۰۰۰ تومان</strong></p>
    <button class="btn btn-success w-100" data-bs-dismiss="offcanvas">ادامه خرید</button>
  </div>
</div>`,
        teacherTalkingPoints: [
          'کلیک روی دکمه کشوی سبد خرید نشان می‌دهد چطور در فروشگاه‌های واقعی سبد خرید بدون خروج از صفحه باز می‌شود.',
        ],
        lineExplanations: [
          {line: 6, explanation: 'offcanvas-start در حالت RTL از لبه شروع (سمت راست) باز می‌شود.'},
        ],
        commonMistakes: ['ندادن tabindex="-1" یا فراموش کردن دکمه data-bs-dismiss="offcanvas".'],
      },
    ],
  },
];
