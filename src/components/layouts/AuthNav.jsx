
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/FetchUser";
import toast from "react-hot-toast";

const AuthNav = () => {
  const { user, logout } = useAuth();

  let handleLogout = () => {
    logout();
    localStorage.removeItem("TOKEN");
    toast.success("successfully user has been loggedout");
    console.log(`${user?.name}`);
    window.location.assign("/auth/login");
  };

  return (
    <>
      <li>
        <Link to="/">Dashboard</Link>
      </li>

      <li>
        {user?.role === "user" ? (
          <Link to="/courses">Courses</Link>
        ) : (
          <Link to="/admin/courses">Courses</Link>
        )}
      </li>

      <li>
        {user?.role === "admin" ? (
          <Link to="/admin/admin-dashboard">
            {user?.name}
          </Link>
        ) : (
          <Link to="/user/profile">
            {user?.name}
          </Link>
        )}
      </li>

      <li>
        <button onClick={handleLogout}>Logout</button>
      </li>
    </>
  );
};

export default AuthNav;