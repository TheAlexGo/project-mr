import React, { FC, useCallback, useMemo } from 'react';

import cn from 'classnames';
import { observer } from 'mobx-react-lite';
import { NavLink } from 'react-router-dom';

import { Icon, Icons } from '@components/Icon/Icon';
import { useController } from '@hooks/useController';
import { useStore } from '@hooks/useStore';
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
    const { locale } = useStore();
    const { navigate } = useController();

    const rootClasses: TClassNameCallback = useMemo(
        () =>
            ({ isActive }) =>
                cn(classes.item, {
                    [classes['__is-active']]: isActive
                }),
        []
    );

    const ariaLabel = useMemo(() => locale['nav-icon-aria-label'] + title, [locale, title]);

    const clickHandler = useCallback(() => navigate(link), [link, navigate]);

    return (
        <NavLink key={id} to={link} className={rootClasses} onClick={clickHandler}>
            <Icon className={classes.icon} ariaLabel={ariaLabel} icon={icon} isNotButton />
            <div className={classes.title}>{title}</div>
        </NavLink>
    );
});
