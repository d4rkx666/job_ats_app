import React, { createContext, useContext, useState, useEffect } from "react";
import { auth, db } from "../services/firebase";
import { onAuthStateChanged, sendEmailVerification, signOut, reload, getIdToken  } from "firebase/auth";
import { doc, onSnapshot } from "firebase/firestore"; // Import Firestore functions

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null); // Store the logged-in user
  const [verified, setVerified] = useState(true);
  const [improvementsLeft] = useState(0);

  // Check if user is verified
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {

      if (firebaseUser){
        
        // Detect email verified
        setVerified(firebaseUser.emailVerified);

        // Listen to Firestore updates for the user's document
        const userRef = doc(db, "users", firebaseUser.uid);
        const unsubscribeFirestore = onSnapshot(userRef, (doc) => {
          if (doc.exists()) {
            const userData = doc.data();
            userData.token = firebaseUser.accessToken;
            updateUserData(userData);
          } else {
          }
        });

        // Clean up the Firestore listener when the component unmounts
        return () => unsubscribeFirestore();
      }
    });

    preventUserDataLostRefreshing();

    return () => unsubscribe(); // Cleanup subscription
  }, []);


  // Check every 10 secs if user is verified
  useEffect(() => {
    let intervalId;
  
    if (user && !verified) {
      intervalId = setInterval(async () => {
        try {

          const newToken = await generateNewToken(auth.currentUser);
          updateCurrentUserToken(newToken);
  
          if (auth.currentUser.emailVerified) {
            setVerified(auth.currentUser.emailVerified);
            clearInterval(intervalId); // Stop polling once verified
          }
        } catch (error) {
          //console.error("Error refreshing user state:", error);
        }
      }, 3000); // Poll every 10 seconds
    }
  
    return () => {
      if (intervalId) clearInterval(intervalId); // Cleanup interval on unmount
    };
  }, [user, verified]);

  // Resend verification email
  const resendVerificationEmail = async () => {
    if (auth.currentUser && !auth.currentUser.emailVerified) {
      try {
        await sendEmailVerification(auth.currentUser);
      } catch (error) {
        console.log(error)
      }
    } else {
      //console.log("No user is signed in.");
    }
  };

  // Login function
  const login = (userData, token) => {
    userData.token = token;
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


  // Get new token
  async function generateNewToken(firebaseUser){
    // Reload the user to get the latest email verification status
    await reload(firebaseUser);
    const newToken = await getIdToken(firebaseUser, true); // Force token refresh
    return newToken;
  }

  //update token
  function updateCurrentUserToken(newToken){
    const storedUser = JSON.parse(localStorage.getItem("data_user"));
    storedUser.token = newToken;
    localStorage.setItem("data_user", JSON.stringify(storedUser));
  }

  // Prevent user data lost from refreshing
  function preventUserDataLostRefreshing(){
    const storedUser = JSON.parse(localStorage.getItem("data_user"));
    if (storedUser != null) {
      setUser(storedUser); // Restore user data
    }
  }
  
  // Update user data
  function updateUserData(newUserData){
    localStorage.setItem("data_user", JSON.stringify(newUserData));
    setUser((prevUser) => ({
      ...prevUser,
      ...newUserData, // Merge Firestore data with existing user data
    }));
  }
}

// Custom hook to use the AuthContext
export function useAuth() {
  return useContext(AuthContext);
}