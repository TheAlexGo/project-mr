import { useRef } from 'react';

import { getAriaSelected } from '../../utils/dom';
import { useFocus } from '../../utils/useFocus';

import type { IMenuItemMainProps, TMenuItem } from '../../types';
import type { IMenuItemCore } from '@hooks/a11y/types';

export const MenuItem = <IMenuAdditionalData extends IMenuItemCore>({
    withFocus,
    tabIndex,
    initialProps,
    keyDownMenuItemHandler,
    clickMenuItemHandler,
    focusMenuItemHandler,
    renderItem
}: TMenuItem<IMenuAdditionalData>) => {
    const menuItemRef = useRef<HTMLLIElement>(null);

    const attrs: IMenuItemMainProps = {
        core: {
            id: initialProps.id,
            tabIndex,
            onClick: clickMenuItemHandler,
            onKeyDown: keyDownMenuItemHandler,
            onFocus: focusMenuItemHandler,
            'aria-selected': getAriaSelected(initialProps.isSelected),
            ref: menuItemRef
        }
    };

    useFocus(menuItemRef, withFocus);

    return renderItem(attrs, initialProps);
};
