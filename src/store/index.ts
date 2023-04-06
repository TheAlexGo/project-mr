import { createContext } from 'react';

import { makeAutoObservable } from 'mobx';

import { Icons, IIcon } from '@components/Icon/Icon';
import { INavbarItem } from '@components/Navbar/components/NavbarItem/NavbarItem';
import { IPageState, Lang, NavTabs, Pages } from '@types';
import { getPageName } from '@utils/routing';

export class Store {
    /**
     * Готово ли приложение к работе
     */
    isAppReady = false;
    lang = Lang.RUSSIAN;
    readonly defaultLang = Lang.RUSSIAN;
    locale: Record<string, string> = {};
    activePage: string;
    headerTitle = '';
    headerButtons: IIcon[] = [];
    headerWithBack = false;
    statePages: Map<string, IPageState> = new Map<string, IPageState>();
    lastPositionY = 0;

    constructor() {
        makeAutoObservable(this);

        const currentPage = getPageName(window.location.pathname);
        if (currentPage) {
            const [, page] = currentPage;
            this.activePage = page;
        } else {
            this.activePage = Pages.GENERAL;
        }
    }

    setIsAppReady = (isAppReady: boolean) => {
        this.isAppReady = isAppReady;
    };

    setLang = (lang: Lang) => {
        this.lang = lang;
    };

    setLastPositionY = (lastPositionY: number) => {
        this.lastPositionY = lastPositionY;
    };

    setLocale(locale: Record<string, string>) {
        this.locale = locale;
    }

    setActivePage(page: string) {
        this.activePage = page;
    }

    setHeaderTitle(headerTitle: string) {
        this.headerTitle = headerTitle;
    }

    setHeaderButtons(headerButtons: IIcon[]) {
        this.headerButtons = headerButtons;
    }

    setHeaderWithBack(headerWithBack: boolean) {
        this.headerWithBack = headerWithBack;
    }

    updateStatePages(statePage: IPageState) {
        this.statePages.set(this.activePage, statePage);
    }

    get navigate(): INavbarItem[] {
        return [
            {
                id: NavTabs.GENERAL,
                icon: Icons.HOME,
                title: this.locale['nav-general'],
                link: Pages.GENERAL
            },
            {
                id: NavTabs.LIBRARY,
                icon: Icons.LIBRARY,
                title: this.locale['nav-library'],
                link: Pages.LIBRARY
            },
            {
                id: NavTabs.PROFILE,
                icon: Icons.PROFILE,
                title: this.locale['nav-profile'],
                link: Pages.PROFILE
            }
        ];
    }

    get currentStatePage(): IPageState | null {
        return this.statePages.get(this.activePage) || null;
    }
}

export const store = new Store();
export const StoreContext = createContext<Store>(store);
