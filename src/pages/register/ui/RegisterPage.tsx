import React from 'react';

import { Layout } from '~/app/layout';
import { authorizationFeature } from '~/features';

const { RegisterForm } = authorizationFeature.ui;

export const RegisterPage = () => {
    return (
        <Layout>
            <RegisterForm />
        </Layout>
    );
};
