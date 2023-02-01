import React, { FC } from 'react';

import cn from 'classnames';

import { SquareElementSizes } from '@types';
import { getSizesClass } from '@utils/styles';

import classes from './Loader.module.styl';

interface LoaderProps {
    size?: SquareElementSizes;
}

export const Loader: FC<LoaderProps> = ({ size = '52' }): JSX.Element => {
    const rootClasses = cn(classes.loader, getSizesClass(classes, size));

    return (
        <div className={rootClasses}>
            <div className={classes.circle} />
        </div>
    );
};
