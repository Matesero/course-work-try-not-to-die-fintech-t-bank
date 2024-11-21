import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { Layout } from '~/app/layout';
import { medicalSystemApi } from '~/shared/api';
import { userSlice, useAppDispatch } from '~/shared/store';
import { sharedUiComponents } from '~/shared/ui';

const { getProfile } = medicalSystemApi.user;
const { Loading } = sharedUiComponents;

export const WelcomePage = () => {
    const isAuth = useSelector(userSlice.selectors.isAuth);
    const isLoading = useSelector(userSlice.selectors.isLoading);
    const user = useSelector(userSlice.selectors.user);
    const appDispatch = useAppDispatch();

    useEffect(() => {
        if (isAuth) {
            appDispatch(getProfile());
        }
    }, [isAuth, appDispatch]);

    return (
        <Layout>
            <div className="flex h-full">
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-primary-darkSea">
                        Добро пожаловать в медицинскую информационную систему{' '}
                        <span className="whitespace-nowrap">
                            Try not to die
                        </span>
                    </h1>
                    <p className="flex flex-col text-xl mt-4 items-center">
                        {isLoading ? (
                            <Loading />
                        ) : user ? (
                            `Здравствуйте, ${user.name}`
                        ) : (
                            <span>
                                Пожалуйста,{' '}
                                <Link
                                    to="/login"
                                    className="text-blue-500 hover:underline"
                                >
                                    авторизуйтесь
                                </Link>
                                , чтобы продолжить.
                            </span>
                        )}
                    </p>
                </div>
            </div>
        </Layout>
    );
};
