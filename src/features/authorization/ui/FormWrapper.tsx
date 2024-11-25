import React, { FormEventHandler, ReactNode } from 'react';

import { sharedUiComponents } from '~/shared/ui';
const { FormTittle } = sharedUiComponents;

type Props = {
    title: string;
    onSubmit: FormEventHandler<HTMLFormElement>;
    onClick?: (e: React.MouseEvent) => void;
    children: ReactNode;
    className?: string;
    error?: string;
};

export const FormWrapper = ({
    title,
    onSubmit,
    onClick,
    children,
    className,
}: Props) => {
    return (
        <div
            className={`${className} w-4/5 sm:w-4/5 max-w-xl 3xl:max-w-screen-sm p-5 sm:pt-6 sm:p-7 sm:pb-5 bg-primary-lightGray rounded-lg shadow-custom`}
            onClick={onClick}
        >
            <FormTittle title={title}></FormTittle>
            <form onSubmit={onSubmit} className="flex flex-col gap-6">
                {children}
            </form>
        </div>
    );
};
