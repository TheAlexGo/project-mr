import React, { useEffect, FC, useLayoutEffect } from 'react';

import { useNavigate } from 'react-router-dom';

import { ITabContent } from '@components/Tabs/components/Tab/Tab';
import { useController } from '@hooks/useController';

interface IContent extends ITabContent {
    tabId: string;
    className: string;
}

export const Content: FC<IContent> = ({ id, tabId, className, children }): JSX.Element => {
    const navigate = useNavigate();
    const { savePageState } = useController();

    useEffect(() => {
        navigate({
            hash: id
        });
    }, [id, navigate]);

    /**
     * Явно сохраняем состояние таба, потому что из Page это отловить не получиться
     */
    useLayoutEffect(() => savePageState, [savePageState]);

    return (
        <div id={id} className={className} role="tabpanel" tabIndex={0} aria-labelledby={tabId}>
            {children}
        </div>
    );
};
