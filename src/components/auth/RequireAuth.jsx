import React from "react";
import { Navigate, Outlet, useLocation } from "react-router";
import { useAuth } from "./AuthContext";

export const RequireAuth = () => {
  const { user, isReady } = useAuth();
  const location = useLocation();

  if (!isReady) return <div>Loading...</div>;
  if (!user) {
    // redirect ONLY from protected routes
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return <Outlet />;
};
