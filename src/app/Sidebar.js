"use client"

import React from "react";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { usePathname } from "next/navigation";

function Sidebar() {
  const t = useTranslations("menu")
  const locale = useLocale();
  
  const currentPath = usePathname();
  const fixedPath = (string)=>{
    if(string === "/"){
      string = "";
    }
    return `/${locale}${string}`
  }

  return (
    <aside className="hidden lg:flex w-60 p-5 border-r border-blue-100 sticky top-20">
      <nav className="flex flex-col gap-2">
        <Link href="/dashboard" className={`text-sm ${currentPath === fixedPath("/dashboard") ? "text-blue-600 font-bold" : "text-gray-400 hover:text-gray-500"}`}>{t("dashboard")}</Link>
        <Link href="/profile" className={`text-sm ${currentPath === fixedPath("/profile") ? "text-blue-600 font-bold" : "text-gray-400 hover:text-gray-500"}`}>{t("profile")}</Link>
        <Link href="/resume-advisor" className={`text-sm ${currentPath === fixedPath("/resume-advisor") ? "text-blue-600 font-bold" : "text-gray-400 hover:text-gray-500"}`}>{t("resume")}</Link>
        <Link href="/create-resume" className={`text-sm ${currentPath === fixedPath("/create-resume") ? "text-blue-600 font-bold" : "text-gray-400 hover:text-gray-500"}`}>{t("createResume")}</Link>
      </nav>
    </aside>
  );
}

export default Sidebar;