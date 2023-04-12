import React, { FC, ReactNode, useCallback, useMemo } from 'react';

import cn from 'classnames';

import { Heading, HeadingTypes } from '@components/Heading/Heading';

import classes from './Page.module.styl';

export interface IPage {
    /** Внешний класс */
    className?: string;
    /** Устанавливает невидимый заголовок первого уровня */
    invisibleHeading?: string;
    /** Основное содержимое страницы */
    children: ReactNode;
}

/**
 * Компонент-обёртка для страниц
 * */
export const Page: FC<IPage> = ({ className, invisibleHeading, children }) => {
    const rootClasses = useMemo(() => cn(classes.page, className), [className]);

    const renderInvisibleHeading = useCallback(
        () =>
            invisibleHeading && (
                <Heading type={HeadingTypes.H1} isInvisible>
                    {invisibleHeading}
                </Heading>
            ),
        [invisibleHeading]
    );

    return (
        <div className={rootClasses}>
            {renderInvisibleHeading()}
            {children}
        </div>
    );
};
