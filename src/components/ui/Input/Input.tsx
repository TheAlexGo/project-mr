import React, { ChangeEvent, FC, useCallback, useEffect, useMemo, useState } from 'react';

import cn from 'classnames';

import { Icon, Icons } from '@components/Icon/Icon';
import { useStore } from '@hooks/useStore';
import { useValidate } from '@hooks/useValidate';
import { ValidateTypes } from '@services/ValidateService';

import classes from './Input.module.styl';

export interface IInput {
    /** Устанавливает тип поля ввода */
    type: 'text' | 'email' | 'password';
    /** Устанавливает placeholder */
    placeholder: string;
    /** Устанавливает значение ошибки извне */
    customError?: string | null;
    /** Нужно ли показывать ошибку? */
    showError?: boolean;
    /** Нужно ли показывать кнопку "Показать пароль"? */
    showEye?: boolean;
    /** Нужно ли показать пароль? */
    showPassword?: boolean;
    /** Слушатель события ввода */
    onChange?: (currentValue: string) => void;
    /** Коллбек на ошибку */
    onError?: (isError: boolean) => void;
    /** Слушатель клика на "Показать пароль" */
    onClickEye?: () => void;
}

export const Input: FC<IInput> = ({
    type,
    placeholder,
    customError,
    onChange,
    onError,
    onClickEye,
    showEye = true,
    showError = true,
    showPassword = false
}): JSX.Element => {
    const [value, setValue] = useState<string>('');
    const [inputType, setInputType] = useState<string>('');
    const { locale } = useStore();

    const validateType = useMemo(() => {
        switch (type) {
            case 'password':
                return ValidateTypes.PASSWORD;
            case 'email':
                return ValidateTypes.EMAIL;
            default:
                return ValidateTypes.UNKNOWN;
        }
    }, [type]);

    const error = useValidate(validateType, value, undefined, showError);

    const eyeClasses = useMemo(
        () =>
            cn(classes['icon-eye'], {
                [classes['__is-active']]: type === 'password' && inputType === 'text'
            }),
        [inputType, type]
    );

    const currentError = useMemo(() => customError || error, [customError, error]);

    const changeHandler = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => {
            onChange?.(e.target.value);
            setValue(e.target.value);
        },
        [onChange]
    );

    const clickEyeHandler = useCallback(() => {
        if (onClickEye) {
            onClickEye();
        } else if (inputType === 'password') {
            setInputType('text');
        } else {
            setInputType('password');
        }
    }, [inputType, onClickEye]);

    const renderEyeIcon = useCallback(
        () =>
            showEye &&
            type === 'password' && (
                <Icon
                    wrapperClassName={eyeClasses}
                    icon={Icons.EYE}
                    ariaLabel={locale['button-show-password']}
                    onClick={clickEyeHandler}
                />
            ),
        [clickEyeHandler, eyeClasses, locale, showEye, type]
    );

    const renderError = useCallback(
        () => showError && currentError && <div className={classes['error']}>{currentError}</div>,
        [currentError, showError]
    );

    useEffect(() => {
        if (type === 'password' && showPassword) {
            setInputType('text');
        } else {
            setInputType(type);
        }
    }, [showPassword, type]);

    useEffect(() => {
        if (onError) {
            if (showError) {
                if (error !== null) {
                    onError(!!error);
                }
            } else {
                onError(!value);
            }
        }
    }, [error, onError, showError, value]);

    return (
        <div>
            <div className={classes['wrapper']}>
                <input
                    type={inputType}
                    className={classes['input']}
                    placeholder={placeholder}
                    onChange={changeHandler}
                    value={value}
                />
                {renderEyeIcon()}
            </div>
            {renderError()}
        </div>
    );
};
