import type {
  ClassroomActivity,
  HomeworkAssignment,
  QuickQuizQuestion,
} from '../../../types/curriculum.ts';

export const UNIT_3_2_ACTIVITIES: ClassroomActivity[] = [
  {
    id: 'act-3-2-cart',
    kind: 'workshop',
    title: 'محاسبه جمع سبد خرید با آرایه از اشیا و pop()',
    bookPage: '۲۲۱ و ۲۳۲',
    estimatedMinutes: 15,
    prompt:
      'آرایه‌ای از ۳ کتاب دارید؛ آخرین کتاب را با pop() حذف کرده، نام کتاب حذف‌شده را گزارش دهید و جمع کل قیمت کتاب‌های باقی‌مانده را در کنسول چاپ کنید.',
    steps: [
      'متد cart.pop() را صدا بزنید و خروجی آن را در متغیر removed ذخیره کنید.',
      'با حلقه for...of روی cart حرکت کنید و item.price را جمع بزنید.',
      'مجموع نهایی را با Template Literal در کنسول چاپ کنید.',
    ],
    hints: ['متد pop() آخرین عنصر را هم حذف می‌کند و هم برمی‌گرداند.'],
    language: 'javascript',
    engine: 'bootstrap-js',
    starterCode: `const cart = [
  { title: "طراح سایت", price: 45000 },
  { title: "تولید محتوا", price: 38000 },
  { title: "پایگاه داده", price: 52000 },
];

// آخرین مورد را با pop() حذف و مجموع باقی‌مانده را چاپ کنید:
`,
    solutionCode: `const cart = [
  { title: "طراح سایت", price: 45000 },
  { title: "تولید محتوا", price: 38000 },
  { title: "پایگاه داده", price: 52000 },
];

const removed = cart.pop();
console.log("حذف شده:", removed.title);

let total = 0;
for (const item of cart) {
  total += item.price;
}
console.log(\`مجموع نهایی سبد خرید: \${total} تومان\`);`,
    solutionExplanation: 'متد pop() آخرین عنصر آرایه را حذف و برمی‌گرداند؛ سپس حلقه for...of قیمت‌ها را جمع می‌زند.',
    alternativeSolutionCode: `const cart = [
  { title: "طراح سایت", price: 45000 },
  { title: "تولید محتوا", price: 38000 },
  { title: "پایگاه داده", price: 52000 },
];

const removed = cart.pop();
const total = cart.reduce((sum, item) => sum + item.price, 0);
console.log("حذف‌شده:", removed.title, "| جمع با reduce:", total);`,
    alternativeSolutionExplanation: 'در روش مدرن‌تر ES6 می‌توان به جای حلقه دستی، از متد reduce() روی آرایه استفاده کرد.',
  },
  {
    id: 'act-3-2-shipping',
    kind: 'activity',
    title: 'ماشین‌حساب هزینه ارسال و تخفیف پلکانی',
    bookPage: '۲۰۹',
    estimatedMinutes: 12,
    prompt:
      'تابعی به نام calcOrder(amount) بنویسید که اگر مبلغ خرید ۲۰۰ هزار تومان یا بیشتر بود ارسال رایگان (۰) وگرنه ۲۵ هزار تومان هزینه پست اضافه کرده و مبلغ نهایی را برگرداند.',
    steps: [
      'تابع calcOrder(amount) را تعریف کنید.',
      'با شرط if/else هزینه پست را تعیین کنید.',
      'تابع را برای دو مبلغ ۱۸۰٬۰۰۰ و ۲۵۰٬۰۰۰ آزمایش و چاپ کنید.',
    ],
    hints: ['از عملگر سه‌تایی یا if/else ساده استفاده کنید و حتماً return بنویسید.'],
    language: 'javascript',
    engine: 'bootstrap-js',
    starterCode: `function calcOrder(amount) {
  // کد خود را اینجا بنویسید
}

console.log(calcOrder(180000));
console.log(calcOrder(250000));`,
    solutionCode: `function calcOrder(amount) {
  let shipping = 25000;
  if (amount >= 200000) {
    shipping = 0;
  }
  return amount + shipping;
}

console.log("سفارش ۱۸۰ هزار:", calcOrder(180000), "تومان");
console.log("سفارش ۲۵۰ هزار:", calcOrder(250000), "تومان");`,
    solutionExplanation: 'شرط >= 200000 هزینه پست را صفر می‌کند و تابع مبلغ کل را برمی‌گرداند.',
    alternativeSolutionCode: `const calcOrder = (amount) => amount + (amount >= 200000 ? 0 : 25000);

console.log("سفارش ۱۸۰ هزار:", calcOrder(180000));
console.log("سفارش ۲۵۰ هزار:", calcOrder(250000));`,
    alternativeSolutionExplanation: 'نسخه تک‌خطی با تابع پیکانی و عملگر سه‌تایی (Ternary).',
  },
  {
    id: 'act-3-2-class-student',
    kind: 'workshop',
    title: 'ساخت کلاس ES6 هنرجو و محاسبه وضعیت قبولی',
    bookPage: '۲۲۵',
    estimatedMinutes: 15,
    prompt:
      'کلاس Student را با ویژگی‌های name و score در constructor بسازید و متد getStatus() بنویسید که اگر نمره ۱۲ یا بیشتر بود «قبول» وگرنه «نیازمند جبرانی» برگرداند.',
    steps: [
      'کلاس Student و سازنده constructor(name, score) را بنویسید.',
      'متد getStatus() را داخل کلاس اضافه کنید.',
      'دو نمونه با new بسازید و نتیجه را در کنسول چاپ کنید.',
    ],
    hints: ['درون متدها برای دسترسی به ویژگی‌ها از this.name و this.score استفاده کنید.'],
    language: 'javascript',
    engine: 'bootstrap-js',
    starterCode: `class Student {
  // سازنده و متد getStatus را تکمیل کنید
}
`,
    solutionCode: `class Student {
  constructor(name, score) {
    this.name = name;
    this.score = score;
  }

  getStatus() {
    const result = this.score >= 12 ? "قبول" : "نیازمند جبرانی";
    return \`\${this.name} (نمره \${this.score}): \${result}\`;
  }
}

const s1 = new Student("سارا محمدی", 19);
const s2 = new Student("رضا حسینی", 10.5);
console.log(s1.getStatus());
console.log(s2.getStatus());`,
    solutionExplanation: 'کلاس ES6 قالب واحدی برای ساخت تمام اشیای هنرجو فراهم می‌کند.',
    alternativeSolutionCode: `class Student {
  constructor(name, score) {
    this.name = name;
    this.score = score;
  }
  isPassed() { return this.score >= 12; }
}
const list = [new Student("سارا", 19), new Student("رضا", 10.5)];
for (const st of list) {
  console.log(st.name, "=>", st.isPassed() ? "قبول" : "مردود");
}`,
    alternativeSolutionExplanation: 'جداسازی منطق بولین در متد isPassed() و نگهداری نمونه‌ها درون یک آرایه.',
  },
  {
    id: 'act-3-2-dom-counter',
    kind: 'activity',
    title: 'ساخت شمارنده کلیک زنده با querySelector',
    bookPage: '۲۲۷ و ۲۳۲',
    estimatedMinutes: 12,
    prompt:
      'سه دکمه «افزایش»، «کاهش» و «صفر کردن» بسازید که عدد داخل <span id="num"> را به‌صورت زنده تغییر دهند و اجازه منفی شدن به عدد ندهند.',
    steps: [
      'عنصر #num و سه دکمه را با querySelector انتخاب کنید.',
      'برای هر دکمه یک addEventListener("click", ...) بنویسید.',
      'هنگام کاهش بررسی کنید count > 0 باشد.',
    ],
    hints: ['مقدار شمارنده را در یک متغیر عددی let count = 0 نگه دارید.'],
    language: 'html',
    engine: 'bootstrap-js',
    useBootstrap: true,
    starterCode: `<div class="container py-3 text-center">
  <h3 id="num" class="fw-bold mb-3">0</h3>
  <button id="inc" class="btn btn-success btn-sm">افزایش +</button>
  <button id="dec" class="btn btn-warning btn-sm">کاهش -</button>
  <button id="rst" class="btn btn-secondary btn-sm">بازنشانی</button>
</div>`,
    jsStarter: `let count = 0;
const numEl = document.querySelector("#num");
// رویدادهای کلیک را اضافه کنید:
`,
    solutionCode: `<div class="container py-3 text-center">
  <h3 id="num" class="fw-bold mb-3">0</h3>
  <button id="inc" class="btn btn-success btn-sm">افزایش +</button>
  <button id="dec" class="btn btn-warning btn-sm">کاهش -</button>
  <button id="rst" class="btn btn-secondary btn-sm">بازنشانی</button>
</div>`,
    jsSolution: `let count = 0;
const numEl = document.querySelector("#num");

document.querySelector("#inc").addEventListener("click", () => {
  count++;
  numEl.textContent = count;
});

document.querySelector("#dec").addEventListener("click", () => {
  if (count > 0) count--;
  numEl.textContent = count;
});

document.querySelector("#rst").addEventListener("click", () => {
  count = 0;
  numEl.textContent = count;
});`,
    solutionExplanation: 'متغیر count منبع حقیقت است و پس از هر کلیک مقدار جدید آن در textContent نوشته می‌شود.',
    alternativeSolutionCode: `<div class="container py-3 text-center">
  <h3 id="num" class="fw-bold mb-3">0</h3>
  <div id="controls" class="d-inline-flex gap-2">
    <button data-delta="1" class="btn btn-success btn-sm">+1</button>
    <button data-delta="-1" class="btn btn-warning btn-sm">-1</button>
    <button data-delta="0" class="btn btn-secondary btn-sm">صفر</button>
  </div>
</div>`,
    alternativeSolutionExplanation: 'در الگوی Event Delegation می‌توان فقط یک شنونده روی #controls گذاشت و مقدار تغییر را از صفت data-delta خواند.',
  },
  {
    id: 'act-3-2-live-search',
    kind: 'workshop',
    title: 'جستجوی زنده فهرست کتاب‌ها در صفحه (Live Filter)',
    bookPage: '۲۲۸',
    estimatedMinutes: 18,
    prompt:
      'کادر جستجویی بسازید که با تایپ هر حرف توسط کاربر، تمام عناصر <li class="book-item"> را با querySelectorAll بررسی کرده و فقط کتاب‌های منطبق را نمایش دهد.',
    steps: [
      'رویداد input را به کادر #search متصل کنید.',
      'با querySelectorAll(".book-item") روی همه آیتم‌ها حلقه بزنید.',
      'اگر textContent شامل عبارت جستجو بود کلاس d-none را حذف وگرنه اضافه کنید.',
    ],
    hints: ['از متد item.textContent.includes(query) و classList.toggle("d-none", !match) استفاده کنید.'],
    language: 'html',
    engine: 'bootstrap-js',
    useBootstrap: true,
    starterCode: `<div class="container py-3" style="max-width:420px;">
  <input id="search" type="search" class="form-control mb-2" placeholder="جستجوی نام کتاب..." />
  <ul class="list-group">
    <li class="list-group-item book-item">طراح سایت یازدهم</li>
    <li class="list-group-item book-item">تولید محتوای الکترونیکی</li>
    <li class="list-group-item book-item">نصب و راه‌اندازی شبکه</li>
    <li class="list-group-item book-item">پایگاه داده دوازدهم</li>
  </ul>
</div>`,
    jsStarter: `const searchInput = document.querySelector("#search");
const items = document.querySelectorAll(".book-item");
// رویداد input را تکمیل کنید:
`,
    solutionCode: `<div class="container py-3" style="max-width:420px;">
  <input id="search" type="search" class="form-control mb-2" placeholder="جستجوی نام کتاب..." />
  <ul class="list-group">
    <li class="list-group-item book-item">طراح سایت یازدهم</li>
    <li class="list-group-item book-item">تولید محتوای الکترونیکی</li>
    <li class="list-group-item book-item">نصب و راه‌اندازی شبکه</li>
    <li class="list-group-item book-item">پایگاه داده دوازدهم</li>
  </ul>
</div>`,
    jsSolution: `const searchInput = document.querySelector("#search");
const items = document.querySelectorAll(".book-item");

searchInput.addEventListener("input", () => {
  const q = searchInput.value.trim();
  for (const item of items) {
    const match = item.textContent.includes(q);
    item.classList.toggle("d-none", !match);
  }
});`,
    solutionExplanation: 'کلاس d-none بوت‌استرپ آیتم‌های نامنطبق را به‌صورت آنی مخفی می‌کند.',
    alternativeSolutionCode: `// با استفاده از style.display به جای کلاس d-none:
searchInput.addEventListener("input", () => {
  const q = searchInput.value.trim().toLowerCase();
  items.forEach(item => {
    item.style.display = item.textContent.toLowerCase().includes(q) ? "" : "none";
  });
});`,
    alternativeSolutionExplanation: 'نسخه مستقل از بوت‌استرپ که مستقیماً خاصیت style.display را تنظیم می‌کند.',
  },
  {
    id: 'act-3-2-curiosity-truthy',
    kind: 'curiosity',
    title: 'کنجکاوی: مقادیر Falsy در جاوااسکریپت کدامند؟',
    bookPage: '۲۰۷',
    estimatedMinutes: 10,
    prompt:
      'آرایه‌ای از مقادیر عجیب جاوااسکریپت (0، ""، null، undefined، NaN، "0"، []) را با Boolean() بررسی کنید و ببینید کدام‌یک true و کدام‌یک false می‌شوند!',
    steps: [
      'روی آرایه samples حلقه بزنید.',
      'خروجی Boolean(val) را برای هر مقدار چاپ کنید.',
    ],
    hints: ['دقت کنید رشته غیرخالی "0" و آرایه خالی [] در جاوااسکریپت Truthy (صحیح) هستند!'],
    language: 'javascript',
    engine: 'bootstrap-js',
    starterCode: `const samples = [0, "", null, undefined, "0", [], "سلام"];
// بررسی کنید هر کدام در if چه نتیجه‌ای می‌دهند:
`,
    solutionCode: `const samples = [0, "", null, undefined, "0", [], "سلام"];
for (const val of samples) {
  console.log(JSON.stringify(val), "=>", Boolean(val));
}`,
    solutionExplanation: 'در JS فقط ۶ مقدار Falsy هستند: false، 0، ""، null، undefined و NaN. حتی آرایه خالی [] مقدار true دارد (برخلاف پایتون!).',
    alternativeSolutionCode: `const falsyOnly = [0, "", null, undefined, "0", []].filter(v => !v);
console.log("فقط مقادیر Falsy:", falsyOnly);`,
    alternativeSolutionExplanation: 'استفاده از نقیض !v در filter برای جداسازی خودکار مقادیر Falsy.',
  },
  {
    id: 'act-3-2-signup-validation',
    kind: 'project',
    title: 'پروژه اعتبارسنجی فرم ثبت‌نام (نام، ایمیل و تطابق دو رمز عبور)',
    bookPage: '۲۳۰–۲۳۱',
    estimatedMinutes: 20,
    prompt:
      'فرم ثبت‌نامی با فیلدهای ایمیل، رمز عبور و تکرار رمز بسازید که بررسی کند: ایمیل شامل @ باشد، رمز حداقل ۶ کاراکتر باشد و تکرار رمز دقیقاً با رمز اصلی برابر باشد.',
    steps: [
      'رویداد submit فرم را با addEventListener و event.preventDefault() بگیرید.',
      'سه شرط اعتبارسنجی را به ترتیب چک کنید.',
      'پیام خطای قرمز یا موفقیت سبز را درون #regMsg نمایش دهید.',
    ],
    hints: ['برای بررسی ایمیل از !email.includes("@") و برای تطابق رمز از pass !== confirm استفاده کنید.'],
    language: 'html',
    engine: 'bootstrap-js',
    useBootstrap: true,
    starterCode: `<div class="container py-3" style="max-width:420px;">
  <form id="regForm" class="card p-3 shadow-sm">
    <h6 class="fw-bold mb-2">ثبت‌نام هنرجو</h6>
    <input id="email" type="text" class="form-control mb-2" placeholder="ایمیل (مثلاً ali@site.ir)" />
    <input id="p1" type="password" class="form-control mb-2" placeholder="رمز عبور (حداقل ۶ کاراکتر)" />
    <input id="p2" type="password" class="form-control mb-2" placeholder="تکرار رمز عبور" />
    <div id="regMsg" class="small fw-bold mb-2"></div>
    <button type="submit" class="btn btn-success btn-sm">ایجاد حساب</button>
  </form>
</div>`,
    jsStarter: `document.querySelector("#regForm").addEventListener("submit", (e) => {
  e.preventDefault();
  // سه شرط اعتبارسنجی را اینجا بنویسید:
});`,
    solutionCode: `<div class="container py-3" style="max-width:420px;">
  <form id="regForm" class="card p-3 shadow-sm">
    <h6 class="fw-bold mb-2">ثبت‌نام هنرجو</h6>
    <input id="email" type="text" class="form-control mb-2" placeholder="ایمیل (مثلاً ali@site.ir)" />
    <input id="p1" type="password" class="form-control mb-2" placeholder="رمز عبور (حداقل ۶ کاراکتر)" />
    <input id="p2" type="password" class="form-control mb-2" placeholder="تکرار رمز عبور" />
    <div id="regMsg" class="small fw-bold mb-2"></div>
    <button type="submit" class="btn btn-success btn-sm">ایجاد حساب</button>
  </form>
</div>`,
    jsSolution: `document.querySelector("#regForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const email = document.querySelector("#email").value.trim();
  const p1 = document.querySelector("#p1").value;
  const p2 = document.querySelector("#p2").value;
  const msg = document.querySelector("#regMsg");

  if (!email.includes("@")) {
    msg.className = "small fw-bold mb-2 text-danger";
    msg.textContent = "نشانی ایمیل معتبر نیست (فاقد @).";
    return;
  }
  if (p1.length < 6) {
    msg.className = "small fw-bold mb-2 text-danger";
    msg.textContent = "رمز عبور باید حداقل ۶ کاراکتر باشد.";
    return;
  }
  if (p1 !== p2) {
    msg.className = "small fw-bold mb-2 text-danger";
    msg.textContent = "رمز عبور و تکرار آن با هم برابر نیستند.";
    return;
  }
  msg.className = "small fw-bold mb-2 text-success";
  msg.textContent = "ثبت‌نام با موفقیت تأیید شد!";
});`,
    solutionExplanation: 'استفاده از return زودهنگام (Early Return) باعث می‌شود شرط‌ها بسیار تمیز و بدون تودرتویی نوشته شوند.',
    alternativeSolutionCode: `// جمع‌آوری همه خطاها در یک آرایه errors و نمایش یکجا:
const errors = [];
if (!email.includes("@")) errors.push("ایمیل نامعتبر است");
if (p1.length < 6) errors.push("رمز کمتر از ۶ کاراکتر است");
if (p1 !== p2) errors.push("تکرار رمز منطبق نیست");
msg.textContent = errors.length ? errors.join(" | ") : "ثبت‌نام موفق!";`,
    alternativeSolutionExplanation: 'این الگو تمام خطاهای فرم را هم‌زمان به کاربر اطلاع می‌دهد تا مجبور به چند بار ارسال فرم نباشد.',
  },
  {
    id: 'act-3-2-todo-delete',
    kind: 'workshop',
    title: 'افزودن و حذف آیتم‌ها از لیست وظایف (createElement + remove)',
    bookPage: '۲۲۸',
    estimatedMinutes: 15,
    prompt:
      'لیستی بسازید که هر کار جدید همراه با یک دکمه «حذف» اضافه شود و کلیک روی دکمه حذف، همان ردیف <li> را با li.remove() از DOM پاک کند.',
    steps: [
      'با createElement یک <li> و یک <button> بسازید.',
      'رویداد کلیک دکمه حذف را به li.remove() وصل کنید.',
      'دکمه را داخل li و li را داخل لیست قرار دهید.',
    ],
    hints: ['هر <li> ساخته شده در حافظه دارد و متد li.remove() آن را مستقیماً از صفحه حذف می‌کند.'],
    language: 'html',
    engine: 'bootstrap-js',
    useBootstrap: true,
    starterCode: `<div class="container py-3" style="max-width:420px;">
  <div class="input-group mb-2">
    <input id="taskIn" class="form-control" placeholder="تکلیف امروز..." />
    <button id="addTask" class="btn btn-primary">ثبت</button>
  </div>
  <ul id="taskList" class="list-group"></ul>
</div>`,
    jsStarter: `const taskIn = document.querySelector("#taskIn");
const list = document.querySelector("#taskList");
// ساخت li با دکمه حذف:
`,
    solutionCode: `<div class="container py-3" style="max-width:420px;">
  <div class="input-group mb-2">
    <input id="taskIn" class="form-control" placeholder="تکلیف امروز..." />
    <button id="addTask" class="btn btn-primary">ثبت</button>
  </div>
  <ul id="taskList" class="list-group"></ul>
</div>`,
    jsSolution: `const taskIn = document.querySelector("#taskIn");
const list = document.querySelector("#taskList");

document.querySelector("#addTask").addEventListener("click", () => {
  const txt = taskIn.value.trim();
  if (!txt) return;

  const li = document.createElement("li");
  li.className = "list-group-item d-flex justify-content-between align-items-center";

  const span = document.createElement("span");
  span.textContent = txt;

  const delBtn = document.createElement("button");
  delBtn.className = "btn btn-sm btn-outline-danger";
  delBtn.textContent = "حذف";
  delBtn.addEventListener("click", () => li.remove());

  li.append(span, delBtn);
  list.appendChild(li);
  taskIn.value = "";
});`,
    solutionExplanation: 'استفاده از createElement و textContent بدون innerHTML کاملاً در برابر تزریق کد ایمن است.',
    alternativeSolutionCode: `// افزودن دکمه خط‌زدن کار انجام‌شده (line-through) در کنار حذف:
span.style.cursor = "pointer";
span.addEventListener("click", () => span.classList.toggle("text-decoration-line-through"));`,
    alternativeSolutionExplanation: 'با یک خط اضافه، کاربر می‌تواند با کلیک روی متن کار آن را خط بزند.',
  },
];

