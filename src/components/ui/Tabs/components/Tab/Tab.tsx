import React, { FC, Ref, forwardRef, ReactElement, useCallback, useMemo } from 'react';

import cn from 'classnames';

import { Button } from '@components/Button/Button';

import classes from './Tab.module.styl';

export interface ITabContent {
    id: string;
    children: ReactElement;
}

export interface ITab {
    id: string;
    title: string;
    content: ITabContent;
}

interface ITabProps extends ITab {
    isActive: boolean;
    isFocus: boolean;
    onClick: (currentTab: string) => void;
    ref: Ref<HTMLButtonElement>;
}

export const Tab: FC<ITabProps> = forwardRef(
    ({ id, title, content, isFocus, isActive, onClick }, ref): JSX.Element => {
        const tabIndex = useMemo(() => (isFocus || isActive ? 0 : -1), [isActive, isFocus]);

        const rootClasses = useMemo(
            () =>
                cn(classes['tab'], {
                    [classes['__is-active']]: isActive
                }),
            [isActive]
        );

        const clickHandler = useCallback(() => {
            onClick(id);
        }, [id, onClick]);

        return (
            <Button
                key={id}
                role="tab"
                id={id}
                className={rootClasses}
                aria-selected={isActive}
                aria-controls={content.id}
                tabIndex={tabIndex}
                onClick={clickHandler}
                ref={ref}
            >
                {title}
            </Button>
        );
    }
);

Tab.displayName = 'Tab';
