import React, { useEffect } from 'react';

import { StoryFn } from '@storybook/react';
import { BrowserRouter as Router } from 'react-router-dom';

import { useController } from '@hooks/useController';
import { useStore } from '@hooks/useStore';
import '../src/styles/common.styl';

export const parameters = {
    actions: {
        argTypesRegex: '^on[A-Z].*'
    },
    controls: {
        matchers: {
            color: /(background|color)$/i,
            date: /Date$/
        },
        expanded: true
    },
    backgrounds: {
        default: 'main',
        values: [{ name: 'main', value: 'var(--color_background)' }]
    }
};

export const decorators = [
    (Story: StoryFn) => {
        const { lang } = useStore();
        const { initResource } = useController();

        useEffect(() => {
            initResource(lang);
        }, [initResource, lang]);

        return (
            <Router>
                <div style={{ position: 'relative', height: '100%', minHeight: 82 }}>
                    <Story />
                </div>
            </Router>
        );
    }
];
