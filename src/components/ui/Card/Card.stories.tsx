import { StoryObj, Meta } from '@storybook/react';

import { StoryCategories } from '@sb/types';
import { getCoverMock } from '@utils/mockData';

import { Card } from './Card';

type Story = typeof Card;

export default {
    title: 'UI / Card',
    component: Card,
    argTypes: {
        title: {
            name: 'Название',
            table: {
                category: StoryCategories.MAIN
            }
        },
        image: {
            name: 'Обложка',
            table: {
                category: StoryCategories.MAIN
            }
        },
        href: {
            name: 'Ссылка',
            table: {
                category: StoryCategories.MAIN
            }
        },
        isTitleAlignCenter: {
            name: 'Расположить текст по центру?',
            table: {
                category: StoryCategories.OTHER
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
        },
        onDelete: {
            table: {
                disable: true
            }
        },
        children: {
            table: {
                disable: true
            }
        }
    },
    args: {
        title: 'У Коми проблемы с общением',
        image: getCoverMock(),
        isTitleAlignCenter: false,
        href: '/'
    }
} as Meta<Story>;

export const Component: StoryObj<Story> = {};
