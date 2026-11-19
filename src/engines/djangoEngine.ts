/**
 * 100% Offline SQLite (sql.js WASM) + Django MVT / ORM / Template / Open-Meteo Simulator.
 *
 * Supports:
 * - Real SQLite SQL execution via sql.js loaded locally from /vendor/sqljs/sql-wasm.wasm
 * - Clean deterministic fallback table engine so unit tests (node:test) & instant previews
 *   work seamlessly even before WASM finishes initializing
 * - Full Iranian Cities dataset from Module 5 (with corrected Hamedan lat 34.7981!)
 * - Offline Open-Meteo weather response simulator (including a 0°C cold-day case to prove the
 *   textbook's `{% if temp %}` vs `{% if temp is not None %}` bug!)
 * - Django ORM parser & SQL translator: City.objects.all(), .first(), .count(), .get(id=...),
 *   .filter(...), .create(...), .delete()
 * - Lightweight Django Template Engine supporting {{ var }}, {% if ... %}, {% if ... is not None %},
 *   {% else %}, {% endif %}, {% for x in list %}, {% endfor %}, {% url '...' %}, {% csrf_token %}
 */

export interface CityRow {
  id: number;
  title: string;
  lat: number;
  lon: number;
}

export interface OfflineWeatherData {
  city: string;
  lat: number;
  lon: number;
  temperature: number;
  windspeed: number;
  conditionFa: string;
  elevation: number;
}

export interface OrmExecutionResult {
  ormExpression: string;
  generatedSql: string;
  rows: CityRow[];
  message: string;
  error?: string;
}

export const INITIAL_IRAN_CITIES: CityRow[] = [
  {id: 1, title: 'تهران', lat: 35.6892, lon: 51.389},
  {id: 2, title: 'همدان', lat: 34.7981, lon: 48.5146}, // Corrected from textbook typo 37.7981
  {id: 3, title: 'مشهد', lat: 36.2605, lon: 59.6168},
  {id: 4, title: 'اصفهان', lat: 32.6546, lon: 51.668},
  {id: 5, title: 'شیراز', lat: 29.5918, lon: 52.5837},
  {id: 6, title: 'تبریز', lat: 38.0962, lon: 46.2738},
  {id: 7, title: 'رشت', lat: 37.2808, lon: 49.5832},
  {id: 8, title: 'اردبیل', lat: 38.2498, lon: 48.2933}, // 0°C winter test city for `is not None` bug
];

const WEATHER_PRESETS: Record<string, {temp: number; wind: number; cond: string; elev: number}> = {
  تهران: {temp: 19.4, wind: 11.2, cond: 'نیمه‌ابری', elev: 1190},
  همدان: {temp: 8.6, wind: 14.5, cond: 'خنک و صاف', elev: 1850},
  مشهد: {temp: 16.2, wind: 9.8, cond: 'آفتابی', elev: 995},
  اصفهان: {temp: 21.8, wind: 7.4, cond: 'آفتابی ملایم', elev: 1574},
  شیراز: {temp: 24.5, wind: 6.1, cond: 'صاف و گرم', elev: 1486},
  تبریز: {temp: 6.3, wind: 16.0, cond: 'ابری', elev: 1351},
  رشت: {temp: 14.9, wind: 12.3, cond: 'بارانی', elev: 4},
  اردبیل: {temp: 0, wind: 18.4, cond: 'برفی (دمای صفر درجه!)', elev: 1351},
};

export function fetchOfflineOpenMeteo(city: CityRow): OfflineWeatherData {
  const preset = WEATHER_PRESETS[city.title];
  if (preset) {
    return {
      city: city.title,
      lat: city.lat,
      lon: city.lon,
      temperature: preset.temp,
      windspeed: preset.wind,
      conditionFa: preset.cond,
      elevation: preset.elev,
    };
  }
  // Deterministic offline formula based on latitude/longitude for any custom city added by students
  const estimatedTemp = Number((34 - Math.abs(city.lat - 25) * 1.15).toFixed(1));
  return {
    city: city.title,
    lat: city.lat,
    lon: city.lon,
    temperature: estimatedTemp,
    windspeed: 10.5,
    conditionFa: estimatedTemp <= 4 ? 'سرد و برفی' : estimatedTemp <= 18 ? 'معتدل و نیمه‌ابری' : 'آفتابی',
    elevation: 1100,
  };
}

