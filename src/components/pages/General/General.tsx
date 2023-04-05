import React, { FC, useCallback, useEffect, useState } from 'react';

import { Axes, CardList, ScrollSnapTypes } from '@components/CardList/CardList';
import { useResponse } from '@hooks/useResponse';
import { IMangaCard } from '@types';

import { Page } from '../Page/Page';

import classes from './General.module.styl';

const General: FC = () => {
    const { getTopList, getContinueReadingList, getComedyList } = useResponse();
    const [continueReadingList, setContinueReadingList] = useState<IMangaCard[]>([]);
    const [topList, setTopList] = useState<IMangaCard[]>([]);
    const [comedyList, setComedyList] = useState<IMangaCard[]>([]);

    useEffect(() => {
        getContinueReadingList().then(setContinueReadingList);
        getTopList().then(setTopList);
        getComedyList().then(setComedyList);
    }, [getComedyList, getContinueReadingList, getTopList]);

    const renderAllLists = useCallback(() => {
        const array = [
            {
                title: 'Продолжите чтение',
                elements: continueReadingList
            },
            {
                title: 'Топ 10 в этом месяце',
                elements: topList
            },
            {
                title: 'Комедия: популярное',
                elements: comedyList
            }
        ];

        return array.map((cards) => (
            <div key={cards.title} className={classes.list}>
                <CardList
                    axis={Axes.X}
                    cards={cards.elements}
                    title={cards.title}
                    scrollSnap={ScrollSnapTypes.X_Mandatory}
                />
            </div>
        ));
    }, [comedyList, continueReadingList, topList]);

    return <Page className={classes.container}>{renderAllLists()}</Page>;
};

export default General;
