import axios from 'axios';

const BASE_URL = 'https://mis-api.kreosoft.space/api';

export const medicalSystemRequester = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});
