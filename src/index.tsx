import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import App from './app/App';

import { makeStore } from '~/shared/store/store';

const rootElement = document.getElementById('root');

if (!rootElement) {
    throw new Error('rootElement is null');
}

const store = makeStore();

const root = ReactDOM.createRoot(rootElement);
root.render(
    <Provider store={store}>
        <App />
    </Provider>,
);
