import Editor from "@monaco-editor/react";

export function CodeEditor({ code, theme, onCodeChanged }: { code: string, theme: string, onCodeChanged: (...args: any[]) => any }) {
  return (
    <Editor
      theme={`vs-${theme}`}
      defaultLanguage="javascript"
      defaultValue={code}
      onChange={onCodeChanged}
    />
  );
}