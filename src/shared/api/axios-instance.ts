import { useTokenStore } from '@/modules/auth/model/store/authStore';
import type { AxiosInstance } from 'axios';

import axios from 'axios';
console.log(JSON.parse(localStorage.getItem('token-storage')));
const api: AxiosInstance = axios.create({
  baseURL: 'http://localhost:1337/api/',
  withCredentials: true,
  headers: {
    Accept: 'application/json',
    Authorization: JSON.parse(localStorage.getItem('token-storage')).state.accessToken
      ? `Bearer ${JSON.parse(localStorage.getItem('token-storage')).state.accessToken}`
      : ''
  }
});
const authApi = (): AxiosInstance => {
  const { accessToken } = useTokenStore();

  const instance = axios.create({
    baseURL: 'http://localhost:1337/api/',
    withCredentials: true,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: accessToken ? `Bearer ${accessToken}` : ''
    }
  });

  return instance;
};

export { api, authApi };
