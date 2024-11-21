import React, { FormEventHandler, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { FiltersWrapper } from './FiltersWrapper';

import { medicalSystemApi } from '~/shared/api';
import { icdToOptions } from '~/shared/lib/icdToOptions';
import { dictionarySlice } from '~/shared/store';
import { useAppDispatch } from '~/shared/store/store';
import { sharedUiComponents } from '~/shared/ui';

const { getIcdRoots } = medicalSystemApi.dictionary;
const dictionarySelectors = dictionarySlice.selectors;
const { Button, Select, Datepicker } = sharedUiComponents;

type Props = {
    onSubmit: FormEventHandler<HTMLFormElement>;
};

export const ReportsForm = ({ onSubmit }: Props) => {
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
                label="Дата с"
                name="start"
                className="col-span-1"
                asSingle={true}
                useRange={false}
                isRequired
            />
            <Datepicker
                label="Дата по"
                className="col-span-1"
                name="end"
                asSingle={true}
                useRange={false}
                isRequired
            />
            <Select
                label="МКБ-10"
                name="icdRoots"
                options={icdToOptions(icdRoots)}
                isMultiple
                labelFromCode
                classNames="col-span-2"
            />
            <div className="flex col-start-4 w-full 2xl:translate-x-1/2 2xl:w-2/3">
                <Button label="Сохранить сводку" type="submit" />
            </div>
        </FiltersWrapper>
    );
};
