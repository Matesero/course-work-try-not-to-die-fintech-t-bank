import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { useForm } from '../model/useForm';

import { Wrapper } from '~/features/createInpsection/ui/Wrapper';
import { medicalSystemApi } from '~/shared/api';
import { getSpecialties } from '~/shared/api/medicalSystem/dictionary';
import { getInspectionsWithoutChild } from '~/shared/api/medicalSystem/patient';
import { FemaleIcon, MaleIcon } from '~/shared/assets/images';
import { sharedConfigOptions } from '~/shared/config';
import { useStore } from '~/shared/hooks/useStore';
import { parseDate } from '~/shared/lib';
import { englishToRussian } from '~/shared/lib/englishToRussian';
import { icdToOptions } from '~/shared/lib/icdToOptions';
import { inspectionsToOptions } from '~/shared/lib/inspectionsToOptions';
import { specialtiesToOptions } from '~/shared/lib/specialtiesToOptions';
import { dictionarySlice, inspectionSlice } from '~/shared/store';
import { useAppDispatch } from '~/shared/store/store';
import {
    Button,
    Datepicker,
    Loading,
    Radio,
    Select,
    Switch,
} from '~/shared/ui/components';
import { Textarea } from '~/shared/ui/components';

const inspectionsSelectors = inspectionSlice.selectors;
const dictionarySelectors = dictionarySlice.selectors;

