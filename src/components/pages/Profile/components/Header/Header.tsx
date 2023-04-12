import React, { FC, useCallback, useState } from 'react';

import { Editable } from '@components/Editable/Editable';
import { Heading, HeadingTypes } from '@components/Heading/Heading';
import { Icon, Icons } from '@components/Icon/Icon';
import { useController } from '@hooks/useController';
import { useStore } from '@hooks/useStore';

import classes from './Header.module.styl';

export const Header: FC = (): JSX.Element => {
    const [isActive, setIsActive] = useState<boolean>(false);
    const [isSaveOutside, setIsSaveOutside] = useState<boolean>(false);

    const { locale, username } = useStore();
    const { updateUsername } = useController();

    const clickEditHandler = useCallback(() => {
        setIsSaveOutside(false);
        setIsActive(true);
    }, []);

    /**
     * При нажатии на собственную кнопку сохранения, обновляется переменная isSaveOutside,
     * которое активирует коллбек onSave внутри компонента Editable
     */
    const clickSaveHandler = useCallback(() => {
        setIsSaveOutside(true);
    }, []);

    const saveHandler = useCallback(
        (savedValue: string) => {
            updateUsername(savedValue);
            setIsActive(false);
        },
        [updateUsername]
    );

    const cancelHandler = useCallback(() => {
        setIsActive(false);
    }, []);

    const renderIcon = useCallback(() => {
        if (isActive) {
            return (
                <Icon
                    icon={Icons.CHECK}
                    ariaLabel={locale['profile-edit-name-save-aria-label']}
                    onClick={clickSaveHandler}
                />
            );
        }
        return (
            <Icon
                icon={Icons.EDIT}
                ariaLabel={locale['profile-edit-name-aria-label']}
                onClick={clickEditHandler}
            />
        );
    }, [clickEditHandler, clickSaveHandler, isActive, locale]);

    return (
        <>
            <Heading type={HeadingTypes.H2} className={classes['heading']}>
                <span className={classes['greetings']}>{locale['profile-hello']},</span>
                <Editable
                    type="span"
                    className={classes['name']}
                    placeholder={username}
                    ariaLabel={locale['profile-username-aria-label']}
                    isActive={isActive}
                    isSaveOutside={isSaveOutside}
                    onSave={saveHandler}
                    onCancel={cancelHandler}
                />
            </Heading>
            <div>{renderIcon()}</div>
        </>
    );
};
