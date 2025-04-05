import { useMutation } from '@tanstack/react-query';
import { createNpa, CreateNpaResponse } from '../api/createNpa';
import { newAxiosError } from '@/shared/api/types';

export const useCreateNpaMutation = () => {
  return useMutation<CreateNpaResponse, newAxiosError, FormData>({
    mutationFn: createNpa,
    onError: (error) => {
      console.error('Ошибка при создании НПА:', error.response);
    }
  });
};