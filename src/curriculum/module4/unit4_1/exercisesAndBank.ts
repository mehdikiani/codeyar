import type {
  ClassroomActivity,
  HomeworkAssignment,
  QuickQuizQuestion,
} from '../../../types/curriculum.ts';

export const UNIT_4_1_ACTIVITIES: ClassroomActivity[] = [
  {
    id: 'act-4-1-gaming',
    kind: 'workshop',
    title: 'کارگاه ساخت کلاس فرزند GamingPhone با super()',
    bookPage: '۲۴۸',
    estimatedMinutes: 15,
    prompt:
      'کلاس GamingPhone را از SmartPhone ارث‌بری کنید که ویژگی cooling (سیستم خنک‌کننده) را بگیرد و متد boost_fps() را اجرا کند.',
    steps: [
      'کلاس GamingPhone(SmartPhone) را تعریف کنید.',
      'در __init__ ابتدا super().__init__(brand, model, os_name) را صدا بزنید و self.cooling را تنظیم کنید.',
      'متد boost_fps() را بنویسید و یک نمونه بسازید.',
    ],
    hints: ['در super().__init__ نیازی به نوشتن self نیست.'],
    language: 'python',
    engine: 'python',
    starterCode: `class SmartPhone:
    def __init__(self, brand, model, os_name):
        self.brand = brand
        self.model = model
        self.os_name = os_name

# کلاس GamingPhone را اینجا تکمیل کنید:
`,
    solutionCode: `class SmartPhone:
    def __init__(self, brand, model, os_name):
        self.brand = brand
        self.model = model
        self.os_name = os_name

class GamingPhone(SmartPhone):
    def __init__(self, brand, model, os_name, cooling):
        super().__init__(brand, model, os_name)
        self.cooling = cooling

    def boost_fps(self):
        print(f"{self.brand} {self.model} با خنک‌کننده {self.cooling} در حالت 120FPS فعال شد!")

gp = GamingPhone("ASUS", "ROG 8", "Android", "فن مایع")
gp.boost_fps()`,
    solutionExplanation: 'کلاس فرزند با super() ویژگی‌های والد را مقداردهی کرده و قابلیت اختصاصی خود را می‌افزاید.',
    alternativeSolutionCode: `class SmartPhone:
    def __init__(self, brand, model, os_name):
        self.brand = brand
        self.model = model
        self.os_name = os_name

    def info(self):
        return f"{self.brand} {self.model} ({self.os_name})"

class GamingPhone(SmartPhone):
    def __init__(self, brand, model, os_name, cooling="محفظه بخار"):
        super().__init__(brand, model, os_name)
        self.cooling = cooling

    def info(self):
        return f"{super().info()} | خنک‌کننده: {self.cooling}"

gp = GamingPhone("RedMagic", "9 Pro", "Android")
print(gp.info())`,
    alternativeSolutionExplanation: 'در این نسخه علاوه بر مقدار پیش‌فرض برای cooling، متد info والد نیز با super().info() بازنویسی شده است.',
  },
  {
    id: 'act-4-1-book-class',
    kind: 'activity',
    title: 'مدل‌سازی کلاس Book برای فروشگاه «مرجع نو»',
    bookPage: '۲۳۸',
    estimatedMinutes: 12,
    prompt:
      'کلاس Book را با ویژگی‌های title، author و price بسازید و متد apply_discount(percent) اضافه کنید که قیمت کتاب را به اندازه درصد داده‌شده کاهش دهد.',
    steps: [
      'سازنده __init__(self, title, author, price) را بنویسید.',
      'در متد apply_discount قیمت جدید را محاسبه و در self.price ذخیره کنید.',
      'قبل و بعد از تخفیف قیمت را چاپ کنید.',
    ],
    hints: ['فرمول کاهش قیمت: self.price = int(self.price * (100 - percent) / 100)'],
    language: 'python',
    engine: 'python',
    starterCode: `class Book:
    # سازنده و متد apply_discount را بنویسید:
    pass
`,
    solutionCode: `class Book:
    def __init__(self, title, author, price):
        self.title = title
        self.author = author
        self.price = price

    def apply_discount(self, percent):
        if percent > 0 and percent <= 50:
            self.price = int(self.price * (100 - percent) / 100)

    def show(self):
        print(f"کتاب «{self.title}» اثر {self.author} | قیمت: {self.price} تومان")

b = Book("طراح سایت یازدهم", "دفتر تألیف", 50000)
b.show()
b.apply_discount(20)
b.show()`,
    solutionExplanation: 'متد apply_discount علاوه بر اعمال تخفیف، سقف ۵۰ درصدی را نیز کنترل می‌کند.',
    alternativeSolutionCode: `class Book:
    def __init__(self, title, price):
        self.title = title
        self.price = price

    def discounted_price(self, percent):
        return int(self.price * (100 - percent) / 100)

b = Book("طراح سایت", 50000)
print("قیمت اصلی:", b.price, "| با ۲۰٪ تخفیف:", b.discounted_price(20))`,
    alternativeSolutionExplanation: 'این روش بدون تغییر دادن قیمت اصلی کتاب، صرفاً قیمت تخفیف‌خورده را محاسبه و برمی‌گرداند.',
  },
  {
    id: 'act-4-1-battery-enc',
    kind: 'workshop',
    title: 'کارگاه کپسوله‌سازی باتری با Getter و Setter ایمن',
    bookPage: '۲۵۰–۲۵۱',
    estimatedMinutes: 15,
    prompt:
      'کلاس PowerBank را با ویژگی خصوصی __charge (پیش‌فرض 100) بسازید؛ متد use(amount) را طوری بنویسید که اجازه منفی شدن شارژ را ندهد و متد get_charge() مقدار را برگرداند.',
    steps: [
      'ویژگی self.__charge = 100 را بدون فاصله بین دو زیرخط تعریف کنید.',
      'در use(amount) بررسی کنید amount <= self.__charge باشد.',
      'خروجی را با دو فراخوانی معتبر و نامعتبر تست کنید.',
    ],
    hints: ['از self.__charge داخل متدها استفاده کنید و بیرون کلاس فقط get_charge() را صدا بزنید.'],
    language: 'python',
    engine: 'python',
    starterCode: `class PowerBank:
    def __init__(self, brand):
        self.brand = brand
        # ویژگی خصوصی __charge و متدها را تکمیل کنید
`,
    solutionCode: `class PowerBank:
    def __init__(self, brand):
        self.brand = brand
        self.__charge = 100

    def get_charge(self):
        return self.__charge

    def use(self, amount):
        if amount <= 0:
            print("مقدار مصرف نامعتبر است.")
        elif amount > self.__charge:
            print("شارژ پاوربانک کافی نیست!")
        else:
            self.__charge -= amount
            print(f"{amount}% مصرف شد. باقی‌مانده: {self.__charge}%")

pb = PowerBank("Anker")
pb.use(35)
pb.use(80)
print("شارژ نهایی:", pb.get_charge(), "%")`,
    solutionExplanation: 'کپسوله‌سازی __charge همراه با بررسی شرط در use از خراب شدن وضعیت داخلی شیء جلوگیری می‌کند.',
    alternativeSolutionCode: `class PowerBank:
    def __init__(self, brand, charge=100):
        self.brand = brand
        self.__charge = charge

    def set_charge(self, val):
        if val >= 0 and val <= 100:
            self.__charge = val

    def get_charge(self):
        return self.__charge

pb = PowerBank("Xiaomi", 80)
pb.set_charge(150)
pb.set_charge(45)
print(pb.brand, "=>", pb.get_charge(), "%")`,
    alternativeSolutionExplanation: 'استفاده از الگوی کلاسیک Getter/Setter برای کنترل مستقیم بازه ۰ تا ۱۰۰.',
  },
  {
    id: 'act-4-1-animals-poly',
    kind: 'activity',
    title: 'تمرین چندریختی با وسایل نقلیه (Vehicle / Car / Bicycle)',
    bookPage: '۲۴۹',
    estimatedMinutes: 12,
    prompt:
      'کلاس والد Vehicle با متد move() و دو کلاس فرزند Car و Bicycle با بازنویسی متد move() بسازید و همه را در یک لیست پیمایش و اجرا کنید.',
    steps: [
      'کلاس Vehicle و متد move(self) را تعریف کنید.',
      'دو کلاس فرزند را با بازنویسی move() بسازید.',
      'در یک حلقه for روی لیست وسایل، move() را صدا بزنید.',
    ],
    hints: ['نام متد در همه کلاس‌ها باید دقیقاً move باشد تا چندریختی برقرار شود.'],
    language: 'python',
    engine: 'python',
    starterCode: `class Vehicle:
    def __init__(self, name):
        self.name = name
    def move(self):
        print(f"{self.name} در حال حرکت است.")

# کلاس‌های Car و Bicycle را اضافه و در یک حلقه اجرا کنید:
`,
    solutionCode: `class Vehicle:
    def __init__(self, name):
        self.name = name
    def move(self):
        print(f"{self.name} در حال حرکت است.")

class Car(Vehicle):
    def move(self):
        print(f"خودروی {self.name} با موتور روی جاده می‌راند.")

class Bicycle(Vehicle):
    def move(self):
        print(f"دوچرخه {self.name} با رکاب زدن حرکت می‌کند.")

fleet = [Car("دنا"), Bicycle("ویوا"), Vehicle("قطار")]
for v in fleet:
    v.move()`,
    solutionExplanation: 'هر شیء در حلقه متد move مخصوص به کلاس خودش را اجرا می‌کند.',
    alternativeSolutionCode: `def start_trip(vehicle):
    print("--- شروع سفر ---")
    vehicle.move()

class Car:
    def __init__(self, name):
        self.name = name
    def move(self):
        print(f"حرکت سریع {self.name}")

class Boat:
    def __init__(self, name):
        self.name = name
    def move(self):
        print(f"حرکت روی آب با {self.name}")

start_trip(Car("تارا"))
start_trip(Boat("قایق تندرو"))`,
    alternativeSolutionExplanation: 'در پایتون حتی بدون والد مشترک (Duck Typing)، هر شیئی که متد move() داشته باشد با تابع start_trip کار می‌کند.',
  },
  {
    id: 'act-4-1-student-grades',
    kind: 'workshop',
    title: 'کلاس Student با لیست نمرات و محاسبه معدل',
    bookPage: '۲۴۳',
    estimatedMinutes: 15,
    prompt:
      'کلاس Student را طوری طراحی کنید که نام هنرجو و لیست خالی نمرات را در __init__ بسازد و دو متد add_score(s) (فقط نمره ۰ تا ۲۰) و average() داشته باشد.',
    steps: [
      'در __init__ لیست self.scores = [] را بسازید.',
      'در add_score بررسی کنید نمره بین ۰ تا ۲۰ باشد.',
      'در average() حالت لیست خالی را چک کرده و میانگین را برگردانید.',
    ],
    hints: ['اگر len(self.scores) == 0 بود، مقدار 0 برگردانید تا خطای تقسیم بر صفر رخ ندهد.'],
    language: 'python',
    engine: 'python',
    starterCode: `class Student:
    def __init__(self, name):
        self.name = name
        self.scores = []
    # متدهای add_score و average را بنویسید
`,
    solutionCode: `class Student:
    def __init__(self, name):
        self.name = name
        self.scores = []

    def add_score(self, s):
        if s >= 0 and s <= 20:
            self.scores.append(s)
        else:
            print(f"نمره {s} نامعتبر است!")

    def average(self):
        if len(self.scores) == 0:
            return 0
        return round(sum(self.scores) / len(self.scores), 2)

st = Student("امیرحسین")
st.add_score(18.5)
st.add_score(20)
st.add_score(25)
st.add_score(17.5)
print(f"معدل {st.name}: {st.average()}")`,
    solutionExplanation: 'بررسی لیست خالی در average() و اعتبارسنجی بازه ۰ تا ۲۰ در add_score() کلاس را کاملاً مقاوم می‌کند.',
    alternativeSolutionCode: `class Student:
    def __init__(self, name, scores=None):
        self.name = name
        self.scores = list(scores) if scores is not None else []

    def report(self):
        avg = round(sum(self.scores) / len(self.scores), 2) if self.scores else 0
        print(f"{self.name} | تعداد نمره: {len(self.scores)} | معدل: {avg}")

Student("زهرا", [19, 18.5, 20]).report()`,
    alternativeSolutionExplanation: 'پشتیبانی از ارسال لیست نمرات اولیه به‌صورت اختیاری در سازنده بدون افتادن در تله لیست پیش‌فرض اشتراکی.',
  },
  {
    id: 'act-4-1-curiosity-meta',
    kind: 'curiosity',
    title: 'کنجکاوی متاکلاس: آیا تابع و عدد و کلاس همه شیء هستند؟',
    bookPage: '۲۳۴ و ۲۵۲',
    estimatedMinutes: 10,
    prompt:
      'با تابع type() نوع یک عدد، یک رشته، کلاس str، کلاس سفارشی خودتان و یک نمونه از آن را چاپ کنید و نتیجه را تحلیل کنید.',
    steps: [
      'کلاس ساده‌ای به نام Device تعریف کنید.',
      'type(10)، type("hi")، type(str)، type(Device) و type(Device()) را چاپ کنید.',
    ],
    hints: ['هر چیزی که خودش کلاس باشد، خروجی type(...) آن برابر <class \'type\'> است.'],
    language: 'python',
    engine: 'python',
    starterCode: `class Device:
    pass

# خروجی type را برای مقادیر مختلف چاپ کنید:
`,
    solutionCode: `class Device:
    pass

d = Device()
print("type(10):", type(10))
print("type(int):", type(int))
print("type(d):", type(d))
print("type(Device):", type(Device))
print("آیا d از نوع Device است؟", isinstance(d, Device))`,
    solutionExplanation: 'هم int و هم Device هر دو توسط متاکلاس داخلی type ساخته شده‌اند.',
    alternativeSolutionCode: `class Device:
    pass

for item in [10, "سلام", [1, 2], Device()]:
    cls = type(item)
    print(f"مقدار: {item} | کلاس: {cls} | متاکلاس: {type(cls)}")`,
    alternativeSolutionExplanation: 'نمایش حلقه سه‌سطحی (مقدار ⟶ کلاس ⟶ متاکلاس) برای هر نوع داده در پایتون.',
  },
  {
    id: 'act-4-1-school-roles',
    kind: 'project',
    title: 'پروژه سیستم مدیریت هنرستان (Person ← Student و Teacher)',
    bookPage: '۲۴۸–۲۵۱',
    estimatedMinutes: 20,
    prompt:
      'کلاس والد Person (با نام و کد ملی خصوصی __national_id) و دو کلاس فرزند Student (پایه تحصیلی) و Teacher (نام درس) را با بازنویسی introduce() پیاده‌سازی کنید.',
    steps: [
      'کلاس Person را با self.__national_id و متد get_masked_id() (نمایش ۴ رقم آخر) بسازید.',
      'Student و Teacher را با super().__init__() ارث‌بری کنید.',
      'متد introduce() را در هر دو بازنویسی کرده و در یک حلقه اجرا کنید.',
    ],
    hints: ['برای نمایش امن ۴ رقم آخر کد ملی می‌توانید از self.__national_id[-4:] استفاده کنید.'],
    language: 'python',
    engine: 'python',
    starterCode: `class Person:
    def __init__(self, name, national_id):
        self.name = name
        self.__national_id = national_id
    # متدها و کلاس‌های فرزند را تکمیل کنید
`,
    solutionCode: `class Person:
    def __init__(self, name, national_id):
        self.name = name
        self.__national_id = national_id

    def masked_id(self):
        return "***" + self.__national_id[-4:]

    def introduce(self):
        print(f"عضو هنرستان: {self.name} ({self.masked_id()})")

class Student(Person):
    def __init__(self, name, national_id, grade):
        super().__init__(name, national_id)
        self.grade = grade

    def introduce(self):
        print(f"هنرجو {self.name} | پایه {self.grade} | کد: {self.masked_id()}")

class Teacher(Person):
    def __init__(self, name, national_id, subject):
        super().__init__(name, national_id)
        self.subject = subject

    def introduce(self):
        print(f"هنرآموز {self.name} | درس: {self.subject} | کد: {self.masked_id()}")

members = [
    Student("آرمان کریمی", "0012345678", "یازدهم"),
    Teacher("مهندس احمدی", "0098765432", "طراح سایت")
]
for m in members:
    m.introduce()`,
    solutionExplanation: 'این پروژه هم‌زمان کپسوله‌سازی، وراثت، super()، بازنویسی متد و چندریختی را در یک سناریوی واقعی مدرسه تمرین می‌دهد.',
    alternativeSolutionCode: `class Person:
    def __init__(self, name, role):
        self.name = name
        self.role = role

    def __str__(self):
        return f"[{self.role}] {self.name}"

for p in [Person("آرمان", "هنرجو"), Person("احمدی", "هنرآموز")]:
    print(p)`,
    alternativeSolutionExplanation: 'مدل ساده‌شده با بازنویسی __str__ زمانی که رفتار نقش‌ها تفاوت زیادی ندارد.',
  },
  {
    id: 'act-4-1-bank-enc',
    kind: 'workshop',
    title: 'شبیه‌ساز حساب پس‌انداز (Account ← SavingsAccount با سود)',
    bookPage: '۲۵۰–۲۵۱',
    estimatedMinutes: 15,
    prompt:
      'کلاس Account با ویژگی خصوصی __balance و کلاس فرزند SavingsAccount با متد add_interest(rate) بسازید که سود را با متد deposit والد به حساب اضافه کند.',
    steps: [
      'کلاس Account را با deposit و get_balance بنویسید.',
      'در SavingsAccount متد add_interest(rate) را بسازید و از self.get_balance() و self.deposit() استفاده کنید.',
    ],
    hints: ['چون __balance خصوصی است، فرزند از طریق متدهای عمومی والد روی آن کار می‌کند.'],
    language: 'python',
    engine: 'python',
    starterCode: `class Account:
    def __init__(self, owner, balance=0):
        self.owner = owner
        self.__balance = balance

    def deposit(self, amount):
        if amount > 0:
            self.__balance += amount

    def get_balance(self):
        return self.__balance

# کلاس SavingsAccount را تکمیل کنید:
`,
    solutionCode: `class Account:
    def __init__(self, owner, balance=0):
        self.owner = owner
        self.__balance = balance

    def deposit(self, amount):
        if amount > 0:
            self.__balance += amount

    def get_balance(self):
        return self.__balance

class SavingsAccount(Account):
    def add_interest(self, rate):
        profit = int(self.get_balance() * rate / 100)
        self.deposit(profit)
        print(f"سود {rate}% ({profit} تومان) به حساب {self.owner} واریز شد.")

sa = SavingsAccount("فاطمه", 1000000)
sa.add_interest(15)
print("موجودی نهایی:", sa.get_balance(), "تومان")`,
    solutionExplanation: 'کلاس فرزند بدون شکستن کپسوله‌سازی والد، از رابط امن get_balance و deposit استفاده کرده است.',
    alternativeSolutionCode: `class Account:
    def __init__(self, owner, balance=0):
        self.owner = owner
        self._balance = balance  # محافظت‌شده برای دسترسی فرزندان

class SavingsAccount(Account):
    def add_interest(self, rate):
        self._balance += int(self._balance * rate / 100)

sa = SavingsAccount("فاطمه", 1000000)
sa.add_interest(15)
print("موجودی:", sa._balance)`,
    alternativeSolutionExplanation: 'در این نسخه از ویژگی محافظت‌شده _balance (تک‌زیرخط) استفاده شده تا کلاس‌های فرزند دسترسی مستقیم اما کنترل‌شده داشته باشند.',
  },
];

