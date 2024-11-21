import { Switch } from '@material-tailwind/react';
import React from 'react';

type Props = {
    id: string;
    checked?: boolean;
    isDisabled?: boolean;
    leftLabel?: string;
    rightLabel?: string;
    className?: string;
    revert?: boolean;
    defaultChecked?: boolean;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export function CustomSwitch({
    id,
    leftLabel,
    rightLabel,
    className,
    revert,
    checked,
    isDisabled,
    defaultChecked,
    onChange,
}: Props) {
    return (
        <div className="flex flex-row items-center gap-2">
            {leftLabel && (
                <span
                    className={
                        checked ? 'text-primary-tuftsBlue' : 'text-black'
                    }
                >
                    {leftLabel}
                </span>
            )}
            <Switch
                id={id}
                ripple={false}
                defaultChecked={defaultChecked}
                disabled={isDisabled}
                onChange={onChange}
                checked={checked}
                className={`${className} h-full w-full ${revert ? 'checked:bg-primary-tuftsBlue bg-primary-tuftsBlue' : 'bg-white checked:bg-primary-tuftsBlue'} `}
                containerProps={{
                    className: 'w-11 h-6',
                }}
                circleProps={{
                    className: 'before:hidden left-1.5 border-none h-4 w-4',
                }}
            />
            {rightLabel && <span className="text-nowrap">{rightLabel}</span>}
        </div>
    );
}
