import React, { FormEventHandler, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { FiltersWrapper } from './FiltersWrapper';

import { getIcdRoots } from '~/shared/api/medicalSystem/dictionary';
import { icdToOptions } from '~/shared/lib/icdToOptions';
import { dictionarySlice } from '~/shared/store';
import { useAppDispatch } from '~/shared/store/store';
import { sharedUiComponents } from '~/shared/ui';

const dictionarySelectors = dictionarySlice.selectors;
const { Button, Select, Datepicker } = sharedUiComponents;

type Props = {
    onSubmit: FormEventHandler<HTMLFormElement>;
    errors: string;
};

export const ReportsForm = ({ onSubmit, errors }: Props) => {
    const icdRoots = useSelector(dictionarySelectors.icdRoots);
    const appDispatch = useAppDispatch();

    useEffect(() => {
        const fetchData = async () => {
            if (!icdRoots.length) {
                await appDispatch(getIcdRoots());
            }
        };

        fetchData();
    }, []);

    return (
        <FiltersWrapper title="Статистика осмотров" onSubmit={onSubmit}>
            <Datepicker
                className="w-5/12"
                name="Дата с"
                asSingle={true}
                useRange={false}
                error={errors?.['start'] ?? ''}
            />
            <Datepicker
                className="w-5/12"
                name="Дата по"
                asSingle={true}
                useRange={false}
                error={errors?.['end'] ?? ''}
            />
            <Select
                name="МКБ-10"
                options={icdToOptions(icdRoots)}
                isMultiple
                labelFromCode
            />
            <div className="flex col-start-4 w-full h-2/3 lg:w-2/3 lg:translate-x-1/2 lg:translate-y-1/2">
                <Button text="Сохранить сводку" type="submit" />
            </div>
        </FiltersWrapper>
    );
};
