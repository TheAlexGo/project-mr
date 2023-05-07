import { store } from '@store';
import { IMangaDescription, IMangaTitle } from '@types';

/**
 * Получение названия манги на выбранном языке (если есть)
 * @param titles
 */
export const getMangaTitle = (titles: IMangaTitle[]) => {
    const { lang, defaultLang } = store;

    let mangaTitle = titles.find((t) => t.lang === lang);
    if (!mangaTitle) {
        mangaTitle = titles.find((t) => t.lang === defaultLang);
    }
    return (mangaTitle && mangaTitle.title) || '';
};

/**
 * Получение описания манги на выбранном языке (если есть)
 * @param descriptions
 */
export const getMangaDescription = (descriptions: IMangaDescription[]) => {
    const { lang, defaultLang } = store;

    let mangaDescription = descriptions.find((d) => d.lang === lang);
    if (!mangaDescription) {
        mangaDescription = descriptions.find((d) => d.lang === defaultLang);
    }
    return (mangaDescription && mangaDescription.description) || '';
};
