import { sharedConfigTypes } from '~/shared/config';

type Props = sharedConfigTypes.Icd[];

export const icdToOptions = (icds: Props) => {
    const array: { value: string; label: string }[] = [];

    icds.forEach((icd) => {
        const option = {
            value: icd.id,
            label: `${icd.name} (${icd.code})`,
            code: icd.code,
        };
        array.push(option);
    });

    return array;
};
