import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { Layout } from '~/app/layout';
import { patientEntity } from '~/entities';
import { filtrationFeature } from '~/features';
import { paginationFeature } from '~/features';
import { medicalSystemApi } from '~/shared/api';
import { sharedConfigRouter, sharedConfigTypes } from '~/shared/config';
import {
    Patient as PatientType,
    Pagination as PaginationType,
} from '~/shared/config/types';
import { useData } from '~/shared/hooks/useData';
import { userSlice } from '~/shared/store';
import { sharedUiComponents } from '~/shared/ui';

const { Patient } = patientEntity.ui;
const { useFilters } = filtrationFeature.model;
const { PatientsFilter } = filtrationFeature.ui;
const { usePagination } = paginationFeature.model;
const { Pagination } = paginationFeature.ui;
const { patient } = medicalSystemApi;
const { getList } = patient;
const { RouteName } = sharedConfigRouter;
const { selectors } = userSlice;
const { Loading } = sharedUiComponents;

type Params = sharedConfigTypes.Params;

export const PatientsPage = () => {
    const navigate = useNavigate();
    const isAuth = useSelector(selectors.isAuth);

    if (!isAuth) {
        navigate(RouteName.LOGIN_PAGE);
    }

    const { params, onSubmit } = useFilters();
    const { data, isLoading } = useData<
        { patients: PatientType[]; pagination: PaginationType },
        Params
    >(getList, params);
    const { currentPage, startPage, endPage, onChangePage } = usePagination(
        data?.pagination.count,
    );

    return (
        <Layout>
            <div className="absolute top-28 w-11/12 2xl:max-w-screen-2xl">
                <h1 className="text-5xl font-bold ml-2 mb-6 pr-3 pl-3">
                    Пациенты
                </h1>
                <PatientsFilter defaultValues={params} onSubmit={onSubmit} />
                <div className="flex flex-col justify-center pt-4 items-center gap-4">
                    {isLoading ? (
                        <Loading />
                    ) : data?.patients && data?.patients.length > 0 ? (
                        <>
                            <div className="flex flex-col lg:grid lg:grid-cols-2 gap-3 w-full">
                                {data.patients.map((patient) => (
                                    <Patient {...patient} key={patient.id} />
                                ))}
                            </div>
                            <Pagination
                                current={currentPage}
                                start={startPage}
                                end={endPage}
                                onPageChange={onChangePage}
                            />
                        </>
                    ) : (
                        <p className="text-gray-500">Пациенты не найдены.</p>
                    )}
                </div>
            </div>
        </Layout>
    );
};
