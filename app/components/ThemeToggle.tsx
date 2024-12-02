"use client";

import { useState, useEffect } from "react";

const ThemeToggle = () => {
  const [isDark, setIsDark] = useState<boolean | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("theme");
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      const isDarkMode = savedTheme === "dark" || (!savedTheme && prefersDark);
      setIsDark(isDarkMode);
      document.documentElement.classList.toggle("dark", isDarkMode);
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDark ? "dark" : "light";
    setIsDark(!isDark);
    document.documentElement.classList.toggle("dark", !isDark);
    localStorage.setItem("theme", newTheme);
  };

  if (isDark === null) {
    return null; // Prevent rendering until theme is determined
  }

  return (
    <button
      onClick={toggleTheme}
      className="m-2 p-2 bg-gray-800 text-white rounded hover:bg-gray-700"
    >
      {isDark ? "Switch to Light Theme" : "Switch to Dark Theme"}
    </button>
  );
};

export default ThemeToggle;
