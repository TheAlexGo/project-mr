import React, { FC } from 'react';

import { observer } from 'mobx-react-lite';

import { INavbarItem, NavbarItem } from './components/NavbarItem/NavbarItem';

import classes from './Navbar.module.styl';

interface INavbar {
    /** Элементы меню: иконка + текст */
    items: INavbarItem[];
}

export const Navbar: FC<INavbar> = observer(({ items }): JSX.Element => {
    const navItems = items.map((data) => <NavbarItem key={data.id} {...data} />);

    return (
        <nav className={classes['navbar']}>
            <div className={classes['wrapper']}>{navItems}</div>
        </nav>
    );
});
