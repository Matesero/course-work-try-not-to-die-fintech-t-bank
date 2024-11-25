import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { Layout } from '~/app/layout';
import { medicalSystemApi } from '~/shared/api';
import { userSlice, useAppDispatch } from '~/shared/store';

const { getProfile } = medicalSystemApi.user;

export const NotFoundPage = () => {
    const isAuth = useSelector(userSlice.selectors.isAuth);
    const appDispatch = useAppDispatch();

    useEffect(() => {
        if (isAuth) {
            appDispatch(getProfile());
        }
    }, [isAuth, appDispatch]);

    return (
        <Layout>
            <div className="flex justify-center items-center h-full">
                <div className="text-center">
                    <h1 className="text-6xl font-bold text-red-600">404</h1>
                    <p className="text-2xl mt-4">Страница не найдена</p>
                </div>
            </div>
        </Layout>
    );
};
