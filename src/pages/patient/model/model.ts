import { medicalSystemApi } from '~/shared/api';

const { getList } = medicalSystemApi.patient;

export const checkIsDeath = async (id: string) => {
    const { data } = await getList({
        page: '1',
        size: '9999',
        conclusions: ['Death'],
    });
    return !!data.patients.find((patient) => patient.id === id);
};
