import React, { FC } from 'react';

import { observer } from 'mobx-react-lite';
import ReactList from 'react-list';

import { Header } from '@components/Header/Header';
import { Icon, Icons } from '@components/Icon/Icon';
import { FlexPositions } from '@types';

import classes from './General.module.styl';

export const General: FC = observer(() => (
    <div>
        General page!
        <Icon icon={Icons.SEARCH} />
        <Header
            className={classes.general__header}
            buttonsPositions={FlexPositions.SPACE_BETWEEN}
        />
        <div className={classes.general__block}>
            <ReactList />
        </div>
    </div>
));
