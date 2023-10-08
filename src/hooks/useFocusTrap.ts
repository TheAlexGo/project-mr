import { useRef, useCallback, useEffect, useState } from 'react';

import { KeyboardKeys } from '@utils/constants';
import {
    getKeyboardFocusableElements,
    isSelectedElement,
    isSelectedElementByFlag
} from '@utils/dom';

export enum NavigationType {
    TAB = 'tab',
    ARROWS = 'arrows'
}
export enum OrientationType {
    HORIZONTAL = 'horizontal',
    VERTICAL = 'vertical'
}

interface IOptions {
    navigation?: NavigationType;
    orientation?: OrientationType;
    onKeyDown?: (e: KeyboardEvent) => void;
    withAutoFocus?: boolean;
    focusToPrevElementAfterUnmount?: boolean;
    needRerender?: unknown;
}

const defaultOptions: IOptions = {
    navigation: NavigationType.TAB,
    orientation: OrientationType.HORIZONTAL
};

/**
 * Замыкает навигацию по элементам внутри элемента-контейнера (см. использование в DropDownMenu.Menu или Tabs).
 *
 * @author alexander.gordeev (alexander.gordeev@vk.team)
 */
export const useFocusTrap = (
    el: HTMLElement | null,
    {
        onKeyDown,
        orientation = OrientationType.HORIZONTAL,
        navigation = NavigationType.TAB,
        withAutoFocus = true,
        focusToPrevElementAfterUnmount = true,
        needRerender
    }: IOptions = defaultOptions
) => {
    const [isMounted, setIsMounted] = useState(false);
    const [focusableElements, setFocusableElements] = useState<HTMLElement[]>([]);
    const [activeElement, setActiveElement] = useState<HTMLElement | null>(null);
    const [firstElement, setFirstElement] = useState<HTMLElement | null>(null);
    const [lastElement, setLastElement] = useState<HTMLElement | null>(null);

    const prevElement = useRef<HTMLElement | null>(null);

    /**
     * Перейти к следующему элементу
     */
    const focusToNextElement = useCallback(() => {
        const currentElementIndex = focusableElements.indexOf(activeElement as HTMLElement);
        let nextElement;
        if (activeElement === lastElement && firstElement) {
            nextElement = firstElement;
        } else {
            nextElement = focusableElements[currentElementIndex + 1];
        }
        nextElement.focus();
    }, [activeElement, firstElement, focusableElements, lastElement]);

    /**
     * Перейти к предыдущему элементу
     */
    const focusToPrevElement = useCallback(() => {
        const currentElementIndex = focusableElements.indexOf(activeElement as HTMLElement);
        let prevElement;
        if (activeElement === firstElement && lastElement) {
            prevElement = lastElement;
        } else {
            prevElement = focusableElements[currentElementIndex - 1];
        }
        prevElement.focus();
    }, [activeElement, firstElement, focusableElements, lastElement]);

    const focusTo = useCallback(
        (needPrev: boolean) => {
            if (needPrev) {
                focusToPrevElement();
            } else {
                focusToNextElement();
            }
        },
        [focusToNextElement, focusToPrevElement]
    );

    /**
     * Навигация с помощью таба
     */
    const tabPressHandler = useCallback(
        (e: KeyboardEvent) => {
            if (e.key !== KeyboardKeys.TAB) {
                return;
            }
            focusTo(e.shiftKey);
            e.preventDefault();
        },
        [focusTo]
    );

    /**
     * Навигация с помощью стрелок
     */
    const arrowPressHandler = useCallback(
        (e: KeyboardEvent) => {
            if (orientation === OrientationType.VERTICAL) {
                if (e.key !== KeyboardKeys.ARROW_UP && e.key !== KeyboardKeys.ARROW_DOWN) {
                    return;
                }

                focusTo(e.key === KeyboardKeys.ARROW_UP);
            } else {
                if (e.key !== KeyboardKeys.ARROW_LEFT && e.key !== KeyboardKeys.ARROW_RIGHT) {
                    return;
                }

                focusTo(e.key === KeyboardKeys.ARROW_LEFT);
            }
            e.preventDefault();
        },
        [focusTo, orientation]
    );

    /**
     * Общий слушатель клавиатуры
     */
    const keyDownHandler = useCallback(
        (e: KeyboardEvent) => {
            if (navigation === NavigationType.TAB) {
                tabPressHandler(e);
            } else if (navigation === NavigationType.ARROWS) {
                arrowPressHandler(e);
            }
            onKeyDown?.(e);
        },
        [navigation, onKeyDown, tabPressHandler, arrowPressHandler]
    );

    const focusInHandler = useCallback(
        (e: FocusEvent) => {
            if (focusableElements.find((item) => item === e.target)) {
                setActiveElement(e.target as HTMLElement);
            }
        },
        [focusableElements]
    );

    /**
     * Инициализируем состояние хука
     */
    const initHook = useCallback(() => {
        if (!el) {
            return;
        }
        const focusableElements = getKeyboardFocusableElements(el);
        const firstEl = focusableElements[0];
        const lastEl = focusableElements[focusableElements.length - 1];
        setFocusableElements(focusableElements);
        setFirstElement(firstEl);
        setLastElement(lastEl);

        /**
         * Ищем элемент, на который надо сфокусироваться.
         * В приоритете будут элементы с флагом data-is-active
         */
        const focusableElement =
            focusableElements.find(isSelectedElementByFlag) ||
            focusableElements.find(isSelectedElement) ||
            firstEl;
        setActiveElement(focusableElement);

        if (withAutoFocus) {
            /**
             * После получения элемента - фокусируемся на него
             */
            focusableElement.focus();
        }
    }, [el, withAutoFocus]);

    /**
     * Начинаем работу только после монтирования
     */
    useEffect(() => {
        setIsMounted(true);
        return () => {
            setIsMounted(false);
        };
    }, []);

    /**
     * Устанавливаем слушатели
     */
    useEffect(() => {
        if (!isMounted || !el) {
            return undefined;
        }
        el.addEventListener('keydown', keyDownHandler);
        el.addEventListener('focusin', focusInHandler);

        return () => {
            el.removeEventListener('keydown', keyDownHandler);
            el.removeEventListener('focusin', focusInHandler);
        };
    }, [isMounted, el, keyDownHandler, focusInHandler]);

    /**
     * Получаем первый и последний фокусируемые элементы
     */
    useEffect(() => {
        if (!isMounted) {
            return;
        }
        initHook();
    }, [isMounted, initHook, needRerender]);

    /**
     * Сохраняем элемент, с которого открыли окно, без ререндера, ведь нам он нужен будет только после анмаунта компонента
     */
    useEffect(() => {
        prevElement.current = document.activeElement as HTMLElement;
        return () => {
            /**
             * После выхода из модального окна - возвращаемся туда, откуда открыли окно
             */
            const { current } = prevElement;
            if (current && focusToPrevElementAfterUnmount) {
                current.focus();
            }
        };
    }, [focusToPrevElementAfterUnmount]);

    return keyDownHandler;
};
