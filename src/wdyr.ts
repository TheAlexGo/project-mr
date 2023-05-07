import * as React from 'react';

if (import.meta.env.DEV && parseInt(import.meta.env.VITE_WHY_DID_YOU_RENDER_ENABLED, 10)) {
    const { default: whyDidYouRender } = await import('@welldone-software/why-did-you-render');
    whyDidYouRender(React, {
        trackAllPureComponents: true
    });
}
