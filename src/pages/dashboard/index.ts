import { lazy } from 'react';

// @index(['./**/*Page.tsx'], (f, _) => `export const ${_.pascalCase(f.name)} = lazy(() => import('${f.path}'));`)
export const ProfilePage = lazy(() => import('./profile/ProfilePage'));
// @endindex