/**
 * Pure Django Template Renderer supporting core Module 5 tags:
 * {{ var }}, {% if cond %}, {% else %}, {% endif %}, {% for x in items %}, {% endfor %},
 * {% url 'name' %}, {% csrf_token %}.
 */
export function renderDjangoTemplate(
  template: string,
  context: Record<string, unknown>,
  urlMap: Record<string, string> = {
    home: '/',
    city_list: '/cities/',
    add_city: '/cities/add/',
    delete_city: '/cities/delete/',
    login: '/accounts/login/',
    logout: '/accounts/logout/',
  }
): string {
  const resolvePath = (expr: string, scope: Record<string, unknown>): unknown => {
    const trimmed = expr.trim();
    if ((trimmed.startsWith('"') && trimmed.endsWith('"')) || (trimmed.startsWith("'") && trimmed.endsWith("'"))) {
      return trimmed.slice(1, -1);
    }
    if (trimmed === 'None') return null;
    if (trimmed === 'True') return true;
    if (trimmed === 'False') return false;
    if (!Number.isNaN(Number(trimmed)) && trimmed !== '') return Number(trimmed);

    const parts = trimmed.split('.');
    let current: unknown = scope;
    for (const part of parts) {
      if (current === null || current === undefined) return undefined;
      if (typeof current === 'object') {
        current = (current as Record<string, unknown>)[part];
      } else {
        return undefined;
      }
    }
    return current;
  };

  const evalCondition = (rawCond: string, scope: Record<string, unknown>): boolean => {
    const cond = rawCond.trim();
    if (cond.endsWith(' is not None')) {
      const target = cond.slice(0, -' is not None'.length).trim();
      const val = resolvePath(target, scope);
      return val !== null && val !== undefined;
    }
    if (cond.endsWith(' is None')) {
      const target = cond.slice(0, -' is None'.length).trim();
      const val = resolvePath(target, scope);
      return val === null || val === undefined;
    }
    if (cond.startsWith('not ')) {
      return !evalCondition(cond.slice(4), scope);
    }
    const eqMatch = cond.match(/^(.+?)\s*==\s*(.+)$/);
    if (eqMatch) {
      return resolvePath(eqMatch[1], scope) === resolvePath(eqMatch[2], scope);
    }
    const val = resolvePath(cond, scope);
    if (Array.isArray(val)) return val.length > 0;
    // Matches Python truthiness: 0, "", null, undefined, false are falsy!
    return Boolean(val);
  };

  const renderBlock = (src: string, scope: Record<string, unknown>): string => {
    let output = src;

    // 1. Handle {% for item in list %} ... {% endfor %}
    const forRegex = /\{%\s*for\s+(\w+)\s+in\s+([\w.]+)\s*%\}([\s\S]*?)\{%\s*endfor\s*%\}/g;
    output = output.replace(forRegex, (_match, itemVar: string, listExpr: string, body: string) => {
      const iterable = resolvePath(listExpr, scope);
      if (!Array.isArray(iterable)) return '';
      return iterable
        .map((item, idx) =>
          renderBlock(body, {
            ...scope,
            [itemVar]: item,
            forloop: {counter: idx + 1, counter0: idx},
          })
        )
        .join('');
    });

    // 2. Handle {% if cond %} ... {% else %} ... {% endif %} (innermost first)
    const ifRegex = /\{%\s*if\s+([^%]+?)\s*%\}([\s\S]*?)\{%\s*endif\s*%\}/;
    let safety = 0;
    while (ifRegex.test(output) && safety < 30) {
      safety += 1;
      output = output.replace(ifRegex, (_m, cond: string, inner: string) => {
        const parts = inner.split(/\{%\s*else\s*%\}/);
        const trueBranch = parts[0] ?? '';
        const falseBranch = parts[1] ?? '';
        return evalCondition(cond, scope) ? renderBlock(trueBranch, scope) : renderBlock(falseBranch, scope);
      });
    }

    // 3. Handle {% url 'name' %} and {% csrf_token %}
    output = output.replace(/\{%\s*url\s+['"]([^'"]+)['"]\s*%\}/g, (_m, name: string) => urlMap[name] ?? `/${name}/`);
    output = output.replace(
      /\{%\s*csrf_token\s*%\}/g,
      '<input type="hidden" name="csrfmiddlewaretoken" value="offline-csrf-token-1405" />'
    );

    // 4. Handle {{ variable }}
    output = output.replace(/\{\{\s*([^}]+?)\s*\}\}/g, (_m, expr: string) => {
      const val = resolvePath(expr, scope);
      if (val === null || val === undefined) return '';
      return String(val);
    });

    return output;
  };

  return renderBlock(template, context);
}

