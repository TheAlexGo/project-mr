import React from 'react';

import { usePage } from '@hooks/usePage';
import { Pages } from '@types';

import { Page } from '../Page/Page';

const Manga = () => {
    usePage(Pages.MANGA);
    return <Page>Страница манги</Page>;
};

export default Manga;
