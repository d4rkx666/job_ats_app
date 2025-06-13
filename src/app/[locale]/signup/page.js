"use client"
import React, { useEffect, useState, useTransition } from "react";
import SignUpForm from "./components/SignUpForm";
import { useAuth } from "@/app/contexts/AuthContext";
import { signup } from "@/app/hooks/SetUser";
import { FirebaseLogin } from "@/app/hooks/FirebaseLogin";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import Loader from "@/app/components/common/Loader";

function SignupPage() {

   // Language
   const t = useTranslations("error");
   const m = useTranslations("menu");

   const [isPending, startTransition] = useTransition();
   const [loading, setLoading] = useState(false);

   const router = useRouter(); // For redirecting after login
   const { resendVerificationEmail, login } = useAuth(); // Get the login function from AuthContext
   const [isLoading, setIsLoading] = useState(false);
   const [error, setError] = useState("");

   // Sign Up actions
   const handleSignUp = async (data) => {
      setIsLoading(true);
      setError("");
      try {
         let isError = false;
         // Sign up user 
         await signup(data.name, data.country, data.email, data.password)
            .catch(error => {
               console.error(error)
               setError(t("userAlreadyInUse"));
               isError = true;
            });
         if (!isError) {
            // get current_work in case user haven't login
            const params = new URLSearchParams(window.location.search);
            const current_work = params.get('current_work');

            await FirebaseLogin(data.email, data.password, login, router, startTransition, t("userNotFound"));
            await resendVerificationEmail();
            if(current_work){
               window.close();
            }
         }
      } catch (error) {
         setError(error.message)
      } finally {
         setIsLoading(false);
      }
   };

   useEffect(()=>{
      if (isPending) {
         setLoading(true);
      } else {
         setLoading(false);
      }
   },[isPending])

   if(loading) return <Loader />;

   return (
      <div className="min-h-screen items-center justify-center bg-gray-100 sm:pt-6">
         <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md mx-auto">
            <div>
               <h1 className="text-3xl font-bold mb-6 text-center">{m("signUp")}</h1>
               {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
               <SignUpForm onSubmit={handleSignUp}
                  isLoading={isLoading} />
            </div>

         </div>
      </div>
   );
}

export default SignupPage;