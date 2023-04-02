import React, { useEffect, useState } from 'react';

import { Axes, CardList } from '@components/CardList/CardList';
import { getMangaCardsMock } from '@mock';
import { IMangaCard } from '@types';

import { Page } from '../Page/Page';

const Library = () => {
    const [items, setItems] = useState<IMangaCard[]>([]);
    useEffect(() => {
        setItems(getMangaCardsMock(10));
    }, []);

    return (
        <Page>
            <CardList axis={Axes.Y} cards={items} />
        </Page>
    );
};

export default Library;
