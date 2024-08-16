import { useContext, useEffect } from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuthStore from "../store/authStore";

// Track if user logged in or not
const RequireAuth = () => {
  const { auth } = useAuthStore();

  const location = useLocation();

  // return authUsername ? (
  //   <Outlet />
  // ) : isAuthenticated ? (
  //   <Navigate to="/unauthorized" state={{ from: location }} replace />
  // ) : (
  //   <Navigate to="/login" state={{ from: location }} replace />
  // );

  useEffect(() => {
    console.log({ auth });
  }, []);

  return auth?.authUsername !== undefined ? (
    <Outlet />
  ) : auth?.isAuthenticated ? (
    <Navigate to="/unauthorized" state={{ from: location }} replace />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default RequireAuth;
