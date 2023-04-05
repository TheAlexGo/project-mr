import React, { useEffect, useState } from 'react';

import { Axes, CardList, ScrollSnapTypes } from '@components/CardList/CardList';
import { getMangaCardsMock } from '@mock';
import { IMangaCard } from '@types';

import { Page } from '../Page/Page';

import classes from './Library.module.styl';

const Library = () => {
    const [items, setItems] = useState<IMangaCard[]>([]);
    useEffect(() => {
        setItems(getMangaCardsMock(10));
    }, []);

    return (
        <Page className={classes.container}>
            <CardList axis={Axes.Y} cards={items} scrollSnap={ScrollSnapTypes.Y_Mandatory} />
        </Page>
    );
};

export default Library;
