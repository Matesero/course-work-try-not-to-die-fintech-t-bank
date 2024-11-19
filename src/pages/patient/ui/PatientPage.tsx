import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

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
const { patient } = medicalSystemApi;
const { getInspectionsList } = patient;
const { RouteName } = sharedConfigRouter;
const { selectors } = userSlice;
const { Loading, Button } = sharedUiComponents;

type ConsultationType = sharedConfigTypes.Consultation;
type PaginationType = sharedConfigTypes.Pagination;
type Params = sharedConfigTypes.Params & { id?: string };

export const PatientPage = () => {
    const navigate = useNavigate();
    const isAuth = useSelector(selectors.isAuth);

    if (!isAuth) {
        navigate(RouteName.LOGIN_PAGE);
    }

    const { id } = useParams();
    const { params, onSubmit } = useFilters();
    const { data, isLoading } = useData<
        { inspections: ConsultationType[]; pagination: PaginationType },
        Params
    >(getInspectionsList, { id, ...params });
    const { currentPage, startPage, endPage, onChangePage } = usePagination(
        data?.pagination.count,
    );

    return (
        <Layout>
            <div className="absolute top-28 w-11/12 2xl:max-w-screen-2xl">
                <div className="flex flex-row justify-between items-end pr-3 pl-3">
                    <h1 className="text-5xl font-bold">
                        Медицинская карта пациента
                    </h1>
                    <Button
                        text="Добавить осмотр"
                        className="!h-fit !w-fit !p-4 !pt-1 !pb-2"
                    />
                </div>
                {/*{Доделаю}*/}
                <div className="pl-5 pr-5">
                    <p>
                        <span></span>
                    </p>
                    <p>
                        Дата рождения:<span>{}</span>
                    </p>
                </div>

                <ConsultationsFilter
                    defaultValues={params}
                    onSubmit={onSubmit}
                />
                <div className="flex flex-col justify-center pt-4 items-center gap-4">
                    {isLoading ? (
                        <Loading />
                    ) : data?.inspections && data?.inspections.length > 0 ? (
                        <>
                            <div className="gap-3 grid grid-cols-1 lg:grid-cols-2 grid-rows-[0.01px] w-full">
                                {data?.inspections.map((consultation) => (
                                    <Consultation
                                        {...consultation}
                                        key={consultation.id}
                                        isGrouped={!!params?.grouped}
                                    />
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
                        <p className="text-gray-500">
                            Осмотры не найдены или их нет.
                        </p>
                    )}
                </div>
            </div>
        </Layout>
    );
};
