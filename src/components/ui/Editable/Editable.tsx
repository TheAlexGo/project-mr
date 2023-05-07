import React, { FC, useCallback, useEffect, useMemo, useRef, useState } from 'react';

import cn from 'classnames';

import { ENTER, ESCAPE } from '@utils/constants';

import classes from './Editable.module.styl';

interface IEditable {
    /** Тип тега, в котором будут происходить изменения */
    type: 'span' | 'div';
    /** Плейсхолдер при активаци редактирования */
    placeholder: string;
    /** Внешний класс для стилей */
    className?: string;
    /** Текст-описание поля для скрин-ридеров */
    ariaLabel: string;
    /** Активно ли сейчас редактирование? */
    isActive?: boolean;
    /** Используем сохранение извне: например, при нажатии на собственную кнопку сохранения */
    isSaveOutside?: boolean;
    /** Коллбек при сохранении нового значения */
    onSave?: (savedResult: string) => void;
    /** Коллбек при отмене изменения */
    onCancel?: () => void;
}

export const Editable: FC<IEditable> = ({
    type,
    placeholder,
    className,
    ariaLabel,
    onSave,
    onCancel,
    isActive = false,
    isSaveOutside = false
}): JSX.Element => {
    const [newValue, setNewValue] = useState<string | null>(null);

    const EditableComponent = useMemo(() => type, [type]);

    const ref = useRef<HTMLDivElement>(null);

    const rootClasses = useMemo(() => cn(classes['element'], className), [className]);

    const currentPlaceholder = useMemo(() => newValue || placeholder, [newValue, placeholder]);

    const currentContent = useMemo(() => {
        if (isActive) {
            return newValue;
        }
        if (newValue !== null) {
            return newValue;
        }
        return placeholder;
    }, [isActive, newValue, placeholder]);

    const keyDownEnterHandler = useCallback((e: React.KeyboardEvent<HTMLElement>) => {
        if (e.key === ENTER) {
            const target = e.target as HTMLElement;
            setNewValue(target.textContent);
            e.preventDefault();
        }
    }, []);

    const keyDownEscapeHandler = useCallback(
        (e: KeyboardEvent) => {
            if (e.key === ESCAPE) {
                onCancel?.();
                e.preventDefault();
            }
        },
        [onCancel]
    );

    useEffect(() => {
        const { current } = ref;
        if (isActive && current) {
            const getSelection = window.getSelection();
            if (getSelection) {
                current.focus();
                getSelection.selectAllChildren(current);
                getSelection.collapseToEnd();
            }
        }
    }, [isActive]);

    useEffect(() => {
        const { current } = ref;
        if (current && newValue !== null) {
            if (newValue) {
                onSave?.(newValue);
            } else {
                onCancel?.();
            }
            setNewValue(null);
            current.blur();
        }
    }, [newValue, onCancel, onSave]);

    useEffect(() => {
        const { current } = ref;
        if (isSaveOutside && current) {
            if (current.textContent) {
                onSave?.(current.textContent);
            } else {
                onCancel?.();
            }
            setNewValue(null);
            current.blur();
        }
    }, [isSaveOutside, onCancel, onSave]);

    useEffect(() => {
        document.addEventListener('keydown', keyDownEscapeHandler);
        return () => document.removeEventListener('keydown', keyDownEscapeHandler);
    }, [keyDownEscapeHandler]);

    return (
        <EditableComponent
            role="textbox"
            className={rootClasses}
            onKeyDown={keyDownEnterHandler}
            contentEditable={isActive}
            suppressContentEditableWarning
            placeholder={currentPlaceholder}
            aria-label={ariaLabel}
            tabIndex={-1}
            ref={ref}
        >
            {currentContent}
        </EditableComponent>
    );
};
