import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PublicRoute = ({ children }) => {
  const { userData } = useSelector((state) => state.user);

  if (userData) {
    if (userData.role === "owner") return <Navigate to="/owner/dashboard" replace />;
    if (userData.role === "delivery") return <Navigate to="/delivery/dashboard" replace />;
    return <Navigate to="/" replace />;
  }

  return children;
};

export default PublicRoute;
