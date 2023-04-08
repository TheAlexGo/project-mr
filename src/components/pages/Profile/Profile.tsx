import React, { useMemo } from 'react';

import { observer } from 'mobx-react-lite';

import { Button, ButtonStates, ButtonThemes } from '@components/Button/Button';
import { Heading, HeadingTypes } from '@components/Heading/Heading';
import { Icon, Icons } from '@components/Icon/Icon';
import { usePage } from '@hooks/usePage';
import { useStore } from '@hooks/useStore';
import { Justifies, Pages } from '@types';

import { Theme } from './components/Theme/Theme';
import pkg from '../../../../package.json';
import { Page } from '../Page/Page';

import classes from './Profile.module.styl';

const Profile = () => {
    const { locale } = useStore();

    usePage(Pages.PROFILE, [], false, false);

    const versionApp = useMemo(() => `${locale['profile-version']} ${pkg.version}`, [locale]);

    return (
        <Page>
            <div className={classes['container']}>
                <div className={classes['top']}>
                    <div className={classes['container-name']}>
                        <Heading type={HeadingTypes.H1} className={classes['heading']}>
                            <span className={classes['greetings']}>{locale['profile-hello']},</span>
                            <span className={classes['name']}>TheAlexGo</span>
                        </Heading>
                        <div>
                            <Icon
                                icon={Icons.EDIT}
                                ariaLabel={locale['profile-edit-name-aria-label']}
                            />
                        </div>
                    </div>
                    <Button
                        theme={ButtonThemes.SECONDARY}
                        state={ButtonStates.HOVER}
                        className={classes['button-settings']}
                        href={Pages.PROFILE_SETTINGS}
                        contentJustify={Justifies.SPACE_BETWEEN}
                        icon={<Icon icon={Icons.ARROW_RIGHT} ariaLabel={null} isNotButton />}
                        withRightIcon
                        isWide
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
