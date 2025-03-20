import React, { ChangeEvent, useState, forwardRef, useEffect } from 'react';
import Select from 'react-tailwindcss-select';
import { SelectValue } from 'react-tailwindcss-select/dist/components/type';

type Option = {
    label: string;
    value: string;
    code?: string;
};

type MatchedProps = {
    value: string;
    options: Option[];
    labelFromCode?: boolean;
};

const getMatchedOption = ({
    value,
    options,
    labelFromCode,
}: MatchedProps): Option | null => {
    const matchedOption = options.find((option) => option.value === value);
    if (matchedOption) {
        if (labelFromCode) {
            return {
                label: matchedOption.code ?? matchedOption.label,
                value: matchedOption.value,
                code: matchedOption.code,
            };
        }
        return matchedOption;
    }
    return null;
};

type Props = {
    label?: string;
    name: string;
    defaultValue?: string[] | string;
    options: Option[];
    isSearchable?: boolean;
    isMultiple?: boolean;
    disabled?: boolean;
    classNames?: string;
    error?: string;
    onChange?: (
        e: ChangeEvent<HTMLInputElement> | Option | Option[] | string,
    ) => void;
    placeholder?: string;
    labelFromCode?: boolean;
    isRequired?: boolean;
    onSearchInputChange?: (e: ChangeEvent<HTMLInputElement>) => void;
    searchInputPlaceholder?: string;
    value?: string;
};

export const CustomSelect = forwardRef<HTMLInputElement | null, Props>(
    (
        {
            label,
            name,
            defaultValue,
            options,
            isSearchable,
            isMultiple,
            disabled,
            classNames,
            error,
            onChange,
            placeholder,
            labelFromCode,
            isRequired,
            onSearchInputChange,
            searchInputPlaceholder,
            value,
        }: Props,
        ref,
    ) => {
        const getInitialState = () => {
            if (isMultiple && Array.isArray(defaultValue) && defaultValue) {
                return options
                    .filter((option) => defaultValue.includes(option.value))
                    .map(
                        (option) =>
                            getMatchedOption({
                                value: option.value,
                                options,
                                labelFromCode,
                            }) || option,
                    );
            }

            if (value) {
                return getMatchedOption({ value: value as string, options });
            }

            return (
                getMatchedOption({
                    value: defaultValue as string,
                    options,
                    labelFromCode,
                }) || null
            );
        };

        const [selectedValue, setSelectedValue] = useState<
            Option | Option[] | null | SelectValue
        >(() => getInitialState());

        const checkedValue = Array.isArray(selectedValue)
            ? selectedValue.map((value) => value.value.toString()).join(';')
            : selectedValue?.value || '';

        useEffect(() => {
            if (value) {
                setSelectedValue(getInitialState());
            }
        }, [value]);

        const handleChange = (newValue: SelectValue) => {
            if (!newValue) {
                setSelectedValue(null);
                return;
            }

            if (!Array.isArray(newValue) && onChange) {
                onChange(newValue);
            }

            if (!labelFromCode) {
                setSelectedValue(newValue);
                return;
            }

            const updateLabelToCode = (
                value: SelectValue,
            ): Option | SelectValue => {
                if (!Array.isArray(value) && value) {
                    return (
                        getMatchedOption({
                            value: value.value,
                            options,
                            labelFromCode,
                        }) || value
                    );
                }
                return value;
            };

            if (Array.isArray(newValue)) {
                const updatedValues = newValue.map(updateLabelToCode);
                setSelectedValue(updatedValues as Option[]);
            } else {
                const updatedValue = updateLabelToCode(newValue);
                setSelectedValue(updatedValue);
            }
        };

        return (
            <div className={`flex flex-col gap-1 ${classNames}`}>
                <div className="flex flex-row items-center">
                    {label && (
                        <p className="text-gray-500 text-lg">
                            {label}{' '}
                            {isRequired && (
                                <span className="text-red-600">*</span>
                            )}
                        </p>
                    )}
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
                    placeholder={placeholder || 'Выбрать'}
                    isDisabled={disabled}
                    isMultiple={isMultiple}
                    isClearable
                    onChange={handleChange}
                    primaryColor={'blue'}
                    searchInputPlaceholder={searchInputPlaceholder || 'Поиск'}
                    noOptionsMessage="Ничего не найдено"
                    onSearchInputChange={onSearchInputChange}
                    classNames={{
                        menuButton: (value) => {
                            const isDisabled = value?.isDisabled;
                            return `flex cursor-pointer flex-row h-12 border-2 px-1 text-xl ${!selectedValue ? 'text-gray-400' : 'text-black'} items-center ${error ? 'border-red-500' : 'border-primary-gray'} rounded-custom transition-all duration-300 !focus:outline-none !overflow-y-hidden ${isDisabled ? 'bg-primary-gray' : 'bg-white'} hover:border-gray-400 focus:border-primary-gray-500 focus:ring-blue-500/20`;
                        },
                        menu: 'absolute z-10 w-full bg-white shadow-lg border rounded py-1 mt-1.5 text-sm text-gray-700',
                        listItem: (value) => {
                            const isSelected = value?.isSelected;
                            return `block transition duration-200 px-2 py-2 cursor-pointer select-none truncate rounded ${isSelected ? 'text-white bg-blue-500' : 'text-gray-500 hover:bg-blue-100 hover:text-blue-500'}`;
                        },
                    }}
                />

                <input
                    type="hidden"
                    name={name}
                    value={checkedValue || ''}
                    ref={ref}
                />
            </div>
        );
    },
);

CustomSelect.displayName = 'CustomSelect';
