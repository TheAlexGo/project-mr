import { useEffect } from 'react';

import { useLocation } from 'react-router-dom';

import { useController } from '@hooks/useController';

/**
 * Инициализация страницы.
 *
 * Как правило, здесь мы загружаем корректное состояние страницы
 */
export const usePageInit = () => {
    const { hash } = useLocation();
    const { loadPageState } = useController();

    /**
     * Загружаем состояние страницы
     */
    useEffect(() => {
        loadPageState();
    }, [loadPageState, hash]);
};
