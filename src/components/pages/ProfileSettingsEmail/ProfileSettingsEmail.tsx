import React, { ChangeEvent, FormEvent, useCallback, useState } from 'react';

import { Button, ButtonThemes, ButtonTypes } from '@components/Button/Button';
import { Input } from '@components/Input/Input';
import { useController } from '@hooks/useController';
import { useStore } from '@hooks/useStore';

import { Page } from '../Page/Page';

import classes from './ProfileSettingsEmail.module.styl';

const ProfileSettingsEmail = () => {
    const [email, setEmail] = useState<string>('');
    const [isValid, setIsValid] = useState<boolean>(false);
    const { locale } = useStore();
    const { debug } = useController();

    const changeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    }, []);

    const errorHandler = useCallback((isError: boolean) => {
        setIsValid(!isError);
    }, []);

    const submitHandler = useCallback(
        (e: FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            debug(email);
        },
        [debug, email]
    );

    return (
        <Page headerWithBack>
            <form className={classes['container']} onSubmit={submitHandler}>
                <div className={classes['container-input']}>
                    <Input
                        placeholder={locale['profile-settings-security-email']}
                        type="email"
                        onChange={changeHandler}
                        onError={errorHandler}
                    />
                </div>
                <Button
                    theme={ButtonThemes.PRIMARY}
                    type={ButtonTypes.SUBMIT}
                    isDisabled={!isValid}
                    isWide
                >
                    {locale['button-save']}
                </Button>
            </form>
        </Page>
    );
};

export default ProfileSettingsEmail;
