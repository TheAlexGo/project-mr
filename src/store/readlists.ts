import { makeAutoObservable } from 'mobx';

import { Store } from './store';

export class ReadlistsStore {
    appStore: Store;

    constructor(store: Store) {
        this.appStore = store;

        makeAutoObservable(this);
    }
}
