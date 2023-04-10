import React, { FC, useEffect } from 'react';

import { ComponentMeta, ComponentStory } from '@storybook/react';
import { useNavigate } from 'react-router-dom';

import { Button, ButtonThemes } from '@components/Button/Button';
import { ModalLinks } from '@types';
import { getModalLink } from '@utils/routing';

import { DeleteAccount } from './DeleteAccount';

type Story = typeof DeleteAccount &
    FC<{
        showModal: boolean;
    }>;

export default {
    title: 'UI / Modal',
    component: DeleteAccount,
    argTypes: {
        showModal: {
            name: 'Показать модальное окно?',
            control: 'boolean'
        },
        onCancel: {
            table: {
                disable: true
            }
        }
    },
    args: {
        showModal: true
    }
} as ComponentMeta<Story>;