export const CreateForm = () => {
    const { patientData } = useStore();
    const {
        state,
        icd,
        onAddConsultation,
        onSubmit,
        onHandleChangePrevInspection,
        onSwitchNeedConsultation,
        handleChangeSearch,
        onAddDiagnosis,
        onRadioChange,
        handleChangeConclusion,
        inspectionsWithoutChild,
        onSwitchIsFirst,
        refs,
    } = useForm();
    const specialties = useSelector(dictionarySelectors.specialties);
    const appDispatch = useAppDispatch();
    const prevInspection = useSelector(inspectionsSelectors.data);

    useEffect(() => {
        const fetch = async () => {
            await appDispatch(getSpecialties({ page: 1, size: 20 }));
        };
        fetch();
    }, []);

    useEffect(() => {
        const fetch = async () => {
            if (patientData) {
                await appDispatch(
                    getInspectionsWithoutChild({
                        id: patientData.id,
                        request: '',
                    }),
                );
            }

            if (prevInspection) {
                await appDispatch(
                    medicalSystemApi.patient.getCard(prevInspection.patient.id),
                );
            }

            if (!patientData && state.prevInspection) {
                await appDispatch(
                    medicalSystemApi.inspection.get(state.prevInspection),
                );
            }
        };
        fetch();
    }, [patientData, prevInspection, state.prevInspection]);

    if (!patientData) {
        return <Loading />;
    }

    return (
        <form className="flex flex-col gap-3" onSubmit={onSubmit}>
            <div className="flex flex-col rounded-custom bg-primary-lightGray p-5 gap-3">
                <div className="flex flex-row justify-between">
                    <p className="text-xl font-semibold flex flex-row items-center">
                        {patientData.name}
                        {patientData.gender === 'Male' ? (
                            <MaleIcon className="h-6 w-6" />
                        ) : (
                            <FemaleIcon className="h-6 w-6" />
                        )}
                    </p>
                    <p>
                        Дата рождения:{' '}
                        <span>
                            {parseDate.withoutTime(patientData.birthday)}
                        </span>
                    </p>
                </div>
                <Switch
                    defaultChecked={!state.isFirst}
                    id="none"
                    leftLabel="Первичный осмотр"
                    rightLabel="Повторный осмотр"
                    onChange={onSwitchIsFirst}
                    revert
                />
                <div className="flex-col w-1/3 lg:!w-4/12 flex gap-2">
                    {!state.isFirst && (
                        <Select
                            label="Предыдущий осмотр"
                            name="previousInspectionId"
                            onChange={onHandleChangePrevInspection}
                            defaultValue={state.prevInspection}
                            options={inspectionsToOptions(
                                inspectionsWithoutChild,
                            )}
                            labelFromCode
                            isSearchable
                            isRequired
                            error={state.errors?.['prevInspection']}
                        />
                    )}
                    <Datepicker
                        label="Дата осмотра"
                        name="date"
                        asSingle
                        useRange={false}
                        withTime
                        isRequired
                    />
                </div>
            </div>

            <Wrapper label="Жалобы">
                <Textarea name="complaints" rows={2} />
            </Wrapper>

            <Wrapper label="Анамнез заболевания">
                <Textarea name="anamnesis" rows={2} />
            </Wrapper>

            <Wrapper label="Консультация">
                {state.consultations.length > 0 &&
                    state.consultations.map((consultation, index) => (
                        <div
                            key={index}
                            className="flex flex-col mb-3 border-b-2 border-primary-gray"
                        >
                            <p className="font-semibold">
                                Специализация консультанта:{' '}
                                <span>
                                    {specialties.find(
                                        (spec) =>
                                            spec.id ===
                                            consultation.specialityId,
                                    ).name || 'Не указана'}
                                </span>
                            </p>
                            <p className="p-0 mb-0.5 break-words">
                                Комментарий:{' '}
                                <span>{consultation.comment?.content}</span>
                            </p>
                        </div>
                    ))}
                <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center">
                    <Switch
                        rightLabel="Требуется консультация"
                        id="needConsultation"
                        checked={state.needConsultation}
                        onChange={onSwitchNeedConsultation}
                    />
                    {state.needConsultation && (
                        <Select
                            name="speciality"
                            isSearchable
                            options={specialtiesToOptions(specialties)}
                            placeholder="Специализация консультанта"
                            classNames="w-full text-sm"
                            ref={refs.specialtyRef}
                            error={state.errors?.['speciality']}
                        />
                    )}
                </div>
                {state.needConsultation && (
                    <>
                        <Textarea
                            label="Комментарий"
                            name="rootComment"
                            rows={2}
                            ref={refs.rootCommentRef}
                            isRequired
                            error={state.errors?.['content']}
                        />
                        <Button
                            text="Добавить консультацию"
                            onClick={onAddConsultation}
                            className="!w-fit px-5 mt-4"
                        />
                    </>
                )}
            </Wrapper>

            <Wrapper label="Диагнозы" className="flex flex-col gap-3">
                {state.diagnoses.length > 0 &&
                    state.diagnoses.map((diagnosis, index) => (
                        <div
                            key={index}
                            className="flex flex-col mb-3 border-b-2 border-primary-gray"
                        >
                            <p className="font-semibold">
                                Тип диагноза:{' '}
                                <span>{englishToRussian(diagnosis.type)}</span>
                            </p>
                            <p className="p-0 mb-0.5 break-words">
                                Описание: <span>{diagnosis.description}</span>
                            </p>
                        </div>
                    ))}
                <Select
                    label="Болезни"
                    name="diagnoses"
                    isSearchable
                    onSearchInputChange={handleChangeSearch}
                    options={icd ? icdToOptions(icd) : []}
                    ref={refs.diagnosisRef}
                />
                <Textarea
                    name="diagnosis"
                    rows={1}
                    ref={refs.diagnosisDescRef}
                />
                <div>
                    <p className="text-gray-500 text-lg">
                        Тип диагноза в осмотре
                    </p>
                    <div className="flex flex-row gap-2">
                        {!state.hasMainDiagnosis && (
                            <Radio
                                name="type"
                                label="Основной"
                                value="Main"
                                checked
                                onChange={onRadioChange}
                            />
                        )}
                        <Radio
                            name="type"
                            label="Сопутствующий"
                            value="Concomitant"
                            onChange={onRadioChange}
                        />
                        <Radio
                            name="type"
                            label="Осложение"
                            value="Complication"
                            onChange={onRadioChange}
                        />
                    </div>
                </div>
                <Button
                    text="Добавить диагноз"
                    onClick={onAddDiagnosis}
                    className="!w-fit px-5"
                />
            </Wrapper>

            <Wrapper label="Рекомендации по лечению">
                <Textarea name="treatment" rows={2} />
            </Wrapper>

            <Wrapper
                label="Заключение"
                className="flex flex-col lg:flex-row gap-3 items-end"
            >
                <Select
                    label="Заключение"
                    name="conclusion"
                    options={sharedConfigOptions.conclusions}
                    onChange={handleChangeConclusion}
                    isRequired
                    classNames="!w-full lg:!w-1/3"
                />
                {(state.conclusion === 'Disease' ||
                    state.conclusion === 'Death') && (
                    <Datepicker
                        name={`${state.conclusion === 'Disease' ? 'nextVisitDate' : 'deathDate'}`}
                        label={`Дата ${state.conclusion === 'Disease' ? 'следующего осмотра' : 'и время смерти'}`}
                        asSingle
                        useRange={false}
                        withTime
                        isRequired
                        className="!w-full lg:!w-3/12"
                    />
                )}
            </Wrapper>

            <div className="flex flex-rw gap-4 mt-1 justify-center">
                <Button
                    text="Сохранить осмотр"
                    type="submit"
                    className="!w-fit px-5"
                />
                <Button
                    text="Отмена"
                    type="button"
                    bgColor="primary-gray"
                    className="!w-fit px-5"
                />
            </div>
        </form>
    );
};
