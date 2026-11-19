import type {ConceptLesson} from '../../../types/curriculum.ts';

/**
 * Unit 4.1 — Python Object-Oriented Programming & Metaclass (Pages 234–253)
 * 6 Deep Concept Lessons × 4 Tiered Runnable Python Examples = 24 Examples.
 * Covers & fixes:
 * - Page 247 NameError typo: `my_smartphon.show_info()` -> `my_smartphone.show_info()`
 * - Page 250 SyntaxError typo: `self._ _battery` -> `self.__battery`
 * - Objective 5 (p. 234) & Rubric Stage 5 (p. 252) missing topic: Metaclass & `type(Class)`
 */
export const UNIT_4_1_LESSONS: ConceptLesson[] = [
  // ==================== LESSON 1 ====================
  {
    id: 'lesson-4-1-class-init',
    order: 1,
    title: 'کلاس (class)، شیء (Object)، سازنده __init__ و کلمه self',
    bookPage: '۲۳۴ تا ۲۴۱',
    whyWeNeedIt: {
      realWorldProblem:
        'وقتی می‌خواهیم اطلاعات ۵۰ گوشی موبایل (برند، مدل، قیمت، ظرفیت باتری) و رفتارهای مشترک آن‌ها (روشن شدن، تماس گرفتن، نمایش مشخصات) را مدیریت کنیم، ساخت ۵۰ دیکشنری پراکنده و توابع جداگانه به‌سرعت غیرقابل نگهداری می‌شود. شیءگرایی داده و رفتار را در یک بسته منظم به نام کلاس ترکیب می‌کند.',
      analogy:
        'کلاس (class) مانند نقشه مهندسی یک گوشی موبایل است و هر شیء (Object / Instance) یک گوشی واقعی است که از روی آن نقشه تولید می‌شود؛ هر گوشی رنگ و سریال خودش را دارد اما ساختار کلی همه‌شان یکی است.',
    },
    syntaxAnatomy: {
      template: `class Mobile:\n    def __init__(self, brand, model):\n        self.brand = brand\n        self.model = model`,
      parts: [
        {token: 'class Mobile:', role: 'تعریف نقشه کلاس؛ طبق استاندارد PEP 8 نام کلاس با حرف بزرگ (PascalCase) نوشته می‌شود.'},
        {token: 'def __init__(self, ...):', role: 'متد سازنده (Constructor) با دو زیرخط در ابتدا و انتها؛ هنگام ساخت هر شیء خودکار اجرا می‌شود.'},
        {token: 'self', role: 'اشاره‌گر به «همین شیء فعلی»؛ باعث می‌شود ویژگی هر نمونه از نمونه‌های دیگر جدا بماند.'},
        {token: 'Mobile("Samsung", "A55")', role: 'ساخت نمونه (Instantiation)؛ برخلاف جاوااسکریپت در پایتون کلمه new نداریم.'},
      ],
    },
    behindTheScenes: [
      'وقتی می‌نویسید m1 = Mobile("Samsung", "A55")، پایتون ابتدا یک شیء خالی در حافظه RAM می‌سازد و سپس به‌طور خودکار __init__(m1, "Samsung", "A55") را صدا می‌زند؛ یعنی آرگومان اول (self) را خود پایتون می‌فرستد!',
      'به همین دلیل اگر در تعریف __init__ یا هر متد دیگر پارامتر self را فراموش کنید، هنگام فراخوانی خطای TypeError (تعداد آرگومان بیش از حد) رخ می‌دهد.',
      'پارامترهای پیش‌فرض مثل storage=128 در __init__ اجازه می‌دهند برخی ویژگی‌ها اختیاری باشند.',
      'هر شیء ساخته شده حافظه مستقل خود را دارد؛ تغییر m1.price هیچ تأثیری روی m2.price نمی‌گذارد.',
    ],
    goldenTips: [
      'نام کلاس‌ها را همیشه مفرد و با حروف بزرگ در ابتدای هر کلمه بنویسید: Mobile، SmartPhone، StudentCard.',
      'اگر ویژگی بدون self نوشته شود (مثلاً brand = brand)، یک متغیر محلی موقت خواهد بود و بلافاصله پس از پایان __init__ از بین می‌رود!',
    ],
    wrongVsRight: [
      {
        title: 'فراموش کردن self در تعریف متد یا ذخیره ویژگی',
        wrongCode: `class Mobile:\n    def __init__(brand):\n        brand = brand`,
        rightCode: `class Mobile:\n    def __init__(self, brand):\n        self.brand = brand`,
        explanation: 'پارامتر اول تمام متدهای نمونه در پایتون باید self باشد و ویژگی‌ها روی self ذخیره شوند.',
      },
      {
        title: 'گذاشتن یک زیرخط به جای دو زیرخط در __init__',
        wrongCode: `def _init_(self, brand):  # سازنده نیست و خودکار اجرا نمی‌شود!`,
        rightCode: `def __init__(self, brand):  # دو زیرخط چسبیده در هر طرف`,
        explanation: 'سازنده پایتون دقیقاً با دو زیرخط در چپ و راست (__init__) شناخته می‌شود.',
      },
    ],
    examples: [
      {
        id: 'ex-4-1-cls-basic',
        tier: 'basic',
        title: 'ساخت اولین کلاس Mobile و دو نمونه مستقل',
        bookPage: '۲۳۷',
        summary: 'تعریف کلاس Mobile با سازنده __init__ و متد نمایش اطلاعات show_info.',
        language: 'python',
        engine: 'python',
        code: `class Mobile:
    def __init__(self, brand, model, price):
        self.brand = brand
        self.model = model
        self.price = price

    def show_info(self):
        print(f"گوشی {self.brand} مدل {self.model} | قیمت: {self.price} تومان")

m1 = Mobile("Samsung", "A55", 19500000)
m2 = Mobile("Xiaomi", "Redmi Note 13", 12800000)

m1.show_info()
m2.show_info()`,
        teacherTalkingPoints: [
          'دکمه «اجرای گام‌به‌گام» را بزنید تا هنرجویان ببینند چطور m1 و m2 هر دو از یک نقشه ساخته می‌شوند ولی مقادیر جداگانه دارند.',
        ],
        lineExplanations: [
          {line: 2, explanation: 'سازنده __init__ مقادیر اولیه هر گوشی را دریافت می‌کند.'},
          {line: 3, explanation: 'انتصاب brand به self.brand آن را به ویژگی دائمی شیء تبدیل می‌کند.'},
          {line: 10, explanation: 'پایتون خودکار m1 را به عنوان self به __init__ می‌فرستد.'},
        ],
        commonMistakes: ['فراموش کردن نوشتن self در پرانتز show_info(self).'],
      },
      {
        id: 'ex-4-1-cls-practical',
        tier: 'practical',
        title: 'مقادیر پیش‌فرض در سازنده __init__ و ویرایش ویژگی شیء',
        bookPage: '۲۳۹',
        summary: 'تعریف ویژگی‌های پیش‌فرض (حافظه و درصد باتری) هنگام ساخت گوشی و به‌روزرسانی آن‌ها.',
        language: 'python',
        engine: 'python',
        code: `class Mobile:
    def __init__(self, brand, model, storage=128):
        self.brand = brand
        self.model = model
        self.storage = storage
        self.battery = 100

    def summary(self):
        return f"{self.brand} {self.model} ({self.storage}GB) - باتری {self.battery}%"

p1 = Mobile("Apple", "iPhone 15")
p2 = Mobile("Samsung", "S24", 256)

print(p1.summary())
print(p2.summary())
p1.battery = 82
print("پس از استفاده:", p1.summary())`,
        teacherTalkingPoints: [
          'نشان دهید p1 مقدار storage را نفرستاده و به‌طور خودکار 128 گرفته، اما p2 آن را 256 تعیین کرده است.',
        ],
        lineExplanations: [
          {line: 2, explanation: 'پارامتر storage دارای مقدار پیش‌فرض 128 است.'},
          {line: 6, explanation: 'تمام گوشی‌های نو با باتری 100 درصد شروع می‌کنند.'},
        ],
        commonMistakes: ['قرار دادن پارامتر پیش‌فرض قبل از پارامتر بدون پیش‌فرض (مثل storage=128, model).'],
      },
      {
        id: 'ex-4-1-cls-combined',
        tier: 'combined',
        title: 'نگهداری فهرست اشیای کلاس در لیست (انبار فروشگاه موبایل)',
        bookPage: '۲۴۰',
        summary: 'ترکیب لیست و حلقه for با اشیای کلاس Mobile برای فیلتر کردن گوشی‌های اقتصادی.',
        language: 'python',
        engine: 'python',
        code: `class Mobile:
    def __init__(self, brand, model, price):
        self.brand = brand
        self.model = model
        self.price = price

    def label(self):
        return f"{self.brand} {self.model}: {self.price} میلیون"

store = [
    Mobile("Samsung", "A15", 8),
    Mobile("Xiaomi", "14 Ultra", 58),
    Mobile("Nokia", "G22", 7),
    Mobile("Apple", "iPhone 15", 49)
]

print("--- گوشی‌های زیر ۱۵ میلیون ---")
for phone in store:
    if phone.price < 15:
        print("*", phone.label())`,
        teacherTalkingPoints: [
          'این دقیقاً همان مدلی است که در پودمان ۵ (Django ORM) با اشیای City.objects.all() خواهیم دید!',
        ],
        lineExplanations: [
          {line: 10, explanation: 'هر عنصر لیست store یک نمونه واقعی از کلاس Mobile است.'},
          {line: 19, explanation: 'دسترسی به ویژگی phone.price درون حلقه.'},
        ],
        commonMistakes: ['اشتباه گرفتن ویژگی شیء (phone.price) با کلید دیکشنری (phone["price"]).'],
      },
      {
        id: 'ex-4-1-cls-whatif',
        tier: 'what-if',
        title: 'تفاوت ویژگی مستقل دو شیء در حافظه (چرا تغییر m1 روی m2 اثر ندارد؟)',
        bookPage: '۲۴۱',
        summary: 'آزمایش استقلال حافظه نمونه‌ها با مقایسه m1 و m2 پس از تغییر ویژگی.',
        language: 'python',
        engine: 'python',
        code: `class Mobile:
    def __init__(self, brand, color):
        self.brand = brand
        self.color = color

m1 = Mobile("Samsung", "مشکی")
m2 = Mobile("Samsung", "مشکی")

m1.color = "آبی"
print("رنگ m1:", m1.color)
print("رنگ m2:", m2.color)
print("آیا هر دو یک شیء هستند؟", m1 == m2)`,
        teacherTalkingPoints: [
          'توضیح دهید حتی اگر همه مقادیر اولیه m1 و m2 یکسان باشد، دو شیء جداگانه در دو خانه متفاوت از RAM ساخته شده‌اند.',
        ],
        lineExplanations: [
          {line: 9, explanation: 'تغییر رنگ m1 هیچ اثری روی رنگ m2 ندارد.'},
        ],
        commonMistakes: ['تصور اینکه دو شیء با ویژگی‌های برابر، در حافظه یکی هستند.'],
      },
    ],
  },

  // ==================== LESSON 2 ====================
  {
    id: 'lesson-4-1-methods-state',
    order: 2,
    title: 'ویژگی‌های کلاس در برابر ویژگی‌های نمونه و متدهای تغییر وضعیت',
    bookPage: '۲۴۱ تا ۲۴۴',
    whyWeNeedIt: {
      realWorldProblem:
        'یک گوشی فقط داده ثابت نیست؛ می‌تواند روشن/خاموش شود، تماس بگیرد، باتری مصرف کند و شارژ شود. همچنین گاهی لازم است یک اطلاعات مشترک بین تمام اشیای کلاس (مثل تعداد کل گوشی‌های تولیدشده یا واحد ارز مشترک) نگهداری کنیم.',
      analogy:
        'ویژگی نمونه (Instance Attribute) مانند شماره دانش‌آموزیِ هر هنرجو است که فقط مال خودش است، اما ویژگی کلاس (Class Attribute) مانند نام هنرستان است که بین تمام هنرجویان کلاس مشترک است.',
    },
    syntaxAnatomy: {
      template: `class Mobile:\n    category = "الکترونیک"\n    def charge(self, amount):\n        self.battery = min(100, self.battery + amount)`,
      parts: [
        {token: 'category = "..."', role: 'ویژگی کلاس؛ بیرون از __init__ تعریف شده و بین تمام نمونه‌ها مشترک است.'},
        {token: 'self.battery', role: 'ویژگی نمونه؛ وضعیت اختصاصی هر گوشی (State).'},
        {token: 'def charge(self, amount):', role: 'متد تغییر وضعیت که روی ویژگی‌های self عملیات و اعتبارسنجی انجام می‌دهد.'},
      ],
    },
    behindTheScenes: [
      'متدهایی که وضعیت شیء را تغییر می‌دهند (State-mutating Methods) باید قوانین منطقی دنیای واقعی را حفظ کنند؛ مثلاً درصد باتری هرگز نباید از 100 بیشتر یا از 0 کمتر شود.',
      'اگر ویژگی کلاس مانند warranty_months = 18 روی خود کلاس تغییر کند، برای همه نمونه‌هایی که آن را بازنویسی نکرده‌اند تغییر می‌کند.',
      'می‌توان از متدهای کمکی داخلی استفاده کرد؛ مثلاً متد call() ابتدا چک کند آیا گوشی روشن است و باتری کافی دارد یا نه.',
      'طراحی درست متدها باعث می‌شود وضعیت شیء هیچ‌وقت «ناسازگار» (مثل برقراری تماس با گوشی خاموش) نشود.',
    ],
    goldenTips: [
      'همیشه قبل از اجرای عمل یک متد، پیش‌شرط‌ها (مثل is_on و کفایت باتری) را بررسی کنید و پیام فارسی روشن به کاربر بدهید.',
      'استفاده از min(100, ...) و max(0, ...) تمیزترین راه برای محدود کردن مقادیر عددی مثل باتری یا صدا است.',
    ],
    wrongVsRight: [
      {
        title: 'تغییر مستقیم باتری بدون کنترل سقف ۱۰۰ درصد',
        wrongCode: `phone.battery += 40  # اگر باتری 80 باشد می‌شود 120%!`,
        rightCode: `phone.charge(40)  # داخل متد با min(100, self.battery + 40) کنترل می‌شود`,
        explanation: 'متدها مانند نگهبانان هوشمند داده هستند که از ثبت مقادیر غیرمنطقی جلوگیری می‌کنند.',
      },
      {
        title: 'تعریف لیست اشتراکی به‌عنوان ویژگی کلاس',
        wrongCode: `class Student:\n    courses = []  # بین همه هنرجویان مشترک می‌شود!`,
        rightCode: `class Student:\n    def __init__(self):\n        self.courses = []  # لیست مستقل برای هر هنرجو`,
        explanation: 'لیست‌های قابل تغییر (Mutable) حتماً باید داخل __init__ روی self تعریف شوند.',
      },
    ],
    examples: [
      {
        id: 'ex-4-1-state-basic',
        tier: 'basic',
        title: 'روشن/خاموش کردن گوشی و مدیریت تماس با بررسی وضعیت',
        bookPage: '۲۴۲',
        summary: 'تعریف متدهای power_on، power_off و make_call همراه با مصرف باتری.',
        language: 'python',
        engine: 'python',
        code: `class Mobile:
    def __init__(self, brand, model):
        self.brand = brand
        self.model = model
        self.is_on = False
        self.battery = 50

    def power_on(self):
        self.is_on = True
        print(f"{self.brand} {self.model} روشن شد.")

    def make_call(self, contact):
        if not self.is_on:
            print("خطا: گوشی خاموش است! ابتدا آن را روشن کنید.")
        elif self.battery < 5:
            print("خطا: باتری برای تماس کافی نیست!")
        else:
            self.battery -= 5
            print(f"در حال تماس با {contact}... (باتری باقی‌مانده: {self.battery}%)")

phone = Mobile("Samsung", "A35")
phone.make_call("مادر")
phone.power_on()
phone.make_call("مادر")`,
        teacherTalkingPoints: [
          'نشان دهید چگونه متد make_call بسته به وضعیت فعلی شیء (is_on) رفتار متفاوتی نشان می‌دهد.',
        ],
        lineExplanations: [
          {line: 5, explanation: 'وضعیت اولیه گوشی خاموش (False) تعریف شده است.'},
          {line: 13, explanation: 'نگهبان وضعیت: تا گوشی روشن نشود تماس برقرار نمی‌شود.'},
        ],
        commonMistakes: ['فراموش کردن self قبل از is_on یا battery داخل متدها.'],
      },
      {
        id: 'ex-4-1-state-practical',
        tier: 'practical',
        title: 'شارژ و مصرف ایمن باتری بین ۰ تا ۱۰۰ درصد',
        bookPage: '۲۴۳',
        summary: 'استفاده از min و max در متدهای charge و play_game برای جلوگیری از مقادیر نامعتبر.',
        language: 'python',
        engine: 'python',
        code: `class Mobile:
    def __init__(self, model, battery=60):
        self.model = model
        self.battery = battery

    def charge(self, amount):
        if amount <= 0:
            print("مقدار شارژ باید مثبت باشد.")
            return
        self.battery = min(100, self.battery + amount)
        print(f"{self.model} شارژ شد -> باتری: {self.battery}%")

    def play_game(self, minutes):
        used = minutes * 2
        self.battery = max(0, self.battery - used)
        print(f"{minutes} دقیقه بازی انجام شد -> باتری: {self.battery}%")

p = Mobile("Poco X6", 75)
p.charge(50)
p.play_game(60)`,
        teacherTalkingPoints: [
          'به خروجی دقت کنید: 75 + 50 به جای 125 دقیقاً روی 100 متوقف شد و 100 - 120 به جای -20 روی 0 ایستاد!',
        ],
        lineExplanations: [
          {line: 10, explanation: 'تابع min سقف باتری را روی 100 قفل می‌کند.'},
          {line: 15, explanation: 'تابع max کف باتری را روی 0 نگه می‌دارد.'},
        ],
        commonMistakes: ['اجازه دادن به منفی شدن باتری یا رد کردن سقف ۱۰۰ درصد.'],
      },
      {
        id: 'ex-4-1-state-combined',
        tier: 'combined',
        title: 'ویژگی کلاس (گارانتی مشترک) و شمارنده کل دستگاه‌های ساخته‌شده',
        bookPage: '۲۴۴',
        summary: 'ترکیب ویژگی کلاس برای نگهداری آمار سراسری و ویژگی نمونه برای هر گوشی.',
        language: 'python',
        engine: 'python',
        code: `class Mobile:
    warranty_months = 18
    total_created = 0

    def __init__(self, brand, model):
        self.brand = brand
        self.model = model
        Mobile.total_created += 1

    def info(self):
        print(f"{self.brand} {self.model} | گارانتی: {self.warranty_months} ماه")

m1 = Mobile("Samsung", "A55")
m2 = Mobile("Apple", "iPhone 15")
m3 = Mobile("Xiaomi", "Note 13")

m1.info()
m2.info()
print("تعداد کل گوشی‌های تولیدشده:", Mobile.total_created)`,
        teacherTalkingPoints: [
          'توضیح دهید چرا برای افزایش شمارنده نوشتیم Mobile.total_created += 1 نه self.total_created += 1.',
        ],
        lineExplanations: [
          {line: 2, explanation: 'ویژگی کلاس: تمام گوشی‌ها به‌طور پیش‌فرض ۱۸ ماه گارانتی دارند.'},
          {line: 8, explanation: 'با هر بار اجرای سازنده، شمارنده مشترک کلاس یک واحد زیاد می‌شود.'},
        ],
        commonMistakes: ['نوشتن self.total_created += 1 که یک ویژگی جداگانه روی نمونه می‌سازد و شمارنده کلاس را زیاد نمی‌کند!'],
      },
      {
        id: 'ex-4-1-state-whatif',
        tier: 'what-if',
        title: 'تله لیست اشتراکی در سطح کلاس در برابر لیست مستقل در __init__',
        bookPage: '۲۴۴',
        summary: 'نمایش عملی باگ خطرناک تعریف لیست در بدنه کلاس و مقایسه آن با تعریف صحیح درون __init__.',
        language: 'python',
        engine: 'python',
        code: `class SafePhone:
    def __init__(self, owner):
        self.owner = owner
        self.apps = []  # لیست مستقل برای هر گوشی

    def install(self, app_name):
        self.apps.append(app_name)

p1 = SafePhone("علی")
p2 = SafePhone("زهرا")

p1.install("شاد")
p1.install("پایتون")
p2.install("ماشین‌حساب")

print("برنامه‌های علی:", p1.apps)
print("برنامه‌های زهرا:", p2.apps)`,
        teacherTalkingPoints: [
          'از هنرجویان بخواهید حدس بزنند اگر apps = [] را بیرون از __init__ بگذاریم، برنامه‌های زهرا چه می‌شد؟ (برنامه‌های علی هم در گوشی زهرا ظاهر می‌شد!)',
        ],
        lineExplanations: [
          {line: 4, explanation: 'ایجاد لیست خالی تازه برای هر شیء هنگام ساخت.'},
        ],
        commonMistakes: ['قرار دادن لیست‌ها یا دیکشنری‌های اختصاصی هر نمونه در سطح کلاس.'],
      },
    ],
  },

  // ==================== LESSON 3 ====================
  {
    id: 'lesson-4-1-inheritance',
    order: 3,
    title: 'وراثت (Inheritance) و super() — Mobile ← SmartPhone ← GamingPhone',
    bookPage: '۲۴۵ تا ۲۴۸',
    whyWeNeedIt: {
      realWorldProblem:
        'همه گوشی‌ها برند، مدل و باتری دارند؛ اما گوشی هوشمند علاوه بر آن‌ها سیستم‌عامل و دوربین دارد و گوشی گیمینگ سیستم خنک‌کننده و نرخ تازه‌سازی صفحه هم دارد. نوشتن دوباره کدهای کلاس Mobile در هر کلاس جدید باعث تکرار و خطا می‌شود.',
      analogy:
        'وراثت مانند ارث بردن ویژگی‌های ژنتیکی از والد به فرزند است؛ فرزند تمام توانایی‌های پایه والد را به‌طور خودکار دارد و فقط مهارت‌های تخصصی جدید خودش را به آن اضافه می‌کند.',
    },
    syntaxAnatomy: {
      template: `class SmartPhone(Mobile):\n    def __init__(self, brand, model, os_name):\n        super().__init__(brand, model)\n        self.os_name = os_name`,
      parts: [
        {token: 'class Child(Parent):', role: 'نام کلاس والد داخل پرانتز بعد از نام کلاس فرزند قرار می‌گیرد.'},
        {token: 'super().__init__(...)', role: 'فراخوانی سازنده کلاس والد برای مقداردهی ویژگی‌های مشترک بدون تکرار کد.'},
        {token: 'وراثت چندسطحی', role: 'کلاس نوه (GamingPhone) از فرزند (SmartPhone) و او نیز از والد (Mobile) ارث می‌برد.'},
      ],
    },
    behindTheScenes: [
      'در صفحه ۲۴۷ کتاب یک غلط تایپی واقعی چاپ شده است: شیء با نام my_smartphone ساخته شده اما در خط بعد my_smartphon.show_info() (بدون e آخر) صدا زده شده که خطای NameError می‌دهد!',
      'اگر کلاس فرزند __init__ جدیدی تعریف کند و super().__init__() را صدا نزند، ویژگی‌های کلاس والد (مثل self.brand) اصلاً ساخته نمی‌شوند و برنامه خطای AttributeError می‌دهد.',
      'وراثت باید فقط زمانی به کار برود که رابطه «یک نوع از» (Is-A) برقرار باشد: مثلاً SmartPhone «یک نوع» Mobile است؛ اما Battery یک نوع Mobile نیست!',
      'در پایتون هر کلاس فرزند به‌طور خودکار تمام متدهای کلاس والد را در اختیار دارد و می‌تواند آن‌ها را مستقیماً صدا بزند.',
    ],
    goldenTips: [
      'دقت کنید هنگام صدا زدن super().__init__(brand, model) دیگر خودِ self را داخل پرانتز نمی‌نویسیم؛ پایتون خودکار آن را می‌فرستد.',
      'همیشه رابطه وراثت را روی تخته با پیکان (فرزند ⟶ والد) بکشید تا سلسله‌مراتب برای کلاس شفاف شود.',
    ],
    wrongVsRight: [
      {
        title: 'فراموش کردن super().__init__ در کلاس فرزند',
        wrongCode: `class SmartPhone(Mobile):\n    def __init__(self, brand, model, os_name):\n        self.os_name = os_name  # self.brand ساخته نشد!`,
        rightCode: `class SmartPhone(Mobile):\n    def __init__(self, brand, model, os_name):\n        super().__init__(brand, model)\n        self.os_name = os_name`,
        explanation: 'بدون super().__init__ ویژگی‌های والد روی شیء فرزند ثبت نمی‌شوند.',
      },
      {
        title: 'غلط تایپی ص ۲۴۷ کتاب (my_smartphon)',
        wrongCode: `my_smartphone = SmartPhone("Samsung", "A55", "Android")\nmy_smartphon.show_info()  # NameError!`,
        rightCode: `my_smartphone = SmartPhone("Samsung", "A55", "Android")\nmy_smartphone.show_info()`,
        explanation: 'جا افتادن حتی یک حرف (e) باعث خطای NameError می‌شود.',
      },
    ],
    examples: [
      {
        id: 'ex-4-1-inh-basic',
        tier: 'basic',
        title: 'وراثت پایه: SmartPhone از Mobile (اصلاح غلط تایپی ص ۲۴۷)',
        bookPage: '۲۴۶–۲۴۷',
        summary: 'ارث‌بری متدها و ویژگی‌های Mobile توسط SmartPhone با super().__init__.',
        language: 'python',
        engine: 'python',
        code: `class Mobile:
    def __init__(self, brand, model):
        self.brand = brand
        self.model = model

    def call(self, number):
        print(f"تماس از {self.brand} {self.model} با شماره {number}")

class SmartPhone(Mobile):
    def __init__(self, brand, model, os_name):
        super().__init__(brand, model)
        self.os_name = os_name

    def browse(self, site):
        print(f"باز کردن {site} در {self.brand} ({self.os_name})")

my_smartphone = SmartPhone("Samsung", "A55", "Android 15")
my_smartphone.call("09120001122")
my_smartphone.browse("marjanow.ir")`,
        teacherTalkingPoints: [
          'نشان دهید متد call اصلاً داخل SmartPhone نوشته نشده اما my_smartphone به لطف وراثت آن را دارد!',
        ],
        lineExplanations: [
          {line: 9, explanation: 'SmartPhone تمام امکانات Mobile را به ارث می‌برد.'},
          {line: 11, explanation: 'فراخوانی سازنده والد برای تنظیم brand و model.'},
          {line: 17, explanation: 'املای دقیق my_smartphone (اصلاح باگ ص ۲۴۷ کتاب).'},
        ],
        commonMistakes: ['نوشتن self داخل پرانتز super().__init__(self, brand, model) که خطا می‌دهد!'],
        bookCorrection: {
          page: 247,
          issue: 'در ص ۲۴۷ نام متغیر my_smartphone هنگام فراخوانی به شکل my_smartphon (بدون e) تایپ شده که NameError می‌دهد.',
          fix: 'نام شیء در تمام خطوط یکسان و صحیح نوشته شد.',
        },
      },
      {
        id: 'ex-4-1-inh-practical',
        tier: 'practical',
        title: 'وراثت چندسطحی (Mobile ← SmartPhone ← GamingPhone)',
        bookPage: '۲۴۸',
        summary: 'گسترش زنجیره وراثت در سه سطح با اضافه کردن خنک‌کننده و حالت بازی.',
        language: 'python',
        engine: 'python',
        code: `class Mobile:
    def __init__(self, brand, model):
        self.brand = brand
        self.model = model

class SmartPhone(Mobile):
    def __init__(self, brand, model, os_name):
        super().__init__(brand, model)
        self.os_name = os_name

class GamingPhone(SmartPhone):
    def __init__(self, brand, model, os_name, refresh_hz):
        super().__init__(brand, model, os_name)
        self.refresh_hz = refresh_hz

    def gaming_mode(self):
        print(f"حالت گیمینگ {self.brand} {self.model} ({self.os_name}) روی {self.refresh_hz}Hz فعال شد!")

gp = GamingPhone("ASUS", "ROG Phone 8", "Android 15", 165)
gp.gaming_mode()`,
        teacherTalkingPoints: [
          'زنجیره super() را ردیابی کنید: GamingPhone ⟶ SmartPhone ⟶ Mobile.',
        ],
        lineExplanations: [
          {line: 11, explanation: 'GamingPhone از SmartPhone ارث می‌برد، پس به‌طور غیرمستقیم از Mobile هم ارث برده است.'},
        ],
        commonMistakes: ['فراموش کردن ارسال تمام پارامترهای والد در super().__init__.'],
      },
      {
        id: 'ex-4-1-inh-combined',
        tier: 'combined',
        title: 'چند کلاس فرزند مختلف از یک والد واحد (SmartPhone و FeaturePhone)',
        bookPage: '۲۴۸',
        summary: 'دو نوع گوشی متفاوت که هر دو از Mobile ارث می‌برند ولی قابلیت‌های اختصاصی دارند.',
        language: 'python',
        engine: 'python',
        code: `class Mobile:
    def __init__(self, brand, model, battery=100):
        self.brand = brand
        self.model = model
        self.battery = battery

    def basic_info(self):
        return f"{self.brand} {self.model} (باتری {self.battery}%)"

class FeaturePhone(Mobile):
    def __init__(self, brand, model, has_flashlight=True):
        super().__init__(brand, model)
        self.has_flashlight = has_flashlight

    def toggle_light(self):
        print(f"چراغ‌قوه {self.basic_info()} روشن شد!")

class SmartPhone(Mobile):
    def __init__(self, brand, model, camera_mp):
        super().__init__(brand, model)
        self.camera_mp = camera_mp

    def take_photo(self):
        print(f"ثبت عکس {self.camera_mp} مگاپیکسلی با {self.basic_info()}")

nokia = FeaturePhone("Nokia", "105")
pixel = SmartPhone("Google", "Pixel 9", 50)
nokia.toggle_light()
pixel.take_photo()`,
        teacherTalkingPoints: [
          'بپرسید آیا nokia می‌تواند متد take_photo() را صدا بزند؟ خیر! چون وراثت یک‌طرفه است و بین دو فرزند خواهر/برادر به اشتراک گذاشته نمی‌شود.',
        ],
        lineExplanations: [
          {line: 10, explanation: 'کلاس گوشی ساده با قابلیت اختصاصی چراغ‌قوه.'},
          {line: 18, explanation: 'کلاس گوشی هوشمند با قابلیت اختصاصی دوربین.'},
        ],
        commonMistakes: ['تلاش برای صدا زدن متد یک کلاس فرزند از روی کلاس والد یا فرزند دیگر.'],
      },
      {
        id: 'ex-4-1-inh-whatif',
        tier: 'what-if',
        title: 'مقایسه ساخت کلاس با وراثت در برابر کلاس فرزند بدون __init__ جدید',
        bookPage: '۲۴۶',
        summary: 'اگر کلاس فرزند اصلاً __init__ ننویسد، چه اتفاقی می‌افتد؟ (ارث‌بری خودکار سازنده والد)',
        language: 'python',
        engine: 'python',
        code: `class Mobile:
    def __init__(self, brand, model):
        self.brand = brand
        self.model = model

class BasicPhone(Mobile):
    def send_sms(self, text):
        print(f"[{self.brand} {self.model}] پیامک: {text}")

bp = BasicPhone("Nokia", "1100")
bp.send_sms("سلام کلاس یازدهم!")`,
        teacherTalkingPoints: [
          'توضیح دهید اگر فرزند ویژگی جدیدی ندارد، اصلاً نیازی به بازنویسی __init__ نیست؛ سازنده والد خودکار اجرا می‌شود.',
        ],
        lineExplanations: [
          {line: 6, explanation: 'چون BasicPhone سازنده ندارد، مستقیماً __init__ کلاس Mobile را به ارث می‌برد.'},
        ],
        commonMistakes: ['نوشتن __init__ تکراری بدون نیاز واقعی.'],
      },
    ],
  },

  // ==================== LESSON 4 ====================
  {
    id: 'lesson-4-1-override-poly',
    order: 4,
    title: 'بازنویسی متد (Method Override) و چندریختی (Polymorphism)',
    bookPage: '۲۴۷ تا ۲۴۹',
    whyWeNeedIt: {
      realWorldProblem:
        'متد show_info در کلاس Mobile فقط برند و مدل را چاپ می‌کند، اما برای SmartPhone می‌خواهیم سیستم‌عامل را هم نشان دهد و برای GamingPhone نرخ تازه‌سازی صفحه را هم اضافه کند! با بازنویسی متد، همه گوشی‌ها یک نام متد یکسان (show_info) دارند اما هر کدام نسخه متناسب با خود را اجرا می‌کنند.',
      analogy:
        'چندریختی مانند دکمه «پخش» (Play) در دستگاه‌های مختلف است؛ وقتی دکمه پخش را روی رادیو، ویدیوپلیر یا کنسول بازی می‌زنید، دستور یکی است اما هر دستگاه رفتار مخصوص خودش را انجام می‌دهد.',
    },
    syntaxAnatomy: {
      template: `class SmartPhone(Mobile):\n    def show_info(self):\n        super().show_info()\n        print(f"سیستم‌عامل: {self.os_name}")`,
      parts: [
        {token: 'def show_info(self):', role: 'تعریف مجدد متد همنام والد در کلاس فرزند (Method Override).'},
        {token: 'super().show_info()', role: 'در صورت نیاز می‌توان ابتدا نسخه والد را اجرا و سپس خروجی فرزند را تکمیل کرد.'},
        {token: 'Polymorphism', role: 'اجرای یک حلقه واحد روی اشیای مختلف و دریافت رفتار اختصاصی هر کلاس.'},
      ],
    },
    behindTheScenes: [
      'وقتی روی یک شیء متد obj.show_info() صدا زده می‌شود، پایتون اول داخل کلاس خود شیء می‌گردد (MRO)؛ اگر پیدا کرد همان را اجرا می‌کند و اگر نبود سراغ کلاس والد می‌رود.',
      'چندریختی باعث می‌شود کدهای آینده‌پذیر بنویسیم: اگر فردا کلاس FoldablePhone هم اضافه شود، حلقه for device in devices: device.show_info() بدون تغییر یک خط کد کار می‌کند!',
      'به جای پاک کردن کامل منطق والد، اغلب بهتر است داخل متد بازنویسی‌شده super().method() را صدا بزنیم تا کدهای والد همچنان حفظ شوند.',
    ],
    goldenTips: [
      'نام متد بازنویسی‌شده در فرزند باید دقیقاً حرف‌به‌حرف با نام متد در والد یکسان باشد؛ وگرنه دو متد جداگانه ساخته می‌شود.',
      'در پروژه‌های واقعی (مثل مدل‌های جنگو که در پودمان ۵ می‌بینیم)، متد __str__(self) را در هر مدل بازنویسی می‌کنیم تا نام فارسی شهر در پنل ادمین نمایش داده شود.',
    ],
    wrongVsRight: [
      {
        title: 'تغییر املای نام متد به جای بازنویسی واقعی',
        wrongCode: `class SmartPhone(Mobile):\n    def showInfo(self):  # به جای show_info نوشته شد!`,
        rightCode: `class SmartPhone(Mobile):\n    def show_info(self):  # دقیقاً همنام متد والد`,
        explanation: 'تفاوت حروف کوچک و بزرگ باعث می‌شود بازنویسی انجام نشود و همچنان نسخه والد اجرا گردد.',
      },
      {
        title: 'استفاده از شرط‌های طولانی if type == به جای چندریختی',
        wrongCode: `if type(d) == SmartPhone: d.smart_info()\nelif type(d) == Mobile: d.mobile_info()`,
        rightCode: `for d in devices:\n    d.show_info()`,
        explanation: 'چندریختی کدهای شرطی شلوغ را به یک فراخوانی تمیز و واحد تبدیل می‌کند.',
      },
    ],
    examples: [
      {
        id: 'ex-4-1-ov-basic',
        tier: 'basic',
        title: 'بازنویسی متد show_info در SmartPhone',
        bookPage: '۲۴۷',
        summary: 'مقایسه خروجی show_info روی کلاس والد Mobile و کلاس فرزند SmartPhone.',
        language: 'python',
        engine: 'python',
        code: `class Mobile:
    def __init__(self, brand, model):
        self.brand = brand
        self.model = model

    def show_info(self):
        print(f"موبایل پایه: {self.brand} {self.model}")

class SmartPhone(Mobile):
    def __init__(self, brand, model, os_name):
        super().__init__(brand, model)
        self.os_name = os_name

    def show_info(self):
        print(f"گوشی هوشمند: {self.brand} {self.model} با سیستم‌عامل {self.os_name}")

m = Mobile("Nokia", "105")
s = SmartPhone("Samsung", "A55", "Android 15")

m.show_info()
s.show_info()`,
        teacherTalkingPoints: [
          'دقت کنید هر دو خط آخر دقیقاً یک متد (show_info) را صدا می‌زنند اما دو خروجی متفاوت تولید می‌شود.',
        ],
        lineExplanations: [
          {line: 14, explanation: 'بازنویسی متد show_info مخصوص گوشی‌های هوشمند.'},
        ],
        commonMistakes: ['فراموش کردن پارامتر self هنگام بازنویسی متد.'],
      },
      {
        id: 'ex-4-1-ov-practical',
        tier: 'practical',
        title: 'توسعه متد والد با super().show_info() بدون تکرار کد',
        bookPage: '۲۴۸',
        summary: 'فراخوانی نسخه والد داخل متد فرزند و افزودن اطلاعات تکمیلی.',
        language: 'python',
        engine: 'python',
        code: `class Mobile:
    def __init__(self, brand, model):
        self.brand = brand
        self.model = model

    def describe(self):
        return f"{self.brand} {self.model}"

class SmartPhone(Mobile):
    def __init__(self, brand, model, os_name):
        super().__init__(brand, model)
        self.os_name = os_name

    def describe(self):
        base = super().describe()
        return f"{base} | سیستم‌عامل: {self.os_name}"

s = SmartPhone("Apple", "iPhone 15", "iOS 18")
print(s.describe())`,
        teacherTalkingPoints: [
          'نشان دهید super() فقط برای __init__ نیست؛ برای صدا زدن هر متد دیگری از کلاس والد هم کاربرد دارد!',
        ],
        lineExplanations: [
          {line: 15, explanation: 'ابتدا خروجی متد describe والد را می‌گیریم و سپس سیستم‌عامل را به آن می‌چسبانیم.'},
        ],
        commonMistakes: ['صدا زدن self.describe() داخل خود describe که باعث بازگشت بی‌نهایت (RecursionError) می‌شود!'],
      },
      {
        id: 'ex-4-1-ov-combined',
        tier: 'combined',
        title: 'چندریختی واقعی: محاسبه قیمت نهایی برای کالاهای متفاوت در سبد خرید',
        bookPage: '۲۴۹',
        summary: 'چند کلاس مختلف با متد مشترک final_price() در یک حلقه واحد.',
        language: 'python',
        engine: 'python',
        code: `class Product:
    def __init__(self, title, price):
        self.title = title
        self.price = price

    def final_price(self):
        return self.price

class DiscountedProduct(Product):
    def __init__(self, title, price, percent):
        super().__init__(title, price)
        self.percent = percent

    def final_price(self):
        return int(self.price * (100 - self.percent) / 100)

class TaxedProduct(Product):
    def final_price(self):
        return int(self.price * 1.09)

cart = [
    Product("کابل شارژ", 200000),
    DiscountedProduct("قاب گوشی", 300000, 20),
    TaxedProduct("شارژر اصلی", 1000000)
]

total = 0
for item in cart:
    p = item.final_price()
    total += p
    print(f"- {item.title}: {p} تومان")
print("جمع کل فاکتور:", total, "تومان")`,
        teacherTalkingPoints: [
          'این بهترین مثال برای نشان دادن قدرت چندریختی در دنیای واقعی فروشگاه‌های اینترنتی است.',
        ],
        lineExplanations: [
          {line: 29, explanation: 'حلقه اصلاً نمی‌داند item از کدام کلاس است؛ فقط متد مشترک final_price() را صدا می‌زند!'},
        ],
        commonMistakes: ['گذاشتن نام‌های متفاوت مثل get_discount_price و get_tax_price که چندریختی را خراب می‌کند.'],
      },
      {
        id: 'ex-4-1-ov-whatif',
        tier: 'what-if',
        title: 'بازنویسی متد ویژه __str__ برای چاپ خوانای اشیا (پیش‌نیاز مدل‌های جنگو)',
        bookPage: '۲۴۸',
        summary: 'تبدیل خروجی ناخوانای <__main__.Mobile object> به یک متن فارسی زیبا هنگام print(obj).',
        language: 'python',
        engine: 'python',
        code: `class City:
    def __init__(self, title, lat, lon):
        self.title = title
        self.lat = lat
        self.lon = lon

    def __str__(self):
        return f"شهر {self.title} ({self.lat}, {self.lon})"

c = City("همدان", 34.7981, 48.5146)
print(c)`,
        teacherTalkingPoints: [
          'به کلاس نوید بدهید دقیقاً همین متد __str__ را در پودمان ۵ (فصل جنگو، کلاس City) خواهید نوشت!',
        ],
        lineExplanations: [
          {line: 7, explanation: 'متد __str__ هنگام تبدیل شیء به رشته یا چاپ آن با print خودکار فراخوانی می‌شود.'},
        ],
        commonMistakes: ['استفاده از print() به جای return رشته درون __str__.'],
      },
    ],
  },

  // ==================== LESSON 5 ====================
  {
    id: 'lesson-4-1-encapsulation',
    order: 5,
    title: 'کپسوله‌سازی (Encapsulation): public، _protected، __private (اصلاح ص ۲۵۰)',
    bookPage: '۲۴۹ تا ۲۵۱',
    whyWeNeedIt: {
      realWorldProblem:
        'اگر هر بخشی از برنامه بتواند مستقیماً بنویسد phone.battery = -500 یا account.balance = 999999999، امنیت و صحت داده‌ها از بین می‌رود! کپسوله‌سازی داده‌های حساس را قفل می‌کند تا تغییر آن‌ها فقط از طریق متدهای کنترل‌شده (Getter/Setter) ممکن باشد.',
      analogy:
        'کپسوله‌سازی مانند دستگاه خودپرداز بانک (ATM) است؛ شما نمی‌توانید دستتان را مستقیم داخل گاوصندوق پول بکنید، بلکه فقط از طریق دکمه‌های امن دستگاه (متدها) پس از بررسی رمز و موجودی، پول برداشت می‌کنید.',
    },
    syntaxAnatomy: {
      template: `class Mobile:\n    def __init__(self):\n        self.brand = "Samsung"    # عمومی (Public)\n        self._temp = 35           # محافظت‌شده (Protected)\n        self.__battery = 100      # خصوصی (Private)`,
      parts: [
        {token: 'self.brand', role: 'عمومی (Public): از هر جای برنامه قابل خواندن و تغییر است.'},
        {token: 'self._temp', role: 'محافظت‌شده (Protected — یک زیرخط): قرارداد برنامه‌نویسان که فقط داخل کلاس و فرزندان استفاده شود.'},
        {token: 'self.__battery', role: 'خصوصی (Private — دو زیرخط چسبیده!): فقط از درون خود کلاس قابل دسترس است (اصلاح فاصله غلط ص ۲۵۰).'},
        {token: 'get_ / set_', role: 'متدهای خواندن (Getter) و تغییر کنترل‌شده با اعتبارسنجی (Setter).'},
      ],
    },
    behindTheScenes: [
      'هشدار بحرانی ص ۲۵۰ کتاب: در کتاب درسی بین دو زیرخط فاصله افتاده و به شکل self._ _battery چاپ شده است که خطای SyntaxError می‌دهد! در پایتون دو زیرخط باید کاملاً به هم چسبیده باشند: self.__battery.',
      'پایتون در پشت صحنه برای ویژگی‌های دو زیرخط (__battery) مکانیزم Name Mangling اجرا می‌کند تا دسترسی تصادفی از بیرون کلاس (مثل phone.__battery) مسدود شود.',
      'متد Setter بهترین جا برای اعتبارسنجی است؛ مثلاً اگر کاربری خواست باتری را 150 یا -10 تنظیم کند، Setter اجازه نمی‌دهد و خطا اعلام می‌کند.',
      'کلاس‌های فرزند هم به ویژگی‌های __private والد دسترسی مستقیم ندارند و باید از طریق متد get_battery() والد مقدار آن را بخوانند.',
    ],
    goldenTips: [
      'دقت کنید بین دو زیرخط هیچ فاصله‌ای نگذارید: __battery درست است، _ _battery غلط است.',
      'نام‌گذاری استاندارد Getter و Setter در سطح هنرستان get_battery() و set_battery(value) است که بسیار شفاف و قابل درک است.',
    ],
    wrongVsRight: [
      {
        title: 'خطای تایپی واقعی ص ۲۵۰ کتاب (فاصله بین دو زیرخط)',
        wrongCode: `self._ _battery = 100  # SyntaxError!`,
        rightCode: `self.__battery = 100  # دو زیرخط کاملاً چسبیده`,
        explanation: 'در چاپ کتاب یک فاصله بین دو علامت _ افتاده که در اجرای واقعی پایتون خطا می‌دهد.',
      },
      {
        title: 'تغییر مستقیم ویژگی خصوصی از بیرون کلاس',
        wrongCode: `phone.__battery = -20  # به ویژگی خصوصی واقعی دسترسی ندارد!`,
        rightCode: `phone.set_battery(85)  # تغییر امن و اعتبارسنجی‌شده`,
        explanation: 'همیشه تغییر ویژگی خصوصی را از طریق متد Setter انجام دهید.',
      },
    ],
    examples: [
      {
        id: 'ex-4-1-enc-basic',
        tier: 'basic',
        title: 'سه سطح دسترسی public، _protected و __private (اصلاح ص ۲۵۰)',
        bookPage: '۲۵۰',
        summary: 'نمایش ویژگی‌های عمومی، محافظت‌شده و خصوصی با متد get_battery().',
        language: 'python',
        engine: 'python',
        code: `class Mobile:
    def __init__(self, brand):
        self.brand = brand          # عمومی (Public)
        self._serial = "SN-1405"    # محافظت‌شده (Protected)
        self.__battery = 100        # خصوصی (Private) - اصلاح فاصله ص ۲۵۰

    def get_battery(self):
        return self.__battery

m = Mobile("Samsung")
print("عمومی (brand):", m.brand)
print("محافظت‌شده (_serial):", m._serial)
print("خواندن خصوصی از طریق متد:", m.get_battery(), "%")`,
        teacherTalkingPoints: [
          'خط ۵ را با ص ۲۵۰ کتاب مقایسه کنید و به هنرجویان بگویید با خودکار فاصله غلط داخل کتابشان را خط بزنند!',
        ],
        lineExplanations: [
          {line: 5, explanation: 'دو زیرخط چسبیده ویژگی __battery را محافظت و مخفی می‌کند.'},
          {line: 7, explanation: 'متد Getter راه ایمن خواندن مقدار خصوصی از بیرون کلاس است.'},
        ],
        commonMistakes: ['گذاشتن فاصله بین دو زیرخط مانند چاپ کتاب ص ۲۵۰.'],
        bookCorrection: {
          page: 250,
          issue: 'در ص ۲۵۰ کد ویژگی خصوصی با فاصله میانی به صورت self._ _battery چاپ شده است.',
          fix: 'به شکل استاندارد و اجرایی self.__battery اصلاح شد.',
        },
      },
      {
        id: 'ex-4-1-enc-practical',
        tier: 'practical',
        title: 'متدهای Getter و Setter با اعتبارسنجی محدوده مجاز (۰ تا ۱۰۰)',
        bookPage: '۲۵۱',
        summary: 'جلوگیری از ثبت مقادیر نامعتبر برای درصد باتری توسط set_battery().',
        language: 'python',
        engine: 'python',
        code: `class Mobile:
    def __init__(self, model):
        self.model = model
        self.__battery = 100

    def get_battery(self):
        return self.__battery

    def set_battery(self, value):
        if value >= 0 and value <= 100:
            self.__battery = value
            print(f"باتری {self.model} روی {self.__battery}% تنظیم شد.")
        else:
            print(f"خطا: مقدار {value} خارج از محدوده مجاز ۰ تا ۱۰۰ است!")

phone = Mobile("Xiaomi 14")
phone.set_battery(75)
phone.set_battery(140)
phone.set_battery(-10)
print("وضعیت نهایی باتری:", phone.get_battery(), "%")`,
        teacherTalkingPoints: [
          'نشان دهید دو مقدار نامعتبر 140 و -10 رد شدند و مقدار باتری روی آخرین عدد سالم (75) باقی ماند!',
        ],
        lineExplanations: [
          {line: 10, explanation: 'اعتبارسنجی بازه ۰ تا ۱۰۰ پیش از تغییر ویژگی خصوصی.'},
        ],
        commonMistakes: ['نوشتن Setter بدون هیچ شرط اعتبارسنجی (در آن صورت مزیت امنیتی کپسوله‌سازی از بین می‌رود).'],
      },
      {
        id: 'ex-4-1-enc-combined',
        tier: 'combined',
        title: 'کیف پول الکترونیکی کپسوله‌شده با رمز عبور خصوصی',
        bookPage: '۲۵۱',
        summary: 'ترکیب دو ویژگی خصوصی (__balance و __pin) با متدهای واریز و برداشت امن.',
        language: 'python',
        engine: 'python',
        code: `class Wallet:
    def __init__(self, owner, pin, balance=0):
        self.owner = owner
        self.__pin = pin
        self.__balance = balance

    def deposit(self, amount):
        if amount > 0:
            self.__balance += amount
            print(f"واریز {amount} تومان انجام شد.")

    def withdraw(self, amount, pin):
        if pin != self.__pin:
            print("خطا: رمز کیف پول اشتباه است!")
        elif amount > self.__balance:
            print("خطا: موجودی کافی نیست!")
        else:
            self.__balance -= amount
            print(f"برداشت {amount} تومان موفق بود.")

    def get_balance(self, pin):
        if pin == self.__pin:
            return self.__balance
        return "دسترسی غیرمجاز"

w = Wallet("سارا", "1234", 500000)
w.deposit(200000)
w.withdraw(100000, "0000")
w.withdraw(150000, "1234")
print("موجودی نهایی:", w.get_balance("1234"))`,
        teacherTalkingPoints: [
          'این مثال حس واقعی امنیت نرم‌افزار را به دانش‌آموزان منتقل می‌کند.',
        ],
        lineExplanations: [
          {line: 13, explanation: 'تا رمز خصوصی تأیید نشود امکان برداشت وجود ندارد.'},
        ],
        commonMistakes: ['بازگرداندن __pin در متد نمایش اطلاعات که رمز را لو می‌دهد!'],
      },
      {
        id: 'ex-4-1-enc-whatif',
        tier: 'what-if',
        title: 'دسترسی کلاس فرزند به ویژگی خصوصی والد از طریق Getter',
        bookPage: '۲۵۱',
        summary: 'چرا کلاس فرزند SmartPhone برای خواندن __battery والد باید از self.get_battery() استفاده کند؟',
        language: 'python',
        engine: 'python',
        code: `class Mobile:
    def __init__(self, brand):
        self.brand = brand
        self.__battery = 90

    def get_battery(self):
        return self.__battery

class SmartPhone(Mobile):
    def __init__(self, brand, os_name):
        super().__init__(brand)
        self.os_name = os_name

    def report(self):
        # دسترسی ایمن از طریق Getter والد به جای self.__battery
        print(f"{self.brand} ({self.os_name}) | باتری: {self.get_battery()}%")

sp = SmartPhone("Samsung", "Android")
sp.report()`,
        teacherTalkingPoints: [
          'توضیح دهید حتی فرزند هم نباید مستقیماً به ویژگی __private والد دست بزند؛ بلکه از متد عمومی get_battery() که به ارث برده استفاده می‌کند.',
        ],
        lineExplanations: [
          {line: 16, explanation: 'فراخوانی متد به ارث برده‌شده get_battery() در کلاس فرزند.'},
        ],
        commonMistakes: ['نوشتن self.__battery داخل کلاس فرزند که خطای AttributeError می‌دهد.'],
      },
    ],
  },

  // ==================== LESSON 6 ====================
  {
    id: 'lesson-4-1-metaclass',
    order: 6,
    title: 'متاکلاس (Metaclass)، تابع type() و isinstance() — تکمیل شکاف هدف ۵',
    bookPage: '۲۳۴ و ۲۵۲ (تکمیل مبحث حذف‌شده از متن کتاب)',
    whyWeNeedIt: {
      realWorldProblem:
        'در صفحه ۲۳۴ کتاب (هدف ۵) و صفحه ۲۵۲ (ردیف ۵ جدول ارزشیابی) از هنرجو خواسته شده نوع کلاس‌ها را با type() بررسی کرده و مفهوم متاکلاس را بشناسد؛ اما این بخش در متن کتاب جا افتاده است! علاوه بر این، فریم‌ورک Django در پودمان ۵ دقیقاً با کمک متاکلاس‌ها، کلاس مدل City شما را خودکار به جدول پایگاه‌داده SQLite تبدیل می‌کند.',
      analogy:
        'اگر «شیء گوشی» محصول کارخانه باشد و «کلاس Mobile» خط تولید گوشی باشد، «متاکلاس type» شرکت مهندسیِ سازنده خودِ خط‌های تولید است! در پایتون همه‌چیز — حتی خود کلاس‌ها — یک شیء است.',
    },
    syntaxAnatomy: {
      template: `m = Mobile("Nokia", "105")\nprint(type(m))        # <class 'Mobile'>\nprint(type(Mobile))   # <class 'type'>\nprint(isinstance(m, Mobile))  # True`,
      parts: [
        {token: 'type(m)', role: 'کلاس سازنده یک نمونه را برمی‌گرداند (<class \'Mobile\'>).'},
        {token: 'type(Mobile)', role: 'سازنده خودِ کلاس را نشان می‌دهد که در پایتون متاکلاس داخلی <class \'type\'> است.'},
        {token: 'isinstance(obj, Cls)', role: 'بررسی می‌کند آیا شیء از کلاس Cls (یا یکی از فرزندان آن) ساخته شده است یا خیر.'},
      ],
    },
    behindTheScenes: [
      'زنجیره سه‌طبقه پایتون را روی تخته بنویسید: متاکلاس type ⟶ می‌سازد ⟶ کلاس SmartPhone ⟶ می‌سازد ⟶ شیء my_smartphone.',
      'تفاوت بسیار مهم type(obj) == Mobile و isinstance(obj, Mobile): برای شیء فرزند SmartPhone، عبارت isinstance(sp, Mobile) برابر True است (چون SmartPhone یک نوع Mobile است)، اما type(sp) == Mobile برابر False است!',
      'حتی نوع‌های پایه پایتون مثل int، str و list نیز کلاس هستند و متاکلاس همه آن‌ها type است: type(int) برابر <class \'type\'>.',
      'در پودمان ۵ (جنگو)، وقتی می‌نویسید class City(models.Model): یک متاکلاس داخلی جنگو (ModelBase) ستون‌های جدول SQLite را خودکار از روی ویژگی‌های کلاس شما استخراج می‌کند.',
    ],
    goldenTips: [
      'برای نمره کامل ردیف ۵ جدول ارزشیابی (ص ۲۵۲)، کافی است هنرجو بتواند خروجی type(obj)، type(ClassName) و isinstance() را اجرا و توضیح دهد.',
      'در بررسی نوع اشیا در پروژه‌های شیءگرا همیشه isinstance() را به مقایسه مستقیم type() == ... ترجیح دهید تا با وراثت سازگار باشد.',
    ],
    wrongVsRight: [
      {
        title: 'اشتباه گرفتن type(شیء) با type(کلاس)',
        wrongCode: `# تصور اینکه type(Mobile) همان Mobile را برمی‌گرداند!`,
        rightCode: `print(type(my_phone))  # <class 'Mobile'>\nprint(type(Mobile))    # <class 'type'> (متاکلاس!)`,
        explanation: 'type(شیء) نام کلاس آن را می‌دهد، اما type(کلاس) نام متاکلاس سازنده آن یعنی type را نشان می‌دهد.',
      },
      {
        title: 'مقایسه مستقیم type با کلاس والد در ساختار وراثت',
        wrongCode: `if type(sp) == Mobile:  # برای SmartPhone برابر False می‌شود!`,
        rightCode: `if isinstance(sp, Mobile):  # برای Mobile و تمام فرزندانش True است!`,
        explanation: 'isinstance سلسله‌مراتب وراثت را کامل درک می‌کند.',
      },
    ],
    examples: [
      {
        id: 'ex-4-1-meta-basic',
        tier: 'basic',
        title: 'آزمون سه‌طبقه پایتون: نمونه ← کلاس ← متاکلاس type',
        bookPage: '۲۳۴ و ۲۵۲',
        summary: 'پوشش دقیق ردیف ۵ جدول ارزشیابی با مقایسه type روی نمونه، کلاس و نوع‌های پایه.',
        language: 'python',
        engine: 'python',
        code: `class Mobile:
    def __init__(self, brand):
        self.brand = brand

m = Mobile("Samsung")

print("۱. نوع شیء m:", type(m))
print("۲. نوع کلاس Mobile (متاکلاس):", type(Mobile))
print("۳. نوع کلاس int (متاکلاس):", type(int))
print("۴. نوع خودِ type:", type(type))`,
        teacherTalkingPoints: [
          'با دیدن خروجی خط ۲ (<class \'type\'>) جمله طلایی پایتون را بگویید: «در پایتون کلاس‌ها هم خودشان شیء هستند و سازنده‌شان متاکلاس type است.»',
        ],
        lineExplanations: [
          {line: 7, explanation: 'سازنده نمونه m کلاس Mobile است.'},
          {line: 8, explanation: 'سازنده کلاس Mobile متاکلاس type است.'},
        ],
        commonMistakes: ['گذاشتن پرانتز بعد از Mobile داخل type(Mobile()) که به جای بررسی خود کلاس، یک نمونه جدید می‌سازد!'],
        bookCorrection: {
          page: 252,
          issue: 'مبحث متاکلاس در هدف ۵ (ص ۲۳۴) و ردیف ۵ ارزشیابی (ص ۲۵۲) ذکر شده اما در متن فصل حذف شده بود.',
          fix: 'درسنامه و مثال‌های عملی کامل برای پوشش ۱۰۰٪ این شکاف درسی تدوین شد.',
        },
      },
      {
        id: 'ex-4-1-meta-practical',
        tier: 'practical',
        title: 'تفاوت isinstance() با type() در سلسله‌مراتب وراثت',
        bookPage: '۲۵۲',
        summary: 'بررسی عضویت اشیای SmartPhone و GamingPhone در کلاس‌های والد با isinstance.',
        language: 'python',
        engine: 'python',
        code: `class Mobile:
    pass

class SmartPhone(Mobile):
    pass

class GamingPhone(SmartPhone):
    pass

gp = GamingPhone()

print("isinstance(gp, GamingPhone):", isinstance(gp, GamingPhone))
print("isinstance(gp, SmartPhone):", isinstance(gp, SmartPhone))
print("isinstance(gp, Mobile):", isinstance(gp, Mobile))
print("type(gp) == Mobile:", type(gp) == Mobile)`,
        teacherTalkingPoints: [
          'روی خط آخر مکث کنید: با اینکه GamingPhone یک Mobile است، type(gp) == Mobile نتیجه False می‌دهد اما isinstance نتیجه True می‌دهد!',
        ],
        lineExplanations: [
          {line: 14, explanation: 'isinstance در کل شجره وراثت به بالا حرکت کرده و True برمی‌گرداند.'},
        ],
        commonMistakes: ['جابه‌جا نوشتن ترتیب آرگومان‌ها در isinstance(Mobile, gp) که خطا می‌دهد (اول شیء، دوم کلاس).'],
      },
      {
        id: 'ex-4-1-meta-combined',
        tier: 'combined',
        title: 'پروژه جامع واحد ۴.۱: Mobile ← SmartPhone + کپسوله‌سازی + متاکلاس',
        bookPage: '۲۴۷–۲۵۲',
        summary: 'جمع‌بندی هر ۵ معیار جدول ارزشیابی واحد ۴.۱ در یک برنامه واحد و تمیز.',
        language: 'python',
        engine: 'python',
        code: `class Mobile:
    def __init__(self, brand, model):
        self.brand = brand
        self.model = model
        self.__battery = 100

    def get_battery(self):
        return self.__battery

    def show_info(self):
        print(f"موبایل: {self.brand} {self.model} | باتری: {self.__battery}%")

class SmartPhone(Mobile):
    def __init__(self, brand, model, os_name):
        super().__init__(brand, model)
        self.os_name = os_name

    def show_info(self):
        print(f"گوشی هوشمند: {self.brand} {self.model} ({self.os_name}) | باتری: {self.get_battery()}%")

my_smartphone = SmartPhone("Samsung", "A55", "Android 15")
my_smartphone.show_info()

print("نوع نمونه:", type(my_smartphone))
print("آیا از خانواده Mobile است؟", isinstance(my_smartphone, Mobile))
print("متاکلاس سازنده SmartPhone:", type(SmartPhone))`,
        teacherTalkingPoints: [
          'این کد دقیقاً می‌تواند به عنوان الگوی نمره ۳ کامل برای هر ۵ مرحله جدول ارزشیابی ص ۲۵۲–۲۵۳ روی تخته نمایش داده شود.',
        ],
        lineExplanations: [
          {line: 5, explanation: 'کپسوله‌سازی صحیح __battery بدون فاصله غلط ص ۲۵۰.'},
          {line: 15, explanation: 'وراثت تمیز با super().__init__().'},
          {line: 26, explanation: 'بررسی متاکلاس سازنده کلاس.'},
        ],
        commonMistakes: ['جا انداختن یکی از ۵ محور (سازنده، متد، وراثت، کپسوله‌سازی یا متاکلاس) در پروژه پایانی.'],
      },
      {
        id: 'ex-4-1-meta-whatif',
        tier: 'what-if',
        title: 'فیلتر کردن خودکار اشیا بر اساس نوع کلاس در یک سبد مختلط',
        bookPage: '۲۵۲',
        summary: 'کاربرد عملی isinstance برای جدا کردن گوشی‌های هوشمند از گوشی‌های ساده در انبار.',
        language: 'python',
        engine: 'python',
        code: `class Mobile:
    def __init__(self, name):
        self.name = name

class SmartPhone(Mobile):
    pass

inventory = [
    Mobile("Nokia 105"),
    SmartPhone("Samsung A55"),
    Mobile("Nokia 1100"),
    SmartPhone("iPhone 15")
]

smart_count = 0
for item in inventory:
    if isinstance(item, SmartPhone):
        smart_count += 1
        print("گوشی هوشمند:", item.name)

print("تعداد کل گوشی‌های هوشمند:", smart_count)`,
        teacherTalkingPoints: [
          'نشان دهید چگونه isinstance اجازه می‌دهد در فهرست ترکیبی انبار، زیرمجموعه خاصی از اشیا را دقیق شناسایی کنیم.',
        ],
        lineExplanations: [
          {line: 17, explanation: 'فقط اشیایی که از نوع SmartPhone هستند انتخاب و شمارش می‌شوند.'},
        ],
        commonMistakes: ['بررسی isinstance(item, Mobile) که تمام آیتم‌ها (هم ساده و هم هوشمند) را انتخاب می‌کند!'],
      },
    ],
  },
];
