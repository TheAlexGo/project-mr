import React, { useMemo, FC } from 'react';

import {
    useLocation,
    Link as RRDLink,
    NavLink,
    NavLinkProps,
    LinkProps,
    To
} from 'react-router-dom';

interface ILink extends NavLinkProps {
    to: To;
}

/*
TODO: При попытке добавить сюда useController - падает ошибка Cannot access 'store' before initialization в Storybook
 */
export const Link: FC<ILink> = ({ to, className, style, ...props }) => {
    const { pathname, hash } = useLocation();

    const state = useMemo(
        () => ({
            prevLink: pathname + hash
        }),
        [hash, pathname]
    );

    if (typeof className === 'function' || typeof style === 'function') {
        return <NavLink {...(props as NavLinkProps)} className={className} to={to} state={state} />;
    }

    return <RRDLink {...(props as LinkProps)} className={className} to={to} state={state} />;
};
