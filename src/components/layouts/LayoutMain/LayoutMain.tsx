import React, { FC, Suspense, useEffect } from 'react';

import { Outlet, useLocation } from 'react-router-dom';

import { Header } from '@components/Header/Header';
import { Loader } from '@components/Loader/Loader';
import { Navbar } from '@components/Navbar/Navbar';
import { useController } from '@hooks/useController';
import { useStore } from '@hooks/useStore';
import { Pages } from '@types';

import classes from './LayoutMain.module.styl';

/**
 * Шаблон для основных страниц приложения
 * @constructor
 */
export const LayoutMain: FC = (): JSX.Element => {
    const { navigate } = useStore();
    const { changePage } = useController();
    const location = useLocation();

    useEffect(() => {
        const currentPage = Object.entries(Pages).find(([, value]) => location.pathname === value);
        if (currentPage) {
            changePage(currentPage[1]);
        }
    }, [location.pathname, changePage]);

    return (
        <div className={classes.layout}>
            <div className={classes.header}>
                <Header />
            </div>
            <Suspense fallback={<Loader />}>
                <Outlet />
            </Suspense>
            <div className={classes.navbar}>
                <Navbar items={navigate} />
            </div>
        </div>
    );
};
