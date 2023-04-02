import { createContext } from 'react';

import { ApiService } from '@services/ApiService';
import { LanguageService } from '@services/LanguageService';
import { ValidateService } from '@services/ValidateService';
import { store, Store } from '@store';
import { IApiCallback, Lang, Pages } from '@types';

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
        this.store.setLang(lang);
        this.logger('Установлен язык:', lang);
    };

    /**
     * Устанавливает текстовый ресурс
     */
    initResource = (lang: Lang) => {
        if (this.store.lang === lang && Object.keys(this.store.locale).length) {
            this.logger(`Ресурс ${lang} уже загружен!`);
            return;
        }
        const resource = this.langService.loadResource(lang);
        this.store.setLocale(resource);
        this.validateService.setLocale(resource);
        this.logger(`Ресурс ${lang} загружен:`, resource);
    };

    changePage = (page: Pages) => {
        this.logger('Перешли на страницу:', page);
        this.store.setActivePage(page);
    };
}

export const appController = new AppController(store);
export const AppControllerContext = createContext<AppController>(appController);
