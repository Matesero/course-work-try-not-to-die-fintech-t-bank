import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { Layout } from '~/app/layout';
import { userFormsUi } from '~/features/user';
import { medicalSystemApi } from '~/shared/api';
import { useData } from '~/shared/hooks/useData';
import { setUser } from '~/shared/store/user/store';
import { sharedUiComponents } from '~/shared/ui';

const { Loading } = sharedUiComponents;

const { user } = medicalSystemApi;
const { ProfileForm } = userFormsUi;

export const ProfilePage = () => {
    const dispatch = useDispatch();
    const { data, isLoading } = useData(user.getProfile);

    useEffect(() => {
        if (data && data.data) {
            dispatch(setUser(data.data));
        }
    }, [data, dispatch]);

    return (
        <Layout isAuth={true} userName={data?.data?.name}>
            {isLoading ? (
                <Loading />
            ) : (
                <ProfileForm user={data?.data ?? null} />
            )}
        </Layout>
    );
};
