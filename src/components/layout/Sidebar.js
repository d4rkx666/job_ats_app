import React from "react";
import { Link } from "react-router-dom";
import {useConfig} from "../../contexts/ConfigContext"

function Sidebar() {
  const {config, language} = useConfig();
  const labels = config.labels[language];
  return (
    <aside className="w-64 p-5 bg-gray-100 border-r border-gray-300">
      <nav className="flex flex-col gap-2">
        <Link to="/dashboard" className="text-blue-600 no-underline">{labels.menu.dashboard}</Link>
        <Link to="/profile" className="text-blue-600 no-underline">{labels.menu.profile}</Link>
        <Link to="/resume" className="text-blue-600 no-underline">{labels.menu.resume}</Link>
        <Link to="/create-resume" className="text-blue-600 no-underline">{labels.menu.createResume}</Link>
      </nav>
    </aside>
  );
}

export default Sidebar;