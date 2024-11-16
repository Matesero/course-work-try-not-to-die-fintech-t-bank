import { russianToEnglish } from '~/shared/lib/russianToEnglish';

type Props = {
    label: string;
    value?: string;
    checked: boolean;
    onChange: () => void;
};

export const Radio = ({ label, value, checked, onChange }: Props) => {
    return (
        <div className="flex items-center ps-4 border border-gray-200 rounded dark:border-gray-700">
            <input
                id={label}
                type="radio"
                value={value}
                name={russianToEnglish(label)}
                checked={checked}
                onChange={onChange}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label
                htmlFor={label}
                className="w-full ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
                {label}
            </label>
        </div>
    );
};
