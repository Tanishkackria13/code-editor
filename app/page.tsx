"use client";
import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
import CodeEditor from "./components/CodeEditor";
import ThemeToggle from "./components/ThemeToggle";

const Home = () => {
  const [language, setLanguage] = useState("javascript");
  const [code, setCode] = useState<string>("");
  const [output, setOutput] = useState<string>("");

  const executeCode = () => {
    if (language === "javascript") {
      try {
        const result = eval(code);

        // Handle cases where the result is undefined
        setOutput(
          result !== undefined ? String(result) : "No output (undefined result)"
        );
      } catch (error) {
        // Safely cast 'error' to 'Error' type
        if (error instanceof Error) {
          setOutput(`Error: ${error.message}`); // Display error message
        } else {
          setOutput("An unknown error occurred."); // Fallback for non-Error types
        }
      }
    } else {
      setOutput("Execution for this language is not supported yet.");
    }
  };

  return (
    <div className="h-screen flex flex-col sm:flex-row bg-gray-100 dark:bg-gray-900 text-black dark:text-white">
  <Sidebar onLanguageChange={setLanguage} />
  <div className="flex-grow flex flex-col">
    <ThemeToggle />
    <div className="flex-grow p-4 flex flex-col sm:flex-row">
      <div className="flex-grow">
        <h1 className="text-xl font-bold mb-4">Code Editor</h1>
        <CodeEditor language={language} />
      </div>
      <div className="w-full sm:w-80 sm:ml-4 mt-4 sm:mt-0 p-4 border bg-gray-50 dark:bg-gray-800">
        <h2 className="font-bold">Output:</h2>
        <p>{output}</p>
      </div>
    </div>
  </div>
</div>

  
  );
};

export default Home;
