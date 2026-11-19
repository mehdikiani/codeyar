import {useEffect, useRef, useState} from 'react';
import {motion} from 'motion/react';
import {CloudSun, Database, Play, Plus, RotateCcw, ShieldCheck, ShieldAlert, Trash2} from 'lucide-react';
import {
  DjangoSqliteController,
  fetchOfflineOpenMeteo,
  renderDjangoTemplate,
  type CityRow,
} from '../../engines/djangoEngine.ts';

const MVT_STEPS = [
  {id: 0, title: '۱. مرورگر (Request)', detail: 'کاربر آدرس /cities/?id=2 را درخواست می‌کند.', code: 'GET /cities/?id=2'},
  {id: 1, title: '۲. urls.py', detail: 'مسیریاب جنگو آدرس را به تابع city_list_view متصل می‌کند.', code: "path('cities/', city_list_view, name='city_list')"},
  {id: 2, title: '۳. views.py', detail: 'تابع View داده را از ORM و API آب‌وهوا می‌گیرد.', code: 'city = City.objects.filter(id=city_id).first()'},
  {id: 3, title: '۴. models.py + SQLite', detail: 'ORM دستور پایتون را به SQL تبدیل و از db.sqlite3 می‌خواند.', code: 'SELECT * FROM weather_city WHERE id = 2;'},
  {id: 4, title: '۵. templates (HTML)', detail: 'قالب جنگو با context پر شده و صفحه HTML نهایی ارسال می‌شود.', code: '{% if temp is not None %}{{ temp }}°C{% endif %}'},
];

