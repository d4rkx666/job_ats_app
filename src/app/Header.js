"user client"

import React, { useEffect, useRef, useState} from "react";
import LanguageSwitcher from "./components/common/LanguageSwitcher";
import { useAuth } from "./contexts/AuthContext";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { usePathname } from "next/navigation";

function Header() {
  const t = useTranslations('menu');
  const locale = useLocale();
  
  const currentPath = usePathname();
  const fixedPath = (string)=>{
    if(string === "/"){
      string = "";
    }
    return `/${locale}${string}`
  }
  
  const { user, logout } = useAuth();

  const burger = useRef();
  const menu = useRef();

  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const handleMobileMenu = (action) => {
    setShowMobileMenu(action);
  }

  useEffect(()=>{
    setShowMobileMenu(false);
  },[currentPath])

  return (
    <div className="sticky top-0 z-20">
      <nav className="relative px-4 py-2 md:py-4 flex justify-between items-center bg-white sticky top-0">

        {/* App Name */}
        <div className="text-2xl font-bold">
          <Link href={user ? "/dashboard" : "/"} className="hidden md:flex text-blue-700 no-underline hover:text-blue-500 transition duration-300">
            <img src="/perfectocv.svg" alt="logo"/>
          </Link>
          <Link href={user ? "/dashboard" : "/"} className="md:hidden text-blue-700 no-underline hover:text-blue-500 transition duration-300">
            <img src="/logo.svg" alt="logo" className="w-10"/>
          </Link>
        </div>

        {/* Hamburger ico for mobile menu */}
        <div className="lg:hidden flex">

          {/* Language Switcher for Mobile */}
          <LanguageSwitcher className=""/>
          <button ref={burger} onClick={() => handleMobileMenu(true)} className="navbar-burger flex items-center text-blue-600 p-3">
            <svg className="block h-4 w-4 fill-current" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <title>Mobile menu</title>
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
            </svg>
          </button>
        </div>

        {/* Normal Menu */}
        <ul className="hidden absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 lg:flex lg:mx-auto lg:flex lg:items-center lg:w-auto lg:space-x-6">
          <li>
            <Link href={user ? "/dashboard" : "/"} className={`text-sm ${currentPath === fixedPath("/") || currentPath === fixedPath("/dashboard") ? "text-blue-600 font-bold" : "text-gray-400 hover:text-gray-500"}`}>
              {t("home")}
            </Link>
          </li>

          { !user && 
            <>
              <li className="text-gray-300">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" className="w-4 h-4 current-fill" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v0m0 7v0m0 7v0m0-13a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                </svg>
              </li>
              <li>
                <Link href="/resume-advisor" className={`text-sm ${currentPath === fixedPath("/resume-advisor") ? "text-blue-600 font-bold" : "text-gray-400 hover:text-gray-500"}`}>
                  {t("resume")}
                </Link>
              </li>
            </>
          }
          <li className="text-gray-300">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" className="w-4 h-4 current-fill" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v0m0 7v0m0 7v0m0-13a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
            </svg>
          </li>
          <li>
            <Link href="/pricing" className={`text-sm ${currentPath === fixedPath("/pricing") ? "text-blue-600 font-bold" : "text-gray-400 hover:text-gray-500"}`}>
              {t("pricing")}
            </Link>
          </li>
        </ul>
        {/* Language Switcher */}
        <LanguageSwitcher className="hidden lg:inline-block lg:ml-auto"/>
        {!user ? (
          <>
            <span className="hidden lg:flex text-gray-300">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" className="w-4 h-4 current-fill" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v0m0 7v0m0 7v0m0-13a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
              </svg>
            </span>
            <Link href="/login" className="hidden lg:inline-block lg:mr-3 py-2 px-6 bg-gray-50 hover:bg-gray-100 text-sm text-gray-900 font-bold rounded-xl transition duration-200">
              {t("login")}
            </Link>
            <Link href="/signup" className="hidden lg:inline-block py-2 px-6 bg-blue-500 hover:bg-blue-600 text-sm text-white font-bold rounded-xl transition duration-200">
              {t("signUp")}
            </Link>
          </>
        ) : (
          <>
            <span className="hidden lg:flex text-gray-300">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" className="w-4 h-4 current-fill" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v0m0 7v0m0 7v0m0-13a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
              </svg>
            </span>
            <button
              onClick={logout}
              className="hidden lg:inline-block lg:mr-3 py-2 px-6 bg-gray-50 hover:bg-gray-100 text-sm text-gray-900 font-bold  rounded-xl transition duration-200"
            >
              {t("logout")}
            </button>
          </>
        )}
      </nav>

      {/* Mobile menu */}
      <div ref={menu} className={`navbar-menu relative z-50 ${showMobileMenu ? "" : "hidden"}`}>
        <div className="navbar-backdrop fixed inset-0 bg-gray-800/25"></div>
        <nav className="fixed top-0 left-0 bottom-0 flex flex-col w-5/6 max-w-sm py-6 px-6 bg-white border-r overflow-y-auto">
          <div className="flex items-center mb-8">
            <Link href={user ? "/dashboard" : "/"} className="mr-auto text-3xl font-bold leading-none">
              <img src="/logo.svg" alt="logo" className="w-10"/>
            </Link>
            <button className="navbar-close" onClick={() => handleMobileMenu(false)}>
              <svg className="h-6 w-6 text-gray-400 cursor-pointer hover:text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
          <div>
            <ul>
              {user &&
              <h2 className="text-xl font-semibold text-sky-700 mb-4 text-center">{t("mobileMenu")}</h2>
              }
              <li className="mb-1">
                <Link href={user ? "/dashboard" : "/"} className={`block p-3 text-sm font-semibold ${currentPath === fixedPath("/") ? "bg-blue-50 text-blue-600" : "text-gray-400 hover:bg-blue-50 hover:text-blue-600"}  rounded`}>
                  {t("home")}
                </Link>
              </li>
              {!user &&
              <li className="mb-1">
                <Link href="/resume-advisor" className={`block p-3 text-sm font-semibold ${currentPath === fixedPath("/resume-advisor") ? "bg-blue-50 text-blue-600" : "text-gray-400 hover:bg-blue-50 hover:text-blue-600"}  rounded`}>
                  {t("resume")}
                </Link>
              </li>
              }
              <li className="mb-1">
                <Link href="/pricing" className={`block p-3 text-sm font-semibold ${currentPath === fixedPath("/pricing") ? "bg-blue-50 text-blue-600" : "text-gray-400 hover:bg-blue-50 hover:text-blue-600"}  rounded`}>
                  {t("pricing")}
                </Link>
              </li>
              {user &&
              <>
                <hr className="h-px my-3 bg-blue-500 border-1"/>

                <h2 className="text-xl font-semibold text-sky-700 mb-4 text-center">{t("mobileMyAccount")}</h2>
                <li className="mb-1">
                  <Link href="/dashboard" className={`block p-3 text-sm font-semibold ${currentPath === fixedPath("/dashboard") ? "bg-blue-50 text-blue-600" : "text-gray-400 hover:bg-blue-50 hover:text-blue-600"}  rounded`}>
                    {t("dashboard")}
                  </Link>
                </li>
                <li className="mb-1">
                  <Link href="/profile" className={`block p-3 text-sm font-semibold ${currentPath === fixedPath("/profile") ? "bg-blue-50 text-blue-600" : "text-gray-400 hover:bg-blue-50 hover:text-blue-600"}  rounded`}>
                    {t("profile")}
                  </Link>
                </li>
                <li className="mb-1">
                  <Link href="/resume-advisor" className={`block p-3 text-sm font-semibold ${currentPath === fixedPath("/resume-advisor") ? "bg-blue-50 text-blue-600" : "text-gray-400 hover:bg-blue-50 hover:text-blue-600"}  rounded`}>
                    {t("resume")}
                  </Link>
                </li>
                <li className="mb-1">
                  <Link href="/create-resume" className={`block p-3 text-sm font-semibold ${currentPath === fixedPath("/create-resume") ? "bg-blue-50 text-blue-600" : "text-gray-400 hover:bg-blue-50 hover:text-blue-600"}  rounded`}>
                    {t("createResume")}
                  </Link>
                </li>
              </>

              }
              
            </ul>
          </div>
          <div className="mt-auto">
            {!user ? (
              <div className="pt-6">
                <Link href="/login" className="block px-4 py-3 mb-3 leading-loose text-xs text-center font-semibold leading-none bg-gray-50 hover:bg-gray-100 rounded-xl">
                  {t("login")}
                </Link>
                <Link href="/signup" className="block px-4 py-3 mb-2 leading-loose text-xs text-center text-white font-semibold bg-blue-600 hover:bg-blue-700  rounded-xl">
                {t("signUp")}
                </Link>
              </div>
            ) : (
              <button
                onClick={logout}
                className="w-full py-2 px-6 bg-gray-300 hover:bg-gray-100 text-sm text-gray-900 font-bold  rounded-xl transition duration-200"
              >
                {t("logout")}
              </button>
            )}
            <p className="my-4 text-xs text-center text-gray-400">
              <span>{process.env.NEXT_PUBLIC_FOOTER_DESCRIPTION}</span>
            </p>
          </div>
        </nav>
      </div>
    </div>
  );
}

export default Header;