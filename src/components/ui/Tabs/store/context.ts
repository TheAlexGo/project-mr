import { createContext } from 'react';

import type { useTabsStore } from './store';

export const Context = createContext({} as ReturnType<typeof useTabsStore>);
