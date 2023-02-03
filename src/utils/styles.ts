import { Directions, Positions } from '@types';

export const getSizesClass = (classes: Record<string, string>, size?: string) => ({
    [classes[`__size-s${size}`]]: !!size
});

export const getPositionsAndDirectionsClass = (
    classes: Record<string, string>,
    contentPosition: Positions,
    contentDirection: Directions
) => ({
    [classes[`__content_position-${contentPosition}`]]: !!contentPosition,
    [classes[`__content_direction-${contentDirection}`]]: !!contentDirection
});
