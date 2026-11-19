import type {
  ClassroomActivity,
  HomeworkAssignment,
  QuickQuizQuestion,
} from '../../../types/curriculum.ts';

export const UNIT_2_1_ACTIVITIES: ClassroomActivity[] = [
  {
    id: 'act-2-1-table',
    kind: 'workshop',
    title: 'کارگاه جدول قیمت کتاب‌های مرجع نو با thead، tbody، tfoot و colspan',
    bookPage: '۱۰۶',
    estimatedMinutes: 12,
    prompt:
      'جدولی برای نمایش قیمت ۳ کتاب درسی با بخش‌های <caption>، <thead>، <tbody> و ردیف جمع کل در <tfoot> (دارای colspan="2") طراحی کنید.',
    steps: [
      'تگ <table> با استایل border-collapse: collapse و عنوان <caption> ایجاد کنید.',
      'ردیف سرستون‌ها (ردیف، عنوان کتاب، قیمت) را داخل <thead> با تگ <th> بنویسید.',
      '۳ ردیف کتاب را در <tbody> وارد کرده و در <tfoot> با colspan="2" جمع کل را محاسبه کنید.',
    ],
    hints: ['در جدول ۳ ستونه، ردیف tfoot باید یک سلول با colspan="2" و یک سلول برای مبلغ کل داشته باشد.'],
    language: 'html',
    engine: 'web',
    starterCode: `<table style="width:100%;border-collapse:collapse;text-align:right;" border="1">
  <caption>فهرست قیمت کتاب‌های مرجع نو</caption>
  <!-- thead، tbody و tfoot را تکمیل کنید -->
</table>`,
    solutionCode: `<table style="width:100%;border-collapse:collapse;text-align:right;" border="1">
  <caption><strong>فهرست قیمت کتاب‌های درسی ۱۴۰۵</strong></caption>
  <thead style="background:#f1f5f9;">
    <tr><th>ردیف</th><th>عنوان کتاب</th><th>قیمت (تومان)</th></tr>
  </thead>
  <tbody>
    <tr><td>۱</td><td>طراح سایت (یازدهم)</td><td>۴۵٬۰۰۰</td></tr>
    <tr><td>۲</td><td>تولید محتوای الکترونیکی</td><td>۳۸٬۰۰۰</td></tr>
    <tr><td>۳</td><td>توسعه برنامه‌سازی و پایگاه داده</td><td>۵۲٬۰۰۰</td></tr>
  </tbody>
  <tfoot style="background:#e0f2fe;font-weight:bold;">
    <tr><td colspan="2">جمع کل سفارش</td><td>۱۳۵٬۰۰۰ تومان</td></tr>
  </tfoot>
</table>`,
    solutionExplanation: 'استفاده از thead/tbody/tfoot و colspan="2" ساختار کاملاً استاندارد و قابل چاپ می‌سازد.',
    alternativeSolutionCode: `<table border="1" style="width:100%;border-collapse:collapse;">
  <tr><th>عنوان</th><th>قیمت</th></tr>
  <tr><td>طراح سایت</td><td>۴۵٬۰۰۰</td></tr>
  <tr><td>تولید محتوا</td><td>۳۸٬۰۰۰</td></tr>
  <tr><th colspan="2">مجموع: ۸۳٬۰۰۰ تومان</th></tr>
</table>`,
    alternativeSolutionExplanation: 'نسخه فشرده دو ستونه که در ردیف پایانی کل عرض جدول را با colspan="2" ادغام کرده است.',
  },
  {
    id: 'act-2-1-resume',
    kind: 'activity',
    title: 'فعالیت طراحی صفحه معرفی شخصی (رزومه ساده با تیترها و لیست‌ها)',
    bookPage: '۱۰۲ تا ۱۰۴',
    estimatedMinutes: 10,
    prompt:
      'صفحه معرفی یک هنرجوی رشته شبکه و نرم‌افزار بسازید که شامل یک <h1>، پاراگراف معرفی با <strong>، لیست مهارت‌ها با <ul> و لیست ۳ هدف سال تحصیلی با <ol> باشد.',
    steps: [
      'نام خود را در <h1> و معرفی کوتاه را در <p> بنویسید.',
      'بخش مهارت‌ها را با <h2> و لیست <ul> ایجاد کنید.',
      'اهداف سال تحصیلی را با <h2> و لیست مرتب <ol> بنویسید.',
    ],
    hints: ['از تگ‌های معنایی <section> برای تفکیک بخش مهارت‌ها و اهداف استفاده کنید.'],
    language: 'html',
    engine: 'web',
    starterCode: `<main style="padding:12px;">
  <h1>نام و نام خانوادگی شما</h1>
  <!-- معرفی، مهارت‌ها و اهداف را تکمیل کنید -->
</main>`,
    solutionCode: `<main style="padding:14px;border:1px solid #cbd5e1;border-radius:12px;">
  <h1>امیرحسین رضایی — هنرجوی پایه یازدهم</h1>
  <p>علاقه‌مند به <strong>طراحی وب</strong> و <em>برنامه‌نویسی پایتون</em> در هنرستان فنی‌وحرفه‌ای.</p>
  <section>
    <h2>مهارت‌های فنی</h2>
    <ul>
      <li>پایتون پایه و ساختارهای داده</li>
      <li>ساختار معنایی HTML5</li>
    </ul>
  </section>
  <section>
    <h2>اهداف سال ۱۴۰۵</h2>
    <ol>
      <li>ساخت فروشگاه آنلاین کتاب «مرجع نو»</li>
      <li>راه‌اندازی وب‌اپلیکیشن آب‌وهوا با جنگو</li>
    </ol>
  </section>
</main>`,
    solutionExplanation: 'رعایت سلسله‌مراتب درست h1 ← h2 و انتخاب درست بین ul (بی‌ترتیب) و ol (دارای اولویت).',
    alternativeSolutionCode: `<article>
  <h1>رزومه کوتاه</h1>
  <dl>
    <dt><strong>رشته:</strong></dt><dd>شبکه و نرم‌افزار رایانه</dd>
    <dt><strong>مهارت:</strong></dt><dd>HTML5 و Python</dd>
  </dl>
</article>`,
    alternativeSolutionExplanation: 'استفاده از لیست تعریفی <dl> برای نمایش جفت «عنوان: توضیح» در رزومه.',
  },
  {
    id: 'act-2-1-order-form',
    kind: 'project',
    title: 'پروژه فرم ثبت‌نام کتابخانه هنرستان با label/for، name و fieldset',
    bookPage: '۱۰۹ تا ۱۱۰',
    estimatedMinutes: 15,
    prompt:
      'فرم عضویت کتابخانه بسازید که نام کامل (text)، ایمیل (email)، پایه تحصیلی (select)، علاقه‌مندی‌ها (checkbox) و دکمه ارسال داشته باشد؛ همه فیلدها باید صفت name و اتصال for/id داشته باشند.',
    steps: [
      'فرم را با <form method="post"> و کادر <fieldset> بسازید.',
      'برای نام و ایمیل از <label for="..."> و <input id="..." name="..." required> استفاده کنید.',
      'پایه تحصیلی را با <select name="grade"> و علاقه‌مندی‌ها را با checkbox بسازید.',
    ],
    hints: ['برای چک‌باکس‌ها می‌توانیم چند گزینه هم‌زمان انتخاب کنیم؛ بنابراین برای هر کدام value مشخص بگذارید.'],
    language: 'html',
    engine: 'web',
    starterCode: `<form action="#" method="post">
  <fieldset>
    <legend>عضویت در کتابخانه هنرستان</legend>
    <!-- فیلدها را اینجا اضافه کنید -->
  </fieldset>
</form>`,
    solutionCode: `<form action="#" method="post" style="max-width:440px;">
  <fieldset style="border:1px solid #cbd5e1;border-radius:10px;padding:14px;">
    <legend style="font-weight:bold;">عضویت در کتابخانه هنرستان</legend>
    <p>
      <label for="st_name">نام کامل:</label><br />
      <input id="st_name" name="student_name" type="text" required style="width:100%;padding:6px;" />
    </p>
    <p>
      <label for="st_email">ایمیل:</label><br />
      <input id="st_email" name="email" type="email" required style="width:100%;padding:6px;" />
    </p>
    <p>
      <label for="st_grade">پایه تحصیلی:</label><br />
      <select id="st_grade" name="grade" style="padding:6px;">
        <option value="10">دهم</option>
        <option value="11" selected>یازدهم</option>
        <option value="12">دوازدهم</option>
      </select>
    </p>
    <p>
      حوزه مطالعه:<br />
      <label><input type="checkbox" name="topics" value="python" /> پایتون</label>
      <label style="margin-right:10px;"><input type="checkbox" name="topics" value="web" /> طراحی وب</label>
    </p>
    <button type="submit" style="background:#0284c7;color:#fff;border:none;padding:8px 16px;border-radius:8px;">ثبت عضویت</button>
  </fieldset>
</form>`,
    solutionExplanation: 'پوشش کامل الزامات فرم استاندارد: method="post"، اتصال for/id، وجود صفت name و اعتبارسنجی بومی HTML5.',
    alternativeSolutionCode: `<form action="#" method="post">
  <label>نام: <input name="name" required /></label><br />
  <label>پایه: <input name="grade" type="number" min="10" max="12" value="11" /></label><br />
  <button type="submit">ارسال</button>
</form>`,
    alternativeSolutionExplanation: 'روش تودرتو کردن <input> درون <label> که اتصال برچسب را بدون نیاز به تکرار id/for برقرار می‌کند.',
  },
  {
    id: 'act-2-1-schedule-rowspan',
    kind: 'workshop',
    title: 'کارگاه جدول برنامه امتحانات با rowspan و colspan',
    bookPage: '۱۰۶ تا ۱۰۷',
    estimatedMinutes: 12,
    prompt:
      'جدول برنامه امتحانات دو روز (شنبه و یکشنبه) بسازید که در آن نام هر روز با rowspan="2" دو نوبت صبح و عصر را در بر بگیرد.',
    steps: [
      'جدول ۳ ستونه (روز، نوبت، نام درس) ایجاد کنید.',
      'برای روز شنبه rowspan="2" قرار دهید و ردیف نوبت عصر را فقط با ۲ سلول تکمیل کنید.',
    ],
    hints: ['مطمئن شوید مجموع ستون‌ها در هر ردیف برابر ۳ باشد.'],
    language: 'html',
    engine: 'web',
    starterCode: `<table border="1" style="width:100%;border-collapse:collapse;text-align:center;">
  <thead><tr><th>روز</th><th>نوبت</th><th>درس</th></tr></thead>
  <tbody>
    <!-- ردیف‌های با rowspan را بنویسید -->
  </tbody>
</table>`,
    solutionCode: `<table border="1" style="width:100%;border-collapse:collapse;text-align:center;">
  <thead style="background:#e0f2fe;">
    <tr><th style="padding:8px;">روز</th><th style="padding:8px;">نوبت</th><th style="padding:8px;">درس امتحانی</th></tr>
  </thead>
  <tbody>
    <tr><td rowspan="2" style="padding:8px;font-weight:bold;">شنبه</td><td style="padding:8px;">ساعت ۸:۳۰</td><td style="padding:8px;">پایتون (واحد ۱.۱)</td></tr>
    <tr><td style="padding:8px;">ساعت ۱۰:۳۰</td><td style="padding:8px;">طراحی HTML5</td></tr>
    <tr><td rowspan="2" style="padding:8px;font-weight:bold;">یکشنبه</td><td style="padding:8px;">ساعت ۸:۳۰</td><td style="padding:8px;">CSS و چیدمان</td></tr>
    <tr><td style="padding:8px;">ساعت ۱۰:۳۰</td><td style="padding:8px;">جاوااسکریپت</td></tr>
  </tbody>
</table>`,
    solutionExplanation: 'تسلط کامل بر ادغام عمودی سلول‌ها بدون به‌هم‌ریختگی ستون‌های جدول.',
    alternativeSolutionCode: `<table border="1" style="width:100%;border-collapse:collapse;text-align:center;">
  <tr><th colspan="2">برنامه شنبه</th></tr>
  <tr><td>۸:۳۰</td><td>پایتون</td></tr>
  <tr><td>۱۰:۳۰</td><td>HTML5</td></tr>
</table>`,
    alternativeSolutionExplanation: 'استفاده از تیتر ادغام‌شده افقی (colspan="2") برای تفکیک هر روز.',
  },
  {
    id: 'act-2-1-book-gallery',
    kind: 'activity',
    title: 'فعالیت ساخت گالری کتاب‌های مرجع نو با figure و figcaption',
    bookPage: '۹۴ و ۱۰۵',
    estimatedMinutes: 10,
    prompt:
      'سه تصویر book1.jpg، book2.jpg و book3.jpg را درون تگ‌های <figure> با <figcaption> مناسب، صفت alt توصیفی و width="160" (بدون px) نمایش دهید.',
    steps: [
      'یک ظرف انعطاف‌پذیر برای کنار هم قرار گرفتن تصاویر بسازید.',
      'برای هر کتاب یک <figure> شامل <img ... width="160" /> و <figcaption> بنویسید.',
    ],
    hints: ['در HTML5 واحد px را کنار عدد width ننویسید.'],
    language: 'html',
    engine: 'web',
    starterCode: `<section style="display:flex;gap:12px;flex-wrap:wrap;">
  <!-- سه figure برای سه کتاب اضافه کنید -->
</section>`,
    solutionCode: `<section style="display:flex;gap:12px;flex-wrap:wrap;">
  <figure style="margin:0;border:1px solid #cbd5e1;padding:10px;border-radius:10px;text-align:center;">
    <img src="book1.jpg" alt="جلد کتاب طراح سایت یازدهم" width="160" height="110" />
    <figcaption>طراح سایت (یازدهم)</figcaption>
  </figure>
  <figure style="margin:0;border:1px solid #cbd5e1;padding:10px;border-radius:10px;text-align:center;">
    <img src="book2.jpg" alt="جلد کتاب تولید محتوا دهم" width="160" height="110" />
    <figcaption>تولید محتوا (دهم)</figcaption>
  </figure>
  <figure style="margin:0;border:1px solid #cbd5e1;padding:10px;border-radius:10px;text-align:center;">
    <img src="book3.jpg" alt="جلد کتاب توسعه برنامه‌سازی" width="160" height="110" />
    <figcaption>توسعه برنامه‌سازی</figcaption>
  </figure>
</section>`,
    solutionExplanation: 'کاربرد صحیح figure/figcaption، alt دقیق و ابعاد استاندارد بدون px.',
    alternativeSolutionCode: `<ul style="list-style:none;display:flex;gap:12px;padding:0;">
  <li><img src="book1.jpg" alt="طراح سایت" width="140" /></li>
  <li><img src="book2.jpg" alt="تولید محتوا" width="140" /></li>
</ul>`,
    alternativeSolutionExplanation: 'چیدمان گالری تصاویر در قالب لیست معنایی <ul>/<li>.',
  },
  {
    id: 'act-2-1-semantic-blog',
    kind: 'workshop',
    title: 'کارگاه تبدیل صفحه مبتنی بر div به ساختار معنایی HTML5',
    bookPage: '۱۱۱ تا ۱۱۲',
    estimatedMinutes: 10,
    prompt:
      'کد زیر تمام بخش‌ها را با <div> ساخته است. آن را با تگ‌های معنایی header، nav، main، article، aside و footer بازنویسی کنید.',
    steps: [
      'بالای صفحه را به <header> و منو را به <nav> تبدیل کنید.',
      'بخش مقاله را درون <main> و <article>، بخش کناری را در <aside> و پایین صفحه را در <footer> بگذارید.',
    ],
    hints: ['محتوای متنی را حفظ کنید و فقط نام تگ‌ها را معنایی کنید.'],
    language: 'html',
    engine: 'web',
    starterCode: `<div><h1>وبلاگ هنرستان</h1></div>
<div><a href="#p1">مقاله اول</a></div>
<div>
  <div><h2>چرا HTML5؟</h2><p>ساختار معنایی سئو را بهبود می‌دهد.</p></div>
  <div>لینک‌های مرتبط</div>
</div>
<div>تمام حقوق محفوظ است</div>`,
    solutionCode: `<header style="background:#0284c7;color:#fff;padding:10px;border-radius:8px;">
  <h1 style="margin:0;font-size:18px;">وبلاگ هنرستان</h1>
</header>
<nav style="background:#e0f2fe;padding:8px;margin:8px 0;border-radius:8px;">
  <a href="#p1">مقاله اول</a>
</nav>
<main style="display:grid;grid-template-columns:2fr 1fr;gap:10px;">
  <article id="p1" style="border:1px solid #cbd5e1;padding:10px;border-radius:8px;">
    <h2 style="margin-top:0;">چرا HTML5؟</h2>
    <p>ساختار معنایی سئو و دسترس‌پذیری سایت را به‌شدت بهبود می‌دهد.</p>
  </article>
  <aside style="background:#fef3c7;padding:10px;border-radius:8px;">لینک‌های مرتبط</aside>
</main>
<footer style="margin-top:8px;background:#0f172a;color:#fff;padding:8px;border-radius:8px;font-size:12px;">
  تمام حقوق محفوظ است — ۱۴۰۵
</footer>`,
    solutionExplanation: 'جایگزینی divهای بی‌معنا با تگ‌های استاندارد HTML5 باعث خوانایی کد و درک بهتر گوگل می‌شود.',
    alternativeSolutionCode: `<header><h1>وبلاگ</h1><nav><a href="#p1">مقاله</a></nav></header>
<main><article id="p1"><h2>چرا HTML5؟</h2><p>ساختار تمیز و استاندارد.</p></article></main>
<footer>۱۴۰۵</footer>`,
    alternativeSolutionExplanation: 'قرار دادن <nav> درون <header> نیز یکی از الگوهای بسیار رایج و استاندارد در HTML5 است.',
  },
  {
    id: 'act-2-1-faq-details',
    kind: 'activity',
    title: 'فعالیت پرسش‌های متداول (FAQ) صرفاً با تگ‌های بومی details و summary',
    bookPage: '۱۱۲',
    estimatedMinutes: 8,
    prompt:
      'سه پرسش متداول فروشگاه کتاب «مرجع نو» را بدون یک خط جاوااسکریپت و تنها با تگ‌های <details> و <summary> بسازید تا با کلیک باز و بسته شوند.',
    steps: [
      'برای هر پرسش یک تگ <details> بسازید.',
      'عنوان پرسش را در <summary> و پاسخ را در <p> بنویسید.',
    ],
    hints: ['افزودن صفت open به اولین <details> باعث می‌شود به صورت پیش‌فرض باز باشد.'],
    language: 'html',
    engine: 'web',
    starterCode: `<section>
  <h2>پرسش‌های متداول مرجع نو</h2>
  <!-- تگ‌های details و summary را اینجا بنویسید -->
</section>`,
    solutionCode: `<section style="display:grid;gap:8px;">
  <h2 style="margin:0;">پرسش‌های متداول مرجع نو</h2>
  <details open style="border:1px solid #cbd5e1;padding:10px;border-radius:8px;">
    <summary style="font-weight:bold;cursor:pointer;">زمان ارسال کتاب‌ها چقدر است؟</summary>
    <p style="margin-bottom:0;">سفارش‌ها بین ۲ تا ۴ روز کاری تحویل پست می‌شوند.</p>
  </details>
  <details style="border:1px solid #cbd5e1;padding:10px;border-radius:8px;">
    <summary style="font-weight:bold;cursor:pointer;">آیا ارسال به شهرستان هم دارید؟</summary>
    <p style="margin-bottom:0;">بله، به تمامی شهرهای ایران ارسال انجام می‌شود.</p>
  </details>
</section>`,
    solutionExplanation: 'تگ‌های معنایی details/summary تعامل باز و بسته شدن (Accordion) را بومی در HTML5 فراهم می‌کنند.',
    alternativeSolutionCode: `<dl>
  <dt><strong>زمان ارسال؟</strong></dt>
  <dd>۲ تا ۴ روز کاری.</dd>
</dl>`,
    alternativeSolutionExplanation: 'نمایش ثابت پرسش و پاسخ با لیست تعریفی <dl> در مواقعی که نمی‌خواهیم پاسخ مخفی باشد.',
  },
  {
    id: 'act-2-1-marjanow-full',
    kind: 'project',
    title: 'پروژه جامع واحد ۲.۱: صفحه اصلی کامل فروشگاه کتاب «مرجع نو»',
    bookPage: '۱۰۹ تا ۱۱۳',
    estimatedMinutes: 15,
    prompt:
      'تمامی آموخته‌های واحد ۲.۱ (header، nav، article تصویر کتاب، جدول قیمت و فرم سفارش با name) را در یک صفحه منسجم و استاندارد ترکیب کنید.',
    steps: [
      'سرصفحه و منو با لینک‌های لنگر (#books، #prices، #order) بسازید.',
      'در <main> یک معرفی کتاب، یک جدول قیمت کوتاه و یک فرم سفارش کامل قرار دهید.',
      'پاورقی <footer> با شماره تماس و ایمیل اضافه کنید.',
    ],
    hints: ['از لنگرهای #id در منو برای پیمایش سریع بین بخش‌ها استفاده کنید.'],
    language: 'html',
    engine: 'web',
    starterCode: `<header><h1>فروشگاه کتاب مرجع نو</h1></header>
<main>
  <!-- بخش کتاب، جدول قیمت و فرم سفارش -->
</main>
<footer>© ۱۴۰۵ مرجع نو</footer>`,
    solutionCode: `<header style="background:#0f172a;color:#fff;padding:14px;border-radius:10px;">
  <h1 style="margin:0 0 8px;font-size:20px;">فروشگاه کتاب‌های درسی «مرجع نو»</h1>
  <nav style="display:flex;gap:14px;">
    <a href="#intro" style="color:#7dd3fc;">معرفی</a>
    <a href="#prices" style="color:#7dd3fc;">قیمت‌ها</a>
    <a href="#buy" style="color:#7dd3fc;">ثبت سفارش</a>
  </nav>
</header>
<main style="margin:14px 0;display:grid;gap:14px;">
  <article id="intro" style="border:1px solid #cbd5e1;padding:12px;border-radius:10px;display:flex;gap:12px;align-items:center;">
    <img src="book1.jpg" alt="طراح سایت یازدهم" width="130" height="90" />
    <div><h2 style="margin:0 0 4px;">کتاب طراح سایت ۱۴۰۵</h2><p style="margin:0;">پرفروش‌ترین منبع هنرستانی سال.</p></div>
  </article>
  <section id="prices">
    <table border="1" style="width:100%;border-collapse:collapse;">
      <thead><tr style="background:#f1f5f9;"><th>کتاب</th><th>قیمت</th></tr></thead>
      <tbody><tr><td>طراح سایت</td><td>۴۵٬۰۰۰ تومان</td></tr></tbody>
    </table>
  </section>
  <section id="buy" style="border:1px solid #cbd5e1;padding:12px;border-radius:10px;">
    <h3 style="margin-top:0;">سفارش سریع</h3>
    <form action="#" method="post">
      <label for="buyer">نام خریدار:</label>
      <input id="buyer" name="buyer" type="text" required />
      <button type="submit">ثبت</button>
    </form>
  </section>
</main>
<footer style="background:#f1f5f9;padding:10px;border-radius:8px;font-size:12px;">
  تماس: <a href="tel:02188001122">021-88001122</a> | فروشگاه مرجع نو ۱۴۰۵
</footer>`,
    solutionExplanation: 'جمع‌بندی کامل کل واحد ۲.۱ مطابق تمام معیارهای جدول ارزشیابی ص ۱۱۴–۱۱۵ کتاب.',
    alternativeSolutionCode: `<header><h1>مرجع نو</h1></header>
<main><article><h2>طراح سایت</h2><img src="book1.jpg" alt="کتاب" width="120" /></article></main>
<footer>مرجع نو ۱۴۰۵</footer>`,
    alternativeSolutionExplanation: 'اسکلت مینیمال برای شروع سریع پیش‌نمونه (Wireframe) در کلاس.',
  },
];

