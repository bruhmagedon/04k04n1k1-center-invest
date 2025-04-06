import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/shared/api/axios-instance';

export const useDeleteTaskMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (taskId: number) => {
      await api.delete(`/npa/analytics/${taskId}/`);
    },
    onSuccess: () => {
      // Инвалидируем кэш, чтобы обновить список заданий
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    }
  });
};
