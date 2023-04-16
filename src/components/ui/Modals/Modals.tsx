import React, { FC, memo, useCallback } from 'react';

import { useLocation, useNavigate } from 'react-router-dom';

import { DeleteAccount } from '@components/Modals/components/DeleteAccount/DeleteAccount';
import { ModalLinks } from '@types';

interface IModals {
    container?: HTMLElement | null;
}

const ModalsComponent: FC<IModals> = ({ container }): JSX.Element | null => {
    const { hash } = useLocation();
    const navigate = useNavigate();

    const cancelHandler = useCallback(() => {
        navigate('#', {
            replace: true
        });
    }, [navigate]);

    switch (hash as ModalLinks) {
        case ModalLinks.DELETE_ACCOUNT:
            return <DeleteAccount onCancel={cancelHandler} container={container} />;
        default:
            return null;
    }
};

export const Modals = memo(ModalsComponent);
