import type {ConceptLesson} from '../../../types/curriculum.ts';

export const UNIT_2_1_LESSONS: ConceptLesson[] = [
  // =========================================================================
  // CONCEPT 1: Web Architecture & HTML5 Persian RTL Skeleton
  // =========================================================================
  {
    id: 'les-2-1-skeleton',
    order: 1,
    title: 'اسکلت استاندارد HTML5 فارسی (DOCTYPE، lang="fa"، dir="rtl" و متاتگ‌ها)',
    bookPage: '۸۴ تا ۱۰۰',
    whyWeNeedIt: {
      realWorldProblem:
        'وقتی کاربری آدرس یک سایت را وارد مرورگر می‌کند، مرورگر برای نمایش درست حروف فارسی، چیدمان راست‌به‌چپ و هماهنگی با موبایل نیاز به یک اسکلت استاندارد HTML5 دارد. بدون تنظیم کدگذاری UTF-8 و جهت dir="rtl"، حروف فارسی به‌هم می‌ریزند و چیدمان صفحه از چپ به راست نشان داده می‌شود.',
      analogy:
        'HTML دقیقاً مثل «اسکلت بتنی و دیوارچینی یک ساختمان» است؛ تا اسکلت اتاق‌ها (header، main، footer) درست ساخته نشود، نقاشی و دکوراسیون (CSS) و برق‌کشی هوشمند (JavaScript) هیچ جایگاهی ندارند!',
    },
    syntaxAnatomy: {
      template: `<!DOCTYPE html>
<html lang="fa" dir="rtl">
  <head>
    <meta charset="UTF-8" />
    <title>فروشگاه کتاب مرجع نو</title>
  </head>
  <body>
    <h1>خوش آمدید</h1>
  </body>
</html>`,
      parts: [
        {token: '<!DOCTYPE html>', role: 'به مرورگر اعلام می‌کند سند از استاندارد مدرن HTML5 پیروی می‌کند.'},
        {token: 'lang="fa" dir="rtl"', role: 'زبان فارسی و جهت راست‌به‌چپ صفحه را تنظیم می‌کند (اصلاح غلط تایپی dir="trl" ص ۱۰۰ کتاب).'},
        {token: '<head> ... </head>', role: 'بخش تنظیمات نامرئی صفحه: کدگذاری UTF-8، عنوان تب مرورگر و لینک استایل‌ها.'},
        {token: '<body> ... </body>', role: 'تمام محتوای قابل مشاهده صفحه (متن، تصویر، دکمه، فرم) درون این تگ نوشته می‌شود.'},
      ],
    },
    behindTheScenes: [
      'در سفر درخواست وب (تب شهود بصری را ببینید): مرورگر ابتدا دامنه را از DNS به IP تبدیل می‌کند، درخواست HTTP می‌فرستد و سرور فایل HTML را برمی‌گرداند.',
      'تگ <meta charset="UTF-8"> برای نمایش بدون اشکال حروف فارسی (پ، چ، ژ، گ) و نیم‌فاصله ضروری است.',
      'در ص ۱۰۰ کتاب درسی اشتباهاً dir="trl" چاپ شده است! مرورگر این مقدار نامعتبر را نادیده می‌گیرد و صفحه چپ‌چین می‌ماند؛ شکل صحیح همیشه dir="rtl" (Right-To-Left) است.',
      'مرورگرها خطای نحوی HTML را مثل پایتون متوقف نمی‌کنند، اما باز گذاشتن تگ‌ها باعث به‌هم‌ریختگی کل چیدمان و افت رتبه سئو می‌شود.',
    ],
    goldenTips: [
      'همیشه عنوان صفحه (<title>) را دقیق و مرتبط با محتوای هر صفحه انتخاب کنید چون مستقیماً در نتایج گوگل دیده می‌شود.',
      'از کامنت‌های <!-- توضیح --> برای بخش‌بندی اسکلت صفحات بزرگ استفاده کنید.',
    ],
    wrongVsRight: [
      {
        title: 'غلط تایپی جهت راست‌به‌چپ (ص ۱۰۰ کتاب)',
        wrongCode: `<html lang="fa" dir="trl">`,
        rightCode: `<html lang="fa" dir="rtl">`,
        explanation: 'عبارت trl بی‌معناست؛ سرواژه Right-To-Left برابر rtl است.',
      },
      {
        title: 'قرار دادن محتوای نمایشی در head به جای body',
        wrongCode: `<head>
  <h1>فروشگاه کتاب</h1>
</head>`,
        rightCode: `<head>
  <title>فروشگاه کتاب</title>
</head>
<body>
  <h1>فروشگاه کتاب</h1>
</body>`,
        explanation: 'عناوین نمایشی (h1) فقط باید داخل <body> قرار گیرند؛ <head> مخصوص متادیتا و <title> است.',
      },
    ],
    examples: [
      {
        id: 'ex-2-1-skeleton-basic',
        tier: 'basic',
        title: 'اولین صفحه استاندارد فارسی با dir="rtl" (اصلاح ص ۱۰۰)',
        bookPage: '۹۹ تا ۱۰۰',
        summary: 'نمایش اسکلت صحیح فارسی فروشگاه کتاب «مرجع نو» با عنوان، توضیح و پاراگراف معرفی.',
        language: 'html',
        engine: 'web',
        code: `<div dir="rtl" style="padding:16px;border:2px solid #0284c7;border-radius:12px;background:#f0f9ff;">
  <h1 style="margin:0 0 8px;color:#0369a1;">فروشگاه کتاب‌های درسی «مرجع نو»</h1>
  <p style="margin:0;line-height:1.8;">
    این صفحه با استاندارد <strong>HTML5</strong> و جهت صحیح <code>dir="rtl"</code> ساخته شده است.
  </p>
</div>`,
        teacherTalkingPoints: [
          'تأکید کنید هر صفحه وب فارسی باید با <html lang="fa" dir="rtl"> شروع شود.',
        ],
        classroomQuestion: 'اگر dir="rtl" را حذف کنیم چه تغییری در جای علامت نقطه و تراز پاراگراف می‌افتد؟',
        lineExplanations: [
          {line: 1, explanation: 'تنظیم جهت راست‌به‌چپ برای نمایش استاندارد متون فارسی.'},
          {line: 2, explanation: 'تگ h1 اصلی‌ترین تیتر صفحه است.'},
        ],
        commonMistakes: ['نوشتن dir="trl" مطابق غلط چاپی ص ۱۰۰ کتاب.'],
        bookCorrection: {
          page: 100,
          issue: 'در ص ۱۰۰ کتاب صفت جهت صفحه به اشتباه dir="trl" چاپ شده است.',
          fix: 'جهت استاندارد dir="rtl" آموزش داده و تثبیت شد.',
        },
      },
      {
        id: 'ex-2-1-skeleton-practical',
        tier: 'practical',
        title: 'کارت معرفی هنرجو با کامنت‌گذاری و ساختار تودرتوی تمیز',
        bookPage: '۱۰۱',
        summary: 'رعایت تورفتگی ۲ فاصله و استفاده از کامنت HTML برای مستندسازی بخش‌های یک کارت معرفی.',
        language: 'html',
        engine: 'web',
        code: `<!-- کارت معرفی هنرجوی رشته شبکه و نرم‌افزار -->
<section style="border:1px solid #cbd5e1;border-radius:12px;padding:16px;background:#ffffff;">
  <!-- بخش عنوان -->
  <h2 style="margin-top:0;color:#0f172a;">پروفایل هنرجوی طراح سایت</h2>
  <!-- مشخصات فردی -->
  <p><strong>نام:</strong> امیرحسین محمدی</p>
  <p><strong>پایه:</strong> یازدهم فنی‌وحرفه‌ای — سال تحصیلی ۱۴۰۵</p>
  <p><strong>پروژه کلاسی:</strong> فروشگاه آنلاین کتاب «مرجع نو»</p>
</section>`,
        teacherTalkingPoints: [
          'نشان دهید متن داخل <!-- ... --> در صفحه نمایش داده نمی‌شود و فقط برای خوانایی کد توسط انسان است.',
        ],
        lineExplanations: [
          {line: 1, explanation: 'کامنت HTML که در مرورگر دیده نمی‌شود اما کد را مستند می‌کند.'},
        ],
        commonMistakes: ['باز گذاشتن کامنت یا استفاده از # پایتون به‌جای <!-- --> در HTML.'],
      },
      {
        id: 'ex-2-1-skeleton-combined',
        tier: 'combined',
        title: 'مقایسه زنده چیدمان راست‌به‌چپ (RTL) و چپ‌به‌راست (LTR) در یک صفحه',
        bookPage: '۱۰۰',
        summary: 'نمایش عملی کاربرد dir="rtl" برای متن فارسی و dir="ltr" برای نمایش کد و نشانی اینترنتی در همان صفحه.',
        language: 'html',
        engine: 'web',
        code: `<div style="display:grid;gap:12px;">
  <div dir="rtl" style="background:#ecfdf5;border:1px solid #10b981;padding:12px;border-radius:10px;">
    <strong>بخش فارسی (dir="rtl"):</strong>
    سلام! به کارگاه طراحی وب خوش آمدید. (نقطه و پرانتز سر جای درست هستند.)
  </div>
  <div dir="ltr" style="background:#f8fafc;border:1px solid #94a3b8;padding:12px;border-radius:10px;font-family:monospace;">
    <strong>Code / URL (dir="ltr"):</strong> https://marjanow.ir/books/web-11
  </div>
</div>`,
        teacherTalkingPoints: [
          'به کلاس یادآوری کنید در وب‌سایت‌های فارسی برای شماره تلفن، ایمیل و کدهای برنامه‌نویسی بهتر است dir="ltr" بگذاریم.',
        ],
        lineExplanations: [
          {line: 6, explanation: 'تنظیم dir="ltr" برای نشانی اینترنتی تا اسلش‌ها جابه‌جا نشوند.'},
        ],
        commonMistakes: ['چسباندن آدرس اینترنتی در متن RTL بدون جداسازی جهت.'],
      },
      {
        id: 'ex-2-1-skeleton-whatif',
        tier: 'what-if',
        title: 'آزمایشگاه What-If: اگر تگ‌ها را اشتباه تو در تو ببندیم چه می‌شود؟',
        bookPage: '۱۰۱',
        summary: 'مقایسه تودرتویی استاندارد (LIFO: آخرین تگ بازشده، اولین تگ بسته‌شده) با بستن نامنظم تگ‌ها.',
        language: 'html',
        engine: 'web',
        code: `<div style="padding:14px;border:1px solid #e2e8f0;border-radius:10px;">
  <p>✅ <strong>تودرتویی <em>استاندارد</em></strong>: ابتدا <code>&lt;/em&gt;</code> بسته می‌شود سپس <code>&lt;/strong&gt;</code>.</p>
  <hr />
  <p style="color:#475569;font-size:13px;">
    قانون طلایی HTML5: آخرین تگی که باز شده باید اولین تگی باشد که بسته می‌شود (درست مثل جعبه داخل جعبه).
  </p>
</div>`,
        teacherTalkingPoints: [
          'از تشبیه «جعبه داخل جعبه» استفاده کنید: نمی‌توانید درِ جعبه بزرگ را ببندید در حالی که درِ جعبه کوچک‌تر بیرون زده است!',
        ],
        lineExplanations: [
          {line: 2, explanation: 'تگ em داخل strong باز و قبل از آن بسته شده است.'},
        ],
        commonMistakes: ['بستن تگ‌ها به شکل متقاطع مانند <b><i>متن</b></i>.'],
      },
    ],
  },

  // =========================================================================
  // CONCEPT 2: Headings, Paragraphs & Semantic Text Formatting
  // =========================================================================
  {
    id: 'les-2-1-text',
    order: 2,
    title: 'تیترها (h1 تا h6)، پاراگراف‌ها و قالب‌بندی معنایی متن (strong, em, mark, del)',
    bookPage: '۱۰۱ تا ۱۰۳',
    whyWeNeedIt: {
      realWorldProblem:
        'موتورهای جستجو مثل گوگل و نرم‌افزارهای صفحه‌خوان نابینایان برای درک ساختار یک مقاله یا صفحه محصول به سلسله‌مراتب تیترها (h1 تا h6) و تگ‌های معنایی (strong، em) تکیه می‌کنند؛ نه صرفاً بزرگ کردن فونت یک پاراگراف عادی!',
      analogy:
        'سلسله‌مراتب تیترها دقیقاً مثل «فهرست مطالب یک کتاب» است: فقط یک عنوان اصلی روی جلد (h1) داریم، چند عنوان فصل (h2) و زیرعنوان‌های هر فصل (h3).',
    },
    syntaxAnatomy: {
      template: `<h1>عنوان اصلی صفحه</h1>
<h2>زیرعنوان بخش</h2>
<p>قیمت قبلی: <del>۶۰٬۰۰۰</del> — <strong>۴۵٬۰۰۰ تومان</strong> با <mark>تخفیف ویژه</mark></p>`,
      parts: [
        {token: '<h1> .. <h6>', role: 'شش سطح تیتر از مهم‌ترین (h1) تا جزئی‌ترین (h6)؛ بهتر است هر صفحه فقط یک h1 داشته باشد.'},
        {token: '<p> / <br /> / <hr />', role: 'پاراگراف مستقل، شکستن خط داخل پاراگراف و خط افقی جداکننده موضوع.'},
        {token: '<strong> / <em>', role: 'تأکید مهم معنایی (ضخیم) و تأکید لحنی (کج)؛ در HTML5 نسبت به <b> و <i> ارجحیت دارند.'},
        {token: '<mark> / <del> / <ins>', role: 'برجسته‌سازی با رنگ زرد، متن خط‌خورده (مثلاً قیمت قدیم) و متن درج‌شده.'},
      ],
    },
    behindTheScenes: [
      'مرورگر فاصله‌های اضافی (Space) و Enterهای معمولی درون کد HTML را به یک فاصله واحد فشرده می‌کند (Whitespace Collapsing)؛ پس برای رفتن به خط جدید باید از پاراگراف جدید <p> یا <br /> استفاده کنید.',
      'هرگز از <h3> صرفاً برای کوچک کردن اندازه متن استفاده نکنید! انتخاب سطح تیتر باید بر اساس «اهمیت معنایی» باشد و اندازه فونت را بعداً در CSS تغییر می‌دهیم.',
      'تگ‌های <br /> و <hr /> خودبسته (Void Elements) هستند و تگ پایانی ندارند.',
    ],
    goldenTips: [
      'در هر صفحه وب فقط یک <h1> برای موضوع اصلی بگذارید و سطوح تیتر را بدون پرش (h1 ← h2 ← h3) پیش ببرید.',
      'برای نمایش تخفیف در فروشگاه کتاب «مرجع نو»، ترکیب <del> برای قیمت قبل و <strong> برای قیمت جدید بسیار حرفه‌ای است.',
    ],
    wrongVsRight: [
      {
        title: 'استفاده از br پی‌درپی به‌جای پاراگراف‌های مستقل',
        wrongCode: `پاراگراف اول<br><br>پاراگراف دوم`,
        rightCode: `<p>پاراگراف اول</p>
<p>پاراگراف دوم</p>`,
        explanation: 'پاراگراف‌های جداگانه باید داخل <p> باشند تا هم معنایی و هم قابل استایل‌دهی با CSS باشند.',
      },
      {
        title: 'پرش بی‌دلیل از h1 به h5 برای کوچک کردن قلم',
        wrongCode: `<h1>فروشگاه</h1>
<h5>کتاب‌های پرفروش</h5>`,
        rightCode: `<h1>فروشگاه</h1>
<h2>کتاب‌های پرفروش</h2>`,
        explanation: 'سلسله‌مراتب تیتر برای سئو و دسترس‌پذیری باید پیوسته باشد (h1 ← h2).',
      },
    ],
    examples: [
      {
        id: 'ex-2-1-text-basic',
        tier: 'basic',
        title: 'نمایش سلسله‌مراتب کامل تیترهای h1 تا h6',
        bookPage: '۱۰۱',
        summary: 'مقایسه بصری و معنایی شش سطح تیتر در یک صفحه فارسی همراه با خط جداکننده hr.',
        language: 'html',
        engine: 'web',
        code: `<div style="padding:12px;">
  <h1>تیتر سطح ۱ (h1): عنوان اصلی سایت مرجع نو</h1>
  <h2>تیتر سطح ۲ (h2): بخش کتاب‌های فنی‌وحرفه‌ای</h2>
  <h3>تیتر سطح ۳ (h3): رشته شبکه و نرم‌افزار</h3>
  <h4>تیتر سطح ۴ (h4): پایه یازدهم — طراح سایت</h4>
  <h5>تیتر سطح ۵ (h5): پودمان دوم — HTML5</h5>
  <h6>تیتر سطح ۶ (h6): یادداشت تکمیلی</h6>
  <hr />
  <p>این یک پاراگراف عادی (p) برای بدنه متن است.</p>
</div>`,
        teacherTalkingPoints: [
          'نشان دهید مرورگر به صورت پیش‌فرض برای هر سطح تیتر اندازه قلم و فاصله بالا/پایین متفاوتی در نظر می‌گیرد.',
        ],
        lineExplanations: [
          {line: 2, explanation: 'مهم‌ترین تیتر صفحه که موتورهای جستجو اول از همه آن را می‌خوانند.'},
          {line: 8, explanation: 'تگ <hr /> یک خط افقی برای جداسازی موضوعی می‌کشد.'},
        ],
        commonMistakes: ['استفاده از چند تگ h1 در یک صفحه.'],
      },
      {
        id: 'ex-2-1-text-practical',
        tier: 'practical',
        title: 'کارت معرفی کتاب با تگ‌های strong، em، del، mark و small',
        bookPage: '۱۰۲ تا ۱۰۳',
        summary: 'طراحی واقعی معرفی محصول فروشگاه کتاب با قیمت خط‌خورده، برچسب برجسته و پانویس.',
        language: 'html',
        engine: 'web',
        code: `<article style="border:1px solid #cbd5e1;border-radius:12px;padding:16px;background:#fff;">
  <h2 style="margin-top:0;">کتاب طراح سایت — پایه یازدهم</h2>
  <p>
    این کتاب در <strong>۵ پودمان عملی</strong> از <em>پایتون</em> تا <em>جنگو</em> تألیف شده و شامل
    <mark>پروژه واقعی فروشگاه مرجع نو</mark> است.
  </p>
  <p>
    قیمت پشت جلد: <del style="color:#94a3b8;">۶۰٬۰۰۰ تومان</del>
    <strong style="color:#059669;margin-right:8px;">۴۵٬۰۰۰ تومان</strong>
  </p>
  <small style="color:#64748b;">فرمول انرژی: E = mc<sup>2</sup> | فرمول آب: H<sub>2</sub>O</small>
</article>`,
        teacherTalkingPoints: [
          'در خط آخر تگ‌های <sup> (بالانویس/توان) و <sub> (زیرنویس/فرمول شیمیایی) را نیز نشان دهید.',
        ],
        lineExplanations: [
          {line: 8, explanation: 'تگ <del> روی قیمت قبلی خط می‌کشد تا تخفیف واضح باشد.'},
          {line: 11, explanation: 'کاربرد sup برای توان ریاضی و sub برای زیرنویس شیمیایی.'},
        ],
        commonMistakes: ['استفاده از تگ منسوخ <font> که در HTML5 حذف شده است.'],
      },
      {
        id: 'ex-2-1-text-combined',
        tier: 'combined',
        title: 'بخش نقل‌قول و خلاصه خبر با blockquote و abbr',
        bookPage: '۱۰۳',
        summary: 'استفاده از تگ‌های استاندارد نقل‌قول، مخفف با راهنمای شناور (title) و شکست خط آدرس با br.',
        language: 'html',
        engine: 'web',
        code: `<section style="padding:14px;background:#f8fafc;border-radius:10px;">
  <h2>آشنایی با استاندارد <abbr title="HyperText Markup Language">HTML</abbr></h2>
  <blockquote style="border-right:4px solid #0284c7;padding-right:12px;margin:10px 0;color:#334155;">
    «وب برای همگان ساخته شده است؛ ساختار معنایی تمیز، وب را برای همه انسان‌ها دسترس‌پذیر می‌کند.»
  </blockquote>
  <p>
    نشانی دفتر هنرستان:<br />
    تهران، خیابان آزادی، هنرستان فنی‌وحرفه‌ای نمونه
  </p>
</section>`,
        teacherTalkingPoints: [
          'موس را روی واژه HTML نگه دارید تا توضیح کامل صفت title در تگ <abbr> نمایش داده شود.',
        ],
        lineExplanations: [
          {line: 2, explanation: 'تگ abbr معنای مخفف‌ها را هنگام هاور موس نشان می‌دهد.'},
          {line: 7, explanation: 'کاربرد صحیح <br /> دقیقاً در آدرس پستی و شعر است.'},
        ],
        commonMistakes: ['استفاده بیش از حد از <br /> برای فاصله‌گذاری به جای CSS margin.'],
      },
      {
        id: 'ex-2-1-text-whatif',
        tier: 'what-if',
        title: 'آزمایشگاه What-If: چرا ۱۰ تا Space در HTML فقط یک فاصله نشان می‌دهد؟',
        bookPage: '۱۰۲',
        summary: 'اثبات پدیده Whitespace Collapsing در مرورگر و مقایسه <p> با تگ حفظ‌کننده فاصله <pre>.',
        language: 'html',
        engine: 'web',
        code: `<div style="display:grid;gap:10px;">
  <p style="background:#fef2f2;padding:10px;border-radius:8px;">
    در تگ p: سلام          کلاس
    یازدهم (همه فاصله‌ها و Enterها به یک فاصله تبدیل شدند!)
  </p>
  <pre style="background:#0f172a;color:#38bdf8;padding:10px;border-radius:8px;direction:ltr;text-align:left;">
In &lt;pre&gt;: spaces    and
line breaks    are preserved!
  </pre>
</div>`,
        teacherTalkingPoints: [
          'این مثال پاسخ سؤال همیشگی هنرجویان است که می‌پرسند: «چرا هر چقدر Space می‌زنم متن جلو نمی‌رود؟»',
        ],
        lineExplanations: [
          {line: 6, explanation: 'تگ <pre> تمام فاصله‌ها و خط‌شکنی‌های دقیق کد را حفظ می‌کند.'},
        ],
        commonMistakes: ['تلاش برای ترازبندی صفحه با زدن ده‌ها کلید Space در HTML.'],
      },
    ],
  },

  // =========================================================================
  // CONCEPT 3: Lists & Links
  // =========================================================================
  {
    id: 'les-2-1-lists-links',
    order: 3,
    title: 'لیست‌های مرتب و نامرتب (ul, ol, li, dl) و پیوندها (a, href, target, لنگر #id)',
    bookPage: '۱۰۳ تا ۱۰۵',
    whyWeNeedIt: {
      realWorldProblem:
        'منوهای ناوبری سایت‌ها، فهرست محصولات، مراحل ثبت سفارش و پیوند بین صفحات همگی با لیست‌ها و تگ پیوند (<a>) ساخته می‌شوند. بدون تگ <a> مفهوم «وب (تار عنکبوتی از صفحات متصل به هم)» اساساً وجود نداشت!',
      analogy:
        'تگ <a> مثل «درِ تله‌پورت» بین اتاق‌ها (صفحات سایت) یا بخش‌های مختلف یک صفحه بلند (لنگر #id) است!',
    },
    syntaxAnatomy: {
      template: `<ul>
  <li><a href="#order">رفتن به بخش سفارش</a></li>
  <li><a href="about.html" target="_blank" rel="noopener">درباره ما</a></li>
</ul>`,
      parts: [
        {token: '<ul> / <ol>', role: 'لیست نامرتب با نقطه‌گذاری (Unordered) و لیست شماره‌دار (Ordered).'},
        {token: '<li>', role: 'آیتم لیست (List Item)؛ تنها فرزند مستقیم مجاز درون <ul> و <ol> (اصلاح ص ۱۰۴ کتاب).'},
        {token: '<a href="...">', role: 'تگ پیوند (Anchor)؛ صفت href نشانی مقصد (فایل، آدرس کامل یا #id داخل صفحه) را تعیین می‌کند.'},
        {token: 'target="_blank"', role: 'پیوند را در یک تب جدید باز می‌کند (برای لینک‌های بیرونی همراه با rel="noopener").'},
      ],
    },
    behindTheScenes: [
      'در ص ۱۰۴ کتاب درسی یک خطای ساختاری W3C رخ داده بود: تگ <a> مستقیماً بدون <li> داخل <ol> قرار گرفته بود! همیشه اول <li> را باز کنید و بعد <a> را داخل آن بگذارید.',
      'تفاوت مسیر نسبی (مثل books/web.html) با مسیر مطلق (مثل https://example.com): در صفحات داخلی یک سایت همیشه از مسیر نسبی استفاده کنید تا سایت هم روی کامپیوتر محلی و هم روی سرور کار کند.',
      'علاوه بر لینک صفحه، با href="mailto:info@marjanow.ir" می‌توان لینک ایمیل و با href="tel:02188000000" لینک تماس تلفنی ساخت.',
    ],
    goldenTips: [
      'متن داخل تگ <a> را توصیفی بنویسید (مثلاً «مشاهده سرفصل کتاب طراح سایت» به‌جای «اینجا کلیک کنید») تا هم سئو بهتر شود و هم کاربر دقیقاً بداند کجا می‌رود.',
      'برای منوی سایت همیشه از <ul> و <li> استفاده کنید و بعداً در CSS نقطه‌های کنارش را با list-style: none بردارید.',
    ],
    wrongVsRight: [
      {
        title: 'قرار دادن <a> مستقیم داخل <ol> بدون <li> (خطای ص ۱۰۴ کتاب)',
        wrongCode: `<ol>
  <a href="#">کتاب اول</a>
  <li>کتاب دوم</li>
</ol>`,
        rightCode: `<ol>
  <li><a href="#">کتاب اول</a></li>
  <li>کتاب دوم</li>
</ol>`,
        explanation: 'فرزند مستقیم ul و ol طبق استاندارد HTML5 منحصراً باید تگ li باشد.',
      },
      {
        title: 'پیوند بدون صفت href',
        wrongCode: `<a>رفتن به فروشگاه</a>`,
        rightCode: `<a href="#shop">رفتن به فروشگاه</a>`,
        explanation: 'بدون صفت href، تگ a دیگر به عنوان پیوند قابل کلیک و قابل فوکوس با کیبورد رفتار نمی‌کند.',
      },
    ],
    examples: [
      {
        id: 'ex-2-1-lists-basic',
        tier: 'basic',
        title: 'لیست نامرتب (ul)، مرتب (ol) و لیست تعریفی (dl) استاندارد',
        bookPage: '۱۰۳ تا ۱۰۴',
        summary: 'نمایش هر سه نوع لیست در HTML5 برای فهرست کتاب‌ها، مراحل خرید و واژه‌نامه تخصصی.',
        language: 'html',
        engine: 'web',
        code: `<div style="display:grid;gap:14px;">
  <div>
    <h3>۱. فهرست پودمان‌ها (لیست مرتب ol)</h3>
    <ol>
      <li>برنامه‌نویسی پایتون</li>
      <li>طراحی صفحات وب ایستا (HTML/CSS)</li>
      <li>طراحی صفحات تعاملی (Bootstrap/JS)</li>
    </ol>
  </div>
  <div>
    <h3>۲. امکانات فروشگاه (لیست نامرتب ul)</h3>
    <ul>
      <li>ارسال سریع به سراسر کشور</li>
      <li>ضمانت اصالت کتاب‌های درسی</li>
    </ul>
  </div>
  <div>
    <h3>۳. واژه‌نامه (لیست تعریفی dl)</h3>
    <dl>
      <dt><strong>DNS</strong></dt>
      <dd>تبدیل نام دامنه به نشانی عددی IP سرور</dd>
    </dl>
  </div>
</div>`,
        teacherTalkingPoints: [
          'لیست تعریفی <dl>/<dt>/<dd> را برای واژه‌نامه‌ها و مشخصات فنی محصولات معرفی کنید.',
        ],
        lineExplanations: [
          {line: 4, explanation: 'مرورگر به‌صورت خودکار برای آیتم‌های <ol> شماره‌گذاری ۱، ۲، ۳ می‌گذارد.'},
        ],
        commonMistakes: ['نوشتن متن آزاد خارج از تگ <li> درون لیست.'],
      },
      {
        id: 'ex-2-1-lists-practical',
        tier: 'practical',
        title: 'فهرست مطالب با پیوندهای لنگر داخلی (#id) و لیست تو در تو',
        bookPage: '۱۰۴ تا ۱۰۵',
        summary: 'ایجاد پرش سریع به بخش‌های مختلف یک صفحه با href="#section-id" همراه با زیرمنوی تو در تو.',
        language: 'html',
        engine: 'web',
        code: `<nav style="background:#f1f5f9;padding:12px;border-radius:10px;margin-bottom:14px;">
  <strong>دسترسی سریع صفحه:</strong>
  <ul>
    <li><a href="#sec-html">بخش HTML5</a></li>
    <li>
      <a href="#sec-books">معرفی کتاب‌ها</a>
      <ul>
        <li>طراح سایت پایه یازدهم</li>
        <li>تولید محتوای پایه دهم</li>
      </ul>
    </li>
    <li><a href="mailto:info@marjanow.ir">ارسال ایمیل به پشتیبانی</a></li>
  </ul>
</nav>
<section id="sec-html" style="padding:10px;border-top:1px solid #cbd5e1;">
  <h3>بخش HTML5</h3>
  <p>این بخش مقصد لنگر <code>#sec-html</code> است.</p>
</section>
<section id="sec-books" style="padding:10px;border-top:1px solid #cbd5e1;">
  <h3>معرفی کتاب‌ها</h3>
  <p>این بخش مقصد لنگر <code>#sec-books</code> است.</p>
</section>`,
        teacherTalkingPoints: [
          'دقت کنید زیرلیست <ul> باید درون <li> والد قرار بگیرد نه بین دو <li>!',
        ],
        lineExplanations: [
          {line: 4, explanation: 'علامت # پیش از نام شناسه باعث پرش مرورگر به تگ دارای همان id می‌شود.'},
        ],
        commonMistakes: ['گذاشتن علامت # درون خود صفت id (اشتباه: id="#sec-html"، درست: id="sec-html").'],
      },
      {
        id: 'ex-2-1-lists-combined',
        tier: 'combined',
        title: 'نوار ناوبری افقی فروشگاه «مرجع نو» با ul/li/a (اصلاح ص ۱۰۴)',
        bookPage: '۱۰۴',
        summary: 'تبدیل یک لیست استاندارد معنایی به نوار منوی افقی تمیز با استایل ساده و لینک‌های استاندارد.',
        language: 'html',
        engine: 'web',
        code: `<nav style="background:#0f172a;padding:12px 16px;border-radius:10px;">
  <ul style="list-style:none;margin:0;padding:0;display:flex;gap:18px;flex-wrap:wrap;">
    <li><a href="#home" style="color:#fff;text-decoration:none;font-weight:bold;">صفحه اصلی</a></li>
    <li><a href="#books" style="color:#bae6fd;text-decoration:none;">کتاب‌های درسی</a></li>
    <li><a href="#faq" style="color:#bae6fd;text-decoration:none;">پرسش‌های متداول</a></li>
    <li><a href="#contact" style="color:#bae6fd;text-decoration:none;">تماس با ما</a></li>
  </ul>
</nav>`,
        teacherTalkingPoints: [
          'توضیح دهید اسکلت منو در HTML همیشه ul/li/a است و فقط با ۲ خط CSS افقی و زیبا می‌شود.',
        ],
        lineExplanations: [
          {line: 2, explanation: 'حذف نقطه‌های لیست با list-style:none و افقی کردن با display:flex.'},
        ],
        commonMistakes: ['چیدن ۵ تگ <a> پشت سر هم بدون تگ <nav> و <ul>.'],
        bookCorrection: {
          page: 104,
          issue: 'در ص ۱۰۴ تگ <a> بدون <li> داخل لیست <ol> قرار گرفته بود.',
          fix: 'تمام پیوندهای منو داخل <li> استاندارد قرار گرفتند.',
        },
      },
      {
        id: 'ex-2-1-lists-whatif',
        tier: 'what-if',
        title: 'آزمایشگاه What-If: تفاوت type و start در لیست مرتب ol',
        bookPage: '۱۰۳',
        summary: 'سفارشی‌سازی شماره شروع (start="5") و نوع شماره‌گذاری در لیست‌های مرتب HTML5.',
        language: 'html',
        engine: 'web',
        code: `<div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
  <div style="border:1px solid #cbd5e1;padding:10px;border-radius:8px;">
    <strong>شروع از شماره ۵ (start="5"):</strong>
    <ol start="5">
      <li>پودمان پنجم: جنگو</li>
      <li>ارزشیابی نهایی</li>
    </ol>
  </div>
  <div style="border:1px solid #cbd5e1;padding:10px;border-radius:8px;">
    <strong>شماره‌گذاری معکوس (reversed):</strong>
    <ol reversed>
      <li>مقام سوم</li>
      <li>مقام دوم</li>
      <li>مقام اول</li>
    </ol>
  </div>
</div>`,
        teacherTalkingPoints: [
          'صفت بولی reversed در HTML5 بدون نیاز به مقدار (=true) فهرست شمارش معکوس می‌سازد.',
        ],
        lineExplanations: [
          {line: 4, explanation: 'صفت start="5" شماره‌گذاری را از ۵ آغاز می‌کند.'},
        ],
        commonMistakes: ['نوشتن شماره دستی داخل <li> در یک <ol> که باعث دو شماره کنار هم می‌شود!'],
      },
    ],
  },

  // =========================================================================
  // CONCEPT 4: Images & Multimedia
  // =========================================================================
  {
    id: 'les-2-1-media',
    order: 4,
    title: 'تصاویر استاندارد (img، src، alt، width بدون px) و تگ‌های figure / figcaption',
    bookPage: '۹۴ و ۱۰۵',
    whyWeNeedIt: {
      realWorldProblem:
        'فروشگاه کتاب بدون جلد کتاب هیچ فروشی ندارد! اما اگر تصویر لود نشود یا فرد نابینایی با صفحه‌خوان وارد سایت شود، بدون صفت alt هیچ اطلاعاتی دریافت نمی‌کند. همچنین دادن عرض و ارتفاع درست از پرش ناگهانی صفحه (Layout Shift) جلوگیری می‌کند.',
      analogy:
        'تگ <img> مثل «قاب عکسی روی دیوار» است: src می‌گوید کدام عکس را از پوشه بیاور، و alt توضیحی است که اگر عکس نبود، روی قاب نوشته می‌شود تا کسی گمراه نشود!',
    },
    syntaxAnatomy: {
      template: `<figure>
  <img src="images/book1.jpg" alt="جلد کتاب طراح سایت یازدهم" width="220" height="150" />
  <figcaption>کتاب طراح سایت — پایه یازدهم</figcaption>
</figure>`,
      parts: [
        {token: 'src="..."', role: 'نشانی فایل تصویر (نسبی یا محلی)؛ تگ img خودبسته است و تگ پایانی ندارد.'},
        {token: 'alt="..."', role: 'متن جایگزین اجباری برای دسترس‌پذیری، سئو و مواقع عدم بارگذاری تصویر.'},
        {token: 'width="220"', role: 'عرض تصویر به عدد خالص پیکسل — بدون واحد px در HTML5 (اصلاح ص ۹۴ کتاب).'},
        {token: '<figure> / <figcaption>', role: 'پیوند دادن معنایی یک تصویر یا نمودار به زیرنویس توضیحی آن.'},
      ],
    },
    behindTheScenes: [
      'در ص ۹۴ کتاب درسی صفت width="200px" با واحد px نوشته شده است؛ در استاندارد HTML5 صفت‌های width و height فقط عدد صحیح می‌پذیرند (width="200") و نوشتن px فقط در CSS مجاز است!',
      'در این سامانه آفلاین، تصاویر کتاب درسی (book1.jpg، book2.jpg، book3.jpg) به‌صورت گرافیک برداری باکیفیت و محلی شبیه‌سازی شده‌اند تا بدون اینترنت هیچ تصویر شکسته‌ای نداشته باشید.',
      'علاوه بر تصاویر، HTML5 تگ‌های بومی <audio controls> و <video controls> را برای پخش صدا و فیلم بدون نیاز به افزونه خارجی فراهم کرده است.',
    ],
    goldenTips: [
      'برای تصاویر تزئینی صرف، صفت alt="" (خالی) بگذارید تا صفحه‌خوان نام فایل را نخواند؛ ولی برای عکس محصولات حتماً توضیح دقیق بنویسید.',
      'همیشه با style="max-width:100%;height:auto;" مطمئن شوید تصاویر در موبایل از صفحه بیرون نمی‌زنند.',
    ],
    wrongVsRight: [
      {
        title: 'نوشتن px در صفت width و حذف alt (اصلاح ص ۹۴ کتاب)',
        wrongCode: `<img src="book1.jpg" width="200px" />`,
        rightCode: `<img src="book1.jpg" alt="جلد کتاب طراح سایت" width="200" />`,
        explanation: 'صفت width در HTML5 بدون px است و صفت alt برای اعتبارسنجی و دسترس‌پذیری الزامی است.',
      },
      {
        title: 'گذاشتن تگ پایانی اشتباه برای img',
        wrongCode: `<img src="book1.jpg" alt="کتاب"></img>`,
        rightCode: `<img src="book1.jpg" alt="کتاب" />`,
        explanation: 'تگ img یک عنصر خالی (Void Element) است و هرگز تگ پایانی </img> ندارد.',
      },
    ],
    examples: [
      {
        id: 'ex-2-1-media-basic',
        tier: 'basic',
        title: 'درج تصویر جلد کتاب با figure، figcaption و ابعاد استاندارد (اصلاح ص ۹۴)',
        bookPage: '۹۴ و ۱۰۵',
        summary: 'نمایش استاندارد تصویر کتاب «مرجع نو» با alt دقیق، عرض عددی بدون px و زیرنویس معنایی.',
        language: 'html',
        engine: 'web',
        code: `<figure style="margin:0;text-align:center;border:1px solid #cbd5e1;padding:14px;border-radius:12px;max-width:280px;">
  <img src="images/book1.jpg" alt="جلد کتاب طراح سایت پایه یازدهم" width="220" height="150" style="border-radius:8px;" />
  <figcaption style="margin-top:8px;font-size:13px;color:#334155;">
    شکل ۱: جلد رسمی کتاب طراح سایت (پایه یازدهم — ۱۴۰۵)
  </figcaption>
</figure>`,
        teacherTalkingPoints: [
          'دقت کنید که در صفت width="220" هیچ px نوشته نشده است.',
        ],
        lineExplanations: [
          {line: 2, explanation: 'استفاده از alt توصیفی و width/height عددی مطابق HTML5.'},
        ],
        commonMistakes: ['نوشتن مسیر ویندوزی مانند C:\\Users\\Desktop\\pic.jpg که روی هیچ کامپیوتر دیگری کار نمی‌کند!'],
        bookCorrection: {
          page: 94,
          issue: 'در ص ۹۴ کتاب واحد px داخل صفت width در تگ img درج شده بود.',
          fix: 'مقدار عددی خالص بدون px در کنار alt و figure ارائه شد.',
        },
      },
      {
        id: 'ex-2-1-media-practical',
        tier: 'practical',
        title: 'گالری ۳ کتاب درسی همراه با پیوند کلیک‌پذیر روی تصویر',
        bookPage: '۱۰۵',
        summary: 'قرار دادن تصویر <img> درون تگ <a> برای ساخت کارت‌های تصویری کلیک‌پذیر در فروشگاه کتاب.',
        language: 'html',
        engine: 'web',
        code: `<div style="display:flex;gap:14px;flex-wrap:wrap;">
  <a href="#book1" style="text-decoration:none;color:inherit;text-align:center;border:1px solid #cbd5e1;padding:10px;border-radius:10px;">
    <img src="book1.jpg" alt="طراح سایت یازدهم" width="150" height="105" /><br />
    <strong>طراح سایت</strong>
  </a>
  <a href="#book2" style="text-decoration:none;color:inherit;text-align:center;border:1px solid #cbd5e1;padding:10px;border-radius:10px;">
    <img src="book2.jpg" alt="تولید محتوا دهم" width="150" height="105" /><br />
    <strong>تولید محتوا</strong>
  </a>
  <a href="#book3" style="text-decoration:none;color:inherit;text-align:center;border:1px solid #cbd5e1;padding:10px;border-radius:10px;">
    <img src="book3.jpg" alt="توسعه برنامه‌سازی" width="150" height="105" /><br />
    <strong>توسعه برنامه</strong>
  </a>
</div>`,
        teacherTalkingPoints: [
          'نشان دهید وقتی <img> داخل <a> قرار می‌گیرد، کل عکس به یک لینک تبدیل می‌شود.',
        ],
        lineExplanations: [
          {line: 2, explanation: 'ترکیب تگ پیوند و تصویر برای ناوبری بصری محصولات.'},
        ],
        commonMistakes: ['فراموش کردن بستن </a> پس از تگ تصویر.'],
      },
      {
        id: 'ex-2-1-media-combined',
        tier: 'combined',
        title: 'تست زنده رفتار صفت alt هنگام شکسته شدن مسیر تصویر',
        bookPage: '۱۰۵',
        summary: 'مقایسه مستقیم یک تصویر سالم کنار یک تصویر با مسیر اشتباه تا اهمیت متن جایگزین alt برای کلاس ملموس شود.',
        language: 'html',
        engine: 'web',
        code: `<div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
  <div style="border:1px solid #10b981;padding:10px;border-radius:8px;">
    <strong>تصویر با مسیر صحیح:</strong><br />
    <img src="book1.jpg" alt="جلد کتاب طراح سایت" width="160" height="110" />
  </div>
  <div style="border:1px solid #f59e0b;padding:10px;border-radius:8px;">
    <strong>مسیر اشتباه (نقش نجات‌بخش alt):</strong><br />
    <img src="not-found-file.png" alt="📚 جلد کتاب پایگاه داده دوازدهم (تصویر موقتاً در دسترس نیست)" width="160" />
  </div>
</div>`,
        teacherTalkingPoints: [
          'سمت چپ به وضوح نشان می‌دهد اگر فایل عکس پاک شود یا اینترنت کند باشد، متن alt به کاربر توضیح می‌دهد چه چیزی آنجا بوده است.',
        ],
        lineExplanations: [
          {line: 8, explanation: 'مرورگر هنگام نیافتن تصویر، متن alt را جایگزین نمایش می‌دهد.'},
        ],
        commonMistakes: ['گذاشتن alt تکراری و بی‌معنی مثل alt="image1" یا alt="pic".'],
      },
      {
        id: 'ex-2-1-media-whatif',
        tier: 'what-if',
        title: 'آزمایشگاه What-If: تگ‌های چندرسانه‌ای HTML5 (audio و progress/meter)',
        bookPage: '۱۰۵',
        summary: 'آشنایی با کنترلرهای استاندارد HTML5 مانند نوار پیشرفت <progress> و شاخص ظرفیت <meter> بدون نیاز به جاوااسکریپت.',
        language: 'html',
        engine: 'web',
        code: `<div style="padding:14px;border:1px solid #cbd5e1;border-radius:10px;display:grid;gap:10px;">
  <div>
    <label for="course">پیشرفت یادگیری HTML5 (۷۵٪):</label><br />
    <progress id="course" value="75" max="100" style="width:100%;height:18px;"></progress>
  </div>
  <div>
    <label for="stock">موجودی انبار کتاب (۱۸ از ۲۰ جلد):</label><br />
    <meter id="stock" value="18" min="0" max="20" low="5" high="15" optimum="18" style="width:100%;height:18px;"></meter>
  </div>
</div>`,
        teacherTalkingPoints: [
          'تگ‌های بومی <progress> و <meter> در HTML5 بدون یک خط جاوااسکریپت نوار پیشرفت و شاخص وضعیت می‌سازند.',
        ],
        lineExplanations: [
          {line: 4, explanation: 'نمایش درصد پیشرفت یک فرآیند.'},
          {line: 8, explanation: 'نمایش مقدار یک سنجش در بازه معین (مثل ظرفیت دیسک یا موجودی انبار).'},
        ],
        commonMistakes: ['فراموش کردن تعیین max در تگ progress.'],
      },
    ],
  },

  // =========================================================================
  // CONCEPT 5: Standard HTML5 Tables
  // =========================================================================
  {
    id: 'les-2-1-tables',
    order: 5,
    title: 'جداول استاندارد HTML5 (table، caption، thead، tbody، tfoot، colspan و rowspan)',
    bookPage: '۱۰۶ تا ۱۰۷',
    whyWeNeedIt: {
      realWorldProblem:
        'برای نمایش داده‌های جدولی واقعی مانند فهرست قیمت کتاب‌ها، برنامه هفتگی کلاس، کارنامه نمرات یا فاکتور خرید، هیچ ساختاری بهتر و خواناتر از <table> نیست. تفکیک سربرگ (thead)، بدنه (tbody) و پاورقی جمع کل (tfoot) به چاپگر و صفحه‌خوان کمک می‌کند جدول را هوشمند مدیریت کنند.',
      analogy:
        'جدول HTML مثل «صفحه اکسل» است: هر <tr> یک ردیف افقی است، هر <th> یک سلول عنوان ضخیم، هر <td> یک سلول داده، و colspan/rowspan دقیقاً همان دکمه Merge Cells (ادغام سلول‌ها) در اکسل هستند!',
    },
    syntaxAnatomy: {
      template: `<table>
  <caption>عنوان جدول</caption>
  <thead><tr><th>نام</th><th>قیمت</th></tr></thead>
  <tbody><tr><td>کتاب</td><td>۴۵٬۰۰۰</td></tr></tbody>
  <tfoot><tr><td colspan="2">جمع کل</td></tr></tfoot>
</table>`,
      parts: [
        {token: '<caption>', role: 'عنوان رسمی و معنایی جدول (اولین تگ داخل table).'},
        {token: '<thead> / <tbody> / <tfoot>', role: 'تفکیک منطقی ردیف سرستون‌ها، داده‌های اصلی و ردیف جمع‌بندی.'},
        {token: '<tr> / <th> / <td>', role: 'ردیف جدول (Table Row)، سلول سرستون (Header) و سلول داده عادی (Data).'},
        {token: 'colspan / rowspan', role: 'ادغام افقی چند ستون در یک سلول (colspan) یا ادغام عمودی چند ردیف (rowspan).'},
      ],
    },
    behindTheScenes: [
      'قانون طلایی ادغام سلول: وقتی به یک سلول colspan="2" می‌دهید، آن سلول جای دو ستون را می‌گیرد؛ پس در آن ردیف باید یک <td> کمتر بنویسید تا جدول کج و نامتقارن نشود!',
      'به همین شکل وقتی به سلولی rowspan="2" می‌دهید، در ردیف بعدی باید یک <td> کمتر قرار دهید چون فضای آن ستون توسط ردیف بالایی اشغال شده است.',
      'هرگز در وب مدرن از <table> برای چیدمان کل صفحه (Page Layout) استفاده نکنید؛ جدول فقط برای داده‌های جدولی است و چیدمان صفحه وظیفه Flexbox و CSS Grid (واحد ۲.۲) است.',
    ],
    goldenTips: [
      'همیشه روی <table> استایل border-collapse: collapse بگذارید تا خطوط دوتایی زشت پیش‌فرض مرورگر به خطوط تمیز و تک‌خطی تبدیل شوند.',
      'از تگ <th> برای سرستون‌ها استفاده کنید (نه <td> همراه با <b>) تا ساختار جدول استاندارد بماند.',
    ],
    wrongVsRight: [
      {
        title: 'تعداد ستون اشتباه پس از استفاده از colspan',
        wrongCode: `<tr>
  <td colspan="2">جمع کل</td>
  <td>۸۳٬۰۰۰</td>
  <td>اضافی!</td>
</tr>`,
        rightCode: `<tr>
  <td colspan="2">جمع کل</td>
  <td>۸۳٬۰۰۰ تومان</td>
</tr>`,
        explanation: 'در جدول ۳ ستونه، یک سلول با colspan="2" + یک سلول عادی = دقیقاً ۳ ستون کامل.',
      },
      {
        title: 'نبود thead و استفاده از td به جای th برای سرستون',
        wrongCode: `<tr><td><b>کتاب</b></td><td><b>قیمت</b></td></tr>`,
        rightCode: `<thead>
  <tr><th>کتاب</th><th>قیمت</th></tr>
</thead>`,
        explanation: 'تگ <th> به صورت بومی نقش سرستون معنایی دارد.',
      },
    ],
    examples: [
      {
        id: 'ex-2-1-tables-basic',
        tier: 'basic',
        title: 'جدول قیمت کتاب‌های مرجع نو با thead، tbody، tfoot و colspan',
        bookPage: '۱۰۶',
        summary: 'جدول کامل و استاندارد ۳ ستونه شامل caption، سرستون، بدنه و ردیف جمع کل با ادغام دو ستون.',
        language: 'html',
        engine: 'web',
        code: `<table style="width:100%;border-collapse:collapse;text-align:right;" border="1">
  <caption style="margin-bottom:8px;font-weight:bold;">فهرست قیمت کتاب‌های درسی ۱۴۰۵</caption>
  <thead style="background:#e0f2fe;">
    <tr>
      <th style="padding:8px;">ردیف</th>
      <th style="padding:8px;">عنوان کتاب</th>
      <th style="padding:8px;">قیمت (تومان)</th>
    </tr>
  </thead>
  <tbody>
    <tr><td style="padding:8px;">۱</td><td style="padding:8px;">طراح سایت (یازدهم)</td><td style="padding:8px;">۴۵٬۰۰۰</td></tr>
    <tr><td style="padding:8px;">۲</td><td style="padding:8px;">تولید محتوای الکترونیکی</td><td style="padding:8px;">۳۸٬۰۰۰</td></tr>
  </tbody>
  <tfoot style="background:#f1f5f9;font-weight:bold;">
    <tr>
      <td colspan="2" style="padding:8px;">جمع کل سفارش</td>
      <td style="padding:8px;color:#059669;">۸۳٬۰۰۰ تومان</td>
    </tr>
  </tfoot>
</table>`,
        teacherTalkingPoints: [
          'بشمارید: هر ردیف ۳ ستون دارد؛ در tfoot سلول اول colspan="2" و سلول دوم ۱ ستون است (2 + 1 = 3).',
        ],
        classroomQuestion: 'اگر ستون «تعداد» را هم به جدول اضافه کنیم (۴ ستونه شود)، در ردیف جمع کل عدد colspan را چند باید بگذاریم؟',
        lineExplanations: [
          {line: 16, explanation: 'ادغام افقی دو ستون اول برای عنوان «جمع کل سفارش».'},
        ],
        commonMistakes: ['فراموش کردن کاهش تعداد tdها بعد از گذاشتن colspan.'],
      },
      {
        id: 'ex-2-1-tables-practical',
        tier: 'practical',
        title: 'برنامه هفتگی کارگاه هنرستان با ادغام عمودی (rowspan)',
        bookPage: '۱۰۶ تا ۱۰۷',
        summary: 'کاربرد عملی rowspan="2" برای نمایش دو زنگ پیاپی کارگاه طراح سایت در یک روز.',
        language: 'html',
        engine: 'web',
        code: `<table style="width:100%;border-collapse:collapse;text-align:center;" border="1">
  <caption style="margin-bottom:8px;font-weight:bold;">برنامه کارگاه رشته شبکه و نرم‌افزار</caption>
  <thead style="background:#0f172a;color:#fff;">
    <tr><th style="padding:8px;">روز</th><th style="padding:8px;">زنگ</th><th style="padding:8px;">درس</th></tr>
  </thead>
  <tbody>
    <tr>
      <td rowspan="2" style="padding:8px;background:#f0f9ff;font-weight:bold;">شنبه</td>
      <td style="padding:8px;">زنگ ۱</td>
      <td rowspan="2" style="padding:8px;background:#ecfdf5;font-weight:bold;">کارگاه طراح سایت (دوزنگه)</td>
    </tr>
    <tr>
      <td style="padding:8px;">زنگ ۲</td>
    </tr>
    <tr>
      <td style="padding:8px;font-weight:bold;">یکشنبه</td>
      <td style="padding:8px;">زنگ ۱</td>
      <td style="padding:8px;">تولید محتوا</td>
    </tr>
  </tbody>
</table>`,
        teacherTalkingPoints: [
          'به ردیف دوم (خط ۱۲ تا ۱۴) اشاره کنید: فقط یک <td> دارد چون ستون اول و سوم توسط rowspan="2" ردیف بالا پر شده‌اند!',
        ],
        lineExplanations: [
          {line: 8, explanation: 'ادغام عمودی نام روز شنبه در دو ردیف متوالی.'},
        ],
        commonMistakes: ['گذاشتن ۳ سلول در ردیف دوم که باعث بیرون زدن سلول اضافی از سمت چپ جدول می‌شود!'],
      },
      {
        id: 'ex-2-1-tables-combined',
        tier: 'combined',
        title: 'جدول مقایسه ویژگی‌های پودمان‌ها با ترکیب colspan و rowspan',
        bookPage: '۱۰۷',
        summary: 'ساخت جدول حرفه‌ای با سرستون دوطبقه برای مقایسه زمان و زبان برنامه‌نویسی پودمان‌های کتاب.',
        language: 'html',
        engine: 'web',
        code: `<table style="width:100%;border-collapse:collapse;text-align:center;" border="1">
  <thead style="background:#f8fafc;">
    <tr>
      <th rowspan="2" style="padding:8px;">پودمان</th>
      <th colspan="2" style="padding:8px;">فناوری‌های اصلی</th>
    </tr>
    <tr>
      <th style="padding:6px;">سمت کاربر</th>
      <th style="padding:6px;">سمت سرور / منطق</th>
    </tr>
  </thead>
  <tbody>
    <tr><td style="padding:8px;">پودمان ۱ و ۴</td><td style="padding:8px;">—</td><td style="padding:8px;">Python &amp; OOP</td></tr>
    <tr><td style="padding:8px;">پودمان ۲ و ۳</td><td style="padding:8px;">HTML, CSS, Bootstrap, JS</td><td style="padding:8px;">—</td></tr>
    <tr><td style="padding:8px;">پودمان ۵</td><td style="padding:8px;">Django Templates</td><td style="padding:8px;">Django &amp; SQLite</td></tr>
  </tbody>
</table>`,
        teacherTalkingPoints: [
          'سرستون دوطبقه یکی از زیباترین کاربردهای هم‌زمان rowspan و colspan است.',
        ],
        lineExplanations: [
          {line: 4, explanation: 'ستون پودمان ارتفاع ۲ ردیف می‌گیرد و فناوری‌های اصلی عرض ۲ ستون.'},
        ],
        commonMistakes: ['نوشتن & خالی به جای &amp; در متن HTML.'],
      },
      {
        id: 'ex-2-1-tables-whatif',
        tier: 'what-if',
        title: 'آزمایشگاه What-If: تفاوت border-collapse: separate در برابر collapse',
        bookPage: '۱۰۶',
        summary: 'مقایسه بصری خطوط دوتایی پیش‌فرض مرورگر در برابر جدول یکپارچه با border-collapse: collapse.',
        language: 'html',
        engine: 'web',
        code: `<div style="display:grid;grid-template-columns:1fr 1fr;gap:14px;">
  <div>
    <strong>حالت پیش‌فرض (separate):</strong>
    <table border="1" style="width:100%;border-collapse:separate;margin-top:6px;">
      <tr><td style="padding:6px;">سلول ۱</td><td style="padding:6px;">سلول ۲</td></tr>
      <tr><td style="padding:6px;">سلول ۳</td><td style="padding:6px;">سلول ۴</td></tr>
    </table>
  </div>
  <div>
    <strong>حالت استاندارد (collapse):</strong>
    <table border="1" style="width:100%;border-collapse:collapse;margin-top:6px;">
      <tr><td style="padding:6px;">سلول ۱</td><td style="padding:6px;">سلول ۲</td></tr>
      <tr><td style="padding:6px;">سلول ۳</td><td style="padding:6px;">سلول ۴</td></tr>
    </table>
  </div>
</div>`,
        teacherTalkingPoints: [
          'تفاوت ظاهری تمیز بودن جدول سمت چپ در یک نگاه مشخص است.',
        ],
        lineExplanations: [
          {line: 11, explanation: 'ادغام حاشیه سلول‌های مجاور به یک خط ظریف.'},
        ],
        commonMistakes: ['فراموش کردن padding روی سلول‌ها که باعث چسبیدن متن به خط جدول می‌شود.'],
      },
    ],
  },

  // =========================================================================
  // CONCEPT 6: Forms & HTML5 Semantic Layout
  // =========================================================================
  {
    id: 'les-2-1-forms-semantic',
    order: 6,
    title: 'فرم‌های استاندارد (name، label/for، enctype) و تگ‌های معنایی (header، nav، main، article)',
    bookPage: '۱۰۸ تا ۱۱۱',
    whyWeNeedIt: {
      realWorldProblem:
        'فرم‌ها تنها پل ارتباطی ارسال داده از کاربر به سرور هستند (ثبت‌نام، ورود، سفارش کتاب، مرجوعی). از طرف دیگر، تگ‌های معنایی HTML5 به جای ده‌ها <div> گنگ، نقشه واقعی صفحه را برای گوگل و کاربران شفاف می‌کنند.',
      analogy:
        'صفت name در هر فیلد فرم مثل «برچسب روی پاکت نامه» است: اگر کاربر اسمش را داخل input تایپ کند ولی فیلد صفت name نداشته باشد، سرور پاکت خالی تحویل می‌گیرد و نمی‌فهمد این داده مربوط به کدام فیلد است!',
    },
    syntaxAnatomy: {
      template: `<form action="/order" method="post" enctype="multipart/form-data">
  <label for="fullname">نام کامل:</label>
  <input id="fullname" name="fullname" type="text" required />
  <button type="submit">ارسال سفارش</button>
</form>`,
      parts: [
        {token: 'action / method', role: 'نشانی سرور مقصد و روش ارسال (GET در آدرس صفحه برای جستجو، POST در بدنه برای رمز و ثبت سفارش).'},
        {token: 'label[for] + input[id]', role: 'متصل کردن برچسب به فیلد: با کلیک روی متن برچسب، مکان‌نما مستقیم داخل فیلد می‌رود.'},
        {token: 'name="fullname"', role: 'کلید ارسال داده به سرور (جا افتاده در ص ۱۰۹ کتاب؛ بدون name هیچ داده‌ای ارسال نمی‌شود!).'},
        {token: 'header / nav / main / article / footer', role: 'تگ‌های ساختاری معنایی HTML5 (اصلاح تکرار شکل section به جای article در ص ۱۱۱ کتاب).'},
      ],
    },
    behindTheScenes: [
      'در فرم سفارش ص ۱۰۹ کتاب صفت name برای هیچ‌کدام از فیلدها نوشته نشده بود؛ این یک شکاف مهم است چون در پودمان ۵ (جنگو) سرور داده‌ها را دقیقاً از روی request.POST["name"] می‌خواند!',
      'در فرم مرجوعی ص ۱۱۰ کتاب که شامل <input type="file"> است، بدون اضافه کردن enctype="multipart/form-data" به تگ <form> مرورگر فقط اسم فایل را می‌فرستد نه خود تصویر را!',
      'در ص ۱۱۱ کتاب (شکل ۱۹) به جای مثال واقعی تگ <article>، اشتباهاً تصویر بخش <section> تکرار شده بود؛ تگ <article> برای محتوای مستقل و قابل انتشار مجدد (مثل کارت یک کتاب، یک پست وبلاگ یا یک خبر) است.',
    ],
    goldenTips: [
      'برای فیلدهای انتخابی گروهی (radio) به همه گزینه‌های یک گروه صفت name یکسان بدهید تا فقط یکی از آن‌ها انتخاب شود.',
      'از تگ <fieldset> و <legend> برای گروه‌بندی منطقی فیلدهای فرم‌های بلند استفاده کنید.',
    ],
    wrongVsRight: [
      {
        title: 'فرم بدون صفت name و بدون اتصال label به id (اصلاح ص ۱۰۹)',
        wrongCode: `<label>نام:</label>
<input type="text" />`,
        rightCode: `<label for="fullname">نام:</label>
<input id="fullname" name="fullname" type="text" required />`,
        explanation: 'اتصال for/id دسترس‌پذیری را تضمین می‌کند و صفت name برای ارسال داده به سرور حیاتی است.',
      },
      {
        title: 'آپلود فایل بدون enctype (تکمیل ص ۱۱۰)',
        wrongCode: `<form method="post">
  <input type="file" name="photo" />
</form>`,
        rightCode: `<form method="post" enctype="multipart/form-data">
  <input type="file" name="photo" accept="image/*" />
</form>`,
        explanation: 'بدون multipart/form-data فایل باینری تصویر هرگز به سرور منتقل نمی‌شود.',
      },
    ],
    examples: [
      {
        id: 'ex-2-1-forms-basic',
        tier: 'basic',
        title: 'صفحه معنایی و فرم سفارش «مرجع نو» (اصلاح ص ۱۰۹ و ۱۱۱)',
        bookPage: '۱۰۹ تا ۱۱۱',
        summary: 'ترکیب کامل header، nav، main، article واقعی و فرم سفارش کتاب با name، for/id و required.',
        language: 'html',
        engine: 'web',
        code: `<header style="background:#0369a1;color:white;padding:14px;border-radius:10px;">
  <h1 style="margin:0 0 6px;font-size:20px;">فروشگاه کتاب‌های درسی «مرجع نو»</h1>
  <nav>
    <a href="#books" style="color:#e0f2fe;margin-left:12px;">کتاب‌ها</a>
    <a href="#order" style="color:#e0f2fe;">ثبت سفارش</a>
  </nav>
</header>

<main style="margin-top:14px;">
  <article id="books" style="border:1px solid #cbd5e1;padding:12px;border-radius:10px;">
    <h2 style="margin-top:0;">کتاب طراح سایت — پایه یازدهم</h2>
    <img src="images/book1.jpg" alt="جلد کتاب طراح سایت پایه یازدهم" width="200" height="135" />
    <p>آموزش گام‌به‌گام پایتون، طراحی وب و فریم‌ورک جنگو ویژه هنرستان‌ها.</p>
  </article>

  <section id="order" style="margin-top:14px;border:1px solid #cbd5e1;padding:14px;border-radius:10px;">
    <h3 style="margin-top:0;">فرم سفارش آنلاین کتاب</h3>
    <form action="#" method="post">
      <label for="fullname">نام و نام خانوادگی:</label><br />
      <input id="fullname" name="fullname" type="text" required placeholder="مثلاً علی رضایی" style="padding:6px;width:100%;max-width:300px;" /><br /><br />
      <label for="book_select">انتخاب کتاب:</label><br />
      <select id="book_select" name="book_id" style="padding:6px;">
        <option value="web11">طراح سایت یازدهم</option>
        <option value="db12">پایگاه داده دوازدهم</option>
      </select><br /><br />
      <button type="submit" style="background:#0284c7;color:#fff;border:none;padding:8px 16px;border-radius:8px;">ثبت سفارش</button>
    </form>
  </section>
</main>`,
        teacherTalkingPoints: [
          'روی متن «نام و نام خانوادگی:» کلیک کنید تا نشان دهید مکان‌نما به لطف اتصال for/id خودکار داخل کادر می‌رود.',
        ],
        classroomQuestion: 'چرا در فرم سفارش بالا از method="post" استفاده کردیم نه method="get"؟',
        lineExplanations: [
          {line: 10, explanation: 'تگ معنایی <article> برای نمایش مستقل محصول کتاب (اصلاح شکل ۱۹ ص ۱۱۱).'},
          {line: 20, explanation: 'افزودن صفت name="fullname" (اصلاح فرم ص ۱۰۹).'},
        ],
        commonMistakes: ['جا انداختن صفت name در inputها.'],
        bookCorrection: {
          page: 111,
          issue: 'شکل ۱۹ ص ۱۱۱ به‌جای <article> تصویر <section> را تکرار کرده بود و فرم ص ۱۰۹ صفت name نداشت.',
          fix: 'مثال کامل با <article> واقعی و فرم دارای name و for/id ارائه شد.',
        },
      },
      {
        id: 'ex-2-1-forms-practical',
        tier: 'practical',
        title: 'فرم مرجوعی کتاب با آپلود عکس (enctype) و fieldset (تکمیل ص ۱۱۰)',
        bookPage: '۱۱۰',
        summary: 'فرم استاندارد مرجوعی شامل input type="file"، دکمه‌های رادیویی، textarea و enctype="multipart/form-data".',
        language: 'html',
        engine: 'web',
        code: `<form action="#" method="post" enctype="multipart/form-data" style="max-width:460px;">
  <fieldset style="border:1px solid #cbd5e1;border-radius:10px;padding:14px;">
    <legend style="font-weight:bold;padding:0 6px;">فرم درخواست مرجوعی کتاب</legend>
    <p>
      <label for="order_code">شماره سفارش:</label><br />
      <input id="order_code" name="order_code" type="number" min="1000" required />
    </p>
    <p>
      علت مرجوعی:<br />
      <label><input type="radio" name="reason" value="damaged" checked /> آسیب فیزیکی</label>
      <label style="margin-right:12px;"><input type="radio" name="reason" value="wrong" /> ارسال اشتباه</label>
    </p>
    <p>
      <label for="receipt">تصویر کتاب/رسید:</label><br />
      <input id="receipt" name="receipt_photo" type="file" accept="image/*" />
    </p>
    <p>
      <label for="desc">توضیحات تکمیلی:</label><br />
      <textarea id="desc" name="description" rows="3" style="width:100%;"></textarea>
    </p>
    <button type="submit" style="background:#059669;color:#fff;border:none;padding:8px 16px;border-radius:8px;">ارسال درخواست</button>
  </fieldset>
</form>`,
        teacherTalkingPoints: [
          'دقت کنید هر دو دکمه رادیویی name="reason" یکسان دارند؛ اگر اسمشان متفاوت بود هر دو هم‌زمان تیک می‌خوردند!',
        ],
        lineExplanations: [
          {line: 1, explanation: 'صفت enctype="multipart/form-data" برای ارسال واقعی فایل الزامی است.'},
        ],
        commonMistakes: ['دادن name متفاوت به دکمه‌های radio یک گروه.'],
      },
      {
        id: 'ex-2-1-forms-combined',
        tier: 'combined',
        title: 'اسکلت کامل یک صفحه خبری/فروشگاهی با ۷ تگ معنایی HTML5',
        bookPage: '۱۱۱ تا ۱۱۲',
        summary: 'چیدمان کامل شامل header، nav، main، section، article، aside و footer با رنگ‌بندی تفکیکی برای نمایش در کلاس.',
        language: 'html',
        engine: 'web',
        code: `<div style="display:grid;gap:8px;font-size:13px;">
  <header style="background:#0284c7;color:#fff;padding:10px;border-radius:8px;"><strong>&lt;header&gt;</strong> سرصفحه و لوگوی سایت</header>
  <nav style="background:#e0f2fe;padding:8px;border-radius:8px;"><strong>&lt;nav&gt;</strong> منوی اصلی پیوندها</nav>
  <div style="display:grid;grid-template-columns:2fr 1fr;gap:8px;">
    <main style="background:#f8fafc;border:1px solid #cbd5e1;padding:10px;border-radius:8px;">
      <strong>&lt;main&gt;</strong> محتوای اصلی صفحه
      <article style="background:#fff;border:1px dashed #0284c7;padding:8px;margin-top:6px;border-radius:6px;">
        <strong>&lt;article&gt;</strong> معرفی مستقل کتاب طراح سایت
      </article>
      <section style="background:#fff;border:1px dashed #10b981;padding:8px;margin-top:6px;border-radius:6px;">
        <strong>&lt;section&gt;</strong> بخش نظرات کاربران
      </section>
    </main>
    <aside style="background:#fef3c7;border:1px solid #f59e0b;padding:10px;border-radius:8px;">
      <strong>&lt;aside&gt;</strong> ستون کناری (پرفروش‌ها و تبلیغات)
    </aside>
  </div>
  <footer style="background:#0f172a;color:#e2e8f0;padding:10px;border-radius:8px;"><strong>&lt;footer&gt;</strong> پاورقی و حق نشر ۱۴۰۵</footer>
</div>`,
        teacherTalkingPoints: [
          'از این نمودار زنده روی پروژکتور استفاده کنید تا جایگاه دقیق هر ۷ تگ معنایی در ذهن کلاس حک شود.',
        ],
        lineExplanations: [
          {line: 5, explanation: 'تگ <main> فقط یک‌بار در هر صفحه می‌آید و محتوای محوری صفحه را در بر می‌گیرد.'},
        ],
        commonMistakes: ['قرار دادن چند <main> یا گذاشتن <header> سایت داخل <main>.'],
      },
      {
        id: 'ex-2-1-forms-whatif',
        tier: 'what-if',
        title: 'آزمایشگاه What-If: اعتبارسنجی بومی HTML5 (required, email, min, max, pattern)',
        bookPage: '۱۰۹',
        summary: 'تست زنده انواع input مدرن HTML5 که پیش از نوشتن یک خط جاوااسکریپت خطای کاربر را می‌گیرند.',
        language: 'html',
        engine: 'web',
        code: `<form action="#" style="display:grid;gap:10px;max-width:360px;border:1px solid #cbd5e1;padding:14px;border-radius:10px;">
  <label>ایمیل معتبر (type="email"):
    <input type="email" name="email" required placeholder="student@school.ir" style="width:100%;padding:6px;" />
  </label>
  <label>سن هنرجو (۱۵ تا ۲۰ سال):
    <input type="number" name="age" min="15" max="20" value="17" required style="width:100%;padding:6px;" />
  </label>
  <label>تاریخ تولد (type="date"):
    <input type="date" name="birth" style="width:100%;padding:6px;" />
  </label>
  <button type="submit" style="background:#7c3aed;color:#fff;border:none;padding:8px;border-radius:8px;">آزمایش اعتبارسنجی</button>
</form>`,
        teacherTalkingPoints: [
          'یک متن بدون @ در کادر ایمیل بزنید و دکمه ارسال را کلیک کنید تا پیام خطای بومی مرورگر را ببینند.',
        ],
        lineExplanations: [
          {line: 3, explanation: 'نوع email وجود علامت @ و ساختار دامنه را خودکار بررسی می‌کند.'},
        ],
        commonMistakes: ['اکتفا کردن صرف به اعتبارسنجی سمت کلاینت بدون بررسی مجدد در سرور (پودمان ۵).'],
      },
    ],
  },
];
