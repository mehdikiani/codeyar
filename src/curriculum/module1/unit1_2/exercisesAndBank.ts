import type {
  ClassroomActivity,
  HomeworkAssignment,
  QuickQuizQuestion,
} from '../../../types/curriculum.ts';

export const UNIT_1_2_ACTIVITIES: ClassroomActivity[] = [
  {
    id: 'act-1-2-quiz-game',
    kind: 'project',
    title: 'پروژه اصلی واحد ۱.۲: بازی آزمون چهارگزینه‌ای (Quiz) با دیکشنری (اصلاح ص ۵۸)',
    bookPage: '۵۷ تا ۵۸',
    estimatedMinutes: 15,
    prompt:
      'بازی آزمون (Quiz) کتاب درسی را با یک دیکشنری شامل ۴ پرسش پایتون بسازید. در هر مرحله پرسش را نمایش دهید، پاسخ کاربر را با .strip().lower() مقایسه کنید و امتیاز نهایی و درصد موفقیت را گزارش دهید (با اصلاح حذف تکرار score = 0 در ص ۵۸).',
    steps: [
      'دیکشنری questions شامل جفت «سؤال: پاسخ کوتاه» بسازید.',
      'متغیر score = 0 را فقط یک‌بار قبل از حلقه تعریف کنید.',
      'با حلقه for q, ans in questions.items(): سؤال را بپرسید و پاسخ کاربر را بررسی کنید.',
      'در پایان تعداد درست و درصد موفقیت را چاپ کنید.',
    ],
    hints: [
      'استفاده از .strip().lower() باعث می‌شود فاصله اضافی یا حروف بزرگ باعث غلط شدن پاسخ درست هنرجو نشود.',
    ],
    language: 'python',
    engine: 'python',
    starterCode: `questions = {
    "کلیدواژه تعریف تابع در پایتون چیست؟ ": "def",
    "نوع داده {} در پایتون چیست؟ (dict یا set) ": "dict",
    "برای بازگرداندن مقدار از تابع چه دستوری می‌نویسیم؟ ": "return",
    "نتیجه 10 // 3 چیست؟ ": "3",
}

score = 0
# حلقه اجرای آزمون و محاسبه امتیاز را تکمیل کنید:
`,
    solutionCode: `questions = {
    "کلیدواژه تعریف تابع در پایتون چیست؟ ": "def",
    "نوع داده {} در پایتون چیست؟ (dict یا set) ": "dict",
    "برای بازگرداندن مقدار از تابع چه دستوری می‌نویسیم؟ ": "return",
    "نتیجه 10 // 3 چیست؟ ": "3",
}

score = 0
for q, correct_ans in questions.items():
    user_ans = input(q).strip().lower()
    if user_ans == correct_ans:
        print("✔ آفرین! پاسخ درست است.")
        score += 1
    else:
        print(f"✘ نادرست! پاسخ صحیح: {correct_ans}")

percent = round((score / len(questions)) * 100, 1)
print(f"=== پایان آزمون | امتیاز: {score} از {len(questions)} ({percent}%) ===")`,
    solutionExplanation:
      'در ص ۵۸ کتاب خط score = 0 دو بار تکرار شده بود؛ نسخه اصلاح‌شده علاوه بر حذف تکرار، ورودی را با strip/lower نرمال‌سازی کرده و درصد موفقیت را حساب می‌کند.',
    alternativeSolutionCode: `quiz = [("نوع (5,) چیست؟ ", "tuple"), ("نوع set() چیست؟ ", "set")]
score = 0
for idx, item in enumerate(quiz, 1):
    if input(f"سؤال {idx}: {item[0]}").strip().lower() == item[1]:
        score += 1
print(f"امتیاز کل: {score}/{len(quiz)}")`,
    alternativeSolutionExplanation:
      'نسخه فشرده با لیست از تاپل‌ها و شماره‌گذاری خودکار پرسش‌ها توسط enumerate().',
  },
  {
    id: 'act-1-2-calculator-9',
    kind: 'project',
    title: 'پروژه اصلی ماشین‌حساب ۹ گزینه‌ای با توابع و ماژول math (ص ۶۹ و ۷۴)',
    bookPage: '۶۹ و ۷۴',
    estimatedMinutes: 15,
    prompt:
      'ماشین‌حساب جامع کتاب را با توابع جداگانه و ماژول math پیاده‌سازی کنید که ۹ عملیات (جمع، تفریق، ضرب، تقسیم ایمن، تقسیم صحیح، باقیمانده، توان، جذر و قدرمطلق) را پشتیبانی کند.',
    steps: [
      'برای هر عملیات یک تابع مستقل با return بنویسید و در تقسیم، صفر بودن مخرج را کنترل کنید.',
      'گزینه انتخابی کاربر را بگیرید و با if/elif تابع مناسب را صدا بزنید.',
      'خروجی را با فرمت خوانا چاپ کنید.',
    ],
    hints: [
      'برای جذر از math.sqrt(a) (پس از بررسی a >= 0) و برای قدرمطلق از abs(a) استفاده کنید.',
    ],
    language: 'python',
    engine: 'python',
    starterCode: `import math

def add(a, b): return a + b
def sub(a, b): return a - b
# سایر توابع و منوی انتخاب را تکمیل کنید:
`,
    solutionCode: `import math

def add(a, b): return a + b
def sub(a, b): return a - b
def mul(a, b): return a * b
def div(a, b): return "خطا: تقسیم بر صفر!" if b == 0 else round(a / b, 2)
def floor_div(a, b): return "خطا: تقسیم بر صفر!" if b == 0 else a // b
def mod(a, b): return "خطا: تقسیم بر صفر!" if b == 0 else a % b
def power(a, b): return pow(a, b)
def root(a): return "خطا: عدد منفی!" if a < 0 else round(math.sqrt(a), 2)

print("1:جمع | 2:تفریق | 3:ضرب | 4:تقسیم | 5:صحیح | 6:باقیمانده | 7:توان | 8:جذر | 9:قدرمطلق")
op = input("شماره عملیات (1 تا 9): ").strip()

if op in ["8", "9"]:
    x = float(input("عدد: "))
    print("نتیجه:", root(x) if op == "8" else abs(x))
else:
    a = float(input("عدد اول: "))
    b = float(input("عدد دوم: "))
    if op == "1": print("نتیجه:", add(a, b))
    elif op == "2": print("نتیجه:", sub(a, b))
    elif op == "3": print("نتیجه:", mul(a, b))
    elif op == "4": print("نتیجه:", div(a, b))
    elif op == "5": print("نتیجه:", floor_div(a, b))
    elif op == "6": print("نتیجه:", mod(a, b))
    elif op == "7": print("نتیجه:", power(a, b))
    else: print("گزینه نامعتبر است.")`,
    solutionExplanation:
      'ماژولار کردن هر عملیات درون تابع مستقل باعث می‌شود کد تمیز، قابل تست و بدون کرش تقسیم بر صفر باشد.',
    alternativeSolutionCode: `import math
def calc(op, a, b=0):
    if op == "+": return a + b
    if op == "-": return a - b
    if op == "*": return a * b
    if op == "/": return a / b if b != 0 else "ناممجاز"
    if op == "sqrt": return round(math.sqrt(a), 2)
    return "نامعتبر"

print("جمع:", calc("+", 12, 8))
print("جذر:", calc("sqrt", 81))`,
    alternativeSolutionExplanation:
      'الگوی تابع متمرکز با پارامتر پیش‌فرض b=0 که هم عملیات دوعملوندی و هم تک‌عملوندی را در یک تابع مدیریت می‌کند.',
  },
  {
    id: 'act-1-2-char-counter',
    kind: 'activity',
    title: 'فعالیت ص ۷۹: تابع تحلیل‌گر رمز عبور (شمارش حروف بزرگ، کوچک و ارقام)',
    bookPage: '۷۹',
    estimatedMinutes: 10,
    prompt:
      'تابعی به نام analyze_text(text) بنویسید که یک رشته (مثلاً رمز عبور) بگیرد و تعداد حروف بزرگ (isupper)، حروف کوچک (islower) و ارقام (isdigit) را در قالب یک دیکشنری برگرداند.',
    steps: [
      'سه شمارنده upper، lower و digits با مقدار اولیه 0 بسازید.',
      'روی هر کاراکتر رشته با حلقه for ch in text: حرکت کنید.',
      'دیکشنری گزارش را return کنید و بر اساس آن قوی یا ضعیف بودن رمز را اعلام کنید.',
    ],
    hints: [
      'متدهای ch.isupper()، ch.islower() و ch.isdigit() خروجی بولی True/False می‌دهند.',
    ],
    language: 'python',
    engine: 'python',
    starterCode: `def analyze_text(text):
    upper = 0
    lower = 0
    digits = 0
    # حلقه بررسی کاراکترها:
    return {"upper": upper, "lower": lower, "digits": digits}

sample = input("یک رمز عبور آزمایشی وارد کنید (مثلاً PyWeb1405): ")
print(analyze_text(sample))`,
    solutionCode: `def analyze_text(text):
    upper = 0
    lower = 0
    digits = 0
    for ch in text:
        if ch.isupper():
            upper += 1
        elif ch.islower():
            lower += 1
        elif ch.isdigit():
            digits += 1
    return {"upper": upper, "lower": lower, "digits": digits}

sample = input("یک رمز عبور آزمایشی وارد کنید (مثلاً PyWeb1405): ")
report = analyze_text(sample)
print("گزارش تحلیل رشته:", report)
if report["upper"] > 0 and report["lower"] > 0 and report["digits"] > 0:
    print("✔ رمز عبور قوی است!")
else:
    print("⚠ از ترکیب حروف بزرگ، کوچک و عدد استفاده کنید.")`,
    solutionExplanation:
      'پوشش کامل فعالیت ص ۷۹ کتاب همراه با آموزش متدهای بررسی کاراکتر و بازگرداندن گزارش به شکل دیکشنری.',
    alternativeSolutionCode: `def is_strong(pwd):
    has_u = False
    has_l = False
    has_d = False
    for c in pwd:
        if c.isupper(): has_u = True
        if c.islower(): has_l = True
        if c.isdigit(): has_d = True
    return len(pwd) >= 8 and has_u and has_l and has_d

print("PyWeb1405 قوی است؟", is_strong("PyWeb1405"))`,
    alternativeSolutionExplanation:
      'الگوی پرچم‌های بولی (Boolean Flags) برای مواقعی که فقط دانستن «وجود داشتن یا نداشتن» کافی است.',
  },
  {
    id: 'act-1-2-phonebook-dict',
    kind: 'workshop',
    title: 'کارگاه دفترچه تلفن تعاملی با دیکشنری (افزودن، جستجوی ایمن و حذف)',
    bookPage: '۵۴ تا ۵۶',
    estimatedMinutes: 12,
    prompt:
      'برنامه‌ای بسازید که یک دفترچه تلفن اولیه دارد، نام یک مخاطب را از کاربر می‌پرسد و شماره او را با .get() نمایش می‌دهد؛ سپس یک مخاطب جدید اضافه کرده و کل دفترچه را مرتب چاپ می‌کند.',
    steps: [
      'دیکشنری contacts با ۳ مخاطب اولیه تعریف کنید.',
      'با input نام مورد جستجو را بگیرید و با contacts.get(name, "یافت نشد") نتیجه را نمایش دهید.',
      'نام و شماره مخاطب جدید را بگیرید و به دیکشنری اضافه کنید.',
      'با حلقه روی contacts.items() کل دفترچه را نمایش دهید.',
    ],
    hints: [
      'اضافه کردن مخاطب جدید فقط یک خط است: contacts[new_name] = new_phone.',
    ],
    language: 'python',
    engine: 'python',
    starterCode: `contacts = {
    "علی": "09121112233",
    "سارا": "09124445566",
    "مدیر کارگاه": "02188776655",
}
# جستجو و افزودن مخاطب جدید را پیاده‌سازی کنید:
`,
    solutionCode: `contacts = {
    "علی": "09121112233",
    "سارا": "09124445566",
    "مدیر کارگاه": "02188776655",
}

search = input("نام مخاطب برای جستجو: ").strip()
print("شماره:", contacts.get(search, "مخاطب در دفترچه یافت نشد."))

new_name = input("نام مخاطب جدید: ").strip()
new_phone = input("شماره تماس: ").strip()
if new_name:
    contacts[new_name] = new_phone

print("=== فهرست کامل مخاطبین ===")
for k, v in contacts.items():
    print(f"📞 {k}: {v}")`,
    solutionExplanation:
      'تمرین عملی CRUD پایه روی دیکشنری (جستجوی ایمن با get، درج کلید جدید و پیمایش items).',
    alternativeSolutionCode: `contacts = {"علی": "09121112233", "سارا": "09124445566"}
name = input("نام مخاطب: ").strip()
if name in contacts:
    print("یافت شد:", contacts[name])
else:
    print("موجود نیست؛ کلیدهای فعلی:", list(contacts.keys()))`,
    alternativeSolutionExplanation:
      'استفاده از عملگر in برای بررسی پیشینی عضویت کلید در دیکشنری همراه با نمایش فهرست کلیدها.',
  },
  {
    id: 'act-1-2-unique-tags-set',
    kind: 'activity',
    title: 'فعالیت تمیزکاری برچسب‌های فروشگاه با set و sorted()',
    bookPage: '۵۰ و ۷۲',
    estimatedMinutes: 8,
    prompt:
      'لیستی از برچسب‌های تکراری و نامرتب محصولات یک سایت دارید. تابعی بنویسید که تکراری‌ها را با set حذف کند، برچسب "تست" را ایمن با discard پاک کند و خروجی مرتب الفبایی را برگرداند.',
    steps: [
      'تابع clean_tags(raw_tags) را تعریف کنید.',
      'لیست را به set تبدیل کرده و .discard("تست") را صدا بزنید.',
      'نتیجه sorted(unique) را return کنید.',
    ],
    hints: [
      'تابع sorted() روی set کار می‌کند و همیشه یک list مرتب برمی‌گرداند.',
    ],
    language: 'python',
    engine: 'python',
    starterCode: `raw = ["پایتون", "تست", "وب", "پایتون", "جنگو", "وب", "تست"]

def clean_tags(raw_tags):
    # تکمیل کنید
    return []

print(clean_tags(raw))`,
    solutionCode: `raw = ["پایتون", "تست", "وب", "پایتون", "جنگو", "وب", "تست"]

def clean_tags(raw_tags):
    unique = set(raw_tags)
    unique.discard("تست")
    return sorted(unique)

result = clean_tags(raw)
print("برچسب‌های تمیز و مرتب:", result)
print("تعداد نهایی:", len(result))`,
    solutionExplanation:
      'ترکیب تابع، تبدیل list ← set، متد ایمن discard و تابع داخلی sorted() برای پاک‌سازی واقعی داده‌ها.',
    alternativeSolutionCode: `raw = ["پایتون", "تست", "وب", "پایتون", "جنگو"]
cleaned = []
for t in raw:
    if t != "تست" and t not in cleaned:
        cleaned.append(t)
print(sorted(cleaned))`,
    alternativeSolutionExplanation:
      'روش دستی بدون set که طولانی‌تر است؛ مقایسه این دو روش مزیت سرعت و سادگی set را به کلاس نشان می‌دهد.',
  },
  {
    id: 'act-1-2-score-stats-fn',
    kind: 'workshop',
    title: 'کارگاه تابع آمارگیر کارنامه (بیشینه، کمینه، میانگین و رتبه با توابع داخلی)',
    bookPage: '۷۰ تا ۷۲',
    estimatedMinutes: 10,
    prompt:
      'تابعی به نام class_report(scores) بنویسید که لیست نمرات را بگیرد و دیکشنری شامل بیشترین نمره، کمترین نمره، میانگین تا ۲ رقم اعشار و لیست مرتب نزولی را برگرداند.',
    steps: [
      'درون تابع، اگر لیست خالی بود دیکشنری خالی برگردانید.',
      'از max()، min()، sum()، len()، round() و sorted(..., reverse=True) استفاده کنید.',
      'خروجی را به صورت دیکشنری return و در برنامه اصلی چاپ کنید.',
    ],
    hints: [
      'میانگین برابر round(sum(scores) / len(scores), 2) است.',
    ],
    language: 'python',
    engine: 'python',
    starterCode: `def class_report(scores):
    # با توابع داخلی گزارش را بسازید و return کنید
    pass

marks = [17.5, 19, 14.5, 20, 16, 18.25]
print(class_report(marks))`,
    solutionCode: `def class_report(scores):
    if len(scores) == 0:
        return {}
    return {
        "max": max(scores),
        "min": min(scores),
        "avg": round(sum(scores) / len(scores), 2),
        "ranked": sorted(scores, reverse=True),
    }

marks = [17.5, 19, 14.5, 20, 16, 18.25]
rep = class_report(marks)
for k, v in rep.items():
    print(f"{k}: {v}")`,
    solutionExplanation:
      'ترکیب کامل توابع داخلی ریاضی، مرتب‌سازی و بازگرداندن خروجی ساختاریافته به شکل دیکشنری.',
    alternativeSolutionCode: `marks = [17.5, 19, 14.5, 20, 16, 18.25]
ordered = sorted(marks)
print("کمینه:", ordered[0], "| بیشینه:", ordered[-1], "| میانگین:", round(sum(ordered)/len(ordered), 2))`,
    alternativeSolutionExplanation:
      'بعد از یک‌بار مرتب‌سازی، اولین عضو کمینه و آخرین عضو بیشینه است.',
  },
  {
    id: 'act-1-2-custom-module',
    kind: 'workshop',
    title: 'کارگاه ساخت ماژول هندسه محلی (geometry.py) با ماژول math',
    bookPage: '۷۴ تا ۷۵',
    estimatedMinutes: 12,
    prompt:
      'یک ماژول محلی به نام geometry.py با دو تابع مساحت دایره و مساحت مستطیل بسازید و آن را در فایل اصلی import و اجرا کنید.',
    steps: [
      'فایل geometry.py را در فایل‌سیستم مجازی مشاهده کنید.',
      'از math.pi در تابع circle_area(r) استفاده کنید.',
      'در فایل اصلی با import geometry هر دو تابع را فراخوانی و چاپ کنید.',
    ],
    hints: [
      'مساحت دایره برابر math.pi * (r ** 2) است.',
    ],
    language: 'python',
    engine: 'python-fs',
    extraFiles: {
      'geometry.py': `import math

def circle_area(r):
    return round(math.pi * (r ** 2), 2)

def rect_area(w, h):
    return w * h
`,
    },
    starterCode: `import geometry

# مساحت دایره‌ای به شعاع 5 و مستطیل 8 در 4 را چاپ کنید:
`,
    solutionCode: `import geometry

print("مساحت دایره به شعاع 5:", geometry.circle_area(5))
print("مساحت مستطیل 8 × 4:", geometry.rect_area(8, 4))`,
    solutionExplanation:
      'جداسازی توابع هندسی در فایل geometry.py باعث قابلیت استفاده مجدد در تمام پروژه‌های آینده می‌شود.',
    alternativeSolutionCode: `from geometry import circle_area, rect_area
print("دایره:", circle_area(10), "| مستطیل:", rect_area(5, 6))`,
    alternativeSolutionExplanation:
      'استفاده از from ... import ... برای فراخوانی مستقیم توابع بدون تکرار نام ماژول.',
  },
  {
    id: 'act-1-2-turtle-polygon',
    kind: 'activity',
    title: 'کارگاه تابع رسم چندضلعی منتظم با ماژول turtle',
    bookPage: '۷۶',
    estimatedMinutes: 10,
    prompt:
      'تابعی به نام draw_polygon(sides, length) بنویسید که با ماژول turtle هر چندضلعی منتظم (مثلث، مربع، شش‌ضلعی) را با محاسبه خودکار زاویه 360 / sides رسم کند.',
    steps: [
      'ماژول turtle را import کنید و شیء t = turtle.Turtle() بسازید.',
      'درون تابع زاویه angle = 360 / sides را حساب کنید.',
      'با حلقه for _ in range(sides) حرکت forward و چرخش right را تکرار کنید.',
    ],
    hints: [
      'مجموع زوایای خارجی هر چندضلعی منتظم ۳۶۰ درجه است، پس هر چرخش برابر 360 / sides می‌باشد.',
    ],
    language: 'python',
    engine: 'python',
    starterCode: `import turtle
t = turtle.Turtle()

def draw_polygon(sides, length):
    # زاویه و حلقه رسم را بنویسید
    pass

draw_polygon(6, 60)`,
    solutionCode: `import turtle
t = turtle.Turtle()

def draw_polygon(sides, length):
    angle = 360 / sides
    for _ in range(sides):
        t.forward(length)
        t.right(angle)
    print(f"✔ چندضلعی {sides} ضلعی با زاویه {angle} درجه رسم شد.")

t.color("#0284c7")
draw_polygon(6, 60)`,
    solutionExplanation:
      'ترکیب تابع پارامتردار، حلقه شمارشی و ماژول گرافیکی turtle برای تولید اشکال هندسی پویا.',
    alternativeSolutionCode: `import turtle
t = turtle.Turtle()
for sides in [3, 4, 5]:
    for _ in range(sides):
        t.forward(50)
        t.right(360 / sides)
print("مثلث، مربع و پنج‌ضلعی رسم شدند!")`,
    alternativeSolutionExplanation:
      'حلقه‌های تو در تو برای رسم هم‌زمان سه شکل هندسی مختلف روی یک بوم.',
  },
];

