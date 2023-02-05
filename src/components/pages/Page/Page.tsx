import React, { FC, ReactNode } from 'react';

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
export const Page: FC<IPage> = ({ className, children }) => (
    <div className={cn(classes.page, className)}>{children}</div>
);
