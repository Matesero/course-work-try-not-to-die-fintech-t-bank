import React from 'react';
import { useSelector } from 'react-redux';

import { Layout } from '~/app/layout';
import { authorizationFeature } from '~/features';
import { userSlice } from '~/shared/store';
import { sharedUiComponents } from '~/shared/ui';

const { ProfileForm } = authorizationFeature.ui;
const { selectors } = userSlice;
const { Loading } = sharedUiComponents;

export const ProfilePage = () => {
    const isLoading = useSelector(selectors.isLoading);

    return <Layout> {isLoading ? <Loading /> : <ProfileForm />}</Layout>;
};
