import test from 'node:test';
import assert from 'node:assert/strict';
import {buildRubricCsv, evaluateStudentUnit} from '../src/utils/rubricEvaluator.ts';
import {executePythonCode} from '../src/engines/pythonEngine.ts';
import {
  DjangoSqliteController,
  INITIAL_IRAN_CITIES,
  renderDjangoTemplate,
} from '../src/engines/djangoEngine.ts';
import {buildWebSandboxSrcdoc} from '../src/engines/webSandbox.ts';
import type {RubricStage} from '../src/types/curriculum.ts';

const SAMPLE_STAGES: RubricStage[] = [
  {stageNumber: 1, title: 'مرحله بحرانی ۱', isCritical: true, criteria: {score1: 'a', score2: 'b', score3: 'c'}},
  {stageNumber: 2, title: 'مرحله بحرانی ۲', isCritical: true, criteria: {score1: 'a', score2: 'b', score3: 'c'}},
  {stageNumber: 3, title: 'مرحله عادی ۳', isCritical: false, criteria: {score1: 'a', score2: 'b', score3: 'c'}},
];

test('Rubric evaluator enforces critical stage failure even when average >= 2', () => {
  const res = evaluateStudentUnit(SAMPLE_STAGES, {1: 1, 2: 3, 3: 3});
  assert.equal(res.status, 'needs-work');
  assert.deepEqual(res.criticalFailedStages, [1]);
  assert.ok(res.averageScore >= 2);
});

test('Rubric evaluator marks student competent when all stages graded and criticals >= 2', () => {
  const res = evaluateStudentUnit(SAMPLE_STAGES, {1: 3, 2: 2, 3: 3});
  assert.equal(res.status, 'competent');
  assert.equal(res.criticalPassedCount, 2);
  const csv = buildRubricCsv('واحد ۱.۱', SAMPLE_STAGES, [{name: 'علی', scores: {1: 3, 2: 2, 3: 3}}]);
  assert.ok(csv.startsWith('\uFEFF'));
  assert.ok(csv.includes('علی'));
});

test('Python engine executes non-blocking input() inside while loop with step inspection', async () => {
  const inputs = ['پیتزا', 'کباب', 'exit'];
  let idx = 0;
  let out = '';
  const visitedLines: number[] = [];

  const result = await executePythonCode({
    code: `foods = ["قورمه"]
while True:
    item = input("غذا: ")
    if item == "exit":
        break
    foods.append(item)
print(len(foods), foods[-1])`,
    stepMode: true,
    onStdout: (chunk) => {
      out += chunk;
    },
    onRequestInput: async () => inputs[idx++] ?? 'exit',
    onStep: async (line) => {
      visitedLines.push(line);
    },
  });

  assert.equal(result.error, undefined);
  assert.ok(out.includes('3 کباب'));
  assert.ok(visitedLines.length > 5);
});

test('Python engine supports OOP inheritance, encapsulation, metaclass type(), pathlib, and json', async () => {
  let out = '';
  const result = await executePythonCode({
    code: `from pathlib import Path
import json

class Mobile:
    def __init__(self, brand):
        self.brand = brand
        self.__battery = 95
    def get_bat(self):
        return self.__battery

class SmartPhone(Mobile):
    def __init__(self, brand, os_name):
        super().__init__(brand)
        self.os_name = os_name

p = SmartPhone("Samsung", "Android")
print(p.brand, p.get_bat(), type(SmartPhone))

Path("data.json").write_text(json.dumps({"brand": p.brand, "bat": p.get_bat()}))
loaded = json.loads(Path("data.json").read_text())
print(loaded["brand"], loaded["bat"])`,
    files: {},
    onStdout: (chunk) => {
      out += chunk;
    },
    onRequestInput: async () => '',
  });

  assert.equal(result.error, undefined);
  assert.ok(out.includes("Samsung 95 <class 'type'>"));
  assert.ok(out.includes('Samsung 95\n'));
  assert.ok('data.json' in result.files);
});

test('Django engine fixes Hamedan latitude, 0°C template bug, and safe filter().first()', () => {
  const hamedan = INITIAL_IRAN_CITIES.find((c) => c.title === 'همدان');
  assert.ok(hamedan);
  assert.equal(hamedan.lat, 34.7981);

  const buggyTpl = '{% if temp %}OK {{ temp }}{% else %}MISSING{% endif %}';
  const fixedTpl = '{% if temp is not None %}OK {{ temp }}{% else %}MISSING{% endif %}';
  assert.equal(renderDjangoTemplate(buggyTpl, {temp: 0}), 'MISSING');
  assert.equal(renderDjangoTemplate(fixedTpl, {temp: 0}), 'OK 0');

  const ctrl = new DjangoSqliteController();
  const crashRes = ctrl.executeOrm('City.objects.get(id=999)');
  assert.ok(crashRes.error?.includes('City.DoesNotExist'));

  const safeRes = ctrl.executeOrm('City.objects.filter(id=999).first()');
  assert.equal(safeRes.error, undefined);
  assert.equal(safeRes.rows.length, 0);

  const addRes = ctrl.executeOrm("City.objects.create(title='یزد', lat=31.8974, lon=54.3569)");
  assert.equal(addRes.error, undefined);
  assert.ok(addRes.rows.some((r) => r.title === 'یزد'));
});

