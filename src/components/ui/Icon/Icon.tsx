import React, { FC, useCallback, useMemo } from 'react';

import cn from 'classnames';

import { Button, IButton } from '@components/Button/Button';
import {
    ArrowRIcon,
    BackIcon,
    BellIcon,
    CloseIcon,
    EditIcon,
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
    BACK = 'back',
    EDIT = 'edit',
    ARROW_RIGHT = 'arrow_right'
}

export interface IIcon {
    /** Компонент иконки */
    icon: Icons;
    /** Устанавливает текст для скрин-ридеров */
    ariaLabel: string | null;
    /** Внешний класс */
    className?: string;
    /** Внешний класс для обёртки */
    wrapperClassName?: string;
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
    wrapperClassName,
    onClick,
    ariaLabel,
    isNotButton = false,
    size = '24'
}): JSX.Element | null => {
    const rootClasses = useMemo(() => cn(classes.wrapper, wrapperClassName), [wrapperClassName]);
    const iconClasses = useMemo(
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
                params.icon = <MoreIcon className={iconClasses} />;
                break;
            case Icons.SEARCH:
                params.icon = <SearchIcon className={iconClasses} />;
                break;
            case Icons.TRASH:
                params.icon = <TrashIcon className={iconClasses} />;
                break;
            case Icons.PLUS:
                params.icon = <PlusIcon className={iconClasses} />;
                break;
            case Icons.BELL:
                params.icon = <BellIcon className={iconClasses} />;
                break;
            case Icons.CLOSE:
                params.icon = <CloseIcon className={iconClasses} />;
                break;
            case Icons.LIBRARY:
                params.icon = <LibraryIcon className={iconClasses} />;
                break;
            case Icons.HOME:
                params.icon = <HomeIcon className={iconClasses} />;
                break;
            case Icons.PROFILE:
                params.icon = <ProfileIcon className={iconClasses} />;
                break;
            case Icons.BACK:
                params.icon = <BackIcon className={iconClasses} />;
                break;
            case Icons.EDIT:
                params.icon = <EditIcon className={iconClasses} />;
                break;
            case Icons.ARROW_RIGHT:
                params.icon = <ArrowRIcon className={iconClasses} />;
                break;
        }
        return params;
    }, [clickHandler, icon, iconClasses]);

    if (isNotButton && buttonParams.icon) {
        return buttonParams.icon;
    }

    if (!ariaLabel) {
        return null;
    }

    return <Button {...buttonParams} className={rootClasses} aria-label={ariaLabel} />;
};
