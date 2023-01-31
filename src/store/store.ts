import { makeAutoObservable } from 'mobx';

import { IHeaderButton, Lang } from '@types';

export class Store {
    lang = Lang.RUSSIAN;
    readonly defaultLang = Lang.RUSSIAN;
    locale: Record<string, string> = {};
    headerButtons: IHeaderButton[] = [];

    constructor() {
        makeAutoObservable(this);
    }

    setLang = (lang: Lang) => {
        this.lang = lang;
    };

    setLocale(locale: Record<string, string>) {
        this.locale = locale;
    }
}
