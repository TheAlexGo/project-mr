import React from 'react';

import { ComponentMeta, ComponentStory } from '@storybook/react';

import { getMangaCardsMock } from '@mock';
import { StoryCategories } from '@sb/types';

import { CardList } from './CardList';

type Story = typeof CardList;

export default {
    title: 'UI / CardList',
    component: CardList,
    argTypes: {
        title: {
            name: 'Название списка',
            table: {
                category: StoryCategories.MAIN
            }
        },
        axis: {
            name: 'Ось прокрутки',
            table: {
                category: StoryCategories.MAIN
            }
        },
        cards: {
            name: 'Карточки для списка',
            table: {
                category: StoryCategories.MAIN
            }
        }
    },
    args: {
        title: 'Тестовое название',
        axis: 'y',
        cards: getMangaCardsMock(20)
    }
} as ComponentMeta<Story>;

export const Component: ComponentStory<Story> = (args) => <CardList {...args} />;
