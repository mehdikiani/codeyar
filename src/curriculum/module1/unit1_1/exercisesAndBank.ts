import type {
  ClassroomActivity,
  HomeworkAssignment,
  QuickQuizQuestion,
} from '../../../types/curriculum.ts';

/**
 * Unit 1.1 — Exhaustive Classroom Activities (9), Tiered Homework Bank (12),
 * and Interactive Projector Quick Quizzes (10).
 */

export const UNIT_1_1_ACTIVITIES: ClassroomActivity[] = [
  {
    id: 'act-1-1-ashpaz',
    kind: 'project',
    title: 'پروژه آشپزباشی (انتخاب تصادفی + تغییر شانس انتخاب با وزن)',
    bookPage: '۱۲ و ۲۴',
    estimatedMinutes: 15,
    prompt:
      'پروژه اصلی واحد ۱.۱ کتاب را تکمیل کنید: ابتدا لیستی از غذاهای موردعلاقه بسازید، از کاربر بخواهید غذاهای دلخواهش را تا تایپ exit اضافه کند، سپس یک‌بار با random.choice انتخاب هم‌شانس انجام دهید و یک‌بار با random.choices و وزن بیشتر برای غذای اول شانس انتخاب را تغییر دهید.',
    steps: [
      'ماژول random را وارد (import) کنید و یک لیست اولیه با ۳ غذا بسازید.',
      'با حلقه while True از کاربر غذای جدید بگیرید و در صورت تایپ exit با break خارج شوید.',
      'با random.choice(foods) یک پیشنهاد تصادفی هم‌شانس چاپ کنید.',
      'با random.choices(foods, weights=..., k=1)[0] به غذای محبوب وزن بیشتری بدهید.',
    ],
    hints: [
      'شرط if new_food.lower() == "exit": break را پیش از foods.append() قرار دهید.',
      'برای ساخت لیست وزن‌ها به اندازه طول لیست foods می‌توانید وزن اول را 5 و بقیه را 1 بگذارید: weights = [5] + [1] * (len(foods) - 1).',
    ],
    language: 'python',
    engine: 'python',
    starterCode: `import random

foods = ["قورمه‌سبزی", "زرشک‌پلو", "ماکارونی"]

# ۱. با حلقه while تا ورود exit غذای جدید به foods اضافه کنید:

# ۲. با random.choice و random.choices پیشنهاد امروز را چاپ کنید:
`,
    solutionCode: `import random

foods = ["قورمه‌سبزی", "زرشک‌پلو", "ماکارونی"]
print("منوی اولیه آشپزباشی:", foods)

while True:
    new_food = input("غذای جدید وارد کنید (یا exit برای پایان): ").strip()
    if new_food.lower() == "exit":
        break
    if new_food != "":
        foods.append(new_food)

print("پیشنهاد هم‌شانس امروز:", random.choice(foods))

weights = [5] + [1] * (len(foods) - 1)
fav_pick = random.choices(foods, weights=weights, k=1)[0]
print(f"پیشنهاد با شانس بالاتر برای '{foods[0]}': {fav_pick}")`,
    solutionExplanation:
      'نسخه کامل پروژه آشپزباشی که هم افزودن پویا با while/append و هم تغییر شانس انتخاب (کنجکاوی کتاب) را به‌صورت عملی اجرا می‌کند.',
    alternativeSolutionCode: `import random

# روش جایگزین ساده‌تر برای تغییر شانس (تکرار غذای محبوب در لیست):
foods = ["قورمه‌سبزی", "قورمه‌سبزی", "قورمه‌سبزی", "زرشک‌پلو", "ماکارونی"]
print("پیشنهاد تصادفی با تکرار در لیست:", random.choice(foods))`,
    alternativeSolutionExplanation:
      'اگر هنرجویان هنوز با پارامتر weights در random.choices راحت نیستند، تکرار نام غذای محبوب در لیست نیز به‌صورت شهودی شانس انتخاب آن را افزایش می‌دهد.',
  },
  {
    id: 'act-1-1-smart-shop',
    kind: 'workshop',
    title: 'کارگاه راه‌اندازی فروشگاه هوشمند (فاکتور + تخفیف ۱۰٪ + مالیات ۹٪)',
    bookPage: '۱۶ و ۲۹',
    estimatedMinutes: 10,
    prompt:
      'برنامه‌ای بنویسید که مبلغ کل خرید مشتری را بگیرد؛ اگر خرید ۵۰۰٬۰۰۰ تومان یا بیشتر بود ۱۰٪ تخفیف اعمال کند، سپس ۹٪ مالیات بر ارزش افزوده به مبلغ پس از تخفیف اضافه کرده و فاکتور کامل را چاپ کند.',
    steps: [
      'مبلغ کل خرید را با float(input(...)) از کاربر دریافت کنید.',
      'متغیر discount = 0 بسازید و با شرط if total >= 500000 تخفیف ۱۰٪ را محاسبه کنید.',
      'مبلغ پس از تخفیف را حساب کرده و ۹٪ مالیات را به آن اضافه کنید.',
      'هر چهار ردیف فاکتور (مبلغ پایه، تخفیف، مالیات، قابل پرداخت) را مرتب چاپ کنید.',
    ],
    hints: [
      'مقدار تخفیف ۱۰٪ برابر total * 0.10 است.',
      'مالیات ۹٪ روی مبلغ پس از کسر تخفیف (after_discount * 0.09) محاسبه می‌شود.',
    ],
    language: 'python',
    engine: 'python',
    starterCode: `total = float(input("مبلغ کل خرید (تومان): "))
discount = 0

# شرط تخفیف ۱۰٪ و محاسبه مالیات ۹٪ را اینجا بنویسید:
`,
    solutionCode: `total = float(input("مبلغ کل خرید (تومان): "))
discount = 0

if total >= 500000:
    discount = total * 0.10
    print("تبریک! شما مشمول ۱۰٪ تخفیف شدید.")

after_discount = total - discount
tax = after_discount * 0.09
payable = after_discount + tax

print(f"مبلغ اولیه: {int(total)} تومان")
print(f"تخفیف: {int(discount)} تومان")
print(f"مالیات ۹٪: {int(tax)} تومان")
print(f"مبلغ قابل پرداخت: {int(payable)} تومان")`,
    solutionExplanation:
      'ترکیب تبدیل نوع float، شرط if و محاسبات درصدی تخفیف و مالیات در یک سناریوی واقعی فروشگاهی.',
    alternativeSolutionCode: `total = float(input("مبلغ کل خرید (تومان): "))
discount = total * 0.10 if total >= 500000 else 0
payable = (total - discount) * 1.09
print(f"تخفیف: {int(discount)} | مبلغ نهایی با مالیات ۹٪: {int(payable)} تومان")`,
    alternativeSolutionExplanation:
      'استفاده از عبارت شرطی تک‌خطی و ضرب مستقیم در 1.09 (معادل +9%) کد را در ۴ خط خلاصه می‌کند.',
  },
  {
    id: 'act-1-1-grade-discount',
    kind: 'activity',
    title: 'فعالیت محاسبه‌گر معدل و تخفیف پلکانی کتاب‌فروشی',
    bookPage: '۳۱',
    estimatedMinutes: 10,
    prompt:
      'معدل هنرجو (۰ تا ۲۰) را بگیرید: اگر عدد خارج از بازه ۰ تا ۲۰ بود پیام خطا بدهید؛ وگرنه برای معدل ۱۸ به بالا ۳۰٪ تخفیف، ۱۵ تا ۱۸ تخفیف ۱۵٪، ۱۲ تا ۱۵ تخفیف ۵٪ و زیر ۱۲ بدون تخفیف چاپ کنید.',
    steps: [
      'معدل را به صورت اعشاری با float(input(...)) دریافت کنید.',
      'ابتدا شرط خطا (gpa < 0 or gpa > 20) را بررسی کنید.',
      'سپس با elif از بالاترین بازه (gpa >= 18) به پایین حرکت کنید.',
    ],
    hints: [
      'شرط اعتبارسنجی باید اولین if باشد تا عددهایی مثل 25 اشتباهاً وارد شاخه >= 18 نشوند!',
      'به ترتیب نزولی 18 → 15 → 12 → else عمل کنید.',
    ],
    language: 'python',
    engine: 'python',
    starterCode: `gpa = float(input("معدل هنرجو (بین 0 تا 20): "))

# بازه‌ها را با if / elif / else بررسی کنید:
`,
    solutionCode: `gpa = float(input("معدل هنرجو (بین 0 تا 20): "))

if gpa < 0 or gpa > 20:
    print("خطا: معدل باید عددی بین 0 تا 20 باشد!")
elif gpa >= 18:
    print("عالی! ۳۰٪ تخفیف ویژه خرید کتاب.")
elif gpa >= 15:
    print("خوب! ۱۵٪ تخفیف خرید کتاب.")
elif gpa >= 12:
    print("قابل قبول! ۵٪ تخفیف خرید کتاب.")
else:
    print("نیاز به تلاش بیشتر (بدون تخفیف).")`,
    solutionExplanation:
      'بررسی بازه نامعتبر در ابتدای زنجیره elif از خطای منطقی برای ورودی‌هایی مثل -3 یا 24 جلوگیری می‌کند.',
    alternativeSolutionCode: `gpa = float(input("معدل هنرجو (بین 0 تا 20): "))
if gpa >= 0 and gpa <= 20:
    if gpa >= 18:
        percent = 30
    elif gpa >= 15:
        percent = 15
    elif gpa >= 12:
        percent = 5
    else:
        percent = 0
    print(f"درصد تخفیف شما: {percent}٪")
else:
    print("معدل نامعتبر است!")`,
    alternativeSolutionExplanation:
      'در این روش با ترکیب شرط تودرتو (gpa >= 0 and gpa <= 20) و ذخیره عدد درصد در متغیر percent، چاپ نهایی تنها در یک خط انجام می‌شود.',
  },
  {
    id: 'act-1-1-countdown',
    kind: 'curiosity',
    title: 'کنجکاوی شمارش معکوس پخت غذا با حلقه for نزولی',
    bookPage: '۳۸',
    estimatedMinutes: 5,
    prompt:
      'از کاربر تعداد ثانیه (مثلاً 5) را بگیرید و با حلقه for و تابع range سه‌آرگومانی با گام منفی، شمارش معکوس تا ۱ را نمایش دهید و در پایان بنویسید «غذا آماده سرو است!».',
    steps: [
      'تعداد ثانیه را با int(input(...)) دریافت کنید.',
      'حلقه for sec in range(seconds, 0, -1): را بنویسید.',
      'پس از پایان حلقه، پیام آماده شدن غذا را چاپ کنید.',
    ],
    hints: [
      'برای شمارش معکوس تا عدد ۱، مقدار stop را 0 و گام را -1 بگذارید.',
    ],
    language: 'python',
    engine: 'python',
    starterCode: `seconds = int(input("تعداد ثانیه شمارش معکوس (مثلاً 5): "))

# حلقه for نزولی را اینجا بنویسید:
`,
    solutionCode: `seconds = int(input("تعداد ثانیه شمارش معکوس (مثلاً 5): "))

for sec in range(seconds, 0, -1):
    print(f"⏱ {sec} ثانیه تا آماده شدن غذا...")

print("🍽 غذا آماده سرو است! نوش جان!")`,
    solutionExplanation:
      'کاربرد ملموس گام منفی (-1) در تابع range(start, stop, step) برای حرکت از بزرگ به کوچک.',
    alternativeSolutionCode: `sec = int(input("تعداد ثانیه شمارش معکوس: "))
while sec > 0:
    print(f"⏱ {sec} ثانیه باقی‌مانده...")
    sec -= 1
print("🍽 غذا آماده سرو است!")`,
    alternativeSolutionExplanation:
      'همان شمارش معکوس با حلقه while و کاهش شمارنده (sec -= 1) برای مقایسه مستقیم for و while در کلاس.',
  },
  {
    id: 'act-1-1-wedding-cap',
    kind: 'workshop',
    title: 'کارگاه کنترل ظرفیت تالار عروسی (حلقه while)',
    bookPage: '۴۲',
    estimatedMinutes: 10,
    prompt:
      'برنامه‌ای بنویسید که ظرفیت یک تالار ۵ نفره را کنترل کند. در هر مرحله نام مهمان جدید را بگیرد، ورودی خالی را با continue رد کند، به لیست guests اضافه کند و پس از تکمیل ظرفیت، فهرست شماره‌گذاری‌شده مهمان‌ها را چاپ کند.',
    steps: [
      'لیست خالی guests = [] و capacity = 5 تعریف کنید.',
      'با while len(guests) < capacity: نام مهمان را بگیرید.',
      'اگر نام خالی بود با continue به دور بعد بروید؛ وگرنه append کنید.',
      'پس از پر شدن ظرفیت، با for و enumerate لیست را چاپ کنید.',
    ],
    hints: [
      'شرط ادامه باید < باشد نه <= تا دقیقاً ۵ نفر ثبت شوند.',
    ],
    language: 'python',
    engine: 'python',
    starterCode: `guests = []
capacity = 5

# حلقه کنترل ظرفیت را تکمیل کنید:
`,
    solutionCode: `guests = []
capacity = 5

while len(guests) < capacity:
    name = input(f"نام مهمان شماره {len(guests) + 1}: ").strip()
    if name == "":
        print("نام نمی‌تواند خالی باشد!")
        continue
    guests.append(name)

print("✔ ظرفیت تالار تکمیل شد! فهرست مهمان‌ها:")
for idx, g in enumerate(guests, 1):
    print(f"{idx}. {g}")`,
    solutionExplanation:
      'کنترل دقیق ظرفیت با مقایسه طول لیست len(guests) و استفاده از continue برای جلوگیری از ثبت نام‌های خالی.',
    alternativeSolutionCode: `guests = []
for i in range(1, 6):
    name = input(f"نام مهمان {i}: ").strip()
    guests.append(name)
print("فهرست ۵ مهمان:", guests)`,
    alternativeSolutionExplanation:
      'وقتی نیازی به رد کردن ورودی خالی یا خروج اضطراری نباشد، حلقه for با range(1, 6) ساده‌تر است؛ اما برای اعتبارسنجی ورودی، while برتر است.',
  },
  {
    id: 'act-1-1-food-done',
    kind: 'activity',
    title: 'فعالیت سفارش مکرر غذا تا کلمه done + بررسی تکراری نبودن',
    bookPage: '۴۴',
    estimatedMinutes: 10,
    prompt:
      'برنامه‌ای بنویسید که با حلقه while True نام غذاهای درخواستی مشتری را بگیرد و تا زمانی که عبارت done وارد نشده به لیست orders اضافه کند. اگر غذایی قبلاً سفارش داده شده بود پیام هشدار دهد و در پایان تعداد و لیست کل غذاها را چاپ کند.',
    steps: [
      'یک لیست خالی orders = [] بسازید.',
      'درون while True با input() نام غذا را بگیرید و اگر برابر done بود break بزنید.',
      'با عملگر in بررسی کنید آیا غذا قبلاً در orders بوده است یا نه.',
      'در پایان تعداد کل و نام غذاها را نمایش دهید.',
    ],
    hints: [
      'برای بی‌حساسیت کردن به حروف بزرگ و کوچک از food.lower() == "done" استفاده کنید.',
      'شرط تکراری بودن: if food in orders:',
    ],
    language: 'python',
    engine: 'python',
    starterCode: `orders = []

# حلقه while True برای ثبت سفارش تا done را اینجا بنویسید:
`,
    solutionCode: `orders = []

while True:
    food = input("نام غذا (یا done برای پایان): ").strip()
    if food.lower() == "done":
        break
    if food == "":
        continue
    if food in orders:
        print(f"توجه: '{food}' قبلاً در سبد شما ثبت شده است.")
    else:
        orders.append(food)
        print(f"✔ '{food}' ثبت شد.")

print(f"تعداد کل سفارش‌های یکتا: {len(orders)}")
print("لیست سفارش‌ها:", orders)`,
    solutionExplanation:
      'ترکیب while True، break، continue و بررسی عضویت in برای ساخت یک سیستم سفارش واقعی و بدون داده تکراری.',
    alternativeSolutionCode: `orders = []
food = input("نام غذا (یا done): ").strip()
while food.lower() != "done":
    if food != "":
        orders.append(food)
    food = input("نام غذا (یا done): ").strip()
print("سفارش‌ها:", orders)`,
    alternativeSolutionExplanation:
      'الگوی کلاسیک Sentinel Loop (بدون while True) که در آن یک‌بار قبل از حلقه و یک‌بار در انتهای حلقه input گرفته می‌شود.',
  },
  {
    id: 'act-1-1-mult-table',
    kind: 'workshop',
    title: 'کارگاه جدول ضرب سفارشی با فیلتر اعداد فرد توسط continue',
    bookPage: '۳۹ و ۴۳',
    estimatedMinutes: 8,
    prompt:
      'عددی از کاربر بگیرید و جدول ضرب آن را از ۱ تا ۱۰ چاپ کنید؛ اما اگر کاربر فقط مضرب‌های زوج را خواست، ضرایب فرد را با دستور continue رد کنید.',
    steps: [
      'عدد پایه n را با int(input(...)) دریافت کنید.',
      'حالت نمایش (all یا even) را از کاربر بپرسید.',
      'درون حلقه for i in range(1, 11) اگر حالت even بود و i % 2 != 0 بود، continue بزنید.',
    ],
    hints: [
      'شرط فرد بودن شمارنده: i % 2 != 0.',
    ],
    language: 'python',
    engine: 'python',
    starterCode: `n = int(input("عدد جدول ضرب (مثلاً 7): "))
mode = input("همه (all) یا فقط ضرایب زوج (even)؟ ").strip().lower()

# حلقه جدول ضرب را بنویسید:
`,
    solutionCode: `n = int(input("عدد جدول ضرب (مثلاً 7): "))
mode = input("همه (all) یا فقط ضرایب زوج (even)؟ ").strip().lower()

print(f"=== جدول ضرب عدد {n} ===")
for i in range(1, 11):
    if mode == "even" and i % 2 != 0:
        continue
    print(f"{n} × {i} = {n * i}")`,
    solutionExplanation:
      'ترکیب حلقه for، عملگر باقیمانده %، شرط ترکیبی and و دستور continue برای فیلتر کردن خروجی.',
    alternativeSolutionCode: `n = int(input("عدد جدول ضرب: "))
mode = input("all یا even؟ ").strip().lower()
step = 2 if mode == "even" else 1
start = 2 if mode == "even" else 1
for i in range(start, 11, step):
    print(f"{n} × {i} = {n * i}")`,
    alternativeSolutionExplanation:
      'تنظیم مستقیم start و step در تابع range() بدون نیاز به continue داخل حلقه.',
  },
  {
    id: 'act-1-1-password-retry',
    kind: 'workshop',
    title: 'کارگاه قفل امنیتی رمز عبور با حداکثر ۳ بار تلاش (while + break)',
    bookPage: '۴۲ تا ۴۳',
    estimatedMinutes: 12,
    prompt:
      'سامانه ورود امن بسازید: رمز صحیح "python1405" است. کاربر حداکثر ۳ فرصت دارد. اگر رمز را درست وارد کرد پیام «ورود موفق» چاپ و با break خارج شود؛ اگر هر ۳ بار اشتباه زد پیام «حساب کاربری قفل شد!» نمایش داده شود.',
    steps: [
      'متغیرهای secret = "python1405"، max_tries = 3، tries = 0 و logged_in = False بسازید.',
      'تا زمانی که tries < max_tries است رمز را بگیرید و tries += 1 کنید.',
      'در صورت تطابق رمز، logged_in = True گذاشته و break بزنید.',
      'بیرون حلقه اگر logged_in برابر False بود پیام قفل شدن حساب را چاپ کنید.',
    ],
    hints: [
      'متغیر پرچم (Flag) به نام logged_in = False پس از پایان حلقه مشخص می‌کند خروج به دلیل موفقیت بوده یا تمام شدن فرصت‌ها.',
    ],
    language: 'python',
    engine: 'python',
    starterCode: `secret = "python1405"
max_tries = 3
tries = 0
logged_in = False

# حلقه بررسی رمز عبور را اینجا بنویسید:
`,
    solutionCode: `secret = "python1405"
max_tries = 3
tries = 0
logged_in = False

while tries < max_tries:
    pwd = input(f"رمز عبور را وارد کنید (تلاش {tries + 1} از {max_tries}): ")
    tries += 1
    if pwd == secret:
        logged_in = True
        print("🔓 خوش آمدید! ورود با موفقیت انجام شد.")
        break
    print(f"❌ رمز نادرست است. فرصت باقی‌مانده: {max_tries - tries}")

if not logged_in:
    print("⛔ حساب کاربری به دلیل ۳ بار تلاش ناموفق موقتاً قفل شد!")`,
    solutionExplanation:
      'معرفی الگوی بسیار مهم «متغیر پرچم (Boolean Flag)» همراه با while و break که در سیستم‌های واقعی احراز هویت به کار می‌رود.',
    alternativeSolutionCode: `secret = "python1405"
for attempt in range(1, 4):
    if input(f"رمز (تلاش {attempt}/3): ") == secret:
        print("🔓 ورود موفق!")
        break
    print("❌ اشتباه بود.")
    if attempt == 3:
        print("⛔ حساب قفل شد!")`,
    alternativeSolutionExplanation:
      'چون حداکثر تعداد تلاش (۳ بار) از قبل مشخص است، با حلقه for و break نیز می‌توان آن را بسیار فشرده پیاده‌سازی کرد.',
  },
  {
    id: 'act-1-1-cart-slicing',
    kind: 'activity',
    title: 'کارگاه تحلیل سبد خرید با لیست، برش (Slicing) و حلقه جمع قیمت‌ها',
    bookPage: '۲۲ و ۳۹',
    estimatedMinutes: 12,
    prompt:
      'لیستی از قیمت ۵ کالای سبد خرید دارید. مجموع سبد، میانگین قیمت، گران‌ترین و ارزان‌ترین کالا (با حلقه for)، اولین و آخرین قیمت (با اندیس 0 و -1) و زیرلیست ۳ کالای اول (با برش) را گزارش دهید.',
    steps: [
      'لیست prices را تعریف کنید.',
      'با حلقه for روی prices حرکت کرده و total، highest و lowest را محاسبه کنید.',
      'با اندیس [0]، [-1] و برش [:3] گزارش کامل چاپ کنید.',
    ],
    hints: [
      'برای یافتن بیشینه و کمینه با حلقه، مقدار اولیه highest و lowest را برابر prices[0] قرار دهید.',
    ],
    language: 'python',
    engine: 'python',
    starterCode: `prices = [120000, 450000, 85000, 310000, 195000]

# مجموع، بیشینه، کمینه، اولین، آخرین و ۳ کالای اول را گزارش دهید:
`,
    solutionCode: `prices = [120000, 450000, 85000, 310000, 195000]

total = 0
highest = prices[0]
lowest = prices[0]

for p in prices:
    total += p
    if p > highest:
        highest = p
    if p < lowest:
        lowest = p

print("کل سبد خرید:", prices)
print("۳ کالای اول [0:3]:", prices[0:3])
print(f"اولین قیمت: {prices[0]} | آخرین قیمت: {prices[-1]}")
print(f"مجموع: {total} | میانگین: {int(total / len(prices))} تومان")
print(f"گران‌ترین کالا: {highest} | ارزان‌ترین کالا: {lowest} تومان")`,
    solutionExplanation:
      'این تمرین تمام مهارت‌های مدل‌سازی داده واحد ۱.۱ (لیست، اندیس منفی، برش، حلقه for، انباشتگر و شرط بیشینه/کمینه) را در یک گزارش فروشگاهی جمع‌بندی می‌کند.',
    alternativeSolutionCode: `prices = [120000, 450000, 85000, 310000, 195000]
print("مجموع:", sum(prices), "| میانگین:", int(sum(prices) / len(prices)))
print("گران‌ترین:", max(prices), "| ارزان‌ترین:", min(prices))`,
    alternativeSolutionExplanation:
      'در واحد ۱.۲ با توابع داخلی sum()، max() و min() آشنا می‌شویم که همین الگوریتم را در یک خط انجام می‌دهند!',
  },
];