export const UNIT_2_1_HOMEWORKS: HomeworkAssignment[] = [
  {
    id: 'hw-2-1-01',
    number: 1,
    title: 'اسکلت استاندارد HTML5 فارسی برای صفحه «درباره هنرستان»',
    difficulty: 'easy',
    bookPage: '۹۹ تا ۱۰۲',
    estimatedMinutes: 10,
    prompt:
      'یک صفحه HTML5 فارسی با dir="rtl" بسازید که شامل یک تیتر h1، دو پاراگراف معرفی (با کلمات برجسته strong و mark) و یک خط افقی hr باشد.',
    sampleOutput: `تیتر اصلی هنرستان + دو پاراگراف راست‌به‌چپ با تأکید معنایی`,
    hint: 'فراموش نکنید جهت صحیح راست‌به‌چپ dir="rtl" است نه trl.',
    solutionCode: `<div dir="rtl" style="padding:14px;border:1px solid #cbd5e1;border-radius:10px;">
  <h1>هنرستان فنی‌وحرفه‌ای نمونه</h1>
  <p>در رشته <strong>شبکه و نرم‌افزار</strong> مهارت‌های <mark>طراحی وب</mark> و برنامه‌نویسی آموزش داده می‌شود.</p>
  <hr />
  <p>سال تحصیلی ۱۴۰۵ — پایه یازدهم</p>
</div>`,
    solutionExplanation: 'تمرین اسکلت پایه فارسی، تیتر اصلی و تگ‌های معنایی متن.',
    language: 'html',
    engine: 'web',
  },
  {
    id: 'hw-2-1-02',
    number: 2,
    title: 'فهرست منوی رستوران با لیست‌های تو در تو (ul داخل li)',
    difficulty: 'easy',
    bookPage: '۱۰۳ تا ۱۰۴',
    estimatedMinutes: 10,
    prompt:
      'منوی یک رستوران شامل دو دسته اصلی «غذاهای سنتی» و «نوشیدنی‌ها» بسازید که زیر هر دسته یک لیست تو در تو از ۲ آیتم وجود داشته باشد.',
    sampleOutput: `لیست اصلی با دو زیرلیست استاندارد و معتبر در W3C`,
    hint: 'زیرلیست <ul> را درون تگ <li> دسته والد قرار دهید.',
    solutionCode: `<ul>
  <li><strong>غذاهای سنتی</strong>
    <ul>
      <li>قورمه‌سبزی</li>
      <li>کباب کوبیده</li>
    </ul>
  </li>
  <li><strong>نوشیدنی‌ها</strong>
    <ul>
      <li>دوغ محلی</li>
      <li>شربت زعفران</li>
    </ul>
  </li>
</ul>`,
    solutionExplanation: 'رعایت استاندارد تودرتویی لیست‌ها در HTML5.',
    language: 'html',
    engine: 'web',
  },
  {
    id: 'hw-2-1-03',
    number: 3,
    title: 'کارت کتاب با تصویر استاندارد، alt و قیمت تخفیف‌دار (del)',
    difficulty: 'easy',
    bookPage: '۹۴ و ۱۰۵',
    estimatedMinutes: 10,
    prompt:
      'یک تگ <figure> با تصویر book2.jpg (عرض عددی 180 بدون px و صفت alt دقیق)، زیرنویس و نمایش قیمت خط‌خورده ۵۰٬۰۰۰ و قیمت جدید ۳۸٬۰۰۰ تومان طراحی کنید.',
    sampleOutput: `تصویر جلد کتاب + زیرنویس + قیمت خط‌خورده و قیمت جدید`,
    hint: 'از تگ‌های <figure>، <figcaption>، <del> و <strong> استفاده کنید.',
    solutionCode: `<figure style="border:1px solid #cbd5e1;padding:12px;border-radius:10px;max-width:240px;text-align:center;">
  <img src="book2.jpg" alt="جلد کتاب تولید محتوا دهم" width="180" height="120" />
  <figcaption><strong>تولید محتوای الکترونیکی</strong></figcaption>
  <p><del>۵۰٬۰۰۰</del> ← <strong>۳۸٬۰۰۰ تومان</strong></p>
</figure>`,
    solutionExplanation: 'ترکیب استاندارد تصویر بدون px، متن جایگزین و تگ del.',
    language: 'html',
    engine: 'web',
  },
  {
    id: 'hw-2-1-04',
    number: 4,
    title: 'واژه‌نامه ۵ اصطلاح وب با لیست تعریفی (dl / dt / dd)',
    difficulty: 'easy',
    bookPage: '۸۶ تا ۹۲ و ۱۰۴',
    estimatedMinutes: 10,
    prompt:
      'پنج مفهوم کلیدی ابتدای فصل (DNS، HTTP، دامنه، هاست، SEO) را در قالب یک لیست تعریفی استاندارد HTML5 (<dl>) توضیح دهید.',
    sampleOutput: `فهرست مرتب ۵ اصطلاح وب همراه با تعریف هر یک`,
    hint: 'هر اصطلاح در <dt> و تعریف آن در <dd> قرار می‌گیرد.',
    solutionCode: `<dl style="line-height:1.8;">
  <dt><strong>DNS</strong></dt><dd>دفترچه تلفن اینترنت برای تبدیل نام دامنه به IP.</dd>
  <dt><strong>HTTP</strong></dt><dd>پروتکل انتقال صفحات وب بین مرورگر و سرور.</dd>
  <dt><strong>دامنه (Domain)</strong></dt><dd>نشانی متنی خوانای وب‌سایت.</dd>
  <dt><strong>هاست (Host)</strong></dt><dd>فضای میزبانی فایل‌های وب‌سایت روی سرور.</dd>
  <dt><strong>SEO</strong></dt><dd>بهینه‌سازی سایت برای رتبه‌گیری بهتر در موتورهای جستجو.</dd>
</dl>`,
    solutionExplanation: 'مرور مفاهیم پایه فصل و تمرین تگ‌های لیست تعریفی.',
    language: 'html',
    engine: 'web',
  },
  {
    id: 'hw-2-1-05',
    number: 5,
    title: 'جدول کارنامه ۳ درس با thead، tbody و ردیف معدل (colspan)',
    difficulty: 'medium',
    bookPage: '۱۰۶',
    estimatedMinutes: 12,
    prompt:
      'جدول کارنامه شامل ستون‌های کد درس، نام درس و نمره بسازید و در <tfoot> با ادغام دو ستون اول، معدل را نمایش دهید.',
    sampleOutput: `جدول ۳ ستونه استاندارد با ردیف جمع‌بندی معدل`,
    hint: 'در tfoot بنویسید <td colspan="2">معدل کل</td>.',
    solutionCode: `<table border="1" style="width:100%;border-collapse:collapse;text-align:right;">
  <caption>کارنامه نیم‌سال اول</caption>
  <thead style="background:#f1f5f9;"><tr><th>کد</th><th>نام درس</th><th>نمره</th></tr></thead>
  <tbody>
    <tr><td>۱۰۱</td><td>طراح سایت</td><td>۱۹.۵</td></tr>
    <tr><td>۱۰۲</td><td>تولید محتوا</td><td>۱۸.۵</td></tr>
    <tr><td>۱۰۳</td><td>پایگاه داده</td><td>۱۹.۰</td></tr>
  </tbody>
  <tfoot style="background:#ecfdf5;font-weight:bold;">
    <tr><td colspan="2">معدل کل</td><td>۱۹.۰</td></tr>
  </tfoot>
</table>`,
    solutionExplanation: 'کاربرد صحیح ساختار سه‌بخشی جدول و ادغام افقی ستون‌ها.',
    language: 'html',
    engine: 'web',
  },
  {
    id: 'hw-2-1-06',
    number: 6,
    title: 'فرم تماس با ما (نام، ایمیل، موضوع select و پیام textarea)',
    difficulty: 'medium',
    bookPage: '۱۰۹ تا ۱۱۰',
    estimatedMinutes: 15,
    prompt:
      'فرم تماس با پشتیبانی بسازید که تمامی فیلدها دارای <label for>، id، name و اعتبارسنجی required باشند.',
    sampleOutput: `فرم کامل تماس با ۴ فیلد معتبر و دکمه ارسال`,
    hint: 'برای پیام چندخطی از <textarea rows="4" name="message"> استفاده کنید.',
    solutionCode: `<form action="#" method="post" style="max-width:420px;display:grid;gap:10px;">
  <label for="c_name">نام شما:<input id="c_name" name="name" type="text" required style="width:100%;" /></label>
  <label for="c_mail">ایمیل:<input id="c_mail" name="email" type="email" required style="width:100%;" /></label>
  <label for="c_topic">موضوع:
    <select id="c_topic" name="topic" style="width:100%;">
      <option value="order">پیگیری سفارش</option>
      <option value="support">پشتیبانی فنی</option>
    </select>
  </label>
  <label for="c_msg">متن پیام:<textarea id="c_msg" name="message" rows="3" required style="width:100%;"></textarea></label>
  <button type="submit">ارسال پیام</button>
</form>`,
    solutionExplanation: 'رعایت کامل استاندارد فرم‌های HTML5 همراه با صفت name.',
    language: 'html',
    engine: 'web',
  },
  {
    id: 'hw-2-1-07',
    number: 7,
    title: 'برنامه کلاسی با ادغام عمودی rowspan برای زنگ‌های دو ساعته',
    difficulty: 'medium',
    bookPage: '۱۰۷',
    estimatedMinutes: 15,
    prompt:
      'جدول دو روز دوشنبه و سه‌شنبه را طوری بسازید که دوشنبه یک کارگاه ۳ ساعته (rowspan="3") و سه‌شنبه دو درس مجزا داشته باشد.',
    sampleOutput: `جدول دقیق بدون سلول اضافه یا کم`,
    hint: 'بعد از سطر اول دوشنبه، دو سطر بعدی هر کدام یک ستون کمتر دارند.',
    solutionCode: `<table border="1" style="width:100%;border-collapse:collapse;text-align:center;">
  <thead><tr><th>روز</th><th>ساعت</th><th>درس</th></tr></thead>
  <tbody>
    <tr><td rowspan="3">دوشنبه</td><td>۸ تا ۹</td><td rowspan="3">پروژه کارگاهی طراح سایت</td></tr>
    <tr><td>۹ تا ۱۰</td></tr>
    <tr><td>۱۰ تا ۱۱</td></tr>
    <tr><td rowspan="2">سه‌شنبه</td><td>۸ تا ۹</td><td>ریاضی</td></tr>
    <tr><td>۹ تا ۱۰</td><td>فیزیک</td></tr>
  </tbody>
</table>`,
    solutionExplanation: 'تسلط بر شمارش دقیق سلول‌ها در ادغام چندردیفه.',
    language: 'html',
    engine: 'web',
  },
  {
    id: 'hw-2-1-08',
    number: 8,
    title: 'فرم مرجوعی کالا با آپلود تصویر (enctype) و انتخاب روش بازپرداخت',
    difficulty: 'challenging',
    bookPage: '۱۱۰',
    estimatedMinutes: 18,
    prompt:
      'فرم کامل مرجوعی بسازید که شامل enctype="multipart/form-data"، فیلد شماره فاکتور (number)، دکمه‌های رادیویی روش بازپرداخت (کارت بانکی / کیف پول) و آپلود تصویر باشد.',
    sampleOutput: `فرم چندبخشی آپلود فایل با گروه‌بندی fieldset`,
    hint: 'دو دکمه رادیویی حتماً باید name یکسان (مثلاً refund_method) داشته باشند.',
    solutionCode: `<form action="#" method="post" enctype="multipart/form-data" style="max-width:440px;">
  <fieldset style="padding:12px;border-radius:8px;">
    <legend>درخواست مرجوعی</legend>
    <p><label for="inv">شماره فاکتور: <input id="inv" name="invoice_no" type="number" required /></label></p>
    <p>روش بازپرداخت:
      <label><input type="radio" name="refund_method" value="card" checked /> واریز به کارت</label>
      <label><input type="radio" name="refund_method" value="wallet" /> شارژ کیف پول</label>
    </p>
    <p><label for="img">تصویر محصول: <input id="img" name="photo" type="file" accept="image/*" required /></label></p>
    <button type="submit">ثبت مرجوعی</button>
  </fieldset>
</form>`,
    solutionExplanation: 'تکمیل شکاف ص ۱۱۰ کتاب با پیاده‌سازی دقیق فرم آپلود فایل.',
    language: 'html',
    engine: 'web',
  },
  {
    id: 'hw-2-1-09',
    number: 9,
    title: 'صفحه مقاله آموزشی کامل با فهرست لنگر داخلی (#id) و تگ‌های معنایی',
    difficulty: 'challenging',
    bookPage: '۱۱۱ تا ۱۱۳',
    estimatedMinutes: 20,
    prompt:
      'یک صفحه مقاله درباره «پایتون در طراحی وب» بسازید که شامل header، nav (با ۳ لینک لنگر به بخش‌های صفحه)، main شامل ۳ section، یک aside و footer باشد.',
    sampleOutput: `صفحه معنایی چندبخشی با پرش سریع بین بخش‌ها`,
    hint: 'به هر section یک id منحصربه‌فرد بدهید و در nav با href="#..." به آن لینک بزنید.',
    solutionCode: `<header><h1>پایتون در دنیای وب</h1></header>
<nav><a href="#s1">مقدمه</a> | <a href="#s2">فریم‌ورک جنگو</a> | <a href="#s3">جمع‌بندی</a></nav>
<main>
  <section id="s1"><h2>مقدمه</h2><p>پایتون به دلیل خوانایی بالا محبوب‌ترین زبان آموزشی است.</p></section>
  <section id="s2"><h2>فریم‌ورک جنگو</h2><p>جنگو توسعه سریع و امن وب‌اپلیکیشن‌ها را ممکن می‌کند.</p></section>
  <section id="s3"><h2>جمع‌بندی</h2><p>ترکیب HTML5 و پایتون مسیر ورود به بازار کار است.</p></section>
</main>
<aside><p>منبع: کتاب طراح سایت ۱۴۰۵</p></aside>
<footer><small>نوشته‌شده توسط هنرجوی پایه یازدهم</small></footer>`,
    solutionExplanation: 'ترکیب ناوبری داخلی صفحه با معماری کامل معنایی HTML5.',
    language: 'html',
    engine: 'web',
  },
  {
    id: 'hw-2-1-10',
    number: 10,
    title: 'صفحه معرفی ۳ محصول فروشگاه با مقایسه جدولی و فرم پیش‌سفارش',
    difficulty: 'challenging',
    bookPage: '۱۰۵ تا ۱۱۳',
    estimatedMinutes: 20,
    prompt:
      'صفحه‌ای طراحی کنید که شامل ۳ کارت <article> با تصویر، جدول مقایسه ویژگی‌ها (صفحات، پایه، قیمت) و فرم انتخاب محصول برای پیش‌سفارش باشد.',
    sampleOutput: `لندینگ کامل فروشگاه کتاب شامل کارت، جدول و فرم`,
    hint: 'از ترکیب article + table + form در قالب تگ main استفاده کنید.',
    solutionCode: `<main style="display:grid;gap:14px;">
  <section style="display:flex;gap:10px;flex-wrap:wrap;">
    <article style="border:1px solid #cbd5e1;padding:10px;border-radius:8px;">
      <img src="book1.jpg" alt="طراح سایت" width="120" height="80" /><h3>طراح سایت</h3>
    </article>
    <article style="border:1px solid #cbd5e1;padding:10px;border-radius:8px;">
      <img src="book2.jpg" alt="تولید محتوا" width="120" height="80" /><h3>تولید محتوا</h3>
    </article>
  </section>
  <table border="1" style="border-collapse:collapse;width:100%;">
    <thead><tr><th>کتاب</th><th>پایه</th><th>قیمت</th></tr></thead>
    <tbody>
      <tr><td>طراح سایت</td><td>یازدهم</td><td>۴۵٬۰۰۰</td></tr>
      <tr><td>تولید محتوا</td><td>دهم</td><td>۳۸٬۰۰۰</td></tr>
    </tbody>
  </table>
  <form action="#" method="post">
    <label for="bk">انتخاب برای پیش‌سفارش:</label>
    <select id="bk" name="book"><option value="1">طراح سایت</option><option value="2">تولید محتوا</option></select>
    <button type="submit">پیش‌سفارش</button>
  </form>
</main>`,
    solutionExplanation: 'پروژه جامع ترکیب تمامی مهارت‌های واحد ۲.۱ در یک صفحه واقعی.',
    language: 'html',
    engine: 'web',
  },
];

