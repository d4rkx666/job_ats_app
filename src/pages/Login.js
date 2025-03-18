import React, { useState } from "react";
//import { useAuth } from "../contexts/AuthContext";
import LoginForm from "../components/forms/LoginForm";
import SignUpForm from "../components/forms/SignUpForm";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { auth, db} from "../services/firebase"
import { doc, getDoc, setDoc } from "firebase/firestore";
import {fetchLogin} from "../services/Auth"
import { useAuth } from "../contexts/AuthContext";
import { useConfig } from "../contexts/ConfigContext";
import { useNavigate } from "react-router-dom";

function Login() {
   const { login, logout } = useAuth(); // Get the login function from AuthContext
   const [isLoading, setIsLoading] = useState(false);
   const [error, setError] = useState("");
   const navigate = useNavigate(); // For redirecting after login

   const {config, language} = useConfig();
   const labels = config.labels[language];

   const [showLoginForm, setShowLoginForm] = useState(true);
   const [showSignUpForm, setShowSignUpForm] = useState(false);
   const [showForgetPassword, setShowForgetPassword] = useState(false);


   // Login actions
   const handleLogin = async (data) => {
      setIsLoading(true);
      setError("");
      try {
         // Log in user from firebase
         const userCredential = await signInWithEmailAndPassword(auth, data.email, data.password);
         const userId = await userCredential.user.uid;
         const idToken = await userCredential.user.getIdToken();

         // Get info from firestore
         const userDoc = await getDoc(doc(db, "users", userId));

         if (userDoc.exists()) {
            const newData = userDoc.data();
            newData.token = idToken; //asign additional data (id token) to the user data 
            await login(newData); // set user info to localstorage
            await fetchLogin(); //validates login through BACKEND
            await navigate("/dashboard"); // Redirect to the dashboard
         } else {
            throw new Error("User data not found in Firestore.");
         } 
      } catch (error) {
         await logout()
         setError(error.message)
      } finally {
         setIsLoading(false);
      }
   };

   // Sign Up actions
   const handleSignUp = async (data) => {
      setIsLoading(true);
      setError("");
      try {
         const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password);
         const user = await userCredential.user;

         await setDoc(doc(db, "users", user.uid), {
            name: data.name,
            country: data.country,
            email: user.email,
            maximumImprovements: 10,
            resumeImprovements: 0, // Initialize usage limit
            createdAt: new Date(),
         });

         //Send verification
         await sendEmailVerification(user);

         // Get info from firestore
         const userDoc = await getDoc(doc(db, "users", user.uid));
         if (userDoc.exists()) {
            const newData = userDoc.data();
            await login(newData);
            await navigate("/dashboard"); // Redirect to the dashboard
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