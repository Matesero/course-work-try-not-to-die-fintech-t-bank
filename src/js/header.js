import { navigateToLogin } from "./router.js";

const loginBtn = document.getElementById('login-button');
const patientBtn = document.getElementById('patient-button');
const consultationBtn = document.getElementById('consultation-button');
const statsBtn = document.getElementById('stats-button');

loginBtn.addEventListener('click', () => navigateToLogin());