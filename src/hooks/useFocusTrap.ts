import { RefObject, useCallback, useEffect, useState } from 'react';

import { TAB } from '@utils/constants';
import { getKeyboardFocusableElements } from '@utils/dom';

/**
 * Замыкает табуляцию по элементам внутри элемента-контейнера (см. использование в Modal)
 * @see Modal
 */
export const useFocusTrap = (ref: RefObject<HTMLElement>) => {
    const [firstElement, setFirstElement] = useState<HTMLElement | null>(null);
    const [lastElement, setLastElement] = useState<HTMLElement | null>(null);

    /**
     * Получаем первый и последний фокусируемые элементы
     */
    useEffect(() => {
        const { current } = ref;
        if (!current || firstElement || lastElement) {
            return;
        }
        const focusableElements = getKeyboardFocusableElements(current);
        const firstEl = focusableElements[0] as HTMLElement;
        const lastEl = focusableElements[focusableElements.length - 1] as HTMLElement;
        setFirstElement(firstEl);
        setLastElement(lastEl);
    }, [firstElement, lastElement, ref]);

    const tabPressHandler = useCallback(
        (e: KeyboardEvent) => {
            if (e.key !== TAB) {
                return;
            }
            const { activeElement } = document;
            if (e.shiftKey) {
                if (activeElement === firstElement) {
                    if (lastElement) {
                        lastElement.focus();
                    }
                    e.preventDefault();
                }
            } else if (activeElement === lastElement) {
                if (firstElement) {
                    firstElement.focus();
                }
                e.preventDefault();
            }
        },
        [firstElement, lastElement]
    );

    /**
     * После получения первого элемента - фокусируемся на него
     */
    useEffect(() => {
        if (firstElement) {
            firstElement.focus();
        }
    }, [firstElement]);

    useEffect(() => {
        document.addEventListener('keydown', tabPressHandler);
        return () => document.removeEventListener('keydown', tabPressHandler);
    }, [tabPressHandler]);
};
