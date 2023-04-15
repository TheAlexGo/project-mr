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
    const { navigate, withHeaderPage, headingPage, headerButtons, headerWithBack } = useStore();
    const { changePage } = useController();
    const location = useLocation();

    const rootClasses = useMemo(
        () =>
            cn(classes.layout, {
                [classes['__is-with_heading']]: withHeaderPage
            }),
        [withHeaderPage]
    );

    const renderHeader = useCallback(() => {
        if (!withHeaderPage) {
            return null;
        }
        return (
            <div className={classes.header}>
                <Header
                    headingType={HeadingTypes.H1}
                    heading={headingPage}
                    buttons={headerButtons}
                    needBack={headerWithBack}
                />
            </div>
        );
    }, [headerButtons, headingPage, headerWithBack, withHeaderPage]);

    useLayoutEffect(() => {
        changePage(location.pathname + location.hash);
    }, [changePage, location.hash, location.pathname]);

    return (
        <div className={rootClasses}>
            {renderHeader()}
            <Suspense fallback={<Loader />}>
                <Outlet />
            </Suspense>
            <div className={classes.navbar}>
                <Navbar items={navigate} />
            </div>
            <Modals />
        </div>
    );
});
