import React, { FC, ReactNode, useMemo } from 'react';

import cn from 'classnames';

import classes from './Heading.module.styl';

export enum HeadingTypes {
    H1 = 'h1',
    H2 = 'h2',
    H3 = 'h3',
    H4 = 'h4',
    H5 = 'h5',
    H6 = 'h6'
}

interface IHeading {
    /** Содержимое заголовка */
    children: ReactNode;
    /** Уникальный идентификатор */
    id?: string;
    /** Тип заголовка */
    type?: HeadingTypes;
    /** Внешний класс */
    className?: string;
    isInvisible?: boolean;
}

export const Heading: FC<IHeading> = ({
    id,
    type = HeadingTypes.H1,
    children,
    className,
    isInvisible = false
}) => {
    const HeadingComponent = type;

    const rootClasses = useMemo(
        () =>
            cn(
                classes['heading'],
                {
                    [classes['__is-invisible']]: isInvisible
                },
                className
            ),
        [className, isInvisible]
    );

    return (
        <HeadingComponent id={id} className={rootClasses}>
            {children}
        </HeadingComponent>
    );
};
