import type { RouteObject } from 'react-router-dom';

import { ProfilePage } from '@/pages/dashboard';
import { LoginPage, MainPage, RegisterPage, TaskEditorPage } from '@/pages/home';

export const homeRoutes = {
  index: {
    index: true,
    path: '/',
    element: <MainPage />
  } satisfies RouteObject,
  login: {
    path: '/login',
    element: <LoginPage />
  } satisfies RouteObject,
  register: {
    path: '/register',
    element: <RegisterPage />
  } satisfies RouteObject,
  taskEditor: {
    path: '/task/:id',
    element: <TaskEditorPage />
  } satisfies RouteObject
};

export const dashboardRoutes = {
  index: {
    path: '/profile',
    element: <ProfilePage />
  } satisfies RouteObject
};
