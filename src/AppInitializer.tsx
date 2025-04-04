// import { profileUserAPI } from '@app/api/profile';

import { RouterProvider } from './app/router/RouterProvider';
import { PageLoader } from './shared/ui/loader';

export const AppInitializer = () => {
  const shouldFetchProfile = Boolean(localStorage.getItem('shouldFetchProfile'));

  // Если пользователь не авторизован, пропускаем запрос к профилю
  // const { isFetching, isError } = profileUserAPI.useGetProfileUserQuery(undefined, {
  //   skip: !shouldFetchProfile
  // });

  const { isFetching, isError } = { isFetching: false, isError: false };

  if (shouldFetchProfile && isFetching) {
    return <PageLoader />;
  }

  // Ошибка запроса профиля
  if (shouldFetchProfile && isError) {
    console.warn('Error fetching profile user');
    localStorage.removeItem('shouldFetchProfile');
  }

  // Если пользователь не авторизован или данные уже загружены
  return <RouterProvider />;
};
