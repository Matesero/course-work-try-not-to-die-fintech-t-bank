import { AxiosPromise } from 'axios';

import { medicalSystemApi } from '~/shared/api';

type Pagination = {
    request?: string;
    page?: number;
    size?: number;
};

type Promise = {
    pagination: Pagination;
    specialties: medicalSystemApi.models.Specialty[];
};

export const getSpecialties = ({
    page,
    size,
}: Pagination): AxiosPromise<Promise> => {
    return medicalSystemApi.base.medicalSystemRequester.get(
        '/dictionary/speciality',
        {
            params: { page, size },
        },
    );
};

export const getIcd = ({
    request,
    page,
    size,
}: Pagination): AxiosPromise<medicalSystemApi.models.Icd10[]> => {
    return medicalSystemApi.base.medicalSystemRequester.get(
        '/dictionary/icd10',
        {
            params: { request, page, size },
        },
    );
};

export const getIcdRoots = (): AxiosPromise<
    medicalSystemApi.models.Icd10[]
> => {
    return medicalSystemApi.base.medicalSystemRequester.get(
        '/dictionary/icd10/roots',
    );
};
