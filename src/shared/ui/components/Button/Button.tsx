import React from 'react';

type Props = {
    text?: string;
    type?: 'submit' | 'button';
    textColor?: string;
    bgColor?: string;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

export const Button = ({ text, type, textColor, bgColor, onClick }: Props) => {
    return (
        <button
            type={type || 'button'}
            onClick={onClick}
            className={`bg-${bgColor || 'primary-tuftsBlue'} !important  text-${textColor || 'white'} p-2.5 rounded-custom text-xl`}
        >
            {text}
        </button>
    );
};
