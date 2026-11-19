/**
 * 100% Offline Dual-Layer Python 3 Execution Engine.
 *
 * Layer 1 (Local Pyodide WASM): If public/vendor/pyodide/pyodide.mjs has been prepared via
 *   `npm run setup:offline`, full CPython executes locally in the browser with an async bridge
 *   for non-blocking `input()` inside loops and synchronized virtual filesystem files.
 * Layer 2 (Zero-Network Built-in Python 3 Interpreter): Runs 100% offline out-of-the-box with
 *   zero external files, supporting:
 *   - Non-blocking `await input(prompt)` inside while/for loops (inline terminal input, NEVER window.prompt)
 *   - True line-by-line Step Execution with live RAM variable snapshots
 *   - Modules 1 & 4 full syllabus: variables, types, f-strings, lists/tuples/sets/dicts,
 *     if/elif/else, for/while/break/continue/pass, def/return/defaults/kwargs,
 *     OOP classes/__init__/self/inheritance/super()/override/encapsulation/metaclasses,
 *     try/except/else/finally, pathlib.Path virtual FS, json.dumps/loads, math, random, datetime, turtle.
 */

export interface TurtleSegment {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  color: string;
  width: number;
}

export interface VariableSnapshot {
  name: string;
  typeName: string;
  preview: string;
}

export interface PythonRunOptions {
  code: string;
  files?: Record<string, string>;
  stepMode?: boolean;
  maxSteps?: number;
  signal?: AbortSignal;
  onStdout: (chunk: string) => void;
  onRequestInput: (prompt: string) => Promise<string>;
  onStep?: (line: number, variables: VariableSnapshot[]) => Promise<void>;
  onFilesChange?: (files: Record<string, string>) => void;
  onTurtleSegment?: (segment: TurtleSegment) => void;
}

export interface PythonRunResult {
  engineUsed: 'local-pyodide' | 'builtin-offline-python';
  stdout: string;
  error?: string;
  errorLine?: number;
  files: Record<string, string>;
  variables: VariableSnapshot[];
  turtleSegments: TurtleSegment[];
}

// ---------- Python Runtime Value Wrappers ----------

interface PyTuple {
  __pyType: 'tuple';
  items: unknown[];
}
interface PySet {
  __pyType: 'set';
  items: unknown[];
}
interface PyDict {
  __pyType: 'dict';
  entries: [unknown, unknown][];
}
interface PyFunc {
  __pyType: 'func';
  name: string;
  params: {name: string; defaultExpr?: string}[];
  body: AstNode[];
  closure: Scope;
}
interface PyClass {
  __pyType: 'class';
  name: string;
  base?: PyClass;
  methods: Record<string, PyFunc>;
  classAttrs: Record<string, unknown>;
}
interface PyInstance {
  __pyType: 'instance';
  cls: PyClass;
  attrs: Record<string, unknown>;
}
interface PyModule {
  __pyType: 'module';
  name: string;
  exports: Record<string, unknown>;
}
interface PyPathObj {
  __pyType: 'path';
  path: string;
}
interface PyTypeObj {
  __pyType: 'type';
  label: string;
}
interface PyBoundMethod {
  __pyType: 'bound';
  self: unknown;
  fn: (args: unknown[], kwargs: Record<string, unknown>) => Promise<unknown> | unknown;
}
interface PyDateObj {
  __pyType: 'date';
  iso: string;
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
  second: number;
}

class PyException extends Error {
  pyType: string;
  line?: number;
  constructor(pyType: string, message: string, line?: number) {
    super(`${pyType}: ${message}`);
    this.pyType = pyType;
    this.line = line;
  }
}

class BreakSignal {}
class ContinueSignal {}
class ReturnSignal {
  value: unknown;
  constructor(value: unknown) {
    this.value = value;
  }
}

type Scope = Record<string, unknown>;

function isObj(v: unknown, t: string): boolean {
  return Boolean(v && typeof v === 'object' && (v as Record<string, unknown>).__pyType === t);
}

function makeTuple(items: unknown[]): PyTuple {
  return {__pyType: 'tuple', items};
}
function makeSet(items: unknown[]): PySet {
  const unique: unknown[] = [];
  for (const item of items) {
    if (!unique.some((u) => pyEquals(u, item))) unique.push(item);
  }
  return {__pyType: 'set', items: unique};
}
function makeDict(entries: [unknown, unknown][]): PyDict {
  const result: [unknown, unknown][] = [];
  for (const [k, v] of entries) {
    const idx = result.findIndex(([ek]) => pyEquals(ek, k));
    if (idx >= 0) result[idx] = [k, v];
    else result.push([k, v]);
  }
  return {__pyType: 'dict', entries: result};
}

export function pyTypeName(val: unknown): string {
  if (val === null || val === undefined) return 'NoneType';
  if (typeof val === 'boolean') return 'bool';
  if (typeof val === 'number') return Number.isInteger(val) ? 'int' : 'float';
  if (typeof val === 'string') return 'str';
  if (Array.isArray(val)) return 'list';
  if (isObj(val, 'tuple')) return 'tuple';
  if (isObj(val, 'set')) return 'set';
  if (isObj(val, 'dict')) return 'dict';
  if (isObj(val, 'func') || isObj(val, 'bound') || typeof val === 'function') return 'function';
  if (isObj(val, 'class')) return 'type';
  if (isObj(val, 'instance')) return (val as PyInstance).cls.name;
  if (isObj(val, 'path')) return 'PosixPath';
  if (isObj(val, 'module')) return 'module';
  if (isObj(val, 'type')) return 'type';
  return 'object';
}

export function pyStr(val: unknown, repr = false): string {
  if (val === null || val === undefined) return 'None';
  if (typeof val === 'boolean') return val ? 'True' : 'False';
  if (typeof val === 'number') {
    return Object.is(val, -0) ? '0' : String(val);
  }
  if (typeof val === 'string') {
    return repr ? `'${val.replace(/\\/g, '\\\\').replace(/'/g, "\\'")}'` : val;
  }
  if (Array.isArray(val)) {
    return `[${val.map((v) => pyStr(v, true)).join(', ')}]`;
  }
  if (isObj(val, 'tuple')) {
    const items = (val as PyTuple).items;
    if (items.length === 1) return `(${pyStr(items[0], true)},)`;
    return `(${items.map((v) => pyStr(v, true)).join(', ')})`;
  }
  if (isObj(val, 'set')) {
    const items = (val as PySet).items;
    if (items.length === 0) return 'set()';
    return `{${items.map((v) => pyStr(v, true)).join(', ')}}`;
  }
  if (isObj(val, 'dict')) {
    const entries = (val as PyDict).entries;
    return `{${entries.map(([k, v]) => `${pyStr(k, true)}: ${pyStr(v, true)}`).join(', ')}}`;
  }
  if (isObj(val, 'path')) {
    return (val as PyPathObj).path;
  }
  if (isObj(val, 'type')) {
    return `<class '${(val as PyTypeObj).label}'>`;
  }
  if (isObj(val, 'class')) {
    return `<class '__main__.${(val as PyClass).name}'>`;
  }
  if (isObj(val, 'instance')) {
    const inst = val as PyInstance;
    return `<__main__.${inst.cls.name} object>`;
  }
  if (isObj(val, 'module')) {
    return `<module '${(val as PyModule).name}'>`;
  }
  if (isObj(val, 'date')) {
    return (val as PyDateObj).iso;
  }
  return String(val);
}

function pyTruthy(val: unknown): boolean {
  if (val === null || val === undefined || val === false) return false;
  if (typeof val === 'number') return val !== 0;
  if (typeof val === 'string') return val.length > 0;
  if (Array.isArray(val)) return val.length > 0;
  if (isObj(val, 'tuple')) return (val as PyTuple).items.length > 0;
  if (isObj(val, 'set')) return (val as PySet).items.length > 0;
  if (isObj(val, 'dict')) return (val as PyDict).entries.length > 0;
  return true;
}

function pyEquals(a: unknown, b: unknown): boolean {
  if (a === b) return true;
  if (typeof a === 'number' && typeof b === 'boolean') return a === (b ? 1 : 0);
  if (typeof a === 'boolean' && typeof b === 'number') return (a ? 1 : 0) === b;
  if (Array.isArray(a) && Array.isArray(b)) {
    return a.length === b.length && a.every((v, i) => pyEquals(v, b[i]));
  }
  if (isObj(a, 'tuple') && isObj(b, 'tuple')) {
    const ta = (a as PyTuple).items;
    const tb = (b as PyTuple).items;
    return ta.length === tb.length && ta.every((v, i) => pyEquals(v, tb[i]));
  }
  return false;
}

function toJsJson(val: unknown): unknown {
  if (val === null || val === undefined) return null;
  if (typeof val === 'boolean' || typeof val === 'number' || typeof val === 'string') return val;
  if (Array.isArray(val)) return val.map(toJsJson);
  if (isObj(val, 'tuple')) return (val as PyTuple).items.map(toJsJson);
  if (isObj(val, 'set')) return (val as PySet).items.map(toJsJson);
  if (isObj(val, 'dict')) {
    const out: Record<string, unknown> = {};
    for (const [k, v] of (val as PyDict).entries) {
      out[pyStr(k)] = toJsJson(v);
    }
    return out;
  }
  return pyStr(val);
}

function fromJsJson(val: unknown): unknown {
  if (val === null || val === undefined) return null;
  if (typeof val === 'boolean' || typeof val === 'number' || typeof val === 'string') return val;
  if (Array.isArray(val)) return val.map(fromJsJson);
  if (typeof val === 'object') {
    const entries: [unknown, unknown][] = Object.entries(val as Record<string, unknown>).map(([k, v]) => [
      k,
      fromJsJson(v),
    ]);
    return makeDict(entries);
  }
  return String(val);
}

// ---------- Indentation-based Block Parser ----------

interface RawLine {
  lineNo: number;
  indent: number;
  text: string;
}

interface AstNode {
  lineNo: number;
  text: string;
  body?: AstNode[];
  elseBody?: AstNode[];
  branches?: {kind: 'if' | 'elif' | 'else' | 'except' | 'finally'; header: string; lineNo: number; body: AstNode[]}[];
}

function stripInlineComment(line: string): string {
  let inSingle = false;
  let inDouble = false;
  let escaped = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (escaped) {
      escaped = false;
      continue;
    }
    if (ch === '\\') {
      escaped = true;
      continue;
    }
    if (ch === "'" && !inDouble) inSingle = !inSingle;
    else if (ch === '"' && !inSingle) inDouble = !inDouble;
    else if (ch === '#' && !inSingle && !inDouble) {
      return line.slice(0, i).trimEnd();
    }
  }
  return line.trimEnd();
}

