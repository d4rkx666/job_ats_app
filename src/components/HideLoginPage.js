import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

function HideLoginPage({ children }) {
  const { user } = useAuth();

  // If the user is not logged in, redirect to the login page
  if (user) {
    return <Navigate to="/" replace />;
  }

  // If the user is logged in, render the children (protected component)
  return children;
}

export default HideLoginPage;