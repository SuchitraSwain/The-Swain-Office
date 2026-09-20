/**
 * Monaco bootstrap for the Electron renderer (electron-vite / Vite).
 *
 * Two things have to be true for Monaco to work in a bundled Electron app:
 *
 *  1. Workers must be SELF-HOSTED, not fetched from a CDN. We import each
 *     language worker through Vite's `?worker` suffix, which emits a real
 *     bundled worker chunk and a constructor. `MonacoEnvironment.getWorker`
 *     hands Monaco the right one per language. This is the electron-vite-safe
 *     equivalent of the classic `getWorkerUrl` CDN dance — it works offline and
 *     inside the packaged `app.asar` because the worker URL is resolved by Vite
 *     at build time (relative `base: './'`).
 *
 *  2. `@monaco-editor/react` must use THIS bundled `monaco` instance rather than
 *     its default behaviour of lazy-loading monaco from a CDN via AMD. We pin it
 *     with `loader.config({ monaco })`.
 *
 * Import this module once (for its side effects) before any editor mounts.
 */
import * as monaco from 'monaco-editor';
import { loader } from '@monaco-editor/react';

import EditorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker';
import JsonWorker from 'monaco-editor/esm/vs/language/json/json.worker?worker';
import CssWorker from 'monaco-editor/esm/vs/language/css/css.worker?worker';
import HtmlWorker from 'monaco-editor/esm/vs/language/html/html.worker?worker';
import TsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
(self as any).MonacoEnvironment = {
  getWorker(_workerId: string, label: string): Worker {
    switch (label) {
      case 'json':
        return new JsonWorker();
      case 'css':
      case 'scss':
      case 'less':
        return new CssWorker();
      case 'html':
      case 'handlebars':
      case 'razor':
        return new HtmlWorker();
      case 'typescript':
      case 'javascript':
        return new TsWorker();
      default:
        return new EditorWorker();
    }
  }
};

let themesDefined = false;

/** Register the CTH light/dark Monaco themes (idempotent). */
function defineThemes(m: typeof monaco): void {
  if (themesDefined) return;
  themesDefined = true;
  m.editor.defineTheme('cth-light', {
    base: 'vs',
    inherit: true,
    rules: [
      { token: '', foreground: '1A1320', background: 'FCFAF0' },
      { token: 'comment', foreground: '6B5878', fontStyle: 'italic' },
      { token: 'keyword', foreground: '8B5CF6' },
      { token: 'string', foreground: '3FA45B' },
      { token: 'number', foreground: 'D94F4F' },
      { token: 'type', foreground: '2A9D94' },
      { token: 'function', foreground: 'C2603A' },
      { token: 'variable', foreground: '1A1320' },
      { token: 'delimiter', foreground: '6B5878' }
    ],
    colors: {
      'editor.background': '#FCFAF0',
      'editor.foreground': '#1A1320',
      'editorLineNumber.foreground': '#A899B5',
      'editorLineNumber.activeForeground': '#3D2E4A',
      'editor.selectionBackground': '#FFEC99',
      'editor.lineHighlightBackground': '#FFF8E7',
      'editorCursor.foreground': '#FF6B6B',
      'editorGutter.background': '#F0EAD2',
      'editorWidget.background': '#FFF8E7',
      'editorIndentGuide.background1': '#E8D9A0',
      'diffEditor.insertedTextBackground': '#6BCF7F33',
      'diffEditor.removedTextBackground': '#FF6B6B33',
      'diffEditor.insertedLineBackground': '#6BCF7F22',
      'diffEditor.removedLineBackground': '#FF6B6B22'
    }
  });
  m.editor.defineTheme('cth-dark', {
    base: 'vs-dark',
    inherit: true,
    rules: [
      { token: '', foreground: 'D2CBC0', background: '2E2B26' },
      { token: 'comment', foreground: '8F887C', fontStyle: 'italic' },
      { token: 'keyword', foreground: 'A898D0' },
      { token: 'string', foreground: '7BB396' },
      { token: 'number', foreground: 'D9928A' },
      { token: 'type', foreground: '75A8B6' },
      { token: 'function', foreground: 'C9A85A' },
      { token: 'variable', foreground: 'D2CBC0' },
      { token: 'delimiter', foreground: '8F887C' }
    ],
    colors: {
      'editor.background': '#2E2B26',
      'editor.foreground': '#D2CBC0',
      'editorLineNumber.foreground': '#6E6860',
      'editorLineNumber.activeForeground': '#B3ACA0',
      'editor.selectionBackground': '#454038',
      'editor.lineHighlightBackground': '#35312C',
      'editorCursor.foreground': '#C9A85A',
      'editorGutter.background': '#2A2723',
      'editorWidget.background': '#2A2723',
      'editorIndentGuide.background1': '#454038',
      'diffEditor.insertedTextBackground': '#74C09633',
      'diffEditor.removedTextBackground': '#E08C8233',
      'diffEditor.insertedLineBackground': '#74C09622',
      'diffEditor.removedLineBackground': '#E08C8222'
    }
  });
}

let configured = false;

/** Pin @monaco-editor/react to the bundled monaco + register themes. Idempotent. */
export function setupMonaco(): typeof monaco {
  if (!configured) {
    configured = true;
    loader.config({ monaco });
  }
  defineThemes(monaco);
  return monaco;
}

export const CTH_MONACO_THEME = 'cth-dark';

export function monacoThemeFor(theme: 'light' | 'dark'): 'cth-light' | 'cth-dark' {
  return theme === 'dark' ? 'cth-dark' : 'cth-light';
}

/** Map a filename to a Monaco language id (used to set the model language). */
export function languageForPath(path: string): string {
  const name = path.split(/[\\/]/).pop() ?? path;
  const ext = name.includes('.') ? name.split('.').pop()!.toLowerCase() : '';
  switch (ext) {
    case 'ts': return 'typescript';
    case 'tsx': return 'typescript';
    case 'js':
    case 'jsx':
    case 'mjs':
    case 'cjs': return 'javascript';
    case 'json': return 'json';
    case 'md':
    case 'markdown': return 'markdown';
    case 'py': return 'python';
    case 'rb': return 'ruby';
    case 'go': return 'go';
    case 'rs': return 'rust';
    case 'java': return 'java';
    case 'c':
    case 'h': return 'c';
    case 'cpp':
    case 'cc':
    case 'hpp': return 'cpp';
    case 'cs': return 'csharp';
    case 'php': return 'php';
    case 'sh':
    case 'bash':
    case 'zsh': return 'shell';
    case 'html':
    case 'htm': return 'html';
    case 'css': return 'css';
    case 'scss': return 'scss';
    case 'less': return 'less';
    case 'yml':
    case 'yaml': return 'yaml';
    case 'toml': return 'ini';
    case 'xml': return 'xml';
    case 'sql': return 'sql';
    case 'dockerfile': return 'dockerfile';
    default:
      if (name.toLowerCase() === 'dockerfile') return 'dockerfile';
      return 'plaintext';
  }
}
