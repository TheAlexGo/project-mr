import React, { FC, useState, useEffect } from 'react';

import { CardList, Axes } from '@components/CardList/CardList';
import { getMangaCardsMock } from '@mock';
import { IMangaCard } from '@types';

export const Catalog: FC = (): JSX.Element => {
    const [items, setItems] = useState<IMangaCard[]>([]);

    useEffect(() => {
        setItems(getMangaCardsMock(30));
    }, []);

    return <CardList axis={Axes.Y} cards={items} />;
};
