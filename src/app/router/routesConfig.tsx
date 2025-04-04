import type { RouteObject } from 'react-router-dom';

import { ProfilePage } from '@/pages/dashboard';
import { DonatePage, LoginPage, MainPage, RegisterPage } from '@/pages/home';

export const homeRoutes = {
  index: {
    index: true,
    path: '/',
    element: <MainPage />
  } satisfies RouteObject,
  donate: {
    path: '/donate',
    element: <DonatePage />
  } satisfies RouteObject,
  login: {
    path: '/login',
    element: <LoginPage />
  } satisfies RouteObject,
  register: {
    path: '/register',
    element: <RegisterPage />
  } satisfies RouteObject
};

export const dashboardRoutes = {
  index: {
    path: '/profile',
    element: <ProfilePage />
  } satisfies RouteObject
};
