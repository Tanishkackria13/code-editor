"use client";
import React, { useEffect, useRef } from "react";
import { EditorState } from "@codemirror/state";
import { EditorView, basicSetup } from "codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { python } from "@codemirror/lang-python";
import { php } from "@codemirror/lang-php";
import { go } from "@codemirror/lang-go";
import { rust } from "@codemirror/lang-rust";
import { cpp } from "@codemirror/lang-cpp";

interface CodeEditorProps {
  language: string;
}

const languageExtensions: any = {
  javascript,
  python,
  php,
  go,
  rust,
  "c++": cpp,
};

const CodeEditor: React.FC<CodeEditorProps> = ({ language }) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const editorInstance = useRef<EditorView | null>(null);

  useEffect(() => {
    if (editorRef.current) {
      const extension = languageExtensions[language] || javascript;

      // Destroy previous editor instance
      if (editorInstance.current) {
        editorInstance.current.destroy();
      }

      // Create new editor instance
      editorInstance.current = new EditorView({
        state: EditorState.create({
          doc:"",
          extensions: [basicSetup, extension()],
        }),
        parent: editorRef.current,
      });
    }

    return () => {
      if (editorInstance.current) {
        editorInstance.current.destroy();
      }
    };
  }, [language]);

  return (
    <div className="border p-4 bg-white dark:bg-gray-900" ref={editorRef}></div>
  );
};

export default CodeEditor;
