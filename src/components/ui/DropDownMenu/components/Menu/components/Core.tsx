import React from 'react';

import { NavigationType, OrientationType, useFocusTrap } from '@hooks/useFocusTrap';
import { KeyboardKeys } from '@utils/constants';

import { DynamicTag } from '../../../../DynamicTag/DynamicTag';
import { useStore } from '../../../store/store';
import { isCurrentKey } from '../utils/keyboard';

import type { ValidTags, MenuCoreProps } from '../types';

type CoreProps<T extends ValidTags> = MenuCoreProps<T> & {
    as?: T;
    /** Дополнительный обработчик нажатия клавиш. Доступны все ключи, кроме тех, что указаны в isCurrentKey(key) */
    onKeyDown?: (e: KeyboardEvent) => void;
};

/**
 * Базовый компонент, на основе которого можно создавать другие меню с кастомной логикой.
 * @param as
 * @param className
 * @param onKeyDown
 * @param children
 * @constructor
 */
export const Core = <T extends ValidTags>({
    as = 'div' as T,
    onKeyDown,
    children,
    ...props
}: CoreProps<T>) => {
    const { options, buttonRef, menuRef, setIsOpen } = useStore();

    const closeCallback = () => {
        setIsOpen(false);
    };

    const focusToMenuButton = () => {
        buttonRef.current?.focus();
    };

    const additionalKeyDownHandler = (e: KeyboardEvent) => {
        switch (e.key) {
            case KeyboardKeys.ESCAPE:
                if (options.closeByEscape) {
                    closeCallback();
                } else {
                    focusToMenuButton();
                }
                break;
            case KeyboardKeys.ARROW_RIGHT:
            case KeyboardKeys.ARROW_LEFT:
                closeCallback();
                break;
            default:
                if (isCurrentKey(e.key)) {
                    onKeyDown?.(e);
                }
                break;
        }
    };

    useFocusTrap(menuRef.current, {
        navigation: NavigationType.ARROWS,
        orientation: OrientationType.VERTICAL,
        onKeyDown: additionalKeyDownHandler,
        withAutoFocus: options.focusToActiveElementAfterOpen,
        focusToPrevElementAfterUnmount: options.focusToButtonAfterClose,
        needRerender: children
    });

    const setRefCallback = (elRef: HTMLElement) => {
        menuRef.current = elRef;
    };

    return (
        <DynamicTag role="menu" {...props} as={as as ValidTags} ref={setRefCallback}>
            {children}
        </DynamicTag>
    );
};
