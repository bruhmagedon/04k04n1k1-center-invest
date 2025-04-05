import { useTokenStore } from '@/modules/auth/model/store/authStore';
import { api } from '@/shared/api/axios-instance';
import { CreateTaskResponse } from '../types/types';

export const createTask = async (formData: FormData): Promise<CreateTaskResponse> => {
  const { accessToken } = useTokenStore.getState();

  const response = await api.post<CreateTaskResponse>('/npa/analytics/', formData, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });

  if (response.status >= 400) {
    throw new Error('Ошибка создания технического задания');
  }

  return response.data;
};
