import React from 'react';

import { action } from '@storybook/addon-actions';
import { ComponentStory } from '@storybook/react';

import { Axes, CardList, ScrollSnapTypes } from '@components/CardList/CardList';
import { ButtonMenu } from '@components/ContextMenu/ui/ButtonMenu/ButtonMenu';
import { Tabs } from '@components/ContextMenu/ui/Tabs/Tabs';
import { Icons } from '@components/Icon/Icon';
import { getMangaListMock } from '@mock';
import { StoryCategories } from '@sb/types';

import { ContextMenu } from './ContextMenu';

export default {
    title: 'UI / ContextMenu',
    component: ContextMenu,
    argTypes: {
        items: {
            name: 'Элементы',
            table: {
                category: StoryCategories.MAIN
            }
        },
        withAutoFocus: {
            name: 'С автофокусом?',
            table: {
                category: StoryCategories.OTHER
            }
        },
        closeMenuAfterSelect: {
            name: 'Закрыть меню после выбора элемента?',
            table: {
                category: StoryCategories.OTHER
            }
        },
        renderItem: {
            name: 'Функция рендера элемента основного меню',
            table: {
                category: StoryCategories.OTHER
            }
        },
        renderItemExpanded: {
            name: 'Функция рендера элемента основного меню с дополнительным меню',
            table: {
                category: StoryCategories.OTHER
            }
        },
        renderDropDownMenu: {
            name: 'Функция рендера дополнительного меню',
            table: {
                category: StoryCategories.OTHER
            }
        },
        renderSubItem: {
            name: 'Функция рендера элемента дополнительного меню',
            table: {
                category: StoryCategories.OTHER
            }
        },
        selectMenuItemHandler: {
            name: 'Обработчик выбора элемента основного меню',
            table: {
                category: StoryCategories.OTHER
            }
        },
        selectSubMenuItemHandler: {
            name: 'Обработчик выбора элемента дополнительного меню',
            table: {
                category: StoryCategories.OTHER
            }
        },
        listAttributes: {
            table: {
                disable: true
            }
        }
    },
    args: {
        items: [],
        withAutoFocus: false,
        closeMenuAfterSelect: true,
        selectMenuItemHandler: action('selectMenuItemHandler'),
        selectSubMenuItemHandler: action('selectSubMenuItemHandler')
    }
};

export const Button: ComponentStory<typeof ButtonMenu> = (args) => <ButtonMenu {...args} />;
Button.storyName = 'ButtonMenu';
Button.args = {
    items: [
        {
            id: 'menu',
            title: 'Тест',
            icon: Icons.MORE,
            ariaLabelForSelected: 'выбрано',
            children: [
                {
                    id: 'rename',
                    title: 'Переименовать',
                    icon: Icons.HOME
                },
                {
                    id: 'edit',
                    title: 'Редактировать',
                    icon: Icons.EDIT
                },
                {
                    id: 'delete',
                    title: 'Удалить лист',
                    icon: Icons.TRASH
                }
            ]
        }
    ]
};

export const TabsComponent: ComponentStory<typeof Tabs> = (args) => <Tabs {...args} />;
TabsComponent.storyName = 'Tabs';
TabsComponent.args = {
    items: [
        {
            id: 'tab-1',
            title: 'Каталог',
            isSelected: true,
            content: {
                id: 'block-1',
                children: (
                    <div>
                        <CardList
                            axis={Axes.Y}
                            cards={getMangaListMock(20)}
                            scrollSnap={ScrollSnapTypes.X_Mandatory}
                        />
                    </div>
                )
            }
        },
        {
            id: 'tab-2',
            title: 'Моя коллеция',
            content: {
                id: 'block-2',
                children: <div>Содержимое Моей коллекции</div>
            }
        }
    ]
};
