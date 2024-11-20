import { createAsyncThunk } from '@reduxjs/toolkit';

import { User } from './models';

import { medicalSystemApi } from '~/shared/api';
import { cookieService } from '~/shared/store';

const { base } = medicalSystemApi;

interface LoginParams {
    email: string;
    password: string;
}

export const login = createAsyncThunk<{ token: string }, LoginParams>(
    'user/login',
    async (params, { rejectWithValue }) => {
        try {
            const response = await base.medicalSystemRequester.post(
                '/doctor/login',
                params,
            );

            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message);
        }
    },
);

interface RegisterParams extends LoginParams {
    name: string;
    birthday: string;
    gender: 'Male' | 'Female';
    phone: string;
    specialty: string;
}

export const register = createAsyncThunk<{ token: string }, RegisterParams>(
    'user/register',
    async (params, { rejectWithValue }) => {
        try {
            const response = await base.medicalSystemRequester.post(
                '/register',
                params,
            );

            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data.message);
        }
    },
);

export const logout = createAsyncThunk<void, void>(
    'user/logout',
    async (_, { rejectWithValue }) => {
        const token = cookieService.getToken();

        try {
            await base.medicalSystemRequester.post(
                '/doctor/logout',
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                },
            );
        } catch (error) {
            return rejectWithValue(error.response?.data?.message);
        }
    },
);

export const getProfile = createAsyncThunk<User, void>(
    'user/getProfile',
    async (_, { rejectWithValue }) => {
        try {
            const response = await base.medicalSystemRequester.get(
                '/doctor/profile',
                {
                    headers: {
                        Authorization: `Bearer ${cookieService.getToken()}`,
                    },
                },
            );

            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message);
        }
    },
);

type EditParams = {
    email: string;
    name: string;
    birthday: string;
    gender: 'Male' | 'Female';
    phone: string;
};

export const putProfile = createAsyncThunk<void, EditParams>(
    'user/putProfile',
    async (params, { rejectWithValue }) => {
        try {
            await base.medicalSystemRequester.put('/doctor/profile', params, {
                headers: {
                    Authorization: `Bearer ${cookieService.getToken()}`,
                },
            });
        } catch (error) {
            return rejectWithValue(error.response?.data?.message);
        }
    },
);