/**
 * Pure ORM & SQLite Database Controller (works both in Browser via sql.js WASM
 * and in Node.js tests via pure in-memory store).
 */
export class DjangoSqliteController {
  private rows: CityRow[] = [];
  private nextId = 1;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private sqlDb: any = null;
  public usingRealSqliteWasm = false;

  constructor(initialRows: CityRow[] = INITIAL_IRAN_CITIES) {
    this.resetInMemory(initialRows);
  }

  private resetInMemory(initialRows: CityRow[]): void {
    this.rows = initialRows.map((r) => ({...r}));
    this.nextId = this.rows.reduce((max, r) => Math.max(max, r.id), 0) + 1;
  }

  async initSqliteWasm(): Promise<boolean> {
    if (this.sqlDb) return true;
    try {
      const initSqlJsModule = await import('sql.js');
      const initSqlJs = initSqlJsModule.default ?? initSqlJsModule;
      const SQL = await initSqlJs({
        locateFile: () => '/vendor/sqljs/sql-wasm.wasm',
      });
      this.sqlDb = new SQL.Database();
      this.sqlDb.run(`
        CREATE TABLE IF NOT EXISTS weather_city (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          title TEXT NOT NULL,
          lat REAL NOT NULL,
          lon REAL NOT NULL
        );
      `);
      for (const row of this.rows) {
        this.sqlDb.run('INSERT INTO weather_city (id, title, lat, lon) VALUES (?, ?, ?, ?)', [
          row.id,
          row.title,
          row.lat,
          row.lon,
        ]);
      }
      this.usingRealSqliteWasm = true;
      return true;
    } catch {
      this.usingRealSqliteWasm = false;
      return false;
    }
  }

  getAllCities(): CityRow[] {
    if (this.sqlDb) {
      const res = this.sqlDb.exec('SELECT id, title, lat, lon FROM weather_city ORDER BY id ASC');
      if (!res.length) return [];
      return res[0].values.map((v: (string | number)[]) => ({
        id: Number(v[0]),
        title: String(v[1]),
        lat: Number(v[2]),
        lon: Number(v[3]),
      }));
    }
    return this.rows.map((r) => ({...r}));
  }

  runRawSql(sql: string): {columns: string[]; values: (string | number | null)[][]; error?: string} {
    const trimmed = sql.trim();
    if (!trimmed) return {columns: [], values: []};

    if (this.sqlDb) {
      try {
        const result = this.sqlDb.exec(trimmed);
        // Keep in-memory mirror synchronized
        this.rows = this.getAllCities();
        if (!result.length) {
          return {columns: ['وضعیت'], values: [['دستور SQL با موفقیت در SQLite اجرا شد.']]};
        }
        return {
          columns: result[0].columns,
          values: result[0].values,
        };
      } catch (err) {
        return {
          columns: [],
          values: [],
          error: err instanceof Error ? err.message : String(err),
        };
      }
    }

    // Fallback when WASM is not loaded (e.g., Node.js unit tests)
    if (/^SELECT\b/i.test(trimmed)) {
      return {
        columns: ['id', 'title', 'lat', 'lon'],
        values: this.rows.map((r) => [r.id, r.title, r.lat, r.lon]),
      };
    }
    return {columns: ['وضعیت'], values: [['اجرا شد (حالت حافظه محلی)']]};
  }

