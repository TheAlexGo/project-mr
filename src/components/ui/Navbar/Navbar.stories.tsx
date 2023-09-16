import { StoryObj, Meta } from '@storybook/react';

import { Icons } from '@components/Icon/Icon';
import { StoryCategories } from '@sb/types';
import { Pages, NavTabs } from '@types';

import { Navbar } from './Navbar';

type Story = typeof Navbar;

export default {
    title: 'UI / Navbar',
    component: Navbar,
    argTypes: {
        items: {
            name: 'Элементы меню',
            table: {
                category: StoryCategories.MAIN
            }
        },
        className: {
            table: {
                disable: true
            }
        }
    },
    args: {
        items: [
            {
                id: NavTabs.GENERAL,
                icon: Icons.HOME,
                title: 'Главная',
                link: Pages.GENERAL
            },
            {
                id: NavTabs.LIBRARY,
                icon: Icons.LIBRARY,
                title: 'Библиотека',
                link: Pages.LIBRARY
            },
            {
                id: NavTabs.PROFILE,
                icon: Icons.PROFILE,
                title: 'Профиль',
                link: Pages.PROFILE
            }
        ]
    }
} as Meta<Story>;

export const Component: StoryObj<Story> = {};
