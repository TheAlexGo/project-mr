import React from 'react';

import { responseBuilderContext } from '@utils/response';

export function useResponse() {
    return React.useContext(responseBuilderContext);
}
