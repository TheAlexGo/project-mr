import React from 'react';

import { ComponentMeta, ComponentStory } from '@storybook/react';

import { StoryCategories } from '@sb/types';

import { Heading, HeadingTypes } from './Heading';

type Story = typeof Heading;

export default {
    title: 'UI / Heading',
    component: Heading,
    argTypes: {
        text: {
            name: 'Содержимое заголовка',
            table: {
                category: StoryCategories.MAIN
            }
        },
        type: {
            name: 'Тип заголовка',
            control: 'select',
            table: {
                category: StoryCategories.MAIN
            }
        },
        className: {
            table: {
                disable: true
            }
        }
    },
    args: {
        text: 'Тестовый заголовок',
        type: HeadingTypes.H1
    }
} as ComponentMeta<Story>;

export const Component: ComponentStory<Story> = (args) => <Heading {...args} />;
