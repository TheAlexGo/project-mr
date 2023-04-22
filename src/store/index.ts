import { createContext } from 'react';

import { makeAutoObservable } from 'mobx';

import { Icons } from '@components/Icon/Icon';
import { INavbarItem } from '@components/Navbar/components/NavbarItem/NavbarItem';
import { getUserMock } from '@mock';
import { makeLocalStorage } from '@store/autoSave';
import {
    IManga,
    IMangaCard,
    IPageState,
    IThemeButton,
    IUser,
    Lang,
    NavTabs,
    Pages,
    Themes,
    UserRoles
} from '@types';
import { getPageName } from '@utils/routing';

export class Store {
    /**
     * Готово ли приложение к работе
     */
    isAppReady = false;
    lang = Lang.RUSSIAN;
    activeTheme = Themes.AUTO;
    readonly defaultLang = Lang.RUSSIAN;
    readonly availableThemes: IThemeButton[] = [
        {
            theme: Themes.DARK,
            icon: Icons.NIGHT,
            text: 'profile-theme-dark'
        },
        {
            theme: Themes.LIGHT,
            icon: Icons.DAY,
            text: 'profile-theme-light'
        },
        {
            theme: Themes.AUTO,
            icon: Icons.AUTO,
            text: 'profile-theme-auto'
        }
    ];
    readonly defaultUser: IUser = {
        id: -1,
        role: UserRoles.GUEST,
        username: '',
        email: ''
    };
    locale: Record<string, string> = {};
    activePage: string;
    statePages: Map<string, IPageState> = new Map<string, IPageState>();
    navigateLinks: Map<string, string> = new Map<string, string>();

    user: IUser = this.defaultUser;

    catalogElements: IMangaCard[] = [];

    activeManga: IManga | null = null;

    constructor() {
        makeAutoObservable(this);

        // TODO: удалить после реализации регистрации
        this.user = getUserMock();

        const currentPage = getPageName(window.location.pathname);
        if (currentPage) {
            this.activePage = currentPage;
        } else {
            this.activePage = Pages.GENERAL;
        }

        this.navigateLinks.set(Pages.GENERAL, Pages.GENERAL);
        this.navigateLinks.set(Pages.LIBRARY, Pages.LIBRARY);
        this.navigateLinks.set(Pages.PROFILE, Pages.PROFILE);

        makeLocalStorage<Store, keyof Store>(this, 'store', ['lang', 'activeTheme', 'user']);
    }

    setIsAppReady = (isAppReady: boolean) => {
        this.isAppReady = isAppReady;
    };

    setLang = (lang: Lang) => {
        this.lang = lang;
    };

    setTheme(theme: Themes) {
        this.activeTheme = theme;
    }

    setLocale(locale: Record<string, string>) {
        this.locale = locale;
    }

    setActivePage(page: string) {
        this.activePage = page;
    }

    setUser(user: IUser) {
        this.user = user;
    }

    setActiveManga(value: IManga | null) {
        this.activeManga = value;
    }

    updateStatePages(statePage: IPageState) {
        this.statePages.set(this.activePage, statePage);
    }

    updateCatalogElements(elements: IMangaCard[]) {
        this.catalogElements.push(...elements);
    }

    updateNavigate(location: string, newLocation: string) {
        this.navigateLinks.set(location, newLocation);
    }

    get navigate(): INavbarItem[] {
        return [
            {
                id: NavTabs.GENERAL,
                icon: Icons.HOME,
                title: this.locale['nav-general'],
                link: this.navigateLinks.get(Pages.GENERAL) || Pages.GENERAL
            },
            {
                id: NavTabs.LIBRARY,
                icon: Icons.LIBRARY,
                title: this.locale['nav-library'],
                link: this.navigateLinks.get(Pages.LIBRARY) || Pages.LIBRARY
            },
            {
                id: NavTabs.PROFILE,
                icon: Icons.PROFILE,
                title: this.locale['nav-profile'],
                link: this.navigateLinks.get(Pages.PROFILE) || Pages.PROFILE
            }
        ];
    }

    get currentStatePage(): IPageState | null {
        return this.statePages.get(this.activePage) || null;
    }

    get username(): string {
        return this.user.username;
    }
}

export const store = new Store();
export const StoreContext = createContext<Store>(store);
