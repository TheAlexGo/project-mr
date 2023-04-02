import { createContext } from 'react';

import { makeAutoObservable } from 'mobx';

import { Icons } from '@components/Icon/Icon';
import { INavbarItem } from '@components/Navbar/components/NavbarItem/NavbarItem';
import { Lang, NavTabs, Pages } from '@types';

export class Store {
    /**
     * Готово ли приложение к работе
     */
    isAppReady = false;
    lang = Lang.RUSSIAN;
    readonly defaultLang = Lang.RUSSIAN;
    locale: Record<string, string> = {};
    activePage: Pages = Pages.GENERAL;

    constructor() {
        makeAutoObservable(this);
    }

    setIsAppReady = (isAppReady: boolean) => {
        this.isAppReady = isAppReady;
    };

    setLang = (lang: Lang) => {
        this.lang = lang;
    };

    setLocale(locale: Record<string, string>) {
        this.locale = locale;
    }

    setActivePage(page: Pages) {
        this.activePage = page;
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
}

export const store = new Store();
export const StoreContext = createContext<Store>(store);
