import { useMutation } from '@tanstack/react-query';
import { searchNpa, NpaSearchResponse } from '../api/searchNpa';
import { newAxiosError } from '@/shared/api/types';

export const useSearchNpaMutation = () => {
  return useMutation<NpaSearchResponse, newAxiosError, string>({
    mutationFn: searchNpa,
    onError: (error) => {
      console.error('Ошибка при поиске НПА:', error.response);
    }
  });
};