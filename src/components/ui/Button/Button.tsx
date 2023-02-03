import React, { ButtonHTMLAttributes, FC, ReactElement, useCallback, useMemo } from 'react';

import cn from 'classnames';
import { useNavigate } from 'react-router-dom';

import { Loader } from '@components/Loader/Loader';
import { Directions, Positions, SquareElementSizes } from '@types';
import { getPositionsAndDirectionsClass, getSizesClass } from '@utils/styles';

import classes from './Button.module.styl';

export enum ButtonThemes {
    PRIMARY = 'primary',
    SECONDARY = 'secondary',
    TAG = 'tag',
    CLEAR = 'clear'
}

export enum ButtonStates {
    HOVER = 'hover',
    STATIC = 'static',
    DEFAULT = 'default'
}

export enum ButtonTypes {
    BUTTON = 'button',
    SUBMIT = 'submit',
    RESET = 'reset'
}

/**
 * Интерфейс кнопки
 */
export interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {
    /** Устанавливает класс для иконки */
    iconClassName?: string;
    /** Устанавливает тип кнопки */
    type?: ButtonTypes;
    /** Устанавливает тему кнопки */
    theme?: ButtonThemes;
    /** Слушатель события клика по кнопке */
    onClick?: VoidFunction;
    /** Устанавливает состояние кнопки */
    state?: ButtonStates;
    /** Устанавливает позицию контента: слева, справа или по центру */
    contentPosition?: Positions;
    /** Расположение контента относительно друг друга: в строку, в столбец */
    contentDirection?: Directions;
    /** Устанавливает размер кнопки */
    size?: SquareElementSizes;
    /** Устанавливает иконку для кнопки */
    icon?: ReactElement;
    /** Устанавливает ссылку куда перенаправит кнопка при нажатии на неё */
    href?: string;
    /** Устанавливает положение иконки слева */
    withLeftIcon?: boolean;
    /** Устанавливает положение иконки справа */
    withRightIcon?: boolean;
    /** Убрать внутренний отступ */
    withNoPadding?: boolean;
    /** Растягивает кнопку на всю ширину */
    isWide?: boolean;
    /** Делает кнопку круглой */
    isRounded?: boolean;
    /** Устанавливает состояние загрузки у кнопки */
    isLoading?: boolean;
    /** Сильная ссылка - переход на другую страницу */
    isExternalLink?: boolean;
}

export const Button: FC<IButton> = ({
    className,
    iconClassName,
    href,
    icon,
    onClick,
    theme,
    children,
    withLeftIcon = false,
    withRightIcon = false,
    isWide = false,
    isRounded = false,
    disabled = false,
    isLoading = false,
    isExternalLink = false,
    withNoPadding = false,
    state = ButtonStates.DEFAULT,
    size,
    type = ButtonTypes.BUTTON,
    contentPosition = Positions.CENTER,
    contentDirection = Directions.ROW,
    ...props
}): JSX.Element => {
    const rootClasses = cn(
        classes.button,
        {
            [classes[`__theme-${theme}`]]: !!theme,
            [classes['__is-loading']]: isLoading,
            [classes['__is-wide']]: isWide,
            [classes['__is-rounded']]: isRounded,
            [classes['__with-no_padding']]: withNoPadding,
            [classes['__position-left']]: withLeftIcon,
            [classes['__position-right']]: withRightIcon,
            [classes[`__state-${state}`]]: !!state && state !== 'default',
            ...getSizesClass(classes, size),
            ...getPositionsAndDirectionsClass(classes, contentPosition, contentDirection)
        },
        className
    );
    const navigate = useNavigate();

    const clickHandler = useCallback(() => {
        if (onClick) {
            onClick();
        }
        if (href) {
            if (isExternalLink) {
                window.open(href, '_blank');
                return;
            }
            navigate(href);
        }
    }, [href, isExternalLink, navigate, onClick]);

    const iconElement = useMemo(() => {
        if (icon) {
            return <div className={cn(classes.icon, iconClassName)}>{icon}</div>;
        }
        return null;
    }, [icon, iconClassName]);

    const content = useMemo(() => {
        if (isLoading) {
            return <Loader size="24" />;
        }
        if (!children && icon) {
            return iconElement;
        }
        return (
            <>
                {withLeftIcon && iconElement}
                {children}
                {withRightIcon && iconElement}
            </>
        );
    }, [children, icon, iconElement, isLoading, withLeftIcon, withRightIcon]);

    return (
        <button
            {...props}
            className={rootClasses}
            type={type}
            disabled={isLoading || disabled}
            onClick={clickHandler}
        >
            {content}
        </button>
    );
};
