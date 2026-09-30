import { Navigate, Outlet, Link } from "react-router-dom";
import { AuthContext } from "../state-management/contextApi";
import { useContext } from "react";
import { useAuth } from "../hooks/FetchUser";
import Spinner from "../spinner";

const ProtectedRoute = () => {
  const { user, loading } = useAuth();
  const { token } = useContext(AuthContext);

  if (loading) {
    return <Spinner />;
  }

  if (token) {
    if (user?.role?.toLowerCase() === "user") {
      return <Outlet />;
    } else {
      return (
        <div>
          <h2>Access Restricted</h2>
          <p>
            {user?.name}, you don't have permission to access this page.
          </p>
          <Link to="/">Return Home</Link>
        </div>
      );
    }
  } else {
    if (!user) {
      return <Navigate to="/auth/login" replace />;
    }
  }

  return null;
};

export default ProtectedRoute;