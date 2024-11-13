import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { sharedConfigRouter } from '~/shared/config';

const routes: sharedConfigRouter.RouteDescription[] = [
];

const routesContent = routes.map(({path, component: Component }) => (
    <Route key={path} path={path} element={<Component />} />
));

export const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                {routesContent}
            </Routes>
        </BrowserRouter>
    );
};