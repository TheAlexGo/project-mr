import React, { type JSX } from 'react';

import { Core } from './Core';
import { useStore } from '../../../store/store';

import type { MenuCoreProps, ValidTags } from '../types';

/**
 * Выпадающее меню, которое используется при поиске чего-либо.
 * @param children
 * @param props
 * @constructor
 */
export const Search = <T extends ValidTags>({ ...props }: MenuCoreProps<T>): JSX.Element => {
    const { buttonRef } = useStore();

    const focusToMenuButton = () => {
        buttonRef.current?.focus();
    };

    /**
     * При печати текста возвращаем фокус на элемент DropDownMenu.Button
     * @param e
     */
    const keyDownHandler = (e: KeyboardEvent) => {
        focusToMenuButton();
        props.onKeyDown?.(e);
    };

    return <Core {...props} onKeyDown={keyDownHandler} />;
};