export const UNIT_4_1_HOMEWORKS: HomeworkAssignment[] = [
  {
    id: 'hw-4-1-01',
    number: 1,
    title: 'ساخت کلاس Rectangle برای مساحت و محیط',
    difficulty: 'easy',
    bookPage: '۲۳۸',
    estimatedMinutes: 10,
    prompt: 'کلاس Rectangle را با ویژگی‌های width و height و دو متد area() و perimeter() بسازید و برای مستطیل ۵ در ۸ چاپ کنید.',
    sampleOutput: 'مساحت: 40 | محیط: 26',
    hint: 'در متدها از self.width و self.height استفاده کنید.',
    solutionCode: `class Rectangle:
    def __init__(self, width, height):
        self.width = width
        self.height = height

    def area(self):
        return self.width * self.height

    def perimeter(self):
        return 2 * (self.width + self.height)

r = Rectangle(5, 8)
print(f"مساحت: {r.area()} | محیط: {r.perimeter()}")`,
    solutionExplanation: 'متدهای محاسباتی مقادیر را با return برمی‌گردانند.',
    language: 'python',
    engine: 'python',
  },
  {
    id: 'hw-4-1-02',
    number: 2,
    title: 'کلاس Laptop با ویژگی پیش‌فرض RAM',
    difficulty: 'easy',
    bookPage: '۲۳۹',
    estimatedMinutes: 10,
    prompt: 'کلاس Laptop را با ویژگی‌های brand، cpu و ram=16 بسازید و متد upgrade_ram(extra) بنویسید که مقدار رم را افزایش دهد.',
    sampleOutput: 'ASUS (i7) - RAM: 32GB',
    hint: 'در upgrade_ram مقدار self.ram += extra را اعمال کنید.',
    solutionCode: `class Laptop:
    def __init__(self, brand, cpu, ram=16):
        self.brand = brand
        self.cpu = cpu
        self.ram = ram

    def upgrade_ram(self, extra):
        if extra > 0:
            self.ram += extra

    def info(self):
        print(f"{self.brand} ({self.cpu}) - RAM: {self.ram}GB")

lp = Laptop("ASUS", "i7")
lp.upgrade_ram(16)
lp.info()`,
    solutionExplanation: 'پارامتر پیش‌فرض ram=16 و متد تغییر وضعیت upgrade_ram.',
    language: 'python',
    engine: 'python',
  },
  {
    id: 'hw-4-1-03',
    number: 3,
    title: 'شمارنده هوشمند با کلاس Counter',
    difficulty: 'easy',
    bookPage: '۲۴۲',
    estimatedMinutes: 10,
    prompt: 'کلاس Counter را با مقدار اولیه count=0 و متدهای inc()، dec() (بدون منفی شدن) و reset() پیاده‌سازی کنید.',
    sampleOutput: 'مقدار فعلی: 2 | پس از بازنشانی: 0',
    hint: 'در dec() شرط if self.count > 0 بگذارید.',
    solutionCode: `class Counter:
    def __init__(self):
        self.count = 0

    def inc(self):
        self.count += 1

    def dec(self):
        if self.count > 0:
            self.count -= 1

    def reset(self):
        self.count = 0

c = Counter()
c.inc()
c.inc()
c.inc()
c.dec()
print("مقدار فعلی:", c.count)
c.reset()
print("پس از بازنشانی:", c.count)`,
    solutionExplanation: 'نگهداری وضعیت شمارنده داخل شیء و محافظت از منفی شدن آن.',
    language: 'python',
    engine: 'python',
  },
  {
    id: 'hw-4-1-04',
    number: 4,
    title: 'ویژگی کلاس: شمارش کل بلیت‌های فروخته‌شده',
    difficulty: 'easy',
    bookPage: '۲۴۴',
    estimatedMinutes: 12,
    prompt: 'کلاس Ticket را با ویژگی کلاس sold_count = 0 بسازید تا هر بار شیء جدیدی ساخته می‌شود شمارنده کل ۱ واحد افزایش یابد.',
    sampleOutput: 'تعداد بلیت‌های صادرشده: 3',
    hint: 'در __init__ بنویسید Ticket.sold_count += 1.',
    solutionCode: `class Ticket:
    sold_count = 0

    def __init__(self, passenger):
        self.passenger = passenger
        Ticket.sold_count += 1

t1 = Ticket("علی")
t2 = Ticket("مریم")
t3 = Ticket("رضا")
print("تعداد بلیت‌های صادرشده:", Ticket.sold_count)`,
    solutionExplanation: 'ویژگی کلاس sold_count در سطح کل کلاس ذخیره می‌شود و بین همه نمونه‌ها مشترک است.',
    language: 'python',
    engine: 'python',
  },
  {
    id: 'hw-4-1-05',
    number: 5,
    title: 'وراثت کارمند و مدیر (Employee ← Manager)',
    difficulty: 'medium',
    bookPage: '۲۴۶',
    estimatedMinutes: 15,
    prompt: 'کلاس Employee (name و base_salary) و کلاس فرزند Manager (با ویژگی bonus) بسازید؛ متد total_salary() را در Manager بازنویسی کنید تا حقوق پایه + پاداش را برگرداند.',
    sampleOutput: 'حقوق کل مدیر: 25000000 تومان',
    hint: 'در Manager با super().__init__(name, base_salary) والد را مقداردهی کنید.',
    solutionCode: `class Employee:
    def __init__(self, name, base_salary):
        self.name = name
        self.base_salary = base_salary

    def total_salary(self):
        return self.base_salary

class Manager(Employee):
    def __init__(self, name, base_salary, bonus):
        super().__init__(name, base_salary)
        self.bonus = bonus

    def total_salary(self):
        return super().total_salary() + self.bonus

m = Manager("مهندس رضایی", 20000000, 5000000)
print(f"حقوق کل {m.name}: {m.total_salary()} تومان")`,
    solutionExplanation: 'استفاده از super() هم در سازنده و هم در بازنویسی متد total_salary().',
    language: 'python',
    engine: 'python',
  },
  {
    id: 'hw-4-1-06',
    number: 6,
    title: 'کپسوله‌سازی دمای کولر هوشمند (۱۶ تا ۳۰ درجه)',
    difficulty: 'medium',
    bookPage: '۲۵۰–۲۵۱',
    estimatedMinutes: 15,
    prompt: 'کلاس SmartAC با ویژگی خصوصی __temp (پیش‌فرض 24) و متدهای set_temp و get_temp بسازید که فقط دمای بین ۱۶ تا ۳۰ درجه را بپذیرد.',
    sampleOutput: 'دمای تنظیم‌شده: 21 درجه',
    hint: 'شرط مجاز: value >= 16 and value <= 30.',
    solutionCode: `class SmartAC:
    def __init__(self):
        self.__temp = 24

    def get_temp(self):
        return self.__temp

    def set_temp(self, value):
        if value >= 16 and value <= 30:
            self.__temp = value
        else:
            print(f"دمای {value} خارج از بازه مجاز ۱۶ تا ۳۰ است!")

ac = SmartAC()
ac.set_temp(10)
ac.set_temp(21)
print("دمای تنظیم‌شده:", ac.get_temp(), "درجه")`,
    solutionExplanation: 'کپسوله‌سازی مانع تنظیم دمای غیرایمن برای دستگاه می‌شود.',
    language: 'python',
    engine: 'python',
  },
  {
    id: 'hw-4-1-07',
    number: 7,
    title: 'چندریختی در محاسبه مساحت اشکال هندسی',
    difficulty: 'medium',
    bookPage: '۲۴۹',
    estimatedMinutes: 15,
    prompt: 'کلاس والد Shape و دو فرزند Square (ضلع) و Circle (شعاع، با pi=3.14) با متد مشترک area() بسازید و مساحت کل اشکال یک لیست را محاسبه کنید.',
    sampleOutput: 'مساحت کل اشکال: 94.5',
    hint: 'مساحت دایره برابر 3.14 * r * r و مربع برابر side * side است.',
    solutionCode: `class Shape:
    def area(self):
        return 0

class Square(Shape):
    def __init__(self, side):
        self.side = side
    def area(self):
        return self.side * self.side

class Circle(Shape):
    def __init__(self, radius):
        self.radius = radius
    def area(self):
        return round(3.14 * self.radius * self.radius, 2)

shapes = [Square(4), Circle(5)]
total_area = 0
for sh in shapes:
    total_area += sh.area()
print("مساحت کل اشکال:", total_area)`,
    solutionExplanation: 'حلقه بدون نیاز به دانستن نوع شکل، فقط متد area() را صدا می‌زند.',
    language: 'python',
    engine: 'python',
  },
  {
    id: 'hw-4-1-08',
    number: 8,
    title: 'آزمون متاکلاس و isinstance روی سلسله‌مراتب سه‌سطحی',
    difficulty: 'medium',
    bookPage: '۲۵۲',
    estimatedMinutes: 12,
    prompt: 'کلاس‌های Device ← Tablet ← ProTablet را تعریف کنید؛ یک نمونه از ProTablet بسازید و type نمونه، متاکلاس کلاس و نتیجه isinstance با هر سه کلاس را چاپ کنید.',
    sampleOutput: 'متاکلاس: <class \'type\'> | هر سه isinstance برابر True',
    hint: 'type(ProTablet) متاکلاس سازنده کلاس را چاپ می‌کند.',
    solutionCode: `class Device:
    pass
class Tablet(Device):
    pass
class ProTablet(Tablet):
    pass

pt = ProTablet()
print("نوع نمونه:", type(pt))
print("متاکلاس ProTablet:", type(ProTablet))
print("isinstance Device:", isinstance(pt, Device))
print("isinstance Tablet:", isinstance(pt, Tablet))`,
    solutionExplanation: 'پوشش کامل معیار ۵ جدول ارزشیابی واحد ۴.۱.',
    language: 'python',
    engine: 'python',
  },
  {
    id: 'hw-4-1-09',
    number: 9,
    title: 'سیستم کتابخانه با کلاس‌های Book و Library (امانت و بازگشت)',
    difficulty: 'challenging',
    bookPage: '۲۴۵–۲۵۱',
    estimatedMinutes: 20,
    prompt: 'کلاس Book با وضعیت خصوصی __available=True و متدهای borrow() و return_book() بسازید؛ اگر کتابی قبلاً امانت رفته بود پیام هشدار دهد.',
    sampleOutput: 'امانت موفق، هشدار امانت تکراری و بازگشت موفق',
    hint: 'دو متد borrow و return_book وضعیت __available را بین True و False تغییر می‌دهند.',
    solutionCode: `class Book:
    def __init__(self, title):
        self.title = title
        self.__available = True

    def borrow(self):
        if self.__available:
            self.__available = False
            print(f"کتاب «{self.title}» با موفقیت امانت داده شد.")
        else:
            print(f"کتاب «{self.title}» در حال حاضر در امانت است!")

    def return_book(self):
        self.__available = True
        print(f"کتاب «{self.title}» به کتابخانه بازگردانده شد.")

b = Book("طراح سایت ۱۴۰۵")
b.borrow()
b.borrow()
b.return_book()
b.borrow()`,
    solutionExplanation: 'مدیریت ماشین حالت ساده (موجود / امانت‌رفته) با ویژگی خصوصی.',
    language: 'python',
    engine: 'python',
  },
  {
    id: 'hw-4-1-10',
    number: 10,
    title: 'سبد خرید شیءگرا با کلاس CartItem و ShoppingCart',
    difficulty: 'challenging',
    bookPage: '۲۴۸–۲۵۲',
    estimatedMinutes: 22,
    prompt: 'کلاس CartItem (نام، قیمت، تعداد) و کلاس ShoppingCart (لیست آیتم‌ها، متد add_item و total_price) را پیاده‌سازی کنید و فاکتور نهایی را چاپ کنید.',
    sampleOutput: 'جمع کل سبد خرید: 128000 تومان',
    hint: 'در ShoppingCart می‌توانید با isinstance(item, CartItem) فقط اشیای معتبر را بپذیرید.',
    solutionCode: `class CartItem:
    def __init__(self, title, price, qty=1):
        self.title = title
        self.price = price
        self.qty = qty

    def subtotal(self):
        return self.price * self.qty

class ShoppingCart:
    def __init__(self):
        self.items = []

    def add_item(self, item):
        if isinstance(item, CartItem):
            self.items.append(item)

    def total_price(self):
        total = 0
        for item in self.items:
            total += item.subtotal()
        return total

cart = ShoppingCart()
cart.add_item(CartItem("طراح سایت", 45000, 2))
cart.add_item(CartItem("تولید محتوا", 38000, 1))
print("جمع کل سبد خرید:", cart.total_price(), "تومان")`,
    solutionExplanation: 'ترکیب دو کلاس (Composition) به همراه بررسی ایمن نوع با isinstance().',
    language: 'python',
    engine: 'python',
  },
];

