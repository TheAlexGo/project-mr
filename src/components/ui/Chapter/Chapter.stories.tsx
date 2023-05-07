import React from 'react';

import { ComponentMeta, ComponentStory } from '@storybook/react';

import { getChapterMock } from '@mock';
import { StoryCategories } from '@sb/types';

import { Chapter } from './Chapter';

type Story = typeof Chapter;

export default {
    title: 'UI / Chapter',
    component: Chapter,
    argTypes: {
        title: {
            name: 'Название',
            table: {
                category: StoryCategories.MAIN
            }
        },
        date: {
            name: 'Дата выхода',
            table: {
                category: StoryCategories.MAIN
            }
        },
        number: {
            name: 'Порядковый номер',
            table: {
                category: StoryCategories.MAIN
            }
        },
        nowProgress: {
            name: 'Прогресс прочтения',
            table: {
                category: StoryCategories.MAIN
            }
        },
        isAvailable: {
            name: 'Доступно ли сейчас?',
            table: {
                category: StoryCategories.MAIN
            }
        },
        id: {
            table: {
                disable: true
            }
        },
        pageCount: {
            table: {
                disable: true
            }
        },
        paid: {
            table: {
                disable: true
            }
        },
        type: {
            table: {
                disable: true
            }
        },
        mangaId: {
            table: {
                disable: true
            }
        }
    },
    args: {
        ...getChapterMock(),
        mangaId: 1
    }
} as ComponentMeta<Story>;

export const Component: ComponentStory<Story> = (args) => <Chapter {...args} />;
