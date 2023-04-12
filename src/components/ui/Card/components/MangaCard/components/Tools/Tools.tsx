import React, { FC, useCallback, useMemo } from 'react';

import { Icon, Icons } from '@components/Icon/Icon';
import { useCards } from '@hooks/useCards';
import { useStore } from '@hooks/useStore';
import { IMangaCard, TMangaFnCallback } from '@types';

import classes from './Tools.module.styl';

export interface ITools extends IMangaCard {
    onDelete?: TMangaFnCallback;
}

export const Tools: FC<ITools> = ({ onDelete, ...manga }): JSX.Element | null => {
    const { locale } = useStore();
    const { isDeleting } = useCards();

    const deleteHandler = useCallback(() => {
        onDelete?.(manga);
    }, [onDelete, manga]);

    const ariaLabel = useMemo(() => locale['delete-aria-label'], [locale]);

    if (!isDeleting) {
        return null;
    }

    return (
        <div className={classes.tools}>
            <Icon
                className={classes.icon}
                icon={Icons.CLOSE}
                onClick={deleteHandler}
                ariaLabel={ariaLabel}
            />
        </div>
    );
};
