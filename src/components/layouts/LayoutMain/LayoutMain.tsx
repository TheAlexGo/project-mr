import React, { FC, Suspense } from 'react';

import { observer } from 'mobx-react-lite';
import { Outlet } from 'react-router-dom';

import { Header } from '@components/Header/Header';
import { HeadingTypes } from '@components/Heading/Heading';
import { Loader } from '@components/Loader/Loader';
import { Navbar } from '@components/Navbar/Navbar';
import { useStore } from '@hooks/useStore';

import classes from './LayoutMain.module.styl';

/**
 * Шаблон для основных страниц приложения
 * @constructor
 */
export const LayoutMain: FC = observer((): JSX.Element => {
    const { navigate, headerTitle, headerButtons } = useStore();

    return (
        <div className={classes.layout}>
            <div className={classes.header}>
                <Header
                    headingType={HeadingTypes.H3}
                    heading={headerTitle}
                    buttons={headerButtons}
                />
            </div>
            <Suspense fallback={<Loader />}>
                <Outlet />
            </Suspense>
            <div className={classes.navbar}>
                <Navbar items={navigate} />
            </div>
        </div>
    );
});
