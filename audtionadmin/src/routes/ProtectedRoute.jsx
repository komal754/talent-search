import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoute() {
  const isAuthenticated = localStorage.getItem("login");
  console.log(isAuthenticated);
  if (!isAuthenticated) {
    return <Navigate to="/auth/login" replace />;
  }

  return <Outlet />;
}

export default ProtectedRoute;
