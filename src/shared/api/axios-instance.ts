import type { AxiosInstance } from 'axios';

import axios from 'axios';

const api: AxiosInstance = axios.create({
  baseURL: 'http://localhost:1337/api/',
  withCredentials: true,
  headers: {
    Accept: 'application/json' // Указываем ожидаемый формат ответа
  }
});

export { api };
