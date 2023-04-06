import React, { useCallback } from 'react';

import { observer } from 'mobx-react-lite';

import { Button, ButtonThemes } from '@components/Button/Button';
import { useController } from '@hooks/useController';
import { usePage } from '@hooks/usePage';
import { useStore } from '@hooks/useStore';
import { Lang, Pages } from '@types';

import { Page } from '../Page/Page';

const ProfileSettings = observer(() => {
    const { lang } = useStore();
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
            Страница настроек
            <Button theme={ButtonThemes.PRIMARY} onClick={clickHandler} isWide>
                Поменять язык
            </Button>
        </Page>
    );
});

export default ProfileSettings;
