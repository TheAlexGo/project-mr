import React, { FC, MutableRefObject, useMemo } from 'react';

import cn from 'classnames';

import { Button } from '@components/Button/Button';
import { IMenuItemMainProps } from '@components/ContextMenu/types';
import { ITab } from '@components/ContextMenu/ui/Tabs/types';

import classes from '@components/TabsOld/components/Tab/Tab.module.styl';

interface ITabProps {
    additionalProps: IMenuItemMainProps;
    initialProps: ITab;
}

export const Tab: FC<ITabProps> = ({ additionalProps, initialProps }): JSX.Element => {
    const { title, isSelected, content } = initialProps;
    const { core } = additionalProps;

    const rootClasses = useMemo(
        () =>
            cn(classes['tab'], {
                [classes['__is-active']]: isSelected
            }),
        [isSelected]
    );

    return (
        <Button
            {...core}
            role="tab"
            className={rootClasses}
            aria-selected={isSelected}
            aria-controls={content.id}
            ref={core.ref as MutableRefObject<HTMLButtonElement>}
        >
            {title}
        </Button>
    );
};
