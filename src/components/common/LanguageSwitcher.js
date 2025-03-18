import React from "react";
import { useConfig } from "../../contexts/ConfigContext";

const LanguageSwitcher = () => {
  const { setLanguage } = useConfig();

  return (
    <div className="flex">
      {/* English Button */}
      <button
        onClick={() => setLanguage("en")}
        className="flex items-center bg-blue-700 text-white px-3 py-1 rounded-lg hover:bg-blue-800 transition duration-300"
      >
        EN
      </button>

      {/* Spanish Button */}
      <button
        onClick={() => setLanguage("es")}
        className="flex items-center bg-green-700 text-white px-3 py-1 rounded-lg hover:bg-green-800 transition duration-300"
      >
        ES
      </button>
    </div>
  );
};

export default LanguageSwitcher;