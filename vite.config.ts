import legacy from '@vitejs/plugin-legacy';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';
import eslintPlugin from 'vite-plugin-eslint';
import stylelintPlugin from 'vite-plugin-stylelint';
import svgrPlugin from 'vite-plugin-svgr';

const getStylesPath = (file: string) => path.resolve(
    __dirname,
    `./src/styles/${file}.styl`
);

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
            '@icons': path.resolve(__dirname, './src/assets/icons'),
            '@hooks': path.resolve(__dirname, './src/hooks'),
            '@styles': path.resolve(__dirname, './src/styles'),
            'bem-cn-custom': path.resolve(__dirname, './src/utils/bemCnCustom')
        }
    },
    plugins: [
        legacy({
            targets: [
                'defaults',
                'not IE 11'
            ]
        }),
        react({
            exclude: /\.stories\.(t|j)sx?$/,
            include: '**/*.tsx'
        }),
        svgrPlugin({}),
        eslintPlugin(),
        stylelintPlugin({
            fix: true
        })
    ],
    css: {
        preprocessorOptions: {
            styl: {
                additionalData: `
                @require "${getStylesPath("mixins")}";
                @require "${getStylesPath("variables")}";
                `,
            }
        }
    }
})
