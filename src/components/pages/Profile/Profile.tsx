import React, { useMemo } from 'react';

import { Button } from '@components/Button/Button';
import { usePage } from '@hooks/usePage';
import { useStore } from '@hooks/useStore';
import { Pages } from '@types';
import { getButtonWithArrowProps } from '@utils/buttons';

import { Header } from './components/Header/Header';
import { Theme } from './components/Theme/Theme';
import pkg from '../../../../package.json';
import { Page } from '../Page/Page';

import classes from './Profile.module.styl';

const Profile = () => {
    const { locale } = useStore();

    const headerButtons = useMemo(() => [], []);
    usePage(Pages.PROFILE, headerButtons, false, false);

    const versionApp = useMemo(() => `${locale['profile-version']} ${pkg.version}`, [locale]);

    const buttonWithArrowProps = useMemo(() => getButtonWithArrowProps(), []);

    return (
        <Page invisibleHeading={locale['page-profile-heading']}>
            <div className={classes['container']}>
                <div className={classes['top']}>
                    <div className={classes['container-name']}>
                        <Header />
                    </div>
                    <Button
                        {...buttonWithArrowProps}
                        className={classes['button-settings']}
                        href={Pages.PROFILE_SETTINGS}
                    >
                        {locale['button-profile-settings-text']}
                    </Button>
                    <Theme />
                </div>
                <Button className={classes['button-out']}>{locale['profile-sign-out']}</Button>
                <div className={classes['version']}>{versionApp}</div>
            </div>
        </Page>
    );
};

export default Profile;
