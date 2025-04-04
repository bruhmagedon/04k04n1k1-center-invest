import { api, authApi } from '@/shared/api/axios-instance';

import type { IUser } from '../types/user';
export const getUser = async (): Promise<IUser> => {

  const response = await api.get('/auth/user/');
  return response.data;
  
};
