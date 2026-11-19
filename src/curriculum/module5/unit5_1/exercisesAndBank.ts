import type {
  ClassroomActivity,
  HomeworkAssignment,
  QuickQuizQuestion,
} from '../../../types/curriculum.ts';

export const UNIT_5_1_ACTIVITIES: ClassroomActivity[] = [
  {
    id: 'act-5-1-loop-tpl',
    kind: 'workshop',
    title: 'کارگاه نمایش لیست شهرها با حلقه {% for %} در قالب جنگو',
    bookPage: '۲۸۹ و ۳۱۲',
    estimatedMinutes: 15,
    prompt:
      'قالب جنگویی بنویسید که با حلقه {% for c in cities %} نام، شماره ردیف (forloop.counter) و مختصات تمام شهرهای موجود در SQLite را درون لیست <ul> نمایش دهد.',
    steps: [
      'تگ {% for c in cities %} ... {% endfor %} را داخل <ul> قرار دهید.',
      'درون هر <li> از {{ forloop.counter }}، {{ c.title }}، {{ c.lat }} و {{ c.lon }} استفاده کنید.',
      'دکمه «اجرا روی SQLite / جنگو» را بزنید و خروجی فارسی را بررسی کنید.',
    ],
    hints: ['فراموش نکنید تگ {% endfor %} را در پایان حلقه ببندید.'],
    language: 'django-html',
    engine: 'django-sql',
    starterCode: `<ul style="direction:rtl;line-height:2;">
  <!-- حلقه for جنگو را اینجا بنویسید -->
</ul>`,
    solutionCode: `<ul style="direction:rtl;line-height:2;font-family:Vazirmatn,sans-serif;">
  {% for c in cities %}
    <li><strong>{{ forloop.counter }}. {{ c.title }}</strong> (عرض: {{ c.lat }}، طول: {{ c.lon }})</li>
  {% endfor %}
</ul>`,
    solutionExplanation: 'موتور قالب جنگو حلقه را روی تمام رکوردهای جدول SQLite تکرار کرده و برای هر شهر یک <li> می‌سازد.',
    alternativeSolutionCode: `<div style="direction:rtl;display:flex;flex-wrap:wrap;gap:8px;font-family:Vazirmatn,sans-serif;">
  {% for c in cities %}
    <span style="padding:6px 12px;border-radius:8px;background:#e0f2fe;color:#0369a1;font-weight:bold;">
      {{ c.title }} ({{ c.lat }})
    </span>
  {% endfor %}
</div>`,
    alternativeSolutionExplanation: 'نمایش شهرها به‌صورت کارت‌های افقی با Flexbox به جای لیست ساده.',
  },
  {
    id: 'act-5-1-zero-fix',
    kind: 'activity',
    title: 'تست و اصلاح شرط دمای صفر درجه در قالب هواشناسی (ص ۲۹۱)',
    bookPage: '۲۹۱',
    estimatedMinutes: 12,
    prompt:
      'قالب زیر به خاطر باگ {% if temp %} دمای صفر درجه را اشتباهاً «ناموجود» نشان می‌دهد؛ شرط را اصلاح کنید تا دمای 0 درجه همراه با رنگ آبی زمستانی نمایش داده شود.',
    steps: [
      'شرط {% if temp %} را به {% if temp is not None %} تغییر دهید.',
      'قالب را اجرا کنید و مطمئن شوید مقدار 0 درجه چاپ می‌شود.',
    ],
    hints: ['در موتور تست این سامانه متغیر temp عمداً روی عدد 0 تنظیم شده است.'],
    language: 'django-html',
    engine: 'django-sql',
    starterCode: `<div style="direction:rtl;padding:12px;">
  {% if temp %}
    <p style="color:#0284c7;font-weight:bold;">دمای فعلی: {{ temp }} درجه سانتی‌گراد</p>
  {% else %}
    <p style="color:#dc2626;">دما در دسترس نیست!</p>
  {% endif %}
</div>`,
    solutionCode: `<div style="direction:rtl;padding:12px;font-family:Vazirmatn,sans-serif;">
  {% if temp is not None %}
    <p style="color:#0284c7;font-weight:bold;">❄ دمای فعلی: {{ temp }} درجه سانتی‌گراد</p>
  {% else %}
    <p style="color:#dc2626;">دما در دسترس نیست!</p>
  {% endif %}
</div>`,
    solutionExplanation: 'شرط is not None عدد 0 را یک دمای واقعی و معتبر می‌شناسد.',
    alternativeSolutionCode: `<div style="direction:rtl;padding:12px;font-family:Vazirmatn,sans-serif;">
  {% if temp is None %}
    <p style="color:#dc2626;">دما در دسترس نیست!</p>
  {% else %}
    <p style="color:#059669;font-weight:bold;">دمای ثبت‌شده: {{ temp }} درجه</p>
  {% endif %}
</div>`,
    alternativeSolutionExplanation: 'روش معادل با بررسی ابتدا {% if temp is None %} و قرار دادن نمایش دما در {% else %}.',
  },
  {
    id: 'act-5-1-router-sim',
    kind: 'workshop',
    title: 'شبیه‌سازی مسیریاب urls.py با ۳ مسیر و خطای 404',
    bookPage: '۲۸۴–۲۸۵',
    estimatedMinutes: 15,
    prompt:
      'برنامه‌ای پایتونی بنویسید که یک دیکشنری routes شامل سه مسیر "/"، "/weather/" و "/cities/" داشته باشد و تابعی بنویسد که برای مسیرهای موجود پاسخ 200 و برای مسیر ناموجود 404 برگرداند.',
    steps: [
      'سه تابع View ساده تعریف کنید.',
      'دیکشنری routes را به مرجع توابع (بدون پرانتز) متصل کنید.',
      'تابع handle_request(path) را برای ۴ نشانی تست کنید.',
    ],
    hints: ['در دیکشنری فقط نام تابع را بگذارید و هنگام اجرا پرانتز () بزنید.'],
    language: 'python',
    engine: 'python',
    starterCode: `def home(): return "صفحه اصلی meteo"
def weather(): return "وضعیت آب‌وهوا"
def cities(): return "لیست شهرها"

# دیکشنری routes و تابع handle_request را کامل کنید:
`,
    solutionCode: `def home(): return "صفحه اصلی meteo"
def weather(): return "وضعیت آب‌وهوا"
def cities(): return "لیست شهرها"

routes = {
    "/": home,
    "/weather/": weather,
    "/cities/": cities,
}

def handle_request(path):
    view = routes.get(path)
    if view is None:
        return f"404 Not Found: مسیر {path} وجود ندارد."
    return f"200 OK: {view()}"

for p in ["/", "/weather/", "/cities/", "/admin/"]:
    print(handle_request(p))`,
    solutionExplanation: 'نگاشت مسیر به مرجع تابع دقیقاً همان الگوی درونی URLResolver جنگو است.',
    alternativeSolutionCode: `routes = [("/", "home_view"), ("/weather/", "weather_view"), ("/cities/", "city_list_view")]

def resolve(path):
    for pattern, name in routes:
        if pattern == path:
            return f"مسیر {path} -> {name}"
    return f"404 برای {path}"

print(resolve("/weather/"))
print(resolve("/404/"))`,
    alternativeSolutionExplanation: 'شبیه‌سازی مبتنی بر لیست تاپل‌ها دقیقاً شبیه ساختار urlpatterns جنگو.',
  },
  {
    id: 'act-5-1-weather-parser',
    kind: 'workshop',
    title: 'استخراج امن آب‌وهوا از JSON با اصلاح مختصات همدان',
    bookPage: '۲۹۰–۲۹۱',
    estimatedMinutes: 15,
    prompt:
      'تابع parse_weather(json_str) بنویسید که دما و سرعت باد را از رشته JSON شبیه Open-Meteo استخراج کند و در صورت خراب بودن ساختار JSON یا نبود کلید، مقدار None برگرداند.',
    steps: [
      'درون try از json.loads() استفاده کنید.',
      'کلیدهای ["current_weather"]["temperature"] و ["windspeed"] را بخوانید.',
      'در except KeyError مقدار None برگردانید.',
    ],
    hints: ['خروجی را برای دو نمونه (یک JSON سالم با دمای 0 و یک JSON ناقص) تست کنید.'],
    language: 'python',
    engine: 'python',
    starterCode: `import json

def parse_weather(json_str):
    # با try/except دما و سرعت باد را استخراج کنید:
    pass

sample_ok = '{"current_weather": {"temperature": 0, "windspeed": 12.5}}'
sample_bad = '{"message": "offline"}'
`,
    solutionCode: `import json

def parse_weather(json_str):
    try:
        data = json.loads(json_str)
        cw = data["current_weather"]
        return (cw["temperature"], cw["windspeed"])
    except KeyError:
        return None

sample_ok = '{"current_weather": {"temperature": 0, "windspeed": 12.5}}'
sample_bad = '{"message": "offline"}'

for label, raw in [("اردبیل (۰ درجه)", sample_ok), ("خطای سرویس", sample_bad)]:
    res = parse_weather(raw)
    if res is not None:
        print(f"{label} => دما: {res[0]}°C | باد: {res[1]} km/h")
    else:
        print(f"{label} => اطلاعات در دسترس نیست!")`,
    solutionExplanation: 'برگرداندن تاپل (دما، باد) یا None باعث جداسازی کامل منطق استخراج داده از لایه نمایش می‌شود.',
    alternativeSolutionCode: `import json

def get_temp(raw):
    data = json.loads(raw)
    cw = data.get("current_weather", {})
    return cw.get("temperature")

print("دما:", get_temp('{"current_weather": {"temperature": 0}}'))
print("دما (ناقص):", get_temp('{}'))`,
    alternativeSolutionExplanation: 'روش تمیزتر با متد زنجیره‌ای .get() که حتی بدون KeyError به صورت خودکار None برمی‌گرداند.',
  },
  {
    id: 'act-5-1-navbar-url',
    kind: 'activity',
    title: 'طراحی نوار ناوبری قالب با {% url %} و وضعیت لاگین کاربر',
    bookPage: '۲۸۸ و ۳۱۷',
    estimatedMinutes: 12,
    prompt:
      'یک نوار ناوبری RTL در قالب جنگو بسازید که لینک‌های «خانه» (home)، «شهرها» (city_list) و در صورت ورود کاربر (user.is_authenticated) دکمه «افزودن شهر» (add_city) را نشان دهد.',
    steps: [
      'تگ <nav> با direction:rtl بسازید.',
      'از {% url "home" %} و {% url "city_list" %} استفاده کنید.',
      'لینک افزودن شهر را داخل {% if user.is_authenticated %} قرار دهید.',
    ],
    hints: ['مطمئن شوید {% endif %} را فراموش نکرده‌اید.'],
    language: 'django-html',
    engine: 'django-sql',
    starterCode: `<nav style="direction:rtl;padding:10px;background:#f1f5f9;border-radius:8px;">
  <!-- لینک‌های قالب جنگو را اینجا بنویسید -->
</nav>`,
    solutionCode: `<nav style="direction:rtl;display:flex;gap:14px;align-items:center;padding:12px;background:#0f172a;color:white;border-radius:10px;font-family:Vazirmatn,sans-serif;">
  <a href="{% url 'home' %}" style="color:#38bdf8;text-decoration:none;font-weight:bold;">خانه</a>
  <a href="{% url 'city_list' %}" style="color:#e2e8f0;text-decoration:none;">فهرست شهرها</a>
  {% if user.is_authenticated %}
    <a href="{% url 'add_city' %}" style="color:#4ade80;text-decoration:none;">+ افزودن شهر</a>
    <span style="margin-right:auto;font-size:12px;color:#94a3b8;">کاربر: {{ user.username }}</span>
  {% endif %}
</nav>`,
    solutionExplanation: 'کنترل نمایش دکمه‌های مدیریتی در قالب همراه با تگ‌های {% url %}.',
    alternativeSolutionCode: `<div style="direction:rtl;padding:10px;border:1px solid #cbd5e1;border-radius:8px;">
  <a href="{% url 'home' %}">صفحه اصلی</a> |
  <a href="{% url 'city_list' %}">شهرها</a>
  {% if user.is_authenticated %} | <a href="{% url 'logout' %}">خروج ({{ user.username }})</a>{% endif %}
</div>`,
    alternativeSolutionExplanation: 'نسخه مینیمال و سریع برای آموزش ساختار {% url %} و {% if %} در کلاس.',
  },
  {
    id: 'act-5-1-curiosity-hamedan',
    kind: 'curiosity',
    title: 'کنجکاوی جغرافیایی: اختلاف ۳۳۰ کیلومتری مختصات همدان در کتاب!',
    bookPage: '۲۹۱ و ۳۰۴',
    estimatedMinutes: 10,
    prompt:
      'با پایتون اختلاف عرض جغرافیایی اشتباه کتاب برای همدان (37.7981) و عرض جغرافیایی واقعی (34.7981) را محاسبه کنید (هر درجه عرض جغرافیایی حدود ۱۱۱ کیلومتر است).',
    steps: [
      'اختلاف دو عدد را محاسبه کنید.',
      'در ۱۱۱ کیلومتر ضرب کرده و خطای مسافتی کتاب را چاپ کنید.',
    ],
    hints: ['فرمول: diff_km = abs(37.7981 - 34.7981) * 111'],
    language: 'python',
    engine: 'python',
    starterCode: `book_lat = 37.7981
real_lat = 34.7981
# اختلاف کیلومتری را حساب و چاپ کنید:
`,
    solutionCode: `book_lat = 37.7981
real_lat = 34.7981
diff_deg = abs(book_lat - real_lat)
diff_km = round(diff_deg * 111, 1)

print(f"اختلاف عرض جغرافیایی: {diff_deg} درجه")
print(f"خطای مکانی روی نقشه ایران: حدود {diff_km} کیلومتر به سمت شمال!")`,
    solutionExplanation: 'این محاسبه ساده باعث می‌شود هنرجویان اهمیت اعتبارسنجی داده‌های علمی را در پروژه‌های نرم‌افزاری درک کنند.',
    alternativeSolutionCode: `cities = [("همدان (اشتباه کتاب)", 37.7981), ("همدان (صحیح)", 34.7981), ("اردبیل", 38.2498)]
for name, lat in cities:
    print(f"{name}: عرض {lat}")`,
    alternativeSolutionExplanation: 'مقایسه مستقیم مختصات اشتباه کتاب با عرض جغرافیایی اردبیل (۳۸.۲۵) برای نشان دادن نزدیکی آن به شمال ایران.',
  },
  {
    id: 'act-5-1-context-builder',
    kind: 'project',
    title: 'پروژه شبیه‌ساز کامل View و Template پروژه meteo',
    bookPage: '۲۸۸–۲۹۲',
    estimatedMinutes: 20,
    prompt:
      'برنامه‌ای بنویسید که مختصات یک شهر را از دیکشنری شهرهای ایران بگیرد، دمای آن را (شامل ۰ درجه اردبیل) از دیکشنری هوا بخواند و یک گزارش HTML کامل با رعایت شرط is not None تولید کند.',
    steps: [
      'دیکشنری CITIES با مختصات صحیح همدان، تهران و اردبیل بسازید.',
      'تابع meteo_home_view(city_name) را بنویسید.',
      'برای همدان، اردبیل (۰ درجه) و یک شهر ناموجود خروجی بگیرید.',
    ],
    hints: ['از is not None برای تصمیم‌گیری درباره نمایش دما استفاده کنید.'],
    language: 'python',
    engine: 'python',
    starterCode: `CITIES = {
    "تهران": {"lat": 35.6892, "lon": 51.3890, "temp": 19.4},
    "همدان": {"lat": 34.7981, "lon": 48.5146, "temp": 8.6},
    "اردبیل": {"lat": 38.2498, "lon": 48.2933, "temp": 0},
}
# تابع meteo_home_view را تکمیل کنید:
`,
    solutionCode: `CITIES = {
    "تهران": {"lat": 35.6892, "lon": 51.3890, "temp": 19.4},
    "همدان": {"lat": 34.7981, "lon": 48.5146, "temp": 8.6},
    "اردبیل": {"lat": 38.2498, "lon": 48.2933, "temp": 0},
}

def meteo_home_view(city_name):
    info = CITIES.get(city_name)
    if info is None:
        return f"<div>شهر «{city_name}» در سامانه ثبت نشده است.</div>"
    temp = info["temp"]
    if temp is not None:
        return f"<div><h3>{city_name}</h3><p>مختصات: ({info['lat']}, {info['lon']}) | دما: {temp}°C</p></div>"
    return f"<div><h3>{city_name}</h3><p>دما ناموجود</p></div>"

for name in ["همدان", "اردبیل", "سمنان"]:
    print(meteo_home_view(name))`,
    solutionExplanation: 'شبیه‌سازی کامل یک View واقعی جنگو با مدیریت شهر ناموجود و دمای ۰ درجه.',
    alternativeSolutionCode: `def render_city_card(title, temp):
    temp_text = f"{temp}°C" if temp is not None else "ناموجود"
    return f"[{title}] -> دما: {temp_text}"

print(render_city_card("همدان", 8.6))
print(render_city_card("اردبیل", 0))
print(render_city_card("نامشخص", None))`,
    alternativeSolutionExplanation: 'تفکیک منطق رندر کارت به یک تابع کمکی کوچک و قابل تست.',
  },
  {
    id: 'act-5-1-card-dashboard',
    kind: 'workshop',
    title: 'داشبورد خلاصه ایستگاه‌های هواشناسی در قالب جنگو',
    bookPage: '۲۹۱–۲۹۲',
    estimatedMinutes: 15,
    prompt:
      'قالب جنگویی طراحی کنید که در بالا وضعیت دمای لحظه‌ای شهر جاری (با شرط is not None) و در پایین جدول تمام شهرهای پایگاه‌داده را یکجا نمایش دهد.',
    steps: [
      'کارت بالایی را با {{ city.title }} و {% if temp is not None %} بسازید.',
      'جدول پایینی را با حلقه {% for c in cities %} تکمیل کنید.',
    ],
    hints: ['هر دو متغیر city و cities هم‌زمان در context موتور قالب آماده هستند.'],
    language: 'django-html',
    engine: 'django-sql',
    starterCode: `<div style="direction:rtl;font-family:Vazirmatn,sans-serif;">
  <!-- بخش بالا: دمای شهر انتخابی -->
  <!-- بخش پایین: فهرست همه شهرها -->
</div>`,
    solutionCode: `<div style="direction:rtl;font-family:Vazirmatn,sans-serif;space-y:12px;">
  <div style="background:#f0f9ff;border:1px solid #7dd3fc;border-radius:10px;padding:12px;margin-bottom:12px;">
    <h4 style="margin:0 0 6px 0;color:#0369a1;">شهر فعال: {{ city.title }}</h4>
    {% if temp is not None %}
      <p style="margin:0;color:#059669;font-weight:bold;">دمای فعلی: {{ temp }} درجه سانتی‌گراد</p>
    {% else %}
      <p style="margin:0;color:#dc2626;">دما در دسترس نیست.</p>
    {% endif %}
  </div>
  <div style="border:1px solid #cbd5e1;border-radius:10px;padding:12px;">
    <strong>سایر ایستگاه‌ها:</strong>
    <ul style="margin:8px 0 0 0;padding-right:18px;line-height:1.9;">
      {% for c in cities %}
        <li>{{ c.title }} ({{ c.lat }} , {{ c.lon }})</li>
      {% endfor %}
    </ul>
  </div>
</div>`,
    solutionExplanation: 'ترکیب دو بخش کلیدی صفحه اصلی وب‌اپلیکیشن meteo در یک قالب یکپارچه.',
    alternativeSolutionCode: `<div style="direction:rtl;font-family:Vazirmatn,sans-serif;">
  <h4>{{ city.title }}: {% if temp is not None %}{{ temp }}°C{% else %}---{% endif %}</h4>
  <p>{% for c in cities %}<span style="margin-left:8px;">• {{ c.title }}</span>{% endfor %}</p>
</div>`,
    alternativeSolutionExplanation: 'چیدمان فشرده تک‌ردیفه مناسب برای هدر موبایل.',
  },
];

