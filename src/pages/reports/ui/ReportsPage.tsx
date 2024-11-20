import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { Layout } from '~/app/layout';
import { filtrationFeature } from '~/features';
import { useFilters } from '~/features/filtration/model';
import { medicalSystemApi } from '~/shared/api';
import { getProfile } from '~/shared/api/medicalSystem/user';
import { sharedConfigRouter, sharedConfigTypes } from '~/shared/config';
import { userSlice } from '~/shared/store';
import { useAppDispatch } from '~/shared/store/store';
import { sharedUiComponents } from '~/shared/ui';

const { ReportsForm } = filtrationFeature.ui;
const { RouteName } = sharedConfigRouter;
const { selectors } = userSlice;
const { Table } = sharedUiComponents;

export const ReportsPage = () => {
    const navigate = useNavigate();
    const appDispatch = useAppDispatch();
    const isAuth = useSelector(selectors.isAuth);

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

    const [report, setReport] = useState<sharedConfigTypes.Report>();
    const { params, onSubmit } = useFilters();
    useEffect(() => {
        const fetch = async () => {
            if (params.end && params.start) {
                const data = await medicalSystemApi.report.get(params);

                console.log(data);
                setReport(data.data);
            }
        };

        fetch();
    }, [params]);

    return (
        <Layout>
            <div className="absolute top-28 w-11/12 2xl:max-w-screen-2xl">
                <ReportsForm onSubmit={onSubmit} />
                {report && <Table {...report} />}
            </div>
        </Layout>
    );
};
