import React, { FC, Suspense, useCallback, useLayoutEffect, useMemo } from 'react';

import cn from 'classnames';
import { observer } from 'mobx-react-lite';
import { Outlet, useLocation } from 'react-router-dom';

import { Header } from '@components/Header/Header';
import { HeadingTypes } from '@components/Heading/Heading';
import { Loader } from '@components/Loader/Loader';
import { Modals } from '@components/Modals/Modals';
import { Navbar } from '@components/Navbar/Navbar';
import { useController } from '@hooks/useController';
import { useStore } from '@hooks/useStore';

import classes from './LayoutMain.module.styl';

/**
 * Шаблон для основных страниц приложения
 * @constructor
 */
export const LayoutMain: FC = observer((): JSX.Element => {
    const { navigate, headerTitleKey, headerButtons, headerWithBack, locale } = useStore();
    const { changePage } = useController();
    const location = useLocation();

    const heading = useMemo(() => locale[headerTitleKey], [headerTitleKey, locale]);

    const withHeader = useMemo(
        () => headerButtons.length || heading,
        [headerButtons.length, heading]
    );

    const rootClasses = useMemo(
        () =>
            cn(classes.layout, {
                [classes['__is-with_heading']]: withHeader
            }),
        [withHeader]
    );

    const renderHeader = useCallback(() => {
        if (!withHeader) {
            return null;
        }
        return (
            <div className={classes.header}>
                <Header
                    headingType={HeadingTypes.H1}
                    heading={heading}
                    buttons={headerButtons}
                    needBack={headerWithBack}
                />
            </div>
        );
    }, [headerButtons, heading, headerWithBack, withHeader]);

    useLayoutEffect(() => {
        changePage(location.pathname);
    }, [changePage, location.pathname]);

    return (
        <main className={rootClasses}>
            {renderHeader()}
            <Suspense fallback={<Loader />}>
                <Outlet />
            </Suspense>
            <div className={classes.navbar}>
                <Navbar items={navigate} />
            </div>
            <Modals />
        </main>
    );
});
