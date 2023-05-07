import path from 'path';

import legacy from '@vitejs/plugin-legacy';
import react from '@vitejs/plugin-react';
import autoprefixer from 'autoprefixer';
import { defineConfig, loadEnv } from 'vite';
import { Plugin as importToCDN, autoComplete } from 'vite-plugin-cdn-import';
import eslintPlugin from 'vite-plugin-eslint';
import { createHtmlPlugin } from 'vite-plugin-html';
import { VitePWA } from 'vite-plugin-pwa';
import stylelintPlugin from 'vite-plugin-stylelint';
import svgrPlugin from 'vite-plugin-svgr';

const getStylesPath = (file: string) => path.resolve(__dirname, `./src/styles/${file}.styl`);

export const generalConfig = {
    resolve: {
        alias: {
            '@components': path.resolve(__dirname, './src/components/ui'),
            '@cards': path.resolve(__dirname, './src/components/ui/Card/components'),
            '@layouts': path.resolve(__dirname, './src/components/layouts'),
            '@pages': path.resolve(__dirname, './src/components/pages'),
            '@fonts': path.resolve(__dirname, './src/assets/fonts'),
            '@types': path.resolve(__dirname, './src/types'),
            '@store': path.resolve(__dirname, './src/store'),
            '@languages': path.resolve(__dirname, './src/languages'),
            '@services': path.resolve(__dirname, './src/services'),
            '@sb': path.resolve(__dirname, './.storybook'),
            '@hooks': path.resolve(__dirname, './src/hooks'),
            '@styles': path.resolve(__dirname, './src/styles'),
            '@utils': path.resolve(__dirname, './src/utils'),
            '@mock': path.resolve(__dirname, './src/utils/mockData'),
            '@icons': path.resolve(__dirname, './src/assets/icons'),
            '@images': path.resolve(__dirname, './src/assets/images'),
            'bem-cn-custom': path.resolve(__dirname, './src/utils/bemCnCustom')
        }
    },
    css: {
        postcss: {
            plugins: [autoprefixer({})]
        },
        preprocessorOptions: {
            styl: {
                additionalData: `
                @require "${getStylesPath('mixins')}";
                @require "${getStylesPath('variables')}";
                `
            }
        }
    }
};

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd());
    return {
        ...generalConfig,
        plugins: [
            createHtmlPlugin({
                minify: true,
                inject: {
                    data: {
                        title: env.VITE_APP_TITLE,
                        description: env.VITE_APP_DESCRIPTION
                    }
                }
            }),
            VitePWA({
                registerType: 'autoUpdate',
                devOptions: {
                    enabled: true
                },
                includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'safari-pinned-tab.svg'],
                manifest: {
                    name: env.VITE_APP_TITLE,
                    short_name: env.VITE_APP_SHORT_NAME,
                    description: env.VITE_APP_DESCRIPTION,
                    theme_color: '#ffffff',
                    icons: [
                        {
                            src: '/pwa-192x192.png',
                            sizes: '192x192',
                            type: 'image/png'
                        },
                        {
                            src: '/pwa-512x512.png',
                            sizes: '512x512',
                            type: 'image/png'
                        },
                        {
                            src: 'pwa-512x512.png',
                            sizes: '512x512',
                            type: 'image/png',
                            purpose: 'any maskable'
                        }
                    ],
                    background_color: '#ffffff',
                    display: 'standalone'
                }
            }),
            legacy(),
            react({
                exclude: /\.stories\.tsx?$/,
                include: '**/*.tsx',
                jsxImportSource: '@welldone-software/why-did-you-render'
            }),
            svgrPlugin(),
            eslintPlugin(),
            stylelintPlugin(),
            importToCDN({
                modules: [
                    autoComplete('axios'),
                    autoComplete('lodash'),
                    autoComplete('react'),
                    autoComplete('react-dom'),
                    {
                        name: 'react-router',
                        var: 'ReactRouter',
                        path: `dist/umd/react-router.production.min.js`
                    },
                    {
                        name: 'react-router-dom',
                        var: 'ReactRouterDom',
                        path: `dist/umd/react-router-dom.production.min.js`
                    },
                    {
                        name: 'mobx',
                        var: 'Mobx',
                        path: `dist/mobx.umd.production.min.js`
                    },
                    {
                        name: 'uuid-int',
                        var: 'UuidInt',
                        path: `index.min.js`
                    },
                    {
                        name: 'classnames',
                        var: 'Classnames',
                        path: `index.min.js`
                    },
                    {
                        name: 'mobx-react-lite',
                        var: 'MobxReactLite',
                        path: `dist/mobxreactlite.umd.production.min.js`
                    },
                    {
                        name: 'transliteration',
                        var: 'Transliteration',
                        path: `dist/browser/bundle.umd.min.js`
                    }
                ]
            })
        ],
        build: {
            rollupOptions: {
                output: {
                    manualChunks(id) {
                        /**
                         * Разбиваем используемые модули из node_modules на чанки, а не складируем в одном index-файле
                         * */
                        if (id.includes('node_modules')) {
                            return id.toString().split('node_modules/')[1].split('/')[0].toString();
                        }
                        return null;
                    }
                }
            }
        },
        server: {
            host: true
        }
    };
});
