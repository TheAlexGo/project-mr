import React from 'react';

import { ComponentMeta, ComponentStory } from '@storybook/react';

import { StoryCategories } from '@sb/types';

import { Icon, Icons } from './Icon';

type Story = typeof Icon;

export default {
    title: 'UI / Icon',
    component: Icon,
    argTypes: {
        icon: {
            name: 'Иконка',
            table: {
                category: StoryCategories.MAIN
            }
        },
        size: {
            name: 'Размер',
            table: {
                category: StoryCategories.MAIN
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
        icon: Icons.SEARCH,
        size: '24'
    }
} as ComponentMeta<Story>;

export const Component: ComponentStory<Story> = (args) => <Icon {...args} />;
