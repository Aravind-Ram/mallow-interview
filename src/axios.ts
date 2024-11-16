import axios from "axios";

const API_BASE_URL = "https://reqres.in/api/"; // Replace with your API base URL

const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
    timeout: 10000, // Timeout after 10 seconds
    headers: {
        "Content-Type": "application/json",
    },
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
    (config) => {
        // Add authorization token if available
        const token = localStorage.getItem("authToken");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        // Handle request errors
        return Promise.reject(error);
    }
);

// Add a response interceptor
axiosInstance.interceptors.response.use(
    (response) => {
        // Any status code in the range of 2xx triggers this function
        return response;
    },
    (error) => {
        // Handle response errors
        if (error.response?.status === 401) {
            // Unauthorized, log out the user or redirect to login
            localStorage.removeItem("authToken");
            window.location.href = "/login"; // Redirect to login page
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
