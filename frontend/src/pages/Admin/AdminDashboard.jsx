import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import UsersTable from './UserTable';
import { userService } from '../../Services/userService';

const AdminDashboard = () => {
  const { user: currentUser } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalUsers, setTotalUsers] = useState(0);
  const [stats, setStats] = useState({
    total: 0,
    active: 0,
    inactive: 0,
    admins: 0,
  });

  const fetchUsers = async (page = 1) => {
    setLoading(true);
    
    try {
      const response = await userService.getUsers(page, 10);
      
      setUsers(response.users || []);
      setTotalPages(response.totalPages || 1);
      setTotalUsers(response.totalUsers || 0);
      setCurrentPage(page);
      
      if (response.users) {
        const stats = {
          total: response.totalUsers || response.users.length,
          active: response.users.filter(u => u.status === 'active').length,
          inactive: response.users.filter(u => u.status === 'inactive').length,
          admins: response.users.filter(u => u.role === 'admin').length,
        };
        setStats(stats);
      }
      
    } catch (error) {
      console.error('Failed to fetch users:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      fetchUsers(page);
    }
  };

  const handleUserUpdated = () => {
    fetchUsers(currentPage);
  };

  useEffect(() => {
    fetchUsers(1);
  }, []);

  if (!currentUser || currentUser.role !== 'admin') {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900">Access Denied</h2>
        <p className="mt-2 text-gray-600">You don't have permission to view this page.</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-6 text-white">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
<p className="mt-2 text-gray-400">Manage users and system settings</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="rounded-md bg-blue-500 p-3">
                  <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-4.201a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-400 truncate">Total Users</dt>
                  <dd className="text-lg font-medium text-white">{stats.total}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="rounded-md bg-green-500 p-3">
                  <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-400 truncate">Active Users</dt>
                  <dd className="text-lg font-medium text-white">{stats.active}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="rounded-md bg-red-500 p-3">
                  <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-400 truncate">Inactive Users</dt>
                  <dd className="text-lg font-medium text-white">{stats.inactive}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="rounded-md bg-purple-500 p-3">
                  <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Admins</dt>
                  <dd className="text-lg font-medium text-gray-900">{stats.admins}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-xl font-semibold text-white">User Management</h2>
            <p className="text-gray-400">Manage user accounts and permissions</p>
          </div>
          <div className="text-sm text-gray-500">
            Showing {users.length} of {totalUsers} users
          </div>
        </div>

        <UsersTable
          users={users}
          loading={loading}
          onUserUpdated={handleUserUpdated}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default AdminDashboard;