import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { loginPageUi } from '~/pages/loginPage';
import { profilePageUi } from '~/pages/profile';
import { registerPageUi } from '~/pages/register';
import { sharedConfigRouter } from '~/shared/config';
const { LoginPage } = loginPageUi;
const { ProfilePage } = profilePageUi;
const { RegisterPage } = registerPageUi;

const { RouteName } = sharedConfigRouter;

const routes: sharedConfigRouter.RouteDescription[] = [
    {
        path: RouteName.LOGIN_PAGE,
        component: LoginPage,
    },
    {
        path: RouteName.REGISTRATION_PAGE,
        component: RegisterPage,
    },
    {
        path: RouteName.PROFILE_PAGE,
        component: ProfilePage,
    },
];

const routesContent = routes.map(({ path, component: Component }) => (
    <Route key={path} path={path} element={<Component />} />
));

export const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>{routesContent}</Routes>
        </BrowserRouter>
    );
};
