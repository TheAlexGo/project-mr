import React from 'react';

import { ComponentMeta, ComponentStory } from '@storybook/react';

import { StoryCategories } from '@sb/types';

import { RadioGroup } from './RadioGroup';

type Story = typeof RadioGroup;

export default {
    title: 'UI / Input',
    component: RadioGroup,
    argTypes: {
        title: {
            name: 'Название группы',
            table: {
                category: StoryCategories.MAIN
            }
        },
        options: {
            name: 'Элементы ',
            table: {
                category: StoryCategories.MAIN
            }
        },
        name: {
            table: {
                disable: true
            }
        },
        currentValue: {
            table: {
                disable: true
            }
        },
        onChange: {
            name: 'onChange',
            table: {
                disable: true
            }
        }
    },
    args: {
        title: 'Выберите язык',
        name: 'language',
        options: [
            {
                id: 'ru',
                label: 'Русский',
                value: 'ru'
            },
            {
                id: 'en',
                label: 'Английский',
                value: 'en'
            },
            {
                id: 'jp',
                label: 'Японский',
                value: 'jp'
            }
        ],
        currentValue: 'ru'
    }
} as ComponentMeta<Story>;

export const Component: ComponentStory<Story> = (args) => <RadioGroup {...args} />;
