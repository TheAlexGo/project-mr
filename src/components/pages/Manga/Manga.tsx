import React, { FC, useCallback, useEffect, useLayoutEffect, useMemo } from 'react';

import { observer } from 'mobx-react-lite';
import { useParams } from 'react-router-dom';

import { Loading } from '@components/Loading/Loading';
import { useController } from '@hooks/useController';
import { useStore } from '@hooks/useStore';
import { Pages } from '@types';
import { getMangaPageLink } from '@utils/routing';

import { MangaContent } from './components/MangaContent/MangaContent';
import { Page } from '../Page/Page';

const Manga: FC = observer((): JSX.Element => {
    const { mangaId: mid } = useParams();
    const { activeManga } = useStore();
    const { loadMangaPage, updateNavigate } = useController();

    const mangaId = useMemo(() => (mid ? Number.parseInt(mid, 10) : null), [mid]);

    const renderContent = useCallback(() => {
        if (!activeManga) {
            return null;
        }

        return <MangaContent {...activeManga} />;
    }, [activeManga]);

    useLayoutEffect(() => {
        updateNavigate(Pages.LIBRARY, Pages.LIBRARY);
        return () => {
            if (mangaId) {
                updateNavigate(Pages.LIBRARY, getMangaPageLink(mangaId));
            }
        };
    }, [mangaId, updateNavigate]);

    useEffect(() => {
        if (!mangaId) {
            return;
        }
        loadMangaPage(mangaId);
    }, [loadMangaPage, mangaId]);

    return (
        <Page withBlankHeading headerWithBack isTransparentHeader>
            <Loading condition={activeManga !== null}>{renderContent()}</Loading>
        </Page>
    );
});

export default Manga;
