import type {LearningUnit} from '../../types/curriculum.ts';
import {UNIT_2_2_LESSONS} from './unit2_2/lessons.ts';
import {
  UNIT_2_2_ACTIVITIES,
  UNIT_2_2_HOMEWORKS,
  UNIT_2_2_QUICK_QUIZ,
} from './unit2_2/exercisesAndBank.ts';

export const UNIT_2_2: LearningUnit = {
  id: 'unit-2-2',
  moduleId: 'module2',
  unitNumber: '۲.۲',
  title: 'طراحی ظاهر صفحات وب با CSS (Box Model, Flex, Grid)',
  pageRange: 'صفحات ۱۱۶ تا ۱۴۴',
  estimatedMinutes: 230,
  engine: 'web',
  contentStatus: 'complete',
  flagshipProject: 'صفحه محصولات Flexbox، خدمات ۵ ستونه Grid و ویجت چت ثابت «مرجع نو»',
  objectives: [
    'پیاده‌سازی CSS به شیوه‌های Inline/Internal/External و درک اولویت انتخابگرها (Specificity)',
    'قالب‌بندی متن فارسی (line-height)، رنگ‌ها (Hex/RGB/RGBA)، پس‌زمینه، حاشیه و گردی گوشه‌ها',
    'درک عمیق مدل جعبه‌ای (margin, border, padding, box-sizing) با اصلاح هدف ۵ ص ۱۱۶ و خطای ص ۱۲۹',
    'چیدمان واکنش‌گرا با Flexbox (منو و کارت محصولات با اصلاح باگ space-center ص ۱۳۸)',
    'طراحی شبکه‌های دوبعدی مدرن با CSS Grid (واحد fr و repeat(auto-fit, minmax))',
    'موقعیت‌دهی (relative, absolute, fixed, sticky, z-index) با اصلاح ص ۱۴۱ و Media Queries (@media)',
  ],
  warmupQuestions: [
    {
      question: 'اگر دو کارت کتاب به هم چسبیده باشند، برای ایجاد فاصله «بین» دو کارت باید margin بدهیم یا padding؟',
      teacherAnswer:
        'برای فاصله بیرون از کادر (بین دو کارت) از margin و برای فاصله بین متن و کادرِ خودِ کارت از padding استفاده می‌کنیم (توجه: هدف ۵ ص ۱۱۶ کتاب این دو را جابه‌جا تعریف کرده بود!).',
    },
    {
      question: 'چرا در صفحات فارسی اگر به نوار ناوبری display: flex بدهیم، لوگو خودکار در سمت راست قرار می‌گیرد؟',
      teacherAnswer:
        'زیرا محور اصلی Flexbox از جهت صفحه (dir="rtl") تبعیت می‌کند و flex-start در زبان فارسی سمت راست است.',
    },
  ],
  teacherOverviewTips: [
    'حتماً در تب «۲. شهود بصری» نمای سه‌بعدی Box Model را روی پروژکتور بچرخانید تا تفاوت margin و padding ملکه ذهن هنرجویان شود.',
    'اصلاحات مهم کتاب در این واحد: جابه‌جایی تعریف margin/padding ص ۱۱۶، غلط تایپی padding: 10px.20px ص ۱۲۹، باگ justify-content: space-center ص ۱۳۸، موقعیت top: 600px ویجت چت ص ۱۴۱ و خطای کپی جدول ارزشیابی ص ۱۴۳–۱۴۴.',
  ],
  visualLab: {
    id: 'css-box-flex-grid',
    title: 'بازرس سه‌بعدی Box Model و زمین بازی RTL Flexbox',
    subtitle: 'اسلایدرها را حرکت دهید تا ابعاد واقعی جعبه و رفتار Flexbox در زبان فارسی را زنده ببینید.',
    teacherGuide: 'ابتدا box-sizing را بین border-box و content-box تغییر دهید و از کلاس بپرسید چرا طراحان حرفه‌ای همیشه border-box را انتخاب می‌کنند.',
  },
  lessons: UNIT_2_2_LESSONS,
  examples: UNIT_2_2_LESSONS.flatMap((l) => l.examples),
  activities: UNIT_2_2_ACTIVITIES,
  homeworks: UNIT_2_2_HOMEWORKS,
  quickQuizzes: UNIT_2_2_QUICK_QUIZ,
  gapNotes: [
    {
      id: 'gap-2-2-spec',
      title: 'قانون اولویت انتخابگرها (CSS Specificity) و z-index',
      badge: 'تکمیل شکاف کتاب',
      content:
        'اولویت از زیاد به کم: Inline Style (۱۰۰۰) ← انتخابگر ID (#id = ۱۰۰) ← کلاس و شبه‌کلاس (.class / :hover = ۱۰) ← نام تگ (p = ۱). همچنین برای قرار گرفتن نوار بالا روی کارت‌ها از z-index بالاتر (همراه با position غیر static) استفاده می‌کنیم.',
    },
    {
      id: 'gap-2-2-border-box',
      title: 'چرا * { box-sizing: border-box; } خط اول فایل‌های CSS حرفه‌ای است؟',
      badge: 'تکمیل شکاف کتاب',
      content:
        'در حالت پیش‌فرض content-box، افزودن padding و border عرض نهایی عنصر را از width بیشتر می‌کند و ستون‌های صفحه را می‌شکند؛ border-box عرض کل را دقیقاً برابر width حفظ می‌کند.',
      codeSnippet: `* { box-sizing: border-box; }`,
      language: 'css',
    },
  ],
  bugChallenges: [
    {
      id: 'bug-2-2-syntax',
      title: 'چالش ۱: رفع ۳ خطای واقعی CSS کتاب (ص ۱۲۹ و ۱۳۸)',
      sourceLabel: 'خطاهای CSS ص ۱۲۹ و ۱۳۸',
      description:
        'در کد CSS زیر خطاهای واقعی کتاب آمده است (نقطه در padding و مقدار نامعتبر space-center). آن را اصلاح کنید تا دکمه‌ها وسط‌چین و مرتب شوند.',
      language: 'html',
      engine: 'web',
      buggyCode: `<style>
.box {
  display: flex;
  justify-content: space-center;
  gap: 10px;
  padding: 10px.20px;
  background: #f1f5f9;
}
.btn { background: #0284c7; color: white; padding: 8px 16px; border-radius: 8px; }
</style>
<div class="box">
  <span class="btn">ورود</span>
  <span class="btn">ثبت‌نام</span>
</div>`,
      fixedCode: `<style>
.box {
  display: flex;
  justify-content: center;
  gap: 10px;
  padding: 10px 20px;
  background: #f1f5f9;
}
.btn { background: #0284c7; color: white; padding: 8px 16px; border-radius: 8px; }
</style>
<div class="box">
  <span class="btn">ورود</span>
  <span class="btn">ثبت‌نام</span>
</div>`,
      hint: 'مقدار معتبر وسط‌چین center است و بین مقادیر padding فقط فاصله (Space) قرار می‌گیرد نه نقطه.',
      teacherExplanation: 'این دو خطا دقیقاً در صفحات ۱۲۹ و ۱۳۸ کتاب درسی وجود دارند.',
    },
    {
      id: 'bug-2-2-chat-pos',
      title: 'چالش ۲: اصلاح موقعیت ویجت چت و نشان کارت (ص ۱۴۱ کتاب)',
      sourceLabel: 'خطای منطقی ص ۱۴۱ کتاب',
      description:
        'نشان تخفیف از کادر کارت بیرون افتاده و ویجت چت به دلیل top: 600px در صفحه کوچک ناپدید می‌شود! هر دو را اصلاح کنید.',
      language: 'html',
      engine: 'web',
      buggyCode: `<style>
.card { width: 200px; border: 1px solid #cbd5e1; padding: 14px; }
.badge { position: absolute; top: 6px; left: 6px; background: #e11d48; color: #fff; padding: 2px 8px; font-size: 11px; }
.chat { position: fixed; top: 600px; left: 12px; background: #0f172a; color: #fff; padding: 6px 12px; border-radius: 999px; }
</style>
<div class="card"><span class="badge">تخفیف</span><h4>کتاب طراح سایت</h4></div>
<div class="chat">پشتیبانی</div>`,
      fixedCode: `<style>
.card { position: relative; width: 200px; border: 1px solid #cbd5e1; padding: 14px; border-radius: 10px; }
.badge { position: absolute; top: 6px; left: 6px; background: #e11d48; color: #fff; padding: 2px 8px; font-size: 11px; border-radius: 999px; }
.chat { position: fixed; bottom: 14px; left: 12px; background: #0f172a; color: #fff; padding: 6px 12px; border-radius: 999px; }
</style>
<div class="card"><span class="badge">تخفیف</span><h4>کتاب طراح سایت</h4></div>
<div class="chat">پشتیبانی</div>`,
      hint: 'به .card مقدار position: relative و به .chat مقدار bottom: 14px بدهید.',
      teacherExplanation: 'هر دو خطا از پرتکرارترین مشکلات واقعی در پروژه‌های کارگاهی هستند.',
    },
  ],
  rubric: {
    title: 'ارزشیابی شایستگی واحد ۲.۲ — طراحی ظاهر با CSS',
    pageRange: 'صفحات ۱۴۳ و ۱۴۴ کتاب درسی (اصلاح‌شده)',
    auditNotice:
      'در چاپ ۱۴۰۵ کتاب، ردیف‌های ۴، ۵ و ۶ جدول ارزشیابی CSS (ص ۱۴۳–۱۴۴) سهواً از واحد HTML کپی شده بودند! در جدول دیجیتال زیر معیارهای واقعی CSS (مدل جعبه‌ای، Flex/Grid و واکنش‌گرایی) جایگزین شده‌اند تا نمره‌دهی دقیق و منصفانه باشد.',
    stages: [
      {stageNumber: 1, title: 'اتصال صحیح CSS (External/Internal) و انتخابگرها', isCritical: true, criteria: {score1: 'عدم اتصال فایل style.css', score2: 'استفاده از انتخابگرهای ساده', score3: 'کاربرد دقیق انتخابگرهای ترکیبی و شبه‌کلاس‌ها'}},
      {stageNumber: 2, title: 'قالب‌بندی متن، رنگ، پس‌زمینه و حاشیه', isCritical: true, criteria: {score1: 'عدم خوانایی و کنتراست ضعیف', score2: 'تنظیم رنگ و فونت پایه', score3: 'طراحی هماهنگ با خوانایی و حاشیه‌های تمیز'}},
      {stageNumber: 3, title: 'به‌کارگیری مدل جعبه‌ای (Box Model) و box-sizing', isCritical: true, criteria: {score1: 'خلط margin و padding', score2: 'تنظیم درست فاصله‌ها', score3: 'تسلط کامل بر margin/padding/border و border-box'}},
      {stageNumber: 4, title: 'پیاده‌سازی چیدمان Flexbox و CSS Grid', isCritical: true, criteria: {score1: 'بهم‌ریختگی کارت‌ها', score2: 'پیاده‌سازی تک‌ستونه یا ساده', score3: 'چیدمان تمیز کارت‌ها با Flex و خدمات با Grid'}, teacherAuditNote: 'اصلاح‌شده از خطای کپی جدول کتاب (ص ۱۴۴).'},
      {stageNumber: 5, title: 'موقعیت‌دهی (Positioning) و واکنش‌گرایی (@media)', isCritical: true, criteria: {score1: 'شکستن صفحه در عرض موبایل', score2: 'اعمال یک قانون @media پایه', score3: 'ویجت fixed استاندارد و تطابق کامل موبایل/دسکتاپ'}, teacherAuditNote: 'اصلاح‌شده از خطای کپی جدول کتاب (ص ۱۴۴).'},
      {stageNumber: 6, title: 'سازمان‌دهی کد CSS و مستندسازی با کامنت', isCritical: false, criteria: {score1: 'کد تکراری و نامنظم', score2: 'دسته‌بندی نسبی استایل‌ها', score3: 'استایل‌شیت تمیز، بدون کد اضافی و کامنت‌گذاری‌شده'}},
    ],
  },
};
