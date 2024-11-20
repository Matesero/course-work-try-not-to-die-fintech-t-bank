import { AxiosPromise } from 'axios';

import { medicalSystemApi } from '~/shared/api';
import { sharedConfigTypes } from '~/shared/config';
import { cookieService } from '~/shared/store';

const { base } = medicalSystemApi;

type GetListParams = {
    grouped?: string;
    icdRoots?: string[];
    page?: string;
    size?: string;
};

export const getList = (
    params: GetListParams,
): AxiosPromise<{
    inspections: sharedConfigTypes.Consultation[];
    pagination: sharedConfigTypes.Pagination;
}> => {
    return base.medicalSystemRequester.get('/consultation', {
        params,
        headers: {
            Authorization: `Bearer ${cookieService.getToken()}`,
        },
    });
};

export const getOne = (
    id: string,
): AxiosPromise<sharedConfigTypes.ConsultationFull> => {
    return base.medicalSystemRequester.get(`/consultation/${id}`, {
        headers: {
            Authorization: `Bearer ${cookieService.getToken()}`,
        },
    });
};
