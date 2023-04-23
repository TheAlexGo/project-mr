import React, { useMemo } from 'react';

import { usePage } from '@hooks/usePage';
import { Pages } from '@types';

import { Page } from '../Page/Page';

const Manga = () => {
    const headerButtons = useMemo(() => [], []);
    usePage(Pages.MANGA, headerButtons);
    return <Page>Страница манги</Page>;
};

export default Manga;
