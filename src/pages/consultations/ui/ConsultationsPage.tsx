import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { Layout } from '~/app/layout';
import { consultationEntity } from '~/entities';
import { filtrationFeature, paginationFeature } from '~/features';
import { medicalSystemApi } from '~/shared/api';
import { sharedConfigRouter, sharedConfigTypes } from '~/shared/config';
import { useData } from '~/shared/hooks/useData';
import { userSlice } from '~/shared/store';
import { sharedUiComponents } from '~/shared/ui';

const { useFilters } = filtrationFeature.model;
const { Consultation } = consultationEntity.ui;
const { ConsultationsFilter } = filtrationFeature.ui;
const { usePagination } = paginationFeature.model;
const { Pagination } = paginationFeature.ui;
const { consultation } = medicalSystemApi;
const { getList } = consultation;
const { RouteName } = sharedConfigRouter;
const { selectors } = userSlice;
const { Loading } = sharedUiComponents;

type ConsultationType = sharedConfigTypes.Consultation;
type PaginationType = sharedConfigTypes.Pagination;
type Params = sharedConfigTypes.Params;

export const ConsultationsPage = () => {
    const navigate = useNavigate();
    const isAuth = useSelector(selectors.isAuth);

    if (!isAuth) {
        navigate(RouteName.LOGIN_PAGE);
    }

    const { params, onSubmit } = useFilters();
    const { data, isLoading } = useData<
        { inspections: ConsultationType[]; pagination: PaginationType },
        Params
    >(getList, params);
    const { currentPage, startPage, endPage, onChangePage } = usePagination(
        data?.pagination.count,
    );

    return (
        <Layout>
            <div className="absolute top-28 w-11/12 2xl:max-w-screen-2xl">
                <h1 className="text-5xl font-bold mb-6 pr-3 pl-3">
                    Консультации
                </h1>
                <ConsultationsFilter
                    defaultValues={params}
                    onSubmit={onSubmit}
                />
                <div className="flex flex-col justify-center pt-4 items-center gap-4">
                    {isLoading ? (
                        <Loading />
                    ) : data?.inspections && data?.inspections.length > 0 ? (
                        <div className="gap-3 grid grid-cols-1 lg:grid-cols-2 grid-rows-[0.01px] w-full">
                            {data?.inspections.map((consultation) => (
                                <Consultation
                                    {...consultation}
                                    key={consultation.id}
                                    isGrouped={!!params?.grouped}
                                />
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-500">
                            Консультации не найдены или их нет.
                        </p>
                    )}
                    <Pagination
                        current={currentPage}
                        start={startPage}
                        end={endPage}
                        onPageChange={onChangePage}
                    />
                </div>
            </div>
        </Layout>
    );
};
