import type { RouteObject } from 'react-router-dom';

import { ProfilePage } from '@/pages/dashboard';
import { LoginPage, MainPage, RegisterPage, TaskEditorPage } from '@/pages/home';
import RecommendedNpaPage from '@/pages/home/recommended-npa-page/RecommendedNpaPage';
import VerificationPage from '@/pages/home/verification-page/VerificationPage';

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
    path: '/task/:id/editor',
    element: <TaskEditorPage />
  } satisfies RouteObject,
  verification: {
    path: '/task/:id/verification',
    element: <VerificationPage />
  } satisfies RouteObject,
  recommendedNpa: {
    path: '/task/:id/recommended-npa',
    element: <RecommendedNpaPage />
  } satisfies RouteObject
};

export const dashboardRoutes = {
  index: {
    path: '/profile',
    element: <ProfilePage />
  } satisfies RouteObject
};
