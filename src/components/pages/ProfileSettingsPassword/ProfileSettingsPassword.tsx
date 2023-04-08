import React from 'react';

import { usePage } from '@hooks/usePage';
import { Pages } from '@types';

const ProfileSettingsPassword = () => {
    usePage(Pages.PROFILE_SETTINGS_CHANGE_PASSWORD, [], true, true);

    return <div>Изменить пароль</div>;
};

export default ProfileSettingsPassword;
