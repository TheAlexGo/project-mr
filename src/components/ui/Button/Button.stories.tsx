import React from 'react';

import { StoryObj, Meta } from '@storybook/react';

import { StarIcon, TrashIcon, VkIcon } from '@icons';
import { StoryCategories } from '@sb/types';
import { Directions, Justifies, Positions, SQUARE_ELEMENT_SIZES } from '@types';
import { getButtonWithArrowProps } from '@utils/buttons';

import { Button, ButtonStates, ButtonThemes, ButtonTypes } from './Button';

type Story = typeof Button;

const ICONS = {
    Star: StarIcon,
    Trash: TrashIcon,
    VK: VkIcon
};

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
        isExternalLink: {
            name: 'Осуществлять переход на другую страницу?',
            table: {
                category: StoryCategories.OTHER
            }
        },
        theme: {
            name: 'Тема',
            control: 'select',
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
            name: 'Расположение содержимого (отн. кнопки)',
            table: {
                category: StoryCategories.STYLE
            }
        },
        contentJustify: {
            name: 'Расположение содержимого (отн. друг друга)',
            table: {
                category: StoryCategories.STYLE
            }
        },
        contentDirection: {
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
            options: ['none', ...SQUARE_ELEMENT_SIZES],
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
        isDisabled: {
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
                    none: 'Не выбрано',
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
        iconClassName: {
            table: {
                disable: true
            }
        },
        onClick: {
            table: {
                disable: true
            }
        },
        className: {
            table: {
                disable: true
            }
        },
        ref: {
            table: {
                disable: true
            }
        }
    },
    args: {
        children: 'Button',
        type: ButtonTypes.BUTTON,
        theme: ButtonThemes.PRIMARY,
        state: ButtonStates.DEFAULT,
        size: undefined,
        contentDirection: Directions.ROW,
        contentJustify: Justifies.CENTER,
        contentPosition: Positions.CENTER,
        isWide: false,
        isRounded: false,
        isLoading: false,
        isDisabled: false,
        isExternalLink: false,
        withLeftIcon: false,
        withRightIcon: false,
        withNoPadding: false
    }
} as Meta<Story>;

export const Primary: StoryObj<Story> = {
    args: {
        theme: ButtonThemes.PRIMARY
    }
};

export const Secondary: StoryObj<Story> = {
    args: {
        theme: ButtonThemes.SECONDARY
    }
};

export const SecondaryWithArrow: StoryObj<Story> = {
    args: {
        ...getButtonWithArrowProps()
    }
};

export const Tag: StoryObj<Story> = {
    args: {
        theme: ButtonThemes.TAG
    }
};

export const Trash: StoryObj<Story> = {
    args: {
        children: null,
        withNoPadding: true,
        size: '24',
        icon: <TrashIcon />
    }
};

export const Social: StoryObj<Story> = {
    args: {
        children: null,
        withNoPadding: true,
        isRounded: true,
        size: '44',
        icon: <VkIcon />
    }
};
