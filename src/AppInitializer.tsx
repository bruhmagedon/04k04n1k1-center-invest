// import { profileUserAPI } from '@app/api/profile';

import { RouterProvider } from './app/router/RouterProvider';
import { useTokenStore } from './modules/auth/model/store/authStore';
import { useGetUserQuery } from './modules/user/model/hooks/useGetUserQuery';
import { PageLoader } from './shared/ui/loader';

export const AppInitializer = () => {
  const { accessToken } = useTokenStore();
  const shouldFetchProfile = Boolean(accessToken) || Boolean(localStorage.getItem('token-storage'));

  const { isLoading, isError } = useGetUserQuery({
    enabled: shouldFetchProfile,
    retry: 1
  });

  if (shouldFetchProfile && isLoading) {
    return <PageLoader />;
  }

  if (shouldFetchProfile && isError) {
    console.warn('Ошибка при получении данных пользователя');
  }

  return <RouterProvider />;
};
