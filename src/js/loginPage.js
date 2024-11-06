import {checkAuth, getCookie, postLogin} from "./api/index.js";
import {navigateToPatients, navigateToRegistration} from "./router.js";

window.addEventListener('DOMContentLoaded', () => {
    if (checkAuth()) {
        navigateToPatients();
    }
})

const submitBtn = document.getElementById("submit-button");
const registerBtn = document.getElementById("register");
const emailInput = document.getElementById("email-input");
const passwordInput = document.getElementById("password-input");

submitBtn.addEventListener('click', () => onLoginClick());
registerBtn.addEventListener('click', () => navigateToRegistration());

async function onLoginClick() {
    const email = emailInput.value;
    const password = passwordInput.value;

    if (!email || !password) {
        // обработать ошибку
    }

    await postLogin(email, password);

    navigateToPatients();
}