export const UNIT_1_2_HOMEWORKS: HomeworkAssignment[] = [
  // -------------------- EASY (1 - 4) --------------------
  {
    id: 'hw-1-2-01',
    number: 1,
    title: 'حذف تکراری از لیست ایمیل‌ها با set()',
    difficulty: 'easy',
    bookPage: '۴۹ تا ۵۱',
    estimatedMinutes: 10,
    prompt:
      'لیستی از ایمیل‌های ثبت‌نامی شامل موارد تکراری تعریف کنید؛ با تبدیل به مجموعه (set) تکراری‌ها را حذف کرده، یک ایمیل جدید با add() اضافه کنید و تعداد کل ایمیل‌های یکتا را چاپ نمایید.',
    sampleOutput: `تعداد اولیه: 5
ایمیل‌های یکتا: 4`,
    hint: 'ابتدا unique = set(emails) بسازید و سپس از .add() و len() استفاده کنید.',
    solutionCode: `emails = ["a@mail.ir", "b@mail.ir", "a@mail.ir", "c@mail.ir", "b@mail.ir"]
unique = set(emails)
unique.add("d@mail.ir")
print("تعداد اولیه:", len(emails))
print("ایمیل‌های یکتا:", len(unique))
print("لیست مرتب:", sorted(unique))`,
    solutionExplanation: 'کاربرد عملی set برای یکتاسازی داده‌های ورودی و مرتب‌سازی خروجی با sorted().',
    language: 'python',
    engine: 'python',
  },
  {
    id: 'hw-1-2-02',
    number: 2,
    title: 'دیکشنری مشخصات یک گوشی هوشمند و خواندن ایمن با get()',
    difficulty: 'easy',
    bookPage: '۵۲ تا ۵۵',
    estimatedMinutes: 10,
    prompt:
      'دیکشنری phone با کلیدهای brand، model و price بسازید. قیمت آن را ۱۰٪ افزایش دهید، کلید ناموجود "color" را با get() و پیش‌فرض "مشکی" چاپ کنید و در نهایت کل دیکشنری را نمایش دهید.',
    sampleOutput: `رنگ: مشکی
قیمت جدید: 16500000`,
    hint: 'برای افزایش ۱۰٪ بنویسید: phone["price"] = int(phone["price"] * 1.1).',
    solutionCode: `phone = {"brand": "Samsung", "model": "A55", "price": 15000000}
phone["price"] = int(phone["price"] * 1.1)
print("رنگ:", phone.get("color", "مشکی"))
print("قیمت جدید:", phone["price"])
print("دیکشنری کامل:", phone)`,
    solutionExplanation: 'تثبیت به‌روزرسانی مقدار کلید و دسترسی بدون خطا توسط get().',
    language: 'python',
    engine: 'python',
  },
  {
    id: 'hw-1-2-03',
    number: 3,
    title: 'تاپل مختصات، تاپل تک‌عضوی و Unpacking',
    difficulty: 'easy',
    bookPage: '۵۹ تا ۶۱',
    estimatedMinutes: 10,
    prompt:
      'یک تاپل سه‌عضوی شامل نام شهر، عرض و طول جغرافیایی بسازید و با Unpacking در سه متغیر جداگانه بریزید؛ همچنین یک تاپل تک‌عضوی بسازید و نوع آن را با type() ثابت کنید.',
    sampleOutput: `اصفهان → 32.65, 51.67
نوع تک‌عضوی: <class 'tuple'>`,
    hint: 'در تاپل تک‌عضوی کامای پایانی (1405,) را فراموش نکنید.',
    solutionCode: `city_info = ("اصفهان", 32.65, 51.67)
name, lat, lon = city_info
print(f"{name} → {lat}, {lon}")

year_tuple = (1405,)
print("نوع تک‌عضوی:", type(year_tuple))`,
    solutionExplanation: 'جمع‌بندی نکات کلیدی تاپل‌ها: Unpacking و کامای تاپل تک‌عضوی.',
    language: 'python',
    engine: 'python',
  },
  {
    id: 'hw-1-2-04',
    number: 4,
    title: 'تابع محاسبه محیط و مساحت مستطیل با مقدار پیش‌فرض',
    difficulty: 'easy',
    bookPage: '۶۲ تا ۶۷',
    estimatedMinutes: 10,
    prompt:
      'تابعی به نام rect_info(width, height=10) بنویسید که محیط و مساحت مستطیل را به‌صورت هم‌زمان return کند. آن را یک‌بار با یک آرگومان (استفاده از پیش‌فرض) و یک‌بار با دو آرگومان صدا بزنید.',
    sampleOutput: `حالت پیش‌فرض (5×10) → محیط: 30 | مساحت: 50
حالت کامل (4×7) → محیط: 22 | مساحت: 28`,
    hint: 'بنویسید return 2 * (width + height), width * height.',
    solutionCode: `def rect_info(width, height=10):
    perimeter = 2 * (width + height)
    area = width * height
    return perimeter, area

p1, a1 = rect_info(5)
print(f"حالت پیش‌فرض (5×10) → محیط: {p1} | مساحت: {a1}")

p2, a2 = rect_info(4, 7)
print(f"حالت کامل (4×7) → محیط: {p2} | مساحت: {a2}")`,
    solutionExplanation: 'تمرین پارامتر پیش‌فرض و بازگرداندن هم‌زمان دو خروجی از تابع.',
    language: 'python',
    engine: 'python',
  },

  // -------------------- MEDIUM (5 - 7) --------------------
  {
    id: 'hw-1-2-05',
    number: 5,
    title: 'تبدیل مبلغ به تعداد اسکناس‌های ۵۰ و ۱۰ هزار تومانی با divmod()',
    difficulty: 'medium',
    bookPage: '۷۰ تا ۷۱',
    estimatedMinutes: 12,
    prompt:
      'مبلغی (مثلاً 185000 تومان) را از کاربر بگیرید و با استفاده از تابع داخلی divmod() محاسبه کنید چند اسکناس ۵۰٬۰۰۰ تومانی، چند اسکناس ۱۰٬۰۰۰ تومانی و چقدر باقیمانده دارد.',
    sampleInput: `185000`,
    sampleOutput: `اسکناس ۵۰ هزار تومانی: 3
اسکناس ۱۰ هزار تومانی: 3
باقیمانده: 5000 تومان`,
    hint: 'ابتدا n50, rem = divmod(amount, 50000) و سپس n10, rem = divmod(rem, 10000).',
    solutionCode: `amount = int(input("مبلغ به تومان: "))
n50, rem = divmod(amount, 50000)
n10, rem = divmod(rem, 10000)
print("اسکناس ۵۰ هزار تومانی:", n50)
print("اسکناس ۱۰ هزار تومانی:", n10)
print("باقیمانده:", rem, "تومان")`,
    solutionExplanation: 'کاربرد ملموس و واقعی تابع داخلی divmod در الگوریتم خودپرداز (ATM).',
    language: 'python',
    engine: 'python',
  },
  {
    id: 'hw-1-2-06',
    number: 6,
    title: 'شمارش تعداد تکرار هر کلمه در جمله با دیکشنری و split()',
    difficulty: 'medium',
    bookPage: '۵۶ و ۷۸',
    estimatedMinutes: 15,
    prompt:
      'تابعی به نام word_frequency(sentence) بنویسید که جمله‌ای را با .lower().split(" ") به کلمات بشکند و دیکشنری تعداد تکرار هر کلمه را برگرداند.',
    sampleOutput: `{'python': 2, 'is': 2, 'fun': 1, 'and': 1, 'easy': 1}`,
    hint: 'در حلقه روی لیست کلمات، از الگوی counts[w] = counts.get(w, 0) + 1 استفاده کنید.',
    solutionCode: `def word_frequency(sentence):
    words = sentence.lower().split(" ")
    counts = {}
    for w in words:
        if w != "":
            counts[w] = counts.get(w, 0) + 1
    return counts

text = "Python is fun and python is easy"
print(word_frequency(text))`,
    solutionExplanation: 'ترکیب متدهای رشته (lower/split) با الگوی شمارنده دیکشنری.',
    language: 'python',
    engine: 'python',
  },
  {
    id: 'hw-1-2-07',
    number: 7,
    title: 'تولید رمز عبور تصادفی با ماژول random',
    difficulty: 'medium',
    bookPage: '۷۳ تا ۷۵',
    estimatedMinutes: 15,
    prompt:
      'تابعی به نام generate_pin(length=6) بنویسید که با استفاده از random.choice یک کد امنیتی تصادفی به طول دلخواه از حروف و ارقام بسازد و return کند.',
    sampleOutput: `کد ۶ رقمی پیش‌فرض: A7K2M9
کد ۸ رقمی سفارشی: P4X9B1Q2`,
    hint: 'رشته chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789" بسازید و در حلقه for _ in range(length) هر بار یک کاراکتر با random.choice(chars) اضافه کنید.',
    solutionCode: `import random

def generate_pin(length=6):
    chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"
    pin = ""
    for _ in range(length):
        pin += random.choice(chars)
    return pin

print("کد ۶ رقمی پیش‌فرض:", generate_pin())
print("کد ۸ رقمی سفارشی:", generate_pin(8))`,
    solutionExplanation: 'استفاده از ماژول random، پارامتر پیش‌فرض و متغیر انباشتگر رشته‌ای.',
    language: 'python',
    engine: 'python',
  },

  // -------------------- CHALLENGING (8 - 10) --------------------
  {
    id: 'hw-1-2-08',
    number: 8,
    title: 'سیستم سبد خرید با دیکشنری قیمت‌ها و محاسبه تخفیف پلکانی',
    difficulty: 'challenging',
    bookPage: '۵۵ تا ۶۸',
    estimatedMinutes: 20,
    prompt:
      'دیکشنری prices قیمت کالاها و دیکشنری cart تعداد خرید کاربر را نگه می‌دارد. تابعی بنویسید که جمع کل سبد را حساب کند؛ اگر جمع بالای ۵۰۰٬۰۰۰ تومان بود ۱۰٪ تخفیف اعمال کند و مبلغ نهایی را برگرداند.',
    sampleOutput: `جمع پایه: 630000 تومان
تخفیف: 63000 تومان
قابل پرداخت: 567000 تومان`,
    hint: 'روی cart.items() حلقه بزنید و از prices.get(item, 0) * qty استفاده کنید.',
    solutionCode: `prices = {"کتاب": 45000, "فلش": 240000, "ماوس": 300000}
cart = {"کتاب": 2, "فلش": 1, "ماوس": 1}

def checkout(price_map, basket):
    subtotal = 0
    for item, qty in basket.items():
        subtotal += price_map.get(item, 0) * qty
    discount = int(subtotal * 0.1) if subtotal > 500000 else 0
    return subtotal, discount, subtotal - discount

sub, disc, final = checkout(prices, cart)
print(f"جمع پایه: {sub} تومان")
print(f"تخفیف: {disc} تومان")
print(f"قابل پرداخت: {final} تومان")`,
    solutionExplanation: 'پیوند دو دیکشنری در یک تابع تجاری با بازگشت سه‌گانه.',
    language: 'python',
    engine: 'python',
  },
  {
    id: 'hw-1-2-09',
    number: 9,
    title: 'بازی حدس عدد هوشمند با تابع و random.randint',
    difficulty: 'challenging',
    bookPage: '۷۳ تا ۷۵',
    estimatedMinutes: 20,
    prompt:
      'تابعی به نام evaluate_guess(secret, guess) بنویسید که بر اساس مقایسه حدس کاربر با عدد مخفی، یکی از پیام‌های "بزرگ‌تر بگو"، "کوچک‌تر بگو" یا "آفرین" را برگرداند؛ سپس در یک حلقه حداکثر ۵ تلاش آن را اجرا کنید.',
    sampleInput: `50
75`,
    sampleOutput: `راهنما: بزرگ‌تر بگو
🎉 آفرین! در تلاش 2 برنده شدی.`,
    hint: 'منطق مقایسه را کاملاً داخل تابع قرار دهید تا کد حلقه اصلی تمیز بماند.',
    solutionCode: `import random

def evaluate_guess(secret, guess):
    if guess < secret:
        return "بزرگ‌تر بگو"
    elif guess > secret:
        return "کوچک‌تر بگو"
    return "آفرین"

target = random.randint(1, 20)
for step in range(1, 6):
    g = int(input(f"حدس {step} (بین 1 تا 20): "))
    res = evaluate_guess(target, g)
    if res == "آفرین":
        print(f"🎉 آفرین! در تلاش {step} عدد {target} را پیدا کردی.")
        break
    print("راهنما:", res)
else:
    print("فرصت‌ها تمام شد! عدد مخفی:", target)`,
    solutionExplanation: 'جداسازی منطق بازی (evaluate_guess) از رابط کاربری حلقه.',
    language: 'python',
    engine: 'python',
  },
  {
    id: 'hw-1-2-10',
    number: 10,
    title: 'دفتر نمره هوشمند با دیکشنری تو در تو و آمار کلاس',
    difficulty: 'challenging',
    bookPage: '۵۷ و ۷۲',
    estimatedMinutes: 20,
    prompt:
      'دیکشنری دارید که کلیدش نام هنرجو و مقدارش لیست نمرات اوست. تابعی بنویسید که معدل هر هنرجو را حساب کرده و در نهایت نام و معدل نفر اول کلاس را اعلام کند.',
    sampleOutput: `علی: 18.0
سارا: 19.33
رضا: 16.5
🏆 نفر اول کلاس: سارا با معدل 19.33`,
    hint: 'در حلقه روی gradebook.items() میانگین هر نفر را با sum(marks)/len(marks) حساب کرده و بیشترین را نگه دارید.',
    solutionCode: `gradebook = {
    "علی": [18, 17, 19],
    "سارا": [19, 20, 19],
    "رضا": [16, 17, 16.5],
}

def find_top_student(book):
    best_name = ""
    best_avg = -1
    for name, marks in book.items():
        avg = round(sum(marks) / len(marks), 2)
        print(f"{name}: {avg}")
        if avg > best_avg:
            best_avg = avg
            best_name = name
    return best_name, best_avg

top_name, top_avg = find_top_student(gradebook)
print(f"🏆 نفر اول کلاس: {top_name} با معدل {top_avg}")`,
    solutionExplanation: 'ترکیب دیکشنری دارای لیست، توابع داخلی sum/len/round و الگوریتم یافتن بیشینه.',
    language: 'python',
    engine: 'python',
  },
];

