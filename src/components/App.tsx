import React, { FC, useEffect } from 'react';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { useController } from '@hooks/useController';
import { useStore } from '@hooks/useStore';
import { Main } from '@layouts/Main/Main';
import { General } from '@pages/General/General';

export const App: FC = () => {
    const { initResource } = useController();
    const { lang } = useStore();

    useEffect(() => {
        initResource(lang);
    }, [initResource, lang]);

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Main />}>
                    <Route index element={<General />} />
                </Route>
            </Routes>
        </Router>
    );
}
