import { createContext } from 'react';

import { store, Store } from '@store';
import { IApiCallback, Lang } from '@types';

import { ApiService } from '@services/ApiService';
import { LanguageService } from '@services/LanguageService';
import { ValidateService } from '@services/ValidateService';

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

    logger(...params: any[]) {
        // eslint-disable-next-line prefer-rest-params,no-console
        console.log(params);
    }

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
        const resource = this.langService.loadResource(lang);
        this.store.setLocale(resource);
        this.validateService.setLocale(resource);
        this.logger(`Ресурс ${lang} загружен:`, resource);
    };
}

export const appController = new AppController(store);
export const AppControllerContext = createContext(appController);
