import axios from "axios";

export const apiClient = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("accessToken");

    if (accessToken != null) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status == 401) {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("role");
      window.location.replace("/login");
    }

    return Promise.reject(error);
  }
);
