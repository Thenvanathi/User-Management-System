const ProfileInfo = ({ user }) => {
  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Profile Information
      </h2>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-600">
            Full Name
          </label>
          <p className="mt-1 text-lg text-gray-900">{user.fullName}</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600">
            Email Address
          </label>
          <p className="mt-1 text-lg text-gray-900">{user.emailId}</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600">
            Role
          </label>
          <p className="mt-1">
            <span
              className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                user.role === "admin"
                  ? "bg-red-100 text-red-800"
                  : "bg-blue-100 text-blue-800"
              }`}
            >
              {user.role}
            </span>
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600">
            Account Status
          </label>
          <p className="mt-1">
            <span
              className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                user.status === "active"
                  ? "bg-green-100 text-green-800"
                  : "bg-gray-100 text-gray-800"
              }`}
            >
              {user.status}
            </span>
          </p>
        </div>

        {user.lastLogin && (
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Last Login
            </label>
            <p className="mt-1 text-gray-900">
              {new Date(user.lastLogin).toLocaleString()}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileInfo;