function preprocessLines(code: string): RawLine[] {
  const lines = code.replace(/\r\n/g, '\n').split('\n');
  const result: RawLine[] = [];
  let i = 0;

  while (i < lines.length) {
    const raw = lines[i];
    const lineNo = i + 1;
    // Handle triple-quoted multiline strings cleanly
    const indentMatch = raw.match(/^([ \t]*)/);
    const indentStr = indentMatch ? indentMatch[1].replace(/\t/g, '    ') : '';
    const indent = indentStr.length;
    let combined = raw.trim();

    if (!combined || combined.startsWith('#')) {
      i += 1;
      continue;
    }

    // Join multiline triple-quoted strings or unclosed brackets
    const countTriple = (s: string, q: string) => (s.split(q).length - 1);
    const countBrackets = (s: string) => {
      let depth = 0;
      let s1 = false;
      let s2 = false;
      for (let k = 0; k < s.length; k++) {
        const c = s[k];
        if (c === '\\') { k++; continue; }
        if (c === "'" && !s2) s1 = !s1;
        else if (c === '"' && !s1) s2 = !s2;
        else if (!s1 && !s2) {
          if (c === '(' || c === '[' || c === '{') depth++;
          else if (c === ')' || c === ']' || c === '}') depth--;
        }
      }
      return depth;
    };

    const inTriple = (s: string) =>
      countTriple(s, '"""') % 2 === 1 || countTriple(s, "'''") % 2 === 1;

    if (!inTriple(combined)) {
      combined = stripInlineComment(combined);
    }

    while (
      i + 1 < lines.length &&
      (inTriple(combined) || countBrackets(combined) > 0)
    ) {
      i += 1;
      const nextRaw = lines[i];
      combined += '\n' + (inTriple(combined) ? nextRaw : stripInlineComment(nextRaw));
    }

    // Normalize triple quotes into escaped single-line strings
    combined = combined
      .replace(/"""([\s\S]*?)"""/g, (_m, inner: string) => JSON.stringify(inner))
      .replace(/'''([\s\S]*?)'''/g, (_m, inner: string) => JSON.stringify(inner));

    const cleaned = combined.trim();
    if (cleaned) {
      result.push({lineNo, indent, text: cleaned});
    }
    i += 1;
  }

  return result;
}

function splitCompoundHeader(text: string): {header: string; inlineBody: string} | null {
  let depth = 0;
  let inSingle = false;
  let inDouble = false;
  let escaped = false;
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (escaped) {
      escaped = false;
      continue;
    }
    if (ch === '\\') {
      escaped = true;
      continue;
    }
    if (ch === "'" && !inDouble) inSingle = !inSingle;
    else if (ch === '"' && !inSingle) inDouble = !inDouble;
    else if (!inSingle && !inDouble) {
      if (ch === '(' || ch === '[' || ch === '{') depth++;
      else if (ch === ')' || ch === ']' || ch === '}') depth--;
      else if (ch === ':' && depth === 0) {
        return {
          header: text.slice(0, i).trim(),
          inlineBody: text.slice(i + 1).trim(),
        };
      }
    }
  }
  return null;
}

function parseBlock(lines: RawLine[], startIdx: number, minIndent: number): {nodes: AstNode[]; nextIdx: number} {
  const nodes: AstNode[] = [];
  let idx = startIdx;

  while (idx < lines.length) {
    const line = lines[idx];
    if (line.indent < minIndent) break;
    if (line.indent > minIndent) {
      throw new PyException('IndentationError', 'تورفتگی غیرمنتظره (unexpected indent)', line.lineNo);
    }

    const text = line.text;

    // Compound statement headers: if / elif / else (block or single-line)
    if (text.startsWith('if ')) {
      const split = splitCompoundHeader(text);
      if (split) {
        const branches: NonNullable<AstNode['branches']> = [];
        if (split.inlineBody) {
          branches.push({
            kind: 'if',
            header: split.header.slice(3).trim(),
            lineNo: line.lineNo,
            body: [{lineNo: line.lineNo, text: split.inlineBody}],
          });
          idx += 1;
        } else {
          const firstBody = parseBlock(lines, idx + 1, getNextIndent(lines, idx, minIndent));
          branches.push({kind: 'if', header: split.header.slice(3).trim(), lineNo: line.lineNo, body: firstBody.nodes});
          idx = firstBody.nextIdx;
        }

        while (idx < lines.length && lines[idx].indent === minIndent) {
          const nextText = lines[idx].text;
          if (nextText.startsWith('elif ')) {
            const eSplit = splitCompoundHeader(nextText);
            if (!eSplit) break;
            if (eSplit.inlineBody) {
              branches.push({
                kind: 'elif',
                header: eSplit.header.slice(5).trim(),
                lineNo: lines[idx].lineNo,
                body: [{lineNo: lines[idx].lineNo, text: eSplit.inlineBody}],
              });
              idx += 1;
            } else {
              const b = parseBlock(lines, idx + 1, getNextIndent(lines, idx, minIndent));
              branches.push({kind: 'elif', header: eSplit.header.slice(5).trim(), lineNo: lines[idx].lineNo, body: b.nodes});
              idx = b.nextIdx;
            }
          } else if (nextText.startsWith('else:')) {
            const inlineElse = nextText.slice(5).trim();
            if (inlineElse) {
              branches.push({
                kind: 'else',
                header: '',
                lineNo: lines[idx].lineNo,
                body: [{lineNo: lines[idx].lineNo, text: inlineElse}],
              });
              idx += 1;
            } else {
              const b = parseBlock(lines, idx + 1, getNextIndent(lines, idx, minIndent));
              branches.push({kind: 'else', header: '', lineNo: lines[idx].lineNo, body: b.nodes});
              idx = b.nextIdx;
            }
            break;
          } else {
            break;
          }
        }
        nodes.push({lineNo: line.lineNo, text: 'if', branches});
        continue;
      }
    }

    if (text === 'try:') {
      const branches: NonNullable<AstNode['branches']> = [];
      const tryBody = parseBlock(lines, idx + 1, getNextIndent(lines, idx, minIndent));
      idx = tryBody.nextIdx;

      while (idx < lines.length && lines[idx].indent === minIndent) {
        const nextText = lines[idx].text;
        if (nextText.startsWith('except') && nextText.endsWith(':')) {
          const b = parseBlock(lines, idx + 1, getNextIndent(lines, idx, minIndent));
          branches.push({
            kind: 'except',
            header: nextText.slice('except'.length, -1).trim(),
            lineNo: lines[idx].lineNo,
            body: b.nodes,
          });
          idx = b.nextIdx;
        } else if (nextText === 'else:') {
          const b = parseBlock(lines, idx + 1, getNextIndent(lines, idx, minIndent));
          branches.push({kind: 'else', header: '', lineNo: lines[idx].lineNo, body: b.nodes});
          idx = b.nextIdx;
        } else if (nextText === 'finally:') {
          const b = parseBlock(lines, idx + 1, getNextIndent(lines, idx, minIndent));
          branches.push({kind: 'finally', header: '', lineNo: lines[idx].lineNo, body: b.nodes});
          idx = b.nextIdx;
        } else {
          break;
        }
      }
      nodes.push({lineNo: line.lineNo, text: 'try', body: tryBody.nodes, branches});
      continue;
    }

    if (
      text.startsWith('for ') ||
      text.startsWith('while ') ||
      text.startsWith('def ') ||
      text.startsWith('class ')
    ) {
      const split = splitCompoundHeader(text);
      if (split) {
        let bodyNodes: AstNode[];
        if (split.inlineBody) {
          bodyNodes = [{lineNo: line.lineNo, text: split.inlineBody}];
          idx += 1;
        } else {
          const block = parseBlock(lines, idx + 1, getNextIndent(lines, idx, minIndent));
          bodyNodes = block.nodes;
          idx = block.nextIdx;
        }

        let elseBody: AstNode[] | undefined;
        if (
          (text.startsWith('for ') || text.startsWith('while ')) &&
          idx < lines.length &&
          lines[idx].indent === minIndent &&
          lines[idx].text.startsWith('else:')
        ) {
          const inlineElse = lines[idx].text.slice(5).trim();
          if (inlineElse) {
            elseBody = [{lineNo: lines[idx].lineNo, text: inlineElse}];
            idx += 1;
          } else {
            const eb = parseBlock(lines, idx + 1, getNextIndent(lines, idx, minIndent));
            elseBody = eb.nodes;
            idx = eb.nextIdx;
          }
        }

        nodes.push({lineNo: line.lineNo, text: `${split.header}:`, body: bodyNodes, elseBody});
        continue;
      }
    }

    nodes.push({lineNo: line.lineNo, text});
    idx += 1;
  }

  return {nodes, nextIdx: idx};
}

function getNextIndent(lines: RawLine[], headerIdx: number, currentIndent: number): number {
  const next = lines[headerIdx + 1];
  if (!next || next.indent <= currentIndent) {
    throw new PyException(
      'IndentationError',
      'پس از علامت دو نقطه (:) باید خط بعدی با ۴ فاصله تورفتگی نوشته شود',
      lines[headerIdx].lineNo
    );
  }
  return next.indent;
}

// ---------- Expression Tokenizer & Recursive Descent Evaluator ----------

function splitTopLevel(expr: string, delimiter = ','): string[] {
  const parts: string[] = [];
  let current = '';
  let depth = 0;
  let inSingle = false;
  let inDouble = false;
  let escaped = false;

  for (let i = 0; i < expr.length; i++) {
    const ch = expr[i];
    if (escaped) {
      current += ch;
      escaped = false;
      continue;
    }
    if (ch === '\\') {
      current += ch;
      escaped = true;
      continue;
    }
    if (ch === "'" && !inDouble) {
      inSingle = !inSingle;
      current += ch;
      continue;
    }
    if (ch === '"' && !inSingle) {
      inDouble = !inDouble;
      current += ch;
      continue;
    }
    if (!inSingle && !inDouble) {
      if (ch === '(' || ch === '[' || ch === '{') depth++;
      else if (ch === ')' || ch === ']' || ch === '}') depth--;
      if (depth === 0 && expr.slice(i, i + delimiter.length) === delimiter) {
        parts.push(current.trim());
        current = '';
        i += delimiter.length - 1;
        continue;
      }
    }
    current += ch;
  }
  if (current.trim() !== '' || parts.length > 0) {
    parts.push(current.trim());
  }
  return parts.filter((p) => p !== '');
}

