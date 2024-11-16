import React from 'react';

import { Layout } from '~/app/layout';
import { userFormsUi } from '~/features/user';
const { RegisterForm } = userFormsUi;

export const RegisterPage = () => {
    return (
        <Layout isAuth={false}>
            <RegisterForm />
        </Layout>
    );
};
