import type { AriaAttributes, MutableRefObject } from 'react';

export const setFocus = (ref: MutableRefObject<HTMLElement | null>) => {
    const { current } = ref;
    if (!current) {
        return;
    }

    current?.focus();
};

export const getAriaSelected = (isSelected: boolean | undefined): AriaAttributes['aria-selected'] =>
    `${isSelected || false}`;
