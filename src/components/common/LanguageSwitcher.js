import React from "react";
import { useConfig } from "../../contexts/ConfigContext";

const LanguageSwitcher = (className) => {
  const { language, setLanguage } = useConfig();

  return (
    <div className={`flex items-center ${className.className}`}>
      {/* Toggle Switch */}
      <span className="text-xs text-gray-500 p-1">Eng</span>
      <button
        onClick={() => setLanguage(language === "en" ? "es" : "en")}
        className="relative w-16 h-6 rounded-full py-2 px-6 bg-blue-500 transition duration-300 focus:outline-none"
      >
        {/* Toggle Circle */}
          {/* Language Label */}
          <img alt={language} className={`absolute inset-1 w-6 h-4 rounded-full bg-white shadow-md transform transition-transform duration-300 ${
            language === "en" ? "translate-x-0" : "translate-x-8"
          }`} src={`/${language === "es" ? "spanish.png" : "english.png"}`}/>
      </button>
      
      <span className="text-xs text-gray-500 p-1">Esp</span>
    </div>
  );
};

export default LanguageSwitcher;