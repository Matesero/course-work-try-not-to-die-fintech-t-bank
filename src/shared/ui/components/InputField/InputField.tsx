import React, { useState } from 'react';
import ReactInputMask from 'react-input-mask';

type Props = {
    label?: string;
    value?: string;
    name: string;
    defaultValue?: string;
    type: 'text' | 'password' | 'phone';
    error?: string;
    placeholder?: string;
    disabled?: boolean;
    isRequired?: boolean;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const InputField = ({
    label,
    value,
    name,
    type,
    error,
    placeholder,
    disabled,
    isRequired,
    onChange,
}: Props) => {
    const [show, setShow] = useState(type === 'text');

    return (
        <div className="flex flex-col gap-1">
            <div className="flex flex-row items-center">
                {label && (
                    <p className="text-gray-500 text-lg">
                        {label}{' '}
                        {isRequired && <span className="text-red-600">*</span>}
                    </p>
                )}

                {error && (
                    <p className="text-sm text-red-600 mt-1 ml-2 font-medium">
                        {error}
                    </p>
                )}
            </div>
            <div
                className={`relative flex ${disabled ? 'bg-primary-gray' : 'bg-white'} h-12 items-center border-2 ${error ? 'border-red-500' : 'border-primary-gray'} rounded-custom overflow-hidden transition-all duration-300 !focus:outline-none!overflow-y-hidden hover:border-gray-400 `}
            >
                {type === 'phone' ? (
                    <ReactInputMask
                        value={value}
                        mask="+9 (999) 999-99-99"
                        maskChar="_"
                        placeholder={placeholder}
                        className="w-full px-4 text-xl bg-transparent outline-none "
                        disabled={disabled}
                        name={name}
                        onChange={onChange}
                    />
                ) : (
                    <input
                        value={value}
                        type={show ? 'text' : 'password'}
                        placeholder={placeholder}
                        className="w-full px-4 text-xl bg-transparent outline-none"
                        disabled={disabled}
                        name={name}
                        onChange={onChange}
                    />
                )}
                {type === 'password' && (
                    <button
                        type="button"
                        onClick={() => setShow((prevShow) => !prevShow)}
                        className="absolute right-3 text-sm text-gray-600 hover:text-blue-500"
                    >
                        {show ? 'Скрыть' : 'Показать'}
                    </button>
                )}
            </div>
        </div>
    );
};
