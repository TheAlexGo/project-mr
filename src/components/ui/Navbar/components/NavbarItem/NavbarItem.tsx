import React, { FC, useCallback } from 'react';

import cn from 'classnames';

import { Icon, Icons } from '@components/Icon/Icon';
import { Link } from '@components/Link/Link';
import { useController } from '@hooks/useController';
import { NavTabs, TClassNameCallback } from '@types';

import classes from './NavbarItem.module.styl';

export interface INavbarItem {
    /** Уникальный идентификатор элемента меню */
    id: NavTabs;
    /** Иконка раздела */
    icon: Icons;
    /** Название раздела */
    title: string;
    /** Ссылка на раздел */
    link: string;
}

export const NavbarItem: FC<INavbarItem> = ({ id, icon, link, title }): JSX.Element => {
    const { callbackAfterNavigate } = useController();

    const rootClasses: TClassNameCallback = useCallback(
        ({ isActive }) =>
            cn(classes.item, {
                [classes['__is-active']]: isActive
            }),
        []
    );

    const clickHandler = useCallback(() => {
        callbackAfterNavigate(link);
    }, [link, callbackAfterNavigate]);

    return (
        <Link key={id} to={link} className={rootClasses} onClick={clickHandler}>
            <Icon className={classes.icon} icon={icon} ariaLabel={null} isNotButton />
            <div className={classes.title}>{title}</div>
        </Link>
    );
};
