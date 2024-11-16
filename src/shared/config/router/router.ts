import { ComponentType, PropsWithChildren } from 'react';

export enum RouteName {
    LOGIN_PAGE = '/login',
    REGISTRATION_PAGE = '/registration',
    PROFILE_PAGE = '/profile',
    PATIENTS_PAGE = '/patients',
    PATIENT_PAGE = '/patient/:patientId',
    CONSULTATIONS_PAGE = '/consultations',
    REPORTS_PAGE = '/reports',
}

export type RouteDescription = {
    path: RouteName;
    component: ComponentType;
    layout?: ComponentType<PropsWithChildren>;
};
