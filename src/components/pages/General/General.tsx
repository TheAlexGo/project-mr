import React, { FC } from 'react';

import { observer } from 'mobx-react-lite';

import './General.styl';

export const General: FC = observer(() => (
    <div className="general">
        <h2 className="general_header">It&apos;s my best General Page!</h2>
    </div>
));

