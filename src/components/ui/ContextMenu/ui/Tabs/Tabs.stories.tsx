import React from 'react';

import { StoryObj } from '@storybook/react';

import { Axes, CardList, ScrollSnapTypes } from '@components/CardList/CardList';
import { getMangaListMock } from '@mock';
import { StoryCategories } from '@sb/types';
import { hideStoryItems } from '@sb/utils';

import { Tabs } from './Tabs';

export default {
    title: 'UI / ContextMenu',
    component: Tabs,
    argTypes: {
        items: {
            name: 'Элементы',
            table: {
                category: StoryCategories.MAIN
            }
        },
        withFixHeader: {
            name: 'Зафиксировать шапку?',
            table: {
                category: StoryCategories.MAIN
            }
        },
        ...hideStoryItems('tabsClassName', 'title')
    },
    args: {
        withFixHeader: false
    }
};

export const TabsComponent: StoryObj<typeof Tabs> = {
    render: (args) => <Tabs {...args} />,
    name: 'Tabs',

    args: {
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
    }
};
