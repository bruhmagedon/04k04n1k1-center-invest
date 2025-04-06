import { useGetUserQuery } from '@/modules/user/model/hooks/useGetUserQuery';
import { queryClient } from '../api/query-client';

export const useProfileUser = () => {

  const { data, isLoading, isError } = useGetUserQuery();


  const cachedData = queryClient.getQueryData(['user']);


  const userData = data || cachedData;

  return {
    profileUser: userData,
    isAuthorized: Boolean(userData),
    isLoading,
    isError
  };
};
