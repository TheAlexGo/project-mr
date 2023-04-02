import React, { FC, useEffect, useState } from 'react';

import { Axes, CardList } from '@components/CardList/CardList';
import { useResponse } from '@hooks/useResponse';
import { IMangaCard } from '@types';

import { Page } from '../Page/Page';

const General: FC = () => {
    const { getTopList } = useResponse();
    const [items, setItems] = useState<IMangaCard[]>([]);

    useEffect(() => {
        getTopList().then(setItems);
    }, [getTopList]);

    return (
        <Page>
            <CardList axis={Axes.X} cards={items} title="Продолжите чтение" />
        </Page>
    );
};

export default General;
