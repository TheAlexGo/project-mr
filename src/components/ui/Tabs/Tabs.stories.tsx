import React from 'react';

import { ComponentMeta, ComponentStory } from '@storybook/react';

import { CardList, ScrollSnapTypes, Axes } from '@components/CardList/CardList';
import { getMangaListMock } from '@mock';
import { StoryCategories } from '@sb/types';

import { Tabs } from './Tabs';

type Story = typeof Tabs;

export default {
    title: 'UI / Tabs',
    component: Tabs,
    argTypes: {
        title: {
            name: 'Название',
            table: {
                category: StoryCategories.MAIN
            }
        },
        elements: {
            name: 'Элементы',
            table: {
                category: StoryCategories.MAIN
            }
        },
        withFixHeader: {
            name: 'Закрепить шапку?',
            table: {
                category: StoryCategories.MAIN
            }
        }
    },
    args: {
        title: 'Тестовые табы',
        elements: [
            {
                id: 'tab-1',
                title: 'Каталог',
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
        ],
        withFixHeader: false
    }
} as ComponentMeta<Story>;

export const Component: ComponentStory<Story> = (args) => <Tabs {...args} />;
