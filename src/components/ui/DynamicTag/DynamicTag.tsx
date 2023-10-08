import React, { forwardRef } from 'react';
import type {
    PropsWithChildren,
    ElementType,
    ComponentPropsWithoutRef,
    ComponentPropsWithRef
} from 'react';

export type Prefer<P, T> = P & Omit<T, keyof P>;

export type ElementPropsWithoutRef<T extends ElementType> = Pick<
    ComponentPropsWithoutRef<T>,
    keyof ComponentPropsWithoutRef<T>
>;

export type OverwritableType<OwnProps, Type extends ElementType> = PropsWithChildren<
    Prefer<OwnProps, ElementPropsWithoutRef<Type>>
>;
interface Props<T extends ElementType> {
    as?: T;
}
export type OverwritableRef<C extends ElementType> = ComponentPropsWithRef<C>['ref'];

/**
 * Компонент, реализующий динамические теги. С его помощью можно получить любой реакт-тег, в том числе и компоненты,
 * со всеми принадлежащими ему пропсами.
 * @param as - представление будущего тега
 * @param children - его содержимое
 * @param rest - остальные пропсы
 * @constructor
 */
export const DynamicTag = forwardRef(
    <T extends ElementType = 'button'>(
        { as = 'button' as T, children, ...rest }: OverwritableType<Props<T>, T>,
        ref: OverwritableRef<T>
    ) => {
        const Tag: ElementType = as!;
        return (
            <Tag {...rest} ref={ref}>
                {children}
            </Tag>
        );
    }
);

DynamicTag.displayName = 'DynamicTag';
