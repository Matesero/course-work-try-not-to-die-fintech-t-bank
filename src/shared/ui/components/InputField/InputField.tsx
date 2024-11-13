import React from 'react';
import { useState } from 'react';

import { englishNameToRussian } from '~/shared/lib/englishNameToRussian';

type Props = {
    value?: string;
    name: string;
    type: 'text' | 'password' | 'tel';
    error?: string;
    placeholder?: string;
    disabled?: boolean;
};

export const InputField = ({
    value,
    name,
    type,
    error,
    placeholder,
    disabled,
}: Props) => {
    const [show, setShow] = useState(type === 'text');

    return (
        <div className="flex flex-col gap-1">
            <div className="flex flex-row items-center">
                <p className="text-gray-500 text-lg">{name}</p>
                {error && (
                    <p className="text-sm text-red-600 mt-1 ml-2 font-medium">
                        {error}
                    </p>
                )}
            </div>
            <div className="flex bg-white h-12 items-center border border-gray-500 rounded-custom overflow-hidden">
                <input
                    defaultValue={value}
                    type={show ? 'text' : 'password'}
                    placeholder={placeholder}
                    className="w-full px-4 text-xl bg-transparent outline-none"
                    disabled={disabled}
                    name={englishNameToRussian(name)}
                />
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
