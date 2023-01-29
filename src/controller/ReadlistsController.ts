import { createContext } from 'react';

import { readlists as Readlists, ReadlistsStore } from '@store';

export class ReadlistsController {
    store: ReadlistsStore;

    constructor(readlistStore: ReadlistsStore) {
        this.store = readlistStore;
    }
}

export const readlistsController = new ReadlistsController(Readlists);
export const ReadlistsControllerContext = createContext(readlistsController);
