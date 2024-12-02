"use client";

import React, { useState } from "react";

const Sidebar = ({
  onLanguageChange,
}: {
  onLanguageChange: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <div className="sm:w-64 bg-gray-800 text-white sm:p-4 p-2">
      <button
        onClick={toggleSidebar}
        className="sm:hidden bg-gray-700 text-white px-4 py-2 rounded w-full"
      >
        {isOpen ? "Close Menu" : "Open Menu"}
      </button>

      <div className={`${isOpen ? "block" : "hidden"} sm:block mt-4 sm:mt-0`}>
        <h2 className="text-xl font-bold sm:text-left text-center">
          Select Language
        </h2>
        <ul className="mt-4">
          {["javascript", "python", "php", "go", "rust", "c++"].map((lang) => (
            <li key={lang}>
              <button
                onClick={() => onLanguageChange(lang)}
                className="w-full text-left sm:px-2 px-4 py-2 hover:bg-gray-700"
              >
                {lang.charAt(0).toUpperCase() + lang.slice(1)}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
