import React from 'react';

import { ComponentMeta, ComponentStory } from '@storybook/react';

import { StoryCategories } from '@sb/types';

import { Modal } from './Modal';

type Story = typeof Modal;

export default {
    title: 'UI / Modal',
    component: Modal,
    argTypes: {
        heading: {
            name: 'Заголовок',
            table: {
                category: StoryCategories.MAIN
            }
        },
        description: {
            name: 'Описание',
            table: {
                category: StoryCategories.MAIN
            }
        },
        actionText: {
            name: 'Текст действия',
            table: {
                category: StoryCategories.MAIN
            }
        },
        id: {
            table: {
                disable: true
            }
        },
        onCancel: {
            table: {
                disable: true
            }
        },
        onAction: {
            table: {
                disable: true
            }
        }
    },
    args: {
        heading: 'Удалить аккаунт?',
        description:
            'Вы действительно хотите удалить аккаунт? Все персональная информация будет утеряна',
        actionText: 'Удалить'
    }
} as ComponentMeta<Story>;

export const Component: ComponentStory<Story> = (args) => <Modal {...args} />;
