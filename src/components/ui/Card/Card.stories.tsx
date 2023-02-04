import React from 'react';

import { ComponentMeta, ComponentStory } from '@storybook/react';

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
                category: StoryCategories.OTHER
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
        isTitleAlignCenter: false
    }
} as ComponentMeta<Story>;

export const Component: ComponentStory<Story> = (args) => <Card {...args} />;
