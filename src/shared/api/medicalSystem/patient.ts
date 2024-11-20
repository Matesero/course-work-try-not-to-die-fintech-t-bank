import { createAsyncThunk } from '@reduxjs/toolkit';

import { medicalSystemApi } from '~/shared/api';
import { sharedConfigTypes } from '~/shared/config';
import { cookieService } from '~/shared/store';

const { base } = medicalSystemApi;

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
        } catch (error) {
            return rejectWithValue(error.message);
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

type SearchParams = {
    id: string;
    request?: string;
};

export const getInspectionsWithoutChild = createAsyncThunk<
    sharedConfigTypes.InspectionWithoutChild[],
    SearchParams
>('inspections/search', async ({ id, request }, { rejectWithValue }) => {
    try {
        const response = await base.medicalSystemRequester.get(
            `/patient/${id}/inspections/search`,
            {
                request,
                headers: {
                    Authorization: `Bearer ${cookieService.getToken()}`,
                },
            },
        );

        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data.message);
    }
});

export const postNewInspection = createAsyncThunk<
    { id: string } & sharedConfigTypes.NewInspection
>('inspections/create', async (params, { rejectWithValue }) => {
    try {
        const response = await base.medicalSystemRequester.post(
            '/patient/${id}/inspections',
            params,
        );

        return response.data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message);
    }
});
