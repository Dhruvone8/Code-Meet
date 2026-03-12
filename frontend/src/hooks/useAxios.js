import { useAuth } from "@clerk/react";
import { useEffect } from "react";
import axiosInstance from "../utils/axios";

const useAxios = () => {
    const { getToken } = useAuth();

    useEffect(() => {
        const interceptor = axiosInstance.interceptors.request.use(async (config) => {
            const token = await getToken();
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        });

        return () => axiosInstance.interceptors.request.eject(interceptor);
    }, [getToken]);

    return axiosInstance;
};

export default useAxios;