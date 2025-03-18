import React, { createContext, useContext, useState } from "react";
import { config } from "../config";

const ConfigContext = createContext();

export const ConfigProvider = ({ children }) => {
  const [language, setLanguage] = useState("en"); // Default language

  return (
    <ConfigContext.Provider value={{ config, language, setLanguage }}>
      {children}
    </ConfigContext.Provider>
  );
};

export const useConfig = () => useContext(ConfigContext);