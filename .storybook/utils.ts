import { ArgTypes } from '@storybook/react';

export const hideStoryItems = (...items: string[]) =>
    items.reduce((acc, nextItem) => {
        acc[nextItem] = {
            table: {
                disable: true
            }
        };
        return acc;
    }, {} as ArgTypes);
