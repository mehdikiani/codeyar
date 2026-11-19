import type {
  ClassroomActivity,
  HomeworkAssignment,
  QuickQuizQuestion,
} from '../../../types/curriculum.ts';

export const UNIT_4_2_ACTIVITIES: ClassroomActivity[] = [
  {
    id: 'act-4-2-safe-div',
    kind: 'activity',
    title: 'ماشین‌حساب ایمن در برابر ValueError و ZeroDivisionError',
    bookPage: '۲۶۴',
    estimatedMinutes: 12,
    prompt:
      'تابعی به نام calc_div(x, y) بنویسید که دو رشته ورودی را به float تبدیل کرده، اولی را بر دومی تقسیم کند و هر دو خطای ValueError و ZeroDivisionError را با try/except/else مدیریت کند.',
    steps: [
      'درون try تبدیل float و تقسیم را انجام دهید.',
      'دو بلوک except جداگانه برای ValueError و ZeroDivisionError بنویسید.',
      'در بلوک else نتیجه تقسیم را چاپ کنید.',
    ],
    hints: ['تابع را با سه حالت مختلف (سالم، مخرج صفر و متن غیرعددی) صدا بزنید.'],
    language: 'python',
    engine: 'python-fs',
    starterCode: `def calc_div(x, y):
    try:
        a = float(x)
        b = float(y)
        res = a / b
    # بلوک‌های except و else را تکمیل کنید:

calc_div("20", "4")
calc_div("10", "0")
calc_div("سلام", "2")`,
    solutionCode: `def calc_div(x, y):
    try:
        a = float(x)
        b = float(y)
        res = a / b
    except ValueError:
        print("خطا: لطفاً فقط عدد وارد کنید!")
    except ZeroDivisionError:
        print("خطا: تقسیم بر صفر امکان‌پذیر نیست!")
    else:
        print(f"نتیجه تقسیم: {res}")

calc_div("20", "4")
calc_div("10", "0")
calc_div("سلام", "2")`,
    solutionExplanation: 'بلوک else فقط زمانی اجرا می‌شود که هیچ استثنایی در try رخ نداده باشد.',
    alternativeSolutionCode: `def calc_div(x, y):
    try:
        return round(float(x) / float(y), 2)
    except (ValueError, ZeroDivisionError):
        return None

for pair in [("20", "4"), ("10", "0"), ("abc", "2")]:
    ans = calc_div(pair[0], pair[1])
    print(pair, "=>", ans if ans is not None else "نامعتبر")`,
    alternativeSolutionExplanation: 'در پایتون می‌توان چند نوع استثنا را به‌صورت یک تاپل درون یک except گرفت و مقدار None برگرداند.',
  },
  {
    id: 'act-4-2-guestbook',
    kind: 'workshop',
    title: 'کارگاه دفترچه مهمان چندخطی با pathlib (اصلاح باگ +=)',
    bookPage: '۲۶۱',
    estimatedMinutes: 15,
    prompt:
      'اسامی ۴ هنرجو را در فایلی به نام guests.txt ذخیره کنید طوری که هر نام در یک سطر باشد؛ سپس فایل را بخوانید و تعداد مهمان‌ها را چاپ کنید.',
    steps: [
      'لیستی از ۴ نام بسازید یا با += و \\n رشته بسازید.',
      'با Path("guests.txt").write_text(...) ذخیره کنید.',
      'فایل را بخوانید و با splitlines() تعداد و فهرست را چاپ کنید.',
    ],
    hints: ['مراقب باشید مثل ص ۲۶۱ کتاب علامت + را در سطر آخر جا نیندازید!'],
    language: 'python',
    engine: 'python-fs',
    starterCode: `from pathlib import Path

# ۴ نام را در guests.txt ذخیره کرده و دوباره بخوانید:
`,
    solutionCode: `from pathlib import Path

names = "علی رضایی\\n"
names += "زهرا محمدی\\n"
names += "مهدی کریمی\\n"
names += "سارا حسینی\\n"

path = Path("guests.txt")
path.write_text(names)

lines = path.read_text().strip().splitlines()
print(f"تعداد کل مهمانان ثبت‌شده: {len(lines)}")
for n in lines:
    print("-", n)`,
    solutionExplanation: 'استفاده صحیح از += تمام نام‌ها را حفظ کرده و در فایل مجازی ذخیره می‌کند.',
    alternativeSolutionCode: `from pathlib import Path

guests = ["علی رضایی", "زهرا محمدی", "مهدی کریمی", "سارا حسینی"]
path = Path("guests.txt")
path.write_text("\\n".join(guests) + "\\n")
print("خوانده‌شده:", path.read_text().strip().splitlines())`,
    alternativeSolutionExplanation: 'استفاده از "\\n".join(guests) کوتاه‌تر است و احتمال خطای جا انداختن + را به صفر می‌رساند.',
  },
  {
    id: 'act-4-2-word-counter',
    kind: 'workshop',
    title: 'شمارشگر چندفایلی با عبور بی‌صدا (pass)',
    bookPage: '۲۶۸',
    estimatedMinutes: 15,
    prompt:
      'لیستی از ۳ نام فایل شامل یک فایل ناموجود دارید؛ تابعی بنویسید که با try/except FileNotFoundError و pass از فایل ناموجود بی‌صدا عبور کرده و تعداد کلمات فایل‌های موجود را گزارش دهد.',
    steps: [
      'تابع report_words(fname) را تعریف کنید.',
      'در except FileNotFoundError دستور pass بگذارید.',
      'در حلقه روی تمام فایل‌ها اجرا کنید.',
    ],
    hints: ['از text.split() برای جدا کردن کلمات استفاده کنید.'],
    language: 'python',
    engine: 'python-fs',
    extraFiles: {
      'note1.txt': 'پایتون و طراحی وب در هنرستان\n',
      'note2.txt': 'کار با فایل و مدیریت خطاها بسیار مهم است\n',
    },
    starterCode: `from pathlib import Path

files = ["note1.txt", "deleted.txt", "note2.txt"]
# تابع و حلقه پردازش چندفایلی را بنویسید:
`,
    solutionCode: `from pathlib import Path

def report_words(fname):
    try:
        text = Path(fname).read_text()
    except FileNotFoundError:
        pass
    else:
        print(f"{fname}: {len(text.split())} کلمه")

files = ["note1.txt", "deleted.txt", "note2.txt"]
for f in files:
    report_words(f)`,
    solutionExplanation: 'دستور pass اجازه می‌دهد برنامه بدون توقف و بدون چاپ خطای ناخواسته به فایل بعدی برود.',
    alternativeSolutionCode: `from pathlib import Path

files = ["note1.txt", "deleted.txt", "note2.txt"]
for f in files:
    p = Path(f)
    if p.exists():
        print(f"{f}: {len(p.read_text().split())} کلمه")`,
    alternativeSolutionExplanation: 'روش جایگزین LBYL (اول نگاه کن بعد بپر) با استفاده از p.exists() پیش از خواندن.',
  },
  {
    id: 'act-4-2-search-file',
    kind: 'activity',
    title: 'جستجوی خط‌های شامل کلمه خاص در فایل متنی',
    bookPage: '۲۵۹',
    estimatedMinutes: 12,
    prompt:
      'فایل books.txt را خط‌به‌خط بخوانید و فقط سطرهایی که شامل کلمه «وب» هستند را همراه با شماره سطر چاپ کنید.',
    steps: [
      'فایل را با splitlines() بخوانید.',
      'روی خطوط حلقه بزنید و شرط "وب" in line را بررسی کنید.',
    ],
    hints: ['از یک شمارنده line_no = 1 برای چاپ شماره سطر استفاده کنید.'],
    language: 'python',
    engine: 'python-fs',
    extraFiles: {
      'books.txt': 'برنامه‌نویسی پایتون\nطراحی صفحات وب ایستا\nپایگاه داده رابطه‌ای\nتوسعه وب با جنگو\n',
    },
    starterCode: `from pathlib import Path

lines = Path("books.txt").read_text().strip().splitlines()
# خطوط شامل «وب» را چاپ کنید:
`,
    solutionCode: `from pathlib import Path

lines = Path("books.txt").read_text().strip().splitlines()
line_no = 1
for line in lines:
    if "وب" in line:
        print(f"سطر {line_no}: {line}")
    line_no += 1`,
    solutionExplanation: 'بررسی عضویت زیررشته با in روی هر سطر فایل.',
    alternativeSolutionCode: `from pathlib import Path

lines = Path("books.txt").read_text().strip().splitlines()
matches = [line for line in lines if "وب" in line]
print("تعداد نتایج:", len(matches))
for m in matches:
    print("*", m)`,
    alternativeSolutionExplanation: 'استفاده از List Comprehension برای استخراج سریع سطرهای منطبق.',
  },
  {
    id: 'act-4-2-json-profile',
    kind: 'workshop',
    title: 'ذخیره و بازیابی پروفایل هنرجو در قالب JSON',
    bookPage: '۲۷۰–۲۷۲',
    estimatedMinutes: 15,
    prompt:
      'دیکشنری مشخصات یک هنرجو (نام، پایه، لیست دروس) را با json.dumps(..., indent=4) در فایل profile.json ذخیره کنید و سپس با json.loads() خوانده و تعداد دروسش را چاپ کنید.',
    steps: [
      'دیکشنری student را بسازید.',
      'با json.dumps و Path("profile.json").write_text ذخیره کنید.',
      'با read_text و json.loads بازیابی و چاپ کنید.',
    ],
    hints: ['یادتان باشد هر دو تابع dumps و loads حرف s در انتها دارند!'],
    language: 'python',
    engine: 'python-fs',
    starterCode: `import json
from pathlib import Path

student = {
    "name": "مریم رضایی",
    "grade": 11,
    "skills": ["Python", "HTML5", "CSS3", "Bootstrap"]
}
# ذخیره در profile.json و بازیابی دوباره:
`,
    solutionCode: `import json
from pathlib import Path

student = {
    "name": "مریم رضایی",
    "grade": 11,
    "skills": ["Python", "HTML5", "CSS3", "Bootstrap"]
}

path = Path("profile.json")
path.write_text(json.dumps(student, indent=4))

loaded = json.loads(path.read_text())
print("نام هنرجو:", loaded["name"])
print("تعداد مهارت‌ها:", len(loaded["skills"]))
print("اولین مهارت:", loaded["skills"][0])`,
    solutionExplanation: 'ساختار لیست skills درون دیکشنری بدون هیچ افت داده‌ای ذخیره و بازیابی می‌شود.',
    alternativeSolutionCode: `import json
from pathlib import Path

path = Path("profile.json")
path.write_text(json.dumps({"name": "مریم", "skills": ["Python", "Django"]}, indent=2))
loaded = json.loads(path.read_text())
loaded["skills"].append("SQLite")
path.write_text(json.dumps(loaded, indent=2))
print("مهارت‌های به‌روز:", json.loads(path.read_text())["skills"])`,
    alternativeSolutionExplanation: 'نمایش چرخه کامل خواندن، ویرایش (افزودن SQLite) و بازذخیره‌سازی فایل JSON.',
  },
  {
    id: 'act-4-2-curiosity-str-vs-json',
    kind: 'curiosity',
    title: 'کنجکاوی: تفاوت str(dict) با json.dumps(dict) چیست؟',
    bookPage: '۲۷۰',
    estimatedMinutes: 10,
    prompt:
      'دیکشنری {"active": True, "note": None} را یک بار با str() و یک بار با json.dumps() چاپ کنید و سه تفاوت دقیق آن‌ها را مشاهده کنید.',
    steps: [
      'دیکشنری را تعریف کنید.',
      'هر دو خروجی را زیر هم چاپ کنید و به کوتیشن‌ها و True/None دقت کنید.',
    ],
    hints: ['در JSON فقط دابل‌کوتیشن (")، true/false کوچک و null مجاز هستند.'],
    language: 'python',
    engine: 'python-fs',
    starterCode: `import json
data = {"active": True, "note": None}
# هر دو خروجی را مقایسه کنید:
`,
    solutionCode: `import json
data = {"active": True, "note": None}
print("خروجی str():       ", str(data))
print("خروجی json.dumps():", json.dumps(data))`,
    solutionExplanation: 'str() از تک‌کوتیشن، True و None استفاده می‌کند، اما JSON استاندارد دابل‌کوتیشن، true و null تولید می‌کند.',
    alternativeSolutionCode: `import json
text = json.dumps({"ok": False, "empty": None})
restored = json.loads(text)
print("JSON:", text, "=> Python:", restored)`,
    alternativeSolutionExplanation: 'نشان دادن تبدیل دوطرفه (پایتون ⟶ JSON ⟶ پایتون) بدون تغییر نوع داده‌ها.',
  },
  {
    id: 'act-4-2-mini-contacts',
    kind: 'project',
    title: 'پروژه دفترچه تلفن ماندگار با فایل JSON',
    bookPage: '۲۷۰–۲۷۴',
    estimatedMinutes: 20,
    prompt:
      'برنامه‌ای بنویسید که فایل contacts.json را بخواند (اگر نبود دیکشنری خالی بسازد)، یک مخاطب جدید به آن اضافه کند، دوباره ذخیره کند و شماره یک مخاطب را جستجو کند.',
    steps: [
      'با try/except FileNotFoundError فایل contacts.json را بارگذاری کنید.',
      'مخاطب جدید "هنرستان": "02188001122" را اضافه و با json.dumps ذخیره کنید.',
      'فهرست کامل مخاطبین را چاپ کنید.',
    ],
    hints: ['استفاده از dict.get(name, "یافت نشد") جستجو را کاملاً ایمن می‌کند.'],
    language: 'python',
    engine: 'python-fs',
    extraFiles: {
      'contacts.json': '{"علی": "09121112233", "مریم": "09124445566"}\n',
    },
    starterCode: `import json
from pathlib import Path

db = Path("contacts.json")
# بارگذاری ایمن، افزودن مخاطب جدید و ذخیره دوباره:
`,
    solutionCode: `import json
from pathlib import Path

db = Path("contacts.json")
try:
    contacts = json.loads(db.read_text())
except FileNotFoundError:
    contacts = {}

contacts["هنرستان"] = "02188001122"
db.write_text(json.dumps(contacts, indent=4))

print("شماره علی:", contacts.get("علی", "یافت نشد"))
print("تعداد کل مخاطبین:", len(contacts))
for name, phone in contacts.items():
    print(f"- {name}: {phone}")`,
    solutionExplanation: 'این پروژه یک پایگاه‌داده کوچک واقعی مبتنی بر فایل JSON می‌سازد.',
    alternativeSolutionCode: `import json
from pathlib import Path

def save_contact(name, phone):
    p = Path("contacts.json")
    data = json.loads(p.read_text()) if p.exists() else {}
    data[name] = phone
    p.write_text(json.dumps(data, indent=2))
    return data

print(save_contact("پشتیبانی", "02199887766"))`,
    alternativeSolutionExplanation: 'تبدیل منطق ذخیره مخاطب به یک تابع مستقل و تمیز.',
  },
  {
    id: 'act-4-2-clean-lines',
    kind: 'workshop',
    title: 'پاک‌سازی فایل متنی (حذف خطوط خالی و ذخیره نسخه تمیز)',
    bookPage: '۲۶۰–۲۶۲',
    estimatedMinutes: 15,
    prompt:
      'فایل messy.txt دارای چند خط خالی و فاصله‌های اضافی است؛ آن را بخوانید، خطوط خالی را حذف کرده و متن مرتب را در clean.txt ذخیره کنید.',
    steps: [
      'خطوط messy.txt را با splitlines() بگیرید.',
      'با strip() هر خط را تمیز کرده و اگر خالی نبود به لیست clean اضافه کنید.',
      'لیست تمیز را در clean.txt بنویسید.',
    ],
    hints: ['شرط if stripped: تمام سطرهای خالی را کنار می‌گذارد.'],
    language: 'python',
    engine: 'python-fs',
    extraFiles: {
      'messy.txt': '  Samsung  \n\n   \nApple\n\n  Xiaomi \n',
    },
    starterCode: `from pathlib import Path

raw_lines = Path("messy.txt").read_text().splitlines()
# پاک‌سازی و ذخیره در clean.txt:
`,
    solutionCode: `from pathlib import Path

raw_lines = Path("messy.txt").read_text().splitlines()
clean = []
for line in raw_lines:
    item = line.strip()
    if item:
        clean.append(item)

Path("clean.txt").write_text("\\n".join(clean) + "\\n")
print("تعداد خطوط سالم:", len(clean))
print(Path("clean.txt").read_text())`,
    solutionExplanation: 'استفاده از strip() برای حذف فاصله‌های اضافه و if item برای حذف سطرهای خالی.',
    alternativeSolutionCode: `from pathlib import Path

clean = [l.strip() for l in Path("messy.txt").read_text().splitlines() if l.strip()]
Path("clean.txt").write_text("\\n".join(clean))
print(clean)`,
    alternativeSolutionExplanation: 'نسخه فشرده و پایتونیک با List Comprehension.',
  },
];

