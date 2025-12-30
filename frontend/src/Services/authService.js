import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export const authService = {
  login: async (credentials) => {
    const response = await api.post("/auth/login", credentials);
    return response.data;
  },

  signup: async (userData) => {
    const response = await api.post("/auth/signup", userData);
    return response.data;
  },

  logout: async () => {
    await api.post("/auth/logout");
  },

  getProfile: async () => {
    const response = await api.get("/users/profile");
    console.log("getProfile response:", response.data);
    return response.data.user;
  },

  changePassword: async (passwords) => {
    const response = await api.put("/users/change-password", passwords);
    return response.data;
  },
};

export default api;
