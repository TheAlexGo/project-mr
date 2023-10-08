import React, { useMemo } from 'react';

import { useLocation } from 'react-router-dom';

import { Icons } from '@components/Icon/Icon';
import { Tabs } from '@components/TabsOld/Tabs';
import { ITab } from '@components/TabsOld/components/Tab/Tab';
import { useController } from '@hooks/useController';
import { useStore } from '@hooks/useStore';
import { getIconObj } from '@utils/header';

import { Catalog } from './components/Catalog/Catalog';
import { MyCollection } from './components/MyCollection/MyCollection';
import { Page } from '../Page/Page';

import classes from './Library.module.styl';

const Library = () => {
    const { locale, currentStatePage } = useStore();
    const { debug } = useController();
    const { hash } = useLocation();

    const headerButtons = [
        getIconObj(Icons.SEARCH, () => debug('Нажали на поиск!'), locale),
        getIconObj(Icons.TRASH, () => debug('Нажали на удаление!'), locale)
    ];

    const tabElements: ITab[] = useMemo(
        () => [
            {
                id: 'catalog',
                title: locale['library-catalog-heading'],
                content: {
                    id: 'catalog-content',
                    children: <Catalog />
                }
            },
            {
                id: 'my-collection',
                title: locale['library-my-collection-heading'],
                content: {
                    id: 'my-collection-content',
                    children: <MyCollection />
                }
            }
        ],
        [locale]
    );

    const activeLibraryTab: ITab | null = useMemo(
        () =>
            tabElements.find(
                (tab) => currentStatePage?.activeHash === tab.id || hash.endsWith(tab.id)
            ) || null,
        [currentStatePage?.activeHash, hash, tabElements]
    );

    return (
        <Page headerButtons={headerButtons}>
            <div className={classes['container']}>
                <Tabs
                    tabsClassName={classes['tabs']}
                    title={locale['library-tabs-heading']}
                    elements={tabElements}
                    withFixHeader
                    activeTab={activeLibraryTab}
                />
            </div>
        </Page>
    );
};

export default Library;
