import React, { FC } from 'react';

import { Link as RRDLink, NavLink, NavLinkProps, LinkProps } from 'react-router-dom';

interface ILink extends NavLinkProps {
    to: string;
}

/*
TODO: При попытке добавить сюда useController - падает ошибка Cannot access 'store' before initialization в Storybook
 */
export const Link: FC<ILink> = ({ to, className, style, ...props }) => {
    if (typeof className === 'function' || typeof style === 'function') {
        return <NavLink {...(props as NavLinkProps)} className={className} to={to} />;
    }

    return <RRDLink {...(props as LinkProps)} className={className} to={to} />;
};
