import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { Layout } from '~/app/layout';
import { authorizationFeature } from '~/features';
import { medicalSystemApi } from '~/shared/api';
import { sharedConfigRouter, sharedConfigTypes } from '~/shared/config';
import { useData } from '~/shared/hooks/useData';
import { userSlice } from '~/shared/store';
import { useAppDispatch } from '~/shared/store/store';
import { sharedUiComponents } from '~/shared/ui';

const { ProfileForm } = authorizationFeature.ui;
const { user } = medicalSystemApi;
const { RouteName } = sharedConfigRouter;
const { selectors } = userSlice;
const { setUser } = userSlice.store;
const { Loading } = sharedUiComponents;

type UserType = sharedConfigTypes.User;

export const ProfilePage = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const isAuth = useSelector(selectors.isAuth);

    if (!isAuth) {
        navigate(RouteName.LOGIN_PAGE);
    }
    const { data, isLoading } = useData<UserType, sharedConfigTypes.Params>(
        user.getProfile,
        {},
    );

    useEffect(() => {
        if (data) {
            dispatch(setUser(data));
        }
    }, [data, dispatch]);

    return (
        <Layout>
            {isLoading ? <Loading /> : <ProfileForm user={data ?? null} />}
        </Layout>
    );
};
