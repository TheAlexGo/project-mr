import React, { FC, useCallback, useMemo } from 'react';

import { observer } from 'mobx-react-lite';

import { IOption, RadioGroup } from '@components/Input/components/RadioGroup/RadioGroup';
import { useController } from '@hooks/useController';
import { useStore } from '@hooks/useStore';
import { Lang } from '@types';

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

    const changeHandler = useCallback(
        (activeLang: string) => {
            switchLang(activeLang as Lang);
        },
        [switchLang]
    );

    return (
        <Page headerWithBack>
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
