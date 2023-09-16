import {
    type FocusEvent,
    type KeyboardEvent,
    type MouseEvent,
    useState,
    useMemo,
    useEffect,
    useCallback
} from 'react';

import { KeyboardKeys } from './types';

import type {
    IMenuItemCore,
    IMenuItemExpandedWithMenuCore,
    MenuItemCoreUnion,
    TClickMenuItemCallback,
    TClickSubMenuItemCallback,
    TFocusMenuItemCallback,
    TFocusSubMenuItemCallback,
    TKeyDownMenuItemCallback,
    TKeyDownSubMenuItemCallback,
    TMenuItemExpandedWithMenuFull,
    TMenuItemFirstData,
    TMenuItemFull,
    TMenuItemUnion,
    TSubMenuItemFull
} from './types';

const withoutFocusProps = {
    withFocus: false,
    tabIndex: -1
};

const withFocusProps = {
    withFocus: true,
    tabIndex: 0
};

/**
 * Type Guards
 */
export const isMenuItemExpandedWithMenuCore = (
    menuItem: MenuItemCoreUnion
): menuItem is IMenuItemExpandedWithMenuCore => {
    const { children } = menuItem as IMenuItemExpandedWithMenuCore;
    return Boolean(children?.length);
};
export const isMenuItemExpandedWithMenu = <TMenuItem, TSubMenuItem>(
    menuItem: TMenuItemUnion<TMenuItem, TSubMenuItem>
): menuItem is TMenuItemExpandedWithMenuFull<TSubMenuItem> => {
    const { children } = menuItem as TMenuItemExpandedWithMenuFull<TSubMenuItem>;
    return Boolean(children?.length);
};

/**
 * Подготавливаем данные для применения функционала.
 * Именно эти данные будут участвовать в формировании UI.
 */
const prepareAllData = <TMenuItem, TMenuItemExpanded, TSubMenuItem>(
    items: TMenuItemFirstData<TMenuItem, TMenuItemExpanded, TSubMenuItem>[],
    withAutoFocus = false
): [
    TMenuItemUnion<TMenuItem, TSubMenuItem>[],
    TMenuItemUnion<TMenuItem, TSubMenuItem> | null,
    TSubMenuItemFull<TSubMenuItem> | null
] => {
    let selectedMenuItem: TMenuItemUnion<TMenuItem, TSubMenuItem> | null = null;
    let selectedSubMenuItem: TSubMenuItemFull<TSubMenuItem> | null = null;

    /**
     * Подготавливаем данные для детей выбранного элемента основного меню
     * @param subMenuItem
     * @param index
     * @param parentId
     */
    const prepareSubMenuItemData = (
        subMenuItem: IMenuItemCore,
        index: number,
        parentId: string
    ): TSubMenuItemFull<TSubMenuItem> => {
        /**
         * Общие свойства
         */
        const mainProps = {
            ...subMenuItem,
            ...withoutFocusProps,
            index,
            parentId
        } as TSubMenuItemFull<TSubMenuItem>;

        /**
         * Если элемент имеет флаг "выбранный" и ранее такого элемента не находили ->
         * добавляем в память
         */
        if (subMenuItem.isSelected && selectedSubMenuItem === null) {
            selectedSubMenuItem = mainProps;
        }

        return mainProps;
    };

    /**
     * Подготавливаем данные для элементов основного меню
     * @param menuItem
     * @param index
     */
    const prepareMenuItemData = (
        menuItem: IMenuItemCore,
        index: number
    ): TMenuItemUnion<TMenuItem, TSubMenuItem> => {
        const isFirstSelectedItem = !selectedMenuItem && menuItem.isSelected;
        /**
         * Однако в любом случае tabIndex=0 устанавливаем только последнему активному элементу.
         */
        const tabIndex = isFirstSelectedItem ? 0 : -1;

        /**
         * Общие свойства
         */
        const mainProps = {
            ...menuItem,
            ...withoutFocusProps,
            tabIndex,
            menuItemIndex: index
        } as TMenuItemUnion<TMenuItem, TSubMenuItem>;

        if (isMenuItemExpandedWithMenuCore(menuItem)) {
            const hasChildren = menuItem.children.length !== 0;
            Object.assign(mainProps, {
                'aria-expanded': hasChildren ? false : undefined,
                'aria-haspopup': hasChildren,
                children: menuItem.children.map((child, index) =>
                    prepareSubMenuItemData(child, index, menuItem.id)
                ),
                currentSubMenuItemIndex: selectedSubMenuItem?.index || 0,
                selectedSubMenuItemTitle: selectedSubMenuItem
                    ? selectedSubMenuItem.title
                    : undefined
            });
        }

        /**
         * Если элемент имеет флаг "выбранный" и ранее такого элемента не находили ->
         * добавляем в память
         */
        if (isFirstSelectedItem) {
            if (withAutoFocus) {
                mainProps.withFocus = withAutoFocus;
            }
            selectedMenuItem = mainProps;
        }

        return mainProps;
    };

    const preparedMenuItems = items.map(prepareMenuItemData);

    /**
     * Если так и не нашли выбранный элемент основного меню, выбираем первый из списка
     */
    if (selectedMenuItem === null) {
        Object.assign(preparedMenuItems[0], {
            tabIndex: 0,
            withFocus: withAutoFocus
        });
        [selectedMenuItem] = preparedMenuItems;
    }

    return [preparedMenuItems, selectedMenuItem, selectedSubMenuItem];
};

