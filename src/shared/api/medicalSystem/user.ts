import { AxiosPromise } from 'axios';

import { User } from './models';

import { medicalSystemApi } from '~/shared/api';

const { base } = medicalSystemApi;

const setTokenCookie = (token: string) => {
    document.cookie = `jwt=${token}; path=/; Secure; HttpsOnly; SaseSite=Strict`;
};

const getTokenCookie = () => {
    const cookies = document.cookie.split('; ').reduce(
        (acc, currentCookie) => {
            const [name, value] = currentCookie.split('=');
            acc[name] = value;
            return acc;
        },
        {} as Record<string, string>,
    );

    return cookies.jwt || null;
};

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
        setTokenCookie(token);
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
        setTokenCookie(token);
    }
};

export const logout = () => {
    const token = getTokenCookie();

    setTokenCookie('');

    return base.medicalSystemRequester.post('/doctor/logout', {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

export const getProfile = (): AxiosPromise<User> => {
    console.log(getTokenCookie());
    return base.medicalSystemRequester.get('/doctor/profile', {
        headers: {
            Authorization: `Bearer ${getTokenCookie()}`,
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
            Authorization: `Bearer ${getTokenCookie()}`,
        },
    });
};
