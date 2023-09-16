import React from 'react';

import { StoryObj, Meta } from '@storybook/react';

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
                category: StoryCategories.OTHER
            }
        },
        id: {
            table: {
                disable: true
            }
        },
        type: {
            table: {
                disable: true
            }
        },
        className: {
            table: {
                disable: true
            }
        },
        wrapperClassName: {
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
} as Meta<Story>;

export const Manga: StoryObj<Story> = {
    render: ({ coverUri, ...args }) => <MangaCard key={coverUri} {...args} coverUri={coverUri} />
};
