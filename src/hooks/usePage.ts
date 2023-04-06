import { useEffect } from 'react';

import { useLocation } from 'react-router-dom';

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

    const location = useLocation();

    useEffect(() => {
        changePage(location.pathname, headerButtons, withHeading, withBack);
    }, [changePage, headerButtons, location, withBack, withHeading]);

    useEffect(() => {
        loadPage();
        return leavePage;
    }, [leavePage, loadPage]);
};
