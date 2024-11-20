import React, { FormEventHandler, useState } from 'react';

import { Wrapper } from '~/features/createInpsection/ui/Wrapper';
import { sharedConfigOptions, sharedConfigTypes } from '~/shared/config';
import { englishToRussian } from '~/shared/lib/englishToRussian';
import { sharedUiComponents } from '~/shared/ui';
import { FormTittle, Radio } from '~/shared/ui/components';

const { Button, Select, Datepicker, Textarea } = sharedUiComponents;

type Props = sharedConfigTypes.Inspection & {
    setIsEditing: (value: boolean) => void;
    onSubmit: FormEventHandler<HTMLFormElement>;
};

export const EditForm = ({ setIsEditing, onSubmit, ...inspection }: Props) => {
    const [conclusion] = useState<'Disease' | 'Death' | 'Recovery'>(
        inspection.conclusion,
    );

    const handleModalClick = (e: React.MouseEvent) => {
        e.stopPropagation();
    };

    return (
        <div
            className="fixed inset-0 z-50 flex justify-center items-center bg-primary-darkSea bg-opacity-50 px-4"
            onClick={() => setIsEditing(false)}
        >
            <div
                className="w-full max-w-screen-md bg-white rounded-lg shadow-custom p-5 sm:pt-6 sm:p-7 sm:pb-5"
                onClick={handleModalClick}
            >
                <FormTittle title="Редактирование осмотра" />
                <form onSubmit={onSubmit} className="flex flex-col gap-4">
                    <Wrapper label="Жалобы">
                        <Textarea
                            name="complaints"
                            rows={2}
                            defaultValue={inspection.complaints}
                            className="w-full"
                        />
                    </Wrapper>
                    <Wrapper label="Анамнез заболевания">
                        <Textarea
                            name="anamnesis"
                            rows={2}
                            defaultValue={inspection.anamnesis}
                            className="w-full"
                        />
                    </Wrapper>
                    <Wrapper label="Рекомендации по лечению">
                        <Textarea
                            name="treatment"
                            rows={2}
                            defaultValue={inspection.treatment}
                            className="w-full"
                        />
                    </Wrapper>
                    <Wrapper label="Диагнозы" className="flex flex-col gap-3">
                        {inspection.diagnoses.length > 0 &&
                            inspection.diagnoses.map((diagnosis, index) => (
                                <div
                                    key={index}
                                    className="flex flex-col mb-3 border-b-2 border-primary-gray"
                                >
                                    <p className="font-semibold">
                                        Тип диагноза:{' '}
                                        <span>
                                            {englishToRussian(diagnosis.type)}
                                        </span>
                                    </p>
                                    <p className="p-0 mb-0.5 break-words">
                                        Описание:{' '}
                                        <span>{diagnosis.description}</span>
                                    </p>
                                </div>
                            ))}
                        <Select
                            label="Болезни"
                            name="diagnoses"
                            isSearchable
                            options={[]}
                        />
                        <Textarea name="diagnosis" rows={1} />
                        <div>
                            <p className="text-gray-500 text-lg">
                                Тип диагноза в осмотре
                            </p>
                            <div className="flex flex-row gap-2">
                                <Radio
                                    name="type"
                                    label="Основной"
                                    value="Main"
                                    checked
                                />
                                <Radio
                                    name="type"
                                    label="Сопутствующий"
                                    value="Concomitant"
                                />
                                <Radio
                                    name="type"
                                    label="Осложение"
                                    value="Complication"
                                />
                            </div>
                        </div>
                        <Button
                            text="Добавить диагноз"
                            className="!w-fit px-5"
                        />
                    </Wrapper>
                    <Wrapper
                        label="Заключение"
                        className="flex flex-col lg:flex-row gap-3 items-end"
                    >
                        <Select
                            label="Заключение"
                            name="conclusion"
                            options={sharedConfigOptions.conclusions}
                            defaultValue={inspection.conclusion}
                            classNames="!w-full sm:w-1/2"
                        />
                        {(conclusion === 'Disease' ||
                            conclusion === 'Death') && (
                            <Datepicker
                                name={`${conclusion === 'Disease' ? 'nextVisitDate' : 'deathDate'}`}
                                label={`Дата и время ${conclusion === 'Disease' ? 'следующего осмотра' : 'смерти'}`}
                                asSingle
                                useRange={false}
                                withTime
                                className="!w-full sm:w-1/2"
                                defaultValue={
                                    conclusion === 'Disease'
                                        ? inspection.nextVisitDate
                                        : inspection.deathDate
                                }
                            />
                        )}
                    </Wrapper>
                    <div className="flex flex-col gap-2">
                        <Button text="Сохранить изменения" type="submit" />
                        <Button
                            text="Отмена"
                            bgColor="primary-gray"
                            type="button"
                            className="lg:hidden"
                            onClick={() => setIsEditing(false)}
                        />
                    </div>
                </form>
            </div>
        </div>
    );
};
