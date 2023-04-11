import React from 'react';

import { ComponentMeta, ComponentStory } from '@storybook/react';

import { StoryCategories } from '@sb/types';

import { InputPassword } from './InputPassword';

type Story = typeof InputPassword;

export default {
    title: 'UI / Input',
    component: InputPassword,
    argTypes: {
        firstPlaceholder: {
            name: 'Плейсхолдер для первого поля',
            table: {
                category: StoryCategories.MAIN
            }
        },
        secondPlaceholder: {
            name: 'Плейсхолдер для первого поля',
            table: {
                category: StoryCategories.MAIN
            }
        },
        onChange: {
            table: {
                disable: true
            }
        },
        onError: {
            table: {
                disable: true
            }
        }
    },
    args: {
        firstPlaceholder: 'Пароль',
        secondPlaceholder: 'Повторите пароль'
    }
} as ComponentMeta<Story>;

export const Password: ComponentStory<Story> = (args) => <InputPassword {...args} />;
Password.storyName = 'Input Password';