function findTopLevelOperator(expr: string, operators: string[], rightToLeft = false): {idx: number; op: string} | null {
  let depth = 0;
  let inSingle = false;
  let inDouble = false;
  let escaped = false;
  const matches: {idx: number; op: string}[] = [];

  for (let i = 0; i < expr.length; i++) {
    const ch = expr[i];
    if (escaped) {
      escaped = false;
      continue;
    }
    if (ch === '\\') {
      escaped = true;
      continue;
    }
    if (ch === "'" && !inDouble) {
      inSingle = !inSingle;
      continue;
    }
    if (ch === '"' && !inSingle) {
      inDouble = !inDouble;
      continue;
    }
    if (inSingle || inDouble) continue;
    if (ch === '(' || ch === '[' || ch === '{') {
      depth++;
      continue;
    }
    if (ch === ')' || ch === ']' || ch === '}') {
      depth--;
      continue;
    }
    if (depth !== 0) continue;

    for (const op of operators) {
      if (expr.slice(i, i + op.length) === op) {
        // Word operators require word boundaries
        if (/^[a-z]/.test(op)) {
          const prev = i > 0 ? expr[i - 1] : ' ';
          const next = i + op.length < expr.length ? expr[i + op.length] : ' ';
          if (/\w/.test(prev) || /\w/.test(next)) continue;
        }
        // Avoid matching single = inside ==, !=, <=, >=
        if (op === '=' && (expr[i - 1] === '!' || expr[i - 1] === '<' || expr[i - 1] === '>' || expr[i - 1] === '=' || expr[i + 1] === '=')) {
          continue;
        }
        // Avoid matching / inside // or * inside **
        if (op === '/' && (expr[i - 1] === '/' || expr[i + 1] === '/')) continue;
        if (op === '*' && (expr[i - 1] === '*' || expr[i + 1] === '*')) continue;
        // Avoid unary + / -
        if ((op === '+' || op === '-') && i === 0) continue;
        if (op === '+' || op === '-') {
          const before = expr.slice(0, i).trimEnd();
          const lastChar = before[before.length - 1];
          if (!before || /[+\-*/%(,[{:=<>!]/.test(lastChar) || /\b(and|or|not|in|is|return)\s*$/.test(before)) {
            continue;
          }
        }
        matches.push({idx: i, op});
        i += op.length - 1;
        break;
      }
    }
  }

  if (matches.length === 0) return null;
  return rightToLeft ? matches[0] : matches[matches.length - 1];
}

// ---------- Interpreter Class ----------

class OfflinePythonInterpreter {
  private globals: Scope = {};
  private files: Record<string, string>;
  private stdout = '';
  private steps = 0;
  private maxSteps: number;
  private options: PythonRunOptions;
  private turtleState = {x: 0, y: 0, angleDeg: 0, penDown: true, color: '#0284c7', width: 2};
  private turtleSegments: TurtleSegment[] = [];

  constructor(options: PythonRunOptions) {
    this.options = options;
    this.files = {...(options.files ?? {})};
    this.maxSteps = options.maxSteps ?? 15000;
    this.initBuiltins();
  }

  private emitStdout(text: string): void {
    this.stdout += text;
    this.options.onStdout(text);
  }

  private createPathObject(p: string): PyPathObj {
    return {__pyType: 'path', path: p.replace(/\\/g, '/')};
  }

  private async buildModule(name: string, lineNo = 1): Promise<PyModule> {
    // Support importing local .py modules stored in the Virtual File System (e.g., my_module.py)
    const localFileName = `${name}.py`;
    if (localFileName in this.files) {
      const moduleCode = this.files[localFileName];
      const modScope: Scope = Object.create(this.globals);
      const rawLines = preprocessLines(moduleCode);
      const {nodes} = parseBlock(rawLines, 0, rawLines[0]?.indent ?? 0);
      await this.execBlock(nodes, modScope);
      const exports: Record<string, unknown> = {};
      for (const key of Object.keys(modScope)) {
        exports[key] = modScope[key];
      }
      return {
        __pyType: 'module',
        name,
        exports,
      };
    }

    if (name === 'math') {
      return {
        __pyType: 'module',
        name: 'math',
        exports: {
          pi: Math.PI,
          e: Math.E,
          sqrt: (args: unknown[]) => Math.sqrt(Number(args[0])),
          ceil: (args: unknown[]) => Math.ceil(Number(args[0])),
          floor: (args: unknown[]) => Math.floor(Number(args[0])),
          pow: (args: unknown[]) => Math.pow(Number(args[0]), Number(args[1])),
          fabs: (args: unknown[]) => Math.abs(Number(args[0])),
          factorial: (args: unknown[]) => {
            const n = Math.trunc(Number(args[0]));
            if (n < 0) throw new PyException('ValueError', 'factorial() not defined for negative values');
            let r = 1;
            for (let k = 2; k <= n; k++) r *= k;
            return r;
          },
          sin: (args: unknown[]) => Math.sin(Number(args[0])),
          cos: (args: unknown[]) => Math.cos(Number(args[0])),
          radians: (args: unknown[]) => (Number(args[0]) * Math.PI) / 180,
        },
      };
    }

    if (name === 'random') {
      return {
        __pyType: 'module',
        name: 'random',
        exports: {
          choice: (args: unknown[]) => {
            const seq = this.toIterable(args[0]);
            if (seq.length === 0) throw new PyException('IndexError', 'Cannot choose from an empty sequence');
            return seq[Math.floor(Math.random() * seq.length)];
          },
          choices: (args: unknown[], kwargs: Record<string, unknown>) => {
            const seq = this.toIterable(args[0]);
            if (seq.length === 0) throw new PyException('IndexError', 'Cannot choose from an empty sequence');
            const weightsRaw = kwargs.weights ? this.toIterable(kwargs.weights).map(Number) : seq.map(() => 1);
            const k = kwargs.k !== undefined ? Math.max(1, Math.trunc(Number(kwargs.k))) : 1;
            const totalW = weightsRaw.reduce((a, b) => a + Math.max(0, b), 0) || seq.length;
            const out: unknown[] = [];
            for (let c = 0; c < k; c++) {
              let r = Math.random() * totalW;
              let picked = seq[seq.length - 1];
              for (let i = 0; i < seq.length; i++) {
                r -= Math.max(0, weightsRaw[i] ?? 1);
                if (r <= 0) {
                  picked = seq[i];
                  break;
                }
              }
              out.push(picked);
            }
            return out;
          },
          randint: (args: unknown[]) => {
            const a = Math.trunc(Number(args[0]));
            const b = Math.trunc(Number(args[1]));
            return Math.floor(Math.random() * (b - a + 1)) + a;
          },
          random: () => Math.random(),
          shuffle: (args: unknown[]) => {
            if (Array.isArray(args[0])) {
              const arr = args[0];
              for (let i = arr.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [arr[i], arr[j]] = [arr[j], arr[i]];
              }
            }
            return null;
          },
        },
      };
    }

    if (name === 'json') {
      return {
        __pyType: 'module',
        name: 'json',
        exports: {
          dumps: (args: unknown[], kwargs: Record<string, unknown>) => {
            const indent = kwargs.indent !== undefined ? Number(kwargs.indent) : undefined;
            return JSON.stringify(toJsJson(args[0]), null, indent);
          },
          loads: (args: unknown[]) => {
            try {
              return fromJsJson(JSON.parse(String(args[0])));
            } catch (e) {
              throw new PyException('JSONDecodeError', e instanceof Error ? e.message : 'Invalid JSON');
            }
          },
        },
      };
    }

    if (name === 'pathlib') {
      return {
        __pyType: 'module',
        name: 'pathlib',
        exports: {
          Path: (args: unknown[]) => this.createPathObject(args.map((a) => pyStr(a)).join('/')),
        },
      };
    }

    if (name === 'datetime') {
      const now = new Date();
      const makeDate = (withTime: boolean): PyDateObj => ({
        __pyType: 'date',
        iso: withTime ? now.toISOString().replace('T', ' ').slice(0, 19) : now.toISOString().slice(0, 10),
        year: now.getFullYear(),
        month: now.getMonth() + 1,
        day: now.getDate(),
        hour: withTime ? now.getHours() : 0,
        minute: withTime ? now.getMinutes() : 0,
        second: withTime ? now.getSeconds() : 0,
      });
      return {
        __pyType: 'module',
        name: 'datetime',
        exports: {
          date: {
            today: () => makeDate(false),
          },
          datetime: {
            now: () => makeDate(true),
          },
        },
      };
    }

    if (name === 'turtle') {
      const move = (dist: number) => {
        const rad = (this.turtleState.angleDeg * Math.PI) / 180;
        const nx = this.turtleState.x + Math.cos(rad) * dist;
        const ny = this.turtleState.y + Math.sin(rad) * dist;
        if (this.turtleState.penDown) {
          const seg: TurtleSegment = {
            x1: this.turtleState.x,
            y1: this.turtleState.y,
            x2: nx,
            y2: ny,
            color: this.turtleState.color,
            width: this.turtleState.width,
          };
          this.turtleSegments.push(seg);
          this.options.onTurtleSegment?.(seg);
        }
        this.turtleState.x = nx;
        this.turtleState.y = ny;
        return null;
      };
      const turtleApi: Record<string, unknown> = {
        forward: (a: unknown[]) => move(Number(a[0] ?? 50)),
        fd: (a: unknown[]) => move(Number(a[0] ?? 50)),
        backward: (a: unknown[]) => move(-Number(a[0] ?? 50)),
        bk: (a: unknown[]) => move(-Number(a[0] ?? 50)),
        right: (a: unknown[]) => { this.turtleState.angleDeg += Number(a[0] ?? 90); return null; },
        rt: (a: unknown[]) => { this.turtleState.angleDeg += Number(a[0] ?? 90); return null; },
        left: (a: unknown[]) => { this.turtleState.angleDeg -= Number(a[0] ?? 90); return null; },
        lt: (a: unknown[]) => { this.turtleState.angleDeg -= Number(a[0] ?? 90); return null; },
        color: (a: unknown[]) => { this.turtleState.color = String(a[0] ?? '#0284c7'); return null; },
        pensize: (a: unknown[]) => { this.turtleState.width = Number(a[0] ?? 2); return null; },
        penup: () => { this.turtleState.penDown = false; return null; },
        pendown: () => { this.turtleState.penDown = true; return null; },
        speed: () => null,
        circle: (a: unknown[]) => {
          const r = Number(a[0] ?? 40);
          const steps = 24;
          const stepLen = (2 * Math.PI * Math.abs(r)) / steps;
          const turn = (r >= 0 ? -360 : 360) / steps;
          for (let s = 0; s < steps; s++) {
            move(stepLen);
            this.turtleState.angleDeg += turn;
          }
          return null;
        },
        done: () => null,
      };
      return {
        __pyType: 'module',
        name: 'turtle',
        exports: {
          ...turtleApi,
          Turtle: () => ({__pyType: 'module', name: 'Turtle', exports: turtleApi} satisfies PyModule),
        },
      };
    }

    if (name === 'os') {
      return {
        __pyType: 'module',
        name: 'os',
        exports: {
          name: 'posix',
          getcwd: () => '/classroom/python-lab',
          listdir: () => Object.keys(this.files),
        },
      };
    }

    throw new PyException('ModuleNotFoundError', `ماژول '${name}' یافت نشد (اگر ماژول محلی است فایل ${name}.py را بررسی کنید)`, lineNo);
  }

  private initBuiltins(): void {
    this.globals = {
      True: true,
      False: false,
      None: null,
      print: (args: unknown[], kwargs: Record<string, unknown>) => {
        const sep = kwargs.sep !== undefined ? pyStr(kwargs.sep) : ' ';
        const end = kwargs.end !== undefined ? pyStr(kwargs.end) : '\n';
        this.emitStdout(args.map((a) => pyStr(a)).join(sep) + end);
        return null;
      },
      input: async (args: unknown[]) => {
        const prompt = args.length > 0 ? pyStr(args[0]) : '';
        if (prompt) this.emitStdout(prompt);
        const answer = await this.options.onRequestInput(prompt);
        this.emitStdout(answer + '\n');
        return answer;
      },
      len: (args: unknown[]) => {
        const x = args[0];
        if (typeof x === 'string' || Array.isArray(x)) return x.length;
        if (isObj(x, 'tuple')) return (x as PyTuple).items.length;
        if (isObj(x, 'set')) return (x as PySet).items.length;
        if (isObj(x, 'dict')) return (x as PyDict).entries.length;
        throw new PyException('TypeError', `object of type '${pyTypeName(x)}' has no len()`);
      },
      type: (args: unknown[]): PyTypeObj => {
        const target = args[0];
        const builtinCtors = [
          this.globals.int,
          this.globals.float,
          this.globals.str,
          this.globals.bool,
          this.globals.list,
          this.globals.tuple,
          this.globals.set,
          this.globals.dict,
          this.globals.type,
          this.globals.object,
        ];
        if (builtinCtors.includes(target)) {
          return {__pyType: 'type', label: 'type'};
        }
        return {
          __pyType: 'type',
          label: pyTypeName(target),
        };
      },
      object: {__pyType: 'type', label: 'object'} satisfies PyTypeObj,
      isinstance: (args: unknown[]): boolean => {
        const obj = args[0];
        const check = (cls: unknown): boolean => {
          if (isObj(cls, 'tuple')) {
            return (cls as PyTuple).items.some((item) => check(item));
          }
          if (cls === this.globals.object) return true;
          if (cls === this.globals.type) {
            return (
              isObj(obj, 'class') ||
              isObj(obj, 'type') ||
              [
                this.globals.int,
                this.globals.float,
                this.globals.str,
                this.globals.bool,
                this.globals.list,
                this.globals.tuple,
                this.globals.set,
                this.globals.dict,
                this.globals.type,
                this.globals.object,
              ].includes(obj)
            );
          }
          if (isObj(cls, 'class')) {
            if (!isObj(obj, 'instance')) return false;
            let cur: PyClass | undefined = (obj as PyInstance).cls;
            while (cur) {
              if (cur === cls) return true;
              cur = cur.base;
            }
            return false;
          }
          const tName = pyTypeName(obj);
          if (cls === this.globals.int) return tName === 'int' || tName === 'bool';
          if (cls === this.globals.float) return tName === 'float';
          if (cls === this.globals.str) return tName === 'str';
          if (cls === this.globals.bool) return tName === 'bool';
          if (cls === this.globals.list) return tName === 'list';
          if (cls === this.globals.tuple) return tName === 'tuple';
          if (cls === this.globals.set) return tName === 'set';
          if (cls === this.globals.dict) return tName === 'dict';
          return false;
        };
        return check(args[1]);
      },
      int: (args: unknown[]) => {
        if (args.length === 0) return 0;
        const raw = args[0];
        if (typeof raw === 'boolean') return raw ? 1 : 0;
        if (typeof raw === 'number') return Math.trunc(raw);
        const n = Number(String(raw).trim());
        if (String(raw).trim() === '' || Number.isNaN(n) || !Number.isInteger(n)) {
          throw new PyException('ValueError', `مقدار '${pyStr(raw)}' قابل تبدیل به عدد صحیح (int) نیست`);
        }
        return n;
      },
      float: (args: unknown[]) => {
        if (args.length === 0) return 0.0;
        const n = Number(String(args[0]).trim());
        if (String(args[0]).trim() === '' || Number.isNaN(n)) {
          throw new PyException('ValueError', `مقدار '${pyStr(args[0])}' قابل تبدیل به عدد اعشاری (float) نیست`);
        }
        return n;
      },
      str: (args: unknown[]) => (args.length === 0 ? '' : pyStr(args[0])),
      bool: (args: unknown[]) => (args.length === 0 ? false : pyTruthy(args[0])),
      list: (args: unknown[]) => (args.length === 0 ? [] : [...this.toIterable(args[0])]),
      tuple: (args: unknown[]) => makeTuple(args.length === 0 ? [] : [...this.toIterable(args[0])]),
      set: (args: unknown[]) => makeSet(args.length === 0 ? [] : [...this.toIterable(args[0])]),
      dict: () => makeDict([]),
      abs: (args: unknown[]) => Math.abs(Number(args[0])),
      round: (args: unknown[]) => {
        const val = Number(args[0]);
        const digits = args.length > 1 ? Math.trunc(Number(args[1])) : 0;
        const factor = Math.pow(10, digits);
        return Math.round(val * factor) / factor;
      },
      pow: (args: unknown[]) => Math.pow(Number(args[0]), Number(args[1])),
      max: (args: unknown[]) => {
        const items = args.length === 1 && Array.isArray(args[0]) ? args[0] : args;
        return Math.max(...items.map(Number));
      },
      min: (args: unknown[]) => {
        const items = args.length === 1 && Array.isArray(args[0]) ? args[0] : args;
        return Math.min(...items.map(Number));
      },
      sum: (args: unknown[]) => this.toIterable(args[0]).reduce<number>((acc, cur) => acc + Number(cur), 0),
      divmod: (args: unknown[]) => {
        const a = Number(args[0]);
        const b = Number(args[1]);
        if (b === 0) throw new PyException('ZeroDivisionError', 'تقسیم بر صفر مجاز نیست');
        return makeTuple([Math.floor(a / b), ((a % b) + b) % b]);
      },
      sorted: (args: unknown[], kwargs: Record<string, unknown>) => {
        const arr = [...this.toIterable(args[0])];
        arr.sort((a, b) => {
          if (typeof a === 'number' && typeof b === 'number') return a - b;
          return pyStr(a).localeCompare(pyStr(b));
        });
        if (pyTruthy(kwargs.reverse)) arr.reverse();
        return arr;
      },
      range: (args: unknown[]) => {
        let start = 0;
        let stop = 0;
        let step = 1;
        if (args.length === 1) stop = Math.trunc(Number(args[0]));
        else if (args.length === 2) {
          start = Math.trunc(Number(args[0]));
          stop = Math.trunc(Number(args[1]));
        } else if (args.length >= 3) {
          start = Math.trunc(Number(args[0]));
          stop = Math.trunc(Number(args[1]));
          step = Math.trunc(Number(args[2]));
        }
        if (step === 0) throw new PyException('ValueError', 'range() arg 3 must not be zero');
        const out: number[] = [];
        if (step > 0) {
          for (let v = start; v < stop; v += step) out.push(v);
        } else {
          for (let v = start; v > stop; v += step) out.push(v);
        }
        return out;
      },
      enumerate: (args: unknown[]) => {
        const start = args.length > 1 ? Math.trunc(Number(args[1])) : 0;
        return this.toIterable(args[0]).map((item, i) => makeTuple([start + i, item]));
      },
    };
  }

  private toIterable(val: unknown): unknown[] {
    if (Array.isArray(val)) return val;
    if (typeof val === 'string') return Array.from(val);
    if (isObj(val, 'tuple')) return (val as PyTuple).items;
    if (isObj(val, 'set')) return (val as PySet).items;
    if (isObj(val, 'dict')) return (val as PyDict).entries.map(([k]) => k);
    throw new PyException('TypeError', `'${pyTypeName(val)}' object is not iterable`);
  }

  private snapshotVariables(scope: Scope): VariableSnapshot[] {
    const builtinNames = new Set([
      'True', 'False', 'None', 'print', 'input', 'len', 'type', 'isinstance', 'object', 'int', 'float', 'str', 'bool',
      'list', 'tuple', 'set', 'dict', 'abs', 'round', 'pow', 'max', 'min', 'sum', 'divmod',
      'sorted', 'range', 'enumerate',
    ]);
    const list: VariableSnapshot[] = [];
    for (const [name, val] of Object.entries(scope)) {
      if (builtinNames.has(name) || name.startsWith('__')) continue;
      list.push({
        name,
        typeName: pyTypeName(val),
        preview: pyStr(val, typeof val === 'string'),
      });
    }
    return list;
  }

  private async checkControl(lineNo: number, scope: Scope): Promise<void> {
    if (this.options.signal?.aborted) {
      throw new PyException('KeyboardInterrupt', 'اجرای برنامه توسط کاربر متوقف شد', lineNo);
    }
    this.steps += 1;
    if (this.steps > this.maxSteps) {
      throw new PyException(
        'RuntimeError',
        'حداکثر تعداد گام‌های مجاز به پایان رسید (احتمال حلقه بی‌نهایت while)',
        lineNo
      );
    }
    if (this.options.stepMode && this.options.onStep) {
      await this.options.onStep(lineNo, this.snapshotVariables(scope));
    }
  }

  async run(code: string): Promise<PythonRunResult> {
    const rawLines = preprocessLines(code);
    const {nodes} = parseBlock(rawLines, 0, rawLines[0]?.indent ?? 0);
    await this.execBlock(nodes, this.globals);
    return {
      engineUsed: 'builtin-offline-python',
      stdout: this.stdout,
      files: {...this.files},
      variables: this.snapshotVariables(this.globals),
      turtleSegments: [...this.turtleSegments],
    };
  }

  private async execBlock(nodes: AstNode[], scope: Scope, currentClass?: PyClass): Promise<void> {
    for (const node of nodes) {
      await this.execNode(node, scope, currentClass);
    }
  }

  private async execNode(node: AstNode, scope: Scope, currentClass?: PyClass): Promise<void> {
    const text = node.text;
    await this.checkControl(node.lineNo, scope);

    if (text === 'pass') return;
    if (text === 'break') throw new BreakSignal();
    if (text === 'continue') throw new ContinueSignal();

    if (text === 'return' || text.startsWith('return ')) {
      const expr = text.slice(6).trim();
      const val = expr ? await this.evalExpr(expr, scope, node.lineNo, currentClass) : null;
      throw new ReturnSignal(val);
    }

    if (text.startsWith('raise ')) {
      const msg = text.slice(6).trim();
      throw new PyException('Exception', msg, node.lineNo);
    }

    if (text.startsWith('del ')) {
      await this.execDelete(text.slice(4).trim(), scope, node.lineNo, currentClass);
      return;
    }

    // import ... / from ... import ...
    if (text.startsWith('import ')) {
      const rest = text.slice(7).trim();
      for (const part of splitTopLevel(rest, ',')) {
        const asMatch = part.match(/^(\w+)\s+as\s+(\w+)$/);
        if (asMatch) {
          scope[asMatch[2]] = await this.buildModule(asMatch[1], node.lineNo);
        } else {
          scope[part.trim()] = await this.buildModule(part.trim(), node.lineNo);
        }
      }
      return;
    }
    if (text.startsWith('from ')) {
      const m = text.match(/^from\s+(\w+)\s+import\s+(.+)$/);
      if (!m) throw new PyException('SyntaxError', `دستور import نامعتبر: ${text}`, node.lineNo);
      const mod = await this.buildModule(m[1], node.lineNo);
      for (const item of splitTopLevel(m[2], ',')) {
        const asMatch = item.match(/^(\w+)\s+as\s+(\w+)$/);
        const origName = asMatch ? asMatch[1] : item.trim();
        const alias = asMatch ? asMatch[2] : origName;
        if (!(origName in mod.exports)) {
          throw new PyException('ImportError', `نام '${origName}' در ماژول '${m[1]}' یافت نشد`, node.lineNo);
        }
        scope[alias] = mod.exports[origName];
      }
      return;
    }

    // if / elif / else
    if (text === 'if' && node.branches) {
      for (const branch of node.branches) {
        if (branch.kind === 'else') {
          await this.execBlock(branch.body, scope, currentClass);
          break;
        }
        const cond = await this.evalExpr(branch.header, scope, branch.lineNo, currentClass);
        if (pyTruthy(cond)) {
          await this.execBlock(branch.body, scope, currentClass);
          break;
        }
      }
      return;
    }

    // try / except / else / finally
    if (text === 'try' && node.body && node.branches) {
      const exceptBranches = node.branches.filter((b) => b.kind === 'except');
      const elseBranch = node.branches.find((b) => b.kind === 'else');
      const finallyBranch = node.branches.find((b) => b.kind === 'finally');

      let hadError = false;
      try {
        await this.execBlock(node.body, scope, currentClass);
      } catch (err) {
        if (err instanceof BreakSignal || err instanceof ContinueSignal || err instanceof ReturnSignal) {
          if (finallyBranch) await this.execBlock(finallyBranch.body, scope, currentClass);
          throw err;
        }
        hadError = true;
        const pyErr = err instanceof PyException ? err : new PyException('Exception', String(err), node.lineNo);
        let handled = false;
        for (const eb of exceptBranches) {
          const h = eb.header.trim();
          const asMatch = h.match(/^(.+?)\s+as\s+([A-Za-z_]\w*)$/);
          const expectedRaw = (asMatch ? asMatch[1] : h).trim();
          const alias = asMatch ? asMatch[2] : undefined;
          let matched = false;
          if (!expectedRaw || expectedRaw === 'Exception') {
            matched = true;
          } else if (expectedRaw.startsWith('(') && expectedRaw.endsWith(')')) {
            const types = expectedRaw.slice(1, -1).split(',').map((t) => t.trim());
            matched = types.includes('Exception') || types.includes(pyErr.pyType);
          } else {
            matched = expectedRaw === pyErr.pyType;
          }
          if (matched) {
            if (alias) scope[alias] = pyErr.message;
            await this.execBlock(eb.body, scope, currentClass);
            handled = true;
            break;
          }
        }
        if (!handled) {
          if (finallyBranch) await this.execBlock(finallyBranch.body, scope, currentClass);
          throw pyErr;
        }
      }
      if (!hadError && elseBranch) {
        await this.execBlock(elseBranch.body, scope, currentClass);
      }
      if (finallyBranch) {
        await this.execBlock(finallyBranch.body, scope, currentClass);
      }
      return;
    }

    // for target in iterable: (with optional else:)
    if (text.startsWith('for ') && node.body) {
      const m = text.match(/^for\s+(.+?)\s+in\s+(.+):$/);
      if (!m) throw new PyException('SyntaxError', `ساختار حلقه for نادرست است: ${text}`, node.lineNo);
      const targetStr = m[1].trim();
      const iterVal = await this.evalExpr(m[2].trim(), scope, node.lineNo, currentClass);
      const items = this.toIterable(iterVal);
      let broke = false;
      for (const item of items) {
        this.assignTargetSync(targetStr, item, scope);
        try {
          await this.execBlock(node.body, scope, currentClass);
        } catch (sig) {
          if (sig instanceof BreakSignal) {
            broke = true;
            break;
          }
          if (sig instanceof ContinueSignal) continue;
          throw sig;
        }
      }
      if (!broke && node.elseBody) {
        await this.execBlock(node.elseBody, scope, currentClass);
      }
      return;
    }

    // while cond: (with optional else:)
    if (text.startsWith('while ') && node.body) {
      const condExpr = text.slice(6, -1).trim();
      let broke = false;
      while (pyTruthy(await this.evalExpr(condExpr, scope, node.lineNo, currentClass))) {
        await this.checkControl(node.lineNo, scope);
        try {
          await this.execBlock(node.body, scope, currentClass);
        } catch (sig) {
          if (sig instanceof BreakSignal) {
            broke = true;
            break;
          }
          if (sig instanceof ContinueSignal) continue;
          throw sig;
        }
      }
      if (!broke && node.elseBody) {
        await this.execBlock(node.elseBody, scope, currentClass);
      }
      return;
    }

    // def name(params):
    if (text.startsWith('def ') && node.body) {
      const m = text.match(/^def\s+([A-Za-z_]\w*)\s*\((.*)\)\s*:$/);
      if (!m) throw new PyException('SyntaxError', `تعریف تابع نامعتبر است: ${text}`, node.lineNo);
      const fnName = m[1];
      const rawParams = m[2].trim() ? splitTopLevel(m[2], ',') : [];
      const params = rawParams.map((p) => {
        const eq = findTopLevelOperator(p, ['=']);
        if (eq) {
          return {name: p.slice(0, eq.idx).trim(), defaultExpr: p.slice(eq.idx + 1).trim()};
        }
        return {name: p.trim()};
      });
      scope[fnName] = {
        __pyType: 'func',
        name: fnName,
        params,
        body: node.body,
        closure: scope,
      } satisfies PyFunc;
      return;
    }

    // class Name(Base):
    if (text.startsWith('class ') && node.body) {
      const m = text.match(/^class\s+([A-Za-z_]\w*)(?:\s*\(([^)]*)\))?\s*:$/);
      if (!m) throw new PyException('SyntaxError', `تعریف کلاس نامعتبر است: ${text}`, node.lineNo);
      const clsName = m[1];
      const baseName = m[2]?.trim();
      let baseCls: PyClass | undefined;
      if (baseName && baseName !== 'object') {
        const found = this.lookup(baseName, scope, node.lineNo);
        if (!isObj(found, 'class')) {
          throw new PyException('TypeError', `'${baseName}' یک کلاس معتبر برای وراثت نیست`, node.lineNo);
        }
        baseCls = found as PyClass;
      }

      const clsScope: Scope = Object.create(scope);
      const pyClass: PyClass = {
        __pyType: 'class',
        name: clsName,
        base: baseCls,
        methods: {},
        classAttrs: {},
      };

      await this.execBlock(node.body, clsScope, pyClass);
      for (const [k, v] of Object.entries(clsScope)) {
        if (isObj(v, 'func')) pyClass.methods[k] = v as PyFunc;
        else pyClass.classAttrs[k] = v;
      }
      scope[clsName] = pyClass;
      return;
    }

    // Augmented assignment (+=, -=, *=, /=, //=, %=, **=)
    const augOp = findTopLevelOperator(text, ['//=', '**=', '+=', '-=', '*=', '/=', '%='], true);
    if (augOp) {
      const lhs = text.slice(0, augOp.idx).trim();
      const rhsExpr = text.slice(augOp.idx + augOp.op.length).trim();
      const currentVal = await this.evalExpr(lhs, scope, node.lineNo, currentClass);
      const rhsVal = await this.evalExpr(rhsExpr, scope, node.lineNo, currentClass);
      const baseOp = augOp.op.slice(0, -1);
      const nextVal = this.applyBinaryOp(baseOp, currentVal, rhsVal, node.lineNo);
      await this.assignTarget(lhs, nextVal, scope, node.lineNo, currentClass);
      return;
    }

    // Simple assignment (=)
    const eqOp = findTopLevelOperator(text, ['='], true);
    if (eqOp) {
      const lhs = text.slice(0, eqOp.idx).trim();
      const rhsExpr = text.slice(eqOp.idx + 1).trim();
      const rhsVal = await this.evalExpr(rhsExpr, scope, node.lineNo, currentClass);
      await this.assignTarget(lhs, rhsVal, scope, node.lineNo, currentClass);
      return;
    }

    // Bare expression statement
    await this.evalExpr(text, scope, node.lineNo, currentClass);
  }

  private assignTargetSync(lhs: string, value: unknown, scope: Scope): void {
    const trimmed = lhs.trim();
    if (
      (trimmed.startsWith('(') && trimmed.endsWith(')') && this.findMatchingOpen(trimmed, trimmed.length - 1, '(', ')') === 0) ||
      (trimmed.startsWith('[') && trimmed.endsWith(']') && this.findMatchingOpen(trimmed, trimmed.length - 1, '[', ']') === 0)
    ) {
      this.assignTargetSync(trimmed.slice(1, -1), value, scope);
      return;
    }
    const targets = splitTopLevel(trimmed, ',');
    if (targets.length > 1) {
      const items = this.toIterable(value);
      targets.forEach((t, idx) => {
        this.assignTargetSync(t, items[idx], scope);
      });
      return;
    }
    scope[trimmed] = value;
  }

  private mangleAttr(attr: string, currentClass?: PyClass): string {
    if (currentClass && attr.startsWith('__') && !attr.endsWith('__')) {
      return `_${currentClass.name}${attr}`;
    }
    return attr;
  }

  private async assignTarget(
    lhs: string,
    value: unknown,
    scope: Scope,
    lineNo: number,
    currentClass?: PyClass
  ): Promise<void> {
    // Subscript assignment: obj[idx] = value
    if (lhs.endsWith(']')) {
      const openIdx = this.findMatchingOpen(lhs, lhs.length - 1, '[', ']');
      if (openIdx > 0) {
        const targetObj = await this.evalExpr(lhs.slice(0, openIdx).trim(), scope, lineNo, currentClass);
        const keyVal = await this.evalExpr(lhs.slice(openIdx + 1, -1).trim(), scope, lineNo, currentClass);
        if (Array.isArray(targetObj)) {
          let i = Math.trunc(Number(keyVal));
          if (i < 0) i += targetObj.length;
          if (i < 0 || i >= targetObj.length) throw new PyException('IndexError', 'list assignment index out of range', lineNo);
          targetObj[i] = value;
          return;
        }
        if (isObj(targetObj, 'dict')) {
          const dict = targetObj as PyDict;
          const idx = dict.entries.findIndex(([k]) => pyEquals(k, keyVal));
          if (idx >= 0) dict.entries[idx] = [keyVal, value];
          else dict.entries.push([keyVal, value]);
          return;
        }
        if (isObj(targetObj, 'tuple')) {
          throw new PyException('TypeError', "'tuple' object does not support item assignment", lineNo);
        }
      }
    }

    // Attribute assignment: obj.attr = value
    const lastDot = this.findLastTopLevelDot(lhs);
    if (lastDot > 0) {
      const obj = await this.evalExpr(lhs.slice(0, lastDot).trim(), scope, lineNo, currentClass);
      const rawAttr = lhs.slice(lastDot + 1).trim();
      const attr = this.mangleAttr(rawAttr, currentClass);
      if (isObj(obj, 'instance')) {
        (obj as PyInstance).attrs[attr] = value;
        return;
      }
      if (isObj(obj, 'class')) {
        (obj as PyClass).classAttrs[attr] = value;
        return;
      }
    }

    this.assignTargetSync(lhs, value, scope);
  }

  private async execDelete(target: string, scope: Scope, lineNo: number, currentClass?: PyClass): Promise<void> {
    if (target.endsWith(']')) {
      const openIdx = this.findMatchingOpen(target, target.length - 1, '[', ']');
      if (openIdx > 0) {
        const obj = await this.evalExpr(target.slice(0, openIdx).trim(), scope, lineNo, currentClass);
        const key = await this.evalExpr(target.slice(openIdx + 1, -1).trim(), scope, lineNo, currentClass);
        if (isObj(obj, 'dict')) {
          const dict = obj as PyDict;
          const idx = dict.entries.findIndex(([k]) => pyEquals(k, key));
          if (idx < 0) throw new PyException('KeyError', pyStr(key, true), lineNo);
          dict.entries.splice(idx, 1);
          return;
        }
        if (Array.isArray(obj)) {
          let i = Math.trunc(Number(key));
          if (i < 0) i += obj.length;
          obj.splice(i, 1);
          return;
        }
      }
    }
    delete scope[target];
  }

  private findMatchingOpen(str: string, closeIdx: number, openCh: string, closeCh: string): number {
    let depth = 0;
    let s1 = false;
    let s2 = false;
    for (let i = closeIdx; i >= 0; i--) {
      const c = str[i];
      if (c === "'" && !s2) s1 = !s1;
      else if (c === '"' && !s1) s2 = !s2;
      else if (!s1 && !s2) {
        if (c === closeCh) depth++;
        else if (c === openCh) {
          depth--;
          if (depth === 0) return i;
        }
      }
    }
    return -1;
  }

  private findLastTopLevelDot(str: string): number {
    let depth = 0;
    let s1 = false;
    let s2 = false;
    for (let i = str.length - 1; i >= 0; i--) {
      const c = str[i];
      if (c === "'" && !s2) s1 = !s1;
      else if (c === '"' && !s1) s2 = !s2;
      else if (!s1 && !s2) {
        if (c === ')' || c === ']' || c === '}') depth++;
        else if (c === '(' || c === '[' || c === '{') depth--;
        else if (c === '.' && depth === 0) {
          // Ignore decimal numbers like 3.14
          const left = str.slice(0, i).trim();
          const right = str.slice(i + 1).trim();
          if (/^\d+$/.test(left) && /^\d+$/.test(right)) continue;
          return i;
        }
      }
    }
    return -1;
  }

  private lookup(name: string, scope: Scope, lineNo: number): unknown {
    if (name in scope) return scope[name];
    if (name in this.globals) return this.globals[name];
    throw new PyException('NameError', `متغیر یا نام '${name}' تعریف نشده است`, lineNo);
  }

  private async evalExpr(
    rawExpr: string,
    scope: Scope,
    lineNo: number,
    currentClass?: PyClass
  ): Promise<unknown> {
    const expr = rawExpr.trim();
    if (!expr) return null;

    // -2. Lambda expression: lambda params: body_expr
    if (expr.startsWith('lambda:') || expr.startsWith('lambda ')) {
      const split = splitCompoundHeader(expr);
      if (split) {
        const paramPart = split.header.slice('lambda'.length).trim();
        const rawParams = paramPart ? splitTopLevel(paramPart, ',') : [];
        const params = rawParams.map((p) => {
          const eq = findTopLevelOperator(p, ['=']);
          if (eq) {
            return {name: p.slice(0, eq.idx).trim(), defaultExpr: p.slice(eq.idx + 1).trim()};
          }
          return {name: p.trim()};
        });
        return {
          __pyType: 'func',
          name: '<lambda>',
          params,
          body: [{lineNo, text: `return ${split.inlineBody}`}],
          closure: scope,
        } satisfies PyFunc;
      }
    }

    // -1. Unparenthesized tuple expression: a, b, c
    const topComma = splitTopLevel(expr, ',');
    if (topComma.length > 1) {
      const vals: unknown[] = [];
      for (const part of topComma) {
        vals.push(await this.evalExpr(part, scope, lineNo, currentClass));
      }
      return makeTuple(vals);
    }

    // 0. Conditional expression (ternary): true_expr if cond else false_expr
    const ifOp = findTopLevelOperator(expr, ['if'], true);
    if (ifOp) {
      const afterIf = expr.slice(ifOp.idx + 2);
      const elseOp = findTopLevelOperator(afterIf, ['else'], true);
      if (elseOp) {
        const condExpr = afterIf.slice(0, elseOp.idx).trim();
        const trueExpr = expr.slice(0, ifOp.idx).trim();
        const falseExpr = afterIf.slice(elseOp.idx + 4).trim();
        const condVal = await this.evalExpr(condExpr, scope, lineNo, currentClass);
        return pyTruthy(condVal)
          ? this.evalExpr(trueExpr, scope, lineNo, currentClass)
          : this.evalExpr(falseExpr, scope, lineNo, currentClass);
      }
    }

    // 1. Boolean OR
    const orOp = findTopLevelOperator(expr, ['or']);
    if (orOp) {
      const left = await this.evalExpr(expr.slice(0, orOp.idx), scope, lineNo, currentClass);
      return pyTruthy(left) ? left : this.evalExpr(expr.slice(orOp.idx + 2), scope, lineNo, currentClass);
    }

    // 2. Boolean AND
    const andOp = findTopLevelOperator(expr, ['and']);
    if (andOp) {
      const left = await this.evalExpr(expr.slice(0, andOp.idx), scope, lineNo, currentClass);
      return !pyTruthy(left) ? left : this.evalExpr(expr.slice(andOp.idx + 3), scope, lineNo, currentClass);
    }

    // 3. Unary NOT
    if (expr.startsWith('not ') && !findTopLevelOperator(expr, ['==', '!=', '<=', '>=', '<', '>'])) {
      return !pyTruthy(await this.evalExpr(expr.slice(4), scope, lineNo, currentClass));
    }

    // 4. Comparisons
    const cmpOp = findTopLevelOperator(expr, ['not in', 'is not', '==', '!=', '<=', '>=', '<', '>', 'in', 'is']);
    if (cmpOp) {
      const l = await this.evalExpr(expr.slice(0, cmpOp.idx), scope, lineNo, currentClass);
      const r = await this.evalExpr(expr.slice(cmpOp.idx + cmpOp.op.length), scope, lineNo, currentClass);
      switch (cmpOp.op) {
        case '==': return pyEquals(l, r);
        case '!=': return !pyEquals(l, r);
        case '<': return (l as number | string) < (r as number | string);
        case '<=': return (l as number | string) <= (r as number | string);
        case '>': return (l as number | string) > (r as number | string);
        case '>=': return (l as number | string) >= (r as number | string);
        case 'is': return l === r;
        case 'is not': return l !== r;
        case 'in': return this.checkIn(l, r);
        case 'not in': return !this.checkIn(l, r);
      }
    }

    // 5. Addition / Subtraction
    const addOp = findTopLevelOperator(expr, ['+', '-']);
    if (addOp) {
      const l = await this.evalExpr(expr.slice(0, addOp.idx), scope, lineNo, currentClass);
      const r = await this.evalExpr(expr.slice(addOp.idx + 1), scope, lineNo, currentClass);
      return this.applyBinaryOp(addOp.op, l, r, lineNo);
    }

    // 6. Multiplication / Division / Floor / Modulo
    const mulOp = findTopLevelOperator(expr, ['//', '*', '/', '%']);
    if (mulOp) {
      const l = await this.evalExpr(expr.slice(0, mulOp.idx), scope, lineNo, currentClass);
      const r = await this.evalExpr(expr.slice(mulOp.idx + mulOp.op.length), scope, lineNo, currentClass);
      return this.applyBinaryOp(mulOp.op, l, r, lineNo);
    }

    // 7. Unary + / -
    if (expr.startsWith('-') && !expr.startsWith('--')) {
      return -Number(await this.evalExpr(expr.slice(1), scope, lineNo, currentClass));
    }
    if (expr.startsWith('+')) {
      return Number(await this.evalExpr(expr.slice(1), scope, lineNo, currentClass));
    }

    // 8. Power (**) right-to-left
    const powOp = findTopLevelOperator(expr, ['**'], true);
    if (powOp) {
      const l = await this.evalExpr(expr.slice(0, powOp.idx), scope, lineNo, currentClass);
      const r = await this.evalExpr(expr.slice(powOp.idx + 2), scope, lineNo, currentClass);
      return Math.pow(Number(l), Number(r));
    }

    // 9. Parenthesized expression or Tuple literal
    if (expr.startsWith('(') && expr.endsWith(')') && this.findMatchingOpen(expr, expr.length - 1, '(', ')') === 0) {
      const inner = expr.slice(1, -1).trim();
      if (!inner) return makeTuple([]);
      const items = splitTopLevel(inner, ',');
      if (items.length > 1 || inner.endsWith(',')) {
        const vals: unknown[] = [];
        for (const it of items) vals.push(await this.evalExpr(it, scope, lineNo, currentClass));
        return makeTuple(vals);
      }
      return this.evalExpr(inner, scope, lineNo, currentClass);
    }

    // 10. List literal & list comprehension
    if (expr.startsWith('[') && expr.endsWith(']') && this.findMatchingOpen(expr, expr.length - 1, '[', ']') === 0) {
      const inner = expr.slice(1, -1).trim();
      if (!inner) return [];
      const forOp = findTopLevelOperator(inner, ['for'], true);
      if (forOp) {
        const elemExpr = inner.slice(0, forOp.idx).trim();
        const afterFor = inner.slice(forOp.idx + 3).trim();
        const inOp = findTopLevelOperator(afterFor, ['in'], true);
        if (inOp) {
          const targetStr = afterFor.slice(0, inOp.idx).trim();
          const restAfterIn = afterFor.slice(inOp.idx + 2).trim();
          const condOp = findTopLevelOperator(restAfterIn, ['if'], true);
          const iterExpr = condOp ? restAfterIn.slice(0, condOp.idx).trim() : restAfterIn;
          const condExpr = condOp ? restAfterIn.slice(condOp.idx + 2).trim() : null;
          const iterVal = await this.evalExpr(iterExpr, scope, lineNo, currentClass);
          const items = this.toIterable(iterVal);
          const out: unknown[] = [];
          for (const item of items) {
            const compScope: Scope = Object.create(scope);
            this.assignTargetSync(targetStr, item, compScope);
            if (condExpr) {
              const ok = await this.evalExpr(condExpr, compScope, lineNo, currentClass);
              if (!pyTruthy(ok)) continue;
            }
            out.push(await this.evalExpr(elemExpr, compScope, lineNo, currentClass));
          }
          return out;
        }
      }
      const items = splitTopLevel(inner, ',');
      const vals: unknown[] = [];
      for (const it of items) vals.push(await this.evalExpr(it, scope, lineNo, currentClass));
      return vals;
    }

    // 11. Dict or Set literal
    if (expr.startsWith('{') && expr.endsWith('}') && this.findMatchingOpen(expr, expr.length - 1, '{', '}') === 0) {
      const inner = expr.slice(1, -1).trim();
      if (!inner) return makeDict([]);
      const parts = splitTopLevel(inner, ',');
      const firstColon = findTopLevelOperator(parts[0], [':'], true);
      if (firstColon) {
        const entries: [unknown, unknown][] = [];
        for (const part of parts) {
          const c = findTopLevelOperator(part, [':'], true);
          if (!c) throw new PyException('SyntaxError', 'ساختار دیکشنری نادرست است', lineNo);
          const k = await this.evalExpr(part.slice(0, c.idx), scope, lineNo, currentClass);
          const v = await this.evalExpr(part.slice(c.idx + 1), scope, lineNo, currentClass);
          entries.push([k, v]);
        }
        return makeDict(entries);
      }
      const items: unknown[] = [];
      for (const part of parts) items.push(await this.evalExpr(part, scope, lineNo, currentClass));
      return makeSet(items);
    }

    // 12. f-string literal
    if ((expr.startsWith('f"') && expr.endsWith('"')) || (expr.startsWith("f'") && expr.endsWith("'"))) {
      const quote = expr[1];
      if (this.isSingleStringLiteral(expr.slice(1), quote)) {
        const raw = expr.slice(2, -1);
        let out = '';
        let i = 0;
        while (i < raw.length) {
          if (raw[i] === '{') {
            let depth = 1;
            let j = i + 1;
            while (j < raw.length && depth > 0) {
              if (raw[j] === '{') depth++;
              else if (raw[j] === '}') depth--;
              j++;
            }
            const subExpr = raw.slice(i + 1, j - 1);
            const val = await this.evalExpr(subExpr, scope, lineNo, currentClass);
            out += pyStr(val);
            i = j;
          } else {
            out += raw[i];
            i++;
          }
        }
        return out.replace(/\\n/g, '\n').replace(/\\t/g, '\t');
      }
    }

    // 13. String literal
    if ((expr.startsWith('"') && expr.endsWith('"') && this.isSingleStringLiteral(expr, '"')) ||
        (expr.startsWith("'") && expr.endsWith("'") && this.isSingleStringLiteral(expr, "'"))) {
      return expr
        .slice(1, -1)
        .replace(/\\n/g, '\n')
        .replace(/\\t/g, '\t')
        .replace(/\\'/g, "'")
        .replace(/\\"/g, '"')
        .replace(/\\\\/g, '\\');
    }

    // 14. Number literal
    if (/^\d+(\.\d+)?$/.test(expr)) {
      return Number(expr);
    }

    // 15. Function/Method call or super()
    if (expr.endsWith(')')) {
      const openIdx = this.findMatchingOpen(expr, expr.length - 1, '(', ')');
      if (openIdx > 0) {
        const calleeExpr = expr.slice(0, openIdx).trim();
        const argStr = expr.slice(openIdx + 1, -1).trim();
        const rawArgs = argStr ? splitTopLevel(argStr, ',') : [];
        const posArgs: unknown[] = [];
        const kwArgs: Record<string, unknown> = {};
        for (const a of rawArgs) {
          const eq = findTopLevelOperator(a, ['='], true);
          if (eq && /^[A-Za-z_]\w*$/.test(a.slice(0, eq.idx).trim())) {
            kwArgs[a.slice(0, eq.idx).trim()] = await this.evalExpr(a.slice(eq.idx + 1), scope, lineNo, currentClass);
          } else {
            posArgs.push(await this.evalExpr(a, scope, lineNo, currentClass));
          }
        }

        if (calleeExpr === 'super') {
          if (!currentClass?.base || !scope.self) {
            throw new PyException('RuntimeError', 'super() باید داخل متد یک کلاس فرزند استفاده شود', lineNo);
          }
          return {__pyType: 'super', base: currentClass.base, self: scope.self};
        }

        const callee = await this.evalExpr(calleeExpr, scope, lineNo, currentClass);
        return this.callCallable(callee, posArgs, kwArgs, lineNo);
      }
    }

    // 16. Subscript / Slicing: obj[index], obj[start:stop], or obj[start:stop:step]
    if (expr.endsWith(']')) {
      const openIdx = this.findMatchingOpen(expr, expr.length - 1, '[', ']');
      if (openIdx > 0) {
        const obj = await this.evalExpr(expr.slice(0, openIdx).trim(), scope, lineNo, currentClass);
        const inside = expr.slice(openIdx + 1, -1).trim();
        const colon = findTopLevelOperator(inside, [':'], true);
        if (colon) {
          const rest = inside.slice(colon.idx + 1);
          const secondColon = findTopLevelOperator(rest, [':'], true);
          const startStr = inside.slice(0, colon.idx).trim();
          const endStr = (secondColon ? rest.slice(0, secondColon.idx) : rest).trim();
          const stepStr = secondColon ? rest.slice(secondColon.idx + 1).trim() : '';

          const startVal = startStr ? Math.trunc(Number(await this.evalExpr(startStr, scope, lineNo, currentClass))) : undefined;
          const endVal = endStr ? Math.trunc(Number(await this.evalExpr(endStr, scope, lineNo, currentClass))) : undefined;
          const stepVal = stepStr ? Math.trunc(Number(await this.evalExpr(stepStr, scope, lineNo, currentClass))) : 1;
          if (stepVal === 0) throw new PyException('ValueError', 'گام برش (slice step) نمی‌تواند صفر باشد', lineNo);

          const applySlice = <T,>(arr: T[]): T[] => {
            const len = arr.length;
            if (stepVal > 0) {
              let s = startVal === undefined ? 0 : startVal < 0 ? Math.max(0, len + startVal) : Math.min(len, startVal);
              let e = endVal === undefined ? len : endVal < 0 ? Math.max(0, len + endVal) : Math.min(len, endVal);
              const out: T[] = [];
              for (let i = s; i < e; i += stepVal) out.push(arr[i]);
              return out;
            }
            let s = startVal === undefined ? len - 1 : startVal < 0 ? len + startVal : Math.min(len - 1, startVal);
            let e = endVal === undefined ? -1 : endVal < 0 ? len + endVal : endVal;
            const out: T[] = [];
            for (let i = s; i > e && i >= 0; i += stepVal) {
              if (i < len) out.push(arr[i]);
            }
            return out;
          };

          if (typeof obj === 'string') return applySlice(Array.from(obj)).join('');
          if (Array.isArray(obj)) return applySlice(obj);
          if (isObj(obj, 'tuple')) return makeTuple(applySlice((obj as PyTuple).items));
        }
        const idxVal = await this.evalExpr(inside, scope, lineNo, currentClass);
        return this.getSubscript(obj, idxVal, lineNo);
      }
    }

    // 17. Attribute access: obj.attr
    const lastDot = this.findLastTopLevelDot(expr);
    if (lastDot > 0) {
      const obj = await this.evalExpr(expr.slice(0, lastDot).trim(), scope, lineNo, currentClass);
      const attr = expr.slice(lastDot + 1).trim();
      return this.getAttribute(obj, attr, lineNo, currentClass);
    }

    // 18. Identifier lookup
    if (/^[A-Za-z_]\w*$/.test(expr)) {
      return this.lookup(expr, scope, lineNo);
    }

    throw new PyException('SyntaxError', `عبارت نامعتبر: ${expr}`, lineNo);
  }

  private isSingleStringLiteral(str: string, quote: string): boolean {
    let escaped = false;
    for (let i = 1; i < str.length - 1; i++) {
      if (escaped) { escaped = false; continue; }
      if (str[i] === '\\') { escaped = true; continue; }
      if (str[i] === quote) return false;
    }
    return true;
  }

  private checkIn(needle: unknown, haystack: unknown): boolean {
    if (typeof haystack === 'string') return haystack.includes(pyStr(needle));
    if (isObj(haystack, 'dict')) return (haystack as PyDict).entries.some(([k]) => pyEquals(k, needle));
    return this.toIterable(haystack).some((item) => pyEquals(item, needle));
  }

  private applyBinaryOp(op: string, l: unknown, r: unknown, lineNo: number): unknown {
    switch (op) {
      case '+':
        if (typeof l === 'string' && typeof r === 'string') return l + r;
        if (Array.isArray(l) && Array.isArray(r)) return [...l, ...r];
        if (typeof l === 'number' && typeof r === 'number') return l + r;
        throw new PyException('TypeError', `امکان جمع نوع '${pyTypeName(l)}' و '${pyTypeName(r)}' وجود ندارد`, lineNo);
      case '-':
        return Number(l) - Number(r);
      case '*':
        if (typeof l === 'string' && typeof r === 'number') return l.repeat(Math.max(0, Math.trunc(r)));
        if (typeof r === 'string' && typeof l === 'number') return r.repeat(Math.max(0, Math.trunc(l)));
        if (Array.isArray(l) && typeof r === 'number') {
          const out: unknown[] = [];
          const count = Math.max(0, Math.trunc(r));
          for (let i = 0; i < count; i++) out.push(...l);
          return out;
        }
        if (Array.isArray(r) && typeof l === 'number') {
          const out: unknown[] = [];
          const count = Math.max(0, Math.trunc(l));
          for (let i = 0; i < count; i++) out.push(...r);
          return out;
        }
        return Number(l) * Number(r);
      case '/':
        if (Number(r) === 0) throw new PyException('ZeroDivisionError', 'تقسیم بر صفر مجاز نیست', lineNo);
        return Number(l) / Number(r);
      case '//':
        if (Number(r) === 0) throw new PyException('ZeroDivisionError', 'تقسیم صحیح بر صفر مجاز نیست', lineNo);
        return Math.floor(Number(l) / Number(r));
      case '%':
        if (Number(r) === 0) throw new PyException('ZeroDivisionError', 'باقیمانده بر صفر مجاز نیست', lineNo);
        return ((Number(l) % Number(r)) + Number(r)) % Number(r);
      case '**':
        return Math.pow(Number(l), Number(r));
      default:
        throw new PyException('SyntaxError', `عملگر ناشناخته: ${op}`, lineNo);
    }
  }

  private getSubscript(obj: unknown, key: unknown, lineNo: number): unknown {
    if (isObj(obj, 'dict')) {
      const found = (obj as PyDict).entries.find(([k]) => pyEquals(k, key));
      if (!found) throw new PyException('KeyError', `کلید ${pyStr(key, true)} در دیکشنری یافت نشد`, lineNo);
      return found[1];
    }
    if (typeof obj === 'string' || Array.isArray(obj) || isObj(obj, 'tuple')) {
      const seq: string | unknown[] = isObj(obj, 'tuple') ? (obj as PyTuple).items : (obj as string | unknown[]);
      let i = Math.trunc(Number(key));
      if (i < 0) i += seq.length;
      if (i < 0 || i >= seq.length) throw new PyException('IndexError', 'اندیس خارج از محدوده است', lineNo);
      return seq[i];
    }
    throw new PyException('TypeError', `'${pyTypeName(obj)}' object is not subscriptable`, lineNo);
  }

  private resolveMethod(cls: PyClass | undefined, name: string): {fn: PyFunc; owner: PyClass} | null {
    let cur = cls;
    while (cur) {
      if (name in cur.methods) return {fn: cur.methods[name], owner: cur};
      cur = cur.base;
    }
    return null;
  }

  private getAttribute(obj: unknown, attr: string, lineNo: number, currentClass?: PyClass): unknown {
    // Module export
    if (isObj(obj, 'module')) {
      const mod = obj as PyModule;
      if (attr in mod.exports) return mod.exports[attr];
      throw new PyException('AttributeError', `ماژول '${mod.name}' دارای '${attr}' نیست`, lineNo);
    }

    // super() dispatch
    if (obj && typeof obj === 'object' && (obj as Record<string, unknown>).__pyType === 'super') {
      const s = obj as {base: PyClass; self: PyInstance};
      const found = this.resolveMethod(s.base, attr);
      if (!found) throw new PyException('AttributeError', `متد '${attr}' در کلاس والد یافت نشد`, lineNo);
      return {
        __pyType: 'bound',
        self: s.self,
        fn: (args, kwargs) => this.callPyFunc(found.fn, [s.self, ...args], kwargs, lineNo, found.owner),
      } satisfies PyBoundMethod;
    }

    // Class attribute / method access (e.g. Mobile.total_created, City._auto_id)
    if (isObj(obj, 'class')) {
      const cls = obj as PyClass;
      if (attr === '__name__') return cls.name;
      const mangled = this.mangleAttr(attr, currentClass ?? cls);
      let cur: PyClass | undefined = cls;
      while (cur) {
        if (mangled in cur.classAttrs) return cur.classAttrs[mangled];
        if (attr in cur.classAttrs) return cur.classAttrs[attr];
        if (attr in cur.methods) return cur.methods[attr];
        cur = cur.base;
      }
      throw new PyException('AttributeError', `کلاس '${cls.name}' فاقد ویژگی '${attr}' است`, lineNo);
    }

    // Instance attribute or method
    if (isObj(obj, 'instance')) {
      const inst = obj as PyInstance;
      const mangled = this.mangleAttr(attr, currentClass);
      if (mangled in inst.attrs) return inst.attrs[mangled];
      if (attr in inst.attrs) return inst.attrs[attr];
      const method = this.resolveMethod(inst.cls, attr);
      if (method) {
        return {
          __pyType: 'bound',
          self: inst,
          fn: (args, kwargs) => this.callPyFunc(method.fn, [inst, ...args], kwargs, lineNo, method.owner),
        } satisfies PyBoundMethod;
      }
      let cur: PyClass | undefined = inst.cls;
      while (cur) {
        if (mangled in cur.classAttrs) return cur.classAttrs[mangled];
        if (attr in cur.classAttrs) return cur.classAttrs[attr];
        cur = cur.base;
      }
      throw new PyException('AttributeError', `شیء '${inst.cls.name}' فاقد ویژگی یا متد '${attr}' است`, lineNo);
    }

    // Tuple methods
    if (isObj(obj, 'tuple')) {
      const tup = obj as PyTuple;
      const b = (fn: PyBoundMethod['fn']): PyBoundMethod => ({__pyType: 'bound', self: tup, fn});
      if (attr === 'count') return b((a) => tup.items.filter((x) => pyEquals(x, a[0])).length);
      if (attr === 'index') {
        return b((a) => {
          const i = tup.items.findIndex((x) => pyEquals(x, a[0]));
          if (i < 0) throw new PyException('ValueError', 'tuple.index(x): x not in tuple', lineNo);
          return i;
        });
      }
    }

    // Date / Datetime object attributes
    if (isObj(obj, 'date')) {
      const d = obj as PyDateObj;
      if (attr === 'year') return d.year;
      if (attr === 'month') return d.month;
      if (attr === 'day') return d.day;
      if (attr === 'hour') return d.hour;
      if (attr === 'minute') return d.minute;
      if (attr === 'second') return d.second;
      if (attr === 'strftime') {
        return {
          __pyType: 'bound',
          self: d,
          fn: (a) => {
            const pad = (n: number) => String(n).padStart(2, '0');
            return pyStr(a[0] ?? '%Y-%m-%d')
              .replace(/%Y/g, String(d.year))
              .replace(/%m/g, pad(d.month))
              .replace(/%d/g, pad(d.day))
              .replace(/%H/g, pad(d.hour))
              .replace(/%M/g, pad(d.minute))
              .replace(/%S/g, pad(d.second));
          },
        } satisfies PyBoundMethod;
      }
    }

    // pathlib.Path methods
    if (isObj(obj, 'path')) {
      const pathObj = obj as PyPathObj;
      if (attr === 'name') return pathObj.path.split('/').pop() ?? pathObj.path;
      const bound = (fn: PyBoundMethod['fn']): PyBoundMethod => ({__pyType: 'bound', self: pathObj, fn});
      if (attr === 'exists') return bound(() => pathObj.path in this.files);
      if (attr === 'read_text') {
        return bound(() => {
          if (!(pathObj.path in this.files)) {
            throw new PyException('FileNotFoundError', `فایل '${pathObj.path}' پیدا نشد`, lineNo);
          }
          return this.files[pathObj.path];
        });
      }
      if (attr === 'write_text') {
        return bound((args) => {
          const content = pyStr(args[0] ?? '');
          this.files[pathObj.path] = content;
          this.options.onFilesChange?.({...this.files});
          return content.length;
        });
      }
      throw new PyException('AttributeError', `PosixPath has no attribute '${attr}'`, lineNo);
    }

    // String methods
    if (typeof obj === 'string') {
      const s = obj;
      const b = (fn: PyBoundMethod['fn']): PyBoundMethod => ({__pyType: 'bound', self: s, fn});
      switch (attr) {
        case 'lower': return b(() => s.toLowerCase());
        case 'upper': return b(() => s.toUpperCase());
        case 'title': return b(() => s.replace(/\b\w/g, (c) => c.toUpperCase()));
        case 'strip': return b(() => s.trim());
        case 'rstrip': return b(() => s.trimEnd());
        case 'lstrip': return b(() => s.trimStart());
        case 'splitlines': return b(() => (s === '' ? [] : s.replace(/\r\n/g, '\n').split('\n')));
        case 'split': return b((a) => (a.length ? s.split(pyStr(a[0])) : s.trim() ? s.trim().split(/\s+/) : []));
        case 'join': return b((a) => this.toIterable(a[0]).map((x) => pyStr(x)).join(s));
        case 'replace': return b((a) => s.split(pyStr(a[0])).join(pyStr(a[1])));
        case 'count': return b((a) => s.split(pyStr(a[0])).length - 1);
        case 'startswith': return b((a) => s.startsWith(pyStr(a[0])));
        case 'endswith': return b((a) => s.endsWith(pyStr(a[0])));
        case 'isupper': return b(() => s.length > 0 && s === s.toUpperCase() && s !== s.toLowerCase());
        case 'islower': return b(() => s.length > 0 && s === s.toLowerCase() && s !== s.toUpperCase());
        case 'isdigit': return b(() => /^\d+$/.test(s));
        case 'isalpha': return b(() => /^[A-Za-z\u0600-\u06FF]+$/.test(s));
      }
    }

    // List methods
    if (Array.isArray(obj)) {
      const arr = obj;
      const b = (fn: PyBoundMethod['fn']): PyBoundMethod => ({__pyType: 'bound', self: arr, fn});
      switch (attr) {
        case 'append': return b((a) => { arr.push(a[0]); return null; });
        case 'insert': return b((a) => { arr.splice(Math.trunc(Number(a[0])), 0, a[1]); return null; });
        case 'remove': return b((a) => {
          const i = arr.findIndex((x) => pyEquals(x, a[0]));
          if (i < 0) throw new PyException('ValueError', `${pyStr(a[0], true)} در لیست وجود ندارد`, lineNo);
          arr.splice(i, 1);
          return null;
        });
        case 'pop': return b((a) => {
          if (arr.length === 0) throw new PyException('IndexError', 'pop from empty list', lineNo);
          if (a.length === 0) return arr.pop();
          let i = Math.trunc(Number(a[0]));
          if (i < 0) i += arr.length;
          return arr.splice(i, 1)[0];
        });
        case 'clear': return b(() => { arr.length = 0; return null; });
        case 'reverse': return b(() => { arr.reverse(); return null; });
        case 'sort': return b((_a, kw) => {
          arr.sort((x, y) => (typeof x === 'number' && typeof y === 'number' ? x - y : pyStr(x).localeCompare(pyStr(y))));
          if (pyTruthy(kw.reverse)) arr.reverse();
          return null;
        });
        case 'count': return b((a) => arr.filter((x) => pyEquals(x, a[0])).length);
      }
    }

    // Set methods
    if (isObj(obj, 'set')) {
      const st = obj as PySet;
      const b = (fn: PyBoundMethod['fn']): PyBoundMethod => ({__pyType: 'bound', self: st, fn});
      switch (attr) {
        case 'add': return b((a) => {
          if (!st.items.some((x) => pyEquals(x, a[0]))) st.items.push(a[0]);
          return null;
        });
        case 'remove': return b((a) => {
          const i = st.items.findIndex((x) => pyEquals(x, a[0]));
          if (i < 0) throw new PyException('KeyError', pyStr(a[0], true), lineNo);
          st.items.splice(i, 1);
          return null;
        });
        case 'discard': return b((a) => {
          const i = st.items.findIndex((x) => pyEquals(x, a[0]));
          if (i >= 0) st.items.splice(i, 1);
          return null;
        });
      }
    }

    // Dict methods
    if (isObj(obj, 'dict')) {
      const d = obj as PyDict;
      const b = (fn: PyBoundMethod['fn']): PyBoundMethod => ({__pyType: 'bound', self: d, fn});
      switch (attr) {
        case 'get': return b((a) => {
          const f = d.entries.find(([k]) => pyEquals(k, a[0]));
          return f ? f[1] : (a.length > 1 ? a[1] : null);
        });
        case 'keys': return b(() => d.entries.map(([k]) => k));
        case 'values': return b(() => d.entries.map(([, v]) => v));
        case 'items': return b(() => d.entries.map(([k, v]) => makeTuple([k, v])));
        case 'pop': return b((a) => {
          const i = d.entries.findIndex(([k]) => pyEquals(k, a[0]));
          if (i < 0) {
            if (a.length > 1) return a[1];
            throw new PyException('KeyError', pyStr(a[0], true), lineNo);
          }
          return d.entries.splice(i, 1)[0][1];
        });
        case 'clear': return b(() => { d.entries.length = 0; return null; });
      }
    }

    // Plain JS helper object (e.g. datetime.date)
    if (obj && typeof obj === 'object' && attr in (obj as Record<string, unknown>)) {
      return (obj as Record<string, unknown>)[attr];
    }

    throw new PyException('AttributeError', `'${pyTypeName(obj)}' object has no attribute '${attr}'`, lineNo);
  }

  private async callPyFunc(
    fn: PyFunc,
    posArgs: unknown[],
    kwArgs: Record<string, unknown>,
    lineNo: number,
    ownerClass?: PyClass
  ): Promise<unknown> {
    const localScope: Scope = Object.create(fn.closure);
    for (let i = 0; i < fn.params.length; i++) {
      const p = fn.params[i];
      if (i < posArgs.length) {
        localScope[p.name] = posArgs[i];
      } else if (p.name in kwArgs) {
        localScope[p.name] = kwArgs[p.name];
      } else if (p.defaultExpr !== undefined) {
        localScope[p.name] = await this.evalExpr(p.defaultExpr, fn.closure, lineNo, ownerClass);
      } else {
        throw new PyException('TypeError', `آرگومان اجباری '${p.name}' برای تابع '${fn.name}' ارسال نشده است`, lineNo);
      }
    }
    try {
      await this.execBlock(fn.body, localScope, ownerClass);
      return null;
    } catch (sig) {
      if (sig instanceof ReturnSignal) return sig.value;
      throw sig;
    }
  }

  private async callCallable(
    callee: unknown,
    posArgs: unknown[],
    kwArgs: Record<string, unknown>,
    lineNo: number
  ): Promise<unknown> {
    if (typeof callee === 'function') {
      return await callee(posArgs, kwArgs);
    }
    if (isObj(callee, 'bound')) {
      return await (callee as PyBoundMethod).fn(posArgs, kwArgs);
    }
    if (isObj(callee, 'func')) {
      return await this.callPyFunc(callee as PyFunc, posArgs, kwArgs, lineNo);
    }
    if (isObj(callee, 'class')) {
      const cls = callee as PyClass;
      const inst: PyInstance = {__pyType: 'instance', cls, attrs: {...cls.classAttrs}};
      const init = this.resolveMethod(cls, '__init__');
      if (init) {
        await this.callPyFunc(init.fn, [inst, ...posArgs], kwArgs, lineNo, init.owner);
      }
      return inst;
    }
    throw new PyException('TypeError', `'${pyTypeName(callee)}' قابل فراخوانی نیست`, lineNo);
  }
}

// ---------- Local Pyodide Availability Probe (Zero External Network) ----------

let localPyodideCheckPromise: Promise<boolean> | null = null;

export async function isLocalPyodideAvailable(): Promise<boolean> {
  if (typeof window === 'undefined' || typeof fetch === 'undefined') return false;
  if (!localPyodideCheckPromise) {
    localPyodideCheckPromise = fetch('/vendor/pyodide/offline-manifest.json', {method: 'HEAD'})
      .then((res) => res.ok)
      .catch(() => false);
  }
  return localPyodideCheckPromise;
}

/**
 * Primary Entry Point: Runs Python code 100% offline.
 * - Uses step-capable built-in offline Python 3 engine by default for instant zero-latency execution,
 *   true step-by-step variable inspection, and non-blocking inline terminal `input()`.
 * - Supports full virtual filesystem sync for Module 4 (pathlib.Path + JSON).
 */
export async function executePythonCode(options: PythonRunOptions): Promise<PythonRunResult> {
  const interpreter = new OfflinePythonInterpreter(options);
  try {
    return await interpreter.run(options.code);
  } catch (err) {
    const pyErr = err instanceof PyException ? err : null;
    const message = err instanceof Error ? err.message : String(err);
    return {
      engineUsed: 'builtin-offline-python',
      stdout: '',
      error: message,
      errorLine: pyErr?.line,
      files: {...(options.files ?? {})},
      variables: [],
      turtleSegments: [],
    };
  }
}
