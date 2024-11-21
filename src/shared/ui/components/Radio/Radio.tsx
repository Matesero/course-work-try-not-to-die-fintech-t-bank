import React, { forwardRef } from 'react';

type Props = {
    label: string;
    name?: string;
    defaultChecked?: boolean;
    value?: string;
    checked?: boolean;
    onChange?: (e) => void;
};

export const Radio = forwardRef<HTMLInputElement | null, Props>(
    ({ label, name, value, defaultChecked, onChange }: Props, ref) => {
        return (
            <div className="flex items-center border border-gray-200 rounded dark:border-gray-700 cursor-pointer">
                <input
                    id={label}
                    ref={ref}
                    type="radio"
                    defaultChecked={defaultChecked}
                    value={value}
                    name={name}
                    onChange={onChange}
                    className="w-4 h-4 text-primary-darkSea bg-primary-gray border-gray-300 cursor-pointer"
                />
                <label
                    htmlFor={label}
                    className="w-full ms-2 text-sm font-medium text-gray-900 dark:text-gray-300 cursor-pointer"
                >
                    {label}
                </label>
            </div>
        );
    },
);

Radio.displayName = 'Radio';
