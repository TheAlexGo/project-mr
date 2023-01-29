import { Conditions } from '@types';
// import { HEADING_HEIGHT } from '@utils/constants';

export const MAIN_PADDING = 16;
export const HEADER_HEIGHT = 54;
export const FOOTER_HEIGHT = 54;
export const TABS_HEIGHT = 68;
export const SEARCH_HEIGHT = 84;

export const getViewportHeight = (conditions: Conditions[]) => {
    const vh = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    let currentVh = vh - HEADER_HEIGHT - MAIN_PADDING - FOOTER_HEIGHT;

    conditions.forEach((condition: Conditions) => {
        switch (condition) {
        case Conditions.TABS:
            currentVh -= TABS_HEIGHT;
            break;
        case Conditions.SEARCH:
            currentVh -= SEARCH_HEIGHT;
            break;
        case Conditions.GENERAL:
            currentVh -= -HEADER_HEIGHT + 48 + MAIN_PADDING;
            break;
        case Conditions.READER:
            currentVh += FOOTER_HEIGHT;
            break;
        case Conditions.MODAL:
            currentVh -= -FOOTER_HEIGHT + 45;
            break;
        }
    });

    return currentVh;
};

export const getViewportWidth = () => {
    const vw = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    return vw;
};

export const isMobile = /Mobile|webOS|BlackBerry|IEMobile|MeeGo|mini|Fennec|Windows Phone|Android|iP(ad|od|hone)/i.test(
    navigator.userAgent
);
