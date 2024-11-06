import {
    navigateToConsultations,
    navigateToLogin,
    navigateToPatients,
    navigateToProfile,
    navigateToReports
} from "./router.js";
import {checkAuth, getProfile} from "./api/index.js";
import {logout} from "./api/doctor.js";

const loginBtn = document.getElementById('login-button');
const userBtn = document.getElementById('user-button');
const patientsBtn = document.getElementById('patients-button');
const consultationsBtn = document.getElementById('consultations-button');
const reportsBtn = document.getElementById('stats-button');
const userMenu = document.getElementById('userMenu');
const profileBtn = document.getElementById('profile-button');
const logoutBtn = document.getElementById('logout-button');

window.addEventListener('DOMContentLoaded', async () => {
    if (checkAuth()) {
        patientsBtn.classList.remove('hidden');
        patientsBtn.addEventListener('click', () => navigateToPatients());

        consultationsBtn.classList.remove('hidden');
        consultationsBtn.addEventListener('click', () => navigateToConsultations());

        reportsBtn.classList.remove('hidden');
        reportsBtn.addEventListener('click', () => navigateToReports());

        const { name } = await getProfile();
        userBtn.textContent = name;
        userBtn.classList.remove('hidden');
        userBtn.addEventListener('click', () => {
            userMenu.classList.contains('hidden') ? userMenu.classList.remove('hidden') : userMenu.classList.add('hidden');
        })

        profileBtn.addEventListener('click', () => navigateToProfile());
        logoutBtn.addEventListener('click', () => logout());

        loginBtn.remove();
    }
})

window.addEventListener('click', (event) => {
    if (!userMenu.classList.contains('hidden') && event.srcElement !== userBtn) {
        userMenu.classList.add('hidden');
    }
})

loginBtn.addEventListener('click', () => navigateToLogin());
