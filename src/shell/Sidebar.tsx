import {useRef, useState} from 'react';
import {
  BookOpenCheck,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  Circle,
  Download,
  Upload,
  WifiOff,
} from 'lucide-react';
import type {CurriculumModule} from '../types/curriculum.ts';
import {toPersianDigits} from '../utils/rubricEvaluator.ts';

interface SidebarProps {
  modules: CurriculumModule[];
  activeUnitId: string;
  completedUnits: string[];
  onSelectUnit: (unitId: string) => void;
  onToggleUnitComplete: (unitId: string) => void;
  onExportBackup: () => void;
  onImportBackup: (jsonText: string) => void;
}

const ACCENT_RING: Record<CurriculumModule['accentColor'], string> = {
  sky: 'bg-sky-600',
  emerald: 'bg-emerald-600',
  amber: 'bg-amber-600',
  violet: 'bg-violet-600',
  rose: 'bg-rose-600',
};

export function Sidebar({
  modules,
  activeUnitId,
  completedUnits,
  onSelectUnit,
  onToggleUnitComplete,
  onExportBackup,
  onImportBackup,
}: SidebarProps) {
  const [expandedModules, setExpandedModules] = useState<Record<string, boolean>>({
    module1: true,
    module2: true,
    module3: true,
    module4: true,
    module5: true,
  });
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const totalUnits = modules.reduce((acc, m) => acc + m.units.length, 0);
  const progressPercent = totalUnits > 0 ? Math.round((completedUnits.length / totalUnits) * 100) : 0;

  return (
    <aside className="flex h-full w-72 shrink-0 flex-col border-l border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
      {/* App Brand Header */}
      <div className="border-b border-slate-200 p-4 dark:border-slate-800">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-sky-600 text-white shadow-sm">
            <BookOpenCheck className="h-5 w-5" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="truncate text-sm font-extrabold text-slate-900 dark:text-white">
                کُدیار
              </span>
              <span
                dir="ltr"
                className="rounded bg-sky-100 px-1.5 py-0.5 font-mono text-[10px] font-bold text-sky-700 dark:bg-sky-900/60 dark:text-sky-300"
              >
                CodeYar
              </span>
            </div>
            <div className="truncate text-[11px] text-slate-500 dark:text-slate-400">
              دستیار تدریس طراح سایت ۱۴۰۵ • یازدهم
            </div>
          </div>
        </div>

        {/* Overall Teaching Progress */}
        <div className="mt-3.5">
          <div className="mb-1 flex items-center justify-between text-[11px] font-semibold text-slate-600 dark:text-slate-300">
            <span>پیشرفت تدریس سال تحصیلی</span>
            <span>
              {toPersianDigits(completedUnits.length)} از {toPersianDigits(totalUnits)} واحد
            </span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
            <div
              className="h-full rounded-full bg-sky-600 transition-all duration-300"
              style={{width: `${progressPercent}%`}}
            />
          </div>
        </div>
      </div>

      {/* 5 Modules & 10 Units Tree */}
      <nav className="flex-1 space-y-2 overflow-y-auto p-3" aria-label="فهرست پودمان‌ها">
        {modules.map((mod) => {
          const isOpen = expandedModules[mod.id] !== false;
          return (
            <div key={mod.id} className="rounded-xl border border-slate-200/80 bg-slate-50/60 dark:border-slate-800 dark:bg-slate-950/40">
              <button
                type="button"
                onClick={() =>
                  setExpandedModules((prev) => ({...prev, [mod.id]: !isOpen}))
                }
                className="flex w-full items-center justify-between gap-2 p-2.5 text-right"
              >
                <div className="flex min-w-0 items-center gap-2">
                  <span
                    className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-md text-xs font-extrabold text-white ${ACCENT_RING[mod.accentColor]}`}
                  >
                    {toPersianDigits(mod.moduleNumber)}
                  </span>
                  <div className="min-w-0">
                    <div className="truncate text-xs font-bold text-slate-900 dark:text-white">
                      پودمان {mod.persianNumber}: {mod.title}
                    </div>
                    <div className="truncate text-[10px] text-slate-500 dark:text-slate-400">
                      {mod.pageRange}
                    </div>
                  </div>
                </div>
                {isOpen ? (
                  <ChevronDown className="h-4 w-4 shrink-0 text-slate-400" />
                ) : (
                  <ChevronLeft className="h-4 w-4 shrink-0 text-slate-400" />
                )}
              </button>

              {isOpen && (
                <div className="space-y-1 border-t border-slate-200/70 p-1.5 dark:border-slate-800">
                  {mod.units.map((unit) => {
                    const isActive = unit.id === activeUnitId;
                    const isDone = completedUnits.includes(unit.id);
                    return (
                      <div
                        key={unit.id}
                        className={`flex items-center gap-1 rounded-lg transition ${
                          isActive
                            ? 'bg-sky-600 text-white shadow-sm'
                            : 'text-slate-700 hover:bg-white dark:text-slate-300 dark:hover:bg-slate-800/80'
                        }`}
                      >
                        <button
                          type="button"
                          onClick={() => onToggleUnitComplete(unit.id)}
                          title={isDone ? 'علامت‌گذاری به‌عنوان تدریس‌نشده' : 'علامت‌گذاری تدریس کامل شد'}
                          className={`p-2 transition ${
                            isActive
                              ? 'text-white/90 hover:text-white'
                              : isDone
                              ? 'text-emerald-600 dark:text-emerald-400'
                              : 'text-slate-400 hover:text-slate-600'
                          }`}
                        >
                          {isDone ? (
                            <CheckCircle2 className="h-4 w-4" />
                          ) : (
                            <Circle className="h-4 w-4" />
                          )}
                        </button>
                        <button
                          type="button"
                          onClick={() => onSelectUnit(unit.id)}
                          className="min-w-0 flex-1 py-2 pl-2 text-right"
                        >
                          <div className="line-clamp-2 text-xs leading-5 font-bold">
                            واحد {unit.unitNumber}: {unit.title}
                          </div>
                          <div
                            className={`mt-0.5 text-[10px] ${
                              isActive ? 'text-sky-100' : 'text-slate-500 dark:text-slate-400'
                            }`}
                          >
                            {unit.pageRange}
                          </div>
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      {/* Offline USB Backup Footer */}
      <div className="space-y-2 border-t border-slate-200 p-3 dark:border-slate-800">
        <div className="flex items-center gap-1.5 text-[11px] font-medium text-emerald-700 dark:text-emerald-400">
          <WifiOff className="h-3.5 w-3.5 shrink-0" />
          <span>اجرای ۱۰۰٪ آفلاین (بدون نیاز به اینترنت)</span>
        </div>
        <div className="grid grid-cols-2 gap-1.5">
          <button
            type="button"
            onClick={onExportBackup}
            className="inline-flex items-center justify-center gap-1 rounded-lg border border-slate-200 bg-slate-50 px-2 py-1.5 text-[11px] font-semibold text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
          >
            <Download className="h-3.5 w-3.5" />
            پشتیبان JSON
          </button>
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="inline-flex items-center justify-center gap-1 rounded-lg border border-slate-200 bg-slate-50 px-2 py-1.5 text-[11px] font-semibold text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
          >
            <Upload className="h-3.5 w-3.5" />
            بازیابی
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="application/json"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (!file) return;
              const reader = new FileReader();
              reader.onload = () => {
                if (typeof reader.result === 'string') {
                  onImportBackup(reader.result);
                }
              };
              reader.readAsText(file);
              e.target.value = '';
            }}
          />
        </div>
      </div>
    </aside>
  );
}
