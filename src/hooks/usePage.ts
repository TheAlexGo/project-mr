import { useEffect } from 'react';

import { IIcon } from '@components/Icon/Icon';
import { useController } from '@hooks/useController';
import { Pages } from '@types';

/**
 * Хук для загрузки UI страницы (шапки)
 *
 * ИСПОЛЬЗОВАТЬ ВО ВСЕХ КОМПОНЕНТАХ СТРАНИЦ
 * @param page
 * @param headerButtons
 * @param withHeading
 * @param withBack
 */
export const usePage = (
    page: Pages,
    headerButtons: IIcon[] = [],
    withHeading = false,
    withBack = false
) => {
    const { loadPage, changePage, leavePage } = useController();

    useEffect(() => {
        changePage(page, headerButtons, withHeading, withBack);
    }, [changePage, headerButtons, page, withBack, withHeading]);

    useEffect(() => {
        loadPage();
        return leavePage;
    }, [leavePage, loadPage]);
};
