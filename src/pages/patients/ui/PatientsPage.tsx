import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { Layout } from '~/app/layout';
import { patientEntity } from '~/entities';
import { filtrationFeature, paginationFeature } from '~/features';
import { useForm } from '~/features/authorization/model';
import { FormWrapper } from '~/features/authorization/ui/FormWrapper';
import { medicalSystemApi } from '~/shared/api';
import {
    sharedConfigOptions,
    sharedConfigRouter,
    sharedConfigTypes,
} from '~/shared/config';
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
const { Loading, Datepicker, InputField, Button, Select } = sharedUiComponents;

type Params = sharedConfigTypes.Params;

export const PatientsPage = () => {
    const navigate = useNavigate();
    const isAuth = useSelector(selectors.isAuth);

    if (!isAuth) {
        navigate(RouteName.LOGIN_PAGE);
    }
    const [{ errors }, onSubmitForm] = useForm('registerPatient');
    const [regPatientIsOpen, setRegPatientIsOpen] = useState(false);

    const { params, onSubmit } = useFilters();
    const { data, isLoading } = useData<
        { patients: PatientType[]; pagination: PaginationType },
        Params
    >(getList, params);
    const { currentPage, startPage, endPage, onChangePage } = usePagination(
        data?.pagination.count,
    );

    const handleModalClick = (e: React.MouseEvent) => {
        e.stopPropagation();
    };

    return (
        <Layout>
            <div className="absolute top-28 w-11/12 2xl:max-w-screen-2xl">
                <div className="ml-2 mb-4 pr-3 pl-3 flex flex-row justify-between">
                    <h1 className="text-5xl font-bold ">Пациенты</h1>
                    <Button
                        text="Регистрация нового пациента"
                        className="!w-fit px-6"
                        onClick={() => setRegPatientIsOpen(true)}
                    />
                </div>

                {regPatientIsOpen && (
                    <div
                        className="fixed inset-0 z-50 flex justify-center items-center bg-blue-500 bg-opacity-50"
                        onClick={() => setRegPatientIsOpen(false)}
                    >
                        <FormWrapper
                            title="Регистрация пациента"
                            onSubmit={onSubmitForm}
                            onClick={handleModalClick}
                        >
                            <InputField
                                label="ФИО"
                                type="text"
                                name="name"
                                placeholder="Иванов Иван Иванович"
                                isRequired
                                error={errors?.['name'] ?? ''}
                            />
                            <div className="flex flex-col lg:flex-row justify-between gap-4">
                                <Select
                                    label="Пол"
                                    name="gender"
                                    options={sharedConfigOptions.gender}
                                    classNames="w-full lg:w-5/12"
                                    isRequired
                                    error={errors?.['gender'] ?? ''}
                                />
                                <Datepicker
                                    label="День рождения"
                                    name="patientBirthday"
                                    asSingle={true}
                                    useRange={false}
                                    isRequired
                                    error={errors?.['patientBirthday'] ?? ''}
                                    className="w-full lg:w-5/12"
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <Button text="Зарегистрировать" type="submit" />
                                <Button
                                    text="Отмена"
                                    bgColor="primary-gray"
                                    type="button"
                                    className="lg:hidden"
                                    onClick={() => setRegPatientIsOpen(false)}
                                />
                            </div>
                        </FormWrapper>
                    </div>
                )}
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
