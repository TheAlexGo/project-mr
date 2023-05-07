import React, { useState, useEffect, FC } from 'react';

import { Loading } from '@components/Loading/Loading';
import { ITabContent } from '@components/Tabs/components/Tab/Tab';

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
        <Loading condition={isLoaded}>
            <div id={id} className={className} role="tabpanel" tabIndex={0} aria-labelledby={tabId}>
                {children}
            </div>
        </Loading>
    );
};