export const UNIT_1_1_HOMEWORKS: HomeworkAssignment[] = [
  // -------------------- EASY (1 - 4) --------------------
  {
    id: 'hw-1-1-01',
    number: 1,
    title: 'چاپ کارت شناسایی هنرجو با سه‌کوتیشن و f-string',
    difficulty: 'easy',
    bookPage: '۶ تا ۱۰',
    estimatedMinutes: 10,
    prompt:
      'برنامه‌ای بنویسید که نام و نام خانوادگی، رشته و معدل هنرجو را از ورودی بگیرد و درون یک کادر متنی زیبا با استفاده از f-string و سه‌کوتیشن نمایش دهد.',
    sampleInput: `نام: امیرحسین
رشته: شبکه و نرم‌افزار
معدل: 19.25`,
    sampleOutput: `=========================
نام هنرجو: امیرحسین
رشته: شبکه و نرم‌افزار
معدل: 19.25
=========================`,
    hint: 'می‌توانید از f"""...""" برای ترکیب سه‌کوتیشن و f-string در یک دستور print استفاده کنید.',
    solutionCode: `name = input("نام: ")
major = input("رشته: ")
gpa = float(input("معدل: "))

print(f"""=========================
نام هنرجو: {name}
رشته: {major}
معدل: {gpa}
=========================""")`,
    solutionExplanation: 'ترکیب input، تبدیل float برای معدل و f-string چندخطی.',
    language: 'python',
    engine: 'python',
  },
  {
    id: 'hw-1-1-02',
    number: 2,
    title: 'تبدیل دمای سانتی‌گراد به فارنهایت',
    difficulty: 'easy',
    bookPage: '۱۳ تا ۱۶',
    estimatedMinutes: 10,
    prompt:
      'دمای هوا را بر حسب سانتی‌گراد (C) از کاربر بگیرید و با فرمول F = (C * 9 / 5) + 32 به فارنهایت تبدیل کرده و تا ۱ رقم اعشار چاپ کنید.',
    sampleInput: `25`,
    sampleOutput: `25.0 درجه سانتی‌گراد برابر است با 77.0 درجه فارنهایت`,
    hint: 'حتماً خروجی input() را با float() تبدیل کنید و در پایان از round(f, 1) استفاده کنید.',
    solutionCode: `c = float(input("دما به سانتی‌گراد: "))
f = (c * 9 / 5) + 32
print(f"{c} درجه سانتی‌گراد برابر است با {round(f, 1)} درجه فارنهایت")`,
    solutionExplanation: 'تمرین دقیق تبدیل نوع float، رعایت اولویت عملگرها و تابع round().',
    language: 'python',
    engine: 'python',
  },
  {
    id: 'hw-1-1-03',
    number: 3,
    title: 'تشخیص زوج یا فرد بودن عدد و بخش‌پذیری بر ۵',
    difficulty: 'easy',
    bookPage: '۱۴ و ۲۷',
    estimatedMinutes: 10,
    prompt:
      'یک عدد صحیح از کاربر بگیرید و با عملگر باقیمانده (%) مشخص کنید آیا عدد زوج است یا فرد؛ و در خط بعدی اعلام کنید آیا بر ۵ بخش‌پذیر است یا نه.',
    sampleInput: `20`,
    sampleOutput: `عدد 20 زوج است.
عدد 20 بر ۵ بخش‌پذیر است.`,
    hint: 'برای زوج بودن شرط n % 2 == 0 و برای بخش‌پذیری بر ۵ شرط n % 5 == 0 را با دو if جداگانه بررسی کنید.',
    solutionCode: `n = int(input("یک عدد صحیح وارد کنید: "))

if n % 2 == 0:
    print(f"عدد {n} زوج است.")
else:
    print(f"عدد {n} فرد است.")

if n % 5 == 0:
    print(f"عدد {n} بر ۵ بخش‌پذیر است.")
else:
    print(f"عدد {n} بر ۵ بخش‌پذیر نیست.")`,
    solutionExplanation: 'این مسئله نمونه عالی برای زمانی است که دو بررسی مستقل داریم و باید از دو if/else مجزا استفاده کنیم نه elif.',
    language: 'python',
    engine: 'python',
  },
  {
    id: 'hw-1-1-04',
    number: 4,
    title: 'ویرایش لیست دوستان (append، insert، pop و اندیس منفی)',
    difficulty: 'easy',
    bookPage: '۱۸ تا ۲۲',
    estimatedMinutes: 10,
    prompt:
      'لیستی با ۳ نام اولیه ["علی", "رضا", "مهدی"] بسازید. نام "سارا" را به انتها اضافه کنید، نام "مریم" را در اندیس ۱ درج کنید، آخرین عضو را با pop حذف و چاپ کنید، و در نهایت اولین و آخرین عضو لیست نهایی را نمایش دهید.',
    sampleOutput: `عضو حذف‌شده: سارا
لیست نهایی: ['علی', 'مریم', 'رضا', 'مهدی']
اولین: علی | آخرین: مهدی`,
    hint: 'از متدهای append()، insert(1, ...) و pop() به ترتیب خواسته شده استفاده کنید.',
    solutionCode: `friends = ["علی", "رضا", "مهدی"]
friends.append("سارا")
friends.insert(1, "مریم")
removed = friends.pop()

print("عضو حذف‌شده:", removed)
print("لیست نهایی:", friends)
print(f"اولین: {friends[0]} | آخرین: {friends[-1]}")`,
    solutionExplanation: 'تثبیت کاربرد دقیق چهار عملیات پایه روی لیست و دسترسی با اندیس 0 و -1.',
    language: 'python',
    engine: 'python',
  },

  // -------------------- MEDIUM (5 - 8) --------------------
  {
    id: 'hw-1-1-05',
    number: 5,
    title: 'تبدیل ثانیه به ساعت، دقیقه و ثانیه (// و %)',
    difficulty: 'medium',
    bookPage: '۱۳ تا ۱۴',
    estimatedMinutes: 15,
    prompt:
      'تعداد کل ثانیه‌ها را از کاربر بگیرید (مثلاً 3665) و آن را به ساعت، دقیقه و ثانیه تبدیل کرده و به‌صورت خوانا چاپ نمایید.',
    sampleInput: `3665`,
    sampleOutput: `3665 ثانیه برابر است با: 1 ساعت و 1 دقیقه و 5 ثانیه`,
    hint: 'ابتدا hours = total // 3600 و remaining = total % 3600 را حساب کنید؛ سپس دقیقه و ثانیه را از remaining به دست آورید.',
    solutionCode: `total = int(input("تعداد کل ثانیه‌ها: "))
hours = total // 3600
remaining = total % 3600
minutes = remaining // 60
seconds = remaining % 60

print(f"{total} ثانیه برابر است با: {hours} ساعت و {minutes} دقیقه و {seconds} ثانیه")`,
    solutionExplanation: 'تجزیه سلسله‌مراتبی عدد با استفاده از تقسیم صحیح (//) و باقیمانده (%).',
    language: 'python',
    engine: 'python',
  },
  {
    id: 'hw-1-1-06',
    number: 6,
    title: 'محاسبه‌گر شاخص توده بدنی (BMI) با رده‌بندی سلامت',
    difficulty: 'medium',
    bookPage: '۲۹ تا ۳۱',
    estimatedMinutes: 15,
    prompt:
      'وزن (کیلوگرم) و قد (متر، مثلاً 1.75) را از کاربر بگیرید، شاخص BMI = weight / (height ** 2) را حساب کنید و وضعیت را اعلام نمایید: زیر 18.5 (کمبود وزن)، 18.5 تا 25 (وزن نرمال)، 25 تا 30 (اضافه‌وزن) و 30 به بالا (چاقی).',
    sampleInput: `وزن: 70
قد: 1.75`,
    sampleOutput: `BMI شما: 22.86 ← وضعیت: وزن نرمال`,
    hint: 'حتماً قد را به توان ۲ با height ** 2 برسانید و از زنجیره if/elif/else منظم استفاده کنید.',
    solutionCode: `weight = float(input("وزن (کیلوگرم): "))
height = float(input("قد (متر، مثلاً 1.75): "))

bmi = weight / (height ** 2)

if bmi < 18.5:
    status = "کمبود وزن"
elif bmi < 25:
    status = "وزن نرمال"
elif bmi < 30:
    status = "اضافه‌وزن"
else:
    status = "چاقی"

print(f"BMI شما: {round(bmi, 2)} ← وضعیت: {status}")`,
    solutionExplanation: 'کاربرد واقعی عملگر توان **، اعداد اعشاری float و زنجیره پیوسته elif.',
    language: 'python',
    engine: 'python',
  },
  {
    id: 'hw-1-1-07',
    number: 7,
    title: 'مجموع اعداد زوج بین ۱ تا N با حلقه for',
    difficulty: 'medium',
    bookPage: '۳۶ تا ۳۹',
    estimatedMinutes: 12,
    prompt:
      'عدد صحیح مثبت N را از کاربر بگیرید و با حلقه for هم اعداد زوج از ۲ تا N را کنار هم چاپ کنید و هم مجموع و تعداد آن‌ها را در خط آخر نمایش دهید.',
    sampleInput: `10`,
    sampleOutput: `اعداد زوج: 2 4 6 8 10
تعداد: 5 | مجموع: 30`,
    hint: 'می‌توانید از range(2, n + 1, 2) استفاده کنید و در هر دور total += i و count += 1 را اجرا نمایید.',
    solutionCode: `n = int(input("عدد N را وارد کنید: "))
total = 0
count = 0

print("اعداد زوج:", end=" ")
for num in range(2, n + 1, 2):
    print(num, end=" ")
    total += num
    count += 1

print()
print(f"تعداد: {count} | مجموع: {total}")`,
    solutionExplanation: 'دقت به n + 1 برای شمول خود عدد N در صورت زوج بودن، به همراه الگوی هم‌زمان شمارنده و انباشتگر.',
    language: 'python',
    engine: 'python',
  },
  {
    id: 'hw-1-1-08',
    number: 8,
    title: 'فیلتر لیست دماهای هفته (روزهای گرم و سرد)',
    difficulty: 'medium',
    bookPage: '۳۶ تا ۴۰',
    estimatedMinutes: 15,
    prompt:
      'لیستی از دمای ۷ روز هفته دارید: [22, 31, 28, 35, 19, 33, 25]. با حلقه for روزهایی که دمای بالای ۳۰ درجه داشته‌اند را در لیست جدید hot_days ذخیره کرده و تعداد روزهای گرم و میانگین دمای هفته را چاپ کنید.',
    sampleOutput: `روزهای گرم (بالای ۳۰ درجه): [31, 35, 33]
تعداد روزهای گرم: 3 | میانگین دمای هفته: 27.57`,
    hint: 'یک لیست خالی hot_days = [] پیش از حلقه بسازید و هرگاه temp > 30 بود با append به آن اضافه کنید.',
    solutionCode: `temps = [22, 31, 28, 35, 19, 33, 25]
hot_days = []
total_temp = 0

for t in temps:
    total_temp += t
    if t > 30:
        hot_days.append(t)

avg_temp = total_temp / len(temps)
print("روزهای گرم (بالای ۳۰ درجه):", hot_days)
print(f"تعداد روزهای گرم: {len(hot_days)} | میانگین دمای هفته: {round(avg_temp, 2)}")`,
    solutionExplanation: 'الگوی «فیلتر کردن لیست به لیست جدید» یکی از پایه‌ای‌ترین مهارت‌های تحلیل داده در پایتون است.',
    language: 'python',
    engine: 'python',
  },

  // -------------------- CHALLENGING (9 - 12) --------------------
  {
    id: 'hw-1-1-09',
    number: 9,
    title: 'شبیه‌ساز دستگاه خودپرداز (ATM) با منوی تکرارشونده while',
    difficulty: 'challenging',
    bookPage: '۴۲ تا ۴۵',
    estimatedMinutes: 20,
    prompt:
      'یک خودپرداز با موجودی اولیه ۱٬۰۰۰٬۰۰۰ تومان بسازید. در حلقه while True منو نشان دهید: (1) مشاهده موجودی، (2) واریز وجه، (3) برداشت وجه (با کنترل کافی بودن موجودی و مثبت بودن مبلغ)، (4) خروج با break.',
    sampleInput: `2
250000
3
500000
1
4`,
    sampleOutput: `واریز انجام شد. موجودی جدید: 1250000 تومان
برداشت انجام شد. موجودی جدید: 750000 تومان
موجودی فعلی: 750000 تومان
خدانگهدار!`,
    hint: 'برای برداشت ابتدا چک کنید amount <= 0 نباشد و سپس amount <= balance باشد تا موجودی منفی نشود.',
    solutionCode: `balance = 1000000

while True:
    print("1: موجودی | 2: واریز | 3: برداشت | 4: خروج")
    choice = input("انتخاب شما: ").strip()
    if choice == "1":
        print(f"موجودی فعلی: {balance} تومان")
    elif choice == "2":
        amount = int(input("مبلغ واریز: "))
        if amount > 0:
            balance += amount
            print(f"واریز انجام شد. موجودی جدید: {balance} تومان")
        else:
            print("مبلغ باید مثبت باشد!")
    elif choice == "3":
        amount = int(input("مبلغ برداشت: "))
        if amount <= 0:
            print("مبلغ باید مثبت باشد!")
        elif amount > balance:
            print("موجودی کافی نیست!")
        else:
            balance -= amount
            print(f"برداشت انجام شد. موجودی جدید: {balance} تومان")
    elif choice == "4":
        print("خدانگهدار!")
        break
    else:
        print("گزینه نامعتبر!")`,
    solutionExplanation: 'یک مینی‌پروژه کامل و واقعی که منوی while True، اعتبارسنجی شرطی، مدیریت وضعیت (balance) و break را یکجا می‌سنجد.',
    language: 'python',
    engine: 'python',
  },
  {
    id: 'hw-1-1-10',
    number: 10,
    title: 'تشخیص عدد اول (Prime Number) با حلقه for و break',
    difficulty: 'challenging',
    bookPage: '۴۰ تا ۴۳',
    estimatedMinutes: 20,
    prompt:
      'یک عدد صحیح بزرگ‌تر از ۱ از کاربر بگیرید و بررسی کنید آیا عدد اول است یا خیر. به محض یافتن اولین مقسوم‌علیه (بین 2 تا n-1)، با break از حلقه خارج شوید تا برنامه سریع‌تر عمل کند.',
    sampleInput: `17`,
    sampleOutput: `عدد 17 یک عدد اول است.`,
    hint: 'متغیر پرچم is_prime = True تعریف کنید؛ اگر برای هر d در range(2, n) شرط n % d == 0 برقرار شد، is_prime = False گذاشته و break بزنید.',
    solutionCode: `n = int(input("یک عدد صحیح بزرگ‌تر از 1 وارد کنید: "))

if n <= 1:
    print(f"عدد {n} اول نیست.")
else:
    is_prime = True
    for d in range(2, n):
        if n % d == 0:
            is_prime = False
            print(f"مقسوم‌علیه پیدا شد: {d}")
            break
    if is_prime:
        print(f"عدد {n} یک عدد اول است.")
    else:
        print(f"عدد {n} اول نیست (مرکب است).")`,
    solutionExplanation: 'استفاده از متغیر پرچم (is_prime) و خروج زودهنگام با break برای بهینه‌سازی الگوریتم.',
    language: 'python',
    engine: 'python',
  },
  {
    id: 'hw-1-1-11',
    number: 11,
    title: 'صندوق فروشگاهی با ورود نامحدود کالا تا 0 و تخفیف پلکانی',
    difficulty: 'challenging',
    bookPage: '۲۹ و ۴۴',
    estimatedMinutes: 20,
    prompt:
      'قیمت کالاهای مشتری را یکی‌یکی در حلقه while بگیرید تا کاربر عدد 0 وارد کند (قیمت منفی را با continue نادیده بگیرید). در پایان تعداد کالا، جمع کل، درصد تخفیف (بالای ۱ میلیون ۱۵٪، بالای ۵۰۰ هزار ۱۰٪، وگرنه ۰٪) و مبلغ نهایی را چاپ کنید.',
    sampleInput: `350000
-5000
400000
0`,
    sampleOutput: `تعداد کالا: 2 | جمع کل: 750000 تومان
تخفیف (10٪): 75000 تومان | مبلغ نهایی: 675000 تومان`,
    hint: 'ابتدا price == 0 را با break چک کنید، سپس price < 0 را با continue رد کنید و در غیر این صورت به لیست prices اضافه نمایید.',
    solutionCode: `prices = []

while True:
    price = int(input("قیمت کالا به تومان (0 برای پایان): "))
    if price == 0:
        break
    if price < 0:
        print("قیمت منفی نادیده گرفته شد.")
        continue
    prices.append(price)

total = 0
for p in prices:
    total += p

if total >= 1000000:
    rate = 15
elif total >= 500000:
    rate = 10
else:
    rate = 0

discount = int(total * rate / 100)
final_price = total - discount

print(f"تعداد کالا: {len(prices)} | جمع کل: {total} تومان")
print(f"تخفیف ({rate}٪): {discount} تومان | مبلغ نهایی: {final_price} تومان")`,
    solutionExplanation: 'ادغام کامل تمام مهارت‌های واحد ۱.۱: حلقه while، break، continue، لیست، حلقه for و شرط پلکانی.',
    language: 'python',
    engine: 'python',
  },
  {
    id: 'hw-1-1-12',
    number: 12,
    title: 'حذف تکراری‌ها از لیست با حفظ ترتیب اولیه (بدون استفاده از set)',
    difficulty: 'challenging',
    bookPage: '۲۲ و ۴۰',
    estimatedMinutes: 15,
    prompt:
      'لیستی شامل اسامی تکراری دارید: ["قورمه", "کباب", "قورمه", "آش", "کباب", "فسنجان"]. تنها با دانش واحد ۱.۱ (لیست خالی، حلقه for و عملگر not in)، لیست جدید unique_foods را بدون اعضای تکراری و با حفظ دقیق ترتیب اولیه بسازید.',
    sampleOutput: `لیست اصلی: ['قورمه', 'کباب', 'قورمه', 'آش', 'کباب', 'فسنجان']
لیست بدون تکرار: ['قورمه', 'کباب', 'آش', 'فسنجان']`,
    hint: 'در هر دور حلقه چک کنید: if item not in unique_foods: unique_foods.append(item).',
    solutionCode: `raw_foods = ["قورمه", "کباب", "قورمه", "آش", "کباب", "فسنجان"]
unique_foods = []

for item in raw_foods:
    if item not in unique_foods:
        unique_foods.append(item)

print("لیست اصلی:", raw_foods)
print("لیست بدون تکرار:", unique_foods)`,
    solutionExplanation: 'این الگوریتم تمیز پیش‌درآمد فوق‌العاده‌ای برای درک مجموعه (set) در واحد ۱.۲ است و مزیت حفظ ترتیب در لیست را نشان می‌دهد.',
    language: 'python',
    engine: 'python',
  },
];

