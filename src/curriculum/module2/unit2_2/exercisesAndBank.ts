import type {
  ClassroomActivity,
  HomeworkAssignment,
  QuickQuizQuestion,
} from '../../../types/curriculum.ts';

export const UNIT_2_2_ACTIVITIES: ClassroomActivity[] = [
  {
    id: 'act-2-2-grid',
    kind: 'workshop',
    title: 'کارگاه خدمات ویژه با CSS Grid (۵ ستونه واکنش‌گرا)',
    bookPage: '۱۳۹ تا ۱۴۰',
    estimatedMinutes: 12,
    prompt:
      'بخش «خدمات ویژه» فروشگاه مرجع نو را با display: grid و repeat(auto-fit, minmax(120px, 1fr)) طوری بچینید که هم در دسکتاپ و هم در موبایل مرتب بماند.',
    steps: [
      'روی کلاس .services ویژگی display: grid قرار دهید.',
      'ستون‌ها را با grid-template-columns: repeat(auto-fit, minmax(120px, 1fr)) تعریف کنید.',
      'با gap: 12px فاصله منظم بین کارت‌ها ایجاد کنید.',
    ],
    hints: ['تست واکنش‌گرایی را با دکمه موبایل بالای پیش‌نمایش بررسی کنید.'],
    language: 'html',
    engine: 'web',
    starterCode: `<div class="services">
  <div class="svc">ارسال سریع</div>
  <div class="svc">ضمانت اصالت</div>
  <div class="svc">پرداخت امن</div>
  <div class="svc">پشتیبانی ۲۴ ساعته</div>
  <div class="svc">تخفیف دانش‌آموزی</div>
</div>`,
    cssStarter: `.services {
  /* اینجا CSS Grid بنویسید */
}
.svc {
  background: #e0f2fe; border: 1px solid #7dd3fc;
  padding: 14px; border-radius: 10px; text-align: center; font-weight: bold;
}`,
    solutionCode: `<div class="services">
  <div class="svc">ارسال سریع</div>
  <div class="svc">ضمانت اصالت</div>
  <div class="svc">پرداخت امن</div>
  <div class="svc">پشتیبانی ۲۴ ساعته</div>
  <div class="svc">تخفیف دانش‌آموزی</div>
</div>`,
    cssSolution: `.services {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 12px;
}
.svc {
  background: #e0f2fe; border: 1px solid #7dd3fc;
  padding: 14px; border-radius: 10px; text-align: center; font-weight: bold;
}`,
    solutionExplanation: 'تابع repeat(auto-fit, minmax(120px, 1fr)) بدون نیاز به Media Query تعداد ستون‌ها را تطبیق می‌دهد.',
    alternativeSolutionCode: `<div style="display:flex;flex-wrap:wrap;gap:12px;">
  <div style="flex:1 1 120px;background:#e0f2fe;padding:14px;border-radius:10px;text-align:center;font-weight:bold;">ارسال سریع</div>
  <div style="flex:1 1 120px;background:#e0f2fe;padding:14px;border-radius:10px;text-align:center;font-weight:bold;">ضمانت اصالت</div>
  <div style="flex:1 1 120px;background:#e0f2fe;padding:14px;border-radius:10px;text-align:center;font-weight:bold;">پرداخت امن</div>
</div>`,
    alternativeSolutionExplanation: 'پیاده‌سازی مشابه با Flexbox و ویژگی flex: 1 1 120px.',
  },
  {
    id: 'act-2-2-navbar-flex',
    kind: 'workshop',
    title: 'کارگاه نوار ناوبری راست‌به‌چپ با Flexbox و :hover',
    bookPage: '۱۳۵ تا ۱۳۶',
    estimatedMinutes: 10,
    prompt:
      'هدر فروشگاه مرجع نو را با Flexbox طوری طراحی کنید که لوگو در سمت راست، پیوندها در وسط و دکمه سبد خرید در سمت چپ با تراز عمودی یکسان قرار گیرند.',
    steps: [
      'روی .top-nav ویژگی‌های display: flex، justify-content: space-between و align-items: center بگذارید.',
      'لینک‌ها را بدون خط زیرین و با افکت :hover رنگ‌آمیزی کنید.',
    ],
    hints: ['در RTL اولین فرزند در سمت راست و آخرین فرزند در سمت چپ قرار می‌گیرد.'],
    language: 'html',
    engine: 'web',
    starterCode: `<header class="top-nav">
  <strong>مرجع نو</strong>
  <nav class="menu"><a href="#">خانه</a><a href="#">کتاب‌ها</a><a href="#">پشتیبانی</a></nav>
  <button class="cart-btn">سبد خرید (۲)</button>
</header>`,
    cssStarter: `.top-nav { background: #0f172a; color: #fff; padding: 12px 16px; border-radius: 10px; }`,
    solutionCode: `<header class="top-nav">
  <strong>📚 مرجع نو</strong>
  <nav class="menu"><a href="#">خانه</a><a href="#">کتاب‌ها</a><a href="#">پشتیبانی</a></nav>
  <button class="cart-btn">سبد خرید (۲)</button>
</header>`,
    cssSolution: `.top-nav { display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px; background: #0f172a; color: #fff; padding: 12px 16px; border-radius: 10px; }
.menu { display: flex; gap: 16px; }
.menu a { color: #cbd5e1; text-decoration: none; font-size: 14px; }
.menu a:hover { color: #38bdf8; }
.cart-btn { background: #10b981; color: #fff; border: none; padding: 6px 14px; border-radius: 8px; cursor: pointer; }`,
    solutionExplanation: 'ترکیب تمیز Flexbox برای چیدمان افقی واکنش‌گرا در سرصفحه.',
    alternativeSolutionCode: `<header style="display:grid;grid-template-columns:auto 1fr auto;align-items:center;gap:12px;background:#0f172a;color:#fff;padding:12px;border-radius:10px;">
  <strong>مرجع نو</strong><div style="text-align:center;">خانه | کتاب‌ها</div><button>سبد</button>
</header>`,
    alternativeSolutionExplanation: 'چیدمان نوار بالا با ۳ ستون CSS Grid (auto 1fr auto) که منو را دقیقاً وسط صفحه نگه می‌دارد.',
  },
  {
    id: 'act-2-2-box-card',
    kind: 'activity',
    title: 'فعالیت طراحی کارت محصول با Box Model، border-box و نشان تخفیف absolute',
    bookPage: '۱۳۰ و ۱۴۱',
    estimatedMinutes: 12,
    prompt:
      'کارت معرفی کتاب با عرض 240px، box-sizing: border-box، سایه ملایم و نشان قرمز «ویژه» در گوشه بالا-چپ کارت بسازید.',
    steps: [
      'روی کارت position: relative و box-sizing: border-box قرار دهید.',
      'نشان را با position: absolute; top: 10px; left: 10px در گوشه قفل کنید.',
    ],
    hints: ['بدون position: relative روی والد، نشان از کارت جدا می‌شود.'],
    language: 'html',
    engine: 'web',
    starterCode: `<article class="p-card">
  <span class="tag">ویژه</span>
  <img src="book1.jpg" alt="طراح سایت" />
  <h3>طراح سایت</h3>
</article>`,
    cssStarter: `.p-card { width: 240px; border: 1px solid #cbd5e1; padding: 12px; }`,
    solutionCode: `<article class="p-card">
  <span class="tag">۱۵٪ تخفیف</span>
  <img src="book1.jpg" alt="طراح سایت" />
  <h3>کتاب طراح سایت یازدهم</h3>
  <p class="price">۴۵٬۰۰۰ تومان</p>
</article>`,
    cssSolution: `.p-card { position: relative; box-sizing: border-box; width: 240px; border: 1px solid #cbd5e1; border-radius: 12px; padding: 12px; text-align: center; box-shadow: 0 4px 10px rgba(0,0,0,0.06); }
.p-card img { width: 100%; border-radius: 8px; }
.tag { position: absolute; top: 10px; left: 10px; background: #e11d48; color: #fff; padding: 3px 10px; border-radius: 999px; font-size: 11px; font-weight: bold; }
.price { color: #059669; font-weight: bold; margin: 0; }`,
    solutionExplanation: 'تسلط هم‌زمان بر Box Model و موقعیت‌دهی relative/absolute.',
    alternativeSolutionCode: `<article style="width:240px;border:1px solid #cbd5e1;border-radius:12px;padding:12px;text-align:center;">
  <div style="text-align:left;"><span style="background:#e11d48;color:#fff;padding:2px 8px;border-radius:999px;font-size:11px;">ویژه</span></div>
  <img src="book1.jpg" alt="کتاب" style="width:100%;margin-top:6px;" />
  <h4>طراح سایت</h4>
</article>`,
    alternativeSolutionExplanation: 'چیدمان بدون absolute برای مواقعی که نمی‌خواهیم برچسب روی تصویر بیفتد.',
  },
  {
    id: 'act-2-2-pricing-flex',
    kind: 'workshop',
    title: 'کارگاه ۳ پلن عضویت کتابخانه با کارت میانی برجسته',
    bookPage: '۱۳۷ تا ۱۳۸',
    estimatedMinutes: 12,
    prompt:
      'سه کارت اشتراک (پایه، حرفه‌ای، هنرستانی) را با Flexbox کنار هم بچینید و کارت میانی را با رنگ متمایز و کادر آبی برجسته کنید.',
    steps: [
      'ظرف .plans را با display: flex; flex-wrap: wrap; justify-content: center; gap: 14px تنظیم کنید.',
      'به کارت میانی کلاس .popular بدهید و با border-color و سایه متمایزش کنید.',
    ],
    hints: ['از align-items: stretch استفاده کنید تا ارتفاع هر سه کارت هم‌تراز شود.'],
    language: 'html',
    engine: 'web',
    starterCode: `<div class="plans">
  <div class="plan"><h3>پایه</h3><p>رایگان</p></div>
  <div class="plan popular"><h3>حرفه‌ای</h3><p>۲۵٬۰۰۰ تومان</p></div>
  <div class="plan"><h3>هنرستانی</h3><p>۱۵٬۰۰۰ تومان</p></div>
</div>`,
    cssStarter: `.plans { display: flex; gap: 12px; }`,
    solutionCode: `<div class="plans">
  <div class="plan"><h3>پایه</h3><p class="p">رایگان</p><button>انتخاب</button></div>
  <div class="plan popular"><h3>⭐ حرفه‌ای</h3><p class="p">۲۵٬۰۰۰ تومان</p><button>انتخاب ویژه</button></div>
  <div class="plan"><h3>هنرستانی</h3><p class="p">۱۵٬۰۰۰ تومان</p><button>انتخاب</button></div>
</div>`,
    cssSolution: `.plans { display: flex; flex-wrap: wrap; justify-content: center; gap: 14px; }
.plan { flex: 1 1 160px; max-width: 220px; border: 1px solid #cbd5e1; border-radius: 12px; padding: 16px; text-align: center; background: #fff; }
.popular { border: 2px solid #0284c7; background: #f0f9ff; transform: translateY(-4px); box-shadow: 0 8px 20px rgba(2,132,199,0.15); }
.p { font-weight: bold; color: #059669; }
.plan button { background: #0284c7; color: #fff; border: none; padding: 7px 14px; border-radius: 8px; cursor: pointer; }`,
    solutionExplanation: 'استفاده از چند کلاس هم‌زمان (class="plan popular") برای بازنویسی هدفمند استایل کارت ویژه.',
    alternativeSolutionCode: `<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(160px,1fr));gap:12px;">
  <div style="border:1px solid #cbd5e1;padding:14px;border-radius:10px;text-align:center;">پایه</div>
  <div style="border:2px solid #0284c7;padding:14px;border-radius:10px;text-align:center;">حرفه‌ای</div>
  <div style="border:1px solid #cbd5e1;padding:14px;border-radius:10px;text-align:center;">هنرستانی</div>
</div>`,
    alternativeSolutionExplanation: 'چیدمان هم‌عرض با CSS Grid.',
  },
  {
    id: 'act-2-2-media-query',
    kind: 'workshop',
    title: 'کارگاه صفحه واکنش‌گرا با @media (دسکتاپ ۲ ستونه ← موبایل ۱ ستونه)',
    bookPage: '۱۴۲',
    estimatedMinutes: 10,
    prompt:
      'چیدمان ۲ ستونه (محتوای اصلی و ستون کناری) بسازید و با @media (max-width: 550px) آن را در موبایل به حالت ۱ ستونه و پنهان کردن تبلیغ تبدیل کنید.',
    steps: [
      'چیدمان پایه را با grid-template-columns: 2fr 1fr تعریف کنید.',
      'در بلوک @media (max-width: 550px) شبکه را به 1fr و ستون تبلیغ را به display: none تغییر دهید.',
    ],
    hints: ['با دکمه موبایل بالای پیش‌نمایش تغییر زنده را به کلاس نشان دهید.'],
    language: 'html',
    engine: 'web',
    starterCode: `<div class="page">
  <main class="content">محتوای اصلی مقاله</main>
  <aside class="ad">بنر تبلیغاتی (در موبایل مخفی شود)</aside>
</div>`,
    cssStarter: `.page { display: grid; grid-template-columns: 2fr 1fr; gap: 12px; }`,
    solutionCode: `<div class="page">
  <main class="content">محتوای اصلی فروشگاه کتاب مرجع نو (همیشه نمایش داده می‌شود)</main>
  <aside class="ad">بنر جانبی دسکتاپ (در عرض کمتر از ۵۵۰px پنهان می‌شود)</aside>
</div>`,
    cssSolution: `.page { display: grid; grid-template-columns: 2fr 1fr; gap: 12px; }
.content { background: #f0f9ff; border: 1px solid #7dd3fc; padding: 16px; border-radius: 10px; font-weight: bold; }
.ad { background: #fef3c7; border: 1px solid #f59e0b; padding: 16px; border-radius: 10px; }
@media (max-width: 550px) {
  .page { grid-template-columns: 1fr; }
  .ad { display: none; }
}`,
    solutionExplanation: 'کاربرد عملی Media Query برای ساده‌سازی رابط کاربری در نمایشگرهای کوچک.',
    alternativeSolutionCode: `<div style="display:flex;flex-wrap:wrap;gap:12px;">
  <main style="flex:2 1 260px;background:#f0f9ff;padding:16px;border-radius:10px;">محتوای اصلی</main>
  <aside style="flex:1 1 180px;background:#fef3c7;padding:16px;border-radius:10px;">ستون کناری</aside>
</div>`,
    alternativeSolutionExplanation: 'روش Flex Wrapping که ستون کناری را به‌جای حذف شدن، زیر محتوای اصلی می‌برد.',
  },
  {
    id: 'act-2-2-styled-form',
    kind: 'activity',
    title: 'فعالیت زیباسازی فرم ورود با :focus و دکمه تمام‌عرض',
    bookPage: '۱۲۳ و ۱۳۲',
    estimatedMinutes: 10,
    prompt:
      'فرم ورود ساده HTML را با CSS مدرن شامل کادر گرد، سایه نرم، رنگ کادر آبی هنگام :focus و دکمه تمام‌عرض با افکت هاور استایل‌دهی کنید.',
    steps: [
      'کارت فرم را با max-width: 340px و margin: 0 auto وسط‌چین کنید.',
      'به inputها width: 100%، box-sizing: border-box و استایل :focus بدهید.',
    ],
    hints: ['بدون box-sizing: border-box کادر ورودی دارای width: 100% + padding از کارت بیرون می‌زند!'],
    language: 'html',
    engine: 'web',
    starterCode: `<form class="login-card">
  <h3>ورود هنرجو</h3>
  <input type="text" placeholder="نام کاربری" />
  <input type="password" placeholder="رمز عبور" />
  <button type="button">ورود</button>
</form>`,
    cssStarter: `.login-card { max-width: 340px; margin: 0 auto; }`,
    solutionCode: `<form class="login-card">
  <h3>ورود به پنل مرجع نو</h3>
  <input type="text" placeholder="نام کاربری" />
  <input type="password" placeholder="رمز عبور" />
  <button type="button">ورود به حساب</button>
</form>`,
    cssSolution: `* { box-sizing: border-box; }
.login-card { max-width: 340px; margin: 0 auto; padding: 18px; border: 1px solid #cbd5e1; border-radius: 14px; background: #fff; box-shadow: 0 6px 18px rgba(15,23,42,0.08); }
.login-card h3 { margin-top: 0; text-align: center; }
.login-card input { width: 100%; padding: 9px 12px; margin-bottom: 10px; border: 2px solid #e2e8f0; border-radius: 8px; outline: none; }
.login-card input:focus { border-color: #0284c7; background: #f0f9ff; }
.login-card button { width: 100%; background: #0284c7; color: #fff; border: none; padding: 10px; border-radius: 8px; font-weight: bold; cursor: pointer; }
.login-card button:hover { background: #0369a1; }`,
    solutionExplanation: 'کاربرد عملی border-box و :focus برای طراحی فرم‌های مدرن.',
    alternativeSolutionCode: `<div style="max-width:340px;margin:0 auto;display:grid;gap:10px;padding:16px;border:1px solid #cbd5e1;border-radius:12px;">
  <input placeholder="نام کاربری" style="padding:8px;" /><button style="padding:8px;background:#0284c7;color:#fff;border:none;border-radius:8px;">ورود</button>
</div>`,
    alternativeSolutionExplanation: 'استفاده از display: grid و gap: 10px روی خود فرم به جای دادن margin-bottom به هر فیلد.',
  },
  {
    id: 'act-2-2-hover-gallery',
    kind: 'activity',
    title: 'فعالیت گالری تعاملی با transition و transform: scale()',
    bookPage: '۱۲۸ و ۱۳۹',
    estimatedMinutes: 10,
    prompt:
      'گالری ۳ ستونه از جلد کتاب‌ها بسازید که با رفتن موس روی هر کارت، کارت به‌نرمی بزرگ‌تر شده و سایه بگیرد.',
    steps: [
      'روی کارت transition: transform 0.25s, box-shadow 0.25s بگذارید.',
      'در :hover مقدار transform: scale(1.04) و سایه پررنگ‌تر اعمال کنید.',
    ],
    hints: ['overflow: hidden روی کارت باعث می‌شود گوشه‌های گرد عکس بیرون نزنند.'],
    language: 'html',
    engine: 'web',
    starterCode: `<div class="gal">
  <div class="g-item"><img src="book1.jpg" alt="کتاب ۱" /><p>طراح سایت</p></div>
  <div class="g-item"><img src="book2.jpg" alt="کتاب ۲" /><p>تولید محتوا</p></div>
  <div class="g-item"><img src="book3.jpg" alt="کتاب ۳" /><p>توسعه برنامه</p></div>
</div>`,
    cssStarter: `.gal { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; }`,
    solutionCode: `<div class="gal">
  <div class="g-item"><img src="book1.jpg" alt="کتاب ۱" /><p>طراح سایت</p></div>
  <div class="g-item"><img src="book2.jpg" alt="کتاب ۲" /><p>تولید محتوا</p></div>
  <div class="g-item"><img src="book3.jpg" alt="کتاب ۳" /><p>توسعه برنامه</p></div>
</div>`,
    cssSolution: `.gal { display: grid; grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); gap: 12px; }
.g-item { border: 1px solid #cbd5e1; border-radius: 12px; overflow: hidden; text-align: center; background: #fff; transition: transform 0.25s, box-shadow 0.25s; }
.g-item:hover { transform: scale(1.04); box-shadow: 0 10px 20px rgba(2,132,199,0.18); border-color: #0284c7; }
.g-item img { width: 100%; display: block; }
.g-item p { margin: 8px 0; font-weight: bold; font-size: 13px; }`,
    solutionExplanation: 'افزودن حرکت نرم (Micro-interaction) تنها با CSS خالص بدون جاوااسکریپت.',
    alternativeSolutionCode: `.g-item:hover { transform: translateY(-6px); }`,
    alternativeSolutionExplanation: 'بالا آوردن کارت با translateY(-6px) به جای بزرگ‌نمایی scale برای حفظ تراز خطوط.',
  },
  {
    id: 'act-2-2-marjanow-styled',
    kind: 'project',
    title: 'پروژه جامع واحد ۲.۲: صفحه کامل فروشگاه «مرجع نو» (Flex + Grid + Fixed Chat)',
    bookPage: '۱۳۷ تا ۱۴۲',
    estimatedMinutes: 15,
    prompt:
      'تمامی بخش‌های اصلی پروژه CSS کتاب را ترکیب کنید: هدر Flex، کارت‌های محصول Flex (با اصلاح center)، بخش خدمات Grid و دکمه پشتیبانی fixed در گوشه پایین (با اصلاح bottom: 14px).',
    steps: [
      'هدر را با Flexbox و space-between بسازید.',
      'ردیف محصولات را با Flexbox و بخش خدمات را با CSS Grid بچینید.',
      'دکمه چت آنلاین را با position: fixed; bottom: 14px; left: 14px تثبیت کنید.',
    ],
    hints: ['از * { box-sizing: border-box; } در خط اول CSS استفاده کنید.'],
    language: 'html',
    engine: 'web',
    starterCode: `<header class="hdr"><strong>مرجع نو</strong><span>فروشگاه کتاب</span></header>
<section class="prods"><div class="p">طراح سایت</div><div class="p">تولید محتوا</div></section>
<section class="svcs"><div>ارسال سریع</div><div>پشتیبانی</div><div>ضمانت</div></section>
<div class="chat">چت آنلاین</div>`,
    cssStarter: `* { box-sizing: border-box; }`,
    solutionCode: `<header class="hdr"><strong>📚 فروشگاه کتاب مرجع نو</strong><span>سال تحصیلی ۱۴۰۵</span></header>
<section class="prods">
  <div class="p"><img src="book1.jpg" alt="طراح سایت" /><h4>طراح سایت</h4><span>۴۵٬۰۰۰ تومان</span></div>
  <div class="p"><img src="book2.jpg" alt="تولید محتوا" /><h4>تولید محتوا</h4><span>۳۸٬۰۰۰ تومان</span></div>
</section>
<section class="svcs">
  <div class="s">🚚 ارسال سریع</div><div class="s">🔒 پرداخت امن</div><div class="s">🎓 تخفیف هنرستان</div>
</section>
<div class="chat">💬 پشتیبانی</div>`,
    cssSolution: `* { box-sizing: border-box; }
.hdr { display: flex; justify-content: space-between; align-items: center; background: #0f172a; color: #fff; padding: 12px 16px; border-radius: 10px; margin-bottom: 14px; }
.prods { display: flex; flex-wrap: wrap; justify-content: center; gap: 14px; margin-bottom: 14px; }
.p { width: 190px; border: 1px solid #cbd5e1; border-radius: 12px; padding: 10px; text-align: center; background: #fff; }
.p img { width: 100%; border-radius: 8px; }
.p span { color: #059669; font-weight: bold; font-size: 13px; }
.svcs { display: grid; grid-template-columns: repeat(auto-fit, minmax(120px, 1fr)); gap: 10px; }
.s { background: #e0f2fe; padding: 12px; border-radius: 10px; text-align: center; font-weight: bold; font-size: 13px; }
.chat { position: fixed; bottom: 14px; left: 14px; background: #0284c7; color: #fff; padding: 8px 14px; border-radius: 999px; font-size: 12px; }`,
    solutionExplanation: 'پوشش ۱۰۰٪ معیارهای جدول ارزشیابی اصلاح‌شده واحد ۲.۲ (ص ۱۴۳–۱۴۴).',
    alternativeSolutionCode: `<div style="display:grid;gap:12px;"><header style="background:#0f172a;color:#fff;padding:12px;border-radius:10px;">مرجع نو</header><main style="display:grid;grid-template-columns:repeat(auto-fit,minmax(160px,1fr));gap:10px;"><div style="border:1px solid #cbd5e1;padding:10px;border-radius:10px;">طراح سایت</div><div style="border:1px solid #cbd5e1;padding:10px;border-radius:10px;">تولید محتوا</div></main></div>`,
    alternativeSolutionExplanation: 'چیدمان یکپارچه تمام صفحه صرفاً با CSS Grid.',
  },
];

