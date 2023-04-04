import React, { FC, ReactElement, useCallback, useMemo } from 'react';

import cn from 'classnames';
import { observer } from 'mobx-react-lite';
import { Link } from 'react-router-dom';

import { Image } from '@components/Image/Image';
import { useStore } from '@hooks/useStore';

import classes from './Card.module.styl';

export interface ICard {
    /** Название карточки */
    title: string;
    /** Обложка карточки */
    image: string | ReactElement;
    /** Ссылка на карточку */
    href: string;
    /** Внешний класс */
    className?: string;
    /** Внешний класс обёртки */
    wrapperClassName?: string;
    /** Распологает название по центру карточки */
    isTitleAlignCenter?: boolean;
    /** Слушатель события клика по карточке */
    onClick?: VoidFunction;
    /** Дополнительное содержимое (например, панель инструментов) */
    children?: ReactElement;
}

export type TCardProps = Pick<
    ICard,
    'isTitleAlignCenter' | 'onClick' | 'className' | 'wrapperClassName'
>;

export const Card: FC<ICard> = observer(
    ({
        className,
        wrapperClassName,
        title,
        image,
        onClick,
        children,
        href = '/',
        isTitleAlignCenter = false
    }): JSX.Element => {
        const { locale } = useStore();

        const rootClasses = useMemo(
            () => cn(classes.wrapper, wrapperClassName),
            [wrapperClassName]
        );
        const linkClasses = useMemo(() => cn(classes.card, className), [className]);

        const coverAlt = useMemo(() => locale['manga-cover'], [locale]);

        const titleClasses = useMemo(
            () =>
                cn(classes.title, {
                    [classes['__align-center']]: isTitleAlignCenter
                }),
            [isTitleAlignCenter]
        );

        const clickHandler = useCallback(() => {
            if (onClick) {
                onClick();
            }
        }, [onClick]);

        const imageComponent = useMemo(() => {
            if (typeof image === 'string') {
                return (
                    <Image
                        className={classes.image}
                        src={image}
                        alt={coverAlt}
                        loading="lazy"
                        withBorderRadius
                    />
                );
            }
            return image;
        }, [coverAlt, image]);

        return (
            <li className={rootClasses}>
                {children}
                <Link className={linkClasses} to={href} onClick={clickHandler}>
                    {imageComponent}
                    <div className={titleClasses}>{title}</div>
                </Link>
            </li>
        );
    }
);