export const UNIT_1_1_QUICK_QUIZZES: QuickQuizQuestion[] = [
  {
    id: 'qq-1-1-01',
    kind: 'output',
    bookPage: '۱۵',
    question: 'اگر کاربر در پاسخ به input عدد 15 را وارد کند، خروجی کد زیر چیست؟',
    codeSnippet: `x = input("عدد: ")
print(x + x)`,
    language: 'python',
    options: ['30', '1515', 'خطای TypeError', '15 15'],
    correctIndex: 1,
    explanation:
      'تابع input() همیشه رشته (str) برمی‌گرداند؛ بنابراین x برابر "15" است و عملگر + دو رشته را به هم می‌چسباند و خروجی "1515" می‌شود!',
  },
  {
    id: 'qq-1-1-02',
    kind: 'output',
    bookPage: '۱۳',
    question: 'خروجی قطعه کد زیر دقیقاً چیست؟',
    codeSnippet: `print(17 // 5, 17 % 5, 2 ** 3)`,
    language: 'python',
    options: ['3.4 2 6', '3 2 8', '3 3 8', '4 2 6'],
    correctIndex: 1,
    explanation:
      'خارج‌قسمت صحیح 17 // 5 برابر 3، باقیمانده 17 % 5 برابر 2 و توان 2 ** 3 برابر 8 است.',
  },
  {
    id: 'qq-1-1-03',
    kind: 'concept',
    bookPage: '۱۰',
    question: 'کدام جفت از کلمات زیر در جدول صفحه ۱۰ کتاب به‌اشتباه به‌عنوان کلیدواژه پایتون چاپ شده بودند اما در واقع متعلق به جاوااسکریپت هستند؟',
    options: ['if و elif', 'var و const', 'True و False', 'break و continue'],
    correctIndex: 1,
    explanation:
      'در پایتون متغیرها بدون پیشوند تعریف می‌شوند و var و const کلیدواژه پایتون نیستند (مربوط به جاوااسکریپت هستند).',
  },
  {
    id: 'qq-1-1-04',
    kind: 'output',
    bookPage: '۱۹',
    question: 'پس از اجرای کد زیر، خروجی دقیق چیست؟ (مراقب تله صفحه ۱۹ کتاب باشید!)',
    codeSnippet: `fruits = ["سیب", "موز", "انار"]
fruits.insert(1, "کیوی")
print(fruits[1], fruits[-1])`,
    language: 'python',
    options: ['سیب انار', 'کیوی انار', 'موز کیوی', 'کیوی موز'],
    correctIndex: 1,
    explanation:
      'دستور insert(1, "کیوی") عنصر را در اندیس ۱ (جایگاه دوم) قرار می‌دهد، پس لیست می‌شود ["سیب", "کیوی", "موز", "انار"] و fruits[1] برابر "کیوی" و fruits[-1] برابر "انار" است.',
  },
  {
    id: 'qq-1-1-05',
    kind: 'output',
    bookPage: '۲۲',
    question: 'خروجی این کد کدام گزینه است؟',
    codeSnippet: `nums = [10, 20, 30, 40, 50]
print(nums[1:4])`,
    language: 'python',
    options: ['[10, 20, 30, 40]', '[20, 30, 40]', '[20, 30, 40, 50]', '[10, 20, 30]'],
    correctIndex: 1,
    explanation:
      'در برش [1:4] شروع از اندیس ۱ (مقدار 20) است و تا یک خانه قبل از اندیس ۴ (یعنی اندیس ۳ با مقدار 40) ادامه می‌یابد.',
  },
  {
    id: 'qq-1-1-06',
    kind: 'output',
    bookPage: '۳۱',
    question: 'خروجی قطعه کد زیر برای نمره 85 چیست؟',
    codeSnippet: `score = 85
if score >= 50:
    print("A")
elif score >= 80:
    print("B")
else:
    print("C")`,
    language: 'python',
    options: ['B', 'A و B هر دو', 'فقط A', 'C'],
    correctIndex: 2,
    explanation:
      'چون اولین شرط (score >= 50) برای عدد 85 درست است، فقط شاخه اول ("A") اجرا می‌شود و پایتون اصلاً سراغ elif بعدی نمی‌رود! (درس مهم ترتیب بازه‌ها).',
  },
  {
    id: 'qq-1-1-07',
    kind: 'output',
    bookPage: '۳۶',
    question: 'این حلقه دقیقاً چه اعدادی را چاپ می‌کند؟',
    codeSnippet: `for i in range(1, 8, 2):
    print(i, end=" ")`,
    language: 'python',
    options: ['1 3 5 7', '1 2 3 4 5 6 7', '1 3 5 7 9', '2 4 6 8'],
    correctIndex: 0,
    explanation:
      'شروع از 1 با گام 2 تا قبل از 8، دقیقاً اعداد فرد 1، 3، 5 و 7 را تولید می‌کند.',
  },
  {
    id: 'qq-1-1-08',
    kind: 'output',
    bookPage: '۴۲ تا ۴۳',
    question: 'خروجی حلقه زیر با دستور continue و break چیست؟',
    codeSnippet: `for x in range(1, 6):
    if x == 2:
        continue
    if x == 4:
        break
    print(x, end=" ")`,
    language: 'python',
    options: ['1 2 3', '1 3', '1 3 4', '1 3 5'],
    correctIndex: 1,
    explanation:
      'عدد 1 چاپ می‌شود؛ عدد 2 با continue رد می‌شود؛ عدد 3 چاپ می‌شود؛ و در عدد 4 دستور break کل حلقه را متوقف می‌کند. پس فقط "1 3" چاپ می‌شود!',
  },
  {
    id: 'qq-1-1-09',
    kind: 'bug-spot',
    bookPage: '۲۰',
    question: 'چرا کد زیر به‌جای لیست نهایی، کلمه None چاپ می‌کند؟',
    codeSnippet: `items = ["کتاب", "دفتر"]
items = items.append("خودکار")
print(items)`,
    language: 'python',
    options: [
      'چون متد append لیست را درجا تغییر می‌دهد و خروجی آن None است',
      'چون لیست نمی‌تواند رشته فارسی نگه دارد',
      'چون باید به‌جای append از insert استفاده می‌کردیم',
      'چون print نمی‌تواند لیست چاپ کند',
    ],
    correctIndex: 0,
    explanation:
      'متد append() لیست اصلی را مستقیماً ویرایش می‌کند و مقدار None برمی‌گرداند؛ وقتی نتیجه را دوباره در items می‌ریزیم، لیست قبلی از بین رفته و items برابر None می‌شود!',
  },
  {
    id: 'qq-1-1-10',
    kind: 'concept',
    bookPage: '۱۷',
    question: 'خروجی عبارت bool("False") در پایتون کدام است و چرا؟',
    options: [
      'False، چون متن داخل آن کلمه False است',
      'True، چون هر رشته غیرخالی در پایتون True ارزیابی می‌شود',
      'خطای ValueError می‌دهد',
      'None برمی‌گرداند',
    ],
    correctIndex: 1,
    explanation:
      'در پایتون فقط رشته کاملاً خالی ("") مقدار بولی False دارد؛ رشته "False" دارای ۵ کاراکتر است و غیرخالی محسوب می‌شود، پس bool("False") برابر True است!',
  },
];
