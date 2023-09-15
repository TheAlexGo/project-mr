import React, { FC, MutableRefObject } from 'react';

import { Button } from '@components/Button/Button';
import { ISubItemMainProps } from '@components/ContextMenu/types';
import { Icon } from '@components/Icon/Icon';
import { Justifies } from '@types';

import { ISubMenuItem } from '../../types';

import classes from './SubMenuItem.module.styl';

interface ISubMenuItemProps {
    additionalProps: ISubItemMainProps;
    initialProps: ISubMenuItem;
}

export const SubMenuItem: FC<ISubMenuItemProps> = ({
    additionalProps,
    initialProps
}): JSX.Element => {
    const { core } = additionalProps;

    return (
        <Button
            {...core}
            className={classes['sub-menu-item']}
            contentJustify={Justifies.START}
            role="menuitem"
            isWide
            ref={core.ref as MutableRefObject<HTMLButtonElement>}
        >
            <Icon
                className={classes['icon']}
                icon={initialProps.icon}
                ariaLabel={null}
                isNotButton
            />
            {initialProps.title}
        </Button>
    );
};
