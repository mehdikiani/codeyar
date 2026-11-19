/**
 * 100% Offline Sandboxed HTML / CSS / Bootstrap 5.3 RTL / JavaScript Preview Builder.
 *
 * - Injects bundled Bootstrap 5.3 RTL CSS & JS directly (zero CDN calls).
 * - Replaces broken relative image references (like book1.jpg, logo.png) with crisp local SVG covers
 *   for the textbook's «فروشگاه کتاب‌های درسی مرجع نو» project so nothing ever 404s offline.
 * - Bridges console.log/warn/error/info + runtime errors back to the host via postMessage.
 * - Replaces blocking window.alert / confirm / prompt inside the iframe with clean,
 *   in-frame RTL dialogs or simulated values so classroom workshops run safely inside iFrames.
 */

export interface SandboxConsoleEntry {
  id: string;
  level: 'log' | 'info' | 'warn' | 'error' | 'dialog';
  message: string;
  timestamp: string;
}

export interface BuildWebSandboxOptions {
  html: string;
  css?: string;
  js?: string;
  useBootstrap?: boolean;
  bootstrapCssRaw?: string;
  bootstrapJsRaw?: string;
  sandboxId: string;
}

function makeBookCoverSvg(title: string, subtitle: string, bg: string, accent: string): string {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="320" height="220" viewBox="0 0 320 220">
    <defs>
      <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="${bg}"/>
        <stop offset="100%" stop-color="${accent}"/>
      </linearGradient>
    </defs>
    <rect width="320" height="220" rx="14" fill="url(#g)"/>
    <rect x="18" y="18" width="284" height="184" rx="10" fill="none" stroke="rgba(255,255,255,0.35)" stroke-width="2"/>
    <text x="160" y="96" text-anchor="middle" fill="#ffffff" font-family="Vazirmatn, Tahoma, sans-serif" font-size="22" font-weight="700">${title}</text>
    <text x="160" y="132" text-anchor="middle" fill="rgba(255,255,255,0.9)" font-family="Vazirmatn, Tahoma, sans-serif" font-size="14">${subtitle}</text>
    <text x="160" y="176" text-anchor="middle" fill="rgba(255,255,255,0.75)" font-family="Vazirmatn, Tahoma, sans-serif" font-size="12">فروشگاه کتاب مرجع نو (آفلاین)</text>
  </svg>`;
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

export const OFFLINE_BOOKSTORE_IMAGES: Record<string, string> = {
  logo: makeBookCoverSvg('مرجع نو', 'فروشگاه کتاب‌های درسی', '#0369a1', '#0284c7'),
  book1: makeBookCoverSvg('طراح سایت', 'پایه یازدهم فنی‌وحرفه‌ای', '#0f766e', '#0d9488'),
  book2: makeBookCoverSvg('تولید محتوای الکترونیکی', 'پایه دهم شبکه و نرم‌افزار', '#4338ca', '#6366f1'),
  book3: makeBookCoverSvg('توسعه برنامه‌سازی', 'پایه دوازدهم رایانه', '#b45309', '#d97706'),
  banner: makeBookCoverSvg('کتاب‌های درسی ۱۴۰۵', 'ارسال سریع و تخفیف دانش‌آموزی', '#1e293b', '#0284c7'),
};

function rewriteOfflineImages(html: string): string {
  // Replace local relative image paths (e.g. images/book1.jpg, ./logo.png, banner.webp)
  // with bundled offline SVG data URLs so students see realistic textbook visuals without 404s.
  return html.replace(/(<img\b[^>]*\bsrc=["'])([^"']+)(["'])/gi, (full, prefix, src, suffix) => {
    if (src.startsWith('data:') || src.startsWith('blob:')) return full;
    const lower = src.toLowerCase();
    if (lower.includes('logo')) return `${prefix}${OFFLINE_BOOKSTORE_IMAGES.logo}${suffix}`;
    if (lower.includes('banner') || lower.includes('slide') || lower.includes('hero')) {
      return `${prefix}${OFFLINE_BOOKSTORE_IMAGES.banner}${suffix}`;
    }
    if (lower.includes('2') || lower.includes('content') || lower.includes('math')) {
      return `${prefix}${OFFLINE_BOOKSTORE_IMAGES.book2}${suffix}`;
    }
    if (lower.includes('3') || lower.includes('db') || lower.includes('prog')) {
      return `${prefix}${OFFLINE_BOOKSTORE_IMAGES.book3}${suffix}`;
    }
    return `${prefix}${OFFLINE_BOOKSTORE_IMAGES.book1}${suffix}`;
  });
}

function stripExternalCdns(html: string): string {
  // Prevent school lab offline stalls/404s if a student pastes a Bootstrap/FontAwesome CDN link
  return html
    .replace(/<link[^>]+href=["']https?:\/\/[^"']+["'][^>]*>/gi, '<!-- CDN stripped for 100% offline mode -->')
    .replace(/<script[^>]+src=["']https?:\/\/[^"']+["'][^>]*><\/script>/gi, '<!-- External script stripped for 100% offline mode -->');
}

export function buildWebSandboxSrcdoc(options: BuildWebSandboxOptions): string {
  const {
    html,
    css = '',
    js = '',
    useBootstrap = false,
    bootstrapCssRaw = '',
    bootstrapJsRaw = '',
    sandboxId,
  } = options;

  const cleanedHtml = rewriteOfflineImages(stripExternalCdns(html));
  const safeId = JSON.stringify(sandboxId);

  const bridgeScript = `
<script>
(function() {
  var SANDBOX_ID = ${safeId};
  function send(level, args) {
    var text = Array.prototype.slice.call(args).map(function(item) {
      if (item === null) return 'null';
      if (item === undefined) return 'undefined';
      if (typeof item === 'object') {
        try { return JSON.stringify(item, null, 2); } catch (e) { return String(item); }
      }
      return String(item);
    }).join(' ');
    try {
      window.parent.postMessage({ type: 'tarah-sandbox-console', sandboxId: SANDBOX_ID, level: level, message: text }, '*');
    } catch (e) {}
  }

  ['log', 'info', 'warn', 'error'].forEach(function(fn) {
    var orig = console[fn];
    console[fn] = function() {
      send(fn, arguments);
      if (orig) orig.apply(console, arguments);
    };
  });

  window.onerror = function(msg, src, line, col) {
    send('error', ['خطای جاوااسکریپت (خط ' + line + '): ' + msg]);
    return false;
  };

  // Non-blocking toast banner inside iframe for alert() so iframe never blocks
  function showToast(title, body) {
    var box = document.getElementById('__offline_toast');
    if (!box) {
      box = document.createElement('div');
      box.id = '__offline_toast';
      box.style.cssText = 'position:fixed;bottom:12px;left:12px;right:12px;z-index:99999;display:flex;flex-direction:column;gap:8px;pointer-events:none;direction:rtl;font-family:Vazirmatn,Tahoma,sans-serif;';
      document.body && document.body.appendChild(box);
    }
    var item = document.createElement('div');
    item.style.cssText = 'background:#0f172a;color:#f8fafc;padding:10px 14px;border-radius:10px;font-size:13px;box-shadow:0 10px 25px rgba(0,0,0,0.22);border:1px solid #38bdf8;pointer-events:auto;display:flex;justify-content:space-between;align-items:center;gap:12px;';
    item.innerHTML = '<span><strong>' + title + ':</strong> ' + String(body).replace(/</g, '&lt;') + '</span><button style="background:#38bdf8;color:#0f172a;border:none;border-radius:6px;padding:3px 10px;cursor:pointer;font-weight:700;">باشه</button>';
    item.querySelector('button').onclick = function() { item.remove(); };
    box.appendChild(item);
  }

  window.alert = function(msg) {
    send('dialog', ['[alert] ' + msg]);
    if (document.body) showToast('پیام صفحه (alert)', msg);
  };
  window.confirm = function(msg) {
    send('dialog', ['[confirm → true] ' + msg]);
    if (document.body) showToast('تأییدیه (confirm ← تأیید خودکار در پیش‌نمایش)', msg);
    return true;
  };
  window.prompt = function(msg, defVal) {
    var val = defVal !== undefined ? String(defVal) : 'کاربر آزمایشی';
    send('dialog', ['[prompt → "' + val + '"] ' + msg]);
    if (document.body) showToast('ورودی (prompt ← مقدار پیش‌فرض)', msg + ' ← ' + val);
    return val;
  };
})();
</script>`;

  const baseStyle = `
<style>
  body {
    font-family: "Vazirmatn", Tahoma, system-ui, sans-serif;
    margin: 0;
    padding: 16px;
    color: #0f172a;
    background: #ffffff;
    line-height: 1.75;
  }
  img { max-width: 100%; height: auto; }
</style>`;

  const bootstrapStyleTag =
    useBootstrap && bootstrapCssRaw ? `<style data-offline-bootstrap="css">${bootstrapCssRaw}</style>` : '';
  const bootstrapScriptTag =
    useBootstrap && bootstrapJsRaw ? `<script data-offline-bootstrap="js">${bootstrapJsRaw}<\/script>` : '';
  const userCssTag = css.trim() ? `<style data-user-css="true">${css}</style>` : '';
  const userJsTag = js.trim()
    ? `<script data-user-js="true">\ntry {\n${js}\n} catch (err) { console.error(err && err.message ? err.message : String(err)); }\n<\/script>`
    : '';

  const hasFullHtml = /<html[\s>]/i.test(cleanedHtml);
  if (hasFullHtml) {
    let doc = cleanedHtml;
    const headInject = `${bridgeScript}${bootstrapStyleTag}${userCssTag}`;
    if (/<\/head>/i.test(doc)) {
      doc = doc.replace(/<\/head>/i, `${headInject}\n</head>`);
    } else {
      doc = `${headInject}\n${doc}`;
    }
    const bodyInject = `${bootstrapScriptTag}${userJsTag}`;
    if (/<\/body>/i.test(doc)) {
      doc = doc.replace(/<\/body>/i, `${bodyInject}\n</body>`);
    } else {
      doc = `${doc}\n${bodyInject}`;
    }
    return doc;
  }

  return `<!doctype html>
<html lang="fa" dir="rtl">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    ${bridgeScript}
    ${bootstrapStyleTag}
    ${baseStyle}
    ${userCssTag}
  </head>
  <body>
    ${cleanedHtml}
    ${bootstrapScriptTag}
    ${userJsTag}
  </body>
</html>`;
}
