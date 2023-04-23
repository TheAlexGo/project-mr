import { createContext } from 'react';

import { getMangaListMock } from '@mock';
import { IMangaCard } from '@types';

class ResponseBuilder {
    private client: null;

    constructor() {
        this.client = null;
    }

    async getContinueReadingList(): Promise<IMangaCard[]> {
        return getMangaListMock(5);
    }

    async getTopList(): Promise<IMangaCard[]> {
        return getMangaListMock(10);
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
export const responseBuilder = new ResponseBuilder();

export const responseBuilderContext = createContext<ResponseBuilder>(responseBuilder);
