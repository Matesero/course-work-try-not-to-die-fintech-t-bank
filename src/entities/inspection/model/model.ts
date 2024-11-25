import { sharedConfigTypes } from '~/shared/config';

export const parseDiagnosis = ({ code, name }: sharedConfigTypes.Diagnosis) => {
    return `${name.toLowerCase()} (${code})`;
};
