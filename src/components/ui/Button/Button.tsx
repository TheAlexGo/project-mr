import React, {
    JSX,
    Ref,
    forwardRef,
    HTMLAttributes,
    ReactElement,
    ReactNode,
    useCallback,
    useMemo,
    MouseEventHandler,
    MouseEvent
} from 'react';

import cn from 'classnames';

import { Link } from '@components/Link/Link';
import { Loader } from '@components/Loader/Loader';
import { Directions, Positions, Justifies, SquareElementSizes } from '@types';
import { getDirectionClass, getPositionClass, getJustifyClass, getSizesClass } from '@utils/styles';

import classes from './Button.module.styl';

export enum ButtonThemes {
    PRIMARY = 'primary',
    SECONDARY = 'secondary',
    TAG = 'tag'
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
export interface IButton extends HTMLAttributes<HTMLButtonElement> {
    /** Устанавливает внешний класс */
    className?: string;
    /** Устанавливает класс для иконки */
    iconClassName?: string;
    /** Содержимое кнопки */
    children?: ReactNode;
    /** Устанавливает тип кнопки */
    type?: ButtonTypes;
    /** Устанавливает тему кнопки */
    theme?: ButtonThemes;
    /** Слушатель события клика по кнопке */
    onClick?: MouseEventHandler;
    /** Устанавливает состояние кнопки */
    state?: ButtonStates;
    /** Расположение контента относительно кнопки: слева, справа или по центру */
    contentPosition?: Positions;
    /** Расположение контента относительно друг друга: друг от друга */
    contentJustify?: Justifies;
    /** Устанавливает позицию контента: в строку, в столбец */
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
    /** Устанавливает состояние кнопки, как неактивное */
    isDisabled?: boolean;
    /** Растягивает кнопку на всю ширину */
    isWide?: boolean;
    /** Делает кнопку круглой */
    isRounded?: boolean;
    /** Устанавливает состояние загрузки у кнопки */
    isLoading?: boolean;
    /** Сильная ссылка - переход на другую страницу */
    isExternalLink?: boolean;
    ref?: Ref<HTMLButtonElement>;
}

export const Button = forwardRef<HTMLButtonElement, IButton>(
    (
        {
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
            isDisabled = false,
            isLoading = false,
            isExternalLink = false,
            withNoPadding = false,
            state = ButtonStates.DEFAULT,
            size,
            type = ButtonTypes.BUTTON,
            contentJustify = Justifies.CENTER,
            contentDirection = Directions.ROW,
            contentPosition = Positions.CENTER,
            ...props
        },
        ref
    ): JSX.Element => {
        const rootClasses = useMemo(
            () =>
                cn(
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
                        ...getPositionClass(classes, contentPosition),
                        ...getDirectionClass(classes, contentDirection),
                        ...getJustifyClass(classes, contentJustify)
                    },
                    className
                ),
            [
                className,
                contentDirection,
                contentPosition,
                contentJustify,
                isLoading,
                isRounded,
                isWide,
                size,
                state,
                theme,
                withLeftIcon,
                withNoPadding,
                withRightIcon
            ]
        );

        const clickHandler = useCallback(
            (e: MouseEvent) => {
                onClick?.(e);
            },
            [onClick]
        );

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

        if (href) {
            return (
                <Link
                    className={rootClasses}
                    to={href}
                    onClick={clickHandler}
                    target={isExternalLink ? '_blank' : '_self'}
                >
                    {content}
                </Link>
            );
        }

        return (
            <button
                {...props}
                className={rootClasses}
                type={type}
                disabled={isLoading || isDisabled}
                onClick={clickHandler}
                ref={ref}
            >
                {content}
            </button>
        );
    }
);

Button.displayName = 'Button';
