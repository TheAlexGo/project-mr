import React, { type ElementType, useRef, useEffect } from 'react';

import { fillRefs } from '@utils/fillRefs';

import { DynamicTag } from '../../../DynamicTag/DynamicTag';
import { useStore } from '../../store/store';

import type { OverwritableType } from '../../../DynamicTag/DynamicTag';

type ValidTags = ElementType;

interface ITabItem<T> {
    as?: T;
    isSelected: boolean;
}

export const Item = <T extends ValidTags = 'button'>({
    as = 'button' as T,
    isSelected,
    ...props
}: OverwritableType<ITabItem<T>, T>): JSX.Element => {
    const { itemRefs, activeItem, setActiveItem } = useStore();
    const itemRef = useRef<HTMLElement | null>(null);

    const isActive = itemRef.current !== null && itemRef.current === activeItem;

    const focusHandler = () => {
        setActiveItem(itemRef.current);
    };

    useEffect(() => {
        fillRefs(itemRefs.current)(itemRef.current);
    }, [itemRefs]);

    return (
        <DynamicTag
            as={as as ValidTags}
            {...props}
            role="tab"
            aria-selected={isSelected}
            tabIndex={isActive ? 0 : -1}
            data-is-active={isActive}
            onFocus={focusHandler}
            ref={itemRef}
        />
    );
};
