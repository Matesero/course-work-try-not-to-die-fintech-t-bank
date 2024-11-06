import {getInspection} from "./api/inspection.js";
import {navigateToLogin, navigateToPatientCard} from "./router.js";
import {renderDiagnosis} from "./components/diagnos.js";
import {checkAuth} from "./api/index.js";

window.addEventListener('DOMContentLoaded', async () => {
    if (!checkAuth()) {
        navigateToLogin();
    }
    await onLoad()
});

const inspectionDate = document.getElementById('inspection-date');
const editBtn = document.getElementById('edit-inspection-button');
const patientName = document.getElementById('patient-name');
const patientGender = document.getElementById('patient-gender');
const patientBirthday = document.getElementById('patient-birthday');
const doctorName = document.getElementById('doctor-name');
const complaint = document.getElementById('complaint');
const amnesia = document.getElementById('amnesia');
const recommendations = document.getElementById('recommendations');
const conclusionP = document.getElementById('conclusion');
const nextInspection = document.getElementById('next-inspection');
const conclusionDate = document.getElementById('conclusion-date');

function getInspectionId() {
    const urlPath = window.location.pathname;
    const parts = urlPath.split('/');
    return parts[2];
}

async function onLoad() {
    const inspectionId = getInspectionId();
    const inspection = await getInspection(inspectionId)
    console.log(inspection);

    setPatientData(inspection.date ,inspection.patient, inspection.doctor)
    setInspectionData(inspection);
}

function setPatientData(date, {id, name, birthday, gender}, {name: doctor}) {
    const formatDate = formatsDateWithTime(date);
    inspectionDate.textContent = `Амбулаторный осмотр от ${formatDate}`;
    patientName.textContent = name;
    patientName.addEventListener('click', () => {
        navigateToPatientCard(id);
    })
    gender === "Male" ? patientGender.textContent = "мужской" : "женский";
    patientBirthday.textContent = formatsDateWithoutTime(birthday);
    doctorName.textContent = doctor;
}

function setInspectionData({complaints, anamnesis, diagnoses, consultations, treatment, conclusion, nextVisitDate, deathDate,}) {
    complaint.textContent = complaints;
    amnesia.textContent = anamnesis;
    recommendations.textContent = treatment;

    switch (conclusion) {
        case "Death":
            conclusionP.textContent = "Умер";
            conclusionDate.classList.remove('hidden');
            conclusionDate.querySelector('.inspection-info__label').textContent = "Дата и время смерти:"
            conclusionDate.querySelector('.inspection-info__value').textContent = formatsDateWithTime(deathDate);
            break;
        case "Disease":
            conclusionP.textContent = "Болезнь";
            conclusionDate.classList.remove('hidden');
            conclusionDate.querySelector('.inspection-info__label').textContent = "Дата следующего визита:"
            conclusionDate.querySelector('.inspection-info__value').textContent = formatsDateWithTime(nextVisitDate);
            break;
        case "Recovery":
            conclusionP.textContent = "Выздоровление";
    }

    diagnoses.forEach((diagnosis) => {
        renderDiagnosis(diagnosis);
    })
}

function formatsDateWithTime(date) {
    const parts = date.split('T');
    const datePart = parts[0];
    const timePart = parts[1];

    const [year, month, day] = datePart.split('-');
    const [hours, minutes] = timePart.split(':');

    return `${day}.${month}.${year} - ${hours}:${minutes}`;
}

function formatsDateWithoutTime(date) {
    const parts = date.split('T');
    const datePart = parts[0];

    const [year, month, day] = datePart.split('-');

    return `${day}.${month}.${year}`;
}