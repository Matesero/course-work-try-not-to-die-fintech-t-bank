import { createAsyncThunk } from '@reduxjs/toolkit';

import { base } from './';

import { sharedConfigTypes } from '~/shared/config';

type Pagination = {
    request?: string;
    page?: number;
    size?: number;
};

export const getSpecialties = createAsyncThunk<
    {
        specialties: sharedConfigTypes.Speciality[];
        pagination: sharedConfigTypes.Pagination;
    },
    Pagination
>(
    'dictionary/getSpecialties',
    async ({ page, size }: Pagination, { rejectWithValue }) => {
        try {
            const response = await base.medicalSystemRequester.get(
                '/dictionary/speciality',
                {
                    params: { page, size },
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

export const getIcd = createAsyncThunk<sharedConfigTypes.Icd[], Pagination>(
    'dictionary/getIcd',
    async ({ request, page, size }: Pagination, { rejectWithValue }) => {
        try {
            const response = await base.medicalSystemRequester.get(
                '/dictionary/icd10',
                {
                    params: { request, page, size },
                },
            );
            return response.data.records;
        } catch (error: unknown) {
            if (error instanceof Error) {
                return rejectWithValue(error.message);
            }
        }
    },
);

export const getIcdRoots = createAsyncThunk<sharedConfigTypes.Icd[]>(
    'dictionary/getIcdRoots',
    async (_, { rejectWithValue }) => {
        try {
            const response = await base.medicalSystemRequester.get(
                '/dictionary/icd10/roots',
            );

            return response.data;
        } catch (error: unknown) {
            if (error instanceof Error) {
                return rejectWithValue(error.message);
            }
        }
    },
);
