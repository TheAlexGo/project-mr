import React from 'react';

import { ComponentMeta, ComponentStory } from '@storybook/react';

import { StoryCategories } from '@sb/types';

import { Input } from './Input';

type Story = typeof Input;

export default {
    title: 'UI / Input',
    component: Input,
    argTypes: {
        type: {
            name: 'Тип поля',
            table: {
                category: StoryCategories.MAIN
            }
        },
        placeholder: {
            name: 'Placeholder',
            table: {
                category: StoryCategories.MAIN
            }
        },
        onChange: {
            table: {
                disable: true
            }
        }
    },
    args: {
        type: 'text',
        placeholder: 'Введите данные'
    }
} as ComponentMeta<Story>;

export const Component: ComponentStory<Story> = (args) => <Input {...args} />;
