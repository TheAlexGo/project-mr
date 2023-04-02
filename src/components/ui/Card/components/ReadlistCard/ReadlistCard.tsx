import React, { FC, useMemo } from 'react';

import cn from 'classnames';

import { Card, TCardProps } from '@components/Card/Card';
import { Icon, Icons } from '@components/Icon/Icon';
import { useStore } from '@hooks/useStore';
import { IReadlist } from '@types';
import { getReadlistPageLink } from '@utils/routing';

import classes from './ReadlistCard.module.styl';

export interface IReadlistCardProps extends IReadlist, TCardProps {
    /** Название ридлиста */
    title: string;
}

export const ReadlistCard: FC<IReadlistCardProps> = ({
    title,
    className,
    isTitleAlignCenter = false,
    onClick,
    ...readlist
}) => {
    const { id } = readlist;
    const rootClasses = cn(classes.card, className);
    const { locale } = useStore();
    const link = useMemo(() => getReadlistPageLink(title, id), [id, title]);

    const ariaLabel = useMemo(() => locale['readlist-icon-aria-label'] + title, [locale, title]);

    const image = useMemo(
        () => (
            <div className={classes.overlays}>
                <div className={classes['overlay-front']}>
                    <Icon
                        className={classes.bookmark}
                        icon={Icons.LIBRARY}
                        size="40"
                        ariaLabel={ariaLabel}
                        isNotButton
                    />
                </div>
                <div className={classes['overlay-middle']} />
                <div className={classes['overlay-back']} />
            </div>
        ),
        [ariaLabel]
    );

    return (
        <Card
            className={rootClasses}
            title={title}
            image={image}
            href={link}
            isTitleAlignCenter={isTitleAlignCenter}
            onClick={onClick}
        />
    );
};
