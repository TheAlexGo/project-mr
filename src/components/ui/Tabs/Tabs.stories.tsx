import React, { forwardRef } from 'react';

import { makeAutoObservable } from 'mobx';
import { observer } from 'mobx-react-lite';

import { Button, IButton } from '@components/Button/Button';
import { Icon, Icons } from '@components/Icon/Icon';

import { Tabs } from './Tabs';
import { DropDownMenu } from '../DropDownMenu/DropDownMenu';

import type { Meta, StoryFn } from '@storybook/react';

type Story = typeof Tabs;

export default {
    title: 'UI / Tabs',
    component: Tabs,
    argTypes: {},
    args: {}
} as Meta<Story>;

export const Component: StoryFn<Story> = () => (
    <>
        <Tabs>
            <Tabs.Item isSelected>Я табик 1</Tabs.Item>
            <Tabs.Item isSelected={false}>Я табик 2</Tabs.Item>
            <Tabs.Item isSelected={false}>Я табик 3</Tabs.Item>
        </Tabs>
        <div role="tabpanel" aria-describedby="asd">
            <button>Тест</button>
        </div>
    </>
);

class Store {
    items = [
        {
            id: '1',
            title: 'First',
            isSelected: false,
            children: [
                {
                    id: '1',
                    title: 'First',
                    isSelected: false
                },
                {
                    id: '2',
                    title: 'Second',
                    isSelected: false
                }
            ]
        },
        {
            id: '2',
            title: 'Second',
            isSelected: false,
            children: [
                {
                    id: '1',
                    title: 'First',
                    isSelected: false
                },
                {
                    id: '2',
                    title: 'Second',
                    isSelected: false
                },
                {
                    id: '3',
                    title: 'Third',
                    isSelected: false
                }
            ]
        }
    ];

    subjectList = [
        {
            id: 'all',
            title: 'Все',
            isSelected: true
        },
        {
            id: 'kul',
            title: 'Кулинария',
            isSelected: false
        },
        {
            id: 'ryb',
            title: 'Рыбалка',
            isSelected: false
        },
        {
            id: 'auto',
            title: 'Авто',
            isSelected: false
        }
    ];

    get selectedSubject() {
        return this.subjectList.find((subject) => subject.isSelected)!;
    }

    sectionList = [
        {
            id: 'all',
            title: 'Все',
            isSelected: true
        },
        {
            id: '1',
            title: 'Котики',
            isSelected: false
        },
        {
            id: '2',
            title: 'Собачки',
            isSelected: false
        },
        {
            id: '3',
            title: 'Девочки',
            isSelected: false
        }
    ];

    get selectedSection() {
        return this.sectionList.find((section) => section.isSelected)!;
    }

    publicationTypeList = [
        {
            id: 'all',
            title: 'Все',
            isSelected: true
        },
        {
            id: '1',
            title: 'С фото',
            isSelected: false
        },
        {
            id: '2',
            title: 'С видео',
            isSelected: false
        },
        {
            id: '3',
            title: 'С текстом',
            isSelected: false
        }
    ];

    get selectedPublicationType() {
        return this.publicationTypeList.find((publicationType) => publicationType.isSelected)!;
    }

    get filters() {
        const allFilters = [];
        if (this.selectedSection.id === '1') {
            allFilters.push({
                id: 'subject',
                title: 'Тематика',
                selectItemTitle: this.selectedSubject.title,
                children: this.subjectList,
                isSelected: this.selectedSubject.id !== 'all'
            });
        }

        allFilters.push(
            {
                id: 'section',
                title: 'Раздел',
                selectItemTitle: this.selectedSection.title,
                children: this.sectionList,
                isSelected: this.selectedSection.id !== 'all'
            },
            {
                id: 'type-publications',
                title: 'Тип публикации',
                selectItemTitle: this.selectedPublicationType.title,
                children: this.publicationTypeList,
                isSelected: this.selectedPublicationType.id !== 'all'
            }
        );

        return allFilters;
    }

    constructor() {
        makeAutoObservable(this);
    }

    selectItem = (parentId: string, id: string) => {
        this.filters.forEach((item) => {
            if (item.id === parentId) {
                item.children.forEach((subItem) => {
                    // eslint-disable-next-line no-param-reassign
                    subItem.isSelected = subItem.id === id;
                });
            }
        });
    };
}

const store = new Store();

const TabsItem = forwardRef<HTMLButtonElement, IButton>(({ ...props }, ref) => (
    <DropDownMenu.Button as={Button} {...props} ref={ref} />
));

TabsItem.displayName = 'Story.TabsItem';

const DDM = observer(() => {
    const { filters, selectItem } = store;

    return (
        <Tabs>
            {filters.map((item) => (
                <DropDownMenu key={item.id}>
                    <div>
                        <span>{item.title}</span>
                        <Tabs.Item as={TabsItem} id={item.id} isSelected={item.isSelected}>
                            {item.selectItemTitle}
                            <Icon icon={Icons.ARROW_RIGHT} isNotButton ariaLabel={null} />
                        </Tabs.Item>
                    </div>
                    <DropDownMenu.Menu>
                        {item.children.map((subitem) => (
                            <DropDownMenu.Item
                                key={subitem.id}
                                as={Button}
                                isSelected={subitem.isSelected}
                                onClick={() => selectItem(item.id, subitem.id)}
                            >
                                <span>{subitem.title}</span>
                                {subitem.isSelected && (
                                    <Icon icon={Icons.CHECK} isNotButton ariaLabel={null} />
                                )}
                            </DropDownMenu.Item>
                        ))}
                    </DropDownMenu.Menu>
                </DropDownMenu>
            ))}
        </Tabs>
    );
});

/**
 * Более сложный компонент: объединяет в себе как навигацию по табам, так и выпадающие окна
 */
export const HardComponent: StoryFn<Story> = () => <DDM />;
