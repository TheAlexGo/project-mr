import React, { FC, MutableRefObject } from 'react';

import { Button } from '@components/Button/Button';
import { IItemExpandedMainProps } from '@components/ContextMenu/types';
import { Icon } from '@components/Icon/Icon';

import { IMenuItemExpanded } from '../../types';

interface IItemExpanded {
    initialProps: IMenuItemExpanded;
    additionalProps: IItemExpandedMainProps;
}

export const ItemExpanded: FC<IItemExpanded> = ({ additionalProps, initialProps }): JSX.Element => {
    const { title, ariaLabelForSelected } = initialProps;
    const { core } = additionalProps;
    const { selectedSubMenuItemTitle, ...restCore } = core;

    const ariaLabel = selectedSubMenuItemTitle
        ? `${title} (${ariaLabelForSelected} ${selectedSubMenuItemTitle})`
        : title;

    return (
        <Button
            {...restCore}
            aria-label={ariaLabel}
            ref={restCore.ref as MutableRefObject<HTMLButtonElement>}
        >
            <Icon icon={initialProps.icon} ariaLabel={null} isNotButton />
        </Button>
    );
};
