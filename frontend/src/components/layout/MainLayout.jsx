import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

const MainLayout = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white">
      <Navbar />

      <main className="max-w-7xl mx-auto px-6 py-10">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
