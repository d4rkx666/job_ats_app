import React, { createContext, useContext, useState, useEffect } from "react";
import { auth } from "../services/firebase"; // Adjust the import path as needed
import { onAuthStateChanged, sendEmailVerification } from "firebase/auth";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null); // Store the logged-in user
  const [verified, setVerified] = useState(false);

  // Check if user is verified
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser && firebaseUser.emailVerified) {
        setVerified(true);
      }
    });

    const storedUser = JSON.parse(localStorage.getItem("data_user"));
    if (storedUser != null) {
      setUser(storedUser); // Restore user data
    }

    return () => unsubscribe(); // Cleanup subscription
  }, []);


  // Resend verification email
  const resendVerificationEmail = async () => {
    if (auth.currentUser) {
      try {
        await sendEmailVerification(auth.currentUser);
      } catch (error) {
        
      }
    } else {
      alert("No user is signed in.");
    }
  };

  // Login function
  const login = (userData) => {
    localStorage.setItem("data_user", JSON.stringify(userData));
    setUser(userData); // Set the user data
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem("data_user");
    setUser(null); // Clear the user data
  };

  return (
    <AuthContext.Provider value={{ user, auth, verified, login, logout, resendVerificationEmail }}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook to use the AuthContext
export function useAuth() {
  return useContext(AuthContext);
}