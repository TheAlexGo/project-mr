import React, { FC } from 'react';

import cn from 'classnames';

import { ButtonSizes } from '@types';

import classes from './Loader.module.styl';

interface LoaderProps {
    size?: ButtonSizes;
}

export const Loader: FC<LoaderProps> = ({ size = '52' }): JSX.Element => {
    const rootClasses = cn(classes.loader, {
        [classes[`__size-s${size}`]]: !!size
    });

    return (
        <div className={rootClasses}>
            <div className={classes.circle} />
        </div>
    );
};
