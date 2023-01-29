import React from 'react';

import { StoreContext } from '@store';

export function useStore() {
    return React.useContext(StoreContext);
}
