import { api } from '@/shared/api/axios-instance';

import type { IAuthResponse, RegisterCredentials } from '../types/api';

export const register = async (credentials: RegisterCredentials): Promise<IAuthResponse> => {
  const response = await api.post<IAuthResponse>('/auth/register/', credentials);
  return response.data;
};
