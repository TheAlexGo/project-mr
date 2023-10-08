import React, { type JSX } from 'react';

import { Core } from './components/Core';
import { Search } from './components/Search';
import { MenuTypes } from './types';
import { useStore } from '../../store/store';

import type { MenuCoreProps, ValidTags } from './types';

type MenuProps<T extends ValidTags> = MenuCoreProps<T> & {
    as?: T;
    type?: MenuTypes;
};

export const Menu = <T extends ValidTags>({
    as = 'div' as T,
    type = MenuTypes.DEFAULT,
    ...props
}: MenuProps<T>): JSX.Element | null => {
    const { isOpen } = useStore();

    if (!isOpen) {
        return null;
    }

    if (type === MenuTypes.SEARCH) {
        return <Search {...props} />;
    }
    return <Core as={as as ValidTags} {...props} />;
};
