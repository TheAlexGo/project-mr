import React, { FC, ReactElement, useCallback, useMemo } from 'react';

import cn from 'classnames';

import { Button } from '@components/Button/Button';
import { Image } from '@components/Image/Image';
import { useStore } from '@hooks/useStore';
import { Directions, Positions } from '@types';

import classes from './Card.module.styl';

export interface ICard {
    /** Название книги */
    title: string;
    /** Обложка книги */
    image: string | ReactElement;
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

export type TCardProps = Pick<ICard, 'isTitleAlignCenter' | 'onClick' | 'className'>;

export const Card: FC<ICard> = ({
    className,
    href,
    title,
    image,
    onClick,
    children,
    isTitleAlignCenter = false
}): JSX.Element => {
    const { locale } = useStore();
    const buttonClasses = useMemo(() => cn(classes.card, className), [className]);

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
            return <Image className={classes.image} src={image} alt={coverAlt} withBorderRadius />;
        }
        return image;
    }, [coverAlt, image]);

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
                {imageComponent}
                <div className={titleClasses}>{title}</div>
            </Button>
        </div>
    );
};
