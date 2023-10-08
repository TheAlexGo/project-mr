import React, { ChangeEventHandler } from 'react';

import { makeAutoObservable } from 'mobx';
import { observer } from 'mobx-react-lite';

import { Link } from '@components/Link/Link';
import { StoryCategories } from '@sb/types';

import { DropDownMenu } from './DropDownMenu';
import { MenuTypes } from './components/Menu/types';
import { Button, ButtonThemes } from '../Button/Button';
import { Input } from '../Input/Input';

import type { Meta, StoryFn, StoryObj } from '@storybook/react';

type Story = typeof DropDownMenu;

export default {
    title: 'UI / DropDownMenu',
    component: DropDownMenu,
    argTypes: {
        openMenuAfterFocus: {
            name: 'Показать окно после фокуса на кнопку?',
            table: {
                category: StoryCategories.MAIN
            }
        },
        closeByEscape: {
            name: 'Закрыть окно после нажатия на Escape?',
            table: {
                category: StoryCategories.MAIN
            }
        },
        closeMenuAfterBlur: {
            name: 'Скрыть окно, если фокус пропал с элементов, принадлежащих меню?',
            table: {
                category: StoryCategories.MAIN
            }
        },
        closeMenuAfterSelect: {
            name: 'Закрыть окно после выбора элемента?',
            table: {
                category: StoryCategories.MAIN
            }
        },
        focusToActiveElementAfterOpen: {
            name: 'Установить фокус на активный элемент после открытия меню?',
            table: {
                category: StoryCategories.MAIN
            }
        },
        focusToButtonAfterClose: {
            name: 'Сфокусироваться на кнопке после закрытия окна?',
            table: {
                category: StoryCategories.MAIN
            }
        },
        focusToButtonAfterSelect: {
            name: 'Сфокусироваться на кнопке после выбора элемента?',
            table: {
                category: StoryCategories.MAIN
            }
        }
    },
    args: {
        openMenuAfterFocus: false,
        closeByEscape: true,
        closeMenuAfterBlur: false,
        closeMenuAfterSelect: true,
        focusToActiveElementAfterOpen: true,
        focusToButtonAfterClose: true,
        focusToButtonAfterSelect: false
    }
} as Meta<Story>;

export const Component: StoryFn<Story> = ({ ...args }) => (
    <DropDownMenu {...args}>
        <DropDownMenu.Button>Я выпадашка</DropDownMenu.Button>
        <DropDownMenu.Menu>
            <DropDownMenu.Item isSelected={false}>Я элемент выпадашки 1</DropDownMenu.Item>
            <DropDownMenu.Item isSelected={false}>Я элемент выпадашки 2</DropDownMenu.Item>
            <DropDownMenu.Item isSelected={false}>Я элемент выпадашки 3</DropDownMenu.Item>
        </DropDownMenu.Menu>
    </DropDownMenu>
);

export const PolymorphicComponents: StoryFn<Story> = ({ ...args }) => (
    <DropDownMenu {...args}>
        <DropDownMenu.Button as={Button} theme={ButtonThemes.PRIMARY}>
            Я выпадашка
        </DropDownMenu.Button>
        <DropDownMenu.Menu as="div">
            <DropDownMenu.Item as={Button} theme={ButtonThemes.SECONDARY} isSelected={false}>
                Я кнопочка с theme = secondary
            </DropDownMenu.Item>
            <DropDownMenu.Item as={Button} isSelected={false}>
                Я пустая кнопочка
            </DropDownMenu.Item>
            <DropDownMenu.Item as={Link} to="#123" isSelected={false}>
                Я ссылочка
            </DropDownMenu.Item>
        </DropDownMenu.Menu>
    </DropDownMenu>
);

class SearchStore {
    items = [
        {
            id: 1,
            title: 'Котики'
        },
        {
            id: 2,
            title: 'Собачки'
        },
        {
            id: 3,
            title: 'Коровки'
        },
        {
            id: 4,
            title: 'Птички'
        },
        {
            id: 5,
            title: 'Рыбки'
        },
        {
            id: 6,
            title: 'Обезьянки'
        },
        {
            id: 7,
            title: 'Машинки'
        },
        {
            id: 8,
            title: 'Домики'
        }
    ];

    query = '';

    constructor() {
        makeAutoObservable(this);
    }

    setQuery = (query: string) => {
        this.query = query;
    };

    get searchResult() {
        return this.items.filter((item) => item.title.includes(this.query));
    }
}

const searchStore = new SearchStore();

const WithSearchComponent = observer(({ ...args }) => {
    const { searchResult, query, setQuery } = searchStore;

    const changeHandler: ChangeEventHandler<HTMLInputElement> = (e) => {
        setQuery(e.target.value);
    };

    const clickHandler = (title: string) => setQuery(title);

    return (
        <DropDownMenu {...args}>
            <DropDownMenu.Button
                as={Input}
                onChange={changeHandler}
                value={query}
                placeholder="Введите текст"
                aria-expanded={undefined}
            />
            <DropDownMenu.Menu type={MenuTypes.SEARCH}>
                {searchResult.map((item) => (
                    <DropDownMenu.Item
                        key={item.id}
                        isSelected={false}
                        onClick={() => clickHandler(item.title)}
                    >
                        {item.title}
                    </DropDownMenu.Item>
                ))}
            </DropDownMenu.Menu>
        </DropDownMenu>
    );
});

export const WithSearch: StoryObj<Story> = {
    render: ({ ...args }) => <WithSearchComponent {...args} />,
    args: {
        openMenuAfterFocus: true,
        closeMenuAfterBlur: true,
        focusToButtonAfterClose: false,
        focusToButtonAfterSelect: true,
        closeByEscape: false,
        focusToActiveElementAfterOpen: false,
        closeMenuAfterSelect: false
    }
};
