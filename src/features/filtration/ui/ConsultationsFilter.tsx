import React, { FormEventHandler } from 'react';
import { useSelector } from 'react-redux';

import { FiltersWrapper } from './FiltersWrapper';

import { sharedConfigOptions, sharedConfigTypes } from '~/shared/config';
import { icdToOptions } from '~/shared/lib/icdToOptions';
import { dictionarySlice } from '~/shared/store';
import { sharedUiComponents } from '~/shared/ui';

const { size } = sharedConfigOptions;
const { Button, Select, Radio } = sharedUiComponents;

const dictionarySelectors = dictionarySlice.selectors;

type Props = {
    defaultValues: sharedConfigTypes.Params;
    onSubmit: FormEventHandler<HTMLFormElement>;
};

export const ConsultationsFilter = ({ defaultValues, onSubmit }: Props) => {
    const icdRoots = useSelector(dictionarySelectors.icdRoots);

    return (
        <FiltersWrapper title="" onSubmit={onSubmit}>
            <div className="col-span-3">
                <Select
                    label="МКБ-10"
                    name="icdRoots"
                    defaultValue={defaultValues.icdRoots}
                    options={icdToOptions(icdRoots)}
                    isMultiple
                    labelFromCode
                />
            </div>
            <div className="flex flex-row lg:flex-col mb-0.5 col-span-1 lg:justify-end">
                <Radio
                    label="Сгруппировать по повторным"
                    value="true"
                    name="grouped"
                    defaultChecked={!!defaultValues.grouped}
                />
                <Radio
                    label="Показать все"
                    name="grouped"
                    defaultChecked={!defaultValues.grouped}
                />
            </div>
            <Select
                label="Число осмотров на странице"
                name="size"
                defaultValue={defaultValues.size}
                options={size}
            />
            <div className="flex col-start-4 w-full lg:w-2/3 lg:h-3/5 lg:translate-x-1/2 lg:translate-y-2/3 justify-end">
                <Button text="Поиск" type="submit" />
            </div>
        </FiltersWrapper>
    );
};
