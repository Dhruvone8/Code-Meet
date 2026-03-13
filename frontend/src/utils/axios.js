import axios from "axios";

const axiosInstance = axios.create({
    baseURL:
        import.meta.env.MODE === "development"
            ? "http://localhost:3000/"
            : import.meta.env.VITE_API_URL,
    withCredentials: true,
})

axiosInstance.interceptors.request.use(async (config) => {
    // Wait for Clerk to initialize if not ready yet
    if (!window.Clerk?.session) {
        await new Promise((resolve) => {
            const interval = setInterval(() => {
                if (window.Clerk?.session) {
                    clearInterval(interval);
                    resolve();
                }
            }, 50);
        });
    }

    const token = await window.Clerk?.session?.getToken();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default axiosInstance;