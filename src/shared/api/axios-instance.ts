import { useTokenStore } from '@/modules/auth/model/store/authStore';
import type { AxiosInstance } from 'axios';

import axios from 'axios';

const api: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
  timeout: 15000, // Увеличиваем таймаут
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

// Добавляем интерцептор для обработки ошибок
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error);

    // Можно добавить специальную обработку для разных типов ошибок
    if (error.message === 'Network Error') {
      console.log('Ошибка сети. Проверьте подключение или CORS настройки');
    }

    return Promise.reject(error);
  }
);

export { api };
