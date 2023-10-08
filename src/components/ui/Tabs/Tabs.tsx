import React, { type JSX, type FC, type HTMLAttributes, useEffect, useRef, ReactNode } from 'react';

import { NavigationType, OrientationType, useFocusTrap } from '@hooks/useFocusTrap';

import { Item } from './components/Item/Item';
import { Context } from './store/context';
import { useTabsStore } from './store/store';

interface ITabs extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode[];
}

interface ITabsExtensions {
    Item: typeof Item;
}

/**
 * Композитный компонент для реализации доступных табиков.
 *
 * @author alexander.gordeev (alexander.gordeev@vk.team)
 * @param children
 * @param props
 * @constructor
 */
export const Tabs: FC<ITabs> & ITabsExtensions = ({ children, ...props }): JSX.Element => {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const store = useTabsStore();
    const ariaOwns = store.itemRefs.current.reduce((acc, value, index) => {
        // eslint-disable-next-line no-param-reassign
        acc += `${index === 0 ? '' : ' '}${value.id}`;
        return acc;
    }, '');

    useFocusTrap(containerRef.current, {
        navigation: NavigationType.ARROWS,
        orientation: OrientationType.HORIZONTAL,
        withAutoFocus: false,
        needRerender: children
    });

    useEffect(() => {
        if (store.activeItem) {
            return;
        }
        store.setActiveItem(store.itemRefs.current[0]);
    }, [store, store.itemRefs]);

    return (
        <Context.Provider value={store}>
            <div role="tablist" aria-owns={ariaOwns} {...props} ref={containerRef}>
                {children}
            </div>
        </Context.Provider>
    );
};

Tabs.Item = Item;
