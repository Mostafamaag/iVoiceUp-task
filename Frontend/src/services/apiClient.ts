import axios, { AxiosRequestConfig } from "axios";
import { getToken } from "./auth";


const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        'Content-Type': 'application/json',
        //'Authorization': `Bearer ${getToken()}`
    },
});

apiClient.interceptors.request.use(
    (config) => {
        const token = getToken(); 
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`; 
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
        console.error('API error:', error);
        return Promise.reject(error);
    }
);

export const apiRequest = async <T>(config: AxiosRequestConfig): Promise<T> => {

    const response = await apiClient.request<T>(config);
    return response.data;


};