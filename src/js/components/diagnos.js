export function renderDiagnosis({code, name, type, description}) {
    const diagnosisDiv = document.createElement('div');
    diagnosisDiv.className = "diagnosis";

    const labelParagraph = document.createElement('p');
    labelParagraph.className = "diagnosis__label";
    labelParagraph.textContent = `(${code}) ${name}`;
    diagnosisDiv.appendChild(labelParagraph);

    const infoDiv = document.createElement('div');
    const typeParagraph = document.createElement('p');
    typeParagraph.className = "diagnosis__info";
    switch (type) {
        case "Main": {
            typeParagraph.textContent = `Тип в осмотре: Основной`;
            break;
        }
        case "Concomitant": {
            typeParagraph.textContent = `Тип в осмотре: Сопутствующий`;
            break;
        }
        case "Complication": {
            typeParagraph.textContent = `Тип в осмотре: Осложнение`;
            break;
        }
    }

    const descParagraph = document.createElement('p');
    descParagraph.className = "diagnosis__info";
    descParagraph.textContent = `Расшифровка: ${description}`;

    infoDiv.appendChild(typeParagraph);
    infoDiv.appendChild(descParagraph);
    diagnosisDiv.appendChild(infoDiv);

    const containerList = document.querySelector('.diagnoses-list');
    containerList.appendChild(diagnosisDiv);
}