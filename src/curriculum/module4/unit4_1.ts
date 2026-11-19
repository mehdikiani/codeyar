import type {LearningUnit} from '../../types/curriculum.ts';
import {UNIT_4_1_LESSONS} from './unit4_1/lessons.ts';
import {
  UNIT_4_1_ACTIVITIES,
  UNIT_4_1_HOMEWORKS,
  UNIT_4_1_QUIZZES,
} from './unit4_1/exercisesAndBank.ts';

export const UNIT_4_1: LearningUnit = {
  id: 'unit-4-1',
  moduleId: 'module4',
  unitNumber: '۴.۱',
  title: 'تولید برنامه شیءگرا (Class, Inheritance, Encapsulation, Metaclass)',
  pageRange: 'صفحات ۲۳۴ تا ۲۵۳',
  estimatedMinutes: 160,
  engine: 'python',
  contentStatus: 'complete',
  flagshipProject: 'سلسله‌مراتب کلاس‌های Mobile ← SmartPhone ← GamingPhone با کپسوله‌سازی و متاکلاس',
  objectives: [
    'طراحی کلاس، سازنده __init__، کلمه self و ساخت نمونه‌های متعدد و مستقل',
    'تفکیک ویژگی‌های نمونه از ویژگی‌های کلاس و نوشتن متدهای تغییر وضعیت ایمن',
    'پیاده‌سازی وراثت چندسطحی با super()، بازنویسی متد (Override) و چندریختی',
    'اعمال کپسوله‌سازی (public، _protected، __private) همراه با متدهای Getter و Setter',
    'بررسی نوع کلاس‌ها با type() و isinstance() و درک مفهوم متاکلاس (تکمیل هدف ۵ ص ۲۳۴)',
  ],
  warmupQuestions: [
    {
      question: 'چگونه یک نقشه واحد (کلاس Mobile) می‌تواند پایه ساخت گوشی ساده، گوشی هوشمند و گوشی گیمینگ باشد بدون اینکه کدها تکراری شوند؟',
      teacherAnswer:
        'با مفهوم «وراثت» (Inheritance) ویژگی‌ها و متدهای مشترک در کلاس والد نوشته شده و کلاس‌های فرزند فقط امکانات جدید خود را اضافه یا بازنویسی (Override) می‌کنند.',
    },
    {
      question: 'چرا در یک برنامه بانکی نباید اجازه دهیم از بیرون کلاس مستقیماً بنویسند account.balance = 99999999؟',
      teacherAnswer:
        'برای حفظ امنیت و یکپارچگی داده‌ها از کپسوله‌سازی (__balance) استفاده می‌کنیم تا تغییر موجودی فقط از طریق متدهای کنترل‌شده واریز و برداشت انجام شود.',
    },
  ],
  teacherOverviewTips: [
    'هدف ۵ (ص ۲۳۴) و ردیف ۵ جدول ارزشیابی (ص ۲۵۲) بررسی متاکلاس با type(Mobile) را می‌خواهند که از متن کتاب جا افتاده بود؛ درسنامه ۶ و مثال‌های آن این شکاف را ۱۰۰٪ پوشش می‌دهند.',
    'دو خطای تایپی مهم کتاب در این واحد: ۱) my_smartphon در ص ۲۴۷ (NameError) و ۲) فاصله اشتباه بین دو زیرخط self._ _battery در ص ۲۵۰ (SyntaxError). هر دو در کلاس اصلاح و تمرین شوند.',
    'ارتباط این فصل با پودمان ۵ را یادآوری کنید: در جنگو مدل‌ها (class City(models.Model)) دقیقاً با همین مفاهیم وراثت، __str__ و متاکلاس کار می‌کنند!',
  ],
  visualLab: {
    id: 'python-oop-factory',
    title: 'کارخانه شیءگرایی، کپسوله‌سازی و متاکلاس type',
    subtitle: "مقایسه نمونه شیء، کلاس سازنده آن و متاکلاس <class 'type'>.",
    teacherGuide: "به هنرجویان نشان دهید type(phone) کلاس SmartPhone است، اما type(SmartPhone) برابر <class 'type'> است.",
    classroomQuestion: 'چرا برای بررسی عضویت یک SmartPhone در خانواده Mobile باید از isinstance استفاده کرد نه type == Mobile؟',
  },
  lessons: UNIT_4_1_LESSONS,
  examples: UNIT_4_1_LESSONS.flatMap((lesson) => lesson.examples),
  activities: UNIT_4_1_ACTIVITIES,
  homeworks: UNIT_4_1_HOMEWORKS,
  quickQuizzes: UNIT_4_1_QUIZZES,
  gapNotes: [
    {
      id: 'gap-4-1-meta',
      title: 'متاکلاس (Metaclass) چیست؟ — تکمیل هدف ۵ ص ۲۳۴ و ردیف ۵ ص ۲۵۲',
      badge: 'تکمیل شکاف بحرانی کتاب',
      content:
        "در پایتون همه‌چیز شیء است؛ همان‌طور که شیء m1 از کلاس Mobile ساخته می‌شود، خودِ کلاس Mobile نیز از متاکلاس داخلی type ساخته می‌شود. بنابراین type(Mobile) برابر <class 'type'> است.",
      codeSnippet: `class Mobile:\n    pass\n\nm = Mobile()\nprint(type(m))       # <class 'Mobile'>\nprint(type(Mobile))  # <class 'type'>`,
      language: 'python',
    },
    {
      id: 'gap-4-1-str-dunder',
      title: 'آشنایی با متد ویژه __str__ (پیش‌نیاز مدل‌های جنگو در پودمان ۵)',
      badge: 'پل ارتباطی با پودمان ۵',
      content:
        'وقتی یک شیء را مستقیماً با print(obj) چاپ می‌کنیم، پایتون متد __str__(self) را صدا می‌زند. بازنویسی این متد در پودمان ۵ باعث می‌شود نام فارسی شهرها در پنل مدیریت جنگو به‌جای City object (1) نمایش داده شود.',
      codeSnippet: `def __str__(self):\n    return f"{self.brand} {self.model}"`,
      language: 'python',
    },
  ],
  bugChallenges: [
    {
      id: 'bug-4-1-typo',
      title: 'رفع NameError ص ۲۴۷ کتاب (my_smartphon)',
      sourceLabel: 'خطای تایپی ص ۲۴۷ کتاب',
      description: 'کد زیر هنگام فراخوانی متد خطای NameError می‌دهد؛ خطا را پیدا و اصلاح کنید.',
      language: 'python',
      engine: 'python',
      buggyCode: `class Mobile:
    def __init__(self, brand):
        self.brand = brand
    def show_info(self):
        print("برند:", self.brand)

my_smartphone = Mobile("Nokia")
my_smartphon.show_info()`,
      fixedCode: `class Mobile:
    def __init__(self, brand):
        self.brand = brand
    def show_info(self):
        print("برند:", self.brand)

my_smartphone = Mobile("Nokia")
my_smartphone.show_info()`,
      hint: 'املای نام شیء در خط ۷ و خط ۸ را حرف‌به‌حرف مقایسه کنید.',
      teacherExplanation: 'حرف e در انتهای my_smartphone در ص ۲۴۷ کتاب جا افتاده بود.',
    },
    {
      id: 'bug-4-1-private-space',
      title: 'اصلاح فاصله غلط ویژگی خصوصی (ص ۲۵۰ کتاب)',
      sourceLabel: 'خطای نحوی ص ۲۵۰ کتاب',
      description: 'در کد زیر طبق چاپ ص ۲۵۰ کتاب بین دو زیرخط ویژگی خصوصی فاصله افتاده و خطای SyntaxError رخ می‌دهد. آن را اصلاح کنید.',
      language: 'python',
      engine: 'python',
      buggyCode: `class Mobile:
    def __init__(self):
        self._ _battery = 100
    def get_battery(self):
        return self.__battery

m = Mobile()
print("باتری:", m.get_battery())`,
      fixedCode: `class Mobile:
    def __init__(self):
        self.__battery = 100
    def get_battery(self):
        return self.__battery

m = Mobile()
print("باتری:", m.get_battery())`,
      hint: 'فاصله بین دو زیرخط در خط ۳ را بردارید تا به self.__battery تبدیل شود.',
      teacherExplanation: 'در ص ۲۵۰ کتاب فاصله اشتباهی میان دو زیرخط افتاده است.',
    },
  ],
  rubric: {
    title: 'ارزشیابی شایستگی واحد ۴.۱ — برنامه‌نویسی شیءگرا',
    pageRange: 'صفحات ۲۵۲ و ۲۵۳ کتاب درسی',
    stages: [
      {
        stageNumber: 1,
        title: 'طراحی کلاس، سازنده __init__ و ساخت نمونه‌ها',
        isCritical: true,
        criteria: {
          score1: 'خطا در استفاده از self',
          score2: 'ساخت کلاس ساده',
          score3: 'ساخت کلاس کامل با چندین نمونه و ویژگی پیش‌فرض',
        },
      },
      {
        stageNumber: 2,
        title: 'پیاده‌سازی متدهای شیء و تغییر وضعیت ویژگی‌ها',
        isCritical: true,
        criteria: {
          score1: 'متد بدون self',
          score2: 'متدهای نمایشی ساده',
          score3: 'متدهای تعاملی و به‌روزرسانی وضعیت شیء',
        },
      },
      {
        stageNumber: 3,
        title: 'پیاده‌سازی وراثت، super() و بازنویسی متد (Override)',
        isCritical: true,
        criteria: {
          score1: 'عدم ارث‌بری صحیح',
          score2: 'ارث‌بری ساده بدون super',
          score3: 'وراثت چندسطحی تمیز با super و Override',
        },
      },
      {
        stageNumber: 4,
        title: 'اعمال کپسوله‌سازی و سطوح دسترسی (_ و __)',
        isCritical: true,
        criteria: {
          score1: 'دسترسی مستقیم بدون حفاظت',
          score2: 'تعریف ویژگی خصوصی',
          score3: 'حفاظت کامل همراه با متدهای Getter/Setter',
        },
      },
      {
        stageNumber: 5,
        title: 'بررسی نوع کلاس‌ها با type() و شناخت متاکلاس',
        isCritical: false,
        criteria: {
          score1: 'عدم آشنایی با نوع کلاس',
          score2: 'تشخیص نوع نمونه',
          score3: 'توضیح رابطه نمونه ← کلاس ← متاکلاس type',
        },
      },
    ],
  },
};
