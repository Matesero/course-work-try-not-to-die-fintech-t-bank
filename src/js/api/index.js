import {navigateToLogin} from "../router.js";

export { getSpecialities } from "./dictionary.js"
export { getProfile, putProfile, postRegister, postLogin } from "./doctor.js"

export const path = "https://mis-api.kreosoft.space/api";

export function getCookie(name) {
    const fullCookieString = '; ' + document.cookie;
    const splitCookie = fullCookieString.split('; ' + name + '=');
    return splitCookie.length === 2 ? splitCookie.pop().split(';').shift() : null;
}

export function checkAuth() {
    return !!getCookie('jwt');
}

export function handleResponseStatus(error, message = '') {
    const code = parseInt(error.message);

    switch (code) {
        case 400:
            message = "Неверный запрос!";
            break
        case 401:
            message = "Вы не авторизованы!";
            if (checkAuth()) {
                document.cookie = "jwt=; expires=Thu, 07 Apr 2005 00:00:00 UTC; path=/;";
                message = "Время действия авторизации истек!";
                navigateToLogin();
            }
            break;
        case 403:
            message = "У вас нет прав!"
            break;
        case 404:
            message = "Данные не найдены!";
            break
        case 500:
            message = "Сервер умер!";
            break
    }
}