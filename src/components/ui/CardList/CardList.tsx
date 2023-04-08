import React, { FC, useCallback, useMemo } from 'react';

import cn from 'classnames';

import { IMangaCardProps, MangaCard } from '@cards/MangaCard/MangaCard';
import { IReadlistCardProps, ReadlistCard } from '@cards/ReadlistCard/ReadlistCard';
import { Heading, HeadingTypes } from '@components/Heading/Heading';
import { Loading } from '@components/Loading/Loading';

import classes from './CardList.module.styl';

export enum Axes {
    X = 'x',
    Y = 'y'
}

export enum ScrollSnapTypes {
    X_Mandatory = 'x_mandatory',
    Y_Mandatory = 'y_mandatory',
    None = ''
}

interface ICardList {
    /** Относительно этой оси будет происходить прокрутка контента */
    axis: Axes;
    /** Элементы, из которых будет состоять список */
    cards: Array<IMangaCardProps | IReadlistCardProps>;
    /** Назване списка (если требуется) */
    title?: string;
    /** Тип привязки прокрутки: https://developer.mozilla.org/en-US/docs/Web/CSS/scroll-snap-type */
    scrollSnap?: ScrollSnapTypes;
}

/**
 * Компоннет списка карточек. Позволяет быстро создать вертикальный или горизонтальный список,
 * а также дать название
 * @param {Array<IMangaCardProps | IReadlistCardProps>} cards - карточки для списка
 * @param {Axes} axis - ось прокрутки
 * @param {string} title - название списка
 * @param {ScrollSnapTypes} scrollSnap
 * @constructor
 */
export const CardList: FC<ICardList> = ({
    cards,
    axis,
    title,
    scrollSnap = ScrollSnapTypes.None
}) => {
    const renderElements = useCallback(
        () =>
            cards.map((card) => {
                switch (card.type) {
                    case 'manga':
                        return (
                            <MangaCard
                                key={card.id}
                                {...(card as IMangaCardProps)}
                                wrapperClassName={classes['wrapper-card']}
                                className={classes.card}
                            />
                        );
                    case 'readlist':
                        return (
                            <ReadlistCard
                                key={card.id}
                                {...(card as IReadlistCardProps)}
                                wrapperClassName={classes['wrapper-card']}
                                className={classes.card}
                            />
                        );
                    default:
                        return null;
                }
            }),
        [cards]
    );

    const rootClasses = useMemo(
        () =>
            cn(classes.list, {
                [classes[`__axis-${axis}`]]: axis,
                [classes[`__scroll_snap-${scrollSnap}`]]: scrollSnap
            }),
        [axis, scrollSnap]
    );

    return (
        <Loading condition={cards.length !== 0}>
            <div className={classes.wrapper}>
                {title && (
                    <Heading type={HeadingTypes.H3} className={classes.heading}>
                        {title}
                    </Heading>
                )}
                <div className={classes.container}>
                    <ul className={rootClasses}>{renderElements()}</ul>
                </div>
            </div>
        </Loading>
    );
};
