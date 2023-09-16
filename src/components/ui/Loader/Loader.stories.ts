import { Meta, StoryObj } from '@storybook/react';

import { StoryCategories } from '@sb/types';

import { Loader } from './Loader';

type Story = typeof Loader;

export default {
    title: 'UI / Loader',
    component: Loader,
    argTypes: {
        size: {
            name: 'Размер',
            table: {
                category: StoryCategories.MAIN
            }
        }
    },
    args: {
        size: '52'
    }
} as Meta<Story>;

export const Component: StoryObj<Story> = {};
