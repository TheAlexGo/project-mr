import React, { FC, ReactNode, useMemo } from 'react';

import cn from 'classnames';

import classes from './Page.module.styl';

export interface IPage {
    /** Внешний класс */
    className?: string;
    /** Основное содержимое страницы */
    children: ReactNode;
}

/**
 * Компонент-обёртка для страниц
 * */
export const Page: FC<IPage> = ({ className, children }) => {
    const rootClasses = useMemo(() => cn(classes.page, className), [className]);
    return <div className={rootClasses}>{children}</div>;
};
