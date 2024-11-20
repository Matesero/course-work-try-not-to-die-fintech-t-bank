import { AxiosPromise } from 'axios';

import { medicalSystemApi } from '~/shared/api';
import { sharedConfigTypes } from '~/shared/config';
import { cookieService } from '~/shared/store';

const { base } = medicalSystemApi;

type GetParams = {
    start?: string;
    end?: string;
    icdRoots?: string[];
};

export const get = (
    params: GetParams,
): AxiosPromise<sharedConfigTypes.Report> => {
    return base.medicalSystemRequester.get('/report/icdrootsreport', {
        params,
        headers: {
            Authorization: `Bearer ${cookieService.getToken()}`,
        },
    });
};
