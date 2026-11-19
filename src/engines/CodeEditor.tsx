import {useEffect, useRef} from 'react';
import {EditorState, StateEffect, StateField} from '@codemirror/state';
import {Decoration, type DecorationSet, EditorView, keymap, lineNumbers, highlightActiveLine, highlightActiveLineGutter} from '@codemirror/view';
import {defaultKeymap, history, historyKeymap, indentWithTab} from '@codemirror/commands';
import {defaultHighlightStyle, syntaxHighlighting, bracketMatching, indentOnInput} from '@codemirror/language';
import {python} from '@codemirror/lang-python';
import {html} from '@codemirror/lang-html';
import {css} from '@codemirror/lang-css';
import {javascript} from '@codemirror/lang-javascript';
import {sql} from '@codemirror/lang-sql';
import {oneDark} from '@codemirror/theme-one-dark';
import type {CodeLanguage} from '../types/curriculum.ts';

interface CodeEditorProps {
  value: string;
  onChange: (next: string) => void;
  language: CodeLanguage;
  dark?: boolean;
  readOnly?: boolean;
  highlightedLine?: number | null;
  minHeight?: string;
}

const setStepLineEffect = StateEffect.define<number | null>();

const stepLineField = StateField.define<DecorationSet>({
  create() {
    return Decoration.none;
  },
  update(decorations, tr) {
    decorations = decorations.map(tr.changes);
    for (const e of tr.effects) {
      if (e.is(setStepLineEffect)) {
        if (e.value === null || e.value < 1 || e.value > tr.state.doc.lines) {
          return Decoration.none;
        }
        const line = tr.state.doc.line(e.value);
        return Decoration.set([
          Decoration.line({class: 'cm-activeLineHighlight'}).range(line.from),
        ]);
      }
    }
    return decorations;
  },
  provide: (f) => EditorView.decorations.from(f),
});

function getLanguageExtension(lang: CodeLanguage) {
  switch (lang) {
    case 'python':
      return python();
    case 'css':
      return css();
    case 'javascript':
      return javascript();
    case 'sql':
      return sql();
    case 'html':
    case 'django-html':
    default:
      return html();
  }
}

export function CodeEditor({
  value,
  onChange,
  language,
  dark = false,
  readOnly = false,
  highlightedLine = null,
  minHeight = '260px',
}: CodeEditorProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const viewRef = useRef<EditorView | null>(null);
  const onChangeRef = useRef(onChange);
  onChangeRef.current = onChange;

  useEffect(() => {
    if (!containerRef.current) return;

    const extensions = [
      lineNumbers(),
      highlightActiveLineGutter(),
      highlightActiveLine(),
      history(),
      bracketMatching(),
      indentOnInput(),
      syntaxHighlighting(defaultHighlightStyle, {fallback: true}),
      keymap.of([...defaultKeymap, ...historyKeymap, indentWithTab]),
      getLanguageExtension(language),
      stepLineField,
      EditorState.readOnly.of(readOnly),
      EditorView.lineWrapping,
      EditorView.updateListener.of((update) => {
        if (update.docChanged) {
          onChangeRef.current(update.state.doc.toString());
        }
      }),
      EditorView.theme({
        '&': {
          minHeight,
          backgroundColor: dark ? '#0f172a' : '#ffffff',
          color: dark ? '#f1f5f9' : '#0f172a',
        },
        '.cm-gutters': {
          backgroundColor: dark ? '#0b1120' : '#f8fafc',
          color: dark ? '#64748b' : '#94a3b8',
          borderRight: dark ? '1px solid #1e293b' : '1px solid #e2e8f0',
        },
        '.cm-content': {
          padding: '10px 0',
        },
      }),
    ];

    if (dark) {
      extensions.push(oneDark);
    }

    const state = EditorState.create({
      doc: value,
      extensions,
    });

    const view = new EditorView({
      state,
      parent: containerRef.current,
    });
    viewRef.current = view;

    return () => {
      view.destroy();
      viewRef.current = null;
    };
    // Re-create only when language/theme/readOnly changes; value updates handled below
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [language, dark, readOnly, minHeight]);

  // Sync external value changes (e.g., switching examples or pressing Reset)
  useEffect(() => {
    const view = viewRef.current;
    if (!view) return;
    const current = view.state.doc.toString();
    if (current !== value) {
      view.dispatch({
        changes: {from: 0, to: current.length, insert: value},
      });
    }
  }, [value]);

  // Sync highlighted step line
  useEffect(() => {
    const view = viewRef.current;
    if (!view) return;
    view.dispatch({
      effects: setStepLineEffect.of(highlightedLine ?? null),
    });
  }, [highlightedLine]);

  return (
    <div
      dir="ltr"
      className="cm-ltr-wrapper w-full overflow-hidden rounded-lg border border-slate-200 dark:border-slate-800"
      style={{minHeight}}
      ref={containerRef}
    />
  );
}
