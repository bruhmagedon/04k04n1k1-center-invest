import { api } from '@/shared/api/axios-instance';
import { useTokenStore } from '@/modules/auth/model/store/authStore';


export interface NpaSearchResult {
  id: string;
  name: string;
  relevance_score: number;
  // Add other fields returned by the API as needed
}

export interface NpaSearchResponse {
  results: NpaSearchResult[];
  total: number;
}

export const searchNpa = async (content: string): Promise<NpaSearchResponse> => {
  const { accessToken } = useTokenStore.getState();

  const textBlob = new Blob([content], { type: 'text/plain' });
  const textFile = new File([textBlob], 'document.txt', { type: 'text/plain' });

  const formData = new FormData();
  formData.append('file', textFile);
  
  console.log('Sending file to API:', textFile);
  
  const response = await api.post<NpaSearchResponse>(
    '/npa/search/',
    formData,
    {
      headers: {
        'Authorization': `Bearer ${accessToken}`,

      }
    }
  );
  
  if (response.status >= 400) {
    throw new Error('Ошибка при поиске НПА');
  }
  
  return response.data;
};