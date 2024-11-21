import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { Layout } from '~/app/layout';
import { authorizationFeature } from '~/features';
import { userSlice } from '~/shared/store';

const { LoginForm } = authorizationFeature.ui;
const userSelectors = userSlice.selectors;

export const LoginPage = () => {
    const isAuth = useSelector(userSelectors.isAuth);
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuth) {
            navigate('/patients', { replace: true });
        }
    }, [isAuth, navigate]);

    if (isAuth) {
        return <Layout />;
    }

    return (
        <Layout>
            <LoginForm />
        </Layout>
    );
};
