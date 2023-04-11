import React, { FormEvent, useCallback, useMemo, useState } from 'react';

import { Button, ButtonThemes, ButtonTypes } from '@components/Button/Button';
import { Input } from '@components/Input/Input';
import { useController } from '@hooks/useController';
import { usePage } from '@hooks/usePage';
import { useStore } from '@hooks/useStore';
import { Pages } from '@types';

import { Page } from '../Page/Page';

import classes from './ProfileSettingsEmail.module.styl';

const ProfileSettingsEmail = () => {
    const [email, setEmail] = useState<string>('');
    const [isValid, setIsValid] = useState<boolean>(false);
    const { locale } = useStore();
    const { debug } = useController();

    const headerButtons = useMemo(() => [], []);
    usePage(Pages.PROFILE_SETTINGS_CHANGE_EMAIL, headerButtons, true, true);

    const changeHandler = useCallback((value: string) => {
        setEmail(value);
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
        <Page>
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
