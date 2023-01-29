import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';


import { StarIcon, TrashIcon, VkIcon } from '@icons';
import { Positions } from '@types';

import { StoryCategories } from '@sb/types';

import { ButtonStates, ButtonThemes, ButtonTypes, BackgroundColors, Button } from './Button';

const ICONS = {
    Star: StarIcon,
    Trash: TrashIcon,
    VK: VkIcon
};

const ButtonSizes = ['24', '36', '40', '44', '52'];

export default {
    title: 'UI / Button',
    component: Button,
    argTypes: {
        children: {
            name: 'Содержимое кнопки',
            table: {
                category: StoryCategories.OTHER
            }
        },
        href: {
            name: 'Ссылка',
            table: {
                category: StoryCategories.OTHER
            }
        },
        isStrangeLink: {
            name: 'Осуществлять переход на другую страницу?',
            table: {
                category: StoryCategories.OTHER
            }
        },
        theme: {
            name: 'Тема',
            control: 'select',
            category: 'Style',
            table: {
                category: StoryCategories.STYLE
            }
        },
        type: {
            name: 'Тип',
            table: {
                category: StoryCategories.STYLE
            }
        },
        contentPosition: {
            name: 'Позиция содержимого',
            table: {
                category: StoryCategories.STYLE
            }
        },
        state: {
            name: 'Активное состояние',
            table: {
                category: StoryCategories.STYLE
            }
        },
        size: {
            name: 'Размер (делает кнопку квадратной)',
            options: ['none', ...ButtonSizes],
            mapping: {
                none: null
            },
            table: {
                category: StoryCategories.STYLE
            },
            control: {
                labels: {
                    none: 'default'
                }
            }
        },
        colorBackground: {
            name: 'Цвет фона',
            table: {
                category: StoryCategories.STYLE
            }
        },
        withNoPadding: {
            name: 'Убрать внутреннй отступ?',
            table: {
                category: StoryCategories.STYLE
            }
        },
        isWide: {
            name: 'Растянуть кнопку на всю ширину?',
            table: {
                category: StoryCategories.STYLE
            }
        },
        isRounded: {
            name: 'Закруглить кнопку?',
            table: {
                category: StoryCategories.STYLE
            }
        },
        disabled: {
            name: 'Сделать кнопку неактивной?',
            table: {
                category: StoryCategories.STYLE
            }
        },
        isLoading: {
            name: 'Идёт загрузка?',
            table: {
                category: StoryCategories.STYLE
            }
        },
        icon: {
            name: 'Иконка',
            table: {
                category: StoryCategories.ICON
            },
            options: ['none', ...Object.keys(ICONS)],
            mapping: {
                none: null,
                Star: <StarIcon />,
                Trash: <TrashIcon />,
                VK: <VkIcon />
            },
            control: {
                labels: {
                    none: 'No icon',
                    ...Object.keys(ICONS)
                }
            }
        },
        withLeftIcon: {
            name: 'Показать иконку слева',
            table: {
                category: StoryCategories.ICON
            }
        },
        withRightIcon: {
            name: 'Показать иконку справа',
            table: {
                category: StoryCategories.ICON
            }
        },
        onClick: {
            table: {
                disable: true
            }
        }
    },
    args: {
        children: 'Button',
        type: ButtonTypes.BUTTON,
        contentPosition: Positions.CENTER,
        state: ButtonStates.DEFAULT,
        colorBackground: BackgroundColors.DEFAULT,
        isWide: false,
        isRounded: false,
        isLoading: false,
        isStrangeLink: false,
        withLeftIcon: false,
        withRightIcon: false,
        withNoPadding: false,
        disabled: false
    }
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const Primary: ComponentStory<typeof Button> = Template.bind({});
Primary.args = {
    theme: ButtonThemes.PRIMARY
};

export const Trash: ComponentStory<typeof Button> = Template.bind({});
Trash.args = {
    children: null,
    withNoPadding: true,
    size: '24',
    icon: <TrashIcon />
};

export const Social: ComponentStory<typeof Button> = Template.bind({});
Social.args = {
    children: null,
    withNoPadding: true,
    isRounded: true,
    size: '44',
    icon: <VkIcon />
};
