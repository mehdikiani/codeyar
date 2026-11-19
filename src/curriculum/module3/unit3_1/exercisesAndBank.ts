import type {
  ClassroomActivity,
  HomeworkAssignment,
  QuickQuizQuestion,
} from '../../../types/curriculum.ts';

export const UNIT_3_1_ACTIVITIES: ClassroomActivity[] = [
  {
    id: 'act-3-1-faq',
    kind: 'workshop',
    title: 'کارگاه پرسش‌های متداول (Accordion) فروشگاه مرجع نو (اصلاح ص ۱۸۸)',
    bookPage: '۱۸۸',
    estimatedMinutes: 12,
    prompt:
      'یک مؤلفه Accordion بوت‌استرپ با دو پرسش متداول درباره زمان ارسال و شرایط مرجوعی کتاب بسازید؛ آیتم اول باز و آیتم دوم بسته (با collapsed و aria-expanded="false") باشد.',
    steps: [
      'ظرف <div class="accordion" id="faqAccordion"> بسازید.',
      'آیتم اول را با show و aria-expanded="true" تنظیم کنید.',
      'آیتم دوم را با کلاس collapsed و aria-expanded="false" اضافه کنید.',
    ],
    hints: ['هر دو بخش collapse باید data-bs-parent="#faqAccordion" داشته باشند تا هم‌زمان فقط یکی باز بماند.'],
    language: 'html',
    engine: 'bootstrap-js',
    useBootstrap: true,
    starterCode: `<div class="accordion" id="faqAccordion">
  <div class="accordion-item">
    <h2 class="accordion-header">
      <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#q1" aria-expanded="true">
        زمان ارسال کتاب‌ها چقدر است؟
      </button>
    </h2>
    <div id="q1" class="accordion-collapse collapse show" data-bs-parent="#faqAccordion">
      <div class="accordion-body">بین ۲ تا ۴ روز کاری در سراسر کشور.</div>
    </div>
  </div>
  <!-- پرسش دوم را اینجا اضافه کنید -->
</div>`,
    solutionCode: `<div class="accordion" id="faqAccordion">
  <div class="accordion-item">
    <h2 class="accordion-header">
      <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#q1" aria-expanded="true">
        زمان ارسال کتاب‌ها چقدر است؟
      </button>
    </h2>
    <div id="q1" class="accordion-collapse collapse show" data-bs-parent="#faqAccordion">
      <div class="accordion-body">بین ۲ تا ۴ روز کاری در سراسر کشور.</div>
    </div>
  </div>
  <div class="accordion-item">
    <h2 class="accordion-header">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#q2" aria-expanded="false">
        آیا امکان مرجوعی کتاب وجود دارد؟
      </button>
    </h2>
    <div id="q2" class="accordion-collapse collapse" data-bs-parent="#faqAccordion">
      <div class="accordion-body">بله، تا ۷ روز پس از تحویل در صورت سلامت فیزیکی کتاب.</div>
    </div>
  </div>
</div>`,
    solutionExplanation: 'آیتم دوم با کلاس collapsed و aria-expanded="false" شروع می‌شود و با کلیک به‌صورت روان باز می‌شود.',
    alternativeSolutionCode: `<div class="accordion accordion-flush" id="flushFaq">
  <div class="accordion-item"><h2 class="accordion-header"><button class="accordion-button collapsed" data-bs-toggle="collapse" data-bs-target="#f1">ارسال رایگان چیست؟</button></h2><div id="f1" class="accordion-collapse collapse" data-bs-parent="#flushFaq"><div class="accordion-body">برای خرید بالای ۳۰۰ هزار تومان.</div></div></div>
</div>`,
    alternativeSolutionExplanation: 'استفاده از accordion-flush برای طراحی مدرن بدون کادرهای بیرونی اضافه.',
  },
  {
    id: 'act-3-1-product-grid',
    kind: 'workshop',
    title: 'کارگاه شبکه ۳ کارته محصولات واکنش‌گرا با Card و h-100',
    bookPage: '۱۶۵ تا ۱۷۱',
    estimatedMinutes: 12,
    prompt:
      'سه کارت کتاب درسی را با شبکه ۱۲ ستونه (col-12 col-md-4) و کلاس h-100 کنار هم بچینید که هر کارت تصویر img-fluid، عنوان، قیمت و دکمه خرید تمام‌عرض داشته باشد.',
    steps: [
      'ساختار container ← row g-3 ← col-12 col-md-4 را بسازید.',
      'داخل هر ستون یک card h-100 با تصویر و دکمه btn btn-primary w-100 بگذارید.',
    ],
    hints: ['از d-flex flex-column در card-body و mt-auto روی دکمه استفاده کنید.'],
    language: 'html',
    engine: 'bootstrap-js',
    useBootstrap: true,
    starterCode: `<div class="container py-3">
  <div class="row g-3">
    <!-- ۳ ستون col-12 col-md-4 اینجا اضافه کنید -->
  </div>
</div>`,
    solutionCode: `<div class="container py-3">
  <div class="row g-3">
    <div class="col-12 col-md-4">
      <div class="card h-100 shadow-sm"><img src="book1.jpg" class="card-img-top" alt="طراح سایت" /><div class="card-body d-flex flex-column"><h6 class="fw-bold">طراح سایت</h6><p class="text-success fw-bold small">۴۵٬۰۰۰ تومان</p><button class="btn btn-primary btn-sm w-100 mt-auto">خرید</button></div></div>
    </div>
    <div class="col-12 col-md-4">
      <div class="card h-100 shadow-sm"><img src="book2.jpg" class="card-img-top" alt="تولید محتوا" /><div class="card-body d-flex flex-column"><h6 class="fw-bold">تولید محتوا</h6><p class="text-success fw-bold small">۳۸٬۰۰۰ تومان</p><button class="btn btn-primary btn-sm w-100 mt-auto">خرید</button></div></div>
    </div>
    <div class="col-12 col-md-4">
      <div class="card h-100 shadow-sm"><img src="book3.jpg" class="card-img-top" alt="توسعه برنامه" /><div class="card-body d-flex flex-column"><h6 class="fw-bold">توسعه برنامه</h6><p class="text-success fw-bold small">۵۲٬۰۰۰ تومان</p><button class="btn btn-primary btn-sm w-100 mt-auto">خرید</button></div></div>
    </div>
  </div>
</div>`,
    solutionExplanation: 'ترکیب Grid 12 ستونه، Card، h-100 و mt-auto استاندارد حرفه‌ای نمایش محصولات است.',
    alternativeSolutionCode: `<div class="container py-2"><div class="row row-cols-1 row-cols-md-3 g-3"><div class="col"><div class="card p-3">طراح سایت</div></div><div class="col"><div class="card p-3">تولید محتوا</div></div><div class="col"><div class="card p-3">توسعه برنامه</div></div></div></div>`,
    alternativeSolutionExplanation: 'استفاده فشرده از row-cols-1 row-cols-md-3 روی ردیف والد.',
  },
  {
    id: 'act-3-1-navbar-search',
    kind: 'workshop',
    title: 'کارگاه نوار ناوبری واکنش‌گرای Navbar با منوی کشویی و جستجو',
    bookPage: '۱۷۶ تا ۱۷۸',
    estimatedMinutes: 12,
    prompt:
      'یک Navbar آبی‌رنگ (navbar-dark bg-primary) برای فروشگاه مرجع نو بسازید که در موبایل دکمه همبرگری داشته باشد و در دسکتاپ شامل ۳ لینک و کادر جستجو باشد.',
    steps: [
      'کلاس‌های navbar navbar-expand-md navbar-dark bg-primary را روی <nav> بگذارید.',
      'دکمه navbar-toggler را به شناسه #mainMenu متصل کنید.',
    ],
    hints: ['تطابق حروف #mainMenu و id="mainMenu" را حتماً بررسی کنید.'],
    language: 'html',
    engine: 'bootstrap-js',
    useBootstrap: true,
    starterCode: `<nav class="navbar navbar-expand-md navbar-dark bg-primary rounded-3">
  <div class="container-fluid">
    <a class="navbar-brand fw-bold" href="#">مرجع نو</a>
    <!-- دکمه همبرگری و منو را تکمیل کنید -->
  </div>
</nav>`,
    solutionCode: `<nav class="navbar navbar-expand-md navbar-dark bg-primary rounded-3 px-2">
  <div class="container-fluid">
    <a class="navbar-brand fw-bold" href="#">📚 مرجع نو</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mainMenu">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="mainMenu">
      <ul class="navbar-nav me-auto">
        <li class="nav-item"><a class="nav-link active" href="#">صفحه اصلی</a></li>
        <li class="nav-item"><a class="nav-link" href="#">کتاب‌ها</a></li>
        <li class="nav-item"><a class="nav-link" href="#">پشتیبانی</a></li>
      </ul>
      <div class="input-group input-group-sm" style="max-width:220px;">
        <input class="form-control" placeholder="جستجو..." />
        <button class="btn btn-light text-primary fw-bold" type="button">برو</button>
      </div>
    </div>
  </div>
</nav>`,
    solutionExplanation: 'نوار ناوبری کامل و واکنش‌گرا با پشتیبانی ۱۰۰٪ آفلاین از باز و بسته شدن در موبایل.',
    alternativeSolutionCode: `<nav class="navbar bg-light border rounded-3 px-3"><a class="navbar-brand fw-bold" href="#">مرجع نو</a><button class="btn btn-sm btn-outline-primary">ورود</button></nav>`,
    alternativeSolutionExplanation: 'نسخه تک‌ردیفه ساده برای صفحات ورود و پرداخت (Checkout) که نیاز به منوی پیچیده ندارند.',
  },
  {
    id: 'act-3-1-modal-confirm',
    kind: 'activity',
    title: 'فعالیت پنجره تأیید حذف (Modal Danger) با شناسه صحیح',
    bookPage: '۱۸۳',
    estimatedMinutes: 10,
    prompt:
      'دکمه قرمزی با عنوان «حذف از سبد خرید» بسازید که با کلیک، یک Modal با هدر قرمز (bg-danger text-white) و دو دکمه «انصراف» و «بله، حذف شود» باز کند.',
    steps: [
      'دکمه را با data-bs-toggle="modal" و data-bs-target="#deleteConfirmModal" بسازید.',
      'پنجره مودال با id="deleteConfirmModal" دقیقاً هم‌نام بسازید.',
    ],
    hints: ['از کلاس btn-close-white روی دکمه ضربدر درون هدر تیره/قرمز استفاده کنید.'],
    language: 'html',
    engine: 'bootstrap-js',
    useBootstrap: true,
    starterCode: `<button class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#deleteConfirmModal">حذف از سبد خرید</button>
<!-- کد پنجره مودال را اینجا بنویسید -->`,
    solutionCode: `<div class="container py-3">
  <button class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#deleteConfirmModal">🗑️ حذف از سبد خرید</button>
</div>
<div class="modal fade" id="deleteConfirmModal" tabindex="-1" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-header bg-danger text-white">
        <h5 class="modal-title fw-bold">تأیید حذف کالا</h5>
        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
      </div>
      <div class="modal-body">آیا مطمئن هستید می‌خواهید کتاب «طراح سایت» را از سبد حذف کنید؟</div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">انصراف</button>
        <button type="button" class="btn btn-danger" data-bs-dismiss="modal">بله، حذف شود</button>
      </div>
    </div>
  </div>
</div>`,
    solutionExplanation: 'طراحی مودال هشدار استاندارد با کنتراست مناسب روی هدر قرمز و دکمه بستن سفید.',
    alternativeSolutionCode: `<div class="alert alert-danger d-flex justify-content-between align-items-center"><span>آیا حذف شود؟</span><button class="btn btn-sm btn-danger">تأیید</button></div>`,
    alternativeSolutionExplanation: 'تأیید خطی (Inline Confirmation) با Alert برای مواقعی که نمی‌خواهیم پنجره بازشو صفحه را بپوشاند.',
  },
  {
    id: 'act-3-1-responsive-table',
    kind: 'activity',
    title: 'فعالیت جدول واکنش‌گرای کارنامه پودمانی با رنگ‌بندی ردیف‌ها',
    bookPage: '۱۷۴',
    estimatedMinutes: 10,
    prompt:
      'جدول کارنامه ۳ هنرجو را درون table-responsive قرار دهید؛ ردیف نمره عالی با table-success و ردیف نیازمند تلاش با table-warning متمایز شود.',
    steps: [
      'ظرف table-responsive و جدول table table-bordered table-hover بسازید.',
      'به ردیف‌ها کلاس‌های معنایی table-success و table-warning بدهید.',
    ],
    hints: ['از badge برای نمایش وضعیت «شایسته» و «نیاز به جبران» استفاده کنید.'],
    language: 'html',
    engine: 'bootstrap-js',
    useBootstrap: true,
    starterCode: `<div class="table-responsive">
  <table class="table table-bordered">
    <!-- thead و tbody را تکمیل کنید -->
  </table>
</div>`,
    solutionCode: `<div class="container py-2">
  <div class="table-responsive">
    <table class="table table-bordered table-hover align-middle">
      <thead class="table-dark"><tr><th>هنرجو</th><th>پودمان ۳</th><th>وضعیت</th></tr></thead>
      <tbody>
        <tr class="table-success"><td>سارا کریمی</td><td>۱۹.۵</td><td><span class="badge bg-success">شایسته</span></td></tr>
        <tr><td>امیر حسینی</td><td>۱۶.۰</td><td><span class="badge bg-primary">شایسته</span></td></tr>
        <tr class="table-warning"><td>رضا مرادی</td><td>۱۱.۵</td><td><span class="badge bg-warning text-dark">جبرانی</span></td></tr>
      </tbody>
    </table>
  </div>
</div>`,
    solutionExplanation: 'کاربرد کلاس‌های رنگی ردیف جدول در بوت‌استرپ ۵.۳ برای تحلیل سریع داده‌ها.',
    alternativeSolutionCode: `<ul class="list-group"><li class="list-group-item d-flex justify-content-between"><span>سارا</span><span class="badge bg-success">۱۹.۵</span></li></ul>`,
    alternativeSolutionExplanation: 'استفاده از list-group بوت‌استرپ به عنوان جایگزین سبک‌تر برای نمایش در موبایل.',
  },
  {
    id: 'act-3-1-signup-form',
    kind: 'workshop',
    title: 'کارگاه فرم ثبت‌نام دو ستونه با form-floating و دکمه تمام‌عرض',
    bookPage: '۱۷۹ تا ۱۸۱',
    estimatedMinutes: 12,
    prompt:
      'فرم ثبت‌نام فروشگاه مرجع نو را با دو فیلد شناور (form-floating) نام و ایمیل کنار هم (col-md-6)، انتخاب استان (form-select) و دکمه ثبت‌نام طراحی کنید.',
    steps: [
      'کارت فرم را وسط صفحه با mx-auto و max-width: 520px بگذارید.',
      'در form-floating حتماً input را قبل از label بنویسید و placeholder قرار دهید.',
    ],
    hints: ['از row g-3 برای فاصله منظم بین فیلدها استفاده کنید.'],
    language: 'html',
    engine: 'bootstrap-js',
    useBootstrap: true,
    starterCode: `<div class="container py-3" style="max-width:520px;">
  <form class="card p-4 shadow-sm">
    <h5 class="fw-bold mb-3">ثبت‌نام در مرجع نو</h5>
    <!-- فیلدهای form-floating و form-select -->
  </form>
</div>`,
    solutionCode: `<div class="container py-3" style="max-width:520px;">
  <form class="card p-4 shadow-sm border-0">
    <h5 class="fw-bold mb-3">ایجاد حساب کاربری مرجع نو</h5>
    <div class="row g-3">
      <div class="col-md-6">
        <div class="form-floating">
          <input type="text" class="form-control" id="fn" placeholder="نام" />
          <label for="fn">نام و نام خانوادگی</label>
        </div>
      </div>
      <div class="col-md-6">
        <div class="form-floating">
          <input type="email" class="form-control" id="em" placeholder="ایمیل" />
          <label for="em">نشانی ایمیل</label>
        </div>
      </div>
      <div class="col-12">
        <select class="form-select"><option>استان تهران</option><option>استان اصفهان</option><option>استان فارس</option></select>
      </div>
      <div class="col-12"><button type="button" class="btn btn-primary w-100">ساخت حساب</button></div>
    </div>
  </form>
</div>`,
    solutionExplanation: 'فرم واکنش‌گرا و مدرن با برچسب‌های شناور بوت‌استرپ ۵.۳.',
    alternativeSolutionCode: `<form class="d-grid gap-2"><input class="form-control" placeholder="نام" /><input class="form-control" placeholder="ایمیل" /><button class="btn btn-primary">ثبت‌نام</button></form>`,
    alternativeSolutionExplanation: 'فرم فشرده تک‌ستونه با کلاس d-grid gap-2.',
  },
  {
    id: 'act-3-1-carousel-banner',
    kind: 'activity',
    title: 'فعالیت ساخت اسلایدر تبلیغاتی (Carousel) دو اسلایده برای صفحه اصلی',
    bookPage: '۱۸۵ تا ۱۸۶',
    estimatedMinutes: 10,
    prompt:
      'یک Carousel با دو اسلاید (معرفی پکیج یازدهم و تخفیف کتاب‌های دهم) همراه با دکمه‌های قبلی و بعدی بسازید.',
    steps: [
      'شناسه یکتا مثل id="promoSlider" بگذارید و اسلاید اول را active کنید.',
      'دکمه‌های prev/next را با data-bs-target="#promoSlider" متصل کنید.',
    ],
    hints: ['اگر هیچ اسلایدی کلاس active نداشته باشد، اسلایدر خالی نشان داده می‌شود.'],
    language: 'html',
    engine: 'bootstrap-js',
    useBootstrap: true,
    starterCode: `<div id="promoSlider" class="carousel slide" data-bs-ride="carousel">
  <div class="carousel-inner">
    <!-- اسلاید ۱ (active) و اسلاید ۲ -->
  </div>
</div>`,
    solutionCode: `<div class="container py-2">
  <div id="promoSlider" class="carousel slide rounded-4 overflow-hidden" data-bs-ride="carousel">
    <div class="carousel-inner">
      <div class="carousel-item active bg-primary text-white text-center p-5">
        <h4 class="fw-bold">پکیج کامل پایه یازدهم ۱۴۰۵</h4>
        <p class="mb-0">۲۰٪ تخفیف ویژه ثبت‌نام هنرستان‌ها</p>
      </div>
      <div class="carousel-item bg-success text-white text-center p-5">
        <h4 class="fw-bold">ارسال رایگان به سراسر ایران</h4>
        <p class="mb-0">برای سفارش‌های بالای ۳۰۰ هزار تومان</p>
      </div>
    </div>
    <button class="carousel-control-prev" type="button" data-bs-target="#promoSlider" data-bs-slide="prev"><span class="carousel-control-prev-icon"></span></button>
    <button class="carousel-control-next" type="button" data-bs-target="#promoSlider" data-bs-slide="next"><span class="carousel-control-next-icon"></span></button>
  </div>
</div>`,
    solutionExplanation: 'پیاده‌سازی صحیح Carousel بوت‌استرپ ۵.۳ با کنترل‌های تعاملی.',
    alternativeSolutionCode: `<div class="p-4 rounded-4 bg-primary text-white text-center"><h4>پکیج ویژه ۱۴۰۵</h4><span class="badge bg-warning text-dark">۲۰٪ تخفیف</span></div>`,
    alternativeSolutionExplanation: 'بنر ثابت (Hero Card) که در موبایل سرعت و خوانایی بیشتری نسبت به اسلایدر دارد.',
  },
  {
    id: 'act-3-1-marjanow-bs-full',
    kind: 'project',
    title: 'پروژه جامع واحد ۳.۱: صفحه کامل واکنش‌گرای «مرجع نو» با Navbar، Grid، Modal و FAQ',
    bookPage: '۱۷۶ تا ۱۸۹',
    estimatedMinutes: 15,
    prompt:
      'تمامی مؤلفه‌های واحد ۳.۱ را در یک صفحه فروشگاه واقعی یکپارچه کنید: Navbar، شبکه ۲ کارته محصولات، دکمه باز کردن Modal سبد خرید و بخش FAQ (Accordion).',
    steps: [
      'در بالا Navbar و در وسط شبکه محصولات (row g-3) قرار دهید.',
      'دکمه خرید را به مودال #buyModal متصل کنید و پایین صفحه Accordion بسازید.',
    ],
    hints: ['از container py-3 برای فاصله‌گذاری منظم بخش‌ها استفاده کنید.'],
    language: 'html',
    engine: 'bootstrap-js',
    useBootstrap: true,
    starterCode: `<!-- ترکیب Navbar + Grid + Modal + Accordion -->`,
    solutionCode: `<nav class="navbar navbar-dark bg-dark px-3 rounded-3 mb-3">
  <span class="navbar-brand fw-bold">📚 فروشگاه مرجع نو (Bootstrap 5.3)</span>
  <button class="btn btn-sm btn-warning fw-bold" data-bs-toggle="modal" data-bs-target="#buyModal">سبد خرید (۱)</button>
</nav>
<div class="row g-3 mb-3">
  <div class="col-12 col-md-6"><div class="card p-3 h-100"><h6 class="fw-bold">طراح سایت یازدهم</h6><p class="small text-success fw-bold mb-2">۴۵٬۰۰۰ تومان</p><button class="btn btn-primary btn-sm" data-bs-toggle="modal" data-bs-target="#buyModal">افزودن به سبد</button></div></div>
  <div class="col-12 col-md-6"><div class="card p-3 h-100"><h6 class="fw-bold">تولید محتوا دهم</h6><p class="small text-success fw-bold mb-2">۳۸٬۰۰۰ تومان</p><button class="btn btn-primary btn-sm" data-bs-toggle="modal" data-bs-target="#buyModal">افزودن به سبد</button></div></div>
</div>
<div class="accordion" id="miniFaq">
  <div class="accordion-item"><h2 class="accordion-header"><button class="accordion-button collapsed" data-bs-toggle="collapse" data-bs-target="#mf1" aria-expanded="false">نحوه ارسال چگونه است؟</button></h2><div id="mf1" class="accordion-collapse collapse" data-bs-parent="#miniFaq"><div class="accordion-body small">پست پیشتاز ۲ تا ۴ روزه.</div></div></div>
</div>
<div class="modal fade" id="buyModal" tabindex="-1"><div class="modal-dialog modal-dialog-centered"><div class="modal-content"><div class="modal-header"><h6 class="modal-title fw-bold">سبد خرید</h6><button class="btn-close" data-bs-dismiss="modal"></button></div><div class="modal-body small">کتاب به سبد شما اضافه شد!</div></div></div></div>`,
    solutionExplanation: 'پوشش ۱۰۰٪ معیارهای جدول ارزشیابی واحد ۳.۱ (ص ۱۹۰–۱۹۱).',
    alternativeSolutionCode: `<div class="container py-2"><div class="alert alert-success">فروشگاه مرجع نو آماده اجرا با Bootstrap 5.3 RTL است!</div></div>`,
    alternativeSolutionExplanation: 'نقطه شروع سریع برای تست اتصال صحیح Bootstrap 5.3 RTL.',
  },
];

