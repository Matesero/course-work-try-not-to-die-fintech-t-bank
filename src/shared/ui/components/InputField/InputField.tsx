import React from 'react';
import { useState } from 'react';
import ReactInputMask from 'react-input-mask';

import { russianToEnglish } from '~/shared/lib/russianToEnglish';

type Props = {
    defaultValue?: string;
    name: string;
    type: 'text' | 'password' | 'phone';
    error?: string;
    placeholder?: string;
    disabled?: boolean;
    isRequired?: boolean;
};

export const InputField = ({
    defaultValue,
    name,
    type,
    error,
    placeholder,
    disabled,
    isRequired,
}: Props) => {
    const [show, setShow] = useState(type === 'text');

    return (
        <div className="flex flex-col gap-1">
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
            <div className="flex bg-white h-12 items-center border border-gray-500 rounded-custom overflow-hidden">
                {type === 'phone' ? (
                    <ReactInputMask
                        defaultValue={defaultValue}
                        mask="+9 (999) 999-99-99"
                        maskChar="_"
                        placeholder={placeholder}
                        className="w-full px-4 text-xl bg-transparent outline-none"
                        disabled={disabled}
                        name={russianToEnglish(name)}
                    />
                ) : (
                    <input
                        defaultValue={defaultValue}
                        type={show ? 'text' : 'password'}
                        placeholder={placeholder}
                        className="w-full px-4 text-xl bg-transparent outline-none"
                        disabled={disabled}
                        name={russianToEnglish(name)}
                    />
                )}
                {type === 'password' && (
                    <button
                        type="button"
                        onClick={() => setShow((prevShow) => !prevShow)}
                        className="w-1/5 h-full border-l border-gray-500"
                    >
                        {show ? 'Скрыть' : 'Показать'}
                    </button>
                )}
            </div>
        </div>
    );
};
