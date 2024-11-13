import { Speciality } from '~/shared/api/medicalSystem/models';

export const specialtiesToOptions = (specialties: Speciality[]) => {
    const array: { value: string; label: string }[] = [];

    specialties.forEach((speciality) => {
        const option = { value: speciality.id, label: speciality.name };
        array.push(option);
    });

    return array;
};
