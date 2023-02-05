import React, { FC, useEffect, useLayoutEffect } from 'react';

import { observer } from 'mobx-react-lite';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { Loader } from '@components/Loader/Loader';
import { useController } from '@hooks/useController';
import { useStore } from '@hooks/useStore';
import { LayoutMain } from '@layouts/LayoutMain/LayoutMain';
import { General } from '@pages/General/General';
import { NotFound } from '@pages/NotFound/NotFound';

export const App: FC = observer(() => {
    const { initApi, initResource } = useController();
    const { lang, isAppReady } = useStore();

    useLayoutEffect(() => {
        initApi();
    }, [initApi]);

    useEffect(() => {
        initResource(lang);
    }, [initResource, lang]);

    if (!isAppReady) {
        return <Loader />;
    }

    return (
        <Router>
            <Routes>
                <Route path="/" element={<LayoutMain />}>
                    <Route index element={<General />} />
                    <Route path="*" element={<NotFound />} />
                </Route>
            </Routes>
        </Router>
    );
});
