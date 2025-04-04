import { Navigate, Outlet } from 'react-router-dom';

// import { useProfileUser } from '@shared/hooks';
// import { Loader } from '@shared/ui';
import { Loader } from '@/shared/ui/loader';

export const ProtectedRoute = () => {
//   const { isAuthorized } = useProfileUser(true);
  const { isAuthorized } = { isAuthorized: true };

  // Если статус авторизации еще не известен (например, в момент начала приложения),
  if (isAuthorized === undefined) {
    return <Loader />;
  }

  if (!isAuthorized) {
    // Если пользователь не авторизован, перенаправляем на главную страницу
    return <Navigate replace to='/' />;
  }

  // Если авторизован — рендер дочерних компонентов
  return <Outlet />;
};
