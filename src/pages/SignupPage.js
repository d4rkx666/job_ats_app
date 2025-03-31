import React, { useState } from "react";
import SignUpForm from "../components/forms/SignUpForm";
import { useAuth } from "../contexts/AuthContext";
import { useConfig } from "../contexts/ConfigContext";
import { signup } from "../services/SetUser";
import firebase_login from "./LoginPage";

function SignupPage() {

   // Language
   const { config, language } = useConfig();
   const labels = config.labels[language];

   const { resendVerificationEmail } = useAuth(); // Get the login function from AuthContext
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
               setError(labels.error.userAlreadyInUse);
               isError = true;
            });

         if (!isError) {
            await firebase_login(data.email, data.password);
            await resendVerificationEmail();
         }
      } catch (error) {
         setError(error.message)
      } finally {
         setIsLoading(false);
      }
   };

   return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
         <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
            <div>
               <h1 className="text-3xl font-bold mb-6 text-center">{labels.menu.signUp}</h1>
               {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
               <SignUpForm onSubmit={handleSignUp}
                  isLoading={isLoading}
                  labels={labels} />
            </div>

         </div>
      </div>
   );
}

export default SignupPage;