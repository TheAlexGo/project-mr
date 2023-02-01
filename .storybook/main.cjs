const path = require('path');
const { loadConfigFromFile, mergeConfig } = require("vite");
const svgrPlugin = require('vite-plugin-svgr');

module.exports = {
    "stories": [
        "../src/components/ui/**/*.stories.@(ts|tsx)"
    ],
    "addons": [
        "@storybook/addon-links",
        "@storybook/addon-essentials",
        "@storybook/addon-interactions"
    ],
    "framework": "@storybook/react",
    "core": {
        "builder": "@storybook/builder-vite"
    },
    "features": {
        "storyStoreV7": true
    },
    async viteFinal(config, { configType }) {
        const { config: userConfig } = await loadConfigFromFile(
            path.resolve(__dirname, "../vite.config.ts")
        );

        return mergeConfig(config, {
            ...userConfig,
            plugins: [
                svgrPlugin({
                    svgrOptions: {
                        icon: true
                    }
                })
            ]
        });
    },
}