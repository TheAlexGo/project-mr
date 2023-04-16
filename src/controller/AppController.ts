import { createContext } from 'react';

import { getMangaCardsMock } from '@mock';
import { ApiService } from '@services/ApiService';
import { LanguageService } from '@services/LanguageService';
import { ValidateService } from '@services/ValidateService';
import { store, Store } from '@store';
import { IApiCallback, Lang, Themes } from '@types';

export class AppController {
    store: Store;
    apiService: ApiService;
    langService: LanguageService;
    validateService: ValidateService;

    constructor(appStore: Store) {
        this.store = appStore;
        this.apiService = new ApiService(this.apiCallback);
        this.langService = new LanguageService();
        this.validateService = new ValidateService();
    }

    logger(message: unknown, ...optionalParams: unknown[]) {
        // eslint-disable-next-line prefer-rest-params,no-console
        console.log(message, ...optionalParams);
    }

    group = (...label: unknown[]) => {
        // eslint-disable-next-line no-console
        console.group(...label);
    };

    groupEnd = () => {
        // eslint-disable-next-line no-console
        console.groupEnd();
    };

    debug = (message: unknown, ...optionalParams: unknown[]) => {
        if (import.meta.env.DEV) {
            this.logger(message, ...optionalParams);
        }
    };

    initApi = async () => {
        this.debug('Начинается инициализация приложения...');
        if (this.store.isAppReady) {
            this.debug('Приложение уже инициализированно!');
            return false;
        }
        return this.apiService
            .initApi()
            .then((result) => {
                this.initResource(this.store.lang);
                return result;
            })
            .then(() => this.loadMoreInCatalog()) // заполняем данными каталог
            .then<boolean>((result) => {
                this.debug('Приложение инициализированно успешно!');
                this.store.setIsAppReady(result);
                return result;
            });
    };

    apiCallback: IApiCallback = (method, result, data) => {
        this.debug(method, result, data);
    };

    /**
     * Устанавливает язык ресурса
     */
    switchLang = (lang: Lang) => {
        this.initResource(lang);
        this.store.setLang(lang);
        this.debug('Установлен язык:', lang);
    };

    /**
     * Устанавливает новую тему
     * @param {Themes} theme - выбранная тема
     */
    changeTheme = (theme: Themes) => {
        this.store.setTheme(theme);
    };

    /**
     * Устанавливает текстовый ресурс
     */
    initResource = (lang: Lang) => {
        if (this.store.lang === lang && Object.keys(this.store.locale).length) {
            this.debug(`Ресурс ${lang} уже загружен!`);
            return;
        }
        const { debug } = this;
        const resource = this.langService.loadResource(lang);

        const currentResourceObj = new Proxy(resource, {
            get(target: Record<string | symbol, string>, name) {
                const isMobx =
                    (typeof name === 'symbol' && name.description) ||
                    (typeof name === 'string' && name.includes('isMobX'));
                if (isMobx) {
                    return name;
                }
                const currentKey = name.toString();
                const value = target[currentKey];
                if (currentKey && !value) {
                    debug(`Для ключа ${currentKey} нет локализации!`);
                    return currentKey;
                }
                return value;
            }
        });

        this.store.setLocale(currentResourceObj);
        this.validateService.setLocale(currentResourceObj);
        this.debug(`Ресурс ${lang} загружен:`, currentResourceObj);
    };

    navigate = (newPage: string) => {
        if (this.store.activePage === newPage) {
            window.scrollTo(0, 0);
        }
    };

    changePage = (page: string) => {
        const { activePage } = this.store;
        if (page === activePage) {
            this.debug('Уже на странице:', page);
            return;
        }

        this.groupEnd();
        this.group('Страница:', page);
        this.debug('Перешли на страницу');
        this.store.setActivePage(page);
    };

    loadPageState = () => {
        const { activePage, currentStatePage } = this.store;
        if (currentStatePage) {
            this.debug('Загрузили состояние:', activePage);
            setTimeout(() => window.scrollTo(0, currentStatePage.positionY));
        } else {
            setTimeout(() => window.scrollTo(0, 0));
        }
    };

    savePageState = () => {
        const { activePage, statePages } = this.store;
        const newState = {
            positionY: window.scrollY
        };
        const isNewState = JSON.stringify(statePages.get(activePage)) !== JSON.stringify(newState);
        if (!isNewState) {
            this.debug('Состояние не изменилось');
            this.groupEnd();
            return;
        }
        // TODO: Пофиксить при открытии модальных окон ломается группа логов
        this.debug('Сохранили состояние');
        this.groupEnd();
        this.store.updateStatePages(newState);
    };

    updateUsername = (username: string) => {
        this.store.setUser({ ...this.store.user, username });
    };

    loadMoreInCatalog = async (): Promise<boolean> => {
        const { catalogElements } = this.store;
        if (catalogElements.length > 100) {
            return Promise.reject(new Error('Больше нет элементов'));
        }

        this.debug('Загрузка карточек каталога...');
        this.store.updateCatalogElements(getMangaCardsMock(30));
        return Promise.resolve(true);
    };

    updateNavigate = (location: string, newLocation: string) => {
        this.store.updateNavigate(location, newLocation);
    };
}

export const appController = new AppController(store);
export const AppControllerContext = createContext<AppController>(appController);
