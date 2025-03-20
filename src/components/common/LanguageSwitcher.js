import React from "react";
import { useConfig } from "../../contexts/ConfigContext";

const LanguageSwitcher = () => {
  const { language, setLanguage } = useConfig();

  return (
    <div className="flex items-center">
      {/* Toggle Switch */}
      <button
        onClick={() => setLanguage(language === "en" ? "es" : "en")}
        className="relative w-16 h-8 rounded-full p-1 bg-blue-500 transition duration-300 focus:outline-none"
      >
        {/* Toggle Circle */}
        <div
          className={`absolute inset-1 w-6 h-6 rounded-full bg-white shadow-md transform transition-transform duration-300 ${
            language === "en" ? "translate-x-0" : "translate-x-8"
          }`}
        ></div>
      </button>

      {/* Language Label */}
      <span className="ml-3 text-white">
        {language === "en" ? "🇨🇦 EN" : "🇲🇽 ES"}
      </span>
    </div>
  );
};

export default LanguageSwitcher;