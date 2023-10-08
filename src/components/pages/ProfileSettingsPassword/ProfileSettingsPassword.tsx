import React, { ChangeEvent, FormEvent, useCallback, useState } from 'react';

import { Button, ButtonThemes, ButtonTypes } from '@components/Button/Button';
import { Input } from '@components/Input/Input';
import { InputPassword } from '@components/Input/components/InputPassword/InputPassword';
import { useController } from '@hooks/useController';
import { useStore } from '@hooks/useStore';

import { Page } from '../Page/Page';

import classes from './ProfileSettingsPassword.module.styl';

const ProfileSettingsPassword = () => {
    const [oldPassword, setOldPassword] = useState<string>('');
    const [newPassword, setNewPassword] = useState<string>('');
    const [isOldPasswordValid, setIsOldPasswordValid] = useState<boolean>(false);
    const [isNewPasswordValid, setIsNewPasswordValid] = useState<boolean>(false);
    const { locale } = useStore();
    const { debug } = useController();

    const oldPasswordChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setOldPassword(e.target.value);
    }, []);

    const newPasswordChangeHandler = useCallback((currentPassword: string) => {
        setNewPassword(currentPassword);
    }, []);

    const oldPasswordErrorHandler = useCallback(
        (isError: boolean) => {
            setIsOldPasswordValid(!isError);
        },
        [setIsOldPasswordValid]
    );

    const newPasswordErrorHandler = useCallback(
        (isError: boolean) => {
            setIsNewPasswordValid(!isError);
        },
        [setIsNewPasswordValid]
    );

    const submitHandler = useCallback(
        (e: FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            debug(`Старый пароль: ${oldPassword}`);
            debug(`Новый пароль: ${newPassword}`);
        },
        [debug, newPassword, oldPassword]
    );

    return (
        <Page headerWithBack>
            <form className={classes['container']} onSubmit={submitHandler}>
                <div className={classes['container-input']}>
                    <div className={classes['container-old-input']}>
                        <Input
                            type="password"
                            placeholder={locale['ph-old-password']}
                            value={oldPassword}
                            onChange={oldPasswordChangeHandler}
                            onError={oldPasswordErrorHandler}
                            showError={false}
                        />
                    </div>
                    <div>
                        <InputPassword
                            firstPlaceholder={locale['ph-new-password']}
                            secondPlaceholder={locale['ph-password-re']}
                            onChange={newPasswordChangeHandler}
                            onError={newPasswordErrorHandler}
                        />
                    </div>
                </div>
                <Button
                    theme={ButtonThemes.PRIMARY}
                    type={ButtonTypes.SUBMIT}
                    isDisabled={!(isOldPasswordValid && isNewPasswordValid)}
                    isWide
                >
                    {locale['button-save']}
                </Button>
            </form>
        </Page>
    );
};

export default ProfileSettingsPassword;
