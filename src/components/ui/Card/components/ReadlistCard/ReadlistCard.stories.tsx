import { StoryObj, Meta } from '@storybook/react';

import { StoryCategories } from '@sb/types';

import { ReadlistCard } from './ReadlistCard';

type Story = typeof ReadlistCard;

export default {
    title: 'UI / Card',
    component: ReadlistCard,
    argTypes: {
        id: {
            name: 'Уникальный идентификатор (для образования ссылки)',
            table: {
                category: StoryCategories.MAIN
            }
        },
        title: {
            name: 'Название',
            table: {
                category: StoryCategories.MAIN
            }
        },
        isTitleAlignCenter: {
            name: 'Расположить название по центру?',
            table: {
                category: StoryCategories.OTHER
            }
        },
        items: {
            table: {
                disable: true
            }
        },
        alias: {
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
        onClick: {
            table: {
                disable: true
            }
        }
    },
    args: {
        title: 'Тестовое название',
        isTitleAlignCenter: false,
        id: 123
    }
} as Meta<Story>;

export const Readlist: StoryObj<Story> = {};
