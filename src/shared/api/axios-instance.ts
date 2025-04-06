import { useTokenStore } from '@/modules/auth/model/store/authStore';
import type { AxiosInstance } from 'axios';

import axios from 'axios';

const api: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
  headers: {
    Accept: 'application/json'
  }
});

// Добавляем интерцептор для автоматического добавления токена
api.interceptors.request.use((config) => {
  const token = JSON.parse(localStorage.getItem('token-storage') || '{}')?.state?.accessToken;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export { api };
