import React from 'react';

import { Layout } from '~/app/layout';
import { patientEntity } from '~/entities';
import {
    filtrationFeature,
    paginationFeature,
    authorizationFeature,
} from '~/features';
import { FormWrapper } from '~/features/authorization/ui/FormWrapper';
import { medicalSystemApi } from '~/shared/api';
import { sharedConfigOptions, sharedConfigTypes } from '~/shared/config';
import {
    Patient as PatientType,
    Pagination as PaginationType,
} from '~/shared/config/types';
import { useData } from '~/shared/hooks/useData';
import { sharedUiComponents } from '~/shared/ui';

const { Patient } = patientEntity.ui;
const { useFilters } = filtrationFeature.model;
const { useForm } = authorizationFeature.model;
const { PatientsFilter } = filtrationFeature.ui;
const { usePagination } = paginationFeature.model;
const { Pagination } = paginationFeature.ui;
const { patient } = medicalSystemApi;
const { getList } = patient;
const { Loading, Datepicker, InputField, Button, Select } = sharedUiComponents;

type Params = sharedConfigTypes.Params;

export const PatientsPage = () => {
    const [{ isEditing, errors }, onSubmitForm, onSwitch] =
        useForm('registerPatient');

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
                        label="Регистрация нового пациента"
                        className="!w-fit px-6"
                        onClick={onSwitch}
                    />
                </div>

                {isEditing && (
                    <div
                        className="fixed inset-0 z-50 flex justify-center items-center bg-blue-500 bg-opacity-50"
                        onClick={onSwitch}
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
                            <div className="flex flex-col lg:flex-row justify-between gap-6">
                                <Select
                                    label="Пол"
                                    name="gender"
                                    options={sharedConfigOptions.gender}
                                    classNames="w-full"
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
                                    className="w-full"
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <Button
                                    label="Зарегистрировать"
                                    type="submit"
                                />
                                <Button
                                    label="Отмена"
                                    bgColor="primary-gray"
                                    type="button"
                                    className="lg:hidden"
                                    onClick={onSwitch}
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