/**
 * Основной интерфейс хука.
 * ---TMenuItem - внешний тип/интерфейс, расширяющий интерфейс элемента основного меню
 * ---TSubMenuItem - внешний тип/интерфейс, расширяющий интерфейс элемента дополнительного меню
 */
export interface IUseMenu<TMenuItem, TMenuItemExpanded, TSubMenuItem> {
    items: TMenuItemFirstData<TMenuItem, TMenuItemExpanded, TSubMenuItem>[];
    /**
     * Обработчик выбора элемента из основного меню (используется, если у него нет детей)
     * @param currentMenuItem
     */
    selectMenuItemHandler?: (currentMenuItem: TMenuItemUnion<TMenuItem, TSubMenuItem>) => void;
    /**
     * Обработчика выбора элемента из дополнительного меню (используется, если у элемента MenuItem есть SubMenuItem)
     * @param currentSubMenuItem
     */
    selectSubMenuItemHandler?: (currentSubMenuItem: TSubMenuItemFull<TSubMenuItem>) => void;
    /**
     * Установить автофокус после загрузки компонента?
     */
    withAutoFocus?: boolean;
    /**
     * Закрывать меню после выбора элемента из подменю?
     */
    closeMenuAfterSelect?: boolean;
}

/**
 * Хук-обвязка для формирования компонента с выпадающим меню.
 * Может работать как с одним элементом (например, самостоятельный элемент
 * с выпадающим меню), так и с целым списком объектов
 * (например, для формирования меню приложения, формирования табов и пр.)
 *
 * На вход:
 * --- menuId - уникальный идентификатор компонента (ОБЯЗАТЕЛЬНО НАДО УСТАНОВИТЬ НА КОНТЕЙНЕР, В КОТОРОМ БУДУТ РЕНДЕРИТЬСЯ КОМПОНЕНТЫ);
 * --- items - список элементов, участвующие в реализации. Оъекты обязательно должны содержать в себе свойства от IMenuItemCore.
 * --- selectMenuItemHandler - обработчик выбора элемента из основного меню (используется, если у него нет детей);
 * --- selectSubMenuItemHandler - обработчика выбора элемента из дополнительного меню (используется, если у элемента MenuItem есть SubMenuItem);
 *
 * На выходе:
 * --- menuItems - новый список элементов с дополнительными свойствами (используются в рисовании и корректной работе UI)
 * --- clickMenuItemHandler - обработчик клика на элемент из основного меню (ака. MenuItem);
 * --- clickSubMenuItemHandler - обработчик клика на элемент из дополнительного меню (ака. SubMenuItem);
 * --- keyDownMenuItemHandler - обработчик нажатия клавиши для элемента основного меню (ака. MenuItem);
 * --- keyDownSubMenuItemHandler - обработчик нажатия клавиши для элемента из дополнительного меню (ака. SubMenuItem);
 * --- focusMenuItemHandler - обработчик фокуса на элемент основного меню (ака. MenuItem);
 * --- focusSubMenuItemHandler - обработчик фокуса на элемент дополнительного меню (ака. SubMenuItem);
 *
 * @author alexander.gordeev (alexander.gordeev@vk.team)
 * @param param0
 */
