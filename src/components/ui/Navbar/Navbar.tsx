import React, { FC, useMemo } from 'react';

import cn from 'classnames';

import { INavbarItem, NavbarItem } from './components/NavbarItem/NavbarItem';

import classes from './Navbar.module.styl';

interface INavbar {
    /** Элементы меню: иконка + текст */
    items: INavbarItem[];
    /** Внешний класс */
    className?: string;
}

export const Navbar: FC<INavbar> = ({ items, className }): JSX.Element => {
    const rootClasses = useMemo(() => cn(classes.navbar, className), [className]);

    const navItems = items.map((data) => <NavbarItem key={data.id} {...data} />);

    return <nav className={rootClasses}>{navItems}</nav>;
};
