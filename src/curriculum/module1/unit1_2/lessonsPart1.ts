import type {ConceptLesson} from '../../../types/curriculum.ts';

export const UNIT_1_2_LESSONS_PART_1: ConceptLesson[] = [
  // =========================================================================
  // CONCEPT 1: Sets (set)
  // =========================================================================
  {
    id: 'les-1-2-sets',
    order: 1,
    title: 'مجموعه‌ها (set): حذف خودکار تکرار، عضویت سریع و تفاوت {} با set()',
    bookPage: '۴۹ تا ۵۱',
    whyWeNeedIt: {
      realWorldProblem:
        'در وب‌سایت‌ها و فروشگاه‌های واقعی بارها می‌خواهیم برچسب‌های مقالات، کد ملی دانش‌آموزان یا شهرهای منحصربه‌فرد مشتریان را بدون هیچ عضو تکراری ذخیره کنیم. اگر از لیست استفاده کنیم، هر بار باید با حلقه بررسی کنیم که آیا این مورد قبلاً وجود داشته یا نه؛ اما نوع داده set (مجموعه) این کار را به‌صورت خودکار و فوق‌العاده سریع انجام می‌دهد.',
      analogy:
        'مجموعه (set) مثل «کیسه تیله‌های منحصربه‌فرد» است: اگر تیله قرمزی داخل کیسه باشد و دوباره تیله قرمز دیگری بیندازید، فقط همان یکی باقی می‌ماند؛ همچنین داخل کیسه شماره‌گذاری (اندیس ۰، ۱، ۲) وجود ندارد!',
    },
    syntaxAnatomy: {
      template: `tags = {"python", "web", "html"}
empty_set = set()
tags.add("django")
tags.discard("php")`,
      parts: [
        {token: '{...}', role: 'آکولاد بدون دونقطه یک مجموعه (set) می‌سازد و تکراری‌ها را همان لحظه حذف می‌کند.'},
        {token: 'set()', role: 'تنها روش استاندارد ساخت مجموعه خالی (چون {} دیکشنری خالی می‌سازد).'},
        {token: '.add(x)', role: 'عضو جدید x را به مجموعه اضافه می‌کند؛ اگر قبلاً وجود داشته باشد تغییری نمی‌دهد.'},
        {token: '.remove(x) / .discard(x)', role: 'عضو x را حذف می‌کنند؛ تفاوت مهم این است که discard هنگام نبود عضو خطا نمی‌دهد.'},
      ],
    },
    behindTheScenes: [
      'مجموعه‌ها در پایتون بر پایه «جدول درهم‌سازی (Hash Table)» ذخیره می‌شوند؛ به همین دلیل بررسی عضویت ("python" in tags) حتی برای ۱ میلیون عضو در کسری از میلی‌ثانیه انجام می‌شود (بسیار سریع‌تر از لیست).',
      'چون مجموعه ترتیب اندیسی ندارد، نوشتن tags[0] خطای TypeError می‌دهد. برای مرور اعضای یک set از حلقه for استفاده می‌کنیم.',
      'عبارت {} در زبان پایتون همیشه دیکشنری خالی (dict) است نه مجموعه خالی! اگر کسی بنویسد s = {} و سپس s.add(5) بزند با خطای AttributeError مواجه می‌شود.',
      'از تبدیل set(my_list) می‌توان در یک خط تمام اعضای تکراری هر لیست را حذف کرد و با list(set(my_list)) دوباره آن را به لیست برگرداند.',
    ],
    goldenTips: [
      'در پروژه‌های واقعی برای حذف عضو از مجموعه، متد discard() را به remove() ترجیح دهید تا اگر عضو موجود نبود برنامه متوقف نشود.',
      'اعضای یک set باید تغییرناپذیر (مثل عدد، رشته یا تاپل) باشند؛ بنابراین نمی‌توان یک لیست را به عنوان عضو داخل set گذاشت.',
    ],
    wrongVsRight: [
      {
        title: 'ساخت مجموعه خالی (تله مشهور {})',
        wrongCode: `items = {}
items.add("کتاب")`,
        rightCode: `items = set()
items.add("کتاب")`,
        explanation: 'عبارت {} دیکشنری خالی می‌سازد و متد add ندارد؛ برای مجموعه خالی حتماً set() بنویسید.',
      },
      {
        title: 'حذف ایمن عضوی که شاید در مجموعه نباشد',
        wrongCode: `tags = {"html", "css"}
tags.remove("php")`,
        rightCode: `tags = {"html", "css"}
tags.discard("php")`,
        explanation: 'متد remove هنگام نبود عضو KeyError می‌دهد؛ اما discard بدون توقف برنامه عمل می‌کند.',
      },
    ],
    examples: [
      {
        id: 'ex-1-2-sets-basic',
        tier: 'basic',
        title: 'حذف خودکار تکرار، add، remove، discard و تفاوت {} با set()',
        bookPage: '۴۹ تا ۵۱',
        summary: 'آشنایی گام‌به‌گام با ساخت مجموعه، بررسی عضویت با in، حذف ایمن با discard() و اثبات تفاوت {} و set().',
        language: 'python',
        engine: 'python',
        code: `# اعضای تکراری در مجموعه به‌طور خودکار حذف می‌شوند
tags = {"python", "web", "html", "python", "web"}
print("مجموعه بدون تکرار:", tags)

tags.add("django")
print("پس از add:", tags)

print("آیا html وجود دارد؟", "html" in tags)
tags.remove("web")
tags.discard("php")  # بدون خطا حتی وقتی عضو وجود ندارد!
print("مجموعه نهایی:", tags)

# مقایسه حیاتی {} و set()
print("نوع {} :", type({}))
print("نوع set() :", type(set()))`,
        teacherTalkingPoints: [
          'اجرا کنید و نشان دهید "python" و "web" که دو بار نوشته شده بودند فقط یک‌بار ذخیره شدند.',
          'خط discard("php") را برای کلاس برجسته کنید: این متد جلوی کرش برنامه را می‌گیرد.',
        ],
        classroomQuestion: 'اگر به جای tags.discard("php") بنویسیم tags.remove("php") چه اتفاقی می‌افتد؟',
        lineExplanations: [
          {line: 2, explanation: 'مجموعه هنگام ساخت تمام مقادیر تکراری را حذف می‌کند.'},
          {line: 10, explanation: 'متد discard() حذف ایمن بدون خطای KeyError انجام می‌دهد.'},
          {line: 14, explanation: 'تابع type() ثابت می‌کند {} از نوع dict است نه set.'},
        ],
        commonMistakes: ['ساخت مجموعه خالی با {} و تلاش برای خواندن tags[0].'],
      },
      {
        id: 'ex-1-2-sets-practical',
        tier: 'practical',
        title: 'حذف تکراری از فهرست شماره‌ملی و حضوروغیاب کلاسی',
        bookPage: '۵۰',
        summary: 'تبدیل لیست دارای ثبت‌های تکراری به مجموعه یکتا و محاسبه تعداد کل حاضران واقعی کلاس.',
        language: 'python',
        engine: 'python',
        code: `# لیست ورود کارت‌های هنرجویان (برخی دو بار کارت زده‌اند!)
card_scans = ["101", "104", "101", "109", "104", "112", "109", "101"]
print("تعداد کل کارت‌های ثبت‌شده:", len(card_scans))

unique_students = set(card_scans)
print("کدهای یکتای حاضران:", unique_students)
print("تعداد واقعی حاضران کلاس:", len(unique_students))`,
        teacherTalkingPoints: [
          'توضیح دهید این دقیقاً الگوی واقعی سامانه حضوروغیاب و شمارش بازدیدکنندگان یکتای سایت (Unique Visitors) است.',
        ],
        classroomQuestion: 'چگونه از تعداد کل کارت‌ها (۸) و تعداد یکتا (۴) بفهمیم چند بار کارت تکراری زده شده؟',
        lineExplanations: [
          {line: 5, explanation: 'تابع set(card_scans) در یک خط تمام کدهای تکراری را حذف می‌کند.'},
          {line: 7, explanation: 'len روی مجموعه تعداد اعضای منحصربه‌فرد را می‌دهد.'},
        ],
        commonMistakes: ['انتظار داشتن از set که ترتیب دقیق ورود لیست اولیه را حفظ کند.'],
      },
      {
        id: 'ex-1-2-sets-combined',
        tier: 'combined',
        title: 'ثبت تعاملی مهارت‌های تیم و مقایسه اشتراک دو کارگاه',
        bookPage: '۵۱',
        summary: 'ترکیب حلقه for، بررسی عضویت in و تبدیل نوع برای پیدا کردن مهارت‌های مشترک و کل مهارت‌های دو گروه.',
        language: 'python',
        engine: 'python',
        code: `group_a = {"Python", "HTML", "CSS", "Git"}
group_b = {"HTML", "CSS", "JavaScript", "Django"}

common = set()
for skill in group_a:
    if skill in group_b:
        common.add(skill)

all_skills = set()
for skill in group_a:
    all_skills.add(skill)
for skill in group_b:
    all_skills.add(skill)

print("مهارت‌های مشترک هر دو گروه:", common)
print("مجموع کل مهارت‌های منحصربه‌فرد:", all_skills)
print("تعداد کل مهارت‌ها:", len(all_skills))`,
        teacherTalkingPoints: [
          'نشان دهید چگونه با حلقه for و شرط in می‌توانیم اشتراک و اجتماع دو مجموعه را بسازیم.',
        ],
        lineExplanations: [
          {line: 5, explanation: 'پیمایش اعضای group_a و بررسی وجود هر کدام در group_b.'},
          {line: 13, explanation: 'افزودن همه اعضای هر دو گروه به یک set، اجتماع بدون تکرار می‌سازد.'},
        ],
        commonMistakes: ['فراموش کردن مقداردهی اولیه common = set() پیش از حلقه.'],
      },
      {
        id: 'ex-1-2-sets-whatif',
        tier: 'what-if',
        title: 'آزمایشگاه What-If: تفاوت اندیس‌گذاری لیست در برابر مجموعه',
        bookPage: '۴۹ تا ۵۱',
        summary: 'مقایسه رفتار list و set و مشاهده راه درست دسترسی به اعضای مجموعه هنگام نیاز به مرتب‌سازی.',
        language: 'python',
        engine: 'python',
        code: `nums_set = {30, 10, 20, 10}
print("مجموعه بدون اندیس:", nums_set)

# اگر بنویسیم print(nums_set[0]) ← خطای TypeError رخ می‌دهد!
# راه استاندارد برای دسترسی با اندیس یا نمایش مرتب:
ordered_list = sorted(nums_set)
print("تبدیل مرتب به لیست:", ordered_list)
print("کوچک‌ترین عضو [0]:", ordered_list[0])
print("بزرگ‌ترین عضو [-1]:", ordered_list[-1])`,
        teacherTalkingPoints: [
          'در کلاس خط کامنت‌شده nums_set[0] را از حالت کامنت خارج کنید تا خطای واقعی را ببینند، سپس با sorted() حلش کنید.',
        ],
        lineExplanations: [
          {line: 6, explanation: 'تابع sorted() هر مجموعه‌ای را به یک لیست مرتب و دارای اندیس تبدیل می‌کند.'},
        ],
        commonMistakes: ['تلاش برای نوشتن my_set[0] یا my_set[-1] روی مجموعه.'],
      },
    ],
  },

  // =========================================================================
  // CONCEPT 2: Dictionaries (dict)
  // =========================================================================
  {
    id: 'les-1-2-dicts',
    order: 2,
    title: 'دیکشنری‌ها (dict): ذخیره داده‌های کلید:مقدار، متد get() و پیمایش .items()',
    bookPage: '۵۲ تا ۵۸',
    whyWeNeedIt: {
      realWorldProblem:
        'در لیست اگر بنویسیم ["طراح سایت", 330, 1405] بعد از یک هفته یادمان می‌رود عدد ۳۳۰ قیمت است یا تعداد صفحه! همچنین در بازی آزمون (Quiz) نگه‌داری پرسش‌ها در یک لیست و پاسخ‌ها در لیست دیگر بسیار خطاپذیر است. دیکشنری (dict) به هر مقدار یک «برچسب معنایی (کلید)» می‌چسباند.',
      analogy:
        'دیکشنری دقیقاً مثل «فرهنگ لغت یا دفترچه تلفن گوشی» است: برای پیدا کردن شماره تلفن «رضا»، کل دفترچه را از صفحه اول ورق نمی‌زنید، بلکه مستقیم با کلیدِ "رضا" مقدارِ شماره تلفنش را برمی‌دارید!',
    },
    syntaxAnatomy: {
      template: `book = {"title": "طراح سایت", "pages": 330}
book["grade"] = 11
publisher = book.get("publisher", "نامشخص")
removed = book.pop("pages")`,
      parts: [
        {token: '"title": "طراح سایت"', role: 'یک جفت کلید و مقدار (key: value) که با دونقطه جدا شده‌اند. کلید متنی حتماً کوتیشن می‌خواهد.'},
        {token: 'book["grade"] = 11', role: 'اگر کلید وجود نداشته باشد اضافه می‌شود و اگر وجود داشته باشد مقدارش به‌روزرسانی می‌شود.'},
        {token: '.get(key, default)', role: 'روش ایمن خواندن مقدار؛ در نبود کلید به‌جای KeyError مقدار پیش‌فرض برمی‌گرداند.'},
        {token: '.items() / .keys() / .values()', role: 'متدهای پیمایش روی جفت‌های (کلید، مقدار)، فقط کلیدها یا فقط مقادیر دیکشنری.'},
      ],
    },
    behindTheScenes: [
      'در ص ۵۳ کتاب درسی یک اشتباه مفهومی و یک غلط نحوی هم‌زمان رخ داده: کلیدهای author و pages بدون کوتیشن چاپ شده‌اند (که NameError می‌دهد) و در متن، یکتایی کلید و مقدار برعکس توضیح داده شده! قانون واقعی: «کلیدها باید یکتا باشند، ولی مقادیر می‌توانند تکراری باشند».',
      'در ص ۵۵ کتاب هنگام توضیح del و pop روی دیکشنری، اشتباهاً چند بار کلمه «لیست» چاپ شده؛ این نکته را در کلاس یادآوری کنید.',
      'از پایتون ۳.۷ به بعد دیکشنری‌ها ترتیب درج کلیدها را حفظ می‌کنند؛ اما همچنان دسترسی به آن‌ها با کلید است نه با عدد اندیس.',
      'ساختار دیکشنری دقیقاً پایه و اساس قالب JSON در اینترنت و متغیر context در فریم‌ورک جنگو (پودمان ۴ و ۵) است.',
    ],
    goldenTips: [
      'هنگام خواندن کلیدی که مطمئن نیستید وجود دارد یا نه (مثلاً فیلد اختیاری کاربر)، همیشه از book.get("key", "ندارد") استفاده کنید.',
      'برای پیمایش هم‌زمان کلید و مقدار از الگوی استاندارد for k, v in my_dict.items(): استفاده کنید.',
    ],
    wrongVsRight: [
      {
        title: 'نبود کوتیشن دور کلیدهای متنی (خطای فعالیت ص ۵۳ کتاب)',
        wrongCode: `book = {title: "طراح سایت", pages: 330}`,
        rightCode: `book = {"title": "طراح سایت", "pages": 330}`,
        explanation: 'بدون کوتیشن، پایتون دنبال متغیری به نام title می‌گردد و با NameError متوقف می‌شود.',
      },
      {
        title: 'دسترسی به کلید ناموجود بدون get()',
        wrongCode: `user = {"name": "نیما"}
print(user["email"])`,
        rightCode: `user = {"name": "نیما"}
print(user.get("email", "ایمیل ثبت نشده"))`,
        explanation: 'براکت مستقیم در نبود کلید KeyError می‌دهد؛ اما get() با خیال راحت مقدار جایگزین برمی‌گرداند.',
      },
    ],
    examples: [
      {
        id: 'ex-1-2-dicts-basic',
        tier: 'basic',
        title: 'ساخت، ویرایش، get()، del و pop() در دیکشنری (اصلاح ص ۵۳ و ۵۵)',
        bookPage: '۵۲ تا ۵۶',
        summary: 'تعریف استاندارد دیکشنری مشخصات کتاب درسی، ویرایش مقادیر، خواندن ایمن با get() و حذف با pop/del.',
        language: 'python',
        engine: 'python',
        code: `# اصلاح فعالیت ص ۵۳: کلیدهای متنی حتماً داخل کوتیشن هستند
book = {
    "title": "طراح سایت",
    "author": "دفتر تألیف کتب درسی",
    "pages": 330,
    "year": 1405,
}
print("عنوان کتاب:", book["title"])

# افزودن کلید جدید و ویرایش کلید موجود
book["grade"] = 11
book["pages"] = 332

# دسترسی ایمن با get()
print("ناشر:", book.get("publisher", "ثبت نشده"))

# حذف با pop() و del (اصلاح متن ص ۵۵ کتاب)
removed_year = book.pop("year")
del book["author"]
print("سال حذف‌شده با pop:", removed_year)
print("دیکشنری نهایی:", book)`,
        teacherTalkingPoints: [
          'دقت کنید مقدار removed_year توسط pop() برگردانده شده و قابل چاپ است؛ اما del فقط حذف می‌کند.',
        ],
        classroomQuestion: 'اگر در این دیکشنری دوباره بنویسیم book["title"] = "طراحی وب" آیا دو کلید title ساخته می‌شود یا مقدار قبلی جایگزین می‌شود؟',
        lineExplanations: [
          {line: 3, explanation: 'هر کلید متنی با کوتیشن نوشته شده و با : به مقدار خود متصل است.'},
          {line: 15, explanation: 'get() در نبود کلید "publisher" رشته "ثبت نشده" را برمی‌گرداند.'},
        ],
        commonMistakes: ['جا انداختن کوتیشن دور کلیدها و فراموش کردن کاما بین خطوط دیکشنری.'],
        bookCorrection: {
          page: 53,
          issue: 'کلیدهای دیکشنری بدون کوتیشن بودند، قانون یکتایی کلید/مقدار برعکس بود و در ص ۵۵ کلمه لیست به‌جای دیکشنری آمده بود.',
          fix: 'کلیدهای استاندارد با کوتیشن، روش ایمن get() و توضیح دقیق حذف ارائه شد.',
        },
      },
      {
        id: 'ex-1-2-dicts-practical',
        tier: 'practical',
        title: 'پیمایش کارنامه هنرجو با .items() و محاسبه میانگین دروس',
        bookPage: '۵۶ تا ۵۷',
        summary: 'نگه‌داری نام درس به عنوان کلید و نمره به عنوان مقدار، سپس پیمایش کامل با for lesson, score in grades.items().',
        language: 'python',
        engine: 'python',
        code: `grades = {
    "طراح سایت": 19.5,
    "تولید محتوا": 18.0,
    "پایگاه داده": 17.5,
    "کارآفرینی": 20.0,
}

total = 0
print("=== کارنامه پودمانی ===")
for lesson, score in grades.items():
    status = "عالی" if score >= 18 else "قابل قبول"
    print(f"- {lesson}: {score} ({status})")
    total += score

avg = total / len(grades)
print(f"معدل کل: {round(avg, 2)}")`,
        teacherTalkingPoints: [
          'نشان دهید چگونه متد .items() در هر دور حلقه هم کلید (lesson) و هم مقدار (score) را هم‌زمان می‌دهد.',
        ],
        lineExplanations: [
          {line: 10, explanation: 'باز کردن جفت (کلید، مقدار) از خروجی grades.items() در حلقه for.'},
          {line: 15, explanation: 'len(grades) تعداد کل جفت‌های کلید:مقدار در دیکشنری را برمی‌گرداند.'},
        ],
        commonMistakes: ['نوشتن for k, v in grades: بدون صدا زدن متد .items().'],
      },
      {
        id: 'ex-1-2-dicts-combined',
        tier: 'combined',
        title: 'شمارش فراوانی کلمات (Word Counter) و موجودی انبار',
        bookPage: '۵۷ تا ۵۸',
        summary: 'استفاده از دیکشنری به عنوان شمارنده پویا همراه با .get(word, 0) + 1 — یکی از مشهورترین الگوهای پایتون.',
        language: 'python',
        engine: 'python',
        code: `votes = ["پایتون", "جنگو", "پایتون", "HTML", "پایتون", "جنگو", "CSS"]
counts = {}

for item in votes:
    counts[item] = counts.get(item, 0) + 1

print("نتیجه شمارش آرای کلاس:")
for tech, num in counts.items():
    print(f"  {tech}: {num} رأی")`,
        teacherTalkingPoints: [
          'خط ۵ (counts.get(item, 0) + 1) را آهسته توضیح دهید: بار اول که "پایتون" نیست 0 می‌دهد و 1 می‌شود؛ بار دوم 1 می‌دهد و 2 می‌شود!',
        ],
        classroomQuestion: 'اگر به‌جای counts.get(item, 0) می‌نوشتیم counts[item] + 1 در دور اول حلقه چه خطایی می‌داد؟',
        lineExplanations: [
          {line: 5, explanation: 'اگر کلید موجود نباشد از صفر شروع می‌کند و هر بار یکی به شمارنده‌اش می‌افزاید.'},
        ],
        commonMistakes: ['تلاش برای افزایش مقدار کلیدی که هنوز ساخته نشده (KeyError).'],
      },
      {
        id: 'ex-1-2-dicts-whatif',
        tier: 'what-if',
        title: 'آزمایشگاه What-If: کلید تکراری چه بلایی سر داده می‌آورد؟',
        bookPage: '۵۳',
        summary: 'مشاهده زنده بازنویسی شدن مقدار هنگام تکرار یک کلید در دیکشنری در برابر مجاز بودن تکرار مقادیر.',
        language: 'python',
        engine: 'python',
        code: `# اگر یک کلید دو بار تکرار شود، مقدار دوم جایگزین اولی می‌شود!
student = {
    "name": "علی",
    "city": "تهران",
    "city": "شیراز",  # کلید تکراری ← مقدار "تهران" پاک می‌شود!
}
print("اثر کلید تکراری:", student)

# اما مقادیر تکراری برای کلیدهای متفاوت کاملاً مجازند:
scores = {"علی": 20, "رضا": 20, "سارا": 20}
print("مقادیر تکراری مجاز:", scores)`,
        teacherTalkingPoints: [
          'این مثال اشتباه متن ص ۵۳ کتاب را یک‌بار برای همیشه در ذهن کلاس اصلاح می‌کند.',
        ],
        lineExplanations: [
          {line: 5, explanation: 'کلید دوم "city" مقدار قبلی را بازنویسی می‌کند، پس طول دیکشنری ۲ می‌ماند.'},
        ],
        commonMistakes: ['تصور اشتباه اینکه دو دانش‌آموز نمی‌توانند نمره ۲۰ یکسان در دیکشنری داشته باشند.'],
      },
    ],
  },

  // =========================================================================
  // CONCEPT 3: Tuples (tuple)
  // =========================================================================
  {
    id: 'les-1-2-tuples',
    order: 3,
    title: 'تاپل‌ها (tuple): داده‌های ثابت و تغییرناپذیر، تاپل تک‌عضوی (x,) و بازکردن تاپل',
    bookPage: '۵۹ تا ۶۱',
    whyWeNeedIt: {
      realWorldProblem:
        'بعضی داده‌ها در یک برنامه هرگز نباید در طول اجرا به‌صورت تصادفی تغییر کنند؛ مثل مختصات جغرافیایی یک شهر (طول و عرض)، رنگ‌های اصلی (RGB)، روزهای هفته یا نقش‌های امنیتی سایت. اگر آن‌ها را در لیست بگذاریم ممکن است بخشی از کد اشتباهاً آن‌ها را پاک یا ویرایش کند؛ اینجا تاپل (tuple) مثل یک محفظه قفل‌شده عمل می‌کند.',
      analogy:
        'اگر لیست مثل «تخته وایت‌برد» است که هر لحظه می‌توان روی آن نوشت و پاک کرد، تاپل مثل «لوح حک‌شده روی سنگ» است: خواندنش سریع‌تر و ایمن‌تر است، اما بعد از ساخت دیگر نمی‌توانید حرفی از آن را عوض کنید!',
    },
    syntaxAnatomy: {
      template: `coords = (35.6892, 51.3890)
single_item = (42,)
lat, lon = coords`,
      parts: [
        {token: '(a, b)', role: 'پرانتز با اعضای جداشده با کاما یک تاپل تغییرناپذیر (Immutable) می‌سازد.'},
        {token: '(42,)', role: 'تاپل تک‌عضوی حتماً به کامای پایانی نیاز دارد؛ بدون کاما فقط عدد داخل پرانتز است.'},
        {token: 'lat, lon = coords', role: 'باز کردن تاپل (Tuple Unpacking): ریختن مستقیم اعضای تاپل در متغیرهای مجزا در یک خط.'},
      ],
    },
    behindTheScenes: [
      'چون تاپل تغییرناپذیر است، پایتون حافظه کمتری برای آن اختصاص می‌دهد و دسترسی به آن کمی سریع‌تر از لیست است؛ همچنین تاپل می‌تواند کلید دیکشنری یا عضو set باشد (در حالی که لیست نمی‌تواند).',
      'در شکل ۱۲۷ ص ۶۱ کتاب، کد print("daru") اشتباهاً دور نام متغیر کوتیشن گذاشته بود که فقط کلمه daru را چاپ می‌کرد نه محتوای تاپل داروها را!',
      'سازنده واقعی تاپل در پایتون «کاما» است نه پرانتز! مثلاً نوشتن t = 1, 2, 3 نیز یک تاپل می‌سازد، ولی گذاشتن پرانتز برای خوانایی بهتر است.',
    ],
    goldenTips: [
      'برای چک کردن نوع یک متغیر همیشه از type(x) استفاده کنید تا تفاوت (10) و (10,) را مطمئن شوید.',
      'تاپل هم مثل لیست از اندیس مثبت [0]، اندیس منفی [-1]، برش [1:3]، len() و حلقه for پشتیبانی می‌کند.',
    ],
    wrongVsRight: [
      {
        title: 'ساخت تاپل تک‌عضوی بدون کاما',
        wrongCode: `port = (8000)
print(type(port))  # int`,
        rightCode: `port = (8000,)
print(type(port))  # tuple`,
        explanation: 'بدون کامای پایانی، پرانتز فقط پرانتز ریاضی است و یک int می‌سازد نه tuple.',
      },
      {
        title: 'چاپ متغیر تاپل (اصلاح شکل ۱۲۷ ص ۶۱)',
        wrongCode: `daru = ("استامینوفن", "ویتامین C")
print("daru")`,
        rightCode: `daru = ("استامینوفن", "ویتامین C")
print(daru)`,
        explanation: 'قرار دادن کوتیشن دور نام متغیر باعث چاپ متن ثابت "daru" به جای اعضای تاپل می‌شود.',
      },
    ],
    examples: [
      {
        id: 'ex-1-2-tuples-basic',
        tier: 'basic',
        title: 'ساخت تاپل، تاپل تک‌عضوی (x,)، Unpacking و اصلاح ص ۶۱',
        bookPage: '۵۹ تا ۶۱',
        summary: 'کار با تاپل نقش‌های کاربری (اصلاح شکل ۱۲۴)، چاپ صحیح daru (اصلاح شکل ۱۲۷) و اثبات قانون کاما در تاپل تک‌عضوی.',
        language: 'python',
        engine: 'python',
        code: `# اصلاح شکل ۱۲۴ ص ۶۰ (املای صحیح نقش‌ها)
roles = ("super_admin", "teacher_admin", "student")
print("نقش اول:", roles[0], "| آخرین نقش:", roles[-1])
print("تعداد نقش‌ها:", len(roles))

# اصلاح شکل ۱۲۷ ص ۶۱: چاپ متغیر daru بدون کوتیشن
daru = ("استامینوفن", "ویتامین C", "شربت سرماخوردگی")
print("لیست داروهای ثابت:", daru)

# تاپل تک‌عضوی
not_tuple = (42)
real_tuple = (42,)
print("نوع (42):", type(not_tuple), "| نوع (42,):", type(real_tuple))

# باز کردن تاپل (Tuple Unpacking)
lat, lon = (35.6892, 51.3890)
print(f"مختصات تهران → عرض: {lat} | طول: {lon}")`,
        teacherTalkingPoints: [
          'خطوط ۱۱ تا ۱۳ را در کلاس برجسته کنید؛ این یکی از پرتکرارترین سؤال‌های آزمون‌های عملی پایتون است.',
        ],
        classroomQuestion: 'اگر بنویسیم roles[0] = "guest" چه خطایی رخ می‌دهد و چرا این ویژگی برای نقش‌های امنیتی مفید است؟',
        lineExplanations: [
          {line: 8, explanation: 'چاپ مستقیم متغیر daru محتوای تاپل را نمایش می‌دهد.'},
          {line: 16, explanation: 'مقدار اول در lat و مقدار دوم در lon ریخته می‌شود.'},
        ],
        commonMistakes: ['تلاش برای استفاده از .append() روی تاپل (تاپل متد تغییردهنده ندارد).'],
        bookCorrection: {
          page: 61,
          issue: 'در شکل ۱۲۷ رشته "daru" به‌جای متغیر چاپ شده بود و شکل ۱۲۴ غلط املایی supper_admin داشت.',
          fix: 'املای استاندارد نقش‌ها، چاپ صحیح متغیر daru و آموزش تاپل تک‌عضوی اضافه شد.',
        },
      },
      {
        id: 'ex-1-2-tuples-practical',
        tier: 'practical',
        title: 'فهرست ثابت شهرها و مختصات جغرافیایی (آماده‌سازی پودمان ۵)',
        bookPage: '۶۰',
        summary: 'ذخیره نام و مختصات شهرهای ایران در قالب لیست از تاپل‌ها و استخراج مستقیم با Unpacking در حلقه for.',
        language: 'python',
        engine: 'python',
        code: `cities = [
    ("تهران", 35.6892, 51.3890),
    ("همدان", 34.7981, 48.5146),
    ("اصفهان", 32.6546, 51.6680),
    ("شیراز", 29.5918, 52.5837),
]

print("=== فهرست مختصات شهرها ===")
for name, lat, lon in cities:
    print(f"شهر {name}: عرض {lat} ، طول {lon}")`,
        teacherTalkingPoints: [
          'به کلاس بگویید دقیقاً همین مختصات را در پودمان ۵ (جنگو) برای پروژه آب‌وهوای meteo استفاده خواهیم کرد!',
        ],
        lineExplanations: [
          {line: 9, explanation: 'هر تاپل سه‌عضوی به‌طور خودکار در سه متغیر name، lat و lon باز می‌شود.'},
        ],
        commonMistakes: ['تطابق نداشتن تعداد متغیرهای سمت چپ for با تعداد اعضای هر تاپل (ValueError).'],
      },
      {
        id: 'ex-1-2-tuples-combined',
        tier: 'combined',
        title: 'ویرایش کنترل‌شده تاپل از طریق تبدیل موقت به لیست و بازگشت',
        bookPage: '۶۱',
        summary: 'الگوی استاندارد تبدیل tuple به list برای یک تغییر آگاهانه و سپس قفل کردن مجدد به صورت tuple.',
        language: 'python',
        engine: 'python',
        code: `week_holidays = ("پنجشنبه", "جمعه")
print("تعطیلات فعلی:", week_holidays)

# برای ایجاد تغییر آگاهانه: تبدیل به لیست → تغییر → بازگشت به تاپل
temp_list = list(week_holidays)
temp_list.append("تعطیل رسمی")
updated_holidays = tuple(temp_list)

print("تعطیلات به‌روزشده:", updated_holidays)
print("تعداد تکرار 'جمعه':", updated_holidays.count("جمعه"))`,
        teacherTalkingPoints: [
          'نشان دهید که week_holidays اصلی همچنان دست‌نخورده است و تاپل جدیدی ساخته شده است.',
        ],
        lineExplanations: [
          {line: 5, explanation: 'تبدیل موقت تاپل به لیست قابل ویرایش با list().'},
          {line: 7, explanation: 'قفل کردن دوباره داده‌ها به شکل تاپل با tuple().'},
        ],
        commonMistakes: ['تصور اینکه تبدیل به لیست، تاپل اصلی را تغییر می‌دهد.'],
      },
      {
        id: 'ex-1-2-tuples-whatif',
        tier: 'what-if',
        title: 'آزمایشگاه What-If: مقایسه رفتار (10) در برابر (10,) و جابه‌جایی بدون متغیر کمکی',
        bookPage: '۶۰',
        summary: 'نمایش ترفند زیبای Swap در پایتون با تاپل (a, b = b, a) و مقایسه آن با تکرار عدد و تاپل.',
        language: 'python',
        engine: 'python',
        code: `# مقایسه ضرب در ۳ برای (10) در برابر (10,)
a = (10) * 3
b = (10,) * 3
print("(10) * 3 =", a)
print("(10,) * 3 =", b)

# جابه‌جایی مقدار دو متغیر در یک خط به کمک Tuple Unpacking!
x = "قرمز"
y = "آبی"
x, y = y, x
print(f"پس از جابه‌جایی → x={x} | y={y}")`,
        teacherTalkingPoints: [
          'خروجی خط ۴ (30) و خط ۵ ((10, 10, 10)) بهترین نمایش تصویری تفاوت عدد و تاپل تک‌عضوی است.',
        ],
        lineExplanations: [
          {line: 10, explanation: 'پایتون ابتدا تاپل (y, x) را می‌سازد و هم‌زمان در x و y می‌ریزد.'},
        ],
        commonMistakes: ['نوشتن x = y و سپس y = x که مقدار اولیه x را از بین می‌برد.'],
      },
    ],
  },

  // =========================================================================
  // CONCEPT 4: Defining Functions (def & Parameters)
  // =========================================================================
  {
    id: 'les-1-2-def-params',
    order: 4,
    title: 'تعریف تابع با def: پارامتر در برابر آرگومان (موقعیتی، کلیدی و پیش‌فرض)',
    bookPage: '۶۲ تا ۶۵',
    whyWeNeedIt: {
      realWorldProblem:
        'تصور کنید در یک فروشگاه اینترنتی باید در ۱۵ صفحه مختلف مالیات و تخفیف کالا را محاسبه کنید. اگر همان ۵ خط کد را ۱۵ بار کپی کنید و فردا نرخ مالیات تغییر کند، باید هر ۱۵ جا را اصلاح کنید! تابع (Function) اجازه می‌دهد یک‌بار منطق را بسازید و هر بار با ورودی‌های تازه صدایش بزنید.',
      analogy:
        'تابع مثل «دستگاه آبمیوه‌گیری» است: یک‌بار ساخته شده؛ هر بار که میوه‌های مختلف (آرگومان) درون دهانه‌اش (پارامتر) بریزید، همان فرآیند مشخص را تکرار کرده و نتیجه را تحویل می‌دهد!',
    },
    syntaxAnatomy: {
      template: `def show_product(name, price, category="Digital"):
    print(f"{name} | {category} | {price}")

show_product("کیبورد", 1500000)
show_product(price=900000, name="ماوس")`,
      parts: [
        {token: 'def', role: 'کلیدواژه تعریف تابع (مخفف define)؛ پس از نام و پرانتز حتماً دونقطه : می‌آید.'},
        {token: 'name, price', role: 'پارامترهای اجباری (Parameters) در زمان تعریف تابع که جایگاه ورودی‌ها را مشخص می‌کنند.'},
        {token: 'category="Digital"', role: 'پارامتر با مقدار پیش‌فرض (Default)؛ اگر هنگام فراخوانی ارسال نشود همین مقدار استفاده می‌شود.'},
        {token: 'price=900000', role: 'آرگومان کلیدی (Keyword Argument) هنگام فراخوانی؛ با نوشتن نام پارامتر، ترتیب ارسال دیگر مهم نیست.'},
      ],
    },
    behindTheScenes: [
      'نوشتن def show_product(...): به تنهایی هیچ خروجی چاپ نمی‌کند! پایتون فقط دستورالعمل را در حافظه ثبت می‌کند و تا زمانی که تابع را با پرانتز صدا نزنید (Call)، بدنه آن اجرا نمی‌شود.',
      'تفاوت دقیق دو واژه کتاب: متغیرهای داخل پرانتزِ خط def «پارامتر» (Parameter) هستند و مقادیر واقعی که موقع صدا زدن می‌فرستیم «آرگومان» (Argument) نام دارند.',
      'قانون نحوی پایتون: پارامترهای دارای مقدار پیش‌فرض همیشه باید در سمت راست (انتهای) فهرست پارامترها قرار بگیرند، وگرنه SyntaxError رخ می‌دهد.',
      'اصل مهندسی DRY (Don’t Repeat Yourself): هرگاه یک قطعه کد را بیش از دو بار کپی کردید، وقت تبدیل آن به تابع رسیده است.',
    ],
    goldenTips: [
      'نام تابع را مانند متغیرها با حروف کوچک و زیرخط (snake_case) و ترجیحاً به صورت فعل (مثل calc_tax یا show_menu) انتخاب کنید.',
      'هنگام فراخوانی تابع‌های دارای چند پارامتر، استفاده از آرگومان کلیدی خوانایی کد را چند برابر می‌کند.',
    ],
    wrongVsRight: [
      {
        title: 'قرار دادن پارامتر پیش‌فرض قبل از پارامتر اجباری',
        wrongCode: `def greet(role="هنرجو", name):
    print(role, name)`,
        rightCode: `def greet(name, role="هنرجو"):
    print(role, name)`,
        explanation: 'پارامترهای بدون پیش‌فرض باید همیشه قبل از پارامترهای دارای مقدار پیش‌فرض تعریف شوند.',
      },
      {
        title: 'فراموش کردن پرانتز در فراخوانی تابع',
        wrongCode: `def say_hi():
    print("سلام!")
say_hi`,
        rightCode: `def say_hi():
    print("سلام!")
say_hi()`,
        explanation: 'نوشتن say_hi بدون پرانتز فقط به خود تابع اشاره می‌کند و آن را اجرا نمی‌کند.',
      },
    ],
    examples: [
      {
        id: 'ex-1-2-def-basic',
        tier: 'basic',
        title: 'فراخوانی موقعیتی، کلیدی و مقدار پیش‌فرض (اصلاح املای ص ۶۳)',
        bookPage: '۶۲ تا ۶۵',
        summary: 'نمایش هر سه روش ارسال آرگومان به تابع show_product همراه با اصلاح غلط املایی Digaital در ص ۶۳ کتاب.',
        language: 'python',
        engine: 'python',
        code: `def show_product(name, price, category="Digital"):
    print(f"کالا: {name} | دسته: {category} | قیمت: {price} تومان")

# ۱. فراخوانی موقعیتی با استفاده از مقدار پیش‌فرض
show_product("کیبورد مکانیکی", 1850000)

# ۲. فراخوانی موقعیتی با تغییر مقدار پیش‌فرض
show_product("کتاب طراح سایت", 45000, "کتاب درسی")

# ۳. فراخوانی کلیدی (ترتیب اهمیت ندارد!)
show_product(price=950000, name="ماوس بی‌سیم", category="لوازم جانبی")`,
        teacherTalkingPoints: [
          'در هر سه فراخوانی از کلاس بپرسید مقدار متغیر category داخل تابع چیست.',
        ],
        classroomQuestion: 'اگر در خط اول بنویسیم show_product("کیبورد") و قیمت را نفرستیم چه خطایی می‌دهد؟',
        lineExplanations: [
          {line: 1, explanation: 'تعریف تابع با ۲ پارامتر اجباری و ۱ پارامتر دارای مقدار پیش‌فرض.'},
          {line: 11, explanation: 'ارسال با نام پارامترها باعث می‌شود جابه‌جایی ترتیب مشکلی ایجاد نکند.'},
        ],
        commonMistakes: ['فراموش کردن دونقطه : در انتهای خط def یا نداشتن تورفتگی در بدنه تابع.'],
        bookCorrection: {
          page: 63,
          issue: 'غلط املایی "Digaital" در شکل ۱۳۴ و فاصله اضافی در " Mobile Price" در شکل ۱۳۸.',
          fix: 'مثال تمیز با املای صحیح و پوشش هر سه نوع فراخوانی ارائه شد.',
        },
      },
      {
        id: 'ex-1-2-def-practical',
        tier: 'practical',
        title: 'تابع چاپ فاکتور فروش با نرخ مالیات پیش‌فرض ۹٪',
        bookPage: '۶۴ تا ۶۵',
        summary: 'کاربرد پارامتر پیش‌فرض در فروشگاه: اگر نرخ مالیات ارسال نشود ۹٪ حساب می‌شود، و برای کالای معاف می‌توان 0 فرستاد.',
        language: 'python',
        engine: 'python',
        code: `def print_invoice(item, price, tax_rate=0.09):
    tax = int(price * tax_rate)
    final_price = price + tax
    print(f"🧾 {item} | پایه: {price} | مالیات ({int(tax_rate*100)}%): {tax} | نهایی: {final_price} تومان")

# کالای عادی با مالیات پیش‌فرض ۹٪
print_invoice("هدفون", 1200000)

# کتاب درسی معاف از مالیات (ارسال 0)
print_invoice("کتاب طراح سایت", 45000, tax_rate=0)`,
        teacherTalkingPoints: [
          'بگویید همین یک تابع به جای نوشتن دو الگوریتم جداگانه برای کالای مشمول و معاف از مالیات کافی است.',
        ],
        lineExplanations: [
          {line: 1, explanation: 'مقدار پیش‌فرض tax_rate=0.09 برای اکثر کالاهای فروشگاه.'},
          {line: 10, explanation: 'ارسال tax_rate=0 مقدار پیش‌فرض را فقط برای همین فراخوانی لغو می‌کند.'},
        ],
        commonMistakes: ['ارسال عدد 9 به جای 0.09 که مالیات را ۹۰۰ درصد حساب می‌کند!'],
      },
      {
        id: 'ex-1-2-def-combined',
        tier: 'combined',
        title: 'ترکیب تابع با لیست دیکشنری‌ها برای تولید کارت گزارش هنرجویان',
        bookPage: '۶۵',
        summary: 'فراخوانی مکرر یک تابع درون حلقه for روی فهرستی از دیکشنری‌های دانش‌آموزان.',
        language: 'python',
        engine: 'python',
        code: `def evaluate_student(name, score, pass_mark=12):
    status = "قبول ✔" if score >= pass_mark else "نیاز به تلاش بیشتر ⚠"
    print(f"هنرجو {name} | نمره: {score} | حدنصاب: {pass_mark} ← {status}")

class_list = [
    {"name": "امیر", "score": 18.5},
    {"name": "سارا", "score": 11.0},
    {"name": "رضا", "score": 15.0},
]

for st in class_list:
    evaluate_student(st["name"], st["score"])`,
        teacherTalkingPoints: [
          'نشان دهید چطور اگر حدنصاب هنرستان به ۱۴ تغییر کند، کافی است فقط pass_mark=14 بفرستیم.',
        ],
        lineExplanations: [
          {line: 12, explanation: 'استخراج فیلدهای هر دیکشنری و ارسال آن‌ها به عنوان آرگومان به تابع.'},
        ],
        commonMistakes: ['تکرار کردن تعریف def داخل حلقه for به جای تعریف یک‌باره بیرون حلقه.'],
      },
      {
        id: 'ex-1-2-def-whatif',
        tier: 'what-if',
        title: 'آزمایشگاه What-If: اثر جابه‌جایی ترتیب در آرگومان موقعیتی در برابر کلیدی',
        bookPage: '۶۴',
        summary: 'مقایسه مستقیم خطای منطقی ناشی از جابه‌جا فرستادن آرگومان‌های موقعیتی با ایمنی آرگومان‌های کلیدی.',
        language: 'python',
        engine: 'python',
        code: `def power_report(base, exp):
    print(f"{base} به توان {exp} = {base ** exp}")

print("۱. موقعیتی درست (2, 3):")
power_report(2, 3)

print("۲. موقعیتی جابه‌جا (3, 2) ← نتیجه متفاوت!")
power_report(3, 2)

print("۳. کلیدی (حتی با ترتیب برعکس، نتیجه درست است!):")
power_report(exp=3, base=2)`,
        teacherTalkingPoints: [
          'تفاوت 2**3 = 8 و 3**2 = 9 به‌سرعت اهمیت ترتیب موقعیتی و مزیت آرگومان کلیدی را روشن می‌کند.',
        ],
        lineExplanations: [
          {line: 11, explanation: 'با نام‌گذاری صریح exp=3 و base=2 نتیجه دقیقاً برابر 8 می‌شود.'},
        ],
        commonMistakes: ['اشتباه نوشتن نام پارامتر در آرگومان کلیدی (TypeError).'],
      },
    ],
  },
];
