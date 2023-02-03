import React from 'react';

import { ComponentMeta, ComponentStory } from '@storybook/react';

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
        withBorderRadius: true
    }
} as ComponentMeta<Story>;

export const Component: ComponentStory<Story> = ({ src, ...args }) => (
    <div style={{ width: 240, height: 320 }}>
        <Image key={src} {...args} src={src} />
    </div>
);
