import { useRef, type MouseEvent } from 'react';

import { getAriaSelected } from '../../utils/dom';
import { useFocus } from '../../utils/useFocus';

import type { IItemExpandedMainProps, TMenuItemExpandedProps } from '../../types';
import type { IMenuItemCore } from '@hooks/a11y/types';

export const MenuItemExpanded = <IMenuItemExpandedAdditionalData extends IMenuItemCore>({
    tabIndex,
    withFocus,
    selectedSubMenuItemTitle,
    'aria-expanded': isExpanded,
    'aria-haspopup': hasChildren,
    clickMenuItemHandler,
    keyDownMenuItemHandler,
    focusMenuItemHandler,
    renderItemExpanded,
    initialProps
}: TMenuItemExpandedProps<IMenuItemExpandedAdditionalData>) => {
    const menuItemExpandedRef = useRef<HTMLElement>(null);

    const clickHandler = (e: MouseEvent) => {
        e.stopPropagation();
        clickMenuItemHandler(e);
    };

    const attrs: IItemExpandedMainProps = {
        core: {
            id: initialProps.id,
            tabIndex,
            selectedSubMenuItemTitle,
            onClick: clickHandler,
            onKeyDown: keyDownMenuItemHandler,
            onFocus: focusMenuItemHandler,
            'aria-haspopup': hasChildren,
            'aria-expanded': isExpanded || false,
            'aria-selected': getAriaSelected(initialProps.isSelected),
            ref: menuItemExpandedRef
        }
    };

    useFocus(menuItemExpandedRef, withFocus);

    return renderItemExpanded(attrs, initialProps);
};
