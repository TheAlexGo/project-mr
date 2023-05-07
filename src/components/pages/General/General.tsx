import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';

import { Axes, CardList, ScrollSnapTypes } from '@components/CardList/CardList';
import { HeadingTypes, Heading } from '@components/Heading/Heading';
import { Icons } from '@components/Icon/Icon';
import { useController } from '@hooks/useController';
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
    const { debug } = useController();
    const { getTopList, getContinueReadingList, getComedyList } = useResponse();

    const headerButtons = useMemo(
        () => [
            getIconObj(Icons.BELL, () => debug('Нажали на колокольчик!'), locale),
            getIconObj(Icons.SEARCH, () => debug('Нажали на поиск!'), locale)
        ],
        [locale, debug]
    );

    useEffect(() => {
        getContinueReadingList().then(setContinueReadingList);
        getTopList().then(setTopList);
        getComedyList().then(setComedyList);
    }, [getComedyList, getContinueReadingList, getTopList]);

    const renderAllLists = useCallback(() => {
        const array = [
            {
                title: 'block-general-continue',
                elements: continueReadingList
            },
            {
                title: 'block-general-top',
                elements: topList
            },
            {
                title: 'block-general-comedy',
                elements: comedyList
            }
        ];

        return array.map((cards) => (
            <div key={cards.title} className={classes.list}>
                <CardList
                    axis={Axes.X}
                    cards={cards.elements}
                    title={locale[cards.title]}
                    scrollSnap={ScrollSnapTypes.X_Mandatory}
                />
            </div>
        ));
    }, [comedyList, continueReadingList, locale, topList]);

    return (
        <Page headerButtons={headerButtons} isInvisibleHeading>
            <Heading type={HeadingTypes.H2} isInvisible>
                {locale['page-/library-heading-2']}
            </Heading>
            <div className={classes.container}>{renderAllLists()}</div>
        </Page>
    );
};

export default General;
