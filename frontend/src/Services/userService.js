import api from "./authService";

export const userService = {
  updateProfile: async (userData) => {
    const response = await api.put("/users/profile", userData);
    return response.data;
  },

  changePassword: async (passwords) => {
    const response = await api.put("/users/change-password", passwords);
    return response.data;
  },

  getUserById: async (userId) => {
    const response = await api.get(`/admin/users/${userId}`);
    return response.data;
  },

  updateUserStatus: async (userId, action) => {
    const response = await api.patch(`/admin/users/${userId}/${action}`);
    return response.data;
  },

  getUsers: async (page = 1, limit = 10) => {
    const response = await api.get(`/admin/users?page=${page}&limit=${limit}`);
    return response.data;
  },
};
