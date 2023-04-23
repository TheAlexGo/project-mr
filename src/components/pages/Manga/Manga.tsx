import React, { useMemo, useCallback, useEffect, FC } from 'react';

import { observer } from 'mobx-react-lite';
import { useLocation, useParams } from 'react-router-dom';

import { Loading } from '@components/Loading/Loading';
import { useController } from '@hooks/useController';
import { useStore } from '@hooks/useStore';
import { Pages } from '@types';

import { MangaContent } from './components/MangaContent/MangaContent';
import { Page } from '../Page/Page';

const Manga: FC = observer((): JSX.Element => {
    const { mangaId } = useParams();
    const { activeManga, prevPage, currentStatePage } = useStore();
    const { loadMangaPage, updateNavigate } = useController();
    const { pathname, hash } = useLocation();

    const currentPrevLink = useMemo(() => {
        if (currentStatePage?.prevLink) {
            return currentStatePage.prevLink;
        }
        if (prevPage.startsWith(Pages.LIBRARY)) {
            return prevPage;
        }
        return Pages.LIBRARY;
    }, [currentStatePage?.prevLink, prevPage]);

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

    /**
     * Обновляем ссылку в навигации на ту вкладку, на которой остановился пользователь
     */
    useEffect(() => {
        updateNavigate(Pages.LIBRARY, currentPrevLink);
        return () => {
            updateNavigate(Pages.LIBRARY, pathname + hash);
        };
    }, [currentPrevLink, hash, pathname, updateNavigate]);

    return (
        <Page withBlankHeading headerWithBack isTransparentHeader>
            <Loading condition={activeManga !== null}>{renderContent()}</Loading>
        </Page>
    );
});

export default Manga;
