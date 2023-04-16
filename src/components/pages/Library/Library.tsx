import React, { useMemo } from 'react';

import { Icons } from '@components/Icon/Icon';
import { Tabs } from '@components/Tabs/Tabs';
import { ITab } from '@components/Tabs/components/Tab/Tab';
import { useController } from '@hooks/useController';
import { useStore } from '@hooks/useStore';
import { getIconObj } from '@utils/header';

import { Catalog } from './components/Catalog/Catalog';
import { MyCollection } from './components/MyCollection/MyCollection';
import { Page } from '../Page/Page';

import classes from './Library.module.styl';

const Library = () => {
    const { locale } = useStore();
    const { debug } = useController();

    const headerButtons = useMemo(
        () => [
            getIconObj(Icons.SEARCH, () => debug('Нажали на поиск!'), locale),
            getIconObj(Icons.TRASH, () => debug('Нажали на удаление!'), locale)
        ],
        [locale, debug]
    );

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

    return (
        <Page headerButtons={headerButtons}>
            <div className={classes['container']}>
                <Tabs
                    tabsClassName={classes['tabs']}
                    title={locale['library-tabs-heading']}
                    elements={tabElements}
                    withFixHeader
                />
            </div>
        </Page>
    );
};

export default Library;
