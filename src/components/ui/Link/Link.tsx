import React, { useCallback, MouseEvent, FC } from 'react';

import {
    useNavigate,
    useLocation,
    Link as RRDLink,
    NavLink,
    NavLinkProps,
    LinkProps,
    To
} from 'react-router-dom';

import { IPageState } from '@types';

interface ILink extends NavLinkProps {
    to: To;
}

/*
TODO: При попытке добавить сюда useController - падает ошибка Cannot access 'store' before initialization в Storybook
 */
export const Link: FC<ILink> = ({ to, className, style, onClick, ...props }) => {
    const { pathname, hash } = useLocation();
    const navigate = useNavigate();

    const clickHandler = useCallback(
        (e: MouseEvent<HTMLAnchorElement>) => {
            e.preventDefault();
            navigate(to, {
                state: {
                    positionY: window.scrollY,
                    prevLink: pathname + hash
                } as IPageState
            });
            onClick?.(e);
        },
        [hash, navigate, onClick, pathname, to]
    );

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
