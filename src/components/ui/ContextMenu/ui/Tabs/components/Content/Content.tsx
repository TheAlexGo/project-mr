import React, { useState, useEffect, FC } from 'react';

import cn from 'classnames';

import { Loading } from '@components/Loading/Loading';
import { ITabContent } from '@components/TabsOld/components/Tab/Tab';

import classes from './Content.module.styl';

interface IContent extends ITabContent {
    tabId: string;
    className: string;
}

export const Content: FC<IContent> = ({ id, tabId, className, children }): JSX.Element | null => {
    const [isLoaded, setIsLoaded] = useState<boolean>(false);

    useEffect(() => {
        setIsLoaded(true);
    }, []);

    return (
        <div className={cn(classes['content'], className)}>
            <Loading condition={isLoaded}>
                <div id={id} role="tabpanel" tabIndex={0} aria-labelledby={tabId}>
                    {children}
                </div>
            </Loading>
        </div>
    );
};
