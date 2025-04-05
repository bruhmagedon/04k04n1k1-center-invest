import { useGetUserQuery } from '@/modules/user/model/hooks/useGetUserQuery';
import { queryClient } from '../api/query-client';

export const useProfileUser = () => {
  // Получаем данные из кэша или из запроса
  const { data, isLoading, isError } = useGetUserQuery();

  // Альтернативный способ получения данных из кэша
  const cachedData = queryClient.getQueryData(['user']);

  // Используем данные из запроса или из кэша
  const userData = data || cachedData;

  return {
    profileUser: userData,
    isAuthorized: Boolean(userData),
    isLoading,
    isError
  };
};