export const UNIT_4_1_QUIZZES: QuickQuizQuestion[] = [
  {
    id: 'quiz-4-1-01',
    kind: 'concept',
    question: 'نقش پارامتر self در متدهای یک کلاس پایتون چیست؟',
    options: [
      'یک متغیر سراسری مشترک بین کل فایل است',
      'به همان نمونه (شیء) فعلی اشاره می‌کند تا ویژگی‌های هر شیء مستقل بماند',
      'فقط برای چاپ در ترمینال استفاده می‌شود',
      'معادل کلیدواژه new در جاوااسکریپت است',
    ],
    correctIndex: 1,
    explanation: 'self مرجع شیء جاری است و پایتون هنگام فراخوانی متد، آن را خودکار به عنوان آرگومان اول ارسال می‌کند.',
    bookPage: '۲۳۷',
  },
  {
    id: 'quiz-4-1-02',
    kind: 'bug-spot',
    question: 'کدام خط زیر حاوی باگ تایپی واقعی صفحه ۲۵۰ کتاب درسی است؟',
    codeSnippet: `class Mobile:\n    def __init__(self):\n        self._ _battery = 100`,
    language: 'python',
    options: [
      'نام کلاس باید با حرف کوچک باشد',
      'بین دو زیرخط در _ _battery فاصله افتاده و باید __battery چسبیده باشد',
      'عدد 100 باید رشته باشد',
      'متد __init__ نباید self داشته باشد',
    ],
    correctIndex: 1,
    explanation: 'برای تعریف ویژگی خصوصی در پایتون دو زیرخط باید کاملاً چسبیده باشند (self.__battery).',
    bookPage: '۲۵۰',
  },
  {
    id: 'quiz-4-1-03',
    kind: 'output',
    question: 'خروجی دستور type(Mobile) برای یک کلاس تعریف‌شده در پایتون چیست؟',
    codeSnippet: `class Mobile:\n    pass\nprint(type(Mobile))`,
    language: 'python',
    options: ["<class 'Mobile'>", "<class 'object'>", "<class 'type'>", "None"],
    correctIndex: 2,
    explanation: 'در پایتون خود کلاس‌ها نیز شیء هستند و توسط متاکلاس داخلی type ساخته می‌شوند.',
    bookPage: '۲۳۴ و ۲۵۲',
  },
  {
    id: 'quiz-4-1-04',
    kind: 'concept',
    question: 'کاربرد تابع super().__init__(...) در کلاس فرزند چیست؟',
    options: [
      'حذف کلاس والد از حافظه',
      'فراخوانی سازنده کلاس والد برای مقداردهی ویژگی‌های مشترک بدون تکرار کد',
      'تبدیل کلاس به خصوصی',
      'اجرای هم‌زمان تمام متدهای کلاس',
    ],
    correctIndex: 1,
    explanation: 'super() دسترسی تمیز به متدها و سازنده کلاس والد را فراهم می‌کند.',
    bookPage: '۲۴۷',
  },
  {
    id: 'quiz-4-1-05',
    kind: 'bug-spot',
    question: 'علت بروز خطای NameError در کد صفحه ۲۴۷ کتاب چیست؟',
    codeSnippet: `my_smartphone = SmartPhone("Samsung", "A55")\nmy_smartphon.show_info()`,
    language: 'python',
    options: [
      'متد show_info آرگومان کم دارد',
      'حرف e در انتهای نام شیء my_smartphon جا افتاده است',
      'کلاس SmartPhone باید با new ساخته شود',
      'رشته‌ها باید با تک‌کوتیشن باشند',
    ],
    correctIndex: 1,
    explanation: 'در ص ۲۴۷ کتاب نام شیء در خط فراخوانی اشتباهاً بدون حرف e چاپ شده است.',
    bookPage: '۲۴۷',
  },
  {
    id: 'quiz-4-1-06',
    kind: 'output',
    question: 'اگر SmartPhone از Mobile ارث ببرد و s = SmartPhone() باشد، خروجی کد زیر چیست؟',
    codeSnippet: `print(isinstance(s, Mobile), type(s) == Mobile)`,
    language: 'python',
    options: ['True True', 'True False', 'False True', 'False False'],
    correctIndex: 1,
    explanation: 'isinstance وراثت را در نظر می‌گیرد (True)، اما type(s) دقیقاً برابر SmartPhone است نه Mobile (False).',
    bookPage: '۲۵۲',
  },
  {
    id: 'quiz-4-1-07',
    kind: 'concept',
    question: 'بازنویسی متد (Method Override) به چه معناست؟',
    options: [
      'حذف کامل یک متد از کل برنامه',
      'تعریف مجدد متدی در کلاس فرزند با همان نام متد والد برای تغییر یا تکمیل رفتار آن',
      'صدا زدن دو بار یک متد در حلقه',
      'نوشتن متد بیرون از کلاس',
    ],
    correctIndex: 1,
    explanation: 'با بازنویسی متد، کلاس فرزند نسخه تخصصی خودش از متد والد را ارائه می‌دهد.',
    bookPage: '۲۴۷',
  },
  {
    id: 'quiz-4-1-08',
    kind: 'concept',
    question: 'کدام نام‌گذاری به ترتیب نشان‌دهنده ویژگی عمومی، محافظت‌شده و خصوصی در پایتون است؟',
    options: [
      'public_x / protected_x / private_x',
      'x / _x / __x',
      '__x / _x / x',
      '$x / #x / @x',
    ],
    correctIndex: 1,
    explanation: 'بدون زیرخط (عمومی)، یک زیرخط (محافظت‌شده) و دو زیرخط چسبیده (خصوصی).',
    bookPage: '۲۵۰',
  },
  {
    id: 'quiz-4-1-09',
    kind: 'bug-spot',
    question: 'مشکل منطقی در تعریف کلاس زیر چیست؟',
    codeSnippet: `class Student:\n    courses = []\n    def __init__(self, name):\n        self.name = name`,
    language: 'python',
    options: [
      'لیست courses به عنوان ویژگی کلاس تعریف شده و بین همه هنرجویان مشترک می‌شود!',
      'نام کلاس نباید Student باشد',
      'نمی‌توان لیست خالی تعریف کرد',
      'هیچ مشکلی ندارد',
    ],
    correctIndex: 0,
    explanation: 'لیست اختصاصی هر نمونه باید داخل __init__ به صورت self.courses = [] ساخته شود.',
    bookPage: '۲۴۴',
  },
];
