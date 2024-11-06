import {getInspections, getPatient} from "./api/patient.js";
import {getParams, Pagination, setPaginationData} from "./pagination.js";
import {renderInspection} from "./components/inspection.js";
import {formatDate} from "./components/patient.js";
import {checkAuth} from "./api/index.js";
import {navigateToCreate, navigateToLogin} from "./router.js";
import {Dropdown} from "./dropdown.js";
import {getICDRoots} from "./api/dictionary.js";

const filtersForm = document.getElementById('filters');
const addConsultationBtn = document.getElementById('add-consultation-button');
const groupedInput = document.getElementById('grouped');
const sizeInput = document.getElementById('size-input');
const patientName = document.getElementById('patient-name');
const genderIcon = document.getElementById('gender-icon');
const patientBirthday = document.getElementById('patient-birthday');
const containerList = document.querySelector('.container__list');
const dropdown = new Dropdown([], [], [], 'icdRoots');

filtersForm.addEventListener('submit', (event) => submit(event));
addConsultationBtn.addEventListener('click', () => navigateToCreate())

window.addEventListener('DOMContentLoaded', async () => {
    if (!checkAuth()) {
        navigateToLogin();
    }
    await onload();
})

function getPatientId() {
    const urlPath = window.location.pathname;
    const parts = urlPath.split('/');
    return parts[2];
}

function setData(name, gender, birthday) {
    patientName.textContent = name;

    patientBirthday.textContent = formatDate(birthday);

    if (gender === 'Male') {
        genderIcon.src = "/public/imgs/male.png"
    } else {
        genderIcon.src = "/public/imgs/female.png"
    }
}

async function onload() {
    const patientId = getPatientId();

    const params = getParams();
    setPaginationData(params)

    const paginationPage = new Pagination(params);
    const { inspections, pagination } = await getInspections({id: patientId, ...params});

    const { name, gender, birthday } = await getPatient(patientId);
    const icdRoots = await getICDRoots();

    let options = [];
    let valueOptions = [];
    let selectedOptions = [];
    icdRoots.forEach((icd) => {
        const option = `(${icd.code}) ${icd.name}`;
        options.push(option);
        valueOptions.push(icd.id);
        selectedOptions.push(icd.code);
    })
    dropdown.addNewOptions(options, valueOptions, selectedOptions);
    dropdown.setSelected(params.icdRoots)

    setData(name, gender, birthday)

    inspections.forEach(({id, date, conclusion, diagnosis, doctor}) => {
        const inspection = renderInspection(id, date, conclusion, diagnosis, doctor);
        containerList.appendChild(inspection);
    })

    paginationPage.createPagination(pagination.count)
}

function submit(event){
    event.preventDefault()

    const icdRoots = dropdown.getValueOptions();
    const grouped = groupedInput.checked;
    const size = sizeInput.value;

    const params = new URLSearchParams('');

    icdRoots.forEach((icd) => params.append("icdRoots", icd));
    if (grouped) params.append("grouped", grouped);
    params.append("size", size);

    const href = `?${params.toString()}`;

    window.location.href = href;
}