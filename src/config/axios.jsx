import axios from "axios";

// Instance cho API
const api = axios.create({
  baseURL: "https://54.66.143.213:5000/api",
  timeout: 60000,
});

// Instance cho các yêu cầu không sử dụng /api
const apiWithoutPrefix = axios.create({
  baseURL: "https://54.66.143.213:5000",
  timeout: 60000,
});



// Thêm interceptor cho instance API nếu cần
const handleBefore = (config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
};

api.interceptors.request.use(handleBefore, (error) => {
  return Promise.reject(error);
});

apiWithoutPrefix.interceptors.request.use(handleBefore, (error) => {
  return Promise.reject(error);
});

// Export cả hai instance
export default api;
export {apiWithoutPrefix};

