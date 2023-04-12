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
                if (onCancel) {
                    onCancel();
                }
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
        if (onSave && onCancel && newValue !== null) {
            if (newValue) {
                onSave(newValue);
            } else {
                onCancel();
            }
            setNewValue(null);
        }
    }, [newValue, onCancel, onSave]);

    useEffect(() => {
        const { current } = ref;
        if (isSaveOutside && onSave && current && current.textContent) {
            onSave(current.textContent);
            setNewValue(null);
        }
    }, [isSaveOutside, onSave]);

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
            tabIndex={-1}
            ref={ref}
        >
            {currentContent}
        </EditableComponent>
    );
};
