import React from 'react';

import { ComponentMeta, ComponentStory } from '@storybook/react';

import { HeadingTypes } from '@components/Heading/Heading';
import { Icons } from '@components/Icon/Icon';
import { StoryCategories } from '@sb/types';
import { Pages } from '@types';
import { getIconObj } from '@utils/header';

import { Header } from './Header';
import locale from '../../../languages/ru';

type Story = typeof Header;

export default {
    title: 'UI / Header',
    component: Header,
    argTypes: {
        heading: {
            name: 'Заголовок',
            table: {
                category: StoryCategories.MAIN
            }
        },
        description: {
            name: 'Описание',
            table: {
                category: StoryCategories.MAIN
            }
        },
        activePage: {
            name: 'Активная страница',
            options: Object.keys(Pages),
            mapping: Pages,
            table: {
                category: StoryCategories.MAIN
            }
        },
        headingType: {
            name: 'Тип заголовка',
            control: 'select',
            table: {
                category: StoryCategories.MAIN
            }
        },
        needBack: {
            name: 'Можно ли вернуться назад?',
            table: {
                category: StoryCategories.MAIN
            }
        },
        buttons: {
            name: 'Функциональные кнопки',
            table: {
                category: StoryCategories.ICON
            }
        },
        className: {
            table: {
                disable: true
            }
        }
    },
    args: {
        heading: 'Тестовое название',
        description: 'Тестовое описание',
        activePage: Pages.GENERAL,
        headingType: HeadingTypes.H1,
        needBack: true,
        buttons: [
            getIconObj(Icons.BELL, () => null, locale),
            getIconObj(Icons.SEARCH, () => null, locale)
        ]
    }
} as ComponentMeta<Story>;

export const Component: ComponentStory<Story> = (args) => <Header {...args} />;
