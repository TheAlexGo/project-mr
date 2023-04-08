import React from 'react';

import { usePage } from '@hooks/usePage';
import { Pages } from '@types';

const ProfileSettingsEmail = () => {
    usePage(Pages.PROFILE_SETTINGS_CHANGE_EMAIL, [], true, true);

    return <div>Поменять почту</div>;
};

export default ProfileSettingsEmail;
