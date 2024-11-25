import React from 'react';

import { Wrapper } from './Wrapper';
import { useForm } from '../model/useForm';

import { FemaleIcon, MaleIcon } from '~/shared/assets/images';
import { sharedConfigOptions } from '~/shared/config';
import { useStore } from '~/shared/hooks/useStore';
import { parseDate } from '~/shared/lib';
import { englishToRussian } from '~/shared/lib/englishToRussian';
import { icdToOptions } from '~/shared/lib/icdToOptions';
import { inspectionsToOptions } from '~/shared/lib/inspectionsToOptions';
import { specialtiesToOptions } from '~/shared/lib/specialtiesToOptions';
import { sharedUiComponents } from '~/shared/ui';

const { Button, Datepicker, Loading, Radio, Select, Switch, Textarea } =
    sharedUiComponents;

export const CreateForm = () => {
    const {
        patientData,
        inspectionsWithoutChild,
        specialties,
        isLoadingStore,
    } = useStore({
        needSpecialties: true,
        needPatient: true,
        needInspectionWithoutChild: true,
    });
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
        onSwitchIsFirst,
        refs,
    } = useForm();

    if (
        !patientData ||
        !specialties.length ||
        (!inspectionsWithoutChild.length && isLoadingStore)
    ) {
        return (
            <div className="flex justify-center">
                <Loading />
            </div>
        );
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
                            options={inspectionsToOptions(
                                inspectionsWithoutChild,
                            )}
                            defaultValue={state.prevInspection}
                            labelFromCode
                            isSearchable
                            isRequired
                            error={state.errors?.['previousInspectionId']}
                        />
                    )}
                    <Datepicker
                        label="Дата осмотра"
                        name="date"
                        asSingle
                        error={state.errors?.['date'] ?? ''}
                        useRange={false}
                        withTime
                        isRequired
                    />
                </div>
            </div>

            <Wrapper label="Жалобы" error={state.errors?.['complaints'] ?? ''}>
                <Textarea name="complaints" rows={2} />
            </Wrapper>

            <Wrapper
                label="Анамнез заболевания"
                error={state.errors?.['anamnesis'] ?? ''}
            >
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
                            label="Добавить консультацию"
                            onClick={onAddConsultation}
                            className="!w-fit px-5 mt-4"
                        />
                    </>
                )}
            </Wrapper>

            <Wrapper
                label="Диагнозы"
                error={state.errors?.['diagnoses'] ?? ''}
                className="flex flex-col gap-3"
            >
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
                    error={state.errors?.['diagnosis'] ?? ''}
                    searchInputPlaceholder="Начните вводить часть кода или названия"
                />
                <Textarea
                    name="diagnosis"
                    rows={1}
                    error={state.errors?.['diagnosisDescription'] ?? ''}
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
                    label="Добавить диагноз"
                    onClick={onAddDiagnosis}
                    className="!w-fit px-5"
                />
            </Wrapper>

            <Wrapper
                label="Рекомендации по лечению"
                error={state.errors?.['treatment'] ?? ''}
            >
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
                    error={state.errors?.['conclusion']}
                    classNames="!w-full lg:!w-1/3"
                />
                {(state.conclusion === 'Disease' ||
                    state.conclusion === 'Death') && (
                    <Datepicker
                        name={
                            state.conclusion === 'Disease'
                                ? 'nextVisitDate'
                                : 'deathDate'
                        }
                        label={`Дата ${state.conclusion === 'Disease' ? 'следующего осмотра' : 'и время смерти'}`}
                        asSingle
                        useRange={false}
                        withTime
                        isRequired
                        className="!w-full lg:!w-3/12"
                        error={
                            (state.conclusion === 'Disease'
                                ? state.errors?.['nextVisitDate']
                                : state.errors?.['deathDate']) || ''
                        }
                    />
                )}
            </Wrapper>

            <div className="flex flex-rw gap-4 mt-1 justify-center mb-5">
                <Button
                    label="Сохранить осмотр"
                    type="submit"
                    className="!w-fit px-5"
                />
            </div>
        </form>
    );
};
