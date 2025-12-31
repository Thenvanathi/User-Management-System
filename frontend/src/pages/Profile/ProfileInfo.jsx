const ProfileInfo = ({ user }) => {
  return (
    <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6">
      <h2 className="text-2xl font-bold text-white mb-6">
        Profile Information
      </h2>

      <div className="space-y-4 text-gray-300">
        <Info label="Full Name" value={user.fullName} />
        <Info label="Email Address" value={user.emailId} />

        <div>
          <label className="text-sm text-gray-400">Role</label>
          <span
            className={`ml-2 px-3 py-1 rounded-full text-sm ${
              user.role === "admin"
                ? "bg-red-500/20 text-red-300"
                : "bg-blue-500/20 text-blue-300"
            }`}
          >
            {user.role}
          </span>
        </div>

        <div>
          <label className="text-sm text-gray-400">Status</label>
          <span
            className={`ml-2 px-3 py-1 rounded-full text-sm ${
              user.status === "active"
                ? "bg-green-500/20 text-green-300"
                : "bg-gray-500/20 text-gray-300"
            }`}
          >
            {user.status}
          </span>
        </div>

        {user.lastLogin && (
          <Info
            label="Last Login"
            value={new Date(user.lastLogin).toLocaleString()}
          />
        )}
      </div>
    </div>
  );
};

const Info = ({ label, value }) => (
  <div>
    <label className="text-sm text-gray-400">{label}</label>
    <p className="text-white text-lg">{value}</p>
  </div>
);

export default ProfileInfo;
