import React, { FormEventHandler } from 'react';

import { FiltersWrapper } from './FiltersWrapper';

import { sharedConfigTypes } from '~/shared/config';
import { sharedConfigOptions } from '~/shared/config';
import { sharedUiComponents } from '~/shared/ui';

const { conclusions, size, sorting } = sharedConfigOptions;
const { Button, InputField, Select, Checkbox } = sharedUiComponents;

type Props = {
    defaultValues: sharedConfigTypes.Params;
    onSubmit: FormEventHandler<HTMLFormElement>;
};

export const PatientsFilter = ({ defaultValues, onSubmit }: Props) => {
    return (
        <FiltersWrapper title="Фильтры и сортировка" onSubmit={onSubmit}>
            <div className="col-span-2">
                <InputField
                    label="ФИО"
                    name="name"
                    type="text"
                    defaultValue={defaultValues.name}
                    placeholder="Иванов Иван Иванович"
                />
            </div>
            <div className="col-span-2">
                <Select
                    label="Имеющиеся заключения"
                    name="conclusions"
                    defaultValue={defaultValues.conclusions}
                    options={conclusions}
                    isMultiple
                />
            </div>
            <Select
                label="Число пациентов на странице"
                name="size"
                defaultValue={defaultValues.size}
                options={size}
            />
            <Select
                label="Сортировка пациентов"
                name="sorting"
                defaultValue={defaultValues.sorting}
                options={sorting}
            />
            <div className="flex flex-row gap-6 lg:flex-col lg:gap-1 col-span-1 lg:justify-end">
                <Checkbox
                    defaultChecked={!!defaultValues.scheduledVisits}
                    label="Есть запланированные визиты"
                    name="scheduledVisits"
                />
                <Checkbox
                    defaultChecked={!!defaultValues.onlyMine}
                    label="Только мои"
                    name="onlyMine"
                />
            </div>
            <div className="flex col-start-4 w-full h-2/3 lg:w-2/3 lg:translate-x-1/2 lg:translate-y-1/2">
                <Button label="Поиск" type="submit" />
            </div>
        </FiltersWrapper>
    );
};
