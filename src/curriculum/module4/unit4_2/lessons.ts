import type {ConceptLesson} from '../../../types/curriculum.ts';

/**
 * Unit 4.2 — Files (pathlib.Path), Exceptions & JSON (Pages 254–274)
 * 6 Deep Concept Lessons × 4 Tiered Runnable Python Virtual-FS Examples = 24 Examples.
 * Covers & fixes:
 * - Page 261 critical logic bug: `brands = "Nokia\n"` overwriting previous 4 brands instead of `+=`
 * - Page 270 confusion: `json.dump()` vs `json.dumps()` and `json.load()` vs `json.loads()`
 * - Windows Persian UTF-8 encoding gap: `encoding="utf-8"`
 */
export const UNIT_4_2_LESSONS: ConceptLesson[] = [
  // ==================== LESSON 1 ====================
  {
    id: 'lesson-4-2-read-pathlib',
    order: 1,
    title: 'خواندن فایل‌های متنی و پردازش خط‌به‌خط با pathlib.Path',
    bookPage: '۲۵۴ تا ۲۵۹',
    whyWeNeedIt: {
      realWorldProblem:
        'وقتی برنامه پایتون بسته می‌شود تمام لیست‌ها و دیکشنری‌های موجود در حافظه RAM پاک می‌شوند! برای اینکه لیست محصولات، نمرات هنرجویان یا فهرست برندهای موبایل ماندگار بمانند، باید آن‌ها را روی دیسک ذخیره کرده و در اجراهای بعدی از فایل بخوانیم.',
      analogy:
        'حافظه RAM مانند تخته کلاس است که پایان زنگ پاک می‌شود، اما فایل روی دیسک مانند دفترچه یادداشت دائمی است؛ ماژول pathlib.Path نیز مانند یک دستیار هوشمند است که نشانی فایل را بدون نگرانی از تفاوت ویندوز (\\) و لینوکس (/) مدیریت می‌کند.',
    },
    syntaxAnatomy: {
      template: `from pathlib import Path\n\npath = Path("brands.txt")\ncontents = path.read_text()\nlines = contents.splitlines()`,
      parts: [
        {token: 'from pathlib import Path', role: 'وارد کردن کلاس مدرن Path برای کار شیءگرا با مسیرها و فایل‌ها.'},
        {token: 'Path("brands.txt")', role: 'ایجاد شیء مسیر (می‌تواند مسیر نسبی کنار برنامه یا مسیر کامل باشد).'},
        {token: '.read_text()', role: 'باز کردن، خواندن کل متن فایل به صورت یک رشته str و بستن خودکار فایل.'},
        {token: '.splitlines()', role: 'برش متن چندخطی به لیستی از خطوط جداگانه بدون کاراکتر اضافی \\n.'},
      ],
    },
    behindTheScenes: [
      'متد read_text() فایل را به‌صورت خودکار باز می‌کند، محتوا را می‌خواند و بلافاصله می‌بندد؛ بنابراین دیگر خطر فراموش کردن file.close() وجود ندارد.',
      'در کارگاه‌های ویندوزی مدارس، اگر فایل حاوی حروف فارسی باشد حتماً باید encoding="utf-8" را به read_text و write_text داد تا حروف فارسی به‌هم نریزند.',
      'متد path.exists() پیش از خواندن بررسی می‌کند آیا فایل واقعاً وجود دارد یا نه (True/False).',
      'پس از خواندن خطوط با splitlines() می‌توانیم با حلقه for روی تک‌تک سطرها جستجو، شمارش یا پردازش انجام دهیم.',
    ],
    goldenTips: [
      'برای حذف فاصله‌ها و خطوط خالی اضافی ابتدا و انتهای کل متن فایل، از contents.strip() استفاده کنید.',
      'در فایل‌سیستم مجازی پایین همین صفحه، فایل‌های آماده (مثل brands.txt) قابل ویرایش زنده هستند تا اثر تغییرشان را فوری ببینید.',
    ],
    wrongVsRight: [
      {
        title: 'استفاده از بک‌اسلش خام در مسیر ویندوز بدون رشته‌خام یا اسلش',
        wrongCode: `p = Path("data\\notes.txt")  # \\n به عنوان خط جدید تفسیر می‌شود!`,
        rightCode: `p = Path("data/notes.txt")  # pathlib در ویندوز و لینوکس با / کاملاً درست کار می‌کند`,
        explanation: 'کتابخانه pathlib خودش اسلش (/) را در ویندوز به جداکننده استاندارد تبدیل می‌کند.',
      },
      {
        title: 'خواندن بدون حذف خطوط خالی یا فاصله‌های انتهایی',
        wrongCode: `lines = path.read_text().split("\\n")  # در انتها ممکن است رشته "" اضافه بماند`,
        rightCode: `lines = path.read_text().strip().splitlines()`,
        explanation: 'ترکیب strip().splitlines() فهرست تمیز و بدون خط خالی انتهایی می‌دهد.',
      },
    ],
    examples: [
      {
        id: 'ex-4-2-read-basic',
        tier: 'basic',
        title: 'خواندن کل متن فایل برندها با Path.read_text()',
        bookPage: '۲۵۶',
        summary: 'باز کردن و چاپ کامل محتوای فایل مجازی brands.txt با pathlib.',
        language: 'python',
        engine: 'python-fs',
        extraFiles: {
          'brands.txt': 'Samsung\nApple\nXiaomi\nHuawei\nNokia\n',
        },
        code: `from pathlib import Path

path = Path("brands.txt")
print("آیا فایل وجود دارد؟", path.exists())

contents = path.read_text()
print("--- محتوای فایل ---")
print(contents.strip())`,
        teacherTalkingPoints: [
          'در بخش «فایل‌سیستم مجازی» پایین ترمینال روی brands.txt کلیک کنید و یک برند جدید تایپ کنید، سپس دوباره «اجرا» بزنید!',
        ],
        lineExplanations: [
          {line: 3, explanation: 'ساخت شیء مسیر اشاره به فایل brands.txt.'},
          {line: 4, explanation: 'بررسی وجود فایل پیش از خواندن.'},
          {line: 6, explanation: 'خواندن تمام متن فایل در یک متغیر رشته‌ای.'},
        ],
        commonMistakes: ['غلط املایی در نام یا پسوند فایل (مثلاً brand.txt به جای brands.txt).'],
      },
      {
        id: 'ex-4-2-read-practical',
        tier: 'practical',
        title: 'پیمایش خط‌به‌خط فایل با splitlines() و شماره‌گذاری',
        bookPage: '۲۵۸',
        summary: 'تبدیل متن فایل به لیست خطوط و چاپ هر برند با شماره ردیف.',
        language: 'python',
        engine: 'python-fs',
        extraFiles: {
          'brands.txt': 'Samsung\nApple\nXiaomi\nHuawei\n',
        },
        code: `from pathlib import Path

path = Path("brands.txt")
lines = path.read_text().splitlines()

print(f"تعداد کل خطوط: {len(lines)}")
num = 1
for line in lines:
    print(f"{num}. {line.upper()}")
    num += 1`,
        teacherTalkingPoints: [
          'نشان دهید خروجی splitlines() یک لیست معمولی پایتون است؛ پس تمام مهارت‌های پودمان ۱ (len، حلقه، برش) روی آن کار می‌کند!',
        ],
        lineExplanations: [
          {line: 4, explanation: 'تقسیم متن فایل به لیست سطرها.'},
          {line: 9, explanation: 'چاپ هر سطر با حروف بزرگ.'},
        ],
        commonMistakes: ['حلقه زدن مستقیم روی contents (که حرف‌به‌حرف پیمایش می‌کند!) به جای contents.splitlines().'],
      },
      {
        id: 'ex-4-2-read-combined',
        tier: 'combined',
        title: 'خواندن فایل نمرات و محاسبه میانگین و بیشترین نمره',
        bookPage: '۲۵۹',
        summary: 'خواندن اعداد متنی از فایل scores.txt، تبدیل به float و تحلیل آماری آن‌ها.',
        language: 'python',
        engine: 'python-fs',
        extraFiles: {
          'scores.txt': '18.5\n20\n16.25\n19\n17.75\n',
        },
        code: `from pathlib import Path

path = Path("scores.txt")
lines = path.read_text().strip().splitlines()

scores = []
for line in lines:
    scores.append(float(line))

avg = round(sum(scores) / len(scores), 2)
print("لیست نمرات:", scores)
print(f"میانگین کلاس: {avg} | بالاترین نمره: {max(scores)}")`,
        teacherTalkingPoints: [
          'نکته کلیدی: محتوای خوانده‌شده از فایل همیشه رشته (str) است؛ برای محاسبات ریاضی حتماً باید به int یا float تبدیل شود.',
        ],
        lineExplanations: [
          {line: 8, explanation: 'تبدیل هر سطر متنی به عدد اعشاری پیش از افزودن به لیست.'},
        ],
        commonMistakes: ['تلاش برای اجرای sum(lines) روی لیست رشته‌ها که خطای TypeError می‌دهد!'],
      },
      {
        id: 'ex-4-2-read-whatif',
        tier: 'what-if',
        title: 'تفاوت حلقه روی کل رشته در برابر حلقه روی splitlines()',
        bookPage: '۲۵۸',
        summary: 'چرا اگر splitlines() نزنیم، حلقه for به جای کلمات، حرف‌به‌حرف چاپ می‌کند؟',
        language: 'python',
        engine: 'python-fs',
        extraFiles: {
          'short.txt': 'Ali\nReza\n',
        },
        code: `from pathlib import Path

text = Path("short.txt").read_text().strip()
print("تعداد کاراکترهای متن:", len(text))
print("لیست خطوط با splitlines:", text.splitlines())
print("جستجوی 'Reza' در متن:", "Reza" in text)`,
        teacherTalkingPoints: [
          'مقایسه len(text) (تعداد کاراکترها) با len(text.splitlines()) (تعداد سطرها) برای دانش‌آموزان بسیار روشن‌کننده است.',
        ],
        lineExplanations: [
          {line: 5, explanation: 'splitlines() دو نام مجزا در لیست می‌سازد.'},
        ],
        commonMistakes: ['اشتباه گرفتن تعداد کاراکترها با تعداد سطرهای فایل.'],
      },
    ],
  },

  // ==================== LESSON 2 ====================
  {
    id: 'lesson-4-2-write-files',
    order: 2,
    title: 'نوشتن داده‌های تک‌خطی و چندخطی در فایل (اصلاح باگ بحرانی ص ۲۶۱)',
    bookPage: '۲۶۰ تا ۲۶۲',
    whyWeNeedIt: {
      realWorldProblem:
        'برنامه‌های واقعی علاوه بر خواندن، باید گزارش فروش، فهرست برندهای جدید یا تنظیمات کاربر را در فایل جدید ذخیره کنند. اما اگر هنگام ساخت رشته چندخطی دقت نکنیم، ممکن است یک خطای ساده تمام داده‌های قبلی را پاک کند!',
      analogy:
        'متد write_text() مانند نوشتن روی یک صفحه سفید است؛ اگر فایل از قبل وجود داشته باشد محتوای قبلی آن کاملاً پاک و جایگزین می‌شود. بنابراین برای افزودن به داده‌های قبلی، ابتدا باید همه سطرها را با += در یک رشته جمع کنیم.',
    },
    syntaxAnatomy: {
      template: `from pathlib import Path\n\ncontents = "Samsung\\n"\ncontents += "Apple\\n"\ncontents += "Nokia\\n"  # اصلاح باگ ص ۲۶۱!\nPath("brands_out.txt").write_text(contents)`,
      parts: [
        {token: '.write_text(str)', role: 'فقط یک رشته (str) می‌پذیرد؛ اگر فایل نباشد می‌سازد و اگر باشد بازنویسی می‌کند.'},
        {token: '+=', role: 'الحاق خط جدید به انتهای رشته قبلی (در ص ۲۶۱ کتاب جا افتادن + باعث پاک شدن ۴ برند اول شده بود!).'},
        {token: '\\n', role: 'کاراکتر رفتن به سطر جدید؛ بدون آن همه کلمات به هم می‌چسبند.'},
      ],
    },
    behindTheScenes: [
      'باگ بحرانی شکل ۲۹ صفحه ۲۶۱ کتاب درسی: نویسنده ۴ برند اول را با += جمع کرده اما در خط آخر به اشتباه نوشته brands = "Nokia\\n" (بدون علامت +)! در نتیجه ۴ برند قبلی کاملاً پاک می‌شوند و فایل فقط یک خط Nokia دارد!',
      'متد write_text فقط نوع رشته (str) قبول می‌کند؛ اگر عدد 1405 یا لیست را مستقیم به آن بدهید خطای TypeError می‌دهد و باید با str() یا "\\n".join(list) به رشته تبدیل شود.',
      'روش مدرن‌تر و خواناتر از نوشتن ده‌ها +=، نگهداری آیتم‌ها در یک لیست و تبدیل آن به رشته چندخطی با "\\n".join(items) است.',
      'برای افزودن خط جدید به فایل موجود بدون پاک کردن محتوای قبلی با pathlib، ابتدا متن قبلی را می‌خوانیم، خط جدید را اضافه می‌کنیم و دوباره می‌نویسیم.',
    ],
    goldenTips: [
      'همیشه پس از اجرای write_text() در این سامانه، تب «فایل‌سیستم مجازی» پایین ترمینال را باز کنید تا دانش‌آموزان فایل ساخته‌شده را به چشم ببینند.',
      'متد "\\n".join(my_list) بهترین جایگزین تمیز برای حلقه‌های دستی جمع کردن رشته است.',
    ],
    wrongVsRight: [
      {
        title: 'باگ واقعی شکل ۲۹ ص ۲۶۱ کتاب (بازنویسی ناخواسته با =)',
        wrongCode: `brands = "Samsung\\n"\nbrands += "Apple\\n"\nbrands = "Nokia\\n"  # Samsung و Apple پاک شدند!`,
        rightCode: `brands = "Samsung\\n"\nbrands += "Apple\\n"\nbrands += "Nokia\\n"  # هر سه برند حفظ شدند`,
        explanation: 'علامت = کل محتوای متغیر را پاک و جایگزین می‌کند؛ برای افزودن باید از += استفاده کرد.',
      },
      {
        title: 'ارسال مستقیم عدد یا لیست به write_text()',
        wrongCode: `Path("score.txt").write_text(20)  # TypeError!`,
        rightCode: `Path("score.txt").write_text(str(20))`,
        explanation: 'ورودی write_text باید حتماً رشته (str) باشد.',
      },
    ],
    examples: [
      {
        id: 'ex-4-2-wr-basic',
        tier: 'basic',
        title: 'ساخت و نوشتن فایل متنی تک‌خطی با Path.write_text()',
        bookPage: '۲۶۰',
        summary: 'ایجاد یک فایل جدید در فایل‌سیستم مجازی و بازخوانی آن برای اطمینان.',
        language: 'python',
        engine: 'python-fs',
        code: `from pathlib import Path

path = Path("welcome.txt")
path.write_text("به کارگاه برنامه‌نویسی پایتون پایه یازدهم خوش آمدید!")

print("فایل ایجاد شد! محتوای خوانده‌شده:")
print(path.read_text())`,
        teacherTalkingPoints: [
          'پس از کلیک روی «اجرا»، روی دکمه welcome.txt در بخش فایل‌سیستم مجازی کلیک کنید تا وجود واقعی فایل را ببینند.',
        ],
        lineExplanations: [
          {line: 4, explanation: 'فایل welcome.txt ساخته شده و متن درون آن ذخیره می‌شود.'},
        ],
        commonMistakes: ['فراموش کردن پسوند .txt یا قرار ندادن متن داخل کوتیشن.'],
      },
      {
        id: 'ex-4-2-wr-practical',
        tier: 'practical',
        title: 'نوشتن فایل چندخطی برندها (اصلاح باگ ص ۲۶۱ کتاب)',
        bookPage: '۲۶۱',
        summary: 'جمع‌آوری ۵ برند موبایل با += و ذخیره صحیح همه آن‌ها در فایل brands_clean.txt.',
        language: 'python',
        engine: 'python-fs',
        code: `from pathlib import Path

brands = "Samsung\\n"
brands += "Apple\\n"
brands += "Xiaomi\\n"
brands += "Huawei\\n"
brands += "Nokia\\n"  # اصلاح باگ شکل ۲۹ ص ۲۶۱ کتاب (افزودن + پیش از =)

path = Path("brands_clean.txt")
path.write_text(brands)
print("فایل با ۵ برند کامل ذخیره شد:")
print(path.read_text())`,
        teacherTalkingPoints: [
          'یک بار علامت + را از خط ۷ پاک کنید و اجرا کنید تا بچه‌ها باگ صفحه ۲۶۱ کتاب را با چشم خودشان ببینند!',
        ],
        lineExplanations: [
          {line: 7, explanation: 'استفاده از += باعث حفظ برندهای قبلی در کنار Nokia می‌شود.'},
        ],
        commonMistakes: ['جا انداختن + در خط آخر (دقیقاً همان اشتباه شکل ۲۹ ص ۲۶۱ کتاب).'],
        bookCorrection: {
          page: 261,
          issue: 'در شکل ۲۹ ص ۲۶۱ خط آخر به صورت brands = "Nokia\\n" نوشته شده که ۴ برند قبلی را پاک می‌کرد.',
          fix: 'به brands += "Nokia\\n" اصلاح شد تا تمام ۵ برند ذخیره شوند.',
        },
      },
      {
        id: 'ex-4-2-wr-combined',
        tier: 'combined',
        title: 'تبدیل لیست به فایل با "\\n".join() و افزودن ایمن به فایل موجود',
        bookPage: '۲۶۲',
        summary: 'خواندن فایل موجود، افزودن آیتم جدید به لیست و بازذخیره‌سازی بدون حذف داده‌های قبلی.',
        language: 'python',
        engine: 'python-fs',
        extraFiles: {
          'tasks.txt': 'مرور پایتون\nتمرین HTML5\n',
        },
        code: `from pathlib import Path

path = Path("tasks.txt")
items = path.read_text().strip().splitlines()
items.append("تکمیل پروژه فایل و JSON")
items.append("آمادگی برای جنگو")

path.write_text("\\n".join(items) + "\\n")
print("فهرست به‌روزرسانی‌شده:")
print(path.read_text())`,
        teacherTalkingPoints: [
          'این الگو (خواندن ⟶ افزودن به لیست ⟶ نوشتن با join) یکی از تمیزترین الگوهای عملی کار با فایل است.',
        ],
        lineExplanations: [
          {line: 8, explanation: 'متد join تمام عناصر لیست را با کاراکتر خط جدید به یک رشته واحد تبدیل می‌کند.'},
        ],
        commonMistakes: ['ارسال مستقیم لیست items به write_text(items) بدون join.'],
      },
      {
        id: 'ex-4-2-wr-whatif',
        tier: 'what-if',
        title: 'نوشتن گزارش فاکتور عددی در فایل (تبدیل عدد به رشته با f-string)',
        bookPage: '۲۶۱',
        summary: 'ذخیره اطلاعات محاسباتی فاکتور فروشگاه در یک فایل رسید خوانا.',
        language: 'python',
        engine: 'python-fs',
        code: `from pathlib import Path

price = 45000
qty = 3
total = price * qty

receipt = f"=== رسید فروشگاه مرجع نو ===\\n"
receipt += f"تعداد کتاب: {qty}\\n"
receipt += f"قیمت واحد: {price} تومان\\n"
receipt += f"جمع کل: {total} تومان\\n"

Path("receipt.txt").write_text(receipt)
print(Path("receipt.txt").read_text())`,
        teacherTalkingPoints: [
          'نشان دهید چون خروجی f-string همیشه یک str است، می‌توانیم اعداد و متغیرها را بی‌دردسر در فایل ذخیره کنیم.',
        ],
        lineExplanations: [
          {line: 12, explanation: 'ذخیره مستقیم کل رسید در فایل مجازی receipt.txt.'},
        ],
        commonMistakes: ['تلاش برای چسباندن عدد به رشته با + بدون str() (مثلاً "جمع: " + total).'],
      },
    ],
  },

  // ==================== LESSON 3 ====================
  {
    id: 'lesson-4-2-exceptions',
    order: 3,
    title: 'مدیریت استثناها با try / except / else / finally',
    bookPage: '۲۶۲ تا ۲۶۷',
    whyWeNeedIt: {
      realWorldProblem:
        'در دنیای واقعی کاربر به جای عدد حروف وارد می‌کند، مخرج کسر را صفر می‌گذارد یا فایلی که قرار بود خوانده شود اشتباهاً پاک شده است! بدون مدیریت استثنا، برنامه با یک صفحه خطای ترسناک (Traceback) متوقف (Crash) می‌شود.',
      analogy:
        'بلوک try / except مانند کیسه هوای خودرو (Airbag) است؛ شما امیدوارید تصادف (خطا) رخ ندهد، اما اگر رخ داد، except کنترل اوضاع را به دست می‌گیرد و با یک پیام محترمانه از متوقف شدن کل برنامه جلوگیری می‌کند.',
    },
    syntaxAnatomy: {
      template: `try:\n    result = int(a) / int(b)\nexcept ValueError:\n    print("ورودی باید عدد باشد!")\nexcept ZeroDivisionError:\n    print("تقسیم بر صفر مجاز نیست!")\nelse:\n    print("نتیجه:", result)`,
      parts: [
        {token: 'try:', role: 'کدهای پرخطر (مثل تبدیل نوع، تقسیم یا خواندن فایل) در این بلوک قرار می‌گیرند.'},
        {token: 'except ErrorType:', role: 'فقط هنگام وقوع همان نوع خطای مشخص اجرا می‌شود (ValueError، ZeroDivisionError، FileNotFoundError).'},
        {token: 'else:', role: 'فقط زمانی اجرا می‌شود که بلوک try بدون هیچ خطایی تمام شده باشد.'},
        {token: 'finally:', role: 'در هر حالت (چه خطا رخ دهد چه ندهد) در پایان اجرا می‌شود.'},
      ],
    },
    behindTheScenes: [
      'چرا باید نوع خطا را دقیق بنویسیم (مثلاً except ZeroDivisionError:) و از except خالی پرهیز کنیم؟ چون except خالی حتی غلط املایی برنامه‌نویس (NameError) را هم پنهان می‌کند و اشکال‌زدایی را بسیار سخت می‌کند!',
      'می‌توان چند بلوک except پشت سر هم نوشت تا برای هر مشکل (ورودی غیرعددی یا تقسیم بر صفر) پیام راهنمای دقیق به کاربر نشان داد.',
      'قرار دادن کدهای وابسته به موفقیت در بلوک else (به جای داخل try) باعث می‌شود فقط دقیقاً همان خط مشکوک زیر ذره‌بین try باشد.',
      'سه استثنای اصلی کتاب درسی در این واحد: ZeroDivisionError (تقسیم بر صفر)، ValueError (تبدیل رشته غیرعددی به int/float) و FileNotFoundError (نبودن فایل).',
    ],
    goldenTips: [
      'در حالت تدریس، ابتدا کد را بدون try/except اجرا کنید تا هنرجویان رنگ قرمز Traceback و نام دقیق استثنا (مثل ZeroDivisionError) را ببینند، سپس همان نام را در except بگذارید!',
      'مرتب‌سازی ذهنی: try (تلاش کن) ⟶ except (اگر خطا داد) ⟶ else (اگر خطا نداد) ⟶ finally (در هر صورت).',
    ],
    wrongVsRight: [
      {
        title: 'گذاشتن کد غیرمرتبط داخل try به جای else',
        wrongCode: `try:\n    x = int("abc")\n    print("نتیجه آماده است")\nexcept:\n    print("یک خطایی شد!")`,
        rightCode: `try:\n    x = int("abc")\nexcept ValueError:\n    print("خطا: لطفاً فقط عدد صحیح وارد کنید.")\nelse:\n    print("مقدار معتبر:", x)`,
        explanation: 'مشخص کردن نام دقیق استثنا (ValueError) و استفاده از else، کد را شفاف و حرفه‌ای می‌کند.',
      },
      {
        title: 'غلط املایی در نام استثناها (حساس به حروف بزرگ و کوچک)',
        wrongCode: `except zerodivisionerror:  # NameError!`,
        rightCode: `except ZeroDivisionError:  # حروف اول هر کلمه بزرگ است`,
        explanation: 'نام تمام کلاس‌های استثنای پایتون به صورت PascalCase نوشته می‌شود.',
      },
    ],
    examples: [
      {
        id: 'ex-4-2-exc-basic',
        tier: 'basic',
        title: 'مدیریت ZeroDivisionError و بلوک else',
        bookPage: '۲۶۴',
        summary: 'محاسبه تقسیم ایمن برای یک لیست از جفت اعداد شامل مخرج صفر.',
        language: 'python',
        engine: 'python-fs',
        code: `pairs = [(20, 4), (15, 0), (18, 3)]

for a, b in pairs:
    try:
        answer = a / b
    except ZeroDivisionError:
        print(f"{a} / {b} => خطا: تقسیم بر صفر امکان‌پذیر نیست!")
    else:
        print(f"{a} / {b} = {answer}")`,
        teacherTalkingPoints: [
          'دقت کنید پس از خطای (15, 0) برنامه متوقف نشد و با موفقیت به جفت بعدی (18, 3) ادامه داد!',
        ],
        lineExplanations: [
          {line: 6, explanation: 'گرفتن اختصاصی خطای تقسیم بر صفر.'},
          {line: 8, explanation: 'بلوک else فقط وقتی تقسیم سالم انجام شود اجرا می‌گردد.'},
        ],
        commonMistakes: ['فراموش کردن دونقطه (:) پس از نام استثنا در خط except.'],
      },
      {
        id: 'ex-4-2-exc-practical',
        tier: 'practical',
        title: 'مدیریت هم‌زمان ValueError و ZeroDivisionError با ورودی تعاملی',
        bookPage: '۲۶۵',
        summary: 'ماشین‌حساب ایمن که دو خطای رایج کاربر را با پیام فارسی دقیق مدیریت می‌کند.',
        language: 'python',
        engine: 'python-fs',
        code: `def safe_divide(raw_a, raw_b):
    try:
        a = float(raw_a)
        b = float(raw_b)
        result = a / b
    except ValueError:
        print(f"ورودی ({raw_a}, {raw_b}) => خطا: لطفاً فقط عدد وارد کنید!")
    except ZeroDivisionError:
        print(f"ورودی ({raw_a}, {raw_b}) => خطا: مخرج نمی‌تواند صفر باشد!")
    else:
        print(f"{a} / {b} = {round(result, 2)}")
    finally:
        print("--- پایان بررسی یک مورد ---")

safe_divide("100", "4")
safe_divide("پنجاه", "2")
safe_divide("10", "0")`,
        teacherTalkingPoints: [
          'ببینید چگونه بلوک finally در هر سه حالت (موفق، ValueError و ZeroDivisionError) اجرا شده است.',
        ],
        lineExplanations: [
          {line: 6, explanation: 'اگر تبدیل float ناموفق باشد این بلوک اجرا می‌شود.'},
          {line: 8, explanation: 'اگر مخرج صفر باشد این بلوک اجرا می‌شود.'},
          {line: 12, explanation: 'finally همیشه در انتها اجرا می‌گردد.'},
        ],
        commonMistakes: ['تصور اینکه هر دو بلوک except هم‌زمان اجرا می‌شوند (فقط اولین خطایی که رخ دهد گرفته می‌شود).'],
      },
      {
        id: 'ex-4-2-exc-combined',
        tier: 'combined',
        title: 'مدیریت FileNotFoundError هنگام خواندن فایل ناموجود',
        bookPage: '۲۶۶',
        summary: 'جلوگیری از کرش برنامه وقتی فایل مورد نظر روی دیسک وجود ندارد.',
        language: 'python',
        engine: 'python-fs',
        extraFiles: {
          'valid.txt': 'اطلاعات کلاس یازدهم\n',
        },
        code: `from pathlib import Path

for filename in ["valid.txt", "missing.txt"]:
    path = Path(filename)
    try:
        content = path.read_text()
    except FileNotFoundError:
        print(f"هشدار: فایل '{filename}' پیدا نشد!")
    else:
        print(f"محتوای '{filename}': {content.strip()}")`,
        teacherTalkingPoints: [
          'توضیح دهید این دقیقاً الگوی اصلی پردازش فایل‌ها در برنامه‌های صنعتی است.',
        ],
        lineExplanations: [
          {line: 7, explanation: 'در صورت نبودن فایل، به جای توقف برنامه پیام هشدار چاپ می‌شود.'},
        ],
        commonMistakes: ['نوشتن FileNotFound بدون پسوند Error (نام صحیح: FileNotFoundError).'],
      },
      {
        id: 'ex-4-2-exc-whatif',
        tier: 'what-if',
        title: 'پاک‌سازی داده‌های خراب در لیست ورودی‌ها بدون توقف برنامه',
        bookPage: '۲۶۶',
        summary: 'استخراج اعداد سالم از یک لیست آلوده به متن‌های نامعتبر با try/except.',
        language: 'python',
        engine: 'python-fs',
        code: `raw_scores = ["19", "غایب", "17.5", "نامشخص", "20"]
valid_scores = []

for item in raw_scores:
    try:
        valid_scores.append(float(item))
    except ValueError:
        print(f"مقدار غیرعددی '{item}' کنار گذاشته شد.")

print("نمرات معتبر:", valid_scores)
print("میانگین نمرات معتبر:", round(sum(valid_scores) / len(valid_scores), 2))`,
        teacherTalkingPoints: [
          'در دنیای واقعی فایل‌های اکسل و فرم‌ها همیشه داده‌های ناقص مثل «غایب» دارند؛ این الگو برنامه را مقاوم می‌کند.',
        ],
        lineExplanations: [
          {line: 6, explanation: 'تنها مقادیر عددی سالم به valid_scores اضافه می‌شوند.'},
        ],
        commonMistakes: ['قرار دادن حلقه for داخل try به جای قرار دادن try داخل حلقه for (در حالت اشتباه، با اولین «غایب» کل حلقه متوقف می‌شود!).'],
      },
    ],
  },

  // ==================== LESSON 4 ====================
  {
    id: 'lesson-4-2-multi-files-pass',
    order: 4,
    title: 'پردازش چندفایلی، شمارش کلمات و عبور بی‌صدا با pass',
    bookPage: '۲۶۷ تا ۲۶۸',
    whyWeNeedIt: {
      realWorldProblem:
        'فرض کنید می‌خواهیم تعداد کلمات ۵ فایل کتاب یا گزارش را بشماریم؛ اگر یکی از فایل‌ها موجود نباشد، نباید پردازش ۴ فایل دیگر متوقف شود و گاهی حتی لازم نیست پیام خطا چاپ کنیم (Fail Silently).',
      analogy:
        'دستور pass در except مانند رد شدن آرام از یک دست‌انداز کوچک بدون بوق زدن و توقف است؛ ساختار بلوک حفظ می‌شود و برنامه بی‌وقفه سراغ فایل بعدی می‌رود.',
    },
    syntaxAnatomy: {
      template: `def count_words(path):\n    try:\n        contents = path.read_text()\n    except FileNotFoundError:\n        pass\n    else:\n        words = contents.split()\n        print(f"{path}: {len(words)} کلمه")`,
      parts: [
        {token: 'contents.split()', role: 'برش کل متن بر اساس فاصله و خط جدید به لیستی از کلمات.'},
        {token: 'pass', role: 'دستور خنثی (هیچ کاری نکن) برای عبور بی‌صدا از خطا بدون تولید SyntaxError.'},
        {token: 'تابع قابل استفاده مجدد', role: 'بسته‌بندی منطق شمارش در یک تابع و فراخوانی آن در حلقه روی لیست فایل‌ها.'},
      ],
    },
    behindTheScenes: [
      'در پایتون نمی‌توان بلوک except: را کاملاً خالی رها کرد (IndentationError می‌دهد)؛ دستور pass جای‌نگهدار رسمی برای زمانی است که عمداً نمی‌خواهیم در خطا کاری انجام دهیم.',
      'به جای عبور کاملاً بی‌صدا در سیستم‌های واقعی، اغلب نام فایل‌های ناموجود را در یک فایل گزارش خطا (missing_files.txt) ثبت می‌کنیم تا مدیر سیستم مطلع شود.',
      'متد split() بدون آرگومان روی هر تعداد فاصله، Tab و خط جدید (\\n) برش می‌زند و برای شمارش کلمات بسیار دقیق‌تر از split(" ") است.',
    ],
    goldenTips: [
      'اگر می‌خواهید در کارگاه کلاس هر دو حالت را مقایسه کنید، ابتدا در except بنویسید print("پیدا نشد") و سپس آن را با pass جایگزین کنید (ردیف ۴ جدول ارزشیابی ص ۲۷۳).',
    ],
    wrongVsRight: [
      {
        title: 'خالی گذاشتن بدنه except بدون pass',
        wrongCode: `except FileNotFoundError:\n    # اینجا چیزی ننوشتیم! -> IndentationError`,
        rightCode: `except FileNotFoundError:\n    pass`,
        explanation: 'پایتون پس از دونقطه حتماً به حداقل یک دستور تورفته نیاز دارد.',
      },
      {
        title: 'استفاده از split(" ") به جای split() برای شمارش کلمات چندخطی',
        wrongCode: `words = "سلام\\nدنیا".split(" ")  # ۱ عنصر برمی‌گرداند به جای ۲!`,
        rightCode: `words = "سلام\\nدنیا".split()     # ۲ کلمه دقیق برمی‌گرداند`,
        explanation: 'split() بدون آرگومان هم فاصله و هم خط جدید را جدا می‌کند.',
      },
    ],
    examples: [
      {
        id: 'ex-4-2-multi-basic',
        tier: 'basic',
        title: 'تابع شمارش کلمات یک فایل متنی با split()',
        bookPage: '۲۶۷',
        summary: 'محاسبه تعداد کلمات فایل intro.txt با استفاده از تابع count_words.',
        language: 'python',
        engine: 'python-fs',
        extraFiles: {
          'intro.txt': 'پایتون یک زبان برنامه‌نویسی قدرتمند و خوانا برای طراحی وب است.\n',
        },
        code: `from pathlib import Path

def count_words(filename):
    path = Path(filename)
    try:
        text = path.read_text()
    except FileNotFoundError:
        print(f"فایل {filename} یافت نشد.")
    else:
        words = text.split()
        print(f"فایل {filename} دارای {len(words)} کلمه است.")

count_words("intro.txt")`,
        teacherTalkingPoints: [
          'توضیح دهید قرار دادن عملیات فایل داخل تابع count_words باعث می‌شود برای هر تعداد فایل قابل تکرار باشد.',
        ],
        lineExplanations: [
          {line: 10, explanation: 'تبدیل کل متن به لیست کلمات با split().'},
        ],
        commonMistakes: ['استفاده از len(text) به جای len(text.split()) که تعداد حروف را می‌دهد نه کلمات!'],
      },
      {
        id: 'ex-4-2-multi-practical',
        tier: 'practical',
        title: 'پردازش چند فایل و عبور بی‌صدا با pass (ردیف ۴ ارزشیابی ص ۲۷۳)',
        bookPage: '۲۶۸',
        summary: 'شمارش کلمات چند فایل متوالی و رد شدن آرام از فایل مفقود بدون کرش یا شلوغ کردن خروجی.',
        language: 'python',
        engine: 'python-fs',
        extraFiles: {
          'ch1.txt': 'پودمان اول درباره متغیرها لیست‌ها شرط‌ها و حلقه‌ها در پایتون است.\n',
          'ch2.txt': 'پودمان دوم طراحی صفحات وب با HTML و CSS را آموزش می‌دهد.\n',
        },
        code: `from pathlib import Path

def count_words_silent(filename):
    path = Path(filename)
    try:
        text = path.read_text()
    except FileNotFoundError:
        pass  # عبور بی‌صدا طبق ص ۲۶۸ کتاب
    else:
        words = text.split()
        print(f"فایل {filename}: {len(words)} کلمه")

files = ["ch1.txt", "lost_file.txt", "ch2.txt"]
for f in files:
    count_words_silent(f)`,
        teacherTalkingPoints: [
          'بپرسید چرا در خروجی هیچ پیامی برای lost_file.txt چاپ نشد اما ch2.txt کامل پردازش شد؟ (به خاطر pass!).',
        ],
        lineExplanations: [
          {line: 8, explanation: 'عبور بی‌صدا از فایل مفقود بدون نمایش خطا به کاربر عادی.'},
        ],
        commonMistakes: ['نوشتن return یا break در حلقه اصلی که باعث می‌شود ch2.txt بررسی نشود.'],
      },
      {
        id: 'ex-4-2-multi-combined',
        tier: 'combined',
        title: 'شمارش جمع کل کلمات و ثبت نام فایل‌های مفقود در log.txt',
        bookPage: '۲۶۸',
        summary: 'نسخه حرفه‌ای‌تر: ذخیره نام فایل‌های پیدا نشده در یک فایل گزارش خطا.',
        language: 'python',
        engine: 'python-fs',
        extraFiles: {
          'doc1.txt': 'فایل اول شامل چند کلمه آزمایشی است.\n',
          'doc2.txt': 'فایل دوم هم برای تست شمارش کلمات آماده شده است.\n',
        },
        code: `from pathlib import Path

files = ["doc1.txt", "ghost.txt", "doc2.txt", "missing2.txt"]
total_words = 0
missing = []

for name in files:
    try:
        words = Path(name).read_text().split()
    except FileNotFoundError:
        missing.append(name)
    else:
        total_words += len(words)
        print(f"✔ {name}: {len(words)} کلمه")

if missing:
    Path("missing_log.txt").write_text("\\n".join(missing) + "\\n")

print(f"جمع کل کلمات فایل‌های سالم: {total_words}")
print("فایل‌های مفقود ثبت‌شده در missing_log.txt:", missing)`,
        teacherTalkingPoints: [
          'نشان دهید به جای پنهان کردن کامل خطا، ذخیره آن در فایل لاگ (missing_log.txt) روش استاندارد مهندسی نرم‌افزار است.',
        ],
        lineExplanations: [
          {line: 17, explanation: 'ثبت گزارش فایل‌های گم‌شده روی دیسک مجازی.'},
        ],
        commonMistakes: ['بازنویسی total_words به جای += درون حلقه.'],
      },
      {
        id: 'ex-4-2-multi-whatif',
        tier: 'what-if',
        title: 'جستجوی یک کلمه کلیدی خاص در میان چند فایل متنی',
        bookPage: '۲۶۸',
        summary: 'پیدا کردن تعداد تکرار کلمه «پایتون» در مجموعه‌ای از فایل‌های درسی.',
        language: 'python',
        engine: 'python-fs',
        extraFiles: {
          'a.txt': 'پایتون زبان ساده‌ای است. پایتون در وب کاربرد دارد.\n',
          'b.txt': 'جنگو با پایتون ساخته شده است.\n',
        },
        code: `from pathlib import Path

keyword = "پایتون"
for fname in ["a.txt", "unknown.txt", "b.txt"]:
    try:
        text = Path(fname).read_text()
    except FileNotFoundError:
        pass
    else:
        count = text.count(keyword)
        print(f"تعداد تکرار «{keyword}» در {fname}: {count} بار")`,
        teacherTalkingPoints: [
          'این مثال کاربرد واقعی موتور جستجوی ساده روی فایل‌های متنی را به دانش‌آموزان نشان می‌دهد.',
        ],
        lineExplanations: [
          {line: 10, explanation: 'متد رشته‌ای count() تعداد دفعات تکرار کلمه را می‌شمارد.'},
        ],
        commonMistakes: ['حساسیت به حروف بزرگ/کوچک در کلمات انگلیسی (در انگلیسی بهتر است ابتدا text.lower() بزنیم).'],
      },
    ],
  },

  // ==================== LESSON 5 ====================
  {
    id: 'lesson-4-2-json-dumps',
    order: 5,
    title: 'ذخیره داده‌های ساختاریافته در قالب JSON با json.dumps() (اصلاح ص ۲۷۰)',
    bookPage: '۲۶۹ تا ۲۷۱',
    whyWeNeedIt: {
      realWorldProblem:
        'اگر بخواهیم یک دیکشنری پیچیده (شامل لیست برندها، قیمت‌ها، اعداد و مقادیر بولین) را در فایل متنی ساده ذخیره کنیم، هنگام بازخوانی تمام ساختار و نوع داده‌ها از بین می‌رود! قالب JSON زبان استاندارد و مشترک کل دنیای وب برای ذخیره و تبادل داده‌های ساختاریافته بین پایتون، جاوااسکریپت و سرورهاست.',
      analogy:
        'JSON مانند بسته‌بندی استاندارد کانتینری است؛ دیکشنری پایتون را با json.dumps() به یک بسته متنی مرتب تبدیل می‌کنیم که هم روی دیسک ذخیره می‌شود و هم هر زبان دیگری (مثل JS یا Django) می‌تواند آن را بخواند.',
    },
    syntaxAnatomy: {
      template: `import json\nfrom pathlib import Path\n\ndata = {"brands": ["Samsung", "Apple"], "active": True}\njson_text = json.dumps(data, indent=4)\nPath("mobiles.json").write_text(json_text)`,
      parts: [
        {token: 'import json', role: 'وارد کردن ماژول داخلی JSON در پایتون (بدون نیاز به نصب پکیج).'},
        {token: 'json.dumps(obj, indent=4)', role: 'تبدیل شیء پایتونی به رشته JSON خوانا (حرف s یعنی String — اصلاح خلط ص ۲۷۰ کتاب!).'},
        {token: 'indent=4', role: 'چهار فاصله تورفتگی برای زیبا و خوانا شدن فایل JSON.'},
        {token: 'Path(...).write_text(...)', role: 'ذخیره رشته JSON تولیدشده درون فایل با پسوند .json.'},
      ],
    },
    behindTheScenes: [
      'تصحیح بسیار مهم ص ۲۷۰ کتاب: در متن کتاب نام json.dump() (برای نوشتن مستقیم در file object بازشده با open) و json.dumps() (تبدیل به رشته String برای استفاده همراه با Path.write_text) با هم خلط شده‌اند! وقتی با pathlib.Path کار می‌کنیم حتماً باید از json.dumps() (با s) استفاده کنیم.',
      'تبدیل خودکار نوع‌ها از پایتون به JSON را روی تخته بنویسید: dict ⟶ Object {}، list/tuple ⟶ Array []، True/False ⟶ true/false (حروف کوچک!)، None ⟶ null.',
      'در قالب JSON تمام رشته‌ها و کلیدهای دیکشنری حتماً با دابل‌کوتیشن ("...") نوشته می‌شوند (تک‌کوتیشن در JSON استاندارد غیرمجاز است).',
    ],
    goldenTips: [
      'رمز به خاطر سپردن: حرف s در انتهای dumps و loads به معنای String (رشته) است! پس Path.write_text همیشه جفتِ dumps است و Path.read_text جفتِ loads.',
      'اضافه کردن indent=4 باعث می‌شود فایل JSON در یک خط شلوغ ذخیره نشود و دانش‌آموزان ساختار درختی آن را به‌وضوح ببینند.',
    ],
    wrongVsRight: [
      {
        title: 'خلط json.dump و json.dumps هنگام کار با pathlib (ص ۲۷۰ کتاب)',
        wrongCode: `text = json.dump(data)  # TypeError: آرگومان فایل می‌خواهد!`,
        rightCode: `text = json.dumps(data, indent=4)\nPath("data.json").write_text(text)`,
        explanation: 'برای دریافت رشته و ارسال به Path.write_text فقط باید از json.dumps() استفاده کرد.',
      },
      {
        title: 'ذخیره str(dict) به جای json.dumps(dict)',
        wrongCode: `Path("a.json").write_text(str({"ok": True}))  # تک‌کوتیشن و True نامعتبر در JSON!`,
        rightCode: `Path("a.json").write_text(json.dumps({"ok": True}))  # خروجی معتبر: {"ok": true}`,
        explanation: 'خروجی str() پایتون یک JSON معتبر نیست و توسط مرورگرها و json.loads قابل خواندن نیست.',
      },
    ],
    examples: [
      {
        id: 'ex-4-2-jd-basic',
        tier: 'basic',
        title: 'تبدیل لیست برندها به رشته JSON و ذخیره در mobiles_brand.json',
        bookPage: '۲۷۰',
        summary: 'استفاده استاندارد از json.dumps() و Path.write_text() همراه با مشاهده فایل مجازی.',
        language: 'python',
        engine: 'python-fs',
        code: `import json
from pathlib import Path

brands = ["Samsung", "Apple", "Xiaomi", "Nokia"]
json_str = json.dumps(brands, indent=4)

path = Path("mobiles_brand.json")
path.write_text(json_str)

print("نوع خروجی dumps:", type(json_str))
print(path.read_text())`,
        teacherTalkingPoints: [
          'دقت کنید خروجی json.dumps از نوع str است؛ حالا روی فایل mobiles_brand.json در فایل‌سیستم مجازی کلیک کنید.',
        ],
        lineExplanations: [
          {line: 5, explanation: 'تبدیل لیست پایتون به رشته استاندارد JSON.'},
          {line: 8, explanation: 'نوشتن رشته در فایل mobiles_brand.json.'},
        ],
        commonMistakes: ['فراموش کردن حرف s در json.dumps().'],
        bookCorrection: {
          page: 270,
          issue: 'در توضیحات ص ۲۷۰ نام json.dump() به جای json.dumps() هنگام کار با Path.write_text() خلط شده بود.',
          fix: 'تفاوت دقیق dumps (رشته) با dump (فایل) شفاف و با مثال اجرایی ارائه شد.',
        },
      },
      {
        id: 'ex-4-2-jd-practical',
        tier: 'practical',
        title: 'ذخیره دیکشنری مشخصات گوشی و مشاهده تبدیل True/None به true/null',
        bookPage: '۲۷۰',
        summary: 'نمایش دقیق تبدیل انواع داده پایتون به استاندارد JSON.',
        language: 'python',
        engine: 'python-fs',
        code: `import json
from pathlib import Path

phone = {
    "brand": "Samsung",
    "model": "A55",
    "price": 19500000,
    "in_stock": True,
    "discount": None,
    "colors": ["مشکی", "آبی"]
}

path = Path("phone.json")
path.write_text(json.dumps(phone, indent=4))
print(path.read_text())`,
        teacherTalkingPoints: [
          'روی تخته مقایسه کنید: True پایتون در خروجی JSON به true و None به null تبدیل شده است!',
        ],
        lineExplanations: [
          {line: 14, explanation: 'ترکیب مستقیم dumps با write_text در یک خط تمیز.'},
        ],
        commonMistakes: ['فراموش کردن indent=4 که باعث می‌شود کل JSON در یک سطر طولانی و ناخوانا چاپ شود.'],
      },
      {
        id: 'ex-4-2-jd-combined',
        tier: 'combined',
        title: 'تبدیل فایل متنی brands.txt به فایل ساختاریافته JSON',
        bookPage: '۲۶۱ و ۲۷۰',
        summary: 'خواندن از فایل متنی با try/except، افزودن برند جدید و ذخیره گزارش JSON.',
        language: 'python',
        engine: 'python-fs',
        extraFiles: {
          'brands.txt': 'Samsung\nApple\nXiaomi\nHuawei\n',
        },
        code: `from pathlib import Path
import json

txt_path = Path("brands.txt")
try:
    raw = txt_path.read_text()
except FileNotFoundError:
    print("فایل یافت نشد!")
else:
    brands = raw.strip().splitlines()
    brands.append("Nokia")

    report = {
        "total": len(brands),
        "brands": brands,
        "updated": True
    }
    json_path = Path("mobiles_brand.json")
    json_path.write_text(json.dumps(report, indent=4))
    print("فایل JSON ساخته شد:")
    print(json_path.read_text())`,
        teacherTalkingPoints: [
          'این مثال تمام مراحل ۱ تا ۵ جدول ارزشیابی واحد ۴.۲ را یکجا به هم وصل می‌کند!',
        ],
        lineExplanations: [
          {line: 13, explanation: 'ساخت دیکشنری جامع شامل تعداد، لیست و وضعیت به‌روزرسانی.'},
        ],
        commonMistakes: ['اضافه نکردن .strip() که ممکن است رشته خالی "" در انتهای لیست برندها بگذارد.'],
      },
      {
        id: 'ex-4-2-jd-whatif',
        tier: 'what-if',
        title: 'ذخیره اطلاعات چند شیء کلاس Mobile در فایل JSON',
        bookPage: '۲۷۱',
        summary: 'چگونه اشیای شیءگرای واحد ۴.۱ را به دیکشنری تبدیل کرده و در JSON ذخیره کنیم؟',
        language: 'python',
        engine: 'python-fs',
        code: `import json
from pathlib import Path

class Mobile:
    def __init__(self, brand, price):
        self.brand = brand
        self.price = price

    def to_dict(self):
        return {"brand": self.brand, "price": self.price}

phones = [Mobile("Samsung", 19), Mobile("Xiaomi", 12)]
serialized = [p.to_dict() for p in phones]

Path("catalog.json").write_text(json.dumps(serialized, indent=2))
print(Path("catalog.json").read_text())`,
        teacherTalkingPoints: [
          'توضیح دهید json.dumps مستقیماً اشیای کلاس‌های سفارشی را نمی‌شناسد؛ پس یک متد کمکی to_dict() می‌نویسیم (دقیقاً مفهوم Serializer در وب!).',
        ],
        lineExplanations: [
          {line: 9, explanation: 'تبدیل ویژگی‌های شیء به دیکشنری استاندارد قابل ذخیره در JSON.'},
        ],
        commonMistakes: ['ارسال مستقیم لیست اشیای Mobile به json.dumps بدون تبدیل به دیکشنری.'],
      },
    ],
  },

  // ==================== LESSON 6 ====================
  {
    id: 'lesson-4-2-json-loads',
    order: 6,
    title: 'بازیابی فایل‌های JSON با json.loads() و ساخت مینی‌دیتابیس ماندگار',
    bookPage: '۲۷۱ تا ۲۷۴',
    whyWeNeedIt: {
      realWorldProblem:
        'ذخیره کردن فایل JSON تنها نیمی از مسیر است؛ وقتی کاربر فردا دوباره برنامه را باز می‌کند یا وقتی در پودمان ۵ (جنگو) پاسخ آب‌وهوای Open-Meteo را در قالب JSON دریافت می‌کنیم، باید رشته JSON را با json.loads() دوباره به دیکشنری و لیست واقعی پایتون برگردانیم تا بتوانیم روی آن محاسبه انجام دهیم.',
      analogy:
        'اگر json.dumps() بسته‌بندی وکیوم غذا برای نگهداری در فریزر باشد، json.loads() باز کردن بسته و چیدن دوباره غذا در ظرف برای مصرف فوری است!',
    },
    syntaxAnatomy: {
      template: `import json\nfrom pathlib import Path\n\ncontents = Path("mobiles.json").read_text()\ndata = json.loads(contents)\nprint(data["brands"][0])`,
      parts: [
        {token: 'json.loads(text)', role: 'تبدیل رشته JSON (String) به ساختار داده واقعی پایتون (dict، list، int، bool).'},
        {token: 'data["key"]', role: 'دسترسی مستقیم به کلیدها پس از بازیابی، دقیقاً مثل دیکشنری عادی پایتون.'},
        {token: 'چرخه ماندگاری', role: 'بررسی exists() ⟶ خواندن با loads() ⟶ تغییر داده ⟶ ذخیره دوباره با dumps().'},
      ],
    },
    behindTheScenes: [
      'اگر بدون json.loads() روی متن خوانده‌شده از فایل بنویسید contents["brands"]، پایتون خطای TypeError می‌دهد چون contents هنوز یک رشته معمولی str است نه دیکشنری!',
      'این دقیقاً همان کاری است که در پودمان ۵ (صفحه ۲۹۰ کتاب) برای استخراج دمای هوا از پاسخ JSON سرویس Open-Meteo انجام خواهیم داد: weather["current_weather"]["temperature"].',
      'با ترکیب pathlib + json.loads + json.dumps می‌توانیم یک مینی‌دیتابیس کامل برای ذخیره کاربران، لیست شهرها یا تنظیمات برنامه بسازیم.',
    ],
    goldenTips: [
      'همیشه هنگام خواندن فایل‌های JSON ابتدا وجود فایل را با try/except FileNotFoundError یا path.exists() بررسی کنید تا در اولین اجرای برنامه کرش نکند.',
      'با type(data) به کلاس نشان دهید قبل از loads نوع داده str بود و پس از loads به dict یا list تبدیل شد!',
    ],
    wrongVsRight: [
      {
        title: 'دسترسی به کلید پیش از تبدیل با json.loads()',
        wrongCode: `raw = Path("city.json").read_text()\nprint(raw["title"])  # TypeError: string indices must be integers!`,
        rightCode: `raw = Path("city.json").read_text()\ncity = json.loads(raw)\nprint(city["title"])`,
        explanation: 'read_text همیشه رشته برمی‌گرداند؛ برای دسترسی کلیدمحور حتماً باید json.loads() اجرا شود.',
      },
      {
        title: 'نبود مدیریت حالت اولین اجرا (وقتی فایل JSON هنوز ساخته نشده)',
        wrongCode: `data = json.loads(Path("user.json").read_text())  # در اجرای اول کرش می‌کند!`,
        rightCode: `path = Path("user.json")\nif path.exists():\n    data = json.loads(path.read_text())\nelse:\n    data = {"visits": 0}`,
        explanation: 'همیشه مقدار پیش‌فرض امن برای زمانی که فایل هنوز ساخته نشده در نظر بگیرید.',
      },
    ],
    examples: [
      {
        id: 'ex-4-2-jl-basic',
        tier: 'basic',
        title: 'بازیابی فایل JSON با json.loads() و بررسی تغییر نوع داده',
        bookPage: '۲۷۱',
        summary: 'خواندن فایل weather.json و استخراج نام شهر و دما از دیکشنری بازیابی‌شده.',
        language: 'python',
        engine: 'python-fs',
        extraFiles: {
          'weather.json': '{"city": "همدان", "lat": 34.7981, "lon": 48.5146, "temp": 8.6}\n',
        },
        code: `import json
from pathlib import Path

raw = Path("weather.json").read_text()
print("نوع قبل از loads:", type(raw))

data = json.loads(raw)
print("نوع بعد از loads:", type(data))
print(f"شهر: {data['city']} | عرض: {data['lat']} | دما: {data['temp']} درجه")`,
        teacherTalkingPoints: [
          'به هنرجویان بگویید این دقیقاً پل ورودی به پروژه آب‌وهوای پودمان ۵ (جنگو) است! مختصات همدان هم 34.7981 (مقدار اصلاح‌شده) است.',
        ],
        lineExplanations: [
          {line: 7, explanation: 'تبدیل رشته JSON به دیکشنری واقعی پایتون.'},
        ],
        commonMistakes: ['فراموش کردن حرف s در json.loads().'],
      },
      {
        id: 'ex-4-2-jl-practical',
        tier: 'practical',
        title: 'پردازش لیست اشیای JSON و محاسبه جمع قیمت محصولات',
        bookPage: '۲۷۲',
        summary: 'خواندن فهرست محصولات از products.json و محاسبه میانگین قیمت و کالاهای موجود.',
        language: 'python',
        engine: 'python-fs',
        extraFiles: {
          'products.json': '[{"title": "طراح سایت", "price": 45000, "in_stock": true}, {"title": "پایگاه داده", "price": 52000, "in_stock": false}, {"title": "تولید محتوا", "price": 38000, "in_stock": true}]\n',
        },
        code: `import json
from pathlib import Path

items = json.loads(Path("products.json").read_text())
total_available = 0

for book in items:
    if book["in_stock"]:
        total_available += book["price"]
        print(f"موجود: {book['title']} ({book['price']} تومان)")

print("جمع قیمت کتاب‌های موجود:", total_available, "تومان")`,
        teacherTalkingPoints: [
          'توجه کنید true با حرف کوچک در فایل JSON به‌طور خودکار در پایتون به True تبدیل شده و در if کار می‌کند!',
        ],
        lineExplanations: [
          {line: 4, explanation: 'بازیابی آرایه JSON به صورت لیست پایتونی از دیکشنری‌ها.'},
        ],
        commonMistakes: ['تلاش برای نوشتن book.price به جای book["price"] روی دیکشنری.'],
      },
      {
        id: 'ex-4-2-jl-combined',
        tier: 'combined',
        title: 'مینی‌دیتابیس ماندگار با JSON (خواندن، افزودن رکورد جدید و بازذخیره)',
        bookPage: '۲۷۲–۲۷۳',
        summary: 'الگوی کامل بارگذاری ایمن با exists()، افزودن شهر جدید و ذخیره مجدد در cities.json.',
        language: 'python',
        engine: 'python-fs',
        extraFiles: {
          'cities.json': '[{"title": "تهران", "lat": 35.6892}, {"title": "همدان", "lat": 34.7981}]\n',
        },
        code: `import json
from pathlib import Path

db_path = Path("cities.json")
if db_path.exists():
    cities = json.loads(db_path.read_text())
else:
    cities = []

cities.append({"title": "شیراز", "lat": 29.5918})
db_path.write_text(json.dumps(cities, indent=4))

print(f"تعداد کل شهرهای ذخیره‌شده: {len(cities)}")
for c in cities:
    print(f"- {c['title']} (عرض جغرافیایی: {c['lat']})")`,
        teacherTalkingPoints: [
          'دکمه «اجرا» را بزنید و سپس روی cities.json در فایل‌سیستم مجازی کلیک کنید تا اضافه شدن «شیراز» را ببینند!',
        ],
        lineExplanations: [
          {line: 5, explanation: 'بررسی وجود فایل برای جلوگیری از خطا در اجرای نخست.'},
          {line: 11, explanation: 'ذخیره فهرست به‌روزرسانی‌شده روی دیسک.'},
        ],
        commonMistakes: ['تغییر دادن لیست cities در حافظه و فراموش کردن نوشتن دوباره آن با write_text().'],
      },
      {
        id: 'ex-4-2-jl-whatif',
        tier: 'what-if',
        title: 'استخراج داده تودرتو (Nested JSON) دقیقاً شبیه پاسخ API آب‌وهوای پودمان ۵',
        bookPage: '۲۷۲ و ۲۹۰',
        summary: 'خواندن دمای صفر درجه از ساختار JSON تودرتو شبیه Open-Meteo و بررسی تفاوت 0 با None.',
        language: 'python',
        engine: 'python-fs',
        extraFiles: {
          'open_meteo.json': '{"city": "اردبیل", "current_weather": {"temperature": 0, "windspeed": 18.4}}\n',
        },
        code: `import json
from pathlib import Path

payload = json.loads(Path("open_meteo.json").read_text())
temp = payload["current_weather"]["temperature"]
wind = payload["current_weather"]["windspeed"]

if temp is not None:
    print(f"شهر {payload['city']}: دمای {temp} درجه | سرعت باد {wind} km/h")
else:
    print("اطلاعات دما در دسترس نیست.")`,
        teacherTalkingPoints: [
          'این مثال هم JSON تودرتو را آموزش می‌دهد و هم ذهن کلاس را برای باگ معروف دمای ۰ درجه در پودمان ۵ آماده می‌کند!',
        ],
        lineExplanations: [
          {line: 5, explanation: 'دسترسی دو مرحله‌ای به دیکشنری درون دیکشنری.'},
          {line: 8, explanation: 'بررسی ایمن is not None تا دمای صفر درجه نادیده گرفته نشود.'},
        ],
        commonMistakes: ['نوشتن if temp: که در دمای 0 درجه شرط را اشتباهاً False می‌کند!'],
      },
    ],
  },
];
