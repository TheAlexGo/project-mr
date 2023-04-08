import React, { FC, useCallback } from 'react';

import cn from 'classnames';
import { observer } from 'mobx-react-lite';

import { Icon, Icons } from '@components/Icon/Icon';
import { Link } from '@components/Link/Link';
import { NavTabs, Pages, TClassNameCallback } from '@types';

import classes from './NavbarItem.module.styl';

export interface INavbarItem {
    /** Уникальный идентификатор элемента меню */
    id: NavTabs;
    /** Иконка раздела */
    icon: Icons;
    /** Название раздела */
    title: string;
    /** Ссылка на раздел */
    link: Pages;
}

export const NavbarItem: FC<INavbarItem> = observer(({ id, icon, link, title }): JSX.Element => {
    const rootClasses: TClassNameCallback = useCallback(
        ({ isActive }) =>
            cn(classes.item, {
                [classes['__is-active']]: isActive
            }),
        []
    );

    return (
        <Link key={id} to={link} className={rootClasses}>
            <Icon className={classes.icon} icon={icon} ariaLabel={null} isNotButton />
            <div className={classes.title}>{title}</div>
        </Link>
    );
});
