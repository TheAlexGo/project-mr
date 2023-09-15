import { IMenu } from '@components/ContextMenu/types';
import { Icons } from '@components/Icon/Icon';
import { IMenuItemCore, TMenuItemFirstData } from '@hooks/a11y/types';

export interface IMenuItem extends IMenuItemCore {
    icon: Icons;
}

export interface IMenuItemExpanded extends IMenuItemCore {
    icon: Icons;
    ariaLabelForSelected: string;
}

export interface ISubMenuItem extends IMenuItemCore {
    icon: Icons;
}

export type TMenu = IMenu<IMenuItem, IMenuItemExpanded, ISubMenuItem>;

export type MenuTypeUnion = TMenuItemFirstData<IMenuItem, IMenuItemExpanded, ISubMenuItem>;
