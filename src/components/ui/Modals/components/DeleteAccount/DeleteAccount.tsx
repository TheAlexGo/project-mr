import React, { FC, useCallback } from 'react';

import { observer } from 'mobx-react-lite';

import { IModal, Modal } from '@components/Modal/Modal';
import { useController } from '@hooks/useController';
import { useStore } from '@hooks/useStore';

type IDeleteAccount = Pick<IModal, 'onCancel' | 'container'>;

export const DeleteAccount: FC<IDeleteAccount> = observer(
    ({ onCancel, container }): JSX.Element => {
        const { locale } = useStore();
        const { debug } = useController();

        const deleteClickHandler = useCallback(() => {
            debug('Удалили аккаунт');
        }, [debug]);

        return (
            <Modal
                id="modal-delete-account"
                heading={locale['modal-account-delete-heading']}
                description={locale['modal-account-delete-description']}
                actionText={locale['button-delete']}
                onCancel={onCancel}
                onAction={deleteClickHandler}
                container={container}
            />
        );
    }
);
