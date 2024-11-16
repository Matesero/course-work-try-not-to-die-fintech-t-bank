import React, { FormEventHandler, ReactNode } from 'react';

import { FormTittle } from '~/shared/ui/components';

type Props = {
    title: string;
    onSubmit: FormEventHandler<HTMLFormElement>;
    children: ReactNode;
};

export const FormWrapper = ({ title, onSubmit, children }: Props) => {
    return (
        <div className="w-4/5 sm:w-4/5 max-w-xl 3xl:max-w-screen-sm p-5 sm:pt-6 sm:p-7 sm:pb-5 bg-primary-lightGray rounded-lg shadow-custom">
            <FormTittle title={title}></FormTittle>
            <form onSubmit={onSubmit} className="flex flex-col gap-6">
                {children}
            </form>
        </div>
    );
};
