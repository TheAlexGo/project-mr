import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';

import { Heading, HeadingTypes } from '@components/Heading/Heading';
import { Radio } from '@components/Input/components/Radio/Radio';

import classes from './RadioGroup.module.styl';

export interface IOption {
    id: string;
    label: string;
    value: string;
}

interface IRadioGroup {
    /** Название группы */
    title: string;
    /** Уникальное имя группы (только латиница) */
    name: string;
    /** Элементы группы. Представляют собой варианты выбора */
    options: IOption[];
    /** То значение, которое было установлено до этого */
    currentValue?: string;
    /** Слушатель события изменения активного элемента */
    onChange?: (activeElement: string) => void;
}

export const RadioGroup: FC<IRadioGroup> = ({
    title,
    name,
    options,
    currentValue,
    onChange
}): JSX.Element => {
    const [activeElement, setActiveElement] = useState<string>(currentValue || '');

    const headingId = useMemo(() => `title-${name}`, [name]);

    const changeHandler = useCallback(
        (currentElement: string) => {
            setActiveElement(currentElement);
            if (onChange) {
                onChange(currentElement);
            }
        },
        [onChange]
    );

    const renderElements = useCallback(
        () =>
            options.map((option) => (
                <Radio
                    {...option}
                    key={option.id}
                    name={name}
                    isChecked={activeElement === option.value}
                    onChange={changeHandler}
                />
            )),
        [activeElement, changeHandler, name, options]
    );

    return (
        <div role="radiogroup" aria-labelledby={headingId}>
            <Heading id={headingId} className={classes['heading']} type={HeadingTypes.H3}>
                {title}
            </Heading>
            {renderElements()}
        </div>
    );
};
