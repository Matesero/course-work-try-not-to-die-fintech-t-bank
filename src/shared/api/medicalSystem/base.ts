import * as Sentry from '@sentry/react';
import axios, { AxiosError } from 'axios';

import { sharedConfigEnvs } from '~/shared/config';
import { cookieService } from '~/shared/store';

const { MEDICAL_SYSTEM_HOST } = sharedConfigEnvs;

export const medicalSystemRequester = axios.create({
    baseURL: MEDICAL_SYSTEM_HOST,
});

medicalSystemRequester.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
        if (error.response) {
            const { status, data } = error.response;

            switch (status) {
                case 400:
                    Sentry.captureException(new Error('Неверный запрос!'));
                    break;

                case 401:
                    Sentry.captureException(
                        new Error(
                            'Токен недействителен. Перенаправление на страницу авторизации.',
                        ),
                    );
                    cookieService.removeToken();
                    window.location.href = '/login';
                    break;

                case 403:
                    Sentry.captureException(new Error('У вас нет прав!'));
                    break;

                case 404:
                    Sentry.captureException(new Error('Данные не найдены!'));
                    break;

                case 500:
                    Sentry.captureException(
                        new Error('Внутренняя ошибка сервера!'),
                    );
                    break;

                case 502:
                    Sentry.captureException(new Error('Сервер недоступен!'));
                    break;

                case 503:
                    Sentry.captureException(
                        new Error('Сервис временно недоступен!'),
                    );
                    break;

                case 504:
                    Sentry.captureException(
                        new Error(
                            'Превышено время ожидания ответа от сервера!',
                        ),
                    );
                    break;

                default:
                    Sentry.captureException(
                        new Error(`Произошла ошибка: ${status}`),
                    );
                    break;
            }

            Sentry.captureException(
                new Error(
                    `HTTP Error: ${status}, Message: ${(data as { message: string }).message || 'Unknown'}`,
                ),
            );
        } else {
            console.error('Ошибка сети или таймаут!');
            Sentry.captureException(
                new Error(
                    'Ошибка сети или таймаут! Возможно, сервер недоступен.',
                ),
            );
        }

        return Promise.reject(error);
    },
);
