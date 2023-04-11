import React, { FC, useCallback, useMemo } from 'react';

import { observer } from 'mobx-react-lite';

import { IOption, RadioGroup } from '@components/Input/components/RadioGroup/RadioGroup';
import { useController } from '@hooks/useController';
import { usePage } from '@hooks/usePage';
import { useStore } from '@hooks/useStore';
import { Lang, Pages } from '@types';

import { Page } from '../Page/Page';

import classes from './ProfileSettingsLanguage.module.styl';

const ProfileSettingsLanguage: FC = observer((): JSX.Element => {
    const { locale, lang } = useStore();
    const { switchLang } = useController();

    const options: IOption[] = useMemo(
        () =>
            Object.values(Lang).map((lang) => ({
                id: lang,
                label: locale[`lang-${lang}`],
                value: lang
            })),
        [locale]
    );

    const headerButtons = useMemo(() => [], []);
    usePage(Pages.PROFILE_SETTINGS_CHANGE_LANGUAGE, headerButtons, true, true);

    const changeHandler = useCallback(
        (activeLang: string) => {
            switchLang(activeLang as Lang);
        },
        [switchLang]
    );

    return (
        <Page>
            <div className={classes['container']}>
                <RadioGroup
                    title={locale['profile-select-lang']}
                    name="language"
                    options={options}
                    onChange={changeHandler}
                    currentValue={lang}
                />
            </div>
        </Page>
    );
});

export default ProfileSettingsLanguage;
