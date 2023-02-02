import { Links, ModalLinks } from '@types';

import { CustomString } from './customClasses';

export const getModalLink = (mainModalLink: ModalLinks, additionalModalLink = '') =>
    additionalModalLink + mainModalLink;

export const getMangaPageLink = (id: number) => `/${Links.LIBRARY}/${Links.MANGA}/${id}`;

export const getReadlistPageLink = (title: string, id: number) =>
    `/${Links.LIBRARY}/${Links.READLIST}/${id}/${new CustomString(title).toURL()}`;
