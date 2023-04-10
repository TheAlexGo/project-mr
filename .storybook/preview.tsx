import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Story } from "@storybook/react";

import { Modals } from '@components/Modals/Modals';
import { useStore } from '@hooks/useStore';
import { useController } from '@hooks/useController';
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
        const { lang } = useStore();
        const { initResource } = useController();
        initResource(lang);

        return (
            <Router>
                <div style={{ position: 'relative', height: '100%' }}>
                    <div id="modal"></div>
                    <Story />
                    <Modals />
                </div>
            </Router>
        );
    },
];
