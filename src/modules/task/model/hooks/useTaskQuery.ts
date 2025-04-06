import { useQuery } from '@tanstack/react-query';
import { Task } from '../types/types';
import { api } from '@/shared/api/axios-instance';
import { useTaskType } from './useTaskType';

interface UseTaskQueryOptions {
  id: string | number;
  enabled?: boolean;
  fetchMdFile?: boolean;
}

export const useTaskQuery = ({ id, enabled = true, fetchMdFile = false }: UseTaskQueryOptions) => {
  return useQuery<Task>({
    queryKey: ['task', id, { fetchMdFile }],
    queryFn: async () => {
      const { data } = await api.get<Task>(`/npa/analytics/${id}/`);
      // The file field now contains the markdown text directly
      return data;
    },
    enabled
  });
};
