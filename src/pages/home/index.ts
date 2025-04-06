import { lazy } from 'react';


export const MainPage = lazy(() => import('./main/MainPage'));
export const LoginPage = lazy(() => import('./login/LoginPage'));
export const RegisterPage = lazy(() => import('./register/RegisterPage'));
export const TaskEditorPage = lazy(() => import('./task-editor-page/TaskEditorPage'));
// @endindex
