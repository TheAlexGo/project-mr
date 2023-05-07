import React from 'react';

import { ComponentMeta, ComponentStory } from '@storybook/react';

import { StoryCategories } from '@sb/types';

import { GaugeBar } from './GaugeBar';

type Story = typeof GaugeBar;

export default {
    title: 'UI / GaugeBar',
    component: GaugeBar,
    argTypes: {
        value: {
            name: 'Текущий прогресс',
            table: {
                category: StoryCategories.MAIN
            }
        }
    },
    args: {
        value: 70
    }
} as ComponentMeta<Story>;

export const Component: ComponentStory<Story> = (args) => <GaugeBar {...args} />;
