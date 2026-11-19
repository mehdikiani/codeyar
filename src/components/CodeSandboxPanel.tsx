import {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {
  FileText,
  Monitor,
  Play,
  RotateCcw,
  SkipForward,
  Smartphone,
  Square,
  Tablet,
  Terminal,
  Cpu,
  CornerDownLeft,
  Database,
} from 'lucide-react';
import bootstrapRtlCssRaw from 'bootstrap/dist/css/bootstrap.rtl.min.css?raw';
import bootstrapJsRaw from 'bootstrap/dist/js/bootstrap.bundle.min.js?raw';
import {CodeEditor} from '../engines/CodeEditor.tsx';
import {
  executePythonCode,
  type TurtleSegment,
  type VariableSnapshot,
} from '../engines/pythonEngine.ts';
import {buildWebSandboxSrcdoc, type SandboxConsoleEntry} from '../engines/webSandbox.ts';
import {DjangoSqliteController, renderDjangoTemplate} from '../engines/djangoEngine.ts';
import type {CodeLanguage, EngineKind} from '../types/curriculum.ts';

interface CodeSandboxPanelProps {
  sandboxKey: string;
  engine: EngineKind;
  language: CodeLanguage;
  initialCode: string;
  initialCss?: string;
  initialJs?: string;
  initialFiles?: Record<string, string>;
  useBootstrap?: boolean;
  dark: boolean;
  savedCode?: string;
  onCodeSave?: (code: string) => void;
}

export function CodeSandboxPanel({
  sandboxKey,
  engine,
  language,
  initialCode,
  initialCss = '',
  initialJs = '',
  initialFiles,
  useBootstrap = false,
  dark,
  savedCode,
  onCodeSave,
}: CodeSandboxPanelProps) {
  const [code, setCode] = useState(savedCode ?? initialCode);
  const [cssCode, setCssCode] = useState(initialCss);
  const [jsCode, setJsCode] = useState(initialJs);
  const [activeWebTab, setActiveWebTab] = useState<'html' | 'css' | 'js'>('html');
  const [viewportMode, setViewportMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');

  // Python runtime state
  const [stdout, setStdout] = useState('');
  const [pyError, setPyError] = useState<string | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [highlightedLine, setHighlightedLine] = useState<number | null>(null);
  const [variables, setVariables] = useState<VariableSnapshot[]>([]);
  const [virtualFiles, setVirtualFiles] = useState<Record<string, string>>(initialFiles ?? {});
  const [selectedFile, setSelectedFile] = useState<string | null>(
    initialFiles ? Object.keys(initialFiles)[0] ?? null : null
  );
  const [turtleSegments, setTurtleSegments] = useState<TurtleSegment[]>([]);

  // Non-blocking inline terminal input() state
  const [pendingPrompt, setPendingPrompt] = useState<string | null>(null);
  const [inputValue, setInputValue] = useState('');
  const inputResolverRef = useRef<((val: string) => void) | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  // Step-by-step execution pause promise
  const [waitingForStep, setWaitingForStep] = useState(false);
  const stepResolverRef = useRef<(() => void) | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  // Web console state
  const [consoleLogs, setConsoleLogs] = useState<SandboxConsoleEntry[]>([]);
  const [runCounter, setRunCounter] = useState(0);

  // Django/SQLite state
  const djangoCtrlRef = useRef<DjangoSqliteController | null>(null);
  const [djangoOutput, setDjangoOutput] = useState<string>('');
  const [djangoSqlPreview, setDjangoSqlPreview] = useState<string>('');
  const [djangoPreviewHtml, setDjangoPreviewHtml] = useState<string>('');

  // Reset when sandboxKey changes
  useEffect(() => {
    abortRef.current?.abort();
    setCode(savedCode ?? initialCode);
    setCssCode(initialCss);
    setJsCode(initialJs);
    setActiveWebTab('html');
    setStdout('');
    setPyError(null);
    setIsRunning(false);
    setHighlightedLine(null);
    setVariables([]);
    setPendingPrompt(null);
    setWaitingForStep(false);
    setVirtualFiles(initialFiles ?? {});
    setSelectedFile(initialFiles ? Object.keys(initialFiles)[0] ?? null : null);
    setTurtleSegments([]);
    setConsoleLogs([]);
    setDjangoOutput('');
    setDjangoSqlPreview('');
    setDjangoPreviewHtml('');
  }, [sandboxKey, initialCode, initialCss, initialJs, initialFiles, savedCode]);

  // Listen for iframe console postMessages
  useEffect(() => {
    if (engine !== 'web' && engine !== 'bootstrap-js') return;
    const handler = (event: MessageEvent) => {
      const data = event.data;
      if (!data || data.type !== 'tarah-sandbox-console' || data.sandboxId !== sandboxKey) return;
      setConsoleLogs((prev) => [
        ...prev.slice(-40),
        {
          id: `${Date.now()}-${Math.random()}`,
          level: data.level,
          message: String(data.message ?? ''),
          timestamp: new Date().toLocaleTimeString('fa-IR'),
        },
      ]);
    };
    window.addEventListener('message', handler);
    return () => window.removeEventListener('message', handler);
  }, [engine, sandboxKey]);

  // Focus inline input when Python awaits input()
  useEffect(() => {
    if (pendingPrompt !== null) {
      inputRef.current?.focus();
    }
  }, [pendingPrompt]);

  const handleCodeChange = useCallback(
    (next: string) => {
      setCode(next);
      onCodeSave?.(next);
    },
    [onCodeSave]
  );

  const stopExecution = useCallback(() => {
    abortRef.current?.abort();
    if (inputResolverRef.current) {
      inputResolverRef.current('');
      inputResolverRef.current = null;
    }
    if (stepResolverRef.current) {
      stepResolverRef.current();
      stepResolverRef.current = null;
    }
    setPendingPrompt(null);
    setWaitingForStep(false);
    setIsRunning(false);
    setHighlightedLine(null);
  }, []);

  const runPython = useCallback(
    async (stepMode: boolean) => {
      stopExecution();
      const controller = new AbortController();
      abortRef.current = controller;

      setIsRunning(true);
      setStdout('');
      setPyError(null);
      setVariables([]);
      setTurtleSegments([]);
      setHighlightedLine(null);

      const res = await executePythonCode({
        code,
        files: virtualFiles,
        stepMode,
        signal: controller.signal,
        onStdout: (chunk) => setStdout((prev) => prev + chunk),
        onRequestInput: (prompt) =>
          new Promise<string>((resolve) => {
            setPendingPrompt(prompt || 'ورودی کاربر:');
            setInputValue('');
            inputResolverRef.current = resolve;
          }),
        onStep: async (line, vars) => {
          setHighlightedLine(line);
          setVariables(vars);
          setWaitingForStep(true);
          await new Promise<void>((resolve) => {
            stepResolverRef.current = resolve;
          });
          setWaitingForStep(false);
        },
        onFilesChange: (updated) => {
          setVirtualFiles(updated);
          if (!selectedFile && Object.keys(updated).length > 0) {
            setSelectedFile(Object.keys(updated)[0]);
          }
        },
        onTurtleSegment: (seg) => setTurtleSegments((prev) => [...prev, seg]),
      });

      setIsRunning(false);
      setHighlightedLine(null);
      setPendingPrompt(null);
      setWaitingForStep(false);
      if (res.error) {
        setPyError(res.error);
        if (res.errorLine) setHighlightedLine(res.errorLine);
      } else {
        setVariables(res.variables);
        setVirtualFiles(res.files);
      }
    },
    [code, selectedFile, stopExecution, virtualFiles]
  );

  const submitTerminalInput = () => {
    if (!inputResolverRef.current) return;
    const val = inputValue;
    const resolve = inputResolverRef.current;
    inputResolverRef.current = null;
    setPendingPrompt(null);
    setInputValue('');
    resolve(val);
  };

  const advanceStep = () => {
    if (!stepResolverRef.current) return;
    const resolve = stepResolverRef.current;
    stepResolverRef.current = null;
    resolve();
  };

  const runDjangoOrSql = useCallback(async () => {
    if (!djangoCtrlRef.current) {
      djangoCtrlRef.current = new DjangoSqliteController();
      await djangoCtrlRef.current.initSqliteWasm();
    }
    const ctrl = djangoCtrlRef.current;

    if (language === 'django-html' || code.includes('{%') || code.includes('{{')) {
      const cities = ctrl.getAllCities();
      const rendered = renderDjangoTemplate(code, {
        cities,
        city: cities[1] ?? cities[0],
        temp: 0, // Zero-degree test case to highlight `{% if temp is not None %}`
        user: {is_authenticated: true, username: 'admin'},
      });
      setDjangoPreviewHtml(rendered);
      setDjangoSqlPreview('-- قالب جنگو با داده‌های SQLite محلی (از جمله تست دمای ۰ درجه) رندر شد');
      setDjangoOutput('قالب با موفقیت رندر شد.');
      return;
    }

    if (language === 'sql' || /^(SELECT|INSERT|UPDATE|DELETE|CREATE|PRAGMA)\b/i.test(code.trim())) {
      const res = ctrl.runRawSql(code);
      if (res.error) {
        setDjangoOutput(`خطای SQLite: ${res.error}`);
      } else {
        const lines = [
          res.columns.join(' | '),
          res.columns.map(() => '---').join(' | '),
          ...res.values.map((row) => row.map((v) => String(v ?? 'NULL')).join(' | ')),
        ];
        setDjangoOutput(lines.join('\n'));
      }
      setDjangoSqlPreview(code.trim());
      setDjangoPreviewHtml('');
      return;
    }

    // Execute Django ORM lines
    const lines = code
      .split('\n')
      .map((l) => l.trim())
      .filter((l) => l && !l.startsWith('#'));
    const outputs: string[] = [];
    const sqls: string[] = [];
    for (const line of lines) {
      const res = ctrl.executeOrm(line);
      sqls.push(res.generatedSql);
      if (res.error) {
        outputs.push(`❌ ${res.error}`);
      } else {
        outputs.push(`✔ ${res.message}`);
        if (res.rows.length) {
          outputs.push(res.rows.map((r) => `  [${r.id}] ${r.title} (${r.lat}, ${r.lon})`).join('\n'));
        }
      }
    }
    setDjangoSqlPreview(sqls.join('\n'));
    setDjangoOutput(outputs.join('\n'));
    setDjangoPreviewHtml('');
  }, [code, language]);

  const webSrcdoc = useMemo(() => {
    if (engine !== 'web' && engine !== 'bootstrap-js') return '';
    return buildWebSandboxSrcdoc({
      html: language === 'javascript' ? `<div id="app"><h3>خروجی جاوااسکریپت را در کنسول پایین ببینید</h3></div>` : code,
      css: language === 'css' ? code : cssCode,
      js: language === 'javascript' ? code : jsCode,
      useBootstrap: useBootstrap || engine === 'bootstrap-js',
      bootstrapCssRaw: bootstrapRtlCssRaw,
      bootstrapJsRaw: bootstrapJsRaw,
      sandboxId: sandboxKey,
    });
  }, [code, cssCode, engine, jsCode, language, sandboxKey, useBootstrap, runCounter]);

  const handleReset = () => {
    stopExecution();
    setCode(initialCode);
    setCssCode(initialCss);
    setJsCode(initialJs);
    setVirtualFiles(initialFiles ?? {});
    setStdout('');
    setPyError(null);
    setConsoleLogs([]);
    setVariables([]);
    setTurtleSegments([]);
    setRunCounter((c) => c + 1);
    onCodeSave?.(initialCode);
  };

  const isPython = engine === 'python' || engine === 'python-fs';
  const isWeb = engine === 'web' || engine === 'bootstrap-js';
  const isDjango = engine === 'django-sql';

  return (
    <div className="flex flex-col gap-3 rounded-xl border border-slate-200 bg-white p-3.5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-2.5 dark:border-slate-800">
        <div className="flex items-center gap-2">
          {isWeb && language !== 'javascript' && (
            <div className="inline-flex rounded-lg border border-slate-200 bg-slate-50 p-0.5 text-xs dark:border-slate-700 dark:bg-slate-800">
              <button
                type="button"
                onClick={() => setActiveWebTab('html')}
                className={`rounded-md px-2.5 py-1 font-mono font-medium transition ${
                  activeWebTab === 'html'
                    ? 'bg-sky-600 text-white'
                    : 'text-slate-600 hover:text-slate-900 dark:text-slate-300'
                }`}
              >
                HTML
              </button>
              <button
                type="button"
                onClick={() => setActiveWebTab('css')}
                className={`rounded-md px-2.5 py-1 font-mono font-medium transition ${
                  activeWebTab === 'css'
                    ? 'bg-sky-600 text-white'
                    : 'text-slate-600 hover:text-slate-900 dark:text-slate-300'
                }`}
              >
                CSS
              </button>
              <button
                type="button"
                onClick={() => setActiveWebTab('js')}
                className={`rounded-md px-2.5 py-1 font-mono font-medium transition ${
                  activeWebTab === 'js'
                    ? 'bg-sky-600 text-white'
                    : 'text-slate-600 hover:text-slate-900 dark:text-slate-300'
                }`}
              >
                JS
              </button>
            </div>
          )}

          {isPython && (
            <span className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-600 dark:text-slate-300">
              <Terminal className="h-3.5 w-3.5 text-sky-600 dark:text-sky-400" />
              موتور آفلاین پایتون ۳
            </span>
          )}

          {isDjango && (
            <span className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-600 dark:text-slate-300">
              <Database className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
              موتور آفلاین SQLite + Django ORM
            </span>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-1.5">
          {isPython && (
            <>
              <button
                type="button"
                onClick={() => runPython(false)}
                disabled={isRunning}
                className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-600 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-emerald-700 disabled:opacity-50"
              >
                <Play className="h-3.5 w-3.5" />
                اجرا
              </button>
              <button
                type="button"
                onClick={() => (waitingForStep ? advanceStep() : runPython(true))}
                className="inline-flex items-center gap-1.5 rounded-lg border border-sky-200 bg-sky-50 px-3 py-1.5 text-xs font-semibold text-sky-700 transition hover:bg-sky-100 dark:border-sky-800 dark:bg-sky-950/60 dark:text-sky-300"
              >
                <SkipForward className="h-3.5 w-3.5" />
                {waitingForStep ? 'گام بعدی' : 'اجرای گام‌به‌گام'}
              </button>
              {isRunning && (
                <button
                  type="button"
                  onClick={stopExecution}
                  className="inline-flex items-center gap-1 rounded-lg bg-rose-600 px-2.5 py-1.5 text-xs font-semibold text-white hover:bg-rose-700"
                >
                  <Square className="h-3 w-3" />
                  توقف
                </button>
              )}
            </>
          )}

          {isWeb && (
            <>
              <div className="inline-flex rounded-lg border border-slate-200 p-0.5 dark:border-slate-700">
                <button
                  type="button"
                  title="نمای دسکتاپ"
                  onClick={() => setViewportMode('desktop')}
                  className={`rounded p-1 ${viewportMode === 'desktop' ? 'bg-slate-200 text-slate-900 dark:bg-slate-700 dark:text-white' : 'text-slate-500'}`}
                >
                  <Monitor className="h-3.5 w-3.5" />
                </button>
                <button
                  type="button"
                  title="نمای تبلت (768px)"
                  onClick={() => setViewportMode('tablet')}
                  className={`rounded p-1 ${viewportMode === 'tablet' ? 'bg-slate-200 text-slate-900 dark:bg-slate-700 dark:text-white' : 'text-slate-500'}`}
                >
                  <Tablet className="h-3.5 w-3.5" />
                </button>
                <button
                  type="button"
                  title="نمای موبایل (375px)"
                  onClick={() => setViewportMode('mobile')}
                  className={`rounded p-1 ${viewportMode === 'mobile' ? 'bg-slate-200 text-slate-900 dark:bg-slate-700 dark:text-white' : 'text-slate-500'}`}
                >
                  <Smartphone className="h-3.5 w-3.5" />
                </button>
              </div>
              <button
                type="button"
                onClick={() => {
                  setConsoleLogs([]);
                  setRunCounter((c) => c + 1);
                }}
                className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-600 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-emerald-700"
              >
                <Play className="h-3.5 w-3.5" />
                اجرای مجدد
              </button>
            </>
          )}

          {isDjango && (
            <button
              type="button"
              onClick={runDjangoOrSql}
              className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-600 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-emerald-700"
            >
              <Play className="h-3.5 w-3.5" />
              اجرا روی SQLite / جنگو
            </button>
          )}

          <button
            type="button"
            onClick={handleReset}
            className="inline-flex items-center gap-1 rounded-lg border border-slate-200 px-2.5 py-1.5 text-xs font-medium text-slate-600 transition hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            بازنشانی
          </button>
        </div>
      </div>

      {/* Editor */}
      {isWeb && language !== 'javascript' ? (
        <CodeEditor
          value={activeWebTab === 'html' ? code : activeWebTab === 'css' ? cssCode : jsCode}
          onChange={(val) => {
            if (activeWebTab === 'html') handleCodeChange(val);
            else if (activeWebTab === 'css') setCssCode(val);
            else setJsCode(val);
          }}
          language={activeWebTab === 'html' ? 'html' : activeWebTab === 'css' ? 'css' : 'javascript'}
          dark={dark}
          minHeight="230px"
        />
      ) : (
        <CodeEditor
          value={code}
          onChange={handleCodeChange}
          language={language}
          dark={dark}
          highlightedLine={highlightedLine}
          minHeight="230px"
        />
      )}

      {/* Python Output + Inline Non-Blocking input() + RAM Variables + Virtual FS + Turtle */}
      {isPython && (
        <div className="space-y-2.5">
          <div className="rounded-lg border border-slate-800 bg-slate-950 p-3 text-slate-100">
            <div className="mb-1.5 flex items-center justify-between text-[11px] text-slate-400">
              <span>خروجی ترمینال (LTR)</span>
              {highlightedLine && (
                <span className="font-mono text-sky-400">Line {highlightedLine}</span>
              )}
            </div>
            {stdout ? (
              <pre
                dir="ltr"
                className="max-h-56 min-h-[76px] overflow-auto whitespace-pre-wrap text-left font-mono text-xs leading-6 text-emerald-300"
              >
                {stdout}
              </pre>
            ) : !pyError ? (
              <div dir="rtl" className="min-h-[76px] py-2 text-xs text-slate-400">
                برای مشاهده خروجی، دکمه «اجرا» یا «اجرای گام‌به‌گام» را بزنید...
              </div>
            ) : null}

            {/* Non-blocking inline terminal input() box */}
            {pendingPrompt !== null && (
              <div className="mt-2 flex items-center gap-2 rounded-md border border-sky-500/60 bg-slate-900 p-2">
                <span className="shrink-0 text-xs font-medium text-sky-300">{pendingPrompt}</span>
                <input
                  ref={inputRef}
                  dir="auto"
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      submitTerminalInput();
                    }
                  }}
                  placeholder="مقدار را وارد کرده و Enter بزنید..."
                  className="flex-1 rounded border border-slate-700 bg-slate-950 px-2.5 py-1 font-mono text-xs text-white outline-none focus:border-sky-400"
                />
                <button
                  type="button"
                  onClick={submitTerminalInput}
                  className="inline-flex items-center gap-1 rounded bg-sky-600 px-2.5 py-1 text-xs font-semibold text-white hover:bg-sky-500"
                >
                  <CornerDownLeft className="h-3.5 w-3.5" />
                  ارسال
                </button>
              </div>
            )}

            {pyError && (
              <div
                dir="ltr"
                className="mt-2 rounded-md border border-rose-500/40 bg-rose-950/60 px-3 py-2 font-mono text-xs text-rose-200"
              >
                {pyError}
              </div>
            )}
          </div>

          {/* Live RAM Variables Inspector */}
          {variables.length > 0 && (
            <div className="rounded-lg border border-slate-200 bg-slate-50 p-2.5 dark:border-slate-800 dark:bg-slate-950/60">
              <div className="mb-2 flex items-center gap-1.5 text-xs font-semibold text-slate-700 dark:text-slate-200">
                <Cpu className="h-3.5 w-3.5 text-sky-600 dark:text-sky-400" />
                وضعیت متغیرها در حافظه (RAM)
              </div>
              <div className="grid grid-cols-1 gap-1.5 sm:grid-cols-2 lg:grid-cols-3">
                {variables.map((v) => (
                  <div
                    key={v.name}
                    dir="ltr"
                    className="flex items-center justify-between gap-2 rounded-md border border-slate-200 bg-white px-2.5 py-1.5 font-mono text-xs dark:border-slate-700 dark:bg-slate-900"
                  >
                    <span className="font-semibold text-sky-700 dark:text-sky-300">{v.name}</span>
                    <span className="truncate text-slate-700 dark:text-slate-200">{v.preview}</span>
                    <span className="shrink-0 rounded bg-slate-100 px-1.5 py-0.5 text-[10px] text-slate-500 dark:bg-slate-800 dark:text-slate-400">
                      {v.typeName}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Virtual File System Explorer for Module 4 (pathlib.Path & JSON) */}
          {(engine === 'python-fs' || Object.keys(virtualFiles).length > 0) && (
            <div className="rounded-lg border border-slate-200 bg-slate-50 p-3 dark:border-slate-800 dark:bg-slate-950/60">
              <div className="mb-2 flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-700 dark:text-slate-200">
                  <FileText className="h-3.5 w-3.5 text-violet-600 dark:text-violet-400" />
                  فایل‌سیستم مجازی (Virtual Files)
                </span>
                <div className="flex flex-wrap gap-1">
                  {Object.keys(virtualFiles).map((fname) => (
                    <button
                      key={fname}
                      type="button"
                      dir="ltr"
                      onClick={() => setSelectedFile(fname)}
                      className={`rounded px-2 py-0.5 font-mono text-xs transition ${
                        selectedFile === fname
                          ? 'bg-violet-600 text-white'
                          : 'bg-white text-slate-700 border border-slate-200 dark:bg-slate-900 dark:text-slate-300 dark:border-slate-700'
                      }`}
                    >
                      {fname}
                    </button>
                  ))}
                </div>
              </div>
              {selectedFile && virtualFiles[selectedFile] !== undefined ? (
                <div className="space-y-1">
                  <div className="text-[11px] text-slate-500 dark:text-slate-400">
                    محتوای فایل <code className="font-mono font-bold text-violet-600 dark:text-violet-400">{selectedFile}</code> (قابل ویرایش مستقیم پیش از اجرای کد اصلی):
                  </div>
                  <textarea
                    dir="ltr"
                    value={virtualFiles[selectedFile]}
                    onChange={(e) =>
                      setVirtualFiles((prev) => ({
                        ...prev,
                        [selectedFile]: e.target.value,
                      }))
                    }
                    rows={6}
                    className="w-full rounded border border-slate-200 bg-white p-2.5 text-left font-mono text-xs leading-6 text-slate-800 outline-none focus:border-violet-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
                  />
                </div>
              ) : (
                <p className="text-xs text-slate-500">
                  پس از اجرای کد با <code className="font-mono">Path(...).write_text(...)</code> فایل‌ها اینجا ظاهر می‌شوند.
                </p>
              )}
            </div>
          )}

          {/* Turtle Canvas if turtle commands ran */}
          {turtleSegments.length > 0 && (
            <div className="rounded-lg border border-slate-200 bg-white p-3 dark:border-slate-800 dark:bg-slate-950">
              <div className="mb-1.5 text-xs font-semibold text-slate-700 dark:text-slate-200">
                خروجی گرافیکی ماژول Turtle
              </div>
              <svg
                viewBox="-180 -120 360 240"
                className="h-48 w-full rounded border border-slate-100 bg-slate-50 dark:border-slate-800 dark:bg-slate-900"
              >
                {turtleSegments.map((s, idx) => (
                  <line
                    key={idx}
                    x1={s.x1}
                    y1={s.y1}
                    x2={s.x2}
                    y2={s.y2}
                    stroke={s.color}
                    strokeWidth={s.width}
                    strokeLinecap="round"
                  />
                ))}
              </svg>
            </div>
          )}
        </div>
      )}

      {/* Web / Bootstrap / JS Live Preview + Console */}
      {isWeb && (
        <div className="space-y-2.5">
          <div className="flex justify-center rounded-lg border border-slate-200 bg-slate-100 p-2 dark:border-slate-800 dark:bg-slate-950">
            <iframe
              key={`${sandboxKey}-${runCounter}`}
              title={`پیش‌نمایش زنده ${sandboxKey}`}
              srcDoc={webSrcdoc}
              sandbox="allow-scripts allow-forms allow-modals"
              className="h-72 rounded-md border border-slate-200 bg-white transition-all dark:border-slate-700"
              style={{
                width:
                  viewportMode === 'mobile'
                    ? '375px'
                    : viewportMode === 'tablet'
                    ? '768px'
                    : '100%',
              }}
            />
          </div>

          <div className="rounded-lg border border-slate-800 bg-slate-950 p-2.5">
            <div className="mb-1 flex items-center justify-between text-[11px] text-slate-400">
              <span>کنسول جاوااسکریپت (Console)</span>
              {consoleLogs.length > 0 && (
                <button
                  type="button"
                  onClick={() => setConsoleLogs([])}
                  className="text-slate-400 hover:text-white"
                >
                  پاک کردن
                </button>
              )}
            </div>
            <div dir="ltr" className="max-h-36 space-y-1 overflow-auto font-mono text-xs">
              {consoleLogs.length === 0 ? (
                <div className="text-slate-500">// خروجی console.log و پیام‌های alert در اینجا نمایش داده می‌شوند</div>
              ) : (
                consoleLogs.map((entry) => (
                  <div
                    key={entry.id}
                    className={`rounded px-2 py-1 ${
                      entry.level === 'error'
                        ? 'bg-rose-950/70 text-rose-200'
                        : entry.level === 'warn'
                        ? 'bg-amber-950/70 text-amber-200'
                        : entry.level === 'dialog'
                        ? 'bg-sky-950/70 text-sky-200'
                        : 'text-emerald-300'
                    }`}
                  >
                    {entry.message}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      {/* Django / SQLite Output */}
      {isDjango && (
        <div className="space-y-2">
          {djangoSqlPreview && (
            <div dir="ltr" className="rounded-lg border border-slate-200 bg-slate-50 p-2.5 font-mono text-xs text-sky-700 dark:border-slate-800 dark:bg-slate-950 dark:text-sky-300">
              {djangoSqlPreview}
            </div>
          )}
          {djangoPreviewHtml ? (
            <div
              className="rounded-lg border border-slate-200 bg-white p-3 text-sm text-slate-900 dark:border-slate-700"
              dangerouslySetInnerHTML={{__html: djangoPreviewHtml}}
            />
          ) : (
            <pre
              dir="ltr"
              className="min-h-[80px] overflow-auto rounded-lg border border-slate-800 bg-slate-950 p-3 font-mono text-xs text-emerald-300"
            >
              {djangoOutput || 'دکمه «اجرا روی SQLite / جنگو» را بزنید تا کوئری یا قالب اجرا شود...'}
            </pre>
          )}
        </div>
      )}
    </div>
  );
}
