import React from 'react';

import { isMenuItemExpandedWithMenu, useMenu } from '@hooks/a11y/useMenu';

import { DropDownMenu } from './components/DropDownMenu/DropDownMenu';
import { MenuItem } from './components/MenuItem/MenuItem';
import { MenuItemExpanded } from './components/MenuItemExpanded/MenuItemExpanded';

import type { IMenu } from './types';
import type { IMenuItemCore, IMenuItemExpandedWithMenuCore } from '@hooks/a11y/types';

export type TContextMenuProps<
    IMenuAdditionalData,
    IMenuItemExpandedAdditionalData,
    ISubMenuItemAdditionalData
> = IMenu<IMenuAdditionalData, IMenuItemExpandedAdditionalData, ISubMenuItemAdditionalData>;

/**
 * Компонент, реализующий доступные выпадающие меню и табы. Именно его стоит использовать для решения вашей задачи,
 * Всю навигацию выполняет хук useMenu.ts.
 * Если ваше решение предполагает использование реактивного способа изменения данных (например, через mobx),
 * все нужные объекты будут переданы в функции рендера без изменений (обёртка mobx сохранится на всех объектах).
 *
 * Пример реализации можно посмотреть здесь: apps/projects/groups/groups-catalog-tabs/components/Tabs/Tabs.tsx^
 *
 * Документация w3: https://www.w3.org/WAI/tutorials/menus/application-menus/
 *
 * @author alexander.gordeev (alexander.gordeev@vk.team)
 *
 * @param items
 * @param renderItem - функция рендера элемента меню первого уровня
 * @param renderItemExpanded - функция рендера элемента меню первого уровня с дополнительным меню
 * @param renderDropDownMenu - функция рендера выпадающего меню
 * @param renderSubItem - функция рендера элемента меню второго уровня (в выпадающем меню)
 * @param listAttributes - html-атрибуты элемента ul (основной обёртки меню)
 * @param hookProps - свойства, которые используются в хуке useMenu.ts (см. @hooks/a11y/useMenu/IUseMenu)
 * @constructor
 */
export const ContextMenu = <
    IMenuAdditionalData,
    IMenuItemExpandedAdditionalData,
    ISubMenuItemAdditionalData
>({
    items,
    renderItem,
    renderItemExpanded,
    renderDropDownMenu,
    renderSubItem,
    listAttributes,
    ...hookProps
}: TContextMenuProps<
    IMenuAdditionalData,
    IMenuItemExpandedAdditionalData,
    ISubMenuItemAdditionalData
>) => {
    const {
        menuItems,
        clickMenuItemHandler,
        clickSubMenuItemHandler,
        keyDownMenuItemHandler,
        keyDownSubMenuItemHandler,
        focusMenuItemHandler,
        focusSubMenuItemHandler
    } = useMenu<IMenuAdditionalData, IMenuItemExpandedAdditionalData, ISubMenuItemAdditionalData>({
        items,
        withAutoFocus: true,
        ...hookProps
    });

    return (
        <ul {...listAttributes}>
            {menuItems.map((tab, index) => {
                if (isMenuItemExpandedWithMenu(tab)) {
                    const initialProps = items[
                        index
                    ] as IMenuItemExpandedWithMenuCore<ISubMenuItemAdditionalData>;
                    const initialChildren = initialProps.children;
                    return (
                        renderItemExpanded &&
                        renderDropDownMenu &&
                        renderSubItem && (
                            <div key={tab.id} style={{ position: 'relative' }}>
                                <MenuItemExpanded<IMenuItemExpandedAdditionalData & IMenuItemCore>
                                    {...tab}
                                    clickMenuItemHandler={clickMenuItemHandler}
                                    keyDownMenuItemHandler={keyDownMenuItemHandler}
                                    focusMenuItemHandler={focusMenuItemHandler}
                                    renderItemExpanded={renderItemExpanded}
                                    initialProps={
                                        initialProps as unknown as IMenuItemExpandedAdditionalData &
                                            IMenuItemCore
                                    }
                                />
                                {tab['aria-haspopup'] && tab['aria-expanded'] && (
                                    <DropDownMenu<ISubMenuItemAdditionalData & IMenuItemCore>
                                        {...tab}
                                        parentId={tab.id}
                                        clickSubMenuItemHandler={clickSubMenuItemHandler}
                                        keyDownSubMenuItemHandler={keyDownSubMenuItemHandler}
                                        focusSubMenuItemHandler={focusSubMenuItemHandler}
                                        renderDropDownMenu={renderDropDownMenu}
                                        renderSubItem={renderSubItem}
                                        initialChildren={initialChildren}
                                    />
                                )}
                            </div>
                        )
                    );
                }

                return (
                    renderItem && (
                        <MenuItem<IMenuAdditionalData & IMenuItemCore>
                            {...tab}
                            key={tab.id}
                            clickMenuItemHandler={clickMenuItemHandler}
                            keyDownMenuItemHandler={keyDownMenuItemHandler}
                            focusMenuItemHandler={focusMenuItemHandler}
                            renderItem={renderItem}
                            initialProps={items[index] as IMenuAdditionalData & IMenuItemCore}
                        />
                    )
                );
            })}
        </ul>
    );
};
