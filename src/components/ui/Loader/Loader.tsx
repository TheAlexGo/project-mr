import React, { FC } from 'react';

import { ButtonSizes } from '@types';
import block from 'bem-cn-custom';

import './Loader.styl';

const classnames = block('loader');

interface LoaderProps {
    size?: ButtonSizes;
}

export const Loader: FC<LoaderProps> = ({ size = '52' }): JSX.Element => {
    const rootClasses = classnames({
        [`size__${size}`]: !!size
    });

    return (
        <div className={rootClasses}>
            <div className={classnames('circle')} />
        </div>
    );
};
