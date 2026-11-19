import type {CurriculumModule, LearningUnit} from '../types/curriculum.ts';
import {UNIT_1_1} from './module1/unit1_1.ts';
import {UNIT_1_2} from './module1/unit1_2.ts';
import {UNIT_2_1} from './module2/unit2_1.ts';
import {UNIT_2_2} from './module2/unit2_2.ts';
import {UNIT_3_1} from './module3/unit3_1.ts';
import {UNIT_3_2} from './module3/unit3_2.ts';
import {UNIT_4_1} from './module4/unit4_1.ts';
import {UNIT_4_2} from './module4/unit4_2.ts';
import {UNIT_5_1} from './module5/unit5_1.ts';
import {UNIT_5_2} from './module5/unit5_2.ts';

/**
 * Master Curriculum Registry for «طراح سایت ۱۴۰۵» (5 Modules, 10 Complete Learning Units).
 * Every single one of the 10 units adheres to the Deep Content & Exercise Bank Standard:
 * - 6 to 8 structured self-contained Concept Lessons (Why, Syntax Anatomy, Behind the Scenes, Wrong vs Right)
 * - 4 tiered runnable examples per concept (Basic, Practical, Combined, What-If) -> 24 to 32 runnable examples/unit
 * - 8 to 9 classroom activities/workshops/projects with step guides + alternative Teacher Mode solutions
 * - 10 to 12 tiered homework assignments (Easy / Medium / Challenging) with offline A4 printable sheet
 * - 9 to 10 interactive quick board quiz questions ("What's the output?", Conceptual, Bug-Spot)
 * - Audited & fixed textbook errors, gap-filling notes, visual labs, and official Competency Rubrics
 */
export const CURRICULUM_MODULES: CurriculumModule[] = [
  // ==================== MODULE 1 ====================
  {
    id: 'module1',
    moduleNumber: 1,
    persianNumber: 'اول',
    title: 'برنامه‌نویسی پایتون',
    subtitle: 'مدل‌سازی داده، ساختارهای کنترل، توابع و ماژول‌ها',
    pageRange: 'صفحات ۱ تا ۸۱',
    engineLabel: 'پایتون آفلاین (اجرای گام‌به‌گام)',
    accentColor: 'sky',
    units: [UNIT_1_1, UNIT_1_2],
  },

  // ==================== MODULE 2 ====================
  {
    id: 'module2',
    moduleNumber: 2,
    persianNumber: 'دوم',
    title: 'طراحی صفحات وب ایستا',
    subtitle: 'ساختار معنایی HTML5 و چیدمان حرفه‌ای CSS3',
    pageRange: 'صفحات ۸۳ تا ۱۴۴',
    engineLabel: 'پیش‌نمایش زنده HTML / CSS',
    accentColor: 'emerald',
    units: [UNIT_2_1, UNIT_2_2],
  },

  // ==================== MODULE 3 ====================
  {
    id: 'module3',
    moduleNumber: 3,
    persianNumber: 'سوم',
    title: 'تولید صفحات وب تعاملی',
    subtitle: 'فریم‌ورک Bootstrap 5.3 RTL و برنامه‌نویسی JavaScript / DOM',
    pageRange: 'صفحات ۱۴۵ تا ۲۳۲',
    engineLabel: 'بوت‌استرپ ۵.۳ RTL آفلاین + کنسول JS',
    accentColor: 'amber',
    units: [UNIT_3_1, UNIT_3_2],
  },

  // ==================== MODULE 4 ====================
  {
    id: 'module4',
    moduleNumber: 4,
    persianNumber: 'چهارم',
    title: 'توسعه وب پایتون',
    subtitle: 'برنامه‌نویسی شیءگرا (OOP)، فایل‌ها، استثناها و JSON',
    pageRange: 'صفحات ۲۳۳ تا ۲۷۴',
    engineLabel: 'پایتون آفلاین + فایل‌سیستم مجازی',
    accentColor: 'violet',
    units: [UNIT_4_1, UNIT_4_2],
  },

  // ==================== MODULE 5 ====================
  {
    id: 'module5',
    moduleNumber: 5,
    persianNumber: 'پنجم',
    title: 'برنامه‌نویسی جنگو (Django)',
    subtitle: 'ساخت و توسعه وب‌اپلیکیشن آب‌وهوای «meteo» با SQLite و ORM',
    pageRange: 'صفحات ۲۷۵ تا ۳۲۹',
    engineLabel: 'SQLite WASM + شبیه‌ساز Django MVT',
    accentColor: 'rose',
    units: [UNIT_5_1, UNIT_5_2],
  },
];

export function findUnitAndModule(unitId: string): {module: CurriculumModule; unit: LearningUnit} {
  for (const mod of CURRICULUM_MODULES) {
    const unit = mod.units.find((u) => u.id === unitId);
    if (unit) return {module: mod, unit};
  }
  return {module: CURRICULUM_MODULES[0], unit: CURRICULUM_MODULES[0].units[0]};
}
