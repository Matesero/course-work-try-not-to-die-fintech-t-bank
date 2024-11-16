import React, { FormEventHandler, ReactNode } from 'react';

type Props = {
    title?: string;
    onSubmit: FormEventHandler<HTMLFormElement>;
    children: ReactNode;
};

export const FiltersWrapper = ({ title, onSubmit, children }: Props) => {
    return (
        <div className="flex flex-col p-5 sm:pt-4 sm:p-7 sm:pb-5 bg-primary-lightGray rounded-lg shadow-custom">
            {title && (
                <p className="text-3xl sm:text-4xl font-arial font-bold cursor-default mb-2">
                    {title}
                </p>
            )}
            <form
                onSubmit={onSubmit}
                className="flex flex-col gap-x-6 gap-y-3 lg:grid lg:grid-cols-4"
            >
                {children}
            </form>
        </div>
    );
};
