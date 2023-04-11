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
            name: 'Плейсхолдер',
            table: {
                category: StoryCategories.MAIN
            }
        },
        showError: {
            name: 'Показать ошибку?',
            table: {
                category: StoryCategories.MAIN
            }
        },
        showEye: {
            name: 'Показать кнопку "Показать пароль"?',
            table: {
                category: StoryCategories.OTHER
            }
        },
        showPassword: {
            name: 'Показать пароль?',
            table: {
                category: StoryCategories.OTHER
            }
        },
        customError: {
            table: {
                disable: true
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
        },
        onClickEye: {
            table: {
                disable: true
            }
        }
    },
    args: {
        type: 'text',
        placeholder: 'Введите данные',
        onClickEye: undefined,
        showPassword: false,
        showEye: true
    }
} as ComponentMeta<Story>;

export const SimpleInput: ComponentStory<Story> = (args) => <Input {...args} />;
