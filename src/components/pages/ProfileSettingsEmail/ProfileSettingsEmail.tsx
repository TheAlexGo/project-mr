import React, { useMemo } from 'react';

import { usePage } from '@hooks/usePage';
import { Pages } from '@types';

const ProfileSettingsEmail = () => {
    const headerButtons = useMemo(() => [], []);
    usePage(Pages.PROFILE_SETTINGS_CHANGE_EMAIL, headerButtons, true, true);

    return <div>Поменять почту</div>;
};

export default ProfileSettingsEmail;
