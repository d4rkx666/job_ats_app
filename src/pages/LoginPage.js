import React, { useState } from "react";
import LoginForm from "../components/forms/LoginForm";
import { useConfig } from "../contexts/ConfigContext";
import { useAuth } from "../contexts/AuthContext";
import {FirebaseLogin} from "../services/FirebaseLogin"
import { useNavigate } from "react-router-dom";

function Login() {

   // Language
   const { config, language } = useConfig();
   const labels = config.labels[language];
   
   const navigate = useNavigate(); // For redirecting after login

   const { login, logout } = useAuth(); // Get the login function from AuthContext

   const [isLoading, setIsLoading] = useState(false);
   const [error, setError] = useState("");

   // Login actions
   const handleLogin = async (data) => {
      setIsLoading(true);
      setError("");
      try {
         // Log in user from firebase
         await FirebaseLogin(data.email, data.password, login, navigate, labels.error.userNotFound);
      } catch (error) {
         await logout()
         setError(labels.error.userNotFound)
      } finally {
         setIsLoading(false);
      }
   };

   return (
      <div className="min-h-screen items-center justify-center bg-gray-100 sm:pt-6">
         <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md mx-auto">
            <div>
               <h1 className="text-3xl font-bold mb-6 text-center">{labels.menu.login}</h1>
               {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
               <LoginForm onSubmit={handleLogin}
                  isLoading={isLoading}
                  labels={labels} />
            </div>
         </div>
      </div>
   );
}

export default Login;