test('Web sandbox strips external CDNs, injects Bootstrap offline, and rewrites book images', () => {
  const doc = buildWebSandboxSrcdoc({
    html: '<link rel="stylesheet" href="https://cdn.example.com/bs.css"><img src="images/book1.jpg" />',
    useBootstrap: true,
    bootstrapCssRaw: '.btn { color: red; }',
    bootstrapJsRaw: 'window.__bsLoaded = true;',
    sandboxId: 'test-1',
  });

  assert.ok(!doc.includes('https://cdn.example.com'));
  assert.ok(doc.includes('data:image/svg+xml'));
  assert.ok(doc.includes('.btn { color: red; }'));
  assert.ok(doc.includes('window.__bsLoaded = true;'));
});

test('Python engine supports local .py module import, random.choices, os, turtle.circle, ternary & nested unpacking', async () => {
  let out = '';
  const result = await executePythonCode({
    code: `import my_module
from my_module import calc_discount
import random
import os
import turtle

print(my_module.greet("سارا"))
print(calc_discount(1000, 20))
pick = random.choices(["A", "B"], weights=[100, 0], k=1)[0]
print("PICK:", pick)
print("CWD:", os.getcwd())
turtle.circle(25)

d = {"سؤال ۱": "پایتون", "سؤال ۲": "تهران"}
for idx, (q, ans) in enumerate(d.items(), 1):
    msg = "درست" if len(ans) > 2 else "کوتاه"
    print(f"{idx}:{q}={ans}({msg})")`,
    files: {
      'my_module.py': `def greet(name):
    return f"سلام {name}"

def calc_discount(price, percent=10):
    return price * (100 - percent) / 100
`,
    },
    onStdout: (chunk) => {
      out += chunk;
    },
    onRequestInput: async () => '',
  });

  assert.equal(result.error, undefined, result.error);
  assert.ok(out.includes('سلام سارا'));
  assert.ok(out.includes('800'));
  assert.ok(out.includes('PICK: A'));
  assert.ok(out.includes('CWD: /classroom/python-lab'));
  assert.ok(out.includes('1:سؤال ۱=پایتون(درست)'));
  assert.ok(result.turtleSegments.length >= 20);
});

test('All 10 Learning Units adhere to the Deep Content & Exercise Bank Standard', async () => {
  const {CURRICULUM_MODULES} = await import('../src/curriculum/index.ts');
  assert.equal(CURRICULUM_MODULES.length, 5, 'Should have 5 modules');

  const allUnits = CURRICULUM_MODULES.flatMap((m) => m.units);
  assert.equal(allUnits.length, 10, 'Should have 10 learning units');

  for (const unit of allUnits) {
    assert.equal(unit.contentStatus, 'complete', `${unit.id} must have contentStatus: complete`);
    assert.ok((unit.lessons?.length ?? 0) >= 6, `${unit.id} must have >= 6 deep concept lessons`);
    assert.ok(unit.examples.length >= 24, `${unit.id} must have >= 24 tiered examples`);
    assert.ok(unit.activities.length >= 8, `${unit.id} must have >= 8 classroom activities`);
    assert.ok((unit.homeworks?.length ?? 0) >= 10, `${unit.id} must have >= 10 tiered homeworks`);
    assert.ok((unit.quickQuizzes?.length ?? 0) >= 9, `${unit.id} must have >= 9 quick quizzes`);
    assert.ok(unit.rubric.stages.length >= 4, `${unit.id} must have official rubric stages`);

    for (const lesson of unit.lessons ?? []) {
      assert.ok(lesson.whyWeNeedIt.realWorldProblem.length > 20, `${lesson.id} missing realWorldProblem`);
      assert.ok(lesson.whyWeNeedIt.analogy.length > 20, `${lesson.id} missing analogy`);
      assert.ok(lesson.syntaxAnatomy.parts.length >= 2, `${lesson.id} missing syntaxAnatomy parts`);
      assert.ok(lesson.behindTheScenes.length >= 2, `${lesson.id} missing behindTheScenes`);
      assert.ok(lesson.wrongVsRight.length >= 2, `${lesson.id} missing wrongVsRight`);
      assert.equal(lesson.examples.length, 4, `${lesson.id} must have 4 tiered examples`);
    }

    for (const act of unit.activities) {
      assert.ok(
        act.alternativeSolutionCode && act.alternativeSolutionCode.trim().length > 0,
        `${act.id} must provide alternativeSolutionCode`
      );
    }

    for (const quiz of unit.quickQuizzes ?? []) {
      assert.equal(quiz.options.length, 4, `${quiz.id} must have 4 options`);
      assert.ok(quiz.correctIndex >= 0 && quiz.correctIndex < 4, `${quiz.id} invalid correctIndex`);
    }
  }
});

