import { api } from '@/shared/api/axios-instance';
import { useTokenStore } from '@/modules/auth/model/store/authStore';

export interface CreateNpaResponse {
  id: string;
  name: string;
  created_at: string;
  
}

export const createNpa = async (formData: FormData): Promise<CreateNpaResponse> => {
  const { accessToken } = useTokenStore.getState();
  
  const response = await api.post<CreateNpaResponse>(
    '/npa/documents/',
    formData,
    {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
 
      }
    }
  );
  
  if (response.status >= 400) {
    throw new Error('Ошибка создания НПА');
  }
  
  return response.data;
};