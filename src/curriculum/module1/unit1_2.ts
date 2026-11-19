import type {LearningUnit} from '../../types/curriculum.ts';
import {UNIT_1_2_LESSONS_PART_1} from './unit1_2/lessonsPart1.ts';
import {UNIT_1_2_LESSONS_PART_2} from './unit1_2/lessonsPart2.ts';
import {
  UNIT_1_2_ACTIVITIES,
  UNIT_1_2_HOMEWORKS,
  UNIT_1_2_QUICK_QUIZ,
} from './unit1_2/exercisesAndBank.ts';

const UNIT_1_2_LESSONS = [...UNIT_1_2_LESSONS_PART_1, ...UNIT_1_2_LESSONS_PART_2];

export const UNIT_1_2: LearningUnit = {
  id: 'unit-1-2',
  moduleId: 'module1',
  unitNumber: '۱.۲',
  title: 'کار با توابع و ماژول‌ها (set, dict, tuple, def, modules)',
  pageRange: 'صفحات ۴۸ تا ۸۱',
  estimatedMinutes: 270,
  engine: 'python-fs',
  contentStatus: 'complete',
  flagshipProject: 'پروژه بازی آزمون (Quiz)، ماشین‌حساب ۹ گزینه‌ای، ماژول محلی و گرافیک Turtle',
  objectives: [
    'مدیریت داده‌های بدون تکرار با set (add, remove, discard, in) و درک تفاوت {} با set()',
    'ساخت و ویرایش دیکشنری‌ها (dict) با کلید:مقدار، دسترسی ایمن با get()، حذف با del/pop() و پیمایش items()',
    'شناخت تاپل‌های تغییرناپذیر (tuple)، تاپل تک‌عضوی (x,)، باز کردن تاپل و اصلاح شکل ۱۲۷ ص ۶۱',
    'تعریف توابع با def، تفکیک پارامتر از آرگومان (موقعیتی، کلیدی، پیش‌فرض) و تفاوت return با print / None و حوزه Local/Global',
    'استفاده از توابع داخلی ریاضی (abs, round, pow, max, min, sum, divmod) و مرتب‌سازی با sorted()',
    'فراخوانی ماژول‌های استاندارد (math, random, datetime, turtle)، ساخت ماژول محلی و تفکیک تابع از متد',
  ],
  warmupQuestions: [
    {
      question:
        'چرا ذخیره کردن پرسش و پاسخ‌های یک بازی آزمون (Quiz) در دیکشنری (dict) بسیار ساده‌تر و امن‌تر از دو لیست جداگانه است؟',
      teacherAnswer:
        'در دیکشنری هر پرسش (کلید) مستقیماً به پاسخ خودش (مقدار) متصل است و امکان جابه‌جا شدن یا ناهماهنگی اندیس‌ها میان دو لیست از بین می‌رود.',
    },
    {
      question:
        'اگر بخواهیم یک کد محاسبه‌گر مالیات را در ۲۰ جای مختلف یک سایت فروشگاهی استفاده کنیم، چرا نوشتن آن داخل یک تابع (def) حیاتی است؟',
      teacherAnswer:
        'با تعریف تابع، کد فقط یک‌بار نوشته می‌شود؛ اگر روزی نرخ مالیات تغییر کند، تنها همان یک تابع ویرایش می‌شود (اصل DRY: خودت را تکرار نکن).',
    },
    {
      question:
        'تفاوت بین تابعی که مقدار را با print() چاپ می‌کند و تابعی که مقدار را با return برمی‌گرداند چیست؟',
      teacherAnswer:
        'print فقط روی صفحه نمایش می‌دهد و خروجی واقعی تابع None است؛ اما return نتیجه را تحویل برنامه می‌دهد تا بتوانیم آن را در متغیر ذخیره یا در محاسبات بعدی استفاده کنیم.',
    },
  ],
  teacherOverviewTips: [
    'این واحد دارای ۷ مبحث درسنامه کامل (۲۸ مثال اجرایی سطح‌بندی‌شده)، ۸ تمرین/پروژه کلاسی با روش حل جایگزین، ۱۰ تکلیف منزل چاپی و ۱۰ پرسش آزمونک پای تخته است.',
    'این واحد از فایل‌سیستم مجازی پشتیبانی می‌کند! در مبحث ۷ می‌توانید فایل my_module.py را کنار کد اصلی در کلاس ویرایش کرده و اثر import آن را زنده نشان دهید.',
    'اصلاحات مهم کتاب در این واحد: کوتیشن کلیدهای دیکشنری ص ۵۳، اصلاح «لیست» به «دیکشنری» ص ۵۵، حذف تکرار score=0 ص ۵۸، اصلاح چاپ متغیر daru ص ۶۱، اصلاح شکل ۱۴۷ ص ۶۸، اصلاح جدول ۴ ص ۷۰ (float(5)==5.0 و print کوچک)، اصلاح reverse=False ص ۷۲، اصلاح import mojvle ص ۷۳ و اصلاح your_text ص ۷۸.',
  ],
  visualLab: {
    id: 'python-functions-structures',
    title: '۳ آزمایشگاه شهود بصری واحد ۱.۲ (ساختارهای داده، ماشین تابع و بوم آفلاین Turtle)',
    subtitle:
      'رفتار هم‌زمان list/tuple/set/dict را بیازمایید، جریان آرگومان تا return را در ماشین تابع ببینید و با لاک‌پشت گرافیکی کد بسازید.',
    teacherGuide:
      'در زبانه ۲ (ماشین تابع) حتماً هر دو حالت «تابع با return» و «تابع فقط با print (خروجی None)» را یکی پس از دیگری اجرا کنید؛ این رایج‌ترین سوءبرداشت هنرجویان است.',
    classroomQuestion:
      'اگر بخواهیم شماره ملی دانش‌آموزان یک مدرسه را ذخیره کنیم تا هیچ شماره تکراری ثبت نشود، از list استفاده کنیم یا set؟ چرا؟',
  },
  lessons: UNIT_1_2_LESSONS,
  examples: UNIT_1_2_LESSONS.flatMap((les) => les.examples),
  activities: UNIT_1_2_ACTIVITIES,
  homeworks: UNIT_1_2_HOMEWORKS,
  quickQuizzes: UNIT_1_2_QUICK_QUIZ,
  gapNotes: [
    {
      id: 'gap-1-2-set-vs-dict',
      title: 'مجموعه خالی با set() و حذف ایمن با discard()',
      badge: 'تکمیل شکاف کتاب',
      content:
        'عبارت {} همیشه یک دیکشنری خالی می‌سازد؛ برای مجموعه خالی از set() استفاده کنید. همچنین متد discard(x) برخلاف remove(x) در صورت نبود عضو خطای KeyError نمی‌دهد.',
      codeSnippet: `s = set()\ns.add("python")\ns.discard("java")  # بدون خطا!`,
      language: 'python',
    },
    {
      id: 'gap-1-2-dict-get',
      title: 'خواندن ایمن مقدار از دیکشنری با dict.get()',
      badge: 'تکمیل شکاف کتاب',
      content:
        'اگر کلیدی در دیکشنری نباشد، نوشتن d["key"] برنامه را متوقف می‌کند؛ اما d.get("key", "پیش‌فرض") ایمن است و در صورت نبود کلید، مقدار پیش‌فرض برمی‌گرداند.',
      codeSnippet: `user = {"name": "نیما"}\nprint(user.get("email", "ایمیل ثبت نشده"))`,
      language: 'python',
    },
    {
      id: 'gap-1-2-single-tuple',
      title: 'قانون کامای پایانی در تاپل تک‌عضوی (x,)',
      badge: 'تکمیل شکاف کتاب',
      content:
        'در پایتون پرانتز به‌تنهایی تاپل نمی‌سازد؛ وجود کاما سازنده تاپل است! بنابراین (10) عدد صحیح است و (10,) تاپل تک‌عضوی.',
      codeSnippet: `a = (10)\nb = (10,)\nprint(type(a), type(b))`,
      language: 'python',
    },
    {
      id: 'gap-1-2-scope',
      title: 'حوزه متغیرها (Local در برابر Global)',
      badge: 'تکمیل شکاف کتاب',
      content:
        'متغیری که داخل یک تابع تعریف می‌شود (Local) پس از پایان اجرای تابع از حافظه پاک می‌شود و بیرون تابع در دسترس نیست؛ برای انتقال نتیجه به بیرون باید از return استفاده کنید.',
    },
    {
      id: 'gap-1-2-char-methods',
      title: 'متدهای بررسی کاراکتر رشته برای فعالیت ص ۷۹',
      badge: 'تکمیل شکاف ص ۷۹',
      content:
        'متدهای isupper() (حرف بزرگ انگلیسی)، islower() (حرف کوچک) و isdigit() (رقم) برای حل تمرین شمارش حروف و ارزیابی قدرت رمز عبور ضروری هستند.',
      codeSnippet: `print("A".isupper(), "a".islower(), "7".isdigit())  # True True True`,
      language: 'python',
    },
  ],
  bugChallenges: [
    {
      id: 'bug-1-2-dict-keys',
      title: 'چالش ۱: خطای کلیدهای بدون کوتیشن در دیکشنری (فعالیت ص ۵۳ کتاب)',
      sourceLabel: 'خطای واقعی کتاب ص ۵۳',
      description:
        'کد دیکشنری زیر دقیقاً از فعالیت ص ۵۳ کتاب برداشته شده و به دلیل نبود کوتیشن دور کلیدها با NameError متوقف می‌شود. آن را اصلاح کنید.',
      language: 'python',
      engine: 'python',
      buggyCode: `book = {
    "title": "طراح سایت",
    author: "وزارت آموزش و پرورش",
    pages: 330
}
print(book["author"], book["pages"])`,
      fixedCode: `book = {
    "title": "طراح سایت",
    "author": "وزارت آموزش و پرورش",
    "pages": 330
}
print(book["author"], book["pages"])`,
      hint: 'کلیدهای متنی در دیکشنری پایتون حتماً باید داخل کوتیشن باشند.',
      teacherExplanation:
        'پایتون author بدون کوتیشن را به عنوان نام یک متغیر جستجو می‌کند و چون تعریف نشده NameError می‌دهد.',
      classroomQuestion:
        'اگر قبل از دیکشنری بنویسیم author = "نویسنده"، کلید دیکشنری چه چیزی خواهد بود؟',
    },
    {
      id: 'bug-1-2-daru-tuple',
      title: 'چالش ۲: چاپ نام رشته به‌جای محتوای تاپل (شکل ۱۲۷ ص ۶۱ کتاب)',
      sourceLabel: 'خطای واقعی کتاب ص ۶۱',
      description:
        'برنامه زیر قرار است محتوای تاپل daru را چاپ کرده و سپس یک تاپل تک‌عضوی بسازد، اما دو خطای منطقی دارد. هر دو را اصلاح کنید.',
      language: 'python',
      engine: 'python',
      buggyCode: `daru = ("استامینوفن", "ویتامین D")
print("daru")

single = ("آسپرین")
print("نوع single:", type(single))`,
      fixedCode: `daru = ("استامینوفن", "ویتامین D")
print(daru)

single = ("آسپرین",)
print("نوع single:", type(single))`,
      hint: 'دور نام متغیر نباید کوتیشن گذاشت و تاپل تک‌عضوی نیاز به کامای پایانی دارد.',
      teacherExplanation:
        'خط ۲ دقیقاً باگ شکل ۱۲۷ ص ۶۱ کتاب است و خط ۴ یکی از دام‌های معروف آزمون‌های پایتون برای تاپل تک‌عضوی است.',
      classroomQuestion: 'چگونه بفهمیم یک متغیر تاپل است یا رشته؟ (با تابع type())',
    },
    {
      id: 'bug-1-2-none-return',
      title: 'چالش ۳: خطای TypeError به‌دلیل فراموشی return در تابع',
      sourceLabel: 'اشتباه پرتکرار هنرجویان (ص ۶۶–۶۷)',
      description:
        'تابع double_price قرار است دو برابر قیمت را برگرداند تا با هزینه ارسال جمع شود، اما خطای TypeError می‌دهد! خطا را رفع کنید.',
      language: 'python',
      engine: 'python',
      buggyCode: `def double_price(price):
    print(price * 2)

total = double_price(50000) + 15000
print("جمع کل:", total)`,
      fixedCode: `def double_price(price):
    return price * 2

total = double_price(50000) + 15000
print("جمع کل:", total)`,
      hint: 'تابع double_price به‌جای بازگرداندن مقدار، آن را چاپ کرده؛ بنابراین خروجی آن None است!',
      teacherExplanation:
        'جمع کردن None + 15000 در پایتون غیرمجاز است. هر تابعی که قرار است خروجی‌اش در محاسبه بعدی مصرف شود باید return داشته باشد.',
      classroomQuestion: 'چه زمانی یک تابع واقعاً نیازی به return ندارد؟',
    },
    {
      id: 'bug-1-2-sorted-print',
      title: 'چالش ۴: خطاهای واقعی ص ۷۰، ۷۲ و ۷۸ کتاب (Print، reverse=false و فاصله نام متغیر)',
      sourceLabel: 'خطاهای واقعی کتاب ص ۷۰–۷۸',
      description:
        'در این ۴ خط، سه خطای واقعی چاپ‌شده در صفحات ۷۰، ۷۲ و ۷۸ کتاب جمع شده‌اند. هر سه را پیدا و اصلاح کنید.',
      language: 'python',
      engine: 'python',
      buggyCode: `your text = "Learn Python"
scores = [16, 20, 14, 19]
Print(your text.lower())
print(sorted(scores, reverse=false))`,
      fixedCode: `your_text = "Learn Python"
scores = [16, 20, 14, 19]
print(your_text.lower())
print(sorted(scores, reverse=False))`,
      hint: 'نام متغیر فاصله نمی‌گیرد، print با p کوچک است و False با F بزرگ!',
      teacherExplanation:
        'حساسیت پایتون به حروف بزرگ و کوچک (Case Sensitivity) و قواعد نام‌گذاری متغیرها با رفع همین تمرین برای همیشه تثبیت می‌شود.',
      classroomQuestion: 'اگر بخواهیم scores از بزرگ به کوچک مرتب شود، مقدار reverse را چه بگذاریم؟',
    },
    {
      id: 'bug-1-2-import-typo',
      title: 'چالش ۵: خطای نام ماژول و شکل ۱۴۷ (ص ۶۸ و ۷۳ کتاب)',
      sourceLabel: 'خطاهای واقعی کتاب ص ۶۸ و ۷۳',
      description:
        'کد زیر قصد دارد ماژول math را وارد کند و در تابع، اعداد ۱ تا ۵ را چاپ نماید؛ اما هم نام ماژول غلط دارد و هم تابع کلمه "python" چاپ می‌کند!',
      language: 'python',
      engine: 'python',
      buggyCode: `import mojvle

def count_to_five():
    for i in range(1, 6):
        print("python")

count_to_five()`,
      fixedCode: `import math

def count_to_five():
    for i in range(1, 6):
        print(i)

count_to_five()
print("جذر ۲۵:", math.sqrt(25))`,
      hint: 'ماژول ریاضی استاندارد math است و داخل حلقه باید متغیر i را چاپ کنید نه رشته "python".',
      teacherExplanation:
        'رفع هم‌زمان خطای ModuleNotFoundError (ص ۷۳) و خطای منطقی شکل ۱۴۷ (ص ۶۸).',
      classroomQuestion: 'اگر ماژول محلی my_module.py را در پوشه‌ای دیگر ذخیره کنیم، آیا import my_module آن را پیدا می‌کند؟',
    },
  ],
  rubric: {
    title: 'ارزشیابی شایستگی واحد ۱.۲ — کار با توابع و ماژول‌ها',
    pageRange: 'صفحات ۸۰ و ۸۱ کتاب درسی',
    stages: [
      {
        stageNumber: 1,
        title: 'کار با ساختارهای داده set، dict و tuple و انتخاب ساختار مناسب',
        isCritical: true,
        criteria: {
          score1: 'عدم تشخیص تفاوت set، dict و tuple یا خطا در کوتیشن کلیدها',
          score2: 'استفاده درست از یک یا دو ساختار در مثال‌های ساده',
          score3: 'انتخاب و پیاده‌سازی دقیق هر سه ساختار همراه با get/discard و تاپل تک‌عضوی',
        },
      },
      {
        stageNumber: 2,
        title: 'تعریف و فراخوانی توابع با پارامتر (موقعیتی/کلیدی/پیش‌فرض) و return',
        isCritical: true,
        criteria: {
          score1: 'خطا در تعریف تابع یا خلط print با return',
          score2: 'تعریف تابع ساده با پارامتر موقعیتی',
          score3: 'تعریف توابع ماژولار با پارامتر پیش‌فرض/کلیدی و بازگشت دقیق مقدار',
        },
      },
      {
        stageNumber: 3,
        title: 'استفاده از توابع داخلی ریاضی (abs/round/pow/max/min/sum/divmod) و sorted()',
        isCritical: true,
        criteria: {
          score1: 'خطای نحوی در فراخوانی توابع داخلی یا reverse=false',
          score2: 'کاربرد صحیح بخشی از توابع پایه',
          score3: 'کاربرد کامل و بی‌نقص تمام توابع داخلی ریاضی و مرتب‌سازی صعودی/نزولی',
        },
      },
      {
        stageNumber: 4,
        title: 'به‌کارگیری ماژول‌های استاندارد (math, random, datetime, turtle) و ماژول محلی',
        isCritical: true,
        criteria: {
          score1: 'خطا در دستور import یا عدم تفکیک نام ماژول',
          score2: 'استفاده محدود از یک ماژول داخلی',
          score3: 'استفاده تسلط‌یافته از import / from...import روی ماژول‌های استاندارد و ماژول محلی',
        },
      },
      {
        stageNumber: 5,
        title: 'تشخیص و استفاده صحیح از متدها در برابر توابع مستقل',
        isCritical: true,
        criteria: {
          score1: 'خلط فراخوانی متد با تابع یا خطای نام‌گذاری',
          score2: 'کاربرد متدهای ساده رشته',
          score3: 'تفکیک دقیق توابع (len) از متدهای رشته/لیست (upper/lower/split/append/isdigit)',
        },
      },
      {
        stageNumber: 6,
        title: 'تکمیل پروژه‌های کلاسی (بازی Quiz و ماشین‌حساب ۹ گزینه‌ای)',
        isCritical: true,
        criteria: {
          score1: 'پروژه ناقص یا دارای خطای زمان اجرا',
          score2: 'اجرای پروژه با امکانات پایه',
          score3: 'پروژه کامل، دارای منو، مدیریت خطا و ساختار خوانای توابع',
        },
      },
    ],
  },
};
