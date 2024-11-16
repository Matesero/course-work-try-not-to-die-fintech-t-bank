import { medicalSystemApi } from '~/shared/api';
import { cookieService } from '~/shared/store';

const { base } = medicalSystemApi;

type GetParams = {
    grouped?: string;
    icdRoots?: string[];
    page?: string;
    size?: string;
};

export const getList = (params: GetParams) => {
    return base.medicalSystemRequester.get('/consultation', {
        params,
        headers: {
            Authorization: `Bearer ${cookieService.getToken()}`,
        },
    });
};
