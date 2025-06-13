"use client"
import React, { useState } from "react";
import LoginForm from "./components/form";
import { useAuth } from "@/app/contexts/AuthContext";
import { FirebaseLogin } from "@/app/hooks/FirebaseLogin";
import { useTranslations } from "next-intl";
import RedirectIfAuth from "@/utils/RedirectIfAuth";

function Login() {

   // Language
   const t = useTranslations('menu');
   const e = useTranslations('error');

   const { login, logout } = useAuth(); // Get the login function from AuthContext

   const [isLoading, setIsLoading] = useState(false);
   const [error, setError] = useState("");

   // Login actions
   const handleLogin = async (data) => {
      setIsLoading(true);
      setError("");
      try {
         // get current_work in case user haven't login
         const params = new URLSearchParams(window.location.search);
         const current_work = params.get('current_work');

         // Log in user from firebase
         await FirebaseLogin(data.email, data.password, login, e("userNotFound"), current_work);
      } catch (error) {
         console.log(error)
         await logout()
         setError(e("userNotFound"))
      } finally {
         setIsLoading(false);
      }
   };

   return (
      <div className="min-h-screen items-center justify-center bg-gray-100 sm:pt-6">
         <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md mx-auto">
            <div>
               <h1 className="text-3xl font-bold mb-6 text-center">{t("login")}</h1>
               {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
               <LoginForm onSubmit={handleLogin}
                  isLoading={isLoading} />
            </div>
         </div>
      </div>
   );
}

export default RedirectIfAuth(Login);