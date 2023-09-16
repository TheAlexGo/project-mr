import React, { FC, JSX, ReactElement, useCallback } from 'react';

import cn from 'classnames';
import { observer } from 'mobx-react-lite';

import { Image } from '@components/Image/Image';
import { Link } from '@components/Link/Link';
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

        const rootClasses = cn(classes.wrapper, wrapperClassName);
        const linkClasses = cn(classes.card, className);

        const coverAlt = `${locale['manga-cover']} ${title}`;

        const titleClasses = cn(classes.title, {
            [classes['__align-center']]: isTitleAlignCenter
        });

        const clickHandler = useCallback(() => {
            onClick?.();
        }, [onClick]);

        const imageComponent =
            typeof image === 'string' ? (
                <Image
                    className={classes.image}
                    src={image}
                    alt={coverAlt}
                    withBorderRadius
                    isLazy
                />
            ) : (
                image
            );

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
