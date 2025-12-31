import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import LoginForm from "./LoginForm";
import { useAuth } from "../../context/AuthContext";
import useToast from "../../hooks/userToast";

const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { showSuccess, showError } = useToast();

  const from = location.state?.from?.pathname || "/";

  const handleLogin = async (credentials) => {
    setLoading(true);
    setError("");

    const result = await login(credentials);

    if (result.success) {
      showSuccess("Login successful!");
      navigate(from, { replace: true });
    } else {
      showError(result.message || "Invalid email or password");
      setError(result.message || "Invalid email or password");
      setLoading(false);
    }
  };

  return (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-gray-800 px-4">

    {/* Glass Card */}
    <div className="
      relative w-full max-w-md
      bg-white/10 backdrop-blur-xl
      border border-white/20
      rounded-2xl shadow-2xl
      transform transition duration-500
      hover:scale-[1.03] hover:rotate-1
    ">

      {/* Glow effect */}
      <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl blur opacity-30"></div>

      {/* Content */}
      <div className="relative bg-black/60 rounded-2xl px-8 py-10">

        <h2 className="text-center text-3xl font-bold text-white mb-2">
          Welcome Back
        </h2>

        <p className="text-center text-sm text-gray-300 mb-6">
          Sign in to continue
        </p>

        <LoginForm
          onSubmit={handleLogin}
          loading={loading}
          error={error}
        />

        <p className="mt-6 text-center text-sm text-gray-400">
          Don’t have an account?{" "}
          <Link
            to="/signup"
            className="text-blue-400 hover:text-blue-300 font-medium"
          >
            Create one
          </Link>
        </p>

      </div>
    </div>
  </div>
);

};

export default LoginPage;
