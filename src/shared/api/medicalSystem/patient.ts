import { medicalSystemApi } from '~/shared/api';
import { cookieService } from '~/shared/store';

const { base } = medicalSystemApi;

type CreateParams = {
    name: string;
    birthday: string;
    gender: 'Male' | 'Female';
};

export const create = (params: CreateParams) => {
    base.medicalSystemRequester.post('/patient', params);
};

type GetParams = {
    name?: string;
    conclusions?: string[];
    sorting?:
        | 'NameAsc'
        | 'NameDesc'
        | 'CreateAsc'
        | 'CreateDesc'
        | 'InspectionAsc'
        | 'InspectionDesc';
    scheduledVisits?: string;
    onlyMine?: string;
    page?: string;
    size?: string;
};

export const getList = (params: GetParams) => {
    return base.medicalSystemRequester.get('/patient', {
        params,
        headers: {
            Authorization: `Bearer ${cookieService.getToken()}`,
        },
    });
};

type GetInspectionsParams = {
    id?: string;
    grouped?: string;
    icdRoots?: string[];
    page?: string;
    size?: string;
};

export const getInspectionsList = ({ id, ...params }: GetInspectionsParams) => {
    return base.medicalSystemRequester.get(`/patient/${id}/inspections`, {
        params,
        headers: {
            Authorization: `Bearer ${cookieService.getToken()}`,
        },
    });
};
