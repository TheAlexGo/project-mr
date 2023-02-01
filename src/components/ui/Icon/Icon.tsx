import React, { FC, useCallback, useMemo } from 'react';

import cn from 'classnames';

import { Button, IButton } from '@components/Button/Button';
import { BellIcon, MoreIcon, PlusIcon, SearchIcon, TrashIcon } from '@icons';
import { SquareElementSizes } from '@types';
import { getSizesClass } from '@utils/styles';

import classes from './Icon.module.styl';

export enum Icons {
    MORE = 'more',
    SEARCH = 'search',
    TRASH = 'trash',
    PLUS = 'plus',
    BELL = 'bell'
}

interface IIcon {
    /** Компонент иконки */
    icon: Icons;
    /** Внешний класс */
    className?: string;
    /** Размер */
    size?: SquareElementSizes;
    /** Слушатель события клика по кнопке */
    onClick: VoidFunction;
}

export const Icon: FC<IIcon> = ({ icon, className, onClick, size = '24' }) => {
    const rootClasses = useMemo(
        () => cn(classes.icon, getSizesClass(classes, size), className),
        [className, size]
    );

    const clickHandler = useCallback(() => {
        onClick?.();
    }, [onClick]);

    const buttonParams: IButton = useMemo(() => {
        const params: IButton = {
            withNoPadding: true,
            onClick: clickHandler
        };
        switch (icon) {
            case Icons.MORE:
                params.icon = <MoreIcon className={rootClasses} />;
                break;
            case Icons.SEARCH:
                params.icon = <SearchIcon className={rootClasses} />;
                break;
            case Icons.TRASH:
                params.icon = <TrashIcon className={rootClasses} />;
                break;
            case Icons.PLUS:
                params.icon = <PlusIcon className={rootClasses} />;
                break;
            case Icons.BELL:
                params.icon = <BellIcon className={rootClasses} />;
                break;
        }
        return params;
    }, [clickHandler, icon, rootClasses]);

    return <Button {...buttonParams} />;
};