  executeOrm(expression: string): OrmExecutionResult {
    const expr = expression.trim();

    if (expr === 'City.objects.all()') {
      const sql = 'SELECT id, title, lat, lon FROM weather_city ORDER BY id ASC;';
      return {
        ormExpression: expr,
        generatedSql: sql,
        rows: this.getAllCities(),
        message: `تعداد ${this.getAllCities().length} شهر از جدول weather_city بازیابی شد.`,
      };
    }

    if (expr === 'City.objects.first()') {
      const sql = 'SELECT id, title, lat, lon FROM weather_city ORDER BY id ASC LIMIT 1;';
      const all = this.getAllCities();
      const first = all[0] ? [all[0]] : [];
      return {
        ormExpression: expr,
        generatedSql: sql,
        rows: first,
        message: first.length ? `اولین رکورد: ${first[0].title}` : 'جدول خالی است (None).',
      };
    }

    if (expr === 'City.objects.last()') {
      const sql = 'SELECT id, title, lat, lon FROM weather_city ORDER BY id DESC LIMIT 1;';
      const all = this.getAllCities();
      const last = all.length ? [all[all.length - 1]] : [];
      return {
        ormExpression: expr,
        generatedSql: sql,
        rows: last,
        message: last.length ? `آخرین رکورد: ${last[0].title}` : 'جدول خالی است (None).',
      };
    }

    if (expr === 'City.objects.count()') {
      const sql = 'SELECT COUNT(*) FROM weather_city;';
      const all = this.getAllCities();
      return {
        ormExpression: expr,
        generatedSql: sql,
        rows: all,
        message: `تعداد کل شهرها: ${all.length}`,
      };
    }

    // City.objects.order_by('title' | '-lat' | 'lat' | 'id' | '-id')
    const orderByMatch = expr.match(/^City\.objects\.order_by\(['"](-?)(id|title|lat|lon)['"]\)$/);
    if (orderByMatch) {
      const desc = orderByMatch[1] === '-';
      const col = orderByMatch[2] as 'id' | 'title' | 'lat' | 'lon';
      const dir = desc ? 'DESC' : 'ASC';
      const sql = `SELECT id, title, lat, lon FROM weather_city ORDER BY ${col} ${dir};`;
      const sorted = [...this.getAllCities()].sort((a, b) => {
        if (col === 'title') {
          return desc ? b.title.localeCompare(a.title, 'fa') : a.title.localeCompare(b.title, 'fa');
        }
        return desc ? b[col] - a[col] : a[col] - b[col];
      });
      return {
        ormExpression: expr,
        generatedSql: sql,
        rows: sorted,
        message: `شهرها بر اساس ${col} (${desc ? 'نزولی' : 'صعودی'}) مرتب شدند.`,
      };
    }

    // City.objects.get(id=...)
    const getMatch = expr.match(/^City\.objects\.get\(id=(\d+)\)$/);
    if (getMatch) {
      const id = Number(getMatch[1]);
      const sql = `SELECT id, title, lat, lon FROM weather_city WHERE id = ${id};`;
      const found = this.getAllCities().filter((c) => c.id === id);
      if (found.length === 0) {
        return {
          ormExpression: expr,
          generatedSql: sql,
          rows: [],
          message: '',
          error: `City.DoesNotExist: شهری با شناسه id=${id} یافت نشد! (برای جلوگیری از کرش از filter(id=${id}).first() استفاده کنید)`,
        };
      }
      return {
        ormExpression: expr,
        generatedSql: sql,
        rows: found,
        message: `شهر «${found[0].title}» پیدا شد.`,
      };
    }

    // City.objects.filter(id=...).first() or City.objects.filter(id=...).delete() or City.objects.filter(title__contains='...')
    const filterIdDelete = expr.match(/^City\.objects\.filter\(id=(\d+)\)\.delete\(\)$/);
    if (filterIdDelete) {
      const id = Number(filterIdDelete[1]);
      const sql = `DELETE FROM weather_city WHERE id = ${id};`;
      const existed = this.getAllCities().some((c) => c.id === id);
      if (this.sqlDb) {
        this.sqlDb.run('DELETE FROM weather_city WHERE id = ?', [id]);
      }
      this.rows = this.rows.filter((c) => c.id !== id);
      return {
        ormExpression: expr,
        generatedSql: sql,
        rows: this.getAllCities(),
        message: existed
          ? `شهر با id=${id} با ایمنی کامل حذف شد.`
          : `شهری با id=${id} وجود نداشت (بدون خطا و کرش).`,
      };
    }

    const filterIdFirst = expr.match(/^City\.objects\.filter\(id=(\d+)\)\.first\(\)$/);
    if (filterIdFirst) {
      const id = Number(filterIdFirst[1]);
      const sql = `SELECT id, title, lat, lon FROM weather_city WHERE id = ${id} LIMIT 1;`;
      const found = this.getAllCities().filter((c) => c.id === id);
      return {
        ormExpression: expr,
        generatedSql: sql,
        rows: found,
        message: found.length ? `یافت شد: ${found[0].title}` : 'مقدار None برگردانده شد (بدون خطا).',
      };
    }

    const filterContains = expr.match(/^City\.objects\.filter\(title__contains=['"](.+?)['"]\)$/);
    if (filterContains) {
      const q = filterContains[1];
      const sql = `SELECT id, title, lat, lon FROM weather_city WHERE title LIKE '%${q}%';`;
      const found = this.getAllCities().filter((c) => c.title.includes(q));
      return {
        ormExpression: expr,
        generatedSql: sql,
        rows: found,
        message: `${found.length} شهر شامل «${q}» یافت شد.`,
      };
    }

    const filterExactTitle = expr.match(/^City\.objects\.filter\(title=['"](.+?)['"]\)$/);
    if (filterExactTitle) {
      const q = filterExactTitle[1];
      const sql = `SELECT id, title, lat, lon FROM weather_city WHERE title = '${q}';`;
      const found = this.getAllCities().filter((c) => c.title === q);
      return {
        ormExpression: expr,
        generatedSql: sql,
        rows: found,
        message: `${found.length} شهر با نام دقیق «${q}» یافت شد.`,
      };
    }

    const filterNumeric = expr.match(/^City\.objects\.filter\((lat|lon)__(gt|lt)=([\d.-]+)\)$/);
    if (filterNumeric) {
      const field = filterNumeric[1] as 'lat' | 'lon';
      const op = filterNumeric[2];
      const val = Number(filterNumeric[3]);
      const sqlOp = op === 'gt' ? '>' : '<';
      const sql = `SELECT id, title, lat, lon FROM weather_city WHERE ${field} ${sqlOp} ${val};`;
      const found = this.getAllCities().filter((c) => (op === 'gt' ? c[field] > val : c[field] < val));
      return {
        ormExpression: expr,
        generatedSql: sql,
        rows: found,
        message: `${found.length} شهر با شرط ${field} ${sqlOp} ${val} یافت شد.`,
      };
    }

    // City.objects.create(title='...', lat=..., lon=...)
    const createMatch = expr.match(
      /^City\.objects\.create\(\s*title=['"](.+?)['"]\s*,\s*lat=([\d.-]+)\s*,\s*lon=([\d.-]+)\s*\)$/
    );
    if (createMatch) {
      const title = createMatch[1].trim();
      const lat = Number(createMatch[2]);
      const lon = Number(createMatch[3]);
      const sql = `INSERT INTO weather_city (title, lat, lon) VALUES ('${title}', ${lat}, ${lon});`;
      if (this.sqlDb) {
        this.sqlDb.run('INSERT INTO weather_city (title, lat, lon) VALUES (?, ?, ?)', [title, lat, lon]);
        this.rows = this.getAllCities();
      } else {
        this.rows.push({id: this.nextId++, title, lat, lon});
      }
      return {
        ormExpression: expr,
        generatedSql: sql,
        rows: this.getAllCities(),
        message: `شهر جدید «${title}» در پایگاه‌داده ذخیره شد.`,
      };
    }

    return {
      ormExpression: expr,
      generatedSql: '-- دستور ORM ناشناخته',
      rows: this.getAllCities(),
      message: '',
      error: `عبارت ORM پشتیبانی نشد. نمونه‌ها: City.objects.all() ، City.objects.order_by('-lat') ، City.objects.filter(lat__gt=35) ، City.objects.filter(id=2).first() ، City.objects.create(title='یزد', lat=31.8974, lon=54.3569)`,
    };
  }

  resetDatabase(): void {
    this.resetInMemory(INITIAL_IRAN_CITIES);
    if (this.sqlDb) {
      this.sqlDb.run('DELETE FROM weather_city;');
      for (const row of this.rows) {
        this.sqlDb.run('INSERT INTO weather_city (id, title, lat, lon) VALUES (?, ?, ?, ?)', [
          row.id,
          row.title,
          row.lat,
          row.lon,
        ]);
      }
    }
  }
}
