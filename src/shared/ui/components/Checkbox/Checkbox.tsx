import { useState } from 'react';

import { russianToEnglish } from '~/shared/lib/russianToEnglish';

type Props = {
    defaultValue?: string;
    label: string;
};

export const Checkbox = ({ defaultValue, label }: Props) => {
    const [checked, setChecked] = useState<boolean>(!!defaultValue);

    return (
        <div className="flex items-center">
            <input
                name={russianToEnglish(label)}
                id={label}
                type="checkbox"
                value="true"
                checked={checked}
                onChange={() => {
                    setChecked((prevChecked) => !prevChecked);
                }}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label
                htmlFor={label}
                className="ms-2 text-md font-medium text-gray-900 dark:text-gray-300"
            >
                {label}
            </label>
        </div>
    );
};
