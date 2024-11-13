import React from 'react';

import { Layout } from '~/app/layout';
import { userFormsUi } from '~/features/user';
const { LoginForm } = userFormsUi;

export const LoginPage = () => {
    return (
        <Layout isAuth={false}>
            <LoginForm />
        </Layout>
    );
};
