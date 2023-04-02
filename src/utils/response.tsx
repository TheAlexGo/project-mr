import { createContext } from 'react';

import { getMangaListMock } from '@mock';
import { IMangaCard } from '@types';

class ResponseBuilder {
    private client: null;

    constructor(uri = 'https://') {
        this.client = null;
    }

    async getTopList(): Promise<IMangaCard[]> {
        return getMangaListMock(100);
    }

    async getComedyList(): Promise<IMangaCard[]> {
        return getMangaListMock(6);
    }

    async getNewChapterList(): Promise<IMangaCard[]> {
        return getMangaListMock(7);
    }

    async getRecentList(): Promise<IMangaCard[]> {
        return getMangaListMock(20);
    }
}
export const responseBuilder = new ResponseBuilder('/');

export const responseBuilderContext = createContext<ResponseBuilder>(responseBuilder);
