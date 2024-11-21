import { createAsyncThunk } from '@reduxjs/toolkit';
import qs from 'qs';

import { base } from './';

import { sharedConfigTypes } from '~/shared/config';
import { cookieService } from '~/shared/store';

type PatientType = sharedConfigTypes.Patient;

type CreateParams = {
    name: string;
    birthday: string;
    gender: 'Male' | 'Female';
};

export const register = (params: CreateParams) => {
    base.medicalSystemRequester.post('/patient', params, {
        params,
        headers: {
            Authorization: `Bearer ${cookieService.getToken()}`,
        },
    });
};

export const getCard = createAsyncThunk<PatientType, string>(
    'patient/getCard',
    async (id: string, { rejectWithValue }) => {
        try {
            const response = await base.medicalSystemRequester.get(
                `/patient/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${cookieService.getToken()}`,
                    },
                },
            );

            return response.data;
        } catch (error: unknown) {
            if (error instanceof Error) {
                return rejectWithValue(error.message);
            }
        }
    },
);

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
        params, // Передаем объект params напрямую
        paramsSerializer: (params) =>
            qs.stringify(params, { arrayFormat: 'repeat' }),
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

type SearchParams = {
    id: string;
    request?: string;
};

export const getInspectionsWithoutChild = createAsyncThunk<
    sharedConfigTypes.InspectionWithoutChild[],
    SearchParams
>('inspections/search', async ({ id, ...request }, { rejectWithValue }) => {
    try {
        const response = await base.medicalSystemRequester.get(
            `/patient/${id}/inspections/search`,
            {
                params: request,
                headers: {
                    Authorization: `Bearer ${cookieService.getToken()}`,
                },
            },
        );

        return response.data;
    } catch (error: unknown) {
        if (error instanceof Error) {
            return rejectWithValue(error.message);
        }
    }
});

export const postNewInspection = createAsyncThunk<
    void,
    sharedConfigTypes.NewInspection
>(
    'inspections/create',
    async ({ patientId, ...params }, { rejectWithValue }) => {
        try {
            const response = await base.medicalSystemRequester.post(
                `/patient/${patientId}/inspections`,
                params,
                {
                    headers: {
                        Authorization: `Bearer ${cookieService.getToken()}`,
                    },
                },
            );

            return response.data;
        } catch (error: unknown) {
            if (error instanceof Error) {
                return rejectWithValue(error.message);
            }
        }
    },
);
