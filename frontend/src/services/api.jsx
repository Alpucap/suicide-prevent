import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api",
    headers: {
        "Content-Type": "application/json",
    },
});

// Interceptor untuk menambahkan Authorization header
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("auth")
            ? JSON.parse(localStorage.getItem("auth")).token
            : null;

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Interceptor untuk menangani response error (401 - token expired, dll)
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem("auth");
            window.location.href = "/login";
        }
        return Promise.reject(error);
    }
);

export default api;
