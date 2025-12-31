import { useState } from "react";

const LoginForm = ({ onSubmit, loading, error }) => {
  const [emailId, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ emailId, password });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-50 text-red-700 p-3 rounded-md text-sm">
          {error}
        </div>
      )}

      {/* Email */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Email Address
        </label>
        <input
          type="email"
          value={emailId}
          onChange={(e) => setEmail(e.target.value)}
          className="
  w-full px-3 py-2 pr-10
  bg-black/40 text-white
  border border-white/20
  rounded-md
  placeholder-gray-400
  focus:outline-none
  focus:ring-2 focus:ring-blue-500
"
          placeholder="Enter your email"
          required
        />
      </div>

      {/* Password with Eye Icon */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Password
        </label>

        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="
  w-full px-3 py-2 pr-10
  bg-black/40 text-white
  border border-white/20
  rounded-md
  placeholder-gray-400
  focus:outline-none
  focus:ring-2 focus:ring-blue-500
"
            placeholder="Enter your password"
            required
          />

          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-3 flex items-center text-gray-500"
          >
            {showPassword ? (
              // Eye
              <svg
                width="20"
                height="20"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 6c5 0 9 4 10 6-1 2-5 6-10 6S3 14 2 12c1-2 5-6 10-6zm0 10a4 4 0 100-8 4 4 0 000 8z" />
              </svg>
            ) : (
              // Eye Off
              <svg
                width="20"
                height="20"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 6c5 0 9 4 10 6-1 2-5 6-10 6S3 14 2 12c1-2 5-6 10-6zm0 10a4 4 0 100-8 4 4 0 000 8z" />
                <line
                  x1="3"
                  y1="3"
                  x2="21"
                  y2="21"
                  stroke="currentColor"
                  strokeWidth="2"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? "Logging in..." : "Login"}
      </button>
    </form>
  );
};

export default LoginForm;
