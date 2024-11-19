import { AxiosPromise } from 'axios';

import { User } from './models';

import { medicalSystemApi } from '~/shared/api';
import { cookieService } from '~/shared/store';

const { base } = medicalSystemApi;

interface LoginParams {
    email: string;
    password: string;
}

export const login = async (params: LoginParams) => {
    const response = await base.medicalSystemRequester.post(
        '/doctor/login',
        params,
    );

    const token = response.data.token;

    if (token) {
        cookieService.setToken(token);
    }
};

interface RegisterParams extends LoginParams {
    name: string;
    birthday: string;
    gender: 'Male' | 'Female';
    phone: string;
    specialty: string;
}

export const register = async (params: RegisterParams) => {
    const response = await base.medicalSystemRequester.post(
        '/doctor/register',
        params,
    );

    const token = response.data.token;

    if (token) {
        cookieService.setToken(token);
    }
};

export const logout = () => {
    const token = cookieService.getToken();

    cookieService.setToken('');

    return base.medicalSystemRequester.post('/doctor/logout', {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

export const getProfile = (): AxiosPromise<User> => {
    return base.medicalSystemRequester.get('/doctor/profile', {
        headers: {
            Authorization: `Bearer ${cookieService.getToken()}`,
        },
    });
};

interface EditParams {
    email: string;
    name: string;
    birthday: string;
    gender: 'Male' | 'Female';
    phone: string;
}

export const putProfile = (params: EditParams) => {
    return base.medicalSystemRequester.put('/doctor/profile', params, {
        headers: {
            Authorization: `Bearer ${cookieService.getToken()}`,
        },
    });
};
