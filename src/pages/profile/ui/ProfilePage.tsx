import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { Layout } from '~/app/layout';
import { authorizationFeature } from '~/features';
import { getProfile } from '~/shared/api/medicalSystem/user';
import { sharedConfigRouter } from '~/shared/config';
import { userSlice } from '~/shared/store';
import { useAppDispatch } from '~/shared/store/store';
import { sharedUiComponents } from '~/shared/ui';

const { ProfileForm } = authorizationFeature.ui;
const { RouteName } = sharedConfigRouter;
const { selectors } = userSlice;
const { Loading } = sharedUiComponents;

export const ProfilePage = () => {
    const navigate = useNavigate();
    const appDispatch = useAppDispatch();
    const isAuth = useSelector(selectors.isAuth);
    const isLoading = useSelector(selectors.isLoading);

    useEffect(() => {
        if (!isAuth) {
            navigate(RouteName.LOGIN_PAGE);
            return;
        }

        const fetchProfile = async () => {
            try {
                await appDispatch(getProfile());
            } catch (e) {
                console.log(e);
            }
        };

        fetchProfile();
    }, [isAuth, navigate, appDispatch]);

    return <Layout>{isLoading ? <Loading /> : <ProfileForm />}</Layout>;
};
