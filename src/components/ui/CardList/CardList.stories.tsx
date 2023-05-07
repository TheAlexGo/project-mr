import React from 'react';

import { ComponentMeta, ComponentStory } from '@storybook/react';

import { getMangaCardsMock } from '@mock';
import { StoryCategories } from '@sb/types';

import { CardList, ScrollSnapTypes } from './CardList';

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
        },
        scrollSnap: {
            name: 'Тип привязки прокрутки',
            table: {
                category: StoryCategories.STYLE
            }
        },
        isLoading: {
            name: 'Показать лоадер?',
            table: {
                category: StoryCategories.STYLE
            }
        }
    },
    args: {
        title: 'Тестовое название',
        axis: 'y',
        cards: getMangaCardsMock(20),
        scrollSnap: ScrollSnapTypes.X_Mandatory,
        isLoading: false
    }
} as ComponentMeta<Story>;

export const Component: ComponentStory<Story> = (args) => <CardList {...args} />;
