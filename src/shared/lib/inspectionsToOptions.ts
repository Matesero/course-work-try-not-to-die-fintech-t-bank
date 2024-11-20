import { InspectionWithoutChild } from '~/shared/config/types/types';
import { withTime } from '~/shared/lib/parseDate';

export const inspectionsToOptions = (inspections: InspectionWithoutChild[]) => {
    const array: { value: string; label: string; code: string }[] = [];

    inspections.forEach((inspection) => {
        const option = {
            value: inspection.id,
            label: `${withTime(inspection.date)} ${inspection.diagnosis.code} ${inspection.diagnosis.name}`,
            code: `${withTime(inspection.date)} ${inspection.diagnosis.code}`,
        };
        array.push(option);
    });

    return array;
};
