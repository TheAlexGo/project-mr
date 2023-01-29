import { createContext } from 'react';

import { CardsStore } from './cards';
import { Chapter } from './chapter';
import { ReadlistsStore } from './readlists';
import { Store } from './store';

export const store = new Store();
export const cards = new CardsStore();
export const readlists = new ReadlistsStore(store);

export const StoreContext = createContext<Store>(store);
export const ReadlistStoreContext = createContext<ReadlistsStore>(readlists);
export const CardsContext = createContext<CardsStore>(cards);

export { Store, ReadlistsStore, Chapter };
