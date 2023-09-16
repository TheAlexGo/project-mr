import React, { useCallback, useEffect, useState } from 'react';

import { action } from '@storybook/addon-actions';
import { StoryObj, Meta, StoryFn } from '@storybook/react';

import { Icon, Icons } from '@components/Icon/Icon';
import { StoryCategories } from '@sb/types';

import { Editable } from './Editable';

type Story = typeof Editable;

export default {
    title: 'UI / Input',
    component: Editable,
    argTypes: {
        type: {
            name: 'Тип контейнера',
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
        className: {
            table: {
                disable: true
            }
        },
        ariaLabel: {
            table: {
                disable: true
            }
        },
        isActive: {
            table: {
                disable: true
            }
        },
        isSaveOutside: {
            table: {
                disable: true
            }
        },
        onSave: {
            table: {
                disable: true
            }
        },
        onCancel: {
            table: {
                disable: true
            }
        }
    },
    args: {
        type: 'div',
        placeholder: 'TheAlexGo',
        ariaLabel: 'Здесь вы можете изменить своё имя',
        isActive: false,
        isSaveOutside: false
    }
} as Meta<Story>;

const Component: StoryFn<Story> = ({ placeholder, ...args }) => {
    const [newValue, setNewValue] = useState<string>(placeholder);
    const [isActive, setIsActive] = useState<boolean>(false);
    const [isSaveOutside, setIsSaveOutside] = useState<boolean>(false);

    const clickEditHandler = useCallback(() => {
        setIsSaveOutside(false);
        setIsActive(true);
        action('onClickEdit')();
    }, []);

    const clickSaveHandler = useCallback(() => {
        setIsSaveOutside(true);
        action('onClickSave')();
    }, []);

    const saveHandler = useCallback((savedValue: string) => {
        setNewValue(savedValue);
        setIsActive(false);
        action('onSave')();
    }, []);

    const cancelHandler = useCallback(() => {
        setIsActive(false);
        action('onCancel')();
    }, []);

    const renderIcon = useCallback(() => {
        if (isActive) {
            return <Icon icon={Icons.CHECK} ariaLabel="Сохранить" onClick={clickSaveHandler} />;
        }
        return <Icon icon={Icons.EDIT} ariaLabel="Редактировать" onClick={clickEditHandler} />;
    }, [clickEditHandler, clickSaveHandler, isActive]);

    useEffect(() => {
        if (placeholder) {
            setNewValue(placeholder);
        }
    }, [placeholder]);

    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Editable
                {...args}
                placeholder={newValue}
                isActive={isActive}
                isSaveOutside={isSaveOutside}
                onSave={saveHandler}
                onCancel={cancelHandler}
            />
            {renderIcon()}
        </div>
    );
};

export const EditableContent: StoryObj<Story> = {
    render: Component,

    name: 'Editable static element'
};
