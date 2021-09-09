import React, { useState } from 'react';
import Editor from 'react-simple-code-editor';
import highlightjs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
import 'highlight.js/styles/github-dark-dimmed.css';

highlightjs.registerLanguage('javascript', javascript);

function CodeEditor({ code: defaultCode }: { code: string }) {
  const [code, setCode] = useState(defaultCode);
  return (
    <Editor
      className="language-javascript hljs"
      id="editor"
      value={code}
      onValueChange={setCode}
      highlight={code => highlightjs.highlight('javascript', code).value}
      padding={10}
      style={{
        fontFamily: '"Fira code", "Fira Mono", monospace',
        fontSize: 20,
      }}
    />
  );
}

export default CodeEditor;