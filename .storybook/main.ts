import { mergeConfig } from 'vite';

import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
    stories: ['../src/components/ui/**/*.stories.@(ts|tsx)'],

    addons: [
        '@storybook/addon-links',
        '@storybook/addon-essentials',
        '@storybook/addon-interactions',
        '@storybook/addon-a11y'
    ],

    typescript: {
        check: false,
        reactDocgen: 'react-docgen-typescript'
    },

    framework: {
        name: '@storybook/react-vite',
        options: {}
    },

    core: {},

    features: {
        storyStoreV7: true
    },

    async viteFinal(config) {
        return mergeConfig(config, {
            build: {
                chunkSizeWarningLimit: 750
            }
        });
    },

    docs: {
        autodocs: true
    }
};

export default config;
