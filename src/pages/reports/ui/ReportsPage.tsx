import React, { useEffect } from 'react';

import { Layout } from '~/app/layout';
import { filtrationFeature } from '~/features';
import { medicalSystemApi } from '~/shared/api';
import { sharedConfigTypes } from '~/shared/config';
import { Params } from '~/shared/config/types';
import { useData } from '~/shared/hooks/useData';
import { sharedUiComponents } from '~/shared/ui';

const { useFilters } = filtrationFeature.model;
const { ReportsForm } = filtrationFeature.ui;
const { Table } = sharedUiComponents;

export const ReportsPage = () => {
    const { params, onSubmit } = useFilters();
    const { data, refetch } = useData<sharedConfigTypes.Report, Params>(
        medicalSystemApi.report.get,
        params,
        true,
    );

    useEffect(() => {
        if (params.start && params.end) {
            refetch();
        }
    }, [params]);

    return (
        <Layout>
            <div className="absolute top-28 w-11/12 2xl:max-w-screen-2xl">
                <ReportsForm onSubmit={onSubmit} />
                {data && <Table {...data} />}
            </div>
        </Layout>
    );
};
