import React, { useEffect, useMemo, FC, KeyboardEvent, useCallback, useRef, useState } from 'react';

import cn from 'classnames';
import { useLocation, useNavigate } from 'react-router-dom';

import { Content } from '@components/Tabs/components/Content/Content';
import { ITab, Tab } from '@components/Tabs/components/Tab/Tab';
import { ARROW_LEFT, ARROW_RIGHT } from '@utils/constants';

import classes from './Tabs.module.styl';

interface ITabs {
    /** Название группы вкладок */
    title: string;
    /** Элементы группы вкладок */
    elements: ITab[];
    /** Зафиксировать шапку при прокручивании? */
    withFixHeader?: boolean;
    /** Класс-обёртка для контейнера с табами */
    tabsClassName?: string;
    /** Указываем сразу активный таб (если таковой есть) */
    activeTab?: ITab | null;
}

export const Tabs: FC<ITabs> = ({
    title,
    elements,
    tabsClassName,
    withFixHeader = false,
    activeTab = null
}): JSX.Element => {
    const [selectedTab, setSelectedTab] = useState<string>(activeTab?.id || elements[0].id);
    const [focusedTab, setFocusedTab] = useState<number>(
        activeTab ? elements.indexOf(activeTab) : 0
    );
    const navigate = useNavigate();
    const { hash, state } = useLocation();
    const container = useRef<HTMLDivElement>(null);
    const tabElements = useRef<HTMLButtonElement[]>([]);

    const rootClasses = useMemo(
        () =>
            cn(classes['container'], {
                [classes['__with-fix_header']]: withFixHeader
            }),
        [withFixHeader]
    );

    const tabsClasses = useMemo(() => cn(classes['tabs'], tabsClassName), [tabsClassName]);

    const currentTab: ITab | null = useMemo(
        () => elements.find((tab) => tab.id === selectedTab) || null,
        [elements, selectedTab]
    );

    const updateActiveTab = useCallback(
        (activeTab: string) => {
            setSelectedTab(activeTab);
            setFocusedTab(tabElements.current.findIndex((tab) => tab.id === activeTab));
            navigate(
                {
                    hash: activeTab
                },
                {
                    state: {
                        ...state,
                        positionY: window.scrollY
                    }
                }
            );
        },
        [navigate, state]
    );

    const renderTabs = useCallback(
        () =>
            elements.map((tab, i) => {
                const refCallback = (tabEl: HTMLButtonElement) => {
                    tabElements.current[i] = tabEl;
                };

                return (
                    <Tab
                        key={tab.id}
                        {...tab}
                        isActive={tab.id === selectedTab}
                        isFocus={i === focusedTab}
                        onClick={updateActiveTab}
                        ref={refCallback}
                    />
                );
            }),
        [updateActiveTab, elements, focusedTab, selectedTab]
    );

    const renderContent = useCallback(() => {
        if (!currentTab) {
            return null;
        }
        return (
            <Content
                key={currentTab.content.id}
                id={currentTab.content.id}
                className={classes['content']}
                tabId={currentTab.id}
            >
                {currentTab.content.children}
            </Content>
        );
    }, [currentTab]);

    /**
     * Перемещение по табам с помощью стрелок
     */
    const keyDownHandler = useCallback(
        (e: KeyboardEvent) => {
            if (e.key === ARROW_RIGHT || e.key === ARROW_LEFT) {
                const { current } = tabElements;
                let newValue = focusedTab;
                if (e.key === ARROW_RIGHT) {
                    newValue += 1;
                    if (newValue >= current.length) {
                        newValue = 0;
                    }
                } else if (e.key === ARROW_LEFT) {
                    newValue -= 1;
                    if (newValue < 0) {
                        newValue = current.length - 1;
                    }
                }
                current[newValue]?.focus();
                setFocusedTab(newValue);
            }
        },
        [focusedTab, tabElements]
    );

    useEffect(() => {
        if (hash.endsWith(selectedTab)) {
            return;
        }
        updateActiveTab(selectedTab);
    }, [hash, selectedTab, updateActiveTab]);

    return (
        <div className={rootClasses}>
            <div
                role="tablist"
                className={tabsClasses}
                aria-label={title}
                onKeyDown={keyDownHandler}
                tabIndex={0}
                ref={container}
            >
                {renderTabs()}
            </div>
            {renderContent()}
        </div>
    );
};
