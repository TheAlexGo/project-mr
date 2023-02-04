import React, { FC } from 'react';

import { observer } from 'mobx-react-lite';
import { Outlet } from 'react-router-dom';

import { Navbar } from '@components/Navbar/Navbar';
import { useStore } from '@hooks/useStore';

import classes from './Main.module.styl';

/**
 * Шаблон для основных страниц приложения
 * @param children
 * @constructor
 */
export const Main: FC = observer((): JSX.Element => {
    const { navigate } = useStore();
    return (
        <div className={classes.layout}>
            <Outlet />
            <Navbar className={classes.navbar} items={navigate} />
        </div>
    );
});
