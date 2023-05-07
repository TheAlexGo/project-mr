import { createContext } from 'react';

import { getMangaCardsMock, getMangaMock, getMangaListMock } from '@mock';
import { store, Store } from '@store';
import { ICatalogItemsRequest, IManga, IMangaCard } from '@types';

export class ResponseBuilder {
    private client: null;
    private readonly store: Store;

    constructor(store: Store) {
        this.client = null;
        this.store = store;
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

    async getCatalogItems(): Promise<ICatalogItemsRequest> {
        const { catalogElements } = this.store;
        return new Promise((resolve) => {
            setTimeout(() => {
                if (catalogElements.length > 100) {
                    return resolve({
                        items: [],
                        hasMore: false
                    });
                }

                return resolve({
                    items: getMangaCardsMock(30),
                    hasMore: true
                });
            }, 1000);
        });
    }

    async getMyCollectionItems(): Promise<ICatalogItemsRequest> {
        const { myCollectionElements } = this.store;
        return new Promise((resolve) => {
            setTimeout(() => {
                if (myCollectionElements.length > 20) {
                    return resolve({
                        items: [],
                        hasMore: false
                    });
                }

                return resolve({
                    items: getMangaCardsMock(5),
                    hasMore: true
                });
            }, 1000);
        });
    }

    async getManga(mangaId: number): Promise<IManga> {
        return new Promise((resolve) => {
            setTimeout(() => resolve(getMangaMock(mangaId)), 1000);
        });
    }
}
export const responseBuilder = new ResponseBuilder(store);

export const responseBuilderContext = createContext<ResponseBuilder>(responseBuilder);
