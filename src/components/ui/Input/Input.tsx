import React, {
    ChangeEvent,
    ChangeEventHandler,
    FC,
    useCallback,
    useEffect,
    useMemo,
    useState
} from 'react';

import cn from 'classnames';

import { Icon, Icons } from '@components/Icon/Icon';
import { useStore } from '@hooks/useStore';
import { useValidate } from '@hooks/useValidate';
import { ValidateTypes } from '@services/ValidateService';

import classes from './Input.module.styl';

interface IInput {
    /** Устанавливает тип поля ввода */
    type: 'text' | 'email' | 'password';
    /** Установливает placeholder */
    placeholder: string;
    /** Слушатель события ввода */
    onChange?: ChangeEventHandler;
    /** Коллбек на ошибку */
    onError?: (result: boolean) => void;
}

export const Input: FC<IInput> = ({ type, placeholder, onChange, onError }): JSX.Element => {
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

    const error = useValidate(value, validateType);

    const eyeClasses = useMemo(
        () =>
            cn(classes['icon-eye'], {
                [classes['__is-active']]: type === 'password' && inputType === 'text'
            }),
        [inputType, type]
    );

    const changeHandler = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => {
            if (onChange) {
                onChange(e);
            }
            setValue(e.target.value);
        },
        [onChange]
    );

    const clickEyeHandler = useCallback(() => {
        if (inputType === 'password') {
            setInputType('text');
        } else {
            setInputType('password');
        }
    }, [inputType]);

    const renderEyeIcon = useCallback(
        () =>
            type === 'password' && (
                <Icon
                    wrapperClassName={eyeClasses}
                    icon={Icons.EYE}
                    ariaLabel={locale['button-show-password']}
                    onClick={clickEyeHandler}
                />
            ),
        [clickEyeHandler, eyeClasses, locale, type]
    );

    const renderError = useCallback(
        () => error && <div className={classes['error']}>{error}</div>,
        [error]
    );

    useEffect(() => {
        setInputType(type);
    }, [type]);

    useEffect(() => {
        if (onError && error !== null) {
            onError(!error);
        }
    }, [error, onError]);

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
