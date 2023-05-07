import React, { FC, Suspense } from 'react';

import { observer } from 'mobx-react-lite';
import { Outlet } from 'react-router-dom';

import { Loader } from '@components/Loader/Loader';
import { Modals } from '@components/Modals/Modals';
import { Navbar } from '@components/Navbar/Navbar';
import { useLayoutInit } from '@hooks/useLayoutInit';
import { useStore } from '@hooks/useStore';

import classes from './LayoutMain.module.styl';

/**
 * Шаблон для основных страниц приложения
 * @constructor
 */
export const LayoutMain: FC = observer((): JSX.Element => {
    const { navItems } = useStore();

    useLayoutInit();

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
