import {navigateToLogin, navigateToPatients} from "./router.js";

const loginBtn = document.getElementById('login-button');
const patientsBtn = document.getElementById('patients-button');
const consultationsBtn = document.getElementById('consultations-button');
const statsBtn = document.getElementById('stats-button');

loginBtn.addEventListener('click', () => navigateToLogin());
patientsBtn.addEventListener('click', () => navigateToPatients());
//consultationsBtn.addEventListener('click', () => navigateToConsultations());