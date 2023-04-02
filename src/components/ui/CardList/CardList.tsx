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

interface ICardList {
    /** Относительно этой оси будет происходить прокрутка контента */
    axis: Axes;
    /** Элементы, из которых будет состоять список */
    cards: Array<IMangaCardProps | IReadlistCardProps>;
    /** Назване списка (если требуется) */
    title?: string;
}

/**
 * Компоннет списка карточек. Позволяет быстро создать вертикальный или горизонтальный список,
 * а также дать название
 * @param cards
 * @param axis
 * @param title
 * @constructor
 */
export const CardList: FC<ICardList> = ({ cards, axis, title }) => {
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
                [classes[`__axis-${axis}`]]: axis
            }),
        [axis]
    );

    return (
        <Loading condition={cards.length !== 0}>
            <div className={classes.wrapper}>
                {title && (
                    <Heading type={HeadingTypes.H3} className={classes.heading} text={title} />
                )}
                <ul className={rootClasses}>{renderElements()}</ul>
            </div>
        </Loading>
    );
};
