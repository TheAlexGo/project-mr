import { ModalLinks } from '@types';

export const getModalLink = (mainModalLink: ModalLinks, additionalModalLink = '') =>
    additionalModalLink + mainModalLink;
