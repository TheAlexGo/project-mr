import React, { FC, useLayoutEffect, useState } from 'react';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { Loader } from '@components/Loader/Loader';
import { useController } from '@hooks/useController';
import { useStore } from '@hooks/useStore';
import { Main } from '@layouts/Main/Main';
import { General } from '@pages/General/General';

export const App: FC = () => {
    const [isLoaded, setIsLoaded] = useState<boolean>(false);
    const { initResource } = useController();
    const { lang } = useStore();

    useLayoutEffect(() => {
        initResource(lang);
        setIsLoaded(true);
    }, [initResource, lang]);

    if (!isLoaded) {
        return <Loader />;
    }

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Main />}>
                    <Route index element={<General />} />
                </Route>
            </Routes>
        </Router>
    );
};
