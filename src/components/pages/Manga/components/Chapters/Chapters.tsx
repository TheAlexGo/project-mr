import React, { useCallback, useEffect, useState, FC } from 'react';

import { useParams } from 'react-router-dom';

import { Chapter } from '@components/Chapter/Chapter';
import { getChaptersMock } from '@mock';
import { IChapter } from '@types';

export const Chapters: FC = (): JSX.Element => {
    const [chapters, setChapters] = useState<IChapter[]>([]);
    const { mangaId } = useParams();

    const renderChapters = useCallback(() => {
        if (!mangaId) {
            return null;
        }
        return chapters.map((chapter) => (
            <Chapter key={chapter.id} {...chapter} mangaId={Number.parseInt(mangaId, 10)} />
        ));
    }, [chapters, mangaId]);

    useEffect(() => {
        setChapters(getChaptersMock(10));
    }, []);

    return <div>{renderChapters()}</div>;
};
