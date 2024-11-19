import React, { MouseEventHandler } from 'react';

type Props = {
    text?: string;
    type?: 'submit' | 'button';
    textColor?: string;
    bgColor?: string;
    onClick?: MouseEventHandler<HTMLButtonElement>;
    className?: string;
};

export const Button = ({
    text,
    type,
    textColor,
    bgColor,
    onClick,
    className,
}: Props) => {
    return (
        <button
            type={type || 'button'}
            onClick={onClick}
            className={`${className} bg-${bgColor || 'primary-tuftsBlue'} !important  text-${textColor || 'white'} p-2.5 rounded-custom text-xl w-full`}
        >
            {text}
        </button>
    );
};
