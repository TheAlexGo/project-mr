import React, { useCallback, useEffect, FC } from 'react';

import { observer } from 'mobx-react-lite';
import { useParams } from 'react-router-dom';

import { Loading } from '@components/Loading/Loading';
import { useController } from '@hooks/useController';
import { useStore } from '@hooks/useStore';

import { MangaContent } from './components/MangaContent/MangaContent';
import { Page } from '../Page/Page';

const Manga: FC = observer((): JSX.Element => {
    const { mangaId } = useParams();
    const { activeManga } = useStore();
    const { loadMangaPage } = useController();

    const renderContent = useCallback(() => {
        if (!activeManga) {
            return null;
        }

        return <MangaContent {...activeManga} />;
    }, [activeManga]);

    useEffect(() => {
        if (!mangaId) {
            return;
        }
        loadMangaPage(Number.parseInt(mangaId, 10));
    }, [loadMangaPage, mangaId]);

    return (
        <Page withBlankHeading headerWithBack isTransparentHeader>
            <Loading condition={activeManga !== null}>{renderContent()}</Loading>
        </Page>
    );
});

export default Manga;
