import type {LearningUnit} from '../../types/curriculum.ts';
import {UNIT_5_2_LESSONS} from './unit5_2/lessons.ts';
import {
  UNIT_5_2_ACTIVITIES,
  UNIT_5_2_HOMEWORKS,
  UNIT_5_2_QUIZZES,
} from './unit5_2/exercisesAndBank.ts';

export const UNIT_5_2: LearningUnit = {
  id: 'unit-5-2',
  moduleId: 'module5',
  unitNumber: '۵.۲',
  title: 'توسعه وب‌اپلیکیشن (Models, SQLite ORM, Auth, Forms & Security)',
  pageRange: 'صفحات ۲۹۵ تا ۳۲۹',
  estimatedMinutes: 185,
  engine: 'django-sql',
  contentStatus: 'complete',
  flagshipProject: 'تکمیل وب‌اپلیکیشن meteo با مدل City، پایگاه‌داده SQLite، ورود کاربر و ایمن‌سازی CRUD',
  objectives: [
    'تعریف مدل City و متد __str__ در models.py، اجرای makemigrations / migrate روی SQLite و ثبت در پنل ادمین',
    'نوشتن پرس‌وجوهای پایه SQL (SELECT, WHERE, ORDER BY, INSERT) روی جدول واقعی weather_city',
    'تسلط بر Django ORM (all, first, last, count, filter, order_by, create, delete) و درک ترجمه SQL آن',
    'واکشی ایمن بدون کرش با filter().first() و مدیریت حالت جدول خالی و شناسه نامعتبر',
    'پیاده‌سازی احراز هویت (login/logout، user.is_authenticated)، ModelForm و سپر امنیتی {% csrf_token %}',
    'ایمن‌سازی نهایی عملیات حذف POST و رفع تمام باگ‌های بحرانی و امنیتی پایانی کتاب (ص ۳۲۳، ۳۲۴ و ۳۲۷)',
  ],
  warmupQuestions: [
    {
      question: 'چرا در حذف یک شهر از پایگاه‌داده نباید از لینک ساده GET استفاده کرد و حتماً باید فرم POST همراه با csrf_token و بررسی لاگین کاربر وجود داشته باشد؟',
      teacherAnswer:
        'تا هر بازدیدکننده عادی یا لینک مخرب نتواند رکوردهای پایگاه‌داده را حذف کند؛ عملیات تغییر/حذف داده همیشه نیازمند POST، توکن CSRF و احراز هویت در سمت سرور است.',
    },
    {
      question: 'اگر در View بنویسیم City.objects.get(id=999) و شهر شماره ۹۹۹ وجود نداشته باشد چه اتفاقی می‌افتد؟',
      teacherAnswer:
        'جنگو خطای City.DoesNotExist پرتاب کرده و صفحه با خطای 500 متوقف می‌شود! روش ایمن استفاده از City.objects.filter(id=999).first() است که بدون کرش مقدار None برمی‌گرداند.',
    },
  ],
  teacherOverviewTips: [
    'در تب «۲. شهود بصری» یک SQLite واقعی (sql.js WASM) با جدول weather_city آماده است؛ می‌توانید روی دکمه «کاربر مهمان» کلیک کنید و آسیب‌پذیری امنیتی ص ۳۲۷ را زنده به کلاس نشان دهید.',
    'در ص ۳۲۸ جدول ارزشیابی کتاب اشتباهاً نام PostgreSQL چاپ شده که در اینجا به SQLite (مطابق کل فصل) اصلاح و توضیح داده شده است.',
    'هر سه باگ مهم پایان فصل (ص ۳۲۳ `.get()`، ص ۳۲۴ کوتیشن `action` و ص ۳۲۷ نبود قفل `is_authenticated` در View) در درسنامه‌ها و چالش‌های خطایابی به طور کامل پوشش داده شده‌اند.',
  ],
  visualLab: {
    id: 'django-orm-sqlite',
    title: 'میزکار زنده SQLite WASM + ترجمه Django ORM به SQL + شبیه‌ساز امنیتی',
    subtitle: 'روی جدول واقعی weather_city شهر اضافه یا حذف کنید، ترجمه دقیق ORM به SQL را ببینید و خطای get(id=999) را تست کنید.',
    teacherGuide:
      'حتماً دکمه «تست خطای .get(id=999)» را در برابر «.filter(id=2).first()» اجرا کنید تا علت باگ بحرانی ص ۳۲۳ برای همه روشن شود.',
    classroomQuestion: 'چرا مخفی کردن دکمه حذف در HTML برای کاربر مهمان به تنهایی امنیت پایگاه‌داده را تضمین نمی‌کند؟',
  },
  lessons: UNIT_5_2_LESSONS,
  examples: UNIT_5_2_LESSONS.flatMap((lesson) => lesson.examples),
  activities: UNIT_5_2_ACTIVITIES,
  homeworks: UNIT_5_2_HOMEWORKS,
  quickQuizzes: UNIT_5_2_QUIZZES,
  gapNotes: [
    {
      id: 'gap-5-2-quotes',
      title: 'نقل‌قول دور action در فرم حذف (ص ۳۲۴) و پایگاه‌داده SQLite (ص ۳۲۸)',
      badge: 'اصلاح ص ۳۲۴ و ۳۲۸',
      content:
        'در ص ۳۲۴ حتماً آدرس اکشن را داخل کوتیشن بنویسید: action="{% url \'delete_city\' %}". همچنین در جدول ارزشیابی ص ۳۲۸ نام پایگاه‌داده اشتباهاً PostgreSQL چاپ شده در حالی که کل پروژه از SQLite استفاده می‌کند.',
      codeSnippet: `<form method="post" action="{% url 'delete_city' %}">\n  {% csrf_token %}\n  <input type="hidden" name="city_id" value="{{ city.id }}" />\n</form>`,
      language: 'django-html',
    },
    {
      id: 'gap-5-2-login-required',
      title: 'دکوریتور @login_required در جنگو (راهکار استاندارد رفع آسیب‌پذیری ص ۳۲۷)',
      badge: 'استاندارد امنیت جنگو',
      content:
        'علاوه بر نوشتن شرط if not request.user.is_authenticated در ابتدای View، در پروژه‌های حرفه‌ای جنگو از دکوریتور آماده @login_required بالای توابع add_city_view و delete_city_view استفاده می‌شود تا کاربران مهمان خودکار به صفحه ورود هدایت شوند.',
      codeSnippet: `from django.contrib.auth.decorators import login_required\n\n@login_required\ndef delete_city_view(request):\n    ...`,
      language: 'python',
    },
  ],
  bugChallenges: [
    {
      id: 'bug-5-2-get-crash',
      title: 'جلوگیری از کرش DoesNotExist هنگام یافتن شناسه نامعتبر (ص ۳۲۳)',
      sourceLabel: 'باگ بحرانی کتاب ص ۳۲۳',
      description: 'دستور زیر هنگام جستجوی شهر با شناسه ۹۹۹ خطای City.DoesNotExist می‌دهد؛ آن را به روش ایمن جنگو تغییر دهید تا بدون خطا اجرا شود.',
      language: 'python',
      engine: 'django-sql',
      buggyCode: `City.objects.get(id=999)`,
      fixedCode: `City.objects.filter(id=999).first()`,
      hint: 'به‌جای .get() که در نبود رکورد Exception پرتاب می‌کند، از ترکیب .filter(...).first() استفاده کنید.',
      teacherExplanation: 'این دقیقاً همان باگی است که در شکل ۷۱ ص ۳۲۳ کتاب وجود داشت.',
    },
    {
      id: 'bug-5-2-unquoted-action',
      title: 'اصلاح کوتیشن صفت action و افزودن {% csrf_token %} در فرم حذف (ص ۳۲۴)',
      sourceLabel: 'باگ HTML و امنیت ص ۳۲۴',
      description: 'در فرم حذف زیر هم کوتیشن دور action جا افتاده و هم تگ {% csrf_token %} فراموش شده است! آن را استاندارد و ایمن کنید.',
      language: 'django-html',
      engine: 'django-sql',
      buggyCode: `<form method="post" action={% url 'delete_city' %}>
  <input type="hidden" name="city_id" value="{{ city.id }}" />
  <button type="submit">حذف شهر</button>
</form>`,
      fixedCode: `<form method="post" action="{% url 'delete_city' %}">
  {% csrf_token %}
  <input type="hidden" name="city_id" value="{{ city.id }}" />
  <button type="submit">حذف شهر</button>
</form>`,
      hint: 'دابل‌کوتیشن را دور {% url ... %} قرار دهید و {% csrf_token %} را خط اول داخل فرم اضافه کنید.',
      teacherExplanation: 'بدون کوتیشن HTML نامعتبر و بدون توکن CSRF درخواست POST توسط جنگو با خطای 403 رد می‌شود.',
    },
  ],
  rubric: {
    title: 'ارزشیابی شایستگی واحد ۵.۲ — توسعه وب‌اپلیکیشن جنگو',
    pageRange: 'صفحات ۳۲۸ و ۳۲۹ کتاب درسی (اصلاح‌شده)',
    auditNotice:
      'در ص ۳۲۸ کتاب در ردیف ۱ نام پایگاه‌داده اشتباهاً PostgreSQL چاپ شده است؛ از آنجا که کل پروژه کتاب (ص ۳۰۰ تا ۳۲۷) روی db.sqlite3 اجرا می‌شود، در این جدول به SQLite اصلاح گردید.',
    stages: [
      {
        stageNumber: 1,
        title: 'تعریف مدل City، اجرای مهاجرت‌ها و پنل ادمین (SQLite)',
        isCritical: false,
        criteria: {
          score1: 'خطا در مدل یا migrate',
          score2: 'ساخت جدول بدون ثبت در admin',
          score3: 'ثبت کامل مدل، __str__ و مدیریت شهرها در SQLite',
        },
        teacherAuditNote: 'اصلاح PostgreSQL به SQLite مطابق متن فصل.',
      },
      {
        stageNumber: 2,
        title: 'استفاده از Django ORM و نمایش لیست و جزئیات شهرها',
        isCritical: true,
        criteria: {
          score1: 'خطا در واکشی رکوردها',
          score2: 'نمایش لیست ساده',
          score3: 'پیاده‌سازی کامل ORM، حلقه قالب و کوئری ?id=',
        },
      },
      {
        stageNumber: 3,
        title: 'پیاده‌سازی احراز هویت، ModelForm افزودن و حذف POST',
        isCritical: true,
        criteria: {
          score1: 'نبود csrf_token یا خطای فرم',
          score2: 'افزودن/حذف بدون کنترل دسترسی',
          score3: 'فرم کامل همراه با احراز هویت و کنترل user.is_authenticated',
        },
      },
      {
        stageNumber: 4,
        title: 'اشکال‌زدایی (جدول خالی، شناسه نامعتبر) و ایمن‌سازی نهایی',
        isCritical: false,
        criteria: {
          score1: 'کرش در حالت جدول خالی یا ID اشتباه',
          score2: 'رفع بخشی از خطاها',
          score3: 'رفع کامل هر ۳ باگ منطقی و امنیتی پایانی',
        },
      },
    ],
  },
};
