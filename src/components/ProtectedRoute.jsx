import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import AuthContext from "../store/AuthContext";

export default function ProtectedRoute() {
  const { isAuthenticated } = useContext(AuthContext);

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
}
