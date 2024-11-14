import React, { useState } from 'react';
import Datepicker, { DateValueType } from 'react-tailwindcss-datepicker';

import { englishNameToRussian } from '~/shared/lib/englishNameToRussian';

type Props = {
    name: string;
    defaultValue?: string;
    asSingle?: boolean;
    useRange?: boolean;
    placeholder?: string;
    disabled?: boolean;
    className?: string;
    error?: string;
};

export const CustomDatepicker = (props: Props) => {
    const {
        name,
        defaultValue,
        asSingle,
        useRange,
        placeholder,
        disabled,
        className,
        error,
    } = props;

    const initialState = defaultValue
        ? {
              startDate: new Date(defaultValue),
              endDate: new Date(defaultValue),
          }
        : null;
    const [selectedValue, setNewValue] = useState<DateValueType>(initialState);

    const handleChange = (newValue: DateValueType) => {
        setNewValue(newValue);
    };

    return (
        <div className={`flex flex-col gap-1 ${className}`}>
            <p className="text-gray-500 text-lg">{name}</p>
            <div className="relative">
                <Datepicker
                    displayFormat="DD.MM.YYYY"
                    value={selectedValue}
                    useRange={useRange}
                    asSingle={asSingle}
                    onChange={handleChange}
                    containerClassName="relative w-full bg-white h-12 border px-1 border-gray-500 rounded-custom"
                    inputClassName="relative h-full pl-2.5 pr-14 w-full placeholder-gray-400 disabled:cursor-not-allowed focus:outline-none text-xl"
                    placeholder={placeholder || 'ДД.ММ.ГГГГ'}
                    disabled={disabled}
                />
                {error && (
                    <p className="absolute text-sm text-red-600 mt-0.5 font-medium left-0 right-0">
                        {error}
                    </p>
                )}
            </div>
            {/* Не знаю как пофиксить варнинг, может быть игнором*/}
            <input
                type="hidden"
                name={englishNameToRussian(name)}
                value={selectedValue?.startDate?.toISOString()}
            />
        </div>
    );
};
