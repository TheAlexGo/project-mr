import React from 'react';

import { ComponentMeta, ComponentStory } from '@storybook/react';

import { Icons } from '@components/Icon/Icon';
import { StoryCategories } from '@sb/types';
import { Links, NavTabs } from '@types';

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
                link: Links.GENERAL
            },
            {
                id: NavTabs.LIBRARY,
                icon: Icons.LIBRARY,
                title: 'Библиотека',
                link: Links.LIBRARY
            },
            {
                id: NavTabs.PROFILE,
                icon: Icons.PROFILE,
                title: 'Профиль',
                link: Links.PROFILE
            }
        ]
    }
} as ComponentMeta<Story>;

export const Component: ComponentStory<Story> = (args) => <Navbar {...args} />;
