import React, { type MouseEvent } from 'react';

import { SubMenuItem } from '../SubMenuItem/SubMenuItem';

import type { TDropDownMenuProps } from '../../types';
import type { IMenuItemCore } from '@hooks/a11y/types';

const attrs = {
    core: {
        onClick: (event: MouseEvent) => event.stopPropagation()
    }
};

export const DropDownMenu = <ISubMenuItemAdditionalData extends IMenuItemCore>({
    parentId,
    children,
    clickSubMenuItemHandler,
    keyDownSubMenuItemHandler,
    focusSubMenuItemHandler,
    renderSubItem,
    renderDropDownMenu,
    initialChildren
}: TDropDownMenuProps<ISubMenuItemAdditionalData>): JSX.Element =>
    renderDropDownMenu(
        attrs,
        children.map((subItem, index) => (
            <SubMenuItem<ISubMenuItemAdditionalData>
                {...subItem}
                key={subItem.id}
                parentId={parentId}
                keyDownSubMenuItemHandler={keyDownSubMenuItemHandler}
                clickSubMenuItemHandler={clickSubMenuItemHandler}
                focusSubMenuItemHandler={focusSubMenuItemHandler}
                renderSubItem={renderSubItem}
                initialProps={initialChildren[index]}
            />
        ))
    );
