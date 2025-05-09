import { api } from '@/shared/api/axios-instance';

import type { IUser } from '../types/user';

export const getUser = async (): Promise<IUser> => {
  try {
    const response = await api.get('/auth/user/');
    return response.data;
  } catch (error) {
    console.error('Ошибка при получении данных пользователя:', error);
    throw error;
  }
};
