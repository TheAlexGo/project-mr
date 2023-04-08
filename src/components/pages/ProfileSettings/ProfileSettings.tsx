import React, { useCallback } from 'react';

import { observer } from 'mobx-react-lite';

import { Button, ButtonStates, ButtonThemes } from '@components/Button/Button';
import { Heading, HeadingTypes } from '@components/Heading/Heading';
import { Icon, Icons } from '@components/Icon/Icon';
import { useController } from '@hooks/useController';
import { usePage } from '@hooks/usePage';
import { useStore } from '@hooks/useStore';
import { Justifies, Lang, Pages } from '@types';

import { Page } from '../Page/Page';

import classes from './ProfileSettings.module.styl';

const ProfileSettings = observer(() => {
    const { lang, locale } = useStore();
    const { switchLang } = useController();
    usePage(Pages.PROFILE_SETTINGS, [], true, true);

    const clickHandler = useCallback(() => {
        if (lang === Lang.ENGLISH) {
            switchLang(Lang.RUSSIAN);
        } else {
            switchLang(Lang.ENGLISH);
        }
    }, [lang, switchLang]);

    return (
        <Page>
            <div className={classes['container']}>
                <div className={classes['top']}>
                    <div className={classes['container-security']}>
                        <Heading type={HeadingTypes.H3} className={classes['heading']}>
                            {locale['profile-settings-security']}
                        </Heading>
                        <Button
                            theme={ButtonThemes.SECONDARY}
                            state={ButtonStates.HOVER}
                            className={classes['button']}
                            href={Pages.PROFILE_SETTINGS_CHANGE_EMAIL}
                            contentJustify={Justifies.SPACE_BETWEEN}
                            icon={<Icon icon={Icons.ARROW_RIGHT} ariaLabel={null} isNotButton />}
                            withRightIcon
                            isWide
                        >
                            {locale['profile-settings-security-email']}
                        </Button>
                        <Button
                            theme={ButtonThemes.SECONDARY}
                            state={ButtonStates.HOVER}
                            className={classes['button']}
                            href={Pages.PROFILE_SETTINGS_CHANGE_PASSWORD}
                            contentJustify={Justifies.SPACE_BETWEEN}
                            icon={<Icon icon={Icons.ARROW_RIGHT} ariaLabel={null} isNotButton />}
                            withRightIcon
                            isWide
                        >
                            {locale['profile-settings-security-password']}
                        </Button>
                    </div>
                    <div>
                        <Heading type={HeadingTypes.H3} className={classes['heading']}>
                            {locale['profile-settings-lang']}
                        </Heading>
                        <Button
                            theme={ButtonThemes.SECONDARY}
                            state={ButtonStates.HOVER}
                            onClick={clickHandler}
                            isWide
                        >
                            Поменять язык
                        </Button>
                    </div>
                </div>
                <Button
                    theme={ButtonThemes.SECONDARY}
                    state={ButtonStates.HOVER}
                    className={classes['button-delete']}
                    contentJustify={Justifies.SPACE_BETWEEN}
                    icon={<Icon icon={Icons.TRASH} ariaLabel={null} isNotButton />}
                    withRightIcon
                    isWide
                >
                    {locale['profile-settings-account-delete']}
                </Button>
            </div>
        </Page>
    );
});

export default ProfileSettings;
