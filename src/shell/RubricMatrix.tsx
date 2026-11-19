import {useState} from 'react';
import {AlertTriangle, Award, Download, Plus, Star, Trash2, CheckCircle2, Info} from 'lucide-react';
import type {LearningUnit, RubricScore, StudentRecord} from '../types/curriculum.ts';
import {buildRubricCsv, evaluateStudentUnit, toPersianDigits} from '../utils/rubricEvaluator.ts';

interface RubricMatrixProps {
  unit: LearningUnit;
  students: StudentRecord[];
  teacherMode: boolean;
  onScoreChange: (studentId: string, stageNumber: number, score: RubricScore) => void;
  onAddStudent: (name: string) => void;
  onRemoveStudent: (studentId: string) => void;
}

export function RubricMatrix({
  unit,
  students,
  teacherMode,
  onScoreChange,
  onAddStudent,
  onRemoveStudent,
}: RubricMatrixProps) {
  const [newStudentName, setNewStudentName] = useState('');
  const [expandedStage, setExpandedStage] = useState<number | null>(null);

  const handleAdd = () => {
    const clean = newStudentName.trim();
    if (!clean) return;
    onAddStudent(clean);
    setNewStudentName('');
  };

  const handleExportCsv = () => {
    const csv = buildRubricCsv(
      `واحد ${unit.unitNumber}: ${unit.title}`,
      unit.rubric.stages,
      students.map((s) => ({name: s.name, scores: s.scores[unit.id] ?? {}}))
    );
    const blob = new Blob([csv], {type: 'text/csv;charset=utf-8;'});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `rubric-${unit.id}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const competentCount = students.filter(
    (s) => evaluateStudentUnit(unit.rubric.stages, s.scores[unit.id]).status === 'competent'
  ).length;

  return (
    <div className="space-y-4">
      {/* Header & Summary */}
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div>
          <h3 className="flex items-center gap-2 text-base font-bold text-slate-900 dark:text-white">
            <Award className="h-5 w-5 text-sky-600 dark:text-sky-400" />
            {unit.rubric.title}
          </h3>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            منبع کتاب درسی: {unit.rubric.pageRange} — مراحل دارای ستاره (★) <strong>مراحل بحرانی</strong> هستند و کسب حداقل نمره ۲ در آن‌ها برای احراز شایستگی الزامی است.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <div className="rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-800 dark:border-emerald-900 dark:bg-emerald-950/60 dark:text-emerald-300">
            احراز شایستگی: {toPersianDigits(competentCount)} از {toPersianDigits(students.length)} هنرجو
          </div>
          <button
            type="button"
            onClick={handleExportCsv}
            className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
          >
            <Download className="h-3.5 w-3.5" />
            خروجی اکسل (CSV)
          </button>
        </div>
      </div>

      {/* Textbook Audit Notice (shown clearly in Teacher Mode if the book had a rubric error) */}
      {unit.rubric.auditNotice && teacherMode && (
        <div className="flex items-start gap-2.5 rounded-xl border border-amber-300 bg-amber-50 p-3.5 text-xs leading-6 text-amber-950 dark:border-amber-800 dark:bg-amber-950/50 dark:text-amber-200">
          <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-amber-600 dark:text-amber-400" />
          <div>
            <strong className="block font-bold">نکته ممیزی مدرس درباره جدول کتاب درسی:</strong>
            {unit.rubric.auditNotice}
          </div>
        </div>
      )}

      {/* Stage Criteria Reference Cards */}
      <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="mb-2.5 flex items-center justify-between">
          <h4 className="text-sm font-bold text-slate-800 dark:text-slate-100">
            مراحل و معیارهای امتیازدهی (۱ تا ۳)
          </h4>
          <span className="text-[11px] text-slate-500">برای مشاهده جزئیات امتیاز ۱، ۲ و ۳ روی هر مرحله کلیک کنید</span>
        </div>
        <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
          {unit.rubric.stages.map((stage) => {
            const isOpen = expandedStage === stage.stageNumber;
            return (
              <div
                key={stage.stageNumber}
                className="rounded-lg border border-slate-200 bg-slate-50/70 p-2.5 dark:border-slate-800 dark:bg-slate-950/50"
              >
                <button
                  type="button"
                  onClick={() => setExpandedStage(isOpen ? null : stage.stageNumber)}
                  className="flex w-full items-center justify-between gap-2 text-right"
                >
                  <span className="flex items-center gap-1.5 text-xs font-bold text-slate-800 dark:text-slate-100">
                    <span className="inline-flex h-5 w-5 items-center justify-center rounded bg-sky-600 text-[11px] text-white">
                      {toPersianDigits(stage.stageNumber)}
                    </span>
                    {stage.title}
                  </span>
                  {stage.isCritical && (
                    <span className="inline-flex shrink-0 items-center gap-0.5 rounded bg-rose-100 px-1.5 py-0.5 text-[10px] font-bold text-rose-700 dark:bg-rose-950 dark:text-rose-300">
                      <Star className="h-3 w-3 fill-current" />
                      بحرانی
                    </span>
                  )}
                </button>
                {isOpen && (
                  <div className="mt-2.5 space-y-1.5 border-t border-slate-200 pt-2 text-[11px] leading-5 dark:border-slate-800">
                    <div className="text-rose-700 dark:text-rose-300">
                      <strong>نمره ۱:</strong> {stage.criteria.score1}
                    </div>
                    <div className="text-amber-700 dark:text-amber-300">
                      <strong>نمره ۲:</strong> {stage.criteria.score2}
                    </div>
                    <div className="text-emerald-700 dark:text-emerald-300">
                      <strong>نمره ۳:</strong> {stage.criteria.score3}
                    </div>
                    {stage.teacherAuditNote && teacherMode && (
                      <div className="mt-1 flex items-center gap-1 text-sky-700 dark:text-sky-300">
                        <Info className="h-3.5 w-3.5 shrink-0" />
                        {stage.teacherAuditNote}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Interactive Student Grading Matrix */}
      <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
          <h4 className="text-sm font-bold text-slate-800 dark:text-slate-100">
            ثبت نمرات کلاسی هنرجویان (ذخیره‌سازی خودکار آفلاین)
          </h4>
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={newStudentName}
              onChange={(e) => setNewStudentName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleAdd();
              }}
              placeholder="نام هنرجوی جدید..."
              className="w-44 rounded-lg border border-slate-300 bg-white px-2.5 py-1.5 text-xs text-slate-900 outline-none focus:border-sky-500 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
            />
            <button
              type="button"
              onClick={handleAdd}
              className="inline-flex items-center gap-1 rounded-lg bg-sky-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-sky-700"
            >
              <Plus className="h-3.5 w-3.5" />
              افزودن
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-right text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-slate-700 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300">
                <th className="p-2.5 font-bold">نام هنرجو</th>
                {unit.rubric.stages.map((s) => (
                  <th key={s.stageNumber} className="p-2 text-center font-bold" title={s.title}>
                    <div className="inline-flex items-center gap-0.5">
                      <span>م{toPersianDigits(s.stageNumber)}</span>
                      {s.isCritical && <Star className="h-3 w-3 fill-rose-500 text-rose-500" />}
                    </div>
                  </th>
                ))}
                <th className="p-2.5 text-center font-bold">میانگین</th>
                <th className="p-2.5 font-bold">وضعیت شایستگی</th>
                <th className="p-2 text-center">حذف</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {students.map((student) => {
                const unitScores = student.scores[unit.id] ?? {};
                const evaluation = evaluateStudentUnit(unit.rubric.stages, unitScores);
                return (
                  <tr key={student.id} className="hover:bg-slate-50/70 dark:hover:bg-slate-800/30">
                    <td className="p-2.5 font-semibold text-slate-900 dark:text-white">
                      {student.name}
                    </td>
                    {unit.rubric.stages.map((stage) => {
                      const current = unitScores[stage.stageNumber] ?? 0;
                      return (
                        <td key={stage.stageNumber} className="p-1.5 text-center">
                          <div className="inline-flex rounded-md border border-slate-200 bg-white p-0.5 dark:border-slate-700 dark:bg-slate-950">
                            {([1, 2, 3] as const).map((val) => {
                              const active = current === val;
                              const colorCls =
                                val === 1
                                  ? 'bg-rose-600 text-white'
                                  : val === 2
                                  ? 'bg-amber-500 text-white'
                                  : 'bg-emerald-600 text-white';
                              return (
                                <button
                                  key={val}
                                  type="button"
                                  onClick={() =>
                                    onScoreChange(
                                      student.id,
                                      stage.stageNumber,
                                      active ? 0 : val
                                    )
                                  }
                                  className={`h-6 w-6 rounded text-[11px] font-bold transition ${
                                    active
                                      ? colorCls
                                      : 'text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800'
                                  }`}
                                >
                                  {toPersianDigits(val)}
                                </button>
                              );
                            })}
                          </div>
                        </td>
                      );
                    })}
                    <td className="p-2.5 text-center font-mono font-bold text-slate-800 dark:text-slate-200">
                      {evaluation.gradedStages > 0 ? toPersianDigits(evaluation.averageScore) : '—'}
                    </td>
                    <td className="p-2.5">
                      <span
                        className={`inline-flex items-center gap-1 rounded-md px-2 py-1 text-[11px] font-semibold ${
                          evaluation.status === 'competent'
                            ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/70 dark:text-emerald-300'
                            : evaluation.status === 'needs-work'
                            ? 'bg-rose-100 text-rose-800 dark:bg-rose-950/70 dark:text-rose-300'
                            : evaluation.status === 'in-progress'
                            ? 'bg-sky-100 text-sky-800 dark:bg-sky-950/70 dark:text-sky-300'
                            : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400'
                        }`}
                      >
                        {evaluation.status === 'competent' && <CheckCircle2 className="h-3.5 w-3.5" />}
                        {evaluation.status === 'needs-work' && <AlertTriangle className="h-3.5 w-3.5" />}
                        {evaluation.statusLabelFa}
                      </span>
                    </td>
                    <td className="p-2 text-center">
                      <button
                        type="button"
                        onClick={() => onRemoveStudent(student.id)}
                        title="حذف هنرجو از فهرست"
                        className="rounded p-1 text-slate-400 hover:bg-rose-50 hover:text-rose-600 dark:hover:bg-rose-950"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
