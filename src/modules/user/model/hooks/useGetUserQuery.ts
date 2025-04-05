import { useQuery } from '@tanstack/react-query';

import { getUser } from '../api/getUser';
import { IUser } from '@/modules/user/model/types/user';
import { newAxiosError } from '@/shared/api/types';
import { useTokenStore } from '@/modules/auth/model/store/authStore';

export const useGetUserQuery = (options = {}) => {
  const { accessToken } = useTokenStore();
  const hasToken = !!accessToken || !!localStorage.getItem('token-storage');

  return useQuery<IUser, newAxiosError>({
    queryKey: ['user'],
    queryFn: getUser,
    enabled: hasToken,
    staleTime: 5 * 60 * 1000, // 5 минут
    ...options
  });
};
