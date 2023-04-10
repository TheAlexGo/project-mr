import React, { FC, useEffect } from 'react';

import { ComponentMeta, ComponentStory } from '@storybook/react';
import { useNavigate } from 'react-router-dom';

import { Button, ButtonThemes } from '@components/Button/Button';
import { ModalLinks } from '@types';
import { getModalLink } from '@utils/routing';

type Story = FC<{
    showModal: boolean;
    link: ModalLinks;
}>;

export default {
    title: 'UI / Modal',
    argTypes: {
        showModal: {
            name: 'Показать модальное окно?',
            control: 'boolean'
        },
        link: {
            table: {
                disable: true
            }
        }
    },
    args: {
        showModal: true
    }
} as ComponentMeta<Story>;

const Template: ComponentStory<Story> = ({ showModal, link }) => {
    const navigate = useNavigate();
    useEffect(() => {
        if (showModal) {
            navigate(getModalLink(link));
        } else {
            navigate('#');
        }
    }, [link, navigate, showModal]);

    return (
        <Button theme={ButtonThemes.PRIMARY} href={getModalLink(link)}>
            Показать модалку
        </Button>
    );
};

export const DeleteAccount: ComponentStory<Story> = Template.bind({});
DeleteAccount.args = {
    showModal: true,
    link: ModalLinks.DELETE_ACCOUNT
};
