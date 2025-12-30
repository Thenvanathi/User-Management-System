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
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or{" "}
            <Link
              to="/signup"
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              create a new account
            </Link>
          </p>
        </div>

        <div className="bg-white py-8 px-4 shadow rounded-lg sm:px-10">
          <LoginForm onSubmit={handleLogin} loading={loading} error={error} />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
