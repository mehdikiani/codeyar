import type {ConceptLesson} from '../../../types/curriculum.ts';

export const UNIT_2_2_LESSONS: ConceptLesson[] = [
  // =========================================================================
  // CONCEPT 1: CSS Integration, Selectors & Specificity
  // =========================================================================
  {
    id: 'les-2-2-selectors',
    order: 1,
    title: 'روش‌های اتصال CSS، انتخابگرها (تگ، کلاس، ID، شبه‌کلاس :hover) و اولویت (Specificity)',
    bookPage: '۱۱۷ تا ۱۲۳',
    whyWeNeedIt: {
      realWorldProblem:
        'HTML فقط اسکلت و محتوا را تعریف می‌کند؛ بدون CSS تمام سایت‌ها متن سیاه روی پس‌زمینه سفید هستند! با انتخابگرهای CSS می‌توانیم با یک قانون واحد، ظاهر ده‌ها کارت محصول یا دکمه را هم‌زمان رنگ‌آمیزی و هماهنگ کنیم.',
      analogy:
        'انتخابگر CSS مثل «بلندگوی مدیر مدرسه در حیاط» است: اگر بگوید «همه دانش‌آموزان (تگ p)» کل حیاط گوش می‌دهند؛ اگر بگوید «کلاس یازدهمی‌ها (.grade11)» گروه خاصی را هدف می‌گیرد؛ و اگر بگوید «شماره دانش‌آموزی ۱۰۴۵ (#st1045)» دقیقاً یک نفر را صدا می‌زند!',
    },
    syntaxAnatomy: {
      template: `/* انتخابگر کلاس + شبه‌کلاس */
.card-btn { background: #0284c7; color: #fff; }
.card-btn:hover { background: #0369a1; }
#hero-title { font-size: 26px; }`,
      parts: [
        {token: 'p / h1 (انتخابگر تگ)', role: 'تمام تگ‌های همنام در صفحه را انتخاب می‌کند (کمترین اولویت).'},
        {token: '.className', role: 'با نقطه (.) شروع می‌شود و قابل استفاده روی ده‌ها عنصر مختلف است (بهترین انتخاب در پروژه‌ها).'},
        {token: '#uniqueId', role: 'با هشتگ (#) شروع می‌شود و فقط برای یک عنصر یکتا در صفحه است (اولویت بالا).'},
        {token: ':hover / :focus', role: 'شبه‌کلاس‌ها (Pseudo-classes) که هنگام رفتن موس یا انتخاب فیلد فعال می‌شوند.'},
      ],
    },
    behindTheScenes: [
      'سه روش اتصال CSS وجود دارد: Inline (داخل صفت style)، Internal (درون تگ <style>) و External (فایل style.css متصل با <link rel="stylesheet">). در پروژه‌های واقعی همیشه روش External استاندارد است تا همه صفحات سایت یک ظاهر واحد داشته باشند.',
      'قانون طلایی اولویت (Specificity) از بیشترین به کمترین: Inline Style (۱۰۰۰) ← انتخابگر #id (۱۰۰) ← انتخابگر .class و :hover (۱۰) ← نام تگ (۱). اگر دو قانون اولویت برابر داشتند، قانونی که پایین‌تر نوشته شده برنده است!',
      'کلاس‌های CSS به حروف بزرگ و کوچک حساس هستند؛ .BookCard با .bookcard متفاوت است.',
    ],
    goldenTips: [
      'برای استایل‌دهی همیشه از کلاس (.class) استفاده کنید و #id را برای لنگرها و جاوااسکریپت نگه دارید.',
      'از نوشتن !important پرهیز کنید؛ اگر قانونی اعمال نمی‌شود، اولویت انتخابگر (Specificity) را بررسی کنید.',
    ],
    wrongVsRight: [
      {
        title: 'فراموش کردن نقطه (.) پیش از نام کلاس در CSS',
        wrongCode: `btn { background: blue; }`,
        rightCode: `.btn { background: #0284c7; }`,
        explanation: 'بدون نقطه، مرورگر به دنبال تگی به نام <btn> می‌گردد که وجود ندارد!',
      },
      {
        title: 'دونقطه اضافه یا نبود سمی‌کالن (;) بین ویژگی‌ها',
        wrongCode: `.title { color:: red font-size: 20px }`,
        rightCode: `.title { color: #dc2626; font-size: 20px; }`,
        explanation: 'هر اعلان CSS دقیقاً یک دونقطه بین نام ویژگی و مقدار و یک سمی‌کالن در پایان می‌خواهد.',
      },
    ],
    examples: [
      {
        id: 'ex-2-2-selectors-basic',
        tier: 'basic',
        title: 'مقایسه زنده انتخابگر تگ، کلاس (.class)، شناسه (#id) و :hover',
        bookPage: '۱۱۹ تا ۱۲۳',
        summary: 'مشاهده کاربرد چهار انتخابگر اصلی CSS روی عناصر فروشگاه کتاب مرجع نو.',
        language: 'html',
        engine: 'web',
        code: `<h2 id="shop-title">فروشگاه کتاب مرجع نو</h2>
<p>این پاراگراف فقط با انتخابگر تگ p استایل گرفته است.</p>
<p class="highlight">این پاراگراف کلاس highlight دارد و اولویتش بیشتر از تگ p است!</p>
<button class="cta-btn">موس را روی من ببرید (:hover)</button>`,
        cssCode: `#shop-title { color: #0369a1; border-bottom: 2px solid #bae6fd; padding-bottom: 6px; }
p { color: #334155; font-size: 14px; }
.highlight { background: #fef3c7; color: #92400e; padding: 8px 12px; border-radius: 8px; font-weight: bold; }
.cta-btn { background: #0284c7; color: #fff; border: none; padding: 10px 18px; border-radius: 8px; cursor: pointer; transition: 0.2s; }
.cta-btn:hover { background: #0f172a; transform: translateY(-2px); }`,
        teacherTalkingPoints: [
          'موس را روی دکمه ببرید تا تغییر رنگ و حرکت نرم :hover را ببینند.',
        ],
        classroomQuestion: 'چرا رنگ متن پاراگراف دوم قهوه‌ای شد با اینکه قانون p رنگ خاکستری داده بود؟',
        lineExplanations: [
          {line: 3, explanation: 'انتخابگر .highlight اولویت بالاتری نسبت به انتخابگر تگ p دارد.'},
        ],
        commonMistakes: ['گذاشتن فاصله بین نام کلاس و :hover (اشتباه: .cta-btn :hover).'],
      },
      {
        id: 'ex-2-2-selectors-practical',
        tier: 'practical',
        title: 'انتخابگرهای ترکیبی (فرزند، گروهی و حالت :focus در فرم)',
        bookPage: '۱۲۲ تا ۱۲۳',
        summary: 'استفاده از انتخابگر نسلی (.form-box input) و شبه‌کلاس :focus برای برجسته کردن فیلد فعال فرم.',
        language: 'html',
        engine: 'web',
        code: `<div class="form-box">
  <h3>ورود سریع هنرجو</h3>
  <input type="text" placeholder="نام کاربری را تایپ کنید..." />
  <input type="password" placeholder="رمز عبور..." />
</div>`,
        cssCode: `.form-box { border: 1px solid #cbd5e1; border-radius: 12px; padding: 14px; max-width: 340px; background: #f8fafc; }
.form-box h3 { margin-top: 0; color: #0f172a; }
.form-box input { display: block; width: 100%; box-sizing: border-box; margin-bottom: 10px; padding: 8px; border: 2px solid #cbd5e1; border-radius: 8px; outline: none; }
.form-box input:focus { border-color: #0284c7; background: #f0f9ff; }`,
        teacherTalkingPoints: [
          'داخل کادر ورودی کلیک کنید تا اثر :focus روی رنگ کادر و پس‌زمینه دیده شود.',
        ],
        lineExplanations: [
          {line: 4, explanation: 'شبه‌کلاس :focus هنگام فعال شدن فیلد برای تایپ، بازخورد بصری واضحی می‌دهد.'},
        ],
        commonMistakes: ['حذف outline بدون جایگزین کردن رنگ border در :focus که دسترس‌پذیری کیبورد را خراب می‌کند.'],
      },
      {
        id: 'ex-2-2-selectors-combined',
        tier: 'combined',
        title: 'جدول راه‌راه (Zebra Striping) با شبه‌کلاس :nth-child(even)',
        bookPage: '۱۲۳',
        summary: 'رنگ‌آمیزی خودکار ردیف‌های زوج جدول و برجسته‌سازی ردیف زیر موس بدون افزودن هیچ کلاس تکراری در HTML.',
        language: 'html',
        engine: 'web',
        code: `<table class="books-tbl">
  <thead><tr><th>کد</th><th>کتاب</th><th>قیمت</th></tr></thead>
  <tbody>
    <tr><td>۱۰۱</td><td>طراح سایت یازدهم</td><td>۴۵٬۰۰۰</td></tr>
    <tr><td>۱۰۲</td><td>تولید محتوا دهم</td><td>۳۸٬۰۰۰</td></tr>
    <tr><td>۱۰۳</td><td>پایگاه داده دوازدهم</td><td>۵۲٬۰۰۰</td></tr>
    <tr><td>۱۰۴</td><td>کارگاه شبکه</td><td>۴۱٬۰۰۰</td></tr>
  </tbody>
</table>`,
        cssCode: `.books-tbl { width: 100%; border-collapse: collapse; text-align: right; }
.books-tbl th { background: #0f172a; color: #fff; padding: 8px; }
.books-tbl td { padding: 8px; border-bottom: 1px solid #e2e8f0; }
.books-tbl tbody tr:nth-child(even) { background: #f1f5f9; }
.books-tbl tbody tr:hover { background: #e0f2fe; }`,
        teacherTalkingPoints: [
          'بگویید اگر ۱۰۰ ردیف هم به جدول اضافه شود، :nth-child(even) خودکار ردیف‌های زوج را رنگ‌آمیزی می‌کند.',
        ],
        lineExplanations: [
          {line: 4, explanation: 'انتخاب خودکار ردیف‌های زوج جدول برای خوانایی بهتر.'},
        ],
        commonMistakes: ['فراموش کردن tbody که باعث اعمال اثر روی ردیف سرستون هم می‌شود.'],
      },
      {
        id: 'ex-2-2-selectors-whatif',
        tier: 'what-if',
        title: 'آزمایشگاه What-If: جنگ اولویت‌ها (ID در برابر Class و Tag)',
        bookPage: '۱۲۱',
        summary: 'اثبات عملی اینکه چرا با وجود قرار گرفتن قانون p در پایین فایل، باز هم قانون #special یا .cls برنده می‌شود.',
        language: 'html',
        engine: 'web',
        code: `<p id="special" class="blue-text">رنگ نهایی من چه خواهد بود؟ (ID همیشه پیروز است!)</p>
<p class="blue-text">من فقط کلاس دارم (کلاس بر تگ پیروز است!)</p>
<p>من هیچ کلاس و شناسه‌ای ندارم (قانون تگ p اعمال می‌شود).</p>`,
        cssCode: `#special { color: #7c3aed; font-weight: bold; }
.blue-text { color: #0284c7; font-weight: bold; }
p { color: #dc2626; } /* حتی با وجود قرار گرفتن در پایین، زورش به #id و .class نمی‌رسد! */`,
        teacherTalkingPoints: [
          'روی تب CSS خط سوم را نشان دهید: با اینکه p پایین‌تر است ولی اولویت ۱ دارد در برابر ۱۰ برای کلاس و ۱۰۰ برای ID.',
        ],
        lineExplanations: [
          {line: 1, explanation: 'اولویت #special برابر 100 است و بر .blue-text (10) و p (1) غلبه می‌کند.'},
        ],
        commonMistakes: ['تصور اینکه همیشه خط آخر فایل CSS برنده می‌شود بدون توجه به Specificity.'],
      },
    ],
  },

  // =========================================================================
  // CONCEPT 2: Colors, Persian Typography & Backgrounds
  // =========================================================================
  {
    id: 'les-2-2-typography',
    order: 2,
    title: 'رنگ‌ها (Hex، RGB، RGBA)، تایپوگرافی فارسی (font-size، line-height) و پس‌زمینه‌ها',
    bookPage: '۱۲۴ تا ۱۲۸',
    whyWeNeedIt: {
      realWorldProblem:
        'خوانایی یک سایت فارسی بیش از هر چیز به کنتراست رنگ، اندازه فونت و فاصله بین خطوط (line-height) وابسته است. متن فارسی به دلیل وجود دندانه‌ها و نقطه‌ها نسبت به انگلیسی به فاصله خطوط بیشتری (۱.۷ تا ۱.۹) نیاز دارد تا چشم خواننده خسته نشود.',
      analogy:
        'تایپوگرافی مثل «لحن صدا در سخنرانی» است: تیتر با اندازه و وزن بالا توجه را می‌گیرد، بدنه متن با line-height مناسب آرام و روان خوانده می‌شود و رنگ پس‌زمینه فضای گفتگو را مشخص می‌کند.',
    },
    syntaxAnatomy: {
      template: `.hero {
  background: linear-gradient(135deg, #0369a1, #0f172a);
  color: #ffffff;
  font-size: 16px;
  line-height: 1.8;
}`,
      parts: [
        {token: '#0369a1 / rgb() / rgba()', role: 'مدل‌های تعریف رنگ؛ در rgba(0, 0, 0, 0.5) عدد چهارم میزان شفافیت (Alpha بین 0 تا 1) است.'},
        {token: 'font-size / font-weight', role: 'اندازه قلم (px یا rem) و ضخامت حروف (400 عادی، 700 ضخیم).'},
        {token: 'line-height: 1.8', role: 'فاصله بین خطوط پاراگراف؛ برای متون فارسی مقدار بدون واحد 1.7 تا 1.9 ایده‌آل است.'},
        {token: 'background / linear-gradient', role: 'رنگ ثابت، طیف رنگی (گرادیان) یا تصویر پس‌زمینه عنصر.'},
      ],
    },
    behindTheScenes: [
      'کدهای رنگی Hex شش‌رقمی (#RRGGBB) ترکیبی از شدت نور قرمز، سبز و آبی در مبنای ۱۶ هستند (#000000 سیاه، #FFFFFF سفید، #FF0000 قرمز خالص).',
      'واحد rem نسبت به اندازه فونت ریشه صفحه (معمولاً 16px) محاسبه می‌شود؛ مثلاً 1.5rem برابر 24px است و در طراحی واکنش‌گرا بسیار حرفه‌ای‌تر از px ثابت عمل می‌کند.',
      'استاندارد دسترس‌پذیری وب (WCAG) توصیه می‌کند کنتراست متن و پس‌زمینه حداقل ۴.۵ به ۱ باشد؛ هرگز متن زرد روشن را روی پس‌زمینه سفید ننویسید!',
    ],
    goldenTips: [
      'در یک صفحه وب از حداکثر ۲ تا ۳ رنگ هماهنگ (رنگ اصلی برند + رنگ خنثی متن/پس‌زمینه + یک رنگ تأکیدی) استفاده کنید.',
      'همیشه برای خوانایی بهتر متون فارسی، line-height بین 1.7 تا 1.9 تنظیم کنید.',
    ],
    wrongVsRight: [
      {
        title: 'کنتراست ضعیف متن و پس‌زمینه',
        wrongCode: `.note { background: #fef08a; color: #ffffff; }`,
        rightCode: `.note { background: #fef9c3; color: #713f12; }`,
        explanation: 'متن سفید روی پس‌زمینه زرد روشن ناخواناست؛ رنگ متن تیره کنتراست عالی می‌سازد.',
      },
      {
        title: 'فاصله خطوط فشرده در متن فارسی',
        wrongCode: `p { font-size: 14px; line-height: 1; }`,
        rightCode: `p { font-size: 14px; line-height: 1.8; }`,
        explanation: 'در فارسی line-height: 1 باعث برخورد نقطه‌های خطوط بالا و پایین به هم می‌شود.',
      },
    ],
    examples: [
      {
        id: 'ex-2-2-typo-basic',
        tier: 'basic',
        title: 'بنر خوش‌آمدگویی «مرجع نو» با گرادیان، کنتراست و تایپوگرافی استاندارد',
        bookPage: '۱۲۴ تا ۱۲۷',
        summary: 'استفاده از linear-gradient، واحد rem، line-height مناسب فارسی و دکمه متمایز.',
        language: 'html',
        engine: 'web',
        code: `<section class="hero-banner">
  <span class="pill">چاپ جدید سال تحصیلی ۱۴۰۵</span>
  <h1>کتاب‌های درسی و کمک‌آموزشی «مرجع نو»</h1>
  <p>با بهترین کیفیت چاپ و ارسال سریع به تمامی هنرستان‌های سراسر کشور.</p>
</section>`,
        cssCode: `.hero-banner {
  background: linear-gradient(135deg, #0284c7, #0f172a);
  color: #ffffff;
  padding: 24px;
  border-radius: 16px;
}
.pill { background: rgba(255, 255, 255, 0.18); padding: 4px 12px; border-radius: 999px; font-size: 12px; }
.hero-banner h1 { margin: 12px 0 8px; font-size: 1.4rem; }
.hero-banner p { margin: 0; color: #e0f2fe; line-height: 1.8; font-size: 0.95rem; }`,
        teacherTalkingPoints: [
          'شفافیت rgba(255, 255, 255, 0.18) روی برچسب بالا باعث ایجاد جلوه شیشه‌ای زیبا روی پس‌زمینه گرادیان می‌شود.',
        ],
        lineExplanations: [
          {line: 2, explanation: 'ایجاد پس‌زمینه طیف رنگی مدرن با زاویه ۱۳۵ درجه.'},
          {line: 9, explanation: 'line-height: 1.8 متن فارسی را نرم و خوانا نگه می‌دارد.'},
        ],
        commonMistakes: ['فراموش کردن علامت # پیش از کد رنگ Hex.'],
      },
      {
        id: 'ex-2-2-typo-practical',
        tier: 'practical',
        title: 'نمایش مدل‌های مختلف رنگ (Hex، RGB، RGBA و HSL) کنار هم',
        bookPage: '۱۲۵',
        summary: 'مقایسه تصویری ۴ روش تعریف رنگ در CSS3 با یک رنگ پایه آبی آسمانی.',
        language: 'html',
        engine: 'web',
        code: `<div class="palette">
  <div class="swatch c-hex">Hex: #0284c7</div>
  <div class="swatch c-rgb">RGB: rgb(2, 132, 199)</div>
  <div class="swatch c-rgba">RGBA (شفاف ۶۰٪)</div>
  <div class="swatch c-hsl">HSL: hsl(200, 98%, 39%)</div>
</div>`,
        cssCode: `.palette { display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px; }
.swatch { padding: 14px; border-radius: 10px; color: #fff; font-weight: bold; text-align: center; font-size: 13px; }
.c-hex { background: #0284c7; }
.c-rgb { background: rgb(2, 132, 199); }
.c-rgba { background: rgba(2, 132, 199, 0.6); }
.c-hsl { background: hsl(200, 98%, 39%); }`,
        teacherTalkingPoints: [
          'نشان دهید هر چهار مربع یک رنگ آبی واحد هستند، فقط سومی ۴۰٪ شفافیت دارد.',
        ],
        lineExplanations: [
          {line: 5, explanation: 'عدد 0.6 در rgba شفافیت ۶۰ درصدی ایجاد می‌کند.'},
        ],
        commonMistakes: ['نوشتن rgba با ۳ عدد به جای ۴ عدد یا دادن عدد بیشتر از 1 برای شفافیت.'],
      },
      {
        id: 'ex-2-2-typo-combined',
        tier: 'combined',
        title: 'کارت خبر با حاشیه گرد (border-radius)، سایه نرم و متن تراز‌شده',
        bookPage: '۱۲۷ تا ۱۲۸',
        summary: 'ترکیب box-shadow، border-right تأکیدی، letter-spacing و text-decoration در طراحی کارت مقاله‌های وب.',
        language: 'html',
        engine: 'web',
        code: `<article class="news-card">
  <div class="meta">اخبار هنرستان • آبان ۱۴۰۵</div>
  <h3>افتتاح کارگاه جدید طراحی وب و جنگو</h3>
  <p>هنرجویان پایه یازدهم از این هفته پروژه‌های فروشگاه مرجع نو را روی سرور محلی آزمایش می‌کنند.</p>
  <a class="read-more" href="#">ادامه مطلب ←</a>
</article>`,
        cssCode: `.news-card {
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-right: 5px solid #10b981;
  border-radius: 12px;
  padding: 16px;
  box-shadow: 0 4px 12px rgba(15, 23, 42, 0.08);
}
.meta { font-size: 12px; color: #64748b; }
.news-card h3 { margin: 6px 0; color: #0f172a; }
.news-card p { color: #334155; line-height: 1.8; margin: 0 0 10px; }
.read-more { color: #0284c7; font-weight: bold; text-decoration: none; }
.read-more:hover { text-decoration: underline; }`,
        teacherTalkingPoints: [
          'نشان دهید چگونه یک خط رنگی در سمت راست (border-right) در صفحات RTL ظاهر کارت را کاملاً حرفه‌ای می‌کند.',
        ],
        lineExplanations: [
          {line: 7, explanation: 'ایجاد سایه ملایم و مدرن با rgba بسیار کم‌رنگ (0.08).'},
        ],
        commonMistakes: ['استفاده از سایه‌های سیاه پررنگ که صفحه را شلوغ و غیرحرفه‌ای نشان می‌دهند.'],
      },
      {
        id: 'ex-2-2-typo-whatif',
        tier: 'what-if',
        title: 'آزمایشگاه What-If: تفاوت opacity در برابر rgba روی پس‌زمینه',
        bookPage: '۱۲۶',
        summary: 'اثبات اینکه چرا برای شفاف کردن پس‌زمینه نباید از opacity استفاده کرد (چون متن داخل جعبه را هم محو می‌کند!).',
        language: 'html',
        engine: 'web',
        code: `<div class="compare">
  <div class="box with-opacity">opacity: 0.4 ← متن هم کم‌رنگ و ناخوانا شد!</div>
  <div class="box with-rgba">rgba(..., 0.4) ← فقط پس‌زمینه شفاف شد، متن پررنگ ماند!</div>
</div>`,
        cssCode: `.compare { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
.box { padding: 16px; border-radius: 10px; font-weight: bold; color: #0f172a; }
.with-opacity { background: #0284c7; opacity: 0.4; }
.with-rgba { background: rgba(2, 132, 199, 0.4); }`,
        teacherTalkingPoints: [
          'یک مقایسه بصری فوری که تفاوت کاربردی opacity و rgba را برای همیشه در ذهن هنرجویان تثبیت می‌کند.',
        ],
        lineExplanations: [
          {line: 3, explanation: 'ویژگی opacity روی کل عنصر و همه فرزندان آن اثر می‌گذارد.'},
        ],
        commonMistakes: ['محو شدن ناخواسته متن دکمه به دلیل استفاده از opacity روی پس‌زمینه.'],
      },
    ],
  },

  // =========================================================================
  // CONCEPT 3: CSS Box Model & box-sizing
  // =========================================================================
  {
    id: 'les-2-2-box-model',
    order: 3,
    title: 'مدل جعبه‌ای (Box Model): تفاوت دقیق margin و padding، border و box-sizing: border-box',
    bookPage: '۱۱۶ و ۱۲۹ تا ۱۳۳',
    whyWeNeedIt: {
      realWorldProblem:
        'در CSS هر عنصر HTML (پاراگراف، عکس، دکمه، کارت) یک «جعبه مستطیلی» است. در هدف ۵ ص ۱۱۶ کتاب متأسفانه تعریف margin و padding جابه‌جا نوشته شده و در ص ۱۲۹ غلط تایپی padding: 10px.20px چاپ شده است! درک دقیق لایه‌های جعبه پایه کل چیدمان وب است.',
      analogy:
        'یک «قاب عکس روی دیوار» را تصور کنید: خود عکس برابر Content است؛ حاشیه مقوایی سفید دور عکس داخل قاب برابر Padding است؛ چوب دور قاب برابر Border است؛ و فاصله خالی بین این قاب تا قاب بغلی روی دیوار برابر Margin است!',
    },
    syntaxAnatomy: {
      template: `* { box-sizing: border-box; }
.card {
  width: 240px;
  padding: 12px 20px;   /* بالا/پایین 12 و چپ/راست 20 */
  border: 2px solid #0284c7;
  margin: 16px auto;    /* وسط‌چین افقی */
}`,
      parts: [
        {token: 'padding', role: 'فاصله داخلی بین محتوا و کادر (Border) — رنگ پس‌زمینه عنصر را به خود می‌گیرد.'},
        {token: 'border', role: 'خط حاشیه دور عنصر شامل ضخامت، نوع (solid/dashed) و رنگ.'},
        {token: 'margin', role: 'فاصله بیرونی بین این جعبه و عناصر همسایه (همیشه شفاف است).'},
        {token: 'box-sizing: border-box', role: 'تضمین می‌کند width کل جعبه شامل padding و border باشد و ابعاد صفحه نشکند!'},
      ],
    },
    behindTheScenes: [
      'در حالت پیش‌فرض مرورگر (content-box)، اگر به یک باکس width: 200px و padding: 20px بدهید، عرض واقعی آن 240px می‌شود! به همین دلیل طراحان حرفه‌ای در خط اول فایل CSS می‌نویسند: * { box-sizing: border-box; }.',
      'اصلاح دو اشتباه مهم کتاب: (۱) در هدف ۵ ص ۱۱۶ کتاب، margin و padding جابه‌جا تعریف شده‌اند؛ (۲) در ص ۱۲۹ بین مقادیر کوتاه‌نویسی اشتباهاً نقطه گذاشته شده (10px.20px) در حالی که در CSS مقادیر فقط با فاصله (Space) جدا می‌شوند: padding: 10px 20px;',
      'کوتاه‌نویسی چهارجهته ساعتگرد است: بالا ← راست ← پایین ← چپ (مثل عقربه ساعت از ۱۲ شروع می‌شود).',
    ],
    goldenTips: [
      'برای وسط‌چین کردن یک جعبه بلوکی دارای عرض مشخص (مثل max-width: 900px) بنویسید: margin: 0 auto;',
      'حتماً در تب «۲. شهود بصری» همین واحد، بازرس سه‌بعدی Box Model را روی پروژکتور به کلاس نشان دهید.',
    ],
    wrongVsRight: [
      {
        title: 'گذاشتن نقطه به جای فاصله در padding (خطای ص ۱۲۹ کتاب)',
        wrongCode: `.box { padding: 10px.20px; }`,
        rightCode: `.box { padding: 10px 20px; }`,
        explanation: 'مرورگر 10px.20px را نامعتبر می‌داند و کل خط padding را نادیده می‌گیرد.',
      },
      {
        title: 'خلط margin و padding (اصلاح هدف ۵ ص ۱۱۶)',
        wrongCode: `/* استفاده از padding برای فاصله بین دو کارت */
.card { padding: 20px; }`,
        rightCode: `/* padding برای تنفس داخلی، margin برای فاصله بین کارت‌ها */
.card { padding: 16px; margin-bottom: 16px; }`,
        explanation: 'padding فضای داخلی را بزرگ می‌کند اما کارت‌ها همچنان به هم چسبیده می‌مانند؛ فاصله بیرونی فقط با margin است.',
      },
    ],
    examples: [
      {
        id: 'ex-2-2-box-basic',
        tier: 'basic',
        title: 'نمایش بصری ۴ لایه Box Model و اصلاح padding: 10px 20px (ص ۱۲۹)',
        bookPage: '۱۲۹ تا ۱۳۱',
        summary: 'رنگ‌آمیزی لایه‌های margin، border، padding و content برای تفکیک واضح فاصله داخلی و بیرونی.',
        language: 'html',
        engine: 'web',
        code: `<div class="margin-zone">
  <div class="box-demo">
    <div class="content-core">محتوای اصلی (Content)</div>
  </div>
</div>`,
        cssCode: `.margin-zone { background: #fef3c7; border: 1px dashed #d97706; padding: 18px; border-radius: 12px; }
.box-demo {
  background: #bbf7d0;        /* رنگ ناحیه padding */
  border: 4px solid #0284c7;  /* ناحیه border */
  padding: 16px 24px;         /* اصلاح 10px.20px ص ۱۲۹ کتاب */
  margin: 12px auto;          /* فاصله بیرونی + وسط‌چین */
  max-width: 340px;
  border-radius: 10px;
}
.content-core { background: #ffffff; padding: 10px; text-align: center; font-weight: bold; }`,
        teacherTalkingPoints: [
          'زرد بیرونی = margin، خط آبی = border، سبز داخلی = padding، سفید وسط = content!',
        ],
        lineExplanations: [
          {line: 5, explanation: 'فاصله ۱۶ پیکسل بالا/پایین و ۲۴ پیکسل چپ/راست بدون نقطه.'},
        ],
        commonMistakes: ['نوشتن 10px.20px با نقطه یا نوشتن 10 px با فاصله بین عدد و واحد!'],
        bookCorrection: {
          page: 129,
          issue: 'در هدف ۵ ص ۱۱۶ تعریف margin و padding جابه‌جا شده بود و در ص ۱۲۹ کد نامعتبر padding: 10px.20px چاپ شده بود.',
          fix: 'تعریف دقیق هر لایه همراه با نحو استاندارد padding: 16px 24px ارائه شد.',
        },
      },
      {
        id: 'ex-2-2-box-practical',
        tier: 'practical',
        title: 'مقایسه زنده content-box در برابر border-box با عرض یکسان 240px',
        bookPage: '۱۳۲',
        summary: 'دو جعبه با width: 240px و padding: 24px کنار هم تا کلاس با چشم ببیند چرا border-box نجات‌دهنده است!',
        language: 'html',
        engine: 'web',
        code: `<div class="demo-box cb">content-box (width: 240px ← عرض واقعی ۲۹۶px شد!)</div>
<div class="demo-box bb">border-box (width: 240px ← عرض واقعی دقیقاً ۲۴۰px ماند!)</div>`,
        cssCode: `.demo-box {
  width: 240px;
  padding: 24px;
  border: 4px solid #0f172a;
  margin-bottom: 12px;
  border-radius: 8px;
  font-size: 13px;
  font-weight: bold;
}
.cb { box-sizing: content-box; background: #fee2e2; border-color: #dc2626; }
.bb { box-sizing: border-box; background: #dcfce7; border-color: #16a34a; }`,
        teacherTalkingPoints: [
          'دقت کنید جعبه قرمز از سمت چپ بیرون زد چون ۲۴+۲۴ پیکسل padding و ۴+۴ پیکسل border به ۲۴۰ اضافه شدند!',
        ],
        lineExplanations: [
          {line: 11, explanation: 'border-box همه چیز را داخل همان ۲۴۰ پیکسل نگه می‌دارد.'},
        ],
        commonMistakes: ['فراموش کردن * { box-sizing: border-box; } در ابتدای فایل CSS.'],
      },
      {
        id: 'ex-2-2-box-combined',
        tier: 'combined',
        title: 'کانتینر وسط‌چین فروشگاه (margin: 0 auto) با کارت‌های دارای فاصله منظم',
        bookPage: '۱۳۳',
        summary: 'کاربرد عملی max-width + margin: 0 auto برای ساخت کانتینر مرکزی صفحه وب.',
        language: 'html',
        engine: 'web',
        code: `<div class="page-wrap">
  <div class="item-card">📘 کتاب طراح سایت — ۴۵٬۰۰۰ تومان</div>
  <div class="item-card">📗 کتاب تولید محتوا — ۳۸٬۰۰۰ تومان</div>
</div>`,
        cssCode: `* { box-sizing: border-box; }
.page-wrap { max-width: 420px; margin: 0 auto; padding: 14px; background: #f1f5f9; border-radius: 12px; }
.item-card { background: #fff; padding: 12px 16px; border: 1px solid #cbd5e1; border-radius: 8px; margin-bottom: 10px; font-weight: bold; }
.item-card:last-child { margin-bottom: 0; }`,
        teacherTalkingPoints: [
          'شبه‌کلاس :last-child فاصله پایین آخرین کارت را صفر می‌کند تا کانتینر کاملاً متقارن بماند.',
        ],
        lineExplanations: [
          {line: 2, explanation: 'margin: 0 auto کانتینر را دقیقاً در وسط افقی صفحه قرار می‌دهد.'},
        ],
        commonMistakes: ['دادن margin: 0 auto بدون تعیین width یا max-width که اثری ندارد.'],
      },
      {
        id: 'ex-2-2-box-whatif',
        tier: 'what-if',
        title: 'آزمایشگاه What-If: تفاوت display: block، inline و inline-block',
        bookPage: '۱۳۳',
        summary: 'نمایش عملی اینکه چرا تگ <span> (inline) عرض و padding بالا/پایین را مثل inline-block نمی‌پذیرد.',
        language: 'html',
        engine: 'web',
        code: `<div class="row">
  <span class="badge-inline">inline (عرض بی‌اثر)</span>
  <span class="badge-ib">inline-block (عرض ۱۲۰px!)</span>
  <span class="badge-ib">دکمه دوم</span>
</div>`,
        cssCode: `.badge-inline { display: inline; width: 140px; background: #fecdd3; padding: 4px 8px; }
.badge-ib { display: inline-block; width: 140px; text-align: center; background: #bae6fd; padding: 8px; border-radius: 8px; margin-right: 6px; font-weight: bold; }`,
        teacherTalkingPoints: [
          'به کلاس نشان دهید دکمه صورتی با اینکه width: 140px دارد کشیده نشد، اما آبی‌ها به لطف inline-block عرض گرفتند و کنار هم ماندند.',
        ],
        lineExplanations: [
          {line: 2, explanation: 'inline-block هم کنار هم می‌نشیند و هم width/height/padding کامل می‌پذیرد.'},
        ],
        commonMistakes: ['تلاش برای دادن width به تگ <a> یا <span> بدون تغییر display آن.'],
      },
    ],
  },

  // =========================================================================
  // CONCEPT 4: Flexbox Layout
  // =========================================================================
  {
    id: 'les-2-2-flexbox',
    order: 4,
    title: 'چیدمان منعطف Flexbox (justify-content، align-items، flex-wrap، gap و اصلاح ص ۱۳۸)',
    bookPage: '۱۳۴ تا ۱۳۸',
    whyWeNeedIt: {
      realWorldProblem:
        'چیدن منوی ناوبری، وسط‌چین کردن عمودی و افقی یک دکمه یا ردیف کردن کارت‌های محصول کنار هم در گذشته با float بسیار دردسرساز بود. Flexbox یک سیستم چیدمان یک‌بعدی هوشمند است که در ۲ خط CSS عناصر را هم‌تراز، فاصله‌گذاری و در موبایل خودکار خط‌شکنی می‌کند.',
      analogy:
        'Flexbox مثل «قفسه کشویی هوشمند کتابخانه» است: می‌توانید به کتاب‌ها بگویید به وسط بچسبند (center)، با فاصله مساوی پخش شوند (space-between) و اگر قفسه تنگ شد خودکار به ردیف پایین بروند (flex-wrap: wrap)!',
    },
    syntaxAnatomy: {
      template: `.products {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 16px;
}`,
      parts: [
        {token: 'display: flex', role: 'عنصر والد را به یک ظرف منعطف (Flex Container) تبدیل می‌کند.'},
        {token: 'justify-content', role: 'ترازبندی در راستای محور اصلی (معمولاً افقی): flex-start، center، space-between، space-around.'},
        {token: 'align-items', role: 'ترازبندی در راستای محور عمود (معمولاً عمودی): center، stretch، flex-start.'},
        {token: 'flex-wrap: wrap + gap', role: 'اجازه رفتن کارت‌ها به خط بعد در صفحات کوچک + فاصله تمیز بین کارت‌ها.'},
      ],
    },
    behindTheScenes: [
      'باگ بحرانی ص ۱۳۸ کتاب درسی: در پروژه فروشگاه مرجع نو عبارت justify-content: space-center; چاپ شده است! چنین مقداری در استاندارد CSS وجود ندارد و مرورگر کل خط را نادیده می‌گیرد. مقدار معتبر center یا space-between یا space-evenly است.',
      'در صفحات راست‌به‌چپ فارسی (dir="rtl")، محور اصلی Flexbox به‌طور خودکار از «راست به چپ» حرکت می‌کند؛ بنابراین flex-start در سمت راست و flex-end در سمت چپ قرار می‌گیرد!',
      'ویژگی gap فاصله را فقط «بین» کارت‌ها می‌گذارد و به لبه‌های بیرونی ردیف فاصله اضافی تحمیل نمی‌کند (بسیار تمیزتر از margin).',
    ],
    goldenTips: [
      'برای وسط‌چین کردن مطلق (هم افقی و هم عمودی) هر محتوایی داخل یک جعبه فقط ۳ خط لازم است: display: flex; justify-content: center; align-items: center;',
      'در نوار ناوبری برای چسباندن لوگو به سمت راست و دکمه ورود به سمت چپ، از justify-content: space-between استفاده کنید.',
    ],
    wrongVsRight: [
      {
        title: 'مقدار نامعتبر space-center (باگ واقعی ص ۱۳۸ کتاب)',
        wrongCode: `.products {
  display: flex;
  justify-content: space-center;
}`,
        rightCode: `.products {
  display: flex;
  justify-content: center;
  gap: 16px;
}`,
        explanation: 'space-center وجود خارجی ندارد؛ بسته به نیاز از center، space-between یا space-evenly استفاده کنید.',
      },
      {
        title: 'سرریز شدن کارت‌ها در موبایل به دلیل نبود flex-wrap',
        wrongCode: `.products { display: flex; }`,
        rightCode: `.products { display: flex; flex-wrap: wrap; }`,
        explanation: 'بدون flex-wrap: wrap، کارت‌ها در صفحه کوچک فشرده یا از صفحه بیرون می‌زنند.',
      },
    ],
    examples: [
      {
        id: 'ex-2-2-flex-basic',
        tier: 'basic',
        title: 'کارت‌های محصولات «مرجع نو» با Flexbox (اصلاح باگ space-center ص ۱۳۸)',
        bookPage: '۱۳۷ تا ۱۳۸',
        summary: 'چیدمان منعطف ۳ کارت کتاب با justify-content: center، flex-wrap: wrap و افکت هاور.',
        language: 'html',
        engine: 'web',
        code: `<section class="products">
  <article class="card">
    <img src="book1.jpg" alt="طراح سایت" />
    <h3>طراح سایت یازدهم</h3>
    <p class="price">۴۵٬۰۰۰ تومان</p>
    <button>افزودن به سبد</button>
  </article>
  <article class="card">
    <img src="book2.jpg" alt="تولید محتوا" />
    <h3>تولید محتوا دهم</h3>
    <p class="price">۳۸٬۰۰۰ تومان</p>
    <button>افزودن به سبد</button>
  </article>
  <article class="card">
    <img src="book3.jpg" alt="توسعه برنامه" />
    <h3>توسعه برنامه‌سازی</h3>
    <p class="price">۵۲٬۰۰۰ تومان</p>
    <button>افزودن به سبد</button>
  </article>
</section>`,
        cssCode: `* { box-sizing: border-box; }
.products { display: flex; flex-wrap: wrap; justify-content: center; gap: 14px; }
.card { width: 185px; border: 1px solid #cbd5e1; border-radius: 12px; padding: 12px; text-align: center; background: #f8fafc; transition: 0.2s; }
.card:hover { transform: translateY(-4px); border-color: #0284c7; }
.card img { width: 100%; border-radius: 8px; }
.price { color: #059669; font-weight: bold; }
.card button { background: #0284c7; color: #fff; border: none; padding: 6px 14px; border-radius: 8px; cursor: pointer; }`,
        teacherTalkingPoints: [
          'دکمه نمای موبایل بالای پیش‌نمایش را بزنید تا ببینند کارت‌ها چگونه خودکار زیر هم چیده می‌شوند.',
        ],
        lineExplanations: [
          {line: 2, explanation: 'مقدار معتبر center (اصلاح space-center ص ۱۳۸) همراه با wrap و gap.'},
        ],
        commonMistakes: ['کپی کردن justify-content: space-center از کتاب ص ۱۳۸.'],
        bookCorrection: {
          page: 138,
          issue: 'در ص ۱۳۸ مقدار نامعتبر justify-content: space-center چاپ شده بود.',
          fix: 'مقدار استاندارد justify-content: center جایگزین شد.',
        },
      },
      {
        id: 'ex-2-2-flex-practical',
        tier: 'practical',
        title: 'نوار ناوبری استاندارد فارسی با justify-content: space-between و align-items: center',
        bookPage: '۱۳۵ تا ۱۳۶',
        summary: 'قرار دادن لوگو در سمت راست، منو در وسط و دکمه ورود در سمت چپ نوار بالای سایت.',
        language: 'html',
        engine: 'web',
        code: `<header class="navbar">
  <div class="brand">📚 مرجع نو</div>
  <nav class="links">
    <a href="#">خانه</a>
    <a href="#">کتاب‌ها</a>
    <a href="#">تماس</a>
  </nav>
  <button class="login-btn">ورود / ثبت‌نام</button>
</header>`,
        cssCode: `.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
  background: #0f172a;
  color: #fff;
  padding: 12px 16px;
  border-radius: 12px;
}
.brand { font-weight: bold; font-size: 16px; }
.links { display: flex; gap: 14px; }
.links a { color: #bae6fd; text-decoration: none; font-size: 14px; }
.login-btn { background: #0284c7; color: #fff; border: none; padding: 6px 14px; border-radius: 8px; cursor: pointer; }`,
        teacherTalkingPoints: [
          'نشان دهید خود .links هم یک Flexbox تودرتو (Nested Flex) است.',
        ],
        lineExplanations: [
          {line: 3, explanation: 'space-between سه فرزند اصلی را در دو سر و وسط نوار تراز می‌کند.'},
        ],
        commonMistakes: ['فراموش کردن align-items: center که باعث بالا و پایین ماندن دکمه نسبت به متن می‌شود.'],
      },
      {
        id: 'ex-2-2-flex-combined',
        tier: 'combined',
        title: 'استفاده از flex: 1 برای ستون‌های هم‌عرض و دکمه‌های تراز پایین کارت',
        bookPage: '۱۳۷',
        summary: 'چگونه با flex-direction: column و margin-top: auto دکمه‌های کارت‌هایی با طول متن متفاوت را کاملاً در یک تراز قرار دهیم.',
        language: 'html',
        engine: 'web',
        code: `<div class="equal-row">
  <div class="col-card">
    <h4>کتاب کوتاه</h4>
    <p>توضیح کوتاه.</p>
    <button>خرید</button>
  </div>
  <div class="col-card">
    <h4>کتاب با توضیح بلندتر</h4>
    <p>این کتاب شامل ۵ پودمان عملی از پایتون تا طراحی وب و فریم‌ورک جنگو برای پایه یازدهم است.</p>
    <button>خرید</button>
  </div>
</div>`,
        cssCode: `.equal-row { display: flex; gap: 12px; }
.col-card {
  flex: 1;
  display: flex;
  flex-direction: column;
  border: 1px solid #cbd5e1;
  border-radius: 10px;
  padding: 12px;
  background: #fff;
}
.col-card button { margin-top: auto; background: #059669; color: #fff; border: none; padding: 8px; border-radius: 8px; cursor: pointer; }`,
        teacherTalkingPoints: [
          'ترفند حرفه‌ای margin-top: auto روی دکمه درون یک ستون Flex باعث می‌شود دکمه‌های همه کارت‌ها همیشه خط‌کش‌شده در پایین بنشینند!',
        ],
        lineExplanations: [
          {line: 3, explanation: 'flex: 1 به هر دو کارت سهم عرض برابر (۵۰٪ - ۵۰٪) می‌دهد.'},
          {line: 11, explanation: 'هل دادن خودکار دکمه به انتهای پایین کارت.'},
        ],
        commonMistakes: ['تلاش برای هم‌تراز کردن دکمه‌ها با دادن padding-top دستی و شکننده.'],
      },
      {
        id: 'ex-2-2-flex-whatif',
        tier: 'what-if',
        title: 'آزمایشگاه What-If: مقایسه space-between، space-around و space-evenly',
        bookPage: '۱۳۶',
        summary: 'مشاهده دقیق تفاوت توزیع فضای خالی بین سه مقدار پرکاربرد justify-content.',
        language: 'html',
        engine: 'web',
        code: `<div class="demo-row sb"><span>۱</span><span>۲</span><span>۳</span></div>
<div class="demo-row sa"><span>۱</span><span>۲</span><span>۳</span></div>
<div class="demo-row se"><span>۱</span><span>۲</span><span>۳</span></div>`,
        cssCode: `.demo-row { display: flex; background: #f1f5f9; border: 1px dashed #94a3b8; padding: 8px; margin-bottom: 8px; border-radius: 8px; }
.demo-row span { background: #0284c7; color: #fff; padding: 6px 16px; border-radius: 6px; font-weight: bold; }
.sb { justify-content: space-between; }
.sa { justify-content: space-around; }
.se { justify-content: space-evenly; }`,
        teacherTalkingPoints: [
          'در ردیف اول (space-between) آیتم‌های ابتدا و انتها به دیواره می‌چسبند؛ در ردیف سوم (space-evenly) همه فاصله‌ها کاملاً برابرند.',
        ],
        lineExplanations: [
          {line: 5, explanation: 'space-evenly تمام فواصل لبه‌ها و میانه‌ها را دقیقاً برابر تقسیم می‌کند.'},
        ],
        commonMistakes: ['نوشتن space-center که هیچ‌کدام از این ۳ مقدار معتبر نیست.'],
      },
    ],
  },

  // =========================================================================
  // CONCEPT 5: CSS Grid Layout
  // =========================================================================
  {
    id: 'les-2-2-grid',
    order: 5,
    title: 'چیدمان دوبعدی CSS Grid (grid-template-columns، واحد fr و repeat(auto-fit, minmax))',
    bookPage: '۱۳۹ تا ۱۴۰',
    whyWeNeedIt: {
      realWorldProblem:
        'وقتی می‌خواهیم هم‌زمان ردیف‌ها و ستون‌ها را مدیریت کنیم (مثلاً بخش «خدمات ویژه ۵ ستونه» فروشگاه مرجع نو، داشبورد مدیریتی یا گالری عکس)، CSS Grid ابزار فوق‌العاده‌ای است که حتی بدون نوشتن Media Query می‌تواند تعداد ستون‌ها را متناسب با عرض صفحه تغییر دهد!',
      analogy:
        'اگر Flexbox مثل «یک ردیف صندلی» است، CSS Grid مثل «نقشه شطرنجی کل سالن سینما» است که هم ردیف‌ها و هم ستون‌ها را هم‌زمان کنترل می‌کند!',
    },
    syntaxAnatomy: {
      template: `.services {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 14px;
}`,
      parts: [
        {token: 'display: grid', role: 'عنصر والد را به یک شبکه دوبعدی تبدیل می‌کند.'},
        {token: '1fr', role: 'واحد کسری (Fraction)؛ فضای آزاد باقی‌مانده را به نسبت مساوی بین ستون‌ها تقسیم می‌کند.'},
        {token: 'repeat(3, 1fr)', role: 'کوتاه‌نویسی تمیز به جای نوشتن 1fr 1fr 1fr.'},
        {token: 'auto-fit + minmax(140px, 1fr)', role: 'جادوی واکنش‌گرایی Grid: هر چند ستون با حداقل ۱۴۰px جا شود کنار هم می‌چیند و بقیه را خط بعد می‌برد.'},
      ],
    },
    behindTheScenes: [
      'قانون انتخاب سریع بین Flexbox و Grid: برای چیدمان خطی (یک نوار ابزار، یک ردیف دکمه) از Flexbox و برای شبکه‌های چندستونه هم‌اندازه (گالری، خدمات، ساختار صفحه) از CSS Grid استفاده کنید.',
      'با ویژگی grid-column: span 2 می‌توان یک کارت ویژه (مثل محصول پیشنهادی روز) را به‌اندازه ۲ ستون پهن‌تر کرد.',
    ],
    goldenTips: [
      'فرمول repeat(auto-fit, minmax(150px, 1fr)) را همیشه در جعبه‌ابزار خود نگه دارید؛ با یک خط CSS شبکه‌ای می‌سازد که از موبایل تا مانیتور ۴K بدون نقص کار می‌کند.',
    ],
    wrongVsRight: [
      {
        title: 'ستون‌های ثابت پیکسلی که در موبایل سرریز می‌کنند',
        wrongCode: `.grid { display: grid; grid-template-columns: 200px 200px 200px 200px; }`,
        rightCode: `.grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); }`,
        explanation: '۴ ستون ثابت ۲۰۰px مجموعاً ۸۰۰px عرض می‌خواهد و در موبایل اسکرول افقی ایجاد می‌کند.',
      },
      {
        title: 'استفاده از grid-template-columns بدون display: grid',
        wrongCode: `.box { grid-template-columns: 1fr 1fr; }`,
        rightCode: `.box { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }`,
        explanation: 'تمامی ویژگی‌های Grid فقط زمانی فعال می‌شوند که display: grid روی والد تنظیم شده باشد.',
      },
    ],
    examples: [
      {
        id: 'ex-2-2-grid-basic',
        tier: 'basic',
        title: 'بخش «خدمات ویژه» ۵ ستونه واکنش‌گرای مرجع نو با CSS Grid',
        bookPage: '۱۳۹ تا ۱۴۰',
        summary: 'پیاده‌سازی ۵ باکس خدمات با repeat(auto-fit, minmax(120px, 1fr)) و gap: 12px.',
        language: 'html',
        engine: 'web',
        code: `<section class="services">
  <div class="svc">🚚 ارسال سریع</div>
  <div class="svc">✅ ضمانت اصالت</div>
  <div class="svc">🔒 پرداخت امن</div>
  <div class="svc">🎧 پشتیبانی ۲۴ ساعته</div>
  <div class="svc">🎓 تخفیف هنرجویی</div>
</section>`,
        cssCode: `.services {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(125px, 1fr));
  gap: 12px;
}
.svc {
  background: #e0f2fe;
  border: 1px solid #7dd3fc;
  color: #0369a1;
  padding: 14px 10px;
  border-radius: 10px;
  text-align: center;
  font-weight: bold;
  font-size: 13px;
}`,
        teacherTalkingPoints: [
          'دکمه تغییر عرض (موبایل/تبلت/دسکتاپ) را بزنید تا ببینند تعداد ستون‌ها بدون یک خط @media چطور خودکار تنظیم می‌شود!',
        ],
        lineExplanations: [
          {line: 3, explanation: 'هر باکس حداقل ۱۲۵px عرض دارد و فضای اضافه را مساوی تقسیم می‌کنند.'},
        ],
        commonMistakes: ['فراموش کردن display: grid یا نوشتن 1fr اشتباه به صورت 1 fr با فاصله.'],
      },
      {
        id: 'ex-2-2-grid-practical',
        tier: 'practical',
        title: 'ساختار صفحه دو ستونه (محتوای اصلی 2fr + ستون کناری 1fr)',
        bookPage: '۱۳۹',
        summary: 'استفاده از نسبت‌های 2fr و 1fr برای ساخت چیدمان کلاسیک وبلاگ/فروشگاه با ستون کناری.',
        language: 'html',
        engine: 'web',
        code: `<div class="layout">
  <main class="main-col">محتوای اصلی (سهم ۲ از ۳ = ۶۶٪ عرض)</main>
  <aside class="side-col">ستون کناری (سهم ۱ از ۳ = ۳۳٪ عرض)</aside>
</div>`,
        cssCode: `.layout { display: grid; grid-template-columns: 2fr 1fr; gap: 14px; }
.main-col { background: #f8fafc; border: 1px solid #cbd5e1; padding: 18px; border-radius: 10px; font-weight: bold; }
.side-col { background: #fef3c7; border: 1px solid #f59e0b; padding: 18px; border-radius: 10px; font-weight: bold; }`,
        teacherTalkingPoints: [
          'توضیح دهید واحد fr یعنی فضای باقی‌مانده بعد از کسر gap را به ۳ قسمت مساوی تقسیم کن: ۲ سهم برای main و ۱ سهم برای aside.',
        ],
        lineExplanations: [
          {line: 1, explanation: 'تعریف دو ستون با نسبت ۲ به ۱ بدون درگیر شدن با محاسبه درصد و gap.'},
        ],
        commonMistakes: ['استفاده از 66% و 33% همراه با gap که مجموعش بیش از 100% شده و سرریز می‌دهد!'],
      },
      {
        id: 'ex-2-2-grid-combined',
        tier: 'combined',
        title: 'گالری محصولات با کارت ویژه پهن (grid-column: span 2)',
        bookPage: '۱۴۰',
        summary: 'ترکیب شبکه ۳ ستونه با ادغام ۲ ستونی برای برجسته کردن محصول منتخب فروشگاه.',
        language: 'html',
        engine: 'web',
        code: `<div class="catalog">
  <div class="tile featured">⭐ پکیج ویژه سال تحصیلی ۱۴۰۵ (عرض ۲ ستون)</div>
  <div class="tile">طراح سایت</div>
  <div class="tile">تولید محتوا</div>
  <div class="tile">پایگاه داده</div>
  <div class="tile">کارگاه شبکه</div>
</div>`,
        cssCode: `.catalog { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; }
.tile { background: #f1f5f9; border: 1px solid #cbd5e1; padding: 16px; border-radius: 10px; text-align: center; font-weight: bold; }
.featured { grid-column: span 2; background: #0284c7; color: #fff; border-color: #0369a1; }`,
        teacherTalkingPoints: [
          'نشان دهید grid-column: span 2 دقیقاً معادل مدرن colspan در جداول اما برای چیدمان صفحه است.',
        ],
        lineExplanations: [
          {line: 3, explanation: 'کارت اول به اندازه ۲ ستون شبکه گسترش می‌یابد.'},
        ],
        commonMistakes: ['دادن span 4 در شبکه‌ای که فقط ۳ ستون دارد.'],
      },
      {
        id: 'ex-2-2-grid-whatif',
        tier: 'what-if',
        title: 'آزمایشگاه What-If: تراز کل شبکه با place-items: center',
        bookPage: '۱۴۰',
        summary: 'کوتاه‌نویسی بی‌نظیر CSS Grid برای وسط‌چین کردن افقی و عمودی تمام سلول‌های یک شبکه در یک خط.',
        language: 'html',
        engine: 'web',
        code: `<div class="center-box">
  <div>🎯 دقیقاً در مرکز مطلق (فقط با ۲ خط CSS Grid!)</div>
</div>`,
        cssCode: `.center-box {
  display: grid;
  place-items: center;
  height: 150px;
  background: #ecfdf5;
  border: 2px dashed #10b981;
  border-radius: 12px;
  font-weight: bold;
  color: #065f46;
}`,
        teacherTalkingPoints: [
          'کوتاه‌ترین راه وسط‌چین کردن در دنیای CSS مدرن همین ۲ خط است: display: grid; place-items: center;!',
        ],
        lineExplanations: [
          {line: 3, explanation: 'place-items ترکیبی از align-items و justify-items است.'},
        ],
        commonMistakes: ['ندادن height کافی به ظرف والد هنگام تست وسط‌چین عمودی.'],
      },
    ],
  },

  // =========================================================================
  // CONCEPT 6: Positioning & Responsive Media Queries
  // =========================================================================
  {
    id: 'les-2-2-position-media',
    order: 6,
    title: 'موقعیت‌دهی (relative، absolute، fixed، sticky، z-index) و واکنش‌گرایی (@media)',
    bookPage: '۱۴۰ تا ۱۴۲',
    whyWeNeedIt: {
      realWorldProblem:
        'نشان تخفیف گوشه کارت محصول (absolute)، دکمه شناور پشتیبانی آنلاین در گوشه پایین صفحه (fixed)، نوار منویی که هنگام اسکرول بالا می‌چسبد (sticky) و سازگاری کامل صفحه روی موبایل (@media) همگی با این دو ابزار کلیدی CSS ساخته می‌شوند.',
      analogy:
        'position: relative مثل «میخکوب کردن تابلوی اعلانات روی دیوار» است و position: absolute مثل «چسباندن یک برچسب زرد دقیقاً به گوشه بالا-چپِ همان تابلو»! اما position: fixed مثل «برچسبی است که روی شیشه مانیتور چسبیده و با اسکرول کردن صفحه تکان نمی‌خورد»!',
    },
    syntaxAnatomy: {
      template: `.card { position: relative; }
.badge { position: absolute; top: 8px; left: 8px; }
.chat-widget { position: fixed; bottom: 14px; left: 14px; z-index: 50; }
@media (max-width: 600px) { .grid { grid-template-columns: 1fr; } }`,
      parts: [
        {token: 'relative + absolute', role: 'عنصر absolute نسبت به نزدیک‌ترین والد دارای position: relative موقعیت می‌گیرد.'},
        {token: 'fixed + bottom: 14px', role: 'عنصر را به پنجره مرورگر قفل می‌کند (اصلاح top: 600px ص ۱۴۱ کتاب).'},
        {token: 'z-index', role: 'ترتیب لایه‌های روی هم؛ عدد بالاتر روی عناصر پایین‌تر نمایش داده می‌شود.'},
        {token: '@media (max-width: ...)', role: 'قوانین شرطی CSS که فقط در عرض‌های مشخص (مثلاً موبایل زیر ۶۰۰px) فعال می‌شوند.'},
      ],
    },
    behindTheScenes: [
      'باگ واقعی ص ۱۴۱ کتاب درسی: برای دکمه چت شناور (chat-widget) از position: fixed همراه با top: 600px استفاده شده بود! روی مانیتورهای کوچک یا موبایل که ارتفاعشان کمتر از ۶۰۰ پیکسل است، دکمه چت کاملاً از صفحه بیرون می‌افتد! راه‌حل استاندارد همیشه bottom: 14px و left: 14px است.',
      'بزرگ‌ترین تله position: absolute: اگر والدش position: relative نداشته باشد، عنصر تا لبه‌های کل صفحه <body> پرواز می‌کند!',
      'در طراحی واکنش‌گرا، رویکرد Mobile-First (نوشتن استایل موبایل به عنوان پایه و افزودن @media (min-width: 768px) برای دسکتاپ) دقیقاً همان مبنایی است که بوت‌استرپ ۵ (پودمان ۳) روی آن ساخته شده است.',
    ],
    goldenTips: [
      'همیشه برای دکمه‌های شناور گوشه پایین (چت آنلاین یا دکمه بازگشت به بالا) از bottom و left/right استفاده کنید نه top با عدد بزرگ.',
      'همیشه تگ <meta name="viewport" content="width=device-width, initial-scale=1.0"> را در HTML داشته باشید تا @media روی گوشی واقعی درست عمل کند.',
    ],
    wrongVsRight: [
      {
        title: 'موقعیت‌دهی ویجت چت با top: 600px (باگ ص ۱۴۱ کتاب)',
        wrongCode: `.chat-widget { position: fixed; top: 600px; left: 16px; }`,
        rightCode: `.chat-widget { position: fixed; bottom: 16px; left: 16px; z-index: 50; }`,
        explanation: 'با bottom: 16px ویجت چت روی هر سایز صفحه (موبایل، لپ‌تاپ یا مانیتور بزرگ) همیشه دقیقاً در پایین صفحه باقی می‌ماند.',
      },
      {
        title: 'فراموش کردن position: relative روی والد کارت دارای نشان absolute',
        wrongCode: `.card { padding: 12px; }
.discount-badge { position: absolute; top: 8px; left: 8px; }`,
        rightCode: `.card { position: relative; padding: 12px; }
.discount-badge { position: absolute; top: 8px; left: 8px; }`,
        explanation: 'بدون relative روی .card، نشان تخفیف به گوشه کل صفحه می‌چسبد نه گوشه کارت!',
      },
    ],
    examples: [
      {
        id: 'ex-2-2-pos-basic',
        tier: 'basic',
        title: 'نشان تخفیف روی کارت (relative/absolute) و ویجت چت ثابت (اصلاح ص ۱۴۱)',
        bookPage: '۱۴۱',
        summary: 'نمایش هم‌زمان الگوی والد relative + فرزند absolute و دکمه چت fixed اصلاح‌شده با bottom: 14px.',
        language: 'html',
        engine: 'web',
        code: `<article class="book-card">
  <span class="off-badge">۲۰٪ تخفیف</span>
  <img src="book1.jpg" alt="طراح سایت" />
  <h3>کتاب طراح سایت ۱۴۰۵</h3>
  <p>۴۵٬۰۰۰ تومان</p>
</article>
<div class="chat-widget">💬 پشتیبانی آنلاین</div>`,
        cssCode: `.book-card {
  position: relative;
  width: 220px;
  border: 1px solid #cbd5e1;
  border-radius: 12px;
  padding: 12px;
  text-align: center;
  background: #fff;
}
.book-card img { width: 100%; border-radius: 8px; }
.off-badge {
  position: absolute;
  top: 10px;
  left: 10px;
  background: #e11d48;
  color: #fff;
  padding: 4px 10px;
  border-radius: 999px;
  font-size: 11px;
  font-weight: bold;
}
.chat-widget {
  position: fixed;
  bottom: 14px; /* اصلاح top: 600px ص ۱۴۱ کتاب */
  left: 14px;
  z-index: 50;
  background: #0f172a;
  color: #fff;
  padding: 8px 14px;
  border-radius: 999px;
  font-size: 12px;
}`,
        teacherTalkingPoints: [
          'از هنرجویان بخواهید خط position: relative را موقتاً پاک کنند تا با چشم ببینند نشان قرمز «۲۰٪ تخفیف» چگونه از کارت بیرون می‌پرد!',
        ],
        lineExplanations: [
          {line: 2, explanation: 'قفل کردن مختصات فرزندان absolute درون کادر کارت.'},
          {line: 24, explanation: 'استفاده استاندارد از bottom: 14px برای سازگاری با همه نمایشگرها.'},
        ],
        commonMistakes: ['گذاشتن top: 600px روی عنصر fixed.'],
        bookCorrection: {
          page: 141,
          issue: 'موقعیت‌دهی ویجت چت با top: 600px در صفحات با ارتفاع کمتر از ۶۰۰ پیکسل باعث مخفی شدن ویجت می‌شد.',
          fix: 'مقدار استاندارد bottom: 14px و left: 14px با z-index جایگزین شد.',
        },
      },
      {
        id: 'ex-2-2-pos-practical',
        tier: 'practical',
        title: 'واکنش‌گرایی زنده با @media (تبدیل خودکار ۳ ستون به ۱ ستون در موبایل)',
        bookPage: '۱۴۲',
        summary: 'استفاده از Media Query برای تغییر چیدمان و رنگ سرصفحه در عرض موبایل (روی دکمه موبایل بالای پیش‌نمایش کلیک کنید!).',
        language: 'html',
        engine: 'web',
        code: `<div class="banner">عرض پیش‌نمایش را تغییر دهید (دسکتاپ ⇄ موبایل)!</div>
<div class="responsive-grid">
  <div class="box">بخش ۱</div>
  <div class="box">بخش ۲</div>
  <div class="box">بخش ۳</div>
</div>`,
        cssCode: `.banner { background: #0284c7; color: #fff; padding: 10px; border-radius: 8px; margin-bottom: 10px; text-align: center; font-weight: bold; }
.responsive-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; }
.box { background: #f1f5f9; border: 1px solid #cbd5e1; padding: 16px; border-radius: 8px; text-align: center; font-weight: bold; }

@media (max-width: 520px) {
  .banner { background: #059669; }
  .responsive-grid { grid-template-columns: 1fr; }
}`,
        teacherTalkingPoints: [
          'دکمه نمای موبایل (۳۷۵px) در نوار بالای پیش‌نمایش را بزنید: بنر سبز می‌شود و ۳ ستون یکپارچه به ۱ ستون تبدیل می‌شوند!',
        ],
        lineExplanations: [
          {line: 5, explanation: 'اعمال قانون ویژه فقط زمانی که عرض نمایشگر ۵۲۰ پیکسل یا کمتر باشد.'},
        ],
        commonMistakes: ['قرار دادن @media در بالای فایل قبل از قوانین عادی (قوانین پایین‌تر آن را خنثی می‌کنند!).'],
      },
      {
        id: 'ex-2-2-pos-combined',
        tier: 'combined',
        title: 'نوار چسبان (position: sticky) هنگام اسکرول لیست طولانی',
        bookPage: '۱۴۱',
        summary: 'نمایش کاربرد مدرن position: sticky برای چسباندن تیتر بخش به سقف جعبه هنگام پیمایش عمودی.',
        language: 'html',
        engine: 'web',
        code: `<div class="scroll-box">
  <div class="sticky-head">📌 نوار عنوان چسبان (اسکرول کنید!)</div>
  <p>آیتم ۱ — فصل پایتون پایه</p>
  <p>آیتم ۲ — فصل ساختارهای داده</p>
  <p>آیتم ۳ — فصل HTML5 معنایی</p>
  <p>آیتم ۴ — فصل CSS3 و چیدمان</p>
  <p>آیتم ۵ — فصل Bootstrap 5.3 RTL</p>
  <p>آیتم ۶ — فصل JavaScript و DOM</p>
  <p>آیتم ۷ — فصل Django و SQLite</p>
</div>`,
        cssCode: `.scroll-box { height: 180px; overflow-y: auto; border: 1px solid #cbd5e1; border-radius: 10px; }
.sticky-head { position: sticky; top: 0; background: #0f172a; color: #fff; padding: 10px 14px; font-weight: bold; }
.scroll-box p { padding: 8px 14px; margin: 0; border-bottom: 1px solid #e2e8f0; }`,
        teacherTalkingPoints: [
          'داخل جعبه اسکرول کنید تا نشان دهید sticky تا قبل از رسیدن به سقف عادی است و سپس به بالا می‌چسبد.',
        ],
        lineExplanations: [
          {line: 2, explanation: 'برای فعال شدن sticky حتماً باید حداقل یک جهت مثل top: 0 مشخص شود.'},
        ],
        commonMistakes: ['تنظیم position: sticky بدون نوشتن top: 0.'],
      },
      {
        id: 'ex-2-2-pos-whatif',
        tier: 'what-if',
        title: 'آزمایشگاه What-If: کنترل لایه‌های روی هم با z-index',
        bookPage: '۱۴۱',
        summary: 'نمایش دو کارت هم‌پوشان و تغییر ترتیب قرارگیری آن‌ها روی هم با z-index.',
        language: 'html',
        engine: 'web',
        code: `<div class="stage">
  <div class="layer layer-a">لایه اول (z-index: 2 ← روی دیگری)</div>
  <div class="layer layer-b">لایه دوم (z-index: 1 ← زیر دیگری)</div>
</div>`,
        cssCode: `.stage { position: relative; height: 140px; background: #f8fafc; border-radius: 10px; }
.layer { position: absolute; width: 220px; padding: 16px; border-radius: 10px; color: #fff; font-weight: bold; font-size: 12px; }
.layer-a { top: 16px; right: 16px; background: #0284c7; z-index: 2; }
.layer-b { top: 52px; right: 90px; background: #7c3aed; z-index: 1; }`,
        teacherTalkingPoints: [
          'به کلاس بگویید z-index فقط روی عناصری کار می‌کند که position آن‌ها غیر از static باشد (مثل relative، absolute یا fixed).',
        ],
        lineExplanations: [
          {line: 3, explanation: 'عدد z-index بزرگ‌تر عنصر آبی را روی عنصر بنفش می‌آورد.'},
        ],
        commonMistakes: ['تلاش برای اعمال z-index روی عنصری که position آن static (پیش‌فرض) است.'],
      },
    ],
  },
];
