import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';

import { Axes, CardList, ScrollSnapTypes } from '@components/CardList/CardList';
import { Icons } from '@components/Icon/Icon';
import { useController } from '@hooks/useController';
import { usePage } from '@hooks/usePage';
import { useResponse } from '@hooks/useResponse';
import { useStore } from '@hooks/useStore';
import { IMangaCard } from '@types';
import { getIconObj } from '@utils/header';

import { Page } from '../Page/Page';

import classes from './General.module.styl';

const General: FC = () => {
    const [continueReadingList, setContinueReadingList] = useState<IMangaCard[]>([]);
    const [topList, setTopList] = useState<IMangaCard[]>([]);
    const [comedyList, setComedyList] = useState<IMangaCard[]>([]);

    const { locale } = useStore();
    const { logger } = useController();
    const { getTopList, getContinueReadingList, getComedyList } = useResponse();

    const headerButtons = useMemo(
        () => [
            getIconObj(Icons.BELL, () => logger('Нажали на колокольчик!'), locale),
            getIconObj(Icons.SEARCH, () => logger('Нажали на поиск!'), locale)
        ],
        [locale, logger]
    );

    usePage(headerButtons);

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
