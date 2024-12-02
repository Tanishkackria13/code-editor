"use client";

import React, { useState, useCallback } from "react";
import Sidebar from "./components/Sidebar";
import CodeEditor from "./components/CodeEditor";
import ThemeToggle from "./components/ThemeToggle";

const Home = () => {
  const [language, setLanguage] = useState("javascript");
  const [code, setCode] = useState<string>("");
  const [output, setOutput] = useState<string>("");

  const updateCode = useCallback((newCode: string) => {
    setCode(newCode);
  }, []);

  const executeCode = () => {
    if (language === "javascript") {
      try {
        const result = eval(code);
        setOutput(
          result !== undefined ? String(result) : "No output (undefined result)"
        );
      } catch (error) {
        if (error instanceof Error) {
          setOutput(`Error: ${error.message}`);
        } else {
          setOutput("An unknown error occurred.");
        }
      }
    } else {
      setOutput("Execution for this language is not supported yet.");
    }
  };

  return (
    <div className="h-screen flex bg-gray-100 dark:bg-gray-900 text-black dark:text-white">
      <Sidebar onLanguageChange={setLanguage} />
      <div className="flex flex-col flex-grow">
        <ThemeToggle />
        <div className="flex-grow p-4 flex">
          <div className="flex-grow">
            <h1 className="text-xl font-bold mb-4">Code Editor</h1>
            <CodeEditor language={language} setCode={updateCode} />
            <button
              onClick={executeCode}
              className="mt-4 bg-blue-600 text-white p-2 rounded"
            >
              Run Code
            </button>
          </div>
          <div className="w-80 ml-4 p-4 border bg-gray-50 dark:bg-gray-800">
            <p>Output:</p>
            <pre>{output}</pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
