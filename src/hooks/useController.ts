import React from 'react';

import { AppControllerContext } from '../controller';

export function useController() {
    return React.useContext(AppControllerContext);
}