export const UNIT_3_1_HOMEWORKS: HomeworkAssignment[] = [
  {
    id: 'hw-3-1-01',
    number: 1,
    title: 'ساخت ۳ جعبه پیام با رنگ‌های subtle و اصلاح border-danger / rounded-0',
    difficulty: 'easy',
    bookPage: '۱۵۱ تا ۱۵۳',
    estimatedMinutes: 10,
    prompt:
      'سه کادر اطلاع‌رسانی (موفقیت با rounded-4، هشدار با rounded-2 و خطا با border-danger و rounded-0) صرفاً با کلاس‌های بوت‌استرپ ۵.۳ طراحی کنید.',
    sampleOutput: `۳ کادر رنگی با گوشه‌های متفاوت بدون یک خط CSS دستی`,
    hint: 'برای حاشیه قرمز از border border-danger و برای گوشه بدون گردی از rounded-0 استفاده کنید.',
    solutionCode: `<div class="container py-2 d-grid gap-2">
  <div class="p-3 bg-success-subtle text-success border border-success rounded-4">ثبت‌نام با موفقیت انجام شد.</div>
  <div class="p-3 bg-warning-subtle text-warning-emphasis border border-warning rounded-2">لطفاً شماره تماس را بررسی کنید.</div>
  <div class="p-3 bg-danger-subtle text-danger border border-danger rounded-0">خطا در پرداخت بانکی (گوشه تیز rounded-0).</div>
</div>`,
    solutionExplanation: 'تثبیت اصلاح جدول ۴ و ۵ ص ۱۵۲ کتاب و کاربرد رنگ‌های subtle.',
    language: 'html',
    engine: 'bootstrap-js',
  },
  {
    id: 'hw-3-1-02',
    number: 2,
    title: 'نوار پیام متفاوت در موبایل و دسکتاپ با d-none و d-md-block',
    difficulty: 'easy',
    bookPage: '۱۵۸ تا ۱۶۰',
    estimatedMinutes: 10,
    prompt:
      'دو بنر بسازید: یکی فقط در موبایل نمایش داده شود (d-block d-md-none) و دیگری فقط از عرض تبلت به بالا (d-none d-md-block).',
    sampleOutput: `تغییر خودکار بنر هنگام تغییر عرض صفحه`,
    hint: 'کلاس‌های نمایش واکنش‌گرا را دقیقاً جفت کنید تا هم‌زمان دیده نشوند.',
    solutionCode: `<div class="container py-2">
  <div class="alert alert-primary d-block d-md-none">📱 شما با موبایل وارد شده‌اید!</div>
  <div class="alert alert-dark d-none d-md-block">💻 شما با تبلت یا دسکتاپ وارد شده‌اید!</div>
</div>`,
    solutionExplanation: 'کاربرد عملی Breakpointها روی ویژگی display.',
    language: 'html',
    engine: 'bootstrap-js',
  },
  {
    id: 'hw-3-1-03',
    number: 3,
    title: 'کارت معرفی هنرجو با تصویر دایره‌ای و دکمه تمام‌عرض',
    difficulty: 'easy',
    bookPage: '۱۷۰ تا ۱۷۲',
    estimatedMinutes: 10,
    prompt:
      'یک کارت وسط‌چین (mx-auto) با عرض 300px بسازید که شامل تصویر کتاب با rounded-3، نشان «رتبه برتر»، توضیحات و دکمه btn-primary w-100 باشد.',
    sampleOutput: `کارت مرتب و وسط‌چین با سایه shadow-sm`,
    hint: 'از card shadow-sm mx-auto استفاده کنید.',
    solutionCode: `<div class="card shadow-sm mx-auto" style="max-width:300px;">
  <img src="book1.jpg" class="card-img-top" alt="طراح سایت" />
  <div class="card-body text-center">
    <span class="badge bg-success mb-2">پروژه برتر</span>
    <h6 class="fw-bold">پروژه فروشگاه مرجع نو</h6>
    <button class="btn btn-primary btn-sm w-100 mt-2">مشاهده نمونه</button>
  </div>
</div>`,
    solutionExplanation: 'تمرین ترکیب کلاس‌های Card، Badge و دکمه تمام‌عرض.',
    language: 'html',
    engine: 'bootstrap-js',
  },
  {
    id: 'hw-3-1-04',
    number: 4,
    title: 'چیدمان ۴ باکس خدمات با شبکه ۱۲ ستونه (col-6 col-lg-3)',
    difficulty: 'easy',
    bookPage: '۱۶۳ تا ۱۶۶',
    estimatedMinutes: 10,
    prompt:
      'چهار باکس ویژگی فروشگاه بسازید که در موبایل ۲ ستونه (col-6) و در دسکتاپ ۴ ستونه (col-lg-3) نمایش داده شوند.',
    sampleOutput: `۲×۲ در موبایل و ۱×۴ در دسکتاپ`,
    hint: '۱۲ تقسیم بر ۶ = ۲ ستون؛ ۱۲ تقسیم بر ۳ = ۴ ستون.',
    solutionCode: `<div class="container py-2"><div class="row g-2 text-center">
  <div class="col-6 col-lg-3"><div class="p-3 bg-light border rounded-3 fw-bold small">ارسال سریع</div></div>
  <div class="col-6 col-lg-3"><div class="p-3 bg-light border rounded-3 fw-bold small">ضمانت اصالت</div></div>
  <div class="col-6 col-lg-3"><div class="p-3 bg-light border rounded-3 fw-bold small">پرداخت امن</div></div>
  <div class="col-6 col-lg-3"><div class="p-3 bg-light border rounded-3 fw-bold small">پشتیبانی</div></div>
</div></div>`,
    solutionExplanation: 'تسلط سریع بر ریاضی ۱۲ ستونه بوت‌استرپ.',
    language: 'html',
    engine: 'bootstrap-js',
  },
  {
    id: 'hw-3-1-05',
    number: 5,
    title: 'فرم ورود با input-group و آیکون متنی در کنار فیلدها',
    difficulty: 'medium',
    bookPage: '۱۷۹ تا ۱۸۰',
    estimatedMinutes: 12,
    prompt:
      'فرم ورود بسازید که نام کاربری با پیشوند "@" و شماره موبایل با پیشوند "09" درون input-group قرار بگیرند.',
    sampleOutput: `فرم شیک با برچسب‌های چسبیده به کادر ورودی`,
    hint: 'از <div class="input-group"><span class="input-group-text">@</span><input class="form-control" /></div> استفاده کنید.',
    solutionCode: `<div class="card p-3 mx-auto" style="max-width:380px;">
  <h6 class="fw-bold mb-3">ورود به حساب</h6>
  <div class="input-group mb-2"><span class="input-group-text">@</span><input class="form-control" placeholder="نام کاربری" /></div>
  <div class="input-group mb-3"><span class="input-group-text">موبایل</span><input class="form-control" placeholder="0912..." /></div>
  <button class="btn btn-primary w-100">ورود</button>
</div>`,
    solutionExplanation: 'کاربرد حرفه‌ای input-group برای راهنمایی سریع کاربر در فرم‌ها.',
    language: 'html',
    engine: 'bootstrap-js',
  },
  {
    id: 'hw-3-1-06',
    number: 6,
    title: 'جدول سفارش‌ها با table-responsive و دکمه‌های عملیات btn-group',
    difficulty: 'medium',
    bookPage: '۱۷۲ و ۱۷۴',
    estimatedMinutes: 15,
    prompt:
      'جدول لیست کتاب‌های انبار را در table-responsive بسازید و در آخرین ستون هر ردیف دو دکمه کوچک «ویرایش» و «حذف» درون btn-group قرار دهید.',
    sampleOutput: `جدول مدیریتی تمیز با دکمه‌های گروهی در هر ردیف`,
    hint: 'از btn-group btn-group-sm برای کوچک و جمع‌وجور ماندن دکمه‌های داخل جدول استفاده کنید.',
    solutionCode: `<div class="table-responsive"><table class="table table-striped align-middle border">
  <thead class="table-dark"><tr><th>کتاب</th><th>موجودی</th><th>عملیات</th></tr></thead>
  <tbody>
    <tr><td>طراح سایت</td><td>۱۸ جلد</td><td><div class="btn-group btn-group-sm"><button class="btn btn-outline-primary">ویرایش</button><button class="btn btn-outline-danger">حذف</button></div></td></tr>
    <tr><td>تولید محتوا</td><td>۱۲ جلد</td><td><div class="btn-group btn-group-sm"><button class="btn btn-outline-primary">ویرایش</button><button class="btn btn-outline-danger">حذف</button></div></td></tr>
  </tbody>
</table></div>`,
    solutionExplanation: 'الگوی استاندارد جداول پنل ادمین در بوت‌استرپ ۵.۳.',
    language: 'html',
    engine: 'bootstrap-js',
  },
  {
    id: 'hw-3-1-07',
    number: 7,
    title: 'ساخت صفحه FAQ سه سؤاله با Accordion (اصلاح aria-expanded)',
    difficulty: 'medium',
    bookPage: '۱۸۸',
    estimatedMinutes: 15,
    prompt:
      'سه سؤال متداول درباره ثبت‌نام هنرستان را با Accordion بسازید به طوری که هر سه در ابتدا بسته باشند و با کلیک هر کدام، دیگری بسته شود.',
    sampleOutput: `۳ پرسش بازشو با رفتار انحصاری data-bs-parent`,
    hint: 'همه دکمه‌ها کلاس collapsed و aria-expanded="false" داشته باشند و هیچ‌کدام کلاس show نگیرند.',
    solutionCode: `<div class="accordion" id="schoolFaq">
  <div class="accordion-item"><h2 class="accordion-header"><button class="accordion-button collapsed" data-bs-toggle="collapse" data-bs-target="#s1" aria-expanded="false">مدارک ثبت‌نام چیست؟</button></h2><div id="s1" class="accordion-collapse collapse" data-bs-parent="#schoolFaq"><div class="accordion-body small">کارنامه پایه نهم و شناسنامه.</div></div></div>
  <div class="accordion-item"><h2 class="accordion-header"><button class="accordion-button collapsed" data-bs-toggle="collapse" data-bs-target="#s2" aria-expanded="false">ساعات کارگاه چگونه است؟</button></h2><div id="s2" class="accordion-collapse collapse" data-bs-parent="#schoolFaq"><div class="accordion-body small">شنبه تا چهارشنبه ۸ تا ۱۴.</div></div></div>
  <div class="accordion-item"><h2 class="accordion-header"><button class="accordion-button collapsed" data-bs-toggle="collapse" data-bs-target="#s3" aria-expanded="false">آیا نیاز به لپ‌تاپ شخصی هست؟</button></h2><div id="s3" class="accordion-collapse collapse" data-bs-parent="#schoolFaq"><div class="accordion-body small">خیر، تمام سیستم‌های کارگاه مجهز هستند.</div></div></div>
</div>`,
    solutionExplanation: 'رعایت کامل استاندارد دسترس‌پذیری Accordion.',
    language: 'html',
    engine: 'bootstrap-js',
  },
  {
    id: 'hw-3-1-08',
    number: 8,
    title: 'کارت کتاب با دو دکمه متصل به دو Modal مجزا (جزئیات و خرید)',
    difficulty: 'challenging',
    bookPage: '۱۸۳',
    estimatedMinutes: 18,
    prompt:
      'روی یک کارت کتاب دو دکمه قرار دهید: «مشاهده سرفصل» که #infoModal را باز کند و «خرید سریع» که #buyNowModal را باز کند.',
    sampleOutput: `دو پنجره بازشوی مستقل با شناسه‌های کاملاً هماهنگ`,
    hint: 'برای هر Modal یک id یکتا تعریف کرده و در data-bs-target همان را با # بنویسید.',
    solutionCode: `<div class="card p-3" style="max-width:340px;">
  <h5 class="fw-bold">کتاب طراح سایت ۱۴۰۵</h5>
  <div class="d-flex gap-2 mt-2">
    <button class="btn btn-outline-primary btn-sm" data-bs-toggle="modal" data-bs-target="#infoModal">سرفصل‌ها</button>
    <button class="btn btn-success btn-sm" data-bs-toggle="modal" data-bs-target="#buyNowModal">خرید سریع</button>
  </div>
</div>
<div class="modal fade" id="infoModal" tabindex="-1"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><h6 class="modal-title">سرفصل ۵ پودمان</h6><button class="btn-close" data-bs-dismiss="modal"></button></div><div class="modal-body small">پایتون، HTML/CSS، بوت‌استرپ/JS، شیءگرایی و جنگو.</div></div></div></div>
<div class="modal fade" id="buyNowModal" tabindex="-1"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><h6 class="modal-title">تأیید خرید</h6><button class="btn-close" data-bs-dismiss="modal"></button></div><div class="modal-body small">به سبد خرید افزوده شد!</div></div></div></div>`,
    solutionExplanation: 'مدیریت هم‌زمان چند مؤلفه JS در یک صفحه بدون تداخل شناسه‌ها.',
    language: 'html',
    engine: 'bootstrap-js',
  },
  {
    id: 'hw-3-1-09',
    number: 9,
    title: 'طراحی صفحه فرود واکنش‌گرا با Navbar + Hero دو ستونه + کارت‌های قیمت',
    difficulty: 'challenging',
    bookPage: '۱۶۳ تا ۱۷۸',
    estimatedMinutes: 20,
    prompt:
      'یک صفحه فرود کامل شامل Navbar تیره، بخش معرفی دو ستونه (col-md-7 متن + col-md-5 تصویر با order-1 در موبایل) و ۳ کارت ویژگی طراحی کنید.',
    sampleOutput: `صفحه فرود کامل و واکنش‌گرا در تمام عرض‌ها`,
    hint: 'از container و کلاس‌های mb-4 برای تفکیک بخش‌ها استفاده کنید.',
    solutionCode: `<nav class="navbar navbar-dark bg-dark rounded-3 px-3 mb-3"><span class="navbar-brand fw-bold">مرجع نو</span><span class="badge bg-primary">۱۴۰۵</span></nav>
<div class="row g-3 align-items-center mb-4">
  <div class="col-12 col-md-7 order-2 order-md-1"><h4 class="fw-bold">مرجع کتاب‌های هنرستانی</h4><p class="text-secondary small">ارسال سریع، قیمت مصوب و تخفیف گروهی مدارس.</p><button class="btn btn-primary btn-sm">مشاهده کتاب‌ها</button></div>
  <div class="col-12 col-md-5 order-1 order-md-2 text-center"><img src="book1.jpg" class="img-fluid rounded-4 shadow-sm" alt="کتاب" /></div>
</div>
<div class="row row-cols-1 row-cols-md-3 g-2 text-center">
  <div class="col"><div class="p-3 bg-light rounded-3 fw-bold small">ارسال ۲ روزه</div></div>
  <div class="col"><div class="p-3 bg-light rounded-3 fw-bold small">ضمانت کیفیت</div></div>
  <div class="col"><div class="p-3 bg-light rounded-3 fw-bold small">پشتیبانی آنلاین</div></div>
</div>`,
    solutionExplanation: 'ترکیب حرفه‌ای Navbar، Grid، Order و Row-Cols.',
    language: 'html',
    engine: 'bootstrap-js',
  },
  {
    id: 'hw-3-1-10',
    number: 10,
    title: 'فرم پرداخت کامل (Checkout) دو ستونه با خلاصه سبد خرید در کنار فرم',
    difficulty: 'challenging',
    bookPage: '۱۶۵ و ۱۸۰',
    estimatedMinutes: 20,
    prompt:
      'صفحه تسویه حساب بسازید که در دسکتاپ ۸ ستون برای فرم آدرس (نام، شهر، کد پستی) و ۴ ستون برای کارت خلاصه سبد خرید (list-group) اختصاص دهد.',
    sampleOutput: `صفحه Checkout حرفه‌ای ۸ ستون + ۴ ستون`,
    hint: 'از list-group و list-group-item d-flex justify-content-between برای اقلام فاکتور استفاده کنید.',
    solutionCode: `<div class="container py-2"><div class="row g-3">
  <div class="col-12 col-md-8"><div class="card p-3"><h6 class="fw-bold mb-3">مشخصات ارسال</h6><div class="row g-2"><div class="col-md-6"><input class="form-control form-control-sm" placeholder="نام و نام خانوادگی" /></div><div class="col-md-6"><input class="form-control form-control-sm" placeholder="کد پستی" /></div><div class="col-12"><button class="btn btn-success btn-sm w-100 mt-2">پرداخت آنلاین</button></div></div></div></div>
  <div class="col-12 col-md-4"><ul class="list-group"><li class="list-group-item d-flex justify-content-between"><span>طراح سایت</span><strong>۴۵٬۰۰۰</strong></li><li class="list-group-item d-flex justify-content-between bg-light"><strong>جمع کل</strong><strong class="text-success">۴۵٬۰۰۰ تومان</strong></li></ul></div>
</div></div>`,
    solutionExplanation: 'الگوی واقعی صفحات تسویه حساب فروشگاه‌های آنلاین با بوت‌استرپ ۵.۳.',
    language: 'html',
    engine: 'bootstrap-js',
  },
];

