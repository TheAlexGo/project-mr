import React, { ChangeEventHandler, useState } from 'react';

import { StoryObj, Meta } from '@storybook/react';

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
} as Meta<Story>;

export const SimpleInput: StoryObj<Story> = {
    render: function Component({ ...args }) {
        const [value, setValue] = useState('');
        const changeHandler: ChangeEventHandler<HTMLInputElement> = (e) => {
            setValue(e.target.value);
            args.onChange?.(e);
        };

        return <Input {...args} onChange={changeHandler} value={value} />;
    }
};
