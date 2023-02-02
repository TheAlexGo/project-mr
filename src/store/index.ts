import { createContext } from 'react';

import { CardsStore } from './card';
import { Store } from './store';

export const store = new Store();
export const cardsStore = new CardsStore();

export const StoreContext = createContext<Store>(store);
export const CardsContext = createContext<CardsStore>(cardsStore);

export { Store };
