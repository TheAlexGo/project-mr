import React, { FC, useCallback, useMemo, useState } from 'react';

import cn from 'classnames';

import { ContextMenu } from '@components/ContextMenu/ContextMenu';
import { ITabItem, TTabs } from '@components/ContextMenu/ui/Tabs/types';
import { Content } from '@components/Tabs/components/Content/Content';
import { TMenuItemUnion } from '@hooks/a11y/types';

import { Tab } from './components/Tab/Tab';
import { ITab } from './types';

import classes from './Tabs.module.styl';

const renderItem: TTabs['renderItem'] = (additionalProps, initialProps) => (
    <Tab additionalProps={additionalProps} initialProps={initialProps} />
);

interface ITabs {
    /** Название группы вкладок */
    title: string;
    /** Элементы группы вкладок */
    items: ITab[];
    /** Зафиксировать шапку при прокручивании? */
    withFixHeader?: boolean;
    /** Класс-обёртка для контейнера с табами */
    tabsClassName?: string;
}

export const Tabs: FC<ITabs> = ({
    title,
    items: _items,
    tabsClassName,
    withFixHeader = false
}): JSX.Element => {
    const [items, setItems] = useState(_items);

    const rootClasses = useMemo(
        () =>
            cn(classes['container'], {
                [classes['__with-fix_header']]: withFixHeader
            }),
        [withFixHeader]
    );

    const tabsClasses = cn(classes['tabs'], tabsClassName);

    const selectedTab: ITab | null = useMemo(
        () => items.find((tab) => tab.isSelected) || null,
        [items]
    );

    const renderContent = useCallback(() => {
        if (!selectedTab) {
            return null;
        }
        return (
            <Content
                key={selectedTab.content.id}
                id={selectedTab.content.id}
                className={classes['content']}
                tabId={selectedTab.id}
            >
                {selectedTab.content.children}
            </Content>
        );
    }, [selectedTab]);

    const selectMenuItemHandler = (tab: TMenuItemUnion<ITabItem, unknown>) => {
        setItems((prevState) =>
            prevState.map((t) => {
                if (t.id === tab.id) {
                    return {
                        ...t,
                        isSelected: true
                    };
                }
                return {
                    ...t,
                    isSelected: false
                };
            })
        );
    };

    return (
        <div className={rootClasses}>
            <ContextMenu<ITab, unknown, unknown>
                listAttributes={{
                    className: tabsClasses,
                    role: 'tablist',
                    'aria-label': title
                }}
                items={items}
                renderItem={renderItem}
                selectMenuItemHandler={selectMenuItemHandler}
            />
            {renderContent()}
        </div>
    );
};
