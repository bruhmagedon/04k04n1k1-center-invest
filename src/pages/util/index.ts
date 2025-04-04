import { lazy } from 'react';

// @index(['./**/*Page.tsx'], (f, _) => `export const ${_.pascalCase(f.name)} = lazy(() => import('${f.path}'));`)
export const ErrorPage = lazy(() => import('./error/ErrorPage'));
export const NotFoundPage = lazy(() => import('./not-found/NotFoundPage'));
// @endindex
