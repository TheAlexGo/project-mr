import React from 'react';

import { ComponentMeta, ComponentStory } from '@storybook/react';

import { getCoversMock, getMangaCardMock } from '@mock';
import { StoryCategories } from '@sb/types';

import { MangaCard } from './MangaCard';

type Story = typeof MangaCard;

export default {
    title: 'UI / Card',
    component: MangaCard,
    argTypes: {
        coverUri: {
            name: 'Обложка манги',
            control: 'select',
            options: ['Не выбрано', ...getCoversMock()],
            table: {
                category: StoryCategories.MAIN
            }
        },
        titles: {
            name: 'Названия манги',
            table: {
                category: StoryCategories.MAIN
            }
        },
        isTitleAlignCenter: {
            name: 'Расположить название по центру?',
            defaultValue: false,
            table: {
                category: StoryCategories.MAIN
            }
        },
        id: {
            table: {
                disable: true
            }
        },
        className: {
            table: {
                disable: true
            }
        },
        onDelete: {
            table: {
                disable: true
            }
        },
        onClick: {
            table: {
                disable: true
            }
        }
    },
    args: {
        ...getMangaCardMock()
    }
} as ComponentMeta<Story>;

export const Manga: ComponentStory<Story> = ({ coverUri, ...args }) => (
    <MangaCard key={coverUri} {...args} coverUri={coverUri} />
);
