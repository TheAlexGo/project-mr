import React, { FC, Suspense, useLayoutEffect } from 'react';

import { observer } from 'mobx-react-lite';
import { Outlet, useLocation } from 'react-router-dom';

import { Loader } from '@components/Loader/Loader';
import { Modals } from '@components/Modals/Modals';
import { Navbar } from '@components/Navbar/Navbar';
import { useController } from '@hooks/useController';
import { useStore } from '@hooks/useStore';

import classes from './LayoutMain.module.styl';

/**
 * Шаблон для основных страниц приложения
 * @constructor
 */
export const LayoutMain: FC = observer((): JSX.Element => {
    const { navItems } = useStore();
    const { changePage } = useController();
    const location = useLocation();

    useLayoutEffect(() => {
        changePage(location.pathname + location.hash);
    }, [changePage, location.hash, location.pathname]);

    return (
        <div className={classes['layout']}>
            <Suspense fallback={<Loader />}>
                <Outlet />
            </Suspense>
            <div className={classes['navbar']}>
                <Navbar items={navItems} />
            </div>
            <Modals />
        </div>
    );
});
