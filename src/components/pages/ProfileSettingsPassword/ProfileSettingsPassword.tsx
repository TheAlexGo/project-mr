import React, { useMemo } from 'react';

import { usePage } from '@hooks/usePage';
import { Pages } from '@types';

const ProfileSettingsPassword = () => {
    const headerButtons = useMemo(() => [], []);
    usePage(Pages.PROFILE_SETTINGS_CHANGE_PASSWORD, headerButtons, true, true);

    return <div>Изменить пароль</div>;
};

export default ProfileSettingsPassword;
