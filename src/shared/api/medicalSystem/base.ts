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
            const { status } = error.response;

            switch (status) {
                case 400:
                    console.error('Неверный запрос!');
                    alert('Неверный запрос!');
                    break;

                case 401:
                    console.error(
                        'Токен недействителен. Перенаправление на страницу авторизации.',
                    );
                    cookieService.removeToken();
                    window.location.href = '/login';
                    break;

                case 403:
                    console.error('У вас нет прав!');
                    alert('У вас нет прав!');
                    break;

                case 404:
                    console.error('Данные не найдены!');
                    alert('Данные не найдены!');
                    break;

                case 500:
                    console.error('Внутренняя ошибка сервера!');
                    alert('Внутренняя ошибка сервера!');
                    break;

                case 502:
                    console.error('Сервер недоступен!');
                    alert('Сервер недоступен!');
                    break;

                case 503:
                    console.error('Сервис временно недоступен!');
                    alert('Сервис временно недоступен!');
                    break;

                case 504:
                    console.error(
                        'Превышено время ожидания ответа от сервера!',
                    );
                    alert('Превышено время ожидания ответа от сервера!');
                    break;

                default:
                    console.error(`Произошла ошибка: ${status}`);
                    alert(`Произошла ошибка: ${status}`);
                    break;
            }
        } else {
            console.error('Ошибка сети или таймаут!');
            alert('Ошибка сети или таймаут!');
        }

        return Promise.reject(error);
    },
);
