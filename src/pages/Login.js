import React, { useState } from "react";
import LoginForm from "../components/forms/LoginForm";
import SignUpForm from "../components/forms/SignUpForm";
import { signInWithEmailAndPassword} from "firebase/auth";
import { auth, db} from "../services/firebase"
import { doc, getDoc } from "firebase/firestore";
import { useAuth } from "../contexts/AuthContext";
import { useConfig } from "../contexts/ConfigContext";
import { useNavigate } from "react-router-dom";
import {signup} from "../services/SetUser"

function Login() {

   // Language
   const {config, language} = useConfig();
   const labels = config.labels[language];

   const { login, logout, resendVerificationEmail } = useAuth(); // Get the login function from AuthContext
   const [isLoading, setIsLoading] = useState(false);
   const [error, setError] = useState("");
   const navigate = useNavigate(); // For redirecting after login

   const [showLoginForm, setShowLoginForm] = useState(true);
   const [showSignUpForm, setShowSignUpForm] = useState(false);
   const [showForgetPassword, setShowForgetPassword] = useState(false);


   // Firebase login function
   async function firebase_login(email, password){
      // Log in user from firebase
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const userId = await userCredential.user.uid;
      const token = await userCredential.user.getIdToken();

      // Get info from firestore
      const userDoc = await getDoc(doc(db, "users", userId));

      if (userDoc.exists()) {
         const newData = userDoc.data();
         await login(newData, token); // set user info to localstorage
         await navigate("/dashboard"); // Redirect to the dashboard
      } else {
         throw new Error(labels.error.userNotFound);
      } 
   }


   // Login actions
   const handleLogin = async (data) => {
      setIsLoading(true);
      setError("");
      try {
         // Log in user from firebase
         await firebase_login(data.email, data.password);
      } catch (error) {
         await logout()
         setError(labels.error.userNotFound)
      } finally {
         setIsLoading(false);
      }
   };

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

         if(!isError){
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
         {showLoginForm ?
         (
            <div>
               <h1 className="text-3xl font-bold mb-6 text-center">{labels.menu.login}</h1>
               {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
               <LoginForm onSubmit={handleLogin}
                  onSwitchToSignUp={() => {
                     setShowLoginForm(false);
                     setShowForgetPassword(false);
                     setShowSignUpForm(true);}}
                     isLoading={isLoading}
                     labels={labels}/>
            </div>
         )
         
         : (
            showSignUpForm ? 
            (
               <div>
                  <h1 className="text-3xl font-bold mb-6 text-center">{labels.menu.login}</h1>
                  {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
                  <SignUpForm onSubmit={handleSignUp}
                     onSwitchToLogin={() => {
                     setShowLoginForm(true);
                     setShowForgetPassword(false);
                     setShowSignUpForm(false);}}
                     isLoading={isLoading}
                     labels={labels}/>
               </div>
            ) : (
               showForgetPassword ? 
               (
                  <div>
                     <h1 className="text-3xl font-bold mb-6 text-center">{labels.menu.login}</h1>
                     {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
                     <LoginForm onSubmit={handleLogin} isLoading={isLoading}
                     labels={labels}/>
                  </div>
               ) : ""
            )
         )}
         
      </div>
   </div>
   );
}

export default Login;