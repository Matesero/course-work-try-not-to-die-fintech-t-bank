import { ComponentType, PropsWithChildren } from 'react';

export const RouteName = {
    WELCOME_PAGE: '/',
    LOGIN_PAGE: '/login',
    REGISTRATION_PAGE: '/registration',
    PROFILE_PAGE: '/profile',
    PATIENTS_PAGE: '/patients',
    PATIENT_PAGE: '/patient/:id',
    CONSULTATIONS_PAGE: '/consultations',
    REPORTS_PAGE: '/reports',
    CREATE_PAGE: '/inspection/create/:id',
    INSPECTION_PAGE: '/inspection/:id',
    NOT_FOUND_PAGE: '*',
};

export type RouteDescription = {
    path: string;
    component: ComponentType;
    layout?: ComponentType<PropsWithChildren>;
};
