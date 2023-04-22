import { Pages, ModalLinks } from '@types';

import { CustomString } from './customClasses';

export const getModalLink = (mainModalLink: ModalLinks, additionalModalLink = '') =>
    additionalModalLink + mainModalLink;

export const getMangaPageLink = (id: number) => `${Pages.MANGA}/${id}`;

export const getReadlistPageLink = (title: string, id: number) =>
    `${Pages.READLIST}/${id}/${new CustomString(title).toURL()}`;

export const getSearchPage = () => Pages.SEARCH;

export const getPageName = (page: string): Pages | null => {
    const result = Object.entries(Pages).find(([, value]) => page.includes(value));
    if (result) {
        return result[1] as Pages;
    }
    return null;
};
