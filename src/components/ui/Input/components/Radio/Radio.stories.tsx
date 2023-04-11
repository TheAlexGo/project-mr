import React from 'react';

import { ComponentMeta, ComponentStory } from '@storybook/react';

import { StoryCategories } from '@sb/types';

import { Radio } from './Radio';

type Story = typeof Radio;

export default {
    title: 'UI / Input',
    component: Radio,
    argTypes: {
        label: {
            name: 'Имя поля',
            table: {
                category: StoryCategories.MAIN
            }
        },
        value: {
            name: 'Значение поля',
            table: {
                category: StoryCategories.MAIN
            }
        },
        isChecked: {
            name: 'Это поле выбрано?',
            table: {
                category: StoryCategories.MAIN
            }
        },
        id: {
            table: {
                disable: true
            }
        },
        name: {
            table: {
                disable: true
            }
        },
        onChange: {
            action: {
                name: 'onChange'
            },
            table: {
                disable: true
            }
        }
    },
    args: {
        id: 'ru',
        name: 'language',
        label: 'Русский',
        value: 'ru',
        isChecked: false
    }
} as ComponentMeta<Story>;

export const RG: ComponentStory<Story> = (args) => <Radio {...args} />;
RG.storyName = 'Radio Group';
