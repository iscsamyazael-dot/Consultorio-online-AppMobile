
import axios, { InternalAxiosRequestConfig } from 'axios';

const apiClient = axios.create({
  // @ts-ignore
baseURL: (import.meta.env as any).VITE_API_URL,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    }
});

apiClient.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default apiClient;