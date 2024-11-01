export { getSpecialities } from "./dictionary.js"
export { getProfile, putProfile, postRegister, postLogin } from "./doctor.js"

export const path = "https://mis-api.kreosoft.space/api";

export function getCookie(name) {
    const fullCookieString = '; ' + document.cookie;
    const splitCookie = fullCookieString.split('; ' + name + '=');
    return splitCookie.length === 2 ? splitCookie.pop().split(';').shift() : null;
}