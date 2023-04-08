import React, { FC, useCallback } from 'react';

import cn from 'classnames';
import { observer } from 'mobx-react-lite';

import { Button } from '@components/Button/Button';
import { Heading, HeadingTypes } from '@components/Heading/Heading';
import { Icon, Icons } from '@components/Icon/Icon';
import { useController } from '@hooks/useController';
import { useStore } from '@hooks/useStore';
import { Directions, Justifies, Positions, Themes } from '@types';

import classes from './Theme.module.styl';

export const Theme: FC = observer((): JSX.Element => {
    const { locale, activeTheme, availableThemes } = useStore();
    const { changeTheme } = useController();

    const buttonClasses = useCallback(
        (theme: Themes) =>
            cn(classes['button'], {
                [classes['__is-active']]: theme === activeTheme
            }),
        [activeTheme]
    );

    const renderIcon = useCallback(
        (icon: Icons) => (
            <Icon icon={icon} className={classes['icon']} ariaLabel={null} isNotButton />
        ),
        []
    );

    const clickHandler = useCallback((theme: Themes) => () => changeTheme(theme), [changeTheme]);

    const renderThemeButtons = useCallback(
        () =>
            availableThemes.map((theme) => (
                <Button
                    key={theme.theme}
                    className={buttonClasses(theme.theme)}
                    icon={renderIcon(theme.icon)}
                    withLeftIcon
                    contentDirection={Directions.COLUMN}
                    contentJustify={Justifies.SPACE_BETWEEN}
                    contentPosition={Positions.START}
                    onClick={clickHandler(theme.theme)}
                >
                    <span>{locale[theme.text]}</span>
                </Button>
            )),
        [availableThemes, buttonClasses, clickHandler, locale, renderIcon]
    );

    return (
        <div>
            <Heading type={HeadingTypes.H3} className={classes['heading']}>
                {locale['profile-themes']}
            </Heading>
            <div className={classes['buttons']}>{renderThemeButtons()}</div>
        </div>
    );
});
