import { useQuery } from '@tanstack/react-query';
import { TasksResponse } from '../types/types';
import { api } from '@/shared/api/axios-instance';

interface UseTasksQueryOptions {
  enabled?: boolean;
}

export const useTasksQuery = (options: UseTasksQueryOptions = {}) => {
  return useQuery<TasksResponse>({
    queryKey: ['tasks'],
    queryFn: async () => {
      const { data } = await api.get<TasksResponse>('/npa/analytics/');
      return data;
    },
    enabled: options.enabled !== false
  });
};
