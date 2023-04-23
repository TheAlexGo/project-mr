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
    const { changePage, mountPage, unmountPage, savePageState, saveHashState } = useController();
    const { pathname, hash } = useLocation();

    useLayoutEffect(() => {
        mountPage(pathname + hash);
    }, [hash, pathname, mountPage]);

    useLayoutEffect(() => {
        changePage(pathname + hash);
    }, [changePage, hash, pathname]);

    useLayoutEffect(
        () => () => {
            /**
             * Сохраняем только если имеется хэш
             */
            if (!hash) {
                return;
            }
            saveHashState(pathname + hash);
        },
        [hash, pathname, saveHashState]
    );

    /**
     * Сохраняем состояние прямо до размонтирования DOM-элементов, для корректного сохранения позиции
     */
    useLayoutEffect(() => () => savePageState(pathname), [savePageState, pathname, hash]);

    useLayoutEffect(() => unmountPage, [unmountPage, pathname, hash]);

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
