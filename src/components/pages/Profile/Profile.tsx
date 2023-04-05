import React from 'react';

import { usePage } from '@hooks/usePage';
import { Pages } from '@types';

import { Page } from '../Page/Page';

const Profile = () => {
    usePage(Pages.PROFILE);
    return <Page>Страница профиля</Page>;
};

export default Profile;
