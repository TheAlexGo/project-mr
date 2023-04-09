import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Story } from "@storybook/react";

import '../src/styles/common.styl';
import { useStore } from '../src/hooks/useStore';
import { useController } from '../src/hooks/useController';

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
        const { lang } = useStore();
        const { initResource } = useController();
        initResource(lang);

        return (
            <Router>
                <div style={{ position: 'relative', height: '100%' }}>
                    <Story />
                </div>
            </Router>
        );
    },
];
