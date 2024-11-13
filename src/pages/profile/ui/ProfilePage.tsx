import React from 'react';

import { Layout } from '~/app/layout';
import { userFormsUi } from '~/features/user';
const { ProfileForm } = userFormsUi;

export const ProfilePage = () => {
    return (
        <Layout isAuth={true}>
            <ProfileForm />
        </Layout>
    );
};
