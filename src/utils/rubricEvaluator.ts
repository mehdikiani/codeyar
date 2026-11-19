import type {RubricScore, RubricStage} from '../types/curriculum.ts';

export type CompetencyStatus = 'competent' | 'in-progress' | 'needs-work' | 'not-started';

export interface StudentUnitEvaluation {
  totalStages: number;
  gradedStages: number;
  criticalStagesCount: number;
  criticalPassedCount: number;
  criticalFailedStages: number[];
  averageScore: number;
  /** Weighted percentage (0..100) where score 3 = 100%, 2 = 66.7%, 1 = 33.3% */
  masteryPercent: number;
  status: CompetencyStatus;
  statusLabelFa: string;
}

/**
 * Evaluates a student's competency on a Learning Unit according to Iranian
 * vocational education (فنی‌وحرفه‌ای) competency rubric rules:
 * - Score 1: ضعیف / نیاز به آموزش مجدد
 * - Score 2: متوسط / حداقل شایستگی قابل قبول
 * - Score 3: عالی / تسلط کامل
 * - Critical stages (مراحل بحرانی / ستاره‌دار) MUST achieve score >= 2 to earn «شایسته».
 * - Overall average must also be >= 2.0 across all graded stages once all stages are graded.
 */
export function evaluateStudentUnit(
  stages: RubricStage[],
  studentScores: Record<number, RubricScore> | undefined
): StudentUnitEvaluation {
  const scores = studentScores ?? {};
  const totalStages = stages.length;

  let gradedStages = 0;
  let scoreSum = 0;
  let criticalStagesCount = 0;
  let criticalPassedCount = 0;
  const criticalFailedStages: number[] = [];

  for (const stage of stages) {
    const score = scores[stage.stageNumber] ?? 0;
    if (stage.isCritical) {
      criticalStagesCount += 1;
    }
    if (score > 0) {
      gradedStages += 1;
      scoreSum += score;
      if (stage.isCritical) {
        if (score >= 2) {
          criticalPassedCount += 1;
        } else {
          criticalFailedStages.push(stage.stageNumber);
        }
      }
    }
  }

  const averageScore = gradedStages > 0 ? Number((scoreSum / gradedStages).toFixed(2)) : 0;
  const masteryPercent =
    totalStages > 0 ? Math.round((scoreSum / (totalStages * 3)) * 100) : 0;

  let status: CompetencyStatus;
  let statusLabelFa: string;

  if (gradedStages === 0) {
    status = 'not-started';
    statusLabelFa = 'ارزشیابی نشده';
  } else if (criticalFailedStages.length > 0) {
    status = 'needs-work';
    statusLabelFa = 'نیاز به تلاش بیشتر (عدم احراز مرحله بحرانی)';
  } else if (gradedStages < totalStages) {
    status = 'in-progress';
    statusLabelFa = 'در حال ارزشیابی';
  } else if (averageScore >= 2) {
    status = 'competent';
    statusLabelFa = averageScore >= 2.65 ? 'شایسته (سطح عالی)' : 'شایسته (احراز کامل)';
  } else {
    status = 'needs-work';
    statusLabelFa = 'نیاز به تلاش بیشتر';
  }

  return {
    totalStages,
    gradedStages,
    criticalStagesCount,
    criticalPassedCount,
    criticalFailedStages,
    averageScore,
    masteryPercent,
    status,
    statusLabelFa,
  };
}

export function toPersianDigits(value: string | number): string {
  const map = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  return String(value).replace(/\d/g, (d) => map[Number(d)]);
}

export function buildRubricCsv(
  unitTitle: string,
  stages: RubricStage[],
  students: {name: string; scores: Record<number, RubricScore>}[]
): string {
  const header = [
    'نام هنرجو',
    ...stages.map((s) => `مرحله ${s.stageNumber}${s.isCritical ? ' (بحرانی)' : ''}: ${s.title}`),
    'میانگین',
    'وضعیت شایستگی',
  ];

  const escapeCsv = (cell: string) => `"${cell.replace(/"/g, '""')}"`;

  const rows = students.map((student) => {
    const evalResult = evaluateStudentUnit(stages, student.scores);
    return [
      student.name,
      ...stages.map((s) => {
        const sc = student.scores[s.stageNumber] ?? 0;
        return sc === 0 ? '-' : String(sc);
      }),
      evalResult.gradedStages > 0 ? String(evalResult.averageScore) : '-',
      evalResult.statusLabelFa,
    ]
      .map(escapeCsv)
      .join(',');
  });

  // Prefix UTF-8 BOM so Microsoft Excel / LibreOffice opens Persian cleanly offline
  return `\uFEFF${escapeCsv(unitTitle)}\n${header.map(escapeCsv).join(',')}\n${rows.join('\n')}`;
}
