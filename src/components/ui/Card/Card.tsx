import React, { FC, ReactElement, useCallback, useMemo } from 'react';

import cn from 'classnames';

import { Button } from '@components/Button/Button';
import { Image } from '@components/Image/Image';
import { Directions, MangaFnCallback, Positions } from '@types';

import classes from './Card.module.styl';

export interface ICard {
    /** Название книги */
    title: string;
    /** Обложка книги */
    image: string;
    /** Ссылка на книгу */
    href?: string;
    /** Внешний класс */
    className?: string;
    /** Распологает название по центру карточки */
    isTitleAlignCenter?: boolean;
    /** Слушатель события клика по карточке */
    onClick?: VoidFunction;
    /** Дополнительное содержимое (например, панель инструментов) */
    children?: ReactElement;
}

export const Card: FC<ICard> = ({
    className,
    href,
    title,
    image,
    onClick,
    children,
    isTitleAlignCenter = false
}): JSX.Element => {
    const buttonClasses = useMemo(() => cn(classes.card, className), [className]);

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

    return (
        <div className={classes.wrapper}>
            {children}
            <Button
                className={buttonClasses}
                href={href}
                onClick={clickHandler}
                contentPosition={Positions.TOP}
                contentDirection={Directions.COLUMN}
                withNoPadding
            >
                <Image className={classes.image} src={image} alt={title} withBorderRadius />
                <div className={titleClasses}>{title}</div>
            </Button>
        </div>
    );
};
