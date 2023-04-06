import React, { FC, useCallback } from 'react';

import { Link as RRDLink, LinkProps } from 'react-router-dom';

import { useController } from '@hooks/useController';
import { Pages } from '@types';

interface ILink extends LinkProps {
    to: string;
}

export const Link: FC<ILink> = ({ to, ...props }) => {
    const { navigate } = useController();

    const clickHandler = useCallback(() => {
        navigate(to as Pages);
    }, [navigate, to]);

    return <RRDLink {...props} to={to} onClick={clickHandler} />;
};