export const useMenu = <
    TMenuItem = IMenuItemCore,
    TMenuItemExpanded = unknown,
    TSubMenuItem = IMenuItemCore
>({
    items,
    selectMenuItemHandler,
    selectSubMenuItemHandler,
    withAutoFocus = false,
    closeMenuAfterSelect = false
}: IUseMenu<TMenuItem, TMenuItemExpanded, TSubMenuItem>) => {
    const [preparedMenuItems, selectedMenuItem, selectedSubMenuItem] = useMemo(
        () => prepareAllData<TMenuItem, TMenuItemExpanded, TSubMenuItem>(items, withAutoFocus),
        [items, withAutoFocus]
    );

    /**
     * Список элементов основного меню, которые имеют все нужные свойства для рендера
     */
    const [menuItems, setMenuItems] =
        useState<TMenuItemUnion<TMenuItem, TSubMenuItem>[]>(preparedMenuItems);
    /**
     * Список элементов дополнительного меню
     */
    const [subMenuItems, setSubMenuItems] = useState<TSubMenuItemFull<TSubMenuItem>[]>(
        selectedMenuItem && isMenuItemExpandedWithMenu(selectedMenuItem)
            ? selectedMenuItem.children
            : []
    );
    /**
     * Активный элемент основного меню
     */
    const [activeMenuItem, setActiveMenuItem] = useState<TMenuItemUnion<
        TMenuItem,
        TSubMenuItem
    > | null>(selectedMenuItem);
    /**
     * Активный элемент дополнительного меню
     */
    const [activeSubMenuItem, setActiveSubMenuItem] =
        useState<TSubMenuItemFull<TSubMenuItem> | null>(selectedSubMenuItem);

    const getWithoutFocusProps = useCallback(
        <T>(currentItem: T): T => ({
            ...currentItem,
            ...withoutFocusProps
        }),
        []
    );

    /**
     * Получить список свойств по-умолчанию для элемента дополнительного меню
     * @param currentItem
     */
    const getDefaultSubMenuItemProps = useCallback(
        <T extends TSubMenuItemFull<TSubMenuItem> = TSubMenuItemFull<TSubMenuItem>>(
            currentItem: T
        ): T => getWithoutFocusProps<T>(currentItem),
        [getWithoutFocusProps]
    );

    /**
     * Получить список свойств по-умолчанию для элемента основного меню
     * @param currentItem
     */
    const getDefaultMenuItemProps = useCallback(
        <T extends TMenuItemFull<TMenuItem> = TMenuItemFull<TMenuItem>>(currentItem: T): T =>
            getWithoutFocusProps<T>(currentItem),
        [getWithoutFocusProps]
    );

    const getDefaultMenuItemExpandedProps = useCallback(
        <
            T extends
                TMenuItemExpandedWithMenuFull<TSubMenuItem> = TMenuItemExpandedWithMenuFull<TSubMenuItem>
        >(
            currentItem: T
        ): T => ({
            ...getWithoutFocusProps<T>(currentItem),
            'aria-expanded': currentItem.children.length ? false : undefined,
            children: currentItem.children.map(getDefaultSubMenuItemProps)
        }),
        [getDefaultSubMenuItemProps, getWithoutFocusProps]
    );

    /**
     * Сфокусироваться на элементе основного меню
     * @param currentMenuItem - элемент-кандидат основного меню
     */
    const focusMenuItem = useCallback(
        (currentMenuItem: TMenuItemUnion<TMenuItem, TSubMenuItem>) => {
            setMenuItems((prevState) =>
                prevState.map((menuItem) => {
                    const mainProps = isMenuItemExpandedWithMenu(menuItem)
                        ? getDefaultMenuItemExpandedProps(menuItem)
                        : getDefaultMenuItemProps(menuItem);

                    return {
                        ...mainProps,
                        ...(menuItem.id !== currentMenuItem.id ? withoutFocusProps : withFocusProps)
                    };
                })
            );
            setActiveMenuItem(currentMenuItem);
            if (isMenuItemExpandedWithMenu(currentMenuItem)) {
                setSubMenuItems(currentMenuItem.children);
            }
        },
        [getDefaultMenuItemExpandedProps, getDefaultMenuItemProps]
    );

    /**
     * Сфокусироваться на элементе дополнительного меню
     * @param currentActiveMenuItem - выбранный элемент основного меню
     * @param currentSubMenuItem - элемент-кандидат дополнительного меню
     */
    const focusSubMenuItem = useCallback(
        (
            currentActiveMenuItem: TMenuItemUnion<TMenuItem, TSubMenuItem>,
            currentSubMenuItem: TSubMenuItemFull<TSubMenuItem>
        ) => {
            setMenuItems((prevState) =>
                prevState.map((menuItem) => {
                    if (
                        currentActiveMenuItem.id !== menuItem.id ||
                        !isMenuItemExpandedWithMenu(menuItem)
                    ) {
                        return getWithoutFocusProps(menuItem);
                    }

                    return {
                        ...menuItem,
                        ...withoutFocusProps,
                        'aria-expanded': true,
                        children: menuItem.children.map((subMenuItem) => ({
                            ...subMenuItem,
                            ...(subMenuItem.id !== currentSubMenuItem.id
                                ? withoutFocusProps
                                : withFocusProps)
                        }))
                    };
                })
            );
            setActiveSubMenuItem(currentSubMenuItem);
        },
        [getWithoutFocusProps]
    );

    /**
     * Навигация по элементам основного меню
     * @param idx - индекс элемента-кандидата
     */
    const gotoMenuIndex = useCallback(
        (idx: number) => {
            let index = idx;
            if (idx === menuItems.length) {
                index = 0;
            } else if (idx < 0) {
                index = menuItems.length - 1;
            }
            focusMenuItem(menuItems[index]);
        },
        [focusMenuItem, menuItems]
    );

    /**
     * Навигация по элементам дополнительного меню
     * @param currentActiveMenuItem - выбранный элемент основного меню
     * @param idx - индекс элемента-кандидата
     */
    const gotoSubMenuIndex = useCallback(
        (currentActiveMenuItem: TMenuItemUnion<TMenuItem, TSubMenuItem>, idx: number) => {
            if (!isMenuItemExpandedWithMenu(currentActiveMenuItem)) {
                return;
            }

            const items = currentActiveMenuItem.children;
            let index = idx;
            if (items.length === 0) {
                return;
            }
            if (idx === items.length) {
                index = 0;
            } else if (idx < 0) {
                index = items.length - 1;
            }

            focusSubMenuItem(currentActiveMenuItem, items[index]);
        },
        [focusSubMenuItem]
    );

    /**
     * Обработчик клика на элемент из основного меню (ака. MenuItem)
     * @param event
     */
    const clickMenuItemHandler: TClickMenuItemCallback = useCallback(
        (event: MouseEvent) => {
            event.stopPropagation();

            const currentMenuItem = menuItems.find(({ id }) => event.currentTarget.id === id)!;

            if (isMenuItemExpandedWithMenu(currentMenuItem)) {
                gotoSubMenuIndex(currentMenuItem, currentMenuItem.currentSubMenuItemIndex);
                return;
            }

            currentMenuItem.withFocus = true;
            currentMenuItem.tabIndex = 0;

            setMenuItems((prevState) =>
                prevState.map((item) => {
                    if (item.id === currentMenuItem.id) {
                        return currentMenuItem;
                    }
                    return item;
                })
            );
            setActiveMenuItem(currentMenuItem);

            selectMenuItemHandler?.(currentMenuItem);
        },
        [gotoSubMenuIndex, menuItems, selectMenuItemHandler]
    );

    /**
     * Обработчик клика на элемент из дополнительного меню (ака. SubMenuItem)
     * @param event
     */
    const clickSubMenuItemHandler: TClickSubMenuItemCallback = useCallback(
        (event: MouseEvent) => {
            event.stopPropagation();
            if (!activeMenuItem) {
                return true;
            }

            const currentSubMenuItem = subMenuItems.find(
                ({ id }) => event.currentTarget.id === id
            )!;
            currentSubMenuItem.withFocus = true;
            currentSubMenuItem.tabIndex = 0;

            setMenuItems((prevState) =>
                prevState.map((item) => {
                    if (activeMenuItem.id !== item.id || !isMenuItemExpandedWithMenu(item)) {
                        return item;
                    }

                    const props: TMenuItemExpandedWithMenuFull<TSubMenuItem> = {
                        ...item,
                        currentSubMenuItemIndex: currentSubMenuItem.index,
                        selectedSubMenuItemTitle: currentSubMenuItem.title,
                        children: item.children.map((subMenuItem) => {
                            if (subMenuItem.id !== currentSubMenuItem.id) {
                                return subMenuItem;
                            }
                            return currentSubMenuItem;
                        })
                    };

                    if (closeMenuAfterSelect) {
                        props.tabIndex = 0;
                        props.withFocus = true;
                        props['aria-expanded'] = false;
                    }

                    setActiveMenuItem(props);

                    return props;
                })
            );
            setActiveSubMenuItem(currentSubMenuItem);

            selectSubMenuItemHandler?.(currentSubMenuItem);
            return false;
        },
        [activeMenuItem, closeMenuAfterSelect, selectSubMenuItemHandler, subMenuItems]
    );

    /**
     * Обработчик нажатия клавиши для элемента основного меню (ака. MenuItem)
     * @param event
     */
    const keyDownMenuItemHandler: TKeyDownMenuItemCallback = useCallback(
        (event: KeyboardEvent) => {
            if (!activeMenuItem) {
                return;
            }

            let flag = false;

            switch (event.code) {
                case KeyboardKeys.ArrowRight:
                    gotoMenuIndex(activeMenuItem.menuItemIndex + 1);
                    flag = true;
                    break;
                case KeyboardKeys.ArrowLeft:
                    gotoMenuIndex(activeMenuItem.menuItemIndex - 1);
                    flag = true;
                    break;
                case KeyboardKeys.ArrowDown:
                    if (isMenuItemExpandedWithMenu(activeMenuItem)) {
                        gotoSubMenuIndex(activeMenuItem, activeMenuItem.currentSubMenuItemIndex);
                        flag = true;
                    }
                    break;
                case KeyboardKeys.ArrowUp:
                    if (isMenuItemExpandedWithMenu(activeMenuItem)) {
                        gotoSubMenuIndex(activeMenuItem, activeMenuItem.currentSubMenuItemIndex);
                        flag = true;
                    }
                    break;
                case KeyboardKeys.Space:
                case KeyboardKeys.Enter:
                    break;
                case KeyboardKeys.Esc:
                    flag = true;
                    break;
                default:
                    break;
            }
            if (flag) {
                event.preventDefault();
            }
        },
        [activeMenuItem, gotoMenuIndex, gotoSubMenuIndex]
    );

    /**
     * Обработчик нажатия клавиши для элемента из дополнительного меню (ака. SubMenuItem)
     * @param event
     */
    const keyDownSubMenuItemHandler: TKeyDownSubMenuItemCallback = useCallback(
        (event: KeyboardEvent) => {
            if (!activeMenuItem || !activeSubMenuItem) {
                return true;
            }
            let flag = false;
            const flagFromSelect = false;
            switch (event.code) {
                case KeyboardKeys.Tab:
                    if (event.shiftKey) {
                        gotoMenuIndex(activeMenuItem.menuItemIndex - 1);
                    } else {
                        gotoMenuIndex(activeMenuItem.menuItemIndex + 1);
                    }
                    flag = true;
                    break;
                case KeyboardKeys.ArrowRight:
                    gotoMenuIndex(activeMenuItem.menuItemIndex + 1);
                    flag = true;
                    break;
                case KeyboardKeys.ArrowLeft:
                    gotoMenuIndex(activeMenuItem.menuItemIndex - 1);
                    flag = true;
                    break;
                case KeyboardKeys.Esc:
                    gotoMenuIndex(activeMenuItem.menuItemIndex);
                    flag = true;
                    break;
                case KeyboardKeys.ArrowDown:
                    gotoSubMenuIndex(activeMenuItem, activeSubMenuItem.index + 1);
                    flag = true;
                    break;
                case KeyboardKeys.ArrowUp:
                    gotoSubMenuIndex(activeMenuItem, activeSubMenuItem.index - 1);
                    flag = true;
                    break;
                case KeyboardKeys.Enter:
                case KeyboardKeys.Space:
                    break;
                default:
                    break;
            }

            if (flagFromSelect) {
                event.stopPropagation();
                return false;
            }

            if (flag) {
                event.preventDefault();
                event.stopPropagation();
            }
            return false;
        },
        [activeMenuItem, activeSubMenuItem, gotoMenuIndex, gotoSubMenuIndex]
    );

    /**
     * Обработчик фокуса на элемент основного меню (ака. MenuItem)
     * @param event
     */
    const focusMenuItemHandler: TFocusMenuItemCallback = useCallback(
        (event: FocusEvent) => {
            if (!activeMenuItem) {
                return;
            }
            const currentMenuItem = menuItems.find(({ id }) => event.currentTarget.id === id)!;
            if (activeMenuItem.menuItemIndex !== currentMenuItem.menuItemIndex) {
                gotoMenuIndex(currentMenuItem.menuItemIndex);
            }
        },
        [menuItems, activeMenuItem, gotoMenuIndex]
    );

    /**
     * Обработчик фокуса на элемент дополнительного меню (ака. SubMenuItem)
     * @param event
     */
    const focusSubMenuItemHandler: TFocusSubMenuItemCallback = useCallback(
        (event: FocusEvent) => {
            if (!activeMenuItem || !activeSubMenuItem) {
                return;
            }
            const currentSubMenuItem = subMenuItems.find(
                ({ id }) => event.currentTarget.id === id
            )!;

            if (activeSubMenuItem.index !== currentSubMenuItem.index) {
                gotoSubMenuIndex(activeMenuItem, currentSubMenuItem.index);
            }
        },
        [activeMenuItem, activeSubMenuItem, subMenuItems, gotoSubMenuIndex]
    );

    useEffect(() => {
        const clickHandler = () => {
            setSubMenuItems((prevState) =>
                prevState.map((menuItem) => getDefaultSubMenuItemProps(menuItem))
            );
            setMenuItems((prevState) =>
                prevState.map((menuItem) => {
                    const mainProps = isMenuItemExpandedWithMenu(menuItem)
                        ? getDefaultMenuItemExpandedProps(menuItem)
                        : getDefaultMenuItemProps(menuItem);

                    let tabIndex = -1;
                    if (
                        menuItem.tabIndex !== -1 ||
                        (isMenuItemExpandedWithMenu(menuItem) && menuItem['aria-expanded'])
                    ) {
                        tabIndex = 0;
                    }
                    return {
                        ...mainProps,
                        tabIndex
                    };
                })
            );
        };

        document.addEventListener('click', clickHandler);
        return () => document.removeEventListener('click', clickHandler);
    }, [getDefaultSubMenuItemProps, getDefaultMenuItemExpandedProps, getDefaultMenuItemProps]);

    return {
        menuItems,
        clickMenuItemHandler,
        keyDownMenuItemHandler,
        clickSubMenuItemHandler,
        keyDownSubMenuItemHandler,
        focusMenuItemHandler,
        focusSubMenuItemHandler
    };
};
