import React, { useState } from "react";
import SignUpForm from "../components/forms/SignUpForm";
import { useAuth } from "../contexts/AuthContext";
import { useConfig } from "../contexts/ConfigContext";
import { signup } from "../services/SetUser";
import {FirebaseLogin} from "../services/FirebaseLogin";
import { useNavigate } from "react-router-dom";

function SignupPage() {

   // Language
   const { config, language } = useConfig();
   const labels = config.labels[language];

   const navigate = useNavigate(); // For redirecting after login
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
               setError(labels.error.userAlreadyInUse);
               isError = true;
            });
         if (!isError) {
            await FirebaseLogin(data.email, data.password, login, navigate, labels.error.userNotFound);
            await resendVerificationEmail();
         }
      } catch (error) {
         setError(error.message)
      } finally {
         setIsLoading(false);
      }
   };

   return (
      <div className="min-h-screen items-center justify-center bg-gray-100 sm:pt-6">
         <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md mx-auto">
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