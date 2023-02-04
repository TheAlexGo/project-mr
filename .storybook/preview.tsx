import React from 'react';

import { BrowserRouter as Router } from 'react-router-dom';
import { Story } from "@storybook/react";

import '../src/styles/common.styl';

export const parameters = {
    actions: {
        argTypesRegex: "^on[A-Z].*"
    },
    controls: {
        matchers: {
            color: /(background|color)$/i,
            date: /Date$/,
        },
        expanded: true
    },
    backgrounds: {
        default: 'main',
        values: [
            { name: 'main', value: 'var(--color_background)' }
        ]
    }
};

export const decorators = [
    (Story: Story) => {
        return (
            <Router>
                <div style={{ position: 'relative' }}>
                    <Story />
                </div>
            </Router>
        );
    },
];
