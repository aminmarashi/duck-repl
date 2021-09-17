import Editor from "@monaco-editor/react";

export function CodeEditor({ code, onCodeChanged }: { code: string, onCodeChanged: (...args: any[]) => any }) {
  return (
    <Editor
      height="10vh"
      defaultLanguage="javascript"
      defaultValue={code}
      onChange={onCodeChanged}
    />
  );
}