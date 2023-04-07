import React, { useMemo } from 'react';

import { observer } from 'mobx-react-lite';

import { Button } from '@components/Button/Button';
import { Icon, Icons } from '@components/Icon/Icon';
import { usePage } from '@hooks/usePage';
import { useStore } from '@hooks/useStore';
import { ArrowRIcon } from '@icons';
import { Pages, Positions } from '@types';
import { getProfileSettingsLink } from '@utils/routing';

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
                    <div>
                        <div className={classes['greetings']}>{locale['profile-hello']},</div>
                        <div className={classes['name']}>TheAlexGo</div>
                    </div>
                    <div>
                        <Icon
                            icon={Icons.EDIT}
                            ariaLabel={locale['profile-edit-name-aria-label']}
                        />
                    </div>
                </div>
                <Button
                    className={classes['button']}
                    href={settingsLink}
                    contentPosition={Positions.SPACE_BETWEEN}
                    icon={<ArrowRIcon />}
                    withRightIcon
                    isWide
                >
                    {locale['button-profile-settings-text']}
                </Button>
            </div>
        </Page>
    );
});

export default Profile;
