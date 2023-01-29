import React, { FC } from 'react';

import block from 'bem-cn-custom';
import { observer } from 'mobx-react-lite';
import { Outlet } from 'react-router-dom';

import './Main.styl';

const classnames = block('layout-main');

/**
 * Шаблон для основных страниц приложения
 * @param children
 * @constructor
 */
export const Main: FC = observer((): JSX.Element => (
    <div className={classnames()}>
        <Outlet />
    </div>
));
