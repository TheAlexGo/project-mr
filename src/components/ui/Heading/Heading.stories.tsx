import { StoryObj, Meta } from '@storybook/react';

import { StoryCategories } from '@sb/types';

import { Heading, HeadingTypes } from './Heading';

type Story = typeof Heading;

export default {
    title: 'UI / Heading',
    component: Heading,
    argTypes: {
        children: {
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
        children: 'Тестовый заголовок',
        type: HeadingTypes.H1
    }
} as Meta<Story>;

export const Component: StoryObj<Story> = {};
