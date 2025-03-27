import React from "react";
import { Link } from "react-router-dom";
import LanguageSwitcher from "../common/LanguageSwitcher"
import { useConfig } from "../../contexts/ConfigContext";
import { useAuth } from "../../contexts/AuthContext";

function Header() {
  const { config, language } = useConfig();
  const labels = config.labels[language];

  const {user, logout} = useAuth();
  
  return (
    <header className="flex justify-between items-center p-4 bg-blue-600 text-white shadow-lg">
      {/* App Name */}
      <div className="text-2xl font-bold">
        <Link to="/" className="text-white no-underline hover:text-blue-200 transition duration-300">
          {config.appName}
        </Link>
      </div>

      {/* Navigation Links */}
      <nav className="flex items-center gap-6">
        <Link to="/" className="text-white no-underline hover:text-blue-200 transition duration-300">
          {labels.menu.home}
        </Link>
        <Link to="/resume" className="text-white no-underline hover:text-blue-200 transition duration-300">
          {labels.menu.resume}
        </Link>
        {!user ? (
          <Link to="/login" className="text-white no-underline hover:text-blue-200 transition duration-300">
            {labels.menu.login}
          </Link>
        ) : (
          <button
            onClick={logout}
            className="text-white no-underline hover:text-blue-200 bg-transparent border-none cursor-pointer transition duration-300"
          >
            {labels.menu.logout}
          </button>
        )}

        {/* Language Switcher */}
        <LanguageSwitcher />
      </nav>
    </header>
  );
}

export default Header;