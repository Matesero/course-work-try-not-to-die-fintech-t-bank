import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosPromise } from 'axios';

import { base } from './';

import { sharedConfigTypes } from '~/shared/config';
import { cookieService } from '~/shared/store';

type GetParams = {
    id: string;
};

export const get = createAsyncThunk<sharedConfigTypes.Inspection, string>(
    'inspection/get',
    async (id: string, { rejectWithValue }) => {
        try {
            const response = await base.medicalSystemRequester.get(
                `/inspection/${id}`,
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

export const getChain = async ({
    id,
}: GetParams): AxiosPromise<sharedConfigTypes.Consultation[]> => {
    return await base.medicalSystemRequester.get(`/inspection/${id}/chain`, {
        headers: {
            Authorization: `Bearer ${cookieService.getToken()}`,
        },
    });
};
