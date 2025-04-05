import { useQuery } from '@tanstack/react-query';
import { TasksResponse } from '../types/types';
import { api } from '@/shared/api/axios-instance';

export const useTasksQuery = () => {
  return useQuery<TasksResponse>({
    queryKey: ['tasks'],
    queryFn: async () => {
      const { data } = await api.get<TasksResponse>('/npa/analytics/');
      return data;
    }
  });
};
