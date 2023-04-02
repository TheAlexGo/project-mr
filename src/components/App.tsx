import React, { FC, useLayoutEffect } from 'react';

import { observer } from 'mobx-react-lite';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { Loader } from '@components/Loader/Loader';
import { useController } from '@hooks/useController';
import { useStore } from '@hooks/useStore';
import { LayoutMain } from '@layouts/LayoutMain/LayoutMain';
import { General, Library, NotFound } from '@pages';
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
                    </Route>
                    <Route path="*" element={<NotFound />} />
                </Route>
            </Routes>
        </Router>
    );
});
