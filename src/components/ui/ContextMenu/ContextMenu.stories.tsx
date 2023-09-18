import React from 'react';

import { action } from '@storybook/addon-actions';
import { StoryObj } from '@storybook/react';

import { ButtonMenu } from '@components/ContextMenu/ui/ButtonMenu/ButtonMenu';
import { Icons } from '@components/Icon/Icon';
import { StoryCategories } from '@sb/types';
import { hideStoryItems } from '@sb/utils';

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
        ...hideStoryItems(
            'closeMenuAfterSelect',
            'renderItem',
            'renderItemExpanded',
            'renderDropDownMenu',
            'renderSubItem',
            'selectMenuItemHandler',
            'selectSubMenuItemHandler',
            'listAttributes'
        )
    },
    args: {
        items: [],
        withAutoFocus: false,
        closeMenuAfterSelect: true,
        selectMenuItemHandler: action('selectMenuItemHandler'),
        selectSubMenuItemHandler: action('selectSubMenuItemHandler')
    }
};

export const Button: StoryObj<typeof ButtonMenu> = {
    render: (args) => <ButtonMenu {...args} />,
    name: 'ButtonMenu',

    args: {
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
    }
};
