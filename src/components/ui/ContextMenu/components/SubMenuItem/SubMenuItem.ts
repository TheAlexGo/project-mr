import { useRef } from 'react';

import { getAriaSelected } from '../../utils/dom';
import { useFocus } from '../../utils/useFocus';

import type { ISubItemMainProps, TSubMenuItem } from '../../types';
import type { IMenuItemCore } from '@hooks/a11y/types';

export const SubMenuItem = <ISubMenuItemAdditionalData extends IMenuItemCore>({
    tabIndex,
    withFocus,
    clickSubMenuItemHandler,
    keyDownSubMenuItemHandler,
    focusSubMenuItemHandler,
    renderSubItem,
    initialProps
}: TSubMenuItem<ISubMenuItemAdditionalData>) => {
    const subMenuItemRef = useRef<HTMLLIElement>(null);

    const attrs: ISubItemMainProps = {
        core: {
            id: initialProps.id,
            tabIndex,
            onClick: clickSubMenuItemHandler,
            onKeyDown: keyDownSubMenuItemHandler,
            onFocus: focusSubMenuItemHandler,
            'aria-selected': getAriaSelected(initialProps.isSelected),
            ref: subMenuItemRef
        }
    };

    useFocus(subMenuItemRef, withFocus);

    return renderSubItem(attrs, initialProps);
};
