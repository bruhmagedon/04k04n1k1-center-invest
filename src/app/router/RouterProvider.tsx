import type { RouteObject } from 'react-router-dom';

import { Suspense } from 'react';
import { createBrowserRouter, RouterProvider as ReactRouterProvider } from 'react-router-dom';

import { ErrorPage, NotFoundPage } from '@/pages/util';
import { Loader } from '@/shared/ui/loader';

import { DashboardLayout } from '../layouts/DashboardLayout.tsx/DashboardLayout';
import { HomeLayout } from '../layouts/HomeLayout/HomeLayout';
import { ProtectedRoute } from './ProtectedRoutes';
import { dashboardRoutes, homeRoutes } from './routesConfig';

const appRouter = createBrowserRouter([
  {
    path: '/',
    errorElement: (
      <Suspense fallback={<Loader />}>
        <ErrorPage />
      </Suspense>
    ),
    children: [
      {
        element: <HomeLayout />,
        children: Object.values(homeRoutes satisfies Record<string, RouteObject>)
      },
      {
        element: <ProtectedRoute />,
        children: [
          {
            element: <DashboardLayout />,
            children: Object.values(dashboardRoutes satisfies Record<string, RouteObject>)
          }
        ]
      },
      { path: '*', element: <NotFoundPage /> }
    ]
  }
]);

export const RouterProvider = () => <ReactRouterProvider router={appRouter} />;
