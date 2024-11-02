import {getInspections, getPatient} from "./api/patient.js";
import {getParams, Pagination} from "./pagination.js";
import {renderInspection} from "./components/inspection.js";

window.addEventListener('DOMContentLoaded', () => {
    onload();
})

const filtersForm = document.getElementById('filters');
const mkbInput = document.getElementById('mkb-select');
const groupedInput = document.getElementById('grouped');
const sizeInput = document.getElementById('size-input');
const patientName = document.getElementById('patient-name');
const genderIcon = document.getElementById('gender-icon');
const patientBirthday = document.getElementById('patient-birthday');
const containerList = document.querySelector('.container__list');

filtersForm.addEventListener('submit', (event) => submit(event));

function getPatientId() {
    const urlPath = window.location.pathname;
    const parts = urlPath.split('/');
    console.log(parts)
    return parts[2];
}

function formatDate(dateString) {
    const parts = dateString.split('T');
    const datePart = parts[0];

    const [year, month, day] = datePart.split('-');

    return `${day}.${month}.${year}`;
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
    const { grouped, icdRoots, page, size} = getParams();
    const paginat = new Pagination({ grouped, icdRoots, page, size });
    const { inspections, pagination } = await getInspections({ id: patientId, grouped, icdRoots, page, size });

    const { name, gender, birthday } = await getPatient(patientId);

    setData(name, gender, birthday)

    inspections.forEach(({ date, conclusion, diagnosis, doctor}) => {
        console.log(diagnosis)
        const inspection = renderInspection(date, conclusion, diagnosis, doctor);
        containerList.appendChild(inspection);
    })

    paginat.createPagination(pagination.count)
}

function submit(event){
    event.preventDefault()
    const mkb = mkbInput.value;
    const grouped = groupedInput.checked;
    const size = sizeInput.value;

    const params = new URLSearchParams('');

    if (mkb) mkb.forEach((mk) => params.append("icdRoots", mk));
    if (grouped) params.append("grouped", grouped);
    params.append("size", size);

    const href = `?${params.toString()}`;

    window.location.href = href;
}