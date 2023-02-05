import React, { FC, useCallback, useMemo } from 'react';

import cn from 'classnames';

import { Button, IButton } from '@components/Button/Button';
import {
    BackIcon,
    BellIcon,
    CloseIcon,
    HomeIcon,
    LibraryIcon,
    MoreIcon,
    PlusIcon,
    ProfileIcon,
    SearchIcon,
    TrashIcon
} from '@icons';
import { SquareElementSizes } from '@types';
import { getSizesClass } from '@utils/styles';

import classes from './Icon.module.styl';

export enum Icons {
    MORE = 'more',
    SEARCH = 'search',
    TRASH = 'trash',
    PLUS = 'plus',
    BELL = 'bell',
    CLOSE = 'close',
    LIBRARY = 'library',
    HOME = 'home',
    PROFILE = 'profile',
    BACK = 'back'
}

export interface IIcon {
    /** Компонент иконки */
    icon: Icons;
    /** Устанавливает текст для скрин-ридеров */
    ariaLabel: string;
    /** Внешний класс */
    className?: string;
    /** Размер */
    size?: SquareElementSizes;
    /** Слушатель события клика по кнопке */
    onClick?: VoidFunction;
    /** Иконка не является кнопкой */
    isNotButton?: boolean;
}

export const Icon: FC<IIcon> = ({
    icon,
    className,
    onClick,
    ariaLabel,
    isNotButton = false,
    size = '24'
}): JSX.Element => {
    const rootClasses = useMemo(
        () => cn(classes.icon, getSizesClass(classes, size), className),
        [className, size]
    );

    const clickHandler = useCallback(() => {
        if (onClick) {
            onClick();
        }
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
            case Icons.CLOSE:
                params.icon = <CloseIcon className={rootClasses} />;
                break;
            case Icons.LIBRARY:
                params.icon = <LibraryIcon className={rootClasses} />;
                break;
            case Icons.HOME:
                params.icon = <HomeIcon className={rootClasses} />;
                break;
            case Icons.PROFILE:
                params.icon = <ProfileIcon className={rootClasses} />;
                break;
            case Icons.BACK:
                params.icon = <BackIcon className={rootClasses} />;
                break;
        }
        return params;
    }, [clickHandler, icon, rootClasses]);

    if (isNotButton && buttonParams.icon) {
        return buttonParams.icon;
    }

    return <Button {...buttonParams} aria-label={ariaLabel} />;
};
