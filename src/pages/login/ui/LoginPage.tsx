import React from 'react';

import { Layout } from '~/app/layout';
import { authorizationFeature } from '~/features';

const { LoginForm } = authorizationFeature.ui;

export const LoginPage = () => {
    return (
        <Layout>
            <LoginForm />
        </Layout>
    );
};
