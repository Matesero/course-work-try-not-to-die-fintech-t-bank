import axios from 'axios';

import { sharedConfigEnvs } from '~/shared/config';
const { MEDICAL_SYSTEM_HOST } = sharedConfigEnvs;

export const medicalSystemRequester = axios.create({
    baseURL: MEDICAL_SYSTEM_HOST,
});
