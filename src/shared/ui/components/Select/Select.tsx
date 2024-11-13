import React, { useState } from 'react';
import Select from 'react-tailwindcss-select';
import { SelectValue } from 'react-tailwindcss-select/dist/components/type';

import { englishNameToRussian } from '~/shared/lib/englishNameToRussian';

type Option = {
    label: string;
    value: string;
};

type Props = {
    name: string;
    value?: Option | Option[];
    options: Option[];
    isSearchable?: boolean;
    disabled?: boolean;
    classNames?: string;
    error?: string;
};

export const CustomSelect = ({
    name,
    value,
    options,
    isSearchable,
    disabled,
    classNames,
    error,
}: Props) => {
    const [selectedValue, setSelectedValue] = useState<SelectValue>(
        value ?? options[0],
    );

    const handleChange = (newValue: SelectValue) => {
        setSelectedValue(newValue);
    };

    const checkedValue = Array.isArray(selectedValue) ? '' : selectedValue?.value;

    return (
        <div className={`flex flex-col gap-1 ${classNames}`}>
            <div className="flex flex-row items-center">
                <p className="text-gray-500 text-lg">{name}</p>
                {error && (
                    <p className="text-sm text-red-600 mt-1 ml-2 font-medium">
                        {error}
                    </p>
                )}
            </div>
            <Select
                value={selectedValue}
                options={options}
                isSearchable={isSearchable}
                placeholder="Выберите"
                isDisabled={disabled}
                onChange={handleChange}
                primaryColor={'blue'}
                /* Не знаю как пофиксить варнинг, может быть игнором*/
                classNames={{
                    menuButton: ({ isDisabled }) =>
                        `flex bg-white h-12 border px-1 text-xl items-center border-gray-500 rounded-custom shadow-sm transition-all duration-300 focus:outline-none ${
                            isDisabled
                                ? 'bg-gray-200'
                                : 'bg-white hover:border-gray-400 focus:border-blue-500 focus:ring focus:ring-blue-500/20'
                        }`,
                    menu: 'absolute z-10 w-full bg-white shadow-lg border rounded py-1 mt-1.5 text-sm text-gray-700',
                    listItem: ({ isSelected }) =>
                        `block transition duration-200 px-2 py-2 cursor-pointer select-none truncate rounded ${
                            isSelected
                                ? 'text-white bg-blue-500'
                                : 'text-gray-500 hover:bg-blue-100 hover:text-blue-500'
                        }`,
                }}
            />
            <input
                type="hidden"
                name={englishNameToRussian(name)}
                value={checkedValue || ''}
            />
        </div>
    );
};
