import React, { useEffect, useMemo, useState } from 'react';

import { Axes, CardList } from '@components/CardList/CardList';
import { Icons } from '@components/Icon/Icon';
import { useController } from '@hooks/useController';
import { usePage } from '@hooks/usePage';
import { useStore } from '@hooks/useStore';
import { getMangaCardsMock } from '@mock';
import { IMangaCard, Pages } from '@types';
import { getIconObj } from '@utils/header';

import { Page } from '../Page/Page';

import classes from './Library.module.styl';

const Library = () => {
    const [items, setItems] = useState<IMangaCard[]>([]);
    const { locale } = useStore();
    const { debug } = useController();

    const headerButtons = useMemo(
        () => [
            getIconObj(Icons.SEARCH, () => debug('Нажали на поиск!'), locale),
            getIconObj(Icons.TRASH, () => debug('Нажали на удаление!'), locale)
        ],
        [locale, debug]
    );

    useEffect(() => {
        setItems(getMangaCardsMock(100));
    }, []);

    usePage(Pages.LIBRARY, headerButtons, true);

    return (
        <Page className={classes.container}>
            <CardList axis={Axes.Y} cards={items} />
        </Page>
    );
};

export default Library;
