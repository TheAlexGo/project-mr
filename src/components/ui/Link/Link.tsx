import React, { FC, useCallback } from 'react';

import { Link as RRDLink, NavLink, NavLinkProps, LinkProps } from 'react-router-dom';

import { useController } from '@hooks/useController';
import { Pages } from '@types';

interface ILink extends NavLinkProps {
    to: string;
}

export const Link: FC<ILink> = ({ to, className, style, ...props }) => {
    const { navigate } = useController();

    const clickHandler = useCallback(() => {
        navigate(to as Pages);
    }, [navigate, to]);

    if (typeof className === 'function' || typeof style === 'function') {
        return (
            <NavLink
                {...(props as NavLinkProps)}
                className={className}
                to={to}
                onClick={clickHandler}
            />
        );
    }

    return (
        <RRDLink {...(props as LinkProps)} className={className} to={to} onClick={clickHandler} />
    );
};
