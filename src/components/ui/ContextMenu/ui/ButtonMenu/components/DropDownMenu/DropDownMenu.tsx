import React, { FC, ReactNode } from 'react';

import { IDropDownMenuMainProps } from '@components/ContextMenu/types';

import classes from './DropDownMenu.module.styl';

interface IDropDownMenu {
    additionalProps: IDropDownMenuMainProps;
    children: ReactNode;
}

export const DropDownMenu: FC<IDropDownMenu> = ({ additionalProps, children }): JSX.Element => {
    const { core } = additionalProps;
    return (
        <ul {...core} className={classes['dropdown']} role="menu">
            {children}
        </ul>
    );
};