export const UNIT_5_1_HOMEWORKS: HomeworkAssignment[] = [
  {
    id: 'hw-5-1-01',
    number: 1,
    title: 'ترتیب صحیح دستورات راه‌اندازی پروژه جنگو',
    difficulty: 'easy',
    bookPage: '۲۸۰–۲۸۲',
    estimatedMinutes: 10,
    prompt: 'لیستی از ۴ دستور راه‌اندازی پروژه meteo (startproject، startapp، ثبت در settings و runserver) را به ترتیب استاندارد چاپ کنید.',
    sampleOutput: 'چاپ شماره‌گذاری‌شده ۴ گام راه‌اندازی جنگو',
    hint: 'ابتدا startproject config . و سپس startapp weather اجرا می‌شود.',
    solutionCode: `steps = [
    "1. django-admin startproject config .",
    "2. python manage.py startapp weather",
    "3. افزودن 'weather' به لیست INSTALLED_APPS در config/settings.py",
    "4. python manage.py runserver"
]
for s in steps:
    print(s)`,
    solutionExplanation: 'تثبیت ترتیب دقیق دستورات کلیدی راه‌اندازی هر پروژه جنگو.',
    language: 'python',
    engine: 'python',
  },
  {
    id: 'hw-5-1-02',
    number: 2,
    title: 'نمایش کارت مشخصات شهر در قالب جنگو',
    difficulty: 'easy',
    bookPage: '۲۸۸',
    estimatedMinutes: 10,
    prompt: 'قالب جنگویی بنویسید که نام شهر ({{ city.title }})، عرض ({{ city.lat }}) و طول جغرافیایی ({{ city.lon }}) را در یک کارت RTL نشان دهد.',
    sampleOutput: 'کارت فارسی مشخصات شهر همدان (34.7981, 48.5146)',
    hint: 'از {{ city.title }}، {{ city.lat }} و {{ city.lon }} استفاده کنید.',
    solutionCode: `<div style="direction:rtl;padding:12px;border:1px solid #cbd5e1;border-radius:10px;font-family:Vazirmatn,sans-serif;">
  <h4 style="margin:0 0 6px 0;">{{ city.title }}</h4>
  <p style="margin:0;">مختصات: {{ city.lat }} شمالی ، {{ city.lon }} شرقی</p>
</div>`,
    solutionExplanation: 'استفاده پایه از متغیرهای شیء در زبان قالب جنگو.',
    language: 'django-html',
    engine: 'django-sql',
  },
  {
    id: 'hw-5-1-03',
    number: 3,
    title: 'فهرست شماره‌دار شهرها با {% for %} و forloop.counter',
    difficulty: 'easy',
    bookPage: '۲۸۹',
    estimatedMinutes: 10,
    prompt: 'با حلقه {% for c in cities %} تمام شهرها را به صورت «ردیف ۱: تهران» در قالب چاپ کنید.',
    sampleOutput: 'لیست ۸ شهر ایران با شماره ردیف خودکار',
    hint: 'شمارنده خودکار حلقه در جنگو {{ forloop.counter }} است.',
    solutionCode: `<ol style="direction:rtl;line-height:2;font-family:Vazirmatn,sans-serif;">
  {% for c in cities %}
    <li>ردیف {{ forloop.counter }}: <strong>{{ c.title }}</strong></li>
  {% endfor %}
</ol>`,
    solutionExplanation: 'استفاده از تگ بلوکی {% for %} همراه با {% endfor %}.',
    language: 'django-html',
    engine: 'django-sql',
  },
  {
    id: 'hw-5-1-04',
    number: 4,
    title: 'ساخت پیوندهای منو با تگ {% url %}',
    difficulty: 'easy',
    bookPage: '۲۸۵',
    estimatedMinutes: 10,
    prompt: 'سه لینک با تگ {% url %} برای مسیرهای home، city_list و login در یک کادر RTL بسازید.',
    sampleOutput: 'سه پیوند با آدرس‌های / و /cities/ و /accounts/login/',
    hint: 'نام مسیر داخل {% url "name" %} باید در کوتیشن باشد.',
    solutionCode: `<div style="direction:rtl;display:flex;gap:12px;font-family:Vazirmatn,sans-serif;">
  <a href="{% url 'home' %}">صفحه اصلی</a>
  <a href="{% url 'city_list' %}">فهرست شهرها</a>
  <a href="{% url 'login' %}">ورود</a>
</div>`,
    solutionExplanation: 'تگ {% url %} آدرس‌ها را به‌صورت پویا از urls.py می‌خواند.',
    language: 'django-html',
    engine: 'django-sql',
  },
  {
    id: 'hw-5-1-05',
    number: 5,
    title: 'رفع باگ دمای صفر درجه با {% if temp is not None %}',
    difficulty: 'medium',
    bookPage: '۲۹۱',
    estimatedMinutes: 12,
    prompt: 'قالبی بنویسید که با شرط ایمن is not None دمای 0 درجه را نمایش دهد و همچنین اگر temp == 0 بود عبارت «هوای یخبندان» را کنارش چاپ کند.',
    sampleOutput: 'دما: 0 درجه (هوای یخبندان)',
    hint: 'ابتدا {% if temp is not None %} و درون آن {% if temp == 0 %} بنویسید.',
    solutionCode: `<div style="direction:rtl;padding:12px;font-family:Vazirmatn,sans-serif;">
  {% if temp is not None %}
    <strong>دما: {{ temp }} درجه سانتی‌گراد</strong>
    {% if temp == 0 %}<span> (هوای یخبندان ❄)</span>{% endif %}
  {% else %}
    <span>دما در دسترس نیست.</span>
  {% endif %}
</div>`,
    solutionExplanation: 'مدیریت دقیق مقدار عددی 0 بدون تداخل با None.',
    language: 'django-html',
    engine: 'django-sql',
  },
  {
    id: 'hw-5-1-06',
    number: 6,
    title: 'ساخت تابع تولید URL درخواست Open-Meteo برای چند شهر',
    difficulty: 'medium',
    bookPage: '۲۹۰–۲۹۱',
    estimatedMinutes: 12,
    prompt: 'تابعی بنویسید که نام، عرض و طول جغرافیایی را بگیرد و نشانی کامل درخواست Open-Meteo را برگرداند؛ آن را برای همدان (34.7981, 48.5146) و شیراز (29.5918, 52.5837) چاپ کنید.',
    sampleOutput: 'دو نشانی معتبر api.open-meteo.com',
    hint: 'از f-string برای ساخت URL استفاده کنید.',
    solutionCode: `def build_meteo_url(lat, lon):
    return f"https://api.open-meteo.com/v1/forecast?latitude={lat}&longitude={lon}&current_weather=true"

print("همدان:", build_meteo_url(34.7981, 48.5146))
print("شیراز:", build_meteo_url(29.5918, 52.5837))`,
    solutionExplanation: 'پارامتری‌سازی آدرس API برای دریافت هوای هر شهر.',
    language: 'python',
    engine: 'python',
  },
  {
    id: 'hw-5-1-07',
    number: 7,
    title: 'استخراج چند فیلد از JSON آب‌وهوا با مدیریت خطا',
    difficulty: 'medium',
    bookPage: '۲۹۰',
    estimatedMinutes: 15,
    prompt: 'از رشته JSON زیر دما، سرعت باد و ارتفاع را استخراج کنید و در صورت نبود کلید elevation مقدار پیش‌فرض "نامشخص" چاپ کنید.',
    sampleOutput: 'دما: 19.4 | باد: 11.2 | ارتفاع: 1190',
    hint: 'برای خواندن ایمن کلید اختیاری از .get("elevation", "نامشخص") استفاده کنید.',
    solutionCode: `import json

raw = '{"elevation": 1190, "current_weather": {"temperature": 19.4, "windspeed": 11.2}}'
data = json.loads(raw)
cw = data.get("current_weather", {})

print("دما:", cw.get("temperature"))
print("باد:", cw.get("windspeed"))
print("ارتفاع:", data.get("elevation", "نامشخص"))`,
    solutionExplanation: 'استفاده از .get() مانع بروز KeyError در پاسخ‌های ناقص می‌شود.',
    language: 'python',
    engine: 'python',
  },
  {
    id: 'hw-5-1-08',
    number: 8,
    title: 'جدول RTL شهرها همراه با لینک مشاهده جزئیات (?id=)',
    difficulty: 'medium',
    bookPage: '۲۸۹ و ۳۱۲',
    estimatedMinutes: 15,
    prompt: 'جدولی در قالب جنگو بسازید که ستون آخر آن برای هر شهر یک لینک به آدرس {% url "city_list" %}?id={{ c.id }} داشته باشد.',
    sampleOutput: 'جدول کامل با لینک انتخاب برای هر ۸ شهر',
    hint: 'تگ <a> را درون یک <td> در حلقه {% for c in cities %} بگذارید.',
    solutionCode: `<table style="direction:rtl;width:100%;border-collapse:collapse;font-family:Vazirmatn,sans-serif;" border="1">
  <thead><tr style="background:#f1f5f9;"><th>شهر</th><th>عرض</th><th>عملیات</th></tr></thead>
  <tbody>
    {% for c in cities %}
      <tr>
        <td style="padding:6px;">{{ c.title }}</td>
        <td style="padding:6px;">{{ c.lat }}</td>
        <td style="padding:6px;"><a href="{% url 'city_list' %}?id={{ c.id }}">مشاهده</a></td>
      </tr>
    {% endfor %}
  </tbody>
</table>`,
    solutionExplanation: 'ترکیب جدول HTML، حلقه DTL و ساخت کوئری‌استرینگ پویا.',
    language: 'django-html',
    engine: 'django-sql',
  },
  {
    id: 'hw-5-1-09',
    number: 9,
    title: 'شبیه‌ساز سیستم مسیریابی دو لایه (Project + App)',
    difficulty: 'challenging',
    bookPage: '۲۸۴–۲۸۵',
    estimatedMinutes: 18,
    prompt: 'برنامه‌ای بنویسید که یک لیست از مسیرهای اصلی (/weather/ و /blog/) را به دیکشنری زیرمسیرهای هر اپلیکیشن متصل کند و نشانی "/weather/today/" را پیدا و اجرا کند.',
    sampleOutput: 'اجرای موفق weather.today_view',
    hint: 'اگر نشانی با پیشوند اپلیکیشن شروع شد، پیشوند را با replace حذف کرده و در زیرمسیرها بگردید.',
    solutionCode: `apps = {
    "/weather/": {"": "weather.home", "today/": "weather.today"},
    "/blog/": {"": "blog.index", "news/": "blog.news"},
}

def dispatch(url):
    for prefix, sub_urls in apps.items():
        if url.startswith(prefix):
            rest = url[len(prefix):]
            if rest in sub_urls:
                return f"200 OK -> {sub_urls[rest]}"
    return f"404 Not Found -> {url}"

print(dispatch("/weather/today/"))
print(dispatch("/blog/news/"))
print(dispatch("/shop/"))`,
    solutionExplanation: 'درک عمیق نحوه کارکرد include() در شکستن پیشوند مسیرها در جنگو.',
    language: 'python',
    engine: 'python',
  },
  {
    id: 'hw-5-1-10',
    number: 10,
    title: 'تبدیل واحد دما (سانتی‌گراد به فارنهایت) در لایه View با مدیریت None',
    difficulty: 'challenging',
    bookPage: '۲۸۸–۲۹۲',
    estimatedMinutes: 20,
    prompt: 'تابع weather_context(city, temp_c) بنویسید که در صورت معتبر بودن دما (is not None)، هم دمای سانتی‌گراد و هم فارنهایت (temp_c * 9 / 5 + 32) را در دیکشنری context قرار دهد؛ برای 0°C و None تست کنید.',
    sampleOutput: '0°C => 32.0°F | None => بدون کرش',
    hint: 'فقط زمانی محاسبه فارنهایت را انجام دهید که temp_c is not None باشد.',
    solutionCode: `def weather_context(city, temp_c):
    if temp_c is not None:
        temp_f = round(temp_c * 9 / 5 + 32, 1)
    else:
        temp_f = None
    return {"city": city, "temp_c": temp_c, "temp_f": temp_f}

print(weather_context("اردبیل", 0))
print(weather_context("تهران", 20))
print(weather_context("آفلاین", None))`,
    solutionExplanation: 'انجام تمام محاسبات و کنترل None درون View پیش از ارسال context به Template.',
    language: 'python',
    engine: 'python',
  },
];

