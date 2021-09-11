import Editor from 'react-simple-code-editor';
import highlightjs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
import 'highlight.js/styles/github-dark-dimmed.css';

highlightjs.registerLanguage('javascript', javascript);

export function CodeEditor({ code, onCodeChanged }: { code: string, onCodeChanged: (...args: any[]) => any }) {
  return (
    <Editor
      className="language-javascript hljs"
      id="editor"
      value={code}
      onValueChange={onCodeChanged}
      highlight={code => highlightjs.highlight('javascript', code).value}
      padding={10}
      style={{
        fontFamily: '"Fira code", "Fira Mono", monospace',
        fontSize: 20,
      }}
    />
  );
}