export const UNIT_3_2_HOMEWORKS: HomeworkAssignment[] = [
  {
    id: 'hw-3-2-01',
    number: 1,
    title: 'تبدیل دما از سانتی‌گراد به فارنهایت با Arrow Function',
    difficulty: 'easy',
    bookPage: '۲۲۲',
    estimatedMinutes: 10,
    prompt: 'تابع پیکانی cToF(c) بنویسید که دمای سانتی‌گراد را گرفته و معادل فارنهایت (c * 9 / 5 + 32) را برگرداند؛ سپس برای ۰ و ۲۵ درجه چاپ کنید.',
    sampleInput: '0 و 25',
    sampleOutput: '0°C = 32°F | 25°C = 77°F',
    hint: 'const cToF = (c) => (c * 9) / 5 + 32;',
    solutionCode: `const cToF = (c) => (c * 9) / 5 + 32;
console.log(\`0°C = \${cToF(0)}°F\`);
console.log(\`25°C = \${cToF(25)}°F\`);`,
    solutionExplanation: 'تابع پیکانی تک‌خطی نتیجه محاسبه را مستقیم برمی‌گرداند.',
    language: 'javascript',
    engine: 'bootstrap-js',
  },
  {
    id: 'hw-3-2-02',
    number: 2,
    title: 'تشخیص زوج یا فرد بودن اعداد یک آرایه',
    difficulty: 'easy',
    bookPage: '۲۱۲',
    estimatedMinutes: 10,
    prompt: 'آرایه [12, 7, 20, 33, 44] را پیمایش کرده و تعداد اعداد زوج و فرد را جداگانه در کنسول چاپ کنید.',
    sampleOutput: 'زوج: 3 | فرد: 2',
    hint: 'با عملگر باقیمانده n % 2 === 0 زوج بودن را بررسی کنید.',
    solutionCode: `const nums = [12, 7, 20, 33, 44];
let even = 0;
let odd = 0;
for (const n of nums) {
  if (n % 2 === 0) even++;
  else odd++;
}
console.log(\`زوج: \${even} | فرد: \${odd}\`);`,
    solutionExplanation: 'حلقه for...of همراه با عملگر === هر عنصر را دقیق دسته‌بندی می‌کند.',
    language: 'javascript',
    engine: 'bootstrap-js',
  },
  {
    id: 'hw-3-2-03',
    number: 3,
    title: 'تبدیل عدد روز هفته به نام فارسی با switch',
    difficulty: 'easy',
    bookPage: '۲۱۰',
    estimatedMinutes: 10,
    prompt: 'تابعی با switch بنویسید که عدد ۱ تا ۳ را به ترتیب به «شنبه»، «یکشنبه»، «دوشنبه» و سایر اعداد را به «نامعتبر» تبدیل کند.',
    sampleInput: '2',
    sampleOutput: 'یکشنبه',
    hint: 'حتماً در انتهای هر case دستور break یا return قرار دهید.',
    solutionCode: `function dayName(num) {
  switch (num) {
    case 1: return "شنبه";
    case 2: return "یکشنبه";
    case 3: return "دوشنبه";
    default: return "نامعتبر";
  }
}
console.log(dayName(2));
console.log(dayName(9));`,
    solutionExplanation: 'وقتی داخل تابع از return استفاده می‌کنیم، خود return از switch هم خارج می‌شود و دیگر Fall-through رخ نمی‌دهد.',
    language: 'javascript',
    engine: 'bootstrap-js',
  },
  {
    id: 'hw-3-2-04',
    number: 4,
    title: 'مدیریت صف چاپ با push و pop',
    difficulty: 'easy',
    bookPage: '۲۱۷ و ۲۳۲',
    estimatedMinutes: 12,
    prompt: 'آرایه‌ای از ۲ فایل ["a.pdf", "b.pdf"] بسازید؛ فایل "c.pdf" را با push اضافه کنید، سپس آخرین فایل را با pop برداشته و آرایه باقی‌مانده را چاپ کنید.',
    sampleOutput: 'حذف‌شده: c.pdf | باقی‌مانده: ["a.pdf","b.pdf"]',
    hint: 'خروجی pop() را درون یک متغیر ذخیره کنید.',
    solutionCode: `const queue = ["a.pdf", "b.pdf"];
queue.push("c.pdf");
const last = queue.pop();
console.log("حذف‌شده:", last);
console.log("باقی‌مانده:", queue);`,
    solutionExplanation: 'push به انتها می‌افزاید و pop از انتها برمی‌دارد (ساختار پشته LIFO).',
    language: 'javascript',
    engine: 'bootstrap-js',
  },
  {
    id: 'hw-3-2-05',
    number: 5,
    title: 'میانگین و بیشینه نمرات کلاس',
    difficulty: 'medium',
    bookPage: '۲۱۸',
    estimatedMinutes: 15,
    prompt: 'آرایه نمرات [17.5, 19, 14.25, 20, 16] را بررسی کرده و میانگین (با ۲ رقم اعشار با toFixed(2)) و بالاترین نمره را چاپ کنید.',
    sampleOutput: 'میانگین: 17.35 | بیشینه: 20',
    hint: 'از Math.max(...scores) یا حلقه مقایسه و متد toFixed(2) استفاده کنید.',
    solutionCode: `const scores = [17.5, 19, 14.25, 20, 16];
let sum = 0;
let max = scores[0];
for (const s of scores) {
  sum += s;
  if (s > max) max = s;
}
const avg = (sum / scores.length).toFixed(2);
console.log(\`میانگین: \${avg} | بیشینه: \${max}\`);`,
    solutionExplanation: 'متد toFixed(2) عدد اعشاری را با دقیقاً دو رقم پس از ممیز قالب‌بندی می‌کند.',
    language: 'javascript',
    engine: 'bootstrap-js',
  },
  {
    id: 'hw-3-2-06',
    number: 6,
    title: 'ساخت شیء کتابخانه و متد جستجو',
    difficulty: 'medium',
    bookPage: '۲۲۱',
    estimatedMinutes: 15,
    prompt: 'آرایه‌ای از ۳ شیء کتاب (title و pages) بسازید و تابعی بنویسید که فقط کتاب‌های بالای ۲۰۰ صفحه را برگرداند.',
    sampleOutput: 'طراح سایت (330 صفحه)',
    hint: 'از متد filter(b => b.pages > 200) استفاده کنید.',
    solutionCode: `const library = [
  { title: "طراح سایت", pages: 330 },
  { title: "آشنایی با وب", pages: 120 },
  { title: "پایگاه داده", pages: 240 }
];

const bigBooks = library.filter(b => b.pages > 200);
for (const b of bigBooks) {
  console.log(\`\${b.title} (\${b.pages} صفحه)\`);
}`,
    solutionExplanation: 'متد filter آرایه جدیدی از اشیای واجد شرط می‌سازد.',
    language: 'javascript',
    engine: 'bootstrap-js',
  },
  {
    id: 'hw-3-2-07',
    number: 7,
    title: 'ساخت دکمه تولید رنگ پس‌زمینه تصادفی با DOM',
    difficulty: 'medium',
    bookPage: '۲۲۷',
    estimatedMinutes: 15,
    prompt: 'دکمه‌ای بسازید که با هر کلیک یکی از ۴ رنگ پاستلی موجود در آرایه را به‌صورت تصادفی با Math.random روی پس‌زمینه کادر اعمال کرده و کد رنگ را نمایش دهد.',
    sampleOutput: 'تغییر رنگ زنده کادر و نمایش کد رنگ Hex',
    hint: 'اندیس تصادفی برابر Math.floor(Math.random() * colors.length) است.',
    solutionCode: `<div id="palette" class="p-4 rounded-3 border text-center">
  <p id="colorCode" class="fw-bold mb-2">#f8fafc</p>
  <button id="randBtn" class="btn btn-dark btn-sm">رنگ تصادفی</button>
</div>
<script>
const colors = ["#e0f2fe", "#dcfce7", "#fef3c7", "#fce7f3"];
const box = document.querySelector("#palette");
const codeEl = document.querySelector("#colorCode");
document.querySelector("#randBtn").addEventListener("click", () => {
  const c = colors[Math.floor(Math.random() * colors.length)];
  box.style.backgroundColor = c;
  codeEl.textContent = c;
});
</script>`,
    solutionExplanation: 'ترکیب Math.random و style.backgroundColor تغییر آنی و زنده در صفحه می‌سازد.',
    language: 'html',
    engine: 'bootstrap-js',
  },
  {
    id: 'hw-3-2-08',
    number: 8,
    title: 'کلاس ES6 حساب بانکی (BankAccount) با واریز و برداشت',
    difficulty: 'medium',
    bookPage: '۲۲۵',
    estimatedMinutes: 18,
    prompt: 'کلاس BankAccount را با ویژگی‌های owner و balance و دو متد deposit(amount) و withdraw(amount) (با بررسی کفایت موجودی) پیاده‌سازی کنید.',
    sampleOutput: 'موجودی نهایی پس از واریز و برداشت معتبر',
    hint: 'در withdraw ابتدا بررسی کنید amount <= this.balance باشد.',
    solutionCode: `class BankAccount {
  constructor(owner, balance = 0) {
    this.owner = owner;
    this.balance = balance;
  }
  deposit(amount) {
    if (amount > 0) this.balance += amount;
  }
  withdraw(amount) {
    if (amount > this.balance) {
      console.warn("موجودی کافی نیست!");
      return;
    }
    this.balance -= amount;
  }
}

const acc = new BankAccount("مریم", 500000);
acc.deposit(200000);
acc.withdraw(900000);
acc.withdraw(150000);
console.log(\`موجودی \${acc.owner}: \${acc.balance} تومان\`);`,
    solutionExplanation: 'کنترل کفایت موجودی درون متد withdraw از منفی شدن حساب جلوگیری می‌کند.',
    language: 'javascript',
    engine: 'bootstrap-js',
  },
  {
    id: 'hw-3-2-09',
    number: 9,
    title: 'اعتبارسنجی شماره موبایل ایرانی (۰۹ و ۱۱ رقم)',
    difficulty: 'challenging',
    bookPage: '۲۳۰',
    estimatedMinutes: 20,
    prompt: 'تابعی به نام isValidIranMobile(phone) بنویسید که بررسی کند رشته پس از trim دقیقاً ۱۱ کاراکتر باشد، با "09" شروع شود و تمام کاراکترهایش رقم باشند.',
    sampleInput: '"09123456789" و "091234"',
    sampleOutput: 'true و false',
    hint: 'از startsWith("09")، length === 11 و حلقه بررسی کاراکترها یا عبارت منظم /^09\\d{9}$/ استفاده کنید.',
    solutionCode: `function isValidIranMobile(phone) {
  const clean = phone.trim();
  return /^09\\d{9}$/.test(clean);
}

console.log("09123456789 =>", isValidIranMobile("09123456789"));
console.log("091234 =>", isValidIranMobile("091234"));
console.log("08123456789 =>", isValidIranMobile("08123456789"));`,
    solutionExplanation: 'الگوی /^09\\d{9}$/ دقیقاً شروع با 09 و ادامه با ۹ رقم عددی (جمعاً ۱۱ رقم) را تأیید می‌کند.',
    language: 'javascript',
    engine: 'bootstrap-js',
  },
  {
    id: 'hw-3-2-10',
    number: 10,
    title: 'سنجشگر قدرت رمز عبور (ضعیف / متوسط / قوی) روی DOM',
    difficulty: 'challenging',
    bookPage: '۲۳۰–۲۳۱',
    estimatedMinutes: 22,
    prompt: 'فیلد رمز عبوری بسازید که هنگام تایپ (رویداد input)، اگر طول کمتر از ۶ بود «ضعیف» (قرمز)، اگر ۶ تا ۹ بود «متوسط» (زرد) و اگر ۱۰ کاراکتر یا بیشتر همراه با عدد بود «قوی» (سبز) نمایش دهد.',
    sampleOutput: 'به‌روزرسانی زنده نشانگر قدرت رمز عبور',
    hint: 'وجود عدد در رشته را با /\\d/.test(pass) بررسی کنید.',
    solutionCode: `<div class="p-3" style="max-width:380px;">
  <input id="pw" type="password" class="form-control mb-2" placeholder="رمز عبور را تایپ کنید..." />
  <div id="meter" class="small fw-bold text-secondary">در انتظار ورود رمز...</div>
</div>
<script>
const pw = document.querySelector("#pw");
const meter = document.querySelector("#meter");
pw.addEventListener("input", () => {
  const v = pw.value;
  if (v.length < 6) {
    meter.className = "small fw-bold text-danger";
    meter.textContent = "قدرت رمز: ضعیف (حداقل ۶ کاراکتر)";
  } else if (v.length >= 10 && /\\d/.test(v)) {
    meter.className = "small fw-bold text-success";
    meter.textContent = "قدرت رمز: قوی";
  } else {
    meter.className = "small fw-bold text-warning";
    meter.textContent = "قدرت رمز: متوسط (طولانی‌تر با عدد قوی‌تر است)";
  }
});
</script>`,
    solutionExplanation: 'بازخورد لحظه‌ای (Live Feedback) با رویداد input استاندارد مدرن فرم‌های ثبت‌نام است.',
    language: 'html',
    engine: 'bootstrap-js',
  },
];

