import React, { forwardRef } from 'react';

type Props = {
    label?: string;
    name: string;
    error?: string;
    defaultValue?: string;
    placeholder?: string;
    isRequired?: boolean;
    rows?: number;
    className?: string;
    textSize?: string;
};

export const Textarea = forwardRef<HTMLTextAreaElement | null, Props>(
    (
        {
            label,
            name,
            error,
            defaultValue,
            isRequired,
            rows,
            textSize,
            className,
        }: Props,
        ref,
    ) => {
        const handleChange = (
            event: React.ChangeEvent<HTMLTextAreaElement>,
        ) => {
            event.target.style.height = 'auto';
            event.target.style.height = `${event.target.scrollHeight}px`;
        };

        return (
            <div className="flex flex-col">
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
                <div
                    className={`${className} flex bg-white py-1 pb-2 pl-3 pr-55 h-fit items-center border-2 ${error ? 'border-red-500' : 'border-primary-gray'} transition-all duration-300 !focus:outline-none!overflow-y-hidden hover:border-gray-400 rounded-custom`}
                >
                    <textarea
                        ref={ref}
                        onChange={handleChange}
                        defaultValue={defaultValue}
                        className={`w-full text-${textSize || 'lg'} height-auto max-h-28 row-auto resize-none break-words bg-transparent outline-none`}
                        name={name}
                        rows={rows}
                    />
                </div>
            </div>
        );
    },
);

Textarea.displayName = 'Textarea';
