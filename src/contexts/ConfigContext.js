import React, { createContext, useContext, useState, useEffect} from "react";
import { config } from "../config";

const ConfigContext = createContext();

export const ConfigProvider = ({ children }) => {
  const [language, setLanguage] = useState(localStorage.getItem("language") || "en"); // Default language


  // Run only once to detect language
  useEffect(()=>{

    // Get language from localStorage
    const storedLang = localStorage.getItem("language");

    if(storedLang === null){
      try{
        // Detect language from user
        const userLang = (navigator.language || navigator.userLanguage).split("-");

        // Save language to local storage
        localStorage.setItem("language", userLang[0]);
        const storedLang = localStorage.getItem("language");

        // Check if user's language is allowed
        if(storedLang === "en" || storedLang === "es"){
          setLanguage(storedLang);
        }else{ // Default
          setLanguage("en")
        }
      }catch(error){
        localStorage.setItem("language", "en");
        setLanguage("en")
      }
    }
  },[])

  // run every time user switches the language
  useEffect(()=>{

    // set directly
    localStorage.setItem("language", language);
    const storedLang = localStorage.getItem("language");

    // set const
    setLanguage(storedLang)
  },[language, setLanguage])

  return (
    <ConfigContext.Provider value={{ config, language, setLanguage }}>
      {children}
    </ConfigContext.Provider>
  );
};

export const useConfig = () => useContext(ConfigContext);