export const UNIT_3_2_QUIZZES: QuickQuizQuestion[] = [
  {
    id: 'quiz-3-2-01',
    kind: 'output',
    question: 'خروجی کد جاوااسکریپت زیر در کنسول چیست؟',
    codeSnippet: `console.log("5" === 5, "5" == 5);`,
    language: 'javascript',
    options: ['true true', 'false true', 'false false', 'true false'],
    correctIndex: 1,
    explanation: '=== نوع داده را هم بررسی می‌کند (false)، اما == رشته "5" را به عدد تبدیل کرده و true برمی‌گرداند.',
    bookPage: '۲۰۴',
  },
  {
    id: 'quiz-3-2-02',
    kind: 'bug-spot',
    question: 'خطای موجود در کد ص ۲۰۵ کتاب زیر چیست؟',
    codeSnippet: `Let price = 45000;\nconsole.log(price);`,
    language: 'javascript',
    options: [
      'باید به جای = از == استفاده شود',
      'کلیدواژه Let با حرف بزرگ اشتباه است و باید let باشد',
      'عدد 45000 باید درون کوتیشن باشد',
      'نیازی به سمی‌کالن نیست',
    ],
    correctIndex: 1,
    explanation: 'جاوااسکریپت به حروف بزرگ و کوچک حساس است و کلیدواژه صحیح let (حروف کوچک) است.',
    bookPage: '۲۰۵',
  },
  {
    id: 'quiz-3-2-03',
    kind: 'output',
    question: 'خروجی دستور زیر چه خواهد بود؟',
    codeSnippet: `const items = ["A", "B", "C"];\nconst x = items.pop();\nconsole.log(x, items.length);`,
    language: 'javascript',
    options: ['A 2', 'C 2', 'C 3', 'undefined 2'],
    correctIndex: 1,
    explanation: 'متد pop() آخرین عنصر ("C") را حذف و برمی‌گرداند؛ بنابراین طول آرایه به ۲ کاهش می‌یابد.',
    bookPage: '۲۳۲',
  },
  {
    id: 'quiz-3-2-04',
    kind: 'concept',
    question: 'تفاوت اصلی document.getElementById و document.querySelector در انتخاب عنصر با id="msg" چیست؟',
    options: [
      'هیچ تفاوتی ندارند و هر دو به شکل ("#msg") نوشته می‌شوند',
      'getElementById بدون # ("msg") و querySelector با # ("#msg") نوشته می‌شود',
      'querySelector فقط برای کلاس‌ها کار می‌کند',
      'getElementById یک آرایه برمی‌گرداند',
    ],
    correctIndex: 1,
    explanation: 'querySelector هر انتخابگر استاندارد CSS (مثل #msg یا .card) را می‌پذیرد اما getElementById فقط نام خام شناسه را می‌گیرد.',
    bookPage: '۲۲۷ و ۲۳۲',
  },
  {
    id: 'quiz-3-2-05',
    kind: 'bug-spot',
    question: 'در فرم ورود ص ۲۳۰ کتاب، چرا وقتی کاربر رمز ۶ کاراکتری "123456" وارد می‌کند همچنان خطا می‌گیرد؟',
    codeSnippet: `if (pass.length <= 6) {\n  alert("رمز باید حداقل ۶ کاراکتر باشد");\n}`,
    language: 'javascript',
    options: [
      'چون به جای length باید size نوشت',
      'چون عملگر <= عدد ۶ را هم شامل خطا می‌کند؛ باید < 6 باشد',
      'چون رمز نباید عدد باشد',
      'چون باید به جای if از while استفاده کرد',
    ],
    correctIndex: 1,
    explanation: 'برای شرط «حداقل ۶ کاراکتر»، طول ۶ معتبر است و فقط طول کمتر از ۶ (< 6) باید خطا بدهد.',
    bookPage: '۲۳۰',
  },
  {
    id: 'quiz-3-2-06',
    kind: 'output',
    question: 'نتیجه اجرای عبارت زیر در جاوااسکریپت چیست؟',
    codeSnippet: `console.log("20" + 5);`,
    language: 'javascript',
    options: ['25', '"205"', 'خطای TypeError', 'NaN'],
    correctIndex: 1,
    explanation: 'وقتی یک طرف عملگر + رشته باشد، جاوااسکریپت عدد ۵ را هم به رشته تبدیل کرده و دو متن را به هم می‌چسباند ("205").',
    bookPage: '۲۰۳',
  },
  {
    id: 'quiz-3-2-07',
    kind: 'concept',
    question: 'چرا برای نمایش متن ورودی کاربر در صفحه باید از textContent به جای innerHTML استفاده کرد؟',
    options: [
      'textContent رنگ متن را زیباتر می‌کند',
      'innerHTML در مرورگرهای جدید حذف شده است',
      'textContent از اجرای کدهای مخرب HTML/JS (حمله XSS) جلوگیری می‌کند',
      'textContent فقط برای اعداد کار می‌کند',
    ],
    correctIndex: 2,
    explanation: 'textContent هر ورودی را صرفاً به صورت متن خام نمایش می‌دهد و تگ‌های HTML را تفسیر نمی‌کند.',
    bookPage: '۲۲۷',
  },
  {
    id: 'quiz-3-2-08',
    kind: 'concept',
    question: 'دستور event.preventDefault() درون رویداد submit فرم چه کاری انجام می‌دهد؟',
    options: [
      'مقدار تمام فیلدها را پاک می‌کند',
      'از ارسال پیش‌فرض فرم و بارگذاری مجدد (Refresh) صفحه جلوگیری می‌کند',
      'پنجره مرورگر را می‌بندد',
      'کلاس‌های CSS فرم را حذف می‌کند',
    ],
    correctIndex: 1,
    explanation: 'این دستور به جاوااسکریپت اجازه می‌دهد ابتدا فرم را اعتبارسنجی کند بدون اینکه صفحه رفرش شود.',
    bookPage: '۲۳۰',
  },
  {
    id: 'quiz-3-2-09',
    kind: 'bug-spot',
    question: 'مشکل کد زیر در تعریف و ساخت شیء از کلاس ES6 چیست؟',
    codeSnippet: `class Book {\n  constructor(t) { this.title = t; }\n}\nconst b = Book("طراح سایت");`,
    language: 'javascript',
    options: [
      'نام متد باید __init__ باشد',
      'کلیدواژه new پیش از Book("طراح سایت") جا افتاده است',
      'کلاس نمی‌تواند constructor داشته باشد',
      'const برای اشیا مجاز نیست',
    ],
    correctIndex: 1,
    explanation: 'در جاوااسکریپت ساخت نمونه از کلاس ES6 حتماً باید با کلیدواژه new انجام شود: new Book("طراح سایت").',
    bookPage: '۲۲۵',
  },
];
