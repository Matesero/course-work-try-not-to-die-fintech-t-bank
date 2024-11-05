import {formatDate} from "./patient.js";
import {navigateToInspection} from "../router.js";

export function renderInspection(id, date, conclusion, diagnosis, doctor) {
    const inspectionDiv = document.createElement('div');
    inspectionDiv.className = 'inspection';
    inspectionDiv.addEventListener('click', () => navigateToInspection(id));

    if (conclusion === "Death") {
        inspectionDiv.classList.add('death');
    }

    const headDiv = document.createElement('div');
    headDiv.className = 'inspection__head';
    const rowDiv = document.createElement('div');
    rowDiv.className = 'row';

    const dateP = document.createElement('p');
    dateP.className = 'inspection__date';
    dateP.textContent = formatDate(date);

    const labelP = document.createElement('p');
    labelP.className = 'inspection__label';
    labelP.textContent = 'Амбулаторный осмотр';

    rowDiv.appendChild(dateP);
    rowDiv.appendChild(labelP);

    const buttonsDiv = document.createElement('div');
    buttonsDiv.className = 'head__buttons';

    const addButton = document.createElement('button');
    addButton.className = 'inspection__button';
    addButton.innerHTML = `<img class="button__img"> Добавить осмотр`;

    const detailsButton = document.createElement('button');
    detailsButton.className = 'inspection__button';
    detailsButton.innerHTML = `<img class="button__img"> Детали осмотра`;

    if (conclusion !== "Death") {
        buttonsDiv.appendChild(addButton);
    }

    buttonsDiv.appendChild(detailsButton);

    headDiv.appendChild(rowDiv);
    headDiv.appendChild(buttonsDiv);

    const infoDiv = document.createElement('div');
    infoDiv.className = 'inspection__info';

    let newConclusion = '';
    switch (conclusion) {
        case "Death":
            newConclusion = "смерть";
            break;
        case "Disease":
            newConclusion = "болезнь";
            break;
        case "Recovery":
            newConclusion = "выздоровление";
            break;
    }

    const conclusionDiv = createInfoElement('Заключение:', newConclusion);
    const diagnosisDiv = createInfoElement('Основной диагноз:', `${diagnosis.name} (${diagnosis.code})`);
    const doctorDiv = createInfoElement('Медицинский работник:', doctor);

    infoDiv.appendChild(conclusionDiv);
    infoDiv.appendChild(diagnosisDiv);
    infoDiv.appendChild(doctorDiv);

    inspectionDiv.appendChild(headDiv);
    inspectionDiv.appendChild(infoDiv);

    return inspectionDiv;
}

function createInfoElement(label, value) {
    const info = document.createElement('div');
    info.className = 'inspection-info';

    const labelP = document.createElement('p');
    labelP.className = 'inspection-info__label';
    labelP.textContent = label;

    const valueP = document.createElement('p');
    valueP.className = 'inspection-info__value';
    valueP.textContent = value;

    if (label === "Медицинский работник:") {
        labelP.classList.add('doctor');
        valueP.classList.add('doctor');
    }

    if (value === "смерть") {
        valueP.classList.add('bold');
    }

    info.appendChild(labelP);
    info.appendChild(valueP);

    return info;
}
