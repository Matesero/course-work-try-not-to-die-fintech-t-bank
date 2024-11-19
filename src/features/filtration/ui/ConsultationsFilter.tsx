import React, { FormEventHandler, useState } from 'react';

import { FiltersWrapper } from './FiltersWrapper';

import { sharedConfigOptions, sharedConfigTypes } from '~/shared/config';
import { sharedUiComponents } from '~/shared/ui';

const { size } = sharedConfigOptions;
const { Button, Select, Radio } = sharedUiComponents;

type Props = {
    defaultValues: sharedConfigTypes.Params;
    onSubmit: FormEventHandler<HTMLFormElement>;
};

export const ConsultationsFilter = ({ defaultValues, onSubmit }: Props) => {
    const [grouped, setGrouped] = useState<boolean>(!!defaultValues.grouped);

    return (
        <FiltersWrapper title="" onSubmit={onSubmit}>
            <div className="col-span-3">
                <Select
                    name="МКБ-10"
                    defaultValue={defaultValues.icdRoots}
                    options={[]}
                    isMultiple
                />
            </div>
            <div className="flex flex-col mb-0.5 col-span-1 justify-end">
                <Radio
                    label="Сгруппировать по повторным"
                    value="true"
                    checked={grouped}
                    onChange={() => setGrouped(true)}
                />
                <Radio
                    label="Показать все"
                    checked={!grouped}
                    onChange={() => setGrouped(false)}
                />
            </div>
            <Select
                name="Число осмотров на странице"
                defaultValue={defaultValues.size}
                options={size}
            />
            <div className="flex col-start-4 w-full lg:w-2/3 lg:h-3/5 lg:translate-x-1/2 lg:translate-y-2/3 justify-end">
                <Button text="Поиск" type="submit" />
            </div>
        </FiltersWrapper>
    );
};
