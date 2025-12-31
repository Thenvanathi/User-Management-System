import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

const DashboardPage = () => {
  const { user, isAdmin } = useAuth();

 return (
  <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 px-6 py-10">

    <div className="max-w-7xl mx-auto space-y-8">

      {/* Header Card */}
      <div className="
        relative bg-white/10 backdrop-blur-xl
        border border-white/20
        rounded-2xl p-6
        shadow-xl
        hover:scale-[1.01] transition
      ">
        <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-600 blur opacity-20 rounded-2xl"></div>

        <div className="relative flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">
              Welcome, {user?.fullName}
            </h1>
            <p className="text-gray-300 mt-1">
              Role: <span className="font-medium">{user?.role}</span>
            </p>
          </div>

          <div className="flex gap-3 mt-4 md:mt-0">
            <Link
              to="/profile"
              className="px-4 py-2 rounded-md bg-blue-600/80 text-white text-sm hover:bg-blue-600"
            >
              View Profile
            </Link>

            {isAdmin() && (
              <Link
                to="/admin"
                className="px-4 py-2 rounded-md bg-purple-600/80 text-white text-sm hover:bg-purple-600"
              >
                Admin Panel
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <DashboardCard title="Account Status" value="Active" color="green" />
        <DashboardCard title="User Role" value={user?.role} color="blue" />
        <DashboardCard title="Last Login" value="Today" color="purple" />
      </div>

      {/* Features */}
      <div className="
        bg-white/10 backdrop-blur-xl
        border border-white/20
        rounded-2xl p-6
      ">
        <h2 className="text-lg font-semibold text-white mb-4">
          What you can do
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <FeatureCard
            title="Manage Profile"
            description="Update your personal details and password"
          />
          <FeatureCard
            title="Secure Access"
            description="Role-based protected routes"
          />
          <FeatureCard
            title="Admin Controls"
            description="Activate or deactivate users (Admin only)"
          />
        </div>
      </div>

    </div>
  </div>
);

};

export default DashboardPage;

const DashboardCard = ({ title, value, color }) => {
  const colors = {
    green: "from-green-400 to-green-600",
    blue: "from-blue-400 to-blue-600",
    purple: "from-purple-400 to-purple-600",
  };

  return (
    <div className="
      relative rounded-xl p-5
      bg-white/10 backdrop-blur-xl
      border border-white/20
      hover:scale-[1.03] transition
    ">
      <div
        className={`absolute -inset-1 bg-gradient-to-r ${colors[color]} blur opacity-25 rounded-xl`}
      ></div>

      <div className="relative">
        <p className="text-sm text-gray-300">{title}</p>
        <p className="text-xl font-semibold text-white mt-2">{value}</p>
      </div>
    </div>
  );
};


const FeatureCard = ({ title, description }) => (
  <div className="
    bg-black/40 backdrop-blur-lg
    border border-white/20
    rounded-xl p-4
    hover:scale-[1.03]
    hover:shadow-xl
    transition
  ">
    <h3 className="font-medium text-white">{title}</h3>
    <p className="text-sm text-gray-400 mt-1">{description}</p>
  </div>
);

