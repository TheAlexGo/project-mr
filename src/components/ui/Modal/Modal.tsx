/* eslint-disable jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions */
import React, { FC, useCallback, useMemo, MouseEvent, useEffect, useRef, useState } from 'react';

import cn from 'classnames';
import { createPortal } from 'react-dom';

import { Button, ButtonStates, ButtonThemes } from '@components/Button/Button';
import { Heading, HeadingTypes } from '@components/Heading/Heading';
import { useController } from '@hooks/useController';
import { useFocusTrap } from '@hooks/useFocusTrap';
import { useStore } from '@hooks/useStore';
import { ESCAPE } from '@utils/constants';
import { DISABLED_SCROLL_MODIFIER } from '@utils/dom';

import classes from './Modal.module.styl';

export interface IModal {
    /** Уникальный идентификатор модального окна */
    id: string;
    /** Заголовок модального окна */
    heading: string;
    /** Описание модального окна */
    description: string;
    /** Описание модального окна */
    actionText: string;
    /** Коллбек при нажатии на кнопку отмены */
    onCancel?: VoidFunction;
    /** Коллбек при нажатии на кнопку действия */
    onAction?: VoidFunction;
    /** Контейнер, в которое будет помещено модальное окно */
    container?: HTMLElement | null;
}

/**
 * Основной компонент модального окна
 * @constructor
 */
export const Modal: FC<IModal> = ({
    id,
    heading,
    description,
    actionText,
    onCancel,
    onAction,
    container = document.querySelector('#container-modal')
}): JSX.Element | null => {
    const [prevElement, setPrevElement] = useState<HTMLElement>();
    const { locale } = useStore();
    const { logger } = useController();

    const overlayRef = useRef<HTMLDivElement>(null);

    const buttonPrimaryClasses = useMemo(
        () =>
            cn(classes['button'], {
                [classes['__primary']]: true
            }),
        []
    );

    const buttonDangerClasses = useMemo(
        () =>
            cn(classes['button'], {
                [classes['__danger']]: true
            }),
        []
    );

    const cancelClickHandler = useCallback(() => {
        onCancel?.();
    }, [onCancel]);

    const actionClickHandler = useCallback(() => {
        onAction?.();
    }, [onAction]);

    const overlayClickOutsideHandler = useCallback(
        (e: MouseEvent<HTMLDivElement>) => {
            if (e.target === overlayRef.current) {
                cancelClickHandler();
            }
        },
        [cancelClickHandler]
    );

    const keyUpHandler = useCallback(
        (e: KeyboardEvent) => {
            if (e.key === ESCAPE) {
                cancelClickHandler();
            }
        },
        [cancelClickHandler]
    );

    const renderActionButton = useCallback(
        () =>
            actionText && (
                <Button
                    className={buttonDangerClasses}
                    theme={ButtonThemes.SECONDARY}
                    state={ButtonStates.STATIC}
                    onClick={actionClickHandler}
                >
                    {actionText}
                </Button>
            ),
        [actionClickHandler, actionText, buttonDangerClasses]
    );

    useFocusTrap(overlayRef);

    /**
     * Отключаем глобальный скролл
     */
    useEffect(() => {
        document.body.classList.add(DISABLED_SCROLL_MODIFIER);
        return () => document.body.classList.remove(DISABLED_SCROLL_MODIFIER);
    }, []);

    /**
     * Сохраняем элемент, с которого открыли окно
     */
    useEffect(() => {
        if (prevElement || !document.activeElement) {
            return;
        }
        setPrevElement(document.activeElement as HTMLElement);
    }, [prevElement]);

    /**
     * Слушаем событие ввода с клавиатуры
     */
    useEffect(() => {
        document.addEventListener('keyup', keyUpHandler);
        return () => document.removeEventListener('keyup', keyUpHandler);
    }, [keyUpHandler]);

    /**
     * После выхода из модального окна - возвращаемся туда, откуда открыли окно
     */
    useEffect(
        () => () => {
            if (prevElement) {
                prevElement.focus();
            }
        },
        [prevElement]
    );

    if (!container) {
        logger('Контейнера для модального окна не существует!');
        return null;
    }

    return createPortal(
        <div
            role="dialog"
            className={classes['overlay']}
            onClick={overlayClickOutsideHandler}
            tabIndex={-1}
            ref={overlayRef}
            aria-labelledby="dialog_heading"
            aria-modal
        >
            <div id={id} className={classes['modal']}>
                <Heading id="dialog_heading" className={classes['heading']} type={HeadingTypes.H2}>
                    {heading}
                </Heading>
                <div className={classes['body']}>{description}</div>
                <div className={classes['footer']}>
                    <Button
                        className={buttonPrimaryClasses}
                        theme={ButtonThemes.SECONDARY}
                        state={ButtonStates.STATIC}
                        onClick={cancelClickHandler}
                    >
                        {locale['button-cancel']}
                    </Button>
                    {renderActionButton()}
                </div>
            </div>
        </div>,
        container
    );
};
