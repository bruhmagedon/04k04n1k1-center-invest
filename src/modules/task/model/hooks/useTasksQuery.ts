import { useQuery } from '@tanstack/react-query';
import { TasksResponse } from '../types/types';
import { api } from '@/shared/api/axios-instance';

interface UseTasksQueryOptions {
  enabled?: boolean;
  searchTerm?: string;
}

export const useTasksQuery = (options: UseTasksQueryOptions = {}) => {
  const { searchTerm = '', enabled = true } = options;
  
  return useQuery<TasksResponse>({
    queryKey: ['tasks', searchTerm], 
    queryFn: async () => {

      const endpoint = searchTerm 
        ? `/npa/analytics/?search=${encodeURIComponent(searchTerm)}`
        : '/npa/analytics/';
        
      const { data } = await api.get<TasksResponse>(endpoint);
      return data;
    },
    enabled: enabled !== false
  });
};