export function DjangoMvtSqliteLab() {
  const ctrlRef = useRef<DjangoSqliteController | null>(null);
  const [cities, setCities] = useState<CityRow[]>([]);
  const [wasmReady, setWasmReady] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [selectedCityId, setSelectedCityId] = useState<number>(2); // Hamedan (corrected lat)
  const [lastOrm, setLastOrm] = useState('City.objects.all()');
  const [lastSql, setLastSql] = useState('SELECT id, title, lat, lon FROM weather_city ORDER BY id ASC;');
  const [ormFeedback, setOrmFeedback] = useState('پایگاه‌داده SQLite محلی آماده اجرای دستورات Django ORM است.');
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [useFixedZeroTempCheck, setUseFixedZeroTempCheck] = useState(true);

  // Add city form state
  const [newTitle, setNewTitle] = useState('یزد');
  const [newLat, setNewLat] = useState('31.8974');
  const [newLon, setNewLon] = useState('54.3569');

  useEffect(() => {
    let mounted = true;
    const ctrl = new DjangoSqliteController();
    ctrlRef.current = ctrl;
    setCities(ctrl.getAllCities());

    ctrl.initSqliteWasm().then((ok) => {
      if (mounted) {
        setWasmReady(ok);
        setCities(ctrl.getAllCities());
      }
    });
    return () => {
      mounted = false;
    };
  }, []);

  const runOrmAction = (expr: string) => {
    const ctrl = ctrlRef.current;
    if (!ctrl) return;
    const res = ctrl.executeOrm(expr);
    setLastOrm(res.ormExpression);
    setLastSql(res.generatedSql);
    setOrmFeedback(res.error ? `خطا: ${res.error}` : res.message);
    setCities(ctrl.getAllCities());
  };

  const handleAddCity = () => {
    if (!isAuthenticated) {
      setOrmFeedback('مسدودسازی امنیتی (اصلاح باگ امنیتی ص ۳۲۷): کاربر وارد نشده (is_authenticated=False) اجازه افزودن شهر ندارد!');
      return;
    }
    const cleanTitle = newTitle.trim();
    if (!cleanTitle) return;
    runOrmAction(`City.objects.create(title='${cleanTitle}', lat=${Number(newLat)}, lon=${Number(newLon)})`);
    setNewTitle('');
  };

  const handleDeleteCity = (id: number) => {
    if (!isAuthenticated) {
      setOrmFeedback('مسدودسازی امنیتی (ص ۳۲۷): تنها کاربران احراز هویت‌شده مجاز به ارسال POST حذف شهر هستند!');
      return;
    }
    runOrmAction(`City.objects.filter(id=${id}).delete()`);
  };

  const selectedCity = cities.find((c) => c.id === selectedCityId) ?? cities[0];
  const weather = selectedCity ? fetchOfflineOpenMeteo(selectedCity) : null;

  // Demonstrate textbook p.291 bug: `{% if temp %}` fails on 0°C (Ardabil)!
  const weatherTemplate = useFixedZeroTempCheck
    ? '{% if temp is not None %}دمای فعلی {{ city }}: {{ temp }} درجه سانتی‌گراد ({{ cond }}){% else %}دما در دسترس نیست{% endif %}'
    : '{% if temp %}دمای فعلی {{ city }}: {{ temp }} درجه سانتی‌گراد ({{ cond }}){% else %}دما در دسترس نیست (باگ کتاب در دمای صفر درجه!){% endif %}';

  const renderedWeatherLine = weather
    ? renderDjangoTemplate(weatherTemplate, {
        city: weather.city,
        temp: weather.temperature,
        cond: weather.conditionFa,
      })
    : 'شهری در جدول وجود ندارد (مدیریت باگ جدول خالی ص ۳۲۶)';

  return (
    <div className="space-y-6">
      {/* 1. Animated Django MVT Request-Response Pipeline */}
      <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              ۱. پویانمایی چرخه MVT جنگو (Request ← URL ← View ← SQLite ← Template)
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              روی هر مرحله کلیک کنید یا دکمه «گام بعدی» را بزنید تا سفر یک درخواست وب در پروژه آب‌وهوای <code className="font-mono">meteo</code> را ببینید.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setActiveStep((s) => (s + 1) % MVT_STEPS.length)}
            className="inline-flex items-center gap-1.5 rounded-lg bg-sky-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-sky-700"
          >
            <Play className="h-3.5 w-3.5" />
            گام بعدی چرخه
          </button>
        </div>

        <div className="grid grid-cols-1 gap-2 sm:grid-cols-5">
          {MVT_STEPS.map((step) => {
            const active = step.id === activeStep;
            return (
              <motion.button
                key={step.id}
                type="button"
                onClick={() => setActiveStep(step.id)}
                animate={{scale: active ? 1.03 : 1}}
                className={`rounded-xl border p-3 text-right transition ${
                  active
                    ? 'border-sky-500 bg-sky-50 shadow-sm dark:bg-sky-950/60'
                    : 'border-slate-200 bg-slate-50/70 hover:border-slate-300 dark:border-slate-800 dark:bg-slate-950/40'
                }`}
              >
                <div className={`text-xs font-bold ${active ? 'text-sky-700 dark:text-sky-300' : 'text-slate-700 dark:text-slate-200'}`}>
                  {step.title}
                </div>
                <p className="mt-1 text-[11px] leading-5 text-slate-600 dark:text-slate-400">{step.detail}</p>
              </motion.button>
            );
          })}
        </div>

        <div dir="ltr" className="mt-3 rounded-lg bg-slate-950 px-3 py-2 font-mono text-xs text-emerald-300">
          {MVT_STEPS[activeStep].code}
        </div>
      </div>

      {/* 2. Live SQLite (sql.js) + Django ORM + Offline Open-Meteo Simulator */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900 lg:col-span-7">
          <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
            <h3 className="flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-white">
              <Database className="h-4 w-4 text-emerald-600" />
              جدول زنده <code className="font-mono">weather_city</code> ({wasmReady ? 'SQLite WASM واقعی' : 'حافظه محلی'})
            </h3>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setIsAuthenticated((a) => !a)}
                className={`inline-flex items-center gap-1 rounded-lg border px-2.5 py-1 text-xs font-semibold ${
                  isAuthenticated
                    ? 'border-emerald-300 bg-emerald-50 text-emerald-800 dark:border-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300'
                    : 'border-rose-300 bg-rose-50 text-rose-800 dark:border-rose-800 dark:bg-rose-950/60 dark:text-rose-300'
                }`}
              >
                {isAuthenticated ? <ShieldCheck className="h-3.5 w-3.5" /> : <ShieldAlert className="h-3.5 w-3.5" />}
                {isAuthenticated ? 'کاربر وارد شده (admin)' : 'کاربر مهمان (بدون ورود)'}
              </button>
              <button
                type="button"
                onClick={() => {
                  ctrlRef.current?.resetDatabase();
                  setCities(ctrlRef.current?.getAllCities() ?? []);
                  setOrmFeedback('جدول شهرهای ایران به حالت اولیه بازنشانی شد.');
                }}
                className="inline-flex items-center gap-1 rounded-lg border border-slate-200 px-2 py-1 text-xs text-slate-600 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                بازنشانی
              </button>
            </div>
          </div>

          {/* Quick ORM Trigger Buttons */}
          <div className="mb-3 flex flex-wrap gap-1.5">
            <button
              type="button"
              onClick={() => runOrmAction('City.objects.all()')}
              className="rounded-md bg-slate-100 px-2 py-1 font-mono text-[11px] font-medium text-slate-800 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-200"
            >
              .all()
            </button>
            <button
              type="button"
              onClick={() => runOrmAction('City.objects.filter(id=2).first()')}
              className="rounded-md bg-slate-100 px-2 py-1 font-mono text-[11px] font-medium text-slate-800 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-200"
            >
              .filter(id=2).first()
            </button>
            <button
              type="button"
              onClick={() => runOrmAction('City.objects.get(id=999)')}
              className="rounded-md bg-rose-50 px-2 py-1 font-mono text-[11px] font-medium text-rose-700 hover:bg-rose-100 dark:bg-rose-950/60 dark:text-rose-300"
            >
              تست خطای .get(id=999)
            </button>
          </div>

          {/* ORM -> SQL Translation Display */}
          <div className="mb-3 space-y-1 rounded-lg border border-slate-200 bg-slate-950 p-2.5 text-left font-mono text-[11px]">
            <div dir="ltr" className="text-sky-300">ORM: {lastOrm}</div>
            <div dir="ltr" className="text-emerald-300">SQL: {lastSql}</div>
          </div>
          <p className="mb-3 text-xs font-medium text-slate-700 dark:text-slate-300">{ormFeedback}</p>

          {/* Table */}
          <div className="max-h-56 overflow-auto rounded-lg border border-slate-200 dark:border-slate-800">
            <table className="w-full text-right text-xs">
              <thead className="bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200">
                <tr>
                  <th className="px-2.5 py-2 font-mono">id</th>
                  <th className="px-2.5 py-2">نام شهر (title)</th>
                  <th className="px-2.5 py-2 font-mono">lat</th>
                  <th className="px-2.5 py-2 font-mono">lon</th>
                  <th className="px-2.5 py-2">عملیات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {cities.map((c) => (
                  <tr
                    key={c.id}
                    onClick={() => setSelectedCityId(c.id)}
                    className={`cursor-pointer transition ${
                      selectedCity?.id === c.id
                        ? 'bg-sky-50 dark:bg-sky-950/40'
                        : 'hover:bg-slate-50 dark:hover:bg-slate-800/40'
                    }`}
                  >
                    <td className="px-2.5 py-1.5 font-mono">{c.id}</td>
                    <td className="px-2.5 py-1.5 font-semibold">{c.title}</td>
                    <td className="px-2.5 py-1.5 font-mono">{c.lat}</td>
                    <td className="px-2.5 py-1.5 font-mono">{c.lon}</td>
                    <td className="px-2.5 py-1.5">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteCity(c.id);
                        }}
                        className="inline-flex items-center gap-1 rounded px-1.5 py-0.5 text-rose-600 hover:bg-rose-50 dark:text-rose-400 dark:hover:bg-rose-950"
                      >
                        <Trash2 className="h-3 w-3" />
                        حذف
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Add City (CityForm) */}
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="نام شهر..."
              className="w-28 rounded-lg border border-slate-300 bg-white px-2.5 py-1.5 text-xs dark:border-slate-700 dark:bg-slate-950"
            />
            <input
              dir="ltr"
              type="text"
              value={newLat}
              onChange={(e) => setNewLat(e.target.value)}
              placeholder="lat"
              className="w-24 rounded-lg border border-slate-300 bg-white px-2 py-1.5 font-mono text-xs dark:border-slate-700 dark:bg-slate-950"
            />
            <input
              dir="ltr"
              type="text"
              value={newLon}
              onChange={(e) => setNewLon(e.target.value)}
              placeholder="lon"
              className="w-24 rounded-lg border border-slate-300 bg-white px-2 py-1.5 font-mono text-xs dark:border-slate-700 dark:bg-slate-950"
            />
            <button
              type="button"
              onClick={handleAddCity}
              className="inline-flex items-center gap-1 rounded-lg bg-emerald-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-emerald-700"
            >
              <Plus className="h-3.5 w-3.5" />
              افزودن شهر (POST)
            </button>
          </div>
        </div>

        {/* Offline Weather App Live Preview + 0°C Template Bug Toggle */}
        <div className="flex flex-col justify-between rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900 lg:col-span-5">
          <div>
            <h3 className="flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-white">
              <CloudSun className="h-4 w-4 text-amber-500" />
              پیش‌نمایش زنده وب‌اپلیکیشن آب‌وهوا (آفلاین)
            </h3>
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
              روی شهر <strong>«اردبیل»</strong> (دمای ۰ درجه) در جدول کلیک کنید و کلید زیر را تغییر دهید تا باگ <code className="font-mono">{'{% if temp %}'}</code> در ص ۲۹۱ کتاب را در کلاس نشان دهید!
            </p>

            <div className="mt-3 rounded-xl border border-sky-200 bg-gradient-to-br from-sky-50 to-white p-4 dark:border-sky-900 dark:from-sky-950/60 dark:to-slate-900">
              <div className="text-sm font-bold text-sky-900 dark:text-sky-200">{renderedWeatherLine}</div>
              {weather && (
                <div dir="ltr" className="mt-2 flex flex-wrap gap-3 font-mono text-[11px] text-slate-600 dark:text-slate-400">
                  <span>lat: {weather.lat}</span>
                  <span>lon: {weather.lon}</span>
                  <span>wind: {weather.windspeed} km/h</span>
                </div>
              )}
            </div>
          </div>

          <div className="mt-4 rounded-lg border border-amber-200 bg-amber-50/70 p-3 dark:border-amber-900 dark:bg-amber-950/40">
            <div className="mb-2 text-xs font-bold text-amber-900 dark:text-amber-200">
              مقایسه کد قالب جنگو (تست باگ دمای صفر درجه ص ۲۹۱):
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setUseFixedZeroTempCheck(true)}
                className={`flex-1 rounded-md px-2 py-1.5 font-mono text-[11px] font-semibold ${
                  useFixedZeroTempCheck
                    ? 'bg-emerald-600 text-white'
                    : 'bg-white text-slate-700 dark:bg-slate-900 dark:text-slate-300'
                }`}
              >
                اصلاح‌شده: temp is not None
              </button>
              <button
                type="button"
                onClick={() => setUseFixedZeroTempCheck(false)}
                className={`flex-1 rounded-md px-2 py-1.5 font-mono text-[11px] font-semibold ${
                  !useFixedZeroTempCheck
                    ? 'bg-rose-600 text-white'
                    : 'bg-white text-slate-700 dark:bg-slate-900 dark:text-slate-300'
                }`}
              >
                کد کتاب: if temp
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
