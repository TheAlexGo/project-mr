import React, { FC, useEffect, useRef, useState } from 'react';

import { StoryObj, Meta, StoryFn } from '@storybook/react';
import { useNavigate } from 'react-router-dom';

import { Button, ButtonThemes } from '@components/Button/Button';
import { ModalLinks } from '@types';
import { getModalLink } from '@utils/routing';

import { Modals } from './Modals';

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
} as Meta<Story>;

const Template: StoryFn<Story> = ({ showModal, link }) => {
    const [isLoaded, setIsLoaded] = useState<boolean>(false);
    const navigate = useNavigate();
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (showModal) {
            navigate(getModalLink(link));
        } else {
            navigate('#');
        }
    }, [link, navigate, showModal]);

    useEffect(() => {
        if (ref.current && !isLoaded) {
            setIsLoaded(true);
        }
    }, [isLoaded]);

    return (
        <div>
            <Button theme={ButtonThemes.PRIMARY} href={getModalLink(link)}>
                Показать модалку
            </Button>
            <div id="container-modal" ref={ref} />
            {isLoaded && <Modals container={ref.current} />}
        </div>
    );
};

export const DeleteAccount: StoryObj<Story> = {
    render: Template,

    args: {
        showModal: true,
        link: ModalLinks.DELETE_ACCOUNT
    }
};
