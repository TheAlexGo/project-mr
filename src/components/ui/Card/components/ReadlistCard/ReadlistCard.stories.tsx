import React from 'react';

import { ComponentMeta, ComponentStory } from '@storybook/react';

import { StoryCategories } from '@sb/types';

import { ReadlistCard } from './ReadlistCard';

type Story = typeof ReadlistCard;

export default {
    title: 'UI / Card',
    component: ReadlistCard,
    argTypes: {
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
        id: {
            table: {
                disable: true
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
        className: {
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
        isTitleAlignCenter: false
    }
} as ComponentMeta<Story>;

export const Readlist: ComponentStory<Story> = (args) => <ReadlistCard {...args} />;
