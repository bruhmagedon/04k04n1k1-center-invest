import { useMutation } from '@tanstack/react-query';
import { createTask } from '../api/createTask';
import { newAxiosError } from '@/shared/api/types';
import { CreateTaskResponse } from '../types/types';

export const useCreateTaskMutation = () => {
  return useMutation<CreateTaskResponse, newAxiosError, FormData>({
    mutationFn: createTask,
    onError: (error) => {
      console.error('Ошибка при создании НПА:', error.response);
    }
  });
};
