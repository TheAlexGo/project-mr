import type { ElementType } from 'react';

import type { OverwritableType } from '../../../DynamicTag/DynamicTag';

interface IMenu {
    className?: string;
}

export type ValidTags = ElementType;

export type MenuCoreProps<T extends ValidTags> = OverwritableType<IMenu, T>;

export enum MenuTypes {
    DEFAULT = 'default',
    SEARCH = 'search'
}
