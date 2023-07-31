import { useLayoutEffect } from 'react';

import { useLocation } from 'react-router-dom';

import { useController } from '@hooks/useController';

/**
 * Инициализация layout'а страницы.
 *
 * Здесь мы устанавливаем основные слушатели событий навигации по страницам в рамках конкретного layout'а
 */
export const useLayoutInit = () => {
    const { changePage, mountPage, unmountPage, savePageState, saveHashState } = useController();
    const { pathname, hash } = useLocation();

    /**
     * Первое событие - загрузка страницы
     */
    useLayoutEffect(() => {
        mountPage(pathname + hash);
    }, [hash, pathname, mountPage]);

    /**
     * Происходит смена страница
     */
    useLayoutEffect(() => {
        changePage(pathname + hash);
    }, [changePage, hash, pathname]);

    /**
     * Сохранеем состояние для страницы с хешем
     */
    useLayoutEffect(
        () => () => {
            /**
             * Сохраняем только если имеется хэш
             */
            if (!hash) {
                return;
            }
            saveHashState(pathname + hash);
        },
        [hash, pathname, saveHashState]
    );

    /**
     * Сохраняем состояние прямо до размонтирования DOM-элементов, для корректного сохранения позиции
     */
    useLayoutEffect(() => () => savePageState(pathname), [savePageState, pathname]);

    /**
     * Последнее событие - выход со страницы
     */
    useLayoutEffect(() => unmountPage, [unmountPage, pathname, hash]);
};
