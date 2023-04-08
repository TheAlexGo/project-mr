import { createContext } from 'react';

import { IIcon } from '@components/Icon/Icon';
import { ApiService } from '@services/ApiService';
import { LanguageService } from '@services/LanguageService';
import { ValidateService } from '@services/ValidateService';
import { store, Store } from '@store';
import { IApiCallback, Lang, Pages, Themes } from '@types';

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

    initApi = async () => {
        this.logger('Начинается инициализация приложения...');
        if (this.store.isAppReady) {
            this.logger('Приложение уже инициализированно!');
            return false;
        }
        return this.apiService
            .initApi()
            .then((result) => {
                this.initResource(this.store.lang);
                return result;
            })
            .then<boolean>((result) => {
                this.logger('Приложение инициализированно успешно!');
                this.store.setIsAppReady(result);
                return result;
            });
    };

    apiCallback: IApiCallback = (method, result, data) => {
        this.logger(method, result, data);
    };

    /**
     * Устанавливает язык ресурса
     */
    switchLang = (lang: Lang) => {
        this.initResource(lang);
        this.store.setLang(lang);
        this.logger('Установлен язык:', lang);
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
            this.logger(`Ресурс ${lang} уже загружен!`);
            return;
        }
        const { logger } = this;
        const resource = this.langService.loadResource(lang);

        const currentResourceObj = new Proxy(resource, {
            get(target: Record<string, string>, name) {
                const currentKey = name.toString();
                const value = target[currentKey];
                if (!value) {
                    logger(`Для ключа ${currentKey} нет локализации!`);
                    return currentKey;
                }
                return value;
            }
        });

        this.store.setLocale(currentResourceObj);
        this.validateService.setLocale(currentResourceObj);
        this.logger(`Ресурс ${lang} загружен:`, currentResourceObj);
    };

    navigate = (newPage: string) => {
        if (this.store.activePage === newPage) {
            window.scrollTo(0, 0);
        }
    };

    changePage = (page: string) => {
        const { activePage } = this.store;
        if (page === activePage) {
            this.logger('Уже на странице:', page);
            return;
        }
        this.logger('Перешли на страницу:', page);
        this.store.setActivePage(page);
    };

    loadPage = (page: Pages, headerButtons: IIcon[], withHeading = false, withBack = false) => {
        const { currentStatePage, activePage, isPageLoaded } = this.store;
        if (isPageLoaded) {
            this.logger('Страница уже загружена:', activePage);
            return;
        }
        this.logger('Загрузили страницу:', activePage);
        if (currentStatePage) {
            setTimeout(() => window.scrollTo(0, currentStatePage.positionY));
        }
        if (withHeading) {
            this.store.setHeaderTitle(
                this.store.locale[`page-${activePage.toLowerCase()}-heading`]
            );
        } else {
            this.store.setHeaderTitle('');
        }
        this.store.setHeaderButtons(headerButtons);
        this.store.setHeaderWithBack(withBack);
        this.store.setIsPageLoaded(true);
    };

    leavePage = () => {
        const { isPageLoaded, activePage } = this.store;
        if (!isPageLoaded) {
            this.logger('Страницу уже покинули:', activePage);
            return;
        }
        this.logger('Покинули страницу:', activePage);
        const state = {
            positionY: window.scrollY
        };
        this.store.updateStatePages(state);
        this.store.setIsPageLoaded(false);
    };
}

export const appController = new AppController(store);
export const AppControllerContext = createContext<AppController>(appController);
