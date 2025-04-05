import { api } from '@/shared/api/axios-instance';
import { useTokenStore } from '@/modules/auth/model/store/authStore';

export interface SearchStatusResponse {
  search_id: number;
  status: string;
  progress?: number;
}

export const getSearchStatus = async (taskId: string): Promise<SearchStatusResponse> => {
  const { accessToken } = useTokenStore.getState();
  
  console.log(`Fetching search status for ID: ${taskId}`);
  
  const headers: Record<string, string> = {
    'accept': 'application/json'
  };
  
  // Only add Authorization header if we have a token
  if (accessToken) {
    headers['Authorization'] = `Bearer ${accessToken}`;
  }
  
  const response = await api.get<SearchStatusResponse>(
    `/npa/search/${taskId}/`,
    { headers }
  );
  
  if (response.status >= 400) {
    throw new Error('Ошибка при получении статуса поиска');
  }
  
  return response.data;
};