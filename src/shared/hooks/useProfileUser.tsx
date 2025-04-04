import { useGetUserQuery } from '@/modules/user/model/hooks/useGetUserQuery';

import { queryClient } from '../api/query-client';

export const useProfileUser = () => {
  const { queryKey } = useGetUserQuery();
  const profileState = queryClient.getQueriesData({ queryKey });

  const data = profileState?.data;

  if (!data) {
    throw new Error('ProfileUser data is undefined');
  }

  return { profileUser: data, isAuthorized: Boolean(data) };
};
