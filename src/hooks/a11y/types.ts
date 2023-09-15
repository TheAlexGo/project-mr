import { FocusEvent, KeyboardEvent, MouseEvent } from 'react';

export enum KeyboardKeys {
    Tab = 'Tab',
    Enter = 'Enter',
    Esc = 'Escape',
    Space = 'Space',
    ArrowLeft = 'ArrowLeft',
    ArrowUp = 'ArrowUp',
    ArrowRight = 'ArrowRight',
    ArrowDown = 'ArrowDown'
}

/**
 * Типы для коллбеков
 */
export type TClickMenuItemCallback = (event: MouseEvent) => void;
export type TClickSubMenuItemCallback = (event: MouseEvent) => void;
export type TKeyDownMenuItemCallback = (event: KeyboardEvent) => void;
export type TKeyDownSubMenuItemCallback = (event: KeyboardEvent) => void;
export type TFocusMenuItemCallback = (event: FocusEvent) => void;
export type TFocusSubMenuItemCallback = (event: FocusEvent) => void;

/**
 * Главный интерфейс с основными свойствами элементов меню
 */
export interface IMenuItemCore {
    id: string;
    title: string;
    isSelected?: boolean;
}

/**
 * Главный интерфейс элемента с дополнительным меню
 */
export type IMenuItemExpandedCore = IMenuItemCore;

/**
 * Главный интерфейс элемента выпадающего меню
 */
export interface IDropDownMenuCore<TSubMenuItemAdditionalData = unknown> {
    children: (TSubMenuItemAdditionalData & IMenuItemCore)[];
}

/**
 * Главный интерфейс элемента с дополнительным меню + пропсами самого выпадающего меню.
 * При создании массива элементов будем использовать именно этот интерфейс.
 */
export interface IMenuItemExpandedWithMenuCore<TSubMenuItemAdditionalData = unknown>
    extends IMenuItemExpandedCore,
        IDropDownMenuCore<TSubMenuItemAdditionalData> {}

/**
 * Объединяем возможные варианты меню
 */
export type MenuItemCoreUnion = IMenuItemCore | IMenuItemExpandedWithMenuCore;

/**
 * Вспомогательный интерфейс элемента дополнительного меню.
 * Здесь находятся все необходимые для логики свойства.
 * Можно свободно расширять.
 */
interface ISubMenuItem extends IMenuItemCore {
    parentId: string;
    index: number;
    tabIndex: number;
    withFocus: boolean;
    clickSubMenuItemHandler: TClickSubMenuItemCallback;
    keyDownSubMenuItemHandler: TKeyDownSubMenuItemCallback;
    focusSubMenuItemHandler: TFocusSubMenuItemCallback;
}

/**
 * Главный тип со всеми свойствами элемента дополнительного меню.
 * Можно расширять дженериком, как угодно.
 */
export type TSubMenuItemFull<TSubMenuItemAdditionalData = unknown> = ISubMenuItem &
    TSubMenuItemAdditionalData;

/**
 * Базовые свойства для элемента основного меню.
 * Здесь находятся базовые свойства для осуществляния логики.
 * Можно свободно расширять.
 */
interface IMenuItemLess extends IMenuItemCore {
    withFocus: boolean;
    tabIndex: number;
    menuItemIndex: number;
    clickMenuItemHandler: TClickMenuItemCallback;
    keyDownMenuItemHandler: TKeyDownMenuItemCallback;
    focusMenuItemHandler: TFocusMenuItemCallback;
}

/**
 * Главный интерфейс элемента основного меню (без дополнительного).
 * Здесь находятся все необходимые для логики свойства.
 * Можно свободно расширять.
 */
type IMenuItem = IMenuItemLess;

/**
 * Главный интерфейс элемента c расскрывающимся меню.
 * Здесь находятся все необходимые для логики свойства.
 * Можно свободно расширять.
 */
export interface IMenuItemExpanded extends IMenuItemLess, IMenuItemExpandedCore {
    currentSubMenuItemIndex: number;
    selectedSubMenuItemTitle?: string;
    'aria-haspopup': boolean;
    'aria-expanded'?: boolean;
}

/**
 * Главный интерфейс элемента раскрытого меню.
 * Здесь находятся все необходимые для логики свойства.
 * Можно свободно расширять.
 * Как правило, используется только в конечной реализации интерфеса (см. ContextMenu и ContextMenu/DropDownMenu)
 */
interface IDropDownMenu<TSubMenuItemAdditionalData = unknown>
    extends IDropDownMenuCore<TSubMenuItemFull<TSubMenuItemAdditionalData>> {
    clickSubMenuItemHandler: TClickSubMenuItemCallback;
    keyDownSubMenuItemHandler: TKeyDownSubMenuItemCallback;
    focusSubMenuItemHandler: TFocusSubMenuItemCallback;
}

interface IMenuItemExpandedWithMenu<TSubMenuItemAdditionalData = unknown>
    extends IMenuItemExpanded,
        IDropDownMenu<TSubMenuItemAdditionalData> {}

/**
 * Общий тип элемента основного меню (без дополнительного)
 */
export type TMenuItemFull<TMenuItemAdditionalData = unknown> = IMenuItem & TMenuItemAdditionalData;

/**
 * Общий тип элемента с дополнительным меню
 */
export type TMenuItemExpandedFull = IMenuItemExpanded;

/**
 * Общий тип элемента выпадающего меню
 */
export type TDropDownMenuFull<TSubMenuItemAdditionalData = unknown> =
    IDropDownMenu<TSubMenuItemAdditionalData>;

/**
 * Общий тип элемента с дополнительным меню + пропсами самого выпадающего меню
 */
export type TMenuItemExpandedWithMenuFull<TSubMenuItemAdditionalData> =
    IMenuItemExpandedWithMenu<TSubMenuItemAdditionalData>;

/**
 * Юнион со всеми типами меню + пропсами для них.
 */
export type TMenuItemUnion<TMenuItemAdditionalData, TSubMenuItemAdditionalData> =
    | TMenuItemFull<TMenuItemAdditionalData>
    | TMenuItemExpandedWithMenuFull<TSubMenuItemAdditionalData>;

export type TMenuItemSimpleFirstData<TMenuItemAdditionalData> = IMenuItemCore &
    TMenuItemAdditionalData;
export type TMenuItemExpandedWithMenuFirstData<
    TMenuItemExpandedAdditionalData,
    TSubMenuItemAdditionalData
> = IMenuItemExpandedCore &
    TMenuItemExpandedAdditionalData &
    IDropDownMenuCore<TSubMenuItemAdditionalData>;

/**
 * Первые данные для формирования
 */
export type TMenuItemFirstData<
    TMenuItemAdditionalData,
    TMenuItemExpandedAdditionalData,
    TSubMenuItemAdditionalData
> =
    | TMenuItemSimpleFirstData<TMenuItemAdditionalData>
    | TMenuItemExpandedWithMenuFirstData<
          TMenuItemExpandedAdditionalData,
          TSubMenuItemAdditionalData
      >;
