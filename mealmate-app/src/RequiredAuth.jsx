import { useContext } from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuthStore from "./store/authStore";

// Track if user logged in or not
const RequireAuth = () => {
  const { authUsername, isAuthenticated } = useAuthStore();

  const location = useLocation();

  return authUsername ? (
    <Outlet />
  ) : isAuthenticated ? (
    <Navigate to="/unauthorized" state={{ from: location }} replace />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default RequireAuth;