test('All Python examples, classworks, alternatives, homeworks & bug fixes across ALL 10 units execute cleanly', async () => {
  const {CURRICULUM_MODULES} = await import('../src/curriculum/index.ts');
  const allUnits = CURRICULUM_MODULES.flatMap((m) => m.units);

  const inputPresets: Record<string, string[]> = {
    'ex-1-1-input-basic': ['سارا', '16'],
    'ex-1-1-input-practical': ['کیبورد', '250000', '2'],
    'ex-1-1-input-combined': ['18.5', '19', '17.5'],
    'ex-1-1-input-whatif': ['abc'],
    'ex-1-1-lists-combined': ['پیتزا'],
    'ex-1-1-cond-basic': ['ali'],
    'ex-1-1-cond-practical': ['82'],
    'ex-1-1-cond-combined': ['17', 'yes', 'no'],
    'ex-1-1-while-basic': ['4'],
    'ex-1-1-while-practical': ['', 'علی', 'سارا', 'exit'],
    'ex-1-1-while-combined': ['قورمه', 'فسنجان', 'done'],
    'act-1-1-ashpaz': ['کباب', 'exit'],
    'act-1-1-smart-shop': ['600000'],
    'act-1-1-grade-discount': ['18.5'],
    'act-1-1-countdown': ['3'],
    'act-1-1-wedding-cap': ['علی', 'سارا', 'رضا', 'نگار', 'امیر'],
    'act-1-1-food-done': ['پیتزا', 'پیتزا', 'کباب', 'done'],
    'act-1-1-mult-table': ['7', 'even'],
    'act-1-1-password-retry': ['wrong1', 'python1405'],
    'hw-1-1-01': ['امیرحسین', 'شبکه و نرم‌افزار', '19.25'],
    'hw-1-1-02': ['25'],
    'hw-1-1-03': ['20'],
    'hw-1-1-05': ['3665'],
    'hw-1-1-06': ['70', '1.75'],
    'hw-1-1-07': ['10'],
    'hw-1-1-09': ['2', '250000', '3', '500000', '1', '4'],
    'hw-1-1-10': ['17'],
    'hw-1-1-11': ['350000', '-5000', '400000', '0'],
    'act-1-2-quiz-project': ['1', 'def', 'dict', '3', 'append', 'none', '2'],
    'act-1-2-quiz-game': ['1', 'def', 'dict', '3', 'append', 'none', '2'],
    'act-1-2-calc-9': ['1', '10', '5', '4', '10', '0', '6', '17', '5', '7', '-8', '8', '3.14159', '2', '9', '16', '0'],
    'act-1-2-calculator-9': ['1', '12', '8'],
    'act-1-2-guess-number': ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20'],
    'act-1-2-guess-word': ['p', 'y', 't', 'h', 'o', 'n', 'a', 'e', 'i', 'r', 's', 'd', 'g', 'l', 'm', 'c', 'u', 'b', 'k', 'f'],
    'act-1-2-char-counter': ['Python 3.12'],
    'hw-1-2-05': ['185000'],
    'hw-1-2-09': ['10', '5', '15', '12', '8'],
  };

  let executedCount = 0;

  for (const unit of allUnits) {
    for (const ex of unit.examples) {
      if (ex.engine !== 'python' && ex.engine !== 'python-fs') continue;
      let idx = 0;
      const preset = inputPresets[ex.id] ?? ['10', 'test', 'exit', 'done', '0', '9'];
      const res = await executePythonCode({
        code: ex.code,
        files: ex.extraFiles ? {...ex.extraFiles} : {},
        onStdout: () => {},
        onRequestInput: async () => {
          if (idx >= 30) return 'exit';
          return preset[idx++] ?? 'exit';
        },
      });
      assert.equal(res.error, undefined, `Example ${ex.id} failed: ${res.error}`);
      executedCount++;
    }

    for (const bug of unit.bugChallenges) {
      if (bug.engine !== 'python' && bug.engine !== 'python-fs') continue;
      const res = await executePythonCode({
        code: bug.fixedCode,
        onStdout: () => {},
        onRequestInput: async () => '10',
      });
      assert.equal(res.error, undefined, `Bug challenge fixedCode ${bug.id} failed: ${res.error}`);
      executedCount++;
    }

    for (const act of unit.activities) {
      if (act.engine !== 'python' && act.engine !== 'python-fs') continue;
      let idx = 0;
      const preset = inputPresets[act.id] ?? ['10', 'test', 'done', 'exit', '9'];
      const res = await executePythonCode({
        code: act.solutionCode,
        files: act.extraFiles ? {...act.extraFiles} : {},
        onStdout: () => {},
        onRequestInput: async () => {
          if (idx >= 40) return 'exit';
          return preset[idx++] ?? 'exit';
        },
      });
      assert.equal(res.error, undefined, `Activity solution ${act.id} failed: ${res.error}`);
      executedCount++;

      if (act.alternativeSolutionCode) {
        let altIdx = 0;
        const altRes = await executePythonCode({
          code: act.alternativeSolutionCode,
          files: act.extraFiles ? {...act.extraFiles} : {},
          onStdout: () => {},
          onRequestInput: async () => {
            if (altIdx >= 40) return 'exit';
            return preset[altIdx++] ?? 'exit';
          },
        });
        assert.equal(altRes.error, undefined, `Activity alt solution ${act.id} failed: ${altRes.error}`);
        executedCount++;
      }
    }

    for (const hw of unit.homeworks ?? []) {
      if (hw.engine !== 'python' && hw.engine !== 'python-fs') continue;
      let idx = 0;
      const preset = inputPresets[hw.id] ?? ['10', 'test', '0', '4'];
      const res = await executePythonCode({
        code: hw.solutionCode,
        onStdout: () => {},
        onRequestInput: async () => {
          if (idx >= 40) return '0';
          return preset[idx++] ?? '0';
        },
      });
      assert.equal(res.error, undefined, `Homework solution ${hw.id} failed: ${res.error}`);
      executedCount++;
    }
  }

  assert.ok(executedCount >= 180, `Expected >= 180 live Python executions, ran ${executedCount}`);
});

