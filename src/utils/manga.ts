import { store } from '@store';
import { IMangaTitle } from '@types';

/**
 * Получение манги на выбранном языке (если есть)
 * */
export const getMangaTitle = (titles: IMangaTitle[]) => {
    const { lang, defaultLang } = store;

    let mangaTitle = titles.find((t) => t.lang === lang);
    if (!mangaTitle) {
        mangaTitle = titles.find((t) => t.lang === defaultLang);
    }
    return (mangaTitle && mangaTitle.title) || '';
};
