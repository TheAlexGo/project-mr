import React, { FC } from 'react';

import { Header } from '@components/Header/Header';
import { FlexPositions } from '@types';
import block from 'bem-cn-custom';
import { observer } from 'mobx-react-lite';
import './General.styl';

const classnames = block('general');

export const General: FC = observer(() => (
    <div>
        General page!
        <Header className={classnames('header')} buttonsPositions={FlexPositions.SPACE_BETWEEN} />
        <div className={classnames('blocks')} />
    </div>
));
