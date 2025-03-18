import React from "react";
import { useConfig } from "../../contexts/ConfigContext";

function Footer() {
  const { config } = useConfig();
  return (
    <footer className="p-5 bg-gray-100 text-center border-t border-gray-300">
      <p className="text-gray-600 m-0">{config.appFooterDescription}</p>
    </footer>
  );
}

export default Footer;