export const UNIT_4_2_HOMEWORKS: HomeworkAssignment[] = [
  {
    id: 'hw-4-2-01',
    number: 1,
    title: 'نوشتن و خواندن یادداشت روزانه با pathlib',
    difficulty: 'easy',
    bookPage: '۲۶۰',
    estimatedMinutes: 10,
    prompt: 'فایلی به نام diary.txt بسازید، ۳ خط متن در آن بنویسید و سپس آن را خوانده و تعداد خطوطش را چاپ کنید.',
    sampleOutput: 'تعداد خطوط فایل: 3',
    hint: 'از write_text و سپس read_text().strip().splitlines() استفاده کنید.',
    solutionCode: `from pathlib import Path

p = Path("diary.txt")
p.write_text("روز اول: یادگیری pathlib\\nروز دوم: مدیریت خطا\\nروز سوم: JSON\\n")
lines = p.read_text().strip().splitlines()
print("تعداد خطوط فایل:", len(lines))`,
    solutionExplanation: 'چرخه‌ی پایه نوشتن و خواندن فایل متنی با pathlib.',
    language: 'python',
    engine: 'python-fs',
  },
  {
    id: 'hw-4-2-02',
    number: 2,
    title: 'شمارش تعداد خطوط و کلمات یک فایل',
    difficulty: 'easy',
    bookPage: '۲۶۷',
    estimatedMinutes: 10,
    prompt: 'متنی ۲ خطی در فایل poem.txt بنویسید و تعداد سطرها و تعداد کل کلمات آن را چاپ کنید.',
    sampleOutput: 'سطرها: 2 | کلمات: 8',
    hint: 'سطرها با splitlines() و کلمات با split() شمرده می‌شوند.',
    solutionCode: `from pathlib import Path

p = Path("poem.txt")
p.write_text("توانا بود هر که دانا بود\\nز دانش دل پیر برنا بود\\n")
txt = p.read_text().strip()
print(f"سطرها: {len(txt.splitlines())} | کلمات: {len(txt.split())}")`,
    solutionExplanation: 'تفاوت splitlines() برای سطرها و split() برای کلمات.',
    language: 'python',
    engine: 'python-fs',
  },
  {
    id: 'hw-4-2-03',
    number: 3,
    title: 'تبدیل ایمن رشته به عدد صحیح با try/except',
    difficulty: 'easy',
    bookPage: '۲۶۵',
    estimatedMinutes: 10,
    prompt: 'تابعی به نام to_int(text) بنویسید که رشته را به int تبدیل کند و اگر ValueError رخ داد مقدار 0 برگرداند.',
    sampleInput: '"42" و "سلام"',
    sampleOutput: '42 و 0',
    hint: 'در بلوک except ValueError دستور return 0 بنویسید.',
    solutionCode: `def to_int(text):
    try:
        return int(text)
    except ValueError:
        return 0

print(to_int("42"))
print(to_int("سلام"))`,
    solutionExplanation: 'الگوی استاندارد تبدیل ایمن بدون کرش برنامه.',
    language: 'python',
    engine: 'python-fs',
  },
  {
    id: 'hw-4-2-04',
    number: 4,
    title: 'ذخیره لیست ۵ شهر ایران در فایل JSON',
    difficulty: 'easy',
    bookPage: '۲۷۰',
    estimatedMinutes: 12,
    prompt: 'لیست ["تهران", "همدان", "شیراز", "اصفهان", "تبریز"] را با json.dumps در فایل iran.json ذخیره کرده و دوباره بخوانید.',
    sampleOutput: 'تعداد شهرها: 5 | شهر دوم: همدان',
    hint: 'برای ذخیره از json.dumps و برای خواندن از json.loads استفاده کنید.',
    solutionCode: `import json
from pathlib import Path

cities = ["تهران", "همدان", "شیراز", "اصفهان", "تبریز"]
p = Path("iran.json")
p.write_text(json.dumps(cities, indent=2))

loaded = json.loads(p.read_text())
print(f"تعداد شهرها: {len(loaded)} | شهر دوم: {loaded[1]}")`,
    solutionExplanation: 'ذخیره و بازخوانی کامل لیست در قالب JSON.',
    language: 'python',
    engine: 'python-fs',
  },
  {
    id: 'hw-4-2-05',
    number: 5,
    title: 'خواندن ایمن فایل با مقدار جایگزین پیش‌فرض',
    difficulty: 'medium',
    bookPage: '۲۶۶',
    estimatedMinutes: 12,
    prompt: 'تابع read_or_default(filename, default) را بنویسید که اگر فایل وجود داشت متنش را برگرداند و در صورت FileNotFoundError مقدار default را برگرداند.',
    sampleOutput: 'تنظیمات پیش‌فرض',
    hint: 'از try/except FileNotFoundError استفاده کنید.',
    solutionCode: `from pathlib import Path

def read_or_default(filename, default):
    try:
        return Path(filename).read_text().strip()
    except FileNotFoundError:
        return default

print(read_or_default("not_found.txt", "تنظیمات پیش‌فرض"))`,
    solutionExplanation: 'الگوی کاربردی برای خواندن فایل‌های تنظیمات (Config).',
    language: 'python',
    engine: 'python-fs',
  },
  {
    id: 'hw-4-2-06',
    number: 6,
    title: 'محاسبه جمع اعداد داخل فایل متنی همراه با نادیده گرفتن خطاها',
    difficulty: 'medium',
    bookPage: '۲۶۵',
    estimatedMinutes: 15,
    prompt: 'فایلی شامل خطوط "100"، "خطا"، "250"، "abc" و "50" بسازید؛ سپس آن را بخوانید و جمع اعداد سالم را با مدیریت ValueError چاپ کنید.',
    sampleOutput: 'جمع اعداد سالم: 400',
    hint: 'try/except ValueError را درون حلقه for قرار دهید.',
    solutionCode: `from pathlib import Path

p = Path("nums.txt")
p.write_text("100\\nخطا\\n250\\nabc\\n50\\n")

total = 0
for line in p.read_text().splitlines():
    try:
        total += int(line)
    except ValueError:
        pass

print("جمع اعداد سالم:", total)`,
    solutionExplanation: 'عبور بی‌صدا از سطرهای خراب با pass و جمع زدن مقادیر سالم.',
    language: 'python',
    engine: 'python-fs',
  },
  {
    id: 'hw-4-2-07',
    number: 7,
    title: 'ذخیره تنظیمات کاربری (تم و اندازه فونت) در settings.json',
    difficulty: 'medium',
    bookPage: '۲۷۱',
    estimatedMinutes: 15,
    prompt: 'دیکشنری {"theme": "dark", "font_size": 16, "rtl": True} را در settings.json ذخیره کنید؛ سپس آن را بخوانید، theme را به "light" تغییر دهید و دوباره ذخیره کنید.',
    sampleOutput: 'تم جدید: light',
    hint: 'پس از ویرایش دیکشنری loaded، دوباره write_text(json.dumps(...)) را صدا بزنید.',
    solutionCode: `import json
from pathlib import Path

p = Path("settings.json")
p.write_text(json.dumps({"theme": "dark", "font_size": 16, "rtl": True}, indent=2))

cfg = json.loads(p.read_text())
cfg["theme"] = "light"
p.write_text(json.dumps(cfg, indent=2))

print("تم جدید:", json.loads(p.read_text())["theme"])`,
    solutionExplanation: 'چرخه کامل به‌روزرسانی یک کلید درون فایل JSON.',
    language: 'python',
    engine: 'python-fs',
  },
  {
    id: 'hw-4-2-08',
    number: 8,
    title: 'ادغام دو فایل متنی در فایل سوم (merged.txt)',
    difficulty: 'medium',
    bookPage: '۲۶۲',
    estimatedMinutes: 15,
    prompt: 'دو فایل part1.txt و part2.txt بسازید و محتوای هر دو را با ترتیب در فایل سوم merged.txt ترکیب و چاپ کنید.',
    sampleOutput: 'محتوای کامل هر دو فایل در merged.txt',
    hint: 'محتوای دو فایل را خوانده و با "\\n" به هم بچسبانید.',
    solutionCode: `from pathlib import Path

Path("part1.txt").write_text("بخش اول: HTML و CSS")
Path("part2.txt").write_text("بخش دوم: پایتون و جنگو")

merged = Path("part1.txt").read_text() + "\\n" + Path("part2.txt").read_text()
Path("merged.txt").write_text(merged)
print(Path("merged.txt").read_text())`,
    solutionExplanation: 'خواندن چند منبع متنی و ترکیب آن‌ها در یک فایل خروجی.',
    language: 'python',
    engine: 'python-fs',
  },
  {
    id: 'hw-4-2-09',
    number: 9,
    title: 'شمارشگر آمار کلمات و حروف چند فایل در خروجی JSON',
    difficulty: 'challenging',
    bookPage: '۲۶۸–۲۷۲',
    estimatedMinutes: 20,
    prompt: 'برنامه‌ای بنویسید که تعداد کلمات دو فایل f1.txt و f2.txt (و نادیده گرفتن f3.txt ناموجود) را در یک دیکشنری جمع کرده و در فایل stats.json ذخیره کند.',
    sampleOutput: '{"f1.txt": 3, "f2.txt": 4}',
    hint: 'دیکشنری stats = {} بسازید و برای هر فایل موجود stats[name] = len(words) ثبت کنید.',
    solutionCode: `import json
from pathlib import Path

Path("f1.txt").write_text("پایتون سریع است")
Path("f2.txt").write_text("جنگو فریم‌ورک قدرتمند وب")

stats = {}
for name in ["f1.txt", "f3.txt", "f2.txt"]:
    try:
        words = Path(name).read_text().split()
    except FileNotFoundError:
        pass
    else:
        stats[name] = len(words)

Path("stats.json").write_text(json.dumps(stats, indent=2))
print(Path("stats.json").read_text())`,
    solutionExplanation: 'ترکیب کامل هر سه مهارت کلیدی واحد ۴.۲: فایل، استثنا و JSON.',
    language: 'python',
    engine: 'python-fs',
  },
  {
    id: 'hw-4-2-10',
    number: 10,
    title: 'بانک نمره JSON با محاسبه معدل و رتبه‌بندی هنرجویان',
    difficulty: 'challenging',
    bookPage: '۲۷۲–۲۷۳',
    estimatedMinutes: 22,
    prompt: 'لیستی از ۳ دیکشنری هنرجو (name و scores) را در class.json ذخیره کنید؛ سپس آن را با json.loads بخوانید و میانگین نمرات هر هنرجو و شاگرد اول را چاپ کنید.',
    sampleOutput: 'شاگرد اول کلاس با بالاترین معدل',
    hint: 'معدل هر هنرجو برابر sum(st["scores"]) / len(st["scores"]) است.',
    solutionCode: `import json
from pathlib import Path

students = [
    {"name": "علی", "scores": [18, 19, 17]},
    {"name": "زهرا", "scores": [20, 19.5, 20]},
    {"name": "رضا", "scores": [16, 17.5, 18]}
]

p = Path("class.json")
p.write_text(json.dumps(students, indent=2))

loaded = json.loads(p.read_text())
best_name = ""
best_avg = -1

for st in loaded:
    avg = round(sum(st["scores"]) / len(st["scores"]), 2)
    print(f"{st['name']}: معدل {avg}")
    if avg > best_avg:
        best_avg = avg
        best_name = st["name"]

print(f"شاگرد اول: {best_name} ({best_avg})")`,
    solutionExplanation: 'ذخیره و تحلیل ساختارهای تودرتو (لیست از دیکشنری‌های دارای لیست) با JSON.',
    language: 'python',
    engine: 'python-fs',
  },
];

