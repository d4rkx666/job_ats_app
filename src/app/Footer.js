"use client"
import React from "react";

function Footer() {
  return (
    <footer className="p-5 bg-gray-100 text-center border-t border-gray-300">
      <p className="text-gray-600 m-0">© {new Date().getFullYear()} {process.env.NEXT_PUBLIC_NAME}. All rights reserved.</p>
    </footer>
  );
}

export default Footer;