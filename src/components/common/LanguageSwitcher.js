import React from "react";
import { useConfig } from "../../contexts/ConfigContext";

const LanguageSwitcher = (className) => {
  const { language, setLanguage } = useConfig();

  return (
    <div className={`flex items-center ${className.className}`}>
      {/* Toggle Switch */}
      <button
        onClick={() => setLanguage(language === "en" ? "es" : "en")}
        className="relative w-16 h-6 rounded-full p-1 bg-blue-500 transition duration-300 focus:outline-none"
      >
        {/* Toggle Circle */}
          {/* Language Label */}
          <img alt={language} className={`absolute inset-1 w-6 h-4 rounded-full bg-white shadow-md transform transition-transform duration-300 ${
            language === "en" ? "translate-x-0" : "translate-x-8"
          }`} src={`/${language === "es" ? "english.png" : "spanish.png"}`}/>
      </button>
    </div>
  );
};

export default LanguageSwitcher;