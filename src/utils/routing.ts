import { Pages, ModalLinks } from '@types';

import { CustomString } from './customClasses';

export const getModalLink = (mainModalLink: ModalLinks, additionalModalLink = '') =>
    additionalModalLink + mainModalLink;

export const getMangaPageLink = (id: number) => `${Pages.LIBRARY + Pages.MANGA}/${id}`;

export const getReadlistPageLink = (title: string, id: number) =>
    `${Pages.LIBRARY}/${Pages.READLIST}/${id}/${new CustomString(title).toURL()}`;
