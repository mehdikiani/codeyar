import type {ConceptLesson} from '../../../types/curriculum.ts';

/**
 * Unit 3.2 — JavaScript & DOM (Pages 192–232)
 * 6 Deep Concept Lessons × 4 Tiered Runnable Examples = 24 Examples.
 * Covers & fixes:
 * - Page 205 typo: `Let` -> `let`
 * - Page 230 critical bug: `validateForm` vs `validateform` case mismatch & `<= 6` vs `< 6`
 * - Page 232 rubric gap: `querySelector`, `querySelectorAll`, and `Array.prototype.pop()`
 */
export const UNIT_3_2_LESSONS: ConceptLesson[] = [
  // ==================== LESSON 1 ====================
  {
    id: 'lesson-3-2-vars-ops',
    order: 1,
    title: 'متغیرها (let / const)، انواع داده و مقایسه سخت‌گیرانه (===)',
    bookPage: '۱۹۲ تا ۲۰۶',
    whyWeNeedIt: {
      realWorldProblem:
        'HTML اسکلت صفحه و CSS لباس آن است، اما بدون جاوااسکریپت صفحه مانند یک مجسمه بی‌جان است! برای محاسبه قیمت سبد خرید، شمارش تعداد کلیک‌ها و بررسی ورودی کاربر به متغیرها و عملگرهای منطقی در سمت مرورگر نیاز داریم.',
      analogy:
        'متغیر let مانند یک تخته وایت‌برد است که مقدارش را می‌توان پاک کرد و دوباره نوشت (مثل مجموع سبد خرید)، اما const مانند یک پلاک حکاکی‌شده است که پس از ثبت دیگر عوض نمی‌شود (مثل نرخ مالیات ۰.۰۹).',
    },
    syntaxAnatomy: {
      template: `const taxRate = 0.09;\nlet price = 45000;\nconsole.log(price === 45000);`,
      parts: [
        {token: 'const', role: 'تعریف ثابت (Constant) که پس از مقداردهی اولیه قابل تغییر نیست.'},
        {token: 'let', role: 'تعریف متغیر مدرن با حروف کوچک (برخلاف غلط تایپی Let ص ۲۰۵ کتاب).'},
        {token: '===', role: 'مقایسه سخت‌گیرانه (مقدار + نوع داده)؛ همیشه به جای == استفاده می‌شود.'},
        {token: 'console.log(...)', role: 'چاپ پیام و مقدار متغیرها در کنسول مرورگر برای اشکال‌زدایی.'},
      ],
    },
    behindTheScenes: [
      'جاوااسکریپت به حروف بزرگ و کوچک حساس است (Case-Sensitive)؛ بنابراین کلیدواژه Let (با L بزرگ در ص ۲۰۵ کتاب) باعث SyntaxError می‌شود.',
      'عملگر == پیش از مقایسه، نوع داده‌ها را خودکار تبدیل می‌کند (Type Coercion) که خطاهای عجیبی مثل "5" == 5 (true) یا "" == 0 (true) می‌سازد؛ اما === هم مقدار و هم نوع را بدون تبدیل بررسی می‌کند.',
      'از کلیدواژه قدیمی var در کدهای مدرن ES6 پرهیز می‌کنیم زیرا دامنه بلوکی (Block Scope) ندارد و ممکن است متغیرهای همنام را ناخواسته بازنویسی کند.',
      'انواع داده پایه در JS شامل string، number (عدد صحیح و اعشاری هر دو number هستند)، boolean، undefined و null می‌باشند که با typeof بررسی می‌شوند.',
    ],
    goldenTips: [
      'قاعده طلایی حرفه‌ای‌ها: همیشه اول const بنویسید؛ فقط اگر مطمئنید مقدار بعداً تغییر می‌کند آن را به let تغییر دهید.',
      'برای ترکیب متن و متغیر از رشته‌های قالبی (Template Literals) با بک‌تیک `قیمت: ${price}` استفاده کنید که بسیار خواناتر از علامت + است.',
    ],
    wrongVsRight: [
      {
        title: 'کلیدواژه اشتباه Let در ص ۲۰۵ کتاب',
        wrongCode: `Let bookPrice = 45000;\nconsole.log(bookPrice);`,
        rightCode: `let bookPrice = 45000;\nconsole.log(bookPrice);`,
        explanation: 'تمام کلیدواژه‌های جاوااسکریپت (let، const، if، for، function) فقط با حروف کوچک معتبرند.',
      },
      {
        title: 'مقایسه سست == در برابر مقایسه سخت‌گیرانه ===',
        wrongCode: `const inputAge = "18";\nif (inputAge == 18) console.log("برابر شد!");`,
        rightCode: `const inputAge = "18";\nif (Number(inputAge) === 18) console.log("تبدیل و مقایسه دقیق!");`,
        explanation: 'عملگر === از خطاهای پنهان مقایسه رشته با عدد جلوگیری می‌کند.',
      },
    ],
    examples: [
      {
        id: 'ex-3-2-vars-basic',
        tier: 'basic',
        title: 'تعریف متغیرهای let و const و بررسی typeof (اصلاح ص ۲۰۵)',
        bookPage: '۱۹۸–۲۰۵',
        summary: 'نمایش انواع داده پایه در جاوااسکریپت و چاپ خروجی در کنسول داخلی سامانه.',
        language: 'javascript',
        engine: 'bootstrap-js',
        code: `const siteName = "مرجع نو";
let bookCount = 3;
let price = 45000;
let isAvailable = true;

console.log("فروشگاه:", siteName, "| نوع:", typeof siteName);
console.log("تعداد کتاب:", bookCount, "| نوع:", typeof bookCount);
console.log("موجود است؟", isAvailable, "| نوع:", typeof isAvailable);`,
        teacherTalkingPoints: [
          'دکمه «اجرای مجدد» را بزنید و خروجی کنسول پایین پیش‌نمایش را به کلاس نشان دهید.',
          'تأکید کنید برخلاف پایتون، در جاوااسکریپت عدد صحیح و اعشاری هر دو نوع number دارند.',
        ],
        lineExplanations: [
          {line: 1, explanation: 'نام فروشگاه تغییر نمی‌کند پس با const تعریف شده است.'},
          {line: 2, explanation: 'تعداد کتاب ممکن است تغییر کند پس با let (حرف کوچک) تعریف شده است.'},
          {line: 6, explanation: 'عملگر typeof نوع داده هر متغیر را به صورت رشته برمی‌گرداند.'},
        ],
        commonMistakes: ['نوشتن Let با حرف بزرگ مانند چاپ اشتباه ص ۲۰۵ کتاب.'],
        bookCorrection: {
          page: 205,
          issue: 'در خطوط ۱۰ تا ۱۳ ص ۲۰۵ کلیدواژه let اشتباهاً به شکل Let با L بزرگ چاپ شده است.',
          fix: 'در تمامی مثال‌ها کلیدواژه استاندارد let با حروف کوچک به کار رفته است.',
        },
      },
      {
        id: 'ex-3-2-vars-practical',
        tier: 'practical',
        title: 'محاسبه فاکتور خرید کتاب با Template Literal و مالیات ۹٪',
        bookPage: '۲۰۳',
        summary: 'استفاده از عملگرهای حسابی و رشته‌های قالبی برای محاسبه قیمت نهایی سفارش.',
        language: 'javascript',
        engine: 'bootstrap-js',
        code: `const TAX_RATE = 0.09;
let unitPrice = 45000;
let quantity = 2;

let subtotal = unitPrice * quantity;
let tax = subtotal * TAX_RATE;
let finalTotal = subtotal + tax;

console.log(\`جمع جزء: \${subtotal} تومان\`);
console.log(\`مالیات ۹٪: \${tax} تومان\`);
console.log(\`مبلغ قابل پرداخت: \${finalTotal} تومان\`);`,
        teacherTalkingPoints: [
          'علامت بک‌تیک (`) و \${...} را با f-string در پایتون مقایسه کنید تا دانش‌آموزان ارتباط پودمان ۱ و ۳ را درک کنند.',
        ],
        lineExplanations: [
          {line: 1, explanation: 'ثابت‌های قراردادی معمولاً با حروف بزرگ SNAKE_CASE نوشته می‌شوند.'},
          {line: 9, explanation: 'رشته قالبی مقدار متغیر را مستقیم درون متن قرار می‌دهد.'},
        ],
        commonMistakes: ['استفاده از کوتیشن معمولی "..." به جای بک‌تیک `...` هنگام نوشتن ${...}.'],
      },
      {
        id: 'ex-3-2-vars-combined',
        tier: 'combined',
        title: 'تبدیل نوع رشته به عدد و محاسبه تخفیف پلکانی',
        bookPage: '۲۰۶',
        summary: 'ترکیب تبدیل نوع Number()، عملگر سه‌تایی (Ternary) و مقایسه سخت‌گیرانه.',
        language: 'javascript',
        engine: 'bootstrap-js',
        code: `const rawPrice = "120000";
const couponCode = "STUDENT1405";

const numericPrice = Number(rawPrice);
const hasDiscount = couponCode === "STUDENT1405";
const discount = hasDiscount ? numericPrice * 0.15 : 0;
const payable = numericPrice - discount;

console.log("نوع قبل از تبدیل:", typeof rawPrice);
console.log("نوع بعد از تبدیل:", typeof numericPrice);
console.log("تخفیف دانش‌آموزی:", discount, "تومان");
console.log("مبلغ نهایی:", payable, "تومان");`,
        teacherTalkingPoints: [
          'بگویید مقادیر خوانده‌شده از <input> در HTML همیشه رشته (string) هستند؛ پس Number() بسیار کاربردی است.',
        ],
        lineExplanations: [
          {line: 4, explanation: 'تبدیل صریح رشته "120000" به عدد 120000.'},
          {line: 6, explanation: 'عملگر سه‌تایی ? : نسخه فشرده if/else است.'},
        ],
        commonMistakes: ['جمع زدن رشته "120000" با عدد 5000 که به جای 125000 رشته "1200005000" می‌سازد!'],
      },
      {
        id: 'ex-3-2-vars-whatif',
        tier: 'what-if',
        title: 'آزمایش شگفت‌انگیز == در برابر === و تله جمع رشته با عدد',
        bookPage: '۲۰۴',
        summary: 'مشاهده عملی خطاهای پنهان مقایسه سست == و عملگر + روی رشته‌های عددی.',
        language: 'javascript',
        engine: 'bootstrap-js',
        code: `console.log('"5" == 5  =>', "5" == 5);
console.log('"5" === 5 =>', "5" === 5);
console.log('0 == false  =>', 0 == false);
console.log('0 === false =>', 0 === false);
console.log('"10" + 5 =>', "10" + 5, "(الحاق رشته!)");
console.log('Number("10") + 5 =>', Number("10") + 5, "(جمع ریاضی!)");`,
        teacherTalkingPoints: [
          'از کلاس بپرسید قبل از اجرا حدس بزنند خروجی "10" + 5 چه می‌شود؛ بیشتر دانش‌آموزان می‌گویند 15 و با دیدن "105" شگفت‌زده می‌شوند!',
        ],
        lineExplanations: [
          {line: 1, explanation: '== رشته "5" را به عدد تبدیل کرده و true برمی‌گرداند.'},
          {line: 2, explanation: '=== نوع string و number را متفاوت تشخیص داده و false برمی‌گرداند.'},
          {line: 5, explanation: 'وقتی یک طرف + رشته باشد، جاوااسکریپت آن را چسباندن متن تلقی می‌کند.'},
        ],
        commonMistakes: ['اعتماد به == در شرط‌های احراز هویت و مقایسه قیمت‌ها.'],
      },
    ],
  },

  // ==================== LESSON 2 ====================
  {
    id: 'lesson-3-2-control-loops',
    order: 2,
    title: 'ساختارهای شرطی (if / switch) و حلقه‌های تکرار (for / while / for...of)',
    bookPage: '۲۰۷ تا ۲۱۵',
    whyWeNeedIt: {
      realWorldProblem:
        'در یک فروشگاه اینترنتی باید تصمیم بگیریم آیا ارسال رایگان است یا خیر، وضعیت سفارش را بر اساس کد نمایش دهیم، و روی ده‌ها کتاب موجود در سبد خرید یک‌به‌یک حرکت کرده و قیمتشان را جمع بزنیم.',
      analogy:
        'شرط if/else مانند دوراهی جاده است، switch مانند کلید چرخان انتخاب برنامه لباسشویی با گزینه‌های مشخص، و حلقه for مانند نوار نقاله صندوق فروشگاه است که کالاها را یکی‌یکی اسکن می‌کند.',
    },
    syntaxAnatomy: {
      template: `if (total >= 200000) {\n  console.log("ارسال رایگان");\n} else {\n  console.log("هزینه پست: ۲۵۰۰۰");\n}`,
      parts: [
        {token: '(شرط)', role: 'برخلاف پایتون، در جاوااسکریپت قرار دادن پرانتز دور شرط الزامی است.'},
        {token: '{ ... }', role: 'آکولادها محدوده بلوک کد را مشخص می‌کنند (به جای تورفتگی اجباری پایتون).'},
        {token: '&& و || و !', role: 'عملگرهای منطقی «و»، «یا» و «نقیض» (معادل and، or و not در پایتون).'},
        {token: 'break', role: 'خروج فوری از case در switch یا شکستن زودهنگام حلقه.'},
      ],
    },
    behindTheScenes: [
      'در switch اگر دستور break در انتهای هر case جا بیفتد، پدیده Fall-through رخ می‌دهد و کدهای caseهای بعدی نیز بی‌دلیل اجرا می‌شوند!',
      'حلقه for کلاسیک سه بخش دارد: مقداردهی اولیه (let i = 1)، شرط ادامه (i <= 5) و گام تغییر (i++).',
      'حلقه مدرن for (const item of array) خواناترین روش پیمایش عناصر آرایه بدون درگیر شدن با اندیس‌هاست.',
      'تورفتگی در جاوااسکریپت برای موتور اجرا اجباری نیست، اما برای خوانایی کد و اشکال‌زدایی کاملاً ضروری است.',
    ],
    goldenTips: [
      'برای شرط‌های چندحالته روی یک متغیر ثابت (مثل نقش کاربر یا روز هفته)، switch خواناتر از زنجیره طولانی else if است.',
      'در حلقه while حتماً مطمئن شوید متغیر شرط داخل حلقه تغییر می‌کند تا مرورگر در حلقه بی‌نهایت قفل نشود.',
    ],
    wrongVsRight: [
      {
        title: 'فراموش کردن break در switch',
        wrongCode: `switch (grade) {\n  case "A": console.log("عالی");\n  case "B": console.log("خوب");\n}`,
        rightCode: `switch (grade) {\n  case "A": console.log("عالی"); break;\n  case "B": console.log("خوب"); break;\n  default: console.log("نامشخص");\n}`,
        explanation: 'بدون break پس از چاپ «عالی»، جمله «خوب» هم ناخواسته چاپ می‌شود.',
      },
      {
        title: 'استفاده از and به جای && در جاوااسکریپت',
        wrongCode: `if (age >= 15 and hasCard) { console.log("مجاز"); }`,
        rightCode: `if (age >= 15 && hasCard) { console.log("مجاز"); }`,
        explanation: 'هنرجویانی که از پایتون می‌آیند اغلب and/or می‌نویسند؛ در JS باید از && و || استفاده کرد.',
      },
    ],
    examples: [
      {
        id: 'ex-3-2-ctrl-basic',
        tier: 'basic',
        title: 'شرط if / else if / else برای دسته‌بندی نمره',
        bookPage: '۲۰۸',
        summary: 'بررسی سطح شایستگی هنرجو بر اساس نمره با عملگرهای && و ساختار شرطی.',
        language: 'javascript',
        engine: 'bootstrap-js',
        code: `const score = 18.5;

if (score >= 18 && score <= 20) {
  console.log("شایستگی: عالی (نمره ۳)");
} else if (score >= 14) {
  console.log("شایستگی: قابل قبول (نمره ۲)");
} else if (score >= 0) {
  console.log("شایستگی: نیازمند تمرین بیشتر (نمره ۱)");
} else {
  console.log("نمره نامعتبر است!");
}`,
        teacherTalkingPoints: [
          'مقدار score را به ۲۱ یا ۱۰ تغییر دهید و دوباره اجرا کنید تا تمام شاخه‌ها بررسی شوند.',
        ],
        lineExplanations: [
          {line: 3, explanation: 'بررسی هم‌زمان دو شرط با عملگر منطقی &&.'},
          {line: 5, explanation: 'به جای elif پایتون در جاوااسکریپت از else if استفاده می‌شود.'},
        ],
        commonMistakes: ['نوشتن elif به جای else if یا جا انداختن پرانتز دور شرط.'],
      },
      {
        id: 'ex-3-2-ctrl-practical',
        tier: 'practical',
        title: 'ساختار switch برای نمایش وضعیت ارسال سفارش کتاب',
        bookPage: '۲۱۰',
        summary: 'ترجمه کد وضعیت سفارش به پیام فارسی مناسب کاربر با switch و default.',
        language: 'javascript',
        engine: 'bootstrap-js',
        code: `const orderStatus = "shipped";

switch (orderStatus) {
  case "pending":
    console.log("وضعیت: در انتظار پرداخت");
    break;
  case "processing":
    console.log("وضعیت: در حال بسته‌بندی در انبار مرجع نو");
    break;
  case "shipped":
    console.log("وضعیت: تحویل به پست پیشتاز داده شد");
    break;
  default:
    console.log("وضعیت نامشخص است");
}`,
        teacherTalkingPoints: [
          'یک بار break زیر case "shipped" را پاک کنید تا خطای Fall-through را زنده در کنسول ببینند.',
        ],
        lineExplanations: [
          {line: 3, explanation: 'مقدار متغیر orderStatus با هر case به‌صورت === مقایسه می‌شود.'},
          {line: 13, explanation: 'بخش default زمانی اجرا می‌شود که هیچ caseای منطبق نباشد.'},
        ],
        commonMistakes: ['حذف break و اجرای ناخواسته شاخه‌های بعدی.'],
      },
      {
        id: 'ex-3-2-ctrl-combined',
        tier: 'combined',
        title: 'حلقه‌های for و while برای جدول ضرب و شمارش معکوس',
        bookPage: '۲۱۲–۲۱۴',
        summary: 'استفاده از حلقه for برای چاپ مضرب‌های ۵ و حلقه while برای شمارش معکوس تخفیف.',
        language: 'javascript',
        engine: 'bootstrap-js',
        code: `console.log("--- جدول ضرب عدد ۵ ---");
for (let i = 1; i <= 5; i++) {
  console.log(\`5 × \${i} = \${5 * i}\`);
}

console.log("--- شمارش معکوس شروع حراج ---");
let seconds = 3;
while (seconds > 0) {
  console.log(\`\${seconds} ثانیه تا شروع...\`);
  seconds--;
}
console.log("حراج کتاب آغاز شد!");`,
        teacherTalkingPoints: [
          'عملگر i++ (افزایش یک‌واحدی) و seconds-- (کاهش یک‌واحدی) را روی تخته توضیح دهید.',
        ],
        lineExplanations: [
          {line: 2, explanation: 'متغیر i از ۱ تا ۵ با گام ۱ حرکت می‌کند.'},
          {line: 10, explanation: 'کاهش seconds مانع ایجاد حلقه بی‌نهایت می‌شود.'},
        ],
        commonMistakes: ['نوشتن ویرگول به جای سمی‌کالن داخل پرانتز for (مثلاً for (let i=0, i<5, i++)).'],
      },
      {
        id: 'ex-3-2-ctrl-whatif',
        tier: 'what-if',
        title: 'مقایسه break و continue در پردازش کدهای تخفیف',
        bookPage: '۲۱۵',
        summary: 'تفاوت پرش از یک دور حلقه (continue) با خروج کامل از حلقه (break).',
        language: 'javascript',
        engine: 'bootstrap-js',
        code: `const prices = [45000, -1000, 38000, 0, 52000];

for (const p of prices) {
  if (p < 0) {
    console.warn("قیمت منفی نادیده گرفته شد:", p);
    continue; // فقط همین دور را رد کن
  }
  if (p === 0) {
    console.log("به علامت پایان (صفر) رسیدیم؛ توقف حلقه!");
    break; // خروج کامل از حلقه
  }
  console.log("قیمت ثبت‌شده:", p, "تومان");
}`,
        teacherTalkingPoints: [
          'بپرسید چرا عدد 52000 اصلاً چاپ نشد؟ (چون هنگام رسیدن به 0 دستور break کل حلقه را متوقف کرد).',
        ],
        lineExplanations: [
          {line: 6, explanation: 'continue به ابتدای دور بعدی حلقه می‌پرد.'},
          {line: 10, explanation: 'break حلقه را کاملاً می‌شکند و 52000 بررسی نمی‌شود.'},
        ],
        commonMistakes: ['اشتباه گرفتن اثر continue و break روی عناصر باقی‌مانده آرایه.'],
      },
    ],
  },

  // ==================== LESSON 3 ====================
  {
    id: 'lesson-3-2-arrays-objects',
    order: 3,
    title: 'آرایه‌ها (push / pop) و اشیا (Objects) — مدل‌سازی سبد خرید',
    bookPage: '۲۱۶ تا ۲۲۲ (تکمیل شکاف pop ص ۲۳۲)',
    whyWeNeedIt: {
      realWorldProblem:
        'هر کتاب در فروشگاه چندین ویژگی هم‌زمان دارد (عنوان، نویسنده، قیمت، موجودی) و سبد خرید کاربر فهرستی از ده‌ها کتاب است. ذخیره این داده‌ها در متغیرهای جداگانه غیرممکن است؛ پس از آرایه‌ها و اشیا استفاده می‌کنیم.',
      analogy:
        'آرایه مانند قفسه شماره‌گذاری‌شده کتابخانه (از ۰ تا n-1) است و شیء (Object) مانند کارت مشخصات یک کتاب است که هر برچسب (کلید) مقدار مخصوص به خود را دارد.',
    },
    syntaxAnatomy: {
      template: `const book = { title: "طراح سایت", price: 45000 };\nconst cart = [book];\ncart.push({ title: "پایگاه داده", price: 52000 });\ncart.pop();`,
      parts: [
        {token: '[ ... ]', role: 'ساخت آرایه (Array) با اندیس عددی شروع از ۰.'},
        {token: '{ key: value }', role: 'ساخت شیء (Object) شامل جفت‌های کلید و مقدار.'},
        {token: '.push(item)', role: 'افزودن عنصر جدید به انتهای آرایه.'},
        {token: '.pop()', role: 'حذف و برگرداندن آخرین عنصر آرایه (الزامی در جدول ارزشیابی ص ۲۳۲).'},
      ],
    },
    behindTheScenes: [
      'توجه مهم برای هنرآموز: در جدول ارزشیابی ص ۲۳۲ کتاب، مهارت استفاده از متد pop() نمره‌گذاری شده اما در متن اصلی تدریس نشده است؛ حتماً در کلاس آن را در کنار push() تمرین کنید.',
      'حتی وقتی آرایه یا شیء با const تعریف شود، می‌توان عناصر داخل آن را با push/pop یا تغییر ویژگی‌ها ویرایش کرد؛ const فقط مانع نسبت دادن یک آرایه یا شیء جدید به همان نام متغیر می‌شود.',
      'دسترسی به ویژگی‌های شیء هم با نقطه (book.title) و هم با براکت (book["title"]) ممکن است.',
      'آرایه از اشیا (Array of Objects) رایج‌ترین ساختار داده در کل دنیای وب و خروجی تمام APIهای JSON است.',
    ],
    goldenTips: [
      'متد pop() نه تنها آخرین عنصر را حذف می‌کند، بلکه مقدار حذف‌شده را هم برمی‌گرداند تا بتوانید نامش را به کاربر اعلام کنید.',
      'از ویژگی array.length برای دانستن تعداد عناصر و از array[array.length - 1] برای دیدن آخرین عنصر بدون حذف آن استفاده کنید.',
    ],
    wrongVsRight: [
      {
        title: 'استفاده از اندیس منفی مثل پایتون در آرایه جاوااسکریپت',
        wrongCode: `const books = ["HTML", "CSS", "JS"];\nconsole.log(books[-1]); // undefined!`,
        rightCode: `const books = ["HTML", "CSS", "JS"];\nconsole.log(books[books.length - 1]); // یا books.at(-1)`,
        explanation: 'در جاوااسکریپت اندیس [-1] عنصر آخر را برنمی‌گرداند و undefined می‌دهد! باید از length - 1 یا متد مدرن at(-1) استفاده کرد.',
      },
      {
        title: 'فراموش کردن ویرگول بین ویژگی‌های شیء',
        wrongCode: `const user = {\n  name: "علی"\n  grade: 11\n};`,
        rightCode: `const user = {\n  name: "علی",\n  grade: 11\n};`,
        explanation: 'بین هر دو ویژگی شیء حتماً باید علامت کاما (,) قرار گیرد.',
      },
    ],
    examples: [
      {
        id: 'ex-3-2-arr-basic',
        tier: 'basic',
        title: 'ساخت آرایه کتاب‌ها و کار با push() و pop() (تکمیل ص ۲۳۲)',
        bookPage: '۲۱۶ و ۲۳۲',
        summary: 'افزودن، خواندن طول آرایه و حذف آخرین عنصر با متد pop().',
        language: 'javascript',
        engine: 'bootstrap-js',
        code: `const books = ["پایتون پایه", "HTML5 معنایی", "CSS3 مدرن"];
console.log("فهرست اولیه:", books);

books.push("جاوااسکریپت و DOM");
console.log("بعد از push:", books, "| تعداد:", books.length);

const removedBook = books.pop();
console.log("کتاب حذف‌شده با pop:", removedBook);
console.log("فهرست نهایی:", books);`,
        teacherTalkingPoints: [
          'یادآوری کنید متد pop() در جدول ارزشیابی پایان فصل (ص ۲۳۲) جزو معیارهای نمره‌دهی است.',
        ],
        lineExplanations: [
          {line: 4, explanation: 'push کتاب جدید را به انتهای آرایه اضافه می‌کند.'},
          {line: 7, explanation: 'pop آخرین عنصر را حذف کرده و داخل removedBook ذخیره می‌کند.'},
        ],
        commonMistakes: ['تصور اینکه pop() کل آرایه را پاک می‌کند یا عنصر اول را حذف می‌کند (حذف عنصر اول با shift است).'],
      },
      {
        id: 'ex-3-2-arr-practical',
        tier: 'practical',
        title: 'تعریف شیء کتاب (Object) و افزودن متد به آن',
        bookPage: '۲۲۰',
        summary: 'ساخت شیء با ویژگی‌های متعدد و یک متد داخلی با استفاده از کلمه کلیدی this.',
        language: 'javascript',
        engine: 'bootstrap-js',
        code: `const textbook = {
  title: "طراح سایت ۱۴۰۵",
  grade: 11,
  price: 45000,
  inStock: true,
  describe() {
    return \`کتاب «\${this.title}» پایه \${this.grade} — قیمت: \${this.price} تومان\`;
  }
};

console.log(textbook.describe());
textbook.price = 48000;
console.log("پس از به‌روزرسانی قیمت:", textbook.describe());`,
        teacherTalkingPoints: [
          'کلمه this در جاوااسکریپت را با self در پایتون مقایسه کنید (پیش‌زمینه عالی برای پودمان ۴!).',
        ],
        lineExplanations: [
          {line: 6, explanation: 'تعریف متد describe درون شیء textbook.'},
          {line: 7, explanation: 'this به خود شیء textbook اشاره می‌کند.'},
        ],
        commonMistakes: ['فراموش کردن this هنگام دسترسی به title یا price درون متد شیء.'],
      },
      {
        id: 'ex-3-2-arr-combined',
        tier: 'combined',
        title: 'سبد خرید هوشمند (آرایه از اشیا + محاسبه جمع و فیلتر)',
        bookPage: '۲۲۱',
        summary: 'ترکیب آرایه، شیء و حلقه for...of برای محاسبه جمع کل و پیدا کردن گران‌ترین کتاب.',
        language: 'javascript',
        engine: 'bootstrap-js',
        code: `const cart = [
  { title: "طراح سایت یازدهم", price: 45000, qty: 2 },
  { title: "تولید محتوای دهم", price: 38000, qty: 1 },
  { title: "پایگاه داده دوازدهم", price: 52000, qty: 1 }
];

let grandTotal = 0;
let mostExpensive = cart[0];

for (const item of cart) {
  const rowTotal = item.price * item.qty;
  grandTotal += rowTotal;
  if (item.price > mostExpensive.price) {
    mostExpensive = item;
  }
  console.log(\`- \${item.title} (×\${item.qty}): \${rowTotal} تومان\`);
}

console.log("مجموع نهایی سبد:", grandTotal, "تومان");
console.log("گران‌ترین عنوان:", mostExpensive.title);`,
        teacherTalkingPoints: [
          'نشان دهید الگوریتم پیدا کردن بیشینه (mostExpensive) دقیقاً همان منطقی است که در پایتون یاد گرفتند، فقط با سینتکس JS!',
        ],
        lineExplanations: [
          {line: 10, explanation: 'در هر دور، item یکی از اشیای داخل آرایه cart است.'},
          {line: 11, explanation: 'محاسبه جمع هر ردیف از ضرب قیمت واحد در تعداد.'},
        ],
        commonMistakes: ['نوشتن cart.price به جای item.price (چون cart آرایه است نه یک کتاب).'],
      },
      {
        id: 'ex-3-2-arr-whatif',
        tier: 'what-if',
        title: 'تفاوت کپی سطحی (مرجع مشترک) و کپی مستقل با Spread (...)',
        bookPage: '۲۱۹',
        summary: 'چرا نوشتن const b = a در آرایه‌ها هر دو را هم‌زمان تغییر می‌دهد و راه حل استاندارد چیست؟',
        language: 'javascript',
        engine: 'bootstrap-js',
        code: `const original = ["HTML", "CSS"];
const wrongCopy = original; // اشاره به همان خانه حافظه!
wrongCopy.push("BUG");
console.log("آرایه اصلی پس از کپی اشتباه:", original);

const safeCopy = [...original]; // کپی مستقل با عملگر Spread
safeCopy.push("JavaScript");
console.log("اصلی دست‌نخورده ماند:", original);
console.log("کپی مستقل:", safeCopy);`,
        teacherTalkingPoints: [
          'این مثال یکی از بهترین ابزارها برای توضیح تفاوت نوع‌های اولیه و ارجاعی در حافظه است.',
        ],
        lineExplanations: [
          {line: 2, explanation: 'wrongCopy فقط نام دوم برای همان آرایه در حافظه است.'},
          {line: 6, explanation: 'عملگر [...] یک آرایه کاملاً جدید و مستقل می‌سازد.'},
        ],
        commonMistakes: ['انتصاب مستقیم آرایه به متغیر دیگر با تصور ایجاد نسخه پشتیبان.'],
      },
    ],
  },

  // ==================== LESSON 4 ====================
  {
    id: 'lesson-3-2-funcs-classes',
    order: 4,
    title: 'توابع (Function / Arrow)، اشیای داخلی (Math / String) و کلاس ES6',
    bookPage: '۲۲۲ تا ۲۲۶',
    whyWeNeedIt: {
      realWorldProblem:
        'تکرار فرمول محاسبه تخفیف، پاک‌سازی فاصله‌های اضافی نام کاربری، تولید عدد تصادفی برای کد پیگیری و ساخت ده‌ها شیء محصول با قالب یکسان بدون توابع، اشیای داخلی و کلاس‌های ES6 باعث طولانی و پرخطا شدن کد می‌شود.',
      analogy:
        'تابع مانند یک دستگاه آبمیوه‌گیری است که میوه (ورودی) می‌گیرد و آبمیوه (return) تحویل می‌دهد؛ کلاس ES6 نیز مانند قالب کیک‌پزی است که هر بار با new از آن یک محصول تازه با ساختار یکسان تولید می‌کنیم.',
    },
    syntaxAnatomy: {
      template: `function calcDiscount(price, percent = 10) {\n  return price - (price * percent) / 100;\n}\nclass Book {\n  constructor(title, price) { this.title = title; this.price = price; }\n}`,
      parts: [
        {token: 'function name(...)', role: 'تعریف تابع با ورودی‌ها و مقدار پیش‌فرض پارامتر.'},
        {token: '=> (Arrow)', role: 'نوشتار فشرده و مدرن توابع در ES6 مثل const double = x => x * 2.'},
        {token: 'Math / String', role: 'اشیای داخلی آماده مثل Math.floor، Math.random، trim و toLowerCase.'},
        {token: 'class & constructor', role: 'الگوی شیءگرایی ES6 برای ساخت اشیای مشابه با کلیدواژه new.'},
      ],
    },
    behindTheScenes: [
      'اگر تابعی دستور return نداشته باشد، مقدار خروجی آن به‌طور خودکار undefined خواهد بود.',
      'متد Math.random() عددی اعشاری بین 0 (شامل) و 1 (ناشامل) تولید می‌کند؛ برای عدد صحیح بین min تا max از Math.floor(Math.random() * (max - min + 1)) + min استفاده می‌کنیم.',
      'رشته‌ها در جاوااسکریپت تغییرناپذیرند (Immutable)؛ متدهایی مثل trim() یا toUpperCase() رشته اصلی را عوض نمی‌کنند بلکه یک رشته جدید برمی‌گردانند.',
      'در کلاس‌های ES6 متد سازنده همیشه نام ثابت constructor دارد (معادل __init__ در پایتون که در پودمان ۴ خواهیم دید).',
    ],
    goldenTips: [
      'همیشه پیش از بررسی نام کاربری یا ایمیل، متد .trim() را صدا بزنید تا فاصله‌های تصادفی ابتدا و انتها حذف شوند.',
      'از نام‌های فعلی و گویا برای توابع استفاده کنید: calculateTotal، formatPrice، isValidPassword.',
    ],
    wrongVsRight: [
      {
        title: 'فراموش کردن کلمه کلیدی new هنگام ساخت نمونه از کلاس',
        wrongCode: `const b1 = Book("طراح سایت", 45000); // TypeError!`,
        rightCode: `const b1 = new Book("طراح سایت", 45000);`,
        explanation: 'ساخت شیء از کلاس ES6 حتماً نیازمند کلیدواژه new است (برخلاف پایتون که new ندارد).',
      },
      {
        title: 'چاپ نتیجه با console.log به جای return در تابع محاسباتی',
        wrongCode: `function add(a, b) { console.log(a + b); }\nconst sum = add(5, 3); // undefined!`,
        rightCode: `function add(a, b) { return a + b; }\nconst sum = add(5, 3); // 8`,
        explanation: 'console.log فقط روی صفحه چاپ می‌کند و مقداری به برنامه برنمی‌گرداند.',
      },
    ],
    examples: [
      {
        id: 'ex-3-2-fn-basic',
        tier: 'basic',
        title: 'توابع معمولی و توابع پیکانی (Arrow Functions) با مقدار پیش‌فرض',
        bookPage: '۲۲۲',
        summary: 'مقایسه نوشتار تابع کلاسیک و تابع پیکانی برای محاسبه قیمت با تخفیف.',
        language: 'javascript',
        engine: 'bootstrap-js',
        code: `function applyDiscount(price, percent = 10) {
  return price - (price * percent) / 100;
}

const formatToman = (amount) => \`\${Math.round(amount)} تومان\`;

console.log("با تخفیف پیش‌فرض ۱۰٪:", formatToman(applyDiscount(50000)));
console.log("با تخفیف ۲۵٪:", formatToman(applyDiscount(80000, 25)));`,
        teacherTalkingPoints: [
          'توضیح دهید وقتی بدنه تابع پیکانی یک عبارت واحد است، نیازی به آکولاد و کلمه return نیست.',
        ],
        lineExplanations: [
          {line: 1, explanation: 'پارامتر percent مقدار پیش‌فرض 10 دارد.'},
          {line: 5, explanation: 'تابع پیکانی تک‌خطی با return ضمنی.'},
        ],
        commonMistakes: ['نوشتن آکولاد در Arrow Function و فراموش کردن return داخل آن.'],
      },
      {
        id: 'ex-3-2-fn-practical',
        tier: 'practical',
        title: 'اشیای داخلی String و Math برای نرمال‌سازی ورودی و کد پیگیری',
        bookPage: '۲۲۴',
        summary: 'پاک‌سازی نام کاربری با trim/toLowerCase و ساخت کد سفارش ۴ رقمی با Math.random.',
        language: 'javascript',
        engine: 'bootstrap-js',
        code: `const rawEmail = "   Ali.Rezaei@School.IR   ";
const cleanEmail = rawEmail.trim().toLowerCase();
const isSchoolMail = cleanEmail.endsWith(".ir");

const trackingCode = Math.floor(Math.random() * 9000) + 1000;

console.log("ایمیل خام:", \`"\${rawEmail}"\`);
console.log("ایمیل استاندارد:", cleanEmail);
console.log("دامنه ایرانی؟", isSchoolMail);
console.log("کد پیگیری تصادفی:", \`MN-\${trackingCode}\`);`,
        teacherTalkingPoints: [
          'چند بار «اجرای مجدد» را بزنید تا تغییر کد پیگیری تصادفی دیده شود.',
        ],
        lineExplanations: [
          {line: 2, explanation: 'زنجیره کردن دو متد String برای حذف فاصله و کوچک کردن حروف.'},
          {line: 5, explanation: 'تولید عدد صحیح تصادفی بین 1000 تا 9999.'},
        ],
        commonMistakes: ['فراموش کردن ذخیره خروجی trim() در متغیر جدید.'],
      },
      {
        id: 'ex-3-2-fn-combined',
        tier: 'combined',
        title: 'تعریف کلاس ES6 برای محصولات فروشگاه «مرجع نو»',
        bookPage: '۲۲۵',
        summary: 'ساخت کلاس Product با constructor، متد محاسبه تخفیف و ساخت چند نمونه با new.',
        language: 'javascript',
        engine: 'bootstrap-js',
        code: `class Product {
  constructor(title, price, stock) {
    this.title = title;
    this.price = price;
    this.stock = stock;
  }

  sell(qty) {
    if (qty > this.stock) {
      return \`موجودی «\${this.title}» کافی نیست!\`;
    }
    this.stock -= qty;
    return \`فروش \${qty} عدد از «\${this.title}» ثبت شد. باقی‌مانده: \${this.stock}\`;
  }
}

const p1 = new Product("طراح سایت یازدهم", 45000, 10);
const p2 = new Product("شبکه دوازدهم", 60000, 2);

console.log(p1.sell(3));
console.log(p2.sell(5));`,
        teacherTalkingPoints: [
          'این مثال دقیقاً با معیار ردیف ۴ جدول ارزشیابی (ص ۲۳۲: کلاس ES6) هم‌راستا است.',
        ],
        lineExplanations: [
          {line: 2, explanation: 'سازنده کلاس که هنگام فراخوانی new اجرا می‌شود.'},
          {line: 8, explanation: 'متد sell موجودی کالا را بررسی و به‌روزرسانی می‌کند.'},
        ],
        commonMistakes: ['گذاشتن کلمه function قبل از متدهای داخل class (در کلاس‌ها کلمه function نوشته نمی‌شود).'],
      },
      {
        id: 'ex-3-2-fn-whatif',
        tier: 'what-if',
        title: 'متدهای آرایه (map / filter) برای فیلتر کتاب‌های زیر ۵۰ هزار تومان',
        bookPage: '۲۲۴',
        summary: 'نمایش قدرت ترکیب Arrow Function با متدهای مدرن آرایه در جاوااسکریپت.',
        language: 'javascript',
        engine: 'bootstrap-js',
        code: `const catalog = [
  { title: "طراح سایت", price: 45000 },
  { title: "تولید محتوا", price: 38000 },
  { title: "پایگاه داده", price: 65000 }
];

const affordable = catalog.filter(b => b.price < 50000);
const titles = affordable.map(b => b.title);

console.log("تعداد کتاب‌های اقتصادی:", affordable.length);
console.log("عناوین:", titles.join(" ، "));`,
        teacherTalkingPoints: [
          'نشان دهید در ۲ خط کوتاه بدون حلقه for، هم فیلتر انجام شد و هم استخراج عناوین!',
        ],
        lineExplanations: [
          {line: 7, explanation: 'filter فقط عناصری را نگه می‌دارد که شرط برایشان true باشد.'},
          {line: 8, explanation: 'map هر شیء را به رشته عنوانش تبدیل می‌کند.'},
        ],
        commonMistakes: ['تصور اینکه filter آرایه اصلی catalog را تغییر می‌دهد (آرایه جدیدی برمی‌گرداند).'],
      },
    ],
  },

  // ==================== LESSON 5 ====================
  {
    id: 'lesson-3-2-dom',
    order: 5,
    title: 'دستکاری زنده DOM (getElementById, querySelector, classList, createElement)',
    bookPage: '۲۲۶ تا ۲۲۸ (تکمیل شکاف querySelector ص ۲۳۲)',
    whyWeNeedIt: {
      realWorldProblem:
        'چاپ کردن در console فقط به درد برنامه‌نویس می‌خورد؛ کاربر عادی هرگز کنسول را باز نمی‌کند! برای تغییر متن صفحه، تغییر رنگ دکمه‌ها، افزودن آیتم به سبد خرید و نشان دادن پیام خطا باید مستقیماً عناصر HTML را از طریق DOM تغییر دهیم.',
      analogy:
        'DOM (مدل شیءگرای سند) مانند درخت شجره‌نامه صفحه وب است؛ document ریشه این درخت است و جاوااسکریپت با ابزارهای انتخابگر، شاخه مورد نظر را پیدا کرده و برگ‌هایش را زنده تغییر می‌دهد.',
    },
    syntaxAnatomy: {
      template: `const titleEl = document.querySelector("#pageTitle");\ntitleEl.textContent = "عنوان جدید";\ntitleEl.classList.add("text-success");`,
      parts: [
        {token: 'document.getElementById("id")', role: 'انتخاب سریع یک عنصر فقط از روی شناسه id (بدون علامت #).'},
        {token: 'document.querySelector("sel")', role: 'انتخاب اولین عنصر با هر انتخابگر CSS (#id، .class، tag) — الزامی در ارزشیابی ص ۲۳۲.'},
        {token: 'document.querySelectorAll("sel")', role: 'انتخاب تمام عناصر منطبق در قالب یک فهرست قابل پیمایش.'},
        {token: '.textContent / .classList', role: 'تغییر ایمن متن و افزودن/حذف کلاس‌های CSS و بوت‌استرپ.'},
      ],
    },
    behindTheScenes: [
      'مهم‌ترین نکته امنیتی: برای تغییر متن ساده همیشه textContent را به innerHTML ترجیح دهید؛ چون innerHTML کدهای HTML/Script تزریق‌شده را اجرا می‌کند و حفره امنیتی XSS می‌سازد.',
      'تفاوت نحوی بسیار مهم: در getElementById("msg") علامت # نمی‌گذاریم، اما در querySelector("#msg") گذاشتن # اجباری است!',
      'برای افزودن عناصر کاملاً جدید (مثل اضافه کردن کتاب تازه به لیست سبد خرید)، از document.createElement("li") و parent.appendChild(li) استفاده می‌کنیم.',
      'تگ <script> باید در انتهای <body> قرار گیرد تا هنگام اجرای querySelector، عناصر HTML قبلاً توسط مرورگر ساخته شده باشند و خروجی null نشود.',
    ],
    goldenTips: [
      'اگر خطای Cannot read properties of null دیدید، ۹۹٪ یا id را اشتباه تایپ کرده‌اید یا اسکریپت قبل از ساخته شدن HTML اجرا شده است.',
      'برای تغییر ظاهر عناصر، به‌جای نوشتن ده‌ها خط element.style.* بهتر است یک کلاس آماده را با classList.toggle() اضافه یا حذف کنید.',
    ],
    wrongVsRight: [
      {
        title: 'گذاشتن علامت # داخل getElementById',
        wrongCode: `const box = document.getElementById("#msg"); // خروجی: null!`,
        rightCode: `const box = document.getElementById("msg"); // یا document.querySelector("#msg")`,
        explanation: 'علامت # فقط مخصوص انتخابگرهای CSS در querySelector است.',
      },
      {
        title: 'استفاده از innerHTML برای متن ورودی کاربر',
        wrongCode: `greeting.innerHTML = userInput; // خطر تزریق HTML/XSS`,
        rightCode: `greeting.textContent = userInput; // کاملاً ایمن`,
        explanation: 'textContent تمام تگ‌های احتمالی ورودی را به‌صورت متن ساده و بی‌خطر نمایش می‌دهد.',
      },
    ],
    examples: [
      {
        id: 'ex-3-2-dom-basic',
        tier: 'basic',
        title: 'انتخاب عنصر با getElementById و querySelector و تغییر textContent',
        bookPage: '۲۲۷ و ۲۳۲',
        summary: 'تغییر زنده متن، رنگ و کلاس‌های بوت‌استرپ یک کارت با کلیک روی دکمه.',
        language: 'html',
        engine: 'bootstrap-js',
        useBootstrap: true,
        code: `<div class="container py-3">
  <div id="statusCard" class="card p-3 border-secondary">
    <h5 id="heading" class="fw-bold">وضعیت کلاس: در انتظار شروع</h5>
    <p class="subtitle text-secondary mb-3">روی دکمه زیر کلیک کنید تا DOM زنده تغییر کند.</p>
    <button id="startBtn" class="btn btn-primary btn-sm">شروع جلسه کارگاه</button>
  </div>
</div>`,
        jsCode: `const heading = document.getElementById("heading");
const subtitle = document.querySelector(".subtitle");
const card = document.querySelector("#statusCard");
const btn = document.querySelector("#startBtn");

btn.addEventListener("click", () => {
  heading.textContent = "وضعیت کلاس: جلسه در حال برگزاری است!";
  subtitle.textContent = "تغییر متن و کلاس‌ها با موفقیت از طریق DOM انجام شد.";
  card.classList.remove("border-secondary");
  card.classList.add("border-success", "bg-success-subtle");
  btn.textContent = "فعال شد";
  btn.classList.replace("btn-primary", "btn-success");
});`,
        teacherTalkingPoints: [
          'روی دکمه «شروع جلسه کارگاه» کلیک کنید و نشان دهید بدون رفرش صفحه چطور متن و رنگ کارت تغییر کرد.',
        ],
        lineExplanations: [
          {line: 1, explanation: 'انتخاب عنصر h5 با getElementById (بدون #).'},
          {line: 2, explanation: 'انتخاب پاراگراف با کلاس .subtitle از طریق querySelector.'},
          {line: 10, explanation: 'افزودن کلاس‌های آماده بوت‌استرپ با classList.add.'},
        ],
        commonMistakes: ['گذاشتن نقطه داخل classList.add(".border-success") که نامعتبر است (بدون نقطه بنویسید).'],
      },
      {
        id: 'ex-3-2-dom-practical',
        tier: 'practical',
        title: 'تغییر حالت شب/روز (Dark Mode) با classList.toggle',
        bookPage: '۲۲۸',
        summary: 'کاربرد عملی classList.toggle برای تغییر فوری تم یک پنل.',
        language: 'html',
        engine: 'bootstrap-js',
        useBootstrap: true,
        code: `<div class="container py-3">
  <div id="readerBox" class="p-4 rounded-3 border bg-light text-dark">
    <div class="d-flex justify-content-between align-items-center mb-2">
      <h5 class="fw-bold mb-0">مطالعه‌گر کتاب الکترونیکی</h5>
      <button id="themeBtn" class="btn btn-sm btn-outline-dark">حالت شب</button>
    </div>
    <p class="mb-0 small">با کلیک روی دکمه، کلاس‌های bg-dark و text-white روی این جعبه جابه‌جا می‌شوند.</p>
  </div>
</div>`,
        jsCode: `const box = document.querySelector("#readerBox");
const btn = document.querySelector("#themeBtn");

btn.addEventListener("click", () => {
  const isDark = box.classList.toggle("bg-dark");
  box.classList.toggle("text-white");
  box.classList.toggle("bg-light");
  box.classList.toggle("text-dark");
  btn.textContent = isDark ? "حالت روز" : "حالت شب";
  btn.classList.toggle("btn-outline-light");
  btn.classList.toggle("btn-outline-dark");
});`,
        teacherTalkingPoints: [
          'بگویید دکمه حالت شب بالای همین سامانه آموزشی نیز دقیقاً با همین منطق classList.toggle ساخته شده است!',
        ],
        lineExplanations: [
          {line: 5, explanation: 'toggle اگر کلاس باشد حذفش می‌کند و اگر نباشد اضافه‌اش می‌کند و true/false برمی‌گرداند.'},
        ],
        commonMistakes: ['فراموش کردن حذف کلاس bg-light هنگام افزودن bg-dark.'],
      },
      {
        id: 'ex-3-2-dom-combined',
        tier: 'combined',
        title: 'ساخت گره‌های جدید DOM با createElement (فهرست مطالعه پویا)',
        bookPage: '۲۲۸',
        summary: 'افزودن زنده کتاب جدید به لیست صفحه و نمایش تعداد کل عناصر با querySelectorAll.',
        language: 'html',
        engine: 'bootstrap-js',
        useBootstrap: true,
        code: `<div class="container py-3" style="max-width:440px;">
  <div class="input-group mb-2">
    <input id="bookInput" type="text" class="form-control" placeholder="نام کتاب جدید..." />
    <button id="addBtn" class="btn btn-success">افزودن</button>
  </div>
  <div class="small text-secondary mb-2">تعداد کتاب‌ها: <strong id="count">1</strong></div>
  <ul id="bookList" class="list-group">
    <li class="list-group-item">طراح سایت — پایه یازدهم</li>
  </ul>
</div>`,
        jsCode: `const input = document.querySelector("#bookInput");
const addBtn = document.querySelector("#addBtn");
const list = document.querySelector("#bookList");
const countEl = document.querySelector("#count");

addBtn.addEventListener("click", () => {
  const name = input.value.trim();
  if (!name) return;

  const li = document.createElement("li");
  li.className = "list-group-item d-flex justify-content-between align-items-center";
  li.textContent = name;
  list.appendChild(li);

  input.value = "";
  countEl.textContent = document.querySelectorAll("#bookList li").length;
});`,
        teacherTalkingPoints: [
          'در کلاس دو کتاب جدید تایپ و اضافه کنید تا دانش‌آموزان ساخت واقعی <li> جدید و به‌روزرسانی شمارنده با querySelectorAll را ببینند.',
        ],
        lineExplanations: [
          {line: 10, explanation: 'ساخت عنصر <li> جدید در حافظه مرورگر.'},
          {line: 13, explanation: 'چسباندن عنصر جدید به انتهای لیست <ul> در صفحه.'},
          {line: 16, explanation: 'شمارش تمام تگ‌های li درون لیست با querySelectorAll.'},
        ],
        commonMistakes: ['ساختن عنصر با createElement و فراموش کردن appendChild (عنصر در صفحه ظاهر نمی‌شود!).'],
      },
      {
        id: 'ex-3-2-dom-whatif',
        tier: 'what-if',
        title: 'چرا getElementById("#demo") خروجی null می‌دهد؟',
        bookPage: '۲۲۷',
        summary: 'مقایسه عملی انتخابگر درست و نادرست در کنسول برای پیشگیری از رایج‌ترین خطای DOM.',
        language: 'html',
        engine: 'bootstrap-js',
        useBootstrap: true,
        code: `<div class="p-3">
  <p id="demo" class="alert alert-info mb-0">پاراگراف نمونه با id="demo"</p>
</div>`,
        jsCode: `const wrongWay = document.getElementById("#demo");
const rightWay1 = document.getElementById("demo");
const rightWay2 = document.querySelector("#demo");

console.warn('getElementById("#demo") =>', wrongWay);
console.log('getElementById("demo") =>', rightWay1.textContent);
console.log('querySelector("#demo") =>', rightWay2.textContent);`,
        teacherTalkingPoints: [
          'خروجی کنسول را نشان دهید: روش اول null برمی‌گرداند و اگر روی آن .textContent بزنیم برنامه کرش می‌کند!',
        ],
        lineExplanations: [
          {line: 1, explanation: 'غلط رایج: گذاشتن # درون getElementById.'},
          {line: 3, explanation: 'روش درست: querySelector همیشه از قواعد CSS پیروی می‌کند.'},
        ],
        commonMistakes: ['اشتباه گرفتن سینتکس getElementById و querySelector.'],
      },
    ],
  },

  // ==================== LESSON 6 ====================
  {
    id: 'lesson-3-2-events-validation',
    order: 6,
    title: 'رویدادها (Events) و اعتبارسنجی فرم ورود sign-in.html (اصلاح ص ۲۳۰)',
    bookPage: '۲۲۸ تا ۲۳۱',
    whyWeNeedIt: {
      realWorldProblem:
        'اگر کاربر فرم ورود یا ثبت‌نام را خالی بفرستد یا رمز عبور ۲ کاراکتری وارد کند، ارسال درخواست ناقص به سرور هم وقت کاربر را تلف می‌کند و هم به سرور فشار می‌آورد. با رویدادهای جاوااسکریپت خطاها را همان لحظه در مرورگر می‌گیریم.',
      analogy:
        'اعتبارسنجی سمت کلاینت (JS) مانند نگهبان ورودی سالن است که قبل از رسیدن به گیشه، کارت دعوت را چک می‌کند تا صف شلوغ نشود؛ البته گیشه (سرور جنگو در پودمان ۵) نیز دوباره بررسی نهایی را انجام می‌دهد.',
    },
    syntaxAnatomy: {
      template: `form.addEventListener("submit", (event) => {\n  event.preventDefault();\n  if (password.value.length < 6) { /* نمایش خطا */ }\n});`,
      parts: [
        {token: 'addEventListener(type, fn)', role: 'روش مدرن اتصال شنونده رویداد (click، submit، input) بدون آلوده کردن HTML.'},
        {token: 'event.preventDefault()', role: 'جلوگیری از ارسال و بارگذاری مجدد پیش‌فرض فرم هنگام وجود خطا.'},
        {token: 'pass.length < 6', role: 'اصلاح باگ شرطی ص ۲۳۰ کتاب (شرط <= 6 رمز ۶ کاراکتری معتبر را اشتباهاً رد می‌کرد!).'},
        {token: 'onsubmit="return validateForm()"', role: 'روش کتاب در ص ۲۳۰ که نیازمند تطابق دقیق حروف بزرگ و کوچک نام تابع است.'},
      ],
    },
    behindTheScenes: [
      'در صفحه ۲۳۰ کتاب دو باگ بحرانی وجود دارد: ۱) در HTML تابع validateForm (با F بزرگ) صدا زده شده اما در فایل JS به شکل validateform (با f کوچک) تعریف شده که باعث ReferenceError می‌شود! ۲) شرط pass.length <= 6 رمز ۶ رقمی را هم رد می‌کند در حالی که پیام می‌گوید «حداقل ۶ کاراکتر» (درست: < 6).',
      'رویداد input به ازای هر حرفی که کاربر تایپ می‌کند اجرا می‌شود و برای نمایش لحظه‌ای قدرت رمز عبور یا جستجوی زنده فوق‌العاده است.',
      'همیشه به کلاس یادآوری کنید: اعتبارسنجی جاوااسکریپت برای سرعت و تجربه کاربری است، اما امنیت واقعی همیشه در سمت سرور (پودمان ۵ — جنگو) تکمیل می‌شود.',
      'به‌جای alert() مزاحم مرورگر، نمایش پیام خطا درون یک کادر رنگی در زیر فیلد فرم (Inline Feedback) بسیار حرفه‌ای‌تر و کاربرپسندتر است.',
    ],
    goldenTips: [
      'در تمام پروژه‌های واقعی، addEventListener("submit", ...) و event.preventDefault() را به جای صفت درون‌خطی onsubmit ترجیح دهید.',
      'برای فیلدهای متنی حتماً .value.trim() را بررسی کنید تا کاربر نتواند با چند بار زدن کلید Space فرم را دور بزند.',
    ],
    wrongVsRight: [
      {
        title: 'باگ واقعی ص ۲۳۰ کتاب: ناهماهنگی حروف و شرط <= 6',
        wrongCode: `<form onsubmit="return validateForm()">\nfunction validateform() { if (pass.length <= 6) return false; }`,
        rightCode: `<form onsubmit="return validateForm()">\nfunction validateForm() { if (pass.length < 6) return false; }`,
        explanation: 'هم نام تابع باید دقیقاً یکسان باشد (validateForm) و هم برای «حداقل ۶ کاراکتر» شرط رد کردن باید < 6 باشد.',
      },
      {
        title: 'عدم جلوگیری از رفرش صفحه هنگام submit',
        wrongCode: `form.addEventListener("submit", () => { showMsg("ارسال شد"); });`,
        rightCode: `form.addEventListener("submit", (e) => { e.preventDefault(); showMsg("ارسال شد"); });`,
        explanation: 'بدون e.preventDefault() فرم صفحه را رفرش می‌کند و پیام بلافاصله محو می‌شود.',
      },
    ],
    examples: [
      {
        id: 'ex-3-2-ev-basic',
        tier: 'basic',
        title: 'شمارنده زنده کاراکترها با رویداد input',
        bookPage: '۲۲۹',
        summary: 'استفاده از addEventListener("input") برای نمایش لحظه‌ای طول متن تایپ‌شده.',
        language: 'html',
        engine: 'bootstrap-js',
        useBootstrap: true,
        code: `<div class="container py-3" style="max-width:420px;">
  <label for="bio" class="form-label fw-bold">دیدگاه شما درباره کتاب (حداکثر ۵۰ کاراکتر):</label>
  <textarea id="bio" rows="3" maxlength="50" class="form-control mb-2" placeholder="بنویسید..."></textarea>
  <div id="counter" class="small text-secondary">۰ از ۵۰ کاراکتر</div>
</div>`,
        jsCode: `const bio = document.querySelector("#bio");
const counter = document.querySelector("#counter");

bio.addEventListener("input", () => {
  const len = bio.value.length;
  counter.textContent = \`\${len} از ۵۰ کاراکتر\`;
  counter.className = len >= 45 ? "small text-danger fw-bold" : "small text-secondary";
});`,
        teacherTalkingPoints: [
          'داخل کادر متن تایپ کنید تا تغییر لحظه‌ای شمارنده و قرمز شدن آن نزدیک ۵۰ کاراکتر دیده شود.',
        ],
        lineExplanations: [
          {line: 4, explanation: 'رویداد input با هر تغییر در متن بلافاصله اجرا می‌شود.'},
          {line: 7, explanation: 'هشدار رنگی وقتی کاربر به سقف مجاز نزدیک می‌شود.'},
        ],
        commonMistakes: ['استفاده از رویداد change به جای input (رویداد change فقط پس از خروج از کادر اجرا می‌شود).'],
      },
      {
        id: 'ex-3-2-ev-practical',
        tier: 'practical',
        title: 'اعتبارسنجی زنده فرم ورود sign-in.html (اصلاح باگ بحرانی ص ۲۳۰)',
        bookPage: '۲۳۰',
        summary: 'پروژه اصلی پایان واحد ۳.۲ با اصلاح ناهماهنگی validateForm و شرط < 6.',
        language: 'html',
        engine: 'bootstrap-js',
        useBootstrap: true,
        code: `<div class="container py-3" style="max-width:420px;">
  <div class="card p-4 shadow-sm">
    <h5 class="fw-bold mb-3">ورود به فروشگاه مرجع نو</h5>
    <form id="loginForm" onsubmit="return validateForm()">
      <div class="mb-3">
        <label for="username" class="form-label">نام کاربری</label>
        <input id="username" type="text" class="form-control" placeholder="مثلاً ali_dev" />
      </div>
      <div class="mb-3">
        <label for="password" class="form-label">رمز عبور (حداقل ۶ کاراکتر)</label>
        <input id="password" type="password" class="form-control" placeholder="******" />
      </div>
      <div id="msg" class="small mb-3 fw-bold"></div>
      <button type="submit" class="btn btn-primary w-100">ورود</button>
    </form>
  </div>
</div>`,
        jsCode: `function validateForm() {
  const user = document.querySelector('#username').value.trim();
  const pass = document.querySelector('#password').value;
  const msg = document.querySelector('#msg');

  if (user === '') {
    msg.className = 'small mb-3 fw-bold text-danger';
    msg.textContent = 'لطفاً نام کاربری را وارد کنید.';
    console.warn('نام کاربری خالی است');
    return false;
  }
  if (pass.length < 6) { // اصلاح شرط <= 6 ص ۲۳۰ کتاب
    msg.className = 'small mb-3 fw-bold text-danger';
    msg.textContent = 'رمز عبور باید حداقل ۶ کاراکتر باشد.';
    console.warn('طول رمز کمتر از ۶ است');
    return false;
  }
  msg.className = 'small mb-3 fw-bold text-success';
  msg.textContent = 'ورود با موفقیت تأیید شد! خوش آمدید ' + user;
  console.log('Login validated for:', user);
  return false; // جلوگیری از رفرش صفحه در پیش‌نمایش
}`,
        teacherTalkingPoints: [
          'ابتدا دکمه ورود را خالی بزنید، بعد رمز ۵ کاراکتری (12345) و سپس رمز ۶ کاراکتری (123456) را تست کنید.',
        ],
        lineExplanations: [
          {line: 1, explanation: 'نام تابع دقیقاً با onsubmit="return validateForm()" هماهنگ است (اصلاح ص ۲۳۰).'},
          {line: 12, explanation: 'شرط < 6 باعث می‌شود رمز ۶ کاراکتری مجاز شناخته شود.'},
        ],
        commonMistakes: ['نوشتن validateform با f کوچک یا شرط <= 6 مثل کتاب ص ۲۳۰.'],
        bookCorrection: {
          page: 230,
          issue: 'ناهماهنگی نام تابع validateForm در HTML و validateform در JS + شرط غلط <= 6 که رمز ۶ کاراکتری را رد می‌کرد.',
          fix: 'نام تابع یکسان‌سازی و شرط به pass.length < 6 اصلاح شد.',
        },
      },
      {
        id: 'ex-3-2-ev-combined',
        tier: 'combined',
        title: 'سبد خرید تعاملی با دکمه‌های + / - و محاسبه زنده جمع کل',
        bookPage: '۲۳۱',
        summary: 'ترکیب DOM، رویداد click و آرایه اشیا برای ساخت یک کارت سبد خرید واقعی.',
        language: 'html',
        engine: 'bootstrap-js',
        useBootstrap: true,
        code: `<div class="container py-3" style="max-width:430px;">
  <div class="card p-3 shadow-sm">
    <div class="d-flex justify-content-between align-items-center mb-2">
      <div>
        <div class="fw-bold">کتاب طراح سایت یازدهم</div>
        <div class="small text-secondary">قیمت واحد: ۴۵٬۰۰۰ تومان</div>
      </div>
      <div class="btn-group btn-group-sm" dir="ltr">
        <button id="minusBtn" class="btn btn-outline-secondary">-</button>
        <span id="qtyBadge" class="btn btn-light disabled fw-bold">1</span>
        <button id="plusBtn" class="btn btn-outline-primary">+</button>
      </div>
    </div>
    <hr class="my-2" />
    <div class="d-flex justify-content-between fw-bold">
      <span>جمع کل قابل پرداخت:</span>
      <span id="totalPrice" class="text-success">45,000 تومان</span>
    </div>
  </div>
</div>`,
        jsCode: `const UNIT_PRICE = 45000;
let qty = 1;

const qtyBadge = document.querySelector("#qtyBadge");
const totalPrice = document.querySelector("#totalPrice");

function updateUI() {
  qtyBadge.textContent = qty;
  totalPrice.textContent = (qty * UNIT_PRICE).toLocaleString("en-US") + " تومان";
}

document.querySelector("#plusBtn").addEventListener("click", () => {
  qty++;
  updateUI();
});

document.querySelector("#minusBtn").addEventListener("click", () => {
  if (qty > 1) {
    qty--;
    updateUI();
  }
});`,
        teacherTalkingPoints: [
          'بگویید شرط if (qty > 1) مانع منفی شدن تعداد کتاب در سبد خرید می‌شود!',
        ],
        lineExplanations: [
          {line: 7, explanation: 'تابع updateUI تمام تغییرات صفحه را در یک نقطه متمرکز می‌کند.'},
          {line: 18, explanation: 'جلوگیری از کاهش تعداد به کمتر از ۱.'},
        ],
        commonMistakes: ['به‌روزرسانی متغیر qty در حافظه بدون صدا زدن تابع به‌روزرسانی DOM.'],
      },
      {
        id: 'ex-3-2-ev-whatif',
        tier: 'what-if',
        title: 'نمایش/مخفی کردن رمز عبور با تغییر صفت type در DOM',
        bookPage: '۲۳۰',
        summary: 'تکنیک کاربردی تغییر صفت input.type بین password و text با یک کلیک.',
        language: 'html',
        engine: 'bootstrap-js',
        useBootstrap: true,
        code: `<div class="container py-3" style="max-width:400px;">
  <label for="secretPass" class="form-label fw-bold">رمز عبور آزمایشی:</label>
  <div class="input-group">
    <input id="secretPass" type="password" value="Marja1405" class="form-control" />
    <button id="togglePass" type="button" class="btn btn-outline-secondary">نمایش</button>
  </div>
</div>`,
        jsCode: `const passInput = document.querySelector("#secretPass");
const toggleBtn = document.querySelector("#togglePass");

toggleBtn.addEventListener("click", () => {
  const isHidden = passInput.type === "password";
  passInput.type = isHidden ? "text" : "password";
  toggleBtn.textContent = isHidden ? "مخفی" : "نمایش";
});`,
        teacherTalkingPoints: [
          'دقت کنید روی دکمه داخل فرم حتماً type="button" بگذاریم تا با کلیک روی آن فرم تصادفاً submit نشود!',
        ],
        lineExplanations: [
          {line: 5, explanation: 'بررسی وضعیت فعلی نوع ورودی.'},
          {line: 6, explanation: 'تغییر مستقیم صفت type بین text و password.'},
        ],
        commonMistakes: ['جا انداختن type="button" که باعث ارسال ناخواسته فرم می‌شود.'],
      },
    ],
  },
];
