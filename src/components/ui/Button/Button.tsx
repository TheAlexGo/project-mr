import React, { ButtonHTMLAttributes, FC, useCallback, useMemo } from 'react';

import cn from 'classnames';
import { useNavigate } from 'react-router-dom';

import { Loader } from '@components/Loader/Loader';
import { Positions, VoidFunction } from '@types';

import classes from './Button.module.styl';

export type ButtonSizes = '24' | '36' | '40' | '44' | '52';

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

export enum BackgroundColors {
    DEFAULT = 'default',
    RED = 'red'
}

/**
 * Интерфейс кнопки
 */
export interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {
    /** Устанавливает тип кнопки */
    type?: ButtonTypes;
    /** Устанавливает тему кнопки */
    theme?: ButtonThemes;
    /** Слушатель события клика по кнопке */
    onClick?: VoidFunction;
    /** Устанавливает состояние кнопки */
    state?: ButtonStates;
    /** Устанавливает фон кнопки */
    colorBackground?: BackgroundColors;
    /** Устанавливает позицию контента: слева, справа или по центру */
    contentPosition?: Positions;
    /** Устанавливает размер кнопки */
    size?: ButtonSizes;
    /** Устанавливает иконку для кнопки */
    icon?: JSX.Element;
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
    isStrangeLink?: boolean;
}

export const Button: FC<IButton> = ({
    className,
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
    isStrangeLink = false,
    withNoPadding = false,
    state = ButtonStates.DEFAULT,
    colorBackground = BackgroundColors.DEFAULT,
    size,
    type = ButtonTypes.BUTTON,
    contentPosition = Positions.CENTER,
    ...props
}): JSX.Element => {
    const classButton = cn(
        classes.button,
        {
            [classes[`__theme-${theme}`]]: !!theme,
            [classes[`__state-${state}`]]: !!state && state !== 'default',
            [classes[`__bg_color-${colorBackground}`]]: !!colorBackground,
            [classes[`__size-s${size}`]]: !!size,
            [classes[`__content_position-${contentPosition}`]]: !!contentPosition,
            [classes['__is-loading']]: isLoading,
            [classes['__is-wide']]: isWide,
            [classes['__is-rounded']]: isRounded,
            [classes['__with-no_padding']]: withNoPadding,
            [classes['__position-left']]: withLeftIcon,
            [classes['__position-right']]: withRightIcon
        },
        className
    );
    const navigate = useNavigate();

    const clickHandler = useCallback(() => {
        if (onClick) {
            onClick();
        }
        if (href) {
            if (isStrangeLink) {
                window.open(href, '_blank');
                return;
            }
            navigate(href);
        }
    }, [href, isStrangeLink, navigate, onClick]);

    const iconElement = useMemo(() => {
        if (icon) {
            if (!children) {
                return icon;
            }
            return <div className={classes.icon}>{icon}</div>;
        }
        return null;
    }, [children, icon]);

    const content = useMemo(() => {
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
    }, [children, icon, iconElement, withLeftIcon, withRightIcon]);

    return (
        <button {...props} type={type} disabled={isLoading || disabled} className={classButton} onClick={clickHandler}>
            {isLoading ? <Loader size="24" /> : content}
        </button>
    );
};
