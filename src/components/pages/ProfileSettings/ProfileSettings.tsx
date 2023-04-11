import React, { useMemo } from 'react';

import { observer } from 'mobx-react-lite';

import { Button } from '@components/Button/Button';
import { Heading, HeadingTypes } from '@components/Heading/Heading';
import { Icon, Icons } from '@components/Icon/Icon';
import { usePage } from '@hooks/usePage';
import { useStore } from '@hooks/useStore';
import { Justifies, ModalLinks, Pages } from '@types';
import { getButtonSecondaryHoverProps, getButtonWithArrowProps } from '@utils/buttons';
import { getModalLink } from '@utils/routing';

import { Page } from '../Page/Page';

import classes from './ProfileSettings.module.styl';

const ProfileSettings = observer(() => {
    const { lang, locale } = useStore();

    const headerButtons = useMemo(() => [], []);
    usePage(Pages.PROFILE_SETTINGS, headerButtons, true, true);

    const buttonWithArrowProps = useMemo(
        () => ({
            className: classes['button'],
            ...getButtonWithArrowProps()
        }),
        []
    );

    const buttonSecondaryHoverProps = useMemo(() => getButtonSecondaryHoverProps(), []);

    return (
        <Page>
            <div className={classes['container']}>
                <div className={classes['top']}>
                    <div className={classes['container-security']}>
                        <Heading type={HeadingTypes.H3} className={classes['heading']}>
                            {locale['profile-settings-security']}
                        </Heading>
                        <Button
                            {...buttonWithArrowProps}
                            href={Pages.PROFILE_SETTINGS_CHANGE_EMAIL}
                        >
                            {locale['profile-settings-security-email']}
                        </Button>
                        <Button
                            {...buttonWithArrowProps}
                            href={Pages.PROFILE_SETTINGS_CHANGE_PASSWORD}
                        >
                            {locale['profile-settings-security-password']}
                        </Button>
                    </div>
                    <div>
                        <Heading type={HeadingTypes.H3} className={classes['heading']}>
                            {locale['profile-settings-lang']}
                        </Heading>
                        <Button
                            {...buttonWithArrowProps}
                            href={Pages.PROFILE_SETTINGS_CHANGE_LANGUAGE}
                        >
                            {locale[`lang-${lang}`]}
                        </Button>
                    </div>
                </div>
                <Button
                    {...buttonSecondaryHoverProps}
                    className={classes['button-delete']}
                    contentJustify={Justifies.SPACE_BETWEEN}
                    icon={<Icon icon={Icons.TRASH} ariaLabel={null} isNotButton />}
                    href={getModalLink(ModalLinks.DELETE_ACCOUNT)}
                    withRightIcon
                >
                    {locale['profile-settings-account-delete']}
                </Button>
            </div>
        </Page>
    );
});

export default ProfileSettings;
