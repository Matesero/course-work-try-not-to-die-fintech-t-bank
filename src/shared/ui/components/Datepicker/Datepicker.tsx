import { DatePicker, DateTimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import * as dayjs from 'dayjs';
import React, { useState } from 'react';
import 'dayjs/locale/ru';

type Props = {
    name: string;
    label?: string;
    defaultValue?: string;
    withTime?: boolean;
    asSingle?: boolean;
    useRange?: boolean;
    placeholder?: string;
    disabled?: boolean;
    className?: string;
    error?: string;
    isRequired?: boolean;
};

export const CustomDatepicker = (props: Props) => {
    const {
        name,
        label,
        defaultValue,
        withTime,
        disabled,
        className,
        error,
        isRequired,
    } = props;

    const [selectedValue, setNewValue] = useState<dayjs.Dayjs | null>(
        defaultValue ? dayjs(defaultValue) : null,
    );

    const handleChange = (newValue: dayjs.Dayjs | null) => {
        setNewValue(newValue);
    };

    const inputStyles = {
        '& .MuiOutlinedInput-root': {
            backgroundColor: 'none',
            border: 'none',
            borderRadius: '0',
            height: '100%',
            width: '100%',
            '&:hover': {},
            '&.Mui-focused': {},
            '&.Mui-error': {},
        },
        '& .MuiOutlinedInput-notchedOutline': {
            border: 'none',
        },
        '& .Mui-disabled': {
            opacity: '1',
            WebkitTextFillColor: 'rgba(0, 0, 0, 1)',
        },
        '& input': {
            padding: '1rem',
            fontSize: '1.25rem',
            lineHeight: '1.75rem',
            color: 'black',
        },
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ru">
            <div className={`flex flex-col gap-1 ${className}`}>
                <p className="text-gray-500 text-lg">
                    {label}{' '}
                    {isRequired && <span className="text-red-600">*</span>}
                    {error && (
                        <p className="text-sm text-red-600 mt-1 ml-2 font-medium">
                            {error}
                        </p>
                    )}
                </p>
                <div className="relative">
                    <div
                        className={`relative flex h-12 items-center border-2 ${error ? 'border-red-500' : 'border-primary-gray'} rounded-custom overflow-hidden transition-all duration-300 !focus:outline-none !overflow-y-hidden ${disabled ? 'bg-primary-gray' : 'bg-white'}  hover:border-gray-400 `}
                    >
                        {withTime ? (
                            <DateTimePicker
                                value={selectedValue}
                                onChange={handleChange}
                                disabled={disabled}
                                views={[
                                    'year',
                                    'month',
                                    'day',
                                    'hours',
                                    'minutes',
                                ]}
                                ampm={false}
                                viewRenderers={{
                                    seconds: null,
                                }}
                                slotProps={{
                                    textField: {
                                        sx: inputStyles,
                                        placeholder: 'ДД.ММ.ГГГГ ч:мм',
                                        className:
                                            'focus:outline-none focus:ring-0',
                                    },
                                }}
                            />
                        ) : (
                            <DatePicker
                                value={selectedValue}
                                onChange={handleChange}
                                disabled={disabled}
                                views={['year', 'month', 'day']}
                                slotProps={{
                                    textField: {
                                        sx: inputStyles,
                                        placeholder: 'ДД.ММ.ГГГГ',
                                        className:
                                            'focus:outline-none focus:ring-0',
                                    },
                                }}
                            />
                        )}
                    </div>
                    <input
                        type="hidden"
                        name={name}
                        value={selectedValue?.toISOString() || ''}
                    />
                </div>
            </div>
        </LocalizationProvider>
    );
};
