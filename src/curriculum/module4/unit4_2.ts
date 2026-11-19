import type {LearningUnit} from '../../types/curriculum.ts';
import {UNIT_4_2_LESSONS} from './unit4_2/lessons.ts';
import {
  UNIT_4_2_ACTIVITIES,
  UNIT_4_2_HOMEWORKS,
  UNIT_4_2_QUIZZES,
} from './unit4_2/exercisesAndBank.ts';

export const UNIT_4_2: LearningUnit = {
  id: 'unit-4-2',
  moduleId: 'module4',
  unitNumber: '۴.۲',
  title: 'کار با فایل‌ها (pathlib)، مدیریت استثناها و JSON',
  pageRange: 'صفحات ۲۵۴ تا ۲۷۴',
  estimatedMinutes: 165,
  engine: 'python-fs',
  contentStatus: 'complete',
  flagshipProject: 'مدیریت فایل‌های متنی برندها، شمارشگر چندفایلی و مینی‌دیتابیس ماندگار JSON',
  objectives: [
    'خواندن فایل‌های متنی و پردازش خط‌به‌خط آن‌ها با ماژول pathlib.Path و splitlines()',
    'نوشتن داده‌های تک‌خطی و چندخطی در فایل با write_text() بدون بازنویسی ناخواسته داده‌ها',
    'مدیریت خطاهای زمان اجرا (ZeroDivisionError، ValueError، FileNotFoundError) با try/except/else/finally',
    'پردازش چندفایلی، شمارش کلمات با split() و عبور بی‌صدا از خطا با دستور pass',
    'ذخیره و بازیابی ساختاریافته داده‌ها در قالب استاندارد JSON با json.dumps() و json.loads()',
  ],
  warmupQuestions: [
    {
      question: 'چرا وقتی برنامه پایتون بسته می‌شود اطلاعات داخل لیست‌ها و دیکشنری‌ها پاک می‌شوند؟ راه‌حل چیست؟',
      teacherAnswer:
        'متغیرها در حافظه موقت RAM قرار دارند؛ برای ماندگاری داده‌ها باید آن‌ها را روی دیسک در فایل‌های متنی یا JSON (و در پودمان ۵ درون پایگاه‌داده SQLite) ذخیره کرد.',
    },
    {
      question: 'اگر فایلی که برنامه قصد خواندن آن را دارد به اشتباه پاک شده باشد، چه اتفاقی می‌افتد و چگونه جلوی توقف ناگهانی برنامه را می‌گیریم؟',
      teacherAnswer:
        'خطای FileNotFoundError رخ می‌دهد و برنامه کرش می‌کند؛ با قرار دادن دستور خواندن درون بلوک try و گرفتن خطا در except FileNotFoundError برنامه را پایدار نگه می‌داریم.',
    },
  ],
  teacherOverviewTips: [
    'فایل‌سیستم مجازی پایین ترمینال به شما اجازه می‌دهد فایل‌های ساخته‌شده توسط Path.write_text() را همان لحظه به کلاس نشان دهید یا فایل‌های آماده را زنده ویرایش کنید.',
    'دو اصلاح کلیدی کتاب در این واحد: ۱) باگ منطقی شکل ۲۹ ص ۲۶۱ (brands = "Nokia\\n" به‌جای += که ۴ برند اول را پاک می‌کرد) و ۲) رفع خلط json.dump() و json.dumps() در ص ۲۷۰.',
    'در کارگاه‌های ویندوزی مدارس، حتماً پارامتر encoding="utf-8" را برای فایل‌های متنی فارسی به دانش‌آموزان یادآوری کنید.',
  ],
  visualLab: {
    id: 'python-exceptions-json',
    title: 'شبیه‌ساز try/except و تبدیلگر دیکشنری ⇄ JSON',
    subtitle: 'مسیر کنترل خطاها و تفاوت json.dumps با json.loads را بررسی کنید.',
    teacherGuide: 'تأکید کنید حرف s در dumps و loads به معنای String (رشته) است.',
    classroomQuestion: 'چرا خروجی str({"ok": True}) یک رشته معتبر JSON محسوب نمی‌شود؟',
  },
  lessons: UNIT_4_2_LESSONS,
  examples: UNIT_4_2_LESSONS.flatMap((lesson) => lesson.examples),
  activities: UNIT_4_2_ACTIVITIES,
  homeworks: UNIT_4_2_HOMEWORKS,
  quickQuizzes: UNIT_4_2_QUIZZES,
  gapNotes: [
    {
      id: 'gap-4-2-utf8',
      title: 'پارامتر encoding="utf-8" برای فایل‌های فارسی در ویندوز',
      badge: 'نکته کلیدی ویندوز کارگاه',
      content:
        'در ویندوز برای جلوگیری از به‌هم‌ریختگی حروف فارسی هنگام کار با فایل‌های متنی همیشه encoding="utf-8" را به read_text و write_text بدهید.',
      codeSnippet: `from pathlib import Path\nPath("notes.txt").write_text("سلام هنرستان", encoding="utf-8")\ntext = Path("notes.txt").read_text(encoding="utf-8")`,
      language: 'python',
    },
    {
      id: 'gap-4-2-dump-vs-dumps',
      title: 'تفاوت دقیق json.dump() با json.dumps() (اصلاح ص ۲۷۰)',
      badge: 'اصلاح مفهومی ص ۲۷۰',
      content:
        'توابع بدون s (dump و load) برای کار با شیء فایل بازشده با open() هستند؛ اما توابع دارای s (dumps و loads) روی رشته String کار می‌کنند و جفت استاندارد کتابخانه pathlib.Path محسوب می‌شوند.',
      codeSnippet: `text = json.dumps({"city": "همدان"}, indent=4)\nPath("city.json").write_text(text)\ndata = json.loads(Path("city.json").read_text())`,
      language: 'python',
    },
  ],
  bugChallenges: [
    {
      id: 'bug-4-2-overwrite',
      title: 'چرا ۴ برند اول در شکل ۲۹ ص ۲۶۱ پاک می‌شوند؟',
      sourceLabel: 'باگ منطقی بحرانی کتاب ص ۲۶۱',
      description: 'کد زیر قرار است ۵ برند را در رشته brands جمع کند، اما فقط Nokia را می‌نویسد! باگ را پیدا و اصلاح کنید.',
      language: 'python',
      engine: 'python-fs',
      buggyCode: `from pathlib import Path
brands = "Samsung\\n"
brands += "Apple\\n"
brands += "Xiaomi\\n"
brands = "Nokia\\n"
Path("out.txt").write_text(brands)
print(Path("out.txt").read_text())`,
      fixedCode: `from pathlib import Path
brands = "Samsung\\n"
brands += "Apple\\n"
brands += "Xiaomi\\n"
brands += "Nokia\\n"
Path("out.txt").write_text(brands)
print(Path("out.txt").read_text())`,
      hint: 'به عملگر خط ۵ (brands = "Nokia\\n") دقت کنید.',
      teacherExplanation: 'جا افتادن علامت + پیش از = باعث بازنویسی کامل متغیر و از بین رفتن برندهای قبلی می‌شود.',
    },
    {
      id: 'bug-4-2-json-loads-missing',
      title: 'خطای TypeError هنگام خواندن فایل JSON بدون json.loads()',
      sourceLabel: 'خطای رایج کارگاهی ص ۲۷۱',
      description: 'برنامه زیر می‌خواهد نام شهر را از فایل JSON بخواند ولی خطای TypeError می‌دهد! آن را با json.loads اصلاح کنید.',
      language: 'python',
      engine: 'python-fs',
      buggyCode: `import json
from pathlib import Path

Path("c.json").write_text('{"city": "همدان", "temp": 8}')
raw = Path("c.json").read_text()
print(raw["city"])`,
      fixedCode: `import json
from pathlib import Path

Path("c.json").write_text('{"city": "همدان", "temp": 8}')
raw = Path("c.json").read_text()
data = json.loads(raw)
print(data["city"])`,
      hint: 'متغیر raw یک رشته است؛ پیش از دسترسی به ["city"] آن را با json.loads(raw) به دیکشنری تبدیل کنید.',
      teacherExplanation: 'تفاوت میان رشته JSON و دیکشنری واقعی پایتون باید برای هنرجویان کاملاً جا بیفتد.',
    },
  ],
  rubric: {
    title: 'ارزشیابی شایستگی واحد ۴.۲ — فایل، استثنا و JSON',
    pageRange: 'صفحات ۲۷۳ و ۲۷۴ کتاب درسی',
    stages: [
      {
        stageNumber: 1,
        title: 'خواندن فایل‌های متنی و پردازش خط‌به‌خط با pathlib',
        isCritical: true,
        criteria: {
          score1: 'خطا در آدرس‌دهی یا خواندن',
          score2: 'خواندن کل متن فایل',
          score3: 'خواندن، splitlines و جستجو در خطوط فایل',
        },
      },
      {
        stageNumber: 2,
        title: 'نوشتن داده‌های تک‌خطی و چندخطی در فایل',
        isCritical: true,
        criteria: {
          score1: 'پاک شدن ناخواسته داده‌ها',
          score2: 'نوشتن رشته ساده',
          score3: 'نوشتن کامل و استاندارد چندخطی',
        },
      },
      {
        stageNumber: 3,
        title: 'مدیریت استثناها با try / except / else',
        isCritical: true,
        criteria: {
          score1: 'کرش برنامه در ورودی اشتباه',
          score2: 'مدیریت یک نوع خطا',
          score3: 'مدیریت دقیق ValueError، ZeroDivisionError و FileNotFoundError',
        },
      },
      {
        stageNumber: 4,
        title: 'پردازش چندفایلی و عبور بی‌صدا (pass)',
        isCritical: false,
        criteria: {
          score1: 'توقف برنامه هنگام نبود یک فایل',
          score2: 'ادامه کار با پیام ساده',
          score3: 'شمارش کلمات چند فایل با مدیریت خطای مستقل',
        },
      },
      {
        stageNumber: 5,
        title: 'ذخیره داده‌ها در قالب JSON با json.dumps()',
        isCritical: true,
        criteria: {
          score1: 'خطا در تبدیل به JSON',
          score2: 'ذخیره JSON خام',
          score3: 'ذخیره استاندارد با indent و ساختار خوانا',
        },
      },
      {
        stageNumber: 6,
        title: 'بازیابی و پردازش فایل JSON با json.loads()',
        isCritical: true,
        criteria: {
          score1: 'عدم توانایی در بازخوانی',
          score2: 'خواندن رشته بدون پردازش',
          score3: 'تبدیل به دیکشنری/لیست و استخراج دقیق مقادیر',
        },
      },
    ],
  },
};
