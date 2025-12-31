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
  <nav className="sticky top-0 z-50 bg-black/60 backdrop-blur-xl border-b border-white/10">
    <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

      {/* Logo */}
      <Link
        to="/"
        className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent"
      >
        User Management System
      </Link>

      {/* Right side */}
      <div className="flex items-center gap-6 text-sm">

        {!isAuthenticated && (
          <>
            <Link
              to="/login"
              className="text-gray-300 hover:text-white transition"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="px-4 py-2 rounded-md
              bg-blue-600/80 text-white
              hover:bg-blue-600 transition"
            >
              Signup
            </Link>
          </>
        )}

        {isAuthenticated && (
          <>
            <Link to="/" className="text-gray-300 hover:text-white transition">
              Dashboard
            </Link>

            <Link
              to="/profile"
              className="text-gray-300 hover:text-white transition"
            >
              Profile
            </Link>

            {isAdmin() && (
              <Link
                to="/admin"
                className="text-purple-400 hover:text-purple-300 transition"
              >
                Admin
              </Link>
            )}

            {/* User badge */}
            <span className="
              px-3 py-1 rounded-full
              bg-white/10 border border-white/20
              text-gray-200 text-xs
            ">
              {user?.fullName}
            </span>

            <button
              onClick={handleLogout}
              className="text-red-400 hover:text-red-300 font-medium transition"
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
