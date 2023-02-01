import React, { useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import { useController } from '../src/hooks/useController';
import { useStore } from '../src/hooks/useStore';

import '../src/styles/themes.styl';

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
    (Story) => {
        const { initResource } = useController();
        const { lang } = useStore();

        useEffect(() => {
            initResource(lang);
        }, [initResource, lang]);


        return (
            <Router>
                <div style={{ position: 'relative' }}>
                    <Story />
                </div>
            </Router>
        );
    },
];