test('All Module 5 Django ORM, SQL, and Template examples, classworks & homeworks execute cleanly', async () => {
  const {UNIT_5_1} = await import('../src/curriculum/module5/unit5_1.ts');
  const {UNIT_5_2} = await import('../src/curriculum/module5/unit5_2.ts');

  const checkDjangoSnippet = (id: string, language: string, code: string) => {
    const ctrl = new DjangoSqliteController();
    if (language === 'django-html' || code.includes('{%') || code.includes('{{')) {
      const cities = ctrl.getAllCities();
      const rendered = renderDjangoTemplate(code, {
        cities,
        city: cities[1] ?? cities[0],
        temp: 0,
        user: {is_authenticated: true, username: 'admin'},
      });
      assert.ok(rendered.trim().length > 0, `Template ${id} rendered empty`);
      assert.ok(!rendered.includes('{%'), `Template ${id} left unparsed tag`);
      return;
    }

    if (language === 'sql') {
      const res = ctrl.runRawSql(code);
      assert.equal(res.error, undefined, `SQL ${id} failed: ${res.error}`);
      return;
    }

    // Django ORM lines
    const lines = code
      .split('\n')
      .map((l) => l.trim())
      .filter((l) => l && !l.startsWith('#'));

    for (const line of lines) {
      const res = ctrl.executeOrm(line);
      if (id === 'ex-5-2-safe-basic' && line.includes('.get(id=999)')) {
        assert.ok(res.error?.includes('DoesNotExist'), 'Expected DoesNotExist demonstration in ex-5-2-safe-basic');
      } else {
        assert.equal(res.error, undefined, `ORM ${id} line "${line}" failed: ${res.error}`);
      }
    }
  };

  for (const unit of [UNIT_5_1, UNIT_5_2]) {
    for (const ex of unit.examples) {
      if (ex.engine === 'django-sql') checkDjangoSnippet(ex.id, ex.language, ex.code);
    }
    for (const act of unit.activities) {
      if (act.engine === 'django-sql') {
        checkDjangoSnippet(act.id, act.language, act.solutionCode);
        if (act.alternativeSolutionCode) {
          checkDjangoSnippet(`${act.id}-alt`, act.language, act.alternativeSolutionCode);
        }
      }
    }
    for (const hw of unit.homeworks ?? []) {
      if (hw.engine === 'django-sql') checkDjangoSnippet(hw.id, hw.language, hw.solutionCode);
    }
    for (const bug of unit.bugChallenges) {
      if (bug.engine === 'django-sql') checkDjangoSnippet(bug.id, bug.language, bug.fixedCode);
    }
  }
});