export const UNIT_2_1_QUICK_QUIZ: QuickQuizQuestion[] = [
  {
    id: 'qq-2-1-01',
    kind: 'bug-spot',
    bookPage: '۱۰۰',
    question: 'اشکال تگ <html> زیر (برگرفته از غلط تایپی ص ۱۰۰ کتاب) چیست؟',
    codeSnippet: `<html lang="fa" dir="trl">`,
    options: [
      'lang باید en باشد',
      'مقدار صحیح جهت راست‌به‌چپ dir="rtl" است نه trl',
      'تگ html صفت dir ندارد',
      'باید به جای fa بنویسیم ir',
    ],
    correctIndex: 1,
    explanation: 'مخفف Right-To-Left برابر rtl است؛ نوشتن trl توسط مرورگر نادیده گرفته می‌شود.',
  },
  {
    id: 'qq-2-1-02',
    kind: 'concept',
    bookPage: '۱۰۹',
    question: 'اگر در فرم HTML صفت name را برای تگ <input> فراموش کنیم چه اتفاقی می‌افتد؟',
    options: [
      'فیلد در صفحه نمایش داده نمی‌شود',
      'کاربر نمی‌تواند داخل آن تایپ کند',
      'هنگام ارسال فرم، مقدار این فیلد به سرور فرستاده نمی‌شود',
      'مرورگر خطای SyntaxError نشان می‌دهد',
    ],
    correctIndex: 2,
    explanation: 'صفت name کلید ارسال داده در درخواست HTTP است و بدون آن سرور هیچ داده‌ای از آن فیلد دریافت نمی‌کند.',
  },
  {
    id: 'qq-2-1-03',
    kind: 'bug-spot',
    bookPage: '۱۰۴',
    question: 'کدام کد لیست زیر از نظر استاندارد HTML5 کاملاً معتبر است؟',
    codeSnippet: `گزینه الف: <ol><a href="#">کتاب</a></ol>
گزینه ب: <ol><li><a href="#">کتاب</a></li></ol>`,
    options: ['گزینه الف', 'گزینه ب', 'هر دو معتبرند', 'هیچ‌کدام'],
    correctIndex: 1,
    explanation: 'فرزند مستقیم تگ‌های <ol> و <ul> حتماً باید <li> باشد.',
  },
  {
    id: 'qq-2-1-04',
    kind: 'concept',
    bookPage: '۹۴',
    question: 'کدام نوشتار برای تگ تصویر در HTML5 کاملاً استاندارد است؟',
    options: [
      '<img src="book.jpg" width="200px" />',
      '<img src="book.jpg" alt="جلد کتاب" width="200" />',
      '<img href="book.jpg" alt="کتاب"></img>',
      '<image src="book.jpg" />',
    ],
    correctIndex: 1,
    explanation: 'تگ صحیح img با صفت src، متن جایگزین alt و مقدار عددی width بدون px است.',
  },
  {
    id: 'qq-2-1-05',
    kind: 'concept',
    bookPage: '۱۱۰',
    question: 'برای فرم آپلود فایل (<input type="file">) افزودن کدام صفت به تگ <form> الزامی است؟',
    options: [
      'method="get"',
      'enctype="multipart/form-data"',
      'target="_blank"',
      'upload="true"',
    ],
    correctIndex: 1,
    explanation: 'بدون enctype="multipart/form-data" فایل باینری تصویر در درخواست POST به سرور ارسال نمی‌شود.',
  },
  {
    id: 'qq-2-1-06',
    kind: 'output',
    bookPage: '۱۰۶',
    question: 'در یک جدول ۴ ستونه، اگر اولین سلول ردیف جمع کل دارای colspan="3" باشد، چند <td> دیگر در آن ردیف باید بنویسیم؟',
    codeSnippet: `<tr>
  <td colspan="3">جمع کل</td>
  <!-- چند td دیگر؟ -->
</tr>`,
    options: ['۰ سلول', '۱ سلول', '۲ سلول', '۳ سلول'],
    correctIndex: 1,
    explanation: '۳ ستون ادغام‌شده + ۱ سلول دیگر = دقیقاً ۴ ستون.',
  },
  {
    id: 'qq-2-1-07',
    kind: 'concept',
    bookPage: '۱۱۱',
    question: 'کدام تگ معنایی HTML5 برای یک محتوای مستقل مانند کارت یک محصول یا یک پست وبلاگ مناسب‌تر است؟',
    options: ['<div>', '<span>', '<article>', '<footer>'],
    correctIndex: 2,
    explanation: 'تگ <article> محتوای مستقل و کامل را نشان می‌دهد که حتی به‌تنهایی قابل بازنشر است.',
  },
  {
    id: 'qq-2-1-08',
    kind: 'concept',
    bookPage: '۸۸',
    question: 'وظیفه سامانه DNS در معماری وب چیست؟',
    options: [
      'طراحی ظاهر صفحات وب',
      'تبدیل نام دامنه خوانا به نشانی عددی IP سرور',
      'ذخیره رمز عبور کاربران',
      'اجرای کدهای پایتون در مرورگر',
    ],
    correctIndex: 1,
    explanation: 'DNS مثل دفترچه تلفن اینترنت عمل کرده و دامنه را به IP مقصد ترجمه می‌کند.',
  },
  {
    id: 'qq-2-1-09',
    kind: 'concept',
    bookPage: '۱۰۹',
    question: 'برای اتصال تگ <label> به فیلد <input id="phone"> کدام صفت را روی label می‌گذاریم؟',
    options: ['name="phone"', 'for="phone"', 'target="phone"', 'href="#phone"'],
    correctIndex: 1,
    explanation: 'صفت for در label باید دقیقاً هم‌نام id فیلد input باشد.',
  },
];
