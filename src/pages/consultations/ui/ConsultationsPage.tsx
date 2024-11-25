import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { Layout } from '~/app/layout';
import { inspectionEntity } from '~/entities';
import { filtrationFeature, paginationFeature } from '~/features';
import { medicalSystemApi } from '~/shared/api';
import { sharedConfigTypes } from '~/shared/config';
import { useData } from '~/shared/hooks/useData';
import { dictionarySlice, useAppDispatch } from '~/shared/store';
import { sharedUiComponents } from '~/shared/ui';

const { useFilters } = filtrationFeature.model;
const { Inspection } = inspectionEntity.ui;
const { ConsultationsFilter } = filtrationFeature.ui;
const { usePagination } = paginationFeature.model;
const { Pagination } = paginationFeature.ui;
const { consultation, dictionary } = medicalSystemApi;
const { getList } = consultation;
const { getIcdRoots } = dictionary;
const dictionarySelectors = dictionarySlice.selectors;
const { Loading } = sharedUiComponents;

type ConsultationType = sharedConfigTypes.Consultation;
type PaginationType = sharedConfigTypes.Pagination;
type Params = sharedConfigTypes.Params;

export const ConsultationsPage = () => {
    const navigate = useNavigate();
    const icdRoots = useSelector(dictionarySelectors.icdRoots);
    const appDispatch = useAppDispatch();

    useEffect(() => {
        const fetchData = async () => {
            if (!icdRoots.length) {
                await appDispatch(getIcdRoots());
            }
        };

        fetchData();
    }, [navigate, appDispatch]);

    const { params, onSubmit } = useFilters();
    const { data, isLoading } = useData<
        { inspections: ConsultationType[]; pagination: PaginationType },
        Params
    >(getList, params);
    const { currentPage, startPage, endPage, onChangePage } = usePagination(
        data?.pagination.count,
    );

    if (!icdRoots.length) {
        return (
            <Layout>
                <Loading />
            </Layout>
        );
    }

    return (
        <Layout>
            <div className="absolute top-28 w-11/12 2xl:max-w-screen-2xl">
                <h1 className="text-5xl font-bold mb-4 pr-3 pl-3">
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
                            {data?.inspections.map((inspection) => (
                                <Inspection
                                    {...inspection}
                                    key={inspection.id}
                                    isConsultation
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
