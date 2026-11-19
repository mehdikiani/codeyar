import type {
  ClassroomActivity,
  HomeworkAssignment,
  QuickQuizQuestion,
} from '../../../types/curriculum.ts';

export const UNIT_5_2_ACTIVITIES: ClassroomActivity[] = [
  {
    id: 'act-5-2-orm-crud',
    kind: 'project',
    title: 'پروژه عملی CRUD ایمن روی جدول شهرهای ایران (SQLite)',
    bookPage: '۳۲۳–۳۲۷',
    estimatedMinutes: 18,
    prompt:
      'با دستورات Django ORM ابتدا شهر «اهواز» (lat=31.3183, lon=48.6706) را اضافه کنید، سپس شهرهای مرتب‌شده بر اساس عرض جغرافیایی نزولی را ببینید و در نهایت شناسه ۹۹ را به صورت ایمن (بدون کرش) بررسی کنید.',
    steps: [
      'با City.objects.create(...) شهر اهواز را ثبت کنید.',
      'با City.objects.order_by("-lat") فهرست مرتب‌شده را دریافت کنید.',
      'با City.objects.filter(id=99).first() نبود شناسه ۹۹ را بدون خطا آزمون کنید.',
    ],
    hints: ['برای جلوگیری از کرش DoesNotExist هرگز از .get(id=99) استفاده نکنید.'],
    language: 'python',
    engine: 'django-sql',
    starterCode: `# ۱. افزودن شهر اهواز:

# ۲. مرتب‌سازی نزولی بر اساس عرض جغرافیایی:

# ۳. بررسی ایمن شناسه 99:
`,
    solutionCode: `City.objects.create(title='اهواز', lat=31.3183, lon=48.6706)
City.objects.order_by('-lat')
City.objects.filter(id=99).first()`,
    solutionExplanation: 'روش filter(...).first() در صورت نبود شناسه ۹۹ مقدار None برمی‌گرداند و سرور را متوقف نمی‌کند.',
    alternativeSolutionCode: `City.objects.create(title='اهواز', lat=31.3183, lon=48.6706)
City.objects.filter(title__contains='اهو')
City.objects.filter(id=99).delete()`,
    alternativeSolutionExplanation: 'جستجوی رکورد جدید با __contains و تست حذف ایمن شناسه ناموجود.',
  },
  {
    id: 'act-5-2-sql-north',
    kind: 'workshop',
    title: 'کارگاه پرس‌وجوی SQL روی جدول weather_city (شهرهای شمالی)',
    bookPage: '۳۰۶',
    estimatedMinutes: 12,
    prompt:
      'دستور SQL بنویسید که نام و مختصات شهرهایی که عرض جغرافیایی آن‌ها بزرگ‌تر از ۳۵ درجه است را از جدول weather_city استخراج کرده و بر اساس نام شهر (title) مرتب کند.',
    steps: [
      'ستون‌های id, title, lat, lon را انتخاب کنید.',
      'بند WHERE lat > 35 را اضافه کنید.',
      'با ORDER BY title ASC مرتب کنید.',
    ],
    hints: ['نام جدول ساخته‌شده توسط جنگو در SQLite برابر weather_city است.'],
    language: 'sql',
    engine: 'django-sql',
    starterCode: `-- پرس‌وجوی شهرهای با عرض بالای ۳۵ درجه را بنویسید:
SELECT id, title, lat, lon
FROM weather_city
`,
    solutionCode: `SELECT id, title, lat, lon
FROM weather_city
WHERE lat > 35
ORDER BY title ASC;`,
    solutionExplanation: 'دستور SQL مستقیماً روی موتور SQLite WASM اجرا شده و شهرهای نیمه شمالی را برمی‌گرداند.',
    alternativeSolutionCode: `SELECT title, lat
FROM weather_city
WHERE lat > 35
ORDER BY lat DESC
LIMIT 4;`,
    alternativeSolutionExplanation: 'نمایش ۴ شهر شمالی‌تر ایران به ترتیب از بالاترین عرض جغرافیایی.',
  },
  {
    id: 'act-5-2-orm-search',
    kind: 'activity',
    title: 'جستجو و فیلتر ترکیبی در Django ORM',
    bookPage: '۳۰۸',
    estimatedMinutes: 12,
    prompt:
      'با Django ORM سه پرس‌وجو اجرا کنید: یافتن تمام شهرهای دارای حرف «ت»، یافتن شهرهای با عرض کمتر از ۳۳ درجه، و شمارش کل شهرها.',
    steps: [
      'از filter(title__contains="ت") استفاده کنید.',
      'از filter(lat__lt=33) استفاده کنید.',
      'در انتها count() را صدا بزنید.',
    ],
    hints: ['بین نام فیلد و عملگر (contains / lt) حتماً دو زیرخط (__) قرار دهید.'],
    language: 'python',
    engine: 'django-sql',
    starterCode: `# سه دستور ORM را اینجا بنویسید:
`,
    solutionCode: `City.objects.filter(title__contains='ت')
City.objects.filter(lat__lt=33)
City.objects.count()`,
    solutionExplanation: 'ترجمه خودکار __contains به LIKE و __lt به عملگر < در SQLite.',
    alternativeSolutionCode: `City.objects.filter(title='تهران')
City.objects.filter(lat__gt=36)
City.objects.last()`,
    alternativeSolutionExplanation: 'استفاده از تطابق دقیق title و بازیابی آخرین رکورد با last().',
  },
  {
    id: 'act-5-2-delete-form',
    kind: 'workshop',
    title: 'اصلاح فرم حذف امن در قالب جنگو (ص ۳۲۴)',
    bookPage: '۳۲۴',
    estimatedMinutes: 15,
    prompt:
      'فرم حذف شهر را در قالب جنگو طوری بسازید که فقط برای کاربران واردشده (user.is_authenticated) نمایش داده شود، متد POST و {% csrf_token %} داشته باشد و کوتیشن صفت action را درست رعایت کند.',
    steps: [
      'بخش فرم را درون {% if user.is_authenticated %} قرار دهید.',
      'action="{% url \'delete_city\' %}" را با دابل‌کوتیشن کامل بنویسید.',
      'تگ {% csrf_token %} و ورودی مخفی city_id را داخل فرم بگذارید.',
    ],
    hints: ['دقت کنید {% csrf_token %} حتماً باید داخل تگ <form> باشد.'],
    language: 'django-html',
    engine: 'django-sql',
    starterCode: `<div style="direction:rtl;padding:10px;">
  <!-- فرم حذف ایمن شهر {{ city.title }} را تکمیل کنید -->
</div>`,
    solutionCode: `<div style="direction:rtl;font-family:Vazirmatn,sans-serif;padding:12px;border:1px solid #fecaca;background:#fef2f2;border-radius:10px;">
  <p style="margin:0 0 8px 0;">شهر انتخابی: <strong>{{ city.title }}</strong> (شناسه: {{ city.id }})</p>
  {% if user.is_authenticated %}
    <form method="post" action="{% url 'delete_city' %}">
      {% csrf_token %}
      <input type="hidden" name="city_id" value="{{ city.id }}" />
      <button type="submit" style="background:#dc2626;color:#fff;border:none;padding:6px 14px;border-radius:8px;">حذف ایمن این شهر</button>
    </form>
  {% else %}
    <p style="color:#64748b;margin:0;">برای حذف شهر ابتدا وارد حساب مدیریت شوید.</p>
  {% endif %}
</div>`,
    solutionExplanation: 'رعایت کامل استاندارد HTML5 (کوتیشن دور action)، متد POST، سپر CSRF و کنترل نمایش برای کاربر لاگین‌شده.',
    alternativeSolutionCode: `<form method="post" action="{% url 'delete_city' %}" style="direction:rtl;">
  {% csrf_token %}
  <select name="city_id" style="padding:6px;">
    {% for c in cities %}<option value="{{ c.id }}">{{ c.title }}</option>{% endfor %}
  </select>
  <button type="submit" style="background:#b91c1c;color:white;border:none;padding:6px 12px;border-radius:6px;">حذف شهر انتخابی</button>
</form>`,
    alternativeSolutionExplanation: 'ارائه منوی کشویی <select> با حلقه {% for %} برای انتخاب شهر و ارسال شناسه با یک فرم واحد.',
  },
  {
    id: 'act-5-2-security-guard',
    kind: 'workshop',
    title: 'کارگاه امن‌سازی View حذف در برابر حمله POST کاربر مهمان (ص ۳۲۷)',
    bookPage: '۳۲۷',
    estimatedMinutes: 15,
    prompt:
      'تابع delete_city(user_auth, method, cid) بنویسید که ۳ لایه حفاظتی را به ترتیب بررسی کند: ۱) احراز هویت، ۲) متد POST، و ۳) وجود ایمن شناسه بدون کرش.',
    steps: [
      'شرط if not user_auth را در خط اول تابع بگذارید.',
      'شرط if method != "POST" را بررسی کنید.',
      'حذف ایمن از دیکشنری db را با pop(cid, None) انجام دهید.',
    ],
    hints: ['از db.pop(cid, None) برای شبیه‌سازی filter().first().delete() بدون کرش استفاده کنید.'],
    language: 'python',
    engine: 'python',
    starterCode: `db = {1: "تهران", 2: "همدان", 3: "مشهد"}

def delete_city(user_auth, method, cid):
    # سه لایه امنیتی را پیاده‌سازی کنید:
    pass

print(delete_city(False, "POST", 2))
print(delete_city(True, "GET", 2))
print(delete_city(True, "POST", 2))
print(delete_city(True, "POST", 99))`,
    solutionCode: `db = {1: "تهران", 2: "همدان", 3: "مشهد"}

def delete_city(user_auth, method, cid):
    if not user_auth:
        return "403 مسدود شد: کاربر احراز هویت نشده است."
    if method != "POST":
        return "405 مسدود شد: فقط درخواست POST مجاز است."
    removed = db.pop(cid, None)
    if removed is None:
        return f"شهری با شناسه {cid} یافت نشد (بدون کرش)."
    return f"شهر «{removed}» با موفقیت حذف شد. باقی‌مانده: {list(db.values())}"

print(delete_city(False, "POST", 2))
print(delete_city(True, "GET", 2))
print(delete_city(True, "POST", 2))
print(delete_city(True, "POST", 99))`,
    solutionExplanation: 'پیاده‌سازی کامل دفاع چندلایه (Defense in Depth) دقیقاً مطابق اصلاح آسیب‌پذیری ص ۳۲۷ کتاب.',
    alternativeSolutionCode: `def login_required_check(is_auth, action):
    if not is_auth:
        return "انتقال به /accounts/login/"
    return action()

print(login_required_check(False, lambda: "حذف انجام شد"))
print(login_required_check(True, lambda: "حذف انجام شد"))`,
    alternativeSolutionExplanation: 'شبیه‌سازی ایده دکوریتور آماده @login_required جنگو که در پروژه‌های واقعی بالای View قرار می‌گیرد.',
  },
  {
    id: 'act-5-2-curiosity-orm-sql',
    kind: 'curiosity',
    title: 'کنجکاوی: چرا Django ORM جلوی حمله SQL Injection را می‌گیرد؟',
    bookPage: '۳۰۷',
    estimatedMinutes: 10,
    prompt:
      'ببینید اگر یک کاربر مخرب به جای نام شهر رشته `تهران\' OR \'1\'=\'1` وارد کند، در چسباندن دستی رشته SQL چه فاجعه‌ای رخ می‌دهد و چرا ORM این حمله را خنثی می‌کند.',
    steps: [
      'خروجی رشته ناامن f"SELECT ... WHERE title = \'{user_input}\'" را چاپ کنید.',
      'مقایسه کنید که در ORM کل ورودی صرفاً به عنوان یک مقدار متنی امن (پارامتر) ارسال می‌شود.',
    ],
    hints: ['به شرط OR \'1\'=\'1 در خروجی SQL ناامن دقت کنید که همیشه True است!'],
    language: 'python',
    engine: 'python',
    starterCode: `malicious_input = "' OR '1'='1"
# تفاوت کوئری دستی ناامن با پارامتر امن ORM را چاپ کنید:
`,
    solutionCode: `malicious_input = "' OR '1'='1"

unsafe_sql = f"SELECT * FROM weather_city WHERE title = '{malicious_input}';"
safe_query = ("SELECT * FROM weather_city WHERE title = ?;", (malicious_input,))

print("❌ SQL دستی ناامن (آسیب‌پذیر!):")
print("  ", unsafe_sql)
print("✔ روش امن ORM (Parameterized):")
print("  ", safe_query)`,
    solutionExplanation: 'در کوئری پارامتری ORM، علامت‌های کوتیشن ورودی کاربر به عنوان کد SQL تفسیر نمی‌شوند و حمله کاملاً خنثی می‌گردد.',
    alternativeSolutionCode: `# آزمایش جستجوی ایمن در ORM واقعی:
# City.objects.filter(title="' OR '1'='1") -> صفر نتیجه (کاملاً ایمن!)
print("در ORM جنگو تمام فیلترها خودکار پارامتری و امن هستند.")`,
    alternativeSolutionExplanation: 'توضیح کوتاه برای ارائه کلاسی روی تخته.',
  },
  {
    id: 'act-5-2-modelform-sim',
    kind: 'activity',
    title: 'ساخت کلاس CityForm با اعتبارسنجی تکراری نبودن نام شهر',
    bookPage: '۳۲۰–۳۲۱',
    estimatedMinutes: 15,
    prompt:
      'تابع validate_new_city(existing_titles, title, lat, lon) بنویسید که علاوه بر خالی نبودن نام و صحت بازه مختصات، بررسی کند شهر از قبل در پایگاه‌داده تکراری نباشد.',
    steps: [
      'بررسی کنید title.strip() خالی نباشد و در existing_titles نباشد.',
      'محدوده lat (-90 تا 90) و lon (-180 تا 180) را بررسی کنید.',
      'برای یک شهر تکراری («تهران») و یک شهر جدید («قزوین») تست کنید.',
    ],
    hints: ['از شرط title in existing_titles برای جلوگیری از ثبت شهر تکراری استفاده کنید.'],
    language: 'python',
    engine: 'python',
    starterCode: `existing = ["تهران", "همدان", "شیراز"]

def validate_new_city(title, lat, lon):
    # اعتبارسنجی را بنویسید
    pass
`,
    solutionCode: `existing = ["تهران", "همدان", "شیراز"]

def validate_new_city(title, lat, lon):
    clean = title.strip()
    if not clean:
        return (False, "نام شهر الزامی است.")
    if clean in existing:
        return (False, f"شهر «{clean}» قبلاً در پایگاه‌داده ثبت شده است!")
    if lat < -90 or lat > 90 or lon < -180 or lon > 180:
        return (False, "مختصات جغرافیایی نامعتبر است.")
    existing.append(clean)
    return (True, f"شهر «{clean}» با موفقیت ثبت شد.")

print(validate_new_city("تهران", 35.68, 51.38))
print(validate_new_city("قزوین", 36.2688, 50.0041))
print(validate_new_city("نامعتبر", 120.0, 50.0))`,
    solutionExplanation: 'افزودن قانون یکتایی (Unique) روی نام شهر در لایه فرم از ایجاد ردیف‌های تکراری در SQLite جلوگیری می‌کند.',
    alternativeSolutionCode: `existing_set = {"تهران", "همدان", "شیراز"}
for city in ["همدان", "کرمانشاه"]:
    if city in existing_set:
        print(city, "-> تکراری!")
    else:
        existing_set.add(city)
        print(city, "-> اضافه شد.")`,
    alternativeSolutionExplanation: 'استفاده از مجموعه set (مهارت واحد ۱.۲) برای بررسی سریع تکراری نبودن.',
  },
  {
    id: 'act-5-2-delete-safe-orm',
    kind: 'workshop',
    title: 'درج و حذف ایمن شهر آزمایشی در پایگاه‌داده SQLite',
    bookPage: '۳۲۳',
    estimatedMinutes: 12,
    prompt:
      'با ORM ابتدا تعداد کل شهرها را ببینید، سپس شهر «بندرعباس» (lat=27.1832, lon=56.2666) را اضافه کنید، شهرهای دارای عرض کمتر از ۳۰ را فیلتر کنید و در پایان شمارش مجدد بگیرید.',
    steps: [
      'City.objects.count() را اجرا کنید.',
      'شهر بندرعباس را با create() اضافه کنید.',
      'با filter(lat__lt=30) شهرهای جنوبی را نمایش دهید.',
    ],
    hints: ['عرض بندرعباس 27.18 و شیراز 29.59 هر دو کمتر از 30 هستند.'],
    language: 'python',
    engine: 'django-sql',
    starterCode: `# دستورات ORM را به ترتیب بنویسید:
`,
    solutionCode: `City.objects.count()
City.objects.create(title='بندرعباس', lat=27.1832, lon=56.2666)
City.objects.filter(lat__lt=30)
City.objects.count()`,
    solutionExplanation: 'پس از افزودن بندرعباس، هر دو شهر شیراز و بندرعباس در نتیجه فیلتر lat__lt=30 ظاهر می‌شوند.',
    alternativeSolutionCode: `City.objects.create(title='بندرعباس', lat=27.1832, lon=56.2666)
City.objects.order_by('lat')`,
    alternativeSolutionExplanation: 'مرتب‌سازی صعودی عرض جغرافیایی باعث می‌شود بندرعباس (جنوبی‌ترین شهر) در ردیف اول قرار گیرد.',
  },
];

