import React, { forwardRef, ImgHTMLAttributes, useEffect, useMemo, useState } from 'react';

import cn from 'classnames';

import { Loader } from '@components/Loader/Loader';
import { NotFoundIcon } from '@icons';

import classes from './Image.module.styl';

export interface IImage extends ImgHTMLAttributes<HTMLImageElement> {
    /** Внешний класс для картинки */
    imageClassName?: string;
    /** Закругляет углы картинки */
    withBorderRadius?: boolean;
}

export const Image = forwardRef<HTMLImageElement, IImage>(
    ({ className, imageClassName, src, alt, loading, withBorderRadius = false, ...props }, ref) => {
        const [isLoaded, setIsLoaded] = useState<boolean>(false);
        const [srcImage, setSrcImage] = useState<string>('');

        const rootClasses = useMemo(
            () =>
                cn(
                    classes.wrapper,
                    {
                        [classes['__is-loading']]: !isLoaded,
                        [classes['__with-border_radius']]: withBorderRadius
                    },
                    className
                ),
            [className, isLoaded, withBorderRadius]
        );

        const imageClasses = useMemo(
            () =>
                cn(
                    classes.image,
                    {
                        [classes['__is-loading']]: !isLoaded
                    },
                    imageClassName
                ),
            [imageClassName, isLoaded]
        );

        const loadHandler = () => {
            setIsLoaded(true);
        };

        const errorHandler = () => {
            setSrcImage(NotFoundIcon);
            setIsLoaded(true);
        };

        useEffect(() => {
            if (src !== undefined) {
                setSrcImage(src);
            }
        }, [src]);

        return (
            <div className={rootClasses}>
                {!isLoaded && <Loader />}
                <img
                    {...props}
                    className={imageClasses}
                    src={srcImage}
                    alt={alt}
                    loading={loading}
                    onError={errorHandler}
                    onLoad={loadHandler}
                    ref={ref}
                />
            </div>
        );
    }
);

Image.displayName = 'Image';
