import React, { FC, useLayoutEffect } from 'react';

import { observer } from 'mobx-react-lite';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import { Loader } from '@components/Loader/Loader';
import { useController } from '@hooks/useController';
import { useStore } from '@hooks/useStore';
import { LayoutMain } from '@layouts/LayoutMain/LayoutMain';
import { General, Library, NotFound, Profile, Manga } from '@pages';
import { Pages } from '@types';

export const App: FC = observer(() => {
    const { initApi } = useController();
    const { isAppReady } = useStore();

    useLayoutEffect(() => {
        initApi();
    }, [initApi]);

    if (!isAppReady) {
        return <Loader />;
    }

    return (
        <Router>
            <Routes>
                <Route path="/" element={<LayoutMain />}>
                    <Route index element={<General />} />
                    <Route path={Pages.LIBRARY}>
                        <Route index element={<Library />} />
                        <Route path={`${Pages.MANGA}/:id`} element={<Manga />} />
                    </Route>
                    <Route path={Pages.PROFILE} element={<Profile />} />
                    <Route path={Pages.NOT_FOUND} element={<NotFound />} />
                    <Route path="*" element={<Navigate to={Pages.NOT_FOUND} />} />
                </Route>
            </Routes>
        </Router>
    );
});
