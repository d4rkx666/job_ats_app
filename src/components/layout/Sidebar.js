import React from "react";
import { NavLink } from "react-router-dom";
import {useConfig} from "../../contexts/ConfigContext"

function Sidebar() {
  const {config, language} = useConfig();
  const labels = config.labels[language];
  return (
    <aside className="hidden lg:flex w-64 p-5 border-r border-blue-100">
      <nav className="flex flex-col gap-2">
        <NavLink to="/dashboard" className={({ isActive }) => `text-sm ${isActive ? "text-blue-600 font-bold" : "text-gray-400 hover:text-gray-500"}`}>{labels.menu.dashboard}</NavLink>
        <NavLink to="/profile" className={({ isActive }) => `text-sm ${isActive ? "text-blue-600 font-bold" : "text-gray-400 hover:text-gray-500"}`}>{labels.menu.profile}</NavLink>
        <NavLink to="/resume" className={({ isActive }) => `text-sm ${isActive ? "text-blue-600 font-bold" : "text-gray-400 hover:text-gray-500"}`}>{labels.menu.resume}</NavLink>
        <NavLink to="/create-resume" className={({ isActive }) => `text-sm ${isActive ? "text-blue-600 font-bold" : "text-gray-400 hover:text-gray-500"}`}>{labels.menu.createResume}</NavLink>
      </nav>
    </aside>
  );
}

export default Sidebar;