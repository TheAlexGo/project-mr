import React, { FC, useMemo } from 'react';

import { Card } from '@components/Card/Card';
import { useStore } from '@hooks/useStore';
import { IMangaCard, MangaFnCallback } from '@types';
import { getMangaPageLink } from '@utils/routing';

import { Tools } from './components/Tools/Tools';

export interface IMangaCardProps extends IMangaCard {
    /** Внешний класс */
    className?: string;
    /** Слушатель события удаления карточки */
    onDelete?: MangaFnCallback;
}

export const MangaCard: FC<IMangaCardProps> = ({ className, onDelete, ...manga }) => {
    const { lang, defaultLang } = useStore();
    const { id, titles, coverUri } = manga;
    const link = getMangaPageLink(id);

    const title = useMemo(
        () =>
            titles.find((t) => t.langEnum === lang)?.title ||
            titles.find((t) => t.langEnum === defaultLang)?.title ||
            '',
        [defaultLang, lang, titles]
    );

    return (
        <Card className={className} title={title} image={coverUri} href={link}>
            <Tools {...manga} onDelete={onDelete} />
        </Card>
    );
};
