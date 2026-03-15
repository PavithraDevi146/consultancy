import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE || "/api",
});

api.interceptors.request.use((config) => {
  const raw = localStorage.getItem("constructar_user");
  if (raw) {
    const user = JSON.parse(raw);
    if (user?.token) {
      config.headers.Authorization = `Bearer ${user.token}`;
    }
  }
  return config;
});

export default api;
