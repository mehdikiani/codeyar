import type {ConceptLesson} from '../../../types/curriculum.ts';

export const UNIT_1_2_LESSONS_PART_2: ConceptLesson[] = [
  // =========================================================================
  // CONCEPT 5: return vs print / None & Variable Scope
  // =========================================================================
  {
    id: 'les-1-2-return-scope',
    order: 5,
    title: 'دستور return در برابر print()، مقدار None و حوزه متغیرها (Local / Global)',
    bookPage: '۶۶ تا ۶۸',
    whyWeNeedIt: {
      realWorldProblem:
        'یکی از بزرگ‌ترین شوک‌های هنرجویان تازه‌کار این است که تابعی می‌نویسند که داخلش print(a + b) دارد، بعد سعی می‌کنند نتیجه تابع را در متغیری ذخیره کرده و با عدد دیگری جمع کنند و با خطای عجیب TypeError: unsupported operand type(s) for +: NoneType and int روبه‌رو می‌شوند! درک دقیق فرق print و return این مشکل را برای همیشه حل می‌کند.',
      analogy:
        'تابع دارای print مثل «کارمندی است که جواب را فقط با صدای بلند در اتاق اعلام می‌کند و برگه را پاره می‌کند»؛ اما تابع دارای return مثل «کارمندی است که جواب را روی یک برگه رسمی تحویل مدیر (برنامه اصلی) می‌دهد» تا در مراحل بعدی روی آن کار شود!',
    },
    syntaxAnatomy: {
      template: `def calc_total(price, qty):
    subtotal = price * qty   # متغیر محلی (Local)
    return subtotal          # خروج فوری + ارسال نتیجه

result = calc_total(45000, 3)`,
      parts: [
        {token: 'return value', role: 'اجرای تابع را همان لحظه متوقف می‌کند و مقدار value را به محل فراخوانی برمی‌گرداند.'},
        {token: 'None', role: 'خروجی پیش‌فرض هر تابعی که دستور return نداشته باشد (به معنای «هیچ‌چیز»).'},
        {token: 'subtotal (Local)', role: 'متغیر محلی فقط درون همان تابع زنده است و پس از پایان تابع از حافظه پاک می‌شود.'},
        {token: 'Global', role: 'متغیری که بیرون از همه توابع تعریف شده و همه توابع می‌توانند مقدارش را بخوانند.'},
      ],
    },
    behindTheScenes: [
      'هر خط کدی که بعد از دستور return در همان شاخه اجرا نوشته شود، «کد مرده (Unreachable Code)» است و هرگز اجرا نمی‌شود.',
      'تابعی در پایتون می‌تواند چند مقدار را هم‌زمان برگرداند (مثلاً return min_v, max_v)؛ در پشت صحنه پایتون آن‌ها را به شکل یک tuple بسته‌بندی کرده و برمی‌گرداند.',
      'تغییر دادن یک متغیر سراسری (Global) از درون تابع بدون کلیدواژه global به‌طور پیش‌فرض یک متغیر محلی همنام جدید می‌سازد و متغیر اصلی را دست نمی‌زند — این ویژگی برای جلوگیری از تداخل‌های ناخواسته طراحی شده است.',
      'در شکل ۱۴۷ ص ۶۸ کتاب قرار بود تابع اعداد ۱ تا ۵ را چاپ کند اما به اشتباه رشته "python" را چاپ می‌کرد؛ در مثال‌های زیر نسخه اصلاح‌شده را تمرین می‌کنیم.',
    ],
    goldenTips: [
      'قانون طلایی طراحی توابع: توابع محاسباتی باید return کنند (نه print)، و چاپ نهایی را به بدنه اصلی برنامه بسپارید.',
      'از تغییر متغیرهای Global درون توابع پرهیز کنید؛ به‌جای آن داده را با پارامتر وارد و با return خارج کنید.',
    ],
    wrongVsRight: [
      {
        title: 'استفاده از print به‌جای return در تابع محاسباتی',
        wrongCode: `def double(x):
    print(x * 2)
total = double(10) + 5  # خطای NoneType!`,
        rightCode: `def double(x):
    return x * 2
total = double(10) + 5  # 25`,
        explanation: 'تابع اول None برمی‌گرداند و None + 5 باعث TypeError می‌شود.',
      },
      {
        title: 'تلاش برای خواندن متغیر محلی در بیرون از تابع',
        wrongCode: `def make_tax(p):
    tax = p * 0.09
make_tax(1000)
print(tax)  # NameError!`,
        rightCode: `def make_tax(p):
    tax = p * 0.09
    return tax
print(make_tax(1000))`,
        explanation: 'متغیر tax فقط درون تابع وجود دارد؛ برای دسترسی بیرون از تابع باید آن را return کرد.',
      },
    ],
    examples: [
      {
        id: 'ex-1-2-return-basic',
        tier: 'basic',
        title: 'مقایسه زنده print در برابر return / None و حوزه Local/Global',
        bookPage: '۶۶ تا ۶۷',
        summary: 'مشاهده دقیق خروجی None در تابع بدون return در برابر امکان ادامه محاسبه روی خروجی تابع دارای return.',
        language: 'python',
        engine: 'python',
        code: `# ۱. تابع فقط چاپ‌کننده (خروجی واقعی: None)
def print_sum(a, b):
    print("چاپ داخل تابع:", a + b)

# ۲. تابع برگرداننده مقدار با return
def calc_sum(a, b):
    return a + b

r1 = print_sum(10, 20)
print("مقدار ذخیره‌شده از print_sum:", r1)

r2 = calc_sum(10, 20)
print("مقدار ذخیره‌شده از calc_sum:", r2)
print("استفاده در محاسبه بعدی (×2):", r2 * 2)

# حوزه متغیر سراسری و محلی
school = "هنرستان فنی"
def demo_scope():
    room = "کارگاه سایت"
    print("داخل تابع:", school, "-", room)

demo_scope()`,
        teacherTalkingPoints: [
          'روی خروجی r1 = None مکث کنید و بگویید این همان ریشه خطای TypeError در پروژه‌های هنرجویان است.',
        ],
        classroomQuestion: 'اگر در خط آخر بیرون از تابع بنویسیم print(room) چه خطایی نمایش داده می‌شود؟',
        lineExplanations: [
          {line: 7, explanation: 'return نتیجه را تحویل r2 می‌دهد تا بتوانیم آن را در ۲ ضرب کنیم.'},
          {line: 19, explanation: 'room متغیر محلی است اما school سراسری است و داخل تابع خوانده می‌شود.'},
        ],
        commonMistakes: ['گذاشتن print بعد از return به خیال اینکه اجرا می‌شود.'],
      },
      {
        id: 'ex-1-2-return-practical',
        tier: 'practical',
        title: 'بازگشت چند مقدار هم‌زمان (تحلیل فاکتور: مجموع، مالیات، نهایی)',
        bookPage: '۶۷ تا ۶۸',
        summary: 'بازگرداندن چند نتیجه از یک تابع در قالب تاپل و دریافت مستقیم آن‌ها با Tuple Unpacking.',
        language: 'python',
        engine: 'python',
        code: `def analyze_order(unit_price, quantity):
    subtotal = unit_price * quantity
    tax = int(subtotal * 0.09)
    total = subtotal + tax
    return subtotal, tax, total

sub, vat, payable = analyze_order(45000, 4)
print(f"جمع پایه: {sub} تومان")
print(f"مالیات ۹٪: {vat} تومان")
print(f"مبلغ قابل پرداخت: {payable} تومان")`,
        teacherTalkingPoints: [
          'نشان دهید چطور یک تابع توانست ۳ مقدار مختلف را مرتب و خوانا برگرداند.',
        ],
        lineExplanations: [
          {line: 5, explanation: 'پایتون سه متغیر را به صورت تاپل سه‌تایی برمی‌گرداند.'},
          {line: 7, explanation: 'سه متغیر sub، vat و payable هر کدام مقدار متناظر خود را دریافت می‌کنند.'},
        ],
        commonMistakes: ['عدم تطابق تعداد متغیرهای دریافتی با تعداد مقادیر برگردانده‌شده.'],
      },
      {
        id: 'ex-1-2-return-combined',
        tier: 'combined',
        title: 'خروج زودهنگام (Early Return) برای اعتبارسنجی رمز و اصلاح شکل ۱۴۷ (ص ۶۸)',
        bookPage: '۶۸',
        summary: 'استفاده از چند return در شاخه‌های شرطی برای کوتاه و خوانا کردن کد، همراه با اصلاح چاپ شمارنده ص ۶۸.',
        language: 'python',
        engine: 'python',
        code: `def check_password(pwd):
    if len(pwd) < 6:
        return "ضعیف: کمتر از ۶ کاراکتر"
    if pwd.isdigit():
        return "متوسط: فقط عدد است، حرف هم اضافه کنید"
    return "قوی: مناسب برای ثبت‌نام ✔"

for sample in ["123", "1234567", "PyWeb1405"]:
    print(f"رمز '{sample}' ← {check_password(sample)}")

# اصلاح شکل ۱۴۷ ص ۶۸ کتاب (چاپ اعداد ۱ تا ۵ به جای کلمه python)
def count_to_five():
    for i in range(1, 6):
        print(i, end=" ")
    print()

print("شمارش اصلاح‌شده ص ۶۸:", end=" ")
count_to_five()`,
        teacherTalkingPoints: [
          'بگویید در الگوی Early Return به محض اینکه شرط اول برقرار شد، تابع همان‌جا خارج می‌شود و دیگر به خطوط پایین نمی‌رسد.',
        ],
        lineExplanations: [
          {line: 3, explanation: 'خروج فوری از تابع بدون نیاز به else تو در تو.'},
          {line: 14, explanation: 'اصلاح شکل ۱۴۷ ص ۶۸: چاپ متغیر i به‌جای رشته ثابت "python".'},
        ],
        commonMistakes: ['قرار دادن return داخل حلقه for که باعث توقف حلقه در همان دور اول می‌شود!'],
        bookCorrection: {
          page: 68,
          issue: 'در شکل ۱۴۷ ص ۶۸ تابع برای چاپ اعداد ۱ تا ۵ اشتباهاً کلمه "python" را چاپ می‌کرد.',
          fix: 'چاپ متغیر شمارنده i در حلقه جایگزین شد.',
        },
      },
      {
        id: 'ex-1-2-return-whatif',
        tier: 'what-if',
        title: 'آزمایشگاه What-If: تله return زودهنگام داخل حلقه for',
        bookPage: '۶۷',
        summary: 'مقایسه دو تابع جمع لیست: یکی با return اشتباه داخل حلقه (که در دور اول می‌ایستد) و یکی با return درست بیرون حلقه.',
        language: 'python',
        engine: 'python',
        code: `def buggy_sum(nums):
    total = 0
    for n in nums:
        total += n
        return total  # اشتباه: تورفتگی داخل حلقه ← همان دور اول خارج می‌شود!

def correct_sum(nums):
    total = 0
    for n in nums:
        total += n
    return total      # استاندارد: پس از اتمام کل حلقه خارج می‌شود

data = [10, 20, 30, 40]
print("خروجی تابع اشتباه (return داخل حلقه):", buggy_sum(data))
print("خروجی تابع استاندارد (return بیرون حلقه):", correct_sum(data))`,
        teacherTalkingPoints: [
          'این مثال یکی از رایج‌ترین باگ‌های امتحانی هنرجویان را در ۵ ثانیه روی پروژکتور آشکار می‌کند.',
        ],
        lineExplanations: [
          {line: 5, explanation: 'چون return داخل حلقه است، پس از خواندن عدد اول (10) تابع فوراً متوقف می‌شود.'},
        ],
        commonMistakes: ['تورفتگی اشتباه دستور return در پایان حلقه.'],
      },
    ],
  },

  // =========================================================================
  // CONCEPT 6: Built-in Math Functions & sorted()
  // =========================================================================
  {
    id: 'les-1-2-builtins',
    order: 6,
    title: 'توابع داخلی ریاضی (abs, round, pow, max, min, sum, divmod) و مرتب‌سازی sorted()',
    bookPage: '۶۹ تا ۷۲',
    whyWeNeedIt: {
      realWorldProblem:
        'در واحد ۱.۱ برای پیدا کردن بیشترین نمره یا جمع لیست مجبور بودیم ۵ خط حلقه for بنویسیم. پایتون یک جعبه ابزار آماده از «توابع داخلی (Built-in Functions)» دارد که بدون نیاز به هیچ import اضافی، محاسبات ریاضی، آماری و مرتب‌سازی را در یک خط و با سرعت بسیار بالا انجام می‌دهند.',
      analogy:
        'توابع داخلی مثل «دکمه‌های آماده روی ماشین‌حساب مهندسی» هستند؛ لازم نیست هر بار فرمول قدرمطلق یا مرتب‌سازی را از صفر بسازید، فقط دکمه آماده‌اش را فشار می‌دهید!',
    },
    syntaxAnatomy: {
      template: `abs(-15)          # 15
round(18.678, 1)  # 18.7
pow(2, 5)         # 32
q, r = divmod(17, 5)  # (3, 2)
sorted(scores, reverse=True)`,
      parts: [
        {token: 'abs(x) / round(x, n)', role: 'قدرمطلق عدد و گرد کردن عدد اعشاری تا n رقم اعشار.'},
        {token: 'max / min / sum', role: 'بزرگ‌ترین، کوچک‌ترین و مجموع اعضای یک لیست یا چند عدد.'},
        {token: 'divmod(a, b)', role: 'خارج‌قسمت و باقیمانده تقسیم صحیح را هم‌زمان در یک تاپل (a // b, a % b) برمی‌گرداند.'},
        {token: 'sorted(list, reverse=False)', role: 'لیست جدید مرتب‌شده می‌سازد بدون اینکه لیست اصلی را خراب کند (False با F بزرگ!).'},
      ],
    },
    behindTheScenes: [
      'در جدول ۴ ص ۷۰ کتاب دو خطای چاپی وجود دارد: خروجی float(5) عدد 5.0 است (نه 5)، و Print با P بزرگ اشتباه است (درست: print).',
      'در ص ۷۲ کتاب هنگام آموزش sorted() مقدار reverse=false با f کوچک چاپ شده که در پایتون NameError می‌دهد! مقادیر منطقی همیشه True و False با حرف اول بزرگ هستند.',
      'تفاوت مهم sorted(scores) و scores.sort(): تابع sorted() لیست جدیدی برمی‌گرداند و لیست اصلی را دست‌نخورده نگه می‌دارد (و روی تاپل و مجموعه هم کار می‌کند)؛ اما متد scores.sort() خودِ لیست را درجا تغییر می‌دهد و None برمی‌گرداند.',
    ],
    goldenTips: [
      'اگر می‌خواهید لیست اصلی نمرات به هم نریزد ولی نسخه مرتب‌شده را چاپ کنید، حتماً از sorted() استفاده کنید.',
      'تابع divmod(total_minutes, 60) بهترین ابزار برای تبدیل دقیقه به ساعت و دقیقه یا ثانیه به دقیقه و ثانیه است.',
    ],
    wrongVsRight: [
      {
        title: 'نوشتن reverse=false با حرف کوچک (خطای ص ۷۲ کتاب)',
        wrongCode: `nums = [14, 19, 12]
print(sorted(nums, reverse=false))`,
        rightCode: `nums = [14, 19, 12]
print(sorted(nums, reverse=False))`,
        explanation: 'پایتون به حروف بزرگ و کوچک حساس است و فقط False با F بزرگ را می‌شناسد.',
      },
      {
        title: 'ذخیره خروجی .sort() به جای sorted()',
        wrongCode: `nums = [3, 1, 2]
new_nums = nums.sort()
print(new_nums)  # None!`,
        rightCode: `nums = [3, 1, 2]
new_nums = sorted(nums)
print(new_nums)  # [1, 2, 3]`,
        explanation: 'متد .sort() لیست را درجا مرتب می‌کند و None برمی‌گرداند؛ برای ساخت لیست جدید از sorted() استفاده کنید.',
      },
    ],
    examples: [
      {
        id: 'ex-1-2-builtins-basic',
        tier: 'basic',
        title: 'جعبه ابزار توابع داخلی ریاضی و sorted() (اصلاح ص ۷۰ و ۷۲)',
        bookPage: '۶۹ تا ۷۲',
        summary: 'اجرای تمام توابع داخلی کتاب: abs، round، pow، max، min، sum، divmod و sorted صعودی/نزولی.',
        language: 'python',
        engine: 'python',
        code: `scores = [16.5, 19.75, 14.25, 20, 17.5]

print("قدرمطلق -25:", abs(-25))
print("گرد کردن 18.678 تا ۱ رقم:", round(18.678, 1))
print("توان 2 به توان 5:", pow(2, 5))
print("اصلاح جدول ص ۷۰ ← float(5):", float(5))

q, r = divmod(135, 60)
print(f"۱۳۵ دقیقه = {q} ساعت و {r} دقیقه")

print("بیشترین:", max(scores), "| کمترین:", min(scores))
print("مجموع:", sum(scores), "| میانگین:", round(sum(scores) / len(scores), 2))

# اصلاح ص ۷۲: False و True با حرف اول بزرگ
print("مرتب صعودی:", sorted(scores, reverse=False))
print("مرتب نزولی:", sorted(scores, reverse=True))
print("لیست اصلی بدون تغییر:", scores)`,
        teacherTalkingPoints: [
          'در خط آخر نشان دهید که scores اصلی همچنان با همان ترتیب اولیه باقی مانده است.',
        ],
        classroomQuestion: 'اگر بخواهیم ۳ نمره برتر کلاس را از لیست scores استخراج کنیم، چگونه sorted() و برش [:3] را ترکیب کنیم؟',
        lineExplanations: [
          {line: 8, explanation: 'divmod(135, 60) هم‌زمان ساعت (2) و دقیقه باقی‌مانده (15) را می‌دهد.'},
          {line: 15, explanation: 'استفاده صحیح از reverse=False و reverse=True.'},
        ],
        commonMistakes: ['نوشتن reverse=false یا Print با حرف بزرگ.'],
        bookCorrection: {
          page: 72,
          issue: 'در جدول ۴ ص ۷۰ مقدار float(5) به اشتباه 5 (بدون اعشار) و Print با حرف بزرگ آمده بود و در ص ۷۲ عبارت reverse=false چاپ شده بود.',
          fix: 'تمامی مقادیر و املاها استاندارد و اجرایی شدند.',
        },
      },
      {
        id: 'ex-1-2-builtins-practical',
        tier: 'practical',
        title: 'تبدیل ثانیه فیلم آموزشی و محاسبه رتبه‌بندی نمرات کلاس',
        bookPage: '۷۱ تا ۷۲',
        summary: 'کاربرد عملی divmod برای قالب‌بندی زمان ویدیو و ترکیب sorted با برش برای اعلام ۳ نفر اول کلاس.',
        language: 'python',
        engine: 'python',
        code: `video_seconds = 385
mins, secs = divmod(video_seconds, 60)
print(f"مدت ویدیو: {mins} دقیقه و {secs} ثانیه")

exam_scores = [15, 19.5, 13, 20, 18.25, 17, 19]
top_three = sorted(exam_scores, reverse=True)[:3]
print("۳ نمره برتر کارگاه:", top_three)
print("اختلاف بهترین و ضعیف‌ترین نمره:", max(exam_scores) - min(exam_scores))`,
        teacherTalkingPoints: [
          'نشان دهید ترکیب sorted(..., reverse=True)[:3] چقدر کوتاه و حرفه‌ای ۳ نمره برتر را استخراج می‌کند.',
        ],
        lineExplanations: [
          {line: 6, explanation: 'مرتب‌سازی نزولی و سپس برش سه عضو نخست لیست.'},
        ],
        commonMistakes: ['فراموش کردن reverse=True که ۳ نمره ضعیف‌تر را برمی‌گرداند!'],
      },
      {
        id: 'ex-1-2-builtins-combined',
        tier: 'combined',
        title: 'حذف کمترین و بیشترین امتیاز داوران (میانگین ورزشی)',
        bookPage: '۷۱ تا ۷۲',
        summary: 'ترکیب sorted()، برش [1:-1]، sum()، len() و round() برای محاسبه امتیاز المپیکی بدون اثر امتیازهای پرت.',
        language: 'python',
        engine: 'python',
        code: `judge_scores = [8.5, 9.2, 6.0, 9.8, 9.0, 8.8]
ordered = sorted(judge_scores)
# حذف اولین (کمترین) و آخرین (بیشترین) امتیاز
trimmed = ordered[1:-1]
final_score = round(sum(trimmed) / len(trimmed), 2)

print("امتیازهای خام:", judge_scores)
print("پس از حذف کمترین و بیشترین:", trimmed)
print("امتیاز نهایی ورزشکار:", final_score)`,
        teacherTalkingPoints: [
          'این مثال زیبایی ترکیب مفاهیم واحد ۱.۱ (برش [1:-1]) و واحد ۱.۲ (sorted، sum، round) را به نمایش می‌گذارد.',
        ],
        lineExplanations: [
          {line: 4, explanation: 'برش [1:-1] عضو اندیس 0 و عضو آخر (-1) را کنار می‌گذارد.'},
        ],
        commonMistakes: ['نوشتن ordered[1:-2] که دو عضو از انتها حذف می‌کند.'],
      },
      {
        id: 'ex-1-2-builtins-whatif',
        tier: 'what-if',
        title: 'آزمایشگاه What-If: مرتب‌سازی رشته‌ها (حروف بزرگ پیش از کوچک)',
        bookPage: '۷۲',
        summary: 'بررسی رفتار sorted() روی رشته‌ها و مقایسه حروف بزرگ و کوچک انگلیسی در کد اسکی (ASCII).',
        language: 'python',
        engine: 'python',
        code: `words = ["python", "Django", "html", "CSS", "api"]
print("مرتب‌سازی خام (حروف بزرگ اول می‌آیند!):", sorted(words))

# تبدیل یکدست به حروف کوچک برای مرتب‌سازی الفبایی دقیق:
normalized = []
for w in words:
    normalized.append(w.lower())
print("مرتب‌سازی یکدست (حروف کوچک):", sorted(normalized))`,
        teacherTalkingPoints: [
          'توضیح دهید چون کد اسکی حروف بزرگ (65..90) کمتر از حروف کوچک (97..122) است، در مرتب‌سازی خام "CSS" و "Django" قبل از "api" قرار می‌گیرند.',
        ],
        lineExplanations: [
          {line: 2, explanation: 'نمایش تقدم حروف بزرگ انگلیسی در جدول یونیکد/اسکی.'},
        ],
        commonMistakes: ['تلاش برای مرتب‌سازی لیست مخلوط عدد و رشته مثل sorted([10, "a"]) که TypeError می‌دهد.'],
      },
    ],
  },

  // =========================================================================
  // CONCEPT 7: Modules & Methods
  // =========================================================================
  {
    id: 'les-1-2-modules-methods',
    order: 7,
    title: 'ماژول‌های استاندارد (math, random, datetime, turtle)، ماژول محلی و تفاوت تابع و متد',
    bookPage: '۷۳ تا ۷۹',
    whyWeNeedIt: {
      realWorldProblem:
        'هیچ برنامه‌نویسی در دنیا توابع جذر، تولید عدد تصادفی، تاریخ امروز یا رسم گرافیک را از صفر نمی‌نویسد؛ همچنین وقتی پروژه بزرگ می‌شود، قرار دادن هزار خط کد در یک فایل باعث آشفتگی می‌شود. ماژول‌ها (Modules) کدها را به فایل‌های منظم و قابل استفاده مجدد تقسیم می‌کنند.',
      analogy:
        'ماژول مثل «جعبه‌ابزار تخصصی» است: جعبه‌ابزار math برای ریاضی، random برای قرعه‌کشی و datetime برای تقویم. با دستور import فقط همان جعبه‌ابزاری را که امروز نیاز دارید روی میز کارتان می‌آورید!',
    },
    syntaxAnatomy: {
      template: `import math
from random import randint, choice
import my_module

text = "python"
print(len(text))     # تابع مستقل (Function)
print(text.upper())  # متد وابسته به شیء (Method)`,
      parts: [
        {token: 'import math', role: 'کل ماژول را وارد می‌کند؛ فراخوانی با پیشوند math.sqrt(16) انجام می‌شود.'},
        {token: 'from random import choice', role: 'فقط ابزار مشخصی از ماژول را مستقیماً وارد می‌کند (بدون نیاز به پیشوند random.).'},
        {token: 'import my_module', role: 'وارد کردن فایل پایتون اختصاصی خودمان (my_module.py) که در کنار فایل اصلی قرار دارد.'},
        {token: 'obj.method()', role: 'متد تابعی است که با نقطه (.) به یک شیء خاص می‌چسبد (مثل str.upper یا list.append).'},
      ],
    },
    behindTheScenes: [
      'در ص ۷۳ کتاب غلط املایی import mojvle چاپ شده است که ModuleNotFoundError می‌دهد؛ همچنین در ص ۷۸ نام متغیر your text با فاصله نوشته شده که SyntaxError است (درست: your_text).',
      'تفاوت بنیادی تابع (Function) و متد (Method): توابع مثل len(x) و print(x) مستقل هستند و روی انواع مختلف داده کار می‌کنند؛ اما متدها مثل "hi".upper() یا [1, 2].append(3) اختصاصیِ یک نوع داده هستند و با عملگر نقطه (.) صدا زده می‌شوند.',
      'ماژول turtle برای رسم گرافیک برداری به کار می‌رود و در سامانه ما بوم آفلاین آن آماده است تا در کلاس بدون نیاز به پنجره خارجی اجرا شود.',
      'در ص ۷۹ فعالیت شمارش حروف بزرگ، کوچک و ارقام آمده ولی متدهای isupper()، islower() و isdigit() معرفی نشده‌اند؛ در مثال ۳ این شکاف را کاملاً آموزش می‌دهیم.',
    ],
    goldenTips: [
      'هرگز اسم فایل پروژه خودتان را math.py یا random.py نگذارید! چون پایتون به‌جای ماژول استاندارد خودش، فایل شما را import می‌کند.',
      'در بخش فایل‌سیستم مجازی همین سامانه، می‌توانید فایل my_module.py را کنار کد اصلی ببینید و زنده ویرایش کنید.',
    ],
    wrongVsRight: [
      {
        title: 'غلط املایی نام ماژول و فاصله در نام متغیر (اصلاح ص ۷۳ و ۷۸)',
        wrongCode: `import mojvle
your text = "Python"
print(your text.upper())`,
        rightCode: `import math
your_text = "Python"
print(your_text.upper(), math.sqrt(16))`,
        explanation: 'نام ماژول باید دقیقاً درست نوشته شود و نام متغیر هرگز نباید فاصله داشته باشد.',
      },
      {
        title: 'خلط نحوه فراخوانی تابع مستقل با متد رشته',
        wrongCode: `name = "ali"
print(upper(name))
print(name.len())`,
        rightCode: `name = "ali"
print(name.upper())
print(len(name))`,
        explanation: 'upper یک متد روی رشته است (name.upper()) اما len یک تابع مستقل است (len(name)).',
      },
    ],
    examples: [
      {
        id: 'ex-1-2-modules-basic',
        tier: 'basic',
        title: 'کار با ماژول‌های استاندارد math، random و datetime',
        bookPage: '۷۳ تا ۷۶',
        summary: 'استفاده واقعی از sqrt، pi، randint، choice و datetime.now() برای محاسبات علمی و تاریخ زنده.',
        language: 'python',
        engine: 'python',
        code: `import math
import random
import datetime

print("عدد پی:", round(math.pi, 4))
print("جذر ۱۴۴:", math.sqrt(144))
print("گرد به بالا (ceil 4.2):", math.ceil(4.2))
print("گرد به پایین (floor 4.9):", math.floor(4.9))

dice = random.randint(1, 6)
prize = random.choice(["خودکار", "دفترچه", "نمره تشویقی"])
print(f"عدد تاس تصادفی: {dice} | جایزه قرعه‌کشی: {prize}")

now = datetime.datetime.now()
print(f"تاریخ سیستم: {now.year}/{now.month}/{now.day}")`,
        teacherTalkingPoints: [
          'دکمه اجرا را دو بار بزنید تا تصادفی بودن خروجی random.randint و random.choice برای کلاس ملموس شود.',
        ],
        classroomQuestion: 'تفاوت math.ceil(4.1) و round(4.1) در چیست؟',
        lineExplanations: [
          {line: 7, explanation: 'ceil همیشه به سمت عدد صحیح بالاتر (5) گرد می‌کند.'},
          {line: 10, explanation: 'randint(1, 6) شامل هر دو سر بازه ۱ و ۶ است.'},
        ],
        commonMistakes: ['فراموش کردن دستور import در ابتدای برنامه پیش از استفاده از math.sqrt.'],
        bookCorrection: {
          page: 73,
          issue: 'غلط تایپی import mojvle در ص ۷۳ کتاب.',
          fix: 'مثال کامل با ماژول‌های استاندارد math، random و datetime ارائه شد.',
        },
      },
      {
        id: 'ex-1-2-modules-practical',
        tier: 'practical',
        title: 'ساخت و فراخوانی ماژول محلی my_module.py در فایل‌سیستم مجازی',
        bookPage: '۷۴ تا ۷۵',
        summary: 'جدا کردن توابع کاربردی در فایل محلی my_module.py و فراخوانی آن‌ها در فایل اصلی برنامه.',
        language: 'python',
        engine: 'python-fs',
        extraFiles: {
          'my_module.py': `# ماژول محلی اختصاصی کلاس یازدهم
SCHOOL_NAME = "هنرستان طراح سایت ۱۴۰۵"

def greet(name):
    return f"سلام {name} عزیز! به {SCHOOL_NAME} خوش آمدی."

def calc_discount(price, percent):
    return int(price - (price * percent / 100))
`,
        },
        code: `import my_module

print("نام مدرسه از ماژول:", my_module.SCHOOL_NAME)
print(my_module.greet("امیررضا"))

final_price = my_module.calc_discount(200000, 15)
print("قیمت کتاب با ۱۵٪ تخفیف:", final_price, "تومان")`,
        teacherTalkingPoints: [
          'در پایین ویرایشگر روی فایل my_module.py کلیک کنید تا هنرجویان ببینند توابع دقیقاً در فایلی جداگانه نوشته شده‌اند.',
        ],
        lineExplanations: [
          {line: 1, explanation: 'فراخوانی فایل my_module.py از فایل‌سیستم مجازی همین پروژه.'},
          {line: 6, explanation: 'صدا زدن تابع calc_discount از داخل ماژول اختصاصی.'},
        ],
        commonMistakes: ['نوشتن پسوند .py در دستور import (نوشتن import my_module.py خطاست!).'],
      },
      {
        id: 'ex-1-2-modules-combined',
        tier: 'combined',
        title: 'متدهای رشته (upper, lower, split, replace, isupper, isdigit) + اصلاح ص ۷۸',
        bookPage: '۷۷ تا ۷۹',
        summary: 'تفکیک کامل تابع از متد و پوشش شکاف متدهای بررسی کاراکتر برای فعالیت ص ۷۹ کتاب.',
        language: 'python',
        engine: 'python',
        code: `# اصلاح ص ۷۸ کتاب: نام متغیر بدون فاصله (your_text)
your_text = "  Python Web 1405  "
cleaned = your_text.strip()

print("طول رشته (تابع مستقل len):", len(cleaned))
print("حروف بزرگ (متد upper):", cleaned.upper())
print("حروف کوچک (متد lower):", cleaned.lower())
print("جایگزینی (متد replace):", cleaned.replace("1405", "یازدهم"))
print("جداسازی کلمات (متد split):", cleaned.split(" "))

# تکمیل شکاف ص ۷۹: تشخیص نوع کاراکتر
sample = "Py14"
for ch in sample:
    print(f"کاراکتر '{ch}' → بزرگ:{ch.isupper()} | کوچک:{ch.islower()} | عدد:{ch.isdigit()}")`,
        teacherTalkingPoints: [
          'نشان دهید متدهای رشته رشته اصلی را تغییر نمی‌دهند، بلکه رشته جدیدی برمی‌گردانند (چون str تغییرناپذیر است).',
        ],
        lineExplanations: [
          {line: 3, explanation: 'strip() فاصله‌های اضافی ابتدا و انتهای رشته را پاک می‌کند.'},
          {line: 14, explanation: 'سه متد ضروری برای فعالیت تحلیل رمز عبور در ص ۷۹ کتاب.'},
        ],
        commonMistakes: ['فراموش کردن ذخیره نتیجه your_text.upper() در متغیر یا چاپ مستقیم آن.'],
        bookCorrection: {
          page: 78,
          issue: 'نام متغیر your text با فاصله چاپ شده بود و متدهای isupper/islower/isdigit برای فعالیت ص ۷۹ آموزش داده نشده بودند.',
          fix: 'نام متغیر به your_text اصلاح و هر سه متد تحلیل کاراکتر به صورت اجرایی آموزش داده شدند.',
        },
      },
      {
        id: 'ex-1-2-modules-whatif',
        tier: 'what-if',
        title: 'آزمایشگاه گرافیکی ماژول turtle: رسم مربع و ستاره رنگارنگ آفلاین',
        bookPage: '۷۶',
        summary: 'اجرای واقعی دستورات turtle (forward, right, color) همراه با حلقه for برای رسم اشکال هندسی در بوم گرافیکی.',
        language: 'python',
        engine: 'python',
        code: `import turtle

t = turtle.Turtle()
t.color("#0284c7")

# رسم مربع با حلقه for به جای تکرار ۸ خط دستور
for _ in range(4):
    t.forward(90)
    t.right(90)

t.color("#e11d48")
t.circle(45)
print("✔ رسم مربع و دایره با ماژول turtle تکمیل شد!")`,
        teacherTalkingPoints: [
          'در تب «۲. شهود بصری» نیز زبانه اختصاصی بوم گرافیکی لاک‌پشت (Turtle Canvas) برای آزمایش زنده زاویه‌ها و شکل‌ها در دسترس است.',
        ],
        lineExplanations: [
          {line: 7, explanation: 'تکرار ۴ بار حرکت به جلو و چرخش ۹۰ درجه یک مربع کامل می‌سازد.'},
          {line: 12, explanation: 'رسم دایره به شعاع ۴۵ پیکسل با رنگ قرمز.'},
        ],
        commonMistakes: ['اشتباه در محاسبه زاویه چرخش چندضلعی منتظم (فرمول صحیح: 360 / تعداد ضلع).'],
      },
    ],
  },
];
