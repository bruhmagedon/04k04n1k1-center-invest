import { useQuery } from '@tanstack/react-query';

import { getUser } from '../api/getUser';
import { IUser } from '@/modules/user/model/types/user';
import { newAxiosError } from '@/shared/api/types';
import { useTokenStore } from '@/modules/auth/model/store/authStore';

// TODO: Заготовка под получение юзера
export const useGetUserQuery = () => {
  const { accessToken } = useTokenStore();

  return useQuery<IUser, newAxiosError>({
    queryKey: ['user'],
    queryFn: getUser,
    enabled: !!accessToken
 });
};
