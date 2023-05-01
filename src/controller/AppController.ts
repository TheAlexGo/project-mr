import { createContext } from 'react';

import { toJS } from 'mobx';

import { ApiService } from '@services/ApiService';
import { LanguageService } from '@services/LanguageService';
import { ValidateService } from '@services/ValidateService';
import { store, Store } from '@store';
import { Pages, IPageState, IApiCallback, Lang, Themes } from '@types';
import { ResponseBuilder, responseBuilder } from '@utils/response';
import { getPageName } from '@utils/routing';

export class AppController {
    private readonly store: Store;
    apiService: ApiService;
    langService: LanguageService;
    validateService: ValidateService;
    responseBuilder: ResponseBuilder;

    constructor(appStore: Store, responseBuilder: ResponseBuilder) {
        this.store = appStore;
        this.responseBuilder = responseBuilder;
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

    callbackAfterNavigate = (newPage: string) => {
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

        this.debug('Перешли на страницу');
        this.store.setActivePage(page);
        const currentPage = getPageName(window.location.pathname);
        if (currentPage) {
            this.store.updateNavigate(currentPage, page);
        }
    };

    mountPage = (page: string) => {
        this.group('Страница:', page);
        this.debug('Страница монтирована');
    };

    unmountPage = () => {
        this.debug('Страница размонтирована');
        this.groupEnd();
    };

    loadPageState = () => {
        const { currentStatePage } = this.store;
        if (currentStatePage) {
            this.debug('Загрузили состояние:', toJS(currentStatePage));
            setTimeout(() => window.scrollTo(0, currentStatePage.positionY));
        } else {
            // setTimeout(() => window.scrollTo(0, 0));
        }
    };

    savePageState = (page: string) => {
        const { statePages } = this.store;
        const stateParams = window.history.state.usr;
        const newState: IPageState = {
            positionY: stateParams?.positionY,
            prevLink: stateParams?.prevLink
        };
        const isNewState = JSON.stringify(statePages.get(page)) !== JSON.stringify(newState);
        if (!isNewState) {
            this.debug(`Состояние для страницы "${page}" не изменилось`);
            return;
        }
        this.debug(`Сохранили состояние для страницы "${page}":`, newState);
        this.store.updateStatePages(newState, page);
    };

    saveHashState = (pageWithHash: string) => {
        const { statePages } = this.store;
        const stateParams = window.history.state.usr;
        const newState: IPageState = {
            positionY: stateParams?.positionY
        };
        const isNewState =
            JSON.stringify(statePages.get(pageWithHash)) !== JSON.stringify(newState);
        if (!isNewState) {
            this.debug(`Состояние для страницы с хешем "${pageWithHash}" не изменилось`);
            return;
        }
        this.debug(`Сохранили состояние для страницы с хешем "${pageWithHash}"`, newState);
        this.store.updateStatePages(newState, pageWithHash);
    };

    updateUsername = (username: string) => {
        this.store.setUser({ ...this.store.user, username });
    };

    loadMoreInCatalog = async (): Promise<boolean> =>
        responseBuilder.getCatalogItems().then(({ items, hasMore }) => {
            this.debug('Загрузка карточек каталога...');
            this.store.updateCatalogElements(items);
            return hasMore;
        });

    updateNavigate = (page: Pages, newLocation: string) => {
        this.store.updateNavigate(page, newLocation);
    };

    loadMangaPage = async (mangaId: number) => {
        const { activeManga } = this.store;
        if (activeManga?.id === mangaId) {
            return Promise.resolve();
        }
        this.store.setActiveManga(null);
        return responseBuilder
            .getManga(mangaId)
            .then((result) => this.store.setActiveManga(result));
    };
}

export const appController = new AppController(store, responseBuilder);
export const AppControllerContext = createContext<AppController>(appController);
