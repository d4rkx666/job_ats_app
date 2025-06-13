"use client"

import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState, useTransition } from "react";

const LanguageSwitcher = (className) => {
  const [language, setLanguage]= useState();

  // Run only once to detect language
  useEffect(() => {

    // Get language from localStorage
    const storedLang = localStorage.getItem("language");
    if(storedLang){
      setLanguage(storedLang);
    } else {
      try {
        // Detect language from user
        const userLang = (navigator.language || navigator.userLanguage).split("-");

        // Save language to local storage
        localStorage.setItem("language", userLang[0]);
        const storedLang = localStorage.getItem("language");

        // Check if user's language is allowed
        if (storedLang === "en" || storedLang === "es") {
          setLanguage(storedLang);
        } else { // Default
          setLanguage("en")
        }
      } catch (error) {
        localStorage.setItem("language", "en");
        setLanguage("en")
      }
    }
  }, [])

  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  // run every time user switches the language
  useEffect(()=>{

    const storedLang = localStorage.getItem("language");
    if(language && storedLang !== language){
      // set directly
      localStorage.setItem("language", language);

      startTransition(() => {
        const newUrl = `/${language}${window.location.pathname.replace(/^\/[a-zA-Z]{2}/, '')}`;
        router.replace(`${window.location.origin}${newUrl}`);
      });
    }
  },[language, setLanguage])

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
        <img alt={language} className={`absolute inset-1 w-6 h-4 rounded-full bg-white shadow-md transform transition-transform duration-300 ${language === "en" ? "translate-x-0" : "translate-x-8"
          }`} src={`/${language === "es" ? "spanish.png" : "english.png"}`} />
      </button>

      <span className="text-xs text-gray-500 p-1">Esp</span>
    </div>
  );
};

export default LanguageSwitcher;