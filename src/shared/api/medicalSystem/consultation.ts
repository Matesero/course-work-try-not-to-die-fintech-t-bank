import { AxiosPromise } from 'axios';
import qs from 'qs';

import { base } from './';

import { sharedConfigTypes } from '~/shared/config';
import { cookieService } from '~/shared/store';

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
        paramsSerializer: (params) =>
            qs.stringify(params, { arrayFormat: 'repeat' }),
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

type NewComment = {
    id: string;
    content: string;
    parentId: string;
};

export const postNewComment = ({ id, ...data }): AxiosPromise<NewComment> => {
    return base.medicalSystemRequester.post(
        `/consultation/${id}/comment`,
        data,
        {
            headers: {
                Authorization: `Bearer ${cookieService.getToken()}`,
            },
        },
    );
};

type EditedComment = {
    id: string;
    content: string;
};

export const putEditedComment = ({
    id,
    ...data
}: EditedComment): AxiosPromise<EditedComment> => {
    return base.medicalSystemRequester.put(
        `/consultation/comment/${id}`,
        data,
        {
            headers: {
                Authorization: `Bearer ${cookieService.getToken()}`,
            },
        },
    );
};
