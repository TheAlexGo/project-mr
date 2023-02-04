import path from 'path';

import legacy from '@vitejs/plugin-legacy';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import eslintPlugin from 'vite-plugin-eslint';
import { VitePWA } from 'vite-plugin-pwa';
import stylelintPlugin from 'vite-plugin-stylelint';
import svgrPlugin from 'vite-plugin-svgr';

const getStylesPath = (file: string) => path.resolve(__dirname, `./src/styles/${file}.styl`);

// https://vitejs.dev/config/
export default defineConfig({
    resolve: {
        alias: {
            '@components': path.resolve(__dirname, './src/components/ui'),
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
    plugins: [
        VitePWA({
            registerType: 'autoUpdate',
            devOptions: {
                enabled: true
            },
            includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'safari-pinned-tab.svg'],
            manifest: {
                name: 'Mangareader',
                short_name: 'MangaReader',
                description:
                    'Лучшее приложение для чтения манги во всём мире. Да что там в мире - в России!',
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
                    }
                ],
                background_color: '#ffffff',
                display: 'standalone'
            }
        }),
        legacy({
            targets: ['defaults', 'not IE 11']
        }),
        react({
            exclude: /\.stories\.tsx?$/,
            include: '**/*.tsx'
        }),
        svgrPlugin(),
        eslintPlugin(),
        stylelintPlugin({
            fix: true
        })
    ],
    css: {
        preprocessorOptions: {
            styl: {
                additionalData: `
                @require "${getStylesPath('mixins')}";
                @require "${getStylesPath('variables')}";
                `
            }
        }
    },
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
    }
});
