import React, { FC, useCallback, useMemo, useRef, useState } from 'react';

import cn from 'classnames';
import { observer } from 'mobx-react-lite';

import { Loader } from '@components/Loader/Loader';
import { useIntersection } from '@hooks/useIntersection';
import { useStore } from '@hooks/useStore';
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
    /** Включает ленивую загрузку через Intersection Observer */
    isLazy?: boolean;
}

const StubImage: FC = () => {
    const { locale } = useStore();
    return <img src={NotFoundIcon} alt={locale['error-loading-image']} />;
};

export const Image: FC<IImage> = observer(
    ({
        className,
        imageClassName,
        src,
        alt,
        loading,
        withBorderRadius = false,
        isLazy = false,
        ...props
    }) => {
        const [isInView, setIsInView] = useState<boolean>(!isLazy);
        const [isLoaded, setIsLoaded] = useState<boolean>(false);
        const [isError, setIsError] = useState<boolean>(false);

        const ref = useRef<HTMLImageElement>(null);
        const intersectionCallback = useCallback(() => {
            setIsInView(true);
        }, []);
        useIntersection(ref, intersectionCallback);

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

        const renderLoader = useCallback(() => {
            if ((isLazy && !isInView) || isLoaded) {
                return null;
            }
            return <Loader />;
        }, [isInView, isLazy, isLoaded]);

        const renderImage = useCallback(() => {
            if (!isInView) {
                return null;
            }
            return (
                <img
                    {...props}
                    className={imageClasses}
                    src={src}
                    alt={alt}
                    loading={loading}
                    onLoad={loadHandler}
                    onError={errorHandler}
                />
            );
        }, [alt, errorHandler, imageClasses, isInView, loadHandler, loading, props, src]);

        return (
            <div className={rootClasses} ref={ref}>
                {renderLoader()}
                {isError ? <StubImage /> : renderImage()}
            </div>
        );
    }
);
