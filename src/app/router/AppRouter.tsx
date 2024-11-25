import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { ProtectedRoute } from './ProtectedRoute';

import { RootBoundary } from '~/app/router/RootBoundary';
import { consultationsPageUi } from '~/pages/consultations';
import { createPageUi } from '~/pages/create';
import { inspectionPageUi } from '~/pages/inspection';
import { loginPageUi } from '~/pages/login';
import { notFoundPageUi } from '~/pages/notFound';
import { patientPageUi } from '~/pages/patient';
import { patientsPageUi } from '~/pages/patients';
import { profilePageUi } from '~/pages/profile';
import { registerPageUi } from '~/pages/register';
import { reportsPageUi } from '~/pages/reports';
import { welcomePageUi } from '~/pages/welcome';
import { sharedConfigRouter } from '~/shared/config';

const { ConsultationsPage } = consultationsPageUi;
const { CreatePage } = createPageUi;
const { LoginPage } = loginPageUi;
const { NotFoundPage } = notFoundPageUi;
const { PatientsPage } = patientsPageUi;
const { PatientPage } = patientPageUi;
const { ProfilePage } = profilePageUi;
const { RegisterPage } = registerPageUi;
const { ReportsPage } = reportsPageUi;
const { InspectionPage } = inspectionPageUi;
const { WelcomePage } = welcomePageUi;
const { RouteName } = sharedConfigRouter;

export const AppRouter = () => {
    return (
        <BrowserRouter
            future={{
                v7_startTransition: true,
                v7_relativeSplatPath: true,
            }}
        >
            <Routes>
                <Route
                    path={RouteName.LOGIN_PAGE}
                    element={<LoginPage />}
                    errorElement={<RootBoundary />}
                />
                <Route
                    path={RouteName.REGISTRATION_PAGE}
                    element={<RegisterPage />}
                    errorElement={<RootBoundary />}
                />
                <Route
                    path={RouteName.WELCOME_PAGE}
                    element={<WelcomePage />}
                    errorElement={<RootBoundary />}
                />

                <Route element={<ProtectedRoute />}>
                    <Route
                        path={RouteName.PROFILE_PAGE}
                        element={<ProfilePage />}
                        errorElement={<RootBoundary />}
                    />
                    <Route
                        path={RouteName.PATIENTS_PAGE}
                        element={<PatientsPage />}
                        errorElement={<RootBoundary />}
                    />
                    <Route
                        path={RouteName.CONSULTATIONS_PAGE}
                        element={<ConsultationsPage />}
                        errorElement={<RootBoundary />}
                    />
                    <Route
                        path={RouteName.PATIENT_PAGE}
                        element={<PatientPage />}
                        errorElement={<RootBoundary />}
                    />
                    <Route
                        path={RouteName.CREATE_PAGE}
                        element={<CreatePage />}
                        errorElement={<RootBoundary />}
                    />
                    <Route
                        path={RouteName.INSPECTION_PAGE}
                        element={<InspectionPage />}
                        errorElement={<RootBoundary />}
                    />
                    <Route
                        path={RouteName.REPORTS_PAGE}
                        element={<ReportsPage />}
                        errorElement={<RootBoundary />}
                    />
                </Route>

                <Route
                    path={RouteName.NOT_FOUND_PAGE}
                    element={<NotFoundPage />}
                    errorElement={<RootBoundary />}
                />
            </Routes>
        </BrowserRouter>
    );
};
