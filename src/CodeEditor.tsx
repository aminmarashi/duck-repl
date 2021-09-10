import React, { useState, useEffect } from 'react';
import Editor from 'react-simple-code-editor';
import highlightjs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
import 'highlight.js/styles/github-dark-dimmed.css';

highlightjs.registerLanguage('javascript', javascript);

function CodeEditor(props: { code: string, onCodeChanged: (...args: any[]) => any }) {
  const [code, setCode] = useState(props.code);
  function codeUpdateHandler(code: string) {
    props.onCodeChanged(code);
    setCode(code);
  }
  useEffect(() => {
    setCode(props.code);
  }, [props.code]);
  return (
    <Editor
      className="language-javascript hljs"
      id="editor"
      value={code}
      onValueChange={codeUpdateHandler}
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