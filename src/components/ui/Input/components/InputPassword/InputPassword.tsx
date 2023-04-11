import React, { FC, useCallback, useEffect, useState } from 'react';

import { IInput, Input } from '@components/Input/Input';
import { useValidate } from '@hooks/useValidate';
import { ValidateTypes } from '@services/ValidateService';

import classes from './InputPassword.module.styl';

interface IInputPassword extends Pick<IInput, 'onError'> {
    /** Устанавливает placeholder для первого поля ввода */
    firstPlaceholder: string;
    /** Устанавливает placeholder для второго поля ввода */
    secondPlaceholder: string;
    /** Коллбек, который устанавливает валидный пароль */
    onChange: (currentPassword: string) => void;
}

export const InputPassword: FC<IInputPassword> = ({
    firstPlaceholder,
    secondPlaceholder,
    onChange,
    onError
}): JSX.Element => {
    const [isValidFirstPassword, setIsValidFirstPassword] = useState<boolean>(false);
    const [isValidSecondPassword, setIsValidSecondPassword] = useState<boolean>(false);
    const [firstPassword, setFirstPassword] = useState<string>('');
    const [secondPassword, setSecondPassword] = useState<string>('');
    const [isComputingError, setIsComputingError] = useState<boolean>(false);
    const [showPassword, setShowPassword] = useState<boolean>(false);

    const error = useValidate(ValidateTypes.PASSWORD_MATCH, firstPassword, secondPassword);

    const firstChangeHandler = useCallback((currentValue: string) => {
        setFirstPassword(currentValue);
        setIsComputingError(true);
    }, []);

    const secondChangeHandler = useCallback((currentValue: string) => {
        setSecondPassword(currentValue);
        setIsComputingError(true);
    }, []);

    const firstErrorHandler = useCallback((isError: boolean) => {
        setIsValidFirstPassword(!isError);
    }, []);

    const secondErrorHandler = useCallback((isError: boolean) => {
        setIsValidSecondPassword(!isError);
    }, []);

    const clickEyeHandler = useCallback(() => {
        setShowPassword(!showPassword);
    }, [showPassword]);

    useEffect(() => {
        setIsComputingError(false);
    }, [error]);

    useEffect(() => {
        if (!onError || error === null || isComputingError) {
            return;
        }
        const isValid = isValidFirstPassword && isValidSecondPassword && !error;
        onError(!isValid);
        if (isValid) {
            onChange(secondPassword);
        }
    }, [
        error,
        isComputingError,
        isValidFirstPassword,
        isValidSecondPassword,
        onChange,
        onError,
        secondPassword
    ]);

    return (
        <div>
            <div className={classes['container']}>
                <Input
                    type="password"
                    placeholder={firstPlaceholder}
                    onChange={firstChangeHandler}
                    onError={firstErrorHandler}
                    onClickEye={clickEyeHandler}
                    showPassword={showPassword}
                />
            </div>
            <div>
                <Input
                    type="password"
                    placeholder={secondPlaceholder}
                    customError={error}
                    onChange={secondChangeHandler}
                    onError={secondErrorHandler}
                    showEye={false}
                    showPassword={showPassword}
                />
            </div>
        </div>
    );
};
