import React, { createContext, useContext, useState, useEffect } from "react";
import { auth, db } from "../services/firebase";
import { onAuthStateChanged, sendEmailVerification, signOut, reload, getIdToken  } from "firebase/auth";
import { doc, onSnapshot } from "firebase/firestore"; // Import Firestore functions

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null); // Store the logged-in user
  const [verified, setVerified] = useState(false);
  const [improvementsLeft, setImprovementsLeft] = useState(0);

  // Check if user is verified
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {

      if (firebaseUser){
        // Reload the user to get the latest email verification status
        await reload(firebaseUser);
        const newToken = await getIdToken(firebaseUser, true); // Force token refresh

        if(firebaseUser.emailVerified) {
          setVerified(true);
        }

        // Listen to Firestore updates for the user's document
        const userRef = doc(db, "users", firebaseUser.uid);
        const unsubscribeFirestore = onSnapshot(userRef, (doc) => {
          if (doc.exists()) {
            const userData = doc.data();
            const { resumeImprovements, maximumImprovements } = userData.settings;

            // Calculate improvements left
            const improvementsLeft = maximumImprovements - resumeImprovements;
            setImprovementsLeft(improvementsLeft);

            // Update the user state with the latest Firestore data and new token
            const newUserData = {
              ...userData,
              token: newToken, // Use the new token
            };
            
            localStorage.setItem("data_user", JSON.stringify(newUserData));
            setUser((prevUser) => ({
              ...prevUser,
              ...newUserData, // Merge Firestore data with existing user data
            }));
          } else {
          }
        });

        // Clean up the Firestore listener when the component unmounts
        return () => unsubscribeFirestore();
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
    if (auth.currentUser && !auth.currentUser.emailVerified) {
      try {
        await sendEmailVerification(auth.currentUser);
      } catch (error) {
        console.log(error)
      }
    } else {
      console.log("No user is signed in.");
    }
  };

  // Login function
  const login = (userData) => {
    localStorage.setItem("data_user", JSON.stringify(userData));
    setUser(userData); // Set the user data
  };

  // Logout function
  const logout = () => {
    signOut(auth);
    localStorage.removeItem("data_user");
    setUser(null); // Clear the user data
  };

  return (
    <AuthContext.Provider value={{ user, auth, verified, improvementsLeft, login, logout, resendVerificationEmail }}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook to use the AuthContext
export function useAuth() {
  return useContext(AuthContext);
}