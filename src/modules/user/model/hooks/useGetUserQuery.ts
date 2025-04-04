import { useQuery } from '@tanstack/react-query';

import { getUser } from '../api/getUser';

// TODO: Заготовка под получение юзера
export const useGetUserQuery = () => {
  const queryKey = ['user'];

  return {
    query: useQuery({
      queryKey,
      queryFn: () => getUser()
    //   ...settings?.options
    }),
    queryKey
  };
};
