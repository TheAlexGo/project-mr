import React, { FC, ReactNode } from 'react';

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
    /** Тип заголовка */
    type?: HeadingTypes;
    /** Внешний класс */
    className?: string;
}

export const Heading: FC<IHeading> = ({ type = HeadingTypes.H1, children, className }) => {
    const HeadingComponent = type;

    return <HeadingComponent className={className}>{children}</HeadingComponent>;
};
