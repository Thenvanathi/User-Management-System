import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SignupForm from "./SignupForm";
import { useAuth } from "../../context/AuthContext";
import useToast from "../../hooks/userToast";

const SignupPage = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { signup } = useAuth();
  const navigate = useNavigate();
  const { showSuccess, showError } = useToast();

  const handleSignup = async (userData) => {
    setLoading(true);
    setError("");

    const result = await signup(userData);

    if (result.success) {
      showSuccess("Account created successfully! Please login.");
      navigate("/login");
    } else {
      showError(result.message || "Signup failed. Please try again.");
      setError(result.message || "Signup failed. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-gray-800 px-4">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
            Create your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-400">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              Sign in here
            </Link>
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6">
          <SignupForm onSubmit={handleSignup} loading={loading} error={error} />

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  All fields marked * are required
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
