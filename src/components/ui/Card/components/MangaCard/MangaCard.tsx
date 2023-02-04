import React, { FC, useMemo } from 'react';

import { Card, TCardProps } from '@components/Card/Card';
import { IMangaCard, TMangaFnCallback } from '@types';
import { getMangaTitle } from '@utils/manga';
import { getMangaPageLink } from '@utils/routing';

import { Tools } from './components/Tools/Tools';

export interface IMangaCardProps extends IMangaCard, TCardProps {
    /** Слушатель события удаления карточки */
    onDelete?: TMangaFnCallback;
    /** Располагает название по центру */
    isTitleAlignCenter?: boolean;
}

export const MangaCard: FC<IMangaCardProps> = ({
    className,
    onDelete,
    onClick,
    isTitleAlignCenter = false,
    ...manga
}) => {
    const { id, titles, coverUri } = manga;
    const link = getMangaPageLink(id);

    const title = useMemo(() => getMangaTitle(titles), [titles]);

    return (
        <Card
            className={className}
            title={title}
            image={coverUri}
            href={link}
            isTitleAlignCenter={isTitleAlignCenter}
            onClick={onClick}
        >
            <Tools {...manga} onDelete={onDelete} />
        </Card>
    );
};
