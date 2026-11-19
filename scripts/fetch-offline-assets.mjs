#!/usr/bin/env node
/**
 * 100% Offline Asset Preparation Script (USB-Ready Packaging)
 *
 * Run once while online:
 *   npm run setup:offline
 *
 * What it prepares inside public/vendor/:
 * 1. Copies sql-wasm.wasm from node_modules/sql.js/dist/ into public/vendor/sqljs/
 * 2. Downloads the official Pyodide runtime core files into public/vendor/pyodide/
 *    so Python modules (Modules 1 & 4) run real CPython in air-gapped school labs.
 *
 * Note: Vazirmatn Persian fonts, JetBrains Mono code font, and Bootstrap 5.3 RTL
 * CSS/JS are already bundled directly into Vite dist/ from npm packages!
 */

import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');

const PYODIDE_VERSION = '0.26.4';
const PYODIDE_BASE_URL = `https://cdn.jsdelivr.net/pyodide/v${PYODIDE_VERSION}/full/`;
const PYODIDE_FILES = [
  'pyodide.mjs',
  'pyodide.asm.js',
  'pyodide.asm.wasm',
  'python_stdlib.zip',
  'pyodide-lock.json',
];

function ensureDir(dirPath) {
  fs.mkdirSync(dirPath, {recursive: true});
}

function copySqlJsWasm() {
  const src = path.join(ROOT, 'node_modules', 'sql.js', 'dist', 'sql-wasm.wasm');
  const destDir = path.join(ROOT, 'public', 'vendor', 'sqljs');
  const dest = path.join(destDir, 'sql-wasm.wasm');

  ensureDir(destDir);
  if (!fs.existsSync(src)) {
    console.error('[خطا] فایل sql-wasm.wasm در node_modules یافت نشد. ابتدا npm install را اجرا کنید.');
    return false;
  }
  fs.copyFileSync(src, dest);
  const sizeKb = (fs.statSync(dest).size / 1024).toFixed(1);
  console.log(`[تأیید] SQLite WASM کپی شد: public/vendor/sqljs/sql-wasm.wasm (${sizeKb} KB)`);
  return true;
}

async function downloadFile(url, destPath) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`HTTP ${response.status} while fetching ${url}`);
  }
  const arrayBuffer = await response.arrayBuffer();
  fs.writeFileSync(destPath, Buffer.from(arrayBuffer));
  return arrayBuffer.byteLength;
}

async function fetchPyodide() {
  const destDir = path.join(ROOT, 'public', 'vendor', 'pyodide');
  ensureDir(destDir);

  console.log(`\nدر حال دریافت هسته آفلاین Pyodide v${PYODIDE_VERSION} در public/vendor/pyodide/ ...`);
  let totalBytes = 0;

  for (const filename of PYODIDE_FILES) {
    const dest = path.join(destDir, filename);
    if (fs.existsSync(dest) && fs.statSync(dest).size > 0) {
      const kb = (fs.statSync(dest).size / 1024).toFixed(1);
      console.log(`  [موجود] ${filename} (${kb} KB)`);
      totalBytes += fs.statSync(dest).size;
      continue;
    }

    const url = `${PYODIDE_BASE_URL}${filename}`;
    process.stdout.write(`  [دانلود] ${filename} ... `);
    const bytes = await downloadFile(url, dest);
    totalBytes += bytes;
    console.log(`انجام شد (${(bytes / 1024).toFixed(1)} KB)`);
  }

  const manifest = {
    pyodideVersion: PYODIDE_VERSION,
    preparedAt: new Date().toISOString(),
    files: PYODIDE_FILES,
    totalBytes,
  };
  fs.writeFileSync(path.join(destDir, 'offline-manifest.json'), JSON.stringify(manifest, null, 2));
  console.log(
    `[تأیید] هسته آفلاین پایتون آماده شد (حجم کل: ${(totalBytes / (1024 * 1024)).toFixed(2)} MB).`
  );
}

async function main() {
  console.log('=== آماده‌سازی فایل‌های ۱۰۰٪ آفلاین سامانه «طراح سایت ۱۴۰۵» ===\n');
  const sqlOk = copySqlJsWasm();

  const skipPyodide = process.argv.includes('--sql-only');
  if (!skipPyodide) {
    try {
      await fetchPyodide();
    } catch (err) {
      console.error(
        `\n[هشدار] دانلود Pyodide ناموفق بود (${err.message}).\n` +
          'موتور داخلی پایتون آفلاین همچنان بدون نیاز به اینترنت کار می‌کند، اما برای هسته کامل CPython هنگام اتصال به اینترنت دوباره npm run setup:offline را اجرا کنید.'
      );
    }
  }

  if (sqlOk) {
    console.log('\n[پایان] اکنون می‌توانید با دستور npm run build خروجی کاملاً آفلاین را در پوشه dist/ بسازید و روی فلش (USB) کپی کنید.');
  }
}

main();
