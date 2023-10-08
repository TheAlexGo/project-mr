import { createContext } from 'react';

import type { useDropDownStore } from './store';

export const Context = createContext({} as ReturnType<typeof useDropDownStore>);
