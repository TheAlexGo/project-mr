import React, { FC } from 'react';

import { observer } from 'mobx-react-lite';
import ReactList from 'react-list';

import { MangaCard } from '@components/Card/components/MangaCard/MangaCard';
import { Header } from '@components/Header/Header';
import { Page } from '@pages/Page/Page';
import { Pages } from '@types';
import { getMangaCardMock } from '@utils/mockData';

import classes from './General.module.styl';

export const General: FC = observer(() => (
    <Page>
        <Header activePage={Pages.GENERAL} className={classes.general__header} />
        <div className={classes.general__block}>
            <ReactList />
        </div>
        <MangaCard {...getMangaCardMock()} />
    </Page>
));
