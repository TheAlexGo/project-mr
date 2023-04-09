import { lazy, memo } from 'react';

export const NotFound = memo(lazy(() => import('./NotFound/NotFound')));
export const General = memo(lazy(() => import('./General/General')));
export const Library = memo(lazy(() => import('./Library/Library')));
export const Profile = memo(lazy(() => import('./Profile/Profile')));
export const ProfileSettings = lazy(() => import('./ProfileSettings/ProfileSettings')); // уже обёрнут в observer
export const ProfileSettingsEmail = memo(
    lazy(() => import('./ProfileSettingsEmail/ProfileSettingsEmail'))
);
export const ProfileSettingsPassword = memo(
    lazy(() => import('./ProfileSettingsPassword/ProfileSettingsPassword'))
);
export const Manga = memo(lazy(() => import('./Manga/Manga')));
