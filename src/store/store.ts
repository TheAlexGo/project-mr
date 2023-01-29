import { Lang } from '@types';
import { makeAutoObservable } from 'mobx';


export class Store {
    lang = Lang.RUSSIAN;
    readonly defaultLang = Lang.RUSSIAN;
    locale: Record<string, string> = {};

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
