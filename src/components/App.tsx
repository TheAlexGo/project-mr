import React, { FC, useLayoutEffect } from 'react';

import { observer } from 'mobx-react-lite';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import { Loader } from '@components/Loader/Loader';
import { useController } from '@hooks/useController';
import { useStore } from '@hooks/useStore';
import { LayoutMain } from '@layouts/LayoutMain/LayoutMain';
import {
    General,
    Library,
    NotFound,
    Profile,
    Manga,
    ProfileSettings,
    ProfileSettingsEmail,
    ProfileSettingsPassword
} from '@pages';
import { Pages, Themes } from '@types';
import { AUTO_MODIFIER, DARK_MODIFIER, LIGHT_MODIFIER } from '@utils/constants';

export const App: FC = observer(() => {
    const { initApi } = useController();
    const { isAppReady, activeTheme } = useStore();

    useLayoutEffect(() => {
        initApi();
    }, [initApi]);

    useLayoutEffect(() => {
        const { classList } = document.documentElement;
        classList.remove(AUTO_MODIFIER, DARK_MODIFIER, LIGHT_MODIFIER);
        switch (activeTheme) {
            case Themes.AUTO:
                classList.add(AUTO_MODIFIER);
                break;
            case Themes.DARK:
                classList.add(DARK_MODIFIER);
                break;
            case Themes.LIGHT:
                classList.add(LIGHT_MODIFIER);
                break;
        }
    }, [activeTheme]);

    if (!isAppReady) {
        return <Loader />;
    }

    return (
        <Router>
            <Routes>
                <Route path="/" element={<LayoutMain />}>
                    <Route index element={<General />} />
                    <Route path={Pages.LIBRARY} element={<Library />} />
                    <Route path={`${Pages.MANGA}/:id`} element={<Manga />} />
                    <Route path={Pages.PROFILE} element={<Profile />} />
                    <Route path={Pages.PROFILE_SETTINGS} element={<ProfileSettings />} />
                    <Route
                        path={Pages.PROFILE_SETTINGS_CHANGE_EMAIL}
                        element={<ProfileSettingsEmail />}
                    />
                    <Route
                        path={Pages.PROFILE_SETTINGS_CHANGE_PASSWORD}
                        element={<ProfileSettingsPassword />}
                    />
                    <Route path={Pages.NOT_FOUND} element={<NotFound />} />
                    <Route path="*" element={<Navigate to={Pages.NOT_FOUND} />} />
                </Route>
            </Routes>
        </Router>
    );
});
