import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { consultationsPageUi } from '~/pages/consultations';
import { createPageUi } from '~/pages/create';
import { inspectionPageUi } from '~/pages/inspection';
import { loginPageUi } from '~/pages/login';
import { patientPageUi } from '~/pages/patient';
import { patientsPageUi } from '~/pages/patients';
import { profilePageUi } from '~/pages/profile';
import { registerPageUi } from '~/pages/register';
import { reportsPageUi } from '~/pages/reports';
import { sharedConfigRouter } from '~/shared/config';

const { ConsultationsPage } = consultationsPageUi;
const { CreatePage } = createPageUi;
const { LoginPage } = loginPageUi;
const { PatientsPage } = patientsPageUi;
const { PatientPage } = patientPageUi;
const { ProfilePage } = profilePageUi;
const { RegisterPage } = registerPageUi;
const { ReportsPage } = reportsPageUi;
const { InspectionPage } = inspectionPageUi;
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
    {
        path: RouteName.PATIENTS_PAGE,
        component: PatientsPage,
    },
    {
        path: RouteName.CONSULTATIONS_PAGE,
        component: ConsultationsPage,
    },
    {
        path: RouteName.PATIENT_PAGE,
        component: PatientPage,
    },
    {
        path: RouteName.CREATE_PAGE,
        component: CreatePage,
    },
    {
        path: RouteName.INSPECTION_PAGE,
        component: InspectionPage,
    },
    {
        path: RouteName.REPORTS_PAGE,
        component: ReportsPage,
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
