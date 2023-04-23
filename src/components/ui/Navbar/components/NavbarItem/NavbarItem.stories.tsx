import React from 'react';

import { ComponentMeta, ComponentStory } from '@storybook/react';

import { Icons } from '@components/Icon/Icon';
import { StoryCategories } from '@sb/types';
import { Pages } from '@types';

import { NavbarItem } from './NavbarItem';

type Story = typeof NavbarItem;

export default {
    title: 'UI / Navbar',
    component: NavbarItem,
    argTypes: {
        icon: {
            name: 'Иконка',
            control: 'select',
            options: ['Не выбрано', ...Object.values(Icons)],
            table: {
                category: StoryCategories.MAIN
            }
        },
        title: {
            name: 'Название',
            table: {
                category: StoryCategories.MAIN
            }
        },
        link: {
            name: 'Ссылка',
            table: {
                category: StoryCategories.MAIN
            }
        },
        id: {
            table: {
                disable: true
            }
        }
    },
    args: {
        icon: Icons.HOME,
        title: 'Главная',
        link: Pages.GENERAL,
        defaultLink: Pages.GENERAL
    }
} as ComponentMeta<Story>;

export const Item: ComponentStory<Story> = (args) => <NavbarItem {...args} />;
