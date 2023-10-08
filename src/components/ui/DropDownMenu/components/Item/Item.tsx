import React, {
    useState,
    type MouseEventHandler,
    type ElementType,
    type FocusEventHandler,
    type ReactNode
} from 'react';

import { DynamicTag } from '../../../DynamicTag/DynamicTag';
import { useStore } from '../../store/store';

import type { OverwritableType } from '../../../DynamicTag/DynamicTag';

type ValidTags = ElementType;

interface IDropDownMenuItem<T> {
    isSelected: boolean;
    as?: T;
    children?: ReactNode;
}

export const Item = <T extends ValidTags = 'button'>({
    as = 'button' as T,
    isSelected,
    children,
    ...props
}: OverwritableType<IDropDownMenuItem<T>, T>): JSX.Element => {
    const [isActive, setIsActive] = useState(false);

    const { options, containerRef, buttonRef, setIsOpen } = useStore();

    const focusHandler: FocusEventHandler = (e) => {
        setIsActive(true);
        props?.onFocus?.(e);
    };

    const blurHandler: FocusEventHandler = (e) => {
        const isOurElement = containerRef.current?.contains(e.relatedTarget);
        /**
         * Если следующий активный элемент не входит в наше меню, то оставляем tabIndex="0" (isActive = true)
         */
        if (isOurElement) {
            setIsActive(false);
        }
        if (options.closeMenuAfterBlur && !isOurElement) {
            setIsOpen(false);
        }
        props?.onBlur?.(e);
    };

    const clickHandler: MouseEventHandler = (e) => {
        if (options.closeMenuAfterSelect) {
            setIsOpen(false);
        }
        if (options.focusToButtonAfterSelect) {
            buttonRef.current?.focus();
        }
        props.onClick?.(e);
    };

    return (
        <DynamicTag
            as={as as ValidTags}
            role="menuitemradio"
            aria-checked={isSelected}
            {...props}
            tabIndex={isActive ? 0 : -1}
            onFocus={focusHandler}
            onBlur={blurHandler}
            onClick={clickHandler}
        >
            {children}
        </DynamicTag>
    );
};
