import React, { useLayoutEffect, useEffect, FC, ReactNode, useCallback, useMemo } from 'react';

import cn from 'classnames';
import { observer } from 'mobx-react-lite';
import { useLocation } from 'react-router-dom';

import { Header } from '@components/Header/Header';
import { Heading, HeadingTypes } from '@components/Heading/Heading';
import { IIcon } from '@components/Icon/Icon';
import { useController } from '@hooks/useController';
import { useStore } from '@hooks/useStore';

import classes from './Page.module.styl';

export interface IPage {
    /** Внешний класс */
    className?: string;
    /** Основное содержимое страницы */
    children: ReactNode;
    /** Массив кнопок, который будет показан в шапке */
    headerButtons?: IIcon[];
    /** Заголовок, отличный от того, что подтягивается в зависимости от активного location.pathname */
    customHeading?: string;
    /** Показать кнопку возвращения? */
    headerWithBack?: boolean;
    /** Использовать невидимый заголовок? */
    isInvisibleHeading?: boolean;
    /** Убрать заголовок? */
    isDisableHeading?: boolean;
}

/**
 * Компонент-обёртка для страниц со встроенной логикой
 * */
export const Page: FC<IPage> = observer(
    ({
        className,
        headerButtons = [],
        customHeading,
        isInvisibleHeading = false,
        headerWithBack = false,
        isDisableHeading = false,
        children
    }) => {
        const { locale } = useStore();
        const { pathname, hash } = useLocation();
        const { loadPageState, savePageState } = useController();

        const headingPage = useMemo(() => {
            if (isDisableHeading) {
                return '';
            }
            return customHeading || locale[`page-${pathname}-heading`];
        }, [customHeading, isDisableHeading, locale, pathname]);

        const rootClasses = useMemo(
            () =>
                cn(
                    classes['page'],
                    {
                        [classes['__is-with_heading']]:
                            (headingPage && !isInvisibleHeading) || headerButtons.length
                    },
                    className
                ),
            [className, headerButtons.length, headingPage, isInvisibleHeading]
        );

        const renderHeader = useCallback(() => {
            if (isInvisibleHeading && !headerButtons.length) {
                return (
                    <Heading type={HeadingTypes.H1} isInvisible>
                        {headingPage}
                    </Heading>
                );
            }
            return (
                <div className={classes['header']}>
                    <Header
                        headingType={HeadingTypes.H1}
                        heading={headingPage}
                        buttons={headerButtons}
                        needBack={headerWithBack}
                        isInvisibleHeading={isInvisibleHeading}
                    />
                </div>
            );
        }, [headerButtons, headerWithBack, headingPage, isInvisibleHeading]);

        /**
         * Загружаем состояние страницы
         */
        useEffect(() => {
            loadPageState();
        }, [loadPageState, hash]);

        /**
         * Сохраняем состояние прямо до размонтирования DOM-элементов, для корректного сохранения позиции
         */
        useLayoutEffect(() => savePageState, [savePageState]);

        return (
            <>
                {renderHeader()}
                <main className={rootClasses}>{children}</main>
            </>
        );
    }
);
