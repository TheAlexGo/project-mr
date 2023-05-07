import React, { FC, ReactNode, useCallback, useMemo } from 'react';

import cn from 'classnames';
import { observer } from 'mobx-react-lite';
import { useLocation } from 'react-router-dom';

import { Header } from '@components/Header/Header';
import { Heading, HeadingTypes } from '@components/Heading/Heading';
import { IIcon } from '@components/Icon/Icon';
import { usePageInit } from '@hooks/usePageInit';
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
    /** Убрать шапку? */
    isDisableHeader?: boolean;
    /** Сделать шапку прозрачной? */
    isTransparentHeader?: boolean;
    /** Сделать заголовок пустым? */
    withBlankHeading?: boolean;
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
        isDisableHeader = false,
        isTransparentHeader = false,
        withBlankHeading = false,
        children
    }) => {
        const { locale } = useStore();
        const { pathname } = useLocation();

        const headingPage = useMemo(() => {
            if (withBlankHeading) {
                return '';
            }
            return customHeading || locale[`page-${pathname}-heading`];
        }, [customHeading, withBlankHeading, locale, pathname]);

        const needRenderHeader = useMemo(
            () => (headingPage && !isInvisibleHeading) || headerButtons.length || headerWithBack,
            [headerButtons.length, headerWithBack, headingPage, isInvisibleHeading]
        );

        const rootClasses = useMemo(
            () =>
                cn(
                    classes['page'],
                    {
                        [classes['__is-with_heading']]: needRenderHeader && !isTransparentHeader
                    },
                    className
                ),
            [className, isTransparentHeader, needRenderHeader]
        );

        const headerClasses = useMemo(
            () =>
                cn(classes['header'], {
                    [classes['__is-transparent']]: isTransparentHeader
                }),
            [isTransparentHeader]
        );

        const renderHeader = useCallback(() => {
            if (isDisableHeader) {
                return null;
            }

            if (!needRenderHeader) {
                return (
                    <Heading type={HeadingTypes.H1} isInvisible>
                        {headingPage}
                    </Heading>
                );
            }
            return (
                <div className={headerClasses}>
                    <Header
                        headingType={HeadingTypes.H1}
                        heading={headingPage}
                        buttons={headerButtons}
                        needBack={headerWithBack}
                        isInvisibleHeading={isInvisibleHeading}
                    />
                </div>
            );
        }, [
            headerButtons,
            headerClasses,
            headerWithBack,
            headingPage,
            isDisableHeader,
            isInvisibleHeading,
            needRenderHeader
        ]);

        usePageInit();

        return (
            <>
                {renderHeader()}
                <main className={rootClasses}>{children}</main>
            </>
        );
    }
);
