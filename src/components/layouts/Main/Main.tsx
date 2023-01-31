import React, { FC } from 'react';

import { observer } from 'mobx-react-lite';
import { Outlet } from 'react-router-dom';

import classes from './Main.module.styl';

/**
 * Шаблон для основных страниц приложения
 * @param children
 * @constructor
 */
export const Main: FC = observer(
    (): JSX.Element => (
        <div className={classes.layout}>
            <Outlet />
        </div>
    )
);
