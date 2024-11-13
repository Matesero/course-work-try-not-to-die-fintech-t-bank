import { ComponentType, PropsWithChildren } from 'react';

export enum RouteName {
    LOGIN_PAGE = '/login',
    REGISTRATION_PAGE = '/registration',
    PROFILE_PAGE = '/profile',
    PATIENT_PAGE = '/patient/:patientId'
}

export type RouteDescription = {
    path: RouteName;
    component: ComponentType;
    layout?: ComponentType<PropsWithChildren>;
}