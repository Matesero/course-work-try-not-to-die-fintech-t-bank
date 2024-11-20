import React from 'react';

type Props = {
    defaultValue?: string;
    label: string;
    name: string;
    error?: string;
    placeholder?: string;
    isRequired?: boolean;
    rows?: number;
};

export const InputField = ({
    defaultValue,
    label,
    name,
    error,
    isRequired,
    rows,
}: Props) => {
    const handleChange = (event) => {
        event.target.style.height = 'auto';
        event.target.style.height = `${event.target.scrollHeight}px`;
    };

    return (
        <div className="flex flex-col gap-1">
            <div className="flex flex-row items-center">
                <p className="text-gray-500 text-lg">
                    {label}{' '}
                    {isRequired && <span className="text-red-600">*</span>}
                </p>
                {error && (
                    <p className="text-sm text-red-600 mt-1 ml-2 font-medium">
                        {error}
                    </p>
                )}
            </div>
            <div className="flex bg-white py-1 pb-2 pl-3 pr-55 h-fit items-center border-2 border-primary-gray rounded-custom">
                <textarea
                    onChange={handleChange}
                    defaultValue={defaultValue}
                    className="w-full text-lg height-auto max-h-28 row-auto resize-none break-words bg-transparent outline-none"
                    name={name}
                    rows={rows}
                />
            </div>
        </div>
    );
};
