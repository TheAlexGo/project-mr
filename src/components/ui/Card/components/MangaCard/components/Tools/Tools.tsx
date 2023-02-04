import React, { FC, useCallback } from 'react';

import { Icon, Icons } from '@components/Icon/Icon';
import { useCards } from '@hooks/useCards';
import { IMangaCard, TMangaFnCallback } from '@types';

import classes from './Tools.module.styl';

export interface ITools extends IMangaCard {
    onDelete?: TMangaFnCallback;
}

export const Tools: FC<ITools> = ({ onDelete, ...manga }): JSX.Element | null => {
    const { isDeleting } = useCards();

    const deleteHandler = useCallback(() => {
        if (onDelete) {
            onDelete(manga);
        }
    }, [onDelete, manga]);

    if (!isDeleting) {
        return null;
    }

    return (
        <div className={classes.tools}>
            <Icon className={classes.icon} icon={Icons.CLOSE} onClick={deleteHandler} />
        </div>
    );
};
