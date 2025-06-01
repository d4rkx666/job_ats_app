import React, { useRef, useState, useEffect} from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import LanguageSwitcher from "../common/LanguageSwitcher"
import { useConfig } from "../../contexts/ConfigContext";
import { useAuth } from "../../contexts/AuthContext";

function Header() {
  const { config, language } = useConfig();
  const labels = config.labels[language];

  const { user, logout } = useAuth();

  const burger = useRef(HTMLInputElement || null);
  const menu = useRef(HTMLInputElement || null);

  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const handleMobileMenu = (action) => {
    setShowMobileMenu(action);
  }


  // Close menu on each route change
  const location = useLocation();
  useEffect(() => {
    setShowMobileMenu(false);
  }, [location]);

  return (
    <div className="sticky top-0 z-20">
      <nav className="relative px-4 py-2 md:py-4 flex justify-between items-center bg-white sticky top-0">

        {/* App Name */}
        <div className="text-2xl font-bold">
          <NavLink to="/" className="hidden md:flex text-blue-700 no-underline hover:text-blue-500 transition duration-300">
            <img src="/perfectocv.svg" alt="logo"/>
          </NavLink>
          <NavLink to="/" className="md:hidden text-blue-700 no-underline hover:text-blue-500 transition duration-300">
            <img src="/logo.svg" alt="logo" className="w-10"/>
          </NavLink>
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
            <NavLink to="/" className={({ isActive }) => `text-sm ${isActive ? "text-blue-600 font-bold" : "text-gray-400 hover:text-gray-500"}`}>
              {labels.menu.home}
            </NavLink>
          </li>

          { !user && 
            <>
              <li className="text-gray-300">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" className="w-4 h-4 current-fill" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v0m0 7v0m0 7v0m0-13a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                </svg>
              </li>
              <li>
                <NavLink to="/resume" className={({ isActive }) => `text-sm ${isActive ? "text-blue-600 font-bold" : "text-gray-400 hover:text-gray-500"}`}>
                  {labels.menu.resume}
                </NavLink>
              </li>
            </>
          }
          <li className="text-gray-300">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" className="w-4 h-4 current-fill" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v0m0 7v0m0 7v0m0-13a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
            </svg>
          </li>
          <li>
            <NavLink to="/pricing" className={({ isActive }) => `text-sm ${isActive ? "text-blue-600 font-bold" : "text-gray-400 hover:text-gray-500"}`}>
              {labels.menu.pricing}
            </NavLink>
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
            <Link to="/login" className="hidden lg:inline-block lg:mr-3 py-2 px-6 bg-gray-50 hover:bg-gray-100 text-sm text-gray-900 font-bold rounded-xl transition duration-200">
              {labels.menu.login}
            </Link>
            <Link to="/signup" className="hidden lg:inline-block py-2 px-6 bg-blue-500 hover:bg-blue-600 text-sm text-white font-bold rounded-xl transition duration-200">
              {labels.menu.signUp}
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
              {labels.menu.logout}
            </button>
          </>
        )}
      </nav>

      {/* Mobile menu */}
      <div ref={menu} className={`navbar-menu relative z-50 ${showMobileMenu ? "" : "hidden"}`}>
        <div className="navbar-backdrop fixed inset-0 bg-gray-800 opacity-25"></div>
        <nav className="fixed top-0 left-0 bottom-0 flex flex-col w-5/6 max-w-sm py-6 px-6 bg-white border-r overflow-y-auto">
          <div className="flex items-center mb-8">
            <NavLink to="/" className="mr-auto text-3xl font-bold leading-none">
              <img src="/logo.svg" alt="logo" className="w-10"/>
            </NavLink>
            <button className="navbar-close" onClick={() => handleMobileMenu(false)}>
              <svg className="h-6 w-6 text-gray-400 cursor-pointer hover:text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
          <div>
            <ul>
              {user &&
              <h2 className="text-xl font-semibold text-sky-700 mb-4 text-center">{labels.menu.mobileMenu}</h2>
              }
              <li className="mb-1">
                <NavLink to="/" className={({ isActive }) => `block p-3 text-sm font-semibold ${isActive ? "bg-blue-50 text-blue-600" : "text-gray-400 hover:bg-blue-50 hover:text-blue-600"}  rounded`}>
                  {labels.menu.home}
                </NavLink>
              </li>
              {!user &&
              <li className="mb-1">
                <NavLink to="/resume" className={({ isActive }) => `block p-3 text-sm font-semibold ${isActive ? "bg-blue-50 text-blue-600" : "text-gray-400 hover:bg-blue-50 hover:text-blue-600"}  rounded`}>
                  {labels.menu.resume}
                </NavLink>
              </li>
              }
              <li className="mb-1">
                <NavLink to="/pricing" className={({ isActive }) => `block p-3 text-sm font-semibold ${isActive ? "bg-blue-50 text-blue-600" : "text-gray-400 hover:bg-blue-50 hover:text-blue-600"}  rounded`}>
                  {labels.menu.pricing}
                </NavLink>
              </li>
              {user &&
              <>
                <hr className="h-px my-3 bg-blue-500 border-1"/>

                <h2 className="text-xl font-semibold text-sky-700 mb-4 text-center">{labels.menu.mobileMyAccount}</h2>
                <li className="mb-1">
                  <NavLink to="/dashboard" className={({ isActive }) => `block p-3 text-sm font-semibold ${isActive ? "bg-blue-50 text-blue-600" : "text-gray-400 hover:bg-blue-50 hover:text-blue-600"}  rounded`}>
                    {labels.menu.dashboard}
                  </NavLink>
                </li>
                <li className="mb-1">
                  <NavLink to="/profile" className={({ isActive }) => `block p-3 text-sm font-semibold ${isActive ? "bg-blue-50 text-blue-600" : "text-gray-400 hover:bg-blue-50 hover:text-blue-600"}  rounded`}>
                    {labels.menu.profile}
                  </NavLink>
                </li>
                <li className="mb-1">
                  <NavLink to="/resume" className={({ isActive }) => `block p-3 text-sm font-semibold ${isActive ? "bg-blue-50 text-blue-600" : "text-gray-400 hover:bg-blue-50 hover:text-blue-600"}  rounded`}>
                    {labels.menu.resume}
                  </NavLink>
                </li>
                <li className="mb-1">
                  <NavLink to="/create-resume" className={({ isActive }) => `block p-3 text-sm font-semibold ${isActive ? "bg-blue-50 text-blue-600" : "text-gray-400 hover:bg-blue-50 hover:text-blue-600"}  rounded`}>
                    {labels.menu.createResume}
                  </NavLink>
                </li>
              </>

              }
              
            </ul>
          </div>
          <div className="mt-auto">
            {!user ? (
              <div className="pt-6">
                <Link to="/login" className="block px-4 py-3 mb-3 leading-loose text-xs text-center font-semibold leading-none bg-gray-50 hover:bg-gray-100 rounded-xl">
                  {labels.menu.login}
                </Link>
                <Link to="/signup" className="block px-4 py-3 mb-2 leading-loose text-xs text-center text-white font-semibold bg-blue-600 hover:bg-blue-700  rounded-xl">
                {labels.menu.signUp}
                </Link>
              </div>
            ) : (
              <button
                onClick={logout}
                className="w-full py-2 px-6 bg-gray-300 hover:bg-gray-100 text-sm text-gray-900 font-bold  rounded-xl transition duration-200"
              >
                {labels.menu.logout}
              </button>
            )}
            <p className="my-4 text-xs text-center text-gray-400">
              <span>{config.appFooterDescription}</span>
            </p>
          </div>
        </nav>
      </div>
    </div>
  );
}

export default Header;