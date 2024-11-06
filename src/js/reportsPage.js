import {checkAuth} from "./api/index.js";
import {navigateToLogin} from "./router.js";
import {Dropdown} from "./classes/dropdown.js";
import {getICDRoots} from "./api/dictionary.js";
import {getReports} from "./api/report.js";

const form = document.getElementById('form');
const dropdown = new Dropdown([], [], [], 'icdRoots');
const startInput = document.getElementById('start-date');
const endInput = document.getElementById('end-date');

window.onload = async function () {
    if (!checkAuth()) {
        navigateToLogin();
    }

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
}

form.addEventListener('submit', (event) => submit(event));

async function submit(event) {
    event.preventDefault()

    const icdRoots = dropdown.getValueOptions();
    const start = startInput.value;
    const end = endInput.value;

    const data = await getReports({start, end, icdRoots});

    console.log(data)

    createTable(data);
}

function createTable(data) {
    const icdRoots = data.filters.icdRoots;

    document.querySelector('.table-container').classList.remove('hidden');
    const table = document.getElementById('table');
    table.innerHTML = '';

    const headerRow = document.createElement('tr');
    const headers = ['Имя пациента', 'Пол', 'Дата рождения', ...icdRoots];

    headers.forEach(header => {
        const th = document.createElement('th');
        th.textContent = header;
        headerRow.appendChild(th);
    });
    table.appendChild(headerRow);

    data.records.forEach(record => {
        const row = document.createElement('tr');

        const patientData = [
            record.patientName,
            record.gender === 'Male' ? 'Мужской' : 'Женский',
            new Date(record.patientBirthdate).toLocaleDateString()
        ];

        patientData.forEach(data => row.appendChild(createCell(data)));
        table.appendChild(row);

        icdRoots.forEach(icdRoot => {
            const visits = record.visitsByRoot[icdRoot] || 0;
            row.appendChild(createCell(visits));
        });
    });

    const summaryRow = document.createElement('tr');
    summaryRow.classList.add('total-row');
    summaryRow.appendChild(createCell('Итого', true));
    summaryRow.appendChild(createCell(''));
    summaryRow.appendChild(createCell(''));

    icdRoots.forEach(icdRoot => {
        const totalVisits = data.summaryByRoot[icdRoot] || 0;
        summaryRow.appendChild(createCell(totalVisits));
    });
    table.appendChild(summaryRow);

}

function createCell(value, isBold = false) {
    const td = document.createElement('td');
    td.textContent = value;
    if (isBold) td.style.fontWeight = 'bold';
    return td;
}