export const UNIT_2_2_HOMEWORKS: HomeworkAssignment[] = [
  {
    id: 'hw-2-2-01',
    number: 1,
    title: 'استایل‌دهی یک کارت پیام با رنگ، border-radius و line-height فارسی',
    difficulty: 'easy',
    bookPage: '۱۲۴ تا ۱۲۸',
    estimatedMinutes: 10,
    prompt:
      'یک کادر اطلاعیه سبز با حاشیه راست ضخیم، گوشه‌های گرد 12px و فاصله خطوط 1.8 برای پیام «ثبت‌نام کارگاه آغاز شد» بسازید.',
    sampleOutput: `کارت اطلاعیه سبز خوانا با کنتراست بالا`,
    hint: 'از border-right: 4px solid #10b981 و background: #ecfdf5 استفاده کنید.',
    solutionCode: `<div style="background:#ecfdf5;color:#065f46;border:1px solid #a7f3d0;border-right:5px solid #10b981;border-radius:12px;padding:14px;line-height:1.8;">
  <strong>اطلاعیه کارگاه:</strong> ثبت‌نام کلاس تقویتی طراحی وب ۱۴۰۵ آغاز شد.
</div>`,
    solutionExplanation: 'تمرین ترکیب رنگ‌های هماهنگ، کنتراست مناسب و تایپوگرافی فارسی.',
    language: 'html',
    engine: 'web',
  },
  {
    id: 'hw-2-2-02',
    number: 2,
    title: 'طراحی ۳ دکمه با حالت‌های :hover و transition نرم',
    difficulty: 'easy',
    bookPage: '۱۲۳ و ۱۲۸',
    estimatedMinutes: 10,
    prompt:
      'سه دکمه (اصلی آبی، موفقیت سبز، خطر قرمز) کنار هم بسازید که هنگام هاور موس رنگشان تیره‌تر شده و ۲ پیکسل به بالا حرکت کنند.',
    sampleOutput: `سه دکمه رنگی با افکت حرکت نرم هنگام هاور`,
    hint: 'از transition: 0.2s و transform: translateY(-2px) در :hover استفاده کنید.',
    solutionCode: `<style>
.btn { border: none; color: #fff; padding: 8px 16px; border-radius: 8px; cursor: pointer; margin-left: 8px; transition: 0.2s; font-weight: bold; }
.btn:hover { transform: translateY(-2px); filter: brightness(0.9); }
.b-primary { background: #0284c7; }
.b-success { background: #059669; }
.b-danger { background: #e11d48; }
</style>
<button class="btn b-primary">ذخیره</button>
<button class="btn b-success">تأیید سفارش</button>
<button class="btn b-danger">حذف</button>`,
    solutionExplanation: 'تمرین کلاس‌های مشترک و اختصاصی همراه با شبه‌کلاس :hover.',
    language: 'html',
    engine: 'web',
  },
  {
    id: 'hw-2-2-03',
    number: 3,
    title: 'تمرین Box Model: دو جعبه 200px با box-sizing: border-box',
    difficulty: 'easy',
    bookPage: '۱۲۹ تا ۱۳۲',
    estimatedMinutes: 10,
    prompt:
      'دو جعبه با width: 200px، padding: 16px 24px، border: 2px solid و margin: 12px auto بسازید تا وسط صفحه و هم‌اندازه قرار گیرند.',
    sampleOutput: `دو جعبه دقیقاً هم‌عرض و وسط‌چین در صفحه`,
    hint: 'box-sizing: border-box را فراموش نکنید و بین مقادیر padding فقط فاصله بگذارید.',
    solutionCode: `<style>
.b { box-sizing: border-box; width: 200px; padding: 16px 24px; border: 2px solid #0284c7; margin: 12px auto; border-radius: 10px; text-align: center; background: #f0f9ff; }
</style>
<div class="b">جعبه اول (۲۰۰px)</div>
<div class="b">جعبه دوم (۲۰۰px)</div>`,
    solutionExplanation: 'تثبیت کاربرد دقیق margin، padding و border-box.',
    language: 'html',
    engine: 'web',
  },
  {
    id: 'hw-2-2-04',
    number: 4,
    title: 'نوار پیوندهای افقی با Flexbox و فاصله یکنواخت gap',
    difficulty: 'easy',
    bookPage: '۱۳۵ تا ۱۳۶',
    estimatedMinutes: 10,
    prompt:
      'لیست ۴ لینک منوی سایت را با display: flex، justify-content: center و gap: 20px در یک نوار افقی بدون نقطه‌های پیش‌فرض بچینید.',
    sampleOutput: `نوار افقی وسط‌چین با ۴ لینک مرتب`,
    hint: 'روی تگ <ul> ویژگی list-style: none و padding: 0 قرار دهید.',
    solutionCode: `<style>
.nav-ul { list-style: none; padding: 10px; margin: 0; display: flex; justify-content: center; gap: 20px; background: #f1f5f9; border-radius: 10px; }
.nav-ul a { text-decoration: none; color: #0f172a; font-weight: bold; }
.nav-ul a:hover { color: #0284c7; }
</style>
<ul class="nav-ul"><li><a href="#">خانه</a></li><li><a href="#">دوره‌ها</a></li><li><a href="#">کتاب‌ها</a></li><li><a href="#">تماس</a></li></ul>`,
    solutionExplanation: 'تبدیل لیست معنایی HTML به منوی افقی با Flexbox.',
    language: 'html',
    engine: 'web',
  },
  {
    id: 'hw-2-2-05',
    number: 5,
    title: 'جدول راه‌راه با :nth-child(even) و هاور ردیف‌ها',
    difficulty: 'medium',
    bookPage: '۱۲۳',
    estimatedMinutes: 12,
    prompt:
      'جدول ۴ ردیفه دروس پایه یازدهم را طوری استایل دهید که ردیف‌های زوج پس‌زمینه خاکستری ملایم و ردیف زیر موس پس‌زمینه آبی کم‌رنگ بگیرد.',
    sampleOutput: `جدول خوانا با رنگ‌آمیزی خودکار یک‌درمیان`,
    hint: 'از انتخابگر tbody tr:nth-child(even) استفاده کنید.',
    solutionCode: `<style>
.t { width: 100%; border-collapse: collapse; text-align: right; }
.t th { background: #0284c7; color: #fff; padding: 8px; }
.t td { padding: 8px; border-bottom: 1px solid #e2e8f0; }
.t tbody tr:nth-child(even) { background: #f8fafc; }
.t tbody tr:hover { background: #e0f2fe; }
</style>
<table class="t"><thead><tr><th>درس</th><th>واحد</th></tr></thead><tbody>
<tr><td>طراح سایت</td><td>۱۰ واحد</td></tr><tr><td>تولید محتوا</td><td>۵ پودمان</td></tr>
<tr><td>پایگاه داده</td><td>۵ پودمان</td></tr><tr><td>کارآفرینی</td><td>۲ ساعت</td></tr>
</tbody></table>`,
    solutionExplanation: 'استایل‌دهی حرفه‌ای جداول با شبه‌کلاس‌های ساختاری CSS3.',
    language: 'html',
    engine: 'web',
  },
  {
    id: 'hw-2-2-06',
    number: 6,
    title: 'شبکه ۴ کارت آماری با CSS Grid و repeat(auto-fit, minmax)',
    difficulty: 'medium',
    bookPage: '۱۳۹ تا ۱۴۰',
    estimatedMinutes: 12,
    prompt:
      'چهار کارت آماری (تعداد کتاب‌ها، هنرجویان، پودمان‌ها، تمرین‌ها) را در یک شبکه CSS Grid واکنش‌گرا با حداقل عرض ۱۳۰px برای هر کارت بچینید.',
    sampleOutput: `۴ کارت آماری هم‌اندازه و کاملاً واکنش‌گرا`,
    hint: 'grid-template-columns: repeat(auto-fit, minmax(130px, 1fr));',
    solutionCode: `<style>
.stats { display: grid; grid-template-columns: repeat(auto-fit, minmax(130px, 1fr)); gap: 12px; }
.st { background: #fff; border: 1px solid #cbd5e1; border-radius: 12px; padding: 14px; text-align: center; }
.st strong { display: block; font-size: 20px; color: #0284c7; }
</style>
<div class="stats">
  <div class="st"><strong>۱۲۰</strong>کتاب درسی</div>
  <div class="st"><strong>۴۵۰</strong>هنرجو</div>
  <div class="st"><strong>۵</strong>پودمان</div>
  <div class="st"><strong>۳۰۰+</strong>تمرین</div>
</div>`,
    solutionExplanation: 'کاربرد عملی CSS Grid در کارت‌های داشبورد.',
    language: 'html',
    engine: 'web',
  },
  {
    id: 'hw-2-2-07',
    number: 7,
    title: 'کارت کتاب با برچسب وضعیت «موجود» در گوشه (relative + absolute)',
    difficulty: 'medium',
    bookPage: '۱۴۱',
    estimatedMinutes: 15,
    prompt:
      'کارت تصویر کتابی بسازید که برچسب سبز «موجود در انبار» دقیقاً در گوشه بالا-راست کارت ثابت شده باشد.',
    sampleOutput: `کارت محصول با نشان موقعیت‌دهی‌شده در گوشه بالا-راست`,
    hint: 'به کارت position: relative و به برچسب position: absolute; top: 10px; right: 10px بدهید.',
    solutionCode: `<style>
.c { position: relative; width: 220px; border: 1px solid #cbd5e1; border-radius: 12px; padding: 12px; text-align: center; }
.c img { width: 100%; border-radius: 8px; }
.stock { position: absolute; top: 10px; right: 10px; background: #10b981; color: #fff; padding: 3px 10px; border-radius: 999px; font-size: 11px; }
</style>
<div class="c"><span class="stock">موجود در انبار</span><img src="book2.jpg" alt="کتاب" /><h4>تولید محتوا</h4></div>`,
    solutionExplanation: 'تثبیت الگوی والد relative و فرزند absolute.',
    language: 'html',
    engine: 'web',
  },
  {
    id: 'hw-2-2-08',
    number: 8,
    title: 'صفحه واکنش‌گرا با @media برای ۳ اندازه (دسکتاپ، تبلت، موبایل)',
    difficulty: 'challenging',
    bookPage: '۱۴۲',
    estimatedMinutes: 18,
    prompt:
      'شبکه‌ای بسازید که در دسکتاپ ۴ ستون، در عرض زیر 768px دو ستون و در عرض زیر 480px یک ستون داشته باشد.',
    sampleOutput: `تغییر خودکار ۴ ← ۲ ← ۱ ستون با تغییر عرض پنجره`,
    hint: 'قانون 768px را بالاتر از قانون 480px بنویسید تا در عرض کوچک‌تر بازنویسی شود.',
    solutionCode: `<style>
.g { display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; }
.item { background: #e0f2fe; padding: 16px; border-radius: 8px; text-align: center; font-weight: bold; }
@media (max-width: 768px) { .g { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 480px) { .g { grid-template-columns: 1fr; } }
</style>
<div class="g"><div class="item">۱</div><div class="item">۲</div><div class="item">۳</div><div class="item">۴</div></div>`,
    solutionExplanation: 'رعایت ترتیب آبشاری (Cascade) در Media Queries چندمرحله‌ای.',
    language: 'html',
    engine: 'web',
  },
  {
    id: 'hw-2-2-09',
    number: 9,
    title: 'چیدمان کامل یک صفحه وب با Grid Areas (Header, Sidebar, Main, Footer)',
    difficulty: 'challenging',
    bookPage: '۱۳۹ تا ۱۴۰',
    estimatedMinutes: 20,
    prompt:
      'اسکلت ۴ بخشی صفحه (سرصفحه تمام‌عرض، ستون کناری + محتوای اصلی، پاورقی تمام‌عرض) را با CSS Grid بسازید.',
    sampleOutput: `ساختار کامل وب‌سایت ۲ ستونه با هدر و فوتر تمام‌عرض`,
    hint: 'می‌توانید برای هدر و فوتر از grid-column: 1 / -1 استفاده کنید.',
    solutionCode: `<style>
.shell { display: grid; grid-template-columns: 200px 1fr; gap: 10px; }
.full { grid-column: 1 / -1; background: #0f172a; color: #fff; padding: 12px; border-radius: 8px; }
.side { background: #fef3c7; padding: 14px; border-radius: 8px; }
.main { background: #f8fafc; border: 1px solid #cbd5e1; padding: 14px; border-radius: 8px; }
@media (max-width: 560px) { .shell { grid-template-columns: 1fr; } }
</style>
<div class="shell"><header class="full">سرصفحه</header><aside class="side">منوی کناری</aside><main class="main">محتوای اصلی</main><footer class="full">پاورقی</footer></div>`,
    solutionExplanation: 'استفاده حرفه‌ای از grid-column: 1 / -1 برای کشیدن هدر و فوتر در کل عرض شبکه.',
    language: 'html',
    engine: 'web',
  },
  {
    id: 'hw-2-2-10',
    number: 10,
    title: 'کارت‌های محصول با ارتفاع برابر و دکمه چسبیده به پایین (Nested Flex)',
    difficulty: 'challenging',
    bookPage: '۱۳۷ تا ۱۳۸',
    estimatedMinutes: 20,
    prompt:
      'سه کارت محصول با طول توضیحات متفاوت بسازید که همگی هم‌ارتفاع باشند و دکمه «خرید» هر سه کارت دقیقاً در یک خط افقی در پایین کارت بنشیند.',
    sampleOutput: `سه کارت با دکمه‌های کاملاً تراز‌شده در لبه پایین`,
    hint: 'هر کارت را display: flex; flex-direction: column کنید و به دکمه margin-top: auto بدهید.',
    solutionCode: `<style>
.row { display: grid; grid-template-columns: repeat(auto-fit, minmax(160px, 1fr)); gap: 12px; }
.c { display: flex; flex-direction: column; border: 1px solid #cbd5e1; border-radius: 10px; padding: 12px; background: #fff; }
.c button { margin-top: auto; background: #0284c7; color: #fff; border: none; padding: 8px; border-radius: 8px; cursor: pointer; }
</style>
<div class="row">
  <div class="c"><h4>کتاب ۱</h4><p>کوتاه.</p><button>خرید</button></div>
  <div class="c"><h4>کتاب ۲</h4><p>توضیح بسیار طولانی‌تر شامل پنج پودمان کامل برای پایه یازدهم.</p><button>خرید</button></div>
  <div class="c"><h4>کتاب ۳</h4><p>متوسط برای مقایسه.</p><button>خرید</button></div>
</div>`,
    solutionExplanation: 'ترکیب Grid (برای ستون‌ها) و Flex Column (داخل هر کارت) استاندارد طلایی رابط‌های کاربری مدرن است.',
    language: 'html',
    engine: 'web',
  },
];