export const UNIT_5_2_HOMEWORKS: HomeworkAssignment[] = [
  {
    id: 'hw-5-2-01',
    number: 1,
    title: 'نمایش تمام شهرها و شمارش تعداد آن‌ها با Django ORM',
    difficulty: 'easy',
    bookPage: '۳۰۷',
    estimatedMinutes: 8,
    prompt: 'با دو دستور ORM تمام رکوردهای جدول weather_city و تعداد کل آن‌ها را روی SQLite چاپ کنید.',
    sampleOutput: 'نمایش ۸ شهر ایران و تعداد کل 8',
    hint: 'از City.objects.all() و City.objects.count() استفاده کنید.',
    solutionCode: `City.objects.all()
City.objects.count()`,
    solutionExplanation: 'پایه‌ای‌ترین دستورات خواندن اطلاعات از طریق مدیر objects.',
    language: 'python',
    engine: 'django-sql',
  },
  {
    id: 'hw-5-2-02',
    number: 2,
    title: 'یافتن اولین و آخرین شهر جدول با ORM',
    difficulty: 'easy',
    bookPage: '۳۰۷',
    estimatedMinutes: 8,
    prompt: 'اولین و آخرین شهر ثبت‌شده در پایگاه‌داده را با متدهای first() و last() بازیابی کنید.',
    sampleOutput: 'اولین: تهران | آخرین: اردبیل',
    hint: 'City.objects.first() و City.objects.last()',
    solutionCode: `City.objects.first()
City.objects.last()`,
    solutionExplanation: 'این دو متد در صورت خالی بودن جدول بدون کرش None برمی‌گردانند.',
    language: 'python',
    engine: 'django-sql',
  },
  {
    id: 'hw-5-2-03',
    number: 3,
    title: 'پرس‌وجوی SQL برای نمایش شهرهای جنوبی‌تر از عرض ۳۳ درجه',
    difficulty: 'easy',
    bookPage: '۳۰۶',
    estimatedMinutes: 10,
    prompt: 'دستور SQL بنویسید که id، title و lat شهرهایی با lat < 33 را از جدول weather_city برگرداند.',
    sampleOutput: 'اصفهان (32.6546) و شیراز (29.5918)',
    hint: 'از WHERE lat < 33 استفاده کنید.',
    solutionCode: `SELECT id, title, lat
FROM weather_city
WHERE lat < 33
ORDER BY lat ASC;`,
    solutionExplanation: 'اجرای مستقیم شرط عددی در SQLite.',
    language: 'sql',
    engine: 'django-sql',
  },
  {
    id: 'hw-5-2-04',
    number: 4,
    title: 'درج شهر «کرمانشاه» در SQLite با ORM',
    difficulty: 'easy',
    bookPage: '۳۰۷',
    estimatedMinutes: 10,
    prompt: 'شهر «کرمانشاه» با مختصات lat=34.3142 و lon=47.0650 را با City.objects.create اضافه کرده و سپس با filter بررسی کنید.',
    sampleOutput: 'ثبت موفق کرمانشاه و نمایش آن در نتیجه filter',
    hint: "City.objects.create(title='کرمانشاه', lat=34.3142, lon=47.0650)",
    solutionCode: `City.objects.create(title='کرمانشاه', lat=34.3142, lon=47.0650)
City.objects.filter(title='کرمانشاه')`,
    solutionExplanation: 'درج رکورد جدید و تأیید ذخیره فوری آن در جدول.',
    language: 'python',
    engine: 'django-sql',
  },
  {
    id: 'hw-5-2-05',
    number: 5,
    title: 'واکشی ایمن بدون کرش (اصلاح باگ .get ص ۳۲۳)',
    difficulty: 'medium',
    bookPage: '۳۲۳',
    estimatedMinutes: 12,
    prompt: 'شناسه موجود id=4 (اصفهان) و شناسه ناموجود id=500 را به روش ایمن Django ORM طوری واکشی کنید که در هیچ‌کدام خطای DoesNotExist رخ ندهد.',
    sampleOutput: 'یافت شد: اصفهان | مقدار None (بدون خطا)',
    hint: 'از ترکیب City.objects.filter(id=...).first() استفاده کنید.',
    solutionCode: `City.objects.filter(id=4).first()
City.objects.filter(id=500).first()`,
    solutionExplanation: 'جایگزینی استاندارد برای .get() جهت جلوگیری از خطای 500.',
    language: 'python',
    engine: 'django-sql',
  },
  {
    id: 'hw-5-2-06',
    number: 6,
    title: 'مرتب‌سازی شهرها بر اساس طول جغرافیایی (غرب به شرق) با SQL',
    difficulty: 'medium',
    bookPage: '۳۰۶',
    estimatedMinutes: 12,
    prompt: 'دستور SQL بنویسید که تمام شهرها را از غربی‌ترین (کمترین lon) به شرقی‌ترین (بیشترین lon) مرتب کرده و ۳ شهر غربی‌تر را نمایش دهد.',
    sampleOutput: 'تبریز، اردبیل و همدان در صدر فهرست',
    hint: 'از ORDER BY lon ASC LIMIT 3 استفاده کنید.',
    solutionCode: `SELECT id, title, lon
FROM weather_city
ORDER BY lon ASC
LIMIT 3;`,
    solutionExplanation: 'طول جغرافیایی کمتر در ایران به معنای موقعیت غربی‌تر است.',
    language: 'sql',
    engine: 'django-sql',
  },
  {
    id: 'hw-5-2-07',
    number: 7,
    title: 'جستجوی متنی و فیلتر عرض جغرافیایی در ORM',
    difficulty: 'medium',
    bookPage: '۳۰۸',
    estimatedMinutes: 12,
    prompt: 'با ORM شهرهایی را بیابید که نامشان شامل «ان» است (مثل تهران، همدان، اصفهان) و همچنین شهرهای با عرض بالای ۳۷ درجه را فهرست کنید.',
    sampleOutput: 'تهران، همدان، اصفهان | تبریز، رشت، اردبیل',
    hint: 'از title__contains و lat__gt استفاده کنید.',
    solutionCode: `City.objects.filter(title__contains='ان')
City.objects.filter(lat__gt=37)`,
    solutionExplanation: 'کاربرد عملی Lookupهای متنی و عددی دو زیرخط در ORM.',
    language: 'python',
    engine: 'django-sql',
  },
  {
    id: 'hw-5-2-08',
    number: 8,
    title: 'طراحی فرم ورود کاربر در قالب جنگو همراه با {% csrf_token %}',
    difficulty: 'medium',
    bookPage: '۳۱۶',
    estimatedMinutes: 15,
    prompt: 'فرم ورود امن (username و password) با method="post"، action="{% url \'login\' %}" و {% csrf_token %} در قالب جنگو بنویسید.',
    sampleOutput: 'فرم ورود فارسی دارای فیلد مخفی CSRF',
    hint: 'حتماً action را درون دابل‌کوتیشن قرار دهید.',
    solutionCode: `<form method="post" action="{% url 'login' %}" style="direction:rtl;max-width:340px;padding:14px;border:1px solid #cbd5e1;border-radius:10px;font-family:Vazirmatn,sans-serif;">
  {% csrf_token %}
  <h4 style="margin-top:0;">ورود به سامانه meteo</h4>
  <input type="text" name="username" required placeholder="نام کاربری" style="width:100%;padding:6px;margin-bottom:8px;" />
  <input type="password" name="password" required placeholder="رمز عبور" style="width:100%;padding:6px;margin-bottom:10px;" />
  <button type="submit" style="width:100%;background:#0284c7;color:#fff;border:none;padding:8px;border-radius:8px;">ورود</button>
</form>`,
    solutionExplanation: 'رعایت تمام الزامات امنیتی فرم ورود در جنگو.',
    language: 'django-html',
    engine: 'django-sql',
  },
  {
    id: 'hw-5-2-09',
    number: 9,
    title: 'پاک‌سازی امن رکورد آزمایشی و بررسی کاهش شمارنده در ORM',
    difficulty: 'challenging',
    bookPage: '۳۲۳–۳۲۷',
    estimatedMinutes: 15,
    prompt: 'شهر «قشم» (lat=26.9581, lon=56.2719) را ایجاد کنید، آن را جستجو کنید، سپس شهر با id=8 را با filter(id=8).delete() حذف کرده و فهرست نهایی را بر اساس نام مرتب کنید.',
    sampleOutput: 'ثبت قشم، حذف ایمن id=8 و مرتب‌سازی الفبایی نهایی',
    hint: 'دستورات create، filter، delete و order_by("title") را پشت سر هم بنویسید.',
    solutionCode: `City.objects.create(title='قشم', lat=26.9581, lon=56.2719)
City.objects.filter(title='قشم')
City.objects.filter(id=8).delete()
City.objects.order_by('title')`,
    solutionExplanation: 'اجرای چرخه کامل درج، فیلتر، حذف ایمن و مرتب‌سازی روی SQLite.',
    language: 'python',
    engine: 'django-sql',
  },
  {
    id: 'hw-5-2-10',
    number: 10,
    title: 'شبیه‌ساز کامل دفاع امنیتی View افزودن و حذف شهر (آزمون جامع)',
    difficulty: 'challenging',
    bookPage: '۳۲۰–۳۲۷',
    estimatedMinutes: 20,
    prompt: 'کلاس MiniCityController بنویسید که متدهای add_city و delete_city داشته باشد و برای هر دو، لاگین بودن کاربر، متد POST و وجود CSRF Token معتبر را چک کند.',
    sampleOutput: 'رد درخواست‌های بدون لاگین/CSRF و اجرای موفق درخواست مجاز',
    hint: 'یک متد کمکی _check_security(user_auth, method, csrf_ok) بنویسید تا کد تکراری نشود.',
    solutionCode: `class MiniCityController:
    def __init__(self):
        self.cities = {1: "تهران", 2: "همدان"}
        self.next_id = 3

    def _check_security(self, is_auth, method, csrf_ok):
        if not is_auth:
            return "403 خطا: نیاز به احراز هویت"
        if method != "POST":
            return "405 خطا: فقط متد POST مجاز است"
        if not csrf_ok:
            return "403 خطا: توکن CSRF نامعتبر است"
        return None

    def add_city(self, title, is_auth, method, csrf_ok):
        err = self._check_security(is_auth, method, csrf_ok)
        if err:
            return err
        cid = self.next_id
        self.next_id += 1
        self.cities[cid] = title
        return f"201 شهر «{title}» با id={cid} ثبت شد."

    def delete_city(self, cid, is_auth, method, csrf_ok):
        err = self._check_security(is_auth, method, csrf_ok)
        if err:
            return err
        removed = self.cities.pop(cid, None)
        if removed is None:
            return "200 شناسه وجود نداشت (ایمن)."
        return f"200 شهر «{removed}» حذف شد."

ctrl = MiniCityController()
print(ctrl.add_city("یزد", False, "POST", True))
print(ctrl.add_city("یزد", True, "POST", False))
print(ctrl.add_city("یزد", True, "POST", True))
print(ctrl.delete_city(2, True, "POST", True))`,
    solutionExplanation: 'جمع‌بندی تمام مفاهیم پودمان ۴ (OOP) و پودمان ۵ (امنیت CRUD جنگو) در یک پروژه نهایی جامع.',
    language: 'python',
    engine: 'python',
  },
];

