import { InlineConfig, mergeConfig } from 'vite';
import svgrPlugin from 'vite-plugin-svgr';

import { generalConfig } from '../vite.config';

import type { StorybookViteConfig } from '@storybook/builder-vite';

const config: StorybookViteConfig = {
    stories: ['../src/components/ui/**/*.stories.@(ts|tsx)'],
    addons: [
        '@storybook/addon-links',
        '@storybook/addon-essentials',
        '@storybook/addon-interactions'
    ],
    typescript: {
        check: false,
        checkOptions: {},
        reactDocgen: 'react-docgen-typescript'
    },
    framework: '@storybook/react',
    core: {
        builder: '@storybook/builder-vite'
    },
    features: {
        storyStoreV7: true
    },
    async viteFinal(config: InlineConfig) {
        return mergeConfig(config, {
            ...generalConfig,
            plugins: [svgrPlugin()],
            build: {
                chunkSizeWarningLimit: 750
            }
        }) as InlineConfig;
    }
};

export default config;
