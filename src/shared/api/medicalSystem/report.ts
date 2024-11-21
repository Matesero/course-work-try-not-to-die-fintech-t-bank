import { AxiosPromise } from 'axios';

import { base } from './';

import { sharedConfigTypes } from '~/shared/config';
import { cookieService } from '~/shared/store';

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
