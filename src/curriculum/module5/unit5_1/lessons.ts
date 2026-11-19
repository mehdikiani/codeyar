import type {ConceptLesson} from '../../../types/curriculum.ts';

/**
 * Unit 5.1 — Creating a Django Web Application (MVT, URLs, Views, Templates & Weather JSON) (Pages 276–294)
 * 6 Deep Concept Lessons × 4 Tiered Runnable Examples = 24 Examples.
 * Covers & fixes:
 * - Page 291 critical logic bug: `{% if temp %}` treats 0°C as falsy -> `{% if temp is not None %}`
 * - Page 291 / 304 geographic typo: Hamedan latitude `37.7981` -> `34.7981`
 */
export const UNIT_5_1_LESSONS: ConceptLesson[] = [
  // ==================== LESSON 1 ====================
  {
    id: 'lesson-5-1-mvt-setup',
    order: 1,
    title: 'وب‌اپلیکیشن پویا، معماری MVT و راه‌اندازی پروژه meteo',
    bookPage: '۲۷۶ تا ۲۸۳',
    whyWeNeedIt: {
      realWorldProblem:
        'صفحات HTML/CSS پودمان ۲ ثابت (Static) هستند؛ هر کاربری آن‌ها را باز کند دقیقاً همان متن قدیمی را می‌بیند. اما سامانه آب‌وهوای «meteo» باید بر اساس شهر انتخابی کاربر، دمای زنده را خوانده و صفحه HTML جدیدی در لحظه تولید کند. فریم‌ورک Django این کار را با معماری منظم MVT انجام می‌دهد.',
      analogy:
        'معماری MVT جنگو مانند یک رستوران حرفه‌ای است: URL پذیرشگر درِ ورودی است که مشتری را به بخش درست می‌فرستد، View سرآشپز است که تصمیم می‌گیرد چه غذایی آماده شود، Model انباردار مواد اولیه (دیتابیس) است و Template ظرف سرو زیبا (HTML) است!',
    },
    syntaxAnatomy: {
      template: `django-admin startproject config .\npython manage.py startapp weather\npython manage.py runserver`,
      parts: [
        {token: 'startproject config .', role: 'ساخت پروژه اصلی جنگو در پوشه فعلی (نقطه انتهایی از تودرتو شدن اضافه پوشه‌ها جلوگیری می‌کند).'},
        {token: 'startapp weather', role: 'ساخت اپلیکیشن تخصصی آب‌وهوا داخل پروژه؛ هر پروژه می‌تواند چندین اپلیکیشن مستقل داشته باشد.'},
        {token: 'INSTALLED_APPS', role: 'فهرست ثبت اپلیکیشن‌ها در settings.py؛ بدون ثبت "weather" جنگو قالب‌ها و مدل‌های آن را نمی‌شناسد!'},
        {token: 'MVT', role: 'Model (ساختار داده)، View (منطق پایتونی درخواست) و Template (قالب نمایش HTML).'},
      ],
    },
    behindTheScenes: [
      'چرا جنگو به جای MVC از اصطلاح MVT استفاده می‌کند؟ در جنگو خودِ فریم‌ورک نقش Controller (مسیریاب مرکزی) را بر عهده دارد؛ پس برنامه‌نویس بیشتر با Model (مدل داده)، View (منطق کار) و Template (نمای HTML) سر و کار دارد.',
      'تفاوت «پروژه» (Project مثل config) و «اپلیکیشن» (App مثل weather): پروژه کل وب‌سایت و تنظیمات مشترک آن است، اما اپلیکیشن یک ماژول قابل استفاده مجدد (مثل بخش آب‌وهوا، بخش وبلاگ یا بخش کاربران) است.',
      'مهم‌ترین فراموشی هنرجویان در کارگاه: اپلیکیشن weather را با startapp می‌سازند اما یادشان می‌رود رشته "weather" را به لیست INSTALLED_APPS در فایل config/settings.py اضافه کنند!',
      'فایل manage.py ابزار خط فرمان اصلی پروژه است که برای اجرای سرور محلی (runserver)، ساخت مهاجرت‌ها (makemigrations) و ایجاد مدیر (createsuperuser) استفاده می‌شود.',
    ],
    goldenTips: [
      'در تب «۲. شهود بصری» این واحد می‌توانید کل چرخه Request ⟶ URL ⟶ View ⟶ Template ⟶ Response را به‌صورت پویانمایی زنده روی تخته تدریس کنید.',
      'همیشه پیش از اجرای runserver مطمئن شوید در همان پوشه‌ای هستید که فایل manage.py قرار دارد.',
    ],
    wrongVsRight: [
      {
        title: 'فراموش کردن ثبت اپلیکیشن در INSTALLED_APPS',
        wrongCode: `# پس از python manage.py startapp weather هیچ تغییری در settings.py نمی‌دهند!\n# نتیجه: TemplateDoesNotExist یا نادیده گرفته شدن مدل‌ها`,
        rightCode: `INSTALLED_APPS = [\n    'django.contrib.admin',\n    'weather',  # ثبت الزامی اپلیکیشن جدید\n]`,
        explanation: 'تا زمانی که نام اپلیکیشن در INSTALLED_APPS ثبت نشود، جنگو آن را به رسمیت نمی‌شناسد.',
      },
      {
        title: 'اشتباه گرفتن وظیفه View و Template',
        wrongCode: `# نوشتن منطق سنگین محاسباتی داخل فایل HTML`,
        rightCode: `# انجام محاسبات در views.py و ارسال نتیجه آماده به template از طریق context`,
        explanation: 'اصل جداسازی دغدغه‌ها (Separation of Concerns): منطق در View، نمایش در Template.',
      },
    ],
    examples: [
      {
        id: 'ex-5-1-mvt-basic',
        tier: 'basic',
        title: 'شبیه‌سازی ساختار پروژه meteo و بررسی ثبت INSTALLED_APPS',
        bookPage: '۲۸۰–۲۸۲',
        summary: 'بررسی خودکار پیکربندی یک پروژه جنگو (config و weather) با پایتون.',
        language: 'python',
        engine: 'python',
        code: `project_name = "config"
INSTALLED_APPS = [
    "django.contrib.admin",
    "django.contrib.auth",
    "weather",
]

def check_setup(app_name):
    if app_name in INSTALLED_APPS:
        print(f"✔ اپلیکیشن '{app_name}' با موفقیت در پروژه '{project_name}' ثبت شده است.")
    else:
        print(f"✖ خطا: اپلیکیشن '{app_name}' در INSTALLED_APPS فراموش شده است!")

check_setup("weather")
check_setup("accounts")`,
        teacherTalkingPoints: [
          'توضیح دهید اگر در settings.py نام اپلیکیشن را ثبت نکنیم دقیقاً مانند حالت دوم (accounts) جنگو آن را نمی‌شناسد.',
        ],
        lineExplanations: [
          {line: 5, explanation: 'ثبت اپلیکیشن weather درون لیست INSTALLED_APPS.'},
        ],
        commonMistakes: ['جا انداختن ویرگول (,) پس از اضافه کردن "weather" در لیست INSTALLED_APPS.'],
      },
      {
        id: 'ex-5-1-mvt-practical',
        tier: 'practical',
        title: 'شبیه‌سازی کامل چرخه MVT (از درخواست کاربر تا پاسخ HTML)',
        bookPage: '۲۷۸',
        summary: 'ردیابی گام‌به‌گام عبور یک درخواست HTTP از لایه‌های URL، View، Model و Template.',
        language: 'python',
        engine: 'python',
        code: `# ۱. لایه Model (داده ذخیره شده)
CITIES_MODEL = {"hamedan": {"title": "همدان", "temp": 8.6}}

# ۲. لایه Template (قالب HTML)
def render_template(context):
    return f"<h1>آب‌وهوای {context['title']}: {context['temp']} درجه</h1>"

# ۳. لایه View (منطق برنامه)
def weather_view(city_key):
    data = CITIES_MODEL.get(city_key)
    if data is None:
        return "404 - شهر یافت نشد"
    return render_template(data)

# ۴. شبیه‌سازی دریافت Request از مرورگر
print("درخواست /weather/hamedan =>", weather_view("hamedan"))
print("درخواست /weather/unknown =>", weather_view("unknown"))`,
        teacherTalkingPoints: [
          'این کد کوتاه کل فلسفه جنگو را در ۱۴ خط شفاف می‌کند: داده در Model، تصمیم‌گیری در View و نمایش در Template!',
        ],
        lineExplanations: [
          {line: 2, explanation: 'شبیه‌سازی رکورد دیتابیس در لایه Model.'},
          {line: 9, explanation: 'View داده را از Model گرفته و به Template می‌سپارد.'},
        ],
        commonMistakes: ['خلط نقش URL و View در ذهن هنرجویان.'],
      },
      {
        id: 'ex-5-1-mvt-combined',
        tier: 'combined',
        title: 'نمایش قالب اصلی خوش‌آمدگویی پروژه meteo در موتور قالب جنگو',
        bookPage: '۲۸۳',
        summary: 'رندر زنده یک قالب پایه فارسی با نام پروژه و تعداد شهرهای موجود در پایگاه‌داده.',
        language: 'django-html',
        engine: 'django-sql',
        code: `<div style="direction:rtl;font-family:Vazirmatn,sans-serif;padding:14px;border:1px solid #cbd5e1;border-radius:12px;background:#f8fafc;">
  <h3 style="color:#0369a1;margin-top:0;">وب‌اپلیکیشن هواشناسی meteo (جنگو)</h3>
  <p>کاربر فعلی: <strong>{{ user.username }}</strong></p>
  <p>شهر پیش‌فرض انتخاب‌شده: <strong>{{ city.title }}</strong> (عرض {{ city.lat }} ، طول {{ city.lon }})</p>
</div>`,
        teacherTalkingPoints: [
          'دکمه «اجرا روی SQLite / جنگو» را بزنید تا ببینید متغیرهای {{ city.title }} و {{ user.username }} چگونه زنده جایگزین می‌شوند!',
        ],
        lineExplanations: [
          {line: 3, explanation: 'خواندن نام کاربری از شیء user موجود در context.'},
          {line: 4, explanation: 'نمایش مشخصات شهر همدان (با مختصات اصلاح‌شده 34.7981).'},
        ],
        commonMistakes: ['گذاشتن یک آکولاد {city.title} به جای دو آکولاد {{ city.title }} در قالب جنگو.'],
      },
      {
        id: 'ex-5-1-mvt-whatif',
        tier: 'what-if',
        title: 'مقایسه سایت ایستا (Static) و اپلیکیشن پویا (Dynamic) در تولید صفحه',
        bookPage: '۲۷۷',
        summary: 'نمایش علت نیاز به وب‌اپلیکیشن پویا هنگام تغییر لحظه‌ای داده‌های آب‌وهوا.',
        language: 'python',
        engine: 'python',
        code: `static_page = "<p>دمای امروز تهران: ۲۰ درجه (ثابت برای همیشه!)</p>"

def dynamic_page(city, live_temp):
    return f"<p>دمای لحظه‌ای {city}: {live_temp} درجه سانتی‌گراد</p>"

print("صفحه ایستا:", static_page)
print("صفحه پویا (صبح):", dynamic_page("تهران", 14))
print("صفحه پویا (ظهر):", dynamic_page("تهران", 23))`,
        teacherTalkingPoints: [
          'از کلاس بپرسید آیا می‌توان برای ۳۰۰ شهر ایران هر ساعت ۳۰۰ فایل HTML دستی نوشت؟ پس به جنگو نیاز داریم!',
        ],
        lineExplanations: [
          {line: 3, explanation: 'پاسخ پویا در هر لحظه مطابق آخرین داده واقعی تولید می‌شود.'},
        ],
        commonMistakes: ['تصور اینکه وب‌اپلیکیشن جنگو فایل HTML تولید نمی‌کند (خروجی نهایی جنگو برای مرورگر همچنان HTML استاندارد است!).'],
      },
    ],
  },

  // ==================== LESSON 2 ====================
  {
    id: 'lesson-5-1-urls-routing',
    order: 2,
    title: 'مسیریابی در urls.py (path، include و نام‌گذاری مسیرها با name)',
    bookPage: '۲۸۳ تا ۲۸۵',
    whyWeNeedIt: {
      realWorldProblem:
        'وقتی کاربر آدرس /weather/ یا /about/ یا /cities/add/ را در مرورگر وارد می‌کند، جنگو باید بداند دقیقاً کدام تابع پایتونی در views.py را صدا بزند! علاوه بر این، با رشد پروژه قرار دادن تمام آدرس‌ها در یک فایل باعث شلوغی می‌شود؛ پس هر اپلیکیشن فایل urls.py مستقل خودش را دارد.',
      analogy:
        'فایل urls.py مانند تابلوی راهنمای طبقات یک ساختمان اداری است: فایل config/urls.py تابلوی لابی اصلی است که مراجعان را به طبقه «آب‌وهوا» (include) هدایت می‌کند و weather/urls.py تابلوی اتاق‌های همان طبقه است.',
    },
    syntaxAnatomy: {
      template: `# config/urls.py\npath('weather/', include('weather.urls'))\n\n# weather/urls.py\npath('', views.home_view, name='home')`,
      parts: [
        {token: "path('route/', view, name='...')", role: 'اتصال یک الگوی نشانی وب به تابع View متناظر.'},
        {token: "include('weather.urls')", role: 'واگذاری زیرمسیرها به فایل urls.py داخلی اپلیکیشن weather.'},
        {token: "name='home'", role: 'نام مستعار مسیر؛ اجازه می‌دهد در قالب‌ها به جای آدرس ثابت از {% url "home" %} استفاده کنیم.'},
        {token: 'اسلش انتهایی (/)', role: 'قرارداد استاندارد جنگو برای انتهای مسیرها (به جز مسیر خالی "").'},
      ],
    },
    behindTheScenes: [
      'جنگو لیست urlpatterns را از بالا به پایین بررسی می‌کند و به محض یافتن اولین مسیر منطبق، تابع View همان ردیف را اجرا می‌کند؛ اگر هیچ مسیری منطبق نشد خطای معروف 404 Not Found برمی‌گرداند.',
      'نام‌گذاری مسیر با name="city_list" یک مزیت بزرگ دارد: اگر ماه آینده نشانی /cities/ را به /iran-cities/ تغییر دهیم، هیچ لینکی در قالب‌های HTML که با {% url "city_list" %} ساخته شده‌اند نمی‌شکند!',
      'در config/urls.py حتماً باید تابع include را در کنار path از django.urls وارد (import) کنیم.',
      'در دستور path("", views.home_view)، تابع home_view بدون پرانتز نوشته می‌شود! چون نمی‌خواهیم همین لحظه اجرا شود، بلکه مرجع تابع را به جنگو می‌سپاریم تا هنگام آمدن درخواست اجرا کند.',
    ],
    goldenTips: [
      'تأکید بسیار مهم: در urls.py بنویسید views.home_view (بدون پرانتز)، نه views.home_view()!',
      'مسیریابی دو مرحله‌ای (config/urls.py ⟶ weather/urls.py) را با دو مستطیل تودرتو روی تخته رسم کنید.',
    ],
    wrongVsRight: [
      {
        title: 'گذاشتن پرانتز جلوی نام View در urlpatterns',
        wrongCode: `path('', views.home_view(), name='home')  # TypeError: درخواست را بدون request اجرا می‌کند!`,
        rightCode: `path('', views.home_view, name='home')  # فقط مرجع تابع ارسال می‌شود`,
        explanation: 'خود جنگو هنگام دریافت درخواست HTTP، تابع View را با آرگومان request صدا می‌زند.',
      },
      {
        title: 'فراموش کردن import کردن include در config/urls.py',
        wrongCode: `from django.urls import path\nurlpatterns = [path('', include('weather.urls'))]  # NameError!`,
        rightCode: `from django.urls import path, include\nurlpatterns = [path('', include('weather.urls'))]`,
        explanation: 'تابع include باید در کنار path از django.urls وارد شود.',
      },
    ],
    examples: [
      {
        id: 'ex-5-1-url-basic',
        tier: 'basic',
        title: 'شبیه‌ساز URL Dispatcher جنگو (تطبیق مسیر از بالا به پایین و خطای 404)',
        bookPage: '۲۸۴',
        summary: 'نحوه کارکرد urlpatterns در جنگو برای یافتن View مناسب یا تولید خطای 404.',
        language: 'python',
        engine: 'python',
        code: `def home_view():
    return "200 OK -> صفحه اصلی meteo"

def about_view():
    return "200 OK -> درباره سامانه آب‌وهوا"

urlpatterns = [
    ("/", home_view),
    ("/about/", about_view),
]

def dispatch(request_path):
    for route, view_func in urlpatterns:
        if route == request_path:
            return view_func()
    return "404 Not Found -> صفحه مورد نظر یافت نشد!"

print(dispatch("/"))
print(dispatch("/about/"))
print(dispatch("/contact/"))`,
        teacherTalkingPoints: [
          'خط‌های ۸ و ۹ را نشان دهید: دقیقاً مثل جنگو نام تابع home_view بدون پرانتز در جدول قرار گرفته و فقط در خط ۱۵ هنگام تطابق اجرا می‌شود!',
        ],
        lineExplanations: [
          {line: 8, explanation: 'نگاشت مسیر "/" به مرجع تابع home_view.'},
          {line: 16, explanation: 'اگر هیچ مسیری پیدا نشد، پاسخ 404 تولید می‌شود.'},
        ],
        commonMistakes: ['گذاشتن پرانتز پس از home_view در لیست urlpatterns.'],
      },
      {
        id: 'ex-5-1-url-practical',
        tier: 'practical',
        title: 'تولید خودکار پیوندها در قالب با تگ {% url %}',
        bookPage: '۲۸۵',
        summary: 'استفاده از نام مستعار مسیرها به جای نوشتن دستی آدرس‌ها در لینک‌های منو.',
        language: 'django-html',
        engine: 'django-sql',
        code: `<nav style="direction:rtl;display:flex;gap:12px;padding:10px;background:#0f172a;border-radius:10px;">
  <a href="{% url 'home' %}" style="color:#38bdf8;text-decoration:none;font-weight:bold;">صفحه اصلی ({% url 'home' %})</a>
  <a href="{% url 'city_list' %}" style="color:#e2e8f0;text-decoration:none;">فهرست شهرها ({% url 'city_list' %})</a>
  <a href="{% url 'add_city' %}" style="color:#4ade80;text-decoration:none;">افزودن شهر ({% url 'add_city' %})</a>
</nav>`,
        teacherTalkingPoints: [
          'دکمه اجرا را بزنید و ببینید تگ {% url "city_list" %} خودکار به /cities/ ترجمه شد!',
        ],
        lineExplanations: [
          {line: 3, explanation: 'تگ {% url %} نام مسیر را به نشانی واقعی آن تبدیل می‌کند.'},
        ],
        commonMistakes: ['فراموش کردن کوتیشن دور نام مسیر در {% url city_list %} (درست: {% url "city_list" %}).'],
      },
      {
        id: 'ex-5-1-url-combined',
        tier: 'combined',
        title: 'مسیریابی دو مرحله‌ای (config/urls.py + include به weather/urls.py)',
        bookPage: '۲۸۵',
        summary: 'نحوه ترکیب پیشوند آدرس پروژه با زیرمسیرهای اپلیکیشن weather.',
        language: 'python',
        engine: 'python',
        code: `weather_urls = {
    "": "weather.views.home",
    "forecast/": "weather.views.forecast",
    "cities/": "weather.views.city_list",
}

def include(prefix, app_routes):
    combined = {}
    for sub, target in app_routes.items():
        combined[prefix + sub] = target
    return combined

full_routes = include("/weather/", weather_urls)
for url, view_name in full_routes.items():
    print(f"مسیر نهایی: {url}  -->  {view_name}")`,
        teacherTalkingPoints: [
          'نشان دهید چگونه include پیشوند /weather/ را خودکار به ابتدای تمام مسیرهای داخل اپلیکیشن می‌چسباند.',
        ],
        lineExplanations: [
          {line: 13, explanation: 'ترکیب پیشوند پروژه با مسیرهای اپلیکیشن.'},
        ],
        commonMistakes: ['نوشتن دوباره /weather/ در ابتدای مسیرهای فایل weather/urls.py که باعث مسیر تکراری /weather/weather/ می‌شود!'],
      },
      {
        id: 'ex-5-1-url-whatif',
        tier: 'what-if',
        title: 'شبیه‌سازی پارامتر کوئری (?id=2) در نشانی انتخاب شهر',
        bookPage: '۳۱۲',
        summary: 'چگونه آدرس /cities/?id=2 شناسه شهر انتخابی کاربر را به View ارسال می‌کند؟',
        language: 'python',
        engine: 'python',
        code: `def parse_city_query(query_dict):
    raw_id = query_dict.get("id")
    if raw_id is None:
        return "شناسه ارسال نشد -> نمایش اولین شهر پیش‌فرض"
    try:
        city_id = int(raw_id)
        return f"درخواست نمایش شهر با id={city_id}"
    except ValueError:
        return "شناسه نامعتبر (غیرعددی) است -> بازگشت ایمن به شهر اول"

print(parse_city_query({"id": "2"}))
print(parse_city_query({}))
print(parse_city_query({"id": "abc"}))`,
        teacherTalkingPoints: [
          'بگویید این دقیقاً همان روش ایمن خواندن request.GET.get("id") در بخش دوم پودمان ۵ است!',
        ],
        lineExplanations: [
          {line: 2, explanation: 'استفاده از .get("id") به جای ["id"] مانع خطای KeyError می‌شود.'},
        ],
        commonMistakes: ['استفاده از request.GET["id"] بدون بررسی وجود آن که هنگام باز کردن صفحه اول کرش می‌کند!'],
      },
    ],
  },

  // ==================== LESSON 3 ====================
  {
    id: 'lesson-5-1-views-context',
    order: 3,
    title: 'نوشتن Viewها با HttpResponse و render() و ارسال دیکشنری context',
    bookPage: '۲۸۶ تا ۲۸۸',
    whyWeNeedIt: {
      realWorldProblem:
        'فقط نمایش یک خط متن ساده با HttpResponse برای یک وب‌سایت واقعی کافی نیست! ما می‌خواهیم طراحی صفحه در فایل‌های تمیز HTML باشد و تابع View فقط داده‌های محاسبه‌شده (مثل نام شهر، دما و سرعت باد) را در قالب یک دیکشنری context به آن فایل HTML تزریق کند.',
      analogy:
        'تابع render(request, template, context) مانند چاپ یک کارنامه آماده است: template همان برگه خام کارنامه است و context دیکشنری نمرات همان دانش‌آموز است که جاهای خالی برگه را پر می‌کند.',
    },
    syntaxAnatomy: {
      template: `from django.shortcuts import render\n\ndef home_view(request):\n    context = {"city": "همدان", "temp": 8.6}\n    return render(request, "weather/home.html", context)`,
      parts: [
        {token: 'request', role: 'اولین پارامتر اجباری هر View در جنگو که تمام اطلاعات درخواست کاربر (کاربر، GET/POST) را دارد.'},
        {token: 'HttpResponse("...")', role: 'ارسال سریع یک متن یا HTML ساده بدون نیاز به فایل قالب.'},
        {token: 'render(request, tpl, ctx)', role: 'ترکیب فایل قالب HTML با دیکشنری context و برگرداندن HttpResponse کامل.'},
        {token: 'context', role: 'یک دیکشنری پایتونی که کلیدهایش دقیقاً نام متغیرها درون قالب HTML می‌شوند.'},
      ],
    },
    behindTheScenes: [
      'جنگو برای یافتن فایل قالب، پوشه templates را درون هر اپلیکیشن ثبت‌شده در INSTALLED_APPS جستجو می‌کند؛ قرار دادن یک زیرپوشه همنام اپلیکیشن (weather/templates/weather/home.html) از تداخل فایل‌های همنام جلوگیری می‌کند.',
      'هر تابع View در جنگو حتماً باید یک شیء پاسخ (مثل HttpResponse، خروجی render یا redirect) را return کند؛ اگر return جا بیفتد جنگو خطای ValueError (returned None) می‌دهد.',
      'کلیدهای دیکشنری context باید نام‌های معتبر پایتونی باشند (بدون فاصله و خط تیره) تا در {{ key }} قالب قابل استفاده باشند.',
    ],
    goldenTips: [
      'همیشه نام کلیدهای context را کوتاه و معنادار بگذارید: {"city": selected_city, "temp": temperature}.',
      'اگر خروجی یک متغیر در قالب خالی نشان داده شد، اول املای کلید آن را در دیکشنری context با {{ ... }} داخل HTML مقایسه کنید!',
    ],
    wrongVsRight: [
      {
        title: 'فراموش کردن پارامتر request در تعریف View یا داخل render',
        wrongCode: `def home_view():\n    return render("weather/home.html", context)`,
        rightCode: `def home_view(request):\n    return render(request, "weather/home.html", context)`,
        explanation: 'هم تعریف تابع View و هم آرگومان اول تابع render حتماً باید request را دریافت کنند.',
      },
      {
        title: 'فراموش کردن return پیش از render()',
        wrongCode: `def home_view(request):\n    render(request, "weather/home.html", context)  # None برمی‌گرداند!`,
        rightCode: `def home_view(request):\n    return render(request, "weather/home.html", context)`,
        explanation: 'بدون کلمه کلیدی return، پاسخ HTML هرگز به مرورگر ارسال نمی‌شود.',
      },
    ],
    examples: [
      {
        id: 'ex-5-1-view-basic',
        tier: 'basic',
        title: 'شبیه‌سازی HttpResponse در برابر render(request, template, context)',
        bookPage: '۲۸۶',
        summary: 'مقایسه پاسخ متنی ساده با تولید صفحه ساختاریافته از طریق context.',
        language: 'python',
        engine: 'python',
        code: `def HttpResponse(body):
    return {"status": 200, "body": body}

def render(request, template_name, context):
    html = f"[قالب {template_name}] شهر: {context['city']} | دما: {context['temp']}°C"
    return HttpResponse(html)

def simple_view(request):
    return HttpResponse("سلام از جنگو!")

def weather_view(request):
    context = {"city": "تهران", "temp": 19.4}
    return render(request, "weather/home.html", context)

print("پاسخ HttpResponse:", simple_view({}))
print("پاسخ render():    ", weather_view({}))`,
        teacherTalkingPoints: [
          'توضیح دهید تابع render در واقع خودش در نهایت یک HttpResponse می‌سازد و برمی‌گرداند!',
        ],
        lineExplanations: [
          {line: 12, explanation: 'ساخت دیکشنری context برای ارسال داده به قالب.'},
        ],
        commonMistakes: ['ارسال کلید اشتباه در context که باعث خالی نمایش داده شدن مقدار در صفحه می‌شود.'],
      },
      {
        id: 'ex-5-1-view-practical',
        tier: 'practical',
        title: 'نمایش متغیرهای ارسالی context در کارت آب‌وهوای HTML',
        bookPage: '۲۸۸',
        summary: 'رندر زنده کارت مشخصات شهر دریافت‌شده از context در موتور قالب جنگو.',
        language: 'django-html',
        engine: 'django-sql',
        code: `<div style="direction:rtl;font-family:Vazirmatn,sans-serif;max-width:420px;border:1px solid #bae6fd;background:#f0f9ff;padding:16px;border-radius:12px;">
  <div style="font-size:12px;color:#0369a1;margin-bottom:4px;">گزارش هواشناسی meteo</div>
  <h3 style="margin:0 0 8px 0;color:#0f172a;">شهر {{ city.title }}</h3>
  <p style="margin:4px 0;">عرض جغرافیایی (Latitude): <strong>{{ city.lat }}</strong></p>
  <p style="margin:4px 0;">طول جغرافیایی (Longitude): <strong>{{ city.lon }}</strong></p>
</div>`,
        teacherTalkingPoints: [
          'نشان دهید چطور با علامت نقطه ({{ city.lat }}) به ویژگی‌های شیء city داخل context دسترسی پیدا کردیم.',
        ],
        lineExplanations: [
          {line: 3, explanation: 'خواندن ویژگی title از شیء city ارسالی توسط View.'},
        ],
        commonMistakes: ['تلاش برای نوشتن کد پایتونی کامل مثل {{ city["lat"] }} در قالب جنگو (در قالب جنگو همیشه از نقطه city.lat استفاده می‌شود!).'],
      },
      {
        id: 'ex-5-1-view-combined',
        tier: 'combined',
        title: 'محاسبه وضعیت آب‌وهوا در View و ارسال برچسب آماده به Template',
        bookPage: '۲۸۸',
        summary: 'انجام منطق دسته‌بندی دما (سرد/معتدل/گرم) داخل View پایتونی برای تمیز نگه داشتن قالب.',
        language: 'python',
        engine: 'python',
        code: `def build_weather_context(city_name, temp):
    if temp is None:
        status = "نامشخص"
        badge = "secondary"
    elif temp <= 5:
        status = "سرد و زمستانی"
        badge = "info"
    elif temp <= 22:
        status = "معتدل و مطبوع"
        badge = "success"
    else:
        status = "گرم و آفتابی"
        badge = "warning"
    return {"city": city_name, "temp": temp, "status": status, "badge": badge}

for name, t in [("اردبیل", 0), ("تهران", 19), ("شیراز", 28)]:
    print(build_weather_context(name, t))`,
        teacherTalkingPoints: [
          'بگویید این یک اصل طلایی در جنگو است: «قالب را ساده و کم‌منطق نگه دارید و محاسبات را در View انجام دهید.»',
        ],
        lineExplanations: [
          {line: 2, explanation: 'بررسی دقیق is None پیش از مقایسه عددی تا در دمای 0 درجه درست کار کند.'},
        ],
        commonMistakes: ['مقایسه مستقیم None <= 5 بدون بررسی is None که خطای TypeError می‌دهد!'],
      },
      {
        id: 'ex-5-1-view-whatif',
        tier: 'what-if',
        title: 'چه می‌شود اگر متغیری که در قالب نوشته‌ایم در context وجود نداشته باشد؟',
        bookPage: '۲۸۸',
        summary: 'مشاهده رفتار آرام قالب جنگو در برابر متغیرهای تعریف‌نشده (رشته خالی به جای کرش).',
        language: 'django-html',
        engine: 'django-sql',
        code: `<div style="direction:rtl;padding:12px;border:1px dashed #94a3b8;border-radius:10px;">
  <p>نام شهر معتبر: <strong>{{ city.title }}</strong></p>
  <p>متغیر اشتباه تایپ‌شده (city.titel): [<strong>{{ city.titel }}</strong>]</p>
  <small style="color:#64748b;">نکته: جنگو هنگام غلط املایی در {{ }} کرش نمی‌کند، فقط جای آن را خالی می‌گذارد!</small>
</div>`,
        teacherTalkingPoints: [
          'این رفتار جنگو علت بسیار رایجی برای سؤال هنرجویان است: «آقا چرا عدد دما چاپ نمیشه ولی ارور هم نمیده؟» — جواب: غلط املایی در نام متغیر!',
        ],
        lineExplanations: [
          {line: 3, explanation: 'غلط املایی titel به جای title خروجی خالی تولید می‌کند.'},
        ],
        commonMistakes: ['جستجوی خطا در views.py در حالی که فقط یک حرف در {{ ... }} قالب جابه‌جا شده است.'],
      },
    ],
  },

  // ==================== LESSON 4 ====================
  {
    id: 'lesson-5-1-dtl-basics',
    order: 4,
    title: 'زبان قالب جنگو (DTL): متغیرها، حلقه‌ها و طراحی صفحه فارسی RTL',
    bookPage: '۲۸۸ تا ۲۹۰',
    whyWeNeedIt: {
      realWorldProblem:
        'وقتی پایگاه‌داده ما ۸ شهر (یا ۸۰۰ شهر) دارد، نمی‌توانیم برای هر شهر یک تگ <li> دستی در HTML بنویسیم! زبان قالب جنگو (Django Template Language) به ما اجازه می‌دهد یک بار ظاهر یک کارت یا ردیف جدول را طراحی کنیم و با حلقه {% for %} برای تمام شهرها به‌صورت خودکار تکرارش کنیم.',
      analogy:
        'تگ‌های {{ ... }} مانند مهر تاریخ‌زن هستند که مقدار را چاپ می‌کنند و تگ‌های {% ... %} مانند فرمان‌های کارگردان هستند که دستور تکرار (for) یا شرط (if) را صادر می‌کنند.',
    },
    syntaxAnatomy: {
      template: `<ul>\n  {% for c in cities %}\n    <li>{{ forloop.counter }}. {{ c.title }} ({{ c.lat }})</li>\n  {% endfor %}\n</ul>`,
      parts: [
        {token: '{{ variable }}', role: 'چاپ مقدار متغیر درون صفحه HTML (دو آکولاد).'},
        {token: '{% for x in list %} ... {% endfor %}', role: 'تکرار یک بخش HTML به ازای هر عنصر لیست؛ بستن با {% endfor %} اجباری است.'},
        {token: '{{ forloop.counter }}', role: 'شمارنده خودکار حلقه در جنگو (شروع از ۱) بدون نیاز به تعریف متغیر دستی!'},
        {token: 'dir="rtl" lang="fa"', role: 'رعایت راست‌به‌چپ بودن صفحه در تمام قالب‌های فارسی پروژه meteo.'},
      ],
    },
    behindTheScenes: [
      'برخلاف پایتون که پایان بلوک با تورفتگی مشخص می‌شود، در HTML فاصله‌ها و تورفتگی‌ها معنایی ندارند؛ بنابراین در قالب‌های جنگو بستن هر {% if %} با {% endif %} و هر {% for %} با {% endfor %} کاملاً اجباری است!',
      'متغیر داخلی {{ forloop.counter }} از ۱ شروع می‌شود و {{ forloop.counter0 }} از ۰؛ این ویژگی برای ردیف‌بندی جداول فارسی فوق‌العاده کاربردی است.',
      'قالب‌های جنگو به‌طور پیش‌فرض از Auto-Escaping استفاده می‌کنند؛ یعنی اگر نام شهری شامل کد <script> باشد جنگو آن را خنثی می‌کند تا امنیت صفحه حفظ شود.',
    ],
    goldenTips: [
      'همیشه بلافاصله پس از نوشتن {% for ... %} یا {% if ... %}، تگ پایانی {% endfor %} یا {% endif %} را هم بنویسید و سپس داخل آن را پر کنید تا هرگز TemplateSyntaxError نگیرید.',
    ],
    wrongVsRight: [
      {
        title: 'فراموش کردن تگ پایانی {% endfor %} یا {% endif %}',
        wrongCode: `{% for c in cities %}\n  <li>{{ c.title }}</li>\n<!-- جا انداختن endfor -> TemplateSyntaxError! -->`,
        rightCode: `{% for c in cities %}\n  <li>{{ c.title }}</li>\n{% endfor %}`,
        explanation: 'تمام تگ‌های بلوکی در زبان قالب جنگو باید صریحاً بسته شوند.',
      },
      {
        title: 'اشتباه گرفتن {{ }} با {% %}',
        wrongCode: `{{ for c in cities }}  <!-- غلط! دستور حلقه با درصد است -->`,
        rightCode: `{% for c in cities %}  <!-- دستورات با {% %} و نمایش مقدار با {{ }} -->`,
        explanation: 'قانون ساده: هرجا «چاپ مقدار» داریم {{ }} و هرجا «دستور کنترلی» داریم {% %}.',
      },
    ],
    examples: [
      {
        id: 'ex-5-1-dtl-basic',
        tier: 'basic',
        title: 'نمایش فهرست شهرهای SQLite با حلقه {% for %} و forloop.counter',
        bookPage: '۲۸۹ و ۳۱۲',
        summary: 'تولید خودکار لیست شماره‌گذاری‌شده شهرهای ایران از داده‌های واقعی SQLite.',
        language: 'django-html',
        engine: 'django-sql',
        code: `<div style="direction:rtl;font-family:Vazirmatn,sans-serif;padding:12px;">
  <h4 style="margin-top:0;color:#0369a1;">فهرست شهرهای ثبت‌شده در meteo</h4>
  <ul style="line-height:2;padding-right:18px;">
    {% for c in cities %}
      <li><strong>{{ forloop.counter }}. {{ c.title }}</strong> — عرض: {{ c.lat }} ، طول: {{ c.lon }}</li>
    {% endfor %}
  </ul>
</div>`,
        teacherTalkingPoints: [
          'بگویید ما فقط یک خط <li> نوشتیم، اما جنگو به تعداد کل رکوردهای جدول weather_city (۸ شهر) آن را تکرار کرد!',
        ],
        lineExplanations: [
          {line: 4, explanation: 'شروع حلقه روی فهرست شهرها.'},
          {line: 5, explanation: 'استفاده از شمارنده خودکار forloop.counter.'},
        ],
        commonMistakes: ['نوشتن دونقطه (:) در انتهای {% for c in cities: %} شبیه پایتون (در DTL دونقطه نمی‌گذاریم!).'],
      },
      {
        id: 'ex-5-1-dtl-practical',
        tier: 'practical',
        title: 'ساخت جدول RTL استاندارد از رکوردهای شهرها در قالب جنگو',
        bookPage: '۲۸۹',
        summary: 'ترکیب دانش جدول HTML5 پودمان ۲ با حلقه {% for %} جنگو.',
        language: 'django-html',
        engine: 'django-sql',
        code: `<table style="direction:rtl;width:100%;border-collapse:collapse;font-family:Vazirmatn,sans-serif;text-align:right;" border="1">
  <thead style="background:#e0f2fe;">
    <tr>
      <th style="padding:8px;">ردیف</th>
      <th style="padding:8px;">نام شهر</th>
      <th style="padding:8px;">عرض جغرافیایی</th>
      <th style="padding:8px;">طول جغرافیایی</th>
    </tr>
  </thead>
  <tbody>
    {% for c in cities %}
      <tr>
        <td style="padding:6px 8px;">{{ forloop.counter }}</td>
        <td style="padding:6px 8px;font-weight:bold;">{{ c.title }}</td>
        <td style="padding:6px 8px;font-family:monospace;">{{ c.lat }}</td>
        <td style="padding:6px 8px;font-family:monospace;">{{ c.lon }}</td>
      </tr>
    {% endfor %}
  </tbody>
</table>`,
        teacherTalkingPoints: [
          'دقت کنید حلقه {% for %} فقط دور <tr> داخل <tbody> قرار گرفته نه دور کل <table>!',
        ],
        lineExplanations: [
          {line: 11, explanation: 'تکرار یک ردیف جدول به ازای هر شهر.'},
        ],
        commonMistakes: ['قرار دادن <thead> داخل حلقه {% for %} که باعث تکرار عنوان ستون‌ها برای هر شهر می‌شود!'],
      },
      {
        id: 'ex-5-1-dtl-combined',
        tier: 'combined',
        title: 'تولید کارت‌های شهر با لینک انتخاب (?id={{ c.id }})',
        bookPage: '۳۱۲',
        summary: 'ساخت پیوند پویا برای هر شهر در فهرست تا با کلیک روی آن آب‌وهوای همان شهر نمایش داده شود.',
        language: 'django-html',
        engine: 'django-sql',
        code: `<div style="direction:rtl;display:grid;grid-template-columns:repeat(auto-fit,minmax(140px,1fr));gap:8px;font-family:Vazirmatn,sans-serif;">
  {% for c in cities %}
    <div style="border:1px solid #cbd5e1;border-radius:10px;padding:10px;background:#fff;">
      <div style="font-weight:bold;color:#0f172a;">{{ c.title }}</div>
      <div style="font-size:11px;color:#64748b;margin:4px 0;">({{ c.lat }}, {{ c.lon }})</div>
      <a href="{% url 'city_list' %}?id={{ c.id }}" style="font-size:12px;color:#0284c7;text-decoration:none;">مشاهده دما ←</a>
    </div>
  {% endfor %}
</div>`,
        teacherTalkingPoints: [
          'روی لینک <a href="{% url \'city_list\' %}?id={{ c.id }}"> مکث کنید: ترکیب تگ URL با شناسه رکورد پایگاه‌داده!',
        ],
        lineExplanations: [
          {line: 6, explanation: 'ساخت نشانی پویا مثل /cities/?id=2 برای هر شهر.'},
        ],
        commonMistakes: ['فراموش کردن علامت ؟ قبل از id={{ c.id }}.'],
      },
      {
        id: 'ex-5-1-dtl-whatif',
        tier: 'what-if',
        title: 'بررسی وضعیت ورود کاربر با {% if user.is_authenticated %} در نوار بالا',
        bookPage: '۳۱۷',
        summary: 'نمایش شرطی دکمه خروج یا ورود در نوار ناوبری بر اساس وضعیت احراز هویت.',
        language: 'django-html',
        engine: 'django-sql',
        code: `<header style="direction:rtl;display:flex;justify-content:space-between;align-items:center;padding:10px 14px;background:#1e293b;color:#fff;border-radius:10px;font-family:Vazirmatn,sans-serif;">
  <strong>سامانه آب‌وهوای meteo</strong>
  <div>
    {% if user.is_authenticated %}
      <span style="color:#86efac;margin-left:10px;">خوش آمدید، {{ user.username }}</span>
      <a href="{% url 'logout' %}" style="color:#fda4af;text-decoration:none;">خروج</a>
    {% else %}
      <a href="{% url 'login' %}" style="color:#7dd3fc;text-decoration:none;">ورود مدیر</a>
    {% endif %}
  </div>
</header>`,
        teacherTalkingPoints: [
          'این دقیقاً نوار بالای پروژه کامل meteo است که در واحد ۵.۲ به سیستم لاگین واقعی وصل می‌شود.',
        ],
        lineExplanations: [
          {line: 4, explanation: 'نمایش نام کاربری و دکمه خروج فقط برای کاربر احراز هویت شده.'},
        ],
        commonMistakes: ['نوشتن پرانتز () جلوی user.is_authenticated (در جنگو یک ویژگی بولین است نه تابع!).'],
      },
    ],
  },

  // ==================== LESSON 5 ====================
  {
    id: 'lesson-5-1-zero-temp-bug',
    order: 5,
    title: 'شرط‌های قالب ({% if %}) و اصلاح باگ بحرانی دمای صفر درجه (ص ۲۹۱)',
    bookPage: '۲۹۰ تا ۲۹۲',
    whyWeNeedIt: {
      realWorldProblem:
        'در صفحه ۲۹۱ کتاب درسی برای بررسی وجود دمای شهر نوشته شده {% if temp %}! اما در زمستان شهرهای سردسیری مثل اردبیل یا همدان، دما دقیقاً برابر 0 درجه سانتی‌گراد می‌شود! در پایتون و جنگو عدد 0 در شرط if برابر False ارزیابی می‌شود و سایت به اشتباه به کاربر می‌گوید «اطلاعات دما در دسترس نیست»!',
      analogy:
        'تفاوت عدد 0 با None مانند تفاوت «دمای صفر درجه (هوای یخبندان!)» با «خراب بودن دماسنج (نداشتن عدد!)» است؛ صفر درجه یک داده واقعی و حیاتی است، نه نبود داده!',
    },
    syntaxAnatomy: {
      template: `{% if temp is not None %}\n  <p>دمای فعلی: {{ temp }} درجه سانتی‌گراد</p>\n{% else %}\n  <p>اطلاعات دما در دسترس نیست.</p>\n{% endif %}`,
      parts: [
        {token: '{% if temp is not None %}', role: 'بررسی دقیق وجود مقدار (تنها None را رد می‌کند و عدد 0 و اعداد منفی را کاملاً معتبر می‌شمارد!).'},
        {token: '{% else %}', role: 'شاخه جایگزین هنگام وقوع خطای ارتباطی یا نبود داده (temp = None).'},
        {token: '{% endif %}', role: 'بستن اجباری بلوک شرطی در زبان قالب جنگو.'},
      ],
    },
    behindTheScenes: [
      'این یکی از زیباترین و آموزنده‌ترین باگ‌های واقعی کتاب «طراح سایت ۱۴۰۵» (ص ۲۹۱) است! در موتور این سامانه، متغیر آزمایشی temp عمداً روی عدد 0 (دمای زمستانی اردبیل) تنظیم شده تا اثر این باگ به‌صورت زنده دیده شود.',
      'مقادیر Falsy در پایتون و قالب‌های جنگو عبارتند از: None، False، 0، 0.0، "" (رشته خالی) و [] (لیست خالی). بنابراین شرط {% if temp %} هر دو حالت temp = 0 و temp = None را False می‌بیند!',
      'استفاده از is not None دقیقاً همان استاندارد PEP 8 در پایتون است و هیچ ابهامی باقی نمی‌گذارد.',
    ],
    goldenTips: [
      'در کلاس حتماً ابتدا باگ کتاب ({% if temp %}) را اجرا کنید تا خروجی قرمز «دما در دسترس نیست» روی دمای 0 درجه دیده شود، سپس is not None را اضافه کرده و تبدیل آن به پیام سبز «دمای ۰ درجه» را نشان دهید!',
    ],
    wrongVsRight: [
      {
        title: 'باگ منطقی واقعی صفحه ۲۹۱ کتاب درسی (دمای صفر درجه)',
        wrongCode: `{% if temp %}\n  <p>دما: {{ temp }} درجه</p>\n{% else %}\n  <p>دما ناموجود است!</p>\n{% endif %}`,
        rightCode: `{% if temp is not None %}\n  <p>دما: {{ temp }} درجه</p>\n{% else %}\n  <p>دما ناموجود است!</p>\n{% endif %}`,
        explanation: 'وقتی دما 0 درجه است، کد کتاب اشتباهاً وارد else می‌شود؛ اما is not None عدد 0 را به درستی نمایش می‌دهد.',
      },
      {
        title: 'استفاده از != None به جای is not None',
        wrongCode: `{% if temp != None %}`,
        rightCode: `{% if temp is not None %}`,
        explanation: 'در پایتون و جنگو مقایسه با None همیشه باید با عملگر هویتی is / is not انجام شود.',
      },
    ],
    examples: [
      {
        id: 'ex-5-1-zero-basic',
        tier: 'basic',
        title: 'اصلاح باگ دمای صفر درجه در قالب آب‌وهوا (ص ۲۹۱)',
        bookPage: '۲۹۱',
        summary: 'اجرای زنده قالب جنگو با مقدار آزمایشی temp = 0 و مشاهده صحت نمایش 0 درجه.',
        language: 'django-html',
        engine: 'django-sql',
        code: `<div style="direction:rtl;font-family:Vazirmatn,sans-serif;padding:14px;border:1px solid #cbd5e1;border-radius:10px;">
  <h3 style="margin-top:0;">سامانه آب‌وهوای meteo — شهر {{ city.title }}</h3>
  <p>مختصات جغرافیایی: عرض {{ city.lat }} ، طول {{ city.lon }}</p>

  {% if temp is not None %}
    <p style="color:#059669;font-weight:bold;">
      ✔ دمای ثبت‌شده: {{ temp }} درجه سانتی‌گراد (حتی دمای ۰ درجه هم درست نمایش داده می‌شود!)
    </p>
  {% else %}
    <p style="color:#dc2626;font-weight:bold;">✖ اطلاعات دما در دسترس نیست.</p>
  {% endif %}
</div>`,
        teacherTalkingPoints: [
          'دکمه «اجرا روی SQLite / جنگو» را بزنید؛ حالا عبارت is not None را پاک کنید و دوباره اجرا کنید تا کلاس باگ ص ۲۹۱ را زنده ببیند!',
        ],
        lineExplanations: [
          {line: 5, explanation: 'شرط ایمن is not None عدد 0 را به عنوان دمای معتبر می‌پذیرد.'},
        ],
        commonMistakes: ['نوشتن {% if temp %} که در روزهای برفی ۰ درجه اشتباه عمل می‌کند.'],
        bookCorrection: {
          page: 291,
          issue: 'شرط {% if temp %} در دمای 0°C مقدار False می‌دهد و پیام «اطلاعات در دسترس نیست» چاپ می‌کند.',
          fix: 'به {% if temp is not None %} اصلاح شد.',
        },
      },
      {
        id: 'ex-5-1-zero-practical',
        tier: 'practical',
        title: 'آزمون پایتونی ۵ دمای مختلف (مثبت، منفی، صفر و None)',
        bookPage: '۲۹۱',
        summary: 'مقایسه مستقیم نتیجه if temp و if temp is not None روی تمام حالت‌های مرزی دما.',
        language: 'python',
        engine: 'python',
        code: `test_temps = [19.4, 0, -5.2, None]

for t in test_temps:
    book_bug = "نمایش" if t else "ناموجود!"
    fixed = "نمایش" if t is not None else "ناموجود!"
    print(f"دما={t}  |  کد کتاب (if temp): {book_bug}  |  کد اصلاح‌شده: {fixed}")`,
        teacherTalkingPoints: [
          'به ردیف دوم (دما=0) اشاره کنید: تنها جایی که دو ستون اختلاف دارند و باگ کتاب دقیقاً خودش را لو می‌دهد!',
        ],
        lineExplanations: [
          {line: 5, explanation: 'شرط اصلاح‌شده فقط برای None نتیجه «ناموجود» می‌دهد.'},
        ],
        commonMistakes: ['تصور اینکه اعداد منفی (مثل -5) هم Falsy هستند (اعداد منفی Truthy هستند، فقط 0 و 0.0 Falsy هستند!).'],
      },
      {
        id: 'ex-5-1-zero-combined',
        tier: 'combined',
        title: 'تلفیق حلقه شهرها و هشدار برفی برای دمای صفر درجه در قالب',
        bookPage: '۲۹۱–۲۹۲',
        summary: 'نمایش شرطی بنر هشدار یخبندان وقتی temp == 0 و نمایش امن با is not None.',
        language: 'django-html',
        engine: 'django-sql',
        code: `<div style="direction:rtl;font-family:Vazirmatn,sans-serif;padding:12px;border-radius:10px;border:1px solid #93c5fd;background:#eff6ff;">
  <h4 style="margin-top:0;">ایستگاه هواشناسی: {{ city.title }}</h4>
  {% if temp is not None %}
    <p style="font-size:18px;font-weight:bold;color:#1d4ed8;">دمای فعلی: {{ temp }} °C</p>
    {% if temp == 0 %}
      <div style="background:#dbeafe;color:#1e40af;padding:8px;border-radius:8px;font-size:13px;">
        ❄ هشدار نقطه انجماد: دما دقیقاً صفر درجه سانتی‌گراد است!
      </div>
    {% endif %}
  {% else %}
    <p style="color:#b91c1c;">دما دریافت نشد.</p>
  {% endif %}
</div>`,
        teacherTalkingPoints: [
          'نشان دهید چگونه دو شرط تودرتو (is not None و سپس temp == 0) تجربه‌ای دقیق و حرفه‌ای می‌سازند.',
        ],
        lineExplanations: [
          {line: 5, explanation: 'تشخیص اختصاصی نقطه انجماد (0 درجه).'},
        ],
        commonMistakes: ['فراموش کردن {% endif %} دوم در شرط‌های تودرتو.'],
      },
      {
        id: 'ex-5-1-zero-whatif',
        tier: 'what-if',
        title: 'بررسی لیست خالی با {% if cities %} در مقابل جدول دارای رکورد',
        bookPage: '۳۲۵',
        summary: 'پیش‌نمایش مدیریت حالت جدول خالی در قالب جنگو پیش از ورود به واحد ۵.۲.',
        language: 'django-html',
        engine: 'django-sql',
        code: `<div style="direction:rtl;font-family:Vazirmatn,sans-serif;padding:12px;">
  {% if cities %}
    <p style="color:#059669;font-weight:bold;">✔ پایگاه‌داده فعال است و شهرهای ایران بارگذاری شدند:</p>
    <p>{% for c in cities %}{{ c.title }} | {% endfor %}</p>
  {% else %}
    <p style="color:#d97706;">هنوز هیچ شهری در پایگاه‌داده ثبت نشده است.</p>
  {% endif %}
</div>`,
        teacherTalkingPoints: [
          'توضیح دهید برای لیست‌ها نوشتن {% if cities %} کاملاً استاندارد است (لیست خالی [] معادل False و لیست پر معادل True است)؛ اما برای اعداد مثل temp هرگز نباید از {% if temp %} استفاده کرد!',
        ],
        lineExplanations: [
          {line: 2, explanation: 'بررسی وجود حداقل یک شهر در فهرست cities.'},
        ],
        commonMistakes: ['عدم در نظر گرفتن حالت خالی بودن پایگاه‌داده در قالب.'],
      },
    ],
  },

  // ==================== LESSON 6 ====================
  {
    id: 'lesson-5-1-weather-json',
    order: 6,
    title: 'استخراج آب‌وهوا از JSON (Open-Meteo)، اصلاح مختصات همدان و مدیریت خطا',
    bookPage: '۲۸۹ تا ۲۹۴',
    whyWeNeedIt: {
      realWorldProblem:
        'در پایان واحد ۵.۱ وب‌اپلیکیشن meteo با ارسال عرض جغرافیایی (lat) و طول جغرافیایی (lon) یک شهر، پاسخ JSON سرویس آب‌وهوای Open-Meteo را دریافت می‌کند، دمای لحظه‌ای را استخراج کرده و اگر ارتباط قطع یا ساختار پاسخ ناقص بود، بدون کرش پیام مناسبی نشان می‌دهد.',
      analogy:
        'API آب‌وهوا مانند یک ایستگاه هواشناسی بین‌المللی است که فقط با زبان مختصات جغرافیایی (lat, lon) و قالب JSON صحبت می‌کند؛ View ما مترجمی است که نام شهر را به مختصات تبدیل می‌کند و JSON برگشتی را به فارسی در صفحه نشان می‌دهد.',
    },
    syntaxAnatomy: {
      template: `try:\n    data = json.loads(raw_response)\n    temp = data["current_weather"]["temperature"]\nexcept Exception:\n    temp = None`,
      parts: [
        {token: 'lat=34.7981, lon=48.5146', role: 'مختصات جغرافیایی صحیح شهر همدان (اصلاح اشتباه چاپی 37.7981 ص ۲۹۱ و ۳۰۴ کتاب!).'},
        {token: 'current_weather.temperature', role: 'مسیر استخراج عدد دما از دیکشنری تودرتوی خروجی Open-Meteo.'},
        {token: 'try / except', role: 'محافظت از View جنگو در برابر قطع اینترنت یا پاسخ خراب تا صفحه خطای 500 رخ ندهد.'},
      ],
    },
    behindTheScenes: [
      'اصلاح داده جغرافیایی کتاب (ص ۲۹۱ و ۳۰۴): در کتاب درسی عرض جغرافیایی همدان ۳۷.۷۹۸۱ نوشته شده که در واقع روی نقشه ایران نزدیک اردبیل در شمال‌غرب است! عرض جغرافیایی واقعی همدان ۳۴.۷۹۸۱ و طول جغرافیایی آن ۴۸.۵۱۴۶ است.',
      'چون کارگاه‌های مدرسه ممکن است آفلاین باشند، در این سامانه یک شبیه‌ساز ۱۰۰٪ آفلاین پاسخ JSON سرویس Open-Meteo با دقیقاً همان ساختار کلیدها (current_weather -> temperature, windspeed) تعبیه شده است.',
      'در دنیای واقعی در View جنگو از requests.get(url, timeout=5) همراه با try/except استفاده می‌کنیم تا اگر اینترنت قطع بود، temp برابر None شود و صفحه به جای خطای 500، پیام محترمانه نشان دهد.',
    ],
    goldenTips: [
      'همیشه به درخواست‌های شبکه پارامتر timeout=5 بدهید تا سرور جنگو در صورت قطعی شبکه معلق نماند.',
      'در حالت آفلاین کارگاه مدرسه، استفاده از فایل JSON محلی (دقیقاً مهارتی که در واحد ۴.۲ آموختند) بهترین روش برای تمرین بدون نیاز به اینترنت است!',
    ],
    wrongVsRight: [
      {
        title: 'مختصات جغرافیایی اشتباه همدان در ص ۲۹۱ و ۳۰۴ کتاب',
        wrongCode: `hamedan = {"title": "همدان", "lat": 37.7981, "lon": 48.5146}  # مختصات شمال ایران!`,
        rightCode: `hamedan = {"title": "همدان", "lat": 34.7981, "lon": 48.5146}  # مختصات دقیق همدان`,
        explanation: '۳ درجه خطا در عرض جغرافیایی یعنی بیش از ۳۳۰ کیلومتر جابه‌جایی به سمت شمال!',
      },
      {
        title: 'نداشتن try/except هنگام دریافت یا پردازش JSON آب‌وهوا',
        wrongCode: `temp = data["current_weather"]["temperature"]  # در صورت نبود کلید، خطای 500 می‌دهد`,
        rightCode: `try:\n    temp = data["current_weather"]["temperature"]\nexcept KeyError:\n    temp = None`,
        explanation: 'تبدیل خطا به temp = None باعث می‌شود قالب با شرط is not None پیام محترمانه نمایش دهد.',
      },
    ],
    examples: [
      {
        id: 'ex-5-1-api-basic',
        tier: 'basic',
        title: 'ساخت آدرس درخواست Open-Meteo با مختصات اصلاح‌شده همدان',
        bookPage: '۲۹۰–۲۹۱',
        summary: 'تولید URL استاندارد سرویس هواشناسی با مختصات صحیح همدان (34.7981, 48.5146).',
        language: 'python',
        engine: 'python',
        code: `city = "همدان"
lat = 34.7981  # اصلاح اشتباه چاپی 37.7981 ص ۲۹۱ کتاب
lon = 48.5146

url = f"https://api.open-meteo.com/v1/forecast?latitude={lat}&longitude={lon}&current_weather=true"
print("شهر:", city)
print("نشانی استاندارد API:")
print(url)`,
        teacherTalkingPoints: [
          'مختصات خط ۲ را با ص ۲۹۱ کتاب مقایسه کنید و بگویید ۳۷.۷۹ حوالی اردبیل و تبریز است نه همدان!',
        ],
        lineExplanations: [
          {line: 2, explanation: 'عرض جغرافیایی دقیق شهر همدان.'},
          {line: 5, explanation: 'ساخت رشته URL با پارامترهای کوئری latitude، longitude و current_weather.'},
        ],
        commonMistakes: ['جا انداختن علامت & بین پارامترهای URL.'],
        bookCorrection: {
          page: 291,
          issue: 'عرض جغرافیایی شهر همدان به اشتباه 37.7981 چاپ شده بود.',
          fix: 'به مقدار دقیق جغرافیایی 34.7981 اصلاح شد.',
        },
      },
      {
        id: 'ex-5-1-api-practical',
        tier: 'practical',
        title: 'استخراج دما و سرعت باد از پاسخ JSON آفلاین سرویس Open-Meteo',
        bookPage: '۲۹۰',
        summary: 'خواندن ساختار واقعی پاسخ Open-Meteo با json.loads() و استخراج ایمن مقادیر.',
        language: 'python',
        engine: 'python',
        code: `import json

# شبیه‌سازی پاسخ JSON واقعی Open-Meteo در حالت ۱۰۰٪ آفلاین
offline_response = '{"latitude": 34.7981, "longitude": 48.5146, "current_weather": {"temperature": 8.6, "windspeed": 14.5}}'

data = json.loads(offline_response)
current = data["current_weather"]
temp = current["temperature"]
wind = current["windspeed"]

print(f"دمای فعلی همدان: {temp} درجه سانتی‌گراد")
print(f"سرعت باد: {wind} کیلومتر بر ساعت")`,
        teacherTalkingPoints: [
          'نشان دهید کلیدهای دیکشنری دقیقاً مطابق ساختار واقعی سرویس Open-Meteo هستند و هیچ نیازی به اینترنت برای تمرین ندارند.',
        ],
        lineExplanations: [
          {line: 6, explanation: 'تبدیل متن پاسخ API به دیکشنری پایتونی.'},
          {line: 8, explanation: 'استخراج دما از زیرمجموعه current_weather.'},
        ],
        commonMistakes: ['تلاش برای خواندن data["temperature"] مستقیم بدون عبور از کلید میانی ["current_weather"].'],
      },
      {
        id: 'ex-5-1-api-combined',
        tier: 'combined',
        title: 'تابع کامل View آب‌وهوا با مدیریت خطا و پشتیبانی از دمای ۰ درجه',
        bookPage: '۲۹۱–۲۹۲',
        summary: 'ترکیب JSON، مدیریت خطا (try/except) و شرط is not None برای ۳ شهر (همدان، اردبیل و یک پاسخ خراب).',
        language: 'python',
        engine: 'python',
        code: `import json

RESPONSES = {
    "همدان": '{"current_weather": {"temperature": 8.6}}',
    "اردبیل": '{"current_weather": {"temperature": 0}}',
    "نامشخص": '{"error": "timeout"}'
}

def weather_view(city_name):
    raw = RESPONSES.get(city_name, "{}")
    try:
        data = json.loads(raw)
        temp = data["current_weather"]["temperature"]
    except KeyError:
        temp = None

    if temp is not None:
        print(f"✔ {city_name}: دمای {temp} درجه سانتی‌گراد")
    else:
        print(f"✖ {city_name}: خطا در دریافت اطلاعات آب‌وهوا")

for c in ["همدان", "اردبیل", "نامشخص"]:
    weather_view(c)`,
        teacherTalkingPoints: [
          'هر سه سناریوی واقعی را در خروجی ببینید: همدان (۸.۶ درجه)، اردبیل (۰ درجه بدون باگ!) و شهر خطادار (مدیریت ایمن بدون کرش).',
        ],
        lineExplanations: [
          {line: 14, explanation: 'اگر پاسخ ساختار current_weather نداشت، temp را None می‌گذاریم.'},
          {line: 17, explanation: 'شرط is not None باعث نمایش درست دمای ۰ درجه اردبیل می‌شود.'},
        ],
        commonMistakes: ['کرش کردن کل صفحه به جای تنظیم temp = None هنگام خطای API.'],
      },
      {
        id: 'ex-5-1-api-whatif',
        tier: 'what-if',
        title: 'فایل پشتیبان آفلاین (Fallback JSON) برای اجرای کارگاه بدون اینترنت',
        bookPage: '۲۹۲',
        summary: 'استفاده از فایل محلی cache.json با pathlib برای پاسخ‌گویی به View در حالت قطع اینترنت.',
        language: 'python',
        engine: 'python-fs',
        extraFiles: {
          'cache.json': '{"تهران": 19.4, "همدان": 8.6, "اردبیل": 0}\n',
        },
        code: `import json
from pathlib import Path

def get_offline_temp(city_name):
    try:
        cache = json.loads(Path("cache.json").read_text())
        return cache.get(city_name)
    except FileNotFoundError:
        return None

for c in ["تهران", "اردبیل", "یزد"]:
    t = get_offline_temp(c)
    if t is not None:
        print(f"{c} (از کش آفلاین): {t} درجه")
    else:
        print(f"{c}: در حافظه آفلاین ثبت نشده است.")`,
        teacherTalkingPoints: [
          'این ترفند عالی را به هنرآموزان پیشنهاد دهید تا حتی در روزهایی که اینترنت کارگاه مدرسه قطع است، کل فصل ۵ را کامل و عملی تدریس کنند!',
        ],
        lineExplanations: [
          {line: 7, explanation: 'اگر شهر در کش نباشد get() مقدار None برمی‌گرداند.'},
        ],
        commonMistakes: ['استفاده از cache[city_name] به جای cache.get(city_name) که برای «یزد» خطای KeyError می‌دهد.'],
      },
    ],
  },
];
