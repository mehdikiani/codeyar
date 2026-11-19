import type {LearningUnit} from '../../types/curriculum.ts';
import {UNIT_5_1_LESSONS} from './unit5_1/lessons.ts';
import {
  UNIT_5_1_ACTIVITIES,
  UNIT_5_1_HOMEWORKS,
  UNIT_5_1_QUIZZES,
} from './unit5_1/exercisesAndBank.ts';

export const UNIT_5_1: LearningUnit = {
  id: 'unit-5-1',
  moduleId: 'module5',
  unitNumber: '۵.۱',
  title: 'ایجاد وب‌اپلیکیشن جنگو (MVT, URLs, Views, Templates)',
  pageRange: 'صفحات ۲۷۶ تا ۲۹۴',
  estimatedMinutes: 165,
  engine: 'django-sql',
  contentStatus: 'complete',
  flagshipProject: 'راه‌اندازی پروژه هواشناسی meteo و نمایش ایمن دمای شهر از JSON',
  objectives: [
    'تفکیک وب‌سایت ایستا از وب‌اپلیکیشن پویا و درک دقیق معماری MVT جنگو',
    'ایجاد پروژه و اپلیکیشن (startproject config . / startapp weather) و ثبت در INSTALLED_APPS',
    'مسیریابی دو لایه در urls.py با path، include و نام‌گذاری مسیرها (name)',
    'نوشتن View با HttpResponse و render() و ارسال دیکشنری context به قالب‌های RTL فارسی',
    'استفاده از زبان قالب جنگو ({{ }}، {% for %}، {% url %}) و شرط ایمن {% if temp is not None %}',
    'دریافت و استخراج داده JSON آب‌وهوا با مدیریت خطا و مختصات دقیق جغرافیایی',
  ],
  warmupQuestions: [
    {
      question: 'تفاوت یک صفحه HTML ثابت با یک وب‌اپلیکیشن جنگو (مثل سامانه آب‌وهوا) در چیست؟',
      teacherAnswer:
        'وب‌اپلیکیشن بر اساس درخواست هر کاربر، اطلاعات زنده را از پایگاه‌داده یا API می‌خواند و صفحه HTML را همان لحظه به‌صورت پویا تولید می‌کند.',
    },
    {
      question: 'اگر دمای شهر اردبیل در یک روز زمستانی دقیقاً 0 درجه سانتی‌گراد باشد، آیا شرط {% if temp %} آن را نمایش می‌دهد؟',
      teacherAnswer:
        'خیر! در پایتون و جنگو عدد 0 مقدار Falsy دارد؛ بنابراین شرط کتاب ص ۲۹۱ اشتباه عمل می‌کند و حتماً باید بنویسیم {% if temp is not None %}.',
    },
  ],
  teacherOverviewTips: [
    'در ص ۲۹۱ کتاب دو خطای مهم وجود دارد: ۱) عرض جغرافیایی همدان 37.7981 نوشته شده (درست: 34.7981) و ۲) شرط قالب {% if temp %} در دمای صفر درجه اشتباه عمل می‌کند! هر دو به‌صورت زنده در این واحد قابل آزمایشند.',
    'در تب «۲. شهود بصری» روی شهر اردبیل (دمای ۰ درجه) کلیک کنید و کلید مقایسه «کد کتاب» در برابر «کد اصلاح‌شده» را برای کلاس بزنید.',
    'تأکید کنید برای اجرای تمام مثال‌ها و تمرین‌های این واحد هیچ نیازی به اینترنت یا نصب پایتون/جنگو روی سیستم دانش‌آموزان نیست.',
  ],
  visualLab: {
    id: 'django-mvt-cycle',
    title: 'پویانمایی چرخه MVT جنگو و میزکار آب‌وهوای آفلاین',
    subtitle: 'مراحل Request تا Response و باگ دمای ۰ درجه (اردبیل) را زنده آزمایش کنید.',
    teacherGuide:
      'روی شهر اردبیل (دمای ۰ درجه) کلیک کرده و کلید «کد کتاب: if temp» را بزنید تا هنرجویان ببینند چطور صفر درجه اشتباهاً «ناموجود» نشان داده می‌شود!',
    classroomQuestion: 'چرا در فایل urls.py نام تابع View را بدون پرانتز (views.home_view) می‌نویسیم؟',
  },
  lessons: UNIT_5_1_LESSONS,
  examples: UNIT_5_1_LESSONS.flatMap((lesson) => lesson.examples),
  activities: UNIT_5_1_ACTIVITIES,
  homeworks: UNIT_5_1_HOMEWORKS,
  quickQuizzes: UNIT_5_1_QUIZZES,
  gapNotes: [
    {
      id: 'gap-5-1-coords',
      title: 'اصلاح مختصات جغرافیایی شهر همدان (ص ۲۹۱ و ۳۰۴)',
      badge: 'اصلاح داده کتاب',
      content:
        'در صفحات ۲۹۱ و ۳۰۴ عرض جغرافیایی همدان ۳۷.۷۹۸۱ درج شده که متعلق به شمال ایران (حوالی اردبیل، با بیش از ۳۳۰ کیلومتر خطا) است؛ مختصات صحیح همدان lat = 34.7981 و lon = 48.5146 می‌باشد.',
      codeSnippet: `HAMEDAN = {"title": "همدان", "lat": 34.7981, "lon": 48.5146}`,
      language: 'python',
    },
    {
      id: 'gap-5-1-timeout',
      title: 'افزودن timeout در درخواست‌های واقعی requests.get()',
      badge: 'نکته حرفه‌ای بک‌اند',
      content:
        'هنگام اجرای پروژه واقعی روی سیستم‌های متصل به اینترنت، همیشه به requests.get(url, timeout=5) مهلت زمانی بدهید تا در صورت کندی یا قطعی اینترنت، سرور جنگو قفل نشود.',
      codeSnippet: `response = requests.get(url, timeout=5)\ndata = response.json()`,
      language: 'python',
    },
  ],
  bugChallenges: [
    {
      id: 'bug-5-1-zero-temp',
      title: 'اصلاح باگ دمای صفر درجه در قالب جنگو (ص ۲۹۱)',
      sourceLabel: 'باگ منطقی کتاب ص ۲۹۱',
      description: 'کد زیر وقتی دما 0 درجه است به‌اشتباه پیام «دما در دسترس نیست» چاپ می‌کند! شرط قالب را اصلاح و اجرا کنید.',
      language: 'django-html',
      engine: 'django-sql',
      buggyCode: `{% if temp %}
  <p>دمای فعلی: {{ temp }} درجه</p>
{% else %}
  <p style="color:red;">خطا: دما در دسترس نیست!</p>
{% endif %}`,
      fixedCode: `{% if temp is not None %}
  <p style="color:green;font-weight:bold;">دمای فعلی: {{ temp }} درجه</p>
{% else %}
  <p style="color:red;">خطا: دما در دسترس نیست!</p>
{% endif %}`,
      hint: 'در پایتون و جنگو عدد 0 برابر False است؛ برای بررسی وجود مقدار از is not None استفاده کنید.',
      teacherExplanation: 'این یکی از واقعی‌ترین باگ‌های دنیای برنامه‌نویسی وب است که هنرجویان را با تفاوت 0 و None آشنا می‌کند.',
    },
    {
      id: 'bug-5-1-endfor',
      title: 'رفع خطای جا افتادن تگ پایانی و دونقطه اضافی در قالب',
      sourceLabel: 'خطای رایج کارگاهی DTL',
      description: 'کد زیر لیست شهرها را با سینتکس نادرست پایتونی نوشته است؛ آن را مطابق استاندارد زبان قالب جنگو اصلاح کنید.',
      language: 'django-html',
      engine: 'django-sql',
      buggyCode: `<ul style="direction:rtl;">
  {% for c in cities: %}
    <li>{{ c.title }}</li>
</ul>`,
      fixedCode: `<ul style="direction:rtl;">
  {% for c in cities %}
    <li>{{ c.title }}</li>
  {% endfor %}
</ul>`,
      hint: 'دونقطه را از پایان تگ for حذف کنید و پیش از </ul> تگ {% endfor %} بگذارید.',
      teacherExplanation: 'بسیاری از هنرجویان به عادت پایتون دونقطه می‌گذارند یا {% endfor %} را فراموش می‌کنند.',
    },
  ],
  rubric: {
    title: 'ارزشیابی شایستگی واحد ۵.۱ — ایجاد وب‌اپلیکیشن جنگو',
    pageRange: 'صفحات ۲۹۳ و ۲۹۴ کتاب درسی',
    stages: [
      {
        stageNumber: 1,
        title: 'نصب جنگو و ایجاد پروژه config با startproject',
        isCritical: true,
        criteria: {
          score1: 'خطا در ساخت پروژه',
          score2: 'ساخت پروژه با راهنمایی',
          score3: 'ساخت پروژه و اجرای موفق runserver',
        },
      },
      {
        stageNumber: 2,
        title: 'ساخت اپلیکیشن weather و ثبت در INSTALLED_APPS',
        isCritical: true,
        criteria: {
          score1: 'عدم ثبت اپلیکیشن',
          score2: 'ساخت اپلیکیشن',
          score3: 'ساخت و پیکربندی کامل settings.py',
        },
      },
      {
        stageNumber: 3,
        title: 'تعریف مسیریابی در urls.py پروژه و اپلیکیشن',
        isCritical: true,
        criteria: {
          score1: 'خطای 404 در مسیر',
          score2: 'تعریف مسیر ساده',
          score3: 'استفاده صحیح از include و نام‌گذاری مسیرها',
        },
      },
      {
        stageNumber: 4,
        title: 'نوشتن View با HttpResponse و render()',
        isCritical: true,
        criteria: {
          score1: 'خطا در بازگشت پاسخ',
          score2: 'بازگشت متن ساده',
          score3: 'ارسال context ساختاریافته به قالب',
        },
      },
      {
        stageNumber: 5,
        title: 'طراحی قالب HTML فارسی و نمایش متغیرهای context',
        isCritical: true,
        criteria: {
          score1: 'خطا در تگ‌های قالب',
          score2: 'نمایش متغیر ساده',
          score3: 'قالب استاندارد RTL با شرط ایمن is not None',
        },
      },
      {
        stageNumber: 6,
        title: 'دریافت و نمایش داده JSON آب‌وهوا با مدیریت خطا',
        isCritical: true,
        criteria: {
          score1: 'کرش هنگام قطع ارتباط',
          score2: 'استخراج دما بدون try/except',
          score3: 'مدیریت کامل خطا و نمایش دقیق دما',
        },
      },
    ],
  },
};
