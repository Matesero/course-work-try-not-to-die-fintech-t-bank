import React, { PropsWithChildren } from 'react';

type Props = PropsWithChildren & {
    label: string;
    className?: string;
    error?: string;
};

export const Wrapper = ({ children, label, className, error }: Props) => {
    return (
        <div className="flex flex-col rounded-custom bg-primary-lightGray p-5 gap-5">
            <p className="text-primary-darkSea font-bold text-2xl leading-0 mt-2">
                {label}
                <span className="text-sm text-red-600 ml-2 font-medium">
                    {error}
                </span>
            </p>
            <div className={className}>{children}</div>
        </div>
    );
};
