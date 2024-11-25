import * as Sentry from '@sentry/react';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import App from './app/App';

import { makeStore } from '~/shared/store/store';

Sentry.init({
    dsn: 'https://ee8d963ccf418c02fdc672c3b0cab6ea@o4508332039077888.ingest.de.sentry.io/4508332041896016',
    integrations: [
        Sentry.browserTracingIntegration(),
        Sentry.replayIntegration(),
    ],
    tracesSampleRate: 1.0,
    tracePropagationTargets: ['localhost', /^https:\.io\/api/],
    replaysSessionSampleRate: 1.0,
    replaysOnErrorSampleRate: 1.0,
});

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
