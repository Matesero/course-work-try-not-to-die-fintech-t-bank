import * as Sentry from '@sentry/react';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';

import { medicalSystemApi } from '~/shared/api';
import { userSlice, useAppDispatch } from '~/shared/store';

const { getProfile, logout } = medicalSystemApi.user;
const userSelectors = userSlice.selectors;

type Props = {
    redirectPath?: string;
};

export const ProtectedRoute = ({ redirectPath = '/login' }: Props) => {
    const isAuth = useSelector(userSelectors.isAuth);
    const navigate = useNavigate();
    const appDispatch = useAppDispatch();

    useEffect(() => {
        const fetchProfile = async () => {
            if (isAuth) {
                try {
                    await appDispatch(getProfile());
                } catch (error) {
                    appDispatch(logout());
                    Sentry.captureException(error);
                }
            }
        };

        fetchProfile();
    }, [isAuth, appDispatch]);

    useEffect(() => {
        if (!isAuth) {
            navigate(redirectPath);
        }
    }, [isAuth, navigate, redirectPath]);

    if (!isAuth) {
        return null;
    }

    return <Outlet />;
};
