import { useState } from "react";

const EditProfileForm = ({ user, onSubmit, loading, onCancel }) => {
  const [formData, setFormData] = useState({
    fullName: user.fullName || "",
    emailId: user.emailId || "",
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.emailId.trim()) {
      newErrors.emailId = "Email is required";
    } else if (!emailRegex.test(formData.emailId)) {
      newErrors.emailId = "Please enter a valid email";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(formData);
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

      <h2 className="text-2xl font-bold text-white mb-6">Edit Profile</h2>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Full Name *
          </label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            className={`w-full px-3 py-2 bg-black/40 text-white border rounded-md
focus:outline-none focus:ring-2 focus:ring-blue-500
${errors.fullName ? "border-red-500" : "border-white/20"}`}
          />
          {errors.fullName && (
            <p className="mt-1 text-sm text-red-600">{errors.fullName}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Email Address *
          </label>
          <input
            type="email"
            name="emailId"
            value={formData.emailId}
            onChange={handleChange}
            className={`w-full px-3 py-2 bg-black/40 text-white border rounded-md
focus:outline-none focus:ring-2 focus:ring-blue-500
${errors.fullName ? "border-red-500" : "border-white/20"}`}
          />
          {errors.emailId && (
            <p className="mt-1 text-sm text-red-600">{errors.emailId}</p>
          )}
        </div>

        <div className="flex space-x-3 pt-4">
          <button
            type="submit"
            disabled={loading}
            className="flex-1 bg-blue-600/80 text-white py-2 px-4 rounded-md hover:bg-blue-600"
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>

          <button
            type="button"
            onClick={onCancel}
            className="flex-1 bg-white/10 text-gray-300 py-2 px-4 rounded-md hover:bg-white/20"
          >
            Cancel
          </button>
        </div>
      </div>
    </form>
  );
};

export default EditProfileForm;
