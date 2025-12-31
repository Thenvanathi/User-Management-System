import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { userService } from "../../Services/userService";
import ProfileInfo from "./ProfileInfo";
import EditProfileForm from "./EditProfileForm";
import ChangePasswordForm from "./ChangePasswordForm";

const ProfilePage = () => {
  const { user: authUser, logout } = useAuth();
  const [user, setUser] = useState(authUser);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const userData = await userService.getProfile();
        setUser(userData);
      } catch (error) {
        console.error("Failed to fetch profile:", error);
      }
    };

    fetchUserProfile();
  }, []);

  const handleUpdateProfile = async (updatedData) => {
    setLoading(true);
    setMessage({ type: "", text: "" });

    try {
      const response = await userService.updateProfile(updatedData);
      setUser(response.user);
      setIsEditing(false);
      setMessage({ type: "success", text: "Profile updated successfully!" });
    } catch (error) {
      setMessage({
        type: "error",
        text: error.response?.data?.message || "Failed to update profile",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setMessage({ type: "", text: "" });
  };

  if (!user) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
  <div className="max-w-5xl mx-auto space-y-8">

    {/* Header */}
    <div>
      <h1 className="text-3xl font-bold text-white">My Profile</h1>
      <p className="text-gray-400 mt-2">
        Manage your account information and settings
      </p>
    </div>

    {/* Message */}
    {message.text && (
      <div
        className={`p-4 rounded-lg border backdrop-blur-md ${
          message.type === "success"
            ? "bg-green-500/10 text-green-300 border-green-500/30"
            : "bg-red-500/10 text-red-300 border-red-500/30"
        }`}
      >
        {message.text}
      </div>
    )}

    {/* Content */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div>
        {isEditing ? (
          <EditProfileForm
            user={user}
            onSubmit={handleUpdateProfile}
            loading={loading}
            onCancel={handleCancelEdit}
          />
        ) : (
          <>
            <ProfileInfo user={user} />
            <button
              onClick={() => setIsEditing(true)}
              className="mt-4 px-6 py-2 rounded-md bg-blue-600/80 text-white hover:bg-blue-600 transition"
            >
              Edit Profile
            </button>
          </>
        )}
      </div>

      <div className="space-y-8">
        <ChangePasswordForm />

        {/* Account Actions */}
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4">
            Account Actions
          </h3>

          <div className="space-y-3">
            <button
              onClick={logout}
              className="w-full bg-red-600/80 text-white py-2 rounded-md hover:bg-red-600"
            >
              Logout
            </button>

            {user.role === "admin" && (
              <button
                onClick={() => (window.location.href = "/admin")}
                className="w-full bg-purple-600/80 text-white py-2 rounded-md hover:bg-purple-600"
              >
                Go to Admin Dashboard
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  </div>
);

};

export default ProfilePage;
