import React, { FC, forwardRef, useCallback, useMemo, useState } from 'react';

import cn from 'classnames';

import { Loader } from '@components/Loader/Loader';
import { NotFoundIcon } from '@icons';

import classes from './Image.module.styl';

export interface IImage {
    /** Путь до картинки */
    src: string;
    /** Альтернативное представление картинки */
    alt: string;
    /** Внешний класс */
    className?: string;
    /** Тип загрузки картинки */
    loading?: 'eager' | 'lazy';
    /** Внешний класс для картинки */
    imageClassName?: string;
    /** Закругляет углы картинки */
    withBorderRadius?: boolean;
}

const StubImage: FC = () => <img src={NotFoundIcon} alt="Не удалось загрузить изображение" />;

export const Image = forwardRef<HTMLImageElement, IImage>(
    (
        {
            className,
            imageClassName,
            src,
            alt,
            loading = 'lazy',
            withBorderRadius = false,
            ...props
        },
        ref
    ) => {
        const [isLoaded, setIsLoaded] = useState<boolean>(false);
        const [isError, setIsError] = useState<boolean>(false);

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

        const loadHandler = useCallback(() => {
            setIsLoaded(true);
            setIsError(false);
        }, []);

        const errorHandler = useCallback(() => {
            setIsLoaded(true);
            setIsError(true);
        }, []);

        return (
            <div className={rootClasses}>
                {!isLoaded && <Loader />}
                {isError ? (
                    <StubImage />
                ) : (
                    <img
                        {...props}
                        className={imageClasses}
                        src={src}
                        alt={alt}
                        loading={loading}
                        onLoad={loadHandler}
                        onError={errorHandler}
                        ref={ref}
                    />
                )}
            </div>
        );
    }
);

Image.displayName = 'Image';
