import {getPatients} from "./api/patient.js";
import {Pagination, getParams} from "./pagination.js";
import {reg, renderPatient, resetFields} from "./components/patient.js";
import {checkAuth} from "./api/index.js";
import {navigateToLogin} from "./router.js";

const registerForm = document.getElementById('register-form');
const nameInput = document.getElementById('name-input');
const conclusionsInput = document.getElementById('conclusions-input');
const scheduledInput = document.getElementById('scheduled-visits-input');
const onlyMineInput = document.getElementById('only-mine-input');
const sortInput = document.getElementById('sort-input');
const sizeInput = document.getElementById('size-input');
const registerBtn = document.getElementById('register-patient-button');
const findBtn = document.getElementById('submit-button');
const registrationBG = document.getElementById('registration-background');

let pagination = new Pagination()

window.onload = async function () {
    if (!checkAuth()) {
        navigateToLogin();
    }
    const params = getParams();
    pagination = new Pagination(params);
    sizeInput.value = pagination.size;
    scheduledInput.checked = pagination.scheduledVisits;
    onlyMineInput.checked = pagination.onlyMine;

    const patients = await getPatients(params);
    pagination.createPagination(patients.pagination.count);

    patients.patients.forEach(patient =>
      renderPatient(patient.id, patient.name, patient.gender, patient.birthday)
    );
}

findBtn.addEventListener('click', () => find());
registerBtn.addEventListener('click', () => register());
registerForm.addEventListener('submit', (event) => reg(event));
registrationBG.addEventListener('click', () => resetFields());


function find() {
    const name = nameInput.value;
    const conclusions = conclusionsInput.value;
    const scheduled = scheduledInput.checked;
    const onlyMine = onlyMineInput.checked;
    const sort = sortInput.value;
    const size = sizeInput.value;

    const params = new URLSearchParams('');

    if (name) params.append("name", name);
    if (conclusions) params.append("conclusions", conclusions);
    if (sort) params.append("sorting", sort);
    if (scheduled) params.append("scheduledVisits", scheduled);
    if (onlyMine) params.append("onlyMine", onlyMine);
    params.append("page", "1");
    params.append("size", size);
    const href = `?${params.toString()}`;

    window.location.href = href;
}

function register() {
    registerForm.classList.remove('hidden');
    registrationBG.classList.remove('hidden');
}