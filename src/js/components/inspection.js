import {formatDate} from "./patient.js";
import {getInspectionChain} from "../api/inspection.js";
import {navigateToInspection} from "../router.js";

export async function renderInspection({id, date, conclusion, diagnosis, doctor, hasChain, hasNested} = {}, grouped,number = 1) {
    const containerDiv = document.createElement('div');
    containerDiv.className = 'inspection-chain';

    const inspectionDiv = document.createElement('div');
    inspectionDiv.className = 'inspection';
    inspectionDiv.id = id;

    if ((number !== 1 || hasNested) && grouped){
        inspectionDiv.classList.add(`chain-${number}`);
    }
    const copyNumber = number;

    if (conclusion === "Death") {
        inspectionDiv.classList.add('death');
    }

    const headDiv = document.createElement('div');
    headDiv.className = 'inspection__head';
    const rowDiv = document.createElement('div');
    rowDiv.className = 'row';

    if (hasNested && grouped) {
        const openBtn = document.createElement('button');
        openBtn.classList.add('inspection-chain__button');
        openBtn.classList.add('closed');
        openBtn.textContent = '+';

        openBtn.addEventListener('click', () => {
            if (openBtn.classList.contains('closed')) {
                const nested = inspectionDiv.parentNode.querySelectorAll(`.chain-${copyNumber + 1}`);

                nested.forEach((next) => {
                    next.classList.remove('hidden');
                })

                openBtn.textContent = '–';

            } else {
                for (let i = copyNumber + 1; i <= 3; i++){
                    const nested = inspectionDiv.parentNode.querySelectorAll(`.chain-${i}`);

                    nested.forEach((next) => {
                        const nextBtn = next.querySelector('.inspection-chain__open');
                        if (nextBtn) nextBtn.classList.add('closed');
                        next.classList.add('hidden');
                    })

                    openBtn.textContent = '+';
                }
            }
            openBtn.classList.toggle('closed');
        })
        openBtn.type = "button";
        rowDiv.appendChild(openBtn);
    }

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

    if ((!grouped || !hasNested) && conclusion !== "Death") {
        const addButton = document.createElement('button');
        addButton.className = 'inspection__button';
        addButton.innerHTML = `<img class="button__img"> Добавить осмотр`;
        buttonsDiv.appendChild(addButton);
    }

    const detailsButton = document.createElement('button');
    detailsButton.className = 'inspection__button';
    detailsButton.innerHTML = `<img class="button__img"> Детали осмотра`;
    detailsButton.addEventListener('click',  () => navigateToInspection(id));

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

    if (hasChain && grouped) {
        containerDiv.appendChild(inspectionDiv);

        inspectionDiv.classList.add(`chain-${number}`);
        const nextInspections = await getInspectionChain(id);

        for (const inspection of nextInspections) {
            const next = await renderInspection(inspection, grouped, number === 3 ? number : number + 1);
            next.classList.add('hidden');
            number++;
            containerDiv.appendChild(next);
        }
    }

    if (hasChain && grouped) {
        return containerDiv;
    } else {
        return inspectionDiv;
    }
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
