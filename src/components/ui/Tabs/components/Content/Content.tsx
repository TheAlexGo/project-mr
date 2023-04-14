import React, { useState, useLayoutEffect, useEffect, FC } from 'react';

import { useNavigate } from 'react-router-dom';

import { ITabContent } from '@components/Tabs/components/Tab/Tab';
import { useController } from '@hooks/useController';

interface IContent extends ITabContent {
    tabId: string;
    className: string;
}

export const Content: FC<IContent> = ({ id, tabId, className, children }): JSX.Element => {
    const [initContent, setInitContent] = useState<boolean>(false);
    const navigate = useNavigate();
    const { loadPageState, savePageState } = useController();

    useEffect(() => {
        navigate({
            hash: id
        });
        setInitContent(true);
    }, [id, navigate]);

    useEffect(() => {
        if (initContent) {
            loadPageState();
        }
    }, [initContent, loadPageState]);

    useLayoutEffect(() => savePageState, [savePageState]);

    return (
        <div id={id} className={className} role="tabpanel" tabIndex={0} aria-labelledby={tabId}>
            {children}
        </div>
    );
};