export const UNIT_4_2_QUIZZES: QuickQuizQuestion[] = [
  {
    id: 'quiz-4-2-01',
    kind: 'bug-spot',
    question: 'علت پاک شدن برندهای قبلی در کد واقعی شکل ۲۹ صفحه ۲۶۱ کتاب چیست؟',
    codeSnippet: `brands = "Samsung\\n"\nbrands += "Apple\\n"\nbrands = "Nokia\\n"`,
    language: 'python',
    options: [
      'کاراکتر \\n اشتباه است',
      'در خط سوم به جای += از = استفاده شده که مقدار قبلی را بازنویسی می‌کند',
      'برند Nokia قابل ذخیره نیست',
      'باید از == استفاده می‌شد',
    ],
    correctIndex: 1,
    explanation: 'جا افتادن علامت + پیش از = باعث پاک شدن کل محتوای قبلی متغیر brands می‌شود.',
    bookPage: '۲۶۱',
  },
  {
    id: 'quiz-4-2-02',
    kind: 'concept',
    question: 'حرف s در انتهای json.dumps() و json.loads() مخفف چیست و چرا هنگام کار با pathlib مهم است؟',
    options: [
      'Save — برای ذخیره خودکار روی سرور',
      'String — یعنی تبدیل به رشته (یا از رشته) که دقیقاً برای Path.write_text و read_text لازم است',
      'Secure — برای رمزنگاری فایل',
      'Sort — برای مرتب‌سازی کلیدها',
    ],
    correctIndex: 1,
    explanation: 'json.dumps رشته تولید می‌کند تا به write_text بدهیم و json.loads رشته خوانده‌شده از read_text را به داده پایتونی برمی‌گرداند.',
    bookPage: '۲۷۰',
  },
  {
    id: 'quiz-4-2-03',
    kind: 'concept',
    question: 'بلوک else در ساختار try / except / else چه زمانی اجرا می‌شود؟',
    options: [
      'همیشه در پایان برنامه (حتی اگر خطا رخ دهد)',
      'فقط زمانی که خطا رخ داده باشد',
      'فقط زمانی که بلوک try بدون هیچ خطایی اجرا شود',
      'قبل از بلوک try',
    ],
    correctIndex: 2,
    explanation: 'بلوک else مخصوص کدهایی است که فقط در صورت موفقیت کامل try باید اجرا شوند (در حالی که finally همیشه اجرا می‌شود).',
    bookPage: '۲۶۴',
  },
  {
    id: 'quiz-4-2-04',
    kind: 'output',
    question: 'خروجی دستور json.dumps({"ok": True, "err": None}) چیست؟',
    codeSnippet: `import json\nprint(json.dumps({"ok": True, "err": None}))`,
    language: 'python',
    options: [
      "{'ok': True, 'err': None}",
      '{"ok": true, "err": null}',
      '{"ok": TRUE, "err": NONE}',
      'خطای TypeError',
    ],
    correctIndex: 1,
    explanation: 'در استاندارد JSON رشته‌ها دابل‌کوتیشن دارند، True به true و None به null تبدیل می‌شود.',
    bookPage: '۲۷۰',
  },
  {
    id: 'quiz-4-2-05',
    kind: 'concept',
    question: 'کدام استثنا هنگام اجرای int("سلام") در پایتون رخ می‌دهد؟',
    options: ['ZeroDivisionError', 'FileNotFoundError', 'ValueError', 'KeyError'],
    correctIndex: 2,
    explanation: 'وقتی مقدار رشته برای تبدیل به عدد معتبر نباشد، خطای ValueError صادر می‌شود.',
    bookPage: '۲۶۵',
  },
  {
    id: 'quiz-4-2-06',
    kind: 'concept',
    question: 'کاربرد دستور pass درون بلوک except FileNotFoundError: چیست؟',
    options: [
      'توقف فوری کل برنامه',
      'عبور بی‌صدا از خطا بدون انجام کار اضافی و جلوگیری از خطای نحوی بلوک خالی',
      'ساخت خودکار فایل ناموجود',
      'تکرار دوباره بلوک try',
    ],
    correctIndex: 1,
    explanation: 'pass به برنامه اجازه می‌دهد هنگام نبود یک فایل بدون چاپ خطا سراغ فایل بعدی برود.',
    bookPage: '۲۶۸',
  },
  {
    id: 'quiz-4-2-07',
    kind: 'bug-spot',
    question: 'چرا کد زیر خطای TypeError می‌دهد؟',
    codeSnippet: `from pathlib import Path\nPath("score.txt").write_text(100)`,
    language: 'python',
    options: [
      'نام فایل باید با حرف بزرگ باشد',
      'متد write_text فقط رشته (str) می‌پذیرد و باید str(100) ارسال شود',
      'ماژول pathlib برای اعداد نیست',
      'باید به جای write_text از read_text استفاده کرد',
    ],
    correctIndex: 1,
    explanation: 'همیشه باید اعداد را با str() یا f-string به رشته تبدیل کرده و سپس به write_text بدهید.',
    bookPage: '۲۶۰',
  },
  {
    id: 'quiz-4-2-08',
    kind: 'concept',
    question: 'چرا در سیستم‌های ویندوز کارگاه مدرسه هنگام خواندن یا نوشتن فایل فارسی بهتر است encoding="utf-8" بنویسیم؟',
    options: [
      'برای افزایش سرعت اجرای حلقه for',
      'برای جلوگیری از به‌هم‌ریختگی حروف فارسی و خطای UnicodeDecodeError',
      'برای فشرده‌سازی حجم فایل به نصف',
      'برای رمزگذاری فایل',
    ],
    correctIndex: 1,
    explanation: 'کدگذاری پیش‌فرض ویندوز گاهی UTF-8 نیست و باعث خراب شدن متون فارسی می‌شود.',
    bookPage: '۲۵۶',
  },
  {
    id: 'quiz-4-2-09',
    kind: 'bug-spot',
    question: 'چرا دسترسی data["city"] در کد زیر با خطای TypeError مواجه می‌شود؟',
    codeSnippet: `from pathlib import Path\ndata = Path("city.json").read_text()\nprint(data["city"])`,
    language: 'python',
    options: [
      'پسوند فایل باید .txt باشد',
      'read_text یک رشته (str) برمی‌گرداند و ابتدا باید با json.loads(data) به دیکشنری تبدیل شود',
      'کلید city باید داخل پرانتز باشد',
      'باید از json.dumps(data) استفاده شود',
    ],
    correctIndex: 1,
    explanation: 'برای دسترسی به کلیدها روی محتوای فایل JSON حتماً باید ابتدا json.loads() را اجرا کرد.',
    bookPage: '۲۷۱',
  },
];
