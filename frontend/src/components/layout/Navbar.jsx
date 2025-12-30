import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Navbar = () => {
  const { user, isAuthenticated, logout, isAdmin } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-xl font-bold text-blue-600">
          User Management System
        </Link>

        {/* Right side */}
        <div className="flex items-center gap-4">
          {!isAuthenticated && (
            <>
              <Link to="/login" className="text-gray-600 hover:text-blue-600">
                Login
              </Link>
              <Link to="/signup" className="text-gray-600 hover:text-blue-600">
                Signup
              </Link>
            </>
          )}

          {isAuthenticated && (
            <>
              <Link to="/" className="text-gray-600 hover:text-blue-600">
                Dashboard
              </Link>

              <Link to="/profile" className="text-gray-600 hover:text-blue-600">
                Profile
              </Link>

              {isAdmin() && (
                <Link to="/admin" className="text-gray-600 hover:text-blue-600">
                  Admin
                </Link>
              )}

              <span className=" text-gray-500">{user?.fullName}</span>

              <button
                onClick={handleLogout}
                className="text-red-600 hover:text-red-700 font-medium"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
