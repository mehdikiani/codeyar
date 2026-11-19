import type {ConceptLesson} from '../../../types/curriculum.ts';

/**
 * Unit 5.2 — Django Models, SQLite ORM, Authentication, ModelForm & Security (Pages 295–329)
 * 6 Deep Concept Lessons × 4 Tiered Runnable Examples = 24 Examples.
 * Covers & fixes:
 * - Page 323 critical crash bug: `City.objects.get(id=city_id)` -> `City.objects.filter(id=city_id).first()`
 * - Page 324 HTML syntax bug: unquoted `action={% url 'delete_city' %}` -> `action="{% url 'delete_city' %}"`
 * - Page 327 security vulnerability: missing `request.user.is_authenticated` check on `delete_city_view`
 * - Page 328 rubric error: `PostgreSQL` -> `SQLite` (matching `db.sqlite3` used throughout Module 5)
 */
export const UNIT_5_2_LESSONS: ConceptLesson[] = [
  // ==================== LESSON 1 ====================
  {
    id: 'lesson-5-2-models-migrations',
    order: 1,
    title: 'تعریف مدل City در models.py، مهاجرت‌ها (Migrations) و پنل ادمین SQLite',
    bookPage: '۲۹۵ تا ۳۰۵',
    whyWeNeedIt: {
      realWorldProblem:
        'در واحد ۵.۱ مختصات شهر همدان به‌صورت ثابت داخل کد views.py نوشته شده بود؛ اگر بخواهیم ۱۰۰ شهر ایران را مدیریت کنیم و مدیر سایت بدون دست زدن به کد بتواند شهر جدید اضافه یا ویرایش کند، به یک پایگاه‌داده رابطه‌ای (SQLite) و کلاس مدل جنگو نیاز داریم.',
      analogy:
        'کلاس Model در پایتون مانند نقشه معماری یک جدول اکسل است، دستور makemigrations نقشه تغییرات را روی کاغذ ثبت می‌کند و دستور migrate کارگران ساختمانی هستند که آن جدول واقعی را داخل فایل db.sqlite3 می‌سازند!',
    },
    syntaxAnatomy: {
      template: `class City(models.Model):\n    title = models.CharField(max_length=100)\n    lat = models.FloatField()\n    lon = models.FloatField()\n\n    def __str__(self):\n        return self.title`,
      parts: [
        {token: 'class City(models.Model):', role: 'وراثت از models.Model (مهارت واحد ۴.۱!) باعث می‌شود جنگو خودکار جدول weather_city را بسازد.'},
        {token: 'CharField / FloatField', role: 'تعیین نوع ستون‌های جدول: متن با سقف کاراکتر و عدد اعشاری برای مختصات.'},
        {token: 'def __str__(self):', role: 'نمایش خوانای نام فارسی شهر در پنل ادمین به جای عبارت ناخوانای City object (1).'},
        {token: 'makemigrations & migrate', role: 'دو دستور طلایی اعمال تغییرات مدل روی پایگاه‌داده db.sqlite3.'},
      ],
    },
    behindTheScenes: [
      'نام واقعی جدول ساخته‌شده توسط جنگو در پایگاه‌داده همیشه به صورت appname_modelname است؛ پس مدل City در اپلیکیشن weather تبدیل به جدول weather_city در فایل db.sqlite3 می‌شود!',
      'جنگو برای هر مدل به طور خودکار یک ستون کلید اصلی id (عدد صحیح افزایشی PRIMARY KEY AUTOINCREMENT) می‌سازد؛ نیازی نیست خودتان آن را بنویسید.',
      'تصحیح مهم ص ۳۲۸ کتاب: در جدول ارزشیابی پایان فصل اشتباهاً نام پایگاه‌داده PostgreSQL چاپ شده، اما کل پروژه کتاب از فایل پیش‌فرض و بدون نیاز به نصب db.sqlite3 (SQLite) استفاده می‌کند.',
      'برای دیدن مدل City داخل پنل آماده /admin/ باید در فایل weather/admin.py بنویسیم: admin.site.register(City) و یک مدیر با python manage.py createsuperuser بسازیم.',
    ],
    goldenTips: [
      'هر زمان فیلدی به models.py اضافه یا ویرایش کردید، همیشه جفت دستور makemigrations و سپس migrate را اجرا کنید.',
      'ارتباط شگفت‌انگیز پودمان ۴ و ۵ را به کلاس یادآوری کنید: models.Model همان وراثت و متاکلاس واحد ۴.۱ است!',
    ],
    wrongVsRight: [
      {
        title: 'اجرای makemigrations بدون اجرای migrate',
        wrongCode: `python manage.py makemigrations\n# اجرای مستقیم سایت -> OperationalError: no such table: weather_city!`,
        rightCode: `python manage.py makemigrations\npython manage.py migrate`,
        explanation: 'makemigrations فقط فایل نقشه مهاجرت را می‌سازد؛ تا migrate اجرا نشود جدولی در SQLite ساخته نمی‌شود.',
      },
      {
        title: 'فراموش کردن ثبت مدل در admin.py یا تعریف نکردن __str__',
        wrongCode: `class City(models.Model):\n    title = models.CharField(max_length=100)\n# در ادمین دیده نمی‌شود یا به شکل City object (1) چاپ می‌شود!`,
        rightCode: `class City(models.Model):\n    title = models.CharField(max_length=100)\n    def __str__(self):\n        return self.title`,
        explanation: 'ثبت با admin.site.register(City) و نوشتن __str__ پنل ادمین را کاملاً فارسی و حرفه‌ای می‌کند.',
      },
    ],
    examples: [
      {
        id: 'ex-5-2-mod-basic',
        tier: 'basic',
        title: 'شبیه‌سازی مدل City، کلید خودکار id و متد __str__',
        bookPage: '۲۹۸–۳۰۰',
        summary: 'نمایش شیءگرای مدل City و نحوه تبدیل ویژگی‌های کلاس به رکورد جدول weather_city.',
        language: 'python',
        engine: 'python',
        code: `class City:
    _auto_id = 1

    def __init__(self, title, lat, lon):
        self.id = City._auto_id
        City._auto_id += 1
        self.title = title
        self.lat = lat
        self.lon = lon

    def __str__(self):
        return f"[{self.id}] {self.title} ({self.lat}, {self.lon})"

c1 = City("تهران", 35.6892, 51.3890)
c2 = City("همدان", 34.7981, 48.5146)

print(c1)
print(c2)`,
        teacherTalkingPoints: [
          'ببینید چطور ویژگی کلاس _auto_id (که در واحد ۴.۱ آموختیم) دقیقاً کار ستون کلید اصلی خودکار (Primary Key) در جنگو را شبیه‌سازی می‌کند!',
        ],
        lineExplanations: [
          {line: 5, explanation: 'تولید خودکار شناسه یکتای id برای هر شهر جدید.'},
          {line: 11, explanation: 'بازنویسی __str__ برای نمایش خوانای شیء.'},
        ],
        commonMistakes: ['فراموش کردن max_length در models.CharField(max_length=100) داخل پروژه واقعی جنگو.'],
      },
      {
        id: 'ex-5-2-mod-practical',
        tier: 'practical',
        title: 'مشاهده ساختار جدول واقعی weather_city ساخته‌شده در SQLite',
        bookPage: '۳۰۰–۳۰۵',
        summary: 'اجرای واقعی دستور PRAGMA روی موتور SQLite WASM برای دیدن ستون‌ها و نوع داده‌های جدول weather_city.',
        language: 'sql',
        engine: 'django-sql',
        code: `PRAGMA table_info(weather_city);`,
        teacherTalkingPoints: [
          'دکمه «اجرا روی SQLite / جنگو» را بزنید تا دانش‌آموزان ستون‌های واقعی جدول weather_city (id, title, lat, lon) را در SQLite ببینند!',
        ],
        lineExplanations: [
          {line: 1, explanation: 'دستور ویژه SQLite برای نمایش شناسنامه و ستون‌های یک جدول.'},
        ],
        commonMistakes: ['جستجوی جدول به نام City به جای نام استاندارد جنگویی weather_city.'],
        bookCorrection: {
          page: 328,
          issue: 'در ردیف ۱ جدول ارزشیابی ص ۳۲۸ نام پایگاه‌داده اشتباهاً PostgreSQL چاپ شده بود.',
          fix: 'مطابق تمام فصل (ص ۳۰۰ تا ۳۲۷) پایگاه‌داده پروژه SQLite (فایل db.sqlite3) است.',
        },
      },
      {
        id: 'ex-5-2-mod-combined',
        tier: 'combined',
        title: 'بررسی رکوردهای اولیه جدول weather_city با ORM پس از migrate',
        bookPage: '۳۰۵',
        summary: 'بازیابی تمام شهرهای ایران از جدول SQLite و مشاهده ترجمه SQL آن.',
        language: 'python',
        engine: 'django-sql',
        code: `City.objects.all()
City.objects.count()`,
        teacherTalkingPoints: [
          'در خروجی، عرض جغرافیایی ردیف ۲ (همدان: 34.7981) را نشان دهید که از اشتباه 37.7981 کتاب اصلاح شده است.',
        ],
        lineExplanations: [
          {line: 1, explanation: 'خواندن کل رکوردهای جدول weather_city.'},
          {line: 2, explanation: 'شمارش تعداد کل شهرهای ثبت‌شده.'},
        ],
        commonMistakes: ['اجرای کوئری پیش از ثبت اولین رکوردها یا پیش از migrate.'],
      },
      {
        id: 'ex-5-2-mod-whatif',
        tier: 'what-if',
        title: 'نمایش لیست رکوردهای مدل در قالب شبیه پنل مدیریت Django Admin',
        bookPage: '۳۰۳',
        summary: 'نمایش جدول مدیریتی شهرها همراه با شناسه id و لینک ویرایش/مشاهده.',
        language: 'django-html',
        engine: 'django-sql',
        code: `<div style="direction:rtl;font-family:Vazirmatn,sans-serif;border:1px solid #cbd5e1;border-radius:10px;overflow:hidden;">
  <div style="background:#0f172a;color:#fff;padding:10px 14px;font-weight:bold;">پنل مدیریت جنگو — جدول weather_city ({{ user.username }})</div>
  <div style="padding:10px;">
    {% for c in cities %}
      <div style="display:flex;justify-content:space-between;padding:6px 4px;border-bottom:1px solid #e2e8f0;">
        <span><strong>#{{ c.id }}</strong> — {{ c.title }}</span>
        <span style="font-family:monospace;color:#475569;">({{ c.lat }}, {{ c.lon }})</span>
      </div>
    {% endfor %}
  </div>
</div>`,
        teacherTalkingPoints: [
          'توضیح دهید پنل مدیریت آماده یکی از بزرگ‌ترین نقاط قوت جنگو است که در چند ثانیه رابط گرافیکی کامل برای مدیریت پایگاه‌داده می‌دهد.',
        ],
        lineExplanations: [
          {line: 6, explanation: 'نمایش کلید اصلی id و نام هر شهر.'},
        ],
        commonMistakes: ['فراموش کردن ساخت سوپریوزر با createsuperuser هنگام ورود به /admin/.'],
      },
    ],
  },

  // ==================== LESSON 2 ====================
  {
    id: 'lesson-5-2-raw-sql',
    order: 2,
    title: 'پایگاه‌داده رابطه‌ای SQLite و دستورات پایه SQL (SELECT / WHERE / ORDER BY)',
    bookPage: '۳۰۵ تا ۳۰۷',
    whyWeNeedIt: {
      realWorldProblem:
        'اگرچه Django ORM کار را با پایتون بسیار ساده می‌کند، اما در پشت صحنه تمام دستورات ORM به زبان استاندارد SQL ترجمه شده و روی پایگاه‌داده اجرا می‌شوند! آشنایی با دستورات اصلی SQL (انتخاب، فیلتر، مرتب‌سازی و درج) به شما کمک می‌کند عمیقاً بفهمید در پایگاه‌داده چه می‌گذرد.',
      analogy:
        'SQL زبان مادری پایگاه‌داده‌هاست (مثل زبان انگلیسی در فرودگاه‌های بین‌المللی)؛ ORM جنگو مترجمی است که جملات پایتونی شما را برای SQLite به SQL ترجمه می‌کند.',
    },
    syntaxAnatomy: {
      template: `SELECT id, title, lat, lon\nFROM weather_city\nWHERE lat > 34.0\nORDER BY lat DESC;`,
      parts: [
        {token: 'SELECT ... FROM', role: 'تعیین ستون‌های مورد نظر و نام جدول هدف (weather_city).'},
        {token: 'WHERE شرط', role: 'فیلتر کردن ردیف‌ها (مانند lat > 34.0 یا title LIKE \'%تهر%\').'},
        {token: 'ORDER BY col ASC/DESC', role: 'مرتب‌سازی نتایج به صورت صعودی (ASC) یا نزولی (DESC).'},
        {token: 'INSERT / DELETE', role: 'افزودن رکورد جدید یا حذف رکورد مشخص با شرط WHERE.'},
      ],
    },
    behindTheScenes: [
      'در این سامانه موتور واقعی SQLite (از طریق کتابخانه sql.js WASM به‌صورت ۱۰۰٪ آفلاین) درون مرورگر اجرا می‌شود؛ یعنی تمام دستورات SQL زیر واقعاً روی یک دیتابیس SQLite اجرا می‌شوند نه یک شبیه‌ساز نمایشی!',
      'هشدار طلایی SQL: هرگز دستور DELETE FROM weather_city را بدون بند WHERE اجرا نکنید، وگرنه کل جدول یکجا پاک می‌شود!',
      'عملگر LIKE در SQL همراه با علامت درصد (%) برای جستجوی بخشی از متن استفاده می‌شود (مثلاً title LIKE \'%ر%\' تمام شهرهایی که حرف «ر» دارند را می‌آورد).',
    ],
    goldenTips: [
      'در دستور SELECT بهتر است نام ستون‌ها (id, title, lat, lon) را صریح بنویسید تا خوانایی و کارایی بالا برود.',
      'همیشه می‌توانید با دکمه «بازنشانی» بالای ویرایشگر یا در آزمایشگاه بصری، جدول را به ۸ شهر اولیه برگردانید.',
    ],
    wrongVsRight: [
      {
        title: 'اجرای DELETE بدون بند WHERE',
        wrongCode: `DELETE FROM weather_city;  -- تمام شهرهای جدول را پاک می‌کند!`,
        rightCode: `DELETE FROM weather_city WHERE id = 8;  -- فقط یک شهر مشخص حذف می‌شود`,
        explanation: 'همیشه پیش از حذف، رکورد هدف را با WHERE id = ... دقیقاً محدود کنید.',
      },
      {
        title: 'استفاده از == به جای = در شرط WHERE زبان SQL',
        wrongCode: `SELECT * FROM weather_city WHERE id == 2;`,
        rightCode: `SELECT id, title, lat, lon FROM weather_city WHERE id = 2;`,
        explanation: 'در زبان SQL استاندارد عملگر مقایسه تساوی تک‌مساوی (=) است نه دو مساوی (==).',
      },
    ],
    examples: [
      {
        id: 'ex-5-2-sql-basic',
        tier: 'basic',
        title: 'نمایش و مرتب‌سازی شهرهای نیمه شمالی ایران با SQL واقعی',
        bookPage: '۳۰۶',
        summary: 'فیلتر شهرها با عرض جغرافیایی بالای ۳۴ درجه و مرتب‌سازی از شمال به جنوب روی SQLite.',
        language: 'sql',
        engine: 'django-sql',
        code: `SELECT id, title, lat, lon
FROM weather_city
WHERE lat > 34.0
ORDER BY lat DESC;`,
        teacherTalkingPoints: [
          'دکمه اجرا را بزنید و ببینید اردبیل (38.24) و تبریز (38.09) در صدر جدول قرار می‌گیرند!',
        ],
        lineExplanations: [
          {line: 3, explanation: 'فیلتر ردیف‌هایی که عرض جغرافیایی بالای ۳۴ دارند.'},
          {line: 4, explanation: 'مرتب‌سازی نزولی از شمالی‌ترین به جنوبی‌ترین شهر.'},
        ],
        commonMistakes: ['نوشتن WHERE بعد از ORDER BY (ترتیب استاندارد: SELECT ⟶ FROM ⟶ WHERE ⟶ ORDER BY).'],
      },
      {
        id: 'ex-5-2-sql-practical',
        tier: 'practical',
        title: 'جستجوی متنی با LIKE و محدود کردن تعداد نتایج با LIMIT',
        bookPage: '۳۰۶',
        summary: 'یافتن شهرهایی که نامشان شامل حرف «ر» است و نمایش ۳ نتیجه اول.',
        language: 'sql',
        engine: 'django-sql',
        code: `SELECT id, title, lat, lon
FROM weather_city
WHERE title LIKE '%ر%'
ORDER BY id ASC
LIMIT 3;`,
        teacherTalkingPoints: [
          'بگویید این دقیقاً همان SQLای است که در پشت صحنه وقتی در ORM می‌نویسید filter(title__contains="ر") تولید می‌شود!',
        ],
        lineExplanations: [
          {line: 3, explanation: 'جستجوی زیررشته در هر جای نام شهر با %ر%.'},
          {line: 5, explanation: 'محدود کردن خروجی به حداکثر ۳ سطر.'},
        ],
        commonMistakes: ['فراموش کردن تک‌کوتیشن دور الگوی LIKE.'],
      },
      {
        id: 'ex-5-2-sql-combined',
        tier: 'combined',
        title: 'توابع تجمیعی SQL: تعداد شهرها، شمالی‌ترین و جنوبی‌ترین عرض جغرافیایی',
        bookPage: '۳۰۶',
        summary: 'محاسبه آمار جغرافیایی کل جدول weather_city در یک پرس‌وجوی SQLite.',
        language: 'sql',
        engine: 'django-sql',
        code: `SELECT
  COUNT(*) AS total_cities,
  MAX(lat) AS northernmost_lat,
  MIN(lat) AS southernmost_lat
FROM weather_city;`,
        teacherTalkingPoints: [
          'نشان دهید کلیدواژه AS نام ستون خروجی را خوانا و معنادار می‌کند.',
        ],
        lineExplanations: [
          {line: 2, explanation: 'شمارش تعداد کل ردیف‌های جدول با COUNT(*).'},
          {line: 3, explanation: 'یافتن بیشترین و کمترین عرض جغرافیایی در پایگاه‌داده.'},
        ],
        commonMistakes: ['فراموش کردن ویرگول بین ستون‌ها در دستور SELECT.'],
      },
      {
        id: 'ex-5-2-sql-whatif',
        tier: 'what-if',
        title: 'درج شهر جدید با INSERT INTO در SQLite و بازخوانی آن',
        bookPage: '۳۰۶',
        summary: 'افزودن شهر «یزد» با SQL مستقیم و بررسی ذخیره واقعی آن در جدول.',
        language: 'sql',
        engine: 'django-sql',
        code: `INSERT INTO weather_city (title, lat, lon)
VALUES ('یزد', 31.8974, 54.3569);
SELECT id, title, lat, lon FROM weather_city ORDER BY id DESC LIMIT 3;`,
        teacherTalkingPoints: [
          'نشان دهید چطور SQLite خودش به «یزد» شناسه جدید (id=9) اختصاص داده است.',
        ],
        lineExplanations: [
          {line: 1, explanation: 'درج ردیف جدید بدون نیاز به تعیین دستی id.'},
        ],
        commonMistakes: ['عدم تطابق تعداد ستون‌ها با تعداد مقادیر در VALUES.'],
      },
    ],
  },

  // ==================== LESSON 3 ====================
  {
    id: 'lesson-5-2-django-orm',
    order: 3,
    title: 'قدرت Django ORM: واکشی، فیلتر، مرتب‌سازی و درج بدون نوشتن SQL دستی',
    bookPage: '۳۰۷ تا ۳۱۳',
    whyWeNeedIt: {
      realWorldProblem:
        'نوشتن رشته‌های طولانی SQL درون کد پایتون هم مستعد خطای تایپی است و هم اگر مراقب نباشیم حفره امنیتی خطرناک SQL Injection ایجاد می‌کند! Django ORM اجازه می‌دهد تمام عملیات پایگاه‌داده را با دستورات تمیز، خوانا و کاملاً ایمن پایتونی انجام دهیم.',
      analogy:
        'ORM (نگاشت شیء-رابطه‌ای) مانند یک مترجم هم‌زمان حرفه‌ای است؛ شما به زبان پایتون می‌گویید City.objects.filter(lat__gt=35) و او بلافاصله SQL استاندارد و ضدنفوذ می‌سازد و اشیای پایتونی تحویلتان می‌دهد!',
    },
    syntaxAnatomy: {
      template: `City.objects.all()\nCity.objects.filter(lat__gt=35)\nCity.objects.order_by('-lat')\nCity.objects.create(title='کرمان', lat=30.2839, lon=57.0834)`,
      parts: [
        {token: 'City.objects', role: 'مدیر (Manager) پیش‌فرض مدل در جنگو برای ارتباط با جدول پایگاه‌داده.'},
        {token: '.all() / .first() / .last() / .count()', role: 'دریافت همه رکوردها، اولین، آخرین و تعداد کل.'},
        {token: '.filter(field__lookup=val)', role: 'فیلتر با دو زیرخط: title__contains، lat__gt (بزرگ‌تر)، lat__lt (کوچک‌تر).'},
        {token: '.order_by("-lat")', role: 'مرتب‌سازی صعودی (بدون منفی) یا نزولی (با علامت منفی -).'},
      ],
    },
    behindTheScenes: [
      'در این سامانه هر دستور ORM که اجرا کنید، در کادر آبی بالا دقیقاً معادل SQL تولیدشده آن را نیز چاپ می‌کنیم تا هنرجویان ارتباط یک‌به‌یک ORM و SQL را با چشم ببینند!',
      'تأکید مهم: عملگرهای فیلتر در Django ORM از دو زیرخط چسبیده (__) استفاده می‌کنند؛ مثلاً title__contains یا lat__gt (نه یک زیرخط!).',
      'علامت منفی (-) در ابتدای نام فیلد داخل order_by("-lat") معادل DESC (نزولی) در SQL است.',
      'ORM جنگو به‌طور خودکار از پارامترهای امن (Parameterized Queries) استفاده می‌کند و برنامه شما را در برابر حمله SQL Injection مصون نگه می‌دارد.',
    ],
    goldenTips: [
      'چهار عملیات اصلی پایگاه‌داده (CRUD) در ORM: ساخت با create()، خواندن با all()/filter()، ویرایش با save() و حذف با delete().',
      'همیشه ترجمه آبی‌رنگ SQL بالای خروجی را همراه با کلاس بخوانید تا هر دو مهارت هم‌زمان تقویت شوند.',
    ],
    wrongVsRight: [
      {
        title: 'گذاشتن یک زیرخط به جای دو زیرخط در Lookupهای ORM',
        wrongCode: `City.objects.filter(title_contains='تهر')  # FieldError!`,
        rightCode: `City.objects.filter(title__contains='تهر')  # دو زیرخط چسبیده`,
        explanation: 'در Django ORM تمام عملگرهای فیلتر (__contains، __gt، __lt) با دو زیرخط نوشته می‌شوند.',
      },
      {
        title: 'فراموش کردن objects بین نام مدل و متد ORM',
        wrongCode: `City.all()  # AttributeError!`,
        rightCode: `City.objects.all()`,
        explanation: 'تمام پرس‌وجوهای ORM از طریق مدیر City.objects فراخوانی می‌شوند.',
      },
    ],
    examples: [
      {
        id: 'ex-5-2-orm-basic',
        tier: 'basic',
        title: 'پرس‌وجوهای پایه ORM: all()، first()، last() و count()',
        bookPage: '۳۰۷',
        summary: 'اجرای هم‌زمان ۴ دستور پایه Django ORM روی SQLite و مقایسه SQL معادل آن‌ها.',
        language: 'python',
        engine: 'django-sql',
        code: `City.objects.first()
City.objects.last()
City.objects.count()`,
        teacherTalkingPoints: [
          'کادر SQL تولیدشده بالای ترمینال را نشان دهید: .first() تبدیل به LIMIT 1 و .count() تبدیل به SELECT COUNT(*) شده است!',
        ],
        lineExplanations: [
          {line: 1, explanation: 'واکشی اولین شهر جدول (تهران).'},
          {line: 2, explanation: 'واکشی آخرین شهر جدول (اردبیل).'},
          {line: 3, explanation: 'شمارش کل رکوردها.'},
        ],
        commonMistakes: ['فراموش کردن پرانتز () در پایان all() یا count().'],
      },
      {
        id: 'ex-5-2-orm-practical',
        tier: 'practical',
        title: 'فیلتر کردن شهرها با __contains، __gt و مرتب‌سازی با order_by()',
        bookPage: '۳۰۸',
        summary: 'فیلتر شهرهای شمالی (lat__gt=35)، جستجوی متنی و مرتب‌سازی نزولی عرض جغرافیایی.',
        language: 'python',
        engine: 'django-sql',
        code: `City.objects.filter(title__contains='ر')
City.objects.filter(lat__gt=35)
City.objects.order_by('-lat')`,
        teacherTalkingPoints: [
          'تبدیل lat__gt=35 به WHERE lat > 35 و order_by("-lat") به ORDER BY lat DESC را روی پرده مقایسه کنید!',
        ],
        lineExplanations: [
          {line: 1, explanation: 'جستجوی تمام شهرهایی که حرف «ر» دارند (تهران، شیراز، تبریز، رشت، اردبیل).'},
          {line: 2, explanation: 'فیلتر عددی بزرگ‌تر از ۳۵ (gt مخفف Greater Than).'},
          {line: 3, explanation: 'مرتب‌سازی نزولی از شمال به جنوب.'},
        ],
        commonMistakes: ['نوشتن lat > 35 داخل پرانتز filter (در ORM باید lat__gt=35 بنویسیم).'],
      },
      {
        id: 'ex-5-2-orm-combined',
        tier: 'combined',
        title: 'درج شهر جدید با create() و بررسی فوری در پایگاه‌داده',
        bookPage: '۳۰۷ و ۳۲۳',
        summary: 'افزودن شهر «کرمان» به جدول SQLite با ORM و مشاهده افزایش شمارنده کل.',
        language: 'python',
        engine: 'django-sql',
        code: `City.objects.create(title='کرمان', lat=30.2839, lon=57.0834)
City.objects.filter(title='کرمان')
City.objects.count()`,
        teacherTalkingPoints: [
          'دقت کنید دستور create هم شیء را می‌سازد و هم همان لحظه با INSERT INTO در SQLite ذخیره می‌کند.',
        ],
        lineExplanations: [
          {line: 1, explanation: 'درج مستقیم رکورد جدید در weather_city.'},
          {line: 2, explanation: 'جستجوی دقیق شهر تازه‌ثبت‌شده.'},
        ],
        commonMistakes: ['نوشتن کوتیشن دور اعداد اعشاری lat و lon (بهتر است به صورت عدد float ارسال شوند).'],
      },
      {
        id: 'ex-5-2-orm-whatif',
        tier: 'what-if',
        title: 'مرتب‌سازی الفبایی فارسی شهرها و فیلتر شهرهای نیمه جنوبی (lat__lt=33)',
        bookPage: '۳۰۸',
        summary: 'یافتن شهرهای جنوبی ایران و نمایش مرتب‌شده کل فهرست بر اساس الفبا.',
        language: 'python',
        engine: 'django-sql',
        code: `City.objects.filter(lat__lt=33)
City.objects.order_by('title')`,
        teacherTalkingPoints: [
          'توضیح دهید lt مخفف Less Than (کوچک‌تر از) است؛ پس اصفهان (32.65) و شیراز (29.59) برگردانده می‌شوند.',
        ],
        lineExplanations: [
          {line: 1, explanation: 'فیلتر شهرهای جنوبی با عرض جغرافیایی کمتر از ۳۳.'},
          {line: 2, explanation: 'مرتب‌سازی صعودی بر اساس نام شهر.'},
        ],
        commonMistakes: ['فراموش کردن کوتیشن دور نام ستون داخل order_by("title").'],
      },
    ],
  },

  // ==================== LESSON 4 ====================
  {
    id: 'lesson-5-2-safe-lookup-bug',
    order: 4,
    title: 'واکشی ایمن، مدیریت جدول خالی و اصلاح باگ بحرانی .get() (ص ۳۲۳)',
    bookPage: '۳۱۲ و ۳۲۳ تا ۳۲۶',
    whyWeNeedIt: {
      realWorldProblem:
        'در صفحه ۳۲۳ کتاب (شکل ۷۱) درون تابع حذف شهر نوشته شده city = City.objects.get(id=city_id) و در خط بعد شرط if city: گذاشته شده است! اما اگر شناسه ۹۹۹ وجود نداشته باشد، دستور .get() همان خط اول خطای City.DoesNotExist پرتاب کرده و سرور جنگو با خطای 500 کرش می‌کند و اصلاً به خط if city: نمی‌رسد!',
      analogy:
        'متد .get(id=999) مانند مأموری است که اگر پرونده را پیدا نکند فریاد می‌زند و اداره را تعطیل می‌کند (Exception)! اما .filter(id=999).first() مانند کارمند صبوری است که آرام می‌گوید «پیدا نشد (None)» تا برنامه با آرامش تصمیم بگیرد.',
    },
    syntaxAnatomy: {
      template: `# ❌ روش پرخطر کتاب (ص ۳۲۳): کرش با DoesNotExist\ncity = City.objects.get(id=999)\n\n# ✔ روش ایمن و حرفه‌ای جنگو:\ncity = City.objects.filter(id=999).first()`,
      parts: [
        {token: '.get(id=N)', role: 'فقط زمانی که مطمئنیم دقیقاً ۱ رکورد هست؛ در نبود رکورد خطای DoesNotExist می‌دهد!'},
        {token: '.filter(id=N).first()', role: 'اگر رکورد بود برمی‌گرداند و اگر نبود بدون هیچ خطایی None برمی‌گرداند (اصلاح ص ۳۲۳).'},
        {token: 'حالت جدول خالی', role: 'اگر تمام شهرها حذف شوند، City.objects.first() مقدار None می‌دهد که باید در View و Template مدیریت شود.'},
      ],
    },
    behindTheScenes: [
      'باگ واقعی شکل ۷۱ صفحه ۳۲۳ کتاب درسی یک کلاس درس بی‌نظیر است: برنامه‌نویس کتاب تصور کرده .get() در نبود رکورد None برمی‌گرداند و زیرش نوشته if city: city.delete()؛ اما این شرط هرگز اجرا نمی‌شود چون خود .get() قبلاً کرش کرده است!',
      'همچنین هنگام باز کردن صفحه اول با جدول خالی (ص ۳۲۵)، متغیر selected_city مقدار None می‌گیرد؛ پس در View نباید بدون بررسی if selected_city: بنویسیم selected_city.lat!',
      'روش استاندارد دیگر در پروژه‌های واقعی جنگو استفاده از get_object_or_404(City, id=city_id) است که به جای کرش 500، صفحه تمیز 404 برمی‌گرداند.',
    ],
    goldenTips: [
      'در تب «۲. شهود بصری» روی دکمه قرمز «تست خطای .get(id=999)» و بلافاصله روی دکمه سبز «.filter(id=999).first()» کلیک کنید تا تفاوتشان برای کل کلاس ماندگار شود!',
    ],
    wrongVsRight: [
      {
        title: 'باگ بحرانی شکل ۷۱ ص ۳۲۳ کتاب (.get به جای .filter().first())',
        wrongCode: `city = City.objects.get(id=city_id)  # اگر نباشد کرش 500!\nif city:\n    city.delete()`,
        rightCode: `city = City.objects.filter(id=city_id).first()  # ایمن: None برمی‌گرداند\nif city:\n    city.delete()`,
        explanation: 'ترکیب .filter(id=city_id).first() هرگز DoesNotExist تولید نمی‌کند و شرط if city واقعاً کار می‌کند.',
      },
      {
        title: 'خواندن ویژگی city.lat پیش از بررسی خالی نبودن جدول',
        wrongCode: `city = City.objects.first()\nurl = f"...?lat={city.lat}"  # در جدول خالی AttributeError!`,
        rightCode: `city = City.objects.first()\nif city is not None:\n    url = f"...?lat={city.lat}"`,
        explanation: 'اگر جدول خالی باشد city برابر None است و باید قبل از دسترسی به lat بررسی شود.',
      },
    ],
    examples: [
      {
        id: 'ex-5-2-safe-basic',
        tier: 'basic',
        title: 'مقایسه زنده .get(id=999) (کرش) در برابر .filter(id=999).first() (ایمن)',
        bookPage: '۳۲۳',
        summary: 'مشاهده واقعی خطای City.DoesNotExist روی شناسه ناموجود و مقایسه آن با روش ایمن.',
        language: 'python',
        engine: 'django-sql',
        code: `# خط ۱ خطای واقعی ص ۳۲۳ کتاب را نشان می‌دهد:
City.objects.get(id=999)
# خط ۲ روش اصلاح‌شده و ایمن را اجرا می‌کند:
City.objects.filter(id=999).first()`,
        teacherTalkingPoints: [
          'خروجی هر دو خط را هم‌زمان روی پروژکتور مقایسه کنید: خط اول ❌ DoesNotExist می‌دهد، اما خط دوم ✔ مقدار None بدون خطا برمی‌گرداند!',
        ],
        lineExplanations: [
          {line: 2, explanation: 'تولید خطای City.DoesNotExist روی شناسه ۹۹۹.'},
          {line: 4, explanation: 'بازگشت ایمن None بدون کرش سرور.'},
        ],
        commonMistakes: ['اعتماد به if city بعد از City.objects.get().'],
        bookCorrection: {
          page: 323,
          issue: 'در شکل ۷۱ ص ۳۲۳ از City.objects.get(id=city_id) پیش از if city: استفاده شده بود که پیش از شرط کرش می‌کرد.',
          fix: 'به City.objects.filter(id=city_id).first() اصلاح شد.',
        },
      },
      {
        id: 'ex-5-2-safe-practical',
        tier: 'practical',
        title: 'واکشی ایمن شهر موجود (id=2) و حذف ایمن بدون کرش',
        bookPage: '۳۲۳',
        summary: 'یافتن همدان با filter(id=2).first() و آزمایش حذف ایمن یک شناسه ناموجود.',
        language: 'python',
        engine: 'django-sql',
        code: `City.objects.filter(id=2).first()
City.objects.filter(id=999).delete()`,
        teacherTalkingPoints: [
          'نشان دهید حتی دستور filter(id=999).delete() نیز بدون هیچ خطایی اجرا می‌شود!',
        ],
        lineExplanations: [
          {line: 1, explanation: 'پیدا کردن امن رکورد همدان.'},
          {line: 2, explanation: 'حذف ایمن که در صورت نبود رکورد صفر سطر حذف می‌کند و کرش نمی‌دهد.'},
        ],
        commonMistakes: ['عدم بررسی وجود رکورد قبل از نمایش پیام «با موفقیت حذف شد».'],
      },
      {
        id: 'ex-5-2-safe-combined',
        tier: 'combined',
        title: 'مدیریت کامل ۳ حالت مرزی View: شناسه معتبر، شناسه غلط و جدول خالی',
        bookPage: '۳۲۵–۳۲۶',
        summary: 'شبیه‌سازی پایتونی تابع city_detail_view مقاوم در برابر تمام خطاهای ردیف ۴ ارزشیابی.',
        language: 'python',
        engine: 'python',
        code: `def safe_select_city(cities_table, raw_id):
    if len(cities_table) == 0:
        return "جدول خالی است -> نمایش پیام: هنوز شهری ثبت نشده است."

    selected = None
    if raw_id is not None:
        try:
            target_id = int(raw_id)
            for c in cities_table:
                if c["id"] == target_id:
                    selected = c
                    break
        except ValueError:
            selected = None

    if selected is None:
        selected = cities_table[0]
        return f"شناسه '{raw_id}' نامعتبر/ناموجود -> بازگشت ایمن به شهر اول: {selected['title']}"
    return f"نمایش موفق شهر انتخابی: {selected['title']}"

db = [{"id": 1, "title": "تهران"}, {"id": 2, "title": "همدان"}]
print(safe_select_city(db, "2"))
print(safe_select_city(db, "999"))
print(safe_select_city(db, "abc"))
print(safe_select_city([], "1"))`,
        teacherTalkingPoints: [
          'این دقیقاً هر ۴ حالت ردیف ۴ جدول ارزشیابی (ص ۳۲۹) را یکجا پوشش می‌دهد!',
        ],
        lineExplanations: [
          {line: 2, explanation: 'مدیریت حالت جدول خالی (ص ۳۲۵).'},
          {line: 13, explanation: 'مدیریت ورودی غیرعددی مثل ?id=abc بدون کرش ValueError.'},
        ],
        commonMistakes: ['فراموش کردن تبدیل ایمن int(raw_id) داخل try/except.'],
      },
      {
        id: 'ex-5-2-safe-whatif',
        tier: 'what-if',
        title: 'نمایش پیام دوستانه در قالب جنگو هنگام نبود شهر یا شناسه نامعتبر',
        bookPage: '۳۲۵',
        summary: 'طراحی بخش وضعیت شهر در قالب با بررسی هم‌زمان {% if city %} و {% if temp is not None %}.',
        language: 'django-html',
        engine: 'django-sql',
        code: `<div style="direction:rtl;font-family:Vazirmatn,sans-serif;padding:12px;border:1px solid #cbd5e1;border-radius:10px;">
  {% if city %}
    <h4 style="margin:0 0 6px 0;color:#0369a1;">{{ city.title }}</h4>
    {% if temp is not None %}
      <p style="margin:0;color:#059669;font-weight:bold;">دمای فعلی: {{ temp }} درجه سانتی‌گراد</p>
    {% else %}
      <p style="margin:0;color:#d97706;">دما موقتاً در دسترس نیست.</p>
    {% endif %}
  {% else %}
    <p style="margin:0;color:#64748b;">هنوز هیچ شهری در پایگاه‌داده ثبت نشده است.</p>
  {% endif %}
</div>`,
        teacherTalkingPoints: [
          'ببینید چطور دو لایه محافظت ({% if city %} و {% if temp is not None %}) صفحه را کاملاً ضدکرش می‌کنند.',
        ],
        lineExplanations: [
          {line: 2, explanation: 'بررسی وجود شهر انتخابی پیش از چاپ ویژگی‌هایش.'},
        ],
        commonMistakes: ['فراموش کردن شرط {% if city %} در صفحه اول هنگام خالی بودن پایگاه‌داده.'],
      },
    ],
  },

  // ==================== LESSON 5 ====================
  {
    id: 'lesson-5-2-auth-forms',
    order: 5,
    title: 'احراز هویت (Login / Logout)، فرم ModelForm و سپر امنیتی {% csrf_token %}',
    bookPage: '۳۱۴ تا ۳۲۲',
    whyWeNeedIt: {
      realWorldProblem:
        'در وب‌اپلیکیشن واقعی نباید هر بازدیدکننده ناشناسی بتواند شهرهای سایت را دستکاری کند! تنها کاربران احراز هویت‌شده (Login) باید به فرم افزودن شهر (ModelForm) دسترسی داشته باشند و هر فرم POST نیز باید در برابر حملات جعل درخواست (CSRF) محافظت شود.',
      analogy:
        'توکن {% csrf_token %} مانند مهر امنیتی یک‌بارمصرف و اختصاصی روی برگه فرم بانک است؛ سرور جنگو هنگام دریافت POST بررسی می‌کند آیا این فرم واقعاً از داخل سایت خودش ارسال شده یا از یک سایت جعلی دیگر!',
    },
    syntaxAnatomy: {
      template: `<form method="post" action="{% url 'add_city' %}">\n  {% csrf_token %}\n  <!-- فیلدهای ModelForm -->\n  <button type="submit">ذخیره شهر</button>\n</form>`,
      parts: [
        {token: 'method="post"', role: 'تمام فرم‌هایی که پایگاه‌داده را تغییر می‌دهند (افزودن/ویرایش/حذف) باید POST باشند نه GET.'},
        {token: '{% csrf_token %}', role: 'تزریق خودکار یک فیلد مخفی امنیتی در فرم؛ بدون آن جنگو خطای 403 Forbidden می‌دهد!'},
        {token: 'class CityForm(forms.ModelForm)', role: 'تولید خودکار فرم HTML و اعتبارسنجی فیلدها مستقیم از روی مدل City.'},
        {token: 'user.is_authenticated', role: 'ویژگی بولین بررسی ورود کاربر در View و Template.'},
      ],
    },
    behindTheScenes: [
      'اگر در یک فرم method="post" تگ {% csrf_token %} را فراموش کنید، میان‌افزار امنیتی جنگو (CsrfViewMiddleware) درخواست را مسدود کرده و خطای معروف 403 Forbidden (CSRF verification failed) نشان می‌دهد.',
      'مزیت بزرگ ModelForm نسبت به فرم HTML دستی: اگر فردا فیلد جدیدی به مدل City اضافه کنیم، فرم و اعتبارسنجی نوع اعداد (lat/lon) خودکار ساخته می‌شوند و با form.is_valid() و form.save() در ۲ خط ذخیره می‌شوند!',
      'متد authenticate(username, password) صحت رمز عبور هش‌شده کاربر را بررسی می‌کند و login(request, user) نشست (Session) کاربر را در مرورگر ثبت می‌کند.',
    ],
    goldenTips: [
      'روی خروجی HTML رندرشده مثال زیر دقت کنید تا هنرجویان ببینند تگ {% csrf_token %} در پشت صحنه دقیقاً به یک <input type="hidden" name="csrfmiddlewaretoken" ...> تبدیل می‌شود!',
    ],
    wrongVsRight: [
      {
        title: 'ارسال فرم تغییر داده با GET یا بدون {% csrf_token %}',
        wrongCode: `<form method="post" action="/cities/add/">\n  <input name="title" />\n  <button>ذخیره</button>\n</form>  <!-- خطای 403 Forbidden! -->`,
        rightCode: `<form method="post" action="{% url 'add_city' %}">\n  {% csrf_token %}\n  <input name="title" required />\n  <button type="submit">ذخیره</button>\n</form>`,
        explanation: 'هر فرم POST در جنگو الزاماً باید {% csrf_token %} داشته باشد.',
      },
      {
        title: 'فراخوانی form.save() پیش از بررسی form.is_valid()',
        wrongCode: `form = CityForm(request.POST)\nform.save()  # اگر ورودی نامعتبر باشد ValueError می‌دهد!`,
        rightCode: `form = CityForm(request.POST)\nif form.is_valid():\n    form.save()`,
        explanation: 'همیشه پیش از ذخیره فرم در پایگاه‌داده، اعتبار داده‌ها را با form.is_valid() بسنجید.',
      },
    ],
    examples: [
      {
        id: 'ex-5-2-auth-basic',
        tier: 'basic',
        title: 'فرم افزودن شهر در قالب جنگو همراه با {% csrf_token %} و کنترل لاگین',
        bookPage: '۳۱۹–۳۲۱',
        summary: 'رندر زنده فرم افزودن شهر فقط برای کاربر احراز هویت‌شده با تزریق واقعی csrfmiddlewaretoken.',
        language: 'django-html',
        engine: 'django-sql',
        code: `<div style="direction:rtl;font-family:Vazirmatn,sans-serif;max-width:420px;border:1px solid #cbd5e1;border-radius:12px;padding:14px;">
  {% if user.is_authenticated %}
    <h4 style="margin-top:0;color:#0369a1;">افزودن شهر جدید (کاربر: {{ user.username }})</h4>
    <form method="post" action="{% url 'add_city' %}">
      {% csrf_token %}
      <div style="margin-bottom:8px;">
        <label>نام شهر:</label><br />
        <input name="title" type="text" required placeholder="مثلاً یزد" style="width:100%;padding:6px;" />
      </div>
      <div style="margin-bottom:8px;">
        <label>عرض جغرافیایی (lat):</label><br />
        <input name="lat" type="number" step="0.0001" required placeholder="31.8974" style="width:100%;padding:6px;" />
      </div>
      <div style="margin-bottom:10px;">
        <label>طول جغرافیایی (lon):</label><br />
        <input name="lon" type="number" step="0.0001" required placeholder="54.3569" style="width:100%;padding:6px;" />
      </div>
      <button type="submit" style="background:#059669;color:#fff;border:none;padding:8px 16px;border-radius:8px;">ذخیره در SQLite</button>
    </form>
  {% else %}
    <p style="color:#dc2626;">برای افزودن شهر ابتدا وارد حساب کاربری شوید.</p>
  {% endif %}
</div>`,
        teacherTalkingPoints: [
          'نشان دهید فرم درون {% if user.is_authenticated %} قرار گرفته و {% csrf_token %} درست زیر تگ <form> نوشته شده است.',
        ],
        lineExplanations: [
          {line: 4, explanation: 'ارسال فرم با متد POST و آدرس پویا از طریق {% url %}.'},
          {line: 5, explanation: 'قرار دادن سپر امنیتی CSRF درون فرم.'},
        ],
        commonMistakes: ['قرار دادن {% csrf_token %} بیرون از تگ <form> که بی‌اثر است!'],
      },
      {
        id: 'ex-5-2-auth-practical',
        tier: 'practical',
        title: 'شبیه‌سازی اعتبارسنجی ModelForm (form.is_valid و form.save)',
        bookPage: '۳۲۰',
        summary: 'بررسی اعتبار نام شهر و بازه جغرافیایی معتبر (lat بین -90 تا 90، lon بین -180 تا 180) قبل از ذخیره.',
        language: 'python',
        engine: 'python',
        code: `class CityForm:
    def __init__(self, data):
        self.data = data
        self.errors = []

    def is_valid(self):
        self.errors = []
        title = self.data.get("title", "").strip()
        lat = self.data.get("lat")
        lon = self.data.get("lon")
        if not title:
            self.errors.append("نام شهر نمی‌تواند خالی باشد.")
        if lat is None or lat < -90 or lat > 90:
            self.errors.append("عرض جغرافیایی باید بین -90 تا 90 باشد.")
        if lon is None or lon < -180 or lon > 180:
            self.errors.append("طول جغرافیایی باید بین -180 تا 180 باشد.")
        return len(self.errors) == 0

f1 = CityForm({"title": "یزد", "lat": 31.8974, "lon": 54.3569})
f2 = CityForm({"title": "", "lat": 150, "lon": 54})

print("فرم ۱ معتبر است؟", f1.is_valid(), "| خطاها:", f1.errors)
print("فرم ۲ معتبر است؟", f2.is_valid(), "| خطاها:", f2.errors)`,
        teacherTalkingPoints: [
          'توضیح دهید وقتی در جنگو می‌نویسید if form.is_valid(): دقیقاً همین بررسی‌های اعتبارسنجی پشت صحنه اجرا می‌شوند!',
        ],
        lineExplanations: [
          {line: 13, explanation: 'کنترل بازه علمی عرض جغرافیایی پیش از ذخیره در دیتابیس.'},
        ],
        commonMistakes: ['ذخیره مستقیم request.POST بدون اعتبارسنجی که باعث ثبت داده‌های خراب در SQLite می‌شود.'],
      },
      {
        id: 'ex-5-2-auth-combined',
        tier: 'combined',
        title: 'شبیه‌سازی چرخه Login / Logout و بررسی نشست کاربر',
        bookPage: '۳۱۶–۳۱۷',
        summary: 'بررسی نام کاربری و رمز عبور و تغییر وضعیت نشست از مهمان به کاربر احراز هویت‌شده.',
        language: 'python',
        engine: 'python',
        code: `USERS = {"admin": "Django1405", "teacher": "Web1405"}

def authenticate(username, password):
    if USERS.get(username) == password:
        return {"username": username, "is_authenticated": True}
    return None

session_user = {"username": "مهمان", "is_authenticated": False}
print("قبل از ورود:", session_user)

logged_in = authenticate("admin", "Django1405")
if logged_in is not None:
    session_user = logged_in
    print("پس از ورود موفق:", session_user)

# خروج (Logout)
session_user = {"username": "مهمان", "is_authenticated": False}
print("پس از خروج:", session_user)`,
        teacherTalkingPoints: [
          'تأکید کنید در جنگوی واقعی رمزهای عبور هرگز به صورت متن ساده ذخیره نمی‌شوند، بلکه به‌صورت خودکار هش (PBKDF2/Argon2) می‌شوند!',
        ],
        lineExplanations: [
          {line: 3, explanation: 'تطبیق نام کاربری و رمز عبور برای احراز هویت.'},
        ],
        commonMistakes: ['فراموش کردن redirect به صفحه اصلی پس از ورود یا خروج موفق (الگوی Post/Redirect/Get).'],
      },
      {
        id: 'ex-5-2-auth-whatif',
        tier: 'what-if',
        title: 'تأیید وجود فیلد مخفی csrfmiddlewaretoken پس از رندر قالب',
        bookPage: '۳۱۹',
        summary: 'مشاهده کد HTML تولیدشده توسط {% csrf_token %} در قالب جنگو.',
        language: 'django-html',
        engine: 'django-sql',
        code: `<form method="post" action="{% url 'login' %}" style="direction:rtl;font-family:Vazirmatn,sans-serif;padding:12px;border:1px solid #cbd5e1;border-radius:10px;">
  {% csrf_token %}
  <p style="margin:0 0 8px 0;color:#059669;font-weight:bold;">✔ توکن مخفی CSRF به صورت خودکار درون این فرم تزریق شد!</p>
  <input type="text" name="username" placeholder="نام کاربری" style="padding:6px;margin-left:6px;" />
  <button type="submit" style="background:#0284c7;color:#fff;border:none;padding:6px 12px;border-radius:6px;">ورود</button>
</form>`,
        teacherTalkingPoints: [
          'اگر در مرورگر روی فرم Inspect بزنید، تگ <input type="hidden" name="csrfmiddlewaretoken" ...> را داخل فرم می‌بینید.',
        ],
        lineExplanations: [
          {line: 2, explanation: 'موتور قالب جنگو این تگ را به فیلد مخفی امنیتی تبدیل می‌کند.'},
        ],
        commonMistakes: ['قرار دادن {% csrf_token %} در فرم‌های جستجوی GET که باعث شلوغ شدن نشانی URL می‌شود (فقط برای POST لازم است).'],
      },
    ],
  },

  // ==================== LESSON 6 ====================
  {
    id: 'lesson-5-2-secure-delete',
    order: 6,
    title: 'ایمن‌سازی عملیات حذف (POST) و رفع ۲ باگ نهایی کتاب (ص ۳۲۴ و ۳۲۷)',
    bookPage: '۳۲۳ تا ۳۲۹',
    whyWeNeedIt: {
      realWorldProblem:
        'در پایان فصل ۵ کتاب درسی دو حفره مهم وجود دارد: ۱) در صفحه ۳۲۴ صفت action فرم حذف بدون کوتیشن نوشته شده (action={% url \'delete_city\' %}) که ساختار HTML را می‌شکند! ۲) در صفحه ۳۲۷ اگرچه دکمه حذف در HTML برای کاربران مهمان مخفی شده، اما در خودِ تابع delete_city_view بررسی نشده آیا کاربر لاگین کرده یا نه؛ پس یک مهاجم می‌تواند مستقیماً درخواست POST ارسال کرده و شهرها را پاک کند!',
      analogy:
        'مخفی کردن دکمه حذف در HTML بدون بررسی لاگین در View سمت سرور، مانند این است که فقط تابلوی «ورود به خزانه» را از دیوار بردارید ولی درِ خزانه را قفل نکنید! قفل واقعی همیشه باید در سمت سرور (View) باشد.',
    },
    syntaxAnatomy: {
      template: `# views.py (سمت سرور - قفل واقعی!)\nif not request.user.is_authenticated:\n    return redirect('login')\n\n# template (اصلاح کوتیشن ص ۳۲۴)\n<form method="post" action="{% url 'delete_city' %}">\n  {% csrf_token %}\n  <input type="hidden" name="city_id" value="{{ c.id }}" />\n</form>`,
      parts: [
        {token: 'action="{% url \'delete_city\' %}"', role: 'اصلاح خطای نحوی ص ۳۲۴ کتاب: صفت action حتماً باید داخل دابل‌کوتیشن باشد!'},
        {token: 'if not request.user.is_authenticated:', role: 'اصلاح آسیب‌پذیری امنیتی ص ۳۲۷ کتاب (یا استفاده از دکوریتور @login_required).'},
        {token: 'if request.method == "POST":', role: 'جلوگیری از حذف رکورد از طریق لینک ساده GET.'},
        {token: '.filter(id=city_id).first()', role: 'حذف ایمن بدون کرش DoesNotExist (اصلاح ص ۳۲۳).'},
      ],
    },
    behindTheScenes: [
      'اصل طلایی امنیت وب (Never Trust the Client): هرگز به مخفی کردن دکمه در HTML یا اعتبارسنجی جاوااسکریپت اکتفا نکنید؛ هر کسی با ابزارهایی مثل curl یا DevTools می‌تواند مستقیم به نشانی /cities/delete/ درخواست POST بفرستد!',
      'بنابراین کنترل دسترسی (Authorization) باید در هر دو لایه باشد: در Template برای تجربه کاربری تمیز و در View (@login_required یا request.user.is_authenticated) برای امنیت واقعی!',
      'پس از پایان این درسنامه، کل ۳ باگ پایانی کتاب (ص ۳۲۳ `.get()`، ص ۳۲۴ کوتیشن `action` و ص ۳۲۷ آسیب‌پذیری حذف بدون احراز هویت) به‌طور کامل رفع و آموزش داده شده‌اند.',
    ],
    goldenTips: [
      'در تب «۲. شهود بصری» حتماً کلید «کاربر مهمان (Not Logged In)» را بزنید و دکمه «شبیه‌سازی حمله POST مستقیم به delete_city» را اجرا کنید تا اهمیت دفاع سمت سرور برای همیشه در ذهن هنرجویان حک شود!',
    ],
    wrongVsRight: [
      {
        title: 'باگ ص ۳۲۴ کتاب: نبود کوتیشن دور صفت action در فرم حذف',
        wrongCode: `<form method="post" action={% url 'delete_city' %}>`,
        rightCode: `<form method="post" action="{% url 'delete_city' %}">`,
        explanation: 'در HTML استاندارد مقادیر صفات به‌ویژه زمانی که حاوی تگ‌های قالب هستند باید درون کوتیشن باشند.',
      },
      {
        title: 'آسیب‌پذیری امنیتی ص ۳۲۷ کتاب: حذف رکورد بدون بررسی احراز هویت در View',
        wrongCode: `def delete_city_view(request):\n    city = City.objects.get(id=request.POST['city_id'])\n    city.delete()`,
        rightCode: `def delete_city_view(request):\n    if not request.user.is_authenticated:\n        return redirect('login')\n    if request.method == 'POST':\n        city = City.objects.filter(id=request.POST.get('city_id')).first()\n        if city:\n            city.delete()`,
        explanation: 'این کد اصلاح‌شده هم‌زمان هر سه باگ ص ۳۲۳، ص ۳۲۷ و متد POST را یکجا برطرف می‌کند!',
      },
    ],
    examples: [
      {
        id: 'ex-5-2-sec-basic',
        tier: 'basic',
        title: 'قالب استاندارد فرم حذف POST با اصلاح کوتیشن ص ۳۲۴ و {% csrf_token %}',
        bookPage: '۳۲۴',
        summary: 'نمایش لیست شهرها همراه با دکمه حذف امن POST فقط برای کاربر واردشده.',
        language: 'django-html',
        engine: 'django-sql',
        code: `<div style="direction:rtl;font-family:Vazirmatn,sans-serif;padding:10px;">
  <h4 style="margin-top:0;">مدیریت امن حذف شهرها (اصلاح ص ۳۲۴)</h4>
  {% for c in cities %}
    <div style="display:flex;justify-content:space-between;align-items:center;padding:8px;border-bottom:1px solid #e2e8f0;">
      <span><strong>{{ c.title }}</strong> (id={{ c.id }})</span>
      {% if user.is_authenticated %}
        <form method="post" action="{% url 'delete_city' %}" style="margin:0;">
          {% csrf_token %}
          <input type="hidden" name="city_id" value="{{ c.id }}" />
          <button type="submit" style="background:#dc2626;color:#fff;border:none;padding:4px 10px;border-radius:6px;font-size:12px;">حذف امن</button>
        </form>
      {% endif %}
    </div>
  {% endfor %}
</div>`,
        teacherTalkingPoints: [
          'خط ۷ را به دقت نشان دهید: action="{% url \'delete_city\' %}" دارای دابل‌کوتیشن کامل و توکن CSRF است.',
        ],
        lineExplanations: [
          {line: 7, explanation: 'قرار دادن کوتیشن کامل دور صفت action (اصلاح باگ ص ۳۲۴).'},
          {line: 9, explanation: 'ارسال شناسه شهر در فیلد مخفی داخل بدنه POST.'},
        ],
        commonMistakes: ['استفاده از لینک <a href="/delete/2"> (متد GET) برای حذف اطلاعات دیتابیس.'],
        bookCorrection: {
          page: 324,
          issue: 'صفت action در فرم حذف بدون کوتیشن چاپ شده بود و View حذف در ص ۳۲۷ احراز هویت کاربر را بررسی نمی‌کرد.',
          fix: 'قالب با کوتیشن استاندارد و View با بررسی is_authenticated و filter().first() ایمن‌سازی شد.',
        },
      },
      {
        id: 'ex-5-2-sec-practical',
        tier: 'practical',
        title: 'شبیه‌سازی دفاع سمت سرور در delete_city_view (اصلاح آسیب‌پذیری ص ۳۲۷)',
        bookPage: '۳۲۷',
        summary: 'تست ۳ درخواست حذف: مهمان (مسدود 403)، درخواست GET (مسدود 405) و مدیر با POST (حذف موفق).',
        language: 'python',
        engine: 'python',
        code: `cities = {1: "تهران", 2: "همدان", 8: "اردبیل"}

def secure_delete_city_view(method, is_authenticated, city_id):
    if not is_authenticated:
        return "403 Forbidden: فقط کاربران واردشده مجاز به حذف هستند! (رفع باگ ص ۳۲۷)"
    if method != "POST":
        return "405 Method Not Allowed: حذف فقط از طریق فرم POST مجاز است!"
    if city_id in cities:
        removed = cities.pop(city_id)
        return f"200 OK: شهر «{removed}» با موفقیت و ایمنی کامل حذف شد."
    return f"200 OK: شهری با id={city_id} یافت نشد (بدون کرش DoesNotExist!)."

print("تست ۱ (مهمان با POST):", secure_delete_city_view("POST", False, 8))
print("تست ۲ (مدیر با GET): ", secure_delete_city_view("GET", True, 8))
print("تست ۳ (مدیر با POST):", secure_delete_city_view("POST", True, 8))
print("تست ۴ (شناسه ناموجود):", secure_delete_city_view("POST", True, 999))`,
        teacherTalkingPoints: [
          'این ۴ خط تست کل فلسفه امنیت بک‌اند در سطح هنرستان را یکجا به تصویر می‌کشد!',
        ],
        lineExplanations: [
          {line: 4, explanation: 'قفل امنیتی سمت سرور که در نسخه چاپ‌شده ص ۳۲۷ کتاب فراموش شده بود.'},
          {line: 6, explanation: 'الزام به استفاده از متد POST برای عملیات مخرب حذف.'},
        ],
        commonMistakes: ['اعتماد صرف به مخفی کردن دکمه در HTML بدون بررسی در View.'],
      },
      {
        id: 'ex-5-2-sec-combined',
        tier: 'combined',
        title: 'چرخه کامل CRUD ایمن روی SQLite واقعی (ایجاد، فهرست، حذف و تأیید)',
        bookPage: '۳۲۳–۳۲۷',
        summary: 'افزودن یک شهر آزمایشی، حذف ایمن آن و بررسی تعداد نهایی رکوردها روی موتور SQLite.',
        language: 'python',
        engine: 'django-sql',
        code: `City.objects.create(title='سمنان', lat=35.5769, lon=53.3953)
City.objects.filter(title='سمنان')
City.objects.filter(id=999).delete()
City.objects.count()`,
        teacherTalkingPoints: [
          'نشان دهید کل چرخه CRUD روی جدول واقعی weather_city بدون حتی یک خطا انجام می‌شود.',
        ],
        lineExplanations: [
          {line: 1, explanation: 'عملیات Create (افزودن رکورد).'},
          {line: 2, explanation: 'عملیات Read (بررسی ثبت رکورد).'},
          {line: 3, explanation: 'عملیات Delete ایمن روی شناسه ناموجود.'},
        ],
        commonMistakes: ['فراموش کردن بررسی پیام تأیید پیش از حذف در رابط کاربری.'],
      },
      {
        id: 'ex-5-2-sec-whatif',
        tier: 'what-if',
        title: 'مرور جامع ۵ خطای کلیدی کتاب در پودمان ۵ و نسخه اصلاح‌شده آن‌ها',
        bookPage: '۲۹۱ تا ۳۲۸',
        summary: 'چک‌لیست نهایی ویژه هنرآموز و هنرجو پیش از آزمون پایان ترم پودمان پنجم.',
        language: 'python',
        engine: 'python',
        code: `audit_fixes = [
    ("ص ۲۹۱", "{% if temp %}", "{% if temp is not None %} (رفع باگ دمای ۰ درجه)"),
    ("ص ۲۹۱ و ۳۰۴", "همدان lat=37.7981", "lat=34.7981 (اصلاح خطای ۳۳۰ کیلومتری)"),
    ("ص ۳۲۳", "City.objects.get(id=cid)", "City.objects.filter(id=cid).first() (رفع کرش 500)"),
    ("ص ۳۲۴", "action={% url ... %}", 'action="{% url ... %}" (کوتیشن استاندارد HTML)'),
    ("ص ۳۲۷ و ۳۲۸", "حذف بدون لاگین / PostgreSQL", "قفل is_authenticated در View / پایگاه‌داده SQLite"),
]

print("=== فهرست طلایی اصلاحات ممیزی پودمان ۵ ===")
for page, wrong, fixed in audit_fixes:
    print(f"[{page}] ❌ {wrong}  ==>  ✔ {fixed}")`,
        teacherTalkingPoints: [
          'این چک‌لیست ۵ موردی می‌تواند خلاصه جلسه مرور شب امتحان پودمان ۵ روی تخته باشد!',
        ],
        lineExplanations: [
          {line: 1, explanation: 'فهرست جامع تمام ۵ اصلاح ممیزی‌شده در پودمان ۵.'},
        ],
        commonMistakes: ['کپی کردن چشم‌بسته کدهای کتاب بدون آگاهی از این ۵ اصلاح کلیدی.'],
      },
    ],
  },
];
