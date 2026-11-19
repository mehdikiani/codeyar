import type {LearningUnit} from '../../types/curriculum.ts';
import {UNIT_3_1_LESSONS} from './unit3_1/lessons.ts';
import {
  UNIT_3_1_ACTIVITIES,
  UNIT_3_1_HOMEWORKS,
  UNIT_3_1_QUICK_QUIZ,
} from './unit3_1/exercisesAndBank.ts';

export const UNIT_3_1: LearningUnit = {
  id: 'unit-3-1',
  moduleId: 'module3',
  unitNumber: '۳.۱',
  title: 'توسعه صفحات وب تعاملی با بوت‌استرپ ۵.۳',
  pageRange: 'صفحات ۱۴۶ تا ۱۹۱',
  estimatedMinutes: 220,
  engine: 'bootstrap-js',
  contentStatus: 'complete',
  flagshipProject: 'ارتقای واکنش‌گرای «مرجع نو» با Navbar، شبکه ۱۲ ستونه، Modal، Carousel و Accordion',
  objectives: [
    'راه‌اندازی آفلاین بوت‌استرپ ۵.۳ RTL و کاربرد کلاس‌های رنگ (subtle)، حاشیه و گردی (اصلاح ص ۱۵۲)',
    'به‌کارگیری سیستم فاصله‌گذاری منطقی در RTL (m/p، ms/me) و کلاس‌های نمایش واکنش‌گرا (d-none / d-md-flex)',
    'طراحی شبکه ۱۲ ستونه واکنش‌گرا (container، row، col-md-*، row-cols-*، g-* و img-fluid)',
    'ساخت مؤلفه‌های Card، Button، Badge، Alert و جداول واکنش‌گرا (table-responsive)',
    'پیاده‌سازی Navbar واکنش‌گرا و فرم‌های استاندارد (form-control، form-select، form-floating، input-group)',
    'اجرای مؤلفه‌های تعاملی Modal (اصلاح باگ ص ۱۸۳)، Accordion (اصلاح ص ۱۸۸)، Carousel و Offcanvas',
  ],
  warmupQuestions: [
    {
      question: 'چرا در پروژه‌های واقعی به‌جای نوشتن صدها خط CSS از صفر، از فریم‌ورک‌هایی مثل Bootstrap استفاده می‌کنند؟',
      teacherAnswer:
        'برای افزایش سرعت توسعه، تضمین واکنش‌گرایی در همه دستگاه‌ها، یکدستی بصری مؤلفه‌ها (منو، مودال، فرم) و پشتیبانی آماده از راست‌به‌چپ (RTL).',
    },
    {
      question: 'در شبکه ۱۲ ستونه بوت‌استرپ، اگر بخواهیم ۳ کارت محصول هم‌عرض در دسکتاپ کنار هم بنشینند، به هر کارت چه کلاسی می‌دهیم؟',
      teacherAnswer: '۱۲ تقسیم بر ۳ برابر ۴ است؛ پس به هر کارت کلاس col-md-4 (و برای موبایل col-12) می‌دهیم.',
    },
  ],
  teacherOverviewTips: [
    'نسخه کامل Bootstrap 5.3 RTL (CSS و JS) به‌صورت ۱۰۰٪ آفلاین درون پیش‌نمایشگر این سامانه تزریق می‌شود و هیچ نیازی به اینترنت ندارد.',
    'اصلاحات مهم کتاب در این واحد: اصلاح جدول ۴ و ۵ ص ۱۵۲ (border-danger و rounded-0)، اصلاح باگ بحرانی ص ۱۸۳ (تطابق حروف #addToCartMsg) و اصلاح aria-expanded="false" در Accordion ص ۱۸۸.',
  ],
  visualLab: {
    id: 'bootstrap-grid-breakpoints',
    title: 'شبیه‌ساز زنده شبکه ۱۲ ستونه و Breakpoints بوت‌استرپ',
    subtitle: 'عرض صفحه را با اسلایدر تغییر دهید و تبدیل خودکار ۴ ستون به ۲ ستون و ۱ ستون را ببینید.',
    teacherGuide: 'عدد کل ستون‌ها در هر ردیف (row) همیشه ۱۲ است؛ پس col-lg-3 یعنی هر کارت ۳ ستون از ۱۲ ستون (۴ کارت در ردیف).',
  },
  lessons: UNIT_3_1_LESSONS,
  examples: UNIT_3_1_LESSONS.flatMap((l) => l.examples),
  activities: UNIT_3_1_ACTIVITIES,
  homeworks: UNIT_3_1_HOMEWORKS,
  quickQuizzes: UNIT_3_1_QUICK_QUIZ,
  gapNotes: [
    {
      id: 'gap-3-1-rounded',
      title: 'اصلاح جدول گردی گوشه‌ها و رنگ حاشیه (ص ۱۵۲)',
      badge: 'اصلاح جدول کتاب',
      content:
        'در جدول ۵ ص ۱۵۲ کلاس بدون گردی (0px) برابر rounded-0 است نه rounded-1، و در جدول ۴ کلاس حاشیه قرمز border-danger است نه danger-danger.',
    },
    {
      id: 'gap-3-1-rtl-logical',
      title: 'تبدیل کلاس‌های قدیمی چپ/راست به منطقی Start/End در بوت‌استرپ ۵.۳',
      badge: 'نکته حیاتی RTL',
      content:
        'در Bootstrap 5.3 به جای ml-* / mr-* و text-right از ms-* (شروع = راست در فارسی)، me-* (پایان = چپ در فارسی) و text-start استفاده کنید.',
    },
  ],
  bugChallenges: [
    {
      id: 'bug-3-1-modal-case',
      title: 'چالش ۱: چرا دکمه مودال کتاب (ص ۱۸۳) کار نمی‌کند؟',
      sourceLabel: 'باگ واقعی کتاب ص ۱۸۳',
      description: 'روی دکمه زیر کلیک کنید؛ می‌بینید مودال باز نمی‌شود! دلیل آن را در کد پیدا و اصلاح کنید.',
      language: 'html',
      engine: 'bootstrap-js',
      useBootstrap: true,
      buggyCode: `<button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addToCartMsg">باز کردن پیام</button>
<div class="modal fade" id="addTocartMsg" tabindex="-1">
  <div class="modal-dialog"><div class="modal-content p-3">مودال با موفقیت باز شد!</div></div>
</div>`,
      fixedCode: `<button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addToCartMsg">باز کردن پیام</button>
<div class="modal fade" id="addToCartMsg" tabindex="-1">
  <div class="modal-dialog"><div class="modal-content p-3">مودال با موفقیت باز شد!</div></div>
</div>`,
      hint: 'به حروف بزرگ و کوچک در id="addTocartMsg" و data-bs-target="#addToCartMsg" دقت کنید.',
      teacherExplanation: 'تفاوت بین c کوچک و C بزرگ باعث می‌شود بوت‌استرپ عنصر مودال را پیدا نکند.',
    },
    {
      id: 'bug-3-1-table-rounded',
      title: 'چالش ۲: اصلاح کلاس‌های غلط ص ۱۵۲ و دکمه بدون کلاس btn',
      sourceLabel: 'خطاهای ص ۱۵۲ کتاب',
      description: 'در کد زیر حاشیه قرمز و گوشه بدون گردی و ظاهر دکمه خراب هستند؛ هر سه را استاندارد کنید.',
      language: 'html',
      engine: 'bootstrap-js',
      useBootstrap: true,
      buggyCode: `<div class="p-3 border danger-danger rounded-1 mb-2">هشدار بدون گردی</div>
<button class="btn-success">تأیید</button>`,
      fixedCode: `<div class="p-3 border border-danger rounded-0 mb-2">هشدار بدون گردی</div>
<button class="btn btn-success">تأیید</button>`,
      hint: 'border-danger، rounded-0 و کلاس پایه btn پیش از btn-success.',
      teacherExplanation: 'تثبیت سه خطای بسیار رایج در کلاس‌های Utility بوت‌استرپ ۵.۳.',
    },
  ],
  rubric: {
    title: 'ارزشیابی شایستگی واحد ۳.۱ — توسعه صفحات با بوت‌استرپ',
    pageRange: 'صفحات ۱۹۰ و ۱۹۱ کتاب درسی',
    stages: [
      {stageNumber: 1, title: 'راه‌اندازی بوت‌استرپ ۵.۳ RTL و کلاس‌های کاربردی', isCritical: true, criteria: {score1: 'خطا در اتصال یا RTL', score2: 'کاربرد کلاس‌های رنگ و فاصله', score3: 'استفاده تمیز از کل مجموعه Utility Classes'}},
      {stageNumber: 2, title: 'به‌کارگیری ابزارک‌های نوار ابزار و کلاس‌های نمایش', isCritical: false, criteria: {score1: 'عدم تفکیک نمای موبایل و دسکتاپ', score2: 'استفاده ساده از d-none', score3: 'پیاده‌سازی نوار ابزار دسکتاپ و موبایل'}},
      {stageNumber: 3, title: 'طراحی شبکه ۱۲ ستونه واکنش‌گرا و تصاویر img-fluid', isCritical: true, criteria: {score1: 'سرریز افقی در موبایل', score2: 'شبکه پایه با یک Breakpoint', score3: 'شبکه چندنقطه‌ای (sm/md/lg) و تصاویر واکنش‌گرا'}},
      {stageNumber: 4, title: 'پیاده‌سازی Navbar، فرم بوت‌استرپ و Modal/Accordion', isCritical: true, criteria: {score1: 'عدم کارکرد دکمه‌های تعاملی', score2: 'پیاده‌سازی یک مؤلفه تعاملی', score3: 'عملکرد بی‌نقص Navbar، Modal، Carousel و FAQ'}},
      {stageNumber: 5, title: 'سفارشی‌سازی استایل‌ها بدون تخریب فریم‌ورک', isCritical: false, criteria: {score1: 'تداخل شدید استایل‌ها', score2: 'سفارشی‌سازی جزئی', score3: 'سفارشی‌سازی اصولی و تمیز'}},
      {stageNumber: 6, title: 'تست واکنش‌گرایی در اندازه‌های مختلف صفحه', isCritical: false, criteria: {score1: 'تست‌نشده', score2: 'تست در یک عرض', score3: 'تأیید کامل در موبایل، تبلت و دسکتاپ'}},
    ],
  },
};
