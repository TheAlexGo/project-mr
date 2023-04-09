import React, { FC, useMemo } from 'react';

import cn from 'classnames';

import { Button, IButton } from '@components/Button/Button';
import {
    ArrowRIcon,
    AutoIcon,
    BackIcon,
    BellIcon,
    CloseIcon,
    DayIcon,
    EditIcon,
    EyeIcon,
    HomeIcon,
    LibraryIcon,
    MoreIcon,
    NightIcon,
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
    ARROW_RIGHT = 'arrow_right',
    DAY = 'day',
    NIGHT = 'night',
    AUTO = 'auto',
    EYE = 'eye'
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

    const currentAriaLabel = useMemo(() => ariaLabel || '', [ariaLabel]);

    const isAriaHidden = useMemo(() => !ariaLabel, [ariaLabel]);

    const iconProps = useMemo(
        () => ({
            className: iconClasses,
            'aria-label': currentAriaLabel,
            'aria-hidden': isAriaHidden
        }),
        [currentAriaLabel, iconClasses, isAriaHidden]
    );

    const buttonParams: IButton = useMemo(() => {
        const params: IButton = {
            withNoPadding: true,
            onClick
        };
        switch (icon) {
            case Icons.MORE:
                params.icon = <MoreIcon {...iconProps} />;
                break;
            case Icons.SEARCH:
                params.icon = <SearchIcon {...iconProps} />;
                break;
            case Icons.TRASH:
                params.icon = <TrashIcon {...iconProps} />;
                break;
            case Icons.PLUS:
                params.icon = <PlusIcon {...iconProps} />;
                break;
            case Icons.BELL:
                params.icon = <BellIcon {...iconProps} />;
                break;
            case Icons.CLOSE:
                params.icon = <CloseIcon {...iconProps} />;
                break;
            case Icons.LIBRARY:
                params.icon = <LibraryIcon {...iconProps} />;
                break;
            case Icons.HOME:
                params.icon = <HomeIcon {...iconProps} />;
                break;
            case Icons.PROFILE:
                params.icon = <ProfileIcon {...iconProps} />;
                break;
            case Icons.BACK:
                params.icon = <BackIcon {...iconProps} />;
                break;
            case Icons.EDIT:
                params.icon = <EditIcon {...iconProps} />;
                break;
            case Icons.ARROW_RIGHT:
                params.icon = <ArrowRIcon {...iconProps} />;
                break;
            case Icons.DAY:
                params.icon = <DayIcon {...iconProps} />;
                break;
            case Icons.NIGHT:
                params.icon = <NightIcon {...iconProps} />;
                break;
            case Icons.AUTO:
                params.icon = <AutoIcon {...iconProps} />;
                break;
            case Icons.EYE:
                params.icon = <EyeIcon {...iconProps} />;
                break;
        }
        return params;
    }, [onClick, icon, iconProps]);

    if (isNotButton && buttonParams.icon) {
        return buttonParams.icon;
    }

    return (
        <Button
            {...buttonParams}
            className={rootClasses}
            aria-label={currentAriaLabel}
            aria-hidden={isAriaHidden}
        />
    );
};
