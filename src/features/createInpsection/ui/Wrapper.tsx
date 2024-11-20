import React, { PropsWithChildren } from 'react';

type Props = PropsWithChildren & {
    label: string;
    className?: string;
};

export const Wrapper = ({ children, label, className }: Props) => {
    return (
        <div className="flex flex-col rounded-custom bg-primary-lightGray p-5 gap-5">
            <p className="text-primary-darkSea font-bold text-2xl leading-0 mt-2">
                {label}
            </p>
            <div className={className}>{children}</div>
        </div>
    );
};
