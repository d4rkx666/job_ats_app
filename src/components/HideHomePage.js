import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

function HideHomePage({ children }) {
  const { user } = useAuth();

  // If the user is logged in, redirect to the dashboard
  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  // If the user is logged in, render the children (protected component)
  return children;
}

export default HideHomePage;