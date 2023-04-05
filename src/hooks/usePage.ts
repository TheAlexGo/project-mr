import { useEffect } from 'react';

import { IIcon } from '@components/Icon/Icon';
import { useController } from '@hooks/useController';
import { Pages } from '@types';
import { getPageName } from '@utils/routing';

/**
 * Хук для загрузки UI страницы (шапки)
 *
 * ИСПОЛЬЗОВАТЬ ВО ВСЕХ КОМПОНЕНТАХ СТРАНИЦ
 * @param page
 * @param headerButtons
 * @param withHeading
 */
export const usePage = (page: Pages, headerButtons: IIcon[] = [], withHeading = false) => {
    const { loadPage, changePage, leavePage } = useController();

    useEffect(() => {
        const currentPage = getPageName(page);
        if (currentPage) {
            changePage(currentPage, headerButtons, withHeading);
        }
    }, [changePage, headerButtons, page, withHeading]);

    useEffect(() => {
        loadPage();
        return leavePage;
    }, [leavePage, loadPage]);
};
