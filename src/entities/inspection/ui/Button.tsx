import { MouseEventHandler } from 'react';

type Props = {
    label: string;
    imgLink?: string;
    onClick: MouseEventHandler<HTMLButtonElement>;
};

export const Button = ({ label, imgLink, onClick }: Props) => {
    return (
        <button
            className="bg-none text-primary-tuftsBlue font-semibold"
            onClick={onClick}
        >
            {imgLink && (
                <img src={imgLink} alt={label} className="inline-block mr-2" />
            )}
            {label}
        </button>
    );
};
