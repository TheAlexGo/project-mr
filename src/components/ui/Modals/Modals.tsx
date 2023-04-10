import React, { FC, memo, useCallback } from 'react';

import { useLocation, useNavigate } from 'react-router-dom';

import { DeleteAccount } from '@components/Modals/components/DeleteAccount/DeleteAccount';
import { ModalLinks } from '@types';

const ModalsComponent: FC = (): JSX.Element | null => {
    const { hash } = useLocation();
    const navigate = useNavigate();

    const cancelHandler = useCallback(() => {
        navigate('#');
    }, [navigate]);

    switch (hash as ModalLinks) {
        case ModalLinks.DELETE_ACCOUNT:
            return <DeleteAccount onCancel={cancelHandler} />;
        default:
            return null;
    }
};

export const Modals = memo(ModalsComponent);