export const UNIT_3_1_QUICK_QUIZ: QuickQuizQuestion[] = [
  {
    id: 'qq-3-1-01',
    kind: 'bug-spot',
    bookPage: '۱۸۳',
    question: 'چرا کلیک روی دکمه زیر (باگ واقعی ص ۱۸۳ کتاب) پنجره مودال را باز نمی‌کند؟',
    codeSnippet: `<button data-bs-toggle="modal" data-bs-target="#addToCartMsg">خرید</button>
<div class="modal fade" id="addTocartMsg">...</div>`,
    options: [
      'کلاس fade نباید باشد',
      'حرف C در #addToCartMsg بزرگ است اما در id="addTocartMsg" کوچک نوشته شده',
      'دکمه باید تگ <a> باشد',
      'نیاز به style="display:block" است',
    ],
    correctIndex: 1,
    explanation: 'شناسه‌های HTML حساس به حروف بزرگ و کوچک هستند و کوچک‌ترین اختلافی اتصال JS بوت‌استرپ را قطع می‌کند.',
  },
  {
    id: 'qq-3-1-02',
    kind: 'concept',
    bookPage: '۱۶۳',
    question: 'در سیستم شبکه ۱۲ ستونه بوت‌استرپ، کلاس col-12 col-md-6 col-lg-3 در دسکتاپ (lg) چند کارت در هر ردیف می‌چیند؟',
    options: ['۱ کارت', '۲ کارت', '۳ کارت', '۴ کارت'],
    correctIndex: 3,
    explanation: 'مجموع ستون‌ها ۱۲ است؛ ۱۲ تقسیم بر ۳ برابر ۴ کارت هم‌عرض در هر ردیف دسکتاپ.',
  },
  {
    id: 'qq-3-1-03',
    kind: 'bug-spot',
    bookPage: '۱۵۲',
    question: 'کدام کلاس در Bootstrap 5.3 برای حذف کامل گردی گوشه‌ها (0px) و حاشیه قرمز صحیح است (اصلاح جدول ۴ و ۵ ص ۱۵۲)؟',
    codeSnippet: `گزینه الف: border danger-danger rounded-1
گزینه ب: border border-danger rounded-0`,
    options: ['گزینه الف', 'گزینه ب', 'هر دو', 'هیچ‌کدام'],
    correctIndex: 1,
    explanation: 'کلاس حاشیه قرمز border-danger و حذف گردی گوشه rounded-0 است.',
  },
  {
    id: 'qq-3-1-04',
    kind: 'concept',
    bookPage: '۱۵۶',
    question: 'در نسخه RTL فارسی بوت‌استرپ ۵.۳، کلاس ms-3 فاصله بیرونی (margin) را در کدام سمت ایجاد می‌کند؟',
    options: ['بالا', 'پایین', 'سمت راست (شروع خط فارسی)', 'سمت چپ (پایان خط فارسی)'],
    correctIndex: 2,
    explanation: 'حرف s مخفف start است و در جهت راست‌به‌چپ (RTL)، شروع خط سمت راست است.',
  },
  {
    id: 'qq-3-1-05',
    kind: 'concept',
    bookPage: '۱۵۸',
    question: 'کدام ترکیب کلاس باعث می‌شود عنصری در موبایل مخفی و از عرض تبلت (md) به بالا به صورت Flexbox دیده شود؟',
    options: ['d-flex d-md-none', 'd-none d-md-flex', 'hidden md-flex', 'd-md-flex'],
    correctIndex: 1,
    explanation: 'در طراحی Mobile-First ابتدا d-none برای موبایل و سپس d-md-flex از عرض md به بالا می‌نویسیم.',
  },
  {
    id: 'qq-3-1-06',
    kind: 'concept',
    bookPage: '۱۶۷',
    question: 'وظیفه کلاس img-fluid روی تصاویر در بوت‌استرپ چیست؟',
    options: [
      'دایره‌ای کردن تصویر',
      'واکنش‌گرا کردن تصویر (max-width: 100%; height: auto) تا از ستون بیرون نزند',
      'سیاه‌وسفید کردن تصویر',
      'وسط‌چین کردن تصویر',
    ],
    correctIndex: 1,
    explanation: 'img-fluid تصویر را متناسب با عرض ستون کوچک و بزرگ می‌کند و جلوی سرریز افقی را می‌گیرد.',
  },
  {
    id: 'qq-3-1-07',
    kind: 'concept',
    bookPage: '۱۷۹',
    question: 'در بوت‌استرپ ۵.۳ کدام کلاس مخصوص استایل‌دهی تگ <select> است؟',
    options: ['form-control', 'form-select', 'input-select', 'btn-select'],
    correctIndex: 1,
    explanation: 'در نسخه ۵ بوت‌استرپ کلاس اختصاصی لیست‌های کشویی form-select است.',
  },
  {
    id: 'qq-3-1-08',
    kind: 'concept',
    bookPage: '۱۸۶',
    question: 'اگر در اسلایدر Carousel بوت‌استرپ روی هیچ‌کدام از اسلایدها کلاس active نگذاریم چه اتفاقی می‌افتد؟',
    options: [
      'همه اسلایدها هم‌زمان زیر هم نشان داده می‌شوند',
      'اسلایدر کاملاً خالی و نامرئی نمایش داده می‌شود',
      'خودکار اسلاید آخر فعال می‌شود',
      'خطای قرمز مرورگر نمایش داده می‌شود',
    ],
    correctIndex: 1,
    explanation: 'دقیقاً یک .carousel-item باید کلاس active داشته باشد تا نقطه شروع اسلایدر مشخص شود.',
  },
  {
    id: 'qq-3-1-09',
    kind: 'concept',
    bookPage: '۱۸۸',
    question: 'در Accordion بوت‌استرپ، صفت data-bs-parent="#faqAccordion" چه کاری انجام می‌دهد؟',
    options: [
      'رنگ پس‌زمینه را عوض می‌کند',
      'باعث می‌شود با باز شدن یک پرسش، پرسش بازِ قبلی به‌طور خودکار بسته شود',
      'پرسش‌ها را حذف می‌کند',
      'تعداد ستون‌ها را تعیین می‌کند',
    ],
    correctIndex: 1,
    explanation: 'اتصال همه آیتم‌ها به یک parent واحد رفتار باز و بسته شدن انحصاری (تکی) را فعال می‌کند.',
  },
];
