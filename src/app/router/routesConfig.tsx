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
    path: '/register',
    element: <RegisterPage />
  } satisfies RouteObject,
  verification:{
    path: '/verification',
    element: <VerificationPage />
  } satisfies RouteObject,
  recommendedNpa:{
    path: '/recommended-npa',
    element: <RecommendedNpaPage />
  } satisfies RouteObject
};

export const dashboardRoutes = {
  index: {
    path: '/profile',
    element: <ProfilePage />
  } satisfies RouteObject
};
