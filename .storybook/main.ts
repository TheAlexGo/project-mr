import { InlineConfig, mergeConfig, UserConfig } from 'vite';
import svgrPlugin from 'vite-plugin-svgr';
import type { StorybookViteConfig } from '@storybook/builder-vite';
import viteConfig from '../vite.config';

const config: StorybookViteConfig = {
    stories: [
        "../src/components/ui/**/*.stories.@(ts|tsx)"
    ],
    addons: [
        "@storybook/addon-links",
        "@storybook/addon-essentials",
        "@storybook/addon-interactions"
    ],
    typescript: {
        check: false,
        checkOptions: {},
        reactDocgen: 'react-docgen-typescript'
    },
    framework: "@storybook/react",
    core: {
        "builder": "@storybook/builder-vite"
    },
    features: {
        "storyStoreV7": true
    },
    async viteFinal(config: InlineConfig) {
        const vtConf = <UserConfig>(await viteConfig);
        return mergeConfig(config, {
            ...vtConf,
            plugins: [
                svgrPlugin()
            ],
            build: {
                chunkSizeWarningLimit: 750
            }
        });
    },
}

export default config;
