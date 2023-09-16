import { StoryObj, Meta } from '@storybook/react';

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
} as Meta<Story>;

export const Password: StoryObj<Story> = {
    name: 'Input Password'
};