export const UNIT_1_2_QUICK_QUIZ: QuickQuizQuestion[] = [
  {
    id: 'qq-1-2-01',
    kind: 'output',
    bookPage: '۵۱',
    question: 'خروجی قطعه کد زیر چیست؟',
    codeSnippet: `x = {}
print(type(x))`,
    options: ["<class 'set'>", "<class 'dict'>", "<class 'list'>", 'خطای SyntaxError'],
    correctIndex: 1,
    explanation: 'در پایتون آکولاد خالی {} همیشه دیکشنری خالی می‌سازد؛ برای مجموعه خالی باید set() بنویسیم.',
  },
  {
    id: 'qq-1-2-02',
    kind: 'output',
    bookPage: '۴۹',
    question: 'طول مجموعه زیر (len) چه عددی چاپ می‌شود؟',
    codeSnippet: `s = {1, 2, 2, 3, 1, 3}
print(len(s))`,
    options: ['6', '3', '4', 'خطای TypeError'],
    correctIndex: 1,
    explanation: 'مجموعه‌ها (set) اعضای تکراری را خودکار حذف می‌کنند؛ پس فقط {1, 2, 3} باقی می‌ماند و طول ۳ است.',
  },
  {
    id: 'qq-1-2-03',
    kind: 'concept',
    bookPage: '۵۱',
    question: 'تفاوت متد discard(x) با remove(x) در مجموعه (set) چیست؟',
    options: [
      'discard همه اعضا را پاک می‌کند',
      'discard اگر عضو x نباشد خطای KeyError نمی‌دهد',
      'remove فقط روی لیست کار می‌کند',
      'هیچ تفاوتی ندارند',
    ],
    correctIndex: 1,
    explanation: 'هر دو یک عضو را حذف می‌کنند، اما discard در نبود عضو کاملاً ایمن است و برنامه را متوقف نمی‌کند.',
  },
  {
    id: 'qq-1-2-04',
    kind: 'output',
    bookPage: '۶۰',
    question: 'نوع دو متغیر a و b به ترتیب کدام است؟',
    codeSnippet: `a = (5)
b = (5,)
print(type(a), type(b))`,
    options: ['هر دو tuple', 'اول int و دوم tuple', 'اول tuple و دوم int', 'خطای SyntaxError'],
    correctIndex: 1,
    explanation: 'در تاپل تک‌عضوی وجود کامای پایانی الزامی است؛ بدون کاما (5) فقط یک عدد int داخل پرانتز است.',
  },
  {
    id: 'qq-1-2-05',
    kind: 'output',
    bookPage: '۵۴',
    question: 'خروجی قطعه کد دیکشنری زیر چیست؟',
    codeSnippet: `d = {"a": 10, "b": 20}
print(d.get("c", 99))`,
    options: ['None', 'خطای KeyError', '99', '0'],
    correctIndex: 2,
    explanation: 'چون کلید "c" در دیکشنری نیست، متد get() بدون خطا مقدار پیش‌فرض دوم (99) را برمی‌گرداند.',
  },
  {
    id: 'qq-1-2-06',
    kind: 'output',
    bookPage: '۶۶',
    question: 'مقدار چاپ‌شده برای متغیر res در کد زیر چیست؟',
    codeSnippet: `def show(n):
    print(n * 2)

res = show(5)
print(res)`,
    options: ['10 و سپس 10', '10 و سپس None', 'فقط 10', 'خطای NameError'],
    correctIndex: 1,
    explanation: 'تابع show دستور return ندارد؛ بنابراین ابتدا 10 را چاپ می‌کند و سپس مقدار None را به res برمی‌گرداند.',
  },
  {
    id: 'qq-1-2-07',
    kind: 'bug-spot',
    bookPage: '۵۳',
    question: 'اشکال اصلی کد دیکشنری زیر (برگرفته از فعالیت ص ۵۳ کتاب) چیست؟',
    codeSnippet: `book = {
    "title": "طراح سایت",
    pages: 330
}`,
    options: [
      'عدد 330 باید داخل کوتیشن باشد',
      'کلید pages باید داخل کوتیشن باشد',
      'به‌جای {} باید [] گذاشت',
      'هیچ خطایی ندارد',
    ],
    correctIndex: 1,
    explanation: 'کلید متنی pages بدون کوتیشن باعث می‌شود پایتون به دنبال متغیری به نام pages بگردد و NameError بدهد.',
  },
  {
    id: 'qq-1-2-08',
    kind: 'output',
    bookPage: '۷۱',
    question: 'خروجی divmod(17, 5) کدام گزینه است؟',
    codeSnippet: `print(divmod(17, 5))`,
    options: ['3.4', '(3, 2)', '(2, 3)', '[3, 2]'],
    correctIndex: 1,
    explanation: 'تابع divmod(a, b) یک تاپل شامل (خارج‌قسمت صحیح، باقیمانده) برمی‌گرداند: 17 // 5 = 3 و 17 % 5 = 2.',
  },
  {
    id: 'qq-1-2-09',
    kind: 'bug-spot',
    bookPage: '۷۲',
    question: 'چرا خط زیر (برگرفته از ص ۷۲ کتاب) خطای NameError می‌دهد؟',
    codeSnippet: `nums = [8, 3, 9]
print(sorted(nums, reverse=false))`,
    options: [
      'نام تابع باید sort باشد',
      'false باید با F بزرگ (False) نوشته شود',
      'لیست nums باید رشته باشد',
      'reverse در sorted وجود ندارد',
    ],
    correctIndex: 1,
    explanation: 'مقادیر بولی در پایتون حتماً باید با حرف اول بزرگ (True و False) نوشته شوند.',
  },
  {
    id: 'qq-1-2-10',
    kind: 'concept',
    bookPage: '۷۷',
    question: 'کدام جمله درباره تفاوت «تابع (Function)» و «متد (Method)» درست است؟',
    options: [
      'متدها با نقطه (.) روی یک شیء صدا زده می‌شوند (مثل text.upper())',
      'توابع هرگز ورودی نمی‌گیرند',
      'متدها فقط در ماژول math وجود دارند',
      'تفاوتی بین len(x) و x.append() نیست',
    ],
    correctIndex: 0,
    explanation: 'متد تابعی است که به یک نوع داده خاص تعلق دارد و با نقطه صدا زده می‌شود، اما تابع مثل len() مستقل است.',
  },
];
