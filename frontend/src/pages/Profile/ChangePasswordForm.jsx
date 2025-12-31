import { useState } from "react";
import { userService } from "../../Services/userService";

const ChangePasswordForm = () => {
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const validate = () => {
    const newErrors = {};

    if (!formData.currentPassword) {
      newErrors.currentPassword = "Current password is required";
    }

    if (!formData.newPassword) {
      newErrors.newPassword = "New password is required";
    } else if (formData.newPassword.length < 8) {
      newErrors.newPassword = "Password must be at least 8 characters";
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.newPassword)) {
      newErrors.newPassword = "Must include uppercase, lowercase, and number";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ type: "", text: "" });

    if (!validate()) return;

    setLoading(true);

    try {
      const payload = {
        currentPassword: formData.currentPassword,
        newPassword: formData.newPassword,
        confirmPassword: formData.confirmPassword,
      };

      await userService.changePassword(payload);

      setMessage({
        type: "success",
        text: "Password changed successfully!",
      });

      // Reset form
      setFormData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      setErrors({});
    } catch (error) {
      setMessage({
        type: "error",
        text: error.response?.data?.message || "Failed to change password",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  return (
    <form
  onSubmit={handleSubmit}
  className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6"
>
      <h3 className="text-lg font-semibold text-white mb-4">
        Change Password
      </h3>

      {message.text && (
        <div
          className={`mb-4 p-3 rounded-md text-sm ${
            message.type === "success"
  ? "bg-green-500/10 text-green-300"
  : "bg-red-500/10 text-red-300"
          }`}
        >
          {message.text}
        </div>
      )}

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Current Password *
          </label>
          <input
            type="password"
            name="currentPassword"
            value={formData.currentPassword}
            onChange={handleChange}
            className={`w-full px-3 py-2 bg-black/40 text-white border rounded-md
focus:outline-none focus:ring-2 focus:ring-blue-500
${errors.currentPassword ? "border-red-500" : "border-white/20"}`}
          />
          {errors.currentPassword && (
            <p className="mt-1 text-sm text-red-600">
              {errors.currentPassword}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            New Password *
          </label>
          <input
            type="password"
            name="newPassword"
            value={formData.newPassword}
            onChange={handleChange}
            className={`w-full px-3 py-2 bg-black/40 text-white border rounded-md
focus:outline-none focus:ring-2 focus:ring-blue-500
${errors.currentPassword ? "border-red-500" : "border-white/20"}`}
          />
          {errors.newPassword && (
            <p className="mt-1 text-sm text-red-600">{errors.newPassword}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Confirm New Password *
          </label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className={`w-full px-3 py-2 bg-black/40 text-white border rounded-md
focus:outline-none focus:ring-2 focus:ring-blue-500
${errors.currentPassword ? "border-red-500" : "border-white/20"}`}

          />
          {errors.confirmPassword && (
            <p className="mt-1 text-sm text-red-600">
              {errors.confirmPassword}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-600/80 text-white py-2 px-4 rounded-md hover:bg-green-600"
        >
          {loading ? "Changing Password..." : "Change Password"}
        </button>
      </div>
    </form>
  );
};

export default ChangePasswordForm;
