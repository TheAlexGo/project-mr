import { Directions, Positions, Justifies } from '@types';

export const getSizesClass = (classes: Record<string, string>, size?: string) => ({
    [classes[`__size-s${size}`]]: !!size
});

export const getPositionClass = (classes: Record<string, string>, contentPosition: Positions) => ({
    [classes[`__content_position-${contentPosition}`]]: !!contentPosition
});

export const getJustifyClass = (classes: Record<string, string>, contentJustify: Justifies) => ({
    [classes[`__content_justify-${contentJustify}`]]: !!contentJustify
});

export const getDirectionClass = (
    classes: Record<string, string>,
    contentDirection: Directions
) => ({
    [classes[`__content_direction-${contentDirection}`]]: !!contentDirection
});
