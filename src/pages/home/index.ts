import { lazy } from 'react';

// @index(['./**/*Page.tsx'], (f, _) => `export const ${_.pascalCase(f.name)} = lazy(() => import('${f.path}'));`)
export const DonatePage = lazy(() => import('./donate/DonatePage'));
export const MainPage = lazy(() => import('./main/MainPage'));
export const LoginPage = lazy(() => import('./login/LoginPage'));
export const RegisterPage = lazy(() => import('./register/RegisterPage'));
// @endindex
