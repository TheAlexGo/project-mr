import React, { useMemo } from 'react';

import { observer } from 'mobx-react-lite';

import { Button, ButtonThemes } from '@components/Button/Button';
import { Heading, HeadingTypes } from '@components/Heading/Heading';
import { Icon, Icons } from '@components/Icon/Icon';
import { usePage } from '@hooks/usePage';
import { useStore } from '@hooks/useStore';
import { ArrowRIcon } from '@icons';
import { Justifies, Pages } from '@types';
import { getProfileSettingsLink } from '@utils/routing';

import { Theme } from './components/Theme/Theme';
import { Page } from '../Page/Page';

import classes from './Profile.module.styl';

const Profile = observer(() => {
    const { locale } = useStore();

    usePage(Pages.PROFILE);

    const settingsLink = useMemo(() => getProfileSettingsLink(), []);

    return (
        <Page>
            <div className={classes['container']}>
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
                    className={classes['button']}
                    href={settingsLink}
                    contentJustify={Justifies.SPACE_BETWEEN}
                    icon={<ArrowRIcon />}
                    withRightIcon
                    isWide
                >
                    {locale['button-profile-settings-text']}
                </Button>
                <Theme />
            </div>
        </Page>
    );
});

export default Profile;
