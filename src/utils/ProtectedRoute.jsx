import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children, isProtected }) => {
  const { userData, isLoading } = useSelector((state) => state.user);
  const location = useLocation();

  // if (isLoading) {
  //  return  <h1>Loading....</h1>
  // }

  // 🔒 Step 2: If route is protected and user is NOT logged in → go to login
  if (isProtected && !userData) {
    return (
      <Navigate
        to="/signin"
        replace
        state={{ from: location.pathname }} // save last page
      />
    );
  }

  // 🏠 Step 3: If route is public (signin/signup) and user already logged in → stay where you are
  if (!isProtected && userData) {
    // only redirect if user goes manually to signin/signup
    if (location.pathname === "/signin" || location.pathname === "/signup") {
      return <Navigate to="/" replace />;
    }
  }

  // ✅ Step 4: Otherwise render normally
  return children ? children : <Outlet />;
};

export default ProtectedRoute;
