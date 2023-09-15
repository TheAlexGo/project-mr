import type {
    HTMLAttributes,
    MutableRefObject,
    ReactNode,
    MouseEvent,
    AriaAttributes
} from 'react';

import type {
    TDropDownMenuFull,
    TMenuItemExpandedFull,
    TSubMenuItemFull,
    TMenuItemFull,
    IMenuItemCore
} from '@hooks/a11y/types';
import type { IUseMenu } from '@hooks/a11y/useMenu';

type TRef = MutableRefObject<HTMLElement | null>;

/**
 * !!!
 * При формировании UI, обязательно надо прокинуть все данные из core. Именно они реализуют весь функционал
 * !!!
 */
export interface IMenuItemMainProps {
    core: {
        id: TMenuItemFull['id'];
        tabIndex: TMenuItemFull['tabIndex'];
        onClick: TMenuItemFull['clickMenuItemHandler'];
        onKeyDown: TMenuItemFull['keyDownMenuItemHandler'];
        onFocus: TMenuItemFull['focusMenuItemHandler'];
        ref: TRef;
    } & AriaAttributes;
}

export type TMenuItem<IMenuAdditionalData> = Omit<TMenuItemFull, keyof IMenuItemCore> & {
    initialProps: IMenuAdditionalData;
    /**
     * Функция рендера элемента меню первого уровня
     */
    renderItem: (mainProps: IMenuItemMainProps, props: IMenuAdditionalData) => JSX.Element;
};

export interface IItemExpandedMainProps {
    core: {
        id: TMenuItemExpandedFull['id'];
        tabIndex: TMenuItemExpandedFull['tabIndex'];
        onClick: TMenuItemExpandedFull['clickMenuItemHandler'];
        onKeyDown: TMenuItemExpandedFull['keyDownMenuItemHandler'];
        onFocus: TMenuItemExpandedFull['focusMenuItemHandler'];
        selectedSubMenuItemTitle: TMenuItemExpandedFull['selectedSubMenuItemTitle'];
        ref: TRef;
    } & AriaAttributes;
}

export type TMenuItemExpandedProps<IMenuItemExpandedAdditionalData> = Omit<
    TMenuItemExpandedFull,
    keyof IMenuItemCore
> & {
    initialProps: IMenuItemExpandedAdditionalData;
    /**
     * Функция рендера элемента меню первого уровня с дополнительным меню
     */
    renderItemExpanded: (
        attrs: IItemExpandedMainProps,
        props: IMenuItemExpandedAdditionalData
    ) => JSX.Element;
};

export interface ISubItemMainProps {
    core: {
        id: TSubMenuItemFull['id'];
        tabIndex: TSubMenuItemFull['tabIndex'];
        onClick: TSubMenuItemFull['clickSubMenuItemHandler'];
        onKeyDown: TSubMenuItemFull['keyDownSubMenuItemHandler'];
        onFocus: TSubMenuItemFull['focusSubMenuItemHandler'];
        ref: TRef;
    } & AriaAttributes;
}

export type TSubMenuItem<ISubMenuItemAdditionalData> = Omit<
    TSubMenuItemFull,
    keyof IMenuItemCore
> & {
    initialProps: ISubMenuItemAdditionalData;
    /**
     * Функция рендера элемента меню второго уровня (в выпадающем меню)
     */
    renderSubItem: (mainProps: ISubItemMainProps, props: ISubMenuItemAdditionalData) => JSX.Element;
};

export interface IDropDownMenuMainProps {
    core: {
        onClick: (e: MouseEvent) => void;
    };
}

export type TDropDownMenuProps<ISubMenuItemAdditionalData> =
    TDropDownMenuFull<ISubMenuItemAdditionalData> & {
        parentId: string;
        initialChildren: ISubMenuItemAdditionalData[];
        /**
         * Функция рендера выпадающего меню
         */
        renderDropDownMenu: (attrs: IDropDownMenuMainProps, children: ReactNode) => JSX.Element;
        /**
         * Функция рендера элемента меню второго уровня (в выпадающем меню)
         */
        renderSubItem: TSubMenuItem<ISubMenuItemAdditionalData>['renderSubItem'];
    };

export interface IMenu<
    IMenuAdditionalData,
    IMenuItemExpandedAdditionalData,
    ISubMenuItemAdditionalData
> extends IUseMenu<
        IMenuAdditionalData,
        IMenuItemExpandedAdditionalData,
        ISubMenuItemAdditionalData
    > {
    /**
     * Функция рендера элемента меню первого уровня
     */
    renderItem?: TMenuItem<IMenuAdditionalData>['renderItem'];
    /**
     * Функция рендера элемента меню первого уровня с дополнительным меню
     */
    renderItemExpanded?: TMenuItemExpandedProps<IMenuItemExpandedAdditionalData>['renderItemExpanded'];
    /**
     * Функция рендера выпадающего меню
     */
    renderDropDownMenu?: TDropDownMenuProps<ISubMenuItemAdditionalData>['renderDropDownMenu'];
    /**
     * Функция рендера элемента меню второго уровня (в выпадающем меню)
     */
    renderSubItem?: TSubMenuItem<ISubMenuItemAdditionalData>['renderSubItem'];
    listAttributes: HTMLAttributes<HTMLUListElement>;
}