export const UNIT_5_1_QUIZZES: QuickQuizQuestion[] = [
  {
    id: 'quiz-5-1-01',
    kind: 'concept',
    question: 'در معماری MVT جنگو، هر حرف به ترتیب نماینده چیست؟',
    options: [
      'Module, Variable, Table',
      'Model (داده), View (منطق), Template (قالب نمایش HTML)',
      'Main, Visual, Terminal',
      'Method, Value, Type',
    ],
    correctIndex: 1,
    explanation: 'Model ساختار پایگاه‌داده، View منطق پاسخ به درخواست و Template قالب HTML نمایش به کاربر است.',
    bookPage: '۲۷۸',
  },
  {
    id: 'quiz-5-1-02',
    kind: 'bug-spot',
    question: 'باگ منطقی کد صفحه ۲۹۱ کتاب در روزهای برفی با دمای ۰ درجه چیست؟',
    codeSnippet: `{% if temp %}\n  <p>دما: {{ temp }} درجه</p>\n{% else %}\n  <p>دما در دسترس نیست!</p>\n{% endif %}`,
    language: 'django-html',
    options: [
      'عدد 0 در پایتون و جنگو False ارزیابی می‌شود و پیام «دما در دسترس نیست» چاپ می‌گردد؛ باید {% if temp is not None %} نوشت',
      'نباید از تگ <p> استفاده کرد',
      'باید به جای temp نوشت {{ temp }} داخل if',
      'تگ else در جنگو وجود ندارد',
    ],
    correctIndex: 0,
    explanation: 'عدد 0 یک دمای واقعی است اما در شرط ساده Falsy است؛ بنابراین حتماً باید از is not None استفاده کرد.',
    bookPage: '۲۹۱',
  },
  {
    id: 'quiz-5-1-03',
    kind: 'concept',
    question: 'پس از ساخت اپلیکیشن جدید با دستور python manage.py startapp weather کدام کار الزامی است؟',
    options: [
      'حذف فایل manage.py',
      'ثبت نام "weather" در لیست INSTALLED_APPS داخل فایل config/settings.py',
      'نصب مجدد پایتون',
      'تغییر نام پوشه به html',
    ],
    correctIndex: 1,
    explanation: 'بدون ثبت اپلیکیشن در INSTALLED_APPS، جنگو قالب‌ها و مدل‌های آن را شناسایی نمی‌کند.',
    bookPage: '۲۸۲',
  },
  {
    id: 'quiz-5-1-04',
    kind: 'bug-spot',
    question: 'اشکال تعریف مسیر زیر در فایل urls.py چیست؟',
    codeSnippet: `path('', views.home_view(), name='home')`,
    language: 'python',
    options: [
      'نام مسیر نمی‌تواند home باشد',
      'نباید جلوی views.home_view پرانتز () گذاشت؛ باید فقط مرجع تابع ارسال شود',
      'مسیر خالی "" غیرمجاز است',
      'باید به جای path از def استفاده کرد',
    ],
    correctIndex: 1,
    explanation: 'در urlpatterns فقط مرجع تابع (views.home_view) ثبت می‌شود تا جنگو هنگام دریافت درخواست آن را با request اجرا کند.',
    bookPage: '۲۸۴',
  },
  {
    id: 'quiz-5-1-05',
    kind: 'concept',
    question: 'نقطه (.) در انتهای دستور django-admin startproject config . چه فایده‌ای دارد؟',
    options: [
      'فایل‌ها را مخفی می‌کند',
      'پروژه را مستقیماً در پوشه فعلی می‌سازد و از ایجاد یک پوشه تودرتوی اضافه جلوگیری می‌کند',
      'سرور را خودکار روشن می‌کند',
      'هیچ اثری ندارد',
    ],
    correctIndex: 1,
    explanation: 'گذاشتن نقطه ساختار پوشه‌ها را تمیز نگه می‌دارد و manage.py را مستقیم در ریشه پروژه می‌سازد.',
    bookPage: '۲۸۰',
  },
  {
    id: 'quiz-5-1-06',
    kind: 'concept',
    question: 'مزیت اصلی استفاده از {% url "city_list" %} به جای نوشتن دستی "/cities/" در قالب چیست؟',
    options: [
      'سرعت اینترنت را دو برابر می‌کند',
      'اگر نشانی مسیر در urls.py تغییر کند، همه پیوندهای قالب‌ها خودکار به‌روز می‌مانند و نمی‌شکنند',
      'رنگ لینک‌ها را آبی می‌کند',
      'اجازه حذف urls.py را می‌دهد',
    ],
    correctIndex: 1,
    explanation: 'نام‌گذاری مسیرها نگهداری پروژه را در مقیاس بزرگ بسیار آسان و بی‌خطا می‌کند.',
    bookPage: '۲۸۵',
  },
  {
    id: 'quiz-5-1-07',
    kind: 'concept',
    question: 'در زبان قالب جنگو (DTL) تفاوت {{ ... }} و {% ... %} چیست؟',
    options: [
      '{{ ... }} برای نمایش مقدار متغیر و {% ... %} برای دستورات کنترلی مثل if، for و url است',
      'هیچ تفاوتی ندارند',
      '{{ ... }} فقط برای CSS و {% ... %} فقط برای JS است',
      '{% ... %} فقط برای کامنت است',
    ],
    correctIndex: 0,
    explanation: 'دو آکولاد خروجی متغیر را چاپ می‌کند و آکولاد-درصد تگ‌های منطقی قالب را اجرا می‌کند.',
    bookPage: '۲۸۸',
  },
  {
    id: 'quiz-5-1-08',
    kind: 'bug-spot',
    question: 'در صفحه ۲۹۱ کتاب چه خطای جغرافیایی در مختصات شهر همدان وجود داشت؟',
    options: [
      'طول و عرض جغرافیایی منفی نوشته شده بود',
      'عرض جغرافیایی به اشتباه 37.7981 (حوالی شمال ایران) چاپ شده بود در حالی که مقدار صحیح 34.7981 است',
      'نام همدان انگلیسی نوشته شده بود',
      'مختصات آن صفر نوشته شده بود',
    ],
    correctIndex: 1,
    explanation: 'عرض جغرافیایی دقیق همدان 34.7981 و طول آن 48.5146 است.',
    bookPage: '۲۹۱',
  },
  {
    id: 'quiz-5-1-09',
    kind: 'concept',
    question: 'اگر در یک قالب جنگو بنویسیم {{ city.titel }} (غلط املایی به جای title)، چه اتفاقی می‌افتد؟',
    options: [
      'کل سیستم‌عامل ریستارت می‌شود',
      'جنگو کرش نمی‌کند و صرفاً جای آن را خالی نمایش می‌دهد',
      'خودکار غلط املایی را اصلاح می‌کند',
      'صفحه ۴۰۴ نمایش داده می‌شود',
    ],
    correctIndex: 1,
    explanation: 'موتور قالب جنگو برای متغیرهای ناموجود به‌طور پیش‌فرض رشته خالی چاپ می‌کند تا صفحه از کار نیفتد.',
    bookPage: '۲۸۸',
  },
];
