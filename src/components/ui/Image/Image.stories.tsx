import React from 'react';

import { StoryObj, Meta } from '@storybook/react';

import { StoryCategories } from '@sb/types';
import { getCoverMock, getCoversMock } from '@utils/mockData';

import { Image } from './Image';

type Story = typeof Image;

export default {
    title: 'UI / Image',
    component: Image,
    argTypes: {
        src: {
            name: 'Путь до картинки',
            control: 'select',
            options: ['Не выбрано', ...getCoversMock()],
            table: {
                category: StoryCategories.MAIN
            }
        },
        alt: {
            name: 'Альтернативное представление картинки',
            table: {
                category: StoryCategories.MAIN
            }
        },
        loading: {
            name: 'Устанока типа загрузки картинки',
            table: {
                category: StoryCategories.MAIN
            }
        },
        withBorderRadius: {
            name: 'Закруглить углы?',
            table: {
                category: StoryCategories.STYLE
            }
        },
        isLazy: {
            name: 'Включить ленивую загрузку?',
            table: {
                category: StoryCategories.MAIN
            }
        },
        className: {
            table: {
                disable: true
            }
        },
        imageClassName: {
            table: {
                disable: true
            }
        }
    },
    args: {
        src: getCoverMock(),
        loading: 'lazy',
        alt: 'Я - картинка',
        withBorderRadius: true,
        isLazy: true
    }
} as Meta<Story>;

export const Component: StoryObj<Story> = {
    render: ({ src, ...args }) => (
        <div style={{ width: 240, height: 320 }}>
            <Image key={src} {...args} src={src} />
        </div>
    )
};
