import './wdyr';

import React from 'react';

import ReactDOM from 'react-dom/client';

import { App } from './components/App';

import '@styles/common.styl';

if (process.env.NODE_ENV !== 'production') {
    import('@axe-core/react').then((axe) => {
        setTimeout(() => {
            axe.default(React, ReactDOM, 1000);
        }, 1000);
        ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(<App />);
    });
} else {
    ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(<App />);
}
