import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

const DashboardPage = () => {
  const { user, isAdmin } = useAuth();

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="bg-white rounded-lg shadow p-6 flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Welcome, {user?.fullName}
          </h1>
          <p className="text-gray-500 mt-1">
            Role: <span className="font-medium">{user?.role}</span>
          </p>
        </div>

        <div className="flex gap-3 mt-4 md:mt-0">
          <Link
            to="/profile"
            className="px-4 py-2 rounded-md bg-blue-600 text-white text-sm hover:bg-blue-700"
          >
            View Profile
          </Link>

          {isAdmin() && (
            <Link
              to="/admin"
              className="px-4 py-2 rounded-md bg-purple-600 text-white text-sm hover:bg-purple-700"
            >
              Admin Panel
            </Link>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <DashboardCard title="Account Status" value="Active" color="green" />
        <DashboardCard title="User Role" value={user?.role} color="blue" />
        <DashboardCard title="Last Login" value="Today" color="purple" />
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
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
  );
};

export default DashboardPage;

const DashboardCard = ({ title, value, color }) => {
  const colors = {
    green: "bg-green-50 text-green-700",
    blue: "bg-blue-50 text-blue-700",
    purple: "bg-purple-50 text-purple-700",
  };

  return (
    <div className={`rounded-lg p-5 ${colors[color]}`}>
      <p className="text-sm font-medium">{title}</p>
      <p className="text-xl font-semibold mt-2">{value}</p>
    </div>
  );
};

const FeatureCard = ({ title, description }) => (
  <div className="border rounded-lg p-4 hover:shadow transition">
    <h3 className="font-medium text-gray-900">{title}</h3>
    <p className="text-sm text-gray-600 mt-1">{description}</p>
  </div>
);
