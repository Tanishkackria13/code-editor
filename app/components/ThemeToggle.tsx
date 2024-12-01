"use client";

import { useState, useEffect } from "react";

const ThemeToggle = () => {
  const [isDark, setIsDark] = useState<boolean | null>(null);

  // Effect to load theme from localStorage or system preference
  useEffect(() => {
    // Check for theme in localStorage
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      const isDarkMode = savedTheme === "dark";
      setIsDark(isDarkMode);
      document.documentElement.classList.toggle("dark", isDarkMode);
    } else {
      // Default to system theme
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      setIsDark(prefersDark);
      document.documentElement.classList.toggle("dark", prefersDark);
    }
  }, []);

  // Toggle theme function
  const toggleTheme = () => {
    const newTheme = isDark ? "light" : "dark";
    setIsDark(!isDark);
    document.documentElement.classList.toggle("dark", !isDark);
    localStorage.setItem("theme", newTheme); // Save the new theme to localStorage
  };

  // Wait until the initial theme is loaded
  if (isDark === null) {
    return null; // Avoid rendering the button until the theme state is determined
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
