import React, { useEffect, useRef, useState } from 'react';

import { Meta, StoryFn } from '@storybook/react';

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
        },
        container: {
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
} as Meta<Story>;

export const Component: StoryFn<Story> = (args) => {
    const [isLoaded, setIsLoaded] = useState<boolean>(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (ref.current && !isLoaded) {
            setIsLoaded(true);
        }
    }, [isLoaded]);

    return (
        <div>
            <div id="container-modal" ref={ref} />
            <Modal {...args} container={ref.current} />
        </div>
    );
};
