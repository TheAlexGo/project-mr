import React, { type JSX, type ReactElement, type FC } from 'react';

import cn from 'classnames';

import { Button } from './components/Button/Button';
import { Item } from './components/Item/Item';
import { Menu } from './components/Menu/Menu';
import { Context } from './store/context';
import { useDropDownStore } from './store/store';

import type { IOptions } from './store/store';

import classes from './DropDownMenu.module.styl';

interface IDropDownMenu extends IOptions {
    children: ReactElement[];
    className?: string;
}

interface DropDownMenuExtensions {
    Menu: typeof Menu;
    Button: typeof Button;
    Item: typeof Item;
}

/**
 * Композитный компонент для реализации доступных выпадающих окон.
 *
 * @author alexander.gordeev (alexander.gordeev@vk.team)
 * @param children
 * @param className
 * @param options
 * @constructor
 */
export const DropDownMenu: FC<IDropDownMenu> & DropDownMenuExtensions = ({
    children,
    className,
    ...options
}): JSX.Element => {
    const store = useDropDownStore(options);

    return (
        <div className={cn(classes.wrapper, className)} ref={store.containerRef}>
            <Context.Provider value={store}>{children}</Context.Provider>
        </div>
    );
};

DropDownMenu.Menu = Menu;
DropDownMenu.Button = Button;
DropDownMenu.Item = Item;
