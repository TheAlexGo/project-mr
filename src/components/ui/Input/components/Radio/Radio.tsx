import React, { ChangeEvent, FC, useCallback } from 'react';

import { Icon, Icons } from '@components/Icon/Icon';

import classes from './Radio.module.styl';

interface IRadio {
    /** Уникальный идентификатор элемента */
    id: string;
    /** Название группы, которой принадлежит переключатель */
    name: string;
    /** Текст, поясняющий значение варианта */
    label: string;
    /** Значение варианта */
    value: string;
    /** Выбран ли этот вариант ответа? */
    isChecked?: boolean;
    /** Слушатель события изменения состояния варианта */
    onChange?: (checkedValue: string) => void;
}

/**
 * Компонент радио-кнопок для создания различных списков с вариантами выбора.
 *
 * ВАЖНО: Все элементы должны иметь значение tabIndex -1, кроме первого (ему устанавливается 0)
 * @constructor
 */
export const Radio: FC<IRadio> = ({
    id,
    name,
    label,
    value,
    onChange,
    isChecked = false
}): JSX.Element => {
    const changeHandler = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => {
            const { value } = e.target;
            if (onChange) {
                onChange(value);
            }
        },
        [onChange]
    );

    return (
        <label htmlFor={id} className={classes['container']}>
            <span className={classes['label']}>{label}</span>
            <div className={classes['wrapper']}>
                <input
                    type="radio"
                    id={id}
                    name={name}
                    className={classes['radio']}
                    defaultChecked={isChecked}
                    value={value}
                    onChange={changeHandler}
                    aria-checked={isChecked}
                    tabIndex={isChecked ? 0 : -1}
                />
                <div className={classes['radio-custom']}>
                    <Icon
                        className={classes['icon']}
                        icon={Icons.CHECK}
                        size="16"
                        ariaLabel={null}
                        isNotButton
                    />
                </div>
            </div>
        </label>
    );
};
