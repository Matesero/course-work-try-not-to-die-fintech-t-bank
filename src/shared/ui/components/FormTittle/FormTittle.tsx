import React from 'react';

type Props = {
    title: string;
};

export const FormTittle = ({ title }: Props) => {
    return (
        <p className="text-4xl sm:text-5xl font-arial font-bold cursor-default mb-6">
            {title}
        </p>
    );
};
