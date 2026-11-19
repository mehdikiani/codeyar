import type {LearningUnit} from '../../types/curriculum.ts';
import {UNIT_3_2_LESSONS} from './unit3_2/lessons.ts';
import {
  UNIT_3_2_ACTIVITIES,
  UNIT_3_2_HOMEWORKS,
  UNIT_3_2_QUIZZES,
} from './unit3_2/exercisesAndBank.ts';

export const UNIT_3_2: LearningUnit = {
  id: 'unit-3-2',
  moduleId: 'module3',
  unitNumber: '۳.۲',
  title: 'طراحی صفحات وب تعاملی با جاوااسکریپت و DOM',
  pageRange: 'صفحات ۱۹۲ تا ۲۳۲',
  estimatedMinutes: 190,
  engine: 'bootstrap-js',
  contentStatus: 'complete',
  flagshipProject: 'سبد خرید هوشمند، کلاس‌های ES6 و اعتبارسنجی فرم ورود (sign-in.html)',
  objectives: [
    'تعریف متغیرها (let, const)، انواع داده و عملگرهای مقایسه سخت‌گیرانه (===)',
    'کار با ساختارهای شرطی (if/switch)، حلقه‌ها، آرایه‌ها (push/pop) و اشیا',
    'نوشتن توابع مدرن (Arrow)، کار با اشیای داخلی (Math/String) و کلاس‌های ES6',
    'دستکاری زنده DOM با getElementById، querySelector، querySelectorAll، classList و createElement',
    'مدیریت رویدادها (addEventListener / submit) و اعتبارسنجی کامل فرم ورود (sign-in.html)',
  ],
  warmupQuestions: [
    {
      question: 'چرا اعتبارسنجی رمز عبور در سمت مرورگر با جاوااسکریپت تجربه کاربری بهتری ایجاد می‌کند؟',
      teacherAnswer:
        'زیرا پیش از ارسال درخواست به سرور و معطل شدن کاربر، خطای کوتاه بودن رمز یا خالی بودن نام کاربری در لحظه و بدون بارگذاری مجدد صفحه گزارش می‌شود.',
    },
    {
      question: 'اگر در جاوااسکریپت بنویسیم "5" == 5 و "5" === 5، آیا هر دو یک جواب می‌دهند؟',
      teacherAnswer:
        'خیر! == نوع داده را تبدیل می‌کند و true می‌دهد، اما === سخت‌گیرانه است و چون یکی رشته و دیگری عدد است false برمی‌گرداند.',
    },
  ],
  teacherOverviewTips: [
    'در ص ۲۰۵ کتاب کلیدواژه Let با L بزرگ و در ص ۲۳۰ تابع validateForm / validateform ناهماهنگ و شرط <= 6 به جای < 6 چاپ شده‌اند؛ هر سه مورد در درسنامه‌ها اصلاح و به چالش خطایابی تبدیل شده‌اند.',
    'متدهای querySelector / querySelectorAll و pop() در جدول ارزشیابی ص ۲۳۲ نمره‌گذاری شده‌اند اما در متن کتاب تدریس نشده‌اند؛ در درسنامه‌های ۳ و ۵ و کارگاه‌های این واحد کاملاً پوشش داده شده‌اند.',
    'به هنرجویان تأکید کنید تفاوت‌های کلیدی JS با پایتون را یادداشت کنند: پرانتز و آکولاد اجباری، && و || به جای and/or، کلیدواژه new برای کلاس‌ها و نبود اندیس منفی مستقیم [-1].',
  ],
  visualLab: {
    id: 'js-dom-events',
    title: 'آزمایشگاه == در برابر === و انتخابگرهای DOM',
    subtitle: 'تفاوت مقایسه سست و سخت‌گیرانه و نحوه دسترسی به گره‌های صفحه با querySelector.',
    teacherGuide: 'تأکید کنید همیشه از === و let/const به‌جای == و var استفاده کنند.',
    classroomQuestion: 'چه اتفاقی می‌افتد اگر به جای querySelector("#msg") بنویسیم getElementById("#msg")؟',
  },
  lessons: UNIT_3_2_LESSONS,
  examples: UNIT_3_2_LESSONS.flatMap((lesson) => lesson.examples),
  activities: UNIT_3_2_ACTIVITIES,
  homeworks: UNIT_3_2_HOMEWORKS,
  quickQuizzes: UNIT_3_2_QUIZZES,
  gapNotes: [
    {
      id: 'gap-3-2-qs',
      title: 'انتخابگرهای querySelector / querySelectorAll و متد pop()',
      badge: 'الزامی در جدول ارزشیابی ص ۲۳۲',
      content:
        'اگرچه این دو مورد در جدول ارزشیابی ص ۲۳۲ آمده‌اند ولی در متن اصلی آموزش داده نشده‌اند: querySelector اولین عنصر منطبق با انتخابگر CSS را برمی‌گرداند، querySelectorAll فهرست تمام عناصر منطبق را می‌دهد و pop() آخرین عنصر آرایه را حذف و برمی‌گرداند.',
      codeSnippet: `const btn = document.querySelector('.btn-primary');\nconst allCards = document.querySelectorAll('.card');\nconst items = ['A', 'B', 'C'];\nitems.pop(); // ['A', 'B']`,
      language: 'javascript',
    },
    {
      id: 'gap-3-2-py-vs-js',
      title: 'جدول مقایسه سریع پایتون (پودمان ۱) و جاوااسکریپت (پودمان ۳)',
      badge: 'راهنمای تدریس برای هنرآموز',
      content:
        'بسیاری از خطاهای کارگاهی به خاطر تداخل سینتکس پایتون و جاوااسکریپت است: به جای elif از else if، به جای and/or از && و ||، به جای True/False با حرف بزرگ از true/false با حرف کوچک، و به جای len(arr) از arr.length استفاده می‌شود.',
      codeSnippet: `// پایتون: if x > 0 and len(items) > 0:\n// جاوااسکریپت:\nif (x > 0 && items.length > 0) {\n  console.log(true);\n}`,
      language: 'javascript',
    },
  ],
  bugChallenges: [
    {
      id: 'bug-3-2-let',
      title: 'رفع خطای Let با حرف بزرگ (ص ۲۰۵ کتاب)',
      sourceLabel: 'خطای نحوی ص ۲۰۵ کتاب',
      description: 'کد زیر به دلیل کلیدواژه اشتباه Let اجرا نمی‌شود؛ آن را اصلاح کنید تا نتیجه در کنسول چاپ شود.',
      language: 'javascript',
      engine: 'bootstrap-js',
      buggyCode: `Let price = 45000;
Let discount = 5000;
console.log("قیمت نهایی:", price - discount);`,
      fixedCode: `let price = 45000;
let discount = 5000;
console.log("قیمت نهایی:", price - discount);`,
      hint: 'جاوااسکریپت به حروف بزرگ و کوچک حساس است؛ کلیدواژه صحیح let با l کوچک است.',
      teacherExplanation: 'خطوط ۱۰ تا ۱۳ ص ۲۰۵ کتاب کلیدواژه let را اشتباهاً با L بزرگ چاپ کرده‌اند.',
    },
    {
      id: 'bug-3-2-validateform',
      title: 'اصلاح باگ دوتایی فرم ورود ص ۲۳۰ کتاب (نام تابع و شرط <= 6)',
      sourceLabel: 'باگ بحرانی ص ۲۳۰ کتاب',
      description:
        'در کد زیر دو خطای واقعی ص ۲۳۰ کتاب وجود دارد: هم نام تابع با onsubmit هماهنگ نیست و هم رمز ۶ کاراکتری "123456" رد می‌شود! هر دو را اصلاح کنید.',
      language: 'html',
      engine: 'bootstrap-js',
      useBootstrap: true,
      buggyCode: `<form onsubmit="return validateForm()" class="p-3">
  <input id="p" type="text" value="123456" class="form-control mb-2" />
  <div id="out" class="small fw-bold mb-2"></div>
  <button class="btn btn-primary btn-sm">بررسی رمز</button>
</form>
<script>
function validateform() {
  const pass = document.querySelector("#p").value;
  const out = document.querySelector("#out");
  if (pass.length <= 6) {
    out.textContent = "خطا: رمز باید حداقل ۶ کاراکتر باشد!";
    return false;
  }
  out.textContent = "رمز معتبر است!";
  return false;
}
</script>`,
      fixedCode: `<form onsubmit="return validateForm()" class="p-3">
  <input id="p" type="text" value="123456" class="form-control mb-2" />
  <div id="out" class="small fw-bold mb-2"></div>
  <button class="btn btn-primary btn-sm">بررسی رمز</button>
</form>
<script>
function validateForm() {
  const pass = document.querySelector("#p").value;
  const out = document.querySelector("#out");
  if (pass.length < 6) {
    out.textContent = "خطا: رمز باید حداقل ۶ کاراکتر باشد!";
    return false;
  }
  out.textContent = "رمز معتبر است!";
  return false;
}
</script>`,
      hint: 'حرف f در validateform را بزرگ کنید (validateForm) و شرط <= 6 را به < 6 تغییر دهید.',
      teacherExplanation: 'این دو خطا دقیقاً در کد sign-in.html صفحه ۲۳۰ کتاب درسی رخ داده‌اند.',
    },
  ],
  rubric: {
    title: 'ارزشیابی شایستگی واحد ۳.۲ — برنامه‌نویسی جاوااسکریپت',
    pageRange: 'صفحات ۲۳۱ و ۲۳۲ کتاب درسی',
    stages: [
      {
        stageNumber: 1,
        title: 'تعریف متغیرها، انواع داده، عملگرها و کنسول',
        isCritical: true,
        criteria: {
          score1: 'خطای نحوی در let/const',
          score2: 'کاربرد صحیح متغیر و console.log',
          score3: 'تسلط بر تبدیل نوع و مقایسه ===',
        },
      },
      {
        stageNumber: 2,
        title: 'کار با آرایه‌ها (push/pop) و اشیا',
        isCritical: false,
        criteria: {
          score1: 'خطا در اندیس یا کلید شیء',
          score2: 'ساخت آرایه و شیء ساده',
          score3: 'مدیریت آرایه از اشیا و متدها',
        },
      },
      {
        stageNumber: 3,
        title: 'ساختارهای شرطی، حلقه‌ها و توابع',
        isCritical: false,
        criteria: {
          score1: 'حلقه یا شرط ناقص',
          score2: 'پیاده‌سازی الگوریتم پایه',
          score3: 'توابع تمیز با for...of و switch/if',
        },
      },
      {
        stageNumber: 4,
        title: 'کار با اشیای داخلی (Math/String/Array) و کلاس ES6',
        isCritical: false,
        criteria: {
          score1: 'عدم استفاده از متدهای داخلی',
          score2: 'استفاده از بخشی از متدها',
          score3: 'پیاده‌سازی کلاس ES6 و پردازش داده',
        },
      },
      {
        stageNumber: 5,
        title: 'دستکاری DOM با getElementById و querySelector',
        isCritical: true,
        criteria: {
          score1: 'عدم تغییر محتوای صفحه',
          score2: 'تغییر متن با textContent',
          score3: 'تغییر متن، استایل و ساخت گره جدید DOM',
        },
      },
      {
        stageNumber: 6,
        title: 'مدیریت رویدادها و اعتبارسنجی فرم ورود',
        isCritical: true,
        criteria: {
          score1: 'عدم اجرای اعتبارسنجی',
          score2: 'بررسی خالی نبودن فیلدها',
          score3: 'اعتبارسنجی کامل همراه با پیام خطای کاربرپسند',
        },
      },
    ],
  },
};
