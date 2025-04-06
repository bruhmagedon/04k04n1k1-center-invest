import { Navigate, Outlet } from 'react-router-dom';
import { homeRoutes } from './routesConfig';
import { Loader } from '@/shared/ui/loader';
import { useProfileUser } from '@/shared/hooks/useProfileUser';

export const ProtectedRoute = () => {
  const { isAuthorized } = useProfileUser();

  if (isAuthorized === undefined) {
    return <Loader />;
  }

  if (!isAuthorized) {

    return <Navigate replace to={homeRoutes.login.path} />;
  }

  return <Outlet />;
};
