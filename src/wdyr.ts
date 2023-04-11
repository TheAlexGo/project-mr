import * as React from 'react';

import whyDidYouRender from '@welldone-software/why-did-you-render';

if (import.meta.env.DEV && parseInt(import.meta.env.VITE_WHY_DID_YOU_RENDER_ENABLED, 10)) {
    whyDidYouRender(React, {
        trackAllPureComponents: true
    });
}
