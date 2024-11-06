import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("ACCESS_TOKEN");

  // Si no hay token, redirige a la página de login
  if (!token) {
    return <Navigate to="/auth/login" />;
  }

  return children;
};

export default PrivateRoute;
