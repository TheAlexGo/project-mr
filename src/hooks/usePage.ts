import { useEffect } from 'react';

import { useLocation } from 'react-router-dom';

import { IIcon } from '@components/Icon/Icon';
import { useController } from '@hooks/useController';
import { Pages } from '@types';

/**
 * Хук для загрузки UI страницы (шапки)
 *
 * ИСПОЛЬЗОВАТЬ ВО ВСЕХ КОМПОНЕНТАХ СТРАНИЦ
 * @param headerButtons
 * @param withHeading
 */
export const usePage = (headerButtons: IIcon[] = [], withHeading = false) => {
    const { changePage } = useController();
    const location = useLocation();

    useEffect(() => {
        const currentPage = Object.entries(Pages).find(([, value]) => location.pathname === value);
        if (currentPage) {
            changePage(currentPage, headerButtons, withHeading);
        }
    }, [location.pathname, changePage, headerButtons, withHeading]);
};
