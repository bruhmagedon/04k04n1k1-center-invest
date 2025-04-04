import { api } from '@/shared/api/axios-instance';

import type { IAuthResponse, LoginCredentials } from '../types/api';

export const login = async (credentials: LoginCredentials): Promise<IAuthResponse> => {
  const response = await api.post<IAuthResponse>(`/auth/login/`, {
    ...credentials
  });

  if (response.status >= 400) {
    throw new Error('Ошибка авторизации');
  }

  return response.data;
};
