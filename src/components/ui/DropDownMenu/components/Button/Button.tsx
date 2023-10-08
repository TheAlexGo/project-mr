import React, {
    forwardRef,
    useImperativeHandle,
    type MouseEventHandler,
    type FocusEventHandler,
    type ElementType,
    type KeyboardEventHandler,
    type ReactNode,
    type JSX
} from 'react';

import { KeyboardKeys } from '@utils/constants';
import { getKeyboardFocusableElements } from '@utils/dom';

import { DynamicTag } from '../../../DynamicTag/DynamicTag';
import { useStore } from '../../store/store';

import type { OverwritableType, OverwritableRef } from '../../../DynamicTag/DynamicTag';

type ValidTags = ElementType;

interface IButton<T> {
    as?: T;
    children?: ReactNode;
}

type TProps<T extends ValidTags> = OverwritableType<IButton<T>, T>;
type TRef<T extends ValidTags> = OverwritableRef<T>;

const ButtonWithoutRef = <T extends ValidTags = 'button'>(
    { as = 'button' as T, children, ...props }: TProps<T>,
    ref: TRef<T>
): JSX.Element => {
    const { options, containerRef, buttonRef, menuRef, isOpen, setIsOpen } = useStore();

    const clickHandler: MouseEventHandler = (e) => {
        setIsOpen((prevIsOpen) => {
            if (prevIsOpen) {
                if (options.openMenuAfterFocus) {
                    return prevIsOpen;
                }
            }
            return !prevIsOpen;
        });
        props?.onClick?.(e);
    };

    const focusToFirstElement = () => {
        const { current } = menuRef;
        if (current) {
            getKeyboardFocusableElements(current)[0]?.focus();
        }
    };

    const keyDownHandler: KeyboardEventHandler = (e) => {
        let needPreventEvent = false;
        switch (e.key) {
            case KeyboardKeys.ARROW_UP:
            case KeyboardKeys.ARROW_DOWN:
                if (isOpen) {
                    focusToFirstElement();
                } else {
                    setIsOpen(true);
                }
                needPreventEvent = true;
                break;
            default:
                break;
        }

        if (needPreventEvent) {
            e.preventDefault();
        }
        props?.onKeyDown?.(e);
    };

    const focusHandler: FocusEventHandler = (e) => {
        if (options.openMenuAfterFocus) {
            setIsOpen(true);
        }
        props?.onFocus?.(e);
    };

    const blurHandler: FocusEventHandler = (e) => {
        if (options.closeMenuAfterBlur && !containerRef.current?.contains(e.relatedTarget)) {
            setIsOpen(false);
        }
        props?.onBlur?.(e);
    };

    useImperativeHandle(ref, () => buttonRef.current);

    return (
        <DynamicTag
            aria-expanded={isOpen}
            {...props}
            as={as as ValidTags}
            onClick={clickHandler}
            onKeyDown={keyDownHandler}
            onFocus={focusHandler}
            onBlur={blurHandler}
            aria-haspopup="true"
            ref={buttonRef}
        >
            {children}
        </DynamicTag>
    );
};

type TCallback = <T extends ValidTags>(p: TProps<T> & { ref?: TRef<T> }) => JSX.Element;

export const Button = forwardRef(ButtonWithoutRef) as TCallback;
