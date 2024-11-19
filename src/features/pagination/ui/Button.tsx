import { MouseEventHandler } from 'react';

type Props = {
    page: string;
    onClick: MouseEventHandler<HTMLAnchorElement>;
    isDisabled?: boolean;
    isCurrent?: boolean;
};

export const Button = ({ page, isDisabled, isCurrent, onClick }: Props) => {
    const handleClick: MouseEventHandler<HTMLAnchorElement> = (event) => {
        if (isDisabled) {
            return;
        }
        onClick(event);
    };

    return (
        <a
            onClick={handleClick}
            className={`flex justify-center items-center text-md h-9 w-9 bg-white border ${isCurrent ? 'border-primary-tuftsBlue' : 'border-b-primary-gray'} rounded-md leading-none color-${isCurrent ? 'primary-tuftsBlue' : 'black'} ${isDisabled ? 'cursor-not-allowed text-primary-superLightGray' : 'cursor-pointer'}`}
        >
            {page}
        </a>
    );
};
