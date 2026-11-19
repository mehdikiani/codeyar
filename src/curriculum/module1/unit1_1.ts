import type {LearningUnit} from '../../types/curriculum.ts';
import {UNIT_1_1_LESSONS_PART_1} from './unit1_1/lessonsPart1.ts';
import {UNIT_1_1_LESSONS_PART_2} from './unit1_1/lessonsPart2.ts';
import {
  UNIT_1_1_ACTIVITIES,
  UNIT_1_1_HOMEWORKS,
  UNIT_1_1_QUICK_QUIZZES,
} from './unit1_1/exercisesAndBank.ts';

const UNIT_1_1_LESSONS = [...UNIT_1_1_LESSONS_PART_1, ...UNIT_1_1_LESSONS_PART_2];

export const UNIT_1_1: LearningUnit = {
  id: 'unit-1-1',
  moduleId: 'module1',
  unitNumber: '۱.۱',
  title: 'مدل‌سازی داده (متغیرها، لیست، شرط و حلقه)',
  pageRange: 'صفحات ۲ تا ۴۷',
  estimatedMinutes: 300,
  engine: 'python',
  contentStatus: 'complete',
  flagshipProject: 'پروژه آشپزباشی، فروشگاه هوشمند، قفل رمز عبور و سامانه سفارش غذا با حلقه while',
  objectives: [
    'درک ساختار نحوی پایتون، تورفتگی (Indentation)، دستور print با پارامترهای end/sep و رشته‌های سه‌کوتیشنی',
    'تعریف متغیرها و تشخیص ۴ نوع داده پایه (str, int, float, bool) همراه با قواعد PEP 8 و اصلاح کلمات کلیدی ص ۱۰',
    'به‌کارگیری عملگرهای ریاضی (+, -, *, /, //, %, **)، مقایسه‌ای و منطقی (and, or, not) با درک دقیق اولویت‌ها',
    'دریافت ورودی کاربر با input() و تبدیل نوع داده (int, float, str, bool) در مثال‌های واقعی مثل مالیات ۹٪',
    'مدیریت فهرست داده‌ها با لیست و متدهای append، insert، remove، pop و دسترسی با اندیس مثبت/منفی و برش (Slicing)',
    'ساخت تصمیم‌گیری چندشاخه با if / elif / else و تکرار عملیات با حلقه‌های for (range سه‌حالته و _) و while (break / continue)',
  ],
  warmupQuestions: [
    {
      question:
        'اگر بخواهید برنامه‌ای بنویسید که هر روز ناهار را تصادفی از میان غذاهای موردعلاقه‌تان پیشنهاد دهد، رایانه چه اطلاعاتی را باید ذخیره و پردازش کند؟',
      teacherAnswer:
        'ابتدا فهرستی از نام غذاها (لیست / list) ذخیره می‌شود، سپس با ماژول random یک انتخاب تصادفی صورت می‌گیرد و با print نمایش داده می‌شود (پیش‌درآمد پروژه آشپزباشی).',
    },
    {
      question:
        'چرا اگر قیمت کالا را از کاربر با input() بگیریم و بخواهیم ۹٪ مالیات روی آن حساب کنیم، پایتون بدون تبدیل نوع خطا می‌دهد؟',
      teacherAnswer:
        'زیرا تابع input() همیشه خروجی را از نوع رشته متنی (str) برمی‌گرداند و ضرب رشته در عدد اعشاری 0.09 باعث خطای TypeError می‌شود؛ باید پیش از محاسبه با float() یا int() تبدیل نوع انجام دهیم.',
    },
    {
      question:
        'تفاوت حلقه‌ای که دقیقاً می‌دانیم ۱۰ بار تکرار می‌شود با حلقه‌ای که تا زمان تایپ کلمه done توسط مشتری ادامه دارد چیست؟',
      teacherAnswer:
        'برای تکرارهای با تعداد مشخص یا پیمایش اعضای یک لیست از حلقه for استفاده می‌کنیم، اما وقتی شرط پایان به رفتار کاربر در لحظه اجرا وابسته است، حلقه while انتخاب استاندارد است.',
    },
  ],
  teacherOverviewTips: [
    'پیش از ورود به کدنویسی، حتماً در تب «۲. شهود بصری» هر ۴ آزمایشگاه تعاملی (حافظه RAM، نوار لیست، درخت تصمیم و ردیاب حلقه) را مرحله‌به‌مرحله با کلاس تمرین کنید.',
    'در تب «۳. درسنامه و مثال‌ها»، کل واحد ۱.۱ در ۸ مبحث خودآموز و ۳۲ مثال سطح‌بندی‌شده (پایه / کاربردی / ترکیبی / خطای عمدی) سازماندهی شده است؛ هر جلسه ۱ تا ۲ مبحث را تدریس کنید.',
    'در صفحه ۱۰ کتاب کلیدواژه‌های var و const به‌اشتباه در جدول کلمات کلیدی پایتون چاپ شده و در ص ۳۱ غلط املایی exelent و هم‌پوشانی بازه ۶۹ وجود دارد؛ در درسنامه و تب خطایابی هر دو اصلاح شده‌اند.',
    'در پایان هر جلسه، از تب «۶. آزمونک سریع» ۲ تا ۳ سؤال «خروجی چیست؟» روی پروژکتور اجرا کنید و تکالیف متناظر را از تب «۵. تکلیف منزل» به‌صورت برگه آماده چاپ به هنرجویان بدهید.',
  ],
  visualLab: {
    id: 'python-memory-list',
    title: '۴ آزمایشگاه شهود بصری واحد ۱.۱ (حافظه RAM، نوار لیست، درخت تصمیم و ردیاب حلقه)',
    subtitle:
      'با جابه‌جایی میان ۴ زبانه زیر، مفاهیم انتزاعی متغیرها، اندیس‌گذاری لیست، شاخه‌های شرطی و حلقه‌ها را پیش از کدنویسی به چشم ببینید.',
    teacherGuide:
      'در آزمایشگاه ۱ متغیر عددی و متنی بسازید تا تغییر برچسب type را ببینند؛ در آزمایشگاه ۲ با insert(1, "کیوی") نشان دهید که عنصر دقیقاً در اندیس ۱ (جایگاه دوم) می‌نشیند؛ در آزمایشگاه ۳ اسلایدر نمره را روی 69 و 70 بگذارید و در آزمایشگاه ۴ گام‌های break و continue را یکی‌یکی پیش ببرید.',
    classroomQuestion:
      'اگر در نوار نقاله لیست ۴ عضو داشته باشیم، اندیس آخرین عضو هم به صورت مثبت و هم به صورت منفی چه عددی است؟',
  },
  lessons: UNIT_1_1_LESSONS,
  examples: UNIT_1_1_LESSONS.flatMap((l) => l.examples),
  activities: UNIT_1_1_ACTIVITIES,
  homeworks: UNIT_1_1_HOMEWORKS,
  quickQuizzes: UNIT_1_1_QUICK_QUIZZES,
  gapNotes: [
    {
      id: 'gap-1-1-keywords',
      title: 'اصلاح جدول کلمات کلیدی ص ۱۰ (حذف var و const)',
      badge: 'اصلاح مهم کتاب',
      content:
        'در صفحه ۱۰ کتاب به‌اشتباه var و const در فهرست کلمات کلیدی پایتون آورده شده‌اند. این دو کلیدواژه متعلق به جاوااسکریپت هستند. کلمات کلیدی واقعی پایتون شامل if, elif, else, for, while, break, continue, def, return, class, True, False, None, and, or, not, in, is, import, try, except هستند.',
    },
    {
      id: 'gap-1-1-div-pow',
      title: 'تفاوت / با // و عملگر توان **',
      badge: 'تکمیل شکاف کتاب',
      content:
        'عملگر / همیشه عدد اعشاری (float) برمی‌گرداند، // فقط خارج‌قسمت صحیح می‌دهد و ** برای توان است (نه ^).',
      codeSnippet: `print(10 / 2)   # 5.0 (float)\nprint(10 // 3)  # 3 (int)\nprint(3 ** 3)   # 27`,
      language: 'python',
    },
    {
      id: 'gap-1-1-slicing',
      title: 'اندیس‌گذاری منفی و برش (Slicing) در لیست و رشته',
      badge: 'تکمیل شکاف کتاب',
      content:
        'اندیس -1 آخرین عنصر و -2 یکی‌مانده به آخر است. برش [start:stop] از start شروع شده و تا یک خانه پیش از stop پیش می‌رود.',
      codeSnippet: `word = "PYTHON"\nprint(word[-1])    # N\nprint(word[0:3])   # PYT`,
      language: 'python',
    },
    {
      id: 'gap-1-1-fstring',
      title: 'رشته‌های قالب‌بندی‌شده (f-string)',
      badge: 'تکمیل شکاف کتاب',
      content:
        'به‌جای چسباندن رشته‌ها با + و str()، کافی است حرف f را پیش از کوتیشن بگذارید و متغیرها را داخل {} بنویسید (در پودمان ۴ و ۵ بسیار پرکاربرد است).',
      codeSnippet: `name = "رضا"\nscore = 19.5\nprint(f"نمره {name} برابر {score} شد.")`,
      language: 'python',
    },
    {
      id: 'gap-1-1-safe-input',
      title: 'جلوگیری از کرش برنامه هنگام ورودی غیرعددی در input()',
      badge: 'نکته حرفه‌ای کلاس',
      content:
        'اگر کاربر به‌جای عدد، حروف وارد کند int() خطای ValueError می‌دهد. می‌توان پیش از تبدیل با متد .isdigit() عددی بودن رشته را بررسی کرد.',
      codeSnippet: `age_txt = input("سن: ")\nif age_txt.isdigit():\n    print("سن شما:", int(age_txt))\nelse:\n    print("لطفاً فقط عدد صحیح وارد کنید!")`,
      language: 'python',
    },
  ],
  bugChallenges: [
    {
      id: 'bug-1-1-type-input',
      title: 'چالش ۱: خطای TypeError هنگام محاسبه مالیات روی خروجی input()',
      sourceLabel: 'اشتباه رایج هنرجویان (ص ۱۵–۱۶)',
      description:
        'کد زیر قصد دارد ۹٪ مالیات را به قیمت ورودی اضافه کند اما هنگام اجرا خطای TypeError می‌دهد! خطا را پیدا و برطرف کنید.',
      language: 'python',
      engine: 'python',
      buggyCode: `price = input("قیمت کالا را وارد کنید (مثلاً 10000): ")
tax = price * 0.09
print("مبلغ نهایی:", price + tax)`,
      fixedCode: `price = float(input("قیمت کالا را وارد کنید (مثلاً 10000): "))
tax = price * 0.09
print("مبلغ نهایی:", price + tax)`,
      hint: 'نوع متغیر price پس از اجرای input() چیست؟ آیا می‌توان رشته را در 0.09 ضرب کرد؟',
      teacherExplanation:
        'تابع input() همیشه رشته برمی‌گرداند؛ با قرار دادن float() یا int() دور input() مشکل حل می‌شود.',
      classroomQuestion:
        'اگر به‌جای 0.09 عدد صحیح 2 را در رشته "100" ضرب می‌کردیم، آیا پایتون خطا می‌داد یا خروجی عجیبی چاپ می‌کرد؟',
    },
    {
      id: 'bug-1-1-banned-user',
      title: 'چالش ۲: خطای منطقی مسدودسازی کاربر (شکل ۶۰ ص ۲۷ کتاب)',
      sourceLabel: 'خطای واقعی کتاب ص ۲۷',
      description:
        'برنامه زیر قرار است دسترسی کاربر "ali" را مسدود کند، اما دقیقاً برعکس عمل می‌کند و به او اجازه ورود می‌دهد! شرط را اصلاح کنید.',
      language: 'python',
      engine: 'python',
      buggyCode: `banned_user = "ali"
current_user = "ali"

if current_user != banned_user:
    print("دسترسی شما مسدود است!")
else:
    print("خوش آمدید به سامانه!")`,
      fixedCode: `banned_user = "ali"
current_user = "ali"

if current_user == banned_user:
    print("دسترسی شما مسدود است!")
else:
    print("خوش آمدید به سامانه!")`,
      hint: 'به عملگر مقایسه != در خط ۴ دقت کنید؛ چه زمانی پیام مسدود بودن باید چاپ شود؟',
      teacherExplanation:
        'در شکل ۶۰ کتاب، کد شرط != نوشته شده بود اما توضیح فارسی ادعا می‌کرد دسترسی مسدود می‌شود. تبدیل != به == منطق را درست می‌کند.',
      classroomQuestion:
        'اگر دو کاربر مسدودشده داشته باشیم (ali و reza)، چگونه با لیست و عملگر in این شرط را بنویسیم؟',
    },
    {
      id: 'bug-1-1-grade-overlap',
      title: 'چالش ۳: خطای بازه مرزی و شرط‌های چندگانه (فعالیت ۴ ص ۳۱)',
      sourceLabel: 'خطای واقعی کتاب ص ۳۱',
      description:
        'این برنامه برای نمره 95 سه پیام مختلف چاپ می‌کند و برای نمره 69 هیچ پیامی نمی‌دهد! ساختار شرط را اصلاح کنید تا برای هر نمره دقیقاً یک پیام درست چاپ شود.',
      language: 'python',
      engine: 'python',
      buggyCode: `score = 95

if score >= 90:
    print("Exelent")
if score >= 70:
    print("Good")
if score >= 50:
    print("Pass")
else:
    print("Fail")`,
      fixedCode: `score = 95

if score >= 90:
    print("Excellent")
elif score >= 70:
    print("Good")
elif score >= 50:
    print("Pass")
else:
    print("Fail")`,
      hint: 'تفاوت استفاده از چند if پشت‌سرهم با if / elif / else چیست؟ املای Excellent را هم چک کنید!',
      teacherExplanation:
        'وقتی به‌جای elif از if استفاده شود، تمام شرط‌ها به‌طور مستقل بررسی شده و برای نمره ۹۵ هر سه پیام چاپ می‌شوند.',
      classroomQuestion:
        'اگر جای شرط score >= 50 و score >= 90 را در elif عوض کنیم، برای نمره ۹۵ چه خروجی می‌گیریم؟',
    },
    {
      id: 'bug-1-1-quote-paren',
      title: 'چالش ۴: خطای نحوی کوتیشن و پرانتز جاافتاده (شکل ۶۵ ص ۲۸)',
      sourceLabel: 'خطای واقعی کتاب ص ۲۸ و ۳۰',
      description:
        'کد زیر دو خطای نحوی و املایی از صفحات ۲۸ و ۳۰ کتاب دارد و اصلاً اجرا نمی‌شود. آن را تعمیر کنید.',
      language: 'python',
      engine: 'python',
      buggyCode: `level = "hard"
if level == "hard"
    print("Game id hard)
else:
    print("Game is easy")`,
      fixedCode: `level = "hard"
if level == "hard":
    print("Game is hard")
else:
    print("Game is easy")`,
      hint: 'انتهای خط ۲ (دونقطه) و انتهای رشته در خط ۳ (کوتیشن بسته) را بررسی کنید.',
      teacherExplanation:
        'فراموش کردن دونقطه (:) پس از if و نبستن کوتیشن از پرتکرارترین خطاهای SyntaxError در هفته‌های اول آموزش پایتون است.',
      classroomQuestion:
        'در پیام خطای SyntaxError پایتون، چگونه بفهمیم خطا دقیقاً در کدام خط رخ داده است؟',
    },
    {
      id: 'bug-1-1-underscore-loop',
      title: 'چالش ۵: خطای حلقه بی‌نهایت و استفاده نادرست از شمارنده (ص ۳۷ و ۴۲)',
      sourceLabel: 'خطای رایج حلقه‌ها (ص ۳۷ و ۴۲)',
      description:
        'حلقه while زیر شمارنده را افزایش نمی‌دهد (باعث حلقه بی‌نهایت و خطای RuntimeError می‌شود) و حلقه for از متغیر تعریف‌نشده چاپ می‌کند. هر دو را اصلاح کنید.',
      language: 'python',
      engine: 'python',
      buggyCode: `count = 1
while count <= 3:
    print("تکرار شماره:", count)

for _ in range(3):
    print("مقدار شمارنده:", i)`,
      fixedCode: `count = 1
while count <= 3:
    print("تکرار شماره:", count)
    count += 1

for i in range(1, 4):
    print("مقدار شمارنده:", i)`,
      hint: 'در حلقه while خط count += 1 جا افتاده و در حلقه for وقتی مقدار شمارنده لازم است نباید از _ استفاده کرد.',
      teacherExplanation:
        'تفاوت کلیدی: هرگاه مقدار شمارنده را چاپ یا محاسبه می‌کنیم نام معناداری مثل i می‌گذاریم، و هرگاه فقط تعداد تکرار مهم است از _ استفاده می‌کنیم.',
      classroomQuestion:
        'چرا سامانه ما هنگام حلقه بی‌نهایت قفل نکرد و خطای RuntimeError نشان داد؟ (مفهوم سقف ایمنی اجرا)',
    },
  ],
  rubric: {
    title: 'ارزشیابی شایستگی واحد ۱.۱ — مدل‌سازی داده',
    pageRange: 'صفحات ۴۶ و ۴۷ کتاب درسی',
    stages: [
      {
        stageNumber: 1,
        title: 'نصب و آماده‌سازی محیط برنامه‌نویسی پایتون و اجرای دستورهای پایه',
        isCritical: true,
        criteria: {
          score1: 'عدم توانایی در اجرای کد ساده یا خطای مداوم تورفتگی',
          score2: 'اجرای کدهای پایه print و کامنت با راهنمایی هنرآموز',
          score3: 'آماده‌سازی محیط، رعایت کامل تورفتگی و اجرای مستقل و بدون خطا',
        },
      },
      {
        stageNumber: 2,
        title: 'تعریف صحیح متغیرها، انواع داده (str/int/float/bool) و تبدیل نوع',
        isCritical: true,
        criteria: {
          score1: 'خطا در نام‌گذاری یا فراموشی تبدیل نوع خروجی input()',
          score2: 'رعایت قواعد اصلی نام‌گذاری و تبدیل نوع در مثال‌های ساده',
          score3: 'انتخاب دقیق نوع داده، نام‌گذاری PEP 8 و تبدیل نوع بی‌نقص در محاسبات',
        },
      },
      {
        stageNumber: 3,
        title: 'کار با لیست‌ها و متدهای ویرایش (append / insert / remove / pop)',
        isCritical: true,
        criteria: {
          score1: 'اشتباه در اندیس‌گذاری صفر یا خطا در استفاده از متدهای لیست',
          score2: 'استفاده درست از بخشی از متدهای لیست با راهنمایی',
          score3: 'مدیریت کامل لیست، درک دقیق اندیس‌گذاری مثبت/منفی و کاربرد صحیح متدها',
        },
      },
      {
        stageNumber: 4,
        title: 'پیاده‌سازی ساختارهای شرطی if / elif / else و عملگرهای منطقی',
        isCritical: false,
        criteria: {
          score1: 'خطا در تورفتگی، دونقطه یا عملگر مقایسه (== در برابر =)',
          score2: 'پیاده‌سازی شرط ساده بدون پوشش حالات مرزی',
          score3: 'پوشش کامل بازه‌ها بدون هم‌پوشانی و ترکیب صحیح and/or/not',
        },
      },
      {
        stageNumber: 5,
        title: 'استفاده از حلقه‌های for (range) و while همراه با break / continue',
        isCritical: false,
        criteria: {
          score1: 'ایجاد حلقه بی‌نهایت یا خطا در پارامترهای range',
          score2: 'پیاده‌سازی حلقه ساده روی لیست یا شمارنده',
          score3: 'استفاده بهینه از for/while، کنترل جریان با break/continue و حل مسائل عملی',
        },
      },
      {
        stageNumber: 6,
        title: 'رعایت اصول کدنویسی تمیز (PEP 8) و مستندسازی کد',
        isCritical: false,
        criteria: {
          score1: 'کد نامنظم، نام‌های بی‌معنا و بدون توضیح',
          score2: 'رعایت نسبی فاصله‌گذاری و نام‌گذاری خوانا',
          score3: 'کدنویسی کاملاً استاندارد PEP 8، خوانا و دارای کامنت‌های راهنما',
        },
      },
    ],
  },
};
