import React, { FC } from 'react';

import { ContextMenu, TContextMenuProps } from '@components/ContextMenu/ContextMenu';
import { DropDownMenu } from '@components/ContextMenu/ui/ButtonMenu/components/DropDownMenu/DropDownMenu';
import { ItemExpanded } from '@components/ContextMenu/ui/ButtonMenu/components/ItemExpanded/ItemExpanded';
import { SubMenuItem } from '@components/ContextMenu/ui/ButtonMenu/components/SubMenuItem/SubMenuItem';

import { IMenuItem, IMenuItemExpanded, ISubMenuItem, MenuTypeUnion, TMenu } from './types';

const renderItemExpanded: TMenu['renderItemExpanded'] = (additionalProps, initialProps) => (
    <ItemExpanded additionalProps={additionalProps} initialProps={initialProps} />
);

const renderDropDownMenu: TMenu['renderDropDownMenu'] = (additionalProps, children) => (
    <DropDownMenu additionalProps={additionalProps}>{children}</DropDownMenu>
);

const renderSubItem: TMenu['renderSubItem'] = (additionalProps, initialProps) => (
    <SubMenuItem additionalProps={additionalProps} initialProps={initialProps} />
);

interface IButtonMenu extends TContextMenuProps<IMenuItem, IMenuItemExpanded, ISubMenuItem> {
    items: MenuTypeUnion[];
}

export const ButtonMenu: FC<IButtonMenu> = ({ items, ...props }): JSX.Element => (
    <ContextMenu<IMenuItem, IMenuItemExpanded, ISubMenuItem>
        {...props}
        listAttributes={{
            id: 'button-menu'
        }}
        items={items}
        renderItemExpanded={renderItemExpanded}
        renderDropDownMenu={renderDropDownMenu}
        renderSubItem={renderSubItem}
    />
);
