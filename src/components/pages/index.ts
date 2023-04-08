import { lazy } from 'react';

export const NotFound = lazy(() => import('./NotFound/NotFound'));
export const General = lazy(() => import('./General/General'));
export const Library = lazy(() => import('./Library/Library'));
export const Profile = lazy(() => import('./Profile/Profile'));
export const ProfileSettings = lazy(() => import('./ProfileSettings/ProfileSettings'));
export const ProfileSettingsEmail = lazy(
    () => import('./ProfileSettingsEmail/ProfileSettingsEmail')
);
export const ProfileSettingsPassword = lazy(
    () => import('./ProfileSettingsPassword/ProfileSettingsPassword')
);
export const Manga = lazy(() => import('./Manga/Manga'));