export const UNIT_5_2_QUIZZES: QuickQuizQuestion[] = [
  {
    id: 'quiz-5-2-01',
    kind: 'bug-spot',
    question: 'مشکل بحرانی کد شکل ۷۱ صفحه ۳۲۳ کتاب هنگام جستجوی شناسه ناموجود (مثل 999) چیست؟',
    codeSnippet: `city = City.objects.get(id=city_id)\nif city:\n    city.delete()`,
    language: 'python',
    options: [
      'متد delete پرانتز ندارد',
      'متد .get() در نبود رکورد خطای City.DoesNotExist می‌دهد و برنامه قبل از رسیدن به if کرش می‌کند؛ باید .filter(id=city_id).first() نوشت',
      'باید به جای id از pk استفاده کرد',
      'هیچ مشکلی ندارد',
    ],
    correctIndex: 1,
    explanation: 'استفاده از .filter(id=city_id).first() در صورت نبود رکورد بدون خطا None برمی‌گرداند.',
    bookPage: '۳۲۳',
  },
  {
    id: 'quiz-5-2-02',
    kind: 'concept',
    question: 'اگر نام اپلیکیشن weather و نام کلاس مدل City باشد، جنگو نام جدول را در پایگاه‌داده SQLite چه می‌گذارد؟',
    options: ['City', 'cities', 'weather_city', 'django_city'],
    correctIndex: 2,
    explanation: 'قرارداد پیش‌فرض نام‌گذاری جدول در جنگو appname_modelname (با حروف کوچک) یعنی weather_city است.',
    bookPage: '۳۰۰',
  },
  {
    id: 'quiz-5-2-03',
    kind: 'concept',
    question: 'اگر در یک فرم method="post" در جنگو تگ {% csrf_token %} را فراموش کنیم، چه اتفاقی می‌افتد؟',
    options: [
      'فرم بدون مشکل ذخیره می‌شود',
      'جنگو درخواست را مسدود کرده و خطای امنیتی 403 Forbidden (CSRF verification failed) می‌دهد',
      'صفحه به حالت تاریک می‌رود',
      'کل پایگاه‌داده پاک می‌شود',
    ],
    correctIndex: 1,
    explanation: 'تگ {% csrf_token %} برای محافظت در برابر حملات جعل درخواست میان‌سایتی در تمام فرم‌های POST الزامی است.',
    bookPage: '۳۱۹',
  },
  {
    id: 'quiz-5-2-04',
    kind: 'bug-spot',
    question: 'آسیب‌پذیری امنیتی جدی در صفحه ۳۲۷ کتاب برای عملیات حذف شهر چه بود؟',
    options: [
      'رنگ دکمه حذف قرمز نبود',
      'دکمه حذف در HTML مخفی شده بود اما در View سمت سرور بررسی request.user.is_authenticated انجام نشده بود',
      'از SQLite به جای فایل متنی استفاده شده بود',
      'نام تابع انگلیسی بود',
    ],
    correctIndex: 1,
    explanation: 'مخفی کردن دکمه در HTML امنیت ایجاد نمی‌کند؛ قفل احراز هویت باید حتماً درون View سمت سرور نیز بررسی شود.',
    bookPage: '۳۲۷',
  },
  {
    id: 'quiz-5-2-05',
    kind: 'concept',
    question: 'پس از تعریف یا تغییر یک کلاس مدل در models.py کدام دو دستور باید به ترتیب اجرا شوند تا جدول در SQLite ساخته شود؟',
    options: [
      'runserver سپس startapp',
      'makemigrations سپس migrate',
      'migrate سپس startproject',
      'createsuperuser سپس runserver',
    ],
    correctIndex: 1,
    explanation: 'makemigrations فایل تغییرات را تولید می‌کند و migrate آن را روی فایل db.sqlite3 اعمال می‌نماید.',
    bookPage: '۳۰۰',
  },
  {
    id: 'quiz-5-2-06',
    kind: 'concept',
    question: 'عبارت City.objects.order_by("-lat") در Django ORM معادل کدام دستور SQL است؟',
    options: [
      'SELECT * FROM weather_city ORDER BY lat ASC;',
      'SELECT * FROM weather_city ORDER BY lat DESC;',
      'SELECT * FROM weather_city WHERE lat < 0;',
      'DELETE FROM weather_city WHERE lat > 0;',
    ],
    correctIndex: 1,
    explanation: 'علامت منفی (-) پیش از نام فیلد در order_by نشان‌دهنده مرتب‌سازی نزولی (DESC) است.',
    bookPage: '۳۰۸',
  },
  {
    id: 'quiz-5-2-07',
    kind: 'bug-spot',
    question: 'کدام خط زیر خطای نحوی HTML صفحه ۳۲۴ کتاب را اصلاح کرده است؟',
    options: [
      '<form method="post" action={% url \'delete_city\' %}>',
      '<form method="post" action="{% url \'delete_city\' %}">',
      '<form method="get" action="delete_city">',
      '<form action="{% delete_city %}">',
    ],
    correctIndex: 1,
    explanation: 'صفت action در HTML حتماً باید با دابل‌کوتیشن محصور شود: action="{% url \'delete_city\' %}".',
    bookPage: '۳۲۴',
  },
  {
    id: 'quiz-5-2-08',
    kind: 'concept',
    question: 'در جدول ارزشیابی صفحه ۳۲۸ کتاب چه اشتباه چاپی در نام پایگاه‌داده رخ داده بود؟',
    options: [
      'نام MySQL چاپ شده بود',
      'نام PostgreSQL چاپ شده بود در حالی که کل پروژه فصل ۵ از SQLite (db.sqlite3) استفاده می‌کند',
      'نام MongoDB چاپ شده بود',
      'هیچ اشتباهی نبود',
    ],
    correctIndex: 1,
    explanation: 'پروژه meteo کتاب از صفحات ۳۰۰ تا ۳۲۷ به‌طور کامل با SQLite پیاده‌سازی شده است.',
    bookPage: '۳۲۸',
  },
  {
    id: 'quiz-5-2-09',
    kind: 'concept',
    question: 'چرا در عملیات حذف رکورد از پایگاه‌داده باید از فرم POST استفاده کنیم نه لینک ساده <a> (متد GET)؟',
    options: [
      'چون تگ <a> در جنگو کار نمی‌کند',
      'چون درخواست GET فقط برای خواندن داده است و لینک‌های GET به‌راحتی توسط خزنده‌ها یا حملات CSRF می‌توانند باعث حذف ناخواسته شوند',
      'چون POST حجم صفحه را کم می‌کند',
      'چون GET از حروف فارسی پشتیبانی نمی‌کند',
    ],
    correctIndex: 1,
    explanation: 'استاندارد HTTP و امنیت وب حکم می‌کند هرگونه عملیات تغییر یا حذف داده فقط با POST همراه با CSRF و احراز هویت انجام شود.',
    bookPage: '۳۲۴',
  },
];
