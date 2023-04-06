import React, { FC, useCallback, useMemo } from 'react';

import cn from 'classnames';
import { observer } from 'mobx-react-lite';

import { Icon, Icons } from '@components/Icon/Icon';
import { Link } from '@components/Link/Link';
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

    const rootClasses: TClassNameCallback = useCallback(
        ({ isActive }) =>
            cn(classes.item, {
                [classes['__is-active']]: isActive
            }),
        []
    );

    const ariaLabel = useMemo(() => locale['nav-icon-aria-label'] + title, [locale, title]);

    return (
        <Link key={id} to={link} className={rootClasses}>
            <Icon className={classes.icon} ariaLabel={ariaLabel} icon={icon} isNotButton />
            <div className={classes.title}>{title}</div>
        </Link>
    );
});
