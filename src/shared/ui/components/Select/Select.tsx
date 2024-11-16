import React, { useEffect, useRef, useState } from 'react';
import Select from 'react-tailwindcss-select';
import { SelectValue } from 'react-tailwindcss-select/dist/components/type';

import { russianToEnglish } from '~/shared/lib/russianToEnglish';

type Option = {
    label: string;
    value: string;
};

type Props = {
    name: string;
    defaultValue?: string[] | string;
    options: Option[];
    isSearchable?: boolean;
    isMultiple?: boolean;
    disabled?: boolean;
    classNames?: string;
    error?: string;
    isRequired?: boolean;
};

export const CustomSelect = ({
    name,
    defaultValue,
    options,
    isSearchable,
    isMultiple,
    disabled,
    classNames,
    error,
    isRequired,
}: Props) => {
    const isFirstRender = useRef(true);
    const [selectedValue, setSelectedValue] = useState<
        Option | Option[] | null
    >(null);

    useEffect(() => {
        if (isFirstRender.current && defaultValue) {
            isFirstRender.current = false;

            const initialState =
                isMultiple && Array.isArray(defaultValue)
                    ? options.filter((option) =>
                          defaultValue.includes(option.value),
                      )
                    : options.find((option) => option.value === defaultValue);

            setSelectedValue(initialState ?? null);
        }
    }, [defaultValue, isMultiple, options]);

    const checkedValue = Array.isArray(selectedValue)
        ? selectedValue.map((value) => value.value.toString()).join(';')
        : selectedValue?.value || '';

    const handleChange = (newValue: SelectValue) => {
        setSelectedValue(newValue);
    };

    return (
        <div className={`flex flex-col gap-1 ${classNames}`}>
            <div className="flex flex-row items-center">
                <p className="text-gray-500 text-lg">
                    {name}{' '}
                    {isRequired && <span className="text-red-600">*</span>}
                </p>
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
                placeholder="Выбрать"
                isDisabled={disabled}
                isMultiple={isMultiple}
                isClearable
                onChange={handleChange}
                primaryColor={'blue'}
                searchInputPlaceholder="Поиск"
                noOptionsMessage="Ничего не найдено"
                classNames={{
                    menuButton: (value) => {
                        const isDisabled = value?.isDisabled;
                        return `flex bg-white h-12 border px-1 text-xl items-center border-gray-500 rounded-custom shadow-sm transition-all duration-300 focus:outline-none ${
                            isDisabled
                                ? 'bg-gray-200'
                                : 'bg-white hover:border-gray-400 focus:border-blue-500 focus:ring focus:ring-blue-500/20'
                        }`;
                    },
                    menu: 'absolute z-10 w-full bg-white shadow-lg border rounded py-1 mt-1.5 text-sm text-gray-700',
                    listItem: (value) => {
                        const isSelected = value?.isSelected;
                        return `block transition duration-200 px-2 py-2 cursor-pointer select-none truncate rounded ${
                            isSelected
                                ? 'text-white bg-blue-500'
                                : 'text-gray-500 hover:bg-blue-100 hover:text-blue-500'
                        }`;
                    },
                }}
            />
            <input
                type="hidden"
                name={russianToEnglish(name)}
                value={checkedValue || ''}
            />
        </div>
    );
};
