import React, { FC } from 'react';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { Main } from '@layouts/Main/Main';
import { General } from '@pages/General/General';

export const App: FC = () => (
    <Router>
        <Routes>
            <Route path="/" element={<Main />}>
                <Route index element={<General />} />
            </Route>
        </Routes>
    </Router>
);
