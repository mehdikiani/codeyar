import type {LearningUnit} from '../../types/curriculum.ts';
import {UNIT_2_1_LESSONS} from './unit2_1/lessons.ts';
import {
  UNIT_2_1_ACTIVITIES,
  UNIT_2_1_HOMEWORKS,
  UNIT_2_1_QUICK_QUIZ,
} from './unit2_1/exercisesAndBank.ts';

export const UNIT_2_1: LearningUnit = {
  id: 'unit-2-1',
  moduleId: 'module2',
  unitNumber: '۲.۱',
  title: 'طراحی ساختار صفحات وب با HTML',
  pageRange: 'صفحات ۸۴ تا ۱۱۵',
  estimatedMinutes: 220,
  engine: 'web',
  contentStatus: 'complete',
  flagshipProject: 'اسکلت معنایی و فرم سفارش فروشگاه کتاب «مرجع نو»',
  objectives: [
    'درک نحوه کارکرد وب (DNS، HTTP Request/Response، دامنه، هاست، سئو)',
    'ایجاد اسکلت استاندارد HTML5 فارسی با lang="fa" و dir="rtl" (اصلاح ص ۱۰۰)',
    'استفاده صحیح از تیترها (h1..h6)، قالب‌بندی معنایی متن، لیست‌ها و پیوندها (اصلاح ص ۱۰۴)',
    'درج تصاویر استاندارد با alt و ابعاد عددی بدون px (اصلاح ص ۹۴) و تگ‌های figure/figcaption',
    'ساخت جداول استاندارد با caption، thead، tbody، tfoot، colspan و rowspan',
    'طراحی فرم سفارش و مرجوعی با label/for، name، enctype و تگ‌های معنایی HTML5 (اصلاح ص ۱۰۹–۱۱۱)',
  ],
  warmupQuestions: [
    {
      question: 'وقتی نشانی سایتی را در مرورگر وارد می‌کنیم، در کمتر از یک ثانیه پشت صحنه چه اتفاقی می‌افتد؟',
      teacherAnswer:
        'مرورگر ابتدا IP سرور را از DNS می‌پرسد، درخواست HTTP می‌فرستد، سرور فایل HTML را برمی‌گرداند و مرورگر آن را به صفحه قابل دیدن تبدیل می‌کند.',
    },
    {
      question: 'چرا یک طراح وب حرفه‌ای به جای ۲۰ تگ <div> از تگ‌های <header>، <nav>، <main> و <article> استفاده می‌کند؟',
      teacherAnswer:
        'تگ‌های معنایی ساختار واقعی صفحه را به موتورهای جستجو (سئو) و صفحه‌خوان‌های نابینایان معرفی کرده و نگهداری کد را بسیار ساده‌تر می‌کنند.',
    },
  ],
  teacherOverviewTips: [
    'در ص ۱۰۰ کتاب غلط تایپی dir="trl" چاپ شده است؛ شکل درست dir="rtl" است.',
    'در فرم سفارش ص ۱۰۹ کتاب صفت name جا افتاده بود و در فرم آپلود ص ۱۱۰ صفت enctype="multipart/form-data" ذکر نشده بود؛ هر دو در درسنامه و مثال‌ها تکمیل شده‌اند.',
    'شکل ۱۹ ص ۱۱۱ کتاب به‌جای مثال <article> اشتباهاً تصویر <section> را تکرار کرده بود؛ در مبحث ۶ نسخه اصلاح‌شده آماده است.',
  ],
  visualLab: {
    id: 'web-dns-semantic',
    title: 'پویانمایی DNS/HTTP و کاوشگر تگ‌های معنایی HTML5',
    subtitle: 'مسیر سفر درخواست وب و نقش هر تگ معنایی را به‌صورت تعاملی بررسی کنید.',
    teacherGuide: 'تفاوت <div> بی‌معنا و <header>/<main>/<article> را از نظر سئو و دسترس‌پذیری نابینایان توضیح دهید.',
  },
  lessons: UNIT_2_1_LESSONS,
  examples: UNIT_2_1_LESSONS.flatMap((l) => l.examples),
  activities: UNIT_2_1_ACTIVITIES,
  homeworks: UNIT_2_1_HOMEWORKS,
  quickQuizzes: UNIT_2_1_QUICK_QUIZ,
  gapNotes: [
    {
      id: 'gap-2-1-multipart',
      title: 'آپلود فایل در فرم مرجوعی (enctype="multipart/form-data")',
      badge: 'تکمیل شکاف ص ۱۱۰',
      content:
        'در فرم مرجوعی کتاب (ص ۱۱۰) که شامل <input type="file"> است، بدون افزودن صفت enctype="multipart/form-data" به تگ <form> فایل تصویر به سرور ارسال نمی‌شود.',
      codeSnippet: `<form action="/return" method="post" enctype="multipart/form-data">\n  <input type="file" name="receipt_photo" accept="image/*" />\n</form>`,
      language: 'html',
    },
    {
      id: 'gap-2-1-name-attr',
      title: 'ضرورت صفت name در تمام فیلدهای فرم (ص ۱۰۹)',
      badge: 'تکمیل شکاف ص ۱۰۹',
      content:
        'بدون صفت name روی تگ‌های input، select و textarea، مرورگر هنگام Submit هیچ داده‌ای از آن فیلد به سرور (مثلاً جنگو در پودمان ۵) ارسال نمی‌کند.',
      codeSnippet: `<label for="fullname">نام:</label>\n<input id="fullname" name="fullname" type="text" required />`,
      language: 'html',
    },
    {
      id: 'gap-2-1-width-no-px',
      title: 'مقدار عددی خالص برای width/height در HTML5 (ص ۹۴)',
      badge: 'اصلاح ص ۹۴',
      content:
        'در تگ <img> صفت‌های width و height فقط عدد پیکسل می‌گیرند (width="200") و نوشتن پسوند px فقط در CSS مجاز است.',
    },
  ],
  bugChallenges: [
    {
      id: 'bug-2-1-list',
      title: 'چالش ۱: اصلاح جهت متن، لیست نامعتبر و واحد px (ص ۹۴، ۱۰۰ و ۱۰۴)',
      sourceLabel: 'خطاهای HTML5 ص ۹۴، ۱۰۰ و ۱۰۴',
      description:
        'در کد زیر جهت صفحه غلط تایپی دارد، لینک تصویر بدون تگ <li> داخل <ol> قرار گرفته و صفت width دارای px است. هر سه را استاندارد کنید.',
      language: 'html',
      engine: 'web',
      buggyCode: `<div dir="trl">
  <ol>
    <a href="#"><img src="book1.jpg" width="140px" /></a>
    <li>کتاب دوم</li>
  </ol>
</div>`,
      fixedCode: `<div dir="rtl">
  <ol>
    <li><a href="#"><img src="book1.jpg" alt="کتاب اول" width="140" /></a></li>
    <li>کتاب دوم</li>
  </ol>
</div>`,
      hint: 'فرزندان مستقیم <ol> فقط <li> هستند، جهت راست‌به‌چپ rtl است و width در HTML بدون px نوشته می‌شود.',
      teacherExplanation: 'این سه خطا از متداول‌ترین ایرادهای اعتبارسنجی W3C در کارگاه هستند.',
    },
    {
      id: 'bug-2-1-form-missing',
      title: 'چالش ۲: تکمیل فرم ناقص سفارش کتاب (ص ۱۰۹ و ۱۱۰)',
      sourceLabel: 'شکاف کتاب ص ۱۰۹–۱۱۰',
      description:
        'فرم زیر نه صفت name دارد، نه اتصال label به input و نه enctype برای آپلود فایل! آن را کامل و استاندارد کنید.',
      language: 'html',
      engine: 'web',
      buggyCode: `<form action="#" method="post">
  <label>نام خریدار:</label>
  <input type="text" />
  <input type="file" />
  <button>ارسال</button>
</form>`,
      fixedCode: `<form action="#" method="post" enctype="multipart/form-data">
  <label for="buyer">نام خریدار:</label>
  <input id="buyer" name="buyer" type="text" required />
  <input name="receipt" type="file" accept="image/*" />
  <button type="submit">ارسال</button>
</form>`,
      hint: 'برای هر input صفت name بگذارید، for/id را متصل کنید و enctype="multipart/form-data" را به form اضافه کنید.',
      teacherExplanation: 'با این اصلاح، فرم کاملاً آماده اتصال به بک‌اند جنگو خواهد بود.',
    },
  ],
  rubric: {
    title: 'ارزشیابی شایستگی واحد ۲.۱ — طراحی ساختار با HTML',
    pageRange: 'صفحات ۱۱۴ و ۱۱۵ کتاب درسی',
    stages: [
      {stageNumber: 1, title: 'تحلیل نیاز و ترسیم نقشه سایت فروشگاه کتاب', isCritical: true, criteria: {score1: 'نقشه سایت ناقص', score2: 'تعیین صفحات اصلی فروشگاه', score3: 'نقشه سایت جامع با مسیر کاربری دقیق'}},
      {stageNumber: 2, title: 'ایجاد ساختار استاندارد HTML5 و تگ‌های متنی/لیست', isCritical: true, criteria: {score1: 'خطا در تگ‌های پایه یا dir', score2: 'ساختار درست با کمبود تگ معنایی', score3: 'اسکلت کاملاً استاندارد HTML5 فارسی'}},
      {stageNumber: 3, title: 'درج صحیح پیوندها، تصاویر (alt) و جداول', isCritical: true, criteria: {score1: 'مسیر اشتباه یا نبود alt', score2: 'درج تصویر و جدول ساده', score3: 'جداول استاندارد thead/tbody/tfoot و تصاویر بهینه'}},
      {stageNumber: 4, title: 'طراحی فرم‌های استاندارد با label و name', isCritical: true, criteria: {score1: 'فرم بدون label یا name', score2: 'فرم کامل با فیلدهای پایه', score3: 'فرم کامل با اعتبارسنجی HTML5 و fieldset'}},
      {stageNumber: 5, title: 'به‌کارگیری تگ‌های معنایی (Semantic Layout)', isCritical: false, criteria: {score1: 'استفاده صرف از div', score2: 'استفاده از header و footer', score3: 'چیدمان کامل header/nav/main/article/aside/footer'}},
      {stageNumber: 6, title: 'مستندسازی کد با کامنت و رعایت خوانایی', isCritical: false, criteria: {score1: 'کد نامنظم بدون تورفتگی', score2: 'تورفتگی قابل قبول', score3: 'کد تمیز با کامنت‌های راهنما'}},
    ],
  },
};
