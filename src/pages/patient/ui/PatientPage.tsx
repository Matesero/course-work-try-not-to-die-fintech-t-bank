import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { Layout } from '~/app/layout';
import { inspectionEntity } from '~/entities';
import { filtrationFeature, paginationFeature } from '~/features';
import { medicalSystemApi } from '~/shared/api';
import { FemaleIcon, MaleIcon } from '~/shared/assets/images';
import { sharedConfigTypes } from '~/shared/config';
import { useData } from '~/shared/hooks/useData';
import { useStore } from '~/shared/hooks/useStore';
import { withoutTime } from '~/shared/lib/parseDate';
import { patientSlice } from '~/shared/store';
import { removeAll } from '~/shared/store/inspection/store';
import { sharedUiComponents } from '~/shared/ui';

const { useFilters } = filtrationFeature.model;
const { Inspection } = inspectionEntity.ui;
const { ConsultationsFilter } = filtrationFeature.ui;
const { usePagination } = paginationFeature.model;
const { Pagination } = paginationFeature.ui;
const { patient } = medicalSystemApi;
const { getInspectionsList } = patient;
const { Loading, Button } = sharedUiComponents;

type ConsultationType = sharedConfigTypes.Consultation;
type PaginationType = sharedConfigTypes.Pagination;
type Params = sharedConfigTypes.Params & { id?: string };

export const PatientPage = () => {
    const { patientData } = useStore({
        needIcdRoots: true,
        needPatient: true,
        needInspectionWithoutChild: true,
    });
    const navigate = useNavigate();
    const appDispatch = useDispatch();
    const { params, onSubmit } = useFilters();
    const { data, isLoading, refetch } = useData<
        { inspections: ConsultationType[]; pagination: PaginationType },
        Params
    >(getInspectionsList, { id: patientData?.id, ...params }, true);
    const isDeath = useSelector(patientSlice.selectors.isDeath);
    const { currentPage, startPage, endPage, onChangePage } = usePagination(
        data?.pagination.count,
    );

    useEffect(() => {
        if (patientData) {
            refetch();
        }
    }, [patientData]);

    const onAddClick = () => {
        appDispatch(removeAll());
        navigate(`/inspection/create/${patientData.id}`);
    };

    if (!patientData || typeof isDeath === 'undefined') {
        return (
            <Layout>
                <Loading />
            </Layout>
        );
    }

    return (
        <Layout>
            <div className="absolute top-28 w-11/12 2xl:max-w-screen-2xl">
                <div className="flex flex-col gap-3 pl-5 pr-5">
                    <div className="flex flex-row justify-between items-end">
                        <h1 className="text-5xl font-bold">
                            Медицинская карта пациента
                        </h1>
                        {!isDeath && (
                            <Button
                                label="Добавить осмотр"
                                className="!h-fit !w-fit !p-5 !pt-2 !pb-2"
                                onClick={onAddClick}
                            />
                        )}
                    </div>

                    <div className="flex flex-row justify-between mb-2 items-center">
                        <p className="flex flex-row items-center text-2xl font-mediumPlus gap-1">
                            {patientData.name}
                            {patientData.gender === 'Male' ? (
                                <MaleIcon className="w-6 h-6" />
                            ) : (
                                <FemaleIcon className="w-6 h-6" />
                            )}
                        </p>
                        <p>
                            Дата рождения:{' '}
                            <span>{withoutTime(patientData.birthday)}</span>
                        </p>
                    </div>
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
                                {data?.inspections.map((inspection) => (
                                    <Inspection
                                        {...inspection}
                                        key={inspection.id}
                                        isGrouped={!!params?.grouped}
                                        isDeath={isDeath}
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
