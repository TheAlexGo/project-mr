import { StoryObj, Meta } from '@storybook/react';

import { StoryCategories } from '@sb/types';

import { Icon, Icons } from './Icon';

type Story = typeof Icon;

export default {
    title: 'UI / Icon',
    component: Icon,
    argTypes: {
        icon: {
            name: 'Иконка',
            table: {
                category: StoryCategories.MAIN
            }
        },
        size: {
            name: 'Размер',
            table: {
                category: StoryCategories.MAIN
            }
        },
        isNotButton: {
            name: 'Не оборачивать иконку кнопкой?',
            table: {
                category: StoryCategories.MAIN
            }
        },
        ariaLabel: {
            name: 'Aria-label',
            table: {
                category: StoryCategories.OTHER
            }
        },
        className: {
            table: {
                disable: true
            }
        },
        onClick: {
            table: {
                disable: true
            }
        },
        wrapperClassName: {
            table: {
                disable: true
            }
        }
    },
    args: {
        icon: Icons.SEARCH,
        size: '24',
        isNotButton: false
    }
} as Meta<Story>;

export const Component: StoryObj<Story> = {};
