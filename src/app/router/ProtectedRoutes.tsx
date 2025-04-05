import { Navigate, Outlet } from 'react-router-dom';
import { homeRoutes } from './routesConfig';
import { Loader } from '@/shared/ui/loader';
import { useProfileUser } from '@/shared/hooks/useProfileUser';

export const ProtectedRoute = () => {
  const { isAuthorized } = useProfileUser();
  // const { isAuthorized } = { isAuthorized: true };

  // Если статус авторизации еще не известен (например, в момент начала приложения),
  if (isAuthorized === undefined) {
    return <Loader />;
  }

  if (!isAuthorized) {
    // Если пользователь не авторизован, перенаправляем на страницу логина
    return <Navigate replace to={homeRoutes.login.path} />;
  }

  // Если авторизован — рендер дочерних компонентов
  return <Outlet />;
};