export const UNIT_2_2_QUICK_QUIZ: QuickQuizQuestion[] = [
  {
    id: 'qq-2-2-01',
    kind: 'concept',
    bookPage: '۱۱۶ و ۱۳۰',
    question: 'برای ایجاد فاصله «بیرونی» بین دو کارت کتاب در صفحه از کدام ویژگی CSS استفاده می‌کنیم؟',
    options: ['padding', 'margin', 'border', 'line-height'],
    correctIndex: 1,
    explanation: 'margin فاصله بیرونی بین عناصر است و padding فاصله داخلی بین متن و حاشیه خود عنصر (در هدف ۵ ص ۱۱۶ کتاب این دو جابه‌جا شده بودند!).',
  },
  {
    id: 'qq-2-2-02',
    kind: 'bug-spot',
    bookPage: '۱۳۸',
    question: 'چرا خط CSS زیر (برگرفته از ص ۱۳۸ کتاب) کارت‌ها را وسط‌چین نمی‌کند؟',
    codeSnippet: `.products {
  display: flex;
  justify-content: space-center;
}`,
    options: [
      'باید به جای flex بنویسیم block',
      'مقدار space-center در CSS نامعتبر است؛ شکل درست center است',
      'نیاز به semicolon ندارد',
      'justify-content فقط در Grid کار می‌کند',
    ],
    correctIndex: 1,
    explanation: 'مقادیر معتبر justify-content عبارتند از center، space-between، space-around و space-evenly؛ space-center وجود ندارد.',
  },
  {
    id: 'qq-2-2-03',
    kind: 'bug-spot',
    bookPage: '۱۲۹',
    question: 'اشکال نحوی خط زیر (غلط تایپی ص ۱۲۹ کتاب) چیست؟',
    codeSnippet: `.box { padding: 10px.20px; }`,
    options: [
      'باید بین 10px و 20px فقط فاصله (Space) باشد نه نقطه',
      'واحد px در padding مجاز نیست',
      'نباید دو عدد به padding داد',
      'هیچ اشکالی ندارد',
    ],
    correctIndex: 0,
    explanation: 'مقادیر کوتاه‌نویسی padding با فاصله از هم جدا می‌شوند: padding: 10px 20px;',
  },
  {
    id: 'qq-2-2-04',
    kind: 'output',
    bookPage: '۱۲۱',
    question: 'اگر یک پاراگراف هم id="a" و هم class="b" داشته باشد و قوانین زیر اعمال شوند، رنگ متنش چیست؟',
    codeSnippet: `#a { color: purple; }
.b { color: blue; }
p { color: red; }`,
    options: ['قرمز (red)', 'آبی (blue)', 'بنفش (purple)', 'سیاه پیش‌فرض'],
    correctIndex: 2,
    explanation: 'اولویت (Specificity) انتخابگر ID (۱۰۰) از Class (۱۰) و Tag (۱) بالاتر است.',
  },
  {
    id: 'qq-2-2-05',
    kind: 'concept',
    bookPage: '۱۳۲',
    question: 'تنظیم box-sizing: border-box چه مزیتی دارد؟',
    options: [
      'رنگ کادر را خودکار آبی می‌کند',
      'padding و border را درون همان width تعیین‌شده حساب می‌کند تا عرض جعبه بزرگ‌تر نشود',
      'margin را صفر می‌کند',
      'کارت‌ها را وسط‌چین می‌کند',
    ],
    correctIndex: 1,
    explanation: 'با border-box اگر width: 200px باشد، با هر مقدار padding و border عرض نهایی دقیقاً ۲۰۰px باقی می‌ماند.',
  },
  {
    id: 'qq-2-2-06',
    kind: 'concept',
    bookPage: '۱۴۱',
    question: 'برای ثابت نگه داشتن دکمه چت آنلاین در گوشه پایین-چپ همه نمایشگرها کدام کد استاندارد است؟',
    options: [
      'position: fixed; top: 600px; left: 14px;',
      'position: fixed; bottom: 14px; left: 14px;',
      'position: static; bottom: 14px;',
      'display: fixed;',
    ],
    correctIndex: 1,
    explanation: 'استفاده از bottom: 14px (برخلاف top: 600px ص ۱۴۱ کتاب) در تمام ارتفاع‌های موبایل و مانیتور درست نمایش داده می‌شود.',
  },
  {
    id: 'qq-2-2-07',
    kind: 'concept',
    bookPage: '۱۴۱',
    question: 'برای اینکه عنصری با position: absolute نسبت به کارت والد خود مختصات بگیرد، والدش باید چه ویژگی داشته باشد؟',
    options: ['display: block', 'position: relative', 'float: right', 'overflow: scroll'],
    correctIndex: 1,
    explanation: 'position: absolute نسبت به نزدیک‌ترین والد دارای موقعیت غیر static (معمولاً position: relative) سنجیده می‌شود.',
  },
  {
    id: 'qq-2-2-08',
    kind: 'concept',
    bookPage: '۱۳۹',
    question: 'عبارت grid-template-columns: repeat(3, 1fr) چه ساختاری می‌سازد؟',
    options: [
      '۳ ردیف یک‌ستونه',
      '۳ ستون هم‌عرض که کل فضای موجود را مساوی تقسیم می‌کنند',
      'یک ستون با عرض ۳ پیکسل',
      '۳ کارت شناور',
    ],
    correctIndex: 1,
    explanation: 'repeat(3, 1fr) معادل نوشتن 1fr 1fr 1fr یعنی سه ستون هم‌عرض است.',
  },
  {
    id: 'qq-2-2-09',
    kind: 'concept',
    bookPage: '۱۴۲',
    question: 'کدام قانون CSS فقط روی نمایشگرهایی با عرض کمتر از ۶۰۰ پیکسل (موبایل) اعمال می‌شود؟',
    options: [
      '@media (min-width: 600px)',
      '@media (max-width: 600px)',
      '@screen (width < 600)',
      'mobile-width: 600px',
    ],
    correctIndex: 1,
    explanation: 'شرط max-width: 600px یعنی حداکثر عرض ۶۰۰px (نمایشگرهای ۶۰۰ پیکسل و کوچک‌تر).',
  },
];
