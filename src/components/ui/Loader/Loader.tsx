import React, { FC, HTMLAttributes, JSX } from 'react';

import cn from 'classnames';
import { observer } from 'mobx-react-lite';

import { useStore } from '@hooks/useStore';
import { SquareElementSizes } from '@types';
import { getSizesClass } from '@utils/styles';

import classes from './Loader.module.styl';

interface LoaderProps extends HTMLAttributes<HTMLDivElement> {
    size?: SquareElementSizes;
}

export const Loader: FC<LoaderProps> = observer(
    ({ size = '52', className, ...props }): JSX.Element => {
        const { locale } = useStore();

        const rootClasses = cn(classes.loader, getSizesClass(classes, size), className);

        return (
            <div
                {...props}
                className={rootClasses}
                role="progressbar"
                aria-live="polite"
                aria-label={locale['loading']}
            >
                <div className={classes.circle} />
            </div>
        );
